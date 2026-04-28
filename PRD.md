# Product Requirements Document
## CountryDNA — *Find Where You Belong*
**Version:** 1.0 (Draft)
**Date:** 21 April 2026
**Status:** In Review
**Owner:** TBD (New Entity)

***

# Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Strategy](#2-product-vision--strategy)
3. [User Research & Personas](#3-user-research--personas)
4. [User Journey & Experience Flow](#4-user-journey--experience-flow)
5. [Functional Requirements](#5-functional-requirements)
6. [The Matching Engine](#6-the-matching-engine)
7. [Data Architecture & Pipeline](#7-data-architecture--pipeline)
8. [UI/UX Design System](#8-uiux-design-system)
9. [Technical Architecture](#9-technical-architecture)
10. [Content Requirements](#10-content-requirements)
11. [Legal & Compliance](#11-legal--compliance)
12. [Analytics & Instrumentation](#12-analytics--instrumentation)
13. [Performance Requirements](#13-performance-requirements)
14. [V1 Scope & Release Criteria](#14-v1-scope--release-criteria)
15. [V2+ Roadmap](#15-v2-roadmap)
16. [Open Questions & Decisions Log](#16-open-questions--decisions-log)

***

# 1. Executive Summary

## 1.1 What We're Building

CountryDNA is a web-based country-matching platform that helps people discover which countries in the world are genuinely the best fit for them as individuals — not as abstract travellers, but as specific humans with incomes, families, values, careers, health needs, and personalities.

It does this through a layered, conversational profiling experience backed by a real-time data-driven matching engine, visualised through a world globe that narrows and focuses as the user reveals more about themselves. The result is not a ranked list — it is a personalised picture of the world, re-drawn for each user, with transparent reasoning at every step.

## 1.2 The Problem

Existing tools (US News Best Countries, ExpatLife.ai, Nomad List) all fail on the same fundamental axis: they ask people to rate abstract country attributes rather than understanding who the person is first. The result is generic rankings that feel like they could have been produced without the quiz at all. Nobody has built a tool that starts with the human and works outward to the world.

## 1.3 The Opportunity

- ~1.1 billion people live outside their country of birth globally (UN, 2024)
- Search volume for "best country to move to" and related terms exceeds 2M/month
- No dominant, trusted, beautiful, free consumer product exists in this space
- The category is growing: remote work, geopolitical instability, tax optimisation, and quality-of-life migration are all accelerating trends
- A high-quality free product creates a highly monetisable platform for adjacent products and partnerships

## 1.4 V1 Goals

1. Launch a polished, fully functional, anonymous-first country-matching experience covering all 195 countries
2. Deliver world-class UI with a live interactive globe as the centrepiece
3. Produce shareable, meaningful match results with transparent reasoning
4. Establish a reliable, maintainable data pipeline for country-level data
5. Build the technical and design foundation that V2 features can grow from

***

# 2. Product Vision & Strategy

## 2.1 Vision Statement

*To become the world's most trusted and beautiful tool for helping people find where in the world they truly belong.*

## 2.2 Strategic Positioning

| Axis | Position |
|------|----------|
| **Audience** | Anyone considering living abroad — retirees, founders, remote workers, families, students, adventurers |
| **Tone** | Intelligent, warm, premium — not corporate, not backpacker |
| **Differentiator** | Person-first profiling + real-time visual elimination + transparent match reasoning |
| **Business model (V1)** | Fully free — platform and audience built first, monetisation layered in V2+ |
| **Brand promise** | The world, re-drawn for you |

## 2.3 What CountryDNA Is Not

- It is **not** a visa processing service
- It is **not** a travel booking platform
- It is **not** giving legal, financial, or immigration advice
- It is **not** a news or rankings site (like US News)
- It is **not** targeting only digital nomads (unlike Nomad List)

## 2.4 Future Platform Potential

V1 is a standalone product. It is also the foundation for a broader platform of life-navigation tools. Possible future products in the same ecosystem include city-level matching, neighbourhood matching, cost-of-living simulators, visa pathway tools, partner products (insurance, housing, legal), and B2B relocation tools for HR teams. The V1 architecture, brand, and data pipeline should be built with this eventual platform context in mind.

***

# 3. User Research & Personas

## 3.1 Primary Persona Archetypes

These are the six distinct life-stage archetypes the matching engine and UX must serve equally well. They represent meaningfully different data needs, question flows, and output formats.

***

### Persona 1: The Ambitious Founder
**Profile:** 28–40, self-employed or running a startup, likely UK/US/EU-based, good income, values low bureaucracy, wants a tech ecosystem, tax-efficient base, quality of life upgrade

**Key needs:** Favourable tax regime, ease of company formation, fast internet, startup community, visa pathway for self-employed, English in business

**Pain point with existing tools:** Nomad List is too nomad-focused; US News doesn't know they're a founder

***

### Persona 2: The Remote Employee
**Profile:** 25–45, employed by a foreign company, working fully remotely, wants a lower cost of living, warmer climate, or better lifestyle without losing their job

**Key needs:** Remote work visa or digital nomad visa availability, cost of living vs salary ratio, time zone proximity to employer, fast internet

**Pain point:** Most tools don't ask about employer location or time zone constraints

***

### Persona 3: The Relocating Family
**Profile:** 30–50, couple with 1–3 children (ages 3–16), one or both working, prioritises education, safety, healthcare, social integration for kids

**Key needs:** International school quality, family visa availability, safety index, children's healthcare, outdoor space, English-medium education options

**Pain point:** No existing tool adequately handles family-specific needs; "family friendly" is a single checkbox, not a system

***

### Persona 4: The Pre-Retiree / Early Retiree
**Profile:** 50–68, financial independence or pension income, prioritises healthcare quality, low cost, safety, climate, social life for older adults

**Key needs:** Retirement visa availability, healthcare system quality (including specialist access), cost of living, air quality, political stability, expat community for their age group

**Pain point:** Tools skew young and nomadic; retirement-specific visa pathways are rarely surfaced

***

### Persona 5: The Life Optimiser
**Profile:** 22–35, curious, internationally minded, not necessarily ready to move but researching options, often comparing several countries intellectually

**Key needs:** Exploration mode, ability to compare countries, understand trade-offs, no commitment implied

**Pain point:** Most tools make you feel like you *have* to be moving. Many people want to explore without declaring intent

***

### Persona 6: The Values-Led Mover
**Profile:** Any age, motivated primarily by political, environmental, ethical, or cultural alignment rather than financial factors. May be LGBTQ+, an environmentalist, a specific religious observer, or fleeing political deterioration

**Key needs:** LGBTQ+ safety ratings, environmental policy scores, press freedom, religious freedom, gender equality indices

**Pain point:** These dimensions are almost completely absent from existing tools

***

## 3.2 Universal User Truths

Regardless of persona, all users share these needs:

- **Trust** — They need to believe the data is accurate and the matching is intelligent, not random
- **Transparency** — They need to see *why* a country was recommended or eliminated
- **Respect for complexity** — Their situation is nuanced; they resent being bucketed into "remote worker" or "budget traveller"
- **Delight** — The experience should feel like something worth sharing, not a government form

***

# 4. User Journey & Experience Flow

## 4.1 High-Level Journey

```
Landing Page
    │
    ▼
Start Experience
    │
    ▼
Layer 1: Life Architecture Questions  ──────────────┐
    │                                               │
    ▼                                      Globe narrows in
Layer 2: Hard Constraint Questions               real time
    │                                               │
    ▼                                               │
Layer 3: Identity & Values Questions  ─────────────┘
    │
    ▼
Layer 4: Practical Priority Weighting
    │
    ▼
Interim Results Reveal (after Q6, ~halfway)
    │
    ▼
Optional Deep-Profile Questions (refine further)
    │
    ▼
Full Results Experience
    │
    ├──► Globe Heat Map View
    ├──► Country Match Cards
    ├──► Elimination Log
    ├──► "What If" Sliders
    └──► Share / Save Results
```

## 4.2 The Landing Page

**Purpose:** Communicate the value proposition instantly, create desire to begin, establish brand premium.

**Required elements:**
- Full-screen hero with a slowly rotating 3D globe — all countries lit
- Single headline: *The world, re-drawn for you*
- One-line subtext: *Answer a few questions. Discover which countries actually fit your life.*
- Single CTA button: **Find My Countries**
- Below fold: brief "how it works" in 3 steps (illustrated)
- Below fold: example match card previews (anonymised, illustrative)
- Below fold: trust signals — data sources cited, country count ("195 countries analysed")
- Sticky bottom bar: subtle legal note — *"CountryDNA provides general information only. Nothing on this site constitutes legal, immigration, financial, or medical advice."*

**No sign-up wall. No email capture on entry. The product earns trust before asking for anything.**

## 4.3 The Profiling Experience

### Structure
The profiling experience is a **full-screen, one-question-at-a-time card interface** — not a multi-field form. Each question occupies the full viewport. The globe is visible as a persistent element (side panel on desktop, collapsible on mobile).

### Question Set Architecture

The questions are grouped into four layers. Total question count: **12–16 questions** depending on branching logic. Target completion time: **4–6 minutes**.

***

#### LAYER 1 — Life Architecture (4 questions)
*Establishes who the user is. These answers drive branching logic for all subsequent questions.*

**Q1 — Life Stage**
> *Which of these best describes where you are in life?*
- Building a business / Startup founder
- Remote employee (working for a company abroad)
- Freelancer / Contractor
- Employed and looking to move with my job or find local work
- Student or recently graduated
- Semi-retired or taking a career break
- Retired / Living on passive income or pension

*Branching: This single answer changes which questions appear in Layers 2–4*

**Q2 — Household**
> *Who would be making this move with you?*
- Just me
- Me and a partner (no children)
- Me, a partner, and children (ages collected if selected)
- Single parent with children
- Other / Still figuring this out

*If children selected: follow-up for age ranges (under 5 / 5–11 / 12–18)*

**Q3 — Current Situation (Push Factor)**
> *What's most driving your interest in moving abroad?*
*(Multi-select up to 2)*
- Cost of living is too high where I am
- Political or social environment
- Better weather / climate
- Tax reasons
- Career or business opportunity
- Lifestyle upgrade
- Healthcare
- Just curious / exploring options
- Already decided, I need help narrowing it down

*This is not used directly in matching — it calibrates tone and helps weight outputs*

**Q4 — Passports**
> *Which passport(s) do you hold?*
- Dropdown multi-select of all ~195 nationalities
- "I'd rather not say / Skip" option

*This is the most important hard-constraint input. Drives visa filtering.*

***

#### LAYER 2 — Hard Constraints (3–4 questions)
*Binary filters. Failing these eliminates countries from the running immediately.*

**Q5 — Budget**
> *What's your realistic monthly budget for all living expenses?*
*(Rent, food, transport, leisure — not including one-off relocation costs)*
- Under $1,500/month
- $1,500–$3,000/month
- $3,000–$5,000/month
- $5,000–$8,000/month
- $8,000+/month
- I'm flexible / Not sure

*Note: Currency shown in user's detected locale (GBP for UK users). Converted internally.*

**Q6 — Language**
> *Which languages do you speak, or are you willing to learn?*
- English (selected by default if UK/US detected)
- Multi-select of major languages
- "I only want to live somewhere I can easily get by in English"
- "I'm open to learning a new language"

**Q7 — Healthcare Need**
> *Do you have specific healthcare requirements that a new country must meet?*
- No specific requirements
- I need access to high-quality public or private healthcare generally
- I have a chronic condition / require regular specialist care
- I need specific prescription medications to be available
- I'd rather not say

*(Branches to specific condition types only if "chronic condition" selected — general categories, not diagnoses)*

**Q8 — Non-negotiables** *(conditional, shown if Q3 included political/social or if values-led signals detected)*
> *Are any of the following non-negotiable for you?*
*(Multi-select)*
- LGBTQ+ safety and legal protections
- Strong press freedom / rule of law
- High gender equality
- Access to legal abortion
- Alcohol availability
- Predominantly secular society
- Religious community of a specific faith *(with follow-up dropdown)*
- No specific requirements

***

#### LAYER 3 — Identity & Values (3 questions)
*Soft filters. These rank and sort within the remaining candidate pool.*

**Q9 — Social Operating Mode**
> *How do you want to exist socially in a new country?*
- I want to integrate deeply — learn the language, make local friends, become part of the community
- I'd like a mix — local culture but a comfortable expat bubble to fall back on
- I primarily want to be in an expat or international community
- I mostly want peace and independence — social life is not a major factor

**Q10 — Pace & Environment**
> *What environment would make you thrive?*
*(Select the one that resonates most)*
- A fast-paced, ambitious city — energy, opportunity, things happening
- A vibrant but manageable mid-sized city — cultural life without the chaos
- A small town or coastal town — laid-back, affordable, quality of life
- Rural / nature-immersed — space, outdoors, away from crowds

**Q11 — Cultural Appetite**
> *How do you feel about cultural difference?*
- I actively want a culture radically different from my own — that's the point
- I want something different enough to feel like an upgrade, but not completely unfamiliar
- I'd prefer a country with a similar culture to where I'm from (Western European-style norms)
- I don't have a strong preference

***

#### LAYER 4 — Practical Priorities (1–2 questions)
*Explicit weighting input. Confirms or adjusts inferred weights from earlier layers.*

**Q12 — Top Priorities**
> *Pick up to 3 things that matter most to you in a new country*
*(Multi-select, max 3 from a list of 12)*
- Low cost of living
- Safety and political stability
- Quality healthcare
- Easy visa / path to residency
- Warm climate
- Strong tech / startup ecosystem
- Low taxes
- Natural beauty and outdoor life
- Strong expat community
- Cultural richness (food, arts, history)
- Fast internet and digital infrastructure
- English widely spoken

**Q13 — Dealbreakers** *(optional, shown as "Want to rule anything out?")*
> *Are there any of the following you'd strongly prefer to avoid?*
*(Multi-select, all optional)*
- Extreme heat (40°C+)
- Extreme cold / harsh winters
- High humidity year-round
- High air pollution
- High seismic / natural disaster risk
- Very high cost of living
- Authoritarian government
- High corruption
- Limited internet infrastructure
- Very low English penetration
- Politically unstable regions

*These act as soft negative weights rather than hard eliminators (unless extreme)*

***

### 4.4 Interim Results Reveal

After Q6 (approximately halfway through), the system pauses the quiz and shows:

```
┌─────────────────────────────────────────────┐
│  Based on what you've told us so far...     │
│                                             │
│  🌍  38 countries are strong contenders     │
│                                             │
│  Your top 3 so far:                         │
│  🇵🇹 Portugal  🇲🇽 Mexico  🇨🇷 Costa Rica   │
│                                             │
│  Answer 6 more questions to see your full   │
│  personalised results and why each fits.    │
│                                             │
│  [Continue]         [See full list now →]   │
└─────────────────────────────────────────────┘
```

This serves two purposes: it rewards the user for progress so far, and it creates a pull to continue. Users who click "See full list now" get a low-fidelity version of the results page with a prompt to complete the quiz for the full reasoning layer.

***

### 4.5 Full Results Experience

The results experience has five interconnected panels, all accessible from the results page without page navigation.

**Panel A — The Globe (default view)**
The interactive 3D globe now shows the final heat map state. Countries colour-coded from deep green (top match) through yellow-orange (partial) to grey (eliminated). Top 5 matches pulse softly. The globe auto-rotates slowly until interaction.

**Panel B — Match Cards**
Staggered-reveal grid of the top 10 matched countries. Each card contains the country name, flag, match percentage, top 3 "why you fit" points, top 2 "watch out for" points, and two actions: Explore and Compare.

**Panel C — Elimination Log**
Full collapsible list of all eliminated countries grouped by reason (e.g., "Eliminated by budget", "Eliminated by visa restrictions", "Eliminated by your non-negotiables"). Each country is clickable to see its full elimination breakdown. Override button per country to re-enter it into consideration.

**Panel D — What If Sliders**
A panel where users can relax or tighten key constraints and watch the globe and match cards update in real time. E.g., "If you increased your budget to $4,000/month..." with a live preview of how many countries re-enter contention.

**Panel E — Share & Save**
A beautifully designed shareable result card (static image export) and a unique URL for the session results (no account required — results encoded in URL parameters or stored ephemerally with a short-lived token).

***

### 4.6 Country Deep Dive

Accessible from any match card via "Explore". A full-page view containing:

- Header: country name, flag, match %, one-sentence match summary
- **Match Breakdown** — scored bar chart across all 10 matching dimensions showing how the country performs against the user's profile specifically
- **Why You Fit** — 4–6 bullet points, AI-generated and data-anchored
- **Watch Out For** — 2–4 honest cautions specific to this user's profile
- **Cost Reality Check** — user's stated budget mapped to a realistic lifestyle breakdown in local currency and USD equivalent
- **Visa Pathway** — most likely visa route(s) for this user's passport and work type, with estimated processing time, difficulty rating, and a clear disclaimer (see Section 11)
- **Key Data Snapshot** — a clean data card showing: average monthly cost, safety index, healthcare rating, English proficiency score, internet speed median, climate summary, political stability score
- **Legal Disclaimer** — persistent, unobtrusive but clearly visible (see Section 11)

***

# 5. Functional Requirements

## 5.1 Core Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| F-01 | System must support all 195 UN-recognised countries in the matching engine | Must Have |
| F-02 | Full profiling experience must function without user authentication | Must Have |
| F-03 | Globe must update visually in real time as each question is answered | Must Have |
| F-04 | Live country counter must decrement in real time during profiling | Must Have |
| F-05 | Results must be shareable via URL without requiring an account | Must Have |
| F-06 | All match cards must display transparent "why you fit" and "watch out for" reasoning | Must Have |
| F-07 | Elimination log must be accessible for every eliminated country | Must Have |
| F-08 | "What If" constraint sliders must update results in real time | Must Have |
| F-09 | Interim results must be shown after Q6 | Must Have |
| F-10 | System must branch question flow based on life stage (Q1) | Must Have |
| F-11 | Hard constraints (budget, visa, language, non-negotiables) must filter before scoring begins | Must Have |
| F-12 | Shareable result card must be exportable as a static image | Must Have |
| F-13 | Legal disclaimer must be persistently visible on all results and deep dive pages | Must Have |
| F-14 | Quiz must be completable on mobile | Must Have |
| F-15 | Country deep dive page must include cost reality breakdown mapped to user's stated budget | Must Have |
| F-16 | System must detect user locale and display currency accordingly | Should Have |
| F-17 | Users must be able to override an elimination and re-add a country to their results | Should Have |
| F-18 | Deep dive visa pathway section must show most likely route(s) for user's passport + work type | Should Have |
| F-19 | System must display estimated quiz completion time on landing page | Should Have |
| F-20 | Users must be able to restart the quiz at any point without losing access to their current results | Should Have |
| F-21 | Sound design (opt-in) for elimination events and results reveal | Could Have |
| F-22 | Dark/light mode toggle | Could Have |
| F-23 | Personality mirror shown before results reveal | Could Have |
| F-24 | Animated staggered reveal of match cards | Must Have |

## 5.2 Out of Scope for V1

The following are explicitly excluded from V1 to maintain focus:

- User accounts and persistent profiles
- City-level matching
- AI chat assistant / conversational interface
- User-contributed ratings or reviews
- Third-party integrations (visa services, housing, insurance)
- Email capture or newsletter
- B2B features
- Native mobile applications
- Multi-language support for the UI (English-only in V1)
- Push notifications or alerts for country data changes

***

# 6. The Matching Engine

## 6.1 Architecture Overview

The matching engine operates in three sequential phases:

```
Phase 1: HARD FILTER
Raw pool (195 countries)
→ Apply binary constraint checks
→ Eliminated countries flagged with reason codes
→ Output: Candidate pool (variable, typically 30–120 countries)

Phase 2: WEIGHTED SCORING
Candidate pool
→ Score each country across 10 dimensions
→ Apply user-specific dimension weights
→ Produce composite match score (0–100)
→ Output: Ranked scored list

Phase 3: NARRATIVE GENERATION
Top N results (default: top 15)
→ Generate "why you fit" and "watch out for" text
→ Generate visa pathway recommendation
→ Generate cost reality breakdown
→ Output: Full match profiles
```

## 6.2 Hard Filter Logic

The following constraint checks run in priority order. A country failing any check is moved to the elimination pool with a tagged reason code.

| Check | Data Required | Logic |
|-------|---------------|-------|
| **Visa feasibility** | Passport nationality(ies), Henley Passport Index, bilateral visa data | If user's passport(s) have no viable long-stay pathway → eliminate |
| **Budget floor** | Numbeo cost of living index, user budget input | If country's realistic mid-range monthly cost > user budget × 1.15 → eliminate |
| **Language hard wall** | English Proficiency Index (EF EPI), user language selection | If user selected "English only" and country EF EPI score < threshold → eliminate |
| **Non-negotiable values** | ILGA World LGBTQ+ index, RSF Press Freedom, WHO, national law databases | If user selected non-negotiable and country fails → eliminate |
| **Healthcare critical need** | WHO health system ranking, specialist availability data | If user flagged critical health dependency and country score below minimum threshold → eliminate |

## 6.3 Scoring Dimensions

Ten dimensions are scored per country. Each dimension score is 0–10, derived from normalised data (see Section 7 for data sources).

| # | Dimension | What It Measures | Key Data Sources |
|---|-----------|-----------------|------------------|
| 1 | **Economic Accessibility** | Cost of living vs user's budget; purchasing power | Numbeo, World Bank |
| 2 | **Visa & Residency Access** | Ease of obtaining legal residency for user's profile | Henley, IMMI databases, government sources |
| 3 | **Safety & Stability** | Personal safety, crime rate, political stability | Global Peace Index, World Bank WGI |
| 4 | **Healthcare Quality** | System quality, accessibility, specialist care | WHO, Bloomberg Health Index |
| 5 | **Digital Infrastructure** | Internet speed, reliability, coworking infrastructure | Ookla Speedtest, ITU |
| 6 | **Climate Match** | Proximity to user's stated climate preference | ERA5 climate data, Open-Meteo |
| 7 | **Social & Cultural Fit** | English penetration, cultural openness, expat community size | EF EPI, World Values Survey, InterNations |
| 8 | **Values Alignment** | LGBTQ+ rights, press freedom, gender equality, environmental policy | ILGA, RSF, WEF GGG, EPI |
| 9 | **Economic Opportunity** | Business ease, tax environment, startup ecosystem (weighted for relevant life stages) | World Bank Doing Business, OECD |
| 10 | **Lifestyle Match** | Nature access, urban density, food culture, pace of life proxy | OECD Better Life, bespoke composite |

## 6.4 Weight Derivation

Dimension weights are **not manually set by the user** (unlike the US News approach). They are **inferred from the user's profile** and then optionally adjusted.

### Base Weight Table by Life Stage

| Dimension | Founder | Remote Worker | Family | Retiree | Optimiser | Values-Led |
|-----------|---------|---------------|--------|---------|-----------|------------|
| Economic Accessibility | 10% | 15% | 15% | 20% | 15% | 10% |
| Visa & Residency | 15% | 15% | 15% | 15% | 10% | 10% |
| Safety & Stability | 8% | 10% | 15% | 15% | 10% | 10% |
| Healthcare Quality | 5% | 8% | 12% | 20% | 8% | 8% |
| Digital Infrastructure | 15% | 18% | 8% | 3% | 10% | 5% |
| Climate Match | 8% | 8% | 10% | 12% | 12% | 8% |
| Social & Cultural Fit | 10% | 8% | 10% | 8% | 12% | 10% |
| Values Alignment | 8% | 8% | 8% | 5% | 10% | 25% |
| Economic Opportunity | 15% | 8% | 5% | 2% | 8% | 5% |
| Lifestyle Match | 6% | 2% | 2% | 0% | 5% | 9% |
| **Total** | **100%** | **100%** | **100%** | **100%** | **100%** | **100%** |

These base weights are then **adjusted by Q12 (Top Priorities)** — each selected priority boosts its associated dimension weight by up to +8%, redistributed proportionally from other dimensions.

**Further modifiers applied:**
- If children in household → Safety +5%, Healthcare +3%, Lifestyle Match −3%, Digital Infrastructure −5%
- If Q3 push factor = "tax reasons" → Economic Opportunity +5%, Visa & Residency +3%
- If Q3 push factor = "healthcare" → Healthcare Quality +8%, at cost of Lifestyle Match and Digital Infrastructure
- If Q11 = "radically different culture" → Values Alignment +3%, Social & Cultural Fit −3%

## 6.5 Match Score Calculation

```
For each candidate country C:

  Raw Score(C) = Σ [ Dimension_Score(C, d) × Weight(d) ]   for d in 1..10

  Normalisation:
  The top raw score in the candidate pool = 100%
  All other scores normalised relative to the top

  Match %(C) = (Raw Score(C) / Max Raw Score) × 100
```

Match scores are always shown relative to the user's own candidate pool, not against an absolute scale. This means a 90% match in a small restrictive candidate pool is meaningfully different from 90% in a large open pool — a nuance displayed subtly in the UI.

## 6.6 Narrative Generation

For each of the top 15 results, the system generates:

**Why You Fit** (3–6 bullet points)
Templated data-driven statements constructed from dimension scores and user profile. Where a dimension score is notably high relative to other countries in the pool, it generates a specific positive statement. Example logic:

```
IF Visa score > 8 AND life_stage == "founder":
  → "Portugal's D8 Digital Nomad visa offers a straightforward pathway
     for self-employed individuals, with NHR tax status available
     on arrival."

IF Economic Accessibility score > 8 AND budget < 3000:
  → "Your budget goes significantly further here than in most
     Western European countries — expect a comfortable lifestyle
     at roughly 60% of UK costs."
```

**Watch Out For** (2–4 bullet points)
Generated from dimensions where the country scores lower than average *relative to the user's priorities*. Critical nuance: a low absolute score on a low-weight dimension does not generate a warning. Only dimensions with moderate-to-high weight that score poorly generate cautions.

**V1 Implementation Note:** Narrative generation in V1 will use a structured template system (not a live LLM call per result) for performance, cost, and consistency. Pre-generated templates are parameterised by country, user life stage, and scoring context. LLM-powered dynamic narrative is a V2 feature.

***

# 7. Data Architecture & Pipeline

## 7.1 Design Principles

- **Owned pipeline** — all data ingested and stored internally; no live third-party API calls during user sessions
- **Layered freshness** — different data types have different update cadences; the system tracks freshness per data point and surfaces staleness warnings where relevant
- **Graceful degradation** — if a data point is missing or stale for a country, the system falls back to a regional average and flags it, rather than excluding the country or fabricating data
- **Transparency** — all data sources are documented and surfaced to users in the deep dive view

## 7.2 Data Source Registry

| Category | Primary Source | Secondary / Validation | Update Cadence |
|----------|---------------|----------------------|----------------|
| Cost of Living | Numbeo API | Expatistan, local government CPI data | Monthly |
| Passport / Visa Access | Henley Passport Index | IATA Travel Centre, government immigration portals | Quarterly |
| Safety Index | Global Peace Index (IEP)	Numbeo Crime Index, World Bank WGI	Annually
Healthcare Quality	WHO Global Health Observatory	Bloomberg Health-Efficiency Index, Legatum Prosperity Index	Annually
Political Stability	World Bank Governance Indicators	Economist Democracy Index, Freedom House	Annually
Internet Speed	Ookla Speedtest Global Index	ITU ICT Development Index	Quarterly
Climate Data	ERA5 Reanalysis (Copernicus)	Open-Meteo historical averages	Annually (averages); Monthly (current conditions)
English Proficiency	EF English Proficiency Index	Ethnologue language data	Annually
LGBTQ+ Rights	ILGA World State-Sponsored Homophobia Report	Rainbow Europe Index	Annually
Press Freedom	RSF World Press Freedom Index	Freedom House Press Freedom	Annually
Gender Equality	WEF Global Gender Gap Index	UN Gender Inequality Index	Annually
Environmental Policy	Yale Environmental Performance Index	Climate Action Tracker	Annually (EPI); Quarterly (CAT)
Business Environment	World Bank Doing Business / B-READY	Heritage Foundation Economic Freedom	Annually
Tax Environment	OECD Tax Database	KPMG Global Tax Rates	Annually
Expat Community Size	InterNations Expat Insider	UN DESA migrant stock data	Annually
Startup Ecosystem	StartupBlink Global Index	Crunchbase density data	Annually
Visa Pathway Detail	National government immigration portals (scraped)	Fragomen, KPMG immigration guides	Quarterly
Air Quality	IQAir World Air Quality Report	WHO Ambient Air Quality Database	Annually
Natural Disaster Risk	INFORM Risk Index	World Risk Index	Annually
Population / Urban Density	UN World Urbanization Prospects	World Bank	Annually
Healthcare Drug Availability	WHO Essential Medicines List compliance per country	Bespoke country research	Annually
7.3 Data Pipeline Architecture
text
┌─────────────────────────────────────────────────────────┐
│                    INGESTION LAYER                       │
│                                                         │
│  Scheduled jobs (cron) per source per cadence           │
│  API pulls where available                              │
│  Structured scraping where API unavailable              │
│  Manual research for low-frequency / high-specificity   │
│  data (e.g., visa pathway detail)                       │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                  NORMALISATION LAYER                     │
│                                                         │
│  Raw values converted to normalised 0–10 scores         │
│  per dimension per country                              │
│  Inversion applied where needed (e.g., crime rate       │
│  inverted to safety score)                              │
│  Missing values handled: regional fallback → flag       │
│  Composite scores computed for multi-source dimensions  │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                  COUNTRY DATA STORE                      │
│                                                         │
│  One record per country (195 rows)                      │
│  ~80 raw data fields per country                        │
│  10 normalised dimension scores                         │
│  Freshness timestamp per field                          │
│  Source attribution per field                           │
│  Flag for stale / estimated / missing data              │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│               MATCHING ENGINE (SERVER-SIDE)              │
│                                                         │
│  Reads from Country Data Store                          │
│  Accepts user profile as input                          │
│  Executes Phase 1 (filter), Phase 2 (score),            │
│  Phase 3 (narrative) pipeline                           │
│  Returns ranked match payload to frontend               │
└─────────────────────────────────────────────────────────┘
7.4 Country Data Record Schema
Each country record contains the following top-level structure:

json
{
  "country_code": "PT",
  "country_name": "Portugal",
  "region": "Southern Europe",
  "is_eu_member": true,
  "is_schengen": true,
  "currency": "EUR",
  "capital_city": "Lisbon",

  "dimension_scores": {
    "economic_accessibility": 7.4,
    "visa_residency_access": 8.1,
    "safety_stability": 8.6,
    "healthcare_quality": 7.2,
    "digital_infrastructure": 6.9,
    "climate_match": null,
    "social_cultural_fit": 7.8,
    "values_alignment": 8.3,
    "economic_opportunity": 7.1,
    "lifestyle_match": 8.5
  },

  "raw_data": {
    "numbeo_cost_index": 47.3,
    "numbeo_cost_updated": "2026-03",
    "gpi_score": 1.481,
    "ef_epi_score": 60.7,
    "ookla_median_fixed_mbps": 112.4,
    "ilga_rainbow_score": 72,
    "rsf_press_freedom_score": 79.4,
    "wef_ggg_score": 0.763,
    "who_health_index": 12,
    "iqair_aqi_annual": 18,
    ...
  },

  "visa_pathways": [
    {
      "pathway_id": "PT_D8",
      "name": "D8 Digital Nomad Visa",
      "eligible_work_types": ["remote_employee", "freelancer", "founder"],
      "min_income_eur": 3040,
      "duration_months": 12,
      "renewable": true,
      "leads_to_residency": true,
      "residency_years_required": 5,
      "difficulty_rating": 2,
      "processing_time_weeks": 8,
      "notes": "NHR tax regime available. Portuguese language required for citizenship.",
      "source_url": "https://vistos.mne.gov.pt",
      "last_verified": "2026-02-01"
    }
  ],

  "cost_breakdown_template": {
    "rent_1bed_capital_usd": 1350,
    "rent_1bed_secondary_usd": 820,
    "rent_2bed_capital_usd": 1800,
    "groceries_monthly_usd": 280,
    "dining_out_meal_usd": 14,
    "transport_monthly_usd": 42,
    "coworking_monthly_usd": 180,
    "gym_monthly_usd": 35,
    "private_health_insurance_monthly_usd": 90
  },

  "meta": {
    "data_completeness_pct": 94,
    "last_full_review": "2026-01-15",
    "stale_fields": ["startup_ecosystem_score"],
    "data_confidence": "high"
  }
}
7.5 Data Quality Standards
Standard	Requirement
Completeness	All 195 countries must have at minimum the 10 dimension scores populated. Missing raw fields are acceptable if the dimension score can still be computed from remaining sources
Staleness threshold	Any field older than 1.5× its expected update cadence is flagged as stale. Stale data is used with a confidence penalty applied to that dimension score
Confidence ratings	Each country record carries an overall data confidence rating: High (>85% fields current), Medium (65–85%), Low (<65%). Low-confidence countries are displayed with a visible caveat in the deep dive
Visa pathway verification	All visa pathway records must include a last_verified date and source URL. Any pathway older than 4 months triggers a review task
Anomaly detection	Automated checks flag values that deviate >30% from the previous ingestion. Manual review required before publishing
8. UI/UX Design System
8.1 Design Philosophy
The visual and interaction design must communicate three things simultaneously:

Intelligence — This is a sophisticated system, not a BuzzFeed quiz

Warmth — This is about your life and where you belong, not a spreadsheet

Precision — Every visual element has a purpose; nothing is decorative noise

The dominant aesthetic reference is: premium data product meets editorial travel magazine. Think the visual language of a high-end infographic studio combined with the spatial feel of a well-designed mapping product.

8.2 Visual Identity (Working Direction)
Primary palette — Dark mode default:

Token	Value	Usage
background-primary	#0A0E14	Page background
background-surface	#13181F	Cards, panels
background-elevated	#1C2330	Hover states, tooltips
accent-primary	#4ADE80	Top match glow, CTAs, positive indicators
accent-secondary	#60A5FA	Globe highlight, interactive elements
accent-warning	#FBBF24	"Watch out for" indicators, partial match
accent-eliminated	#374151	Eliminated country state
text-primary	#F9FAFB	Headings, primary body
text-secondary	#9CA3AF	Supporting text, labels
text-muted	#4B5563	Timestamps, metadata
Typography:

Role	Typeface	Weight	Notes
Display / Hero	Fraunces or Playfair Display	300–700	Italic for personality, editorial feel
UI / Body	Inter	400–600	Clean, legible, universal
Data / Monospace	JetBrains Mono	400	Scores, percentages, data points
Country Names	Inter	700	All caps, tracked
Motion principles:

Elimination fade: 600ms ease-out desaturation + opacity to 0.25

Globe rotation: 0.3rpm idle, eases to stop on interaction

Card reveal: staggered 80ms delay between cards, 400ms slide-up + fade-in per card

Counter decrement: number ticks down with a subtle flip animation (like a departure board)

Heat map transition: 800ms colour interpolation from neutral to scored state

All motion respects prefers-reduced-motion

8.3 The Globe Component
The globe is the most technically and visually significant component in the product. It must meet the following specifications:

Rendering:

3D WebGL globe rendered via Three.js with a custom globe geometry, or via Globe.gl (which wraps Three.js and provides a higher-level country polygon API)

Country polygons rendered as GeoJSON TopoJSON boundaries at medium resolution (~110m)

Smooth texture: dark ocean base (#0D1117), subtle grid lines (#1F2937 at 15% opacity), no default map labels

States per country polygon:

State	Visual
neutral (pre-quiz)	#2D3748, slight glow
active (in running)	Warm white #F9FAFB, soft pulsing edge
eliminating	600ms animated desaturation → eliminated state
eliminated	#1A2030, flat, no glow
scored-low	#854D0E (dark amber)
scored-mid	#CA8A04 (amber)
scored-high	#16A34A (green)
top-match	#4ADE80 with repeating soft pulse ring
hovered	Brightness +20%, country name tooltip appears
selected	Elevated brightness, deep dive panel opens
Interactions:

Click and drag to rotate manually

Scroll / pinch to zoom

Hover: country name + current status tooltip

Click on any country: opens a mini-card with current match status and "View Full Profile" link

On results reveal: globe auto-animates a rotation to centre on the top match

Performance:

Initial render must complete within 2 seconds on a modern mid-range device

Country state updates must apply within 100ms of the triggering answer being submitted

Must degrade gracefully to a flat Mercator map (SVG-based) if WebGL is unavailable

Accessibility:

Globe has an accessible fallback: a searchable sortable table of all countries with their current status

All globe interactions are keyboard-navigable via the fallback table

Screen reader announces country status changes

8.4 The Question Card Component
Each question occupies the full viewport during the profiling phase.

Layout (desktop):

text
┌────────────────────────────────────┬──────────────────┐
│                                    │                  │
│   Question area (65% width)        │   Globe          │
│                                    │   (35% width)    │
│   Question number indicator        │                  │
│   Progress funnel visual           │   Live counter   │
│                                    │   🌍 142 left    │
│   Question text (large, editorial) │                  │
│                                    │   Elimination    │
│   Answer options (card style)      │   toast area     │
│                                    │                  │
│   [Back]           [Continue →]    │                  │
│                                    │                  │
└────────────────────────────────────┴──────────────────┘
Layout (mobile):

Globe collapses to a banner strip at the top (showing a zoomed-out flat projection)

Live counter shown in the globe strip

Question and options fill the remaining viewport

Globe expands to full screen on tap ("See what's left" interaction)

Answer option cards:

Each option is a full-width clickable card with a radio indicator

Single-select: selecting one deselects others with a smooth transition

Multi-select: checkboxes with a selected count indicator

Selected state: accent border + subtle background tint

No "Continue" button required for single-select — automatically advances after a 400ms confirmation pause (gives user a sense the choice was registered). Multi-select requires explicit Continue.

Elimination toast:
Appears in the bottom-right corner (desktop) or top of screen (mobile) for 3 seconds after any answer that eliminates countries:

text
┌────────────────────────────────────┐
│  🌍  Just removed 18 countries     │
│  Visa restrictions for UK passport │
└────────────────────────────────────┘
Multiple eliminations are batched into a single toast per question.

8.5 Results Page Layout
Desktop — three-panel layout:

┌──────────────────┬──────────────────────────┬────────────┐
│                  │                          │            │
│   Globe panel    │   Match cards            │  Side      │
│   (35% width)    │   (staggered reveal)     │  panel     │
│                  │                          │  (toggle)  │
│   Heat map       │   Card 1 (top match)     │            │
│   active         │   Card 2                 │  Toggles:  │
│                  │   Card 3                 │            │
│   Country        │   Card 4                 │  • Elim.   │
│   counter        │   Card 5                 │    Log     │
│   summary        │   ...up to 10            │            │
│                  │                          │  • What If │
│   [Explore       │   [Load more →]          │    Sliders │
│    the globe]    │                          │            │
│                  │                          │  • Share   │
└──────────────────┴──────────────────────────┴────────────┘
```

**Mobile — single column stacked:**
- Globe at top (40vh, interactive)
- Match cards scrolling vertically below
- Bottom tab bar: Globe / Cards / Elimination / What If / Share

## 8.6 Match Card Component

```
┌─────────────────────────────────────────────┐
│  🇵🇹  PORTUGAL                    87% Match │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░                      │
│                                             │
│  Southern Europe · EU · Schengen            │
│                                             │
│  WHY YOU FIT                                │
│  ✓ NHR tax regime suits freelance income    │
│  ✓ D8 visa: straightforward for founders   │
│  ✓ Growing Lisbon tech ecosystem            │
│                                             │
│  WATCH OUT FOR                              │
│  ⚠ Bureaucracy can be slow                  │
│  ⚠ Lisbon rental market is tight            │
│                                             │
│  Monthly cost est. for your budget:         │
│  £2,100–£2,600  ·  saves ~£1,600/mo        │
│                                             │
│  ┌──────────────┐  ┌──────────────────┐    │
│  │   Explore    │  │     Compare      │    │
│  └──────────────┘  └──────────────────┘    │
└─────────────────────────────────────────────┘
```

**Card states:**
- Default: as above
- Hovered: subtle card lift (translateY -4px, shadow deepens)
- Expanded (inline): card grows to show full 10-dimension score breakdown as a horizontal bar chart
- Pinned: user can pin up to 3 cards for side-by-side comparison

## 8.7 Elimination Log Component

Accessible via the side panel toggle. Full scrollable list of all eliminated countries, grouped into collapsible sections by primary elimination reason:

```
ELIMINATED BY VISA RESTRICTIONS  (34 countries)  ▼
  🇸🇦 Saudi Arabia     No viable long-stay pathway for UK passport
  🇨🇳 China            ...
  🇷🇺 Russia           ...

ELIMINATED BY BUDGET  (28 countries)  ▼
  🇨🇭 Switzerland      Est. monthly cost $5,200 exceeds your $3,000
  🇳🇴 Norway           ...

ELIMINATED BY NON-NEGOTIABLES  (11 countries)  ▼
  🇺🇬 Uganda           LGBTQ+ criminalised
  🇷🇺 Russia           Press freedom: Critical
  ...

ELIMINATED BY HEALTHCARE  (4 countries)  ▼
  ...
```

Each eliminated country row has an **Override** button. Clicking it:
1. Opens a confirmation: *"Add Switzerland back — it won't meet your budget constraint, but you'll see how it scores on everything else."*
2. On confirm: country re-enters the candidate pool with a visual "override" badge on its match card
3. Globe updates to reflect its re-entry

## 8.8 What If Sliders Component

A panel containing interactive constraint levers. Updates the globe and match cards in real time (debounced 300ms).

```
WHAT IF YOU CHANGED...

Monthly Budget
  $1,500 ──────●────────────── $8,000+
               $3,000
  ↳ Increasing to $4,500 adds 12 countries
    including Switzerland, New Zealand, UAE

Language Flexibility
  English only ──────●──── Open to learning
  ↳ Opening to French adds 8 countries

Healthcare Requirement
  General only ●──────────── Critical access
  ↳ Relaxing to "general" adds 4 countries
```

Each slider shows a live preview tooltip of what changes before the user commits. A **Reset to my answers** button returns all sliders to their original values.

## 8.9 Share Component

A modal triggered by the Share button in the side panel.

**Shareable link:**
```
Your results link:
countrydna.io/r/xK9mP2qR

Results are saved for 90 days. No account needed.
[Copy link]
```

**Shareable image card** (exported as PNG, 1200×630 for OG/social):
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   CountryDNA                          [globe icon]  │
│                                                     │
│   My top country matches:                           │
│                                                     │
│   🇵🇹 Portugal        87%  ▓▓▓▓▓▓▓▓▓░              │
│   🇲🇽 Mexico          81%  ▓▓▓▓▓▓▓▓░░              │
│   🇨🇷 Costa Rica      78%  ▓▓▓▓▓▓▓░░░              │
│   🇹🇭 Thailand        74%  ▓▓▓▓▓▓░░░░              │
│   🇪🇪 Estonia         71%  ▓▓▓▓▓▓░░░░              │
│                                                     │
│   Find yours at countrydna.io                       │
└─────────────────────────────────────────────────────┘
```

**Download options:** PNG image / Copy link / Share to X / Share to WhatsApp / Share to LinkedIn

***

# 9. Technical Architecture

## 9.1 Architecture Philosophy

The stack must support:
- World-class frontend polish (complex animations, WebGL globe, real-time updates)
- A matching engine that runs server-side (data not exposed to client)
- Static result pages (shareable URLs must resolve without a live user session)
- Low operational complexity for a small team
- Easy iteration and deployment

## 9.2 Recommended Stack

### Frontend
**Framework: Next.js 15 (App Router)**
- Enables hybrid SSR/SSG — landing page and shared result pages are statically generated or server-rendered for SEO and performance
- React Server Components for data-heavy pages
- Client Components for interactive elements (globe, sliders, quiz cards)

**Globe: Globe.gl + Three.js**
- Globe.gl provides a high-level API for country polygon rendering, hover states, and colour mapping
- Three.js underlies it for custom shader effects (glow, pulse animations)
- Falls back to a D3.js + SVG flat map if WebGL unavailable

**Animation: Framer Motion**
- Card reveals, page transitions, counter animations
- Respects `prefers-reduced-motion` via built-in support

**Styling: Tailwind CSS + CSS Custom Properties**
- Utility-first for speed and consistency
- Custom properties for the design token system (dark/light mode theming)

**State Management: Zustand**
- Lightweight, minimal boilerplate
- Manages quiz state, current profile, results payload, and globe state
- Persisted to sessionStorage for the duration of a single session

### Backend
**Runtime: Node.js via Next.js API Routes / Route Handlers**
- Matching engine runs entirely server-side
- User profile sent to `/api/match` endpoint; full country data never exposed to the client
- Only the result payload (ranked list, match scores, narratives) is returned

**Matching Engine: TypeScript**
- Pure TypeScript implementation, fully unit-testable
- No external ML dependencies in V1 — deterministic weighted scoring
- Runs in under 200ms for a full match computation across 195 countries

**Shared Result Storage: Upstash Redis (or Vercel KV)**
- Shareable result URLs store the result payload against a short token
- TTL of 90 days
- No PII stored — user profile answers are not persisted, only the result payload

### Data & Infrastructure
**Country Data Store: PostgreSQL (Supabase)**
- Single `countries` table with JSONB for flexible raw data fields
- Separate `visa_pathways` table with foreign key to country
- Read-only from the matching engine; write access only from the data pipeline

**Data Pipeline: Python**
- Scheduled ingestion scripts per source
- Runs on a lightweight cron setup (Railway, Render, or GitHub Actions for low-frequency jobs)
- Writes normalised scores to Supabase
- Logs freshness timestamps and triggers Slack/email alert on anomalies

**Hosting: Vercel**
- Next.js-native deployment
- Edge functions for the matching API (low latency globally)
- Analytics and Web Vitals built in
- Preview deployments for every PR

**Image Export (Share Card): Satori + sharp**
- Satori renders the share card as an SVG from a React component
- sharp converts to PNG for download
- Runs as a serverless function

### External Services
| Service | Purpose |
|---------|---------|
| Vercel | Hosting, edge functions, preview deploys |
| Supabase | PostgreSQL database, dashboard for data ops |
| Upstash Redis / Vercel KV | Ephemeral result storage for shared URLs |
| Resend (future) | Transactional email for V2 accounts |
| Posthog | Product analytics and session recording |
| Sentry | Error monitoring |
| Cloudflare | DNS, DDoS protection, CDN for static assets |

## 9.3 API Design

### POST /api/match
Accepts the user's completed profile and returns the full match payload.

**Request:**
```typescript
{
  life_stage: LifeStageEnum,
  household: HouseholdType,
  children_ages?: AgeRange[],
  push_factors: PushFactor[],
  passports: CountryCode[],
  budget_usd_monthly: number,
  languages: LanguageCode[],
  language_flexibility: "english_only" | "open_to_learning",
  healthcare_need: HealthcareNeedLevel,
  non_negotiables: NonNegotiable[],
  social_mode: SocialModeEnum,
  environment_preference: EnvironmentEnum,
  cultural_appetite: CulturalAppetiteEnum,
  top_priorities: Priority[],
  dealbreakers: Dealbreaker[],
  locale: string
}
```

**Response:**
```typescript
{
  session_token: string,           // for shareable URL
  candidate_count: number,         // how many passed hard filters
  eliminated_count: number,
  matches: MatchResult[],          // top 15, ranked
  eliminated: EliminatedCountry[], // all eliminated, with reason codes
  profile_summary: string,         // personality mirror text
  computed_weights: DimensionWeights, // for transparency
  generated_at: ISO8601Timestamp
}
```

### GET /api/results/:token
Returns a stored result payload by share token. Used for shareable URL resolution.

### POST /api/whatif
Accepts a modified profile (with one or more constraints relaxed/tightened) and returns a delta update — which countries entered or left, and updated scores. Designed to be fast (<100ms) for real-time slider interaction.

### GET /api/countries/:code
Returns the public-facing data for a single country for the deep dive view. Strips internal scoring metadata; returns formatted data for display.

## 9.4 Performance Budgets

| Metric | Target |
|--------|--------|
| Largest Contentful Paint (LCP) | < 2.0s |
| First Input Delay (FID) / INP | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.05 |
| Globe initial render | < 2.0s on mid-range device |
| Match computation (server) | < 200ms |
| What If update (perceived) | < 300ms end-to-end |
| Share card PNG generation | < 1.5s |
| Time to Interactive (full quiz page) | < 3.0s on 4G |

## 9.5 Browser & Device Support

| Platform | Target |
|----------|--------|
| Chrome, Edge, Firefox, Safari | Latest 2 major versions |
| iOS Safari | 15+ |
| Android Chrome | Latest 2 major versions |
| Minimum viewport width | 320px |
| WebGL support | Required for globe; flat map fallback for non-WebGL |
| JavaScript disabled | Landing page renders; quiz and globe require JS (graceful error message) |

***

# 10. Content Requirements

## 10.1 Country Profile Content

Every country must have the following content populated before launch:

| Content Item | Type | Notes |
|-------------|------|-------|
| Official country name | String | UN standard |
| Common name | String | As used colloquially (e.g., "South Korea" not "Republic of Korea") |
| Region and subregion | Enum | Used for grouping in elimination log |
| Capital city | String | |
| Currency | String + ISO code | |
| Official languages | Array | |
| EU / Schengen / Commonwealth membership | Boolean flags | |
| Brief country descriptor | 1–2 sentences | Shown on match card hover and deep dive header |
| All 10 dimension scores | Float 0–10 | From data pipeline |
| All raw data fields (as available) | Various | From data pipeline |
| 1–4 visa pathway records | Structured | For most common expat visa routes |
| Cost breakdown template | Structured | From Numbeo + local research |

## 10.2 Narrative Template Library

The V1 narrative generation system uses a library of parameterised templates. The following template categories must be written before launch:

**"Why You Fit" templates:**
- Economic accessibility (high score, various budget levels)
- Visa ease (by life stage × passport tier)
- Safety & stability (high score)
- Healthcare (high score, by user need level)
- Tech ecosystem (by life stage)
- Climate match (by preference × actual climate)
- English accessibility
- LGBTQ+ safety (for users who selected this non-negotiable)
- Low tax environment (by life stage)
- Expat community size
- Natural environment / outdoors
- Cultural richness

**"Watch Out For" templates:**
- Bureaucracy / slow processes (moderate score on visa ease)
- Language barrier (moderate English proficiency)
- High rental costs (economic accessibility moderately low)
- Political instability (moderate safety score)
- Healthcare gaps (moderate healthcare score + user has healthcare need)
- Climate extremes (heat, humidity, cold — flagged by dealbreaker or low climate match)
- Limited expat community (low social fit score)
- Internet infrastructure (low digital score + user is remote worker)
- Air quality (poor AQI + user flagged environment)

**Personality Mirror templates (shown before results):**
One sentence that reflects the user's profile back to them. Examples:
- *"You're a UK-based founder who values fiscal efficiency and doesn't
want to sacrifice healthcare quality. Here's how the world looks for you."*

"You're building a life abroad for your family — safety, schools, and stability are everything. Here's where the world delivers."

"You're a remote worker who wants warm weather, low cost, and fast internet. The world has more options than you'd think."

"You're not ready to commit — just exploring what's possible. Here's a picture of the world with your preferences in mind."

"You're driven by values first. Here are the countries that share them."

Templates are selected and parameterised by: life stage + top 2 priorities + push factor + household type. 30–40 total mirror templates cover the full combinatorial space.

10.3 UI Microcopy
All microcopy must be written to a consistent voice: intelligent, warm, direct, never corporate. Key copy touchpoints requiring dedicated copywriting:

Location	Notes
Landing page headline and subtext	Single most important copy in the product
Question text for all 13 questions	Plain language, no jargon, feels like a thoughtful conversation
Answer option labels and sublabels	Must be scannable and immediately understood
Elimination toast messages	Informative but not alarming — "Just narrowed things down" not "Eliminated"
Interim results reveal	Must create genuine excitement and pull to continue
Match card "Why You Fit" and "Watch Out For" headers	Friendly, not clinical
Personality mirror	Must feel like insight, not a horoscope
Elimination log section headers	Clear grouping language
What If panel labels	Must convey exploration without implying the user was wrong
Legal disclaimer	Clear, honest, non-alarming — not buried legalese
Empty states (e.g., no countries pass hard filters)	Must be handled gracefully — see Section 10.5
Share card tagline	Punchy, shareable, brand-forward
404 / expired result page	Warm, helpful, not just an error
10.4 Legal Disclaimer Copy
The following disclaimer (or a close variant) must appear persistently on all results pages, deep dive pages, and visa pathway sections:

Important: CountryDNA provides general information for research purposes only. Nothing on this site constitutes legal, immigration, financial, or medical advice. Visa rules, costs, and country conditions change frequently — always verify information with official government sources or qualified professionals before making any decisions. CountryDNA accepts no liability for decisions made based on information displayed here.

A shorter inline version appears adjacent to all visa pathway content:

Visa information is for general guidance only and may be out of date. Always verify with official sources. This is not legal advice.

10.5 Edge Case Content
No countries pass hard filters:
This can happen if a user selects extremely restrictive constraints (e.g., very low budget + English only + LGBTQ+ safety + high healthcare need). The system must not return a blank results page.

Response:

text
Your filters are very specific — and that's okay.

Based on your current settings, no country meets all your
requirements simultaneously. Here's what's closest:

[Show top 5 countries that fail the fewest constraints,
 with clear indication of which constraint each fails]

Want to explore what's possible if you adjusted one thing?
[What If Sliders — pre-opened]
Only 1–3 countries pass hard filters:
Show all that pass with a note:

Your filters are highly specific — only a handful of countries meet all your requirements. Here's how they compare.

User skips passport question:
Visa filtering cannot run without passport data. System proceeds without visa filtering, applies a visible caveat banner to all results:

Visa pathways are not shown because you didn't share your nationality. Results assume you have access — verify visa options independently.

Country has low data confidence:
A visible badge on the match card and deep dive:

⚠ Data for this country is partially estimated. Results should be treated as indicative.

11. Legal & Compliance
11.1 Corporate Structure
CountryDNA is to be launched under a new UK limited company (separate from any existing entity). The following legal groundwork must be completed before public launch:

Item	Notes
Company incorporation	New UK Ltd
Domain registration	To be confirmed once name is finalised
Trademark search	Prior to name finalisation — check UK IPO, EUIPO, USPTO
Terms of Service	Must include data usage, disclaimer of liability, acceptable use
Privacy Policy	GDPR-compliant; anonymous-first product but IP addresses and analytics data are processed
Cookie Policy	Required for analytics (Posthog). Minimal cookie banner — analytics are cookieless where possible
11.2 GDPR & Privacy
Despite V1 being anonymous-first (no accounts, no email collection), GDPR obligations still apply because:

Analytics data (Posthog) processes behavioural data

Server logs process IP addresses

Shareable result tokens stored in Redis constitute personal data processing if linkable to an individual

Privacy design principles for V1:

No user profiles stored beyond the ephemeral session

Share tokens store only the result payload (no IP, no browser fingerprint, no answers)

Analytics configured to anonymise IPs and not use cross-site tracking cookies

Cookie banner required — single opt-in for analytics; no third-party ad tracking in V1

Privacy Policy must disclose: what data is collected, how long it is retained, basis for processing, user rights

Result tokens expire after 90 days with automatic deletion from Redis

11.3 Data Accuracy & Liability
Given the product surfaces information about visa rules, costs, and country conditions that users may act on, the following protections must be in place:

Protection	Implementation
Disclaimer on all results pages	See Section 10.4
Disclaimer on all visa pathway content	Inline, adjacent to content
Data freshness visible to user	"Last updated" shown on deep dive data fields
Source attribution	All data sources linked in deep dive
No personalised legal or financial advice	System generates descriptive information only, never prescriptive instructions
No visa application assistance	System describes pathways only; never links to application forms as a direct CTA
Terms of Service liability cap	Standard limitation of liability clause
11.4 Intellectual Property
Item	Notes
Data sources	All third-party data used in accordance with source terms. Numbeo, EF EPI, IEP etc. each have specific terms for commercial use — must be reviewed and complied with before launch
GeoJSON country boundary data	Use Natural Earth data (public domain) or OpenStreetMap (ODbL licence — attribution required)
Typography	Ensure web font licences cover the expected traffic volume
Globe library	Globe.gl is MIT licensed; Three.js is MIT licensed
Flag assets	Use open-source emoji flags (Unicode) or a licensed flag icon set — avoid scraping from Wikipedia
12. Analytics & Instrumentation
12.1 Analytics Philosophy
Analytics in V1 serve one purpose: understanding where the product is losing people and where it is delighting them, so that V2 decisions are data-driven rather than assumed.

No data is sold. No advertising. No cross-site tracking. Posthog (self-hosted or cloud) is the single analytics platform.

12.2 Core Events to Track
Funnel Events
Event	Properties
page_viewed	page, referrer, utm_source, utm_medium
quiz_started	entry_point (hero CTA, nav, etc.)
question_answered	question_id, answer_value (anonymised buckets, not raw), time_taken_seconds
question_skipped	question_id
quiz_abandoned	last_question_id, time_in_quiz
interim_results_shown	candidate_count_at_interim
interim_continue_clicked	
interim_see_full_list_clicked	
quiz_completed	total_time_seconds, question_count
results_viewed	candidate_count, top_match_country
match_card_clicked	country_code, rank, action (explore/compare)
deep_dive_viewed	country_code, source (card/globe/elimination_log)
elimination_log_opened	
eliminated_country_viewed	country_code
override_added	country_code, elimination_reason
whatif_slider_adjusted	dimension, direction (relaxed/tightened), countries_added, countries_removed
share_modal_opened	
share_link_copied	
share_image_downloaded	
shared_result_viewed	token (anonymised), source_platform
globe_interacted	interaction_type (rotate/zoom/click/hover)
Quality Events
Event	Properties
globe_render_failed	fallback_shown
match_computation_slow	duration_ms
data_confidence_low_country_viewed	country_code
no_results_state_shown	constraint_causing_zero
error_shown	error_type, page
12.3 Key Metrics & Dashboards
Primary funnel dashboard:

Landing page → Quiz start conversion rate (target: >45%)

Quiz start → Completion rate (target: >65%)

Completion → Results engaged (spent >60s on results page) (target: >75%)

Results → Share action taken (target: >15%)

Share link → New quiz started (viral coefficient proxy)

Engagement quality dashboard:

Average time on results page

% of users who open elimination log

% of users who use What If sliders

% of users who view a country deep dive

Most common countries appearing in top 3 matches (content investment signal)

Most common elimination reasons (data quality signal)

Drop-off analysis:

Per-question abandonment rate

Which question causes the most drop-off

Time per question (unusually long = confusing question)

Which constraint combination leads to zero results

Data quality dashboard:

% of country records with high / medium / low data confidence

Fields approaching staleness threshold

Anomaly flags triggered per ingestion run

Visa pathway records due for verification

13. Performance Requirements
13.1 Core Web Vitals Targets
All targets measured on a simulated mid-range Android device on a 4G connection, consistent with Google's testing methodology.

Metric	Target	Rationale
LCP	< 2.0s	Premium feel; Google ranking factor
INP	< 100ms	Quiz interactions must feel instant
CLS	< 0.05	Globe and card animations must not cause layout shift
TTFB	< 400ms	Server-side render must be fast
TTI	< 3.5s	Full interactivity including globe
13.2 Specific Interaction Performance
Interaction	Target
Answer selected → globe update begins	< 100ms
Answer selected → elimination toast appears	< 150ms
Quiz submitted → results page rendered	< 1.5s
What If slider moved → results update visible	< 300ms
Country deep dive page load	< 1.0s
Share card PNG generated	< 1.5s
Shared URL → results page load (cold)	< 2.0s
13.3 Scalability
V1 does not require complex scalability infrastructure given the anonymous-first, stateless design. However:

The matching engine must handle concurrent requests without blocking — each request is fully stateless

Country data is read-only during user sessions — aggressive caching at the edge (Vercel Edge Cache) means database load is minimal

Redis result storage must be sized for estimated result volume — assume 10,000 results/day at launch, scaling to 100,000/day within 3 months of viral growth

The data pipeline runs on a separate infrastructure from the web application — ingestion jobs cannot affect frontend performance

13.4 Availability
Target	Notes
Uptime SLO	99.5% monthly (Vercel managed hosting handles this)
Planned maintenance	Zero downtime deploys via Vercel
Data pipeline failure	Does not affect frontend — last good data snapshot serves until pipeline recovers
Redis unavailability	Graceful degradation — shareable URLs disabled with user-facing message; quiz and results continue to function
14. V1 Scope & Release Criteria
14.1 V1 Feature Set Summary
In scope:

Landing page with live rotating globe

Full 13-question profiling experience with branching logic

Real-time globe updates during quiz

Live country counter

Elimination toasts

Interim results reveal at Q6

Full results page: globe heat map, top 10 match cards, elimination log, What If sliders, share panel

Country deep dive page (all 195 countries)

Shareable URLs (90-day TTL, no account required)

Shareable PNG image export

Data pipeline with all sources listed in Section 7.2

All 195 countries in the matching engine with complete dimension scores

Visa pathway data for the 40 most common expat destination countries (expanded to all in V1.1)

Legal disclaimers on all relevant pages

Mobile-responsive design

WebGL globe with flat map fallback

Dark mode (default); light mode toggle

Posthog analytics

Not in scope for V1 (explicitly deferred):

User accounts / persistent profiles

AI-powered dynamic narrative (LLM calls per result)

City-level matching

Email capture / newsletter

Third-party integrations

User-contributed data

Multi-language UI

Native mobile apps

B2B features

Sound design

14.2 Definition of Done — V1
The product is ready for public launch when all of the following are true:

Functional:

All 13 questions render correctly with branching logic validated across all life stage paths

Hard filter logic tested against known expected outcomes for 20+ passport/budget/constraint combinations

Matching engine produces ranked results for all valid input profiles with no unhandled edge cases

Elimination log shows correct reason codes for all 195 countries across all filter scenarios

What If sliders produce correct delta updates in real time

Shareable URLs resolve correctly from cold load with no session required

Share card PNG exports correctly at 1200×630

Data:

All 195 countries have complete dimension scores (no nulls in the 10 core dimensions)

All 195 countries have a cost breakdown template populated

Visa pathway data populated for top 40 expat destination countries

All data sources have completed at least one full ingestion cycle

Data pipeline monitoring and alerting active

Design & Performance:

Globe renders correctly on Chrome, Firefox, Safari, and Edge (latest 2 versions)

Flat map fallback renders correctly on a device with WebGL disabled

All Core Web Vitals targets met on mobile (4G simulation)

All animations respect prefers-reduced-motion

Full quiz completable on 320px viewport

Legal:

Legal disclaimer present and visible on all results and deep dive pages

Inline visa disclaimer present on all visa pathway content

Privacy Policy published

Terms of Service published

Cookie banner functional with analytics opt-out working

Company incorporated, domain registered

Quality:

No P0 or P1 bugs open

Error monitoring (Sentry) active with alerts configured

Analytics pipeline verified — all core funnel events firing correctly

Lighthouse score ≥ 90 on Performance, Accessibility, Best Practices

14.3 Launch Sequence
Phase	Description	Duration
Alpha	Internal testing, data pipeline live, full matching engine, rough UI	Weeks 1–6
| Beta | Design-complete UI, full 195 countries, invite-only testing with 20–50 real users, analytics live | Weeks 7–10 |

| Soft Launch | Public URL, no marketing push, organic only — gather real funnel data, fix issues surfaced by real usage | Weeks 11–12 |
| Public Launch | Full marketing push, PR, social, Product Hunt, Hacker News Show HN | Week 13+ |

Alpha Milestones
Data pipeline ingesting all sources successfully

Matching engine passing all unit tests

All 195 countries in data store with complete dimension scores

Quiz flow functional end-to-end (design polish not required)

Globe rendering with correct country states

Beta Milestones
Full design system implemented

Globe animations, card reveals, elimination toasts all functioning

Share URL and PNG export working

All edge cases handled (zero results, low confidence, passport skipped)

Legal pages published

Analytics verified

20–50 beta users have completed full journeys; feedback incorporated

Soft Launch Criteria
All Definition of Done items checked

Lighthouse ≥ 90 across all pages

No P0/P1 bugs

Data pipeline has completed at least 2 full ingestion cycles without anomalies

At least 3 real user journeys reviewed end-to-end by the product owner

Public Launch Assets Required
Product Hunt listing copy and assets

Social announcement copy (X, LinkedIn)

OG image and meta tags on all pages

Demo video or animated GIF for social (showing globe narrowing in real time)

Press kit: logo, screenshots, product description, founder quote

15. V2+ Roadmap
The following features are explicitly deferred from V1 but are planned and should influence V1 architectural decisions where noted.

15.1 V2 Features (3–6 months post-launch)
City-Level Matching
Description: After a country match, the user can drill into specific cities within that country and get a ranked city recommendation based on the same profile — cost differences between capital and secondary cities, neighbourhood character, expat density by area.

Architecture note for V1: The country data schema should include a cities array field (even if empty in V1) so the data model does not need restructuring. The deep dive page should reserve a UI slot for city data with a "Coming soon" state.

LLM-Powered Dynamic Narrative
Description: Replace the V1 template-based narrative system with live LLM-generated "Why You Fit" and "Watch Out For" content, producing genuinely personalised, nuanced explanations per user per country rather than parameterised templates.

Architecture note for V1: The matching engine should return all the raw scoring context (dimension scores, weight values, user profile) in a structured format that can be passed directly to an LLM prompt in V2. Do not discard this context after generating templates.

Implementation approach: Claude API (Anthropic) with a structured prompt template per country result. Output cached per {country × profile_hash} to avoid redundant API calls.

User Accounts & Persistent Profiles
Description: Optional account creation allowing users to save results, return to refine their profile over time, track how country scores change as data updates, and receive alerts when a relevant visa rule changes or cost data shifts significantly.

Architecture note for V1: The share token system should be designed so that a V2 account can "claim" a token — associating an anonymous result with a newly created account without requiring a re-run of the quiz.

AI Conversational Refinement
Description: After seeing results, users can chat with an AI assistant to further refine their matches conversationally. "What if I told you I hate humidity?" / "Which of these is easiest for someone with a criminal record?" / "I have a dog — does that change anything?"

Implementation approach: Context window includes the user's full profile, their current match results, and the country data store summary. The assistant can update weights and filters in real time based on conversation.

User-Contributed Data Layer
Description: Verified expats can submit ratings and qualitative notes for countries they have lived in. Displayed separately from the structured data layer as "From people who've done it." Community ratings for: ease of making friends, actual bureaucracy experience, hidden costs, quality of life reality vs expectation.

Moderation requirement: Human review + automated spam detection before any user content is published.

Comparison Mode
Description: Side-by-side comparison of up to 3 countries across all 10 dimensions, personalised to the user's profile (so the comparison shows how each country performs for them, not in the abstract).

Architecture note for V1: The "Compare" button on match cards should be present in V1 but show a "Coming soon" state, so users understand the intent without it being a dead end.

15.2 V3 Features (6–12 months post-launch)
The Relocation Roadmap
Description: For users who have identified a target country, a personalised step-by-step action plan: visa application timeline, documents required, cost estimates, recommended services (lawyer, housing platform, moving company). Deeply partnered with affiliate services.

Neighbourhood-Level Matching
Description: For major expat cities (Lisbon, Bangkok, Mexico City, Medellín, Tallinn, etc.), a neighbourhood-level recommendation based on lifestyle preferences. Urban vs quiet, family vs young professional, price range, walkability, proximity to coworking.

Tax Optimisation Layer
Description: Given the user's income type, amount, and current country of residence, model the actual tax liability in each matched country. Show net income after tax as a key match output. Integrate with territorial vs worldwide taxation rules, treaty networks, and common regimes (NHR, ITBIS, territorial flat tax).

Legal note: Must be accompanied by prominent disclaimer; not financial advice.

B2B: Corporate Relocation Tool
Description: A white-label or API version of CountryDNA for HR teams and relocation consultants. Input: employee profile. Output: country shortlist with compliance notes, visa difficulty, relocation cost estimate, local employment law summary.

The CountryDNA Score — Public Index
Description: A publicly browsable, annually updated ranking of countries across the same 10 dimensions, published as an editorial product. Similar in concept to the US News rankings but built on CountryDNA's data pipeline and persona-weighted rather than abstract. Generates SEO traffic and press coverage as a recurring annual publication.

Platform Expansion: Other Life-Navigation Tests
Description: The CountryDNA brand and quiz infrastructure extended to adjacent products in the same "where do you belong" category:

CityDNA — which city globally is right for you (not country-level)

NeighbourhoodDNA — hyperlocal, for people already committed to a city

LifeStageDNA — broader life transitions (career, lifestyle, living situation)

These products share the brand, the data infrastructure, and the globe UI component, creating a platform rather than a single tool.

15.3 Monetisation Roadmap
V1 is fully free. Monetisation is introduced in V2+ in a sequence that protects user trust:

Phase	Mechanism	Notes
V2	Affiliate partnerships	Visa service providers, expat health insurance, international moving companies, housing platforms. Commission on referred conversions. Clearly labelled as "partner" links. Never affects match results.
V2	Premium report	One-time purchase (~£9–19) for a full PDF relocation report: all match data, visa pathway detail, cost breakdown, neighbourhood guide, checklist. Essentially the deep dive rendered as a beautiful downloadable document.
V3	Pro subscription (~£8/month)	Saved profiles, result change alerts, AI chat assistant, comparison mode, tax modelling. Designed for serious movers, not casual browsers.
V3	B2B licensing	Per-seat or per-report pricing for corporate relocation teams. Higher ACV, lower volume.
V3+	Sponsored country content	Countries (via tourism boards or investment agencies) can sponsor their own profile page — clearly marked as sponsored, never affecting match scores or rankings. Limited to factual information promotion only.
Non-negotiable monetisation rules:

Match scores and rankings are never influenced by commercial relationships

Affiliate links are always clearly labelled

Sponsored content is visually distinct from editorial content

Free tier is never artificially degraded to push upgrades

User data is never sold to third parties

16. Open Questions & Decisions Log
Items requiring a decision before or during development. Assigned owner and target resolution date to be filled in during project kickoff.

ID	Question	Options	Impact	Status
OQ-01	Product name	CountryDNA (working title) vs alternatives	Brand, domain, trademark	Open
OQ-02	Globe library choice	Globe.gl vs raw Three.js vs Mapbox Globe	Engineering complexity vs visual quality	Open
OQ-03	Numbeo API commercial licence	Required for commercial use — cost TBC	Data pipeline feasibility	Open
OQ-04	Visa pathway data strategy	Manual research + scraping vs licensing from Fragomen/KPMG	V1 data quality for visa content	Open
OQ-05	Auto-advance on single-select	Auto-advance after 400ms vs require explicit Continue button	Quiz UX feel	Open
OQ-06	Results page default view	Globe vs match cards as the default landing state on results	First impression of results experience	Open
OQ-07	Share token storage duration	90 days vs 6 months vs permanent	Infrastructure cost vs user expectation	Open
OQ-08	Cookie/analytics approach	Posthog cloud vs self-hosted	Privacy positioning, cost, GDPR risk	Open
OQ-09	Flat map fallback fidelity	Simple SVG choropleth vs full D3 interactive map	Engineering effort vs accessibility	Open
OQ-10	Light mode	Ship in V1 vs V1.1	Design/engineering effort	Open
OQ-11	Sound design	Include in V1 (opt-in) vs defer	Polish vs scope	Open
OQ-12	Passport question placement	Q4 (as designed) vs Q1 (most impactful filter first)	Quiz feel vs filtering efficiency	Open
OQ-13	Minimum viable visa data for launch	Top 40 destinations vs top 60 vs all 195	Launch readiness vs data quality	Open
OQ-14	Natural Earth vs OpenStreetMap boundary data	Public domain vs attribution required	Legal, visual quality	Open
OQ-15	"Compare" feature state in V1	Hidden vs visible with "coming soon" vs basic V1 version	Expectation setting vs scope creep	Open
OQ-16	Domain strategy	Single domain vs subdomain per product (for platform future)	Long-term platform architecture	Open
OQ-17	Beta recruitment approach	Personal network vs waitlist vs closed community	Beta quality vs speed	Open
OQ-18	Interim results threshold	After Q6 vs after Q8 vs configurable	Engagement optimisation	Open
Appendix A — Question Branching Logic Map
text
Q1 (Life Stage)
│
├── Founder / Freelancer / Remote Worker
│   ├── Q2 Household
│   ├── Q3 Push Factor
│   ├── Q4 Passports
│   ├── Q5 Budget
│   ├── Q6 Language
│   ├── Q7 Healthcare (abbreviated — no chronic condition deep branch)
│   ├── Q8 Non-negotiables (shown if Q3 included political/social)
│   ├── Q9 Social Mode
│   ├── Q10 Pace & Environment
│   ├── Q11 Cultural Appetite
│   ├── Q12 Top Priorities (internet, tax, startup ecosystem weighted higher)
│   └── Q13 Dealbreakers
│
├── Employed / Local Work
│   ├── Q2 Household
│   ├── Q3 Push Factor
│   ├── Q4 Passports
│   ├── Q5 Budget
│   ├── Q6 Language (language hard wall more prominent — local work requires it)
│   ├── Q7 Healthcare
│   ├── Q8 Non-negotiables
│   ├── Q9 Social Mode
│   ├── Q10 Pace & Environment
│   ├── Q11 Cultural Appetite
│   ├── Q12 Top Priorities
│   └── Q13 Dealbreakers
│
├── Retired / Passive Income
│   ├── Q2 Household
│   ├── Q3 Push Factor
│   ├── Q4 Passports
│   ├── Q5 Budget
│   ├── Q6 Language
│   ├── Q7 Healthcare (expanded — chronic condition branch more prominent)
│   │   └── [If chronic condition] Q7b: Specialist type needed (general categories)
│   ├── Q8 Non-negotiables
│   ├── Q9 Social Mode
│   ├── Q10 Pace & Environment (retirement visa option surfaced here)
│   ├── Q11 Cultural Appetite
│   ├── Q12 Top Priorities (healthcare, cost, climate weighted higher)
│   └── Q13 Dealbreakers
│
└── Student / Recent Graduate
    ├── Q2 Household (simplified — solo or partner only)
    ├── Q3 Push Factor
    ├── Q4 Passports
    ├── Q5 Budget (lower range options more prominent)
    ├── Q6 Language
    ├── Q7 Healthcare (brief)
    ├── Q8 Non-negotiables
    ├── Q9 Social Mode
    ├── Q10 Pace & Environment
    ├── Q11 Cultural Appetite
    ├── Q12 Top Priorities (social, cost, culture weighted higher)
    └── Q13 Dealbreakers
Appendix B — Matching Engine Pseudocode
typescript
function runMatchingEngine(profile: UserProfile): MatchResult {

  // ── PHASE 1: HARD FILTER ──────────────────────────────────────────

  const allCountries = countryDataStore.getAll()         // 195 records
  const eliminated: EliminatedCountry[] = []
  const candidates: Country[] = []

  for (const country of allCountries) {

    const failures: EliminationReason[] = []

    // Visa feasibility
    if (profile.passports.length > 0) {
      const hasViablePath = country.visa_pathways.some(
        v => isViableForProfile(v, profile)
      )
      if (!hasViablePath) failures.push('visa_no_pathway')
    }

    // Budget floor (with 15% tolerance)
    const minCost = country.cost_breakdown_template.estimated_monthly_minimum
    if (profile.budget_usd < minCost * 0.85) {
      failures.push('budget_insufficient')
    }

    // Language hard wall
    if (profile.language_flexibility === 'english_only') {
      if (country.raw_data.ef_epi_score < ENGLISH_THRESHOLD) {
        failures.push('language_barrier')
      }
    }

    // Non-negotiables
    for (const requirement of profile.non_negotiables) {
      if (!countryMeetsRequirement(country, requirement)) {
        failures.push(`non_negotiable_${requirement}`)
      }
    }

    // Healthcare critical need
    if (profile.healthcare_need === 'critical') {
      if (country.dimension_scores.healthcare_quality < HEALTHCARE_CRITICAL_THRESHOLD) {
        failures.push('healthcare_insufficient')
      }
    }

    if (failures.length > 0) {
      eliminated.push({ country, reasons: failures })