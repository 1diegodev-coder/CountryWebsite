# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

**Run locally:** `npx serve .` (serves on port 3000, no build step needed)

There is no build, lint, or test tooling — the project uses CDN-hosted React/Babel/dependencies and runs as static files.

## Architecture

**CountryDNA** is a single-page relocation matching app. All logic runs client-side with no backend.

### Entry point
`CountryDNA.html` is the main file — it loads all CDN dependencies (React 18, Babel standalone, Globe.gl, Three.js, TopoJSON) and imports the JS/JSX components as browser modules. `index.html` redirects to it.

### Screens & routing
There are four screens managed via React state in `components/App.jsx`: `landing` → `quiz` → `results` / `deepdive`. Screen state, quiz answers, and matching results are persisted to `localStorage` (keys: `cdna_screen`, `cdna_answers`, `cdna_result`, `cdna_resume_step`). Results are shareable via a `#s=<base64-answers>` URL hash.

### Components
- `components/App.jsx` — root component, screen router, tweaks panel (accent color, density, filters)
- `components/Quiz.jsx` — 13-question quiz, real-time country counter, interim reveal after Q6, toast notifications
- `components/Results.jsx` — 3-panel dashboard (globe | match cards | sidebar tabs), deep-dive view, What-If sliders
- `components/Globe.jsx` — WebGL globe via Globe.gl with Canvas 2D fallback

### Data & engine
- `js/data.js` — 10 countries + 13 questions + life-stage weight definitions
- `js/countries2.js` — 30 additional countries, appended to the same `COUNTRIES` array at load time
- `js/engine.js` — 3-phase matching: hard filters (budget, language, non-negotiables) → weighted scoring (10 dimensions, 0–10 scale) → narrative generation (why-fit bullets, watch-out bullets, cost reality)

### Matching logic flow
1. **Hard filters** eliminate countries that violate budget, language, or non-negotiable constraints
2. **Weighted scoring** applies life-stage base weights + user priority boosts + household modifiers, normalized to 0–100%
3. **Narratives** are generated from dimension scores relative to user priorities

### Design system
CSS custom properties live in `CountryDNA.html`. Key tokens: `--bg-primary: #0A0E14`, `--accent-green: #4ADE80` (top match/CTA), `--accent-amber: #FBBF24` (warnings). Fonts: Fraunces (display), Inter (UI), JetBrains Mono (data). All loaded from Google Fonts CDN.

### No npm packages
There is no `package.json`. All dependencies come from CDN. Do not introduce a build tool or package manager unless explicitly requested.
