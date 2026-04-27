## Task

Complete Phase 9: Data confidence caveats in Deep Dive.

Keep existing result-card confidence badges and add stronger detail-level caveats where users inspect country data.

---

## Context

Stack: Next.js 15, React 19, TypeScript 5.7, Vitest 3, Zod 3.
Branch: `phase/9-confidence-caveats` off synced `main` after Phase 8 is merged.

Authoritative references:
- `DEVELOPMENT.md`
- `PRD.md` §7.5 and §11.3
- `docs/data-parity-2026-04.md` §2 and §10

Current state:
- Result cards already surface non-high `dataConfidence`.
- Deep Dive already surfaces a compact non-high confidence badge near the country title.
- Phase 9 should add explanatory caveat copy for `medium` and `low` confidence countries,
  without duplicating the existing badge.
- Do not improve the 27 low-confidence country records in this phase.

---

## Scope

MODIFY:
- `src/components/ResultsView.tsx`
- `src/components/__tests__/App.test.tsx`

DO NOT TOUCH:
- Country data values
- Visa pathway records
- Capital/currency metadata
- Descriptors
- Schema files unless a type-only adjustment is required
- Matching engine logic or expected fixtures
- Analytics/PostHog work

---

## UI Requirements

- Keep the existing result-card confidence badge unchanged.
- Keep the existing Deep Dive confidence badge unchanged.
- Add short explanatory copy near the existing Deep Dive badge when `dataConfidence !== "high"`.
- Copy must be direct and non-alarming:
  - Medium: "Some country-level data uses blended or estimated sources. Verify details before making decisions."
  - Low: "This country has limited or unstable source data. Treat scores as directional and verify details before making decisions."
- Do not hide countries or change scoring.

---

## Required Tests

Update `src/components/__tests__/App.test.tsx`:

- Assert Deep Dive keeps the existing confidence badge.
- Assert Deep Dive shows the medium-confidence explanatory caveat.
- Assert Deep Dive shows the low-confidence explanatory caveat.
- Assert high-confidence countries do not show either caveat.

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
- Existing result-card badge behavior remains.
- Existing Deep Dive badge behavior remains.
- Deep Dive explanatory caveats appear only for medium/low confidence countries.
- No data/scoring changes.
