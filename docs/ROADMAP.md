# Roadmap

| Phase | Goal | Drafted | Reviewed | PR | Status |
|-------|------|---------|----------|----|-------:|
| 0 | Split WIP into clean commits | claude | you | #1 | [x] |
| 1 | Tooling fixes (lint/vitest/redis) | gemini | claude | #2 | [x] |
| 2 | Server-only data boundary | gemini | codex | #4 | [x] |
| 3 | SSR /r/[token] + OG tags | gemini | claude | #6 | [x] |
| 4 | Deploy + Sentry + ratelimit | gemini | claude | #8 | [x] |
| 5 | Observability + data parity | gemini | claude | #10 | [x] |

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

## Orchestration rules

1. **Never merge a Gemini PR without a Claude or Codex review comment in the PR thread.**
2. Merge → delete branch → update this table → start next phase.
3. `main` is always deployable. No WIP on main.
