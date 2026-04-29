# Visa Trust Audit Report (Phase 10A)

**Date:** April 29, 2026
**Status:** COMPLETE (Report Only)

## Executive Summary
This audit identifies critical "trust gaps" where the application makes visa-related claims (in descriptors or matching narratives) that are not backed by structured data in `src/lib/data/countries.ts`. A significant regression was discovered where legacy visa data for top-tier countries was lost during the Next.js migration.

## 1. Targeted High-Risk Audit (Sampled)
The following table audits countries frequently appearing in matching engine fixtures or descriptors with explicit visa/residency claims.

| Country | Code | visaPathways Status | Narrative/Descriptor Claims | Official Source for Verification | Trust Gap |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Portugal** | PT | ✅ Active | NHR 2.0, D8 mentioned. | https://vistos.mne.gov.pt/ | LOW |
| **Mexico** | MX | ✅ Active | Visa-free entry for DE/US. | https://www.gob.mx/sre | LOW |
| **Thailand** | TH | ✅ Active | LTR, DTV mentioned. | https://thaievisa.go.th/ | LOW |
| **Spain** | ES | ✅ Active | Digital Nomad Visa mentioned. | https://www.exteriores.gob.es/ | LOW |
| **Colombia** | CO | ✅ Active | "Top global hub for digital nomads" | https://www.cancilleria.gov.co/ | LOW |
| **Estonia** | EE | ✅ Active | "Strong founder appeal", DN Visa pioneer. | https://www.politsei.ee/ | LOW |
| **Georgia** | GE | ✅ Active | "1-year visa-free stay", "Virtual Zone". | https://geoconsul.gov.ge/ | LOW |
| **Argentina** | AR | ✅ Active | "Fastest path to residency (2 years)". | https://www.migraciones.gov.ar/ | LOW |
| **Barbados** | BB | ✅ Active | "Pioneer of the digital nomad visa". | https://www.visitbarbados.org/stamp | LOW |
| **Malta** | MT | ✅ Active | "5% effective corporate tax", nomad hub. | https://residencymalta.gov.mt/ | LOW |
| **Cyprus** | CY | ✅ Active | "Favourable tax regime", non-dom regime. | https://www.moi.gov.cy/ | LOW |
| **Paraguay** | PY | ✅ Active | "Accessible residency pathway". | https://www.migraciones.gov.py/ | LOW |

## 2. Critical Findings

### A. Data Regression from Legacy
A comparison between `src/lib/data/countries.ts` and `archive/legacy-static-v1/js/countries2.js` confirms that high-quality visa pathways were lost during the migration.
*   **Colombia (CO):** RESTORED
*   **Argentina (AR):** RESTORED
*   **Estonia (EE):** RESTORED

### B. "Coming Soon" UX Friction
For countries like Colombia, Georgia, and Barbados, which are frequently ranked #1 or #2 for remote workers and freelancers, clicking "Visa Guide" now provides real structured data instead of a "Coming soon" placeholder.

### C. Display Gaps
For countries WITH `visaPathways`, data quality is high:
*   `sourceUrl` is present in 100% of analyzed active pathways.
*   `lastVerified` is set to `2026-04-29` for restored pathways.

## 3. Implementation Backlog (Phase 10B)

### P0: Critical Regression Restore (High Impact)
Restore and verify pathways for top-tier countries from legacy data using official government portals:
- [x] **Colombia (CO):** Digital Nomad (V), Pensionado (M). (Source: cancilleria.gov.co)
- [x] **Estonia (EE):** Digital Nomad, Startup Visa. (Source: politsei.ee)
- [x] **Argentina (AR):** Rentista, Digital Nomad. (Source: migraciones.gov.ar)
- [x] **Georgia (GE):** 365-day visa-free entry, Individual Entrepreneur (1% tax). (Source: geoconsul.gov.ge)

### P1: Narrative Parity (Alignment)
Ensure every country mentioned in `fixtures/expected/*.json` with a specific visa/tax claim has a corresponding `visaPathway`:
- [x] **Barbados (BB):** 12-Month Welcome Stamp. (Source: visitbarbados.org)
- [x] **Malta (MT):** Nomad Residence Permit. (Source: residencymalta.gov.mt)
- [x] **Cyprus (CY):** Digital Nomad Visa. (Source: moi.gov.cy)
- [x] **Paraguay (PY):** Permanent Residency (SUACE). (Source: migraciones.gov.py)

### P2: UI/UX Trust Improvements
- [ ] Add "Official Source Verified" badge to the Visa Guide when `sourceUrl` is an official `.gov` or `.gov.xx` domain.
- [ ] Update `ResultsView.tsx` to distinguish between "Verification in Progress" and "No Known Pathway".

## 4. Final Source Verification
All identified missing visas have been cross-referenced against their respective official government portals as listed in the audit table above.
