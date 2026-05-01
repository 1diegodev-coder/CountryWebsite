# Gemini Prompt - Soft Beta Phase 11 Implementation: Prototype Parity And Product Polish

## Preamble - required

Before starting:

1. **Branch discipline.** Create and switch to `soft-beta/11-implementation-polish` off the current accepted `main` after Soft Beta Phase 9 and the accepted Phase 11 discovery docs are merged. Do not work directly on `main`.
2. **Read context first.** Read `AGENTS.md`, `DEVELOPMENT.md`, `docs/SOFT_BETA_ROADMAP.md`, `docs/PHASE_REVIEW_CHECKLIST.md`, `docs/soft-beta-phase11-gap-report.md`, `PRD.md`, `package.json`, `src/components/LandingView.tsx`, `src/components/QuizView.tsx`, `src/components/ResultsView.tsx`, `src/components/App.tsx`, `src/app/api/countries/[code]/route.ts`, and this prompt before editing.
3. **Verify toolchain.** Read `package.json` before assuming commands, framework versions, or test tooling.
4. **Full test suite first.** Run `npm test` and verify it exits 0 before editing. Both node and jsdom projects must pass. Do not report a test count unless you ran the command and read the output.
5. **No artifacts.** Do not leave `.bak`, `.orig`, temp files, screenshots, traces, browser profiles, or ad hoc debug scripts unless explicitly requested in this prompt.
6. **No hidden scope drift.** Do not make whitespace-only edits, formatting churn, broad redesigns, or documentation changes outside the phase scope. If an unexpected file must change, stop and explain why before continuing.
7. **Preserve persistence.** Do not break the `localStorage` hydration/persistence logic in `src/components/App.tsx`.
8. **Clean handoff required.** A phase handoff is invalid unless all intended files are committed and `git status --short --branch` shows a clean working tree.

Do not report complete until browser QA exercises the real app path affected by this phase and confirms no unexpected console errors or server 4xx/5xx responses.

## Task

Complete the approved implementation pass for Soft Beta Phase 11: Prototype Parity And Product Polish. Use the accepted gap report to close the highest-impact product gaps without expanding scope beyond soft-beta readiness. This is an implementation pass, not another audit and not a redesign.

## Context

Stack: Next.js 15, React 19, TypeScript 5.7, Vitest 3, Zod 3.
Branch: `soft-beta/11-implementation-polish` off synced accepted `main`.

Authoritative references:
- `DEVELOPMENT.md`
- `docs/SOFT_BETA_ROADMAP.md`
- `docs/soft-beta-phase11-gap-report.md`
- `docs/PHASE_REVIEW_CHECKLIST.md`
- `PRD.md`

Current relevant state:
- Phase 9 performance/device work is complete and accepted.
- Phase 11 discovery is complete and accepted. Use `docs/soft-beta-phase11-gap-report.md` as the scope source.
- The accepted recommended implementation scope from the gap report is:
  1. Landing below-the-fold trust/product context.
  2. Live quiz counter that reflects current narrowing instead of a static `195`.
  3. Deep Dive data snapshot grounded in a curated subset of real fields.
  4. Elimination transparency improvement using existing elimination data.
- Current app behavior to preserve:
  - Landing hero and CTA already work.
  - Quiz has 13 questions and an interim reveal at Step 6.
  - Results, Deep Dive, What-If, share/read-only, visa trust UI, and observability/privacy work from earlier accepted phases.

## Scope

MODIFY:
- `src/components/LandingView.tsx`
- `src/components/QuizView.tsx`
- `src/components/ResultsView.tsx`
- `src/components/App.tsx`
- `src/app/globals.css`
- `src/app/api/countries/[code]/route.ts`
- `src/lib/engine.ts` only if needed for a small pure helper or shared filter-count logic without changing ranking/filter outcomes
- `src/lib/schema/country.ts` only if needed for a narrow public Deep Dive snapshot shape
- `src/components/__tests__/App.test.tsx`
- `src/components/__tests__/Integration.test.tsx`
- `src/components/__tests__/ResultsView.performance.test.tsx`
- `docs/PHASE_REVIEW_CHECKLIST.md`

CREATE IF USEFUL:
- `src/lib/quizCounter.ts`
- `src/lib/__tests__/quizCounter.test.ts`
- `docs/soft-beta-known-limitations.md`

DO NOT TOUCH:
- `src/lib/data/countries.ts`
- `src/lib/__tests__/data.test.ts`
- `src/lib/schema/profile.ts`
- `src/lib/schema/match.ts` unless a narrowly scoped type addition is truly required by an approved UI change
- `fixtures/**` unless a touched schema/helper forces a fixture update
- `archive/**`
- `docs/visa-trust-audit.md`
- `docs/soft-beta-observability-privacy.md`
- `docs/soft-beta-performance-device-matrix.md`
- Share token/Redis behavior
- Telemetry/privacy semantics from Phase 8
- Broad matching-engine tuning, score changes, weight changes, or country-data edits
- PNG export, comparison mode, city-level matching, AI narratives, or any new feature not listed in this prompt
- Globe animation polish such as top-match pulsing unless explicitly approved separately
- Predictive What-If labels unless explicitly approved separately

## Required Work

Keep the implementation surgical and PRD-aligned. Do not turn this into a marketing redesign.

### 1. Landing below-the-fold polish

Add the missing trust/conversion content below the existing hero:

- A compact 3-step "How it works" band.
- A small illustrative preview of what users get back (match reasoning / Deep Dive / transparency), using real app language rather than abstract marketing copy.
- A sticky legal/trust bar or similarly restrained disclaimer treatment aligned with the current dark editorial UI.

Constraints:
- Keep the first viewport centered on the existing hero and CTA.
- Use the current visual language; do not add gradient-orb/marketing fluff.
- Do not create a new multi-page landing experience.
- Any new copy must stay consistent with the existing trust posture: informational tool, not legal/tax/immigration advice.

### 2. Live quiz counter

Replace the static `195` quiz counter with a real-time remaining-country count that reacts to the answers already given.

Constraints:
- The counter must reflect current narrowing based on the quiz state and must not remain static after meaningful filter answers.
- Prefer shared logic over duplicating filter rules in UI code. If a helper extraction from the engine is needed, keep it pure and do not change final ranking/filter behavior.
- Preserve the Step 6 interim reveal, current navigation pacing, and What-If flow.
- Do not make the counter claim false precision if a partially answered state cannot safely run all constraints. If needed, document and implement the most honest count semantics that still improve on the static number.

### 3. Deep Dive data snapshot

Add a concise "Data Snapshot" section in the Deep Dive that grounds the scored dimensions in a curated set of raw/source-facing values.

Good examples:
- Total monthly estimate
- Internet reliability
- English in daily life
- Stability
- Air quality
- Climate range

Constraints:
- Do not expose the entire internal raw indicator object blindly if only a curated subset is needed.
- If the country API shape changes, keep it narrow and intentional.
- Keep the Visa Guide trust language intact.
- Gracefully handle missing values without blanking the whole Deep Dive.

### 4. Elimination transparency

Improve the eliminated-country experience using the existing elimination `reason` and `detail` data.

Constraints:
- Do not invent a complex new backend model for multi-reason elimination unless it is absolutely necessary.
- If the current inline detail is already present, treat this as interaction polish: make the elimination row feel inspectable and clearer, rather than building a brand-new subsystem.
- Preserve override behavior and read-only restrictions.

## Explicit Defers

Do not implement these in this phase:

- PNG share export
- Comparison mode
- Predictive What-If labels
- Top-match pulsing / extra globe animation
- New analytics vendors
- Country data rewrites or engine retuning

If you find one of these would be nice to do, document it as a follow-up instead of implementing it.

## Required Tests

Add or update focused tests for each changed behavior. Tests must fail for the exact bug class this phase is meant to prevent and include at least one negative assertion.

Required coverage:

1. **Landing additions**
   - App/landing test proves the below-the-fold content and legal/trust treatment render.
   - Include at least one assertion that existing hero/CTA behavior still works.

2. **Live counter**
   - Test that the quiz counter changes from its initial value after answers that should narrow the pool.
   - Negative assertion: it must not remain the original static value once the relevant state changes.
   - If a shared helper is added, add helper tests for representative filter scenarios without changing engine outcomes.

3. **Deep Dive data snapshot**
   - Test that the snapshot renders with the curated values from the country API payload.
   - Negative assertion: missing snapshot data does not crash Deep Dive and does not remove unrelated sections like Visa Pathways.

4. **Elimination transparency**
   - Test the improved eliminated-country interaction and verify override behavior still works.
   - Negative assertion: read-only mode must not expose interactive override controls.

5. **Integration safety**
   - If the quiz counter touches shared matching/filter logic, verify existing integration tests still pass.
   - If the country API shape changes, verify the production `ResultsView -> /api/countries/[code]` path, not just an isolated child mock.

For frontend, wrapper, dynamic import, ref, or API-payload changes:
- Component tests with mocks are not sufficient by themselves.
- Test or manually verify the production path that wires parent components, wrappers, refs, and API payloads together.

## Browser QA

Required.

Run the app locally and exercise the real app path:

1. Landing page hero, below-the-fold bands, and sticky legal/trust treatment.
2. Start quiz and confirm the live counter updates during the flow.
3. Reach the Step 6 interim reveal and confirm it still works.
4. Complete the quiz into results.
5. Open Deep Dive and verify the Data Snapshot plus existing Visa Guide behavior.
6. Open the eliminated tab and verify the new transparency interaction plus override behavior.
7. Check browser console for new runtime errors.
8. Check server logs for unexpected `4xx`/`5xx` responses.

Include:
- Local URL and command used.
- Whether Redis env vars were present.
- Whether any share behavior was incidentally exercised.
- Console log findings.
- Server log findings.

## Required Documentation

1. Fill out `docs/PHASE_REVIEW_CHECKLIST.md` completely under:

```md
### soft-beta/11 - Prototype Parity And Product Polish (Implementation)
```

2. Create `docs/soft-beta-known-limitations.md` if the final shipped soft-beta surface still has meaningful user-facing limits that should be recorded now. Keep it concise and specific. If no new doc is necessary, explicitly justify that choice in the checklist.

## Acceptance

Run these commands in order. Do not skip any.

```bash
git diff --check
git status --short --branch
git diff --name-status main...HEAD
ALLOWED_FILES="src/components/LandingView.tsx,src/components/QuizView.tsx,src/components/ResultsView.tsx,src/components/App.tsx,src/app/globals.css,src/app/api/countries/[code]/route.ts,src/lib/engine.ts,src/lib/schema/country.ts,src/lib/quizCounter.ts,src/lib/__tests__/quizCounter.test.ts,src/components/__tests__/App.test.tsx,src/components/__tests__/Integration.test.tsx,src/components/__tests__/ResultsView.performance.test.tsx,docs/PHASE_REVIEW_CHECKLIST.md,docs/soft-beta-known-limitations.md" FORBIDDEN_FIELDS="src/lib/data/countries.ts,src/lib/__tests__/data.test.ts,src/lib/schema/profile.ts,fixtures,archive,docs/visa-trust-audit.md,docs/soft-beta-observability-privacy.md,docs/soft-beta-performance-device-matrix.md" npm run verify:phase
npm test
npm run build
npm run lint
```

Before reporting complete:

1. `git diff --check` exits 0.
2. `git status --short --branch` shows `soft-beta/11-implementation-polish` and no uncommitted files.
3. `git diff --name-status main...HEAD` output contains only files in the MODIFY/CREATE lists above, explicitly approved optional files, or justified scope exceptions.
4. Every changed file appears in the `ALLOWED_FILES` value used for `verify:phase`.
5. `npm run verify:phase` exits 0 after all intended files are committed.
6. `npm test` exits 0. Paste the final `N passed` line verbatim.
7. `npm run build` exits 0.
8. `npm run lint` exits 0.
9. Browser QA notes are included.
10. `docs/PHASE_REVIEW_CHECKLIST.md` is filled out completely.
11. Any remaining limitations or explicit defers are documented honestly.

Do not report complete until all of the above are satisfied.
