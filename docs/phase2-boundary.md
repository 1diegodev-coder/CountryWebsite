# Phase 2 — Server-Only Data Boundary

**Status:** Spec approved — no code until this document is signed off.
**Branch:** `phase/2-boundary` off `main`
**Reviewer:** Codex reviews the implementation PR against the spec table in §5.
**Constraint:** Must land before Phase 4 (deploy). Deploying with a leaky client boundary is a bug, not a feature.

---

## 1. Problem

Three client components import directly from `src/lib/data/countries.ts`, a 1,964-line file that contains raw scoring indicators, weighting tables, and internal data not intended for the browser bundle.

| Importer | File | What it reads from COUNTRIES |
|----------|------|------------------------------|
| `LandingView.tsx` | client component | `COUNTRIES.length` only |
| `QuizView.tsx` | client component | `COUNTRIES.length` only |
| `ResultsView.tsx` | client component | `country.name`, `country.descriptor`, `country.dataConfidence`, `country.iso2` |

Additionally, `src/lib/engine.ts`, `src/lib/data/narratives.ts`, and `src/lib/redis.ts` have no build-time enforcement preventing accidental client imports. The `server-only` package enforces this at build time and must be applied now.

---

## 2. Boundary Definitions

### Server-only (must never reach the client bundle)

| Module | Reason |
|--------|--------|
| `src/lib/data/countries.ts` | Raw indicators, scoring weights, internal dimension data |
| `src/lib/data/narratives.ts` | Template data only consumed by the engine |
| `src/lib/engine.ts` | Matching logic and scoring coefficients |
| `src/lib/redis.ts` | Runtime credentials and token storage |

### Client-safe (may be imported by client components)

| Module | Reason |
|--------|--------|
| `src/lib/data/questions.ts` | Required to render the quiz on the client |
| `src/lib/schema/*` | Isomorphic — validation runs on both server and client |

---

## 3. Required Changes

### 3a. Install `server-only`

```bash
npm install server-only
```

Add to `dependencies` (not devDependencies — must be present at runtime).

### 3b. Add Vitest no-op alias for `server-only`

The `server-only` package throws at import time in plain Node.js. Vitest runs in Node.js, so any test that imports `engine.ts`, `countries.ts`, `redis.ts`, or `narratives.ts` will throw immediately after §3c is applied — breaking the existing test suite.

Fix: create a no-op mock and alias it in both Vitest projects.

**Create `src/__mocks__/server-only.ts`:**
```ts
// no-op: server-only boundary is not enforced in the Vitest environment
export {};
```

**In `vitest.config.ts`**, add `'server-only'` to the `resolve.alias` inside **both** project configs (node and jsdom):
```ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
    'server-only': path.resolve(__dirname, 'src/__mocks__/server-only.ts'),
  },
},
```

### 3c. Add `import 'server-only'` to four modules

Add as the **first line** of each file. This causes a hard build error if any of these are imported into a client component or browser-targeting page.

- `src/lib/data/countries.ts`
- `src/lib/data/narratives.ts`
- `src/lib/engine.ts`
- `src/lib/redis.ts`

### 3d. Expand `MatchResultSchema` and `EliminatedCountrySchema`

`ResultsView.tsx` currently resolves three country fields from a client-side `COUNTRIES.find()` lookup. All three are available to the engine at match-construction time and belong in the API response.

**Step 1 — `src/lib/schema/country.ts`:** Extract the inline `dataConfidence` enum into a named export so it can be shared without redeclaration:

```ts
export const DataConfidenceSchema = z.enum(['high', 'medium', 'low']);
export type DataConfidence = z.infer<typeof DataConfidenceSchema>;
```

Then replace the existing inline `z.enum(['high', 'medium', 'low'])` inside `CountrySchema` with `DataConfidenceSchema`.

**Step 2 — `src/lib/schema/match.ts`:** Import `DataConfidenceSchema` from `./country` and add three fields to `MatchResultSchema`:

```ts
/** Display name of the matched country (e.g. "Portugal"). */
countryName: z.string().min(1),
/** One-line editorial descriptor for the country. */
countryDescriptor: z.string().min(1),
/** Data confidence level for this country's indicators. */
dataConfidence: DataConfidenceSchema,
```

**Step 3 — `src/lib/schema/match.ts`:** Add one field to `EliminatedCountrySchema`:

```ts
/** Display name of the eliminated country (e.g. "Mexico"). */
countryName: z.string().min(1),
```

`iso2` is not needed on `MatchResult` — `countryCode` already carries it.

### 3e. Populate new fields in the engine

**`src/lib/engine.ts`** — wherever a `MatchResult` or `EliminatedCountry` object is constructed, add the new fields by reading from the `country` object already in scope.

For every `MatchResult` construction:
```ts
countryName: country.name,
countryDescriptor: country.descriptor,
dataConfidence: country.dataConfidence,
```

For every `EliminatedCountry` construction:
```ts
countryName: country.name,
```

No new lookups are required; the country object is already present at every construction site.

### 3f. Update client components

**`src/components/LandingView.tsx`:**
- Remove: `import { COUNTRIES } from "../lib/data/countries";`
- Replace `{COUNTRIES.length}` with `{195}`

**`src/components/QuizView.tsx`:**
- Remove: `import { COUNTRIES } from "../lib/data/countries";`
- Replace `{COUNTRIES.length}` with `{195}`

**`src/components/ResultsView.tsx`:**
- Remove: `import { COUNTRIES } from "../lib/data/countries";`
- Replace every `COUNTRIES.find(c => c.iso2 === match.countryCode)` lookup with direct field reads from the typed `match` object:
  - `country.name` → `match.countryName`
  - `country.descriptor` → `match.countryDescriptor`
  - `country.dataConfidence` → `match.dataConfidence`
  - `country.iso2` → `match.countryCode` (already present)
- Replace `COUNTRIES.find(c => c.iso2 === elim.countryCode)?.name` with `elim.countryName`
- The `if (!country) return null;` guard around match cards must be removed — there is no longer a lookup that can fail

---

## 4. What Does Not Change

- `fixtures/expected/*.json` — these files have the shape `{ top5: [{ countryCode, reason }], zero_results }`, which is a human-written assertion format validated by `expected-fixtures.test.ts`. They are **not** `MatchResult` objects and require **no changes**.
- `src/lib/schema/__tests__/expected-fixtures.test.ts` — no changes
- `src/lib/__tests__/engine.test.ts` — tests access `m.countryCode`, `m.score`, `result.eliminated` etc., not the new fields; no assertion changes required. The `server-only` alias (§3b) is what allows this file to keep importing `engine.ts` directly.
- `src/lib/schema/__tests__/schema-compile.test.ts` — the `constrains MatchResult score to the 0-100 range` test inspects `schema._def.checks` on the `score` field only; adding new fields does not affect it.
- `src/lib/data/questions.ts` — intentionally client-accessible; no boundary marker
- All API route handlers — no changes forced by this phase

---

## 5. Spec Table (Codex review gate)

Codex reviews the implementation PR row by row. A row is PASS only if the verification command produces the stated result.

| # | Requirement | Verification command / check |
|---|-------------|------------------------------|
| 1 | `server-only` in `dependencies` (not devDependencies) | `node -e "const p=require('./package.json'); console.log(!!p.dependencies['server-only'])"` → `true` |
| 2 | `src/__mocks__/server-only.ts` exists | `ls src/__mocks__/server-only.ts` → file present |
| 3 | Both vitest projects alias `server-only` to the mock | Read `vitest.config.ts` — both project configs have `'server-only': ...server-only.ts` in `resolve.alias` |
| 4 | `import 'server-only'` is first line of `countries.ts` | `head -1 src/lib/data/countries.ts` → `import 'server-only';` |
| 5 | `import 'server-only'` is first line of `narratives.ts` | `head -1 src/lib/data/narratives.ts` → `import 'server-only';` |
| 6 | `import 'server-only'` is first line of `engine.ts` | `head -1 src/lib/engine.ts` → `import 'server-only';` |
| 7 | `import 'server-only'` is first line of `redis.ts` | `head -1 src/lib/redis.ts` → `import 'server-only';` |
| 8 | `MatchResultSchema` has `countryName: z.string().min(1)` | Read `src/lib/schema/match.ts` |
| 9 | `MatchResultSchema` has `countryDescriptor: z.string().min(1)` | Read `src/lib/schema/match.ts` |
| 10 | `DataConfidenceSchema` is exported from `country.ts` and imported (not redeclared) in `match.ts` | `grep "DataConfidenceSchema" src/lib/schema/country.ts` → export present; `grep "DataConfidenceSchema" src/lib/schema/match.ts` → import present, no `z.enum` inline |
| 11 | `EliminatedCountrySchema` has `countryName: z.string().min(1)` | Read `src/lib/schema/match.ts` |
| 12 | Engine populates `countryName`, `countryDescriptor`, `dataConfidence` on every `MatchResult` | Read engine match-construction site(s) in `src/lib/engine.ts` |
| 13 | Engine populates `countryName` on every `EliminatedCountry` | Read engine elimination-construction site(s) in `src/lib/engine.ts` |
| 14 | `LandingView.tsx` has no import from `lib/data/countries` | `grep "lib/data/countries" src/components/LandingView.tsx` → no output |
| 15 | `QuizView.tsx` has no import from `lib/data/countries` | `grep "lib/data/countries" src/components/QuizView.tsx` → no output |
| 16 | `ResultsView.tsx` has no import from `lib/data/countries` | `grep "lib/data/countries" src/components/ResultsView.tsx` → no output |
| 17 | No client component references the `COUNTRIES` identifier | `grep -n "COUNTRIES" src/components/ResultsView.tsx src/components/LandingView.tsx src/components/QuizView.tsx` → no output |
| 18 | `npm test` passes (33+ tests, zero failures) | Terminal output |
| 19 | `npm run build` succeeds with zero errors | Terminal output |
| 20 | `npm run lint` exits 0 | Terminal output |
| 21 | No client component imports any server-only module | `grep -rn "lib/data/countries\|lib/engine\|lib/redis\|lib/data/narratives" src/components/` → no output |

---

## 6. Acceptance Commands

Run in order on the `phase/2-boundary` branch. All must pass:

```bash
npm install
npm test
npm run build
npm run lint
grep -rn "lib/data/countries\|lib/engine\|lib/redis\|lib/data/narratives" src/components/
# ↑ must produce zero output
```
