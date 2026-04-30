# Gemini Prompt - Soft Beta Phase 7: Sharing And Deploy Readiness

## Preamble - required

Before starting:

1. **Branch discipline.** Create and switch to `soft-beta/7-sharing-deploy-readiness` off the current accepted `main` after Soft Beta Phase 6 is merged. Do not work directly on `main`.
2. **Read context first.** Read `AGENTS.md`, `DEVELOPMENT.md`, `docs/SOFT_BETA_ROADMAP.md`, `docs/PHASE_REVIEW_CHECKLIST.md`, `docs/adr/004-redis-share-tokens.md`, `.env.example`, and this prompt before editing.
3. **Verify toolchain.** Read `package.json` before assuming commands or framework versions.
4. **Full test suite first.** Run `npm test` and verify it exits 0 before editing. Both node and jsdom projects must pass. Do not report a test count unless you ran the command and read the output.
5. **No artifacts.** Do not leave `.bak`, `.orig`, temp files, debug scripts, screenshots, or generated reports unless explicitly requested in this prompt.
6. **No hidden scope drift.** Do not make whitespace-only edits, formatting churn, or documentation changes outside the phase scope. If an unexpected file must change, stop and explain why before continuing.
7. **Clean handoff required.** A phase handoff is invalid unless all intended files are committed and `git status --short --branch` shows a clean working tree.

Do not report complete until browser QA exercises the real share/read-only paths affected by this phase and confirms no unexpected console errors or server 4xx/5xx responses.

## Task

Complete Soft Beta Phase 7: Sharing And Deploy Readiness. Make share-link and read-only result flows dependable for soft beta, with graceful behavior when Redis is missing and clear user-facing copy around disabled sharing and the unfinished PNG export.

## Context

Stack: Next.js 15, React 19, TypeScript 5.7, Vitest 3, Zod 3.
Branch: `soft-beta/7-sharing-deploy-readiness` off synced current `main`.

Authoritative references:
- `DEVELOPMENT.md`
- `docs/SOFT_BETA_ROADMAP.md`
- `docs/PHASE_REVIEW_CHECKLIST.md`
- `docs/adr/004-redis-share-tokens.md`
- `.env.example`
- `src/components/ResultsView.tsx`
- `src/app/r/[token]/page.tsx`
- `src/app/r/[token]/SharedResultsClient.tsx`
- `src/app/api/results/[token]/route.ts`
- `src/lib/redis.ts`

Current relevant state:
- `shareReady` means the result payload was persisted to Redis and can be shared.
- Missing Redis envs should disable sharing without breaking quiz/results.
- `/r/[token]` is a read-only shared results route backed by Redis.
- Phase 6 guarded empty results so share cannot open when there are no matched countries.
- PNG export is currently not real and should not look like a production-ready feature unless implemented completely.

## Scope

MODIFY:
- `src/components/ResultsView.tsx`
- `src/components/__tests__/App.test.tsx`
- `src/app/r/[token]/page.tsx`
- `src/app/r/[token]/SharedResultsClient.tsx`
- `src/app/api/results/[token]/route.ts`
- `src/lib/redis.ts` only if missing-env behavior is actually broken
- `src/lib/__tests__/redis.test.ts` only if `src/lib/redis.ts` changes
- `.env.example` only if deploy/readiness notes are incomplete or misleading
- `src/app/globals.css` only if required for small state styling
- `docs/PHASE_REVIEW_CHECKLIST.md`

If you add a new test file, include it explicitly in both `git diff --name-status main...HEAD` and the `ALLOWED_FILES` value used for `verify:phase`.

DO NOT TOUCH:
- `src/lib/data/countries.ts`
- `src/lib/__tests__/data.test.ts`
- `src/lib/schema/**`
- `src/lib/engine.ts`
- `fixtures/**`
- `archive/**`
- Visa pathway records
- Country scores, costs, descriptors, dimensions, capitals, currencies, or legal/immigration claims
- Sentry, PostHog, analytics, privacy, or compliance work; those belong to Phase 8
- Performance/device-matrix work; that belongs to Phase 9
- Prototype parity polish; that belongs to Phase 11

## Required Work

Keep edits surgical. Do not redesign the results page.

1. **Missing Redis / disabled sharing**
   - Confirm local behavior with Redis env vars missing.
   - The quiz and results must still work.
   - The share button must be disabled when `shareReady` is false.
   - Disabled copy must be clear, calm, and specific: sharing is unavailable because cloud sync is offline; local results still work.
   - Avoid implying the user did something wrong.

2. **Share-ready state**
   - When `shareReady` is true and at least one match exists, the share modal should open reliably.
   - The modal should show a valid `/r/[token]` link.
   - Copy should explain that anyone with the link can view the result and that results expire according to ADR 004.
   - The share modal must remain keyboard accessible and preserve existing focus-return behavior.

3. **Read-only shared results**
   - Verify `/r/[token]` renders `ResultsView` in read-only mode.
   - Read-only mode must not show share controls, What-If controls, override controls, or editable guidance.
   - Read-only mode should keep "Take Your Own Quiz" available.
   - Expired/missing/unavailable tokens should produce understandable fallback behavior, not a broken page.

4. **PNG export decision**
   - Prefer de-emphasizing or removing the PNG CTA for soft beta unless you implement a complete, tested PNG export.
   - Do not implement a complex export library in this phase without explicit approval.
   - If you keep the CTA, label it clearly as unavailable/not part of soft beta and make the state accessible.

5. **Deploy readiness notes**
   - Ensure `.env.example` accurately documents the Redis env vars used by share/read-only flows.
   - Do not add secrets.
   - Do not add deployment-provider-specific config unless already present and necessary.

## Required Tests

Add or update focused tests. Tests must fail for the exact bug classes this phase covers and include at least one negative assertion.

Required coverage:
- `shareReady: false` disables the share button and shows clear disabled/offline copy.
- `shareReady: true` with matches opens the share modal and renders a `/r/[token]` link.
- Empty results remain non-shareable even if `shareReady` is true, preserving the Phase 6 regression guard.
- Read-only `ResultsView` hides share controls, What-If tab, and elimination override controls.
- Read-only `ResultsView` still shows "Take Your Own Quiz."
- PNG export CTA is either absent/de-emphasized or clearly unavailable, with an accessible status if clicked.
- If `src/app/api/results/[token]/route.ts` behavior changes, add tests for missing Redis, invalid token, not found, and successful lookup where practical.

Use the existing Vitest and Testing Library style in:
- `src/components/__tests__/App.test.tsx`
- `src/lib/__tests__/redis.test.ts` if Redis module behavior changes

Component tests with mocks are acceptable for precise states, but they are not enough by themselves. Browser QA must exercise the real app path.

## Browser QA

Required.

Run the app locally and complete focused browser smoke tests:

1. **Missing Redis envs**
   - Start the app with Redis env vars absent or empty.
   - Complete the quiz into results.
   - Confirm results render, share is disabled, disabled copy is understandable, and no unexpected console errors or server `4xx`/`5xx` responses occur.

2. **Read-only shared route**
   - If Redis envs are available, create a real share link through the UI, open `/r/[token]`, and confirm read-only mode.
   - If Redis envs are not available, document that present-env verification was not possible and verify graceful unavailable/fallback behavior instead.

3. **Share modal**
   - With a mocked or real share-ready result, verify the modal opens, copy link works if clipboard is available, Escape closes the modal, and focus returns to the share button.

4. **PNG export**
   - Verify whatever decision you made: removed/de-emphasized/unavailable, with no misleading production-ready claim.

Check browser console and server logs. Include concise notes in the handoff.

## Acceptance

Run these commands in order. Do not skip any.

```bash
git diff --check
git status --short --branch
git diff --name-status main...HEAD
ALLOWED_FILES="src/components/ResultsView.tsx,src/components/__tests__/App.test.tsx,src/app/r/[token]/page.tsx,src/app/r/[token]/SharedResultsClient.tsx,src/app/api/results/[token]/route.ts,src/lib/redis.ts,src/lib/__tests__/redis.test.ts,.env.example,src/app/globals.css,docs/PHASE_REVIEW_CHECKLIST.md" FORBIDDEN_FIELDS="src/lib/data/countries.ts,src/lib/__tests__/data.test.ts,src/lib/schema,src/lib/engine.ts,fixtures,archive,docs/visa-trust-audit.md,docs/ROADMAP.md,docs/SOFT_BETA_ROADMAP.md" npm run verify:phase
npm test
npm run build
npm run lint
```

Then fill out `docs/PHASE_REVIEW_CHECKLIST.md` completely under a new section:

```md
### soft-beta/7 - Sharing And Deploy Readiness
```

Before reporting complete:

1. `git diff --check` exits 0.
2. `git status --short --branch` shows `soft-beta/7-sharing-deploy-readiness` and no uncommitted files.
3. `git diff --name-status main...HEAD` output contains only files in the MODIFY list above, explicitly approved optional files, or justified scope exceptions.
4. Every changed file appears in the `ALLOWED_FILES` value used for `verify:phase`.
5. `npm run verify:phase` exits 0 after all intended files are committed.
6. `npm test` exits 0. Paste the final `N passed` line verbatim.
7. `npm run build` exits 0.
8. `npm run lint` exits 0.
9. Browser QA notes are included, including whether Redis-present QA was possible.
10. `docs/PHASE_REVIEW_CHECKLIST.md` is filled out completely.

Do not report complete until all of the above are satisfied.
