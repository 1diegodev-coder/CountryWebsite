## Status
Accepted

## Context
PRD §6.6 requires "Why You Fit" and "Watch Out For" text per country per user. The V2 plan (PRD §15.1) is to use live LLM calls (Claude API), but V1 must be deterministic, zero-latency, and zero-cost-per-request to remain viable at scale without a monetisation layer.

## Decision
V1 narrative generation uses a structured template library (`NarrativeTemplate` schema) with `{{placeholder}}` interpolation. Templates are selected by `dimension × scoreBand × lifeStage` and parameterised from the country's dimension scores and the user's profile at match time. The matching engine returns all raw scoring context in the result payload (dimension scores, weights, user profile summary) so V2 can pass this directly to a Claude API prompt without re-running the engine.

## Consequences
Narratives will be noticeably templated in V1 — a known trade-off documented in the PRD. The template library requires upfront authoring effort (~30–40 templates). Adding a new country does not require new template authoring. The transition to LLM-powered narrative in V2 is a drop-in replacement of the `generateNarratives()` function with no schema changes required.
