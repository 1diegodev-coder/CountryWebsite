## Status
Accepted

## Context
The CountryDNA prototype is a client-side HTML/Babel/CDN app. It validates the UX concept but exposes all country data to the browser bundle and cannot support server-side matching, shareable URLs with stored results, or a proper CI pipeline. A production rebuild is required.

## Decision
Use Next.js 15 App Router with TypeScript on Vercel. The App Router enables hybrid SSR/SSG: the landing page and shared result pages are statically rendered for SEO, while the quiz and results panels are Client Components. API Routes host the server-side matching engine so country data never reaches the client bundle. Vercel provides zero-config preview deployments and built-in edge caching, which directly satisfies PRD §9.2 and §13.3.

## Consequences
The team must learn App Router conventions (Server vs Client Components, route handlers). The `"use client"` boundary must be placed carefully to avoid bloating the client bundle. Vercel vendor lock-in is accepted as a deliberate trade-off for operational simplicity at this stage.
