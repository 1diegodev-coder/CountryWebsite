## Task
Fix four tooling issues in the CountryDNA repository so that:
  npm install && npm test && npm run build && npm run lint
runs to completion with zero warnings or errors.

Do not touch any application logic. This is pure tooling/config work.

---

## Context

Stack: Next.js 15.1.7, React 19, Vitest 3.x, TypeScript 5.7, Tailwind CSS 4.
Package manager: npm (do NOT use pnpm or yarn).
Module format: ESM ("type": "module" in package.json).
Working branch: phase/1-tooling (off main).

Current state:
- npm test prints:  DEPRECATED  "environmentMatchGlobs" is deprecated
- npm test prints Upstash SDK errors when route modules are imported
- npm run lint hangs on an interactive ESLint setup prompt (no config exists)
- npm run build prints a workspace-root lockfile warning

---

## Scope — exactly these files, no others

CREATE:
  eslint.config.mjs          (new, project root)

MODIFY:
  package.json               (lint script + devDependencies only)
  vitest.config.ts
  next.config.ts
  src/lib/redis.ts
  src/app/api/match/route.ts
  src/app/api/results/[token]/route.ts

DO NOT TOUCH:
  Any file under src/components/
  Any file under src/lib/schema/
  src/lib/engine.ts
  src/lib/data/
  fixtures/
  Any *.test.ts or *.test.tsx file
  DEVELOPMENT.md, AGENTS.md, GEMINI.md, CLAUDE.md, docs/

---

## Fix 1 — ESLint (eslint.config.mjs + package.json)

Current problem: no eslint config exists; `next lint` prompts interactively and
also emits a deprecation warning ("will be removed in Next.js 16").

Action:
1. Create `eslint.config.mjs` using the ESLint flat config format with Next.js rules:

```js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: ["node_modules/", ".next/", "archive/", "**/*.js"] },
];
```

2. In package.json:
   - Change "lint" script from "next lint" to "eslint ."
   - Add to devDependencies:
       "eslint": "^9.0.0"
       "@eslint/eslintrc": "^3.0.0"
   (eslint-config-next is already a transitive dep of next; do not add it explicitly)

3. Run `npm install` after editing package.json.

---

## Fix 2 — Vitest config (vitest.config.ts)

Current problem: `environmentMatchGlobs` is removed in Vitest 3; triggers
a DEPRECATED warning on every test run.

Action: Replace the deprecated option with `test.projects`. Current behavior:
  - src/components/**  → jsdom environment
  - src/lib/**         → node environment

New vitest.config.ts (full replacement):

```ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    globals: true,
    projects: [
      {
        test: {
          name: 'node',
          include: ['src/lib/**/*.test.{ts,tsx}', 'src/app/**/*.test.{ts,tsx}'],
          environment: 'node',
        },
      },
      {
        test: {
          name: 'jsdom',
          include: ['src/components/**/*.test.{ts,tsx}'],
          environment: 'jsdom',
        },
      },
    ],
  },
});
```

Verify all 31 existing tests still pass after this change.

---

## Fix 3 — Redis lazy construction (src/lib/redis.ts + 2 route handlers)

Current problem: redis.ts constructs a Redis instance at module load time
using empty strings when env vars are absent. The Upstash SDK then logs:
  [Upstash Redis] The 'url' property is missing or undefined
  [Upstash Redis] The 'token' property is missing or undefined

Action A — src/lib/redis.ts (full replacement):

```ts
import { Redis } from '@upstash/redis';

export const REDIS_TTL = 60 * 60 * 24 * 90; // 90 days

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  if (process.env.NODE_ENV !== 'test') {
    console.warn(
      'Redis env vars missing. Sharing/persistence features will be disabled.'
    );
  }
}

export const redis: Redis | null =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;
```

Action B — src/app/api/match/route.ts:
Change the Redis guard from:
  if (process.env.UPSTASH_REDIS_REST_URL) {
To:
  if (redis) {

Action C — src/app/api/results/[token]/route.ts:
This route calls redis.get() with NO null guard. Add before the redis call:

  if (!redis) {
    return NextResponse.json({ error: 'service_unavailable' }, { status: 503 });
  }
  const data = await redis.get(`result:${token}`);

---

## Fix 4 — Next.js workspace root warning (next.config.ts)

Current problem: Next.js detects multiple package-lock.json files and warns
about incorrect workspace root inference.

Action: Replace next.config.ts with:

```ts
import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
```

---

## Acceptance

Run each command in order. All must pass with zero warnings:

  npm install
  npm test
  npm run build
  npm run lint

Expected outcomes:
- npm test: 8 test files, 31 tests pass; no DEPRECATED or [Upstash Redis] lines
- npm run build: no workspace-root lockfile warning
- npm run lint: exits 0, no warnings

---

## Deliverables

Four commits on branch phase/1-tooling:
  tooling: add eslint flat config and migrate lint script
  tooling: migrate vitest config to test.projects
  tooling: fix redis lazy construction and null-guard route handlers
  tooling: set outputFileTracingRoot to silence workspace root warning

Paste the full diff for each changed file plus the final terminal output of:
  npm test && npm run build && npm run lint
