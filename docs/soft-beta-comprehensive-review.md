# Soft Beta Comprehensive Review

**Date:** 2026-05-01
**Reviewer:** Claude (Opus 4.7)
**Review tree:** `review/integrated-9-11` at `1cbb1ff` — local merge of `soft-beta/11-implementation-polish` (`85ce904`) + `soft-beta/9-performance-device-matrix` (`22be46d`)
**Scope:** All soft-beta phases through Phase 11. Pre-Phase 12 launch-gate review.

---

## 1. Recommendation

**CONDITIONAL GO — fix the four P1 items in [Section 9](#9-findings-updated-for-integrated-tree) (F-12, F-13, F-14, F-15) before Phase 12.** They are all in the new `/api/match/count` route added by Phase 11. None take more than ~30 minutes individually, but shipping without them would put a poorly-defended new attack surface in production.

The rest of the integrated tree is production-quality: it builds, tests, and runs cleanly; all Phase 9 / Phase 11 deliverables are present and functioning end-to-end in the browser.

**Important pre-Phase-12 note on branch state:**
- `main` is currently at `d019ab8` (only the Phase 11 gap report has landed; the Phase 9 perf docs/code and the Phase 11 implementation are sitting on `soft-beta/9-performance-device-matrix` and `soft-beta/11-implementation-polish` respectively).
- The two branches both fork from `d019ab8` and they merge cleanly **except for `docs/PHASE_REVIEW_CHECKLIST.md`**, which has trivially additive conflicts (each branch added its own checklist section). Resolution: keep all three new sections — see [Section 8](#8-merge-handoff-for-phase-12) below.
- After resolving that one file, **89 / 89 tests** pass on the integrated tree. Build clean. Lint clean.

---

## 2. Baseline Verification (Integrated Tree)

| Command | Exit | Result |
|---|---|---|
| `git status --short --branch` | 0 | clean tree, head `1cbb1ff` |
| `npm install --ignore-scripts` | 0 | lockfile resolves; 2 moderate transitive vulns (F-09) |
| `npm test` | 0 | **89 / 89 passed** across 16 test files (80 base + 3 Phase 9 perf + 6 Phase 11 quizCounter/Phase11) |
| `npm run build` | 0 | clean compile; 7 routes (added `/api/match/count`); only the expected edge-runtime static-generation warning |
| `npm run lint` | 0 | zero warnings |

**Sentry deprecation warnings — confirmed gone post-Phase 8.** No deprecation noise on the dev server in the integrated tree either.

**Bundle observations:**
- Landing route grew from 7.78 kB → 9.32 kB (+20%) — accounted for by Phase 11's "How it works" + Product Preview + footer additions. First Load JS still at 245 kB. Acceptable.
- New `/api/match/count` route at 317 B serverless function size.

---

## 3. Phase-By-Phase Pass/Fail (Merged Phases)

| Phase | Status | Evidence |
|---|---|---|
| Phase 3 — Integration Hotfixes | ✅ PASS | `/api/match` 200 with full profile shape; What-If wrapped body 200; no stale-closure regression |
| Phase 4 — Accessibility & Interactions | ✅ PASS | radios labeled, ARIA on radiogroup, modal close behavior intact |
| Phase 5 — Globe Stability | ✅ PASS | fallback shell renders immediately; reduced-motion + visibility pause covered by tests |
| Phase 6 — Results UX & Trust Polish | ✅ PASS | Show-more counts ("Show 10 more of 113"), empty-state guards intact, Deep Dive loading/error retained |
| Phase 7 — Sharing & Deploy Readiness | ✅ PASS | "Cloud Sync Offline" banner + disabled share when no Redis; `/r/[token]` ExpiredResult renders for unknown 8-char token; share-readiness invalidated after What-If |
| Phase 8 — Observability, Privacy & Compliance | ✅ PASS | telemetry events live with allowlisted metadata only (`deep_dive_opened {"section":"overview"}` — no country code leaked); Sentry config files all present, deprecation warnings gone |
| Phase 9 — Performance Budget & Device Matrix | ✅ PASS | [docs/soft-beta-performance-device-matrix.md](docs/soft-beta-performance-device-matrix.md) populated with measured numbers (all PASS, one WARN on globe asset size); [src/lib/performanceBudget.ts](src/lib/performanceBudget.ts) helper + tests added |
| Phase 10A — Visa Trust Audit | ✅ PASS | report exists, drives 10B/10C |
| Phase 10B — Visa Pathway Restoration | ✅ PASS | 65 `sourceUrl`/`lastVerified` pairs; spot-check `/api/countries/{ES,UY,GE}` → 200 with expected shapes |
| Phase 10C — Visa Trust UI Polish | ✅ PASS | Spain Visa Guide modal: "Source verified" badge, `<time datetime="2026-04-27">2026-04-27</time>`, no "Coming soon"; Slovenia (no pathways): "Not verified in-app yet" panel |
| Phase 11 — Prototype Parity & Product Polish | ✅ PASS | see Section 4 |

---

## 4. Phase 11 Deliverables — Live Verification

Phase 11's gap report listed 6 items. Phase 11 implementation prompt explicitly **deferred** 2 of them. Status of the remaining 4:

| Gap-Report Item | Priority | Status | Evidence |
|---|---|---|---|
| Live counter decrement | P0 | ✅ Implemented | Quiz starts at counter **164** (not the static 195); `POST /api/match/count` returns `{count: 164}` for empty profile, `{count: 99}` with $1500 budget, `{count: 1}` with $500. Counter narrows in the UI when budget is set. |
| Landing below-fold | P0 | ✅ Implemented | "How it works" 3-step section ("Build your profile" / "Real-time matching" / "Deep-dive insights"); Product Preview card (Portugal sample, 94% Match, $2,450); Footer legal disclaimer + "Start the quiz" CTA |
| Deep Dive Data Snapshot | P1 | ✅ Implemented | Slovenia Deep Dive shows new "Data Snapshot" section with: Stability 9.5/10, Daily English 8.2/10, Internet Reliability 9.4/10, Air Quality (AQI) 30, Climate Range -2°C to 27°C |
| Elimination Breakdown | P1 | ✅ Implemented | ELIM tab groups eliminated countries by reason ("budget (6)") and shows specific reason text per card ("Est. monthly cost $5,090 exceeds your $3,500 budget") with an "Override" button |
| Predictive What-If labels | P1 | 🚫 Deferred | Phase 11 prompt explicitly excluded ("Predictive What-If labels unless explicitly approved separately"). Current What-If shows generic helper text ("Increasing your budget may rescue countries previously eliminated for cost") rather than predictive counts. **Not a regression — by design.** |
| Top match pulsing on globe | P1 | 🚫 Deferred | Phase 11 prompt explicitly excluded. **Not a regression — by design.** |

[docs/soft-beta-known-limitations.md](docs/soft-beta-known-limitations.md) was added by Phase 11; it documents PNG export disabled, city-level matching as V2, comparison mode deferred, AI narrative as V2, quiz-counter sensitivity caveats, data-freshness, edge-runtime, and English-only / USD-only constraints. Comprehensive.

---

## 5. Static / Structural Checks

### Server-only data boundary
`grep "from '@/lib/data/countries'" src/components src/app` returns one match — [src/app/api/countries/[code]/route.ts:3](src/app/api/countries/[code]/route.ts) (server context). No client leakage. **Note:** Phase 11 added [src/app/api/match/count/route.ts](src/app/api/match/count/route.ts) and [src/lib/quizCounter.ts](src/lib/quizCounter.ts) — verified that `quizCounter.ts` does not import countries directly; the count endpoint runs server-side using the engine.

### Telemetry allowlist (Phase 8)
[src/lib/telemetry.ts](src/lib/telemetry.ts) intact. Live test:
- `[Telemetry] quiz_started {}`
- `[Telemetry] results_viewed {matchCountBucket:'51+', isReadOnly:false}`
- `[Telemetry] deep_dive_opened {"section":"overview"}` — country code suppressed ✓
- `[Telemetry] what_if_used {}`

### Sentry / instrumentation files (Phase 8)
All present: [instrumentation.ts](instrumentation.ts), [instrumentation-client.ts](instrumentation-client.ts), [sentry.server.config.ts](sentry.server.config.ts), [sentry.edge.config.ts](sentry.edge.config.ts), [src/app/global-error.tsx](src/app/global-error.tsx). `sentry.client.config.ts` correctly absent.

### Empty-matches share guard + Phase 7 invalidation
Intact in [src/components/ResultsView.tsx](src/components/ResultsView.tsx).

### Visa pathway data (Phase 10B)
65 `sourceUrl`/`lastVerified` pairs across 195 countries. API spot-checks confirmed.

### Phase 9 perf module
[src/lib/performanceBudget.ts](src/lib/performanceBudget.ts) exposes `PERFORMANCE_BUDGETS` (LANDING_READY 1500, QUIZ_STEP_LATENCY 100, RESULTS_INITIAL_RENDER 800, DEEP_DIVE_OPEN 300, WHAT_IF_LATENCY 1500, SHARE_MODAL_OPEN 200), `checkBudget` helper, and `DEVICE_VIEWPORTS` matrix.

---

## 6. Browser QA (Real App Path, Integrated Tree)

Dev server at `http://localhost:64602`. Walked the funnel.

### Landing
- Hero visible, "Begin your match" CTA present.
- Below-fold "How it works" 3-step section renders. ✓
- Product Preview card with Portugal sample renders. ✓
- Footer legal disclaimer + "Start the quiz" CTA renders. ✓

### Quiz
- Step 01/13 with 5 radios for life-stage; counter shows **164** (Phase 11 live counter, not static 195). ✓
- Selecting Q1 (life-stage) keeps counter at 164 — correct, life-stage doesn't filter.

### `/api/match/count` (Phase 11)
- Empty body → 164
- `{lifeStage: 'remoteEmployee'}` → 164 (unchanged — life-stage doesn't gate)
- `{lifeStage:'remoteEmployee', budgetUsdMonthly: 1500}` → 99
- `{budgetUsdMonthly: 500}` → 1
- All 200 OK; warm response time ~7–17 ms.

### `/api/match` (Phase 3)
- POST with valid full profile → 200, 113 matches + 82 eliminated, 8-char `sessionToken`, `shareReady: false` (Redis missing). Top match: Slovenia, score 100. ✓

### Results view (Phases 6, 7, 8, 11)
- Cards render with rank, "Why It Fits", "Watch Out", Deep Dive Details, Visa Guide.
- "Show 10 more of 113" pagination control present (Phase 6 count-aware copy). ✓
- INSIGHTS / WHAT-IF / **ELIM (82)** tabs present.
- ELIM tab groups by reason ("budget (6)"), shows specific reason text + Override button per card. ✓
- "Cloud Sync Offline" banner visible; Share button disabled (Phase 7 fallback). ✓

### Deep Dive (Phases 6, 7, 8, 10C, 11)
- Slovenia: Cost Breakdown ($2090 total), Visa Pathways "Not verified in-app yet" panel (Phase 10C empty state — Slovenia is not in the Phase 10B P0/P1 set), **Data Snapshot section with raw values** (Phase 11), Core Dimensions. ✓

### Visa Guide (Phase 10C)
- Spain: "Source verified" badge with ShieldCheck, `<time datetime="2026-04-27">2026-04-27</time>`, no "Coming soon", official `exteriores.gob.es` source.
- Slovenia: "Not verified in-app yet" panel.

### `/r/[token]` and ExpiredResult (Phase 7)
- `GET /api/results/short` → 400 `invalid_token` (length check).
- `GET /api/results/badtoken` → 503 `service_unavailable` (no Redis — dev fallback).
- Visiting `/r/abc12345` → ExpiredResult view renders.

### Server logs
| Endpoint | Status | Notes |
|---|---|---|
| `POST /api/match/count` | 200 | new in Phase 11 |
| `POST /api/match` | 200 / 400 | expected |
| `POST /api/whatif` | 200 / 400 | expected (body shape `{profile}`) |
| `GET /api/countries/{SI,ES,UY,GE}` | 200 | expected |
| `GET /api/results/short` | 400 | length check |
| `GET /api/results/badtoken` | 503 | Redis missing — dev-safe |

No unexpected 4xx/5xx. No Sentry warnings in dev output. The "Slow execution detected: 64–114ms" client-instrumentation note that I observed pre-merge (F-04 in the previous draft of this review) **did not reproduce** in the integrated tree — Phase 9's globe deferral via `requestIdleCallback` and Phase 11's component reorganisation appear to have lowered the cold-load cost below the slow-execution threshold. Phase 9's measured Landing Ready time of ~1.1 s (vs 1.5 s budget) corroborates.

---

## 7. Documentation Consistency

| Item | Result |
|---|---|
| `SOFT_BETA_ROADMAP.md` on Phase 11 branch (`ff223f4`) | "Current Checkout Status" lists 3, 4, 5, 6, 7, 8, 9, 10A, 10B, 10C, 11 as complete; only Phase 12 remaining. Matches reality of that branch. |
| `SOFT_BETA_ROADMAP.md` on `main` (`d019ab8`) | **stale** — does NOT list Phase 9 or Phase 11 as complete. Will be corrected automatically when those branches merge to main. |
| `PHASE_REVIEW_CHECKLIST.md` | has entries for Phases 4, 5, 6, 7, 8, 10A, 10B, 10C, 11-gap-report. After Phase 9 + Phase 11-impl merge, also has Phase 9 and Phase 11-impl entries. **Phase 3 still has no entry** (F-01). |
| `visa-trust-audit.md` §3 P2 backlog | unchecked items "Source Verified badge" and "distinguish Verification in Progress vs No Known Pathway" — both implemented by Phase 10C. Stale doc. (F-03) |
| `soft-beta-observability-privacy.md` | accurate |
| `soft-beta-performance-device-matrix.md` | accurate, populated with measured numbers, recommendation SHIP |
| `soft-beta-known-limitations.md` | comprehensive, ready for Phase 12 |
| [CLAUDE.md](CLAUDE.md) | architecture description still matches; would benefit from a one-line note about `/api/match/count` |

---

## 8. Merge Handoff For Phase 12

The two outstanding branches need to be merged to `main` before Phase 12 runs. They are not currently in conflict at the code level — only in `docs/PHASE_REVIEW_CHECKLIST.md`, which has additive section conflicts.

Recommended merge order:
1. Merge `soft-beta/9-performance-device-matrix` first (smaller diff, perf docs + helper module + 3 tests).
2. Rebase or merge `soft-beta/11-implementation-polish` onto `main`. This will hit the same trivial checklist conflict — keep all sections in chronological order: soft-beta/9 → soft-beta/11 (gap report) → soft-beta/11 (implementation).
3. Verify on the integrated `main`: `npm test` should report **89 / 89**, `npm run build` should succeed, `npm run lint` should be clean.

The integration was performed on `review/integrated-9-11` and the `PHASE_REVIEW_CHECKLIST.md` resolution is preserved in commit `1cbb1ff` if the maintainer wants a reference.

---

## 9. Findings (Updated For Integrated Tree)

| ID | Severity | Phase Owner | Finding |
|---|---|---|---|
| F-01 | P2 (docs) | retro-Phase 3 | [docs/PHASE_REVIEW_CHECKLIST.md](docs/PHASE_REVIEW_CHECKLIST.md) has no `soft-beta/3` section despite the soft-beta roadmap stating Phase 3 was accepted at commit `94bc702`. **Action for Phase 12:** add a retroactive entry pointing at `94bc702`, or annotate the checklist file noting that Phase 3 predates this checklist format. |
| F-03 | P2 (docs) | Phase 10C | [docs/visa-trust-audit.md §3 P2](docs/visa-trust-audit.md) lists "Source Verified badge" and "Verification-in-Progress vs No-Known-Pathway distinction" as `[ ]` unchecked, but Phase 10C delivered both (commit `cda271f`). **Action:** check both off; note the badge is granted whenever `sourceUrl` is set rather than gated to `.gov` domains, which is acceptable because Phase 10B verified all sources are official. |
| F-07 | P2 (UX) | Phase 12 | `/api/results/{8-char-token}` returns bare `503 service_unavailable` JSON when Redis is absent. The `/r/[token]` UI handles this cleanly via `ExpiredResult`, but a direct API consumer gets a low-information error. Acceptable for soft beta; record in `soft-beta-known-limitations.md` if not already covered. |
| F-08 | P2 (DX) | Phase 12 | `package.json` `prepare` script (`cp scripts/pre-commit .git/hooks/pre-commit`) fails inside a git worktree because `.git` is a file, not a directory. Worked around with `npm install --ignore-scripts`. **Action:** guard with a check that `.git` is a directory, or document `--ignore-scripts` in CONTRIBUTING. Worktree-only DX issue — does not affect production. |
| F-09 | P2 (security) | Phase 12 | `npm install` reports 2 moderate transitive vulnerabilities. **Action:** run `npm audit`, document affected packages, decide ship/hold per package. Do not auto-fix `--force` before launch. |
| F-10 | P2 (docs) | Phase 12 | `main` branch's [docs/SOFT_BETA_ROADMAP.md](docs/SOFT_BETA_ROADMAP.md) is stale relative to actual progress — does not list Phases 9 and 11 as complete. Resolves automatically when the two outstanding branches merge to main. |
| F-11 | P2 (docs) | Phase 12 | [CLAUDE.md](CLAUDE.md)'s API table omits `/api/match/count` (added by Phase 11). **Action:** add a row. |
| **F-12** | **P1 (security)** | Phase 11 | [`POST /api/match/count`](src/app/api/match/count/route.ts) has **no rate limit**. Unlike `/api/match` (10/60s) and `/api/whatif` (20/60s), this endpoint is wired with no `Ratelimit` wrapper at all. It runs the engine over all 195 countries on every call and is hit on **every quiz step** by design — far more frequently than the other two. Adversarial flooding against `/api/match/count` would burn CPU without consequence. Empirical check: 30 consecutive POSTs all returned 200 with no throttling. **Action:** add an `'rl:countQuiz'` Ratelimit (suggest 60/60s — generous enough for a normal user clicking through the 13 quiz steps; restrictive enough to bound abuse) in `src/lib/ratelimit.ts` and call it from the route. |
| **F-13** | **P1 (correctness)** | Phase 11 | `POST /api/match/count` performs **no Zod validation** on its body. It just does `const answers = await request.json(); getMatchingCount(answers);`. Garbage inputs are silently accepted and produce misleading counts: <br>• `{"budgetUsdMonthly":"haha"}` → returns 164 (the unfiltered baseline) because `"haha" * 1.15` is `NaN` and `> NaN` is always false. <br>• `{"nonNegotiables":["totally-fake"]}` → returns 164 because the handler only checks `includes('lgbtq')`. Unknown values are silently ignored. <br>• `{"budgetUsdMonthly":-50000}` → returns 0 because the budget check eliminates everything. <br>• `not-json` body → 500 Internal Server Error. <br>Compare with `/api/match` which uses `UserProfileSchema.safeParse(body)` and returns a 400 with field-level errors. **Action:** validate with `UserProfileSchema.partial().safeParse()` and return 400 on failure. |
| **F-14** | **P1 (observability)** | Phase 11 | `POST /api/match/count` does **not** call `Sentry.captureException(error)` in its catch block — it only does `console.error('Match count API error:', error)`. The other two engine routes both report to Sentry. As a result, errors on the most-frequently-called API route will **not** show up in Sentry dashboards in production. **Action:** import `@sentry/nextjs` and add `Sentry.captureException(error)` in the catch, matching `/api/match/route.ts`. |
| **F-15** | **P1 (parity drift)** | Phase 11 | `src/lib/quizCounter.ts` reimplements the engine's hard-filter logic and carries the comment `Logic must stay in sync with src/lib/engine.ts getEliminationReasons.` Right now they ARE in sync (verified field-by-field). But the only test ([src/lib/__tests__/quizCounter.test.ts](src/lib/__tests__/quizCounter.test.ts)) checks quizCounter's behavior in isolation — it does NOT cross-reference against `runMatchingEngine`. Commit `f1f69b1 fix(quizCounter): align elimination logic with engine` shows this drift has already happened once during Phase 11 development. **Action:** add a parity test that asserts `getMatchingCount(profile) === runMatchingEngine(profile, []).matches.length` for a small fixture set of full profiles. That test will fail loudly the next time anyone touches engine.ts hard filters without updating quizCounter.ts. |
| F-16 | P2 (perf) | Phase 12 | Landing route bundle grew **+20%** (7.78 kB → 9.32 kB) with Phase 11's "How it works" + Product Preview + footer. Phase 9 perf budget still passes (~1.1 s vs 1.5 s budget) but margin is narrower than it looks because Phase 9 was measured on Local Development. **Action:** consider lazy-loading below-fold sections with `next/dynamic` if Phase 12's prod-deploy perf measurement comes in close to budget. |
| F-17 | P2 (validation) | Phase 12 | All Phase 9 perf measurements were taken in **Local Development**. The Sentry "Slow execution detected" warning disappeared in the integrated dev tree, but production-build (`next start`) behavior was not measured. **Action:** during Phase 12, re-verify the perf matrix against a production build to confirm that cold-load costs remain below the budget and do not trigger slow-execution warnings in production. |
| F-18 | P2 (cleanup) | Phase 12 | The integration verification in this review created `review/integrated-9-11` with merge commit `1cbb1ff` resolving the `PHASE_REVIEW_CHECKLIST.md` conflict. After Phase 12 actually merges Phase 9 + Phase 11 to main, this branch should be deleted (`git branch -D review/integrated-9-11`). The launch.json edit on `claude/trusting-yalow-3a617f` (changing `npx serve .` → `npm run dev` for the preview tool) was made for review purposes; the user may want to keep or revert based on their preferred dev workflow. |
| F-19 | P2 (telemetry) | Phase 12 | Phase 11 introduced new user-visible interactions — quiz-step counter API calls, eliminated-card "Override" clicks, Data Snapshot views — none of which appear to be tracked through the `trackEvent` allowlist in [src/lib/telemetry.ts](src/lib/telemetry.ts). Phase 8's funnel coverage may be incomplete for the new surfaces. **Action:** review with privacy lens whether any of these warrant additional `FunnelEvent` types (with appropriate metadata allowlists), or document the omission as intentional in [docs/soft-beta-observability-privacy.md](docs/soft-beta-observability-privacy.md). |

Findings F-04 (Sentry slow-execution) and F-05 / F-06 (Phase 11 gap items missing) from my pre-integration review are **resolved** — Phase 9 measured Sentry-init within budget; Phase 11 implementation closed the P0/P1 gaps that weren't explicitly deferred. F-02 from the pre-integration draft (roadmap not reflecting Phase 11 gap-report landing) is also resolved — the Phase 11 branch's roadmap correctly lists Phase 11 as complete.

**No P0 blockers. P1 findings F-12 through F-15 should be fixed before Phase 12 ships, or explicitly accepted with a documented mitigation.**

---

## 9a. Hostile-Input Probe On `/api/match/count` (Evidence For F-12 / F-13 / F-14)

```
$ for i in $(seq 1 30); do curl -s -X POST .../api/match/count -d '{}' -o /dev/null -w "%{http_code} "; done
200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200 200
   ↑ 30 consecutive POSTs, no rate limiting

$ curl -X POST .../api/match/count -d '{"budgetUsdMonthly":"haha"}'
{"count":164}
   ↑ string in numeric field accepted, returns unfiltered baseline (NaN comparison silently skips filter)

$ curl -X POST .../api/match/count -d 'not-json'
{"error":"Internal server error"}
   ↑ 500 with no Sentry capture (only console.error)

$ curl -X POST .../api/match/count -d '{"budgetUsdMonthly":-50000}'
{"count":0}
   ↑ negative budget eliminates everything; UI would show "0 countries"

$ curl -X POST .../api/match/count -d '{"nonNegotiables":["totally-fake"]}'
{"count":164}
   ↑ unknown enum silently ignored
```

Compare with `/api/match`'s defenses:
```typescript
// src/app/api/match/route.ts
import * as Sentry from "@sentry/nextjs";
import { matchRatelimit } from '@/lib/ratelimit';

if (matchRatelimit) {
  const { success } = await matchRatelimit.limit(ip);
  if (!success) return 429;
}
const profileResult = UserProfileSchema.safeParse(body);
if (!profileResult.success) return 400;
// ...
} catch (error) {
  Sentry.captureException(error);
  // ...
}
```

vs `/api/match/count`'s:
```typescript
// src/app/api/match/count/route.ts
const answers = await request.json();
const count = getMatchingCount(answers);
return NextResponse.json({ count });
// catch: console.error only, no Sentry
```

The new route has none of the three defensive layers the other engine routes have. Given that `/api/match/count` is by design called more frequently than either of the others, this is the most exposed surface in the soft beta.

---

## 10. Risk Register For Phase 12

| Risk | Mitigation |
|---|---|
| Merge of Phase 9 + Phase 11 to main hits the checklist conflict | Already verified resolution path in this review; trivial additive merge |
| Production env vars (Sentry DSN, Upstash Redis) not yet set | Phase 12 must verify in hosting before flipping share-readiness on |
| `/api/match/count` runs the engine on every quiz step — quiz-counter sensitivity is documented as a soft-beta limitation | Already in `soft-beta-known-limitations.md` |
| 27 low-confidence countries (data-parity backlog) | Phase 12 known-limitations doc already implies this via "data freshness" — could be more explicit |
| 2 moderate `npm audit` vulns (F-09) | Triage before launch |
| Globe asset size (1.4 MB geojson + react-globe.gl unpkg textures, per Phase 9 perf doc WARN) | Phase 12 should decide whether to self-host the texture or accept the third-party dependency in soft beta |

---

## 11. Verification Trail

```
Review tree: review/integrated-9-11 @ 1cbb1ff
Composed of:
  - soft-beta/11-implementation-polish @ 85ce904 (off main d019ab8)
  - soft-beta/9-performance-device-matrix @ 22be46d (off main d019ab8)
  - merge resolution for docs/PHASE_REVIEW_CHECKLIST.md (additive sections)

Tests: 89 passed (16 files)
Build: clean (Next.js 15.5.15, 7 routes incl new /api/match/count, 51s)
Lint: zero warnings, exit 0
Browser: dev server :64602
  Landing → "How it works" + Product Preview + Legal footer rendered
  Quiz Q1 → counter at 164 (live, not static 195)
  /api/match/count probed: empty=164, +$1500=99, +$500=1
  Results → ELIM tab grouped by reason ('budget (6)') with specific text + Override
  Deep Dive (Slovenia) → Data Snapshot section with raw values (Stability, Daily English, Internet, AQI, Climate Range)
  Visa Guide (Spain) → Source verified badge, <time> markup, no "Coming soon"
  /r/abc12345 → ExpiredResult renders
Telemetry events observed live:
  quiz_started {}
  results_viewed {matchCountBucket, isReadOnly}
  deep_dive_opened {section:'overview'}  ← no country code leaked
  what_if_used {}
```

---

## 12. Resolution Log

The following findings from Section 9 have been resolved on this branch (`soft-beta/12-precheck-hardening`).

| Finding | Status | Resolved by | Resolution Detail |
|---|---|---|---|
| F-12 | FIXED | eb3eb53 | Added `matchCountRatelimit` (120/60s) and applied to route handler. |
| F-13 | FIXED | eb3eb53 | Implemented JSON parse try/catch and `UserProfileSchema.partial()` validation. |
| F-14 | FIXED | eb3eb53 | Integrated `Sentry.captureException(error)` in route catch block. |
| F-15 | FIXED | eb3eb53 | Added `Parity Regression Guard` test suite in `quizCounter.test.ts`. |
| F-11 | FIXED | eb3eb53 | Added `POST /api/match/count` to `CLAUDE.md` API table. |
| F-19 | FIXED | eb3eb53 | Reviewed Phase 11 surfaces and updated `docs/soft-beta-observability-privacy.md`. |
| F-01 | FIXED | 9d980cd | Added accurate retroactive Phase 3 entry to `docs/PHASE_REVIEW_CHECKLIST.md`. |
