# Roadmap

| Phase | Goal | Drafted | Reviewed | PR | Status |
|-------|------|---------|----------|----|-------:|
| 0 | Split WIP into clean commits | claude | you | #1 | [x] |
| 1 | Tooling fixes (lint/vitest/redis) | gemini | claude | #2 | [x] |
| 2 | Server-only data boundary | gemini | codex | #4 | [x] |
| 3 | SSR /r/[token] + OG tags | gemini | claude | #6 | [x] |
| 4 | Deploy + Sentry + ratelimit | gemini | claude | #8 | [x] |
| 5 | Observability + data parity | gemini | claude | #10 | [x] |
| 6 | Visa Pathways v1 | gemini | codex/claude | phase/6-visa-pathways | [x] |
| 7 | Country metadata expansion | gemini | codex/claude | direct-to-main | [x] |
| 8 | Descriptor quality pass | gemini | codex/claude | phase/8-descriptor-quality | [x] |
| 9 | Deep Dive confidence caveats | gemini | codex/claude | phase/9-confidence-caveats | [x] |

## Phase notes

### Phase 0 — complete
Three atomic commits on PR #1. Verified: `npm test` (31/31), `npm run build` (clean). Merged to `main`.

### Phase 1 — complete
Branch: `phase/1-tooling` off `main`.
Merged in PR #2. Verified: `npm install`, `npm test` (33/33), `npm run build` (clean), `npm run lint` (exit 0, zero warnings).

### Phase 2 — complete
Branch: `phase/2-boundary` off `main`.
Spec: `docs/phase2-boundary.md`.
Merged in PR #4. Verified: 21/21 spec table rows, `npm test` (33/33), `npm run build` (clean), `npm run lint` (exit 0), server-only client import grep (zero output).
**Must land before Phase 4** — deploying on a leaky client boundary is a bug, not a feature.

### Phase 3 — complete
Branch: `phase/3-ssr` off `main`.
Merged in PR #6. Verified: `npm test` (33/33), `npm run build` (`/r/[token]` dynamic), `npm run lint` (exit 0).

### Phase 4 — complete
Branch: `phase/4-deploy` off `main`.
Merged in PR #8. Verified: `npm test` (33/33), `npm run build` (clean, `/api/healthz` edge), `npm run lint` (exit 0).

### Phase 5 — complete
New worktree off `main` at any point after Phase 0.
Merged in PR #10. Output: `docs/data-parity-2026-04.md` before any YAML is touched.

### Phase 6 — complete
Branch: `phase/6-visa-pathways` off `main`.
Merged. Verified: `npm test` (41/41), `npm run build` (clean), `npm run lint` (exit 0).
Coverage: 40 top-destination countries, 1-4 official-source visa pathways each. Scope violation (21 unauthorized costBreakdown edits) caught in review and reverted before merge.

### Phase 7 — complete
Changes landed directly on main working tree (branch discipline violation — noted for future phases).
Merged at 7f44e84. Verified: `npm test` (43/43), `npm run build` (clean), `npm run lint` (exit 0).
Coverage: `capitalCity` and `currency` (ISO 4217) added to all 195 countries and `CountrySchema`.
Also adds compact metadata bar to DeepDive UI (out of strict Phase 7 scope but accepted — clean, additive).
Review fix: Gemini false-reported 41/41 passing; test fixture missing new required fields crashed jsdom suite. Fixed in review.

### Phase 8 — complete
Branch: `phase/8-descriptor-quality` off `main`.
Merged at 29581c3. Verified: `npm test` (45/45), `npm run build` (clean), `npm run lint` (exit 0).
131 descriptors rewritten to 15-42 words. Word-count/sentence-count gate added to data.test.ts.
Codex review fixed trailing whitespace, 3 lowercase sentence starts, and American spellings before merge.

### Phase 9 — complete
Branch: `phase/9-confidence-caveats` off `main`.
Merged at f3cfe8d. Verified: `npm test` (46/46), `npm run build` (clean), `npm run lint` (exit 0).
Adds explanatory caveats for medium/low confidence in DeepDive; high confidence unchanged.
Tests assert badge visibility and caveat copy for all three confidence levels.

## Orchestration rules

1. **Never merge a Gemini PR without a Claude or Codex review comment in the PR thread.**
2. Merge → delete branch → update this table → start next phase.
3. `main` is always deployable. No WIP on main.
