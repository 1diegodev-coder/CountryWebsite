# Gemini Prompt - Soft Beta Phase 9: Performance Budget And Device Matrix

## Preamble - required

Before starting:

1. **Branch discipline.** Create and switch to `soft-beta/9-performance-device-matrix` off the current accepted `main` after Soft Beta Phase 8 is merged. Do not work directly on `main`.
2. **Read context first.** Read `AGENTS.md`, `DEVELOPMENT.md`, `docs/SOFT_BETA_ROADMAP.md`, `docs/PHASE_REVIEW_CHECKLIST.md`, `package.json`, `next.config.ts`, `src/components/GlobeViewer.tsx`, `src/components/App.tsx`, `src/components/ResultsView.tsx`, and this prompt before editing.
3. **Verify toolchain.** Read `package.json` before assuming commands, framework versions, or test tooling.
4. **Full test suite first.** Run `npm test` and verify it exits 0 before editing. Both node and jsdom projects must pass. Do not report a test count unless you ran the command and read the output.
5. **No artifacts.** Do not leave `.bak`, `.orig`, temp files, debug scripts outside approved docs/scripts, screenshots, traces, browser profiles, or generated reports unless explicitly requested in this prompt.
6. **No hidden scope drift.** Do not make whitespace-only edits, formatting churn, broad optimizations, or documentation changes outside the phase scope. If an unexpected file must change, stop and explain why before continuing.
7. **Measurement before optimization.** Do not refactor or optimize app code unless a measured Phase 9 blocker proves it is necessary and the fix is surgical.
8. **Clean handoff required.** A phase handoff is invalid unless all intended files are committed and `git status --short --branch` shows a clean working tree.

Do not report complete until browser QA exercises the real app path affected by this phase and confirms no unexpected console errors or server 4xx/5xx responses.

## Task

Complete Soft Beta Phase 9: Performance Budget And Device Matrix. Define practical soft-beta performance budgets, run a desktop/tablet/mobile/reduced-motion/no-WebGL matrix against the real app, confirm the globe has no unexpected external texture/network dependency, and document any remaining performance or WebGL risks before Phase 11 polish.

## Context

Stack: Next.js 15, React 19, TypeScript 5.7, Vitest 3, Zod 3.
Branch: `soft-beta/9-performance-device-matrix` off synced current `main`.

Authoritative references:
- `DEVELOPMENT.md`
- `docs/SOFT_BETA_ROADMAP.md`
- `docs/PHASE_REVIEW_CHECKLIST.md`
- `docs/soft-beta-observability-privacy.md`
- `src/components/GlobeViewer.tsx`
- `src/components/App.tsx`
- `src/components/ResultsView.tsx`
- `src/components/__tests__/GlobeViewer.test.tsx`
- `src/components/__tests__/ResultsView.performance.test.tsx`

Current relevant state:
- Phase 5 hardened globe fallback, reduced-motion, visibility pause, and WebGL context behavior.
- Phase 6 added results empty/loading/error polish and Show More batching.
- Phase 7 finalized share/read-only UX for soft beta.
- Phase 8 added privacy-safe telemetry and Sentry setup. Do not weaken privacy semantics or add raw performance payloads.
- The project does not currently have Playwright in `package.json`. Do not add Playwright or another browser automation dependency unless explicitly approved.

## Scope

MODIFY:
- `docs/PHASE_REVIEW_CHECKLIST.md`

CREATE:
- `docs/soft-beta-performance-device-matrix.md`

MODIFY ONLY IF A MEASURED BLOCKER REQUIRES A SURGICAL FIX:
- `src/components/GlobeViewer.tsx`
- `src/components/ResultsView.tsx`
- `src/components/App.tsx`
- `src/components/__tests__/GlobeViewer.test.tsx`
- `src/components/__tests__/ResultsView.performance.test.tsx`
- `src/app/globals.css`

CREATE ONLY IF USEFUL AND KEPT SMALL:
- `scripts/soft-beta-performance-smoke.mjs`
- `src/lib/performanceBudget.ts`
- `src/lib/__tests__/performanceBudget.test.ts`

DO NOT TOUCH:
- `src/lib/data/countries.ts`
- `src/lib/__tests__/data.test.ts`
- `src/lib/schema/**`
- `src/lib/engine.ts`
- `fixtures/**`
- `archive/**`
- Visa pathway records
- Country scores, costs, descriptors, dimensions, capitals, currencies, or legal/immigration claims
- Share/read-only behavior except as part of manual matrix verification
- Phase 8 telemetry/Sentry privacy semantics except to document observed performance
- Prototype parity/product polish; that belongs to Phase 11

## Required Work

Keep this phase measurement-first. A clean report with no code changes is acceptable if the app meets soft-beta expectations.

1. **Performance budgets**
   - Define realistic soft-beta budgets for:
     - Landing page readiness/interaction.
     - Quiz step interaction latency.
     - Results initial render.
     - Deep Dive open latency.
     - What-If request/response perceived latency.
     - Share modal open/copy path.
   - Use coarse, user-centered thresholds. Do not invent false precision.
   - Document whether each budget was met, missed, or not measurable in local conditions.

2. **Device and viewport matrix**
   - Run and document at minimum:
     - Desktop wide: about `1440x900`.
     - Laptop: about `1280x800`.
     - Tablet: about `768x1024`.
     - Mobile: about `390x844` or similar.
     - Reduced motion enabled.
     - No-WebGL or forced globe fallback path.
   - For each row, record:
     - Core path tested.
     - Result: pass/warn/fail.
     - Console errors.
     - Server `4xx`/`5xx`.
     - Notes on layout, globe, quiz, results, Deep Dive, What-If, and share controls.

3. **Globe dependency and resilience check**
   - Confirm whether `GlobeViewer` depends on any external network texture or asset at runtime.
   - Confirm fallback/reduced-motion behavior still works after Phase 8.
   - Record remaining WebGL risks honestly.

4. **Real app browser smoke**
   - Run the app locally and exercise:
     - Landing -> quiz start.
     - Quiz completion -> results.
     - Show More on results.
     - Deep Dive open and close.
     - What-If adjustment.
     - Share attempt or disabled-share state, depending on Redis env availability.
   - Check browser console and server logs.
   - If browser tooling cannot automate a step, perform it manually and document exactly what was and was not verified.

5. **Only fix measured blockers**
   - If a P0/P1 issue appears, make the smallest safe fix and add/update focused tests.
   - Examples of acceptable fixes:
     - A layout overflow at mobile viewport.
     - A globe fallback regression.
     - A Show More/render batching regression.
   - Examples of out-of-scope fixes:
     - Redesigning cards or landing page.
     - Tuning matching logic.
     - Adding analytics vendors.
     - Rewriting globe architecture.

## Required Documentation

Create `docs/soft-beta-performance-device-matrix.md` with:

- Summary: ship/hold recommendation for Phase 9 only.
- Test environment: machine/browser, local URL, env caveats, date.
- Budget table with pass/warn/fail.
- Device/viewport matrix.
- Globe dependency/resilience notes.
- Console/server log notes.
- Open risks and recommended follow-ups for Phase 11 or Phase 12.

Use concise Markdown tables. Do not paste huge logs. Include enough evidence for Codex to review.

## Required Tests

If this phase changes only docs, no new tests are required beyond the full existing suite.

If code changes are made, add/update focused tests that fail for the exact bug class:
- Globe fallback/reduced-motion/no-WebGL behavior -> update `src/components/__tests__/GlobeViewer.test.tsx`.
- Results batching/show-more/render pressure -> update `src/components/__tests__/ResultsView.performance.test.tsx`.
- Budget helper logic -> add `src/lib/__tests__/performanceBudget.test.ts`.

Tests must include at least one negative assertion for any new helper or guard.

## Browser QA

Required.

Run the app locally and complete the matrix described above. Include:

1. Local URL and command used.
2. Whether Redis env vars were present.
3. Whether Sentry DSN was present.
4. Console log findings.
5. Server log findings.
6. Any observed layout overlap, blank globe, excessive delay, or broken interaction.
7. Whether reduced-motion and no-WebGL/fallback were verified by real browser behavior, unit test, or both.

Do not report complete until the real app path has been exercised and no unexpected console errors or server `4xx`/`5xx` responses remain unexplained.

## Acceptance

Run these commands in order. Do not skip any.

```bash
git diff --check
git status --short --branch
git diff --name-status main...HEAD
ALLOWED_FILES="docs/PHASE_REVIEW_CHECKLIST.md,docs/soft-beta-performance-device-matrix.md,scripts/soft-beta-performance-smoke.mjs,src/lib/performanceBudget.ts,src/lib/__tests__/performanceBudget.test.ts,src/components/GlobeViewer.tsx,src/components/ResultsView.tsx,src/components/App.tsx,src/components/__tests__/GlobeViewer.test.tsx,src/components/__tests__/ResultsView.performance.test.tsx,src/app/globals.css" FORBIDDEN_FIELDS="src/lib/data/countries.ts,src/lib/__tests__/data.test.ts,src/lib/schema,src/lib/engine.ts,fixtures,archive,docs/visa-trust-audit.md,docs/ROADMAP.md,docs/soft-beta-observability-privacy.md" npm run verify:phase
npm test
npm run build
npm run lint
```

Then fill out `docs/PHASE_REVIEW_CHECKLIST.md` completely under a new section:

```md
### soft-beta/9 - Performance Budget And Device Matrix
```

Before reporting complete:

1. `git diff --check` exits 0.
2. `git status --short --branch` shows `soft-beta/9-performance-device-matrix` and no uncommitted files.
3. `git diff --name-status main...HEAD` output contains only files in the MODIFY/CREATE lists above, explicitly approved optional files, or justified scope exceptions.
4. Every changed file appears in the `ALLOWED_FILES` value used for `verify:phase`.
5. `npm run verify:phase` exits 0 after all intended files are committed.
6. `npm test` exits 0. Paste the final `N passed` line verbatim.
7. `npm run build` exits 0. The existing edge-runtime static-generation warning is acceptable if unchanged.
8. `npm run lint` exits 0.
9. Browser/device matrix notes are included.
10. `docs/soft-beta-performance-device-matrix.md` is complete.
11. `docs/PHASE_REVIEW_CHECKLIST.md` is filled out completely.
12. Any missed budgets or remaining WebGL risks are documented honestly.

Do not report complete until all of the above are satisfied.
