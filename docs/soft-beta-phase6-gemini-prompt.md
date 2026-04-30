# Gemini Prompt - Soft Beta Phase 6: Results UX And Trust Polish

## Preamble - required

Before starting:

1. **Branch discipline.** Create and switch to `soft-beta/6-results-ux-trust` off the current accepted `main` that includes soft-beta Phase 10B and 10C. Do not work directly on `main`.
2. **Read context first.** Read `AGENTS.md`, `DEVELOPMENT.md`, `docs/SOFT_BETA_ROADMAP.md`, `docs/PHASE_REVIEW_CHECKLIST.md`, `docs/visa-trust-audit.md`, and this prompt before editing.
3. **Verify toolchain.** Read `package.json` before assuming commands or framework versions.
4. **Full test suite first.** Run `npm test` and verify it exits 0 before editing. Both node and jsdom projects must pass. Do not report a test count unless you ran the command and read the output.
5. **No artifacts.** Do not leave `.bak`, `.orig`, temp files, debug scripts, screenshots, or generated reports unless explicitly requested in this prompt.
6. **No hidden scope drift.** Do not make whitespace-only edits, formatting churn, or documentation changes outside the phase scope. If an unexpected file must change, stop and explain why before continuing.
7. **Clean handoff required.** A phase handoff is invalid unless all intended files are committed and `git status --short --branch` shows a clean working tree.

Do not report complete until browser QA exercises the real app path affected by this phase and confirms no unexpected console errors or server 4xx/5xx responses.

## Task

Complete Soft Beta Phase 6: Results UX And Trust Polish. Make the results experience feel complete and trustworthy after the Phase 10B/10C visa data and Visa Guide changes, without expanding product scope or touching country data.

## Context

Stack: Next.js 15, React 19, TypeScript 5.7, Vitest 3, Zod 3.
Branch: `soft-beta/6-results-ux-trust` off synced current `main`.

Authoritative references:
- `DEVELOPMENT.md`
- `docs/SOFT_BETA_ROADMAP.md`
- `docs/PHASE_REVIEW_CHECKLIST.md`
- `docs/visa-trust-audit.md`
- `src/components/ResultsView.tsx`
- `src/components/__tests__/App.test.tsx`
- `src/components/__tests__/ResultsView.performance.test.tsx`

Current relevant state:
- Phase 10B restored verified visa pathways for audited P0/P1 countries, including Georgia.
- Phase 10C added "Source verified" badges, semantic `time`, honest empty visa copy, and loading/error ARIA in Deep Dive.
- The results page still has rough edges around empty/error states, visa gating clarity, show-more copy, and Deep Dive/What-If placeholders.

## Scope

MODIFY:
- `src/components/ResultsView.tsx`
- `src/components/__tests__/App.test.tsx`
- `src/components/__tests__/ResultsView.performance.test.tsx`
- `src/app/globals.css` only if required for small state styling
- `docs/PHASE_REVIEW_CHECKLIST.md`

DO NOT TOUCH:
- `src/lib/data/countries.ts`
- `src/lib/__tests__/data.test.ts`
- `src/lib/schema/**`
- `src/lib/engine.ts`
- `fixtures/**`
- `archive/**`
- `docs/visa-trust-audit.md`
- `docs/ROADMAP.md`
- `docs/SOFT_BETA_ROADMAP.md`
- API route behavior unless you stop and get explicit approval
- Share/read-only flows beyond incidental display copy; those belong to Phase 7
- Sentry, PostHog, analytics, privacy, or compliance work; those belong to Phase 8
- Performance/device-matrix work; that belongs to Phase 9
- Country scores, costs, descriptors, dimensions, visa facts, or legal/immigration claims

## Required Work

Keep edits surgical and compatible with the existing Editorial + Data aesthetic.

1. **Results empty state**
   - If `result.matches` is empty, show a useful results-panel empty state instead of a blank match-card grid.
   - Copy should explain that no countries matched the current constraints and direct the user toward retaking the quiz or relaxing non-negotiables through What-If where available.
   - Preserve read-only behavior: do not show editable What-If guidance in read-only results.

2. **Deep Dive loading and error states**
   - Improve the existing loading skeleton copy or structure so users understand country details are loading.
   - Improve the existing error state so it offers a clear retry action where practical and a close action.
   - Keep `role="status"` for loading and `role="alert"` for errors.
   - Do not swallow or hide fetch failures in tests; the UI should make failures understandable.

3. **Visa Guide trust gating**
   - Keep Visa Guide labeling honest after Phase 10B/10C.
   - Verify behavior against actual `/api/countries/[code]` responses, not only static match payloads.
   - For countries with `visaPathways.length > 0`, the Visa Guide should show source-backed pathway content with the existing source-verified UI.
   - For countries with no verified in-app pathways, the Visa Guide should show the Phase 10C "Not verified in-app yet" style empty state.
   - Do not introduce claims that a country has no visa path. The honest state is "not verified in-app yet."
   - Avoid adding per-card visa badges unless they are backed by fetched country detail data or a clearly named async state. Do not infer from match payloads.

4. **Show more matches state**
   - Replace the generic "Show more matches" text with a count-aware label, for example `Show 10 more of 153`.
   - The count must reflect the actual remaining matches and avoid overpromising when fewer than 10 remain.
   - Update the accessible name to include the same useful count.
   - Preserve ordering and batching behavior.

5. **What-If feedback**
   - Make What-If loading and error feedback clear and non-jarring.
   - Preserve debounce, abort, stale-response protection, and `localStorage` hydration behavior in `App.tsx`.
   - Do not change the shape of `/api/whatif` requests.

6. **Eliminated panel polish**
   - If there are no eliminated countries, show a compact empty state instead of an empty panel.
   - Keep override controls unchanged for non-read-only results.
   - Do not alter elimination logic.

## Required Tests

Add or update focused tests. Tests must fail for the exact bug classes this phase covers and include at least one negative assertion.

Required coverage:
- Empty `matches` result renders a useful empty state and does not render misleading match actions.
- Empty eliminated list renders an empty eliminated-panel state.
- Show-more button displays the correct next batch count and total, including the final partial batch case.
- Deep Dive fetch failure renders `role="alert"` with retry/close behavior.
- Visa Guide with verified pathways still renders "Source verified" and does not render "Not verified in-app yet."
- Visa Guide with empty pathways renders "Not verified in-app yet" and does not render "Source verified."
- What-If error state remains visible and understandable when `/api/whatif` fails.

Use the existing Vitest and Testing Library style in:
- `src/components/__tests__/App.test.tsx`
- `src/components/__tests__/ResultsView.performance.test.tsx`

Component tests with mocked `fetch` are acceptable for precise states, but they are not enough by themselves. Browser QA must exercise the real app path.

## Browser QA

Required.

Run the app locally and complete a focused browser smoke test on the real app path:

1. Landing page renders the primary headline and CTA.
2. Complete the quiz into results.
3. Open the top match Deep Dive.
4. Open Visa Guide for a country with verified pathways, such as Spain or Portugal, and confirm source-verified pathway content appears.
5. Open Visa Guide for a country without verified in-app pathways, if one remains after Phase 10B, and confirm the "Not verified in-app yet" state appears. If no reachable result has empty pathways, document how you verified the empty-pathway state.
6. Open the eliminated panel and verify populated or empty behavior.
7. Use "Show more" and verify the count-aware label updates correctly.
8. Trigger or mock a What-If error through the real UI path if practical; otherwise state why it was not practical and rely on the integration test.
9. Check browser console for no new runtime errors.
10. Check server logs for no unexpected `4xx` or `5xx` API responses.

Include concise browser QA notes in the handoff.

## Acceptance

Run these commands in order. Do not skip any.

```bash
git diff --check
git status --short --branch
git diff --name-status main...HEAD
ALLOWED_FILES="src/components/ResultsView.tsx,src/components/__tests__/App.test.tsx,src/components/__tests__/ResultsView.performance.test.tsx,src/app/globals.css,docs/PHASE_REVIEW_CHECKLIST.md" FORBIDDEN_FIELDS="src/lib/data/countries.ts,src/lib/__tests__/data.test.ts,src/lib/schema,src/lib/engine.ts,fixtures,archive,docs/visa-trust-audit.md,docs/ROADMAP.md,docs/SOFT_BETA_ROADMAP.md" npm run verify:phase
npm test
npm run build
npm run lint
```

Then fill out `docs/PHASE_REVIEW_CHECKLIST.md` completely under a new section:

```md
### soft-beta/6 - Results UX And Trust Polish
```

Before reporting complete:

1. `git diff --check` exits 0.
2. `git status --short --branch` shows `soft-beta/6-results-ux-trust` and no uncommitted files.
3. `git diff --name-status main...HEAD` output contains only files in the MODIFY list above, explicitly approved optional files, or justified scope exceptions.
4. Every changed file appears in the `ALLOWED_FILES` value used for `verify:phase`.
5. `npm run verify:phase` exits 0 after all intended files are committed.
6. `npm test` exits 0. Paste the final `N passed` line verbatim.
7. `npm run build` exits 0.
8. `npm run lint` exits 0.
9. Browser QA notes are included.
10. `docs/PHASE_REVIEW_CHECKLIST.md` is filled out completely.

Do not report complete until all of the above are satisfied.
