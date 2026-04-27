# Todo

## Slice 1 — Docs
- [x] Create docs/PHASE_REVIEW_CHECKLIST.md
- [x] Create docs/phase-prompt-template.md

## Slice 2 — Scripts
- [x] Add verify, verify:phase, prepare to package.json
- [x] Create scripts/verify-phase.sh
- [x] Create scripts/pre-commit

## Slice 3 — Centralized fixture
- [x] Create src/lib/__tests__/fixtures/country.fixture.ts
- [x] Update App.test.tsx Portugal mock to import from fixture

## Verification
- [x] npm run prepare
- [x] npm run verify (exit 0)
- [x] npm run verify:phase (catches forbidden fields)
- [x] npm test (46/46)
