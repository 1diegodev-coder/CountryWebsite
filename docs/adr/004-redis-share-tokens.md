## Status
Accepted

## Context
The prototype encodes quiz answers in the URL hash (`#s=<base64>`), leaking the full user profile (budget, passport, non-negotiables) in any shared link. This is a privacy defect and produces fragile, extremely long URLs.

## Decision
Shareable result URLs use a short opaque token (8-char nanoid) stored in Upstash Redis with a 90-day TTL. The token maps to the result payload only — the user profile answers are never persisted. The URL format is `/r/[token]`. The `GET /api/results/[token]` route reads from Redis and returns the payload. If the token is expired or not found, a friendly 404 page is shown with a prompt to re-run the quiz.

## Consequences
Shared URLs are unguessable and do not expose user data. Redis is a required infrastructure dependency. If Redis is unavailable, share functionality degrades gracefully (share button disabled with a user-facing message; quiz and results continue to work). Result tokens cannot be "claimed" by a V2 account without additional work, but the token schema is designed to support this (see PRD §15.1).

## Implementation Timing
`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` must be configured before the first preview or production deployment where Phase 2 sharing is expected to work. In practice, that means before QA or stakeholders test any of the following flows in a deployed environment:

- submitting a match and generating a share token via `POST /api/match`
- opening a shared result via `GET /api/results/[token]`
- visiting a shared page at `/r/[token]`

For local development, these variables are optional if engineers are only working on the quiz or results UI. Without them, the app may still build, but shared-link persistence is intentionally non-functional.
