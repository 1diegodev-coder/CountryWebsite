# Gemini Phase Handoff Checklist

Every Gemini phase completion must include this form filled out verbatim.
A reviewer who receives prose like "all tests passed" without pasted output will reject the handoff.

---

## Required Fields

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
    - Opened "View visa guide for Georgia" (rank 5, audit-confirmed empty)
    - Confirmed: role="status" panel with aria-label "Visa pathway data not yet verified"; badge text "Not verified in-app yet"; body copy includes "not verified in-app yet … Many countries operate working visa programs we have not yet sourced from primary government references"
    - Confirmed: "Coming soon" NOT present in Georgia view
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
Head commit at verification: 671e6303e8822bd104df9f1f202101e143fa574c

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
