# Data Parity Audit Report — 2026-04

This document serves as a data-quality gate for the `COUNTRIES` dataset in `src/lib/data/countries.ts` as of April 2026.

---

### §1 — Country coverage

- **Actual Count:** 195
- **Duplicate iso2 check:** None. All records have unique ISO2 codes.

---

### §2 — Data confidence distribution

| Confidence Level | Count | Percentage |
|------------------|-------|------------|
| High             | 76    | 39.0%      |
| Medium           | 92    | 47.2%      |
| Low              | 27    | 13.8%      |

**Countries with "low" confidence:**
Afghanistan, Burkina Faso, Burundi, Central African Republic, Chad, Congo (Kinshasa), Eritrea, Guinea, Guinea-Bissau, Haiti, Iraq, Kiribati, Liberia, Libya, Mali, Myanmar, Niger, North Korea, Palestine, Somalia, South Sudan, Sudan, Syria, Turkmenistan, Ukraine, Venezuela, Yemen.

---

### §3 — Dimension score completeness

- **Fully scored:** 195/195 (All countries have all 10 dimensions in range [0.1, 10.0]).
- **Potential placeholders (dimension = 0):** None.
- **Range violations (outside (0, 10]):** None.

---

### §4 — Cost breakdown integrity

- **Cost arithmetic check:** 195 passed, 0 failed.
- **Suspiciously low total (< 400 USD):** None.
- **Suspiciously high total (> 10000 USD):** Monaco (10,750 USD).

---

### §5 — Raw indicators coverage

- **Full raw indicator coverage:** 195/195 records have all 10 raw indicator fields present.
- **WHO "very unhealthy" AQI (> 200):** None.
- **High instability (stability < 2.0):** Afghanistan, Central African Republic, Haiti, Libya, Sudan, Syria, Yemen.
- **High authoritarian risk (> 8.0):** Afghanistan, Belarus, Burkina Faso, Burundi, Central African Republic, Chad, Congo (Kinshasa), Cuba, Egypt, Equatorial Guinea, Eritrea, Eswatini, Guinea, Haiti, Iran, Iraq, Laos, Libya, Mali, Myanmar, Nicaragua, Niger, North Korea, Palestine, Russia, Saudi Arabia, Somalia, South Sudan, Sudan, China, Syria, Tajikistan, Turkmenistan, Uganda, Venezuela, Yemen.

---

### §6 — Descriptor quality

- **No descriptor:** None.
- **Descriptor under 15 words (potential stub):** Portugal, Mexico, Switzerland, Spain, Netherlands, Vietnam, Costa Rica, Uruguay, Japan, Singapore, Philippines, Brazil, Germany, France, Italy, Poland, Argentina, Malaysia, South Korea, Türkiye, New Zealand, Australia, Canada, Chile, Peru, Afghanistan, Albania, Algeria, Andorra, Angola, Antigua and Barbuda, Austria, Azerbaijan, Bahamas, Bangladesh, Belize, Benin, Bhutan, Bosnia and Herzegovina, Botswana, Brunei, Burkina Faso, Burundi, Cambodia, Cameroon, Central African Republic, Chad, Congo (Brazzaville), Congo (Kinshasa), Cyprus, Denmark, Djibouti, Dominica, Egypt, El Salvador, Equatorial Guinea, Ethiopia, Fiji, Gabon, Grenada, Guatemala, Guinea, Guinea-Bissau, Guyana, Iceland, India, Iran, Ireland, Ivory Coast, Kazakhstan, Kuwait, Latvia, Lebanon, Libya, Liechtenstein, Madagascar, Maldives, Marshall Islands, Mauritania, Monaco, Namibia, Nauru, Nicaragua, North Korea, Oman, Pakistan, Palau, Palestine, Paraguay, Qatar, Rwanda, Saint Kitts and Nevis, Saint Lucia, Saint Vincent and the Grenadines, Samoa, San Marino, Sao Tome and Principe, Saudi Arabia, Senegal, Seychelles, Sierra Leone, Slovakia, Slovenia, Solomon Islands, South Sudan, Sri Lanka, Sudan, Suriname, Sweden, China, Finland, United Kingdom, North Macedonia, Syria, Togo, Tajikistan, Timor-Leste, Tunisia, Tonga, Trinidad and Tobago, United States, Uzbekistan, Vatican City, Vanuatu, Yemen, Zambia, Zimbabwe.
- **Shortest descriptor:** 9 words, Vietnam ("Extraordinary value, rapid growth, and a world-renowned culinary scene.")
- **Longest descriptor:** 22 words, Malta ("An island fortress in the Mediterranean with a warm climate, English as an official language, and a booming iGaming and tech sector.")

*Analysis Note: PRD §10.1 target is 1–2 sentences (15–50 words). Most records (131/195) fall below this threshold, indicating widespread stub-level content.*

---

### §7 — Visa pathway coverage

- **Countries with ≥1 visa pathway record:** 0
- **Countries with 0 visa pathways:** 195

**PRD-prioritised top 40 expat destination countries status:**

| Country | Visa Data Present |
|---------|-------------------|
| United States | No |
| United Kingdom | No |
| Canada | No |
| Australia | No |
| Germany | No |
| Spain | No |
| Portugal | No |
| United Arab Emirates | No |
| Singapore | No |
| Switzerland | No |
| France | No |
| Netherlands | No |
| Mexico | No |
| Thailand | No |
| Japan | No |
| Italy | No |
| New Zealand | No |
| Ireland | No |
| Vietnam | No |
| Malaysia | No |
| Costa Rica | No |
| Indonesia | No |
| Philippines | No |
| Brazil | No |
| Panama | No |
| Türkiye | No |
| South Africa | No |
| China | No |
| India | No |
| Greece | No |
| Austria | No |
| Sweden | No |
| Norway | No |
| Denmark | No |
| Belgium | No |
| Poland | No |
| Czech Republic | No |
| Israel | No |
| Saudi Arabia | No |
| South Korea | No |

---

### §8 — lastUpdated distribution

- **Unique `lastUpdated` date values:** 2 (2026-04-21, 2026-04-24)
- **Most common date:** 2026-04-24 (153 records, 78.5%)
- **Countries with `lastUpdated` before 2026-01-01:** 0
- **Implication note:** The dataset appears to have been bulk-updated in two waves (April 21 and April 24, 2026). This confirms that records are likely estimated or bulk-generated rather than individually sourced over time.

---

### §9 — Schema vs PRD structural gaps

| Missing Field | PRD Reference | Required For | Priority |
|---------------|---------------|--------------|----------|
| `capitalCity` | §10.1 | Country deep dive header, content completeness | P1 |
| `currency` | §10.1 | Cost breakdown display, deep dive header | P1 |
| Per-field `lastVerified` timestamp | §7.2 | Staleness tracking per data source | P2 |
| `dataCompleteness` percentage | §7.5 | High/medium/low confidence rating logic | P2 |
| `staleFields` array | §7.5 | Surface staleness warnings in UI | P2 |
| Source attribution per field | §7.1 | Deep dive "data source" display | P3 |

**Missing Raw Source Indicators (PRD §7.2):**
The current schema's `rawIndicators` includes derived values but lacks the specific indices required for traceability:
- Numbeo cost index (`numbeo_cost_index`)
- Global Peace Index (`gpi_score`)
- EF EPI English proficiency score (`ef_epi_score`)
- ILGA rainbow score (`ilga_rainbow_score`)
- RSF press freedom score (`rsf_press_freedom_score`)
- WEF GGG score (`wef_ggg_score`)
- Ookla median fixed Mbps (`ookla_median_fixed_mbps`)

---

### §10 — V1 readiness summary

| Gap | Count | Severity | Action Required Before V1 Launch |
|-----|-------|----------|----------------------------------|
| Countries with zero visa pathways | 195/195 | P0 — launch blocker | Populate top 40 destinations |
| `capitalCity` missing from schema | — | P1 | Add field, populate all 195 |
| `currency` missing from schema | — | P1 | Add field, populate all 195 |
| Countries with `low` dataConfidence | 27 | P1 | Improve data or surface caveat badge |
| Raw source index scores absent | — | P2 | Required for data pipeline traceability |
| Per-field freshness tracking absent | — | P2 | Required for staleness pipeline |
| All records share two recent dates | — | P2 | Indicates bulk-estimated, not sourced |
| Countries with any dimension = 0 | 0 | P3 | Review as potential placeholder values |
| Cost arithmetic failures | 0 | P3 | Fix totalEstimateUsd to match sum |
