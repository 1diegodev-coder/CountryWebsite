# Soft Beta Performance Budget And Device Matrix

## Summary
- **Recommendation:** SHIP for Soft Beta Phase 9.
- **Verdict:** PASS with WARN on initial globe asset size.
- **Date:** 2026-04-30
- **Environment:** Local Development (macOS/Chrome/Node 22)

## Performance Budgets

| Interaction | Budget (Goal) | Measured (Observed) | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Landing Page Readiness** | < 1.5s | ~1.1s | ✅ PASS | Measured via Chrome DevTools Lighthouse (Local). |
| **Quiz Step Latency** | < 100ms | ~15ms | ✅ PASS | Measured via React Profiler on step transition. |
| **Results Initial Render** | < 800ms | 388ms | ✅ PASS | Measured in Vitest/JSDOM for 10 cards. |
| **Deep Dive Open** | < 300ms | ~210ms | ✅ PASS | Observed via UI performance trace. |
| **What-If Response** | < 1.5s | ~550ms | ✅ PASS | Measured: 350ms debounce + ~200ms API roundtrip. |
| **Share Modal Open** | < 200ms | ~90ms | ✅ PASS | Measured via React Profiler. |

## Device and Viewport Matrix

| Device Class | Viewport | Core Path | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop Wide** | `1440x900` | Landing -> Quiz -> Results -> Share | ✅ PASS | Verified 3-column layout (280px / 1fr / 300px). |
| **Laptop** | `1280x800` | Landing -> Quiz -> Results -> What-If | ✅ PASS | Verified collapsed side-panel widths (240px / 260px). |
| **Tablet** | `768x1024` | Quiz -> Results -> Deep Dive | ✅ PASS | Verified `results-body` grid-template-columns: 1fr. |
| **Mobile** | `390x844` | Landing -> Quiz -> Results | ✅ PASS | Verified globe height 300px; padding 24px (CSS). |
| **Reduced Motion** | Any | All | ✅ PASS | Verified `matchMedia` listener pauses Globe autoRotate. |
| **No-WebGL** | Any | All | ✅ PASS | Verified fallback shell renders SVG counts immediately. |

## Globe Dependency & Resilience
- **External Dependencies:**
  - `react-globe.gl`: Inherits default unpkg texture if not overridden. **WARN**.
  - `/data/countries.geojson`: 1.4MB local asset. **PASS** (Local).
- **Resilience:**
  - Fallback shell renders immediately (sync) with 100% opacity until WebGL activates.
  - WebGL activation is deferred via `requestIdleCallback` (2000ms timeout).
  - WebGL context loss verified via manual `webglcontextlost` dispatch.

## Browser Smoke Test
- **Redis Availability:** Yes (Verified session token storage/retrieval).
- **Sentry Availability:** Yes (Verified tunnel and DSN loading).
- **Findings:**
  - Console: No unexpected errors. Confirmed [Telemetry] logs are sanitized.
  - Server: Confirmed no 4xx/5xx on `/api/match` or `/api/whatif`.
  - Layout: Verified no horizontal overflow at `390px`.

## Open Risks & Follow-ups
1. **Globe Texture:** hosting a local low-res base texture is recommended for Phase 11.
2. **GeoJSON Size:** 1.4MB is acceptable for beta but should be TopoJSON in Phase 11.
3. **Framer Motion:** entrance animations are smooth on M-series chips; TBD on older mobile.
