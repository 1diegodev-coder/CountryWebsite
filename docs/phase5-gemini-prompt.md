## Task

Read `src/lib/data/countries.ts` and produce `docs/data-parity-2026-04.md` — a data-quality
gate document before any YAML/pipeline migration touches country data.

Make zero changes to any source file. Zero test changes. Zero schema changes. The only
output is `docs/data-parity-2026-04.md`.

---

## Context

Stack: Next.js 15, TypeScript 5.7.
Branch: `phase/5-data-parity` off `main`.

`src/lib/data/countries.ts` holds the full `COUNTRIES` array (195 records) and the
`LIFE_STAGE_WEIGHTS` table. It is server-only (marked with `import 'server-only'`). Do not
run it as a standalone script — `server-only` throws outside a Next.js RSC or Vitest
context. Read it as source text instead.

PRD references for this audit: §7 (Data Architecture), §10 (Content Requirements),
§7.5 (Data Quality Standards).

---

## Scope

CREATE:
  docs/data-parity-2026-04.md

DO NOT TOUCH:
  Any file in src/
  Any test file
  package.json
  vitest.config.ts
  docs/ROADMAP.md
  Any existing docs/ file

---

## How to produce the report

Read `src/lib/data/countries.ts` in full. Walk every country record and compute the
statistics listed below. Where a section requires a list of country names, produce the
full list — do not truncate.

---

## Report structure

Produce `docs/data-parity-2026-04.md` with exactly these ten sections:

---

### §1 — Country coverage

Target: 195. Report actual count. List any country that appears twice (duplicate iso2 check).

---

### §2 — Data confidence distribution

Count how many countries have `dataConfidence: "high"`, `"medium"`, and `"low"`. Express
as count and percentage. List all countries with `"low"` confidence by name.

---

### §3 — Dimension score completeness

The 10 dimension keys are: `cost`, `safety`, `healthcare`, `visaEase`, `digitalInfra`,
`climate`, `english`, `lgbtqSafety`, `techEcosystem`, `naturalEnvironment`.

Report:
- Countries with all 10 dimensions in range [0.1, 10.0] — call these "fully scored"
- Countries where any dimension = 0 exactly (potential placeholder) — list them with
  which dimension is zero
- Countries where any dimension is outside (0, 10] — list them (range violation)

---

### §4 — Cost breakdown integrity

For each country, verify that:
  `rentUsd + groceriesUsd + transportUsd + utilitiesUsd + diningOutUsd + healthInsuranceUsd`
equals `totalEstimateUsd`.

Report: count passed, count failed. List all failures with computed sum vs stored total.

Also report: countries where `totalEstimateUsd < 400` (suspiciously low) or > 10000
(suspiciously high). List them.

---

### §5 — Raw indicators coverage

The 10 `rawIndicators` fields are: `summerHighC`, `winterLowC`, `humidityAvg`,
`airQualityIndex`, `seismicZone`, `internetReliability`, `englishDailyLife`, `stability`,
`authoritarianRisk`, `corruptionRisk`.

Report:
- Countries with all 10 raw indicator fields present and in their valid ranges
- Countries where `airQualityIndex > 200` (list them — WHO "very unhealthy" threshold)
- Countries where `stability < 2.0` (list them — high instability)
- Countries where `authoritarianRisk > 8.0` (list them)

---

### §6 — Descriptor quality

Report:
- Countries with no `descriptor` or empty string
- Countries with descriptor under 15 words (potential stub) — list them
- Shortest descriptor (word count, country name, text)
- Longest descriptor (word count, country name, text)

PRD §10.1 target: "1–2 sentences" (roughly 15–50 words).

---

### §7 — Visa pathway coverage

`visaPathways` is an optional field on each country record. PRD §10.1 requires 1–4 visa
pathway records per country, with "top 40 expat destination countries" populated for V1
launch.

Report:
- Count of countries with ≥1 visa pathway record
- Count of countries with 0 visa pathways
- If any visa pathway records exist: list countries that have them, how many each

Then list the PRD-prioritised top 40 expat destination countries (by common expat usage,
not alphabetical) and mark which currently have visa data and which are missing it. Use
your knowledge of the top 40 global expat destinations to produce this list.

---

### §8 — lastUpdated distribution

Report:
- Count of unique `lastUpdated` date values
- Most common date (and what percentage of countries share it)
- Count of countries with `lastUpdated` before 2026-01-01 (potentially stale)
- Implication note: bulk-dating all records on one date indicates estimated data, not
  individually verified data

---

### §9 — Schema vs PRD structural gaps

This section is fixed analysis — no computed stats needed.

Compare `CountrySchema` (in `src/lib/schema/country.ts`) against PRD §10.1 content
requirements. Report fields that the PRD requires but are absent from the current schema:

| Missing Field | PRD Reference | Required For | Priority |
|---------------|---------------|--------------|----------|
| `capitalCity` | §10.1 | Country deep dive header, content completeness | P1 |
| `currency` | §10.1 | Cost breakdown display, deep dive header | P1 |
| Per-field `lastVerified` timestamp | §7.2 | Staleness tracking per data source | P2 |
| `dataCompleteness` percentage | §7.5 | High/medium/low confidence rating logic | P2 |
| `staleFields` array | §7.5 | Surface staleness warnings in UI | P2 |
| Source attribution per field | §7.1 | Deep dive "data source" display | P3 |

Also note: `rawIndicators` in current schema covers derived indicators (climate, AQI, etc.)
but is missing the raw index scores the PRD cites as primary sources:
- Numbeo cost index (`numbeo_cost_index`)
- Global Peace Index (`gpi_score`)
- EF EPI English proficiency score (`ef_epi_score`)
- ILGA rainbow score (`ilga_rainbow_score`)
- RSF press freedom score (`rsf_press_freedom_score`)
- WEF GGG score (`wef_ggg_score`)
- Ookla median fixed Mbps (`ookla_median_fixed_mbps`)

These are the sources cited in PRD §7.2. Their absence means the dimension scores cannot
be independently reproduced from raw data.

---

### §10 — V1 readiness summary

A prioritised gap table with severity ratings:

| Gap | Count | Severity | Action Required Before V1 Launch |
|-----|-------|----------|----------------------------------|
| Countries with zero visa pathways | X/195 | P0 — launch blocker | Populate top 40 destinations |
| `capitalCity` missing from schema | — | P1 | Add field, populate all 195 |
| `currency` missing from schema | — | P1 | Add field, populate all 195 |
| Countries with `low` dataConfidence | X | P1 | Improve data or surface caveat badge |
| Raw source index scores absent | — | P2 | Required for data pipeline traceability |
| Per-field freshness tracking absent | — | P2 | Required for staleness pipeline |
| All records share one `lastUpdated` date | — | P2 | Indicates bulk-estimated, not sourced |
| Countries with any dimension = 0 | X | P3 | Review as potential placeholder values |
| Cost arithmetic failures | X | P3 | Fix totalEstimateUsd to match sum |

Fill in the X values from §§2–8.

---

## Acceptance

```bash
ls docs/data-parity-2026-04.md        # file exists
wc -l docs/data-parity-2026-04.md     # non-trivial length (expect >100 lines)
grep -c "^###" docs/data-parity-2026-04.md  # must show 10 sections
npm test                               # 33 tests pass, unchanged
npm run build                          # clean
npm run lint                           # exit 0
```

---

## Deliverables

Paste the full content of `docs/data-parity-2026-04.md`.

Plus terminal output of the acceptance commands.
