## Task

Complete Phase 7: Country schema metadata expansion.

Add `capitalCity` and `currency` to every active country record.

---

## Context

Stack: Next.js 15, React 19, TypeScript 5.7, Vitest 3, Zod 3.
Branch: `phase/7-country-metadata` off synced `main` after Phase 6 is merged.

Authoritative references:
- `DEVELOPMENT.md`
- `PRD.md` §10.1
- `docs/data-parity-2026-04.md` §9 and §10

Current gap:
- PRD §10.1 requires capital city and currency for country profile/deep dive content.
- `CountrySchema` does not yet include these fields.

---

## Scope

MODIFY:
- `src/lib/schema/country.ts`
- `src/lib/data/countries.ts`
- `src/lib/__tests__/data.test.ts`
- `src/components/ResultsView.tsx` if Deep Dive should surface these fields
- `src/components/__tests__/App.test.tsx` if Deep Dive fixture needs metadata

DO NOT TOUCH:
- Visa pathway records except to preserve them
- Matching engine logic or expected fixtures
- Descriptors
- Cost breakdowns
- Dimension scores
- Analytics/PostHog work
- Legacy archive files

---

## Data Shape

Add these required fields to `CountrySchema`:

```ts
capitalCity: z.string().min(1),
currency: z.object({
  code: z.string().length(3),
  name: z.string().min(1),
}),
```

Use ISO 4217 currency codes. For countries without a dedicated sovereign currency, use the legal tender used in the dataset context, e.g. `EUR`, `USD`, `AUD`, or other applicable code. Add a short comment only if a record is genuinely ambiguous.

---

## Implementation Notes

- Populate all 195 country records.
- Preserve the existing country order.
- Keep `PublicCountrySchema` behavior: capital/currency should be publicly returned by `/api/countries/[code]`.
- If rendering in Deep Dive, place capital/currency as compact metadata near the country title, not in a new large section.

---

## Required Tests

Add tests in `src/lib/__tests__/data.test.ts`:

- Every country has non-empty `capitalCity`.
- Every country has `currency.code` as three uppercase letters.
- Every country has non-empty `currency.name`.
- All 195 countries still satisfy `CountrySchema`.

If Deep Dive renders the fields, update the component test fixture and assert that capital/currency appear.

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
- 195/195 countries have capital/currency metadata.
- No visa, descriptor, cost, scoring, or analytics changes.
