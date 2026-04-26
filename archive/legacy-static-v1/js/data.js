// CountryDNA — Mock Country Dataset (10 countries)

const LIFE_STAGE_WEIGHTS = {
  founder:       { economic_accessibility:0.10, visa_residency:0.15, safety_stability:0.08, healthcare_quality:0.05, digital_infrastructure:0.15, climate_match:0.08, social_cultural_fit:0.10, values_alignment:0.08, economic_opportunity:0.15, lifestyle_match:0.06 },
  remote_worker: { economic_accessibility:0.15, visa_residency:0.15, safety_stability:0.10, healthcare_quality:0.08, digital_infrastructure:0.18, climate_match:0.08, social_cultural_fit:0.08, values_alignment:0.08, economic_opportunity:0.08, lifestyle_match:0.02 },
  family:        { economic_accessibility:0.15, visa_residency:0.15, safety_stability:0.15, healthcare_quality:0.12, digital_infrastructure:0.08, climate_match:0.10, social_cultural_fit:0.10, values_alignment:0.08, economic_opportunity:0.05, lifestyle_match:0.02 },
  retiree:       { economic_accessibility:0.20, visa_residency:0.15, safety_stability:0.15, healthcare_quality:0.20, digital_infrastructure:0.03, climate_match:0.12, social_cultural_fit:0.08, values_alignment:0.05, economic_opportunity:0.02, lifestyle_match:0.00 },
  optimiser:     { economic_accessibility:0.15, visa_residency:0.10, safety_stability:0.10, healthcare_quality:0.08, digital_infrastructure:0.10, climate_match:0.12, social_cultural_fit:0.12, values_alignment:0.10, economic_opportunity:0.08, lifestyle_match:0.05 },
  values_led:    { economic_accessibility:0.10, visa_residency:0.10, safety_stability:0.10, healthcare_quality:0.08, digital_infrastructure:0.05, climate_match:0.08, social_cultural_fit:0.10, values_alignment:0.25, economic_opportunity:0.05, lifestyle_match:0.09 },
};

const COUNTRIES = [
  {
    code: "PT", name: "Portugal", flag: "🇵🇹", iso_numeric: 620,
    region: "Southern Europe", is_eu: true, is_schengen: true, currency: "EUR", capital: "Lisbon",
    lat: 39.4, lng: -8.2,
    descriptor: "A sun-drenched Atlantic nation where old-world charm meets modern digital infrastructure — Europe's most accessible quality of life.",
    dimension_scores: { economic_accessibility:7.4, visa_residency:8.1, safety_stability:8.6, healthcare_quality:7.2, digital_infrastructure:6.9, climate_match:8.2, social_cultural_fit:7.8, values_alignment:8.3, economic_opportunity:7.1, lifestyle_match:8.5 },
    raw_data: { monthly_cost_usd:2100, ef_epi_score:60.7, gpi_score:1.481, ilga_lgbtq_score:72, rsf_press_freedom:79.4, ookla_mbps:112 },
    visa_pathways: [
      { name:"D8 Digital Nomad Visa", eligible_for:["remote_worker","freelancer","founder"], min_income_usd:3300, duration_months:12, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:8, notes:"NHR tax regime available. Portuguese required for citizenship." },
      { name:"D7 Passive Income Visa", eligible_for:["retiree","investor"], min_income_usd:760, duration_months:24, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:10, notes:"Ideal for retirees with pension or passive income." }
    ],
    cost_breakdown: { rent_1bed_capital:1350, rent_1bed_secondary:820, groceries:280, dining_out_meal:14, transport:42, coworking:180, gym:35, health_insurance:90 },
    visa_access: { us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required' },
    why_fit: {
      founder: ["D8 Digital Nomad visa offers a clear path for self-employed founders","NHR tax regime can dramatically reduce your effective tax rate","Lisbon's tech ecosystem is growing rapidly with EU funding","EU base gives Schengen-wide travel and business access"],
      remote_worker: ["D8 visa is purpose-built for remote employees","Fast fibre in Lisbon and Porto handles video calls seamlessly","Large expat community makes building a social life easy"],
      retiree: ["D7 visa is one of Europe's most accessible retirement pathways","World-class public healthcare with resident access","Mild Atlantic climate without extreme heat or harsh winters"],
      default: ["High safety scores and political stability","EU member with Schengen-area access","Affordable European lifestyle with Mediterranean quality"]
    },
    watch_out: {
      founder: ["Corporate tax rates are standard EU — not the most competitive globally"],
      all: ["Bureaucracy can be slow — plan 2–3× longer than expected","Lisbon's rental market is increasingly competitive"]
    }
  },
  {
    code: "MX", name: "Mexico", flag: "🇲🇽", iso_numeric: 484,
    region: "North America", is_eu: false, is_schengen: false, currency: "MXN", capital: "Mexico City",
    lat: 23.6, lng: -102.5,
    descriptor: "A vast, diverse nation offering world-class culture, cuisine, and increasingly sophisticated expat infrastructure — with the best value in the Americas.",
    dimension_scores: { economic_accessibility:8.9, visa_residency:7.8, safety_stability:5.2, healthcare_quality:6.4, digital_infrastructure:6.1, climate_match:7.8, social_cultural_fit:7.2, values_alignment:6.1, economic_opportunity:7.4, lifestyle_match:8.2 },
    raw_data: { monthly_cost_usd:1600, ef_epi_score:57.8, gpi_score:2.521, ilga_lgbtq_score:55, rsf_press_freedom:47.1, ookla_mbps:71 },
    visa_pathways: [
      { name:"Temporary Resident Visa (Rentista)", eligible_for:["retiree","remote_worker","investor"], min_income_usd:2600, duration_months:12, renewable:true, leads_to_residency:true, residency_years:4, difficulty:2, processing_weeks:4, notes:"Converts to permanent residency after 4 years. No Mexico work authorization." },
      { name:"Temporary Resident (Employee)", eligible_for:["employed"], min_income_usd:0, duration_months:12, renewable:true, leads_to_residency:true, residency_years:4, difficulty:3, processing_weeks:6, notes:"Requires employer sponsorship in Mexico." }
    ],
    cost_breakdown: { rent_1bed_capital:900, rent_1bed_secondary:550, groceries:200, dining_out_meal:8, transport:30, coworking:120, gym:25, health_insurance:70 },
    visa_access: { us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'free' },
    why_fit: {
      founder: ["Mexico City's startup scene is one of Latin America's most vibrant","Cost of living allows runway to stretch significantly further","Large English-speaking professional community in CDMX"],
      remote_worker: ["Rentista visa accessible with proof of remote income","Time zones align with US East and Central clients","World-class food, culture, and climate in major cities"],
      retiree: ["Cost of living dramatically lower than the US or Europe","Lake Chapala and San Miguel have established retiree communities","US-standard private healthcare at a fraction of the cost"],
      default: ["Exceptional value for money","Rich cultural scene and cuisine","Accessible from North America"]
    },
    watch_out: {
      all: ["Safety varies dramatically by city — research neighbourhoods carefully","Bureaucratic processes can be unpredictable"],
      retiree: ["Healthcare quality varies significantly outside major cities"],
      founder: ["Press freedom and rule of law are weaker than OECD peers"]
    }
  },
  {
    code: "CR", name: "Costa Rica", flag: "🇨🇷", iso_numeric: 188,
    region: "Central America", is_eu: false, is_schengen: false, currency: "CRC", capital: "San José",
    lat: 9.7, lng: -83.8,
    descriptor: "The gold standard of Central American stability — a democracy with no standing army, stunning biodiversity, and a growing digital nomad infrastructure.",
    dimension_scores: { economic_accessibility:7.1, visa_residency:7.5, safety_stability:7.2, healthcare_quality:7.4, digital_infrastructure:6.3, climate_match:7.6, social_cultural_fit:6.8, values_alignment:7.8, economic_opportunity:6.2, lifestyle_match:8.8 },
    raw_data: { monthly_cost_usd:2000, ef_epi_score:53.4, gpi_score:1.756, ilga_lgbtq_score:71, rsf_press_freedom:71.2, ookla_mbps:60 },
    visa_pathways: [
      { name:"Rentista Visa", eligible_for:["retiree","remote_worker"], min_income_usd:2500, duration_months:24, renewable:true, leads_to_residency:true, residency_years:3, difficulty:2, processing_weeks:12, notes:"One of the fastest paths to residency in the region." },
      { name:"Digital Nomad Visa", eligible_for:["remote_worker","freelancer"], min_income_usd:3000, duration_months:12, renewable:true, leads_to_residency:false, residency_years:null, difficulty:2, processing_weeks:8, notes:"No local taxes on foreign income." }
    ],
    cost_breakdown: { rent_1bed_capital:900, rent_1bed_secondary:650, groceries:300, dining_out_meal:10, transport:50, coworking:150, gym:40, health_insurance:80 },
    visa_access: { us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'free' },
    why_fit: {
      all: ["Ranked among the happiest countries globally — consistently","Universal public healthcare accessible to residents","No standing army since 1948 — constitutional stability"],
      remote_worker: ["Digital nomad visa makes legal status straightforward","Nature access unmatched — rainforest and ocean within an hour of most cities"],
      retiree: ["Pensionado program is one of the world's most generous","Large established English-speaking retirement communities","Warm climate without hurricane risk (Pacific side)"],
      default: ["Political stability rare in the region","Outstanding natural environment","Universal healthcare for residents"]
    },
    watch_out: {
      all: ["English penetration outside tourist areas is lower than expected","Roads and infrastructure can be inconsistent","Internet reliability patchy in rural or beach areas"],
      founder: ["Small startup ecosystem — limited local VC funding"]
    }
  },
  {
    code: "CH", name: "Switzerland", flag: "🇨🇭", iso_numeric: 756,
    region: "Western Europe", is_eu: false, is_schengen: true, currency: "CHF", capital: "Bern",
    lat: 46.8, lng: 8.2,
    descriptor: "The world's most stable and prosperous small nation — impeccable infrastructure, exceptional healthcare, and centuries of political neutrality.",
    dimension_scores: { economic_accessibility:4.2, visa_residency:5.8, safety_stability:9.4, healthcare_quality:9.6, digital_infrastructure:9.1, climate_match:7.2, social_cultural_fit:7.4, values_alignment:9.2, economic_opportunity:9.3, lifestyle_match:8.9 },
    raw_data: { monthly_cost_usd:5800, ef_epi_score:68.1, gpi_score:1.376, ilga_lgbtq_score:84, rsf_press_freedom:84.3, ookla_mbps:186 },
    visa_pathways: [
      { name:"EU/EFTA Work Permit B", eligible_for:["employed"], min_income_usd:0, duration_months:12, renewable:true, leads_to_residency:true, residency_years:5, difficulty:4, processing_weeks:8, notes:"Requires job offer. EU/EFTA citizens have simplified access." },
      { name:"Self-Employed / Freelance Permit", eligible_for:["freelancer","founder"], min_income_usd:8000, duration_months:12, renewable:true, leads_to_residency:true, residency_years:5, difficulty:5, processing_weeks:16, notes:"Strict income and self-sufficiency requirements apply." }
    ],
    cost_breakdown: { rent_1bed_capital:2900, rent_1bed_secondary:2100, groceries:700, dining_out_meal:35, transport:90, coworking:400, gym:90, health_insurance:400 },
    visa_access: { us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'required', other:'restricted' },
    why_fit: {
      founder: ["Access to Europe's largest VC and private equity networks","Globally trusted jurisdiction for company formation","Exceptional talent pool from world-class universities"],
      remote_worker: ["Highest-quality infrastructure in Europe — zero downtime","Central European timezone suits global remote work perfectly"],
      retiree: ["World's best healthcare by most international rankings","Exceptional safety, political stability, and rule of law","Breathtaking Alpine landscape and outdoor lifestyle"],
      default: ["World-class quality of life in every measurable dimension","Schengen access despite non-EU status"]
    },
    watch_out: {
      all: ["Cost of living is among the highest in the world — budget must be substantial","Immigration is competitive — permit approval is not guaranteed","Swiss culture can feel reserved and slow to integrate into"]
    }
  },
  {
    code: "TH", name: "Thailand", flag: "🇹🇭", iso_numeric: 764,
    region: "Southeast Asia", is_eu: false, is_schengen: false, currency: "THB", capital: "Bangkok",
    lat: 15.9, lng: 100.9,
    descriptor: "Asia's premier expat destination — exceptional value, world-class food, a vast digital nomad infrastructure, and a warm culture that welcomes long-term visitors.",
    dimension_scores: { economic_accessibility:9.2, visa_residency:6.4, safety_stability:6.8, healthcare_quality:7.6, digital_infrastructure:7.2, climate_match:6.4, social_cultural_fit:7.4, values_alignment:5.2, economic_opportunity:5.8, lifestyle_match:9.1 },
    raw_data: { monthly_cost_usd:1400, ef_epi_score:56.2, gpi_score:2.054, ilga_lgbtq_score:44, rsf_press_freedom:41.8, ookla_mbps:98 },
    visa_pathways: [
      { name:"Long-Term Resident (LTR) Visa", eligible_for:["remote_worker","retiree","investor"], min_income_usd:4000, duration_months:120, renewable:true, leads_to_residency:false, residency_years:null, difficulty:3, processing_weeks:6, notes:"10-year visa with work permit for remote workers. High income required." },
      { name:"Thailand Elite Visa", eligible_for:["retiree","investor","remote_worker"], min_income_usd:0, duration_months:60, renewable:true, leads_to_residency:false, residency_years:null, difficulty:1, processing_weeks:4, notes:"Purchase-based from $15,000. No income requirement — just the upfront cost." }
    ],
    cost_breakdown: { rent_1bed_capital:650, rent_1bed_secondary:380, groceries:200, dining_out_meal:5, transport:30, coworking:100, gym:30, health_insurance:60 },
    visa_access: { us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'voa' },
    why_fit: {
      remote_worker: ["Chiang Mai is arguably the world's most developed digital nomad city","Live comfortably for under $2,000/month — budget stretches further here than anywhere","World-class coworking infrastructure and a thriving nomad community"],
      retiree: ["Retirement visa accessible and well-understood process","Private hospitals are among Asia's best at 20–30% of Western costs","Warm climate, exceptional food culture, genuine warmth from locals"],
      default: ["Exceptional value for money","World-class cuisine and lifestyle","Strong expat and nomad infrastructure"]
    },
    watch_out: {
      all: ["No formal path to permanent residency — visa renewals are perpetual","High humidity and heat may not suit everyone year-round","Political instability remains a background concern"],
      values: ["LGBTQ+ legal rights remain limited despite cultural openness"]
    }
  },
  {
    code: "AE", name: "UAE", flag: "🇦🇪", iso_numeric: 784,
    region: "Middle East", is_eu: false, is_schengen: false, currency: "AED", capital: "Abu Dhabi",
    lat: 23.4, lng: 53.8,
    descriptor: "The world's most ambitious modern city-state — zero income tax, exceptional infrastructure, and a cosmopolitan expat majority that has made it a global hub.",
    dimension_scores: { economic_accessibility:5.8, visa_residency:7.6, safety_stability:8.2, healthcare_quality:8.4, digital_infrastructure:9.3, climate_match:5.4, social_cultural_fit:6.6, values_alignment:4.8, economic_opportunity:9.4, lifestyle_match:7.2 },
    raw_data: { monthly_cost_usd:3800, ef_epi_score:72.3, gpi_score:1.912, ilga_lgbtq_score:8, rsf_press_freedom:26.2, ookla_mbps:228 },
    visa_pathways: [
      { name:"Golden Visa (10-Year)", eligible_for:["founder","investor","professional"], min_income_usd:0, duration_months:120, renewable:true, leads_to_residency:true, residency_years:0, difficulty:2, processing_weeks:4, notes:"10-year residency for qualifying professionals and entrepreneurs. Self-sponsored." },
      { name:"Freelancer / Remote Worker Visa", eligible_for:["freelancer","remote_worker"], min_income_usd:4500, duration_months:12, renewable:true, leads_to_residency:false, residency_years:null, difficulty:2, processing_weeks:2, notes:"Dubai's purpose-built remote work visa. Free zone setup often required." }
    ],
    cost_breakdown: { rent_1bed_capital:1800, rent_1bed_secondary:1400, groceries:350, dining_out_meal:20, transport:80, coworking:300, gym:80, health_insurance:200 },
    visa_access: { us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'voa' },
    why_fit: {
      founder: ["Zero personal income tax and zero capital gains tax","10-year Golden Visa provides long-term stability for founders","World's fastest internet speeds and best-in-class infrastructure"],
      remote_worker: ["Freelancer visa makes legal residency accessible with income proof","Massive expat professional community — networking is built-in","Strategic timezone between Europe and Asia"],
      retiree: ["Outstanding private healthcare at world-class facilities","Zero income tax means pension and investment income go further"],
      default: ["Zero income tax","World-class infrastructure and connectivity","Strategic global hub"]
    },
    watch_out: {
      all: ["Extreme heat (40°C+) from May to September severely limits outdoor life","Cost of living is high — especially housing in Dubai and Abu Dhabi"],
      values: ["LGBTQ+ relationships are illegal and actively policed","Press freedom is heavily restricted — limited independent media"]
    }
  },
  {
    code: "JP", name: "Japan", flag: "🇯🇵", iso_numeric: 392,
    region: "East Asia", is_eu: false, is_schengen: false, currency: "JPY", capital: "Tokyo",
    lat: 36.2, lng: 138.3,
    descriptor: "A uniquely harmonious society — the world's safest major country, with impeccable infrastructure, extraordinary food culture, and a slowly opening immigration landscape.",
    dimension_scores: { economic_accessibility:6.8, visa_residency:5.6, safety_stability:9.8, healthcare_quality:9.2, digital_infrastructure:8.8, climate_match:6.8, social_cultural_fit:5.8, values_alignment:7.2, economic_opportunity:7.6, lifestyle_match:8.4 },
    raw_data: { monthly_cost_usd:2600, ef_epi_score:54.2, gpi_score:1.336, ilga_lgbtq_score:57, rsf_press_freedom:70.6, ookla_mbps:174 },
    visa_pathways: [
      { name:"Highly Skilled Professional (HSP)", eligible_for:["professional","founder","researcher"], min_income_usd:3500, duration_months:60, renewable:true, leads_to_residency:true, residency_years:1, difficulty:3, processing_weeks:10, notes:"Points-based system. PR possible in as little as 1 year for top scorers." },
      { name:"Digital Nomad Visa", eligible_for:["remote_worker","freelancer"], min_income_usd:8300, duration_months:6, renewable:false, leads_to_residency:false, residency_years:null, difficulty:2, processing_weeks:4, notes:"2024 program. High income threshold. No extensions currently available." }
    ],
    cost_breakdown: { rent_1bed_capital:1200, rent_1bed_secondary:700, groceries:350, dining_out_meal:12, transport:80, coworking:200, gym:50, health_insurance:100 },
    visa_access: { us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required' },
    why_fit: {
      all: ["Consistently ranked the world's safest major country — virtually no violent crime","Universal health coverage extends to residents with exceptional quality"],
      founder: ["Tokyo increasingly positioning itself as an Asian startup hub","HSP visa can lead to permanent residency in just 1 year"],
      retiree: ["World-class longevity — Japan leads in quality of life for older adults","Healthcare system with high English proficiency in major cities"],
      default: ["World's safest major country","Impeccable infrastructure and public transit","Exceptional food culture and quality of life"]
    },
    watch_out: {
      all: ["Japanese language is essential beyond tourist contexts — English penetration lower than expected","Social integration takes time — Japan rewards long-term commitment"],
      remote_worker: ["Digital nomad visa has a high income requirement and no renewal path"],
      all2: ["Earthquake and natural disaster risk is real and should be factored in"]
    }
  },
  {
    code: "ES", name: "Spain", flag: "🇪🇸", iso_numeric: 724,
    region: "Southern Europe", is_eu: true, is_schengen: true, currency: "EUR", capital: "Madrid",
    lat: 40.4, lng: -3.7,
    descriptor: "Europe's great quality-of-life bargain — exceptional food, culture, climate, and a pace of life that makes the rest of Europe feel unnecessarily rushed.",
    dimension_scores: { economic_accessibility:7.2, visa_residency:7.6, safety_stability:8.2, healthcare_quality:8.4, digital_infrastructure:7.8, climate_match:8.6, social_cultural_fit:7.6, values_alignment:8.6, economic_opportunity:6.8, lifestyle_match:9.2 },
    raw_data: { monthly_cost_usd:2300, ef_epi_score:58.4, gpi_score:1.621, ilga_lgbtq_score:78, rsf_press_freedom:68.4, ookla_mbps:149 },
    visa_pathways: [
      { name:"Digital Nomad Visa (Beckham)", eligible_for:["remote_worker","freelancer","founder"], min_income_usd:2520, duration_months:12, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:20, notes:"Beckham Law: flat 24% income tax for qualifying remote workers." },
      { name:"Non-Lucrative Residence Visa", eligible_for:["retiree","investor"], min_income_usd:2400, duration_months:12, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:12, notes:"No work authorization. Ideal for retirees with passive income." }
    ],
    cost_breakdown: { rent_1bed_capital:1200, rent_1bed_secondary:750, groceries:250, dining_out_meal:12, transport:40, coworking:160, gym:30, health_insurance:80 },
    visa_access: { us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required' },
    why_fit: {
      remote_worker: ["Digital nomad visa accessible with relatively low income thresholds","Beckham Law caps income tax at 24% — a meaningful saving for high earners"],
      retiree: ["World's longest life expectancy — the Mediterranean lifestyle clearly works","Outstanding public healthcare system open to residents","Warm climate across most of the country with genuine regional variety"],
      founder: ["Barcelona and Madrid host thriving, internationally-connected startup ecosystems","Beckham Law tax regime attractive for founders relocating from high-tax countries"],
      default: ["EU + Schengen access","Exceptional Mediterranean lifestyle","World-class food and culture"]
    },
    watch_out: {
      all: ["Bureaucracy is a known pain point — getting residency paperwork processed takes patience","Spanish integration is expected in daily life outside tourist areas"],
      founder: ["Startup ecosystem lags behind Portugal and Estonia in founder incentives"]
    }
  },
  {
    code: "EE", name: "Estonia", flag: "🇪🇪", iso_numeric: 233,
    region: "Northern Europe", is_eu: true, is_schengen: true, currency: "EUR", capital: "Tallinn",
    lat: 58.6, lng: 25.0,
    descriptor: "The world's most digitally advanced nation — e-Residency, flat 20% tax, and a government that operates almost entirely online, built for the global founder.",
    dimension_scores: { economic_accessibility:7.8, visa_residency:9.2, safety_stability:8.6, healthcare_quality:7.4, digital_infrastructure:9.4, climate_match:4.8, social_cultural_fit:7.2, values_alignment:8.8, economic_opportunity:8.6, lifestyle_match:6.8 },
    raw_data: { monthly_cost_usd:1900, ef_epi_score:66.1, gpi_score:1.742, ilga_lgbtq_score:76, rsf_press_freedom:82.4, ookla_mbps:142 },
    visa_pathways: [
      { name:"Digital Nomad Visa", eligible_for:["remote_worker","freelancer"], min_income_usd:4500, duration_months:12, renewable:false, leads_to_residency:false, residency_years:null, difficulty:2, processing_weeks:6, notes:"One of Europe's pioneering nomad visas. EU access via Schengen." },
      { name:"Startup Visa", eligible_for:["founder"], min_income_usd:0, duration_months:18, renewable:true, leads_to_residency:true, residency_years:5, difficulty:3, processing_weeks:8, notes:"Evaluated by Startup Estonia committee. Business plan and team required." }
    ],
    cost_breakdown: { rent_1bed_capital:800, rent_1bed_secondary:500, groceries:250, dining_out_meal:12, transport:30, coworking:140, gym:30, health_insurance:50 },
    visa_access: { us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required' },
    why_fit: {
      founder: ["e-Residency allows running an EU company 100% remotely from anywhere","Startup visa specifically designed for global founders relocating to build","Flat 20% corporate tax — zero tax on reinvested profits","Highest startup-per-capita rate in Europe"],
      remote_worker: ["Digital nomad visa is purpose-built and well-administered","EU + Schengen access — travel freely across 27 countries","Highly English-speaking — nearly everyone under 40 is fluent"],
      all: ["Complete digital governance — everything online from tax returns to company registration"],
      default: ["EU + Schengen access","World-leading digital infrastructure","Founder-friendly tax and legal framework"]
    },
    watch_out: {
      all: ["Cold, dark winters — only 6 hours of daylight in December","Small country — limited local market for consumer-facing businesses"],
      retiree: ["Healthcare system, while solid, is less developed than Western European peers"]
    }
  },
  {
    code: "SG", name: "Singapore", flag: "🇸🇬", iso_numeric: 702,
    region: "Southeast Asia", is_eu: false, is_schengen: false, currency: "SGD", capital: "Singapore",
    lat: 1.4, lng: 103.8,
    descriptor: "Asia's most efficient and prosperous city-state — impeccable rule of law, globally connected, and a quality of life that consistently tops regional rankings.",
    dimension_scores: { economic_accessibility:4.6, visa_residency:6.2, safety_stability:9.6, healthcare_quality:9.4, digital_infrastructure:9.8, climate_match:6.2, social_cultural_fit:8.2, values_alignment:6.4, economic_opportunity:9.8, lifestyle_match:7.8 },
    raw_data: { monthly_cost_usd:4500, ef_epi_score:74.8, gpi_score:1.371, ilga_lgbtq_score:48, rsf_press_freedom:59.4, ookla_mbps:242 },
    visa_pathways: [
      { name:"Employment Pass", eligible_for:["professional","employed"], min_income_usd:5000, duration_months:24, renewable:true, leads_to_residency:true, residency_years:2, difficulty:3, processing_weeks:4, notes:"Minimum salary threshold rising. Employer-sponsored. Check current requirements." },
      { name:"Tech.Pass", eligible_for:["founder","professional"], min_income_usd:20000, duration_months:24, renewable:true, leads_to_residency:true, residency_years:null, difficulty:4, processing_weeks:8, notes:"For established tech leaders. High income and experience requirements." }
    ],
    cost_breakdown: { rent_1bed_capital:2400, rent_1bed_secondary:1800, groceries:450, dining_out_meal:8, transport:80, coworking:350, gym:80, health_insurance:150 },
    visa_access: { us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'restricted' },
    why_fit: {
      founder: ["Top-ranked globally for ease of doing business and rule of law","Access to Southeast Asian markets from a world-class hub","Tech.Pass designed specifically for senior tech founders and leaders"],
      professional: ["Employment Pass accessible for high-earning professionals","Zero capital gains tax and low corporate tax rates","World's best airport and connectivity for Asia-Pacific operations"],
      retiree: ["World-class healthcare at some of Asia's best hospitals","Virtually zero crime — one of the safest cities on earth"],
      default: ["World's best digital infrastructure","Top global ranking for ease of doing business","Exceptional safety and rule of law"]
    },
    watch_out: {
      all: ["Cost of living rivals London or New York — especially housing","Visa access is competitive and strictly income-dependent"],
      values: ["Limited LGBTQ+ legal protections — improving but still restricted","Press freedom below Western standards"],
      all2: ["Small city-state — 'island fever' is real if you need space and nature"]
    }
  }
];

const QUESTIONS = [
  {
    id: "life_stage", step: 1, type: "single",
    question: "What best describes where you are right now?",
    subtitle: "This shapes how we weigh what matters most for you.",
    options: [
      { value: "founder", label: "Founder / Entrepreneur", sub: "Building something of my own" },
      { value: "remote_worker", label: "Remote Worker", sub: "Employed by a company outside where I live" },
      { value: "freelancer", label: "Freelancer / Consultant", sub: "Self-employed with multiple clients" },
      { value: "family", label: "Relocating with Family", sub: "Partner and/or children are part of this move" },
      { value: "retiree", label: "Semi-Retired / Retired", sub: "Living primarily on savings or pension" },
      { value: "optimiser", label: "Lifestyle Optimiser", sub: "Seeking the highest quality of life for my budget" },
      { value: "values_led", label: "Values-Led Mover", sub: "The country's values and culture are my first filter" },
    ]
  },
  {
    id: "household", step: 2, type: "single",
    question: "Who's coming with you?",
    subtitle: "If you're planning a future move, imagine who'd be alongside you.",
    options: [
      { value: "solo", label: "Just me", sub: "Single, or partner stays behind" },
      { value: "couple", label: "Me and my partner", sub: "No children involved in the move" },
      { value: "family_young", label: "Family with young children", sub: "Under 12" },
      { value: "family_teen", label: "Family with teenagers", sub: "12–18 years old" },
      { value: "family_adult", label: "Adult children", sub: "Over 18 — independent but considering same location" },
    ]
  },
  {
    id: "push_factors", step: 3, type: "multi",
    question: "What's driving the idea of moving?",
    subtitle: "Select all that apply — we use this to weigh what matters most.",
    options: [
      { value: "tax", label: "Tax optimisation", sub: "Reduce my personal or corporate tax burden" },
      { value: "cost", label: "Lower cost of living", sub: "My money goes further elsewhere" },
      { value: "climate", label: "Better climate", sub: "More sun, warmth, or seasons I prefer" },
      { value: "adventure", label: "Adventure & new experiences", sub: "I want a fundamentally different life" },
      { value: "safety", label: "Safety or stability", sub: "Political or personal safety concerns" },
      { value: "healthcare", label: "Healthcare access", sub: "Better quality or affordability" },
      { value: "career", label: "Career or business opportunity", sub: "Access to new markets or talent" },
      { value: "values", label: "Alignment with my values", sub: "Rights, freedoms, environment, culture" },
    ]
  },
  {
    id: "passports", step: 4, type: "single",
    question: "Which passport do you primarily travel on?",
    subtitle: "This determines your visa access to different countries.",
    options: [
      { value: "us", label: "🇺🇸 United States" },
      { value: "uk", label: "🇬🇧 United Kingdom" },
      { value: "eu", label: "🇪🇺 EU Member State", sub: "Germany, France, Italy, etc." },
      { value: "ca", label: "🇨🇦 Canada" },
      { value: "au_nz", label: "🇦🇺 Australia / New Zealand" },
      { value: "other_strong", label: "Other strong passport", sub: "Singapore, Japan, South Korea, etc." },
      { value: "other", label: "Other", sub: "I'll check visa requirements manually" },
    ]
  },
  {
    id: "budget", step: 5, type: "single",
    question: "What's your realistic monthly budget for living expenses?",
    subtitle: "Include rent, food, transport, lifestyle — everything except big one-off costs.",
    options: [
      { value: 1500, label: "Under $1,500 / month", sub: "Budget-conscious, value-first" },
      { value: 2500, label: "$1,500 – $2,500 / month", sub: "Comfortable without splurging" },
      { value: 3500, label: "$2,500 – $3,500 / month", sub: "Mid-range lifestyle" },
      { value: 5000, label: "$3,500 – $5,000 / month", sub: "Comfortable with some luxuries" },
      { value: 8000, label: "$5,000 – $8,000 / month", sub: "High standard of living" },
      { value: 15000, label: "$8,000+ / month", sub: "No meaningful budget constraint" },
    ]
  },
  {
    id: "language", step: 6, type: "single",
    question: "How do you feel about living in a language you don't speak?",
    subtitle: "Be honest — daily life in a non-English country can be challenging.",
    options: [
      { value: "english_only", label: "English only", sub: "I need to function in English day-to-day" },
      { value: "learning_ok", label: "Open to learning", sub: "I'll pick up the local language over time" },
      { value: "speak_spanish", label: "I speak Spanish", sub: "Opens up much of Latin America and Spain" },
      { value: "speak_french", label: "I speak French", sub: "France, Belgium, West Africa, and more" },
      { value: "speak_other", label: "I speak another language", sub: "I'll note which in my profile" },
      { value: "multilingual", label: "Multilingual", sub: "Language is genuinely not a barrier for me" },
    ]
  },
  {
    id: "healthcare", step: 7, type: "single",
    question: "How important is healthcare quality and access?",
    subtitle: "Consider any ongoing needs, medications, or specialist requirements.",
    options: [
      { value: "basic", label: "Basic access is fine", sub: "I'm healthy — just need emergency cover" },
      { value: "good_general", label: "Good general healthcare", sub: "I want a solid system I can rely on" },
      { value: "high_quality", label: "High quality is important", sub: "I want access to specialists and modern facilities" },
      { value: "critical", label: "Critical dependency", sub: "I have ongoing conditions that need consistent care" },
    ]
  },
  {
    id: "non_negotiables", step: 8, type: "multi",
    question: "Are there any deal-breakers for you?",
    subtitle: "Countries failing these will be eliminated entirely — not just penalised.",
    options: [
      { value: "lgbtq", label: "LGBTQ+ safety and rights", sub: "Must be safe and legally protected" },
      { value: "press_freedom", label: "Press freedom", sub: "Free and independent media is important to me" },
      { value: "democracy", label: "Democratic governance", sub: "Free and fair elections, separation of powers" },
      { value: "gender_equality", label: "Gender equality", sub: "Women's rights and social equality" },
      { value: "english_access", label: "English widely spoken", sub: "I truly cannot function without English" },
      { value: "none", label: "None of the above", sub: "I'm open-minded — show me everything" },
    ]
  },
  {
    id: "social_mode", step: 9, type: "single",
    question: "How do you like to live socially?",
    subtitle: "Not how you are now — how you'd ideally want to be.",
    options: [
      { value: "expat_community", label: "Expat community", sub: "I want to find my tribe quickly — other internationals" },
      { value: "local_integration", label: "Local integration", sub: "I want to genuinely embed in local culture over time" },
      { value: "mix", label: "A mix of both", sub: "International friends, local experiences" },
      { value: "independent", label: "Independent / introverted", sub: "I don't need a built-in social scene" },
    ]
  },
  {
    id: "environment", step: 10, type: "single",
    question: "What environment feels like home to you?",
    subtitle: "Think about where you feel most alive and at ease.",
    options: [
      { value: "beach_coast", label: "Beach / Coastal", sub: "Ocean access, sea air, water lifestyle" },
      { value: "mountain_nature", label: "Mountain / Nature", sub: "Altitude, hiking, outdoor adventure" },
      { value: "city_urban", label: "City / Urban", sub: "Density, culture, infrastructure, convenience" },
      { value: "countryside", label: "Countryside / Rural", sub: "Space, quiet, land, a slower pace" },
      { value: "mix_flexible", label: "I want it all / flexible", sub: "Access to multiple environments" },
    ]
  },
  {
    id: "cultural_appetite", step: 11, type: "single",
    question: "How different do you want your new home to be?",
    subtitle: "Cultural distance is exciting for some, challenging for others.",
    options: [
      { value: "familiar", label: "Broadly familiar", sub: "Similar culture, just a different country — Western European, Anglophone" },
      { value: "somewhat_different", label: "Somewhat different", sub: "New culture, manageable adjustment — Southern Europe, Latin America" },
      { value: "very_different", label: "Very different", sub: "Genuinely new worldview — Southeast Asia, Japan, Middle East" },
      { value: "radically_different", label: "Radically different", sub: "I want to be genuinely challenged and transformed" },
    ]
  },
  {
    id: "priorities", step: 12, type: "multi",
    question: "What matters most to you in a new home?",
    subtitle: "Pick up to 3 — these boost specific dimensions of our matching.",
    maxSelect: 3,
    options: [
      { value: "low_tax", label: "Low taxes", dim: "economic_opportunity" },
      { value: "safety", label: "Safety first", dim: "safety_stability" },
      { value: "nature", label: "Nature & outdoors", dim: "lifestyle_match" },
      { value: "internet", label: "Fast, reliable internet", dim: "digital_infrastructure" },
      { value: "healthcare_q", label: "Healthcare quality", dim: "healthcare_quality" },
      { value: "budget_stretch", label: "Budget goes far", dim: "economic_accessibility" },
      { value: "easy_visa", label: "Easy residency path", dim: "visa_residency" },
      { value: "culture", label: "Culture & arts", dim: "social_cultural_fit" },
      { value: "values_align", label: "Shared values", dim: "values_alignment" },
      { value: "opportunity", label: "Business opportunity", dim: "economic_opportunity" },
    ]
  },
  {
    id: "dealbreakers", step: 13, type: "multi",
    question: "Want to rule anything out?",
    subtitle: "Optional — these act as soft penalties. Select any that genuinely put you off.",
    optional: true,
    options: [
      { value: "extreme_heat", label: "Extreme heat (40°C+)" },
      { value: "extreme_cold", label: "Extreme cold / harsh winters" },
      { value: "high_humidity", label: "High humidity year-round" },
      { value: "air_pollution", label: "High air pollution" },
      { value: "seismic_risk", label: "High seismic / natural disaster risk" },
      { value: "very_high_cost", label: "Very high cost of living" },
      { value: "authoritarian", label: "Authoritarian government" },
      { value: "limited_english", label: "Very low English penetration" },
      { value: "no_internet", label: "Limited internet infrastructure" },
    ]
  },
];

// Export to window for access across scripts
Object.assign(window, { COUNTRIES, QUESTIONS, LIFE_STAGE_WEIGHTS });
