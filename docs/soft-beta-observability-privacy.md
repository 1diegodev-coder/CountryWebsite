# Soft Beta Observability, Privacy, and Compliance

## Analytics Decision
For the Soft Beta phase, we have deferred the integration of third-party analytics vendors (e.g., PostHog). 

**Reasoning:**
- Minimize third-party dependencies during initial rollout.
- Ensure strict privacy by default until a robust cookie consent and privacy policy are in place.
- Basic funnel visibility is currently provided via a no-op telemetry wrapper that logs to the console in development.

## Privacy Strategy
We employ a "Sanitize-at-Source" strategy for all telemetry and error reporting:

1.  **Telemetry Sanitization:** The `trackEvent` wrapper in `src/lib/telemetry.ts` explicitly deletes sensitive keys (passport, budget, profile, etc.) before any potential transmission.
2.  **Sentry Sanitization:** `beforeSend` hooks in all Sentry configurations (`client`, `server`, `edge`) redact request bodies and sensitive extra context (profile, answers, tokens).
3.  **Coarse Metadata:** Only non-sensitive, coarse metadata is allowed in telemetry (e.g., bucketed match counts instead of exact numbers).

## Tracked Funnel Events
The following events are tracked without sensitive data:
- `quiz_started`
- `quiz_completed` (includes `matchCountBucket`)
- `results_viewed` (includes `matchCountBucket`, `isReadOnly`)
- `deep_dive_opened` (includes `countryCode`, `section`)
- `what_if_used` (includes `field`)
- `share_attempted` (includes `shareAvailable`)

## Compliance
- **GDPR/CCPA:** No Personally Identifiable Information (PII) or sensitive relocation preferences are transmitted to external observability platforms.
- **Sentry:** Configured to respect `NODE_ENV` and use safe sampling rates.
