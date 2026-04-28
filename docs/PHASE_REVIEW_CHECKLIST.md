# Gemini Phase Handoff Checklist

Every Gemini phase completion must include this form filled out verbatim.
A reviewer who receives prose like "all tests passed" without pasted output will reject the handoff.

---

## Required Fields

```
Branch: <git branch --show-current>
Base commit: <git rev-parse main>
Head commit: <git rev-parse HEAD>

Working tree status (paste full output of `git status --short --branch`):


Changed files (paste full output of `git diff --name-status main...HEAD`):


Commands run and output:

  1. git diff --check
     Exit code: [0 / non-zero]
     Output: [paste any whitespace violations, or "clean"]

  2. git status --short --branch
     Output: [paste full output]
     Clean tree check: [confirm no uncommitted files]

  3. git diff --name-status main...HEAD
     Output: [paste full file list]
     Scope check: [confirm every file is in the MODIFY list, explicitly approved optional files, or explain exception]
     New file check: [confirm every added file is listed in ALLOWED_FILES]

  4. npm run verify:phase (if ALLOWED_FILES and FORBIDDEN_FIELDS set for this phase)
     Command used: ALLOWED_FILES="..." FORBIDDEN_FIELDS="..." npm run verify:phase
     Exit code: [0 / non-zero]
     Output: [paste]

  5. npm test
     Exit code: [0 / non-zero]
     Final line (e.g. "46 passed"): [paste verbatim]

  6. npm run build
     Exit code: [0 / non-zero]
     Known warnings present: [yes/no — list if yes]

  7. npm run lint
     Exit code: [0 / non-zero]

Known warnings (expected build/lint noise, not new failures):


Scope exceptions (files outside the MODIFY list — requires explicit justification):
  None / [explain]

Browser QA (required for frontend-visible phases):
  Local URL tested: [paste]
  User flow exercised: [landing / quiz / results / deep dive / share / what-if / other]
  Console logs checked: [yes/no — paste new errors or "no new runtime errors"]
  Server logs checked: [yes/no — paste unexpected 4xx/5xx or "none"]
  Responsive/reduced-motion/no-WebGL checks, if applicable: [paste concise notes]
  API failure UX checked, if applicable: [paste concise notes]

Production integration checks:
  Parent-to-child runtime data shape verified: [yes/no/not applicable]
  Dynamic import / wrapper / ref behavior verified without relying only on mocks: [yes/no/not applicable]
  API route exercised through real app path, if applicable: [yes/no/not applicable]
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
