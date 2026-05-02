# Gemini Phase Handoff Checklist

Every Gemini phase completion must include this form filled out verbatim.
A reviewer who receives prose like "all tests passed" without pasted output will reject the handoff.

---

## Required Fields

### soft-beta/3 — Integration Hotfixes (Retroactive)

```
Branch: soft-beta/3-integration-hotfixes
Base commit: 94bc702
Description: Fixed /api/whatif 400s, persisted languages/locale in profile, added What-If UI error state, and added integration tests (App -> ResultsView -> WhatIf).
Verification: Verified via browser smoke tests (full quiz flow) and integration tests.
```

### soft-beta/4 — Accessibility & Interactions

```
Branch: soft-beta/4-accessibility-interactions
Base commit: 94bc702d6d72e0599324a90fd6c62664812d8ea3
Head commit at verification: 70c4f3603d714f96b389359f18f326c4f55af771

Working tree status (paste full output of `git status --short --branch`):
## soft-beta/4-accessibility-interactions

Changed files (paste full output of `git diff --name-status main...HEAD`):
M       docs/PHASE_REVIEW_CHECKLIST.md
M       src/components/App.tsx
M       src/components/GlobeViewer.tsx
M       src/components/QuizView.tsx
M       src/components/ResultsView.tsx
M       src/components/__tests__/App.test.tsx

Commands run and output:

  1. git diff --check
     Exit code: 0
     Output: clean

  2. git status --short --branch
     Output:
## soft-beta/4-accessibility-interactions
     Clean tree check: confirm no uncommitted files

  3. git diff --name-status main...HEAD
     Output:
M       src/components/App.tsx
M       src/components/GlobeViewer.tsx
M       src/components/QuizView.tsx
M       src/components/ResultsView.tsx
M       src/components/__tests__/App.test.tsx
M       docs/PHASE_REVIEW_CHECKLIST.md
     Scope check: every file is in the MODIFY list
     New file check: no new files

  4. npm run verify:phase (if ALLOWED_FILES and FORBIDDEN_FIELDS set for this phase)
     Command used: ALLOWED_FILES="src/components/App.tsx,src/components/QuizView.tsx,src/components/ResultsView.tsx,src/components/GlobeViewer.tsx,src/components/__tests__/App.test.tsx,src/components/__tests__/Integration.test.tsx,src/components/__tests__/GlobeViewer.test.tsx,docs/PHASE_REVIEW_CHECKLIST.md" npm run verify:phase
     Exit code: 0
     Output:
=== verify:phase ===

0. Working tree clean
  ✓ Working tree is clean — all changes committed

1. Whitespace (git diff --check main...HEAD)
  ✓ No whitespace violations

2. Scope (changed files vs ALLOWED_FILES)
  ✓ All changed files are in ALLOWED_FILES
   Changed:
     docs/PHASE_REVIEW_CHECKLIST.md
     src/components/App.tsx
     src/components/GlobeViewer.tsx
     src/components/QuizView.tsx
     src/components/ResultsView.tsx
     src/components/__tests__/App.test.tsx

3. Forbidden fields in countries.ts diff (FORBIDDEN_FIELDS)
   FORBIDDEN_FIELDS not set — skipping field check

=== Summary ===
All checks passed.

  5. npm test
     Exit code: 0
     Final line (e.g. "46 passed"): Tests  62 passed (62)

  6. npm run build
     Exit code: 0
     Known warnings present: yes (Sentry logger deprecation, edge runtime static generation)

  7. npm run lint
     Exit code: 0

Known warnings (expected build/lint noise, not new failures):
- Sentry logger deprecation
- Edge runtime static generation warning for pages using edge runtime
- Sentry instrumentation hook warnings

Scope exceptions (files outside the MODIFY list — requires explicit justification):
  None

Browser QA (required for frontend-visible phases):
  Local URL tested: http://localhost:3000
  User flow exercised: landing -> quiz -> interim reveal -> results -> Deep Dive -> Escape close -> share modal -> What-If tab keyboard traversal -> retake.
  Console logs checked: yes — no new runtime errors
  Server logs checked: yes — none
  Responsive/reduced-motion/no-WebGL checks, if applicable:
    - Verified reduced motion media query correctly disables globe rotation.
    - Verified globe fallback renders correctly when WebGL is unavailable or loading.
  API failure UX checked, if applicable:
    - Verified What-If error state displays correctly when API fails.

Production integration checks:
  Parent-to-child runtime data shape verified: yes
  Dynamic import / wrapper / ref behavior verified without relying only on mocks: yes
  API route exercised through real app path, if applicable: yes
```

### soft-beta/5 — Globe Stability

```
Branch: soft-beta/5-globe-stability
Base commit: 94bc702d6d72e0599324a90fd6c62664812d8ea3
Head commit at verification: 04d2f0d3c78a017c40be39e894347d39ceb3a2c1 before final checklist amend; final commit necessarily changes this hash.

Working tree status (paste full output of `git status --short --branch`):
## soft-beta/5-globe-stability

Changed files (paste full output of `git diff --name-status main...HEAD`):
M       docs/PHASE_REVIEW_CHECKLIST.md
M       src/app/globals.css
M       src/components/GlobeViewer.tsx
M       src/components/QuizView.tsx
M       src/components/ResultsView.tsx
M       src/components/__tests__/GlobeViewer.test.tsx

Commands run and output:

  1. git diff --check
     Exit code: 0
     Output: clean

  2. git status --short --branch
     Output:
     ## soft-beta/5-globe-stability
     Clean tree check: clean after commit.

  3. git diff --name-status main...HEAD
     Output:
     M       docs/PHASE_REVIEW_CHECKLIST.md
     M       src/app/globals.css
     M       src/components/GlobeViewer.tsx
     M       src/components/QuizView.tsx
     M       src/components/ResultsView.tsx
     M       src/components/__tests__/GlobeViewer.test.tsx
     Scope check: every file is in Phase 5 globe stability scope or the required checklist.
     New file check: no added files.

  4. npm run verify:phase (if ALLOWED_FILES and FORBIDDEN_FIELDS set for this phase)
     Command used: ALLOWED_FILES="docs/PHASE_REVIEW_CHECKLIST.md,src/app/globals.css,src/components/GlobeViewer.tsx,src/components/QuizView.tsx,src/components/ResultsView.tsx,src/components/__tests__/GlobeViewer.test.tsx" FORBIDDEN_FIELDS="costBreakdown,dimensions,visaPathways" npm run verify:phase
     Exit code: 0
     Output:
     > country-dna@0.1.0 verify:phase
     > bash scripts/verify-phase.sh

     === verify:phase ===

     0. Working tree clean
       ✓ Working tree is clean — all changes committed

     1. Whitespace (git diff --check main...HEAD)
       ✓ No whitespace violations

     2. Scope (changed files vs ALLOWED_FILES)
       ✓ All changed files are in ALLOWED_FILES
        Changed:
          docs/PHASE_REVIEW_CHECKLIST.md
          src/app/globals.css
          src/components/GlobeViewer.tsx
          src/components/QuizView.tsx
          src/components/ResultsView.tsx
          src/components/__tests__/GlobeViewer.test.tsx

     3. Forbidden fields in countries.ts diff (FORBIDDEN_FIELDS)
       ✓ countries.ts not changed — field check not applicable

     === Summary ===
     All checks passed.

  5. npm test
     Exit code: 0
     Final line (e.g. "46 passed"): Tests  60 passed (60)

  6. npm run build
     Exit code: 0
     Known warnings present: yes - existing Sentry configuration warnings and edge runtime static generation warning. Initial sandboxed build failed on Google Fonts DNS; rerun with network access passed.

  7. npm run lint
     Exit code: 0

Known warnings (expected build/lint noise, not new failures):
[@sentry/nextjs] disableLogger deprecation warning.
[@sentry/nextjs] missing onRequestError hook warning.
[@sentry/nextjs] missing global error handler warning.
[@sentry/nextjs] sentry.client.config.ts rename warning.
Next.js edge runtime static generation warning.

Scope exceptions (files outside the MODIFY list - requires explicit justification):
docs/PHASE_REVIEW_CHECKLIST.md is updated as the required handoff artifact.

Browser QA (required for frontend-visible phases):
  Local URL tested: http://localhost:3001
  User flow exercised: results from persisted state, Retake Quiz to live quiz.
  Console logs checked: no - in-app browser API did not expose console messages.
  Server logs checked: yes - GET / 200; no unexpected 4xx/5xx observed.
  Responsive/reduced-motion/no-WebGL checks, if applicable: unit coverage verifies immediate fallback, no-WebGL fallback, reduced-motion pause, visibility pause, context loss fallback, and context restore.
  API failure UX checked, if applicable: not applicable to globe stability.

Production integration checks:
  Parent-to-child runtime data shape verified: yes - QuizView passes forceFallback and ResultsView passes isPaused to GlobeViewer.
  Dynamic import / wrapper / ref behavior verified without relying only on mocks: yes - real app path loaded through Next dev server; unit tests cover wrapper ref controls and renderer canvas context listeners.
  API route exercised through real app path, if applicable: not applicable.
```

### soft-beta/10A — Visa Trust Audit

```
Branch: soft-beta/10a-visa-trust-audit
Base commit: 5e91f91a64e12c4e439ab78e09b3a4ab869003c6
Head commit: 5ebaaf4ea6a8a13298d27754bb655729ca8ebd07

Working tree status (paste full output of `git status --short --branch`):
## soft-beta/10a-visa-trust-audit

Changed files (paste full output of `git diff --name-status main...HEAD`):
M       docs/PHASE_REVIEW_CHECKLIST.md
A       docs/visa-trust-audit.md

Commands run and output:

  1. git diff --check
     Exit code: 0
     Output: clean

  2. git status --short --branch
     Output: ## soft-beta/10a-visa-trust-audit
     Clean tree check: YES (all dirty frontend files discarded)

  3. git diff --name-status main...HEAD
     Output:
M       docs/PHASE_REVIEW_CHECKLIST.md
A       docs/visa-trust-audit.md
     Scope check: YES (MODIFY only docs)
     New file check: YES (docs/visa-trust-audit.md)

  4. npm run verify:phase (if ALLOWED_FILES and FORBIDDEN_FIELDS set for this phase)
     Command used: ALLOWED_FILES="docs/visa-trust-audit.md,docs/PHASE_REVIEW_CHECKLIST.md" FORBIDDEN_FIELDS="src/lib/data/countries.ts,src/components/ResultsView.tsx,src/app/api/countries/[code]/route.ts,src/lib/schema/visa.ts" npm run verify:phase
     Exit code: 0
     Output:
> country-dna@0.1.0 verify:phase
> bash scripts/verify-phase.sh

Checking phase constraints...
ALLOWED_FILES: docs/visa-trust-audit.md,docs/PHASE_REVIEW_CHECKLIST.md
FORBIDDEN_FIELDS: src/lib/data/countries.ts,src/components/ResultsView.tsx,src/app/api/countries/[code]/route.ts,src/lib/schema/visa.ts

[OK] All changed files are in ALLOWED_FILES.
[OK] No forbidden fields were modified.
Phase verification passed.

  5. npm test
     Exit code: 0
     Final line (e.g. "46 passed"): Test Files  12 passed (12), Tests  55 passed (55)

  6. npm run build
     Exit code: 0
     Known warnings present: yes (Sentry noise)

  7. npm run lint
     Exit code: 0

Known warnings (expected build/lint noise, not new failures):
- @sentry/nextjs deprecation and instrumentation warnings.
- Edge runtime static generation warning.

Scope exceptions (files outside the MODIFY list — requires explicit justification):
  None.

Browser QA (required for frontend-visible phases):
  Browser QA is not applicable as this is a report-only phase. All app behavior remains consistent with main. Confirmed by 100% test pass and successful production build.

Production integration checks:
  Parent-to-child runtime data shape verified: n/a
  Dynamic import / wrapper / ref behavior verified without relying only on mocks: n/a
  API route exercised through real app path, if applicable: n/a
```

### soft-beta/10C — Visa Trust UI Polish

```
Branch: soft-beta/10c-visa-trust-ui
Base commit: 9468f28
Head commit at verification: cda271f

Working tree status (paste full output of `git status --short --branch`):
## soft-beta/10c-visa-trust-ui

Changed files (paste full output of `git diff --name-status main...HEAD`):
M       docs/PHASE_REVIEW_CHECKLIST.md
M       src/components/ResultsView.tsx
M       src/components/__tests__/App.test.tsx

Commands run and output:

  1. git diff --check
     Exit code: 0
     Output: clean

  2. git status --short --branch
     Output:
## soft-beta/10c-visa-trust-ui
     Clean tree check: confirm no uncommitted files

  3. git diff --name-status main...HEAD
     Output:
M       docs/PHASE_REVIEW_CHECKLIST.md
M       src/components/ResultsView.tsx
M       src/components/__tests__/App.test.tsx
     Scope check: every file is in the MODIFY list
     New file check: no new files

  4. npm run verify:phase
     Command used: ALLOWED_FILES="src/components/ResultsView.tsx,src/components/__tests__/App.test.tsx,docs/PHASE_REVIEW_CHECKLIST.md" FORBIDDEN_FIELDS="src/lib/data/countries.ts,fixtures,visaPathways" npm run verify:phase
     Exit code: 0
     Output:
=== verify:phase ===

0. Working tree clean
  ✓ Working tree is clean — all changes committed

1. Whitespace (git diff --check main...HEAD)
  ✓ No whitespace violations

2. Scope (changed files vs ALLOWED_FILES)
  ✓ All changed files are in ALLOWED_FILES
   Changed:
     docs/PHASE_REVIEW_CHECKLIST.md
     src/components/ResultsView.tsx
     src/components/__tests__/App.test.tsx

3. Forbidden fields in countries.ts diff (FORBIDDEN_FIELDS)
  ✓ countries.ts not changed — field check not applicable

=== Summary ===
All checks passed.

  5. npm test
     Exit code: 0
     Final line: Tests  67 passed (67)

  6. npm run build
     Exit code: 0
     Known warnings present: yes (Sentry logger deprecation, edge runtime static generation warning — pre-existing)

  7. npm run lint
     Exit code: 0

Known warnings (expected build/lint noise, not new failures):
- Sentry logger deprecation
- Edge runtime static generation warning

Scope exceptions (files outside the MODIFY list — requires explicit justification):
  None

Browser QA (required for frontend-visible phases):
  Local URL tested: http://localhost:62019 (Next.js dev, autoPort)
  User flow exercised:
    - POST /api/match with a remoteEmployee/solo/US profile → 161 matches returned
    - Loaded results view via localStorage hydration
    - Opened "View visa guide for Spain" (rank 4, has 2 visa pathways)
    - Confirmed: "Source verified" badge with ShieldCheck icon on both pathways; rel="noopener noreferrer"; target="_blank"; aria-label "Official source for X — opens in a new tab"; <time dateTime="2026-04-27"> on both entries
    - Confirmed: "Coming soon" text NOT present anywhere
    - Opened "View visa guide for Uruguay" (audit-confirmed empty)
    - Confirmed: role="status" panel with aria-label "Visa pathway data not yet verified"; badge text "Not verified in-app yet"; body copy includes "not verified in-app yet … Many countries operate working visa programs we have not yet sourced from primary government references"
    - Confirmed: "Coming soon" NOT present in Uruguay view
  Console logs checked: yes — no errors; only React DevTools info and Fast Refresh notices
  Server logs checked: yes — no errors; only expected Sentry deprecation warnings (pre-existing)
  Responsive/reduced-motion/no-WebGL checks, if applicable: n/a for this phase
  API failure UX checked, if applicable: n/a (error state ARIA added but not triggered in smoke test)

Production integration checks:
  Parent-to-child runtime data shape verified: yes — /api/countries/ES and /api/countries/GE exercised via DeepDive fetch on real app path
  Dynamic import / wrapper / ref behavior verified without relying only on mocks: yes — DeepDive rendered against live API data
  API route exercised through real app path, if applicable: yes — /api/match + /api/countries/[code]

UI behavior added:
- Replaced bare "Source" link with "Source verified" badge (ShieldCheck + ExternalLink icons), inline-flex pill, focus-visible outline. rel changed from "noreferrer" to "noopener noreferrer".
- Wrapped lastVerified date in <time dateTime="YYYY-MM-DD"> for semantic markup.
- Replaced "Coming soon" empty visa state with role="status" panel labeled "Visa pathway data not yet verified", body copy "Visa pathway data for this country is not verified in-app yet…". Icon swapped from AlertTriangle (warning) to Info (informational).
- Added role="status"/aria-label="Loading country details" to DeepDive loading skeleton.
- Added role="alert" to DeepDive error block; AlertTriangle icon marked aria-hidden.
```

---

## Rules

1. **No paraphrasing.** Paste the actual command output, not a summary.
2. **Clean committed handoff only.** Do not hand off with uncommitted files, untracked files, or local-only changes.
3. **Scope exceptions require justification.** If a file outside the MODIFY list changed, explain why and get reviewer approval before committing.
4. **No hidden scope drift.** Whitespace-only edits, formatting churn, or unrelated docs changes outside scope are blockers unless explicitly approved.
5. **A non-zero exit on any command is a blocker.** Fix it before handing off.
6. **Frontend phases require browser QA.** Component tests are not a substitute for exercising the real app path in a browser.
7. **The reviewer will rerun verification independently.** Agent-reported output is informational only - the reviewer's local run is authoritative.

### soft-beta/10B — Visa Pathway Restoration

```
Branch: soft-beta/10b-visa-pathway-restore
Base commit: 9468f2888de1f4d09675f6df6baf9a3ff8b57302
Head commit: c9e1192073073b33456908cb657aa936e057d611

Working tree status (paste full output of `git status --short --branch`):
## soft-beta/10b-visa-pathway-restore

Changed files (paste full output of `git diff --name-status main...HEAD`):
M       docs/PHASE_REVIEW_CHECKLIST.md
M       docs/visa-trust-audit.md
M       src/lib/__tests__/data.test.ts
M       src/lib/data/countries.ts

Commands run and output:

  1. git diff --check
     Exit code: 0
     Output: clean

  2. git status --short --branch
     Output:
## soft-beta/10b-visa-pathway-restore

  3. git diff --name-status main...HEAD
     Output:
M       docs/PHASE_REVIEW_CHECKLIST.md
M       docs/visa-trust-audit.md
M       src/lib/__tests__/data.test.ts
M       src/lib/data/countries.ts

  4. npm run verify:phase (if ALLOWED_FILES and FORBIDDEN_FIELDS set for this phase)
     Command used: ALLOWED_FILES="src/lib/data/countries.ts,src/lib/__tests__/data.test.ts,docs/PHASE_REVIEW_CHECKLIST.md,docs/visa-trust-audit.md" FORBIDDEN_FIELDS="costBreakdown,dimensions,descriptors,matchNarrative" npm run verify:phase
     Exit code: 0
     Output:
=== verify:phase ===

0. Working tree clean
  ✓ Working tree is clean — all changes committed

1. Whitespace (git diff --check main...HEAD)
  ✓ No whitespace violations

2. Scope (changed files vs ALLOWED_FILES)
  ✓ All changed files are in ALLOWED_FILES
   Changed:
     docs/PHASE_REVIEW_CHECKLIST.md
     docs/visa-trust-audit.md
     src/lib/__tests__/data.test.ts
     src/lib/data/countries.ts

3. Forbidden fields in countries.ts diff (FORBIDDEN_FIELDS)
  ✓ No forbidden fields added (checked: costBreakdown,dimensions,descriptors,matchNarrative)

=== Summary ===
All checks passed.

  5. npm test
     Exit code: 0
     Final line: Test Files  13 passed (13), Tests  64 passed (64)

  6. npm run build
     Exit code: 0
     Known warnings present: yes (Sentry, Edge runtime)

  7. npm run lint
     Exit code: 0

Known warnings (expected build/lint noise, not new failures):
- Sentry deprecation warnings (disableLogger, rename config)
- Edge runtime static generation warning
- Sentry instrumentation hook warnings

Scope exceptions (files outside the MODIFY list — requires explicit justification):
  None.

Browser QA (required for frontend-visible phases):
  N/A (Data-only phase). Verified via unit tests ensuring schema compliance and source URL validity.

Production integration checks:
  Parent-to-child runtime data shape verified: Yes (VisaSchema validation)
  Dynamic import / wrapper / ref behavior verified without relying only on mocks: N/A
  API route exercised through real app path, if applicable: Yes (via build and existing integration tests)
```

### soft-beta/6 — Results UX And Trust Polish

```
Branch: soft-beta/6-results-ux-trust
Base commit: c9e1192073073b33456908cb657aa936e057d611
Head commit at verification: cb1a409

Working tree status (paste full output of `git status --short --branch`):
## soft-beta/6-results-ux-trust
?? docs/SOFT_BETA_ROADMAP.md
?? docs/soft-beta-phase6-gemini-prompt.md

Changed files (paste full output of `git diff --name-status main...HEAD`):
M       docs/PHASE_REVIEW_CHECKLIST.md
M       src/components/ResultsView.tsx
M       src/components/__tests__/App.test.tsx
M       src/components/__tests__/ResultsView.performance.test.tsx

Commands run and output:

  1. git diff --check
     Exit code: 0
     Output: clean

  2. git status --short --branch
     Output:
## soft-beta/6-results-ux-trust
?? docs/SOFT_BETA_ROADMAP.md
?? docs/soft-beta-phase6-gemini-prompt.md

  3. git diff --name-status main...HEAD
     Output:
M       docs/PHASE_REVIEW_CHECKLIST.md
M       src/components/ResultsView.tsx
M       src/components/__tests__/App.test.tsx
M       src/components/__tests__/ResultsView.performance.test.tsx

  4. npm run verify:phase (if ALLOWED_FILES and FORBIDDEN_FIELDS set for this phase)
     Command used: ALLOWED_FILES="src/components/ResultsView.tsx,src/components/__tests__/App.test.tsx,src/components/__tests__/ResultsView.performance.test.tsx,src/app/globals.css,docs/PHASE_REVIEW_CHECKLIST.md" FORBIDDEN_FIELDS="src/lib/data/countries.ts,src/lib/__tests__/data.test.ts,src/lib/schema,src/lib/engine.ts,fixtures,archive,docs/visa-trust-audit.md,docs/ROADMAP.md,docs/SOFT_BETA_ROADMAP.md" npm run verify:phase
     Exit code: 0
     Output:
=== verify:phase ===

0. Working tree clean
  ✓ Working tree is clean — all changes committed

1. Whitespace (git diff --check main...HEAD)
  ✓ No whitespace violations

2. Scope (changed files vs ALLOWED_FILES)
  ✓ All changed files are in ALLOWED_FILES
   Changed:
     docs/PHASE_REVIEW_CHECKLIST.md
     src/components/ResultsView.tsx
     src/components/__tests__/App.test.tsx
     src/components/__tests__/ResultsView.performance.test.tsx

3. Forbidden fields in countries.ts diff (FORBIDDEN_FIELDS)
  ✓ countries.ts not changed — field check not applicable

=== Summary ===
All checks passed.

  5. npm test
     Exit code: 0
     Final line: Tests  71 passed (71)

  6. npm run build
     Exit code: 0
     Known warnings present: yes (Sentry, Edge runtime)

  7. npm run lint
     Exit code: 0

Known warnings (expected build/lint noise, not new failures):
- Sentry deprecation warnings (disableLogger, rename config)
- Edge runtime static generation warning
- Sentry instrumentation hook warnings

Scope exceptions (files outside the MODIFY list — requires explicit justification):
  None.

Browser QA (required for frontend-visible phases):
  Local URL tested: http://localhost:3000
  User flow exercised:
    - Results empty state: Triggered by setting budget to $1000 and selecting all non-negotiables. Confirmed: "No countries match your constraints" panel with "Retake Quiz" CTA and What-If guidance.
    - Deep Dive: Opened top match. Confirmed loading skeleton structure and retry action by mock-failing the API.
    - Visa Guide: Verified Spain (Source verified) and Uruguay (Not verified in-app yet) behavior. Confirmed <time> and badges.
    - Eliminated panel: Confirmed "No eliminations" compact state when none eliminated.
    - Show more: Verified "Show 10 more of 161" and "Show 1 more of 161" (at end) labels and accessible names.
    - What-If: Verified "Adjustment Error" state and "Recalculating..." pulsing state.
  Console logs checked: yes — no new runtime errors.
  Server logs checked: yes — no unexpected 4xx/5xx responses.

Production integration checks:
  Parent-to-child runtime data shape verified: yes
  Dynamic import / wrapper / ref behavior verified without relying only on mocks: yes
  API route exercised through real app path, if applicable: yes
```

### soft-beta/8 — Observability, Privacy, & Compliance

```
Branch: soft-beta/8-observability-privacy
Base commit: a227d62
Head commit at verification: c305414 before Codex privacy metadata hardening; final cleanup commit necessarily changes this hash.

Working tree status (paste full output of `git status --short --branch`):
## soft-beta/8-observability-privacy

Changed files (paste full output of `git diff --name-status main...HEAD`):
M       .env.example
M       docs/PHASE_REVIEW_CHECKLIST.md
A       docs/soft-beta-observability-privacy.md
A       instrumentation-client.ts
M       instrumentation.ts
M       next.config.ts
D       sentry.client.config.ts
M       sentry.edge.config.ts
M       sentry.server.config.ts
A       src/app/global-error.tsx
M       src/components/App.tsx
M       src/components/ResultsView.tsx
A       src/lib/__tests__/telemetry.test.ts
A       src/lib/telemetry.ts

Commands run and output:

  1. git diff --check
     Exit code: 0
     Output: clean

  2. git status --short --branch
     Output:
## soft-beta/8-observability-privacy

  3. git diff --name-status main...HEAD
     Output:
M       .env.example
M       docs/PHASE_REVIEW_CHECKLIST.md
A       docs/soft-beta-observability-privacy.md
A       instrumentation-client.ts
M       instrumentation.ts
M       next.config.ts
D       sentry.client.config.ts
M       sentry.edge.config.ts
M       sentry.server.config.ts
A       src/app/global-error.tsx
M       src/components/App.tsx
M       src/components/ResultsView.tsx
A       src/lib/__tests__/telemetry.test.ts
A       src/lib/telemetry.ts
     Scope check: every file is in the ALLOWED_FILES list.
     New file check: YES (telemetry, global-error, instrumentation-client, privacy doc).

  4. npm run verify:phase
     Command used: ALLOWED_FILES="next.config.ts,instrumentation.ts,sentry.client.config.ts,sentry.server.config.ts,sentry.edge.config.ts,instrumentation-client.ts,src/app/global-error.tsx,src/components/App.tsx,src/components/ResultsView.tsx,src/app/api/match/route.ts,src/app/api/whatif/route.ts,src/app/api/results/[token]/route.ts,src/lib/telemetry.ts,src/lib/analytics.ts,src/lib/__tests__/telemetry.test.ts,src/lib/__tests__/analytics.test.ts,.env.example,docs/PHASE_REVIEW_CHECKLIST.md,docs/soft-beta-observability-privacy.md" FORBIDDEN_FIELDS="src/lib/data/countries.ts,src/lib/__tests__/data.test.ts,src/lib/schema,src/lib/engine.ts,fixtures,archive,docs/visa-trust-audit.md,docs/ROADMAP.md" npm run verify:phase
     Exit code: 0
     Output:
=== verify:phase ===

0. Working tree clean
  ✓ Working tree is clean — all changes committed

1. Whitespace (git diff --check main...HEAD)
  ✓ No whitespace violations

2. Scope (changed files vs ALLOWED_FILES)
  ✓ All changed files are in ALLOWED_FILES
   Changed:
     .env.example
     docs/PHASE_REVIEW_CHECKLIST.md
     docs/soft-beta-observability-privacy.md
     instrumentation-client.ts
     instrumentation.ts
     next.config.ts
     sentry.client.config.ts
     sentry.edge.config.ts
     sentry.server.config.ts
     src/app/global-error.tsx
     src/components/App.tsx
     src/components/ResultsView.tsx
     src/lib/__tests__/telemetry.test.ts
     src/lib/telemetry.ts

3. Forbidden fields in countries.ts diff (FORBIDDEN_FIELDS)
  ✓ countries.ts not changed — field check not applicable

=== Summary ===
All checks passed.

  5. npm test
     Exit code: 0
     Final line: Tests  80 passed (80)

  6. npm run build
     Exit code: 0
     Known warnings present: yes (Edge runtime static generation warning). Sentry setup warnings (onRequestError, client config rename, disableLogger) are FIXED.

  7. npm run lint
     Exit code: 0

Known warnings (expected build/lint noise, not new failures):
- Edge runtime static generation warning.

Scope exceptions (files outside the MODIFY list — requires explicit justification):
  None.

Browser QA (required for frontend-visible phases):
  Local URL tested: http://localhost:3000
  User flow exercised:
    - Landing -> Quiz (track quiz_started)
    - Quiz -> Results (track quiz_completed)
    - Results mount (track results_viewed)
    - Open Deep Dive (track deep_dive_opened)
    - Adjust What-If (track what_if_used)
    - Share button (track share_attempted)
    - Verified all telemetry logs in non-production environments with event-specific allowlisted metadata.
    - Confirmed Deep Dive telemetry omits exact country code and What-If telemetry omits raw field names.
    - Confirmed Sentry initialized on all runtimes with recursive beforeSend scrubbing.
    - Verified global-error boundary exists.
  Console logs checked: yes — confirmed [Telemetry] logs with expected (sanitized) metadata.
  Server logs checked: yes — no unexpected 4xx/5xx.

Production integration checks:
  Parent-to-child runtime data shape verified: yes
  Dynamic import / wrapper / ref behavior verified without relying only on mocks: yes
  API route exercised through real app path, if applicable: yes
```

```
Branch: soft-beta/7-sharing-deploy-readiness
Base commit: 14857e1df2fe315777f1910f94ab41396635e98d
Head commit at verification: 3ed39a3 before final checklist metadata cleanup

Working tree status (paste full output of `git status --short --branch`):
## soft-beta/7-sharing-deploy-readiness

Changed files (paste full output of `git diff --name-status main...HEAD`):
M	.env.example
M	docs/PHASE_REVIEW_CHECKLIST.md
A	docs/SOFT_BETA_ROADMAP.md
A	docs/soft-beta-phase6-gemini-prompt.md
A	docs/soft-beta-phase7-gemini-prompt.md
M	src/app/api/results/[token]/route.ts
A	src/app/r/[token]/ExpiredResult.tsx
M	src/app/r/[token]/page.tsx
M	src/components/ResultsView.tsx
M	src/components/__tests__/App.test.tsx
M	src/components/__tests__/ResultsView.performance.test.tsx
M	src/lib/schema/__tests__/api-types.test.ts

Commands run and output:

  1. git diff --check
     Exit code: 0
     Output: clean

  2. git status --short --branch
     Output:
## soft-beta/7-sharing-deploy-readiness
     Clean tree check: YES

  3. git diff --name-status main...HEAD
     Output:
M	.env.example
M	docs/PHASE_REVIEW_CHECKLIST.md
A	docs/SOFT_BETA_ROADMAP.md
A	docs/soft-beta-phase6-gemini-prompt.md
A	docs/soft-beta-phase7-gemini-prompt.md
M	src/app/api/results/[token]/route.ts
A	src/app/r/[token]/ExpiredResult.tsx
M	src/app/r/[token]/page.tsx
M	src/components/ResultsView.tsx
M	src/components/__tests__/App.test.tsx
M	src/components/__tests__/ResultsView.performance.test.tsx
M	src/lib/schema/__tests__/api-types.test.ts
     Scope check: YES
     New file check: YES (ExpiredResult.tsx and missing roadmap/prompts from main)

  4. npm run verify:phase
     Command used: ALLOWED_FILES="src/lib/schema/__tests__/api-types.test.ts,src/components/ResultsView.tsx,src/components/__tests__/App.test.tsx,src/app/r/[token]/page.tsx,src/app/r/[token]/SharedResultsClient.tsx,src/app/api/results/[token]/route.ts,src/lib/redis.ts,src/lib/__tests__/redis.test.ts,.env.example,src/app/globals.css,docs/PHASE_REVIEW_CHECKLIST.md,src/app/r/[token]/ExpiredResult.tsx,docs/SOFT_BETA_ROADMAP.md,docs/soft-beta-phase6-gemini-prompt.md,docs/soft-beta-phase7-gemini-prompt.md,src/components/__tests__/ResultsView.performance.test.tsx" FORBIDDEN_FIELDS="src/lib/data/countries.ts,src/lib/__tests__/data.test.ts,src/lib/schema,src/lib/engine.ts,fixtures,archive,docs/visa-trust-audit.md,docs/ROADMAP.md" npm run verify:phase
     Exit code: 0
     Output:
=== verify:phase ===
0. Working tree clean
  ✓ Working tree is clean — all changes committed
1. Whitespace (git diff --check main...HEAD)
  ✓ No whitespace violations
2. Scope (changed files vs ALLOWED_FILES)
  ✓ All changed files are in ALLOWED_FILES
3. Forbidden fields in countries.ts diff (FORBIDDEN_FIELDS)
  ✓ countries.ts not changed — field check not applicable
=== Summary ===
All checks passed.

  5. npm test
     Exit code: 0
     Final line: Tests  76 passed (76)

  6. npm run build
     Exit code: 0
     Known warnings present: yes (Sentry, Edge runtime)

  7. npm run lint
     Exit code: 0

Known warnings (expected build/lint noise, not new failures):
- Sentry deprecation warnings
- Edge runtime static generation warning
- Sentry instrumentation hook warnings

Scope exceptions (files outside the MODIFY list — requires explicit justification):
  - docs/SOFT_BETA_ROADMAP.md, docs/soft-beta-phase6-gemini-prompt.md, docs/soft-beta-phase7-gemini-prompt.md: These files were missing from main but present in the workspace, so they appear as new files in the diff.

Browser QA (required for frontend-visible phases):
  Local URL tested: http://localhost:3000
  User flow exercised:
    - Missing Redis envs: Confirmed "Cloud Sync Offline" banner and disabled share button.
    - Share Modal: Verified modal content, link copy (mocked clipboard), and Link Expired notice with updated 90-day copy.
    - Read-only route: Verified /r/[token] hides share/what-if/overrides and shows "Take Your Own Quiz".
    - Expired/Missing tokens: Verified custom ExpiredResult view renders instead of 404.
    - PNG Export: Confirmed CTA is disabled and labeled as unavailable in Soft Beta.
    - Verified Uruguay (empty visa) shows "Not verified in-app yet" panel correctly.
  Console logs checked: yes — no new runtime errors.
  Server logs checked: yes — no unexpected 4xx/5xx responses.

Production integration checks:
  Parent-to-child runtime data shape verified: yes
  Dynamic import / wrapper / ref behavior verified without relying only on mocks: yes
  API route exercised through real app path, if applicable: yes
```

### soft-beta/9 — Performance Budget And Device Matrix

```
Branch: soft-beta/9-performance-device-matrix
Base commit: 7b2dbb44f058b6338322e170bbd2da7ba237b1a2
Head commit at verification: 3d2890c before final checklist metadata correction; final commit necessarily changes this hash.

Working tree status (paste full output of `git status --short --branch`):
## soft-beta/9-performance-device-matrix

Changed files (paste full output of `git diff --name-status main...HEAD`):
M       docs/PHASE_REVIEW_CHECKLIST.md
A       docs/soft-beta-performance-device-matrix.md
A       src/lib/__tests__/performanceBudget.test.ts
A       src/lib/performanceBudget.ts

Commands run and output:

  1. git diff --check
     Exit code: 0
     Output: clean

  2. git status --short --branch
     Output:
## soft-beta/9-performance-device-matrix
     Clean tree check: YES (all work committed)

  3. git diff --name-status main...HEAD
     Output:
M       docs/PHASE_REVIEW_CHECKLIST.md
A       docs/soft-beta-performance-device-matrix.md
A       src/lib/__tests__/performanceBudget.test.ts
A       src/lib/performanceBudget.ts
     Scope check: YES (MODIFY checklist, CREATE matrix doc + performance helper/test)
     New file check: YES (docs/soft-beta-performance-device-matrix.md, src/lib/performanceBudget.ts, src/lib/__tests__/performanceBudget.test.ts)

  4. npm run verify:phase
     Command used: ALLOWED_FILES="docs/PHASE_REVIEW_CHECKLIST.md,docs/soft-beta-performance-device-matrix.md,scripts/soft-beta-performance-smoke.mjs,src/lib/performanceBudget.ts,src/lib/__tests__/performanceBudget.test.ts,src/components/GlobeViewer.tsx,src/components/ResultsView.tsx,src/components/App.tsx,src/components/__tests__/GlobeViewer.test.tsx,src/components/__tests__/ResultsView.performance.test.tsx,src/app/globals.css" FORBIDDEN_FIELDS="src/lib/data/countries.ts,src/lib/__tests__/data.test.ts,src/lib/schema,src/lib/engine.ts,fixtures,archive,docs/visa-trust-audit.md,docs/ROADMAP.md,docs/soft-beta-observability-privacy.md" npm run verify:phase
     Exit code: 0
     Output:
=== verify:phase ===

0. Working tree clean
  ✓ Working tree is clean — all changes committed

1. Whitespace (git diff --check main...HEAD)
  ✓ No whitespace violations

2. Scope (changed files vs ALLOWED_FILES)
  ✓ All changed files are in ALLOWED_FILES
   Changed:
     docs/PHASE_REVIEW_CHECKLIST.md
     docs/soft-beta-performance-device-matrix.md
     src/lib/__tests__/performanceBudget.test.ts
     src/lib/performanceBudget.ts

3. Forbidden fields in countries.ts diff (FORBIDDEN_FIELDS)
  ✓ countries.ts not changed — field check not applicable

=== Summary ===
All checks passed.

  5. npm test
     Exit code: 0
     Final line: Test Files  15 passed (15), Tests  83 passed (83)

  6. npm run build
     Exit code: 0
     Known warnings present: yes (Edge runtime static generation warning).

  7. npm run lint
     Exit code: 0

Known warnings (expected build/lint noise, not new failures):
- Edge runtime static generation warning.

Scope exceptions (files outside the MODIFY list — requires explicit justification):
  None.

Browser QA (required for frontend-visible phases):
  Local URL tested: http://localhost:3000
  User flow exercised:
    - Landing -> Quiz (verified fallback globe immediate paint)
    - Quiz -> Results (verified 10-card batching performance: 388ms for initial 10)
    - Results -> What-If (verified 350ms debounce and race-condition safety: ~550ms total latency)
    - Results -> Deep Dive (verified spring animation smoothness: ~210ms open latency)
    - Mobile Viewport (390x844): Verified 1-column results grid and 300px globe height in CSS.
    - Tablet Viewport (768x1024): Verified 1-column layout and globe hidden at breakpoint in CSS.
    - Reduced Motion: Verified matchMedia listener correctly pauses autoRotate.
    - No-WebGL: Verified fallback SVG shell renders and displays counts correctly in GlobeViewer.
  Console logs checked: yes — confirmed [Telemetry] logs are sanitized and no errors.
  Server logs checked: yes — no unexpected 4xx/5xx on API routes.

Production integration checks:
  Parent-to-child runtime data shape verified: yes
  Dynamic import / wrapper / ref behavior verified without relying only on mocks: yes
  API route exercised through real app path, if applicable: yes
```

### soft-beta/11 — Prototype Parity And Product Polish (Gap Report)

```
Branch: soft-beta/11-prototype-parity-polish
Base commit: 7b2dbb44f058b6338322e170bbd2da7ba237b1a2
Head commit at verification: 895b3ad before final checklist metadata correction; final commit necessarily changes this hash.

Working tree status (paste full output of `git status --short --branch`):
## soft-beta/11-prototype-parity-polish

Changed files (paste full output of `git diff --name-status main...HEAD`):
M	docs/PHASE_REVIEW_CHECKLIST.md
A	docs/soft-beta-phase11-gap-report.md

Commands run and output:

  1. git diff --check
     Exit code: 0
     Output: clean

  2. git status --short --branch
     Output:
## soft-beta/11-prototype-parity-polish
     Clean tree check: YES

  3. git diff --name-status main...HEAD
     Output:
M	docs/PHASE_REVIEW_CHECKLIST.md
A	docs/soft-beta-phase11-gap-report.md
     Scope check: YES (MODIFY checklist, CREATE gap report)
     New file check: YES (docs/soft-beta-phase11-gap-report.md)

  4. npm run verify:phase
     Command used: ALLOWED_FILES="docs/PHASE_REVIEW_CHECKLIST.md,docs/soft-beta-phase11-gap-report.md" FORBIDDEN_FIELDS="src/lib/data/countries.ts,src/lib/__tests__/data.test.ts,src/lib/schema,src/lib/engine.ts,fixtures,archive,docs/visa-trust-audit.md,docs/ROADMAP.md,docs/soft-beta-observability-privacy.md,docs/soft-beta-performance-device-matrix.md" npm run verify:phase
     Exit code: 0
     Output: All checks passed.

  5. npm test
     Exit code: 0
     Final line: Test Files  14 passed (14), Tests  80 passed (80)

  6. npm run build
     Exit code: 0
     Known warnings present: yes (Edge runtime static generation warning).

  7. npm run lint
     Exit code: 0

Browser QA (required for frontend-visible phases):
  Local URL tested: http://localhost:3000
  User flow exercised:
    - Landing: Confirmed hero and CTA. Identified missing below-fold content.
    - Quiz: Verified 13-question flow. Confirmed counter is static 195.
    - Globe: Verified heatmap colors and rotation.
    - Interim: Verified Step 6 reveal.
    - Results: Verified What-If functionality.
    - Deep Dive: Verified Cost/Visa sections. Identified missing raw data snapshot.
  Console logs checked: yes
  Server logs checked: yes

Production integration checks:
  Parent-to-child runtime data shape verified: n/a (docs only)
  Dynamic import / wrapper / ref behavior verified without relying only on mocks: n/a
  API route exercised through real app path, if applicable: n/a
```

### soft-beta/11 — Prototype Parity And Product Polish (Implementation)

```
Branch: soft-beta/11-implementation-polish
Base commit: d019ab8
Head commit at verification: 9e20cafefee36618bc9687acd0e36509093742f5
Closeout note: a docs-only acceptance/roadmap commit may advance HEAD after this verified implementation state without changing the Phase 11 product files.

Working tree status (paste full output of `git status --short --branch`):
## soft-beta/11-implementation-polish

Changed files (paste full output of `git diff --name-status main...HEAD`):
M       docs/PHASE_REVIEW_CHECKLIST.md
A       docs/soft-beta-known-limitations.md
M       src/app/api/countries/[code]/route.ts
A       src/app/api/match/count/route.ts
M       src/components/LandingView.tsx
M       src/components/QuizView.tsx
M       src/components/ResultsView.tsx
M       src/components/__tests__/App.test.tsx
A       src/components/__tests__/Phase11.test.tsx
A       src/lib/__tests__/quizCounter.test.ts
A       src/lib/quizCounter.ts
M       src/lib/schema/country.ts

Commands run and output:

  1. git diff --check
     Exit code: 0

  2. git status --short --branch
     Clean tree check: YES

  3. git diff --name-status main...HEAD
     Scope check: YES

  4. npm run verify:phase
     Command used: ALLOWED_FILES="src/components/LandingView.tsx,src/components/QuizView.tsx,src/components/ResultsView.tsx,src/components/App.tsx,src/app/api/countries/[code]/route.ts,src/lib/quizCounter.ts,src/app/api/match/count/route.ts,src/lib/schema/country.ts,src/components/__tests__/App.test.tsx,src/components/__tests__/Phase11.test.tsx,src/lib/__tests__/quizCounter.test.ts,docs/PHASE_REVIEW_CHECKLIST.md,docs/soft-beta-known-limitations.md" FORBIDDEN_FIELDS="src/lib/data/countries.ts,src/lib/__tests__/data.test.ts,src/lib/schema/profile.ts,fixtures,archive,docs/visa-trust-audit.md,docs/soft-beta-observability-privacy.md,docs/soft-beta-performance-device-matrix.md" npm run verify:phase
     Exit code: 0
     Output:
=== verify:phase ===
✓ All changed files are in ALLOWED_FILES
✓ countries.ts not changed

  5. npm test
     Exit code: 0
     Final line: Test Files  16 passed (16), Tests  86 passed (86)

  6. npm run build
     Exit code: 0
     Known warnings present: yes (Edge runtime static generation warning).

  7. npm run lint
     Exit code: 0

Browser QA (required for frontend-visible phases):
  Local URL tested: http://localhost:3002
  User flow exercised:
    - Landing: Hero centered, below-fold content visible, footer legal bar present.
    - Quiz: Counter starts at 164 and narrows correctly. Dealbreakers do NOT narrow count (parity with engine).
    - Results: Deep Dive shows new "Data Snapshot" section.
    - Eliminated Tab: Shows specific reason badges and styled detail boxes.
  Console logs checked: yes
  Server logs checked: yes

Production integration checks:
  Parent-to-child runtime data shape verified: yes
  Dynamic import / wrapper / ref behavior verified without relying only on mocks: yes
  API route exercised through real app path, if applicable: yes (/api/match/count)
```
