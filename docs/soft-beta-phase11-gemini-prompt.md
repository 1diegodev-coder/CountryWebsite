# Gemini Prompt - Soft Beta Phase 11: Prototype Parity And Product Polish

## Preamble - required

Before starting:

1. **Branch discipline.** Create and switch to `soft-beta/11-prototype-parity-polish` off the current accepted `main` after Soft Beta Phase 9 is merged. Do not work directly on `main`.
2. **Read context first.** Read `AGENTS.md`, `DEVELOPMENT.md`, `docs/SOFT_BETA_ROADMAP.md`, `docs/PHASE_REVIEW_CHECKLIST.md`, `package.json`, `PRD.md`, and this prompt before editing.
3. **Verify toolchain.** Read `package.json` before assuming commands, framework versions, or test tooling.
4. **Full test suite first.** Run `npm test` and verify it exits 0 before editing. Both node and jsdom projects must pass. Do not report a test count unless you ran the command and read the output.
5. **No artifacts.** Do not leave `.bak`, `.orig`, temp files, screenshots, screen recordings, debug scripts, or generated reports outside the docs explicitly requested in this prompt.
6. **No hidden scope drift.** Do not make whitespace-only edits, formatting churn, or opportunistic product changes outside the phase scope. If an unexpected file must change, stop and explain why before continuing.
7. **Gap report first.** This phase is approval-gated. In this prompt, produce the parity gap report and implementation shortlist first. Do not change product code unless this prompt explicitly authorizes it.
8. **Clean handoff required.** A phase handoff is invalid unless all intended files are committed and `git status --short --branch` shows a clean working tree.

Do not report complete until browser QA exercises the real app path affected by this phase and confirms no unexpected console errors or server 4xx/5xx responses.

## Task

Complete the Phase 11 discovery step for Prototype Parity And Product Polish. Compare the current app against the intended PRD/prototype experience, document the highest-impact P0/P1 parity gaps across landing, quiz, interim reveal, globe, results, Deep Dive, and share, and produce a clear implementation shortlist for Codex approval. Do not implement the shortlist in this prompt.

## Context

Stack: Next.js 15, React 19, TypeScript 5.7, Vitest 3, Zod 3.
Branch: `soft-beta/11-prototype-parity-polish` off synced current `main`.

Authoritative references:
- `DEVELOPMENT.md`
- `docs/SOFT_BETA_ROADMAP.md`
- `docs/PHASE_REVIEW_CHECKLIST.md`
- `docs/soft-beta-performance-device-matrix.md`
- `docs/soft-beta-observability-privacy.md`
- `PRD.md`
- `src/components/LandingView.tsx`
- `src/components/QuizView.tsx`
- `src/components/GlobeViewer.tsx`
- `src/components/ResultsView.tsx`
- `src/components/App.tsx`

Current relevant state:
- Phases 4 through 9 are already in place, including accessibility, globe resilience, results UX, sharing, observability/privacy, and the Phase 9 performance matrix.
- Phase 11 must not reopen accepted Phase 8 privacy semantics or Phase 9 measurement conclusions except to reference them.
- There is no separate prototype asset checked into the repo that clearly supersedes `PRD.md`. If you cannot find a better prototype source in the repo, use `PRD.md` as the intended-experience baseline and say so explicitly in the report.

## Scope

MODIFY:
- `docs/PHASE_REVIEW_CHECKLIST.md`

CREATE:
- `docs/soft-beta-phase11-gap-report.md`

OPTIONAL CREATE, ONLY IF CLEARLY USEFUL FOR THE REPORT:
- `docs/soft-beta-known-limitations.md`

DO NOT TOUCH:
- `src/components/**`
- `src/app/**`
- `src/lib/**`
- `fixtures/**`
- `archive/**`
- Country data values, visa pathways, scores, descriptors, dimensions, capitals, currencies, or legal/immigration claims
- Analytics/Sentry/privacy implementation
- Performance/device-matrix implementation

This prompt is docs-only. If you believe a code change is unavoidable to complete the report accurately, stop and explain why instead of making the change.

## Required Work

Keep this phase analytical and concrete. The output should help Codex decide what to approve next, not blur report and implementation together.

1. **Audit the intended experience**
   - Review `PRD.md` for the intended user journey and major UI/product promises, especially:
     - landing hero and first impression
     - quiz flow and pacing
     - globe role before, during, and after quiz
     - interim reveal behavior
     - results page structure and priorities
     - What-If clarity
     - Deep Dive completeness
     - share experience and share card language
     - persistent legal/disclaimer requirements
   - If the PRD is ambiguous, say so instead of guessing.

2. **Compare the current app against the intended baseline**
   - Use the real app path, not only code reading.
   - Evaluate at minimum:
     - Landing
     - Quiz
     - Globe
     - Interim reveal (if still present)
     - Results
     - Deep Dive
     - Share/read-only flow
   - For each area, classify:
     - `Matches intent`
     - `Close but polish needed`
     - `Material parity gap`

3. **Produce a P0/P1 shortlist**
   - List only the highest-impact polish items worth doing before Phase 12.
   - Keep the shortlist tight. Prefer 5-10 items total.
   - Mark each item with:
     - Priority: `P0`, `P1`, or `Defer`
     - User impact
     - Rough scope
     - Whether it is mostly copy, layout, motion, interaction, or architecture
   - Do not silently expand product scope.

4. **Separate gap report from implementation**
   - Do not implement the shortlist in this prompt.
   - End the report with a recommended approved subset for the next Gemini implementation pass.
   - If you create `docs/soft-beta-known-limitations.md`, keep it as a current-state limitations draft, not as a final post-polish document.

## Required Documentation

Create `docs/soft-beta-phase11-gap-report.md` with:

- Summary: whether the current app is broadly soft-beta-ready from a product-experience perspective.
- Baseline used: PRD and any other prototype source actually found.
- Area-by-area assessment:
  - Landing
  - Quiz
  - Globe
  - Interim reveal
  - Results
  - Deep Dive
  - Share/read-only
- Tight P0/P1 shortlist for implementation.
- Explicit defer list for nice-to-have ideas that should not be pulled into the next pass.
- Recommended next-step scope for the Phase 11 implementation pass.

Use concise Markdown tables or short sections. Do not paste large PRD excerpts.

## Required Tests

This is a docs-only prompt. No new tests are required beyond the existing full suite, unless you discover the branch is already dirty or inconsistent.

Do not add or modify app tests in this prompt.

## Browser QA

Required.

Run the app locally and perform a real walkthrough of the current experience. Include concise notes for:

1. Landing page first impression and clarity.
2. Quiz flow and pacing.
3. Globe contribution to comprehension versus distraction.
4. Interim reveal presence/absence and product effect.
5. Results page scanability and hierarchy.
6. Deep Dive trust, clarity, and completeness.
7. Share flow clarity and honesty.
8. Console logs.
9. Server `4xx`/`5xx`.

If a path from the PRD no longer exists in the product, document that clearly instead of treating it as automatically wrong.

## Acceptance

Run these commands in order. Do not skip any.

```bash
git diff --check
git status --short --branch
git diff --name-status main...HEAD
ALLOWED_FILES="docs/PHASE_REVIEW_CHECKLIST.md,docs/soft-beta-phase11-gap-report.md,docs/soft-beta-known-limitations.md" FORBIDDEN_FIELDS="src/lib/data/countries.ts,src/lib/__tests__/data.test.ts,src/lib/schema,src/lib/engine.ts,fixtures,archive,docs/visa-trust-audit.md,docs/ROADMAP.md,docs/soft-beta-observability-privacy.md,docs/soft-beta-performance-device-matrix.md" npm run verify:phase
npm test
npm run build
npm run lint
```

Then fill out `docs/PHASE_REVIEW_CHECKLIST.md` completely under a new section:

```md
### soft-beta/11 - Prototype Parity And Product Polish
```

Before reporting complete:

1. `git diff --check` exits 0.
2. `git status --short --branch` shows `soft-beta/11-prototype-parity-polish` and no uncommitted files.
3. `git diff --name-status main...HEAD` output contains only files in the MODIFY/CREATE lists above, explicitly approved optional files, or justified scope exceptions.
4. Every changed file appears in the `ALLOWED_FILES` value used for `verify:phase`.
5. `npm run verify:phase` exits 0 after all intended files are committed.
6. `npm test` exits 0. Paste the final `N passed` line verbatim.
7. `npm run build` exits 0.
8. `npm run lint` exits 0.
9. Browser QA notes are included.
10. `docs/soft-beta-phase11-gap-report.md` is complete.
11. `docs/PHASE_REVIEW_CHECKLIST.md` is filled out completely.
12. No product code was changed in this prompt.

Do not report complete until all of the above are satisfied.
