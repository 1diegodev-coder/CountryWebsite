# Codex Prompt — Orchestrate Gemini Launch Backlog

You are Codex in `/Users/diegosuarez/Documents/CountryWebsite`.

## Ground Rules

- Read `AGENTS.md`, `DEVELOPMENT.md`, `GEMINI.md`, and `docs/ROADMAP.md` before acting.
- Check `package.json` before assuming the toolchain.
- Treat root `main` as canonical. If on `main`, verify it is clean and synced with `origin/main` before starting.
- Do not build WIP directly on root `main`. Use a feature branch or worktree per phase.
- Do not delete `verify-costs.ts` unless the user explicitly approves that cleanup.
- Do not start PostHog until Phases 6-9 are merged.
- Never merge a Gemini PR without Codex or Claude review.

## Mission

Guide the remaining post-roadmap launch backlog through four Gemini-owned phases:

1. Phase 6: Visa Pathways v1
2. Phase 7: Country metadata expansion
3. Phase 8: Descriptor quality pass
4. Phase 9: Deep Dive confidence caveats

Gemini should do the bulk data/content work. Codex should orchestrate, review, verify, and keep scope tight.

## Step-by-Step Workflow

### 1. Start Clean

Run:

```bash
git status --short --branch
git rev-list --left-right --count main...origin/main
git worktree list
```

If `main` is behind, run `git pull --ff-only`.
If dirty, stop and identify whether the changes are yours or the user’s.

### 2. Run One Phase At A Time

Do not ask Gemini to do multiple phases in one run.

Use these prompt files in order:

- `docs/phase6-gemini-prompt.md`
- `docs/phase7-gemini-prompt.md`
- `docs/phase8-gemini-prompt.md`
- `docs/phase9-gemini-prompt.md`

For each phase:

```bash
gemini --worktree phase/N-name --prompt "$(cat docs/phaseN-gemini-prompt.md)"
```

If using Gemini interactively instead, paste the full phase prompt and require it to stay inside the listed scope.

### 3. Review Gemini Output

For every Gemini branch/PR, inspect:

```bash
git status --short --branch
git diff --stat main...HEAD
git diff main...HEAD
```

Review against the prompt’s allowed files and “DO NOT TOUCH” list.

Phase-specific checks:

- Phase 6: Every top-40 country has 1-4 visa pathways; `sourceUrl` is official government or authorized visa portal; `requiresMinIncome: true` has `incomeRequirement`; no guessed legal data.
- Phase 7: All 195 countries have `capitalCity` and `currency`; no visa, score, cost, or descriptor edits.
- Phase 8: Only descriptors changed; 15-50 words; no score/cost/visa/schema edits.
- Phase 9: Existing badges remain; only explanatory medium/low caveats are added; no data edits.

### 4. Verify

Run after each phase:

```bash
npm test
npm run build
npm run lint
```

Known current build warnings may include Sentry setup warnings and the edge-runtime static-generation warning. Do not treat those as new failures unless they changed materially.

### 5. Merge Or Send Back

If scope and checks are clean:

```bash
git switch main
git pull --ff-only
git merge --ff-only <phase-branch>
npm test
```

Then update `docs/ROADMAP.md` for that phase status if Gemini did not already do so.

If issues are found, do not patch over broad Gemini mistakes silently. Either:

- ask Gemini for a narrow correction on its branch, or
- make a small Codex fix with a clear note about what was changed.

### 6. Sync And Continue

After each merge:

```bash
git switch main
git pull --ff-only
git status --short --branch
```

Then begin the next phase from fresh `main`.

## Completion Criteria

The backlog is ready to move past Gemini content/data work only when:

- Phase 6-9 are merged.
- `npm test`, `npm run build`, and `npm run lint` pass on `main`.
- `docs/ROADMAP.md` reflects the merged phase statuses.
- No PostHog work has been mixed into the data/content phases.
