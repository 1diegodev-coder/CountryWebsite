# Visa Trust Audit Report (Phase 10A)

**Date:** April 29, 2026
**Status:** COMPLETE (Report Only)

## Executive Summary
This audit identifies critical "trust gaps" where the application makes visa-related claims (in descriptors or matching narratives) that are not backed by structured data in `src/lib/data/countries.ts`. A significant regression was discovered where legacy visa data for top-tier countries was lost during the Next.js migration.

## 1. Top Recommended Countries Audit
The following table audits the "Top 40" countries and those frequently appearing in matching engine fixtures.

| Country | Code | visaPathways Status | Narrative/Descriptor Claims | Trust Gap |
| :--- | :--- | :--- | :--- | :--- |
| **Portugal** | PT | ✅ Active | NHR 2.0, D8 mentioned. | LOW |
| **Mexico** | MX | ✅ Active | Visa-free for DE/US mentioned. | LOW |
| **Thailand** | TH | ✅ Active | LTR, DTV mentioned. | LOW |
| **Spain** | ES | ✅ Active | Digital Nomad Visa mentioned. | LOW |
| **Colombia** | CO | ❌ **MISSING** | "Top global hub for digital nomads" | **HIGH** |
| **Estonia** | EE | ❌ **MISSING** | "Strong founder appeal", DN Visa pioneer. | **HIGH** |
| **Georgia** | GE | ❌ **MISSING** | "1-year visa-free stay", "1% tax". | **HIGH** |
| **Argentina** | AR | ❌ **MISSING** | "Fastest path to residency (2 years)". | **HIGH** |
| **Malaysia** | MY | ✅ Active | DE Rantau mentioned. | LOW |
| **Indonesia** | ID | ✅ Active | Remote Worker E33G mentioned. | LOW |
| **Barbados** | BB | ❌ **MISSING** | "Pioneer of the digital nomad visa". | **HIGH** |
| **Croatia** | HR | ❌ **MISSING** | Growing nomad community. | MED |
| **Malta** | MT | ❌ **MISSING** | Digital nomad hub. | MED |
| **Uruguay** | UY | ❌ **MISSING** | Progressive residency path. | MED |

## 2. Critical Findings

### A. Data Regression from Legacy
A comparison between `src/lib/data/countries.ts` and `archive/legacy-static-v1/js/countries2.js` reveals that several high-quality visa pathways were lost during the migration.
*   **Colombia (CO):** Legacy had Digital Nomad and Pensionado visas. Current is empty.
*   **Argentina (AR):** Legacy had Rentista and Digital Nomad visas. Current is empty.
*   **Estonia (EE):** Legacy had Digital Nomad and Startup visas. Current is empty.

### B. "Coming Soon" UX Friction
For countries like Colombia and Georgia, which are frequently ranked #1 or #2 for remote workers and freelancers, clicking "Visa Guide" results in a "Coming soon" placeholder. This contradicts the high-confidence narratives used in the match results.

### C. Display Gaps
For countries WITH `visaPathways`, data quality is generally high:
*   `sourceUrl` is present in 100% of analyzed active pathways.
*   `lastVerified` is present and set to `2026-04-27` for most, indicating recent verification for the active set.
*   **Gap:** UI does not clearly distinguish between "No Pathway Available" (e.g. North Korea) and "Data Pending Verification" (e.g. Colombia). Both show the same "Coming soon" component.

## 3. Implementation Backlog (Phase 10B)

### P0: Critical Regression Restore (High Impact)
Restore and verify pathways for top-tier countries from legacy data:
- [ ] **Colombia (CO):** Digital Nomad (V), Pensionado (M).
- [ ] **Estonia (EE):** Digital Nomad, Startup Visa.
- [ ] **Argentina (AR):** Rentista, Digital Nomad.
- [ ] **Georgia (GE):** 365-day visa-free entry, Individual Entrepreneur (1% tax) registration.

### P1: Narrative Parity (Alignment)
Ensure every country mentioned in `fixtures/expected/*.json` with a specific visa claim has a corresponding `visaPathway`:
- [ ] **Barbados (BB):** Welcome Stamp (Digital Nomad).
- [ ] **Uruguay (UY):** Digital Nomad permit.
- [ ] **Malta (MT):** Nomad Residence Permit.
- [ ] **Croatia (HR):** Digital Nomad stay.

### P2: UI/UX Trust Improvements
- [ ] Add "Source Trust" badge to the Visa Guide when `sourceUrl` is an official `.gov` or `.gov.xx` domain.
- [ ] Update `ResultsView.tsx` to distinguish between "Verification in Progress" (Top 40) and "No Known Pathway" (Other).

## 4. Verification of Sources
All identified missing visas are backed by official sources (e.g., gov.co, e-estonia.com, gov.ge) and should be integrated in Phase 10B.
