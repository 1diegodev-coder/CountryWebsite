# Role & Context
You are an expert full-stack engineer and UI/UX designer. Your task is to build a fully functional, ambitious V1 MVP of "CountryDNA", a premium web application that matches users to their ideal countries for relocation based on an interactive 13-question profiling quiz. The experience must feel like a "premium data product meets editorial travel magazine."

# Tech Stack
- Next.js 15 (App Router)
- React Server Components & Client Components
- Tailwind CSS. Use the following specific Dark mode color palette tokens from the PRD:
  - `bg-primary`: `#0A0E14` (Page background)
  - `bg-surface`: `#13181F` (Cards, panels)
  - `bg-elevated`: `#1C2330` (Hover states, tooltips)
  - `accent-primary`: `#4ADE80` (Top match glow, CTAs, positive indicators)
  - `accent-secondary`: `#60A5FA` (Globe highlight, interactive elements)
  - `accent-warning`: `#FBBF24` ("Watch out for" indicators, partial match)
  - `accent-eliminated`: `#374151` (Eliminated country state)
  - `text-primary`: `#F9FAFB` (Headings, primary body)
  - `text-secondary`: `#9CA3AF` (Supporting text, labels)
  - `text-muted`: `#4B5563` (Timestamps, metadata)
- Framer Motion (for staggered card reveals, page transitions)
- Zustand (for client-side state: quiz progress, user profile, results)
- Globe.gl + Three.js (for the interactive 3D WebGL globe)
- Lucide React (for icons)

# Core User Flow
1. **Landing / Quiz:** An interactive full-screen flow. A rotating 3D globe on the right (or top on mobile) and question cards on the left.
2. **Real-time Updates:** As users answer questions, a live counter ("🌍 142 left") decrements. The globe updates dynamically, dimming eliminated countries.
3. **Results Page:** A three-panel desktop layout (stacked on mobile):
   - **Globe Panel:** Heatmap showing match strength (Green = Top, Amber = Mid, Grey = Eliminated).
   - **Match Cards:** Staggered reveal of the top matching countries, showing Match %, "Why you fit", "Watch out for", and budget realities.
   - **Side Panel:** Toggles for "Elimination Log" (why countries were removed) and "What If Sliders" (to relax constraints in real-time).

# Matching Engine Logic
The engine runs locally (client-side for MVP) and consists of 3 phases:
1. **Hard Filters:** Remove countries failing binary checks:
   - Budget: If country's monthly cost > user budget * 1.15
   - Visa: If no viable pathway for user's passport
   - Language: If user wants "English only" and country EF EPI is low
   - Non-negotiables (e.g., LGBTQ+ rights, Healthcare)
2. **Weighted Scoring:** Score remaining candidates out of 100% across 10 dimensions (Economic, Visa, Safety, Healthcare, Digital, Climate, Social, Values, Opportunity, Lifestyle).
   - Base weights depend on user's Life Stage (e.g., Retirees weigh Healthcare higher, Founders weigh Opportunity higher).
   - Weights are dynamically adjusted by user's "Top Priorities".
3. **Narratives:** Use simple conditional templates to generate 3-6 "Why You Fit" bullets (from high scores) and 2-4 "Watch Out For" bullets (from low scores on highly weighted dimensions).

# Data Model Requirement
Since we don't have a backend yet, please create a robust mock JSON dataset with 10 diverse countries (e.g., Portugal, Mexico, Costa Rica, Switzerland, Thailand, UAE, Japan, Spain, Estonia, Singapore) containing:
- Basic info (name, code, region)
- 10 dimension scores (0-10)
- Hard filter data (cost of living, language proficiency, safety indices)
- A mocked visa pathway per country.

# Deliverables
Please write the complete code for this MVP in a single response. Ensure you include:
1. **`store/useQuizStore.ts`**: Zustand store for answers, current step, and matching logic.
2. **`data/mockCountries.ts`**: The dataset of 10 fully populated countries.
3. **`lib/matchingEngine.ts`**: The logic to filter, score, and rank countries.
4. **`components/GlobeViewer.tsx`**: A React wrapper for Globe.gl highlighting countries based on their current match state.
5. **`app/page.tsx`**: The main quiz flow wrapper handling question transitions and the layout.
6. **`components/ResultsView.tsx`**: The results dashboard with Match Cards and the Elimination Log.

# Design & UX Mandates
- **Polish:** No generic Bootstrap looks. Use clean, modern typography (Inter/JetBrains Mono), subtle borders, deep dark backgrounds (`bg-[#0A0E14]`), and soft glows (`shadow-[0_0_15px_rgba(74,222,128,0.2)]`).
- **Animations:** Use Framer Motion for buttery-smooth question transitions and the staggered reveal of result cards.
- **Microcopy:** Keep the tone intelligent, warm, and precise. Show toasts like "🌍 Just removed 18 countries (Visa restrictions)" when filters trigger.

*Please provide the code ready to copy-paste into a new Next.js project.*
