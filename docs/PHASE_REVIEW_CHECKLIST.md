# Gemini Phase Handoff Checklist

Every Gemini phase completion must include this form filled out verbatim.
A reviewer who receives prose like "all tests passed" without pasted output will reject the handoff.

---

## Required Fields

```
Branch: soft-beta/4-accessibility-interactions
Base commit: 94bc702d6d72e0599324a90fd6c62664812d8ea3
Head commit: a712fd148ac5919eb8f08bb47cb7daa900f558af

Working tree status (paste full output of `git status --short --branch`):
## soft-beta/4-accessibility-interactions

Changed files (paste full output of `git diff --name-status main...HEAD`):
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
     Scope check: confirm every file is in the MODIFY list, explicitly approved optional files, or explain exception
     New file check: confirm every added file is listed in ALLOWED_FILES

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

---

## Rules

1. **No paraphrasing.** Paste the actual command output, not a summary.
2. **Clean committed handoff only.** Do not hand off with uncommitted files, untracked files, or local-only changes.
3. **Scope exceptions require justification.** If a file outside the MODIFY list changed, explain why and get reviewer approval before committing.
4. **No hidden scope drift.** Whitespace-only edits, formatting churn, or unrelated docs changes outside scope are blockers unless explicitly approved.
5. **A non-zero exit on any command is a blocker.** Fix it before handing off.
6. **Frontend phases require browser QA.** Component tests are not a substitute for exercising the real app path in a browser.
7. **The reviewer will rerun verification independently.** Agent-reported output is informational only — the reviewer's local run is authoritative.
