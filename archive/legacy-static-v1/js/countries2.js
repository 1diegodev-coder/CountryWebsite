// CountryDNA — Extended Country Dataset (30 additional countries)
// Appended to the COUNTRIES array from data.js

COUNTRIES.push(

  // ── EUROPE ──────────────────────────────────────────────────────────────────

  {
    code:"DE", name:"Germany", flag:"🇩🇪", iso_numeric:276,
    region:"Western Europe", is_eu:true, is_schengen:true, currency:"EUR", capital:"Berlin",
    lat:51.2, lng:10.4,
    descriptor:"Europe's economic engine — rigorous institutions, world-class infrastructure, and a culture that deeply values order, craft, and social fairness.",
    dimension_scores:{economic_accessibility:6.2, visa_residency:7.0, safety_stability:8.4, healthcare_quality:9.0, digital_infrastructure:8.8, climate_match:6.0, social_cultural_fit:7.2, values_alignment:9.0, economic_opportunity:8.8, lifestyle_match:7.8},
    raw_data:{monthly_cost_usd:2800, ef_epi_score:62.5, gpi_score:1.525, ilga_lgbtq_score:71, rsf_press_freedom:79.5, ookla_mbps:160},
    visa_pathways:[
      {name:"EU Blue Card", eligible_for:["professional","employed"], min_income_usd:5200, duration_months:48, renewable:true, leads_to_residency:true, residency_years:3, difficulty:2, processing_weeks:8, notes:"Permanent residency after 21 months with B1 German. One of Europe's best high-skill pathways."},
      {name:"Freelancer / Freiberufler Visa", eligible_for:["freelancer","founder"], min_income_usd:2500, duration_months:36, renewable:true, leads_to_residency:true, residency_years:5, difficulty:3, processing_weeks:12, notes:"Requires proof of German clients or cultural contribution. Language expected."}
    ],
    cost_breakdown:{rent_1bed_capital:1400, rent_1bed_secondary:900, groceries:300, dining_out_meal:14, transport:80, coworking:200, gym:40, health_insurance:250},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required'},
    why_fit:{
      founder:["Thriving startup ecosystem in Berlin, Munich and Hamburg","EU Blue Card offers stable 4-year residency for qualified founders","Access to Europe's largest domestic market"],
      remote_worker:["Freelancer visa is one of Europe's most established for self-employed","Excellent public transit, high-speed rail, and reliable infrastructure"],
      retiree:["World-class public healthcare with low out-of-pocket costs","High safety, strong rule of law, and political stability"],
      default:["EU + Schengen access","Top-tier healthcare and safety","Strong economic base"]
    },
    watch_out:{
      all:["German bureaucracy is notoriously slow — Ausländerbehörde appointments take months","German language is genuinely expected in daily life outside Berlin"],
      retiree:["Cold, grey winters — limited sun from November to March"]
    }
  },

  {
    code:"NL", name:"Netherlands", flag:"🇳🇱", iso_numeric:528,
    region:"Western Europe", is_eu:true, is_schengen:true, currency:"EUR", capital:"Amsterdam",
    lat:52.1, lng:5.3,
    descriptor:"The world's most English-friendly non-Anglophone country — a flat, cycling-obsessed, internationally-minded nation with outstanding digital infrastructure.",
    dimension_scores:{economic_accessibility:5.8, visa_residency:6.8, safety_stability:8.6, healthcare_quality:8.8, digital_infrastructure:9.0, climate_match:5.8, social_cultural_fit:8.8, values_alignment:9.4, economic_opportunity:8.6, lifestyle_match:7.6},
    raw_data:{monthly_cost_usd:3200, ef_epi_score:72.0, gpi_score:1.540, ilga_lgbtq_score:88, rsf_press_freedom:82.4, ookla_mbps:155},
    visa_pathways:[
      {name:"Highly Skilled Migrant Visa", eligible_for:["professional","employed"], min_income_usd:4800, duration_months:36, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:4, notes:"Fast-track processing in 2 weeks. One of Europe's smoothest corporate relocations."},
      {name:"Startup Visa (DAFT)", eligible_for:["founder"], min_income_usd:0, duration_months:12, renewable:true, leads_to_residency:true, residency_years:5, difficulty:3, processing_weeks:8, notes:"Requires Dutch facilitator. Dutch American Friendship Treaty also gives US citizens simplified access."}
    ],
    cost_breakdown:{rent_1bed_capital:1800, rent_1bed_secondary:1200, groceries:320, dining_out_meal:16, transport:90, coworking:220, gym:45, health_insurance:180},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required'},
    why_fit:{
      founder:["Amsterdam's startup scene is one of Europe's top 5","30% ruling reduces income tax significantly for qualifying expats","Dutch public is the most English-proficient non-native population on earth"],
      remote_worker:["30% tax ruling available for high-earning remote workers","Nearly universal English means no language barrier in professional contexts"],
      default:["Top-rated LGBTQ+ rights in the world","EU + Schengen access","Exceptionally international culture"]
    },
    watch_out:{
      all:["Housing in Amsterdam and Utrecht is severely constrained — waitlists for social housing are years long","Weather is persistently grey, wet, and windy — limited sun year-round"],
      founder:["30% ruling has been cut from 5 to 3 years — check current rules"]
    }
  },

  {
    code:"FR", name:"France", flag:"🇫🇷", iso_numeric:250,
    region:"Western Europe", is_eu:true, is_schengen:true, currency:"EUR", capital:"Paris",
    lat:46.2, lng:2.2,
    descriptor:"A nation of extraordinary cultural depth — world-class food, healthcare, and architecture, with a quality of life that the French guard with fierce pride.",
    dimension_scores:{economic_accessibility:6.0, visa_residency:6.6, safety_stability:7.8, healthcare_quality:9.2, digital_infrastructure:8.4, climate_match:7.4, social_cultural_fit:7.0, values_alignment:8.8, economic_opportunity:8.0, lifestyle_match:8.8},
    raw_data:{monthly_cost_usd:2800, ef_epi_score:59.0, gpi_score:1.756, ilga_lgbtq_score:80, rsf_press_freedom:77.1, ookla_mbps:145},
    visa_pathways:[
      {name:"Talent Passport (Passeport Talent)", eligible_for:["founder","professional","freelancer"], min_income_usd:2800, duration_months:48, renewable:true, leads_to_residency:true, residency_years:5, difficulty:3, processing_weeks:12, notes:"Broad visa for highly skilled workers, startup founders, and artists. 4-year duration."},
      {name:"Long-Stay Visitor Visa", eligible_for:["retiree","remote_worker"], min_income_usd:2000, duration_months:12, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:8, notes:"For those with passive income. No local work authorisation."}
    ],
    cost_breakdown:{rent_1bed_capital:1600, rent_1bed_secondary:900, groceries:280, dining_out_meal:16, transport:75, coworking:200, gym:40, health_insurance:100},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required'},
    why_fit:{
      retiree:["World-ranked public healthcare system — widely considered the global benchmark","Quality of life in regional cities (Lyon, Bordeaux, Toulouse) at a fraction of Paris costs","Exceptional food culture and art de vivre that rewards staying"],
      remote_worker:["Talent Passport gives multi-year residency for qualifying remote workers","Paris and Lyon have excellent coworking ecosystems"],
      default:["EU + Schengen access","World-class healthcare","Exceptional food, culture, and regional diversity"]
    },
    watch_out:{
      all:["French bureaucracy is labyrinthine — expect paperwork to take far longer than expected","French language integration is socially expected — English outside Paris is limited"],
      founder:["Labour laws and taxation make hiring complex — worth specialist advice before expanding"]
    }
  },

  {
    code:"IT", name:"Italy", flag:"🇮🇹", iso_numeric:380,
    region:"Southern Europe", is_eu:true, is_schengen:true, currency:"EUR", capital:"Rome",
    lat:41.9, lng:12.6,
    descriptor:"Unmatched beauty, food, and history — Italy's flat tax regime and digital nomad visa have made it one of Europe's most compelling recent relocation destinations.",
    dimension_scores:{economic_accessibility:7.0, visa_residency:6.8, safety_stability:8.0, healthcare_quality:8.6, digital_infrastructure:7.6, climate_match:8.4, social_cultural_fit:7.4, values_alignment:8.4, economic_opportunity:6.6, lifestyle_match:9.2},
    raw_data:{monthly_cost_usd:2200, ef_epi_score:56.0, gpi_score:1.679, ilga_lgbtq_score:71, rsf_press_freedom:73.4, ookla_mbps:130},
    visa_pathways:[
      {name:"Digital Nomad / Remote Worker Visa", eligible_for:["remote_worker","freelancer","founder"], min_income_usd:2700, duration_months:12, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:12, notes:"Launched 2024. One of Europe's newest — application process still maturing."},
      {name:"Flat Tax Regime (€100k)", eligible_for:["investor","retiree","high_earner"], min_income_usd:0, duration_months:120, renewable:false, leads_to_residency:true, residency_years:0, difficulty:3, processing_weeks:16, notes:"€100,000 flat annual tax on all foreign income. Extraordinary for high earners."}
    ],
    cost_breakdown:{rent_1bed_capital:1400, rent_1bed_secondary:750, groceries:250, dining_out_meal:12, transport:45, coworking:160, gym:35, health_insurance:90},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required'},
    why_fit:{
      retiree:["Elective Residency Visa accessible for retirees with passive income","World-class culture, cuisine, and climate at Southern European prices","Southern Italian regions offer some of Europe's lowest cost of living"],
      remote_worker:["Digital nomad visa now formalises what many were already doing","Many cities far cheaper than Northern European equivalents"],
      default:["EU + Schengen access","Exceptional food and lifestyle","Affordable by Western European standards outside major tourist cities"]
    },
    watch_out:{
      all:["Italian bureaucracy is notoriously complex — hire a commercialista (tax advisor) immediately","English is not widely spoken outside Rome, Milan and Florence tourist centres"],
      founder:["Economic dynamism concentrated in the north — south can feel isolated for business"]
    }
  },

  {
    code:"GR", name:"Greece", flag:"🇬🇷", iso_numeric:300,
    region:"Southern Europe", is_eu:true, is_schengen:true, currency:"EUR", capital:"Athens",
    lat:39.1, lng:21.8,
    descriptor:"A dramatic Mediterranean landscape with a rich ancient legacy — Greece's 7% flat tax for foreign retirees and digital nomad visa are attracting a wave of newcomers.",
    dimension_scores:{economic_accessibility:7.6, visa_residency:7.2, safety_stability:7.8, healthcare_quality:7.8, digital_infrastructure:6.8, climate_match:8.8, social_cultural_fit:7.4, values_alignment:8.2, economic_opportunity:5.8, lifestyle_match:9.4},
    raw_data:{monthly_cost_usd:1900, ef_epi_score:58.0, gpi_score:1.843, ilga_lgbtq_score:70, rsf_press_freedom:67.2, ookla_mbps:80},
    visa_pathways:[
      {name:"Digital Nomad Visa", eligible_for:["remote_worker","freelancer"], min_income_usd:3500, duration_months:12, renewable:true, leads_to_residency:false, residency_years:null, difficulty:2, processing_weeks:8, notes:"7% flat income tax for qualifying digital nomads. High sunshine and low cost."},
      {name:"Golden Visa", eligible_for:["investor"], min_income_usd:0, duration_months:60, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:10, notes:"Investment from €250k in real estate. Access to Schengen. Recently raised threshold in popular areas."}
    ],
    cost_breakdown:{rent_1bed_capital:900, rent_1bed_secondary:550, groceries:240, dining_out_meal:12, transport:40, coworking:140, gym:30, health_insurance:80},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required'},
    why_fit:{
      retiree:["7% flat tax on pension and foreign income is one of Europe's most attractive","Mediterranean climate with 300+ days of sun in many areas","Islands and coastal living at genuinely affordable prices"],
      remote_worker:["Digital nomad visa with flat 7% tax is extremely competitive","Athens has a rapidly growing tech and creative scene","Quality of life per euro is among Europe's best"],
      default:["EU + Schengen access","Outstanding Mediterranean lifestyle","Low cost vs. Western European peers"]
    },
    watch_out:{
      all:["Healthcare outside Athens can be limited — private insurance strongly recommended","Internet speeds outside major cities can be frustratingly slow"],
      founder:["Greece's economy remains sluggish — limited local investment for startups"]
    }
  },

  {
    code:"MT", name:"Malta", flag:"🇲🇹", iso_numeric:470,
    region:"Southern Europe", is_eu:true, is_schengen:true, currency:"EUR", capital:"Valletta",
    lat:35.9, lng:14.4,
    descriptor:"The EU's smallest member and sunniest island — an English-speaking Mediterranean paradise with exceptional LGBTQ+ rights, crypto-friendly regulation, and a fast-track residency.",
    dimension_scores:{economic_accessibility:7.2, visa_residency:8.6, safety_stability:8.4, healthcare_quality:8.0, digital_infrastructure:7.4, climate_match:9.2, social_cultural_fit:8.6, values_alignment:9.2, economic_opportunity:7.6, lifestyle_match:8.8},
    raw_data:{monthly_cost_usd:2300, ef_epi_score:68.0, gpi_score:1.573, ilga_lgbtq_score:90, rsf_press_freedom:75.3, ookla_mbps:100},
    visa_pathways:[
      {name:"Malta Digital Nomad Residence Permit", eligible_for:["remote_worker","freelancer"], min_income_usd:2700, duration_months:12, renewable:true, leads_to_residency:false, residency_years:null, difficulty:1, processing_weeks:6, notes:"English official language — no local language barrier. EU base with Mediterranean lifestyle."},
      {name:"Malta Permanent Residence Programme", eligible_for:["investor","retiree"], min_income_usd:0, duration_months:0, renewable:false, leads_to_residency:true, residency_years:0, difficulty:3, processing_weeks:24, notes:"Investment-based PR. From €150k+ in contributions and property rental/purchase."}
    ],
    cost_breakdown:{rent_1bed_capital:1300, rent_1bed_secondary:950, groceries:250, dining_out_meal:14, transport:35, coworking:160, gym:35, health_insurance:90},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required'},
    why_fit:{
      founder:["English is an official language — zero language barrier for business","Crypto and iGaming regulatory frameworks among Europe's most developed","EU jurisdiction for company formation"],
      remote_worker:["The only truly English-speaking EU Mediterranean island","300+ days of sun annually","Small island means minimal commute times"],
      retiree:["Ranked #1 globally for LGBTQ+ rights multiple years running","English-speaking healthcare system — rare in Mediterranean Europe"],
      default:["English official language","Top-ranked LGBTQ+ rights","EU + Schengen with Mediterranean climate"]
    },
    watch_out:{
      all:["Very small island — 'island fever' can set in quickly","Traffic congestion is a significant quality-of-life issue","Property prices have risen sharply — competitive rental market"]
    }
  },

  {
    code:"CZ", name:"Czech Republic", flag:"🇨🇿", iso_numeric:203,
    region:"Central Europe", is_eu:true, is_schengen:true, currency:"CZK", capital:"Prague",
    lat:49.8, lng:15.5,
    descriptor:"Central Europe's most liveable city wrapped in one of the world's most beautiful capitals — Prague offers affordable, cultured city life with a strong expat base.",
    dimension_scores:{economic_accessibility:7.8, visa_residency:7.2, safety_stability:8.6, healthcare_quality:8.0, digital_infrastructure:8.4, climate_match:5.8, social_cultural_fit:7.4, values_alignment:8.0, economic_opportunity:7.6, lifestyle_match:7.6},
    raw_data:{monthly_cost_usd:1800, ef_epi_score:64.0, gpi_score:1.538, ilga_lgbtq_score:67, rsf_press_freedom:76.3, ookla_mbps:150},
    visa_pathways:[
      {name:"Zivno Trade Licence (Freelance)", eligible_for:["freelancer","founder"], min_income_usd:0, duration_months:12, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:6, notes:"Zivnostenský list is one of the easiest self-employment permits in the EU. Low administrative cost."},
      {name:"EU Blue Card", eligible_for:["professional","employed"], min_income_usd:2600, duration_months:24, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:8, notes:"Requires job offer. Czech is expected for integration but English workplaces are common in Prague."}
    ],
    cost_breakdown:{rent_1bed_capital:900, rent_1bed_secondary:600, groceries:240, dining_out_meal:10, transport:30, coworking:150, gym:30, health_insurance:70},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required'},
    why_fit:{
      founder:["Zivno licence is one of the EU's most straightforward self-employment routes","Prague is Central Europe's startup hub with a growing VC scene","EU + Schengen base at a fraction of Western European costs"],
      remote_worker:["Prague has exceptional coworking infrastructure and an active expat community","Fast fibre, good cafes, and world-class architecture — highly liveable"],
      retiree:["Affordable EU living with excellent healthcare","Prague is consistently ranked one of Europe's most beautiful cities"],
      default:["EU + Schengen access","Affordable by Western European standards","Beautiful, historic city"]
    },
    watch_out:{
      all:["Czech language is required for deeper integration — English penetration outside Prague is limited","Cold winters and limited daylight October through March"]
    }
  },

  {
    code:"RO", name:"Romania", flag:"🇷🇴", iso_numeric:642,
    region:"Eastern Europe", is_eu:true, is_schengen:true, currency:"RON", capital:"Bucharest",
    lat:45.9, lng:24.9,
    descriptor:"Eastern Europe's hidden gem — Romania has some of the EU's fastest internet speeds, a flat 10% income tax, and a cost of living that makes the rest of Europe look expensive.",
    dimension_scores:{economic_accessibility:8.4, visa_residency:7.2, safety_stability:7.8, healthcare_quality:6.8, digital_infrastructure:8.8, climate_match:6.4, social_cultural_fit:6.8, values_alignment:7.0, economic_opportunity:7.4, lifestyle_match:7.0},
    raw_data:{monthly_cost_usd:1500, ef_epi_score:63.0, gpi_score:1.752, ilga_lgbtq_score:43, rsf_press_freedom:63.1, ookla_mbps:160},
    visa_pathways:[
      {name:"Digital Nomad Visa", eligible_for:["remote_worker","freelancer"], min_income_usd:3300, duration_months:12, renewable:true, leads_to_residency:false, residency_years:null, difficulty:2, processing_weeks:6, notes:"One of Europe's fastest internet speeds. 10% flat income tax for residents."},
      {name:"EU Freedom of Movement", eligible_for:["eu_citizen"], min_income_usd:0, duration_months:60, renewable:true, leads_to_residency:true, residency_years:5, difficulty:1, processing_weeks:2, notes:"EU citizens can move freely and register with no income requirement."}
    ],
    cost_breakdown:{rent_1bed_capital:700, rent_1bed_secondary:450, groceries:200, dining_out_meal:8, transport:25, coworking:120, gym:25, health_insurance:55},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required'},
    why_fit:{
      remote_worker:["Gigabit-speed fibre internet in Bucharest and Cluj — among Europe's fastest","10% flat income tax is among the EU's lowest","Cost of living allows a high-quality lifestyle on a modest income"],
      founder:["Bucharest and Cluj have fast-growing tech ecosystems","EU jurisdiction with dramatically lower operational costs than Western Europe"],
      default:["EU + Schengen access","Fastest internet in the EU","10% flat income tax"]
    },
    watch_out:{
      all:["Healthcare system underfunded — private insurance is effectively mandatory","LGBTQ+ rights lag behind Western European peers — social attitudes vary by region"],
      retiree:["Romania's state pension and social systems are not designed for foreign retirees — private planning essential"]
    }
  },

  {
    code:"PL", name:"Poland", flag:"🇵🇱", iso_numeric:616,
    region:"Central Europe", is_eu:true, is_schengen:true, currency:"PLN", capital:"Warsaw",
    lat:51.9, lng:19.1,
    descriptor:"A rapidly modernising EU member with a dynamic startup scene, low cost of living, and cities like Warsaw and Kraków competing seriously with Western European capitals.",
    dimension_scores:{economic_accessibility:7.8, visa_residency:7.0, safety_stability:8.2, healthcare_quality:7.4, digital_infrastructure:8.2, climate_match:5.6, social_cultural_fit:7.0, values_alignment:7.0, economic_opportunity:7.8, lifestyle_match:7.2},
    raw_data:{monthly_cost_usd:1700, ef_epi_score:65.0, gpi_score:1.688, ilga_lgbtq_score:44, rsf_press_freedom:66.1, ookla_mbps:140},
    visa_pathways:[
      {name:"Poland Business Harbour", eligible_for:["founder","professional"], min_income_usd:0, duration_months:36, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:6, notes:"Startup-focused fast track. Aimed at tech professionals and entrepreneurs."},
      {name:"Temporary Residence Permit (Work)", eligible_for:["employed"], min_income_usd:0, duration_months:36, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:8, notes:"Requires employer. One of the EU's faster-processing permits."}
    ],
    cost_breakdown:{rent_1bed_capital:800, rent_1bed_secondary:550, groceries:220, dining_out_meal:9, transport:35, coworking:130, gym:28, health_insurance:60},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required'},
    why_fit:{
      founder:["Poland Business Harbour fast-tracks tech founders to residency","Kraków and Warsaw have thriving, internationally-connected tech ecosystems","EU base at Central European cost levels"],
      remote_worker:["Strong coworking infrastructure in major cities","Affordable living with good quality of life in Warsaw and Kraków"],
      default:["EU + Schengen access","Affordable EU living","Growing startup ecosystem"]
    },
    watch_out:{
      all:["Cold winters — harsh from December through February","Political climate around LGBTQ+ rights has been contentious in recent years"],
      retiree:["Polish language integration expected outside major cities"]
    }
  },

  {
    code:"GE", name:"Georgia", flag:"🇬🇪", iso_numeric:268,
    region:"Caucasus", is_eu:false, is_schengen:false, currency:"GEL", capital:"Tbilisi",
    lat:42.3, lng:43.4,
    descriptor:"The digital nomad world's most exciting discovery — Georgia allows 365-day visa-free stays for most nationalities, charges 1% tax on freelance income, and has Caucasian hospitality baked into its DNA.",
    dimension_scores:{economic_accessibility:9.0, visa_residency:9.4, safety_stability:7.2, healthcare_quality:6.2, digital_infrastructure:6.4, climate_match:7.2, social_cultural_fit:6.0, values_alignment:4.8, economic_opportunity:7.0, lifestyle_match:7.8},
    raw_data:{monthly_cost_usd:1200, ef_epi_score:56.0, gpi_score:1.877, ilga_lgbtq_score:18, rsf_press_freedom:62.0, ookla_mbps:65},
    visa_pathways:[
      {name:"Visa-Free 365-Day Stay", eligible_for:["remote_worker","freelancer","retiree","founder"], min_income_usd:0, duration_months:12, renewable:true, leads_to_residency:false, residency_years:null, difficulty:1, processing_weeks:0, notes:"Most passport holders can stay 365 days with zero visa requirements. Simply arrive. Can be renewed by brief border exit."},
      {name:"Small Business Permit / Micro Business", eligible_for:["freelancer","founder"], min_income_usd:0, duration_months:12, renewable:true, leads_to_residency:true, residency_years:1, difficulty:1, processing_weeks:2, notes:"1% flat tax on turnover under ~$155k GEL. One of the world's lowest legitimate tax rates."}
    ],
    cost_breakdown:{rent_1bed_capital:600, rent_1bed_secondary:400, groceries:180, dining_out_meal:6, transport:20, coworking:80, gym:20, health_insurance:50},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'free'},
    why_fit:{
      founder:["1% flat tax on micro-business turnover — possibly the world's lowest","365-day visa-free for most nationalities — zero bureaucracy to start","Tbilisi has a thriving, rapidly growing expat founder community"],
      remote_worker:["No visa, no paperwork, just arrive — the ultimate low-friction base","Extraordinary cuisine, wine culture, and mountain landscapes","Cost of living among the lowest in Europe's extended neighbourhood"],
      default:["365-day visa-free for most passports","1% micro-business tax","Very low cost of living"]
    },
    watch_out:{
      all:["LGBTQ+ safety is a genuine concern — Tbilisi Pride has faced violence in recent years","Political situation has grown more complex — Russia proximity is a geopolitical factor"],
      retiree:["Healthcare is developing rapidly but still below Western European standards"],
      founder:["No path to long-term residency without business registration — perpetual renewal required"]
    }
  },

  {
    code:"ME", name:"Montenegro", flag:"🇲🇪", iso_numeric:499,
    region:"Balkans", is_eu:false, is_schengen:false, currency:"EUR", capital:"Podgorica",
    lat:42.7, lng:19.4,
    descriptor:"A tiny Adriatic jewel — Montenegro uses the Euro without being in the EU, has a fast-track residency programme, and offers dramatic coastal and mountain living at remarkably low cost.",
    dimension_scores:{economic_accessibility:8.8, visa_residency:8.0, safety_stability:7.8, healthcare_quality:6.4, digital_infrastructure:5.8, climate_match:8.0, social_cultural_fit:6.4, values_alignment:7.0, economic_opportunity:6.2, lifestyle_match:8.2},
    raw_data:{monthly_cost_usd:1400, ef_epi_score:58.0, gpi_score:1.750, ilga_lgbtq_score:52, rsf_press_freedom:62.4, ookla_mbps:55},
    visa_pathways:[
      {name:"Long-Stay D Visa", eligible_for:["remote_worker","freelancer","retiree","investor"], min_income_usd:650, duration_months:12, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:6, notes:"Very low income threshold. Montenegro uses EUR — no currency risk."},
      {name:"Economic Citizenship (Investment)", eligible_for:["investor"], min_income_usd:0, duration_months:0, renewable:false, leads_to_residency:true, residency_years:0, difficulty:3, processing_weeks:24, notes:"Citizenship by investment programme. From €250k. Programme availability varies — check current status."}
    ],
    cost_breakdown:{rent_1bed_capital:650, rent_1bed_secondary:450, groceries:200, dining_out_meal:9, transport:25, coworking:100, gym:25, health_insurance:60},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'voa'},
    why_fit:{
      retiree:["Uses the Euro — no currency exposure for European pensioners","Dramatic Adriatic coastline and mountain backdrop","Very low cost of living in a genuinely beautiful environment"],
      remote_worker:["Easy long-stay visa with minimal income requirement","Emerging as a Balkans digital nomad hub","Coastal towns like Kotor are world-class in quality of life"],
      default:["Euro currency without EU membership","Adriatic coast and mountains","Low cost of living"]
    },
    watch_out:{
      all:["Internet infrastructure outside Podgorica and the coast is inconsistent","Healthcare is basic — private medical travel to Serbia or Croatia expected for serious conditions"],
      founder:["Very small domestic market and limited tech ecosystem"]
    }
  },

  {
    code:"RS", name:"Serbia", flag:"🇷🇸", iso_numeric:688,
    region:"Balkans", is_eu:false, is_schengen:false, currency:"RSD", capital:"Belgrade",
    lat:44.0, lng:21.0,
    descriptor:"Belgrade is Europe's best-kept secret — a wild, electric, genuinely cheap city with a booming digital economy, a thriving cafe culture, and extraordinary nightlife.",
    dimension_scores:{economic_accessibility:9.0, visa_residency:7.8, safety_stability:7.4, healthcare_quality:6.6, digital_infrastructure:7.2, climate_match:6.8, social_cultural_fit:7.0, values_alignment:6.8, economic_opportunity:6.8, lifestyle_match:7.4},
    raw_data:{monthly_cost_usd:1300, ef_epi_score:60.0, gpi_score:1.792, ilga_lgbtq_score:47, rsf_press_freedom:58.3, ookla_mbps:85},
    visa_pathways:[
      {name:"Temporary Residence Permit", eligible_for:["remote_worker","freelancer","founder","retiree"], min_income_usd:0, duration_months:12, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:4, notes:"One of the Balkans' most straightforward permits. Pausing after 90 days via a border run is also common."},
      {name:"Lump Sum Tax (Paušalno)", eligible_for:["freelancer","founder"], min_income_usd:0, duration_months:12, renewable:true, leads_to_residency:false, residency_years:null, difficulty:1, processing_weeks:2, notes:"Flat lump-sum quarterly tax for sole traders — often under €200/quarter total."}
    ],
    cost_breakdown:{rent_1bed_capital:600, rent_1bed_secondary:400, groceries:190, dining_out_meal:8, transport:25, coworking:110, gym:25, health_insurance:50},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'free'},
    why_fit:{
      founder:["Extremely low paušal tax rate for freelancers and sole traders","Belgrade's tech scene is growing fast with strong EU-facing companies","Lowest cost of living among capital cities in continental Europe"],
      remote_worker:["Very low cost of living — excellent quality of life on a modest income","Belgrade has excellent coworking spaces and a young, international energy"],
      default:["Very low cost of living","Vibrant city culture","Straightforward residency process"]
    },
    watch_out:{
      all:["Not EU — no Schengen access; passport holders may face limitations","Press freedom and rule of law below EU standards"],
      retiree:["Healthcare system requires private supplement for quality care"]
    }
  },

  // ── LATIN AMERICA ────────────────────────────────────────────────────────────

  {
    code:"CO", name:"Colombia", flag:"🇨🇴", iso_numeric:170,
    region:"South America", is_eu:false, is_schengen:false, currency:"COP", capital:"Bogotá",
    lat:4.6, lng:-74.1,
    descriptor:"South America's most dynamic destination — Medellín's eternal spring climate and urban transformation have made it a global digital nomad magnet, while Cartagena enchants with colonial grandeur.",
    dimension_scores:{economic_accessibility:8.8, visa_residency:7.4, safety_stability:5.4, healthcare_quality:6.6, digital_infrastructure:5.8, climate_match:8.0, social_cultural_fit:7.0, values_alignment:6.4, economic_opportunity:7.0, lifestyle_match:8.8},
    raw_data:{monthly_cost_usd:1500, ef_epi_score:59.0, gpi_score:2.421, ilga_lgbtq_score:60, rsf_press_freedom:52.3, ookla_mbps:55},
    visa_pathways:[
      {name:"Digital Nomad Visa (Nómada Digital)", eligible_for:["remote_worker","freelancer"], min_income_usd:750, duration_months:24, renewable:true, leads_to_residency:false, residency_years:null, difficulty:1, processing_weeks:4, notes:"One of the world's lowest income thresholds for a digital nomad visa — just 3x minimum wage."},
      {name:"Pensionado / Rentista Visa", eligible_for:["retiree","investor"], min_income_usd:750, duration_months:36, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:8, notes:"Leads to permanent residency after 5 years. Income requirement is low by international standards."}
    ],
    cost_breakdown:{rent_1bed_capital:700, rent_1bed_secondary:450, groceries:200, dining_out_meal:7, transport:25, coworking:110, gym:25, health_insurance:60},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'free'},
    why_fit:{
      remote_worker:["Digital nomad visa threshold of ~$750/month is the world's most accessible","Medellín's 'eternal spring' climate (22°C year-round) is exceptional","Massive, enthusiastic digital nomad community in El Poblado and Laureles"],
      retiree:["Pensionado visa very accessible — low passive income threshold","Private healthcare is excellent and cheap by international standards","Cartagena and Santa Marta offer coastal retirement with Caribbean warmth"],
      default:["Exceptional value for money","Medellín's climate is world-class","Strong digital nomad infrastructure"]
    },
    watch_out:{
      all:["Safety varies dramatically by neighbourhood — research areas thoroughly before committing","Bogotá is high altitude (2,600m) — some people struggle to adjust"],
      values:["Political instability and press freedom below OECD standards"]
    }
  },

  {
    code:"AR", name:"Argentina", flag:"🇦🇷", iso_numeric:32,
    region:"South America", is_eu:false, is_schengen:false, currency:"ARS", capital:"Buenos Aires",
    lat:-38.4, lng:-63.6,
    descriptor:"South America's most European city — Buenos Aires offers Paris-scale culture and cuisine, world-class psychotherapy, and the most literate, passionate population on the continent.",
    dimension_scores:{economic_accessibility:9.2, visa_residency:7.6, safety_stability:6.2, healthcare_quality:7.2, digital_infrastructure:6.4, climate_match:7.4, social_cultural_fit:7.4, values_alignment:7.6, economic_opportunity:5.8, lifestyle_match:8.4},
    raw_data:{monthly_cost_usd:1400, ef_epi_score:60.0, gpi_score:1.977, ilga_lgbtq_score:74, rsf_press_freedom:59.4, ookla_mbps:65},
    visa_pathways:[
      {name:"Rentista Visa", eligible_for:["remote_worker","retiree","freelancer"], min_income_usd:1400, duration_months:12, renewable:true, leads_to_residency:true, residency_years:2, difficulty:2, processing_weeks:8, notes:"One of the fastest paths to permanent residency in South America — just 2 years."},
      {name:"Digital Nomad Visa", eligible_for:["remote_worker","freelancer"], min_income_usd:1000, duration_months:6, renewable:true, leads_to_residency:false, residency_years:null, difficulty:1, processing_weeks:2, notes:"Low income threshold. Informal dollar economy means purchasing power is extremely high for USD/EUR earners."}
    ],
    cost_breakdown:{rent_1bed_capital:600, rent_1bed_secondary:400, groceries:180, dining_out_meal:6, transport:20, coworking:90, gym:20, health_insurance:50},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'free'},
    why_fit:{
      remote_worker:["For USD or EUR earners, Argentina's blue-rate economy makes costs extraordinarily low","Buenos Aires is one of the world's great cities for culture, food, and intellectual life","Path to permanent residency in just 2 years is one of the world's fastest"],
      retiree:["Excellent private healthcare at a fraction of US or European costs","Buenos Aires is a deeply liveable, walkable, culturally rich city","Strong LGBTQ+ rights — Argentina was Latin America's first country to legalise same-sex marriage"],
      default:["Exceptional cultural depth","Very low cost for USD/EUR earners","Strong LGBTQ+ protections"]
    },
    watch_out:{
      all:["Economic instability and inflation are chronic — understand currency dynamics before committing","Argentine bureaucracy can be extremely unpredictable"],
      founder:["Starting and operating a business faces significant regulatory complexity"]
    }
  },

  {
    code:"PA", name:"Panama", flag:"🇵🇦", iso_numeric:591,
    region:"Central America", is_eu:false, is_schengen:false, currency:"USD", capital:"Panama City",
    lat:8.5, lng:-80.8,
    descriptor:"The Americas' tax hub — Panama uses the US dollar, has no tax on foreign-sourced income, and a proven retiree programme that's been attracting expats for decades.",
    dimension_scores:{economic_accessibility:7.8, visa_residency:8.2, safety_stability:6.4, healthcare_quality:6.8, digital_infrastructure:5.8, climate_match:7.2, social_cultural_fit:6.8, values_alignment:6.2, economic_opportunity:8.4, lifestyle_match:7.6},
    raw_data:{monthly_cost_usd:2000, ef_epi_score:56.0, gpi_score:1.958, ilga_lgbtq_score:49, rsf_press_freedom:60.2, ookla_mbps:52},
    visa_pathways:[
      {name:"Pensionado Programme", eligible_for:["retiree"], min_income_usd:1000, duration_months:0, renewable:false, leads_to_residency:true, residency_years:0, difficulty:1, processing_weeks:8, notes:"One of the world's most established retiree programmes. Low income threshold and significant discounts on services."},
      {name:"Friendly Nations Visa", eligible_for:["remote_worker","investor","professional"], min_income_usd:0, duration_months:0, renewable:false, leads_to_residency:true, residency_years:0, difficulty:2, processing_weeks:12, notes:"Available to ~50 'friendly nations' passport holders. Fast path to permanent residency."}
    ],
    cost_breakdown:{rent_1bed_capital:1100, rent_1bed_secondary:750, groceries:280, dining_out_meal:10, transport:45, coworking:130, gym:35, health_insurance:90},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'voa'},
    why_fit:{
      retiree:["Pensionado programme is one of the world's most comprehensive retirement visas","No tax on foreign-sourced income — pension and investment income untaxed","US dollar currency — zero exchange rate risk for US-based retirees"],
      founder:["No corporate tax on foreign-sourced income — territorial tax system","Financial hub with excellent banking infrastructure","Direct flights to major US and Latin American cities"],
      default:["USD currency — no exchange risk","Zero tax on foreign income","Established expat infrastructure"]
    },
    watch_out:{
      all:["Humidity and heat are significant year-round — not for everyone","Panama City is relatively expensive by Latin American standards"],
      retiree:["Healthcare outside Panama City is limited"]
    }
  },

  {
    code:"UY", name:"Uruguay", flag:"🇺🇾", iso_numeric:858,
    region:"South America", is_eu:false, is_schengen:false, currency:"UYU", capital:"Montevideo",
    lat:-32.5, lng:-55.8,
    descriptor:"The Switzerland of South America — stable, transparent, progressive, and safe by regional standards, with a rapidly growing tech sector and one of the world's most accessible residency programmes.",
    dimension_scores:{economic_accessibility:7.4, visa_residency:7.8, safety_stability:7.6, healthcare_quality:7.2, digital_infrastructure:6.6, climate_match:7.0, social_cultural_fit:7.4, values_alignment:8.2, economic_opportunity:6.4, lifestyle_match:7.8},
    raw_data:{monthly_cost_usd:2100, ef_epi_score:58.0, gpi_score:1.791, ilga_lgbtq_score:76, rsf_press_freedom:71.4, ookla_mbps:70},
    visa_pathways:[
      {name:"Rentista / Pensionista Visa", eligible_for:["retiree","remote_worker","investor"], min_income_usd:1500, duration_months:12, renewable:true, leads_to_residency:true, residency_years:3, difficulty:2, processing_weeks:8, notes:"One of South America's most straightforward residency processes. 3-year path to permanent residency."},
      {name:"Tech Visa / Investor Visa", eligible_for:["founder","professional"], min_income_usd:0, duration_months:24, renewable:true, leads_to_residency:true, residency_years:3, difficulty:2, processing_weeks:10, notes:"Uruguay actively recruits tech talent — tech-sector professionals get preferential treatment."}
    ],
    cost_breakdown:{rent_1bed_capital:1000, rent_1bed_secondary:650, groceries:240, dining_out_meal:12, transport:35, coworking:130, gym:30, health_insurance:80},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'free'},
    why_fit:{
      retiree:["South America's most stable and transparent government","Strong LGBTQ+ rights — first in South America to fully legalise same-sex marriage","Healthcare is genuinely accessible and quality for Latin America"],
      founder:["Tech sector specifically incentivised — software engineers pay preferential tax rates","Uruguay has strong rule of law and property rights by regional standards"],
      default:["Most stable country in South America","Strong LGBTQ+ protections","Accessible residency process"]
    },
    watch_out:{
      all:["More expensive than regional peers like Colombia or Argentina","Limited cultural diversity and nightlife compared to Buenos Aires or São Paulo"],
      founder:["Small domestic market — business must be internationally oriented"]
    }
  },

  // ── SOUTHEAST ASIA ───────────────────────────────────────────────────────────

  {
    code:"ID", name:"Indonesia", flag:"🇮🇩", iso_numeric:360,
    region:"Southeast Asia", is_eu:false, is_schengen:false, currency:"IDR", capital:"Jakarta",
    lat:-0.8, lng:113.9,
    descriptor:"Home to the world's digital nomad mecca — Bali combines extraordinary natural beauty, world-class surf, and a mature expat infrastructure at a cost that makes anywhere else feel expensive.",
    dimension_scores:{economic_accessibility:9.4, visa_residency:6.8, safety_stability:6.6, healthcare_quality:5.6, digital_infrastructure:5.0, climate_match:7.0, social_cultural_fit:7.0, values_alignment:4.2, economic_opportunity:5.8, lifestyle_match:9.2},
    raw_data:{monthly_cost_usd:1200, ef_epi_score:52.0, gpi_score:1.924, ilga_lgbtq_score:13, rsf_press_freedom:48.4, ookla_mbps:38},
    visa_pathways:[
      {name:"Second Home Visa", eligible_for:["retiree","remote_worker","investor"], min_income_usd:0, duration_months:60, renewable:true, leads_to_residency:false, residency_years:null, difficulty:2, processing_weeks:4, notes:"5-year multi-entry visa. Funds requirement: ~$130,000 in Indonesian bank. No work authorisation."},
      {name:"Digital Nomad Visa (KITAS Social)", eligible_for:["remote_worker","freelancer"], min_income_usd:4000, duration_months:12, renewable:true, leads_to_residency:false, residency_years:null, difficulty:2, processing_weeks:6, notes:"Bali-specific remote work scheme. No Indonesian income tax on foreign-sourced income."}
    ],
    cost_breakdown:{rent_1bed_capital:600, rent_1bed_secondary:400, groceries:180, dining_out_meal:5, transport:25, coworking:90, gym:25, health_insurance:55},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'voa'},
    why_fit:{
      remote_worker:["Canggu and Seminyak in Bali have world-class coworking infrastructure","Cost of living is extraordinary — $1,500/month affords a genuinely luxurious lifestyle","No Indonesian tax on foreign-sourced income for qualifying visa holders"],
      retiree:["Bali's mature expat community means established support networks","Warm year-round climate, rice paddies, temples, and ocean","Some of the world's best surf and yoga culture"],
      default:["World-famous lifestyle destination","Very low cost of living","Mature nomad and expat infrastructure in Bali"]
    },
    watch_out:{
      all:["LGBTQ+ relationships are not legally recognised and local attitudes vary sharply","Healthcare in Bali requires medical evacuation insurance — Jakarta or Singapore for serious issues"],
      all2:["Internet reliability in rural areas of Bali can be inconsistent","Visa options don't lead to permanent residency — perpetual renewal required"]
    }
  },

  {
    code:"VN", name:"Vietnam", flag:"🇻🇳", iso_numeric:704,
    region:"Southeast Asia", is_eu:false, is_schengen:false, currency:"VND", capital:"Hanoi",
    lat:14.1, lng:108.3,
    descriptor:"Southeast Asia's most underrated destination — Vietnam's food, landscapes, and extraordinary cost of living attract a growing wave of long-termers who can't imagine going back.",
    dimension_scores:{economic_accessibility:9.6, visa_residency:6.2, safety_stability:7.4, healthcare_quality:6.0, digital_infrastructure:6.4, climate_match:7.0, social_cultural_fit:6.6, values_alignment:3.8, economic_opportunity:7.4, lifestyle_match:8.8},
    raw_data:{monthly_cost_usd:1000, ef_epi_score:55.0, gpi_score:1.785, ilga_lgbtq_score:26, rsf_press_freedom:26.0, ookla_mbps:68},
    visa_pathways:[
      {name:"E-Visa (90-day)", eligible_for:["remote_worker","freelancer","retiree"], min_income_usd:0, duration_months:3, renewable:true, leads_to_residency:false, residency_years:null, difficulty:1, processing_weeks:1, notes:"Most nationalities can get 90-day single/multiple-entry e-visa online. Requires exit-reentry for renewal."},
      {name:"Temporary Residence Card (TRC)", eligible_for:["employed","investor"], min_income_usd:0, duration_months:24, renewable:true, leads_to_residency:false, residency_years:null, difficulty:3, processing_weeks:8, notes:"2-year card. Requires employer sponsorship or business registration. No formal nomad visa yet."}
    ],
    cost_breakdown:{rent_1bed_capital:500, rent_1bed_secondary:350, groceries:160, dining_out_meal:4, transport:20, coworking:80, gym:20, health_insurance:45},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'voa'},
    why_fit:{
      remote_worker:["Cost of living is extraordinary — $1,000/month covers everything in Hanoi or Da Nang","Hội An and Da Nang have vibrant expat communities with good coworking","Vietnamese food culture is a daily delight — one of the world's greatest cuisines"],
      retiree:["Incredibly low cost of retirement — $1,500/month is genuinely comfortable","Warm climate in the south year-round","Welcoming local culture with genuine curiosity toward foreigners"],
      default:["Lowest cost of any country in this dataset","World-class street food culture","Safe and surprisingly well-organised"]
    },
    watch_out:{
      all:["No formal long-stay visa pathway — frequent visa runs required","Press freedom is critically low — one-party state with media controls"],
      values:["LGBTQ+ relationships not legally recognised; social tolerance varies by city"]
    }
  },

  {
    code:"MY", name:"Malaysia", flag:"🇲🇾", iso_numeric:458,
    region:"Southeast Asia", is_eu:false, is_schengen:false, currency:"MYR", capital:"Kuala Lumpur",
    lat:4.2, lng:109.5,
    descriptor:"Southeast Asia's most underrated expat destination — Malaysia combines English as a working language, world-class food, tropical living, and a long-established expat programme at a surprisingly low cost.",
    dimension_scores:{economic_accessibility:9.0, visa_residency:7.4, safety_stability:7.6, healthcare_quality:7.4, digital_infrastructure:7.8, climate_match:6.4, social_cultural_fit:7.6, values_alignment:4.6, economic_opportunity:7.8, lifestyle_match:7.8},
    raw_data:{monthly_cost_usd:1500, ef_epi_score:63.0, gpi_score:1.640, ilga_lgbtq_score:10, rsf_press_freedom:53.0, ookla_mbps:88},
    visa_pathways:[
      {name:"DE Rantau Digital Nomad Visa", eligible_for:["remote_worker","freelancer"], min_income_usd:2400, duration_months:12, renewable:true, leads_to_residency:false, residency_years:null, difficulty:1, processing_weeks:2, notes:"Purpose-built nomad visa launched 2022. Low income threshold, fast processing."},
      {name:"Malaysia My Second Home (MM2H)", eligible_for:["retiree","investor"], min_income_usd:10000, duration_months:60, renewable:true, leads_to_residency:false, residency_years:null, difficulty:3, processing_weeks:24, notes:"Revamped programme with higher requirements than the original. 5-year renewable stay."}
    ],
    cost_breakdown:{rent_1bed_capital:700, rent_1bed_secondary:450, groceries:200, dining_out_meal:5, transport:35, coworking:110, gym:25, health_insurance:60},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'voa'},
    why_fit:{
      remote_worker:["English is a genuine working language — no barrier for expats","DE Rantau visa is among Asia's most accessible for nomads","KL's coworking infrastructure is excellent and growing"],
      retiree:["Kuala Lumpur has world-class private hospitals at 30–50% of Western costs","English widely spoken in healthcare and professional contexts","Hawker food culture — some of Asia's best eating at minimal cost"],
      default:["English widely spoken","Excellent value private healthcare","Low cost with urban conveniences"]
    },
    watch_out:{
      all:["LGBTQ+ relationships are illegal under both civil and sharia law — significant safety concern","High humidity year-round — not comfortable for everyone"],
      values:["Press freedom is restricted — government influence over media"]
    }
  },

  {
    code:"TW", name:"Taiwan", flag:"🇹🇼", iso_numeric:158,
    region:"East Asia", is_eu:false, is_schengen:false, currency:"TWD", capital:"Taipei",
    lat:23.7, lng:120.9,
    descriptor:"Asia's most LGBTQ+-friendly country, with world-class healthcare, extraordinary food, blazing-fast internet, and a political culture that punches well above its size.",
    dimension_scores:{economic_accessibility:7.8, visa_residency:6.0, safety_stability:8.6, healthcare_quality:9.0, digital_infrastructure:9.4, climate_match:6.6, social_cultural_fit:7.2, values_alignment:8.0, economic_opportunity:8.2, lifestyle_match:8.2},
    raw_data:{monthly_cost_usd:2000, ef_epi_score:61.0, gpi_score:1.682, ilga_lgbtq_score:66, rsf_press_freedom:74.2, ookla_mbps:192},
    visa_pathways:[
      {name:"Gold Card (Employment Gold Card)", eligible_for:["professional","founder","remote_worker"], min_income_usd:5800, duration_months:36, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:6, notes:"3-year open work permit for high earners. No employer sponsorship needed. Strong tech community in Taipei."},
      {name:"Visitor Visa + ARC", eligible_for:["remote_worker","employed"], min_income_usd:0, duration_months:12, renewable:true, leads_to_residency:true, residency_years:5, difficulty:3, processing_weeks:8, notes:"Standard path via employer. Work permit needed to remain legally long-term."}
    ],
    cost_breakdown:{rent_1bed_capital:950, rent_1bed_secondary:700, groceries:280, dining_out_meal:8, transport:40, coworking:180, gym:40, health_insurance:80},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required'},
    why_fit:{
      founder:["Gold Card is a genuinely excellent 3-year open work permit for tech founders","Taiwan's semiconductor and hardware ecosystem is world-leading","Asia's most progressive values — LGBTQ+ rights, democracy, press freedom"],
      remote_worker:["World's fastest fixed-line internet median speeds","Night markets, hiking trails, hot springs — extraordinary quality of life","Very safe — low crime, stable society, high civic trust"],
      default:["Asia's most progressive values","World-class internet speeds","Excellent healthcare with national coverage"]
    },
    watch_out:{
      all:["Cross-strait tension with China is a genuine geopolitical factor to weigh","Mandarin Chinese is essential for deeper integration — English penetration outside professional circles is limited"],
      retiree:["Gold Card income threshold may be high for retirees on fixed income"]
    }
  },

  {
    code:"KR", name:"South Korea", flag:"🇰🇷", iso_numeric:410,
    region:"East Asia", is_eu:false, is_schengen:false, currency:"KRW", capital:"Seoul",
    lat:36.5, lng:127.8,
    descriptor:"The world's most wired country — South Korea offers the planet's fastest internet, world-class healthcare and transport, a dynamic creative economy, and a food culture that rivals Japan.",
    dimension_scores:{economic_accessibility:7.2, visa_residency:5.8, safety_stability:8.4, healthcare_quality:9.2, digital_infrastructure:9.8, climate_match:6.4, social_cultural_fit:6.4, values_alignment:6.4, economic_opportunity:8.4, lifestyle_match:8.4},
    raw_data:{monthly_cost_usd:2400, ef_epi_score:65.0, gpi_score:1.779, ilga_lgbtq_score:24, rsf_press_freedom:71.2, ookla_mbps:210},
    visa_pathways:[
      {name:"Digital Nomad Visa (Workation)", eligible_for:["remote_worker","freelancer"], min_income_usd:4200, duration_months:12, renewable:false, leads_to_residency:false, residency_years:null, difficulty:2, processing_weeks:4, notes:"Launched 2024. For remote workers employed outside Korea. Seoul coworking scene is world-class."},
      {name:"D-8 Corporate Investment Visa", eligible_for:["founder","investor"], min_income_usd:0, duration_months:24, renewable:true, leads_to_residency:true, residency_years:5, difficulty:3, processing_weeks:10, notes:"Requires Korean corporation. Investment and job creation requirements apply."}
    ],
    cost_breakdown:{rent_1bed_capital:1200, rent_1bed_secondary:800, groceries:320, dining_out_meal:10, transport:50, coworking:180, gym:45, health_insurance:90},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required'},
    why_fit:{
      founder:["Seoul's tech ecosystem is dynamic and globally connected","World's fastest internet and best mobile infrastructure","Government actively supporting startup ecosystem through K-Startup grants"],
      remote_worker:["Digital nomad visa launched in 2024 — growing infrastructure for nomads","Seoul has extraordinary urban density and convenience — food, transit, everything"],
      retiree:["National health insurance accessible to residents — world-class facilities","Incredibly safe — Seoul has effectively zero street crime"],
      default:["World's fastest internet","Excellent healthcare","Extraordinary urban density and convenience"]
    },
    watch_out:{
      all:["Korean language is essential for daily life and integration — learning curve is steep","LGBTQ+ legal protections are limited — social attitudes vary significantly"],
      founder:["Hierarchical business culture can be challenging for Western-style flat organisations"]
    }
  },

  {
    code:"PH", name:"Philippines", flag:"🇵🇭", iso_numeric:608,
    region:"Southeast Asia", is_eu:false, is_schengen:false, currency:"PHP", capital:"Manila",
    lat:12.9, lng:121.8,
    descriptor:"7,600 islands of extraordinary tropical beauty, with English as an official language, warm and genuinely welcoming people, and a cost of living that puts the rest of Asia to shame.",
    dimension_scores:{economic_accessibility:9.4, visa_residency:7.0, safety_stability:5.8, healthcare_quality:6.0, digital_infrastructure:5.6, climate_match:6.8, social_cultural_fit:8.4, values_alignment:5.8, economic_opportunity:6.2, lifestyle_match:8.6},
    raw_data:{monthly_cost_usd:1100, ef_epi_score:65.0, gpi_score:2.212, ilga_lgbtq_score:43, rsf_press_freedom:47.3, ookla_mbps:52},
    visa_pathways:[
      {name:"SRRV (Special Resident Retiree Visa)", eligible_for:["retiree"], min_income_usd:0, duration_months:0, renewable:false, leads_to_residency:true, residency_years:0, difficulty:2, processing_weeks:8, notes:"One of Asia's best retiree programmes. Deposit requirement from $10,000–$20,000. Lifetime residency."},
      {name:"9(a) Tourist Visa + Extension", eligible_for:["remote_worker","freelancer"], min_income_usd:0, duration_months:36, renewable:true, leads_to_residency:false, residency_years:null, difficulty:1, processing_weeks:1, notes:"Most nationalities arrive visa-free and extend to 3 years total via regular extensions. Very low cost."}
    ],
    cost_breakdown:{rent_1bed_capital:550, rent_1bed_secondary:350, groceries:170, dining_out_meal:5, transport:20, coworking:80, gym:20, health_insurance:50},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'voa'},
    why_fit:{
      retiree:["SRRV is one of Asia's most comprehensive retirement visa programmes","English is an official language — complete language comfort","Very low cost of living with warm climate year-round"],
      remote_worker:["English-speaking country with a genuine understanding of Western culture","Beach island lifestyle with reasonable connectivity in major hubs","Extremely warm and welcoming local culture"],
      default:["English official language","Extremely low cost of living","Exceptional beach and island lifestyle"]
    },
    watch_out:{
      all:["Safety varies significantly — research areas carefully; some regions have travel advisories","Internet infrastructure is improving but still unreliable in many areas","Typhoon season (June–November) affects many islands seriously"]
    }
  },

  // ── MIDDLE EAST / AFRICA ─────────────────────────────────────────────────────

  {
    code:"TR", name:"Türkiye", flag:"🇹🇷", iso_numeric:792,
    region:"Middle East / Europe", is_eu:false, is_schengen:false, currency:"TRY", capital:"Ankara",
    lat:38.9, lng:35.2,
    descriptor:"A vast country straddling two continents — Istanbul is one of the world's great cities, with extraordinary food, history, and a cost of living collapse that makes it exceptional value.",
    dimension_scores:{economic_accessibility:9.0, visa_residency:7.4, safety_stability:5.4, healthcare_quality:7.0, digital_infrastructure:6.6, climate_match:8.2, social_cultural_fit:6.4, values_alignment:3.8, economic_opportunity:6.8, lifestyle_match:8.0},
    raw_data:{monthly_cost_usd:1400, ef_epi_score:57.0, gpi_score:2.421, ilga_lgbtq_score:11, rsf_press_freedom:29.4, ookla_mbps:65},
    visa_pathways:[
      {name:"Short-Stay Tourist + Residency Permit", eligible_for:["remote_worker","freelancer","retiree"], min_income_usd:500, duration_months:12, renewable:true, leads_to_residency:false, residency_years:null, difficulty:2, processing_weeks:4, notes:"Tourist visa + ikamet (residence permit) application. Renewable annually. No work authorisation for foreign employers."},
      {name:"Turkish Citizenship by Investment", eligible_for:["investor"], min_income_usd:0, duration_months:0, renewable:false, leads_to_residency:true, residency_years:0, difficulty:2, processing_weeks:16, notes:"$400,000 real estate investment grants Turkish citizenship — a powerful second passport."}
    ],
    cost_breakdown:{rent_1bed_capital:650, rent_1bed_secondary:420, groceries:180, dining_out_meal:7, transport:25, coworking:100, gym:22, health_insurance:55},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'voa'},
    why_fit:{
      remote_worker:["Istanbul is one of the world's greatest cities — history, food, culture, and the Bosphorus","Cost of living collapse (lira devaluation) makes it extraordinary value for USD/EUR earners","Large and growing expat community in Karaköy, Cihangir, and Moda"],
      retiree:["World-class private healthcare at very low cost","Mediterranean and Aegean coastal towns offer stunning retirement settings","Turkish cuisine is among the world's finest — eating well is effortless"],
      default:["Extraordinary cultural depth","Very low cost for USD/EUR earners","Stunning geography"]
    },
    watch_out:{
      all:["Press freedom is critically low — independent media severely restricted","LGBTQ+ safety is a serious concern — Pride banned since 2015"],
      all2:["Political environment has grown more authoritarian — rule of law concerns"]
    }
  },

  {
    code:"MA", name:"Morocco", flag:"🇲🇦", iso_numeric:504,
    region:"North Africa", is_eu:false, is_schengen:false, currency:"MAD", capital:"Rabat",
    lat:31.8, lng:-7.1,
    descriptor:"Africa's most expat-accessible country — Morocco combines stunning medinas, Atlantic and Mediterranean coasts, year-round warmth, and a location just 14km from Europe.",
    dimension_scores:{economic_accessibility:9.0, visa_residency:7.2, safety_stability:6.8, healthcare_quality:5.8, digital_infrastructure:5.4, climate_match:8.4, social_cultural_fit:6.0, values_alignment:4.0, economic_opportunity:6.4, lifestyle_match:7.8},
    raw_data:{monthly_cost_usd:1300, ef_epi_score:52.0, gpi_score:2.014, ilga_lgbtq_score:10, rsf_press_freedom:48.2, ookla_mbps:45},
    visa_pathways:[
      {name:"Long-Stay Residence Permit (Carte de Séjour)", eligible_for:["remote_worker","retiree","investor","freelancer"], min_income_usd:500, duration_months:12, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:8, notes:"Requires proof of funds. French is the professional language — opens deeper integration."},
      {name:"Investor Status", eligible_for:["investor","founder"], min_income_usd:0, duration_months:12, renewable:true, leads_to_residency:true, residency_years:5, difficulty:2, processing_weeks:8, notes:"Morocco is actively attracting foreign investment — particularly in tech and renewables."}
    ],
    cost_breakdown:{rent_1bed_capital:600, rent_1bed_secondary:380, groceries:180, dining_out_meal:7, transport:22, coworking:90, gym:22, health_insurance:55},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'voa'},
    why_fit:{
      remote_worker:["14km from Spain — easy Schengen access by ferry for EU trips","Marrakech and Casablanca have growing coworking ecosystems","Atlantic coast surf towns like Taghazout offer low-cost surf lifestyle"],
      retiree:["Exceptional value — Essaouira and coastal towns are stunning at low cost","French-speaking country — accessible to Francophone expats","Mediterranean and Atlantic climate — warm year-round without extreme heat"],
      default:["Close to Europe","Very low cost of living","Stunning cultural and landscape diversity"]
    },
    watch_out:{
      all:["LGBTQ+ relationships are illegal — significant legal and personal safety risk","Press freedom is restricted — state influence over media"],
      all2:["Healthcare quality outside Casablanca and Rabat is limited — private insurance essential"]
    }
  },

  {
    code:"ZA", name:"South Africa", flag:"🇿🇦", iso_numeric:710,
    region:"Southern Africa", is_eu:false, is_schengen:false, currency:"ZAR", capital:"Pretoria",
    lat:-30.6, lng:22.9,
    descriptor:"A country of breathtaking natural beauty and complex contrasts — South Africa's Cape Town consistently ranks among the world's most beautiful cities, and the exchange rate makes it astonishing value.",
    dimension_scores:{economic_accessibility:8.8, visa_residency:7.0, safety_stability:4.6, healthcare_quality:6.4, digital_infrastructure:6.0, climate_match:8.0, social_cultural_fit:7.6, values_alignment:7.2, economic_opportunity:6.6, lifestyle_match:8.4},
    raw_data:{monthly_cost_usd:1400, ef_epi_score:65.0, gpi_score:2.498, ilga_lgbtq_score:62, rsf_press_freedom:61.4, ookla_mbps:56},
    visa_pathways:[
      {name:"Critical Skills Visa", eligible_for:["professional","founder"], min_income_usd:0, duration_months:36, renewable:true, leads_to_residency:true, residency_years:5, difficulty:3, processing_weeks:16, notes:"For skills on the critical skills list. Direct path to permanent residency after 5 years."},
      {name:"Retired Person Visa", eligible_for:["retiree"], min_income_usd:1700, duration_months:48, renewable:true, leads_to_residency:false, residency_years:null, difficulty:2, processing_weeks:10, notes:"4-year renewable permit. Income threshold relatively modest. Extraordinary lifestyle value."}
    ],
    cost_breakdown:{rent_1bed_capital:700, rent_1bed_secondary:450, groceries:220, dining_out_meal:8, transport:35, coworking:100, gym:25, health_insurance:80},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required'},
    why_fit:{
      remote_worker:["Cape Town is regularly listed among the world's most beautiful cities","For USD/EUR earners, the ZAR exchange rate makes costs extraordinary low","English-speaking country with a strong business culture"],
      retiree:["Retired Person Visa accessible with moderate income","World-class private healthcare at a fraction of Western costs","Wine country, mountain biking, whale watching — lifestyle is outstanding"],
      default:["English-speaking","Extraordinary natural beauty","Very low cost for USD/EUR earners"]
    },
    watch_out:{
      all:["Safety is a serious concern — crime rates are high and property crime frequent; gated living is the norm","Loadshedding (rolling power outages) remains an infrastructure reality"],
      retiree:["Healthcare outside private sector is under severe strain"]
    }
  },

  // ── OCEANIA ──────────────────────────────────────────────────────────────────

  {
    code:"NZ", name:"New Zealand", flag:"🇳🇿", iso_numeric:554,
    region:"Oceania", is_eu:false, is_schengen:false, currency:"NZD", capital:"Wellington",
    lat:-41.3, lng:174.8,
    descriptor:"A remote island paradise with world-class natural beauty, exceptional social values, one of the world's best democracies, and a relaxed Kiwi culture that's easy to integrate into.",
    dimension_scores:{economic_accessibility:5.4, visa_residency:6.2, safety_stability:9.6, healthcare_quality:8.6, digital_infrastructure:8.4, climate_match:8.0, social_cultural_fit:9.2, values_alignment:9.6, economic_opportunity:7.6, lifestyle_match:9.4},
    raw_data:{monthly_cost_usd:3400, ef_epi_score:70.0, gpi_score:1.321, ilga_lgbtq_score:87, rsf_press_freedom:84.2, ookla_mbps:145},
    visa_pathways:[
      {name:"Skilled Migrant Category Residence Visa", eligible_for:["professional","employed"], min_income_usd:0, duration_months:0, renewable:false, leads_to_residency:true, residency_years:0, difficulty:3, processing_weeks:24, notes:"Points-based. Expression of Interest system. One of the developed world's most open skilled migration pathways."},
      {name:"Working Holiday Visa", eligible_for:["remote_worker","young_professional"], min_income_usd:0, duration_months:12, renewable:false, leads_to_residency:false, residency_years:null, difficulty:1, processing_weeks:2, notes:"For under-35s from ~45 partner countries. Excellent gateway to NZ."}
    ],
    cost_breakdown:{rent_1bed_capital:1700, rent_1bed_secondary:1200, groceries:380, dining_out_meal:18, transport:80, coworking:200, gym:50, health_insurance:80},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required'},
    why_fit:{
      retiree:["Ranked among the world's top countries for safety, democracy, and rule of law","Outstanding natural environment — mountains, fjords, beaches within hours","Warm, inclusive Kiwi culture that genuinely embraces newcomers"],
      remote_worker:["English-speaking with the highest-ranking values alignment in any non-European country","Outdoor lifestyle is unmatched — hiking, surfing, skiing all accessible"],
      default:["Safest countries globally","World-class LGBTQ+ rights and democracy","Extraordinary natural environment"]
    },
    watch_out:{
      all:["Very remote — long-haul flights to everywhere, including Australia","Cost of living has risen significantly — Auckland is one of the world's most expensive cities","Visa pathways are competitive — not straightforward without skills or youth visa eligibility"]
    }
  },

  {
    code:"AU", name:"Australia", flag:"🇦🇺", iso_numeric:36,
    region:"Oceania", is_eu:false, is_schengen:false, currency:"AUD", capital:"Canberra",
    lat:-25.3, lng:133.8,
    descriptor:"A vast, sun-drenched English-speaking continent with a high-wage economy, world-class universities, and a multicultural society that consistently tops global liveability rankings.",
    dimension_scores:{economic_accessibility:5.2, visa_residency:5.8, safety_stability:9.2, healthcare_quality:8.8, digital_infrastructure:8.4, climate_match:8.4, social_cultural_fit:9.0, values_alignment:9.4, economic_opportunity:8.4, lifestyle_match:9.0},
    raw_data:{monthly_cost_usd:3800, ef_epi_score:68.0, gpi_score:1.524, ilga_lgbtq_score:86, rsf_press_freedom:79.3, ookla_mbps:130},
    visa_pathways:[
      {name:"Skilled Independent Visa (189)", eligible_for:["professional"], min_income_usd:0, duration_months:0, renewable:false, leads_to_residency:true, residency_years:0, difficulty:4, processing_weeks:52, notes:"Points-based permanent residency. Competitive — requires occupation on skilled list and high points score."},
      {name:"Global Talent Visa (858)", eligible_for:["founder","professional"], min_income_usd:0, duration_months:0, renewable:false, leads_to_residency:true, residency_years:0, difficulty:3, processing_weeks:12, notes:"Fast-tracked PR for exceptional talent in target sectors. Requires nominator in Australia."}
    ],
    cost_breakdown:{rent_1bed_capital:1900, rent_1bed_secondary:1400, groceries:400, dining_out_meal:20, transport:90, coworking:230, gym:55, health_insurance:0},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required'},
    why_fit:{
      founder:["Global Talent Visa fast-tracks exceptional founders to permanent residency","Australia's tech ecosystem in Sydney and Melbourne is sophisticated and globally connected","High-wage economy means strong domestic consumer spending power"],
      remote_worker:["English-speaking with exceptional outdoor lifestyle","Melbourne and Sydney consistently top global liveability rankings","Medicare universal healthcare included for permanent residents"],
      retiree:["World-class safety and political stability","Warm climate in Queensland — Gold Coast and Sunshine Coast are popular retiree destinations"],
      default:["English-speaking","World-class liveability rankings","Strong LGBTQ+ rights"]
    },
    watch_out:{
      all:["Cost of living rivals London and New York — particularly housing in Sydney and Melbourne","Immigration is very competitive — most pathways take 1–2+ years"],
      retiree:["No specific retiree visa — long-term stay requires permanent residency or family sponsorship"]
    }
  },

  // ── AMERICAS ─────────────────────────────────────────────────────────────────

  {
    code:"CA", name:"Canada", flag:"🇨🇦", iso_numeric:124,
    region:"North America", is_eu:false, is_schengen:false, currency:"CAD", capital:"Ottawa",
    lat:56.1, lng:-106.3,
    descriptor:"One of the world's most values-aligned destinations — Canada combines English and French, exceptional multiculturalism, world-class cities, and one of the most open skilled immigration systems globally.",
    dimension_scores:{economic_accessibility:5.6, visa_residency:6.4, safety_stability:9.0, healthcare_quality:8.6, digital_infrastructure:8.8, climate_match:5.4, social_cultural_fit:9.4, values_alignment:9.6, economic_opportunity:8.2, lifestyle_match:8.4},
    raw_data:{monthly_cost_usd:3200, ef_epi_score:68.0, gpi_score:1.363, ilga_lgbtq_score:90, rsf_press_freedom:85.2, ookla_mbps:175},
    visa_pathways:[
      {name:"Express Entry (Federal Skilled Worker)", eligible_for:["professional","employed"], min_income_usd:0, duration_months:0, renewable:false, leads_to_residency:true, residency_years:0, difficulty:3, processing_weeks:24, notes:"Points-based permanent residency. Invitations issued by score. Processing times have varied significantly."},
      {name:"Start-Up Visa", eligible_for:["founder"], min_income_usd:0, duration_months:0, renewable:false, leads_to_residency:true, residency_years:0, difficulty:3, processing_weeks:52, notes:"Requires designation from Canadian incubator, accelerator, or VC. Directly grants permanent residency."}
    ],
    cost_breakdown:{rent_1bed_capital:1600, rent_1bed_secondary:1100, groceries:380, dining_out_meal:20, transport:90, coworking:220, gym:55, health_insurance:0},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'required'},
    why_fit:{
      founder:["Start-Up Visa directly grants permanent residency for supported founders","Toronto and Vancouver have sophisticated, globally-connected tech ecosystems","Universal healthcare — no health insurance bill for residents"],
      remote_worker:["English-speaking — zero language barrier","Exceptional quality of life in cities like Vancouver, Montreal, and Toronto","World-class outdoor recreation from mountains to coastlines"],
      values_led:["Ranks near the top of every index: LGBTQ+ rights, press freedom, democracy, gender equality","Genuinely multicultural society — integration is built into the culture"],
      default:["English-speaking","World-leading values alignment","Universal healthcare"]
    },
    watch_out:{
      all:["Harsh winters — particularly in Ontario, Quebec, and the prairies","Housing costs in Vancouver and Toronto rival London and Sydney","Express Entry competition is intense — points thresholds have risen sharply"]
    }
  },

  {
    code:"CL", name:"Chile", flag:"🇨🇱", iso_numeric:152,
    region:"South America", is_eu:false, is_schengen:false, currency:"CLP", capital:"Santiago",
    lat:-35.7, lng:-71.5,
    descriptor:"South America's most economically stable country — Chile has the region's strongest institutions, a rapidly modernising capital, and spectacular natural geography from the Atacama to Patagonia.",
    dimension_scores:{economic_accessibility:7.6, visa_residency:7.4, safety_stability:7.2, healthcare_quality:7.4, digital_infrastructure:7.0, climate_match:7.2, social_cultural_fit:7.0, values_alignment:7.6, economic_opportunity:7.2, lifestyle_match:7.8},
    raw_data:{monthly_cost_usd:1900, ef_epi_score:60.0, gpi_score:1.818, ilga_lgbtq_score:68, rsf_press_freedom:66.4, ookla_mbps:78},
    visa_pathways:[
      {name:"Temporary Resident Visa", eligible_for:["remote_worker","freelancer","retiree","investor"], min_income_usd:1300, duration_months:12, renewable:true, leads_to_residency:true, residency_years:2, difficulty:2, processing_weeks:8, notes:"Fast path to permanent residency in just 2 years. Chile's immigration system is relatively functional."},
      {name:"Tech Visa / StartUp Chile", eligible_for:["founder"], min_income_usd:0, duration_months:12, renewable:true, leads_to_residency:true, residency_years:2, difficulty:2, processing_weeks:6, notes:"Government-backed accelerator programme with equity-free funding and residency. Highly regarded."}
    ],
    cost_breakdown:{rent_1bed_capital:950, rent_1bed_secondary:650, groceries:260, dining_out_meal:11, transport:35, coworking:140, gym:30, health_insurance:75},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'voa'},
    why_fit:{
      founder:["Start-Up Chile is one of the world's most respected government accelerator programmes","Santiago has South America's most sophisticated VC and tech ecosystem after Brazil","2-year path to permanent residency is fast by regional standards"],
      retiree:["Most stable political and economic environment in Latin America","Healthcare quality is the highest in South America","Santiago to Patagonia — extraordinary natural diversity within one country"],
      default:["Most stable economy in South America","Strong institutions and rule of law","Spectacular natural environment"]
    },
    watch_out:{
      all:["Santiago has significant air pollution trapped by surrounding mountains","Cost of living is higher than regional peers like Colombia or Argentina"],
      founder:["Outside Santiago, startup infrastructure is limited"]
    }
  },

  {
    code:"EC", name:"Ecuador", flag:"🇪🇨", iso_numeric:218,
    region:"South America", is_eu:false, is_schengen:false, currency:"USD", capital:"Quito",
    lat:-1.8, lng:-78.2,
    descriptor:"The world's most accessible digital nomad destination that almost nobody talks about — Ecuador uses the US dollar, has no capital gains tax, and Cuenca is one of the world's most celebrated expat cities.",
    dimension_scores:{economic_accessibility:9.2, visa_residency:8.0, safety_stability:5.8, healthcare_quality:6.2, digital_infrastructure:5.2, climate_match:7.8, social_cultural_fit:6.4, values_alignment:6.4, economic_opportunity:5.8, lifestyle_match:8.2},
    raw_data:{monthly_cost_usd:1300, ef_epi_score:54.0, gpi_score:2.051, ilga_lgbtq_score:51, rsf_press_freedom:56.4, ookla_mbps:42},
    visa_pathways:[
      {name:"Pensionado / Rentista Visa", eligible_for:["retiree","remote_worker"], min_income_usd:800, duration_months:24, renewable:true, leads_to_residency:true, residency_years:3, difficulty:1, processing_weeks:4, notes:"One of the world's lowest income thresholds for retirement. Uses USD — no currency risk. Very fast processing."},
      {name:"Digital Nomad Visa", eligible_for:["remote_worker","freelancer"], min_income_usd:1350, duration_months:12, renewable:true, leads_to_residency:false, residency_years:null, difficulty:1, processing_weeks:4, notes:"Low threshold, simple process. Cuenca is a celebrated expat destination with established communities."}
    ],
    cost_breakdown:{rent_1bed_capital:600, rent_1bed_secondary:400, groceries:180, dining_out_meal:6, transport:20, coworking:80, gym:20, health_insurance:50},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'free'},
    why_fit:{
      retiree:["Pensionado threshold of $800/month is among the world's lowest","USD currency — zero exchange rate risk for US-based retirees","Cuenca (altitude 2,500m) offers eternal spring climate — 18°C year-round"],
      remote_worker:["Very low cost of living with USD stability","Fast, simple digital nomad visa process","Galápagos Islands accessible for weekends"],
      default:["USD currency — no exchange risk","Very low income threshold for visas","Cuenca internationally acclaimed as an expat destination"]
    },
    watch_out:{
      all:["Security situation has deteriorated in some regions — research areas carefully","Internet infrastructure outside major cities is inconsistent"],
      retiree:["Healthcare is improving but still below Western standards outside Quito and Guayaquil"]
    }
  },

  {
    code:"PE", name:"Peru", flag:"🇵🇪", iso_numeric:604,
    region:"South America", is_eu:false, is_schengen:false, currency:"PEN", capital:"Lima",
    lat:-9.2, lng:-75.0,
    descriptor:"Home to one of the world's greatest cuisines and some of its most dramatic landscapes — Lima is South America's most underrated foodie capital, and Cusco and the Sacred Valley offer a completely different way of living.",
    dimension_scores:{economic_accessibility:9.4, visa_residency:7.8, safety_stability:5.8, healthcare_quality:6.0, digital_infrastructure:5.2, climate_match:7.4, social_cultural_fit:6.4, values_alignment:6.4, economic_opportunity:6.0, lifestyle_match:8.0},
    raw_data:{monthly_cost_usd:1200, ef_epi_score:54.0, gpi_score:2.044, ilga_lgbtq_score:47, rsf_press_freedom:58.3, ookla_mbps:44},
    visa_pathways:[
      {name:"Rentista / Pensionado Visa", eligible_for:["retiree","remote_worker"], min_income_usd:1000, duration_months:12, renewable:true, leads_to_residency:true, residency_years:3, difficulty:2, processing_weeks:6, notes:"Low income threshold and fast-track to permanent residency in 3 years."},
      {name:"Inversionista (Investor) Visa", eligible_for:["investor","founder"], min_income_usd:0, duration_months:12, renewable:true, leads_to_residency:true, residency_years:3, difficulty:2, processing_weeks:8, notes:"Requires business registration and proof of investment. Minimum ~$30,000 in registered capital."}
    ],
    cost_breakdown:{rent_1bed_capital:600, rent_1bed_secondary:380, groceries:170, dining_out_meal:6, transport:20, coworking:80, gym:20, health_insurance:50},
    visa_access:{us:'free', uk:'free', eu:'free', ca:'free', au_nz:'free', other_strong:'free', other:'free'},
    why_fit:{
      remote_worker:["Lima's Miraflores and Barranco neighbourhoods offer world-class food and coworking","Very low cost of living with good infrastructure in major cities","Peru has the most bio-diverse landscape on earth — incredible weekends"],
      retiree:["Low cost with one of the world's greatest food cultures as a daily backdrop","Sacred Valley and Cusco offer a spiritual and culturally rich alternative base","Affordable private healthcare in Lima"],
      default:["World-class cuisine","Very low cost","Extraordinary geographical diversity"]
    },
    watch_out:{
      all:["Political instability is chronic — presidents have been removed or resigned frequently","Safety in parts of Lima and rural areas requires vigilance"],
      retiree:["Healthcare outside Lima is limited — Cusco has altitude considerations for older visitors"]
    }
  }

); // end COUNTRIES.push
