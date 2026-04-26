## Status
Accepted

## Context
With multiple agents (Claude, Codex, Gemini) building different tracks concurrently, type drift between the API contract, the matching engine, and the frontend is the primary integration risk. The prototype had no shared type system.

## Decision
Zod is the single source of truth for all shared data shapes. Each schema file exports both a Zod schema object (for runtime validation) and its TypeScript inferred type (for static checks). The `src/lib/schema/` directory is the canonical contract layer — no agent may define a data shape outside this directory without an ADR update. TypeScript strict mode with `noUncheckedIndexedAccess` is enforced so schema mismatches surface at compile time.

## Consequences
Every agent must import types from `@/lib/schema/` rather than defining local interfaces. Adding a field to a schema requires updating all consumers. The Vitest schema-compile tests catch regressions before they reach integration. Zod's runtime overhead is negligible for this use case (matching computation, not hot paths).
