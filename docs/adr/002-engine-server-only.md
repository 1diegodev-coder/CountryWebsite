## Status
Accepted

## Context
The prototype runs the matching engine client-side, exposing all dimension scores, visa pathway data, and raw country data in the JavaScript bundle. This violates PRD §9.2 ("country data never exposed to client") and §11.4 (IP considerations around data source licensing terms).

## Decision
The matching engine and all country data live exclusively in Next.js API Route Handlers (server-side). The client receives only the result payload (ranked matches, eliminated list, narratives). No country dimension scores, raw data fields, or visa pathway details are included in the client bundle. The `/api/match`, `/api/whatif`, and `/api/countries/[code]` routes are the only surface through which country data leaves the server.

## Consequences
All matching logic must be implemented in TypeScript on the server. Client-side What-If slider updates require a debounced API call to `/api/whatif` rather than in-memory recomputation. This adds ~100 ms latency per slider move, which is within the PRD §13.2 target of < 300 ms perceived.
