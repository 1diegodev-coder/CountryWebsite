# Soft Beta Phase 11 - Parity Gap Report: Prototype vs. Product

## Summary
The current application is broadly soft-beta ready from a technical and core functional perspective. The primary user journey (Landing -> Quiz -> Results -> Deep Dive) is stable and functional. However, several "polish" items and PRD-specified features are missing or incomplete, particularly on the Landing page and in the depth of the Results/Deep Dive transparency.

## Baseline Used
- **PRD.md** (Version 1.0 Draft, 21 April 2026)
- **Current App Walkthrough** (as of May 2026)

## Area-by-Area Assessment

| Area | Status | Key Observations |
|------|--------|------------------|
| **Landing** | `Close but polish needed` | Hero and CTA are strong. Missing below-the-fold "How it works", match previews, and full trust signals. Sticky legal bar missing. |
| **Quiz** | `Close but polish needed` | Pacing is good. Branching works. **Live counter is static (195)** instead of decrementing. Progress bar is present. |
| **Globe** | `Matches intent` | Interaction is smooth. Heatmap coloring matches PRD. Missing pulsing effect for top matches. |
| **Interim Reveal** | `Close but polish needed` | Appears at Step 6 as intended. "See partial results" works but could be more compelling. |
| **Results** | `Close but polish needed` | Layout is solid. What-If works but lacks predictive tooltips (e.g., "adds 12 countries"). Share PNG is explicitly disabled. |
| **Deep Dive** | `Close but polish needed` | Visa and Cost sections are high quality. Missing the "Key Data Snapshot" (raw values like Mbps, EPI score) specified in PRD §4.6. |
| **Share** | `Matches intent` | URL sharing works. "Read-only" mode is well-implemented. PNG export deferral is documented in-app. |

## P0/P1 Implementation Shortlist

| Priority | Item | User Impact | Scope | Type |
|----------|------|-------------|-------|------|
| **P0** | **Live Counter Decrement** | High (Trust/Engagement) | Small | Interaction/Logic |
| **P0** | **Landing Page Below-Fold** | High (Trust/Conversion) | Medium | Copy/Layout |
| **P1** | **Predictive What-If Labels** | Medium (Engagement) | Medium | Interaction/API |
| **P1** | **Top Match Pulsing** | Low (Polish) | Small | Motion/WebGL |
| **P1** | **Deep Dive Data Snapshot** | Medium (Trust) | Medium | Data/Layout |
| **P1** | **Elimination Breakdown** | Medium (Transparency) | Small | Interaction |
| **Defer** | **PNG Image Export** | High | Large | Feature |
| **Defer** | **Comparison Mode** | Medium | Large | Feature |

## Explicit Defer List
- **PNG Export:** Already marked as "unavailable in soft beta". Should remain deferred to Phase 12+.
- **City-Level Matching:** Confirmed as V2 scope in PRD.
- **AI Narrative Generation:** Confirmed as V2 scope in PRD.
- **Sound Design:** Confirmed as "Could Have" in PRD.

## Recommended Next-Step Scope (Phase 11 Implementation)
The next pass should focus on the **P0** items to ensure the "Magic" of the real-time narrowing (Counter) and the "Trust" of the landing page are solid before the soft beta gate.

1.  **Landing Polish:** Add the 3-step "How it works" and illustrative previews below the fold. Add the sticky legal bar.
2.  **Quiz Counter:** Implement real-time decrementing of the "195" counter based on current filtering logic (requires exposing filtered count from engine during quiz).
3.  **Deep Dive Enrichment:** Add a "Data Snapshot" table to the Deep Dive view showing a few key raw values (Internet Speed, Safety Index, etc.) to ground the 0-10 scores.
4.  **Elimination Transparency:** Allow clicking an eliminated country to see the specific reason (e.g., "Budget: $4500 > your $3000").
