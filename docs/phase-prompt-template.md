# Gemini Phase Prompt Template

Copy this template for each new Gemini phase. Fill in the bracketed sections.
The preamble and pre-completion block are non-negotiable — do not trim them.

---

## Preamble — required on every phase

Before starting:

1. **Branch discipline.** Create and switch to `phase/[N]-[name]` off a clean pull of `origin/main` before touching any files. Do not work directly on `main`.
2. **Full test suite.** Run `npm test` and verify it exits 0. Both the node and jsdom projects must pass. Do not report a test count unless you ran the command and read the output.
3. **No artifacts.** Do not leave `.bak`, `.orig`, or temp files.
4. **Fixture sync.** If you add a required field to any schema, find every file that constructs that type (including test mocks and fixtures) and update them before committing.

---

## Task

[One paragraph describing what this phase accomplishes and why.]

---

## Context

Stack: Next.js 15, React 19, TypeScript 5.7, Vitest 3, Zod 3.
Branch: `phase/[N]-[name]` off synced `main`.

Authoritative references:
- `DEVELOPMENT.md`
- [Any other phase-specific docs]

---

## Scope

MODIFY:
- [file path]
- [file path]

DO NOT TOUCH:
- Schema files (unless this phase explicitly changes schema)
- Visa pathway records
- Capital/currency metadata
- Cost breakdowns
- Dimension scores
- Matching engine logic or expected fixtures
- UI components (unless this phase explicitly changes UI)
- Analytics/PostHog work
- Legacy archive files

---

## [Phase-specific content section]

[Describe the actual work: data requirements, content standards, test requirements, etc.]

---

## Required Tests

[Describe what tests must be added or updated, and what they must assert.]

Tests must fail for the exact bug class this phase is meant to prevent.
Include at least one negative assertion ("this must NOT happen").

---

## Acceptance

Run these commands in order. Do not skip any.

```bash
git diff --check
git diff --name-status main...HEAD
ALLOWED_FILES="[comma-separated list]" FORBIDDEN_FIELDS="[comma-separated list]" npm run verify:phase
npm test
npm run build
npm run lint
```

Then fill out `docs/PHASE_REVIEW_CHECKLIST.md` completely and include it in your completion message.

**Before reporting complete:**
1. `git diff --check` exits 0.
2. `git diff --name-status main...HEAD` output contains only files in the MODIFY list above.
3. `npm run verify:phase` exits 0.
4. `npm test` exits 0 — paste the final `N passed` line verbatim.
5. `npm run build` exits 0.
6. `npm run lint` exits 0.
7. `docs/PHASE_REVIEW_CHECKLIST.md` is filled out completely.

Do not report complete until all of the above are satisfied.
