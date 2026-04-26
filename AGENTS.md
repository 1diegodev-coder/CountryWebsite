# AGENTS.md

This file provides behavioral guidance to Codex and other agents working in this repository.

## Operational Mandates
1. **Single Source of Truth:** You MUST adhere to the architecture, standards, and workflow defined in **DEVELOPMENT.md**.
2. **Verify Toolchain:** Always check `package.json` before assuming the toolchain or build system. The project has migrated from a CDN-based static site to Next.js 15.
3. **Code Trumps Docs:** If any documentation (including this file or DEVELOPMENT.md) conflicts with the actual code or configuration files, the **code/config wins**.
4. **Preserve Persistence:** Do not break the `localStorage` hydration/persistence logic in `App.tsx`.
5. **Worktree Hygiene:** Treat the root checkout as the canonical `main` worktree. Do feature implementation on a feature branch/worktree, and after merge sync root `main` with `git pull --ff-only` and remove merged local worktrees/branches before starting the next task.

## Behavioral Instructions
- Prioritize surgical edits over large refactors.
- Maintain the "Editorial + Data" aesthetic described in the PRD.
- Ensure all matching engine changes are verified against fixtures in `fixtures/`.
- If the current checkout is `main`, check whether it is behind `origin/main` before starting work. Sync it first unless the user explicitly wants a different state.
- If root `main` is dirty while the active work lives in another worktree, do not keep building on root `main`; switch to the correct worktree or pause before any destructive cleanup.
