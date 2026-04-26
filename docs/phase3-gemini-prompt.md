## Task
Convert `src/app/r/[token]/page.tsx` from a client-side fetch component to a Next.js 15
App Router Server Component that fetches from Redis on the server and exports
`generateMetadata` for OG tags.

Read `docs/phase2-boundary.md` §2 first — `src/lib/redis.ts` is now server-only and may
be imported directly in Server Components.

---

## Context

Stack: Next.js 15.1.7, React 19, TypeScript 5.7.
Branch: `phase/3-ssr` off `main`.

Current problem: `/r/[token]` is `"use client"` with a `useEffect` that fetches
`/api/results/${token}` after the browser loads. This means:
- OG tags cannot be computed server-side (social sharing shows no preview)
- The page renders a loading spinner before showing any content
- The token lookup adds a redundant client → server → Redis round-trip

Target: the page becomes an async Server Component that reads Redis directly, renders
full content on first response, and exports `generateMetadata` so social previews work.

The `MatchPayload.matches[0].countryName` field now exists (added in Phase 2) and must
be used in OG titles.

---

## Scope

CREATE:
  src/app/r/[token]/SharedResultsClient.tsx   (new "use client" shell)

MODIFY:
  src/app/r/[token]/page.tsx                  (convert to Server Component)

DO NOT TOUCH:
  src/app/api/results/[token]/route.ts        (keep as-is)
  src/components/ResultsView.tsx
  src/lib/redis.ts
  Any test file
  Any other file not listed above

---

## Implementation

### Step 1 — Create `SharedResultsClient.tsx`

This is the "use client" shell. It receives the already-fetched payload as a prop and
renders `ResultsView` with the appropriate handlers.

```tsx
"use client";

import { useRouter } from "next/navigation";
import ResultsView from "@/components/ResultsView";
import { MatchPayload } from "@/lib/schema/match";
import { UserProfile } from "@/lib/schema/profile";

export default function SharedResultsClient({ result }: { result: MatchPayload }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg-primary">
      <ResultsView
        result={result}
        onRetake={() => router.push("/")}
        tweaks={{ accentColor: "#4ADE80", minMatchPct: 65 }}
        profile={{} as UserProfile}
        onUpdateResult={() => {}}
        isReadOnly={true}
      />
    </div>
  );
}
```

### Step 2 — Rewrite `page.tsx` as a Server Component

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { redis } from "@/lib/redis";
import { MatchPayload } from "@/lib/schema/match";
import SharedResultsClient from "./SharedResultsClient";

type Props = { params: Promise<{ token: string }> };

async function fetchResult(token: string): Promise<MatchPayload | null> {
  if (!redis) return null;
  const data = await redis.get(`result:${token}`);
  if (!data) return null;
  return (typeof data === "string" ? JSON.parse(data) : data) as MatchPayload;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const result = await fetchResult(token);

  if (!result || result.matches.length === 0) {
    return { title: "CountryDNA — Shared Results" };
  }

  const topMatch = result.matches[0];
  const title = `${topMatch.countryName} is your top match — CountryDNA`;
  const description = result.profileSummary;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function SharedResultsPage({ params }: Props) {
  const { token } = await params;

  if (!token || token.length !== 8) {
    notFound();
  }

  const result = await fetchResult(token);

  if (!result) {
    notFound();
  }

  return <SharedResultsClient result={result} />;
}
```

---

## Constraints

- Do NOT add `"use client"` to `page.tsx`.
- Do NOT use `useParams`, `useEffect`, or `useState` in `page.tsx`.
- The `fetchResult` helper must guard against `redis === null` (it returns `null` in that
  case, which `notFound()` handles downstream).
- `params` must be `await`ed — in Next.js 15, route params are a Promise.
- The `redis.get()` return may be a pre-parsed object or a JSON string depending on how
  the Upstash client was used at write time. The existing pattern
  `typeof data === "string" ? JSON.parse(data) : data` handles both — keep it.
- Do not call `/api/results/${token}` from inside the Server Component — that adds a
  redundant network hop. Read Redis directly.
- Do not add `export const dynamic = "force-dynamic"` — Next.js infers dynamic rendering
  from the async data fetch automatically.

---

## Acceptance

```bash
npm install
npm test
npm run build
npm run lint
```

Expected:
- `npm test`: 33+ tests pass, zero failures
- `npm run build`: `/r/[token]` shows as `ƒ (Dynamic)` in the route table
- `npm run lint`: exit 0, zero warnings
- `page.tsx` has no `"use client"` directive
- `generateMetadata` is exported from `page.tsx`

---

## Deliverables

Paste the full content of both files:
- `src/app/r/[token]/page.tsx`
- `src/app/r/[token]/SharedResultsClient.tsx`

Plus terminal output of the acceptance commands.
