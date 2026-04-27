# Plan: Harden Gemini Phase Review Process

## Context

Phases 6-9 revealed four recurring failure modes requiring manual cleanup every phase:
- **Scope drift** — Gemini touched files outside the allowed list
- **False verification** — Gemini reported tests passed when jsdom suite was crashing
- **Fixture/schema sync** — New required schema fields broke test mocks silently
- **Hygiene** — Trailing whitespace, weak assertions caught only in human review

## Slices

### Slice 1 — Docs
- `docs/PHASE_REVIEW_CHECKLIST.md` — machine-verifiable handoff form
- `docs/phase-prompt-template.md` — reusable phase prompt template with mandatory pre-completion block

### Slice 2 — Scripts
- `npm run verify` — git diff --check + npm test + build + lint
- `npm run verify:phase` — parameterised scope + forbidden-field check
- `scripts/pre-commit` + `npm run prepare` — pre-commit hook without husky

### Slice 3 — Centralized fixture
- `src/lib/__tests__/fixtures/country.fixture.ts` — typed Country mock, TypeScript-enforced schema sync
- Update `App.test.tsx` Portugal inline mock → import from fixture

## Files Modified
| File | Action |
|---|---|
| `docs/PHASE_REVIEW_CHECKLIST.md` | Create |
| `docs/phase-prompt-template.md` | Create |
| `scripts/verify-phase.sh` | Create |
| `scripts/pre-commit` | Create |
| `package.json` | Add verify, verify:phase, prepare scripts |
| `src/lib/__tests__/fixtures/country.fixture.ts` | Create |
| `src/components/__tests__/App.test.tsx` | Portugal mock → fixture import |

## Verification
```bash
npm run prepare
npm run verify
ALLOWED_FILES="src/lib/data/countries.ts,src/lib/__tests__/data.test.ts" \
FORBIDDEN_FIELDS="costBreakdown,dimensions" \
npm run verify:phase
npm test  # must still be 46/46
```
