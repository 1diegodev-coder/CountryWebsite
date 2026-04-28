# Gemini Prompt — Soft Beta Phase 2: Performance + Graceful Degradation

## Preamble — required

Before starting:

1. **Branch discipline.** Start only after Soft Beta Phase 1 stability is merged. Create and switch to `soft-beta/2-performance-degradation` off the accepted Phase 1 base. Do not work directly on `main`.
2. **Read context first.** Read `AGENTS.md`, `DEVELOPMENT.md`, `PRD.md` sections on performance/accessibility/graceful degradation, and this prompt before editing.
3. **Verify toolchain.** Read `package.json` before running commands.
4. **Full test suite baseline.** Run `npm test` before edits. If it fails, stop and report the exact failure.
5. **No artifacts.** Do not leave `.bak`, `.orig`, temp files, screenshots, or generated junk.
6. **Scope discipline.** Do not change country data, schemas, matching engine behavior, visa pathways, cost data, score data, or fixtures unless this prompt explicitly says so.

---

## Task

Make the app smooth and resilient for soft beta by turning the globe into a progressive enhancement, adding graceful fallbacks, and reducing results-page request/render pressure. The core quiz/results/deep-dive flow must work even when WebGL, globe assets, reduced motion, or slow devices make the interactive globe unavailable.

This phase is about **performance and graceful degradation**, not new product features.

---

## Context

Stack: Next.js 15, React 19, TypeScript 5.7, Vitest 3, Zod 3.

Relevant current files:

- `src/components/GlobeViewer.tsx`
- `src/components/ResultsView.tsx`
- `src/components/LandingView.tsx`
- `src/components/QuizView.tsx`
- `src/components/__tests__/App.test.tsx`
- `src/app/globals.css`
- `public/data/countries.geojson`

Current known risks:

- `GlobeViewer` uses `react-globe.gl` / Three.js as the dominant visual element.
- The globe fetches local GeoJSON but still uses an external earth texture URL.
- The app has no true no-WebGL fallback.
- Globe load/error states currently fail silently except for console output.
- On mobile and reduced-motion contexts, the globe should not be part of the critical path.
- Results renders all matches directly.
- What-If requests fire on every slider/input change without debounce or cancellation.

Prototype behavior to preserve conceptually:

- Globe/map is useful, but optional.
- If WebGL fails, users still get a meaningful country/map summary.
- The quiz and results must never be blocked by the globe.

---

## Scope

MODIFY:

- `src/components/GlobeViewer.tsx`
- `src/components/ResultsView.tsx`
- `src/components/__tests__/App.test.tsx`
- Optional: `src/components/__tests__/GlobeViewer.test.tsx`
- Optional: `src/components/__tests__/ResultsView.performance.test.tsx`
- Optional: `src/app/globals.css`
- Optional: `public/data/*` only if replacing/removing an existing globe asset dependency with a local lightweight asset

DO NOT TOUCH:

- `src/lib/data/countries.ts`
- `src/lib/engine.ts`
- `src/lib/schema/*`
- `fixtures/*`
- `archive/*`
- Visa pathway records
- Capital/currency metadata
- Cost breakdowns
- Dimension scores
- Matching-engine tests/expected fixture outputs
- Share/Redis/API route behavior
- PostHog/analytics

If you believe a forbidden file must change, stop and report why before editing it.

---

## Required Implementation

### 1. Globe Must Be Progressive Enhancement

Refactor `GlobeViewer` so it always renders a lightweight fallback shell immediately.

The fallback shell must:

- Show useful non-WebGL content, not a blank rectangle.
- Work in jsdom/no-WebGL contexts.
- Include a compact status such as candidate/eliminated counts when `isResults` is true.
- Avoid external network requests.
- Respect reduced motion.
- Fit inside the existing container without causing horizontal overflow.

The WebGL globe must:

- Load only on the client.
- Load after the fallback shell is already visible.
- Not block the landing, quiz, or results primary content.
- Catch GeoJSON/WebGL/load failures and keep the fallback visible.
- Avoid unhandled promise rejections.
- Stop auto-rotation when `prefers-reduced-motion: reduce` is set.

Preferred approach:

- Add capability checks:
  - `prefers-reduced-motion`
  - WebGL support
  - small/mobile viewport or coarse pointer
- Add an idle/deferred activation path for WebGL:
  - use `requestIdleCallback` with a timeout fallback, or a small `setTimeout`
  - do not fetch GeoJSON until WebGL activation is allowed
- Add an internal fallback component in `GlobeViewer.tsx`, or a small sibling component if cleaner.

### 2. Remove External Globe Texture Dependency

Remove the external `//unpkg.com/three-globe/example/img/earth-dark.jpg` dependency.

Acceptable outcomes:

- Use no earth texture and rely on polygon colors/material settings, or
- Use a local lightweight asset under `public/data/` if already available or easy to provide without internet access.

Do not add a large binary asset.

### 3. Results Page Render Pressure

Reduce initial results render cost without changing match ordering or scores.

Required:

- Render the top set of match cards initially, with a clear “Show more matches” style action for the remainder.
- Keep the top match and ranking behavior unchanged.
- Do not change `result.matches` data.
- Do not change sharing payloads or API response shapes.

Suggested default:

- Initial visible match cards: top 10.
- Expand in batches of 10.

### 4. What-If Request Pressure

Debounce and cancel What-If requests.

Required:

- Range slider changes must not fire one request per input event.
- Rapid changes should send only the final request after a short debounce.
- If a newer What-If request starts, abort or ignore the older response.
- Preserve loading UI.
- Preserve profile/result update behavior.

Suggested default:

- Debounce: 250-400ms.
- Use `AbortController` or monotonically increasing request IDs.

### 5. Reduced Motion

Reduced motion must apply to all new animation/deferred globe behavior.

Do not remove existing Framer Motion globally in this phase, but do not introduce new mandatory motion.

---

## Required Tests

Add/update component tests. Tests must fail against the pre-phase implementation.

Required assertions:

1. `GlobeViewer` renders a fallback immediately before WebGL data is available.
2. `GlobeViewer` does not attempt the heavy GeoJSON fetch when WebGL is unavailable.
3. `GlobeViewer` keeps fallback content visible when the GeoJSON fetch rejects.
4. Reduced-motion mode does not enable auto-rotation.
5. `ResultsView` initially renders only the first batch of match cards when given more than the batch size.
6. “Show more” reveals the next batch without changing ordering.
7. What-If slider changes are debounced so rapid changes produce one effective `/api/whatif` request.
8. Older What-If responses cannot overwrite newer results.

At least one negative assertion is required:

- The globe must **not** render a blank container when WebGL is unavailable.
- Rapid What-If changes must **not** create multiple effective result updates.

Use mocks for `GlobeViewer` dependencies where appropriate. Do not require real WebGL in Vitest.

---

## Manual QA Requirements

After implementation, run the app locally and verify:

- Desktop landing: headline and CTA render before any globe work is required.
- Mobile landing: headline and CTA are visible first; no black globe rectangle above the fold.
- Results page: first 10 matches render promptly; expanding preserves rank order.
- Reduced motion enabled: globe fallback or non-rotating globe behavior.
- Simulated no-WebGL: fallback remains visible and app flow works.
- Network tab: no external request to `unpkg.com` for globe texture.

Paste concise notes in the completion message.

---

## Acceptance

Run these commands in order:

```bash
git diff --check
git diff --name-status main...HEAD
ALLOWED_FILES="src/components/GlobeViewer.tsx,src/components/ResultsView.tsx,src/components/__tests__/App.test.tsx,src/components/__tests__/GlobeViewer.test.tsx,src/components/__tests__/ResultsView.performance.test.tsx,src/app/globals.css,public/data" FORBIDDEN_FIELDS="src/lib/data/countries.ts,src/lib/engine.ts,src/lib/schema,fixtures,archive" npm run verify:phase
npm test
npm run build
npm run lint
```

Then fill out `docs/PHASE_REVIEW_CHECKLIST.md` completely and include it in your completion message.

Do not report complete unless:

1. `git diff --check` exits 0.
2. `git diff --name-status main...HEAD` contains only files in the MODIFY list or explicitly approved optional files.
3. `npm run verify:phase` exits 0.
4. `npm test` exits 0 and you paste the final passed count verbatim.
5. `npm run build` exits 0.
6. `npm run lint` exits 0.
7. Manual QA notes are included.
8. No external globe texture request remains.

---

## Reviewer Notes For Codex/Claude

Reject the handoff if:

- Matching scores, country data, visa records, or schemas changed.
- The globe fallback is just an empty placeholder.
- WebGL still blocks the first meaningful render.
- What-If requests can overwrite newer state with stale responses.
- Tests rely on real WebGL.
- The branch reports “all tests pass” without pasted command output.

