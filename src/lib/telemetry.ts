/**
 * Telemetry and Analytics wrapper for CountryDNA.
 *
 * Provides privacy-safe funnel event tracking.
 * sensitive relocation-profile data (passport, budget, answers)
 * is NEVER sent to telemetry.
 */

type FunnelEvent =
  | 'quiz_started'
  | 'quiz_completed'
  | 'results_viewed'
  | 'deep_dive_opened'
  | 'what_if_used'
  | 'share_attempted';

interface TelemetryMetadata {
  matchCountBucket?: '0' | '1-5' | '6-20' | '21-50' | '51+';
  isReadOnly?: boolean;
  shareAvailable?: boolean;
  section?: 'overview' | 'visa';
}

const EVENT_METADATA_ALLOWLIST: Record<FunnelEvent, Array<keyof TelemetryMetadata>> = {
  quiz_started: [],
  quiz_completed: ['matchCountBucket'],
  results_viewed: ['matchCountBucket', 'isReadOnly'],
  deep_dive_opened: ['section'],
  what_if_used: [],
  share_attempted: ['shareAvailable'],
};

const SENSITIVE_KEY_PARTS = [
  'passport',
  'citizenship',
  'budget',
  'income',
  'savings',
  'healthcare',
  'household',
  'answers',
  'profile',
  'token',
  'session',
  'localstorage',
  'authorization',
  'cookie',
];

function isSensitiveKey(key: string) {
  const normalized = key.toLowerCase();
  return SENSITIVE_KEY_PARTS.some(part => normalized.includes(part));
}

function redactSensitiveStrings(value: string) {
  return value
    .replace(/\/r\/[A-Za-z0-9_-]{8}\b/g, '/r/[redacted]')
    .replace(/\/api\/results\/[A-Za-z0-9_-]{8}\b/g, '/api/results/[redacted]');
}

export function sanitizeTelemetryValue(value: unknown, seen = new WeakSet<object>()): unknown {
  if (typeof value === 'string') return redactSensitiveStrings(value);
  if (value === null || value === undefined) return value;
  if (typeof value !== 'object') return value;

  if (seen.has(value)) return undefined;
  seen.add(value);

  if (Array.isArray(value)) {
    return value.map(item => sanitizeTelemetryValue(item, seen));
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([key]) => !isSensitiveKey(key))
      .map(([key, entry]) => [key, sanitizeTelemetryValue(entry, seen)])
      .filter(([, entry]) => entry !== undefined)
  );
}

export function sanitizeTelemetryMetadata(name: FunnelEvent, metadata?: TelemetryMetadata) {
  if (!metadata) return {};

  const allowedKeys = EVENT_METADATA_ALLOWLIST[name];
  const allowedEntries = allowedKeys
    .filter(key => metadata[key] !== undefined)
    .map(key => [key, metadata[key]]);

  return sanitizeTelemetryValue(Object.fromEntries(allowedEntries)) as Partial<TelemetryMetadata>;
}

export function sanitizeSentryEvent<T>(event: T): T {
  return sanitizeTelemetryValue(event) as T;
}

/**
 * Tracks a privacy-safe funnel event.
 * Currently no-op until an analytics provider (e.g. PostHog) is configured.
 */
export function trackEvent(name: FunnelEvent, metadata?: TelemetryMetadata) {
  const sanitizedMetadata = sanitizeTelemetryMetadata(name, metadata);

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Telemetry] ${name}`, sanitizedMetadata);
  }

  // Future implementation:
  // if (typeof window !== 'undefined' && (window as any).posthog) {
  //   (window as any).posthog.capture(name, sanitizedMetadata);
  // }
}

/**
 * Helper to bucket match counts for privacy-safe reporting.
 */
export function bucketMatchCount(count: number): TelemetryMetadata['matchCountBucket'] {
  if (count === 0) return '0';
  if (count <= 5) return '1-5';
  if (count <= 20) return '6-20';
  if (count <= 50) return '21-50';
  return '51+';
}
