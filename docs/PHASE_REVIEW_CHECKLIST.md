# Gemini Phase Handoff Checklist

Every Gemini phase completion must include this form filled out verbatim.
A reviewer who receives prose like "all tests passed" without pasted output will reject the handoff.

---

## Required Fields

```
Branch: <git branch --show-current>
Base commit: <git rev-parse main>
Head commit: <git rev-parse HEAD>

Changed files (paste full output of `git diff --name-status main...HEAD`):


Commands run and output:

  1. git diff --check
     Exit code: [0 / non-zero]
     Output: [paste any whitespace violations, or "clean"]

  2. git diff --name-status main...HEAD
     Output: [paste full file list]
     Scope check: [confirm every file is in the MODIFY list, or explain exception]

  3. npm run verify:phase (if ALLOWED_FILES and FORBIDDEN_FIELDS set for this phase)
     Command used: ALLOWED_FILES="..." FORBIDDEN_FIELDS="..." npm run verify:phase
     Exit code: [0 / non-zero]
     Output: [paste]

  4. npm test
     Exit code: [0 / non-zero]
     Final line (e.g. "46 passed"): [paste verbatim]

  5. npm run build
     Exit code: [0 / non-zero]
     Known warnings present: [yes/no — list if yes]

  6. npm run lint
     Exit code: [0 / non-zero]

Known warnings (expected build/lint noise, not new failures):


Scope exceptions (files outside the MODIFY list — requires explicit justification):
  None / [explain]
```

---

## Rules

1. **No paraphrasing.** Paste the actual command output, not a summary.
2. **Scope exceptions require justification.** If a file outside the MODIFY list changed, explain why and get reviewer approval before committing.
3. **A non-zero exit on any command is a blocker.** Fix it before handing off.
4. **The reviewer will rerun verification independently.** Agent-reported output is informational only — the reviewer's local run is authoritative.
