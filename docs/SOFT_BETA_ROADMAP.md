# Soft Beta Roadmap

This is the handoff source for the soft-beta launch sequence. It is separate from
`docs/ROADMAP.md`, which tracks the earlier launch/data roadmap.

## Current Checkout Status

Current local `main` is ahead of `origin/main` and includes merged soft-beta work through:

- Phase 3 — Integration Hotfixes
- Phase 4 — Accessibility And Interaction Polish
- Phase 5 — Globe Stability Hardening
- Phase 10A — Visa Trust Audit Report
- Phase 10B — Visa Pathway Restoration
- Phase 10C — Visa Trust UI Polish

The remaining planned tracks are:

- Phase 6 — Results UX And Trust Polish
- Phase 7 — Sharing And Deploy Readiness
- Phase 8 — Observability, Privacy, And Compliance
- Phase 9 — Performance Budget And Device Matrix
- Phase 11 — Prototype Parity And Product Polish
- Phase 12 — Soft Beta Launch Gate

Before starting a new phase, sync/confirm the intended base branch. The root checkout is the canonical
`main` worktree for this project.

## Operating Model

- Codex writes Gemini prompts from `docs/phase-prompt-template.md`.
- Gemini implements, tests, commits, and fills `docs/PHASE_REVIEW_CHECKLIST.md`.
- Codex reviews code, reruns tests/build/lint, does browser QA, and checks server logs.
- Gemini handles follow-up fixes.
- Codex accepts and updates the relevant docs.
- If parallel tracks touch the same files, merge one first, sync `main`, then rebase or restart the other from fresh `main`.

Every Gemini phase prompt must include:

> Do not report complete until browser QA exercises the real app path affected by this phase and confirms no unexpected console errors or server 4xx/5xx responses.

## Completed Phases

### Phase 3 — Integration Hotfixes

Branch: `soft-beta/3-integration-hotfixes`

Status: accepted at `94bc702`.

Goal: fix real browser/runtime failures found in QA.

Delivered:
- Fixed `/api/whatif` 400s by passing a complete runtime profile to `ResultsView`.
- Persisted `languages` and `locale` with the effective profile used for match and What-If.
- Added What-If API error state in the UI.
- Added integration tests through `App` -> `ResultsView` -> `/api/whatif`.
- Added regression coverage for non-negotiables like `lowTax`.
- Fixed the interim `/api/match` stale-closure 400 by passing updated answers into the step-6 interim match request.

Acceptance evidence:
- Browser: full quiz -> interim reveal -> results -> What-If -> toggle `lowTax`.
- Server logs: `/api/match` and `/api/whatif` returned 200 with no unexpected 4xx/5xx.

### Phase 4 — Accessibility And Interaction Polish

Branch: `soft-beta/4-accessibility-interactions`

Status: merged into local `main`.

Goal: make core UI soft-beta respectable for keyboard and screen-reader users.

Delivered scope:
- Accessible names for icon-only buttons and controls.
- Escape-to-close behavior for modal surfaces.
- Focus management/focus return work for modals.
- Retake path and interaction coverage.
- Browser keyboard smoke through core flow.

Reference: `docs/PHASE_REVIEW_CHECKLIST.md`, section `soft-beta/4`.

### Phase 5 — Globe Stability Hardening

Branch: `soft-beta/5-globe-stability`

Status: merged into local `main`.

Goal: keep visual richness without WebGL harming the product.

Delivered scope:
- WebGL fallback and stability improvements.
- Visibility/reduced-motion pause behavior.
- Globe lifecycle cleanup coverage where practical.
- Browser QA for the live app path.

Reference: `docs/PHASE_REVIEW_CHECKLIST.md`, section `soft-beta/5`.

### Phase 10A — Visa Trust Audit Report

Branch: `soft-beta/10a-visa-trust-audit`

Status: merged into local `main`.

Goal: identify visa trust gaps without destabilizing the app.

Delivered:
- Added `docs/visa-trust-audit.md`.
- Kept the phase report-only.
- Identified data regressions and implementation backlog for restored visa pathways.

Reference: `docs/visa-trust-audit.md` and `docs/PHASE_REVIEW_CHECKLIST.md`, section `soft-beta/10A`.

### Phase 10B — Visa Pathway Restoration

Branch: `soft-beta/10b-visa-pathway-restore`

Status: merged into local `main`.

Goal: restore missing structured visa pathways identified by Phase 10A.

Delivered scope:
- Restored verified visa pathways for audited P0/P1 countries.
- Updated data tests.
- Updated `docs/visa-trust-audit.md` backlog checkboxes.

Hard constraints retained:
- Do not edit scores, cost fields, descriptors, dimensions, or match narrative unless explicitly scoped.
- Do not invent legal/visa facts.
- Official or authorized visa sources are required for any new visa claim.

Reference: `docs/PHASE_REVIEW_CHECKLIST.md`, section `soft-beta/10B`.

### Phase 10C — Visa Trust UI Polish

Branch: `soft-beta/10c-visa-trust-ui`

Status: merged into local `main`.

Goal: make the Visa Guide UI communicate source-backed confidence clearly.

Delivered scope:
- Replaced bare source links with source-verified badges where pathway source data exists.
- Added semantic `time` display for `lastVerified`.
- Replaced "Coming soon" empty visa copy with clearer "not verified in-app yet" language.
- Added loading/error accessibility improvements in Deep Dive.
- Verified Spain with structured pathways and Georgia with an unverified/empty state via real app path.

Reference: `docs/PHASE_REVIEW_CHECKLIST.md`, section `soft-beta/10C`.

## Remaining Phases

### Phase 6 — Results UX And Trust Polish

Goal: make results feel complete, not beta-fragile.

Scope:
- Improve empty and error states for Results, Deep Dive, and What-If.
- Keep Visa Guide labeling honest after the Phase 10B/10C data/UI changes.
- Verify `hasVisaData` behavior against actual `/api/countries/[code]`.
- Improve "Show more matches" state/count, for example "Show 10 more of 153".
- Add tests for visa gating and Deep Dive placeholders.

Acceptance:
- Browser: top match Deep Dive, Visa Guide, eliminated panel, show more, and error handling.
- Check browser console and server logs.

Dependency note:
- Run from current `main`, because Phase 10B/10C changed visa data and Deep Dive behavior.

### Phase 7 — Sharing And Deploy Readiness

Goal: make share/read-only flows dependable.

Scope:
- Confirm Redis environment behavior in local and deployed mode.
- Verify `/r/[token]` read-only results.
- Improve disabled share copy when Redis is unavailable.
- Decide PNG export: implement a real share card or remove/de-emphasize the CTA until V1.1.
- Add tests for share-ready and read-only mode.

Acceptance:
- Browser with envs missing: graceful disabled share.
- Browser with envs present, if available: create share link, open `/r/[token]`, confirm read-only result.
- Check browser console and server logs.

### Phase 8 — Observability, Privacy, And Compliance

Goal: give soft beta safe visibility without leaking sensitive profile data.

Scope:
- Fix Sentry Next.js warnings if in scope: `onRequestError`, `global-error`, updated client instrumentation naming.
- Add safe client/server error capture without logging raw profiles.
- Add PostHog/cookie consent only if ready; otherwise explicitly defer.
- Add analytics events for core funnel only: quiz started, completed, results viewed, Deep Dive opened, What-If used, share attempted.
- Add privacy checks so passport, budget, and raw profile data are not sent to analytics.

Acceptance:
- Review analytics/error payloads.
- Browser: consent behavior if analytics is enabled.
- Build should no longer show avoidable Sentry setup warnings if Phase 8 includes Sentry setup.

### Phase 9 — Performance Budget And Device Matrix

Goal: prove the app is smooth enough for soft beta.

Scope:
- Add basic performance instrumentation or a manual QA script.
- Define budgets: landing interactive, quiz step latency, results render, What-If response.
- Run desktop, tablet, and mobile viewport checks.
- Confirm no external globe texture/network dependency.
- Add lightweight Playwright/browser smoke only if the project wants e2e tests.

Acceptance:
- Browser/device matrix recorded.
- Server logs and console logs checked.
- Remaining WebGL concerns recorded explicitly.

Dependency note:
- Run after Phases 6, 7, and 8 if those phases touch main user flows or instrumentation.

### Phase 11 — Prototype Parity And Product Polish

Goal: compare against the intended prototype/PRD and close the highest-impact experience gaps.

Scope:
- Compare current app against prototype/PRD for landing, quiz, globe, interim reveal, results, Deep Dive, and share.
- Produce a gap report first.
- Implement only approved P0/P1 polish after the gap report is accepted.
- Improve misleading copy where needed, such as live country counter, What-If feedback, or share/PNG language.
- Add final `docs/soft-beta-known-limitations.md`.

Acceptance:
- Browser walkthrough across core flows.
- Confirm no unapproved product expansion.
- Check browser console and server logs.

Dependency note:
- Do not run early. Phase 11 depends on the product surface settling after Phases 6, 7, 8, and 9.

### Phase 12 — Soft Beta Launch Gate

Goal: final release candidate decision.

Scope:
- Run full verification.
- Fill the launch checklist.
- Update docs to reflect completed soft-beta phases.
- Create `docs/SOFT_BETA_READINESS.md`.
- Record open risks and the ship/hold recommendation.

Acceptance:
- Full browser QA.
- `npm test`
- `npm run build`
- `npm run lint`
- `npm run verify:phase` when applicable.
- Review open risks.
- Decision recorded: ship soft beta or hold.

Dependency note:
- Run only after all previous soft-beta phases are merged and accepted.

## Suggested Remaining Sequence

Parallelism is still possible, but avoid file collisions:

1. Run Phase 6 and Phase 7 in parallel only if their prompts define disjoint write scopes.
2. Run Phase 8 in parallel with Phase 7 if analytics/Sentry files do not overlap sharing/read-only files.
3. Run Phase 9 after Phases 6, 7, and 8 so performance measurements reflect the near-final surface.
4. Run Phase 11 after Phase 9.
5. Run Phase 12 last.

If in doubt, prefer clean serial merges over parallel branches that both rewrite `ResultsView`, `App`, or shared CSS.
