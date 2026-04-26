## Task
Implement the Phase 2 server-only data boundary as specified in `docs/phase2-boundary.md`.
Read that file first — it is the authoritative spec. Every change you make must map to a
row in the 21-row review gate in §5.

Do not add features, refactor beyond what the spec requires, or touch files outside the
allowed list below.

---

## Context

Stack: Next.js 15, React 19, TypeScript 5.7, Vitest 3, Zod 3.
Branch: `phase/2-boundary` off `main`.
The spec (`docs/phase2-boundary.md`) was signed off before this prompt was written.
Codex will review the implementation PR against §5 of that spec row by row.

Current problem: three client components import from `src/lib/data/countries.ts`
(1,964 lines of raw scoring data). Four server-side modules have no build-time guard
preventing accidental client imports. The `server-only` package enforces this at build
time; client components must be updated to not need those imports.

---

## Allowed files

CREATE:
  src/__mocks__/server-only.ts

MODIFY:
  package.json                                    (add server-only to dependencies)
  vitest.config.ts                                (add server-only alias to both projects)
  src/lib/schema/country.ts                       (extract DataConfidenceSchema)
  src/lib/schema/match.ts                         (expand MatchResultSchema, EliminatedCountrySchema)
  src/lib/engine.ts                               (populate new fields; add server-only)
  src/lib/data/countries.ts                       (add server-only)
  src/lib/data/narratives.ts                      (add server-only)
  src/lib/redis.ts                                (add server-only)
  src/components/LandingView.tsx
  src/components/QuizView.tsx
  src/components/ResultsView.tsx

DO NOT TOUCH:
  Any file under src/lib/__tests__/
  Any file under src/lib/schema/__tests__/
  Any file under src/components/__tests__/
  fixtures/                                       (expected fixtures use a different format — see §4 of spec)
  src/app/                                        (API routes, pages)
  src/lib/data/questions.ts                       (intentionally client-accessible)
  docs/
  DEVELOPMENT.md, AGENTS.md, GEMINI.md, CLAUDE.md

---

## Commit order

Make exactly five commits in this order. Run `npm test` after each one before moving on.

### Commit 1 — tooling: add server-only mock and vitest alias

1. `npm install server-only` — adds to `dependencies` in package.json.

2. Create `src/__mocks__/server-only.ts` with a single no-op export:
   ```ts
   // no-op: server-only boundary is not enforced in the Vitest environment
   export {};
   ```

3. In `vitest.config.ts`, add `'server-only'` to `resolve.alias` inside BOTH project
   configs (node and jsdom). Each project's alias block currently has only `'@'`; add:
   ```ts
   'server-only': path.resolve(__dirname, 'src/__mocks__/server-only.ts'),
   ```

   The result inside each project config:
   ```ts
   resolve: {
     alias: {
       '@': path.resolve(__dirname, './src'),
       'server-only': path.resolve(__dirname, 'src/__mocks__/server-only.ts'),
     },
   },
   ```

Verify: `npm test` — must pass 33 tests, zero failures.

---

### Commit 2 — schema: extract DataConfidenceSchema, expand MatchResult and EliminatedCountry

**`src/lib/schema/country.ts`:**
- Add a named export above `CountrySchema`:
  ```ts
  export const DataConfidenceSchema = z.enum(['high', 'medium', 'low']);
  export type DataConfidence = z.infer<typeof DataConfidenceSchema>;
  ```
- Replace the existing inline `z.enum(['high', 'medium', 'low'])` for `dataConfidence`
  inside `CountrySchema` with `DataConfidenceSchema`.

**`src/lib/schema/match.ts`:**
- Import `DataConfidenceSchema` from `'./country'`.
- Add to `MatchResultSchema`:
  ```ts
  countryName: z.string().min(1),
  countryDescriptor: z.string().min(1),
  dataConfidence: DataConfidenceSchema,
  ```
- Add to `EliminatedCountrySchema`:
  ```ts
  countryName: z.string().min(1),
  ```

Do NOT redeclare `z.enum(['high', 'medium', 'low'])` in `match.ts` — use the imported
`DataConfidenceSchema` only.

Verify: `npm test` — 33 tests still pass. TypeScript must compile (the engine will now
have type errors until Commit 3, but `npm test` runs Vitest which uses esbuild and won't
fail on type errors alone unless the test imports the engine directly — check carefully).

Note: if `npm test` fails because `engine.ts` is imported by a test and now has missing
required fields, complete Commit 3 immediately and re-run. Do not ship Commit 2 alone if
it breaks the test suite.

---

### Commit 3 — engine: populate new fields on all output objects

**`src/lib/engine.ts`:**
Wherever a `MatchResult` object is constructed (a JS object literal returned or pushed
into the matches array), add:
```ts
countryName: country.name,
countryDescriptor: country.descriptor,
dataConfidence: country.dataConfidence,
```

Wherever an `EliminatedCountry` object is constructed, add:
```ts
countryName: country.name,
```

The `country` object is already in scope at every construction site — no new lookups.

Verify: `npm test` — 33 tests pass. `npm run build` — zero errors.

---

### Commit 4 — boundary: add server-only to four modules

Add `import 'server-only';` as the **first line** of each file:
- `src/lib/data/countries.ts`
- `src/lib/data/narratives.ts`
- `src/lib/engine.ts`
- `src/lib/redis.ts`

Verify:
```bash
npm test       # must still pass — Vitest alias makes server-only a no-op
npm run build  # must succeed — Next.js RSC context satisfies server-only
```

---

### Commit 5 — client: remove COUNTRIES imports from three components

**`src/components/LandingView.tsx`:**
- Remove: `import { COUNTRIES } from "../lib/data/countries";`
- Replace every `{COUNTRIES.length}` with `{195}`

**`src/components/QuizView.tsx`:**
- Remove: `import { COUNTRIES } from "../lib/data/countries";`
- Replace every `{COUNTRIES.length}` with `{195}`

**`src/components/ResultsView.tsx`:**
- Remove: `import { COUNTRIES } from "../lib/data/countries";`
- Replace all `COUNTRIES.find(c => c.iso2 === match.countryCode)` lookups and any
  variable assigned from that lookup with direct field reads:
  - `country.name`         → `match.countryName`
  - `country.descriptor`   → `match.countryDescriptor`
  - `country.dataConfidence` → `match.dataConfidence`
  - `country.iso2`         → `match.countryCode`
- Replace `COUNTRIES.find(c => c.iso2 === elim.countryCode)?.name` with
  `elim.countryName`
- Remove the `if (!country) return null;` guard — there is no longer a lookup that
  can fail.
- For the eliminated section: `country?.name || elim.countryCode` becomes
  `elim.countryName`

Verify:
```bash
npm test
npm run build
npm run lint
grep -rn "lib/data/countries\|lib/engine\|lib/redis\|lib/data/narratives" src/components/
# ↑ must produce zero output
```

---

## Acceptance (full gate, run after all five commits)

```bash
npm install
npm test
npm run build
npm run lint
grep -rn "lib/data/countries\|lib/engine\|lib/redis\|lib/data/narratives" src/components/
# ↑ zero output required
```

Expected:
- `npm test`: 33+ tests pass, zero failures, zero DEPRECATED warnings
- `npm run build`: zero errors
- `npm run lint`: exit 0, zero warnings
- grep: no output

---

---

## Implementer notes — read before writing any code

### Engine variable names (Commit 3)

The engine has exactly two construction sites. The variable names differ between them —
do not use `country` uniformly.

**MatchResult construction (lines 37–45 of engine.ts):**
The map variable is `c` (a `ScoredCountry` which extends `Country`). Write:
```ts
countryName: c.name,
countryDescriptor: c.descriptor,
dataConfidence: c.dataConfidence,
```
Writing `country.name` here is a compile error — `country` is not in scope.

**EliminatedCountry construction (lines 66–70 of engine.ts):**
The loop variable is `country`. Write:
```ts
countryName: country.name,
```

There are no other construction sites. Override countries flow through the same
`scored.map` at line 37 — no separate handling needed.

### ResultsView has four COUNTRIES.find calls, not two (Commit 5)

Two are variable assignments (easy to spot):
- Line 167: `const country = COUNTRIES.find(c => c.iso2 === match.countryCode);`
- Line 390: `const country = COUNTRIES.find(c => c.iso2 === elim.countryCode);`

Two are **inline JSX expressions** that are easy to miss:
- Line 465: `{COUNTRIES.find(c => c.iso2 === result.matches[0].countryCode)?.name}`
  → replace with `{result.matches[0].countryName}`
- Line 472: `{COUNTRIES.find(c => c.iso2 === m.countryCode)?.name}`
  → replace with `{m.countryName}`

All four must be replaced. If any remain, `npm run build` will fail because the
`COUNTRIES` import no longer exists.

---

## Deliverables

Paste:
1. The full diff for each of the five files most likely to have subtle errors:
   - `vitest.config.ts`
   - `src/lib/schema/match.ts`
   - `src/lib/engine.ts` (construction sites only — skip unchanged lines with context)
   - `src/components/ResultsView.tsx` (changed sections only)
2. Terminal output of the full acceptance gate run.
