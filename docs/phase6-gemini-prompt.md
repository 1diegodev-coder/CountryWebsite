## Task

Complete Phase 6: Visa Pathways v1 for the top 40 launch destinations.

Gemini owns the bulk research and data population. Codex/Claude will review the PR for
schema fit, official-source discipline, UI behavior, and data-quality tests.

---

## Context

Stack: Next.js 15, React 19, TypeScript 5.7, Vitest 3, Zod 3.
Branch: `phase/6-visa-pathways` off synced `main`.

Authoritative project docs:
- `DEVELOPMENT.md`
- `PRD.md` §7, §10.1, §10.4, §11.3, §14.2
- `docs/data-parity-2026-04.md` §7 and §10

Current state:
- `visaPathways` is optional on `CountrySchema`.
- `src/lib/schema/visa.ts` defines the PRD-level VisaSchema contract.
- `ResultsView` Deep Dive can render `visaPathways` when present.
- 0/195 countries currently have visa pathway data.

---

## Scope

MODIFY:
- `src/lib/data/countries.ts`
- `src/lib/__tests__/data.test.ts`
- `src/components/__tests__/App.test.tsx` only if the current Deep Dive visa test needs a fixture update

MAY MODIFY ONLY IF NEEDED TO MATCH THE EXISTING CONTRACT:
- `src/lib/schema/visa.ts`
- `src/components/ResultsView.tsx`

DO NOT TOUCH:
- Matching engine scoring or fixture expected results
- Cost breakdown values
- Dimension scores
- Descriptors
- `verify-costs.ts`
- PostHog or analytics files
- Legacy archive files

---

## VisaSchema Shape

Each visa pathway must satisfy:

```ts
{
  pathwayId: string;
  countryCode: string; // ISO2 destination
  visaType: string;
  name: string;
  eligibleLifeStages: Array<
    'founder' | 'remoteEmployee' | 'freelancer' | 'localEmployee' | 'student' | 'semiRetired' | 'retired'
  >;
  incomeRequirement?: {
    amount: number;
    currencyCode: string; // ISO 4217
    period: 'monthly' | 'annual' | 'oneTime';
    notes?: string;
  };
  durationMonths: number;
  renewable: boolean;
  leadsToResidency: boolean;
  residencyYearsRequired: number | null;
  processingWeeks: [number, number];
  difficultyRating: 1 | 2 | 3 | 4 | 5;
  requiresEmployer: boolean;
  requiresMinIncome: boolean;
  notes?: string;
  sourceUrl: string; // required official government source
  lastVerified: 'YYYY-MM-DD';
}
```

Use `lastVerified` as the date you verified the official source during this task.
If `requiresMinIncome` is `true`, `incomeRequirement` is required. If a pathway does not
require minimum income, omit `incomeRequirement` and set `requiresMinIncome: false`.

---

## Top 40 Countries

Populate at least one, and at most four, visa pathway records for each exact country below:

1. United States
2. United Kingdom
3. Canada
4. Australia
5. Germany
6. Spain
7. Portugal
8. United Arab Emirates
9. Singapore
10. Switzerland
11. France
12. Netherlands
13. Mexico
14. Thailand
15. Japan
16. Italy
17. New Zealand
18. Ireland
19. Vietnam
20. Malaysia
21. Costa Rica
22. Indonesia
23. Philippines
24. Brazil
25. Panama
26. Türkiye
27. South Africa
28. China
29. India
30. Greece
31. Austria
32. Sweden
33. Norway
34. Denmark
35. Belgium
36. Poland
37. Czech Republic
38. Israel
39. Saudi Arabia
40. South Korea

---

## Research Standard

- `sourceUrl` must be an official government immigration, foreign ministry, or authorized visa portal URL.
- Secondary sources may be used only to cross-check notes; do not use them as `sourceUrl`.
- Do not fabricate values. If an official source gives a range or varies by applicant, encode the conservative range and explain variance in `notes`.
- Prefer pathways relevant to CountryDNA personas: digital nomad/remote work, skilled worker, entrepreneur/founder, student, retirement/passive income, family where applicable.
- Do not link directly to application CTAs as marketing; link to official information pages.

---

## Implementation Notes

- Add `visaPathways` inside each matching country object in `src/lib/data/countries.ts`.
- Use stable pathway IDs like `PT-D8-DIGITAL-NOMAD`, `CA-EXPRESS-ENTRY`, `ES-DIGITAL-NOMAD`.
- Keep edits surgical. Do not reorder countries.
- Keep all data in TypeScript literals; do not introduce a new data file in this phase.
- Preserve `import "server-only";` as the first line of `countries.ts`.

---

## Required Tests

Add data tests in `src/lib/__tests__/data.test.ts`:

- The exact top 40 country names above each have `visaPathways.length >= 1`.
- No country has more than 4 visa pathways.
- Every visa pathway parses with `VisaSchema`.
- Every visa pathway has an official-looking HTTPS `sourceUrl` and a `lastVerified` date.
- Every visa pathway `countryCode` matches the containing country `iso2`.

If the Deep Dive test fixture in `App.test.tsx` breaks because of the schema shape, update the fixture only.

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
- Top 40 visa coverage gate passes.
- Deep Dive still displays visa cards and inline visa disclaimer.
- No unrelated data, scoring, descriptor, cost, or analytics changes.
