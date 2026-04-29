# Gemini Phase Handoff Checklist

Every Gemini phase completion must include this form filled out verbatim.
A reviewer who receives prose like "all tests passed" without pasted output will reject the handoff.

---

## Required Fields

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
```

Known warnings (expected build/lint noise, not new failures):
- `@sentry/nextjs` deprecation and instrumentation warnings.
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

---

## Rules

1. **No paraphrasing.** Paste the actual command output, not a summary.
2. **Clean committed handoff only.** Do not hand off with uncommitted files, untracked files, or local-only changes.
3. **Scope exceptions require justification.** If a file outside the MODIFY list changed, explain why and get reviewer approval before committing.
4. **No hidden scope drift.** Whitespace-only edits, formatting churn, or unrelated docs changes outside scope are blockers unless explicitly approved.
5. **A non-zero exit on any command is a blocker.** Fix it before handing off.
6. **Frontend phases require browser QA.** Component tests are not a substitute for exercising the real app path in a browser.
7. **The reviewer will rerun verification independently.** Agent-reported output is informational only — the reviewer's local run is authoritative.
