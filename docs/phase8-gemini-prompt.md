## Task

Complete Phase 8: Rewrite stub-level country descriptors.

This is content-only. Bring short descriptors up to the PRD §10.1 standard without touching scores, costs, visas, or schema.

---

## Context

Stack: Next.js 15, React 19, TypeScript 5.7, Vitest 3, Zod 3.
Branch: `phase/8-descriptor-quality` off synced `main` after Phase 7 is merged.

Authoritative references:
- `DEVELOPMENT.md`
- `PRD.md` §8 and §10.1
- `docs/data-parity-2026-04.md` §6

Current gap:
- 131/195 descriptors are under 15 words.
- PRD target is 1-2 sentences, roughly 15-50 words.

---

## Scope

MODIFY:
- `src/lib/data/countries.ts`
- `src/lib/__tests__/data.test.ts`

DO NOT TOUCH:
- Schema files
- Visa pathway records
- Capital/currency metadata
- Cost breakdowns
- Dimension scores
- Matching engine logic or expected fixtures
- UI components
- Analytics/PostHog work
- Legacy archive files

---

## Content Standard

Rewrite every descriptor under 15 words.

Requirements:
- 15-50 words.
- 1-2 complete sentences.
- Editorial + data tone: specific, warm, precise.
- No hype that implies advice or certainty.
- No unsupported claims about safety, visas, tax, or healthcare unless already reflected in nearby country data.
- Avoid repeating one template across many countries.
- Use British spelling where natural, matching existing copy.

---

## Required Tests

Add or update tests in `src/lib/__tests__/data.test.ts`:

- Every descriptor is non-empty.
- Every descriptor has at least 15 words.
- Every descriptor has at most 50 words.

If a country genuinely requires an exception, add an explicit named exemption list with a comment explaining why. Keep exemptions as close to zero as possible.

---

## Acceptance

Run:

```bash
npm test
npm run build
npm run lint
```

Expected:
- All tests pass.
- Descriptor quality gate passes.
- No schema, visa, cost, scoring, or UI changes.
