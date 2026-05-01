# Soft Beta - Known Limitations

This document tracks known limitations, explicit scope defers, and technical trade-offs present in the soft beta release of CountryDNA.

## 1. Features
- **PNG Export:** The "Share as Image" feature is currently disabled. Users can share via unique URLs.
- **City-Level Matching:** Matching is currently performed at the country level. City-level data is scheduled for V2.
- **Comparison Mode:** Side-by-side comparison of matches is deferred to the public beta.
- **AI Narrative:** Match descriptions are currently template-based, not AI-generated.

## 2. Technical
- **Quiz Counter Sensitivity:** The live narrowing counter uses a subset of hard filters (Budget, Baseline Safety, LGBTQ+ safety, Healthcare). Some specific dimension weights do not affect the counter until the final results page to keep the quiz logic performant and transparent.
- **Data Freshness:** Visa requirements and cost-of-living data are updated periodically. Last verification dates are visible in the Deep Dive view.
- **Edge Runtime:** Some pages use the Next.js Edge runtime, which disables static generation for those specific routes.

## 3. Localization
- **Language:** The platform is currently optimized for English-speaking relocation seekers.
- **Currencies:** All cost estimates are provided in USD for consistency, though local currency codes are displayed.
