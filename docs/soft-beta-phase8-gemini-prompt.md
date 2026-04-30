# Gemini Prompt - Soft Beta Phase 8: Observability, Privacy, And Compliance

## Preamble - required

Before starting:

1. **Branch discipline.** Create and switch to `soft-beta/8-observability-privacy` off the current accepted `main` after Soft Beta Phase 7 is merged. Do not work directly on `main`.
2. **Read context first.** Read `AGENTS.md`, `DEVELOPMENT.md`, `docs/SOFT_BETA_ROADMAP.md`, `docs/PHASE_REVIEW_CHECKLIST.md`, `.env.example`, `next.config.ts`, `instrumentation.ts`, the current Sentry config files, and this prompt before editing.
3. **Verify toolchain.** Read `package.json` before assuming commands or framework versions.
4. **Full test suite first.** Run `npm test` and verify it exits 0 before editing. Both node and jsdom projects must pass. Do not report a test count unless you ran the command and read the output.
5. **No artifacts.** Do not leave `.bak`, `.orig`, temp files, debug scripts, screenshots, or generated reports unless explicitly requested in this prompt.
6. **No hidden scope drift.** Do not make whitespace-only edits, formatting churn, or documentation changes outside the phase scope. If an unexpected file must change, stop and explain why before continuing.
7. **Clean handoff required.** A phase handoff is invalid unless all intended files are committed and `git status --short --branch` shows a clean working tree.

Do not report complete until browser QA exercises the real app path affected by this phase and confirms no unexpected console errors or server 4xx/5xx responses.

## Task

Complete Soft Beta Phase 8: Observability, Privacy, And Compliance. Make error visibility production-respectable for soft beta while preventing sensitive relocation-profile data from leaking into telemetry, logs, analytics, or user-visible diagnostics.

## Context

Stack: Next.js 15, React 19, TypeScript 5.7, Vitest 3, Zod 3.
Branch: `soft-beta/8-observability-privacy` off synced current `main`.

Authoritative references:
- `DEVELOPMENT.md`
- `docs/SOFT_BETA_ROADMAP.md`
- `docs/PHASE_REVIEW_CHECKLIST.md`
- `next.config.ts`
- `instrumentation.ts`
- `sentry.client.config.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`
- `.env.example`

Current relevant state:
- The project already depends on `@sentry/nextjs`.
- `next build` currently emits avoidable Sentry setup warnings about `onRequestError`, missing global error handling, deprecated `disableLogger`, and client instrumentation naming.
- The installed Sentry SDK exports `captureRequestError`, `captureRouterTransitionStart`, and the replacement `webpack.treeshake.removeDebugLogging` option.
- There is no PostHog or consent dependency in `package.json`.
- Quiz answers and match results include sensitive relocation preferences such as passport, budget, household, healthcare, and non-negotiables. These must not be sent raw to analytics or error telemetry.

## Scope

MODIFY:
- `next.config.ts`
- `instrumentation.ts`
- `sentry.client.config.ts` only if retained for compatibility
- `sentry.server.config.ts`
- `sentry.edge.config.ts`
- `instrumentation-client.ts` if adopting the Next.js 15/Sentry preferred client entrypoint
- `src/app/global-error.tsx` if needed for Sentry React render error capture
- `.env.example` if observability environment documentation is incomplete
- `src/components/App.tsx` only if adding privacy-safe funnel events
- `src/components/ResultsView.tsx` only if adding privacy-safe funnel events
- `src/app/api/match/route.ts`, `src/app/api/whatif/route.ts`, or `src/app/api/results/[token]/route.ts` only if adding safe server-side error capture without raw request bodies
- Focused tests next to touched code, using existing test locations where possible
- `docs/PHASE_REVIEW_CHECKLIST.md`

CREATE IF USEFUL:
- `src/lib/telemetry.ts` or `src/lib/analytics.ts` for one small privacy-safe wrapper
- `src/lib/__tests__/telemetry.test.ts` or equivalent focused tests
- `docs/soft-beta-observability-privacy.md` for the final soft-beta telemetry/privacy decision record

DO NOT TOUCH:
- `src/lib/data/countries.ts`
- `src/lib/__tests__/data.test.ts`
- `src/lib/schema/**`
- `src/lib/engine.ts`
- `fixtures/**`
- `archive/**`
- Visa pathway records
- Country scores, costs, descriptors, dimensions, capitals, currencies, or legal/immigration claims
- Share/read-only behavior except for privacy-safe telemetry around share attempts
- Performance/device-matrix work; that belongs to Phase 9
- Prototype parity polish; that belongs to Phase 11

Do not add a new analytics vendor package in this phase without explicit approval. If PostHog/cookie consent is not already configured and approved, explicitly defer it in the docs instead of adding it.

## Required Work

Keep edits surgical. Do not redesign UI surfaces.

1. **Sentry setup warnings**
   - Fix avoidable Next.js/Sentry setup warnings that are in scope for the current SDK version.
   - Move the client `Sentry.init()` from `sentry.client.config.ts` into root `instrumentation-client.ts`, or otherwise follow the SDK's current file convention without double-initializing Sentry.
   - Export `onRouterTransitionStart = Sentry.captureRouterTransitionStart` from `instrumentation-client.ts` if client instrumentation is moved there.
   - Add `export const onRequestError = Sentry.captureRequestError` in `instrumentation.ts` using the installed SDK export.
   - Add a minimal app-router `src/app/global-error.tsx` boundary that captures render errors with Sentry and preserves a usable fallback UI.
   - Replace deprecated `disableLogger: true` in `next.config.ts` with `webpack: { treeshake: { removeDebugLogging: true } }`.
   - Do not suppress warnings with environment variables unless a warning is intentionally deferred and documented.

2. **Privacy-safe error capture**
   - Add Sentry `beforeSend`/event filtering where appropriate so raw profile data, passports, budget values, healthcare answers, household details, tokens, and localStorage snapshots are not transmitted.
   - Do not attach raw request bodies, full match payloads, or quiz answers to Sentry events.
   - If server routes capture errors, capture sanitized tags or coarse context only.
   - Avoid logging raw profiles to console in production paths.

3. **Analytics decision**
   - Do not add PostHog unless the repo already has the package/config or explicit approval is given.
   - If analytics is deferred, record that decision and why in a concise doc or checklist note.
   - If you add first-party funnel event wrappers, they must be no-op unless explicitly configured and must send only event names plus coarse non-sensitive metadata.

4. **Core funnel events, if implemented**
   - Allowed event names: `quiz_started`, `quiz_completed`, `results_viewed`, `deep_dive_opened`, `what_if_used`, `share_attempted`.
   - Allowed metadata examples: match count bucket, read-only boolean, share availability boolean.
   - Forbidden metadata examples: passport/citizenship, budget number, exact country list, answers, household details, healthcare details, token/session id, raw profile, localStorage contents.

5. **Environment documentation**
   - Update `.env.example` with observability variables that the app actually reads.
   - Do not include secrets.
   - Make clear that `NEXT_PUBLIC_SENTRY_DSN` is optional for local development.
   - Do not document Sentry upload/source-map secrets unless the implementation actually reads them.

## Required Tests

Add or update focused tests. Tests must fail for the exact bug classes this phase covers and include at least one negative assertion.

Required coverage:
- Sanitization removes or redacts sensitive keys such as `passport`, `budget`, `healthcare`, `household`, `sessionToken`, `token`, `answers`, and `profile`.
- Privacy-safe telemetry wrappers, if added, do not emit raw profile fields.
- Funnel event helpers, if added, allow only approved event names and approved metadata.
- Existing results/share/What-If tests still pass.
- If route handlers add Sentry capture calls, tests or mocks prove they do not capture raw request bodies.

Use existing Vitest style. Keep mocks small and deterministic.

## Browser QA

Required.

Run the app locally and complete focused browser smoke tests:

1. Start the app without Sentry DSN configured.
2. Complete the quiz into results.
3. Open a Deep Dive.
4. Use What-If once.
5. Attempt sharing in the current local environment.
6. Confirm the UI still works when observability env vars are absent.
7. Confirm browser console has no new runtime errors.
8. Confirm server logs have no unexpected `4xx`/`5xx` responses and do not print raw quiz/profile payloads.

If Sentry DSN or analytics credentials are not available locally, document that live-provider verification was not possible and verify the disabled/no-op path instead.

## Acceptance

Run these commands in order. Do not skip any.

```bash
git diff --check
git status --short --branch
git diff --name-status main...HEAD
ALLOWED_FILES="next.config.ts,instrumentation.ts,sentry.client.config.ts,sentry.server.config.ts,sentry.edge.config.ts,instrumentation-client.ts,src/app/global-error.tsx,src/components/App.tsx,src/components/ResultsView.tsx,src/app/api/match/route.ts,src/app/api/whatif/route.ts,src/app/api/results/[token]/route.ts,src/lib/telemetry.ts,src/lib/analytics.ts,src/lib/__tests__/telemetry.test.ts,src/lib/__tests__/analytics.test.ts,.env.example,docs/PHASE_REVIEW_CHECKLIST.md,docs/soft-beta-observability-privacy.md" FORBIDDEN_FIELDS="src/lib/data/countries.ts,src/lib/__tests__/data.test.ts,src/lib/schema,src/lib/engine.ts,fixtures,archive,docs/visa-trust-audit.md,docs/ROADMAP.md" npm run verify:phase
npm test
npm run build
npm run lint
```

Then fill out `docs/PHASE_REVIEW_CHECKLIST.md` completely under a new section:

```md
### soft-beta/8 - Observability, Privacy, And Compliance
```

Before reporting complete:

1. `git diff --check` exits 0.
2. `git status --short --branch` shows `soft-beta/8-observability-privacy` and no uncommitted files.
3. `git diff --name-status main...HEAD` output contains only files in the MODIFY/CREATE lists above, explicitly approved optional files, or justified scope exceptions.
4. Every changed file appears in the `ALLOWED_FILES` value used for `verify:phase`.
5. `npm run verify:phase` exits 0 after all intended files are committed.
6. `npm test` exits 0. Paste the final `N passed` line verbatim.
7. `npm run build` exits 0 and no longer shows avoidable Sentry setup warnings that were addressed by this phase. If a warning remains, explain why.
8. `npm run lint` exits 0.
9. Browser QA notes are included, including whether live Sentry verification was possible.
10. `docs/PHASE_REVIEW_CHECKLIST.md` is filled out completely.
11. Any analytics deferral or no-op behavior is documented clearly.

Do not report complete until all of the above are satisfied.
