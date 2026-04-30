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
  step?: number;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Tracks a privacy-safe funnel event.
 * Currently no-op until an analytics provider (e.g. PostHog) is configured.
 */
export function trackEvent(name: FunnelEvent, metadata?: TelemetryMetadata) {
  // Privacy safety: Ensure no sensitive keys leaked via metadata spread
  const sanitizedMetadata = metadata ? { ...metadata } : {};

  const forbiddenKeys = [
    'passport', 'citizenship', 'budget', 'income', 'savings',
    'healthcare', 'household', 'answers', 'profile',
    'token', 'sessionToken', 'localStorage'
  ];

  forbiddenKeys.forEach(key => {
    if (key in sanitizedMetadata) {
      delete (sanitizedMetadata as any)[key];
    }
  });

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
