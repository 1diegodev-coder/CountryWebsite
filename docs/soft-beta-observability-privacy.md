# Soft Beta Observability, Privacy, and Compliance

## Analytics Decision
For the Soft Beta phase, we have deferred the integration of third-party analytics vendors (e.g., PostHog).

**Reasoning:**
- Minimize third-party dependencies during initial rollout.
- Ensure strict privacy by default until a robust cookie consent and privacy policy are in place.
- Basic funnel visibility is currently provided via a no-op telemetry wrapper that logs to the console in development.

## Privacy Strategy
We employ a "Sanitize-at-Source" strategy for all telemetry and error reporting:

1.  **Telemetry Sanitization:** The `trackEvent` wrapper in `src/lib/telemetry.ts` only emits event-specific allowlisted metadata and strips sensitive keys before any potential transmission.
2.  **Sentry Sanitization:** `beforeSend` hooks in all Sentry configurations (`client`, `server`, `edge`) recursively redact sensitive request, context, and extra fields, including share tokens in known URLs.
3.  **Coarse Metadata:** Only non-sensitive, coarse metadata is allowed in telemetry (e.g., bucketed match counts instead of exact numbers).

## Tracked Funnel Events
The following events are tracked without sensitive data:
- `quiz_started`
- `quiz_completed` (includes `matchCountBucket`)
- `results_viewed` (includes `matchCountBucket`, `isReadOnly`)
- `deep_dive_opened` (includes `section`)
- `what_if_used` (no metadata)
- `share_attempted` (includes `shareAvailable`)

## Compliance
- **GDPR/CCPA:** No Personally Identifiable Information (PII) or sensitive relocation preferences are transmitted to external observability platforms.
- **Sentry:** Configured to respect `NODE_ENV` and use safe sampling rates.
