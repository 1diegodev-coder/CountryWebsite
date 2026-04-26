# Development Guide — CountryDNA

**Last Verified:** April 24, 2026 (Refreshed for Next.js 15 migration)

## Architecture Overview
CountryDNA is a modern web application for country relocation matching.

- **Authoritative Source:** The Next.js 15 app in `src/` is the only source of truth for active development.
- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS 4, Framer Motion.
- **State Management:** Local React state with `localStorage` persistence (keys: `cdna_screen`, `cdna_answers`, `cdna_result`, `cdna_resume_step`).
- **Globe:** `react-globe.gl` (Three.js/WebGL).
- **Backend:** Next.js Route Handlers (API Routes) in `src/app/api`.
- **Database/Persistence:** Upstash Redis (for sharing/token persistence).
- **Matching Engine:** TypeScript-based multi-phase engine in `src/lib/engine.ts`.

## Legacy Status
Root-level files (`CountryDNA.html`, `index.html`), legacy scripts (`js/*.js`), and legacy JSX components (`components/*.jsx`) are deprecated and maintained only for parity verification. They will be archived in `archive/legacy-static-v1/` once functional parity is confirmed in the stable beta milestone. No new features should be implemented in the legacy codebase.

## Directory Structure
- `src/app/` — Next.js App Router (pages and API routes).
- `src/components/` — React components (App, Views, UI elements).
- `src/lib/` — Core logic, engine, schemas, and data.
  - `engine.ts` — The matching engine (Phase 1: Filter, Phase 2: Score, Phase 3: Narratives).
  - `schema/` — Zod schemas for UserProfile, Country, MatchResult.
  - `data/` — Static country and narrative data.
- `fixtures/` — Test profiles and expected results for engine validation.

## Development Workflow
- **Install:** `npm install` (or `pnpm install`)
- **Dev:** `npm run dev` (starts on port 3000)
- **Test:** `npm run test` (Vitest for engine and logic)
- **Lint:** `npm run lint` (Next.js linting)

## Environment Requirements
Phase 2 features (sharing and results persistence) require:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
See `.env.example` for reference.

## The Matching Engine (Phase 2 State)
1. **Hard Filters:** Budget, baseline relocation viability, Language (English only), Non-negotiables (LGBTQ+), Healthcare (Chronic).
2. **Weighted Scoring:** Inferred from Life Stage + User Priorities + Household modifiers.
3. **Narrative Generation:** Templated "Why Fit" and "Watch Out" bullets based on dimension score bands.
4. **Overrides:** Users can override eliminations to see how a country scores.

## Design System
- **Theme:** Dark mode by default (`#0A0E14`).
- **Accent:** Custom property `--accent-green` (default: `#4ADE80`).
- **Typography:** Fraunces (Display), Inter (UI), JetBrains Mono (Data).
- **Icons:** Lucide React.
