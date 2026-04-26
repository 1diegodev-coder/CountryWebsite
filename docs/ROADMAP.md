# Roadmap

| Phase | Goal | Drafted | Reviewed | PR | Status |
|-------|------|---------|----------|----|-------:|
| 0 | Split WIP into clean commits | claude | you | #1 | [x] |
| 1 | Tooling fixes (lint/vitest/redis) | gemini | claude | — | [ ] |
| 2 | Server-only data boundary | gemini | codex | — | [ ] |
| 3 | SSR /r/[token] + OG tags | gemini | claude | — | [ ] |
| 4 | Deploy + Sentry + ratelimit | gemini | claude | — | [ ] |
| 5 | Observability + data parity | gemini | claude | — | [ ] |

## Phase notes

### Phase 0 — complete
Three atomic commits on PR #1. Verified: `npm test` (31/31), `npm run build` (clean). Merged to `main`.

### Phase 1 — next
Branch: `phase/1-tooling` off `main`.
Gemini drafts, Claude reviews. Phases 1 and 3 can run in parallel.
Acceptance gate: `npm install && npm test && npm run build && npm run lint` with zero warnings.

### Phase 2 — after Phase 1
Branch: `phase/2-boundary` off `main`.
Claude writes spec (`docs/phase2-boundary.md`) first. No code until spec is approved.
Codex reviews the implementation PR against the spec table.
**Must land before Phase 4** — deploying on a leaky client boundary is a bug, not a feature.

### Phase 3 — parallel with Phase 1
Branch: `phase/3-ssr` off `main`.
Gemini converts `/r/[token]` to a server component. Claude reviews for hydration correctness and OG tag placement.

### Phase 4 — after Phase 2
Branch: `phase/4-deploy` off `main`.
Three commits: Sentry wiring, `/api/healthz`, Upstash ratelimit on `/api/match` and `/api/whatif`.
Claude review focuses on PII handling and ratelimit bypass paths.

### Phase 5 — independent, trailing
New worktree off `main` at any point after Phase 0.
Output: `docs/data-parity-YYYY-MM.md` before any YAML is touched.

## Orchestration rules

1. **Never merge a Gemini PR without a Claude or Codex review comment in the PR thread.**
2. Merge → delete branch → update this table → start next phase.
3. `main` is always deployable. No WIP on main.
