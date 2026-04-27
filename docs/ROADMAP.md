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
| 7 | Country metadata expansion | gemini | codex/claude | TBD | [ ] |
| 8 | Descriptor quality pass | gemini | codex/claude | TBD | [ ] |
| 9 | Deep Dive confidence caveats | gemini | codex/claude | TBD | [ ] |

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

### Phase 7 — planned
Prompt: `docs/phase7-gemini-prompt.md`.
Gemini-owned country metadata phase adding `capitalCity` and `currency` to all 195 country records.

### Phase 8 — planned
Prompt: `docs/phase8-gemini-prompt.md`.
Gemini-owned content phase rewriting under-length country descriptors to PRD §10.1 quality.

### Phase 9 — planned
Prompt: `docs/phase9-gemini-prompt.md`.
Gemini-owned UI caveat phase for medium/low confidence Deep Dive messaging.

## Orchestration rules

1. **Never merge a Gemini PR without a Claude or Codex review comment in the PR thread.**
2. Merge → delete branch → update this table → start next phase.
3. `main` is always deployable. No WIP on main.
