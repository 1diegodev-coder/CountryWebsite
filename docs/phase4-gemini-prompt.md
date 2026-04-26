## Task

Wire Sentry properly for Next.js 15 App Router, add `/api/healthz`, and add Upstash rate
limiting on `/api/match` and `/api/whatif`. Three commits in order.

---

## Context

Stack: Next.js 15.1.7, React 19, TypeScript 5.7, `@sentry/nextjs@^10.50.0`.
Branch: `phase/4-deploy` off `main`.

Current problem: Sentry is installed and has three config files but is not wired into the
Next.js build. `instrumentation.ts` (required for App Router error capture) does not
exist. `withSentryConfig` is absent from `next.config.ts`. The two primary mutation
routes have no rate limiting, no error reporting.

---

## Scope

CREATE:
  instrumentation.ts                              (project root, not inside src/)
  src/lib/ratelimit.ts
  src/app/api/healthz/route.ts

MODIFY:
  next.config.ts
  sentry.client.config.ts
  sentry.server.config.ts
  sentry.edge.config.ts
  src/app/api/match/route.ts
  src/app/api/whatif/route.ts

DO NOT TOUCH:
  src/lib/redis.ts
  src/lib/engine.ts
  src/app/api/results/[token]/route.ts
  src/app/api/countries/[code]/route.ts
  src/components/
  src/lib/schema/
  vitest.config.ts
  Any test file

---

## Commit 1 — Sentry wiring

### `instrumentation.ts` (project root)

```ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}
```

### `next.config.ts`

Wrap the existing `nextConfig` with `withSentryConfig`. Import from `@sentry/nextjs`.
Use minimal options to avoid build failures when `SENTRY_AUTH_TOKEN` is not set:

```ts
import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import path from "path";
import { withSentryConfig } from "@sentry/nextjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
};

export default withSentryConfig(nextConfig, {
  silent: true,
  disableLogger: true,
  telemetry: false,
});
```

### `sentry.server.config.ts`

Replace the existing file:

```ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  debug: false,
});
```

### `sentry.client.config.ts`

Replace the existing file:

```ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  debug: false,
  replaysOnErrorSampleRate: 0,
  replaysSessionSampleRate: 0,
});
```

### `sentry.edge.config.ts`

Replace the existing file:

```ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  debug: false,
});
```

### Add `captureException` to existing routes

In `src/app/api/match/route.ts`, the outer catch block currently has:
```ts
console.error('Match error:', error);
return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
```

Replace with:
```ts
import * as Sentry from "@sentry/nextjs";
// ...
Sentry.captureException(error);
console.error('Match error:', error);
return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
```

Do the same for `src/app/api/whatif/route.ts` (outer catch, `console.error('What-If error:', error)`).

**PII constraint:** `captureException` receives the `error` object only — NEVER pass `body`,
`profile`, or `rawProfile` to Sentry. The route already validates and separates user input
before the try/catch outer block; only thrown runtime errors should be captured.

### Verify after Commit 1

```bash
npm test        # 33 tests pass
npm run build   # clean — withSentryConfig wraps cleanly without SENTRY_AUTH_TOKEN
npm run lint    # exit 0
```

---

## Commit 2 — `/api/healthz`

### `src/app/api/healthz/route.ts`

```ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export function GET() {
  return NextResponse.json({ ok: true, ts: Date.now() });
}
```

`runtime = 'edge'` keeps the response at the network edge with no cold start.

### Verify after Commit 2

```bash
npm test        # 33 tests pass
npm run build   # /api/healthz appears in route table as edge function
npm run lint    # exit 0
```

---

## Commit 3 — Upstash rate limiting

### Install

```bash
npm install @upstash/ratelimit
```

### `src/lib/ratelimit.ts`

```ts
import 'server-only';
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

export const matchRatelimit: Ratelimit | null = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '60 s'),
      prefix: 'rl:match',
    })
  : null;

export const whatifRatelimit: Ratelimit | null = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '60 s'),
      prefix: 'rl:whatif',
    })
  : null;
```

- `matchRatelimit`: 10 requests per 60 seconds per IP
- `whatifRatelimit`: 20 requests per 60 seconds per IP (what-if is read-only, cheaper)
- Both are `null` when Redis is not configured — routes degrade gracefully

### `src/app/api/match/route.ts`

Add the ratelimit check at the top of the `POST` handler, before body parsing:

```ts
import { matchRatelimit } from '@/lib/ratelimit';

export async function POST(request: NextRequest) {
  if (matchRatelimit) {
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const { success } = await matchRatelimit.limit(ip);
    if (!success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
  }
  // ... rest of handler unchanged
```

### `src/app/api/whatif/route.ts`

Same pattern with `whatifRatelimit`:

```ts
import { whatifRatelimit } from '@/lib/ratelimit';

export async function POST(request: NextRequest) {
  if (whatifRatelimit) {
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const { success } = await whatifRatelimit.limit(ip);
    if (!success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
  }
  // ... rest of handler unchanged
```

**Ratelimit bypass note:** `x-forwarded-for` can be spoofed by direct callers, but Vercel
sets this header from the actual client IP on all requests, overriding any user-supplied
value. Accepted risk for this app's threat model.

### Verify after Commit 3

```bash
npm install
npm test        # 33 tests pass
npm run build   # clean
npm run lint    # exit 0
grep -n "ratelimit\|Ratelimit" src/app/api/match/route.ts src/app/api/whatif/route.ts
# ↑ must show imports and limit() calls in both files
grep "import 'server-only'" src/lib/ratelimit.ts
# ↑ must show the import
```

---

## Acceptance (full gate, run after all three commits)

```bash
npm install
npm test
npm run build
npm run lint
grep -n "ratelimit\|Ratelimit" src/app/api/match/route.ts src/app/api/whatif/route.ts
grep "import 'server-only'" src/lib/ratelimit.ts
grep "withSentryConfig" next.config.ts
grep "register" instrumentation.ts
```

Expected:
- `npm test`: 33+ tests pass, zero failures
- `npm run build`: zero errors, `/api/healthz` appears in route table
- `npm run lint`: exit 0, zero warnings
- ratelimit grep: imports and limit() calls in both route files
- server-only grep: present in `src/lib/ratelimit.ts`
- `withSentryConfig` grep: present in `next.config.ts`
- `register` grep: present in `instrumentation.ts`

---

## Deliverables

Paste the full content of:
- `instrumentation.ts`
- `next.config.ts`
- `src/lib/ratelimit.ts`
- `src/app/api/healthz/route.ts`
- `src/app/api/match/route.ts` (full file)
- `src/app/api/whatif/route.ts` (full file)

Plus terminal output of the full acceptance gate.
