# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Operational Mandates
1. **Single Source of Truth:** Adhere to the architecture and standards defined in **DEVELOPMENT.md**.
2. **Verify Toolchain:** Always check `package.json` before assuming the toolchain. The project uses Next.js 15 App Router — not the legacy CDN static site at the root.
3. **Code Trumps Docs:** If any documentation conflicts with actual code/config files, the **code/config wins**.
4. **Next.js 15 Patterns:** Use App Router conventions, React Server Components where appropriate, and Lucide icons.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server on port 3000
npm run build        # Production build
npm run test         # Run all Vitest tests (two projects: node + jsdom)
npm run lint         # ESLint
```

Run a single test file:
```bash
npx vitest run src/lib/__tests__/engine.test.ts
```

## Architecture

### Request Flow
1. User answers quiz questions in `QuizView` → answers collected as `Partial<UserProfile>` in `App.tsx` state.
2. On submit, `App.tsx` POSTs to `/api/match` with the full `UserProfile` payload.
3. `POST /api/match` validates with `UserProfileSchema`, calls `runMatchingEngine()`, persists result to Upstash Redis, returns `MatchPayload` with a `sessionToken`.
4. `ResultsView` renders ranked matches. "What-If" overrides POST to `/api/whatif`, which re-runs the engine with `profile.overrides` to force-include eliminated countries.

### Matching Engine (`src/lib/engine.ts`)
The engine is pure TypeScript (tagged `server-only`) and runs in three phases:
- **Phase 1 – Hard Filters:** Budget (15% headroom), baseline safety/stability/visa viability, English-only language, LGBTQ+ non-negotiable, chronic healthcare threshold. Eliminated countries are returned separately.
- **Phase 2 – Weighted Scoring:** Base weights come from `LIFE_STAGE_WEIGHTS[lifeStage]` in `src/lib/data/countries.ts`. Top priorities (up to 3) boost the mapped dimension by 0.08 and redistribute the remainder. Household `coupleWithKids`/`singleParent` adds fixed boosts to safety and healthcare. Dealbreakers apply score penalties as multipliers (not eliminations).
- **Phase 3 – Narratives:** Templates from `src/lib/data/narratives.ts` are selected by `dimension × scoreBand × lifeStage × templateType` and rendered with `{{countryName}}`/`{{budget}}` placeholders.

### State Management
Client state lives in `App.tsx` and is persisted to `localStorage` with these fixed keys:
- `cdna_screen` — current view (`landing` | `quiz` | `results`)
- `cdna_answers` — `Partial<UserProfile>` JSON
- `cdna_result` — `MatchPayload` JSON
- `cdna_resume_step` — last quiz step index

### Schemas (`src/lib/schema/`)
All data types are Zod schemas. When adding or changing quiz questions, update `UserProfileSchema` in `profile.ts`. Country dimension scoring relies on `country.ts` (includes `LifeStageEnum` re-exported by `profile.ts`). API response shapes live in `match.ts`.

### API Routes
| Route | Purpose |
|---|---|
| `POST /api/match` | Run engine, persist to Redis, return `MatchPayload` |
| `POST /api/match/count` | Return real-time match count for partial profile |
| `POST /api/whatif` | Re-run engine with `overrides[]` (no Redis write) |
| `GET /api/countries/[code]` | Single country detail |
| `GET /api/results/[token]` | Retrieve shared result from Redis |
| `GET /api/healthz` | Health check |

Rate limits use Upstash Redis sliding window: 10 req/60s for `/match`, 20 req/60s for `/whatif`. Both ratelimiters are `null` when Redis env vars are absent (dev-safe fallback).

### Testing
Vitest runs two projects configured in `vitest.config.ts`:
- **node** — `src/lib/**` and `src/app/**` tests (engine, schemas, Redis, API types)
- **jsdom** — `src/components/**` tests (React component tests)

`server-only` is mocked via `src/__mocks__/server-only.ts` for test environments.
Fixture profiles used in engine tests live in `src/lib/schema/__tests__/`.

### Environment
Requires `.env.local` with Redis credentials for sharing features:
```
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```
See `.env.example`. All Redis-dependent code degrades gracefully when these are absent.

## Behavioral Instructions
- When adding quiz questions, update `UserProfileSchema` in `src/lib/schema/profile.ts` and the question list in `src/lib/data/questions.ts`.
- Framer Motion animations must respect `prefers-reduced-motion` — see `App.tsx` for the `prefersReducedMotion` pattern already in use.
- Do not add features to the legacy root-level HTML/JS files (`CountryDNA.html`, `index.html`, `js/*.js`). They are frozen pending archival.
- Sentry is wired via `instrumentation.ts` and the three `sentry.*.config.ts` files — use `Sentry.captureException()` in route handlers.
