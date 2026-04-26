import { Country, DimensionKey } from '../schema/country';

export const LIFE_STAGE_WEIGHTS: Record<string, Record<DimensionKey, number>> = {
  founder: { cost: 0.10, visaEase: 0.15, safety: 0.08, healthcare: 0.05, digitalInfra: 0.15, climate: 0.08, english: 0.10, lgbtqSafety: 0.08, techEcosystem: 0.15, naturalEnvironment: 0.06 },
  remoteEmployee: { cost: 0.15, visaEase: 0.15, safety: 0.10, healthcare: 0.08, digitalInfra: 0.18, climate: 0.08, english: 0.08, lgbtqSafety: 0.08, techEcosystem: 0.08, naturalEnvironment: 0.02 },
  freelancer: { cost: 0.18, visaEase: 0.15, safety: 0.10, healthcare: 0.05, digitalInfra: 0.15, climate: 0.08, english: 0.10, lgbtqSafety: 0.08, techEcosystem: 0.10, naturalEnvironment: 0.01 },
  localEmployee: { cost: 0.12, visaEase: 0.20, safety: 0.12, healthcare: 0.10, digitalInfra: 0.05, climate: 0.10, english: 0.10, lgbtqSafety: 0.08, techEcosystem: 0.10, naturalEnvironment: 0.03 },
  student: { cost: 0.25, visaEase: 0.15, safety: 0.10, healthcare: 0.05, digitalInfra: 0.10, climate: 0.05, english: 0.15, lgbtqSafety: 0.10, techEcosystem: 0.02, naturalEnvironment: 0.03 },
  semiRetired: { cost: 0.18, visaEase: 0.15, safety: 0.15, healthcare: 0.18, digitalInfra: 0.05, climate: 0.12, english: 0.07, lgbtqSafety: 0.05, techEcosystem: 0.02, naturalEnvironment: 0.03 },
  retired: { cost: 0.20, visaEase: 0.15, safety: 0.15, healthcare: 0.20, digitalInfra: 0.03, climate: 0.12, english: 0.07, lgbtqSafety: 0.05, techEcosystem: 0.02, naturalEnvironment: 0.01 },
};

export const COUNTRIES: Country[] = [
  {
    name: "Portugal", iso2: "PT", iso3: "PRT", region: "Europe", subregion: "Southern Europe",
    languages: ["Portuguese"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "A sun-drenched Atlantic nation where old-world charm meets modern digital infrastructure.",
    dimensions: { cost: 5.7, safety: 8.6, healthcare: 7.2, visaEase: 8, digitalInfra: 5.7, climate: 6.7, english: 4.8, lgbtqSafety: 8.3, techEcosystem: 7.1, naturalEnvironment: 5.2 },
    costBreakdown: { rentUsd: 1350, groceriesUsd: 280, transportUsd: 42, utilitiesUsd: 120, diningOutUsd: 280, healthInsuranceUsd: 90, totalEstimateUsd: 2162 },
    cities: ["Lisbon", "Porto", "Lagos"],
    rawIndicators: { summerHighC: 28, winterLowC: 8, humidityAvg: 65, airQualityIndex: 35, seismicZone: 3, internetReliability: 8.5, englishDailyLife: 7.2, stability: 8.8, authoritarianRisk: 1.5, corruptionRisk: 2.1 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Mexico", iso2: "MX", iso3: "MEX", region: "Americas", subregion: "North America",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A vast, diverse nation offering world-class culture, cuisine, and increasingly sophisticated expat infrastructure.",
    dimensions: { cost: 7.4, safety: 5.2, healthcare: 6.4, visaEase: 4.5, digitalInfra: 4.8, climate: 6.1, english: 4.4, lgbtqSafety: 6.1, techEcosystem: 7.4, naturalEnvironment: 4.5 },
    costBreakdown: { rentUsd: 900, groceriesUsd: 200, transportUsd: 30, utilitiesUsd: 80, diningOutUsd: 160, healthInsuranceUsd: 70, totalEstimateUsd: 1440 },
    cities: ["Mexico City", "Playa del Carmen", "Oaxaca"],
    rawIndicators: { summerHighC: 27, winterLowC: 6, humidityAvg: 50, airQualityIndex: 120, seismicZone: 4, internetReliability: 7.2, englishDailyLife: 5.5, stability: 6.5, authoritarianRisk: 4.2, corruptionRisk: 6.8 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Switzerland", iso2: "CH", iso3: "CHE", region: "Europe", subregion: "Western Europe",
    languages: ["German", "French", "Italian", "Romansh"], euMember: false, schengen: true, commonwealth: false,
    descriptor: "The world's most stable and prosperous small nation — impeccable infrastructure and exceptional healthcare.",
    dimensions: { cost: 2.1, safety: 9.4, healthcare: 9.6, visaEase: 2.5, digitalInfra: 8.7, climate: 5.1, english: 5.6, lgbtqSafety: 9.2, techEcosystem: 9.3, naturalEnvironment: 6.2 },
    costBreakdown: { rentUsd: 2900, groceriesUsd: 700, transportUsd: 90, utilitiesUsd: 300, diningOutUsd: 700, healthInsuranceUsd: 400, totalEstimateUsd: 5090 },
    cities: ["Zurich", "Geneva", "Basel"],
    rawIndicators: { summerHighC: 24, winterLowC: -2, humidityAvg: 70, airQualityIndex: 25, seismicZone: 2, internetReliability: 9.8, englishDailyLife: 8.1, stability: 9.9, authoritarianRisk: 0.5, corruptionRisk: 0.8 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Thailand", iso2: "TH", iso3: "THA", region: "Asia", subregion: "Southeast Asia",
    languages: ["Thai"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "Asia's premier expat destination, now with marriage equality alongside exceptional value, world-class food, and warm culture.",
    dimensions: { cost: 8.2, safety: 6.8, healthcare: 7.6, visaEase: 8, digitalInfra: 6.1, climate: 4, english: 4.2, lgbtqSafety: 7.0, techEcosystem: 5.8, naturalEnvironment: 6.9 },
    costBreakdown: { rentUsd: 650, groceriesUsd: 200, transportUsd: 30, utilitiesUsd: 60, diningOutUsd: 150, healthInsuranceUsd: 60, totalEstimateUsd: 1150 },
    cities: ["Bangkok", "Chiang Mai", "Phuket"],
    rawIndicators: { summerHighC: 35, winterLowC: 21, humidityAvg: 75, airQualityIndex: 110, seismicZone: 1, internetReliability: 8.8, englishDailyLife: 4.8, stability: 5.5, authoritarianRisk: 6.2, corruptionRisk: 5.8 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Estonia", iso2: "EE", iso3: "EST", region: "Europe", subregion: "Northern Europe",
    languages: ["Estonian"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "A digitally advanced EU nation with marriage equality, deep e-government infrastructure, and strong founder appeal.",
    dimensions: { cost: 7.2, safety: 8.6, healthcare: 7.4, visaEase: 3.5, digitalInfra: 9.1, climate: 2.3, english: 5.4, lgbtqSafety: 8.8, techEcosystem: 9, naturalEnvironment: 2.1 },
    costBreakdown: { rentUsd: 800, groceriesUsd: 250, transportUsd: 30, utilitiesUsd: 150, diningOutUsd: 240, healthInsuranceUsd: 50, totalEstimateUsd: 1520 },
    cities: ["Tallinn", "Tartu"],
    rawIndicators: { summerHighC: 21, winterLowC: -8, humidityAvg: 80, airQualityIndex: 15, seismicZone: 0, internetReliability: 9.9, englishDailyLife: 8.5, stability: 9.1, authoritarianRisk: 1.2, corruptionRisk: 1.5 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Spain", iso2: "ES", iso3: "ESP", region: "Europe", subregion: "Southern Europe",
    languages: ["Spanish"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "A world leader in lifestyle quality, with exceptional high-speed rail and diverse regional cultures.",
    dimensions: { cost: 5.2, safety: 8.2, healthcare: 8.8, visaEase: 8, digitalInfra: 7.4, climate: 7.2, english: 4.2, lgbtqSafety: 8.9, techEcosystem: 7.8, naturalEnvironment: 5 },
    costBreakdown: { rentUsd: 1400, groceriesUsd: 300, transportUsd: 50, utilitiesUsd: 130, diningOutUsd: 300, healthInsuranceUsd: 100, totalEstimateUsd: 2280 },
    cities: ["Madrid", "Barcelona", "Valencia", "Malaga"],
    rawIndicators: { summerHighC: 32, winterLowC: 5, humidityAvg: 55, airQualityIndex: 40, seismicZone: 2, internetReliability: 9.2, englishDailyLife: 6.2, stability: 8.4, authoritarianRisk: 1.8, corruptionRisk: 2.8 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Netherlands", iso2: "NL", iso3: "NLD", region: "Europe", subregion: "Western Europe",
    languages: ["Dutch", "English"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "The highest English proficiency for a non-native country, combined with world-class design and infrastructure.",
    dimensions: { cost: 3.7, safety: 8.8, healthcare: 8.2, visaEase: 6, digitalInfra: 9.4, climate: 2.8, english: 9.7, lgbtqSafety: 9.4, techEcosystem: 8.5, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 2100, groceriesUsd: 400, transportUsd: 80, utilitiesUsd: 200, diningOutUsd: 400, healthInsuranceUsd: 150, totalEstimateUsd: 3330 },
    cities: ["Amsterdam", "Rotterdam", "Utrecht", "The Hague"],
    rawIndicators: { summerHighC: 22, winterLowC: 1, humidityAvg: 80, airQualityIndex: 30, seismicZone: 1, internetReliability: 9.8, englishDailyLife: 9.8, stability: 9.5, authoritarianRisk: 0.8, corruptionRisk: 1.1 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "United Arab Emirates", iso2: "AE", iso3: "ARE", region: "Asia", subregion: "Western Asia",
    languages: ["Arabic", "English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A global hub for finance and technology with zero personal income tax and ultra-modern cities.",
    dimensions: { cost: 3.1, safety: 5.5, healthcare: 7.8, visaEase: 6.5, digitalInfra: 9.7, climate: 1.5, english: 6.1, lgbtqSafety: 2.1, techEcosystem: 8.8, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 2200, groceriesUsd: 450, transportUsd: 70, utilitiesUsd: 250, diningOutUsd: 500, healthInsuranceUsd: 120, totalEstimateUsd: 3590 },
    cities: ["Dubai", "Abu Dhabi"],
    rawIndicators: { summerHighC: 41, winterLowC: 14, humidityAvg: 60, airQualityIndex: 140, seismicZone: 1, internetReliability: 9.9, englishDailyLife: 9.2, stability: 9.1, authoritarianRisk: 7.5, corruptionRisk: 3.2 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Vietnam", iso2: "VN", iso3: "VNM", region: "Asia", subregion: "Southeast Asia",
    languages: ["Vietnamese"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "Extraordinary value, rapid growth, and a world-renowned culinary scene.",
    dimensions: { cost: 8.9, safety: 5.5, healthcare: 4.8, visaEase: 5, digitalInfra: 5.6, climate: 3.8, english: 3.3, lgbtqSafety: 4.5, techEcosystem: 6.2, naturalEnvironment: 5.9 },
    costBreakdown: { rentUsd: 550, groceriesUsd: 180, transportUsd: 25, utilitiesUsd: 50, diningOutUsd: 120, healthInsuranceUsd: 40, totalEstimateUsd: 965 },
    cities: ["Ho Chi Minh City", "Hanoi", "Da Nang"],
    rawIndicators: { summerHighC: 33, winterLowC: 15, humidityAvg: 80, airQualityIndex: 150, seismicZone: 1, internetReliability: 8.2, englishDailyLife: 4.2, stability: 8.5, authoritarianRisk: 7.8, corruptionRisk: 6.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-21"
  },
  {
    name: "Colombia", iso2: "CO", iso3: "COL", region: "Americas", subregion: "South America",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "Biodiversity and cultural vibrancy, with Medellín emerging as a top global hub for digital nomads.",
    dimensions: { cost: 8.2, safety: 4.2, healthcare: 7.4, visaEase: 8.5, digitalInfra: 5.1, climate: 7.5, english: 2.7, lgbtqSafety: 6.4, techEcosystem: 6.8, naturalEnvironment: 8.5 },
    costBreakdown: { rentUsd: 650, groceriesUsd: 200, transportUsd: 30, utilitiesUsd: 60, diningOutUsd: 150, healthInsuranceUsd: 60, totalEstimateUsd: 1150 },
    cities: ["Medellin", "Bogota", "Cartagena"],
    rawIndicators: { summerHighC: 28, winterLowC: 7, humidityAvg: 70, airQualityIndex: 60, seismicZone: 4, internetReliability: 7.8, englishDailyLife: 4.1, stability: 6.2, authoritarianRisk: 3.8, corruptionRisk: 6.5 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Czech Republic", iso2: "CZ", iso3: "CZE", region: "Europe", subregion: "Eastern Europe",
    languages: ["Czech"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "The heart of Europe, combining historic beauty with high safety and a strong manufacturing and tech base.",
    dimensions: { cost: 6.1, safety: 9.2, healthcare: 8.1, visaEase: 6.9, digitalInfra: 7.7, climate: 3.8, english: 5.1, lgbtqSafety: 7, techEcosystem: 7.6, naturalEnvironment: 2.7 },
    costBreakdown: { rentUsd: 1100, groceriesUsd: 300, transportUsd: 35, utilitiesUsd: 180, diningOutUsd: 250, healthInsuranceUsd: 80, totalEstimateUsd: 1945 },
    cities: ["Prague", "Brno", "Ostrava"],
    rawIndicators: { summerHighC: 25, winterLowC: -3, humidityAvg: 65, airQualityIndex: 45, seismicZone: 1, internetReliability: 9.1, englishDailyLife: 7.2, stability: 9.2, authoritarianRisk: 2.1, corruptionRisk: 3.8 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Greece", iso2: "GR", iso3: "GRC", region: "Europe", subregion: "Southern Europe",
    languages: ["Greek"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "The cradle of Western civilisation, pairing marriage equality with an unmatched Mediterranean lifestyle and islands for every pace of life.",
    dimensions: { cost: 6.7, safety: 7.8, healthcare: 7.1, visaEase: 6.4, digitalInfra: 4.9, climate: 7.8, english: 5.6, lgbtqSafety: 8.5, techEcosystem: 6.1, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 850, groceriesUsd: 280, transportUsd: 40, utilitiesUsd: 150, diningOutUsd: 280, healthInsuranceUsd: 70, totalEstimateUsd: 1670 },
    cities: ["Athens", "Thessaloniki", "Chania", "Heraklion"],
    rawIndicators: { summerHighC: 33, winterLowC: 7, humidityAvg: 50, airQualityIndex: 55, seismicZone: 4, internetReliability: 7.5, englishDailyLife: 7.8, stability: 7.8, authoritarianRisk: 2.5, corruptionRisk: 4.8 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Costa Rica", iso2: "CR", iso3: "CRI", region: "Americas", subregion: "Central America",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "Pura Vida: a global leader in environmental sustainability and peaceful, democratic living.",
    dimensions: { cost: 6.2, safety: 7.1, healthcare: 7.2, visaEase: 7.4, digitalInfra: 5.6, climate: 6.9, english: 4.9, lgbtqSafety: 8.1, techEcosystem: 5.4, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 1100, groceriesUsd: 300, transportUsd: 45, utilitiesUsd: 90, diningOutUsd: 220, healthInsuranceUsd: 100, totalEstimateUsd: 1855 },
    cities: ["San Jose", "Tamarindo", "Escazu"],
    rawIndicators: { summerHighC: 28, winterLowC: 18, humidityAvg: 75, airQualityIndex: 30, seismicZone: 4, internetReliability: 8.1, englishDailyLife: 6.8, stability: 8.8, authoritarianRisk: 1.2, corruptionRisk: 2.5 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Uruguay", iso2: "UY", iso3: "URY", region: "Americas", subregion: "South America",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The 'Switzerland of South America' — progressive, stable, and socially liberal.",
    dimensions: { cost: 5.9, safety: 7.6, healthcare: 7.4, visaEase: 8.5, digitalInfra: 7.3, climate: 5.9, english: 4, lgbtqSafety: 8.8, techEcosystem: 7.2, naturalEnvironment: 3.7 },
    costBreakdown: { rentUsd: 1200, groceriesUsd: 350, transportUsd: 60, utilitiesUsd: 140, diningOutUsd: 300, healthInsuranceUsd: 90, totalEstimateUsd: 2140 },
    cities: ["Montevideo", "Punta del Este", "Colonia del Sacramento"],
    rawIndicators: { summerHighC: 28, winterLowC: 7, humidityAvg: 70, airQualityIndex: 20, seismicZone: 0, internetReliability: 9.2, englishDailyLife: 5.8, stability: 9.2, authoritarianRisk: 1.1, corruptionRisk: 1.8 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Japan", iso2: "JP", iso3: "JPN", region: "Asia", subregion: "Eastern Asia",
    languages: ["Japanese"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A perfect fusion of ultra-modern technology and timeless tradition, with world-class safety and service.",
    dimensions: { cost: 3.9, safety: 9.8, healthcare: 9.2, visaEase: 7, digitalInfra: 9.1, climate: 4.7, english: 2.6, lgbtqSafety: 7.2, techEcosystem: 7.8, naturalEnvironment: 5.5 },
    costBreakdown: { rentUsd: 1800, groceriesUsd: 500, transportUsd: 120, utilitiesUsd: 220, diningOutUsd: 450, healthInsuranceUsd: 150, totalEstimateUsd: 3240 },
    cities: ["Tokyo", "Osaka", "Kyoto", "Fukuoka"],
    rawIndicators: { summerHighC: 31, winterLowC: 1, humidityAvg: 65, airQualityIndex: 35, seismicZone: 5, internetReliability: 9.8, englishDailyLife: 4.5, stability: 9.6, authoritarianRisk: 1.2, corruptionRisk: 1.5 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Georgia", iso2: "GE", iso3: "GEO", region: "Asia", subregion: "Western Asia",
    languages: ["Georgian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A mountain-ringed nation at the crossroads of Europe and Asia, famous for its hospitality and liberal business climate.",
    dimensions: { cost: 7.7, safety: 8.4, healthcare: 5.1, visaEase: 9.7, digitalInfra: 6.1, climate: 5.1, english: 4, lgbtqSafety: 3.8, techEcosystem: 6.4, naturalEnvironment: 7.7 },
    costBreakdown: { rentUsd: 750, groceriesUsd: 220, transportUsd: 20, utilitiesUsd: 70, diningOutUsd: 180, healthInsuranceUsd: 50, totalEstimateUsd: 1290 },
    cities: ["Tbilisi", "Batumi", "Kutaisi"],
    rawIndicators: { summerHighC: 31, winterLowC: 1, humidityAvg: 60, airQualityIndex: 70, seismicZone: 4, internetReliability: 8.2, englishDailyLife: 6.1, stability: 7.2, authoritarianRisk: 4.8, corruptionRisk: 4.2 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Panama", iso2: "PA", iso3: "PAN", region: "Americas", subregion: "Central America",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The 'Hub of the Americas' — a global financial centre with tropical rain forests and a friendly tax regime.",
    dimensions: { cost: 5.3, safety: 7.4, healthcare: 7.1, visaEase: 8.3, digitalInfra: 7.4, climate: 5.1, english: 4.4, lgbtqSafety: 6.2, techEcosystem: 6.1, naturalEnvironment: 6.2 },
    costBreakdown: { rentUsd: 1400, groceriesUsd: 350, transportUsd: 40, utilitiesUsd: 110, diningOutUsd: 250, healthInsuranceUsd: 90, totalEstimateUsd: 2240 },
    cities: ["Panama City", "Boquete", "Coronado"],
    rawIndicators: { summerHighC: 32, winterLowC: 23, humidityAvg: 80, airQualityIndex: 30, seismicZone: 3, internetReliability: 8.8, englishDailyLife: 6.5, stability: 8.2, authoritarianRisk: 2.5, corruptionRisk: 5.2 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Croatia", iso2: "HR", iso3: "HRV", region: "Europe", subregion: "Southern Europe",
    languages: ["Croatian"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "A Mediterranean gem with a stunning coastline, rich history, and a growing community of digital nomads.",
    dimensions: { cost: 6.4, safety: 9.1, healthcare: 7.4, visaEase: 7.5, digitalInfra: 6.9, climate: 6.7, english: 5.4, lgbtqSafety: 6.8, techEcosystem: 5.8, naturalEnvironment: 7.7 },
    costBreakdown: { rentUsd: 950, groceriesUsd: 300, transportUsd: 45, utilitiesUsd: 140, diningOutUsd: 220, healthInsuranceUsd: 70, totalEstimateUsd: 1725 },
    cities: ["Zagreb", "Split", "Zadar", "Dubrovnik"],
    rawIndicators: { summerHighC: 28, winterLowC: 0, humidityAvg: 60, airQualityIndex: 35, seismicZone: 4, internetReliability: 8.5, englishDailyLife: 7.5, stability: 8.9, authoritarianRisk: 1.8, corruptionRisk: 4.1 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Singapore", iso2: "SG", iso3: "SGP", region: "Asia", subregion: "Southeast Asia",
    languages: ["English", "Mandarin", "Malay", "Tamil"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "The world's safest and most efficient city-state — a hyper-connected global financial hub.",
    dimensions: { cost: 1.8, safety: 9.9, healthcare: 9.6, visaEase: 4, digitalInfra: 9.9, climate: 2.7, english: 9.4, lgbtqSafety: 5.1, techEcosystem: 9.8, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 3500, groceriesUsd: 600, transportUsd: 100, utilitiesUsd: 200, diningOutUsd: 600, healthInsuranceUsd: 250, totalEstimateUsd: 5250 },
    cities: ["Singapore", "Sentosa Island"],
    rawIndicators: { summerHighC: 32, winterLowC: 24, humidityAvg: 80, airQualityIndex: 45, seismicZone: 0, internetReliability: 9.9, englishDailyLife: 9.8, stability: 9.8, authoritarianRisk: 4.5, corruptionRisk: 0.5 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "South Africa", iso2: "ZA", iso3: "ZAF", region: "Africa", subregion: "Southern Africa",
    languages: ["English", "Afrikaans", "Xhosa", "Zulu"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "The 'Rainbow Nation' — offering incredible wildlife, world-class cities, and exceptional value for high-budget expats.",
    dimensions: { cost: 6.1, safety: 3.1, healthcare: 6.8, visaEase: 4.9, digitalInfra: 6, climate: 7.8, english: 8.8, lgbtqSafety: 8.4, techEcosystem: 7.4, naturalEnvironment: 9.6 },
    costBreakdown: { rentUsd: 1100, groceriesUsd: 320, transportUsd: 60, utilitiesUsd: 130, diningOutUsd: 280, healthInsuranceUsd: 150, totalEstimateUsd: 2040 },
    cities: ["Cape Town", "Johannesburg", "Durban"],
    rawIndicators: { summerHighC: 26, winterLowC: 7, humidityAvg: 60, airQualityIndex: 50, seismicZone: 1, internetReliability: 7.5, englishDailyLife: 9.5, stability: 5.8, authoritarianRisk: 2.8, corruptionRisk: 7.2 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Malta", iso2: "MT", iso3: "MLT", region: "Europe", subregion: "Southern Europe",
    languages: ["Maltese", "English"], euMember: true, schengen: true, commonwealth: true,
    descriptor: "An island fortress in the Mediterranean with a warm climate, English as an official language, and a booming iGaming and tech sector.",
    dimensions: { cost: 5.2, safety: 8.6, healthcare: 7.6, visaEase: 6.1, digitalInfra: 7.3, climate: 7.5, english: 8.7, lgbtqSafety: 9.8, techEcosystem: 7.1, naturalEnvironment: 2.7 },
    costBreakdown: { rentUsd: 1350, groceriesUsd: 350, transportUsd: 35, utilitiesUsd: 110, diningOutUsd: 350, healthInsuranceUsd: 90, totalEstimateUsd: 2285 },
    cities: ["Valletta", "Sliema", "St. Julian's"],
    rawIndicators: { summerHighC: 31, winterLowC: 9, humidityAvg: 70, airQualityIndex: 40, seismicZone: 2, internetReliability: 9.2, englishDailyLife: 9.5, stability: 9.1, authoritarianRisk: 1.5, corruptionRisk: 3.5 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Philippines", iso2: "PH", iso3: "PHL", region: "Asia", subregion: "Southeast Asia",
    languages: ["Filipino", "English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "Archipelagic beauty with legendary hospitality and widespread English proficiency.",
    dimensions: { cost: 8.2, safety: 5.4, healthcare: 5.1, visaEase: 6, digitalInfra: 4.8, climate: 4, english: 8.3, lgbtqSafety: 6.2, techEcosystem: 5.8, naturalEnvironment: 8.5 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 220, transportUsd: 30, utilitiesUsd: 80, diningOutUsd: 150, healthInsuranceUsd: 60, totalEstimateUsd: 1140 },
    cities: ["Manila", "Cebu City", "Davao City"],
    rawIndicators: { summerHighC: 33, winterLowC: 23, humidityAvg: 80, airQualityIndex: 80, seismicZone: 5, internetReliability: 7.2, englishDailyLife: 9.1, stability: 6.8, authoritarianRisk: 5.2, corruptionRisk: 6.8 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Brazil", iso2: "BR", iso3: "BRA", region: "Americas", subregion: "South America",
    languages: ["Portuguese"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A continental giant with unmatched cultural energy, biodiversity, and a growing digital ecosystem.",
    dimensions: { cost: 7.4, safety: 4.8, healthcare: 6.4, visaEase: 8, digitalInfra: 6.4, climate: 7.8, english: 2.7, lgbtqSafety: 7.4, techEcosystem: 8.2, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 800, groceriesUsd: 250, transportUsd: 40, utilitiesUsd: 90, diningOutUsd: 200, healthInsuranceUsd: 80, totalEstimateUsd: 1460 },
    cities: ["Sao Paulo", "Rio de Janeiro", "Florianopolis"],
    rawIndicators: { summerHighC: 30, winterLowC: 13, humidityAvg: 75, airQualityIndex: 65, seismicZone: 0, internetReliability: 8.5, englishDailyLife: 4.5, stability: 7.5, authoritarianRisk: 3.5, corruptionRisk: 6.1 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Germany", iso2: "DE", iso3: "DEU", region: "Europe", subregion: "Western Europe",
    languages: ["German"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "Europe's economic engine, offering exceptional stability, social security, and a powerhouse of innovation.",
    dimensions: { cost: 4.3, safety: 8.8, healthcare: 9.1, visaEase: 4.5, digitalInfra: 6.9, climate: 3.4, english: 6.4, lgbtqSafety: 9.1, techEcosystem: 9.4, naturalEnvironment: 3.4 },
    costBreakdown: { rentUsd: 1600, groceriesUsd: 350, transportUsd: 70, utilitiesUsd: 250, diningOutUsd: 350, healthInsuranceUsd: 300, totalEstimateUsd: 2920 },
    cities: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
    rawIndicators: { summerHighC: 24, winterLowC: -2, humidityAvg: 70, airQualityIndex: 30, seismicZone: 1, internetReliability: 9.1, englishDailyLife: 8.2, stability: 9.4, authoritarianRisk: 1.1, corruptionRisk: 1.5 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "France", iso2: "FR", iso3: "FRA", region: "Europe", subregion: "Western Europe",
    languages: ["French"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "A nation of extraordinary cultural depth, world-class healthcare, and an unmatched quality of life.",
    dimensions: { cost: 4.7, safety: 7.8, healthcare: 9.2, visaEase: 7.5, digitalInfra: 7.7, climate: 5.4, english: 4.5, lgbtqSafety: 8.0, techEcosystem: 8.0, naturalEnvironment: 5.9 },
    costBreakdown: { rentUsd: 1600, groceriesUsd: 280, transportUsd: 75, utilitiesUsd: 150, diningOutUsd: 320, healthInsuranceUsd: 100, totalEstimateUsd: 2525 },
    cities: ["Paris", "Lyon", "Marseille", "Nice"],
    rawIndicators: { summerHighC: 25, winterLowC: 2, humidityAvg: 70, airQualityIndex: 35, seismicZone: 2, internetReliability: 9.4, englishDailyLife: 6.5, stability: 8.8, authoritarianRisk: 1.5, corruptionRisk: 2.1 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Italy", iso2: "IT", iso3: "ITA", region: "Europe", subregion: "Southern Europe",
    languages: ["Italian"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "Unmatched beauty, food, and history — offering a lifestyle that prioritises pleasure and family.",
    dimensions: { cost: 5.6, safety: 8.0, healthcare: 8.6, visaEase: 7, digitalInfra: 6.6, climate: 6.9, english: 4.2, lgbtqSafety: 7.1, techEcosystem: 6.6, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 1400, groceriesUsd: 250, transportUsd: 45, utilitiesUsd: 160, diningOutUsd: 240, healthInsuranceUsd: 90, totalEstimateUsd: 2185 },
    cities: ["Rome", "Milan", "Florence", "Naples"],
    rawIndicators: { summerHighC: 31, winterLowC: 2, humidityAvg: 65, airQualityIndex: 50, seismicZone: 4, internetReliability: 8.8, englishDailyLife: 6.2, stability: 8.1, authoritarianRisk: 2.1, corruptionRisk: 4.5 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Romania", iso2: "RO", iso3: "ROU", region: "Europe", subregion: "Eastern Europe",
    languages: ["Romanian"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "Eastern Europe's hidden gem with some of the fastest internet in the EU and exceptional value.",
    dimensions: { cost: 7.8, safety: 7.8, healthcare: 7.0, visaEase: 6.1, digitalInfra: 8.3, climate: 4, english: 5, lgbtqSafety: 4.3, techEcosystem: 7.4, naturalEnvironment: 2.4 },
    costBreakdown: { rentUsd: 700, groceriesUsd: 200, transportUsd: 25, utilitiesUsd: 120, diningOutUsd: 160, healthInsuranceUsd: 55, totalEstimateUsd: 1260 },
    cities: ["Bucharest", "Cluj-Napoca", "Timisoara"],
    rawIndicators: { summerHighC: 30, winterLowC: -5, humidityAvg: 65, airQualityIndex: 75, seismicZone: 4, internetReliability: 9.6, englishDailyLife: 7.4, stability: 8.2, authoritarianRisk: 2.8, corruptionRisk: 5.8 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Poland", iso2: "PL", iso3: "POL", region: "Europe", subregion: "Central Europe",
    languages: ["Polish"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "A dynamic, rapidly modernising nation with a powerhouse economy and high quality of life.",
    dimensions: { cost: 7.4, safety: 8.2, healthcare: 7.4, visaEase: 5.9, digitalInfra: 7.4, climate: 3.2, english: 5.2, lgbtqSafety: 4.4, techEcosystem: 7.8, naturalEnvironment: 2.7 },
    costBreakdown: { rentUsd: 800, groceriesUsd: 220, transportUsd: 35, utilitiesUsd: 140, diningOutUsd: 180, healthInsuranceUsd: 60, totalEstimateUsd: 1435 },
    cities: ["Warsaw", "Krakow", "Wroclaw", "Gdansk"],
    rawIndicators: { summerHighC: 24, winterLowC: -4, humidityAvg: 75, airQualityIndex: 65, seismicZone: 1, internetReliability: 9.2, englishDailyLife: 7.8, stability: 8.5, authoritarianRisk: 3.2, corruptionRisk: 3.5 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Montenegro", iso2: "ME", iso3: "MNE", region: "Europe", subregion: "Balkans",
    languages: ["Montenegrin"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A stunning Adriatic coastline meets rugged mountains in one of Europe's most accessible non-EU bases.",
    dimensions: { cost: 8, safety: 7.8, healthcare: 6.4, visaEase: 7.2, digitalInfra: 4.4, climate: 6.4, english: 4.4, lgbtqSafety: 6.5, techEcosystem: 6.2, naturalEnvironment: 4.5 },
    costBreakdown: { rentUsd: 650, groceriesUsd: 200, transportUsd: 25, utilitiesUsd: 100, diningOutUsd: 180, healthInsuranceUsd: 60, totalEstimateUsd: 1215 },
    cities: ["Podgorica", "Kotor", "Budva"],
    rawIndicators: { summerHighC: 32, winterLowC: 1, humidityAvg: 60, airQualityIndex: 30, seismicZone: 4, internetReliability: 7.1, englishDailyLife: 6.8, stability: 7.8, authoritarianRisk: 3.5, corruptionRisk: 5.5 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Serbia", iso2: "RS", iso3: "SRB", region: "Europe", subregion: "Balkans",
    languages: ["Serbian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A vibrant cultural crossroads with a booming tech scene and some of the lowest costs in Europe.",
    dimensions: { cost: 8.3, safety: 7.4, healthcare: 7.0, visaEase: 7.5, digitalInfra: 6.1, climate: 4.7, english: 4.6, lgbtqSafety: 4.7, techEcosystem: 6.8, naturalEnvironment: 3 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 190, transportUsd: 25, utilitiesUsd: 110, diningOutUsd: 160, healthInsuranceUsd: 50, totalEstimateUsd: 1135 },
    cities: ["Belgrade", "Novi Sad", "Nis"],
    rawIndicators: { summerHighC: 29, winterLowC: -2, humidityAvg: 65, airQualityIndex: 85, seismicZone: 3, internetReliability: 8.4, englishDailyLife: 7.2, stability: 7.1, authoritarianRisk: 5.5, corruptionRisk: 6.2 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Argentina", iso2: "AR", iso3: "ARG", region: "Americas", subregion: "South America",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "South America's most European culture, with world-class cities and extraordinary natural variety.",
    dimensions: { cost: 8.6, safety: 6.2, healthcare: 7.2, visaEase: 7.5, digitalInfra: 5.1, climate: 5.4, english: 4.6, lgbtqSafety: 7.4, techEcosystem: 5.8, naturalEnvironment: 5 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 90, diningOutUsd: 120, healthInsuranceUsd: 50, totalEstimateUsd: 1060 },
    cities: ["Buenos Aires", "Cordoba", "Mendoza", "Rosario"],
    rawIndicators: { summerHighC: 29, winterLowC: 8, humidityAvg: 65, airQualityIndex: 40, seismicZone: 3, internetReliability: 7.8, englishDailyLife: 6.8, stability: 6.1, authoritarianRisk: 3.2, corruptionRisk: 5.8 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Indonesia", iso2: "ID", iso3: "IDN", region: "Asia", subregion: "Southeast Asia",
    languages: ["Indonesian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The heart of digital nomad culture in Bali, offering tropical paradise at an unbeatable price.",
    dimensions: { cost: 8.6, safety: 6.6, healthcare: 5.6, visaEase: 6, digitalInfra: 3.5, climate: 4.9, english: 3.7, lgbtqSafety: 1.3, techEcosystem: 5.8, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 180, transportUsd: 25, utilitiesUsd: 90, diningOutUsd: 100, healthInsuranceUsd: 55, totalEstimateUsd: 1050 },
    cities: ["Canggu", "Ubud", "Jakarta", "Seminyak"],
    rawIndicators: { summerHighC: 31, winterLowC: 22, humidityAvg: 80, airQualityIndex: 90, seismicZone: 5, internetReliability: 6.5, englishDailyLife: 6.2, stability: 7.8, authoritarianRisk: 4.8, corruptionRisk: 6.5 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Malaysia", iso2: "MY", iso3: "MYS", region: "Asia", subregion: "Southeast Asia",
    languages: ["Malay", "English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A hyper-modern tropical hub with English as a working language and exceptional infrastructure.",
    dimensions: { cost: 8, safety: 7.6, healthcare: 7.4, visaEase: 8, digitalInfra: 6.9, climate: 4, english: 5, lgbtqSafety: 1.0, techEcosystem: 7.8, naturalEnvironment: 3.7 },
    costBreakdown: { rentUsd: 700, groceriesUsd: 200, transportUsd: 35, utilitiesUsd: 110, diningOutUsd: 100, healthInsuranceUsd: 60, totalEstimateUsd: 1205 },
    cities: ["Kuala Lumpur", "Penang", "Johor Bahru"],
    rawIndicators: { summerHighC: 33, winterLowC: 23, humidityAvg: 80, airQualityIndex: 60, seismicZone: 1, internetReliability: 8.8, englishDailyLife: 8.8, stability: 8.2, authoritarianRisk: 5.8, corruptionRisk: 5.1 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "South Korea", iso2: "KR", iso3: "KOR", region: "Asia", subregion: "Eastern Asia",
    languages: ["Korean"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The world's most wired country, offering hyper-efficiency and a dynamic creative culture.",
    dimensions: { cost: 6.1, safety: 8.4, healthcare: 9.2, visaEase: 7, digitalInfra: 9.7, climate: 4, english: 5.2, lgbtqSafety: 4.2, techEcosystem: 8.4, naturalEnvironment: 5 },
    costBreakdown: { rentUsd: 1200, groceriesUsd: 320, transportUsd: 50, utilitiesUsd: 180, diningOutUsd: 200, healthInsuranceUsd: 90, totalEstimateUsd: 2040 },
    cities: ["Seoul", "Busan", "Incheon", "Jeju City"],
    rawIndicators: { summerHighC: 30, winterLowC: -6, humidityAvg: 65, airQualityIndex: 80, seismicZone: 1, internetReliability: 9.9, englishDailyLife: 7.1, stability: 9.2, authoritarianRisk: 1.8, corruptionRisk: 2.2 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Türkiye", iso2: "TR", iso3: "TUR", region: "Europe/Asia", subregion: "Western Asia",
    languages: ["Turkish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A vast cultural bridge between continents with extraordinary history and incredible value.",
    dimensions: { cost: 8.2, safety: 5.4, healthcare: 7.0, visaEase: 7.5, digitalInfra: 5.4, climate: 6.7, english: 4.3, lgbtqSafety: 3.5, techEcosystem: 6.8, naturalEnvironment: 4.1 },
    costBreakdown: { rentUsd: 650, groceriesUsd: 180, transportUsd: 25, utilitiesUsd: 100, diningOutUsd: 140, healthInsuranceUsd: 55, totalEstimateUsd: 1150 },
    cities: ["Istanbul", "Antalya", "Izmir", "Ankara"],
    rawIndicators: { summerHighC: 29, winterLowC: 5, humidityAvg: 60, airQualityIndex: 65, seismicZone: 5, internetReliability: 8.1, englishDailyLife: 6.2, stability: 6.2, authoritarianRisk: 7.2, corruptionRisk: 6.5 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Morocco", iso2: "MA", iso3: "MAR", region: "Africa", subregion: "North Africa",
    languages: ["Arabic", "Berber", "French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A stunning gateway to Africa just minutes from Europe, offering year-round warmth and deep culture.",
    dimensions: { cost: 8.5, safety: 6.8, healthcare: 5.8, visaEase: 5, digitalInfra: 4, climate: 6.9, english: 3.7, lgbtqSafety: 1.0, techEcosystem: 6.4, naturalEnvironment: 3.7 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 180, transportUsd: 22, utilitiesUsd: 90, diningOutUsd: 140, healthInsuranceUsd: 55, totalEstimateUsd: 1087 },
    cities: ["Marrakech", "Casablanca", "Taghazout", "Rabat"],
    rawIndicators: { summerHighC: 37, winterLowC: 8, humidityAvg: 50, airQualityIndex: 45, seismicZone: 3, internetReliability: 7.5, englishDailyLife: 5.5, stability: 7.8, authoritarianRisk: 6.5, corruptionRisk: 5.8 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "New Zealand", iso2: "NZ", iso3: "NZL", region: "Oceania", subregion: "Australasia",
    languages: ["English", "Maori"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "The ultimate remote sanctuary — safe, stable, and naturally breathtaking.",
    dimensions: { cost: 4.5, safety: 9.6, healthcare: 8.6, visaEase: 4, digitalInfra: 7.7, climate: 6.4, english: 5.9, lgbtqSafety: 8.7, techEcosystem: 7.6, naturalEnvironment: 7.7 },
    costBreakdown: { rentUsd: 1700, groceriesUsd: 380, transportUsd: 80, utilitiesUsd: 200, diningOutUsd: 360, healthInsuranceUsd: 80, totalEstimateUsd: 2800 },
    cities: ["Auckland", "Wellington", "Christchurch", "Queenstown"],
    rawIndicators: { summerHighC: 23, winterLowC: 7, humidityAvg: 75, airQualityIndex: 15, seismicZone: 5, internetReliability: 9.4, englishDailyLife: 9.8, stability: 9.8, authoritarianRisk: 0.5, corruptionRisk: 0.8 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Australia", iso2: "AU", iso3: "AUS", region: "Oceania", subregion: "Australasia",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A sun-drenched continent with a powerhouse economy and an unmatched outdoor lifestyle.",
    dimensions: { cost: 3.4, safety: 9.2, healthcare: 8.8, visaEase: 4, digitalInfra: 7.7, climate: 6.9, english: 5.6, lgbtqSafety: 8.6, techEcosystem: 8.4, naturalEnvironment: 6.6 },
    costBreakdown: { rentUsd: 1900, groceriesUsd: 400, transportUsd: 90, utilitiesUsd: 230, diningOutUsd: 400, healthInsuranceUsd: 400, totalEstimateUsd: 3420 },
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Gold Coast"],
    rawIndicators: { summerHighC: 26, winterLowC: 8, humidityAvg: 60, airQualityIndex: 25, seismicZone: 1, internetReliability: 9.1, englishDailyLife: 9.9, stability: 9.5, authoritarianRisk: 0.8, corruptionRisk: 1.2 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Canada", iso2: "CA", iso3: "CAN", region: "Americas", subregion: "North America",
    languages: ["English", "French"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A world-leading inclusive democracy with spectacular wilderness and high-growth cities.",
    dimensions: { cost: 4.5, safety: 9.0, healthcare: 8.6, visaEase: 4, digitalInfra: 8.3, climate: 2.8, english: 5.6, lgbtqSafety: 9.0, techEcosystem: 8.2, naturalEnvironment: 5 },
    costBreakdown: { rentUsd: 1600, groceriesUsd: 380, transportUsd: 90, utilitiesUsd: 220, diningOutUsd: 400, healthInsuranceUsd: 150, totalEstimateUsd: 2840 },
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary"],
    rawIndicators: { summerHighC: 26, winterLowC: -7, humidityAvg: 65, airQualityIndex: 25, seismicZone: 2, internetReliability: 9.5, englishDailyLife: 9.8, stability: 9.4, authoritarianRisk: 0.8, corruptionRisk: 1.1 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Chile", iso2: "CL", iso3: "CHL", region: "Americas", subregion: "South America",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "South America's most stable economy, offering dramatic landscapes and strong institutions.",
    dimensions: { cost: 6.6, safety: 7.2, healthcare: 7.4, visaEase: 6.4, digitalInfra: 5.9, climate: 5.1, english: 4.6, lgbtqSafety: 6.8, techEcosystem: 7.2, naturalEnvironment: 3.7 },
    costBreakdown: { rentUsd: 950, groceriesUsd: 260, transportUsd: 35, utilitiesUsd: 140, diningOutUsd: 220, healthInsuranceUsd: 75, totalEstimateUsd: 1680 },
    cities: ["Santiago", "Valparaiso", "Viña del Mar"],
    rawIndicators: { summerHighC: 30, winterLowC: 3, humidityAvg: 55, airQualityIndex: 85, seismicZone: 5, internetReliability: 9.2, englishDailyLife: 6.5, stability: 8.5, authoritarianRisk: 1.8, corruptionRisk: 2.5 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Ecuador", iso2: "EC", iso3: "ECU", region: "Americas", subregion: "South America",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A biodiversity hotspot with USD currency and some of the world's best expat retirement cities.",
    dimensions: { cost: 8.6, safety: 5.8, healthcare: 6.2, visaEase: 8, digitalInfra: 3.7, climate: 6.1, english: 4, lgbtqSafety: 5.1, techEcosystem: 5.8, naturalEnvironment: 4.5 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 80, diningOutUsd: 120, healthInsuranceUsd: 50, totalEstimateUsd: 1050 },
    cities: ["Quito", "Cuenca", "Guayaquil"],
    rawIndicators: { summerHighC: 20, winterLowC: 9, humidityAvg: 70, airQualityIndex: 40, seismicZone: 4, internetReliability: 7.1, englishDailyLife: 5.2, stability: 6.5, authoritarianRisk: 4.5, corruptionRisk: 6.2 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Peru", iso2: "PE", iso3: "PER", region: "Americas", subregion: "South America",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A culinary global leader with extraordinary geographic variety and very low cost of living.",
    dimensions: { cost: 8.7, safety: 5.8, healthcare: 6.0, visaEase: 6.9, digitalInfra: 3.7, climate: 5.4, english: 4, lgbtqSafety: 4.7, techEcosystem: 6.0, naturalEnvironment: 4.1 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 170, transportUsd: 20, utilitiesUsd: 80, diningOutUsd: 120, healthInsuranceUsd: 50, totalEstimateUsd: 1040 },
    cities: ["Lima", "Cusco", "Arequipa"],
    rawIndicators: { summerHighC: 27, winterLowC: 15, humidityAvg: 80, airQualityIndex: 110, seismicZone: 5, internetReliability: 7.4, englishDailyLife: 5.5, stability: 5.2, authoritarianRisk: 5.8, corruptionRisk: 6.8 },
    dataConfidence: "high", lastUpdated: "2026-04-21"
  },
  {
    name: "Afghanistan", iso2: "AF", iso3: "AFG", region: "Asia", subregion: "Southern Asia",
    languages: ["Pashto", "Dari"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A rugged, landlocked nation currently facing extreme political and social challenges.",
    dimensions: { cost: 9.9, safety: 1.0, healthcare: 2.1, visaEase: 0.5, digitalInfra: 1.5, climate: 2.8, english: 1.7, lgbtqSafety: 0.2, techEcosystem: 1.1, naturalEnvironment: 2.7 },
    costBreakdown: { rentUsd: 250, groceriesUsd: 120, transportUsd: 15, utilitiesUsd: 40, diningOutUsd: 60, healthInsuranceUsd: 30, totalEstimateUsd: 515 },
    cities: ["Kabul", "Herat"],
    rawIndicators: { summerHighC: 33, winterLowC: -2, humidityAvg: 45, airQualityIndex: 180, seismicZone: 5, internetReliability: 3.2, englishDailyLife: 2.5, stability: 1.2, authoritarianRisk: 9.8, corruptionRisk: 8.5 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Albania", iso2: "AL", iso3: "ALB", region: "Europe", subregion: "Southern Europe",
    languages: ["Albanian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A burgeoning Balkan destination offering stunning coastlines and exceptional value in the Mediterranean.",
    dimensions: { cost: 8.4, safety: 7.8, healthcare: 5.4, visaEase: 8.5, digitalInfra: 5.6, climate: 6.9, english: 3.7, lgbtqSafety: 5.8, techEcosystem: 5.1, naturalEnvironment: 5.5 },
    costBreakdown: { rentUsd: 550, groceriesUsd: 220, transportUsd: 30, utilitiesUsd: 90, diningOutUsd: 180, healthInsuranceUsd: 60, totalEstimateUsd: 1130 },
    cities: ["Tirana", "Durrës", "Vlorë"],
    rawIndicators: { summerHighC: 31, winterLowC: 2, humidityAvg: 65, airQualityIndex: 55, seismicZone: 4, internetReliability: 8.1, englishDailyLife: 4.8, stability: 7.2, authoritarianRisk: 3.5, corruptionRisk: 5.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Algeria", iso2: "DZ", iso3: "DZA", region: "Africa", subregion: "Northern Africa",
    languages: ["Arabic", "Berber", "French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "Africa's largest country, blending Mediterranean coastlines with the vastness of the Sahara.",
    dimensions: { cost: 9.3, safety: 5.5, healthcare: 4.8, visaEase: 2.2, digitalInfra: 4, climate: 5.9, english: 2.3, lgbtqSafety: 1.5, techEcosystem: 4.2, naturalEnvironment: 3.7 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 40, diningOutUsd: 100, healthInsuranceUsd: 50, totalEstimateUsd: 790 },
    cities: ["Algiers", "Oran", "Constantine"],
    rawIndicators: { summerHighC: 31, winterLowC: 5, humidityAvg: 60, airQualityIndex: 75, seismicZone: 4, internetReliability: 6.5, englishDailyLife: 2.8, stability: 6.1, authoritarianRisk: 7.2, corruptionRisk: 6.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Andorra", iso2: "AD", iso3: "AND", region: "Europe", subregion: "Southern Europe",
    languages: ["Catalan", "Spanish", "French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A high-altitude tax haven in the Pyrenees known for safety, skiing, and retail.",
    dimensions: { cost: 4.6, safety: 9.8, healthcare: 8.6, visaEase: 5.6, digitalInfra: 8.8, climate: 3.4, english: 4.9, lgbtqSafety: 8.4, techEcosystem: 6.5, naturalEnvironment: 7.7 },
    costBreakdown: { rentUsd: 1600, groceriesUsd: 400, transportUsd: 50, utilitiesUsd: 120, diningOutUsd: 350, healthInsuranceUsd: 120, totalEstimateUsd: 2640 },
    cities: ["Andorra la Vella", "Escaldes-Engordany"],
    rawIndicators: { summerHighC: 24, winterLowC: -2, humidityAvg: 65, airQualityIndex: 20, seismicZone: 2, internetReliability: 9.7, englishDailyLife: 5.8, stability: 9.8, authoritarianRisk: 0.8, corruptionRisk: 1.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Angola", iso2: "AO", iso3: "AGO", region: "Africa", subregion: "Middle Africa",
    languages: ["Portuguese"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A resource-rich nation with a rapidly developing capital and significant economic disparities.",
    dimensions: { cost: 3.8, safety: 5.1, healthcare: 3.5, visaEase: 3.3, digitalInfra: 3.3, climate: 5.4, english: 1.5, lgbtqSafety: 5.2, techEcosystem: 4.1, naturalEnvironment: 4.5 },
    costBreakdown: { rentUsd: 2200, groceriesUsd: 450, transportUsd: 60, utilitiesUsd: 150, diningOutUsd: 300, healthInsuranceUsd: 150, totalEstimateUsd: 3310 },
    cities: ["Luanda", "Benguela", "Huambo"],
    rawIndicators: { summerHighC: 30, winterLowC: 18, humidityAvg: 80, airQualityIndex: 85, seismicZone: 1, internetReliability: 6.1, englishDailyLife: 2.1, stability: 6.2, authoritarianRisk: 6.8, corruptionRisk: 7.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Antigua and Barbuda", iso2: "AG", iso3: "ATG", region: "Americas", subregion: "Caribbean",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A twin-island Caribbean paradise famous for its 365 beaches and yachting culture.",
    dimensions: { cost: 4.1, safety: 7.8, healthcare: 6.2, visaEase: 6.6, digitalInfra: 5.2, climate: 7.8, english: 10, lgbtqSafety: 5.1, techEcosystem: 4.2, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 1800, groceriesUsd: 500, transportUsd: 80, utilitiesUsd: 250, diningOutUsd: 400, healthInsuranceUsd: 150, totalEstimateUsd: 3180 },
    cities: ["St. John's", "English Harbour"],
    rawIndicators: { summerHighC: 31, winterLowC: 23, humidityAvg: 75, airQualityIndex: 25, seismicZone: 3, internetReliability: 7.8, englishDailyLife: 10.0, stability: 8.5, authoritarianRisk: 1.5, corruptionRisk: 2.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Armenia", iso2: "AM", iso3: "ARM", region: "Asia", subregion: "Western Asia",
    languages: ["Armenian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A landlocked nation in the Caucasus with a rich history and a fast-growing tech scene.",
    dimensions: { cost: 7.6, safety: 8.8, healthcare: 6.2, visaEase: 8.3, digitalInfra: 6.9, climate: 4.7, english: 3.3, lgbtqSafety: 4.2, techEcosystem: 7.6, naturalEnvironment: 5 },
    costBreakdown: { rentUsd: 700, groceriesUsd: 250, transportUsd: 25, utilitiesUsd: 80, diningOutUsd: 200, healthInsuranceUsd: 50, totalEstimateUsd: 1305 },
    cities: ["Yerevan", "Gyumri", "Dilijan"],
    rawIndicators: { summerHighC: 33, winterLowC: -5, humidityAvg: 55, airQualityIndex: 65, seismicZone: 4, internetReliability: 8.9, englishDailyLife: 4.5, stability: 6.8, authoritarianRisk: 4.1, corruptionRisk: 4.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Austria", iso2: "AT", iso3: "AUT", region: "Europe", subregion: "Western Europe",
    languages: ["German"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "A central European powerhouse of culture, stability, and world-class alpine living.",
    dimensions: { cost: 4.8, safety: 9.4, healthcare: 9.2, visaEase: 5.2, digitalInfra: 8.3, climate: 4, english: 6.6, lgbtqSafety: 9.1, techEcosystem: 8.2, naturalEnvironment: 8.5 },
    costBreakdown: { rentUsd: 1400, groceriesUsd: 350, transportUsd: 60, utilitiesUsd: 180, diningOutUsd: 350, healthInsuranceUsd: 150, totalEstimateUsd: 2490 },
    cities: ["Vienna", "Salzburg", "Innsbruck", "Graz"],
    rawIndicators: { summerHighC: 26, winterLowC: -2, humidityAvg: 70, airQualityIndex: 30, seismicZone: 2, internetReliability: 9.6, englishDailyLife: 8.2, stability: 9.6, authoritarianRisk: 1.1, corruptionRisk: 1.4 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Azerbaijan", iso2: "AZ", iso3: "AZE", region: "Asia", subregion: "Western Asia",
    languages: ["Azerbaijani"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "Where East meets West on the Caspian Sea, blending modern architecture with ancient history.",
    dimensions: { cost: 8.7, safety: 5.5, healthcare: 5.2, visaEase: 5, digitalInfra: 6, climate: 5.1, english: 2.3, lgbtqSafety: 3.2, techEcosystem: 5.6, naturalEnvironment: 3 },
    costBreakdown: { rentUsd: 550, groceriesUsd: 200, transportUsd: 20, utilitiesUsd: 50, diningOutUsd: 150, healthInsuranceUsd: 40, totalEstimateUsd: 1010 },
    cities: ["Baku", "Ganja", "Sumqayit"],
    rawIndicators: { summerHighC: 31, winterLowC: 2, humidityAvg: 65, airQualityIndex: 70, seismicZone: 3, internetReliability: 7.8, englishDailyLife: 3.5, stability: 7.1, authoritarianRisk: 7.8, corruptionRisk: 6.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Bahamas", iso2: "BS", iso3: "BHS", region: "Americas", subregion: "Caribbean",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A sprawling archipelago of white sands, tax-friendly regulations, and high-end tourism.",
    dimensions: { cost: 2.9, safety: 6.8, healthcare: 6.5, visaEase: 7.5, digitalInfra: 5.6, climate: 7.5, english: 10, lgbtqSafety: 5.8, techEcosystem: 4.8, naturalEnvironment: 7.7 },
    costBreakdown: { rentUsd: 2200, groceriesUsd: 600, transportUsd: 100, utilitiesUsd: 300, diningOutUsd: 500, healthInsuranceUsd: 180, totalEstimateUsd: 3880 },
    cities: ["Nassau", "Freeport"],
    rawIndicators: { summerHighC: 32, winterLowC: 18, humidityAvg: 75, airQualityIndex: 20, seismicZone: 1, internetReliability: 8.1, englishDailyLife: 10.0, stability: 8.8, authoritarianRisk: 1.2, corruptionRisk: 2.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Bahrain", iso2: "BH", iso3: "BHR", region: "Asia", subregion: "Western Asia",
    languages: ["Arabic", "English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "An island kingdom in the Gulf known for its liberal social atmosphere and banking sector.",
    dimensions: { cost: 4.9, safety: 5.5, healthcare: 8.2, visaEase: 4, digitalInfra: 8.7, climate: 1.5, english: 7.4, lgbtqSafety: 2.5, techEcosystem: 7.2, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 1400, groceriesUsd: 350, transportUsd: 60, utilitiesUsd: 180, diningOutUsd: 350, healthInsuranceUsd: 100, totalEstimateUsd: 2440 },
    cities: ["Manama", "Riffa", "Muharraq"],
    rawIndicators: { summerHighC: 40, winterLowC: 14, humidityAvg: 60, airQualityIndex: 110, seismicZone: 1, internetReliability: 9.6, englishDailyLife: 9.1, stability: 8.5, authoritarianRisk: 7.2, corruptionRisk: 3.8 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Bangladesh", iso2: "BD", iso3: "BGD", region: "Asia", subregion: "Southern Asia",
    languages: ["Bengali"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A densely populated South Asian nation with a booming textile industry and deltaic landscapes.",
    dimensions: { cost: 9.4, safety: 5.8, healthcare: 4.1, visaEase: 3.7, digitalInfra: 4.2, climate: 3.8, english: 4, lgbtqSafety: 1.8, techEcosystem: 5.4, naturalEnvironment: 3.4 },
    costBreakdown: { rentUsd: 350, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 50, diningOutUsd: 100, healthInsuranceUsd: 40, totalEstimateUsd: 740 },
    cities: ["Dhaka", "Chittagong", "Sylhet"],
    rawIndicators: { summerHighC: 34, winterLowC: 12, humidityAvg: 80, airQualityIndex: 180, seismicZone: 4, internetReliability: 6.8, englishDailyLife: 4.8, stability: 5.4, authoritarianRisk: 6.8, corruptionRisk: 7.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Barbados", iso2: "BB", iso3: "BRB", region: "Americas", subregion: "Caribbean",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A sophisticated Caribbean island with high living standards and a pioneer of the digital nomad visa.",
    dimensions: { cost: 3.3, safety: 8.4, healthcare: 7.8, visaEase: 5.5, digitalInfra: 7.7, climate: 7.5, english: 10, lgbtqSafety: 5.5, techEcosystem: 5.4, naturalEnvironment: 6.9 },
    costBreakdown: { rentUsd: 2000, groceriesUsd: 550, transportUsd: 80, utilitiesUsd: 250, diningOutUsd: 450, healthInsuranceUsd: 120, totalEstimateUsd: 3450 },
    cities: ["Bridgetown", "Holetown", "Speightstown"],
    rawIndicators: { summerHighC: 31, winterLowC: 22, humidityAvg: 75, airQualityIndex: 25, seismicZone: 2, internetReliability: 9.1, englishDailyLife: 10.0, stability: 9.2, authoritarianRisk: 1.1, corruptionRisk: 1.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Belarus", iso2: "BY", iso3: "BLR", region: "Europe", subregion: "Eastern Europe",
    languages: ["Belarusian", "Russian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A politically isolated Eastern European state where authoritarian repression and arbitrary detention risk shape daily life.",
    dimensions: { cost: 9.1, safety: 3.9, healthcare: 6.8, visaEase: 1.7, digitalInfra: 6.9, climate: 2.7, english: 2.1, lgbtqSafety: 3.1, techEcosystem: 6.4, naturalEnvironment: 2.7 },
    costBreakdown: { rentUsd: 450, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 60, diningOutUsd: 120, healthInsuranceUsd: 40, totalEstimateUsd: 870 },
    cities: ["Minsk", "Gomel", "Brest"],
    rawIndicators: { summerHighC: 24, winterLowC: -6, humidityAvg: 80, airQualityIndex: 45, seismicZone: 1, internetReliability: 8.5, englishDailyLife: 2.8, stability: 5.2, authoritarianRisk: 9.5, corruptionRisk: 6.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Belgium", iso2: "BE", iso3: "BEL", region: "Europe", subregion: "Western Europe",
    languages: ["Dutch", "French", "German"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "The heart of the European Union, offering a high quality of life and multilingual urban centers.",
    dimensions: { cost: 5, safety: 8.1, healthcare: 9.1, visaEase: 3.5, digitalInfra: 8.8, climate: 3.4, english: 7.3, lgbtqSafety: 9.2, techEcosystem: 8.4, naturalEnvironment: 2.1 },
    costBreakdown: { rentUsd: 1200, groceriesUsd: 380, transportUsd: 60, utilitiesUsd: 220, diningOutUsd: 380, healthInsuranceUsd: 110, totalEstimateUsd: 2350 },
    cities: ["Brussels", "Antwerp", "Ghent", "Bruges"],
    rawIndicators: { summerHighC: 23, winterLowC: 1, humidityAvg: 80, airQualityIndex: 35, seismicZone: 2, internetReliability: 9.6, englishDailyLife: 8.5, stability: 9.1, authoritarianRisk: 1.1, corruptionRisk: 1.4 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Belize", iso2: "BZ", iso3: "BLZ", region: "Americas", subregion: "Central America",
    languages: ["English", "Spanish"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A Caribbean-influenced Central American nation known for its barrier reef and laid-back lifestyle.",
    dimensions: { cost: 6.7, safety: 6.5, healthcare: 5.1, visaEase: 7.4, digitalInfra: 4.9, climate: 6.7, english: 10, lgbtqSafety: 6.1, techEcosystem: 3.8, naturalEnvironment: 8.5 },
    costBreakdown: { rentUsd: 800, groceriesUsd: 350, transportUsd: 40, utilitiesUsd: 150, diningOutUsd: 250, healthInsuranceUsd: 80, totalEstimateUsd: 1670 },
    cities: ["Belize City", "San Pedro", "Belmopan"],
    rawIndicators: { summerHighC: 31, winterLowC: 21, humidityAvg: 80, airQualityIndex: 25, seismicZone: 2, internetReliability: 7.2, englishDailyLife: 9.5, stability: 7.8, authoritarianRisk: 1.8, corruptionRisk: 5.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Benin", iso2: "BJ", iso3: "BEN", region: "Africa", subregion: "Western Africa",
    languages: ["French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A West African nation with a rich cultural history and a growing coastal economy.",
    dimensions: { cost: 8.7, safety: 6.8, healthcare: 3.8, visaEase: 3.5, digitalInfra: 3.7, climate: 6.1, english: 1, lgbtqSafety: 4.8, techEcosystem: 4.5, naturalEnvironment: 3.7 },
    costBreakdown: { rentUsd: 500, groceriesUsd: 220, transportUsd: 30, utilitiesUsd: 80, diningOutUsd: 150, healthInsuranceUsd: 60, totalEstimateUsd: 1040 },
    cities: ["Cotonou", "Porto-Novo"],
    rawIndicators: { summerHighC: 31, winterLowC: 24, humidityAvg: 80, airQualityIndex: 65, seismicZone: 1, internetReliability: 6.5, englishDailyLife: 1.8, stability: 7.1, authoritarianRisk: 4.5, corruptionRisk: 6.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Bhutan", iso2: "BT", iso3: "BTN", region: "Asia", subregion: "Southern Asia",
    languages: ["Dzongkha"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The world's only carbon-negative nation, prioritizing Gross National Happiness and high-value tourism.",
    dimensions: { cost: 8.1, safety: 9.5, healthcare: 5.8, visaEase: 1.5, digitalInfra: 5.6, climate: 3.8, english: 5.6, lgbtqSafety: 5.5, techEcosystem: 4.1, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 250, transportUsd: 30, utilitiesUsd: 60, diningOutUsd: 180, healthInsuranceUsd: 50, totalEstimateUsd: 1170 },
    cities: ["Thimphu", "Paro", "Phuntsholing"],
    rawIndicators: { summerHighC: 25, winterLowC: -2, humidityAvg: 70, airQualityIndex: 30, seismicZone: 5, internetReliability: 7.8, englishDailyLife: 6.5, stability: 9.4, authoritarianRisk: 4.2, corruptionRisk: 2.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Bolivia", iso2: "BO", iso3: "BOL", region: "Americas", subregion: "South America",
    languages: ["Spanish", "Quechua", "Aymara"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A high-altitude nation of dramatic landscapes and some of the lowest costs in South America.",
    dimensions: { cost: 9, safety: 6.2, healthcare: 4.5, visaEase: 6, digitalInfra: 4, climate: 4.7, english: 2.1, lgbtqSafety: 5.4, techEcosystem: 4.8, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 450, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 60, diningOutUsd: 120, healthInsuranceUsd: 50, totalEstimateUsd: 880 },
    cities: ["La Paz", "Santa Cruz", "Sucre"],
    rawIndicators: { summerHighC: 15, winterLowC: -1, humidityAvg: 55, airQualityIndex: 55, seismicZone: 3, internetReliability: 6.8, englishDailyLife: 2.8, stability: 5.8, authoritarianRisk: 5.2, corruptionRisk: 6.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Bosnia and Herzegovina", iso2: "BA", iso3: "BIH", region: "Europe", subregion: "Southern Europe",
    languages: ["Bosnian", "Croatian", "Serbian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A stunningly mountainous Balkan nation where East meets West in historic Sarajevo.",
    dimensions: { cost: 8.9, safety: 8.2, healthcare: 5.6, visaEase: 7.3, digitalInfra: 5.6, climate: 3.8, english: 4.4, lgbtqSafety: 5.1, techEcosystem: 5.2, naturalEnvironment: 6.9 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 200, transportUsd: 30, utilitiesUsd: 120, diningOutUsd: 150, healthInsuranceUsd: 50, totalEstimateUsd: 950 },
    cities: ["Sarajevo", "Mostar", "Banja Luka"],
    rawIndicators: { summerHighC: 27, winterLowC: -3, humidityAvg: 70, airQualityIndex: 90, seismicZone: 4, internetReliability: 8.2, englishDailyLife: 5.5, stability: 6.8, authoritarianRisk: 3.8, corruptionRisk: 5.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Botswana", iso2: "BW", iso3: "BWA", region: "Africa", subregion: "Southern Africa",
    languages: ["English", "Tswana"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A stable, middle-income democracy known for its extraordinary wildlife and diamond industry.",
    dimensions: { cost: 7.4, safety: 8.4, healthcare: 5.2, visaEase: 6.1, digitalInfra: 5.6, climate: 5.1, english: 7.8, lgbtqSafety: 6.8, techEcosystem: 5.1, naturalEnvironment: 8.5 },
    costBreakdown: { rentUsd: 800, groceriesUsd: 250, transportUsd: 40, utilitiesUsd: 120, diningOutUsd: 200, healthInsuranceUsd: 80, totalEstimateUsd: 1490 },
    cities: ["Gaborone", "Francistown", "Maun"],
    rawIndicators: { summerHighC: 33, winterLowC: 5, humidityAvg: 40, airQualityIndex: 35, seismicZone: 1, internetReliability: 7.5, englishDailyLife: 8.2, stability: 9.1, authoritarianRisk: 1.8, corruptionRisk: 2.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Brunei", iso2: "BN", iso3: "BRN", region: "Asia", subregion: "Southeast Asia",
    languages: ["Malay", "English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A small, oil-rich sultanate on the island of Borneo with zero personal income tax.",
    dimensions: { cost: 7.1, safety: 5.5, healthcare: 7.8, visaEase: 1.5, digitalInfra: 7.4, climate: 3.8, english: 6.4, lgbtqSafety: 0.8, techEcosystem: 5.6, naturalEnvironment: 6.9 },
    costBreakdown: { rentUsd: 900, groceriesUsd: 300, transportUsd: 40, utilitiesUsd: 80, diningOutUsd: 200, healthInsuranceUsd: 60, totalEstimateUsd: 1580 },
    cities: ["Bandar Seri Begawan", "Kuala Belait"],
    rawIndicators: { summerHighC: 32, winterLowC: 24, humidityAvg: 80, airQualityIndex: 30, seismicZone: 1, internetReliability: 8.5, englishDailyLife: 7.8, stability: 9.4, authoritarianRisk: 7.8, corruptionRisk: 2.1 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Bulgaria", iso2: "BG", iso3: "BGR", region: "Europe", subregion: "Eastern Europe",
    languages: ["Bulgarian"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "One of Europe's most affordable nations, offering diverse landscapes from mountains to Black Sea beaches.",
    dimensions: { cost: 8.6, safety: 7.8, healthcare: 6.1, visaEase: 7.7, digitalInfra: 8.3, climate: 4.7, english: 4.2, lgbtqSafety: 5.4, techEcosystem: 7.8, naturalEnvironment: 5.5 },
    costBreakdown: { rentUsd: 500, groceriesUsd: 220, transportUsd: 25, utilitiesUsd: 100, diningOutUsd: 180, healthInsuranceUsd: 50, totalEstimateUsd: 1075 },
    cities: ["Sofia", "Plovdiv", "Varna"],
    rawIndicators: { summerHighC: 30, winterLowC: -2, humidityAvg: 65, airQualityIndex: 65, seismicZone: 4, internetReliability: 9.4, englishDailyLife: 5.8, stability: 7.8, authoritarianRisk: 2.5, corruptionRisk: 5.2 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Burkina Faso", iso2: "BF", iso3: "BFA", region: "Africa", subregion: "Western Africa",
    languages: ["French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A landlocked Sahelian nation with a rich musical heritage, currently facing security challenges.",
    dimensions: { cost: 9.2, safety: 2.5, healthcare: 3.1, visaEase: 2.7, digitalInfra: 3.3, climate: 3.4, english: 1, lgbtqSafety: 3.8, techEcosystem: 3.5, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 60, diningOutUsd: 100, healthInsuranceUsd: 40, totalEstimateUsd: 800 },
    cities: ["Ouagadougou", "Bobo-Dioulasso"],
    rawIndicators: { summerHighC: 39, winterLowC: 16, humidityAvg: 45, airQualityIndex: 110, seismicZone: 1, internetReliability: 5.2, englishDailyLife: 1.5, stability: 2.8, authoritarianRisk: 8.5, corruptionRisk: 7.2 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Burundi", iso2: "BI", iso3: "BDI", region: "Africa", subregion: "Eastern Africa",
    languages: ["Kirundi", "French", "English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A small, densely populated nation in the Great Lakes region with significant economic hurdles.",
    dimensions: { cost: 9.6, safety: 4.2, healthcare: 2.8, visaEase: 2.3, digitalInfra: 2.6, climate: 5.4, english: 1.7, lgbtqSafety: 1.2, techEcosystem: 2.8, naturalEnvironment: 5 },
    costBreakdown: { rentUsd: 300, groceriesUsd: 150, transportUsd: 15, utilitiesUsd: 40, diningOutUsd: 80, healthInsuranceUsd: 30, totalEstimateUsd: 615 },
    cities: ["Bujumbura", "Gitega"],
    rawIndicators: { summerHighC: 28, winterLowC: 17, humidityAvg: 70, airQualityIndex: 85, seismicZone: 4, internetReliability: 4.8, englishDailyLife: 2.4, stability: 4.1, authoritarianRisk: 8.2, corruptionRisk: 7.8 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Cabo Verde", iso2: "CV", iso3: "CPV", region: "Africa", subregion: "Western Africa",
    languages: ["Portuguese"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A volcanic archipelago off the West African coast known for its stability and vibrant music culture.",
    dimensions: { cost: 8.1, safety: 8.1, healthcare: 5.6, visaEase: 8, digitalInfra: 6.1, climate: 6.9, english: 3.3, lgbtqSafety: 6.2, techEcosystem: 4.8, naturalEnvironment: 6.9 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 250, transportUsd: 30, utilitiesUsd: 80, diningOutUsd: 150, healthInsuranceUsd: 60, totalEstimateUsd: 1170 },
    cities: ["Praia", "Mindelo", "Santa Maria"],
    rawIndicators: { summerHighC: 29, winterLowC: 19, humidityAvg: 70, airQualityIndex: 30, seismicZone: 3, internetReliability: 7.8, englishDailyLife: 4.2, stability: 8.8, authoritarianRisk: 1.5, corruptionRisk: 2.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Cambodia", iso2: "KH", iso3: "KHM", region: "Asia", subregion: "Southeast Asia",
    languages: ["Khmer"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "An ancient kingdom offering remarkable value and a rapidly developing urban infrastructure.",
    dimensions: { cost: 9, safety: 6.8, healthcare: 4.2, visaEase: 5, digitalInfra: 5.1, climate: 4, english: 4.4, lgbtqSafety: 5.6, techEcosystem: 5.2, naturalEnvironment: 5.9 },
    costBreakdown: { rentUsd: 500, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 60, diningOutUsd: 120, healthInsuranceUsd: 50, totalEstimateUsd: 930 },
    cities: ["Phnom Penh", "Siem Reap", "Kampot"],
    rawIndicators: { summerHighC: 35, winterLowC: 22, humidityAvg: 75, airQualityIndex: 85, seismicZone: 1, internetReliability: 7.4, englishDailyLife: 5.5, stability: 6.5, authoritarianRisk: 6.8, corruptionRisk: 7.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Cameroon", iso2: "CM", iso3: "CMR", region: "Africa", subregion: "Middle Africa",
    languages: ["French", "English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "Known as 'Africa in miniature' for its diverse landscapes and cultural richness.",
    dimensions: { cost: 8.7, safety: 4.8, healthcare: 4.1, visaEase: 2.1, digitalInfra: 3.7, climate: 5.1, english: 6.1, lgbtqSafety: 0.8, techEcosystem: 5.4, naturalEnvironment: 6.9 },
    costBreakdown: { rentUsd: 500, groceriesUsd: 220, transportUsd: 30, utilitiesUsd: 70, diningOutUsd: 150, healthInsuranceUsd: 60, totalEstimateUsd: 1030 },
    cities: ["Yaoundé", "Douala", "Buea"],
    rawIndicators: { summerHighC: 28, winterLowC: 19, humidityAvg: 80, airQualityIndex: 75, seismicZone: 3, internetReliability: 6.2, englishDailyLife: 6.8, stability: 5.4, authoritarianRisk: 7.5, corruptionRisk: 7.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Central African Republic", iso2: "CF", iso3: "CAF", region: "Africa", subregion: "Middle Africa",
    languages: ["Sango", "French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A landlocked nation in the heart of Africa facing prolonged instability and extreme poverty.",
    dimensions: { cost: 9.5, safety: 1.5, healthcare: 2.2, visaEase: 1.5, digitalInfra: 1.5, climate: 5.1, english: 1, lgbtqSafety: 3.1, techEcosystem: 1.8, naturalEnvironment: 5.9 },
    costBreakdown: { rentUsd: 350, groceriesUsd: 150, transportUsd: 15, utilitiesUsd: 50, diningOutUsd: 80, healthInsuranceUsd: 40, totalEstimateUsd: 685 },
    cities: ["Bangui", "Bimbo"],
    rawIndicators: { summerHighC: 32, winterLowC: 20, humidityAvg: 75, airQualityIndex: 95, seismicZone: 1, internetReliability: 3.5, englishDailyLife: 1.8, stability: 1.5, authoritarianRisk: 9.2, corruptionRisk: 8.8 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Chad", iso2: "TD", iso3: "TCD", region: "Africa", subregion: "Middle Africa",
    languages: ["Arabic", "French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A vast Sahelian nation with dramatic desert landscapes and significant security concerns.",
    dimensions: { cost: 9.2, safety: 2.8, healthcare: 2.4, visaEase: 1.5, digitalInfra: 1.8, climate: 2.8, english: 1, lgbtqSafety: 1.2, techEcosystem: 2.1, naturalEnvironment: 3.7 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 60, diningOutUsd: 100, healthInsuranceUsd: 50, totalEstimateUsd: 810 },
    cities: ["N'Djamena", "Moundou"],
    rawIndicators: { summerHighC: 41, winterLowC: 14, humidityAvg: 40, airQualityIndex: 120, seismicZone: 1, internetReliability: 4.1, englishDailyLife: 1.8, stability: 3.2, authoritarianRisk: 8.8, corruptionRisk: 8.2 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Comoros", iso2: "KM", iso3: "COM", region: "Africa", subregion: "Eastern Africa",
    languages: ["Comorian", "Arabic", "French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A volcanic archipelago in the Indian Ocean with a unique blend of African and Arab cultures.",
    dimensions: { cost: 8.8, safety: 7.1, healthcare: 3.5, visaEase: 6.4, digitalInfra: 3.3, climate: 6.1, english: 1.3, lgbtqSafety: 1.8, techEcosystem: 2.5, naturalEnvironment: 7.7 },
    costBreakdown: { rentUsd: 500, groceriesUsd: 220, transportUsd: 30, utilitiesUsd: 80, diningOutUsd: 120, healthInsuranceUsd: 50, totalEstimateUsd: 1000 },
    cities: ["Moroni", "Mutsamudu"],
    rawIndicators: { summerHighC: 30, winterLowC: 22, humidityAvg: 75, airQualityIndex: 35, seismicZone: 3, internetReliability: 5.8, englishDailyLife: 2.1, stability: 6.2, authoritarianRisk: 6.5, corruptionRisk: 7.1 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Congo (Brazzaville)", iso2: "CG", iso3: "COG", region: "Africa", subregion: "Middle Africa",
    languages: ["French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A central African nation with vast rainforests and a growing oil-based economy.",
    dimensions: { cost: 7.7, safety: 5.2, healthcare: 3.2, visaEase: 2.6, digitalInfra: 3.6, climate: 5.1, english: 1, lgbtqSafety: 4.2, techEcosystem: 3.8, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 250, transportUsd: 40, utilitiesUsd: 120, diningOutUsd: 180, healthInsuranceUsd: 80, totalEstimateUsd: 1270 },
    cities: ["Brazzaville", "Pointe-Noire"],
    rawIndicators: { summerHighC: 30, winterLowC: 20, humidityAvg: 80, airQualityIndex: 75, seismicZone: 1, internetReliability: 6.1, englishDailyLife: 1.5, stability: 5.8, authoritarianRisk: 7.2, corruptionRisk: 7.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Congo (Kinshasa)", iso2: "CD", iso3: "COD", region: "Africa", subregion: "Middle Africa",
    languages: ["French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A resource-rich giant in the heart of Africa, facing immense logistical and security challenges.",
    dimensions: { cost: 7, safety: 2.4, healthcare: 2.5, visaEase: 1.7, digitalInfra: 2.7, climate: 5.1, english: 1.3, lgbtqSafety: 3.1, techEcosystem: 4.2, naturalEnvironment: 8.5 },
    costBreakdown: { rentUsd: 800, groceriesUsd: 300, transportUsd: 50, utilitiesUsd: 150, diningOutUsd: 200, healthInsuranceUsd: 100, totalEstimateUsd: 1600 },
    cities: ["Kinshasa", "Lubumbashi", "Goma"],
    rawIndicators: { summerHighC: 31, winterLowC: 18, humidityAvg: 80, airQualityIndex: 110, seismicZone: 4, internetReliability: 5.1, englishDailyLife: 2.1, stability: 2.5, authoritarianRisk: 8.8, corruptionRisk: 8.5 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Cuba", iso2: "CU", iso3: "CUB", region: "Americas", subregion: "Caribbean",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A Caribbean island with rich culture but severe shortages, authoritarian controls, and a declining healthcare system.",
    dimensions: { cost: 8.4, safety: 5.5, healthcare: 6.4, visaEase: 2, digitalInfra: 2.3, climate: 6.7, english: 3, lgbtqSafety: 6.8, techEcosystem: 3.1, naturalEnvironment: 5.9 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 250, transportUsd: 30, utilitiesUsd: 50, diningOutUsd: 150, healthInsuranceUsd: 50, totalEstimateUsd: 1130 },
    cities: ["Havana", "Santiago de Cuba", "Varadero"],
    rawIndicators: { summerHighC: 32, winterLowC: 18, humidityAvg: 75, airQualityIndex: 30, seismicZone: 2, internetReliability: 4.5, englishDailyLife: 4.1, stability: 7.8, authoritarianRisk: 8.2, corruptionRisk: 5.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Cyprus", iso2: "CY", iso3: "CYP", region: "Europe", subregion: "Southern Europe",
    languages: ["Greek", "Turkish", "English"], euMember: true, schengen: false, commonwealth: true,
    descriptor: "A sun-soaked Mediterranean island offering low taxes and a high quality of life.",
    dimensions: { cost: 5.8, safety: 8.8, healthcare: 7.6, visaEase: 7.3, digitalInfra: 6.9, climate: 8.4, english: 7.7, lgbtqSafety: 6.8, techEcosystem: 7.1, naturalEnvironment: 5 },
    costBreakdown: { rentUsd: 1200, groceriesUsd: 350, transportUsd: 50, utilitiesUsd: 150, diningOutUsd: 300, healthInsuranceUsd: 100, totalEstimateUsd: 2150 },
    cities: ["Nicosia", "Limassol", "Paphos", "Larnaca"],
    rawIndicators: { summerHighC: 33, winterLowC: 8, humidityAvg: 60, airQualityIndex: 45, seismicZone: 4, internetReliability: 8.8, englishDailyLife: 8.5, stability: 8.4, authoritarianRisk: 1.8, corruptionRisk: 3.2 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Denmark", iso2: "DK", iso3: "DNK", region: "Europe", subregion: "Northern Europe",
    languages: ["Danish", "English"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "A world leader in social equality, sustainability, and high-trust societal living.",
    dimensions: { cost: 4.2, safety: 9.6, healthcare: 9.1, visaEase: 2.5, digitalInfra: 9.4, climate: 2.3, english: 9.1, lgbtqSafety: 9.6, techEcosystem: 8.8, naturalEnvironment: 2.7 },
    costBreakdown: { rentUsd: 1800, groceriesUsd: 450, transportUsd: 80, utilitiesUsd: 200, diningOutUsd: 500, healthInsuranceUsd: 80, totalEstimateUsd: 3110 },
    cities: ["Copenhagen", "Aarhus", "Odense"],
    rawIndicators: { summerHighC: 21, winterLowC: -1, humidityAvg: 80, airQualityIndex: 25, seismicZone: 0, internetReliability: 9.8, englishDailyLife: 9.5, stability: 9.8, authoritarianRisk: 0.5, corruptionRisk: 0.5 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Djibouti", iso2: "DJ", iso3: "DJI", region: "Africa", subregion: "Eastern Africa",
    languages: ["Arabic", "French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A strategic hub on the Red Sea, hosting multiple international military bases.",
    dimensions: { cost: 5.5, safety: 5.5, healthcare: 3.8, visaEase: 4, digitalInfra: 4.4, climate: 1.8, english: 1.7, lgbtqSafety: 4.4, techEcosystem: 3.5, naturalEnvironment: 2.1 },
    costBreakdown: { rentUsd: 1200, groceriesUsd: 400, transportUsd: 50, utilitiesUsd: 200, diningOutUsd: 250, healthInsuranceUsd: 100, totalEstimateUsd: 2200 },
    cities: ["Djibouti City", "Ali Sabieh"],
    rawIndicators: { summerHighC: 41, winterLowC: 23, humidityAvg: 60, airQualityIndex: 65, seismicZone: 4, internetReliability: 6.8, englishDailyLife: 2.8, stability: 7.4, authoritarianRisk: 7.8, corruptionRisk: 6.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Dominica", iso2: "DM", iso3: "DMA", region: "Americas", subregion: "Caribbean",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "The 'Nature Isle of the Caribbean' with lush rainforests and geothermal wonders.",
    dimensions: { cost: 6.4, safety: 8.4, healthcare: 5.8, visaEase: 3.5, digitalInfra: 5.6, climate: 6.9, english: 10, lgbtqSafety: 5.4, techEcosystem: 3.8, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 900, groceriesUsd: 350, transportUsd: 50, utilitiesUsd: 180, diningOutUsd: 200, healthInsuranceUsd: 80, totalEstimateUsd: 1760 },
    cities: ["Roseau", "Portsmouth"],
    rawIndicators: { summerHighC: 31, winterLowC: 21, humidityAvg: 80, airQualityIndex: 20, seismicZone: 4, internetReliability: 7.8, englishDailyLife: 10.0, stability: 8.8, authoritarianRisk: 1.2, corruptionRisk: 2.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Dominican Republic", iso2: "DO", iso3: "DOM", region: "Americas", subregion: "Caribbean",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A diverse Caribbean nation offering high-end resorts and a growing tech sector in Santo Domingo.",
    dimensions: { cost: 7.1, safety: 6.1, healthcare: 6.2, visaEase: 7.5, digitalInfra: 6, climate: 6.7, english: 3.7, lgbtqSafety: 5.8, techEcosystem: 6.1, naturalEnvironment: 5.9 },
    costBreakdown: { rentUsd: 800, groceriesUsd: 300, transportUsd: 40, utilitiesUsd: 120, diningOutUsd: 200, healthInsuranceUsd: 70, totalEstimateUsd: 1530 },
    cities: ["Santo Domingo", "Punta Cana", "Santiago"],
    rawIndicators: { summerHighC: 32, winterLowC: 19, humidityAvg: 75, airQualityIndex: 45, seismicZone: 4, internetReliability: 7.8, englishDailyLife: 5.1, stability: 7.5, authoritarianRisk: 3.2, corruptionRisk: 5.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Egypt", iso2: "EG", iso3: "EGY", region: "Africa", subregion: "Northern Africa",
    languages: ["Arabic"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A transcontinental nation of ancient history, offering high value and a central global location.",
    dimensions: { cost: 9.2, safety: 5.5, healthcare: 5.2, visaEase: 4, digitalInfra: 5.6, climate: 6.1, english: 3.7, lgbtqSafety: 1.5, techEcosystem: 6.8, naturalEnvironment: 3 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 60, diningOutUsd: 120, healthInsuranceUsd: 50, totalEstimateUsd: 830 },
    cities: ["Cairo", "Alexandria", "Hurghada"],
    rawIndicators: { summerHighC: 35, winterLowC: 9, humidityAvg: 55, airQualityIndex: 140, seismicZone: 2, internetReliability: 7.8, englishDailyLife: 4.8, stability: 6.8, authoritarianRisk: 8.5, corruptionRisk: 7.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "El Salvador", iso2: "SV", iso3: "SLV", region: "Americas", subregion: "Central America",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The 'Land of Volcanoes', famously adopting Bitcoin as legal tender and improving security.",
    dimensions: { cost: 7.7, safety: 6.8, healthcare: 5.1, visaEase: 3.5, digitalInfra: 5.1, climate: 6.7, english: 3.3, lgbtqSafety: 4.8, techEcosystem: 6.2, naturalEnvironment: 6.9 },
    costBreakdown: { rentUsd: 700, groceriesUsd: 250, transportUsd: 30, utilitiesUsd: 100, diningOutUsd: 150, healthInsuranceUsd: 60, totalEstimateUsd: 1290 },
    cities: ["San Salvador", "El Tunco", "Santa Ana"],
    rawIndicators: { summerHighC: 31, winterLowC: 18, humidityAvg: 75, airQualityIndex: 55, seismicZone: 5, internetReliability: 7.1, englishDailyLife: 4.2, stability: 7.2, authoritarianRisk: 6.2, corruptionRisk: 5.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Equatorial Guinea", iso2: "GQ", iso3: "GNQ", region: "Africa", subregion: "Middle Africa",
    languages: ["Spanish", "French", "Portuguese"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The only Spanish-speaking nation in Africa, enriched by offshore oil reserves.",
    dimensions: { cost: 5.8, safety: 4.5, healthcare: 3.5, visaEase: 1.5, digitalInfra: 3.7, climate: 5.4, english: 1.3, lgbtqSafety: 3.8, techEcosystem: 3.1, naturalEnvironment: 6.9 },
    costBreakdown: { rentUsd: 1200, groceriesUsd: 400, transportUsd: 50, utilitiesUsd: 150, diningOutUsd: 250, healthInsuranceUsd: 100, totalEstimateUsd: 2150 },
    cities: ["Malabo", "Bata"],
    rawIndicators: { summerHighC: 30, winterLowC: 22, humidityAvg: 85, airQualityIndex: 45, seismicZone: 1, internetReliability: 6.5, englishDailyLife: 2.1, stability: 6.5, authoritarianRisk: 9.4, corruptionRisk: 8.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Eritrea", iso2: "ER", iso3: "ERI", region: "Africa", subregion: "Eastern Africa",
    languages: ["Tigrinya", "Arabic", "English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A highly isolated nation on the Horn of Africa with stunning colonial architecture in Asmara.",
    dimensions: { cost: 9.3, safety: 3.2, healthcare: 2.8, visaEase: 1.5, digitalInfra: 1.5, climate: 5.9, english: 3.3, lgbtqSafety: 0.8, techEcosystem: 1.5, naturalEnvironment: 4.5 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 50, diningOutUsd: 100, healthInsuranceUsd: 40, totalEstimateUsd: 790 },
    cities: ["Asmara", "Massawa"],
    rawIndicators: { summerHighC: 25, winterLowC: 6, humidityAvg: 50, airQualityIndex: 35, seismicZone: 3, internetReliability: 2.5, englishDailyLife: 3.8, stability: 7.1, authoritarianRisk: 9.9, corruptionRisk: 8.2 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Eswatini", iso2: "SZ", iso3: "SWZ", region: "Africa", subregion: "Southern Africa",
    languages: ["English", "Swati"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "One of the world's last absolute monarchies, known for its rich cultural traditions and scenic highlands.",
    dimensions: { cost: 8.3, safety: 5.5, healthcare: 4.2, visaEase: 6, digitalInfra: 4.8, climate: 5.4, english: 8.3, lgbtqSafety: 4.8, techEcosystem: 3.8, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 220, transportUsd: 30, utilitiesUsd: 80, diningOutUsd: 150, healthInsuranceUsd: 60, totalEstimateUsd: 1140 },
    cities: ["Mbabane", "Manzini"],
    rawIndicators: { summerHighC: 25, winterLowC: 7, humidityAvg: 65, airQualityIndex: 40, seismicZone: 2, internetReliability: 6.8, englishDailyLife: 8.2, stability: 6.8, authoritarianRisk: 8.2, corruptionRisk: 6.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Ethiopia", iso2: "ET", iso3: "ETH", region: "Africa", subregion: "Eastern Africa",
    languages: ["Amharic"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "An ancient, landlocked giant with a fast-growing economy and diverse high-altitude landscapes.",
    dimensions: { cost: 9.2, safety: 5.4, healthcare: 3.8, visaEase: 3, digitalInfra: 4, climate: 6.7, english: 3.3, lgbtqSafety: 0.8, techEcosystem: 5.8, naturalEnvironment: 7.7 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 60, diningOutUsd: 120, healthInsuranceUsd: 50, totalEstimateUsd: 830 },
    cities: ["Addis Ababa", "Dire Dawa", "Bahir Dar"],
    rawIndicators: { summerHighC: 24, winterLowC: 10, humidityAvg: 60, airQualityIndex: 90, seismicZone: 4, internetReliability: 6.2, englishDailyLife: 4.5, stability: 5.2, authoritarianRisk: 7.8, corruptionRisk: 7.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Fiji", iso2: "FJ", iso3: "FJI", region: "Oceania", subregion: "Melanesia",
    languages: ["English", "Fijian", "Fiji Hindi"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A sprawling Pacific archipelago synonymous with tropical paradise and warm hospitality.",
    dimensions: { cost: 7.3, safety: 7.6, healthcare: 5.4, visaEase: 4.5, digitalInfra: 5.2, climate: 6.7, english: 9.6, lgbtqSafety: 6.2, techEcosystem: 4.2, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 800, groceriesUsd: 300, transportUsd: 40, utilitiesUsd: 120, diningOutUsd: 180, healthInsuranceUsd: 60, totalEstimateUsd: 1500 },
    cities: ["Suva", "Nadi"],
    rawIndicators: { summerHighC: 31, winterLowC: 19, humidityAvg: 75, airQualityIndex: 20, seismicZone: 4, internetReliability: 7.4, englishDailyLife: 9.8, stability: 7.2, authoritarianRisk: 5.2, corruptionRisk: 5.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Gabon", iso2: "GA", iso3: "GAB", region: "Africa", subregion: "Middle Africa",
    languages: ["French"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "One of Africa's most prosperous nations, covered largely by pristine tropical rainforest.",
    dimensions: { cost: 5.7, safety: 6.8, healthcare: 4.2, visaEase: 3.3, digitalInfra: 4.4, climate: 5.1, english: 1, lgbtqSafety: 5.8, techEcosystem: 4.1, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 1200, groceriesUsd: 400, transportUsd: 50, utilitiesUsd: 180, diningOutUsd: 250, healthInsuranceUsd: 100, totalEstimateUsd: 2180 },
    cities: ["Libreville", "Port-Gentil"],
    rawIndicators: { summerHighC: 30, winterLowC: 22, humidityAvg: 85, airQualityIndex: 40, seismicZone: 1, internetReliability: 6.8, englishDailyLife: 1.8, stability: 7.1, authoritarianRisk: 6.8, corruptionRisk: 7.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Gambia", iso2: "GM", iso3: "GMB", region: "Africa", subregion: "Western Africa",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A narrow West African nation along the Gambia River, known for its beaches and birdlife.",
    dimensions: { cost: 9, safety: 7.2, healthcare: 3.5, visaEase: 3.5, digitalInfra: 3.7, climate: 6.7, english: 9.4, lgbtqSafety: 0.8, techEcosystem: 3.5, naturalEnvironment: 5.9 },
    costBreakdown: { rentUsd: 450, groceriesUsd: 200, transportUsd: 25, utilitiesUsd: 70, diningOutUsd: 120, healthInsuranceUsd: 50, totalEstimateUsd: 915 },
    cities: ["Banjul", "Serekunda"],
    rawIndicators: { summerHighC: 32, winterLowC: 18, humidityAvg: 65, airQualityIndex: 55, seismicZone: 1, internetReliability: 6.1, englishDailyLife: 9.5, stability: 7.8, authoritarianRisk: 5.8, corruptionRisk: 6.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Ghana", iso2: "GH", iso3: "GHA", region: "Africa", subregion: "Western Africa",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A beacon of stability in West Africa, boasting a vibrant culture and a growing tech hub in Accra.",
    dimensions: { cost: 7.9, safety: 7.6, healthcare: 5.1, visaEase: 3.5, digitalInfra: 5.6, climate: 5.4, english: 10, lgbtqSafety: 1.2, techEcosystem: 7.2, naturalEnvironment: 5 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 250, transportUsd: 30, utilitiesUsd: 120, diningOutUsd: 180, healthInsuranceUsd: 60, totalEstimateUsd: 1240 },
    cities: ["Accra", "Kumasi", "Takoradi"],
    rawIndicators: { summerHighC: 31, winterLowC: 23, humidityAvg: 80, airQualityIndex: 90, seismicZone: 3, internetReliability: 7.8, englishDailyLife: 9.8, stability: 8.2, authoritarianRisk: 3.5, corruptionRisk: 5.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Grenada", iso2: "GD", iso3: "GRD", region: "Americas", subregion: "Caribbean",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "The 'Spice Isle', offering a sophisticated lifestyle, world-class sailing, and a top-tier medical school.",
    dimensions: { cost: 5.3, safety: 8.6, healthcare: 6.4, visaEase: 7.4, digitalInfra: 6.4, climate: 7.5, english: 10, lgbtqSafety: 2.0, techEcosystem: 4.5, naturalEnvironment: 8.5 },
    costBreakdown: { rentUsd: 1200, groceriesUsd: 400, transportUsd: 50, utilitiesUsd: 200, diningOutUsd: 300, healthInsuranceUsd: 100, totalEstimateUsd: 2250 },
    cities: ["St. George's", "Grand Anse"],
    rawIndicators: { summerHighC: 31, winterLowC: 22, humidityAvg: 75, airQualityIndex: 20, seismicZone: 3, internetReliability: 8.4, englishDailyLife: 10.0, stability: 8.8, authoritarianRisk: 1.2, corruptionRisk: 2.1 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Guatemala", iso2: "GT", iso3: "GTM", region: "Americas", subregion: "Central America",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The heart of the Maya world, characterized by volcanoes, colonial towns, and exceptional value.",
    dimensions: { cost: 8.3, safety: 5.4, healthcare: 5.2, visaEase: 3.5, digitalInfra: 4.9, climate: 7.5, english: 3.3, lgbtqSafety: 4.4, techEcosystem: 5.4, naturalEnvironment: 7.7 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 220, transportUsd: 25, utilitiesUsd: 90, diningOutUsd: 140, healthInsuranceUsd: 60, totalEstimateUsd: 1135 },
    cities: ["Guatemala City", "Antigua", "Quetzaltenango"],
    rawIndicators: { summerHighC: 25, winterLowC: 12, humidityAvg: 70, airQualityIndex: 75, seismicZone: 5, internetReliability: 7.5, englishDailyLife: 4.2, stability: 6.5, authoritarianRisk: 5.2, corruptionRisk: 6.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Guinea", iso2: "GN", iso3: "GIN", region: "Africa", subregion: "Western Africa",
    languages: ["French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A West African nation with immense mineral wealth and diverse cultural traditions.",
    dimensions: { cost: 8.7, safety: 4.5, healthcare: 3.1, visaEase: 2.3, digitalInfra: 3.3, climate: 5.1, english: 1, lgbtqSafety: 0.8, techEcosystem: 3.8, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 500, groceriesUsd: 220, transportUsd: 30, utilitiesUsd: 80, diningOutUsd: 150, healthInsuranceUsd: 60, totalEstimateUsd: 1040 },
    cities: ["Conakry", "Nzérékoré"],
    rawIndicators: { summerHighC: 31, winterLowC: 22, humidityAvg: 80, airQualityIndex: 85, seismicZone: 1, internetReliability: 5.8, englishDailyLife: 1.2, stability: 4.2, authoritarianRisk: 8.8, corruptionRisk: 8.2 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Guinea-Bissau", iso2: "GW", iso3: "GNB", region: "Africa", subregion: "Western Africa",
    languages: ["Portuguese"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A small West African nation known for its archipelago and Portuguese colonial history.",
    dimensions: { cost: 9.3, safety: 5.4, healthcare: 2.8, visaEase: 2.6, digitalInfra: 2.6, climate: 6.1, english: 1, lgbtqSafety: 4.8, techEcosystem: 2.5, naturalEnvironment: 7.7 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 60, diningOutUsd: 100, healthInsuranceUsd: 40, totalEstimateUsd: 800 },
    cities: ["Bissau", "Bafatá"],
    rawIndicators: { summerHighC: 32, winterLowC: 20, humidityAvg: 80, airQualityIndex: 55, seismicZone: 1, internetReliability: 4.8, englishDailyLife: 1.1, stability: 4.8, authoritarianRisk: 7.8, corruptionRisk: 8.5 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Guyana", iso2: "GY", iso3: "GUY", region: "Americas", subregion: "South America",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "An English-speaking South American nation with a booming oil economy and vast rainforests.",
    dimensions: { cost: 7.1, safety: 5.8, healthcare: 4.8, visaEase: 6.1, digitalInfra: 4.9, climate: 6.1, english: 10, lgbtqSafety: 3.2, techEcosystem: 4.8, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 800, groceriesUsd: 300, transportUsd: 40, utilitiesUsd: 120, diningOutUsd: 200, healthInsuranceUsd: 70, totalEstimateUsd: 1530 },
    cities: ["Georgetown", "Linden", "New Amsterdam"],
    rawIndicators: { summerHighC: 31, winterLowC: 23, humidityAvg: 80, airQualityIndex: 35, seismicZone: 1, internetReliability: 7.2, englishDailyLife: 10.0, stability: 7.1, authoritarianRisk: 4.5, corruptionRisk: 6.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Haiti", iso2: "HT", iso3: "HTI", region: "Americas", subregion: "Caribbean",
    languages: ["French", "Haitian Creole"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A nation of resilient spirit and deep cultural heritage facing extreme insecurity, gang control, and state-capacity collapse.",
    dimensions: { cost: 9.3, safety: 1.5, healthcare: 1.5, visaEase: 0.5, digitalInfra: 1.5, climate: 5.6, english: 1.3, lgbtqSafety: 2.0, techEcosystem: 1.5, naturalEnvironment: 2.4 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 150, transportUsd: 30, utilitiesUsd: 60, diningOutUsd: 80, healthInsuranceUsd: 50, totalEstimateUsd: 770 },
    cities: ["Port-au-Prince", "Cap-Haitien"],
    rawIndicators: { summerHighC: 32, winterLowC: 20, humidityAvg: 75, airQualityIndex: 45, seismicZone: 4, internetReliability: 3.5, englishDailyLife: 2.0, stability: 1.2, authoritarianRisk: 8.5, corruptionRisk: 9.2 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Honduras", iso2: "HN", iso3: "HND", region: "Americas", subregion: "Central America",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A biodiversity hotspot with stunning Caribbean coastlines and a growing focus on economic special zones.",
    dimensions: { cost: 8.5, safety: 3.5, healthcare: 3.5, visaEase: 4.5, digitalInfra: 3, climate: 6.1, english: 2.5, lgbtqSafety: 4.4, techEcosystem: 3.0, naturalEnvironment: 4.5 },
    costBreakdown: { rentUsd: 550, groceriesUsd: 220, transportUsd: 40, utilitiesUsd: 80, diningOutUsd: 130, healthInsuranceUsd: 70, totalEstimateUsd: 1090 },
    cities: ["Tegucigalpa", "San Pedro Sula", "Roatan"],
    rawIndicators: { summerHighC: 30, winterLowC: 18, humidityAvg: 70, airQualityIndex: 65, seismicZone: 3, internetReliability: 6.2, englishDailyLife: 3.8, stability: 4.5, authoritarianRisk: 6.2, corruptionRisk: 7.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Iceland", iso2: "IS", iso3: "ISL", region: "Europe", subregion: "Northern Europe",
    languages: ["Icelandic"], euMember: false, schengen: true, commonwealth: false,
    descriptor: "The world's safest nation—a land of dramatic volcanic landscapes and exceptional social equality.",
    dimensions: { cost: 3, safety: 9.8, healthcare: 9.2, visaEase: 2.5, digitalInfra: 9.3, climate: 1.8, english: 8.8, lgbtqSafety: 9.8, techEcosystem: 7.8, naturalEnvironment: 9.6 },
    costBreakdown: { rentUsd: 2300, groceriesUsd: 550, transportUsd: 100, utilitiesUsd: 150, diningOutUsd: 450, healthInsuranceUsd: 120, totalEstimateUsd: 3670 },
    cities: ["Reykjavik", "Akureyri"],
    rawIndicators: { summerHighC: 14, winterLowC: -2, humidityAvg: 78, airQualityIndex: 12, seismicZone: 4, internetReliability: 9.8, englishDailyLife: 9.5, stability: 9.7, authoritarianRisk: 0.5, corruptionRisk: 1.0 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "India", iso2: "IN", iso3: "IND", region: "Asia", subregion: "Southern Asia",
    languages: ["Hindi", "English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A global tech powerhouse offering incredible diversity and unmatched value for the adventurous professional.",
    dimensions: { cost: 9, safety: 5.8, healthcare: 5.5, visaEase: 4.9, digitalInfra: 6.1, climate: 4.2, english: 6.5, lgbtqSafety: 4.8, techEcosystem: 8.5, naturalEnvironment: 3.7 },
    costBreakdown: { rentUsd: 450, groceriesUsd: 180, transportUsd: 40, utilitiesUsd: 70, diningOutUsd: 130, healthInsuranceUsd: 60, totalEstimateUsd: 930 },
    cities: ["Bangalore", "Mumbai", "Delhi", "Hyderabad"],
    rawIndicators: { summerHighC: 36, winterLowC: 12, humidityAvg: 60, airQualityIndex: 160, seismicZone: 3, internetReliability: 8.5, englishDailyLife: 7.8, stability: 6.2, authoritarianRisk: 5.5, corruptionRisk: 6.8 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Iran", iso2: "IR", iso3: "IRN", region: "Asia", subregion: "Southern Asia",
    languages: ["Persian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A cradle of civilization with immense cultural depth, currently restricted by complex geopolitical constraints.",
    dimensions: { cost: 9.4, safety: 4.5, healthcare: 6.8, visaEase: 1.5, digitalInfra: 3.7, climate: 4.2, english: 2.1, lgbtqSafety: 0.5, techEcosystem: 6.5, naturalEnvironment: 4.5 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 140, transportUsd: 20, utilitiesUsd: 45, diningOutUsd: 110, healthInsuranceUsd: 45, totalEstimateUsd: 760 },
    cities: ["Tehran", "Isfahan", "Shiraz"],
    rawIndicators: { summerHighC: 37, winterLowC: 1, humidityAvg: 40, airQualityIndex: 130, seismicZone: 5, internetReliability: 5.5, englishDailyLife: 3.2, stability: 4.0, authoritarianRisk: 9.2, corruptionRisk: 7.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Iraq", iso2: "IQ", iso3: "IRQ", region: "Asia", subregion: "Western Asia",
    languages: ["Arabic", "Kurdish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "An ancient land in the process of reconstruction, offering high risk but significant emerging opportunities.",
    dimensions: { cost: 8.8, safety: 2.5, healthcare: 3.2, visaEase: 0.5, digitalInfra: 2.5, climate: 3, english: 1.6, lgbtqSafety: 1.2, techEcosystem: 3.5, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 500, groceriesUsd: 180, transportUsd: 40, utilitiesUsd: 90, diningOutUsd: 130, healthInsuranceUsd: 60, totalEstimateUsd: 1000 },
    cities: ["Baghdad", "Erbil", "Basra"],
    rawIndicators: { summerHighC: 45, winterLowC: 4, humidityAvg: 35, airQualityIndex: 110, seismicZone: 3, internetReliability: 4.8, englishDailyLife: 2.8, stability: 3.2, authoritarianRisk: 8.8, corruptionRisk: 9.0 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Ireland", iso2: "IE", iso3: "IRL", region: "Europe", subregion: "Northern Europe",
    languages: ["English", "Irish"], euMember: true, schengen: false, commonwealth: false,
    descriptor: "Europe's tech gateway—a friendly, English-speaking nation with exceptional corporate connectivity.",
    dimensions: { cost: 3.5, safety: 8.8, healthcare: 7.5, visaEase: 2.5, digitalInfra: 8.3, climate: 2.7, english: 10, lgbtqSafety: 9.2, techEcosystem: 8.2, naturalEnvironment: 5.9 },
    costBreakdown: { rentUsd: 2100, groceriesUsd: 450, transportUsd: 90, utilitiesUsd: 180, diningOutUsd: 400, healthInsuranceUsd: 120, totalEstimateUsd: 3340 },
    cities: ["Dublin", "Cork", "Galway"],
    rawIndicators: { summerHighC: 20, winterLowC: 3, humidityAvg: 82, airQualityIndex: 22, seismicZone: 0, internetReliability: 9.5, englishDailyLife: 10, stability: 9.4, authoritarianRisk: 0.8, corruptionRisk: 1.2 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Israel", iso2: "IL", iso3: "ISR", region: "Asia", subregion: "Western Asia",
    languages: ["Hebrew", "Arabic"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The 'Start-up Nation'—a global leader in innovation and venture capital despite a volatile regional context.",
    dimensions: { cost: 3.6, safety: 6.5, healthcare: 8.8, visaEase: 4.4, digitalInfra: 8.8, climate: 6.7, english: 6.9, lgbtqSafety: 7.5, techEcosystem: 9.8, naturalEnvironment: 3.1 },
    costBreakdown: { rentUsd: 2000, groceriesUsd: 550, transportUsd: 80, utilitiesUsd: 160, diningOutUsd: 450, healthInsuranceUsd: 100, totalEstimateUsd: 3340 },
    cities: ["Tel Aviv", "Jerusalem", "Haifa"],
    rawIndicators: { summerHighC: 31, winterLowC: 9, humidityAvg: 65, airQualityIndex: 55, seismicZone: 3, internetReliability: 9.4, englishDailyLife: 8.5, stability: 5.5, authoritarianRisk: 3.5, corruptionRisk: 3.2 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Ivory Coast", iso2: "CI", iso3: "CIV", region: "Africa", subregion: "Western Africa",
    languages: ["French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "Francophone West Africa's economic engine, featuring a rapidly developing infrastructure and vibrant urban culture.",
    dimensions: { cost: 7.9, safety: 5.2, healthcare: 3.8, visaEase: 4.1, digitalInfra: 4.1, climate: 3.8, english: 1, lgbtqSafety: 3.5, techEcosystem: 4.8, naturalEnvironment: 4.1 },
    costBreakdown: { rentUsd: 650, groceriesUsd: 220, transportUsd: 40, utilitiesUsd: 100, diningOutUsd: 150, healthInsuranceUsd: 80, totalEstimateUsd: 1240 },
    cities: ["Abidjan", "Yamoussoukro"],
    rawIndicators: { summerHighC: 32, winterLowC: 22, humidityAvg: 80, airQualityIndex: 85, seismicZone: 1, internetReliability: 6.8, englishDailyLife: 1.5, stability: 5.8, authoritarianRisk: 6.5, corruptionRisk: 7.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Jamaica", iso2: "JM", iso3: "JAM", region: "Americas", subregion: "Caribbean",
    languages: ["English", "Patois"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "An island of iconic culture and natural beauty with a strong service sector and close proximity to North America.",
    dimensions: { cost: 7, safety: 4.5, healthcare: 4.5, visaEase: 3.5, digitalInfra: 4.9, climate: 7.2, english: 9.3, lgbtqSafety: 3.2, techEcosystem: 4.2, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 800, groceriesUsd: 300, transportUsd: 50, utilitiesUsd: 150, diningOutUsd: 200, healthInsuranceUsd: 100, totalEstimateUsd: 1600 },
    cities: ["Kingston", "Montego Bay"],
    rawIndicators: { summerHighC: 33, winterLowC: 22, humidityAvg: 75, airQualityIndex: 35, seismicZone: 3, internetReliability: 7.5, englishDailyLife: 9.8, stability: 7.2, authoritarianRisk: 2.5, corruptionRisk: 6.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Jordan", iso2: "JO", iso3: "JOR", region: "Asia", subregion: "Western Asia",
    languages: ["Arabic"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A stable oasis in a complex region, known for its world-class heritage sites and highly educated workforce.",
    dimensions: { cost: 7.5, safety: 7.5, healthcare: 7.1, visaEase: 4, digitalInfra: 5.2, climate: 6.1, english: 4.1, lgbtqSafety: 4.0, techEcosystem: 6.2, naturalEnvironment: 2.4 },
    costBreakdown: { rentUsd: 700, groceriesUsd: 280, transportUsd: 60, utilitiesUsd: 100, diningOutUsd: 180, healthInsuranceUsd: 90, totalEstimateUsd: 1410 },
    cities: ["Amman", "Aqaba", "Irbid"],
    rawIndicators: { summerHighC: 33, winterLowC: 4, humidityAvg: 50, airQualityIndex: 65, seismicZone: 3, internetReliability: 8.2, englishDailyLife: 6.5, stability: 7.8, authoritarianRisk: 6.8, corruptionRisk: 5.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Kazakhstan", iso2: "KZ", iso3: "KAZ", region: "Asia", subregion: "Central Asia",
    languages: ["Kazakh", "Russian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "Central Asia's powerhouse—a vast, resource-rich nation rapidly modernizing its digital and urban infrastructure.",
    dimensions: { cost: 8.5, safety: 5.5, healthcare: 5.5, visaEase: 7.5, digitalInfra: 6.9, climate: 2, english: 1.8, lgbtqSafety: 4.5, techEcosystem: 6.5, naturalEnvironment: 5.2 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 200, transportUsd: 30, utilitiesUsd: 70, diningOutUsd: 140, healthInsuranceUsd: 50, totalEstimateUsd: 1090 },
    cities: ["Almaty", "Astana", "Shymkent"],
    rawIndicators: { summerHighC: 30, winterLowC: -15, humidityAvg: 55, airQualityIndex: 120, seismicZone: 4, internetReliability: 8.8, englishDailyLife: 2.8, stability: 7.2, authoritarianRisk: 7.5, corruptionRisk: 6.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Kenya", iso2: "KE", iso3: "KEN", region: "Africa", subregion: "Eastern Africa",
    languages: ["Swahili", "English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "The 'Silicon Savannah'—East Africa's premier tech hub and a world leader in mobile payment innovation.",
    dimensions: { cost: 8.1, safety: 5.5, healthcare: 4.5, visaEase: 5, digitalInfra: 6.1, climate: 6.7, english: 7.8, lgbtqSafety: 2.5, techEcosystem: 7.8, naturalEnvironment: 7.7 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 220, transportUsd: 40, utilitiesUsd: 70, diningOutUsd: 150, healthInsuranceUsd: 80, totalEstimateUsd: 1160 },
    cities: ["Nairobi", "Mombasa", "Kisumu"],
    rawIndicators: { summerHighC: 26, winterLowC: 12, humidityAvg: 65, airQualityIndex: 75, seismicZone: 2, internetReliability: 8.1, englishDailyLife: 8.8, stability: 6.5, authoritarianRisk: 5.2, corruptionRisk: 7.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Kiribati", iso2: "KI", iso3: "KIR", region: "Oceania", subregion: "Micronesia",
    languages: ["English", "Gilbertese"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A remote Pacific nation of stunning atolls, facing critical climate challenges but offering unique isolation.",
    dimensions: { cost: 7.8, safety: 8.2, healthcare: 2.5, visaEase: 3.5, digitalInfra: 2.1, climate: 5.6, english: 6.1, lgbtqSafety: 4.5, techEcosystem: 1.5, naturalEnvironment: 8.1 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 350, transportUsd: 30, utilitiesUsd: 100, diningOutUsd: 120, healthInsuranceUsd: 50, totalEstimateUsd: 1250 },
    cities: ["Tarawa", "Kiritimati"],
    rawIndicators: { summerHighC: 31, winterLowC: 25, humidityAvg: 80, airQualityIndex: 15, seismicZone: 0, internetReliability: 4.2, englishDailyLife: 6.5, stability: 8.5, authoritarianRisk: 1.5, corruptionRisk: 4.2 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Kuwait", iso2: "KW", iso3: "KWT", region: "Asia", subregion: "Western Asia",
    languages: ["Arabic", "English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A wealthy Gulf nation offering a blend of traditional culture and high-end modern amenities.",
    dimensions: { cost: 4.9, safety: 5.5, healthcare: 7.5, visaEase: 3, digitalInfra: 8.3, climate: 1.5, english: 5.6, lgbtqSafety: 1.8, techEcosystem: 6.2, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 1500, groceriesUsd: 400, transportUsd: 50, utilitiesUsd: 80, diningOutUsd: 300, healthInsuranceUsd: 100, totalEstimateUsd: 2430 },
    cities: ["Kuwait City", "Salmiya"],
    rawIndicators: { summerHighC: 46, winterLowC: 8, humidityAvg: 40, airQualityIndex: 140, seismicZone: 1, internetReliability: 9.2, englishDailyLife: 8.2, stability: 8.8, authoritarianRisk: 7.2, corruptionRisk: 4.8 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Kyrgyzstan", iso2: "KG", iso3: "KGZ", region: "Asia", subregion: "Central Asia",
    languages: ["Kyrgyz", "Russian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A mountainous nomad land offering incredible natural beauty and a low cost of living for the intrepid.",
    dimensions: { cost: 9.2, safety: 6.8, healthcare: 3.5, visaEase: 5, digitalInfra: 4.4, climate: 3.4, english: 1.5, lgbtqSafety: 3.2, techEcosystem: 4.5, naturalEnvironment: 8.1 },
    costBreakdown: { rentUsd: 450, groceriesUsd: 160, transportUsd: 20, utilitiesUsd: 50, diningOutUsd: 100, healthInsuranceUsd: 40, totalEstimateUsd: 820 },
    cities: ["Bishkek", "Osh"],
    rawIndicators: { summerHighC: 32, winterLowC: -8, humidityAvg: 50, airQualityIndex: 150, seismicZone: 4, internetReliability: 7.2, englishDailyLife: 2.2, stability: 5.5, authoritarianRisk: 6.8, corruptionRisk: 7.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Laos", iso2: "LA", iso3: "LAO", region: "Asia", subregion: "Southeast Asia",
    languages: ["Lao"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A landlocked nation of serene landscapes and a relaxed pace of life, slowly modernizing its core infrastructure.",
    dimensions: { cost: 9, safety: 5.5, healthcare: 3.2, visaEase: 4.5, digitalInfra: 3.7, climate: 4.7, english: 2.1, lgbtqSafety: 4.5, techEcosystem: 3.2, naturalEnvironment: 6.6 },
    costBreakdown: { rentUsd: 450, groceriesUsd: 180, transportUsd: 30, utilitiesUsd: 60, diningOutUsd: 120, healthInsuranceUsd: 40, totalEstimateUsd: 880 },
    cities: ["Vientiane", "Luang Prabang"],
    rawIndicators: { summerHighC: 33, winterLowC: 17, humidityAvg: 75, airQualityIndex: 85, seismicZone: 2, internetReliability: 6.5, englishDailyLife: 3.2, stability: 7.5, authoritarianRisk: 8.2, corruptionRisk: 7.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Latvia", iso2: "LV", iso3: "LVA", region: "Europe", subregion: "Northern Europe",
    languages: ["Latvian"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "A Baltic gem offering high-speed internet, a thriving startup scene, and beautiful forest landscapes.",
    dimensions: { cost: 7.2, safety: 8.5, healthcare: 7.0, visaEase: 3.5, digitalInfra: 8.5, climate: 2.3, english: 5.6, lgbtqSafety: 6.5, techEcosystem: 7.5, naturalEnvironment: 4.5 },
    costBreakdown: { rentUsd: 750, groceriesUsd: 280, transportUsd: 40, utilitiesUsd: 180, diningOutUsd: 220, healthInsuranceUsd: 60, totalEstimateUsd: 1530 },
    cities: ["Riga", "Jurmala", "Liepaja"],
    rawIndicators: { summerHighC: 22, winterLowC: -5, humidityAvg: 78, airQualityIndex: 25, seismicZone: 1, internetReliability: 9.6, englishDailyLife: 8.2, stability: 9.0, authoritarianRisk: 1.5, corruptionRisk: 2.5 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Lebanon", iso2: "LB", iso3: "LBN", region: "Asia", subregion: "Western Asia",
    languages: ["Arabic", "French", "English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A culturally rich Mediterranean crossroads currently navigating a severe economic and political crisis.",
    dimensions: { cost: 7.8, safety: 4.2, healthcare: 5.5, visaEase: 3, digitalInfra: 2.5, climate: 7.2, english: 6.5, lgbtqSafety: 3.0, techEcosystem: 5.2, naturalEnvironment: 3.7 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 250, transportUsd: 40, utilitiesUsd: 120, diningOutUsd: 180, healthInsuranceUsd: 70, totalEstimateUsd: 1260 },
    cities: ["Beirut", "Byblos", "Tripoli"],
    rawIndicators: { summerHighC: 30, winterLowC: 11, humidityAvg: 65, airQualityIndex: 95, seismicZone: 4, internetReliability: 4.5, englishDailyLife: 7.8, stability: 2.5, authoritarianRisk: 6.5, corruptionRisk: 9.0 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Lesotho", iso2: "LS", iso3: "LSO", region: "Africa", subregion: "Southern Africa",
    languages: ["Sesotho", "English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "The 'Kingdom in the Sky'—a high-altitude nation with breathtaking mountains and a unique cultural identity.",
    dimensions: { cost: 9.2, safety: 6.2, healthcare: 2.8, visaEase: 3.5, digitalInfra: 3, climate: 3, english: 6.9, lgbtqSafety: 4.2, techEcosystem: 2.5, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 180, transportUsd: 30, utilitiesUsd: 60, diningOutUsd: 100, healthInsuranceUsd: 40, totalEstimateUsd: 810 },
    cities: ["Maseru", "Teyateyaneng"],
    rawIndicators: { summerHighC: 25, winterLowC: -1, humidityAvg: 50, airQualityIndex: 35, seismicZone: 1, internetReliability: 6.2, englishDailyLife: 7.2, stability: 6.5, authoritarianRisk: 5.5, corruptionRisk: 6.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Liberia", iso2: "LR", iso3: "LBR", region: "Africa", subregion: "Western Africa",
    languages: ["English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "Africa's oldest republic, rich in natural resources and slowly rebuilding its infrastructure after years of conflict.",
    dimensions: { cost: 7.7, safety: 4.8, healthcare: 2.2, visaEase: 2.1, digitalInfra: 2.1, climate: 4.7, english: 8.8, lgbtqSafety: 2.2, techEcosystem: 2.0, naturalEnvironment: 5.2 },
    costBreakdown: { rentUsd: 700, groceriesUsd: 250, transportUsd: 40, utilitiesUsd: 100, diningOutUsd: 120, healthInsuranceUsd: 60, totalEstimateUsd: 1270 },
    cities: ["Monrovia", "Gbarnga"],
    rawIndicators: { summerHighC: 31, winterLowC: 23, humidityAvg: 82, airQualityIndex: 55, seismicZone: 1, internetReliability: 4.8, englishDailyLife: 8.5, stability: 5.5, authoritarianRisk: 6.2, corruptionRisk: 8.5 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Libya", iso2: "LY", iso3: "LBY", region: "Africa", subregion: "Northern Africa",
    languages: ["Arabic"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A resource-rich Mediterranean nation facing persistent stability and security challenges during its transition.",
    dimensions: { cost: 9.3, safety: 1.8, healthcare: 2.5, visaEase: 0.5, digitalInfra: 1.6, climate: 5.6, english: 1.3, lgbtqSafety: 1.0, techEcosystem: 2.5, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 150, transportUsd: 30, utilitiesUsd: 60, diningOutUsd: 100, healthInsuranceUsd: 50, totalEstimateUsd: 790 },
    cities: ["Tripoli", "Benghazi"],
    rawIndicators: { summerHighC: 36, winterLowC: 8, humidityAvg: 55, airQualityIndex: 85, seismicZone: 2, internetReliability: 4.2, englishDailyLife: 2.2, stability: 1.5, authoritarianRisk: 9.5, corruptionRisk: 9.8 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Liechtenstein", iso2: "LI", iso3: "LIE", region: "Europe", subregion: "Western Europe",
    languages: ["German"], euMember: false, schengen: true, commonwealth: false,
    descriptor: "A tiny, ultra-wealthy alpine principality offering exceptional safety, stability, and high-tech manufacturing.",
    dimensions: { cost: 2.4, safety: 9.6, healthcare: 9.4, visaEase: 1.5, digitalInfra: 8.8, climate: 4.2, english: 5.2, lgbtqSafety: 8.8, techEcosystem: 8.2, naturalEnvironment: 8.1 },
    costBreakdown: { rentUsd: 2800, groceriesUsd: 650, transportUsd: 80, utilitiesUsd: 250, diningOutUsd: 600, healthInsuranceUsd: 350, totalEstimateUsd: 4730 },
    cities: ["Vaduz", "Schaan"],
    rawIndicators: { summerHighC: 24, winterLowC: -2, humidityAvg: 72, airQualityIndex: 20, seismicZone: 2, internetReliability: 9.8, englishDailyLife: 7.8, stability: 9.9, authoritarianRisk: 0.5, corruptionRisk: 0.8 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Lithuania", iso2: "LT", iso3: "LTU", region: "Europe", subregion: "Northern Europe",
    languages: ["Lithuanian"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "A digital powerhouse in the Baltics, known for its leading fintech ecosystem and high quality of life.",
    dimensions: { cost: 6.7, safety: 8.6, healthcare: 7.5, visaEase: 3.5, digitalInfra: 9.3, climate: 2.3, english: 5.6, lgbtqSafety: 5.0, techEcosystem: 8.5, naturalEnvironment: 5.2 },
    costBreakdown: { rentUsd: 850, groceriesUsd: 300, transportUsd: 40, utilitiesUsd: 160, diningOutUsd: 250, healthInsuranceUsd: 60, totalEstimateUsd: 1660 },
    cities: ["Vilnius", "Kaunas", "Klaipeda"],
    rawIndicators: { summerHighC: 22, winterLowC: -5, humidityAvg: 78, airQualityIndex: 22, seismicZone: 1, internetReliability: 9.9, englishDailyLife: 8.5, stability: 9.2, authoritarianRisk: 1.2, corruptionRisk: 2.2 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Luxembourg", iso2: "LU", iso3: "LUX", region: "Europe", subregion: "Western Europe",
    languages: ["Luxembourgish", "French", "German"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "A global financial hub and one of the world's wealthiest nations, offering unparalleled international connectivity.",
    dimensions: { cost: 2.7, safety: 9.4, healthcare: 9.2, visaEase: 6.1, digitalInfra: 9.1, climate: 3.4, english: 7.8, lgbtqSafety: 9.4, techEcosystem: 8.8, naturalEnvironment: 3.7 },
    costBreakdown: { rentUsd: 2500, groceriesUsd: 550, transportUsd: 0 /* free public transit since March 2020 */, utilitiesUsd: 220, diningOutUsd: 500, healthInsuranceUsd: 150, totalEstimateUsd: 3920 },
    cities: ["Luxembourg City", "Esch-sur-Alzette"],
    rawIndicators: { summerHighC: 23, winterLowC: 0, humidityAvg: 75, airQualityIndex: 25, seismicZone: 1, internetReliability: 9.8, englishDailyLife: 9.2, stability: 9.8, authoritarianRisk: 0.5, corruptionRisk: 0.8 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Madagascar", iso2: "MG", iso3: "MDG", region: "Africa", subregion: "Eastern Africa",
    languages: ["Malagasy", "French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A biodiversity hotspot with unique flora and fauna, offering a rugged and adventurous lifestyle.",
    dimensions: { cost: 9.8, safety: 5.5, healthcare: 3.2, visaEase: 3.5, digitalInfra: 2.7, climate: 5.6, english: 2.1, lgbtqSafety: 4.0, techEcosystem: 3.2, naturalEnvironment: 8.5 },
    costBreakdown: { rentUsd: 250, groceriesUsd: 150, transportUsd: 20, utilitiesUsd: 50, diningOutUsd: 80, healthInsuranceUsd: 40, totalEstimateUsd: 590 },
    cities: ["Antananarivo", "Nosy Be", "Toamasina"],
    rawIndicators: { summerHighC: 28, winterLowC: 10, humidityAvg: 75, airQualityIndex: 45, seismicZone: 2, internetReliability: 4.5, englishDailyLife: 3.0, stability: 5.2, authoritarianRisk: 4.5, corruptionRisk: 7.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Malawi", iso2: "MW", iso3: "MWI", region: "Africa", subregion: "Eastern Africa",
    languages: ["English", "Chichewa"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "The 'Warm Heart of Africa' is known for its friendly people and the stunning Lake Malawi.",
    dimensions: { cost: 10, safety: 6.8, healthcare: 3.5, visaEase: 3, digitalInfra: 2.3, climate: 5.1, english: 7.4, lgbtqSafety: 1.5, techEcosystem: 2.8, naturalEnvironment: 5.9 },
    costBreakdown: { rentUsd: 200, groceriesUsd: 140, transportUsd: 15, utilitiesUsd: 40, diningOutUsd: 70, healthInsuranceUsd: 35, totalEstimateUsd: 500 },
    cities: ["Lilongwe", "Blantyre", "Mzuzu"],
    rawIndicators: { summerHighC: 29, winterLowC: 12, humidityAvg: 65, airQualityIndex: 40, seismicZone: 3, internetReliability: 4.2, englishDailyLife: 7.5, stability: 6.5, authoritarianRisk: 3.8, corruptionRisk: 6.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Maldives", iso2: "MV", iso3: "MDV", region: "Asia", subregion: "Southern Asia",
    languages: ["Dhivehi"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "An archipelago of coral islands offering unparalleled marine beauty and a unique island lifestyle.",
    dimensions: { cost: 5.1, safety: 8.2, healthcare: 5.4, visaEase: 2, digitalInfra: 5.2, climate: 7.2, english: 5.6, lgbtqSafety: 1.2, techEcosystem: 4.5, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 1200, groceriesUsd: 400, transportUsd: 50, utilitiesUsd: 150, diningOutUsd: 400, healthInsuranceUsd: 100, totalEstimateUsd: 2300 },
    cities: ["Malé", "Hulhumalé", "Maafushi"],
    rawIndicators: { summerHighC: 31, winterLowC: 25, humidityAvg: 80, airQualityIndex: 25, seismicZone: 1, internetReliability: 7.0, englishDailyLife: 6.5, stability: 7.2, authoritarianRisk: 5.5, corruptionRisk: 5.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Mali", iso2: "ML", iso3: "MLI", region: "Africa", subregion: "Western Africa",
    languages: ["Bambara", "French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A West African nation with a rich history of ancient empires, though currently facing security challenges.",
    dimensions: { cost: 9.1, safety: 2.5, healthcare: 2.8, visaEase: 3, digitalInfra: 2.1, climate: 2, english: 1.5, lgbtqSafety: 1.8, techEcosystem: 3.5, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 200, transportUsd: 30, utilitiesUsd: 80, diningOutUsd: 100, healthInsuranceUsd: 50, totalEstimateUsd: 860 },
    cities: ["Bamako", "Sikasso", "Mopti"],
    rawIndicators: { summerHighC: 39, winterLowC: 16, humidityAvg: 40, airQualityIndex: 85, seismicZone: 1, internetReliability: 4.0, englishDailyLife: 2.5, stability: 2.1, authoritarianRisk: 8.5, corruptionRisk: 8.2 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Marshall Islands", iso2: "MH", iso3: "MHL", region: "Oceania", subregion: "Micronesia",
    languages: ["Marshallese", "English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A sprawling chain of volcanic islands and coral atolls in the central Pacific Ocean.",
    dimensions: { cost: 5.7, safety: 8.5, healthcare: 4.2, visaEase: 2.5, digitalInfra: 3.7, climate: 6.1, english: 7.8, lgbtqSafety: 5.3, techEcosystem: 3.5, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 1000, groceriesUsd: 500, transportUsd: 60, utilitiesUsd: 200, diningOutUsd: 300, healthInsuranceUsd: 120, totalEstimateUsd: 2180 },
    cities: ["Majuro", "Ebeye"],
    rawIndicators: { summerHighC: 30, winterLowC: 25, humidityAvg: 80, airQualityIndex: 20, seismicZone: 1, internetReliability: 5.5, englishDailyLife: 8.2, stability: 8.5, authoritarianRisk: 2.5, corruptionRisk: 4.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Mauritania", iso2: "MR", iso3: "MRT", region: "Africa", subregion: "Western Africa",
    languages: ["Arabic", "French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A bridge between Arab North Africa and Sub-Saharan Africa, dominated by the Sahara Desert.",
    dimensions: { cost: 8.8, safety: 4.8, healthcare: 3.0, visaEase: 2.7, digitalInfra: 2.3, climate: 1.8, english: 1.8, lgbtqSafety: 0.5, techEcosystem: 3.0, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 450, groceriesUsd: 220, transportUsd: 40, utilitiesUsd: 90, diningOutUsd: 120, healthInsuranceUsd: 60, totalEstimateUsd: 980 },
    cities: ["Nouakchott", "Nouadhibou"],
    rawIndicators: { summerHighC: 38, winterLowC: 14, humidityAvg: 30, airQualityIndex: 90, seismicZone: 1, internetReliability: 4.2, englishDailyLife: 2.8, stability: 5.5, authoritarianRisk: 7.8, corruptionRisk: 7.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Mauritius", iso2: "MU", iso3: "MUS", region: "Africa", subregion: "Eastern Africa",
    languages: ["English", "French", "Mauritian Creole"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A stable, tech-forward island nation with a high quality of life and a diverse culture.",
    dimensions: { cost: 6.5, safety: 8.5, healthcare: 7.2, visaEase: 8, digitalInfra: 7.4, climate: 7.2, english: 7.8, lgbtqSafety: 6, techEcosystem: 6.8, naturalEnvironment: 7.7 },
    costBreakdown: { rentUsd: 900, groceriesUsd: 300, transportUsd: 60, utilitiesUsd: 120, diningOutUsd: 250, healthInsuranceUsd: 80, totalEstimateUsd: 1710 },
    cities: ["Port Louis", "Grand Baie", "Flic en Flac"],
    rawIndicators: { summerHighC: 30, winterLowC: 17, humidityAvg: 75, airQualityIndex: 25, seismicZone: 1, internetReliability: 8.5, englishDailyLife: 8.8, stability: 8.8, authoritarianRisk: 2.2, corruptionRisk: 3.1 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Micronesia", iso2: "FM", iso3: "FSM", region: "Oceania", subregion: "Micronesia",
    languages: ["English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A collection of 607 islands spread across the Western Pacific Ocean, offering pristine diving and nature.",
    dimensions: { cost: 6.3, safety: 8.2, healthcare: 3.8, visaEase: 6.5, digitalInfra: 3.3, climate: 6.1, english: 8.5, lgbtqSafety: 5, techEcosystem: 2.8, naturalEnvironment: 8.1 },
    costBreakdown: { rentUsd: 800, groceriesUsd: 450, transportUsd: 50, utilitiesUsd: 180, diningOutUsd: 200, healthInsuranceUsd: 100, totalEstimateUsd: 1780 },
    cities: ["Palikir", "Weno", "Colonia"],
    rawIndicators: { summerHighC: 30, winterLowC: 24, humidityAvg: 80, airQualityIndex: 15, seismicZone: 2, internetReliability: 5.0, englishDailyLife: 8.5, stability: 8.2, authoritarianRisk: 2.8, corruptionRisk: 4.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Moldova", iso2: "MD", iso3: "MDA", region: "Europe", subregion: "Eastern Europe",
    languages: ["Romanian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A small, landlocked nation in Eastern Europe known for its wine industry and affordable living.",
    dimensions: { cost: 7.6, safety: 7.2, healthcare: 5.8, visaEase: 6.9, digitalInfra: 7.8, climate: 4.2, english: 3, lgbtqSafety: 5.8, techEcosystem: 6.5, naturalEnvironment: 2.7 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 250, transportUsd: 30, utilitiesUsd: 180, diningOutUsd: 200, healthInsuranceUsd: 60, totalEstimateUsd: 1320 },
    cities: ["Chișinău", "Tiraspol", "Bălți"],
    rawIndicators: { summerHighC: 28, winterLowC: -4, humidityAvg: 65, airQualityIndex: 45, seismicZone: 4, internetReliability: 9.2, englishDailyLife: 4.2, stability: 6.8, authoritarianRisk: 3.5, corruptionRisk: 6.5 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Monaco", iso2: "MC", iso3: "MCO", region: "Europe", subregion: "Southern Europe",
    languages: ["French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A sovereign city-state on the French Riviera, synonymous with wealth, safety, and luxury.",
    dimensions: { cost: 1, safety: 9.8, healthcare: 9.5, visaEase: 3.7, digitalInfra: 9.3, climate: 7.8, english: 6.9, lgbtqSafety: 6.5, techEcosystem: 8.5, naturalEnvironment: 3.1 },
    costBreakdown: { rentUsd: 7000, groceriesUsd: 1200, transportUsd: 150, utilitiesUsd: 400, diningOutUsd: 1500, healthInsuranceUsd: 500, totalEstimateUsd: 10750 },
    cities: ["Monaco City", "Monte Carlo"],
    rawIndicators: { summerHighC: 26, winterLowC: 8, humidityAvg: 65, airQualityIndex: 30, seismicZone: 2, internetReliability: 9.8, englishDailyLife: 8.2, stability: 9.8, authoritarianRisk: 0.8, corruptionRisk: 1.2 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Mongolia", iso2: "MN", iso3: "MNG", region: "Asia", subregion: "Eastern Asia",
    languages: ["Mongolian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A land of vast, rugged landscapes and nomadic culture, with the coldest capital city in the world.",
    dimensions: { cost: 8.6, safety: 7.5, healthcare: 4.5, visaEase: 5, digitalInfra: 4.9, climate: 1.5, english: 2.7, lgbtqSafety: 6.5, techEcosystem: 4.8, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 500, groceriesUsd: 220, transportUsd: 30, utilitiesUsd: 100, diningOutUsd: 180, healthInsuranceUsd: 50, totalEstimateUsd: 1080 },
    cities: ["Ulaanbaatar", "Erdenet", "Darkhan"],
    rawIndicators: { summerHighC: 22, winterLowC: -25, humidityAvg: 45, airQualityIndex: 110, seismicZone: 3, internetReliability: 7.5, englishDailyLife: 4.5, stability: 7.8, authoritarianRisk: 3.2, corruptionRisk: 5.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Mozambique", iso2: "MZ", iso3: "MOZ", region: "Africa", subregion: "Eastern Africa",
    languages: ["Portuguese"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A coastal nation with stunning beaches and a vibrant blend of African and Portuguese influences.",
    dimensions: { cost: 7.5, safety: 5.2, healthcare: 3.5, visaEase: 3, digitalInfra: 4.1, climate: 6.1, english: 2.3, lgbtqSafety: 5.2, techEcosystem: 4.2, naturalEnvironment: 6.6 },
    costBreakdown: { rentUsd: 700, groceriesUsd: 280, transportUsd: 40, utilitiesUsd: 110, diningOutUsd: 200, healthInsuranceUsd: 70, totalEstimateUsd: 1400 },
    cities: ["Maputo", "Beira", "Pemba"],
    rawIndicators: { summerHighC: 31, winterLowC: 14, humidityAvg: 70, airQualityIndex: 40, seismicZone: 2, internetReliability: 6.2, englishDailyLife: 3.5, stability: 5.8, authoritarianRisk: 5.2, corruptionRisk: 7.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Myanmar", iso2: "MM", iso3: "MMR", region: "Asia", subregion: "Southeast Asia",
    languages: ["Burmese"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A nation with deep cultural heritage now shaped by military rule, armed conflict, and severe civil instability.",
    dimensions: { cost: 8.8, safety: 2.4, healthcare: 3.0, visaEase: 0.5, digitalInfra: 3.5, climate: 3.8, english: 3, lgbtqSafety: 2.5, techEcosystem: 4.0, naturalEnvironment: 6.6 },
    costBreakdown: { rentUsd: 500, groceriesUsd: 200, transportUsd: 30, utilitiesUsd: 70, diningOutUsd: 150, healthInsuranceUsd: 50, totalEstimateUsd: 1000 },
    cities: ["Yangon", "Mandalay", "Naypyidaw"],
    rawIndicators: { summerHighC: 36, winterLowC: 18, humidityAvg: 70, airQualityIndex: 95, seismicZone: 4, internetReliability: 5.8, englishDailyLife: 4.2, stability: 2.5, authoritarianRisk: 9.5, corruptionRisk: 8.8 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Namibia", iso2: "NA", iso3: "NAM", region: "Africa", subregion: "Southern Africa",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A land of dramatic desert landscapes, wildlife, and a remarkably stable social environment.",
    dimensions: { cost: 6.8, safety: 7.8, healthcare: 5.5, visaEase: 7, digitalInfra: 5.2, climate: 6.7, english: 8.3, lgbtqSafety: 5.8, techEcosystem: 4.5, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 850, groceriesUsd: 320, transportUsd: 50, utilitiesUsd: 130, diningOutUsd: 220, healthInsuranceUsd: 80, totalEstimateUsd: 1650 },
    cities: ["Windhoek", "Swakopmund", "Walvis Bay"],
    rawIndicators: { summerHighC: 30, winterLowC: 7, humidityAvg: 30, airQualityIndex: 25, seismicZone: 1, internetReliability: 7.2, englishDailyLife: 8.5, stability: 8.5, authoritarianRisk: 2.8, corruptionRisk: 4.1 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Nauru", iso2: "NR", iso3: "NRU", region: "Oceania", subregion: "Micronesia",
    languages: ["Nauruan", "English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "One of the world's smallest nations, a single coral island in the South Pacific.",
    dimensions: { cost: 5.6, safety: 7.5, healthcare: 3.5, visaEase: 2.1, digitalInfra: 2.7, climate: 5.6, english: 7.8, lgbtqSafety: 5.6, techEcosystem: 2.0, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 900, groceriesUsd: 600, transportUsd: 40, utilitiesUsd: 250, diningOutUsd: 250, healthInsuranceUsd: 150, totalEstimateUsd: 2190 },
    cities: ["Yaren", "Denigomodu"],
    rawIndicators: { summerHighC: 30, winterLowC: 24, humidityAvg: 75, airQualityIndex: 20, seismicZone: 1, internetReliability: 4.5, englishDailyLife: 8.2, stability: 7.2, authoritarianRisk: 4.5, corruptionRisk: 5.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Nepal", iso2: "NP", iso3: "NPL", region: "Asia", subregion: "Southern Asia",
    languages: ["Nepali"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The roof of the world, home to Mount Everest and a deeply spiritual Himalayan culture.",
    dimensions: { cost: 9.4, safety: 7.8, healthcare: 4.2, visaEase: 5, digitalInfra: 4.1, climate: 4.7, english: 4.1, lgbtqSafety: 8.2, techEcosystem: 4.5, naturalEnvironment: 10 },
    costBreakdown: { rentUsd: 350, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 50, diningOutUsd: 120, healthInsuranceUsd: 40, totalEstimateUsd: 760 },
    cities: ["Kathmandu", "Pokhara", "Lalitpur"],
    rawIndicators: { summerHighC: 29, winterLowC: 2, humidityAvg: 60, airQualityIndex: 140, seismicZone: 5, internetReliability: 6.5, englishDailyLife: 6.2, stability: 6.2, authoritarianRisk: 4.8, corruptionRisk: 6.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Nicaragua", iso2: "NI", iso3: "NIC", region: "Americas", subregion: "Central America",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The land of lakes and volcanoes, offering extreme affordability and natural beauty.",
    dimensions: { cost: 8.8, safety: 5.5, healthcare: 4.5, visaEase: 4, digitalInfra: 4.4, climate: 6.1, english: 2.7, lgbtqSafety: 5.5, techEcosystem: 4.0, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 450, groceriesUsd: 220, transportUsd: 30, utilitiesUsd: 90, diningOutUsd: 150, healthInsuranceUsd: 50, totalEstimateUsd: 990 },
    cities: ["Managua", "Granada", "San Juan del Sur"],
    rawIndicators: { summerHighC: 33, winterLowC: 21, humidityAvg: 70, airQualityIndex: 45, seismicZone: 4, internetReliability: 6.8, englishDailyLife: 4.5, stability: 4.5, authoritarianRisk: 8.5, corruptionRisk: 7.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Niger", iso2: "NE", iso3: "NER", region: "Africa", subregion: "Western Africa",
    languages: ["French", "Hausa"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A large landlocked country in the heart of the Sahel, with a rich Saharan history.",
    dimensions: { cost: 9.1, safety: 3.5, healthcare: 2.8, visaEase: 2.7, digitalInfra: 1.8, climate: 1.5, english: 1.3, lgbtqSafety: 2.5, techEcosystem: 3.0, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 200, transportUsd: 30, utilitiesUsd: 80, diningOutUsd: 100, healthInsuranceUsd: 50, totalEstimateUsd: 860 },
    cities: ["Niamey", "Zinder", "Maradi"],
    rawIndicators: { summerHighC: 41, winterLowC: 15, humidityAvg: 30, airQualityIndex: 85, seismicZone: 1, internetReliability: 3.8, englishDailyLife: 2.2, stability: 3.1, authoritarianRisk: 8.8, corruptionRisk: 8.5 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Nigeria", iso2: "NG", iso3: "NGA", region: "Africa", subregion: "Western Africa",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "The giant of Africa, with a massive population, a booming tech scene, and a vibrant culture.",
    dimensions: { cost: 5.5, safety: 4.2, healthcare: 4.0, visaEase: 2.5, digitalInfra: 5.2, climate: 5.1, english: 7.8, lgbtqSafety: 1.2, techEcosystem: 7.5, naturalEnvironment: 4.5 },
    costBreakdown: { rentUsd: 1200, groceriesUsd: 350, transportUsd: 80, utilitiesUsd: 150, diningOutUsd: 300, healthInsuranceUsd: 120, totalEstimateUsd: 2200 },
    cities: ["Lagos", "Abuja", "Ibadan"],
    rawIndicators: { summerHighC: 32, winterLowC: 18, humidityAvg: 75, airQualityIndex: 120, seismicZone: 1, internetReliability: 7.2, englishDailyLife: 8.8, stability: 5.2, authoritarianRisk: 5.5, corruptionRisk: 8.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "North Korea", iso2: "KP", iso3: "PRK", region: "Asia", subregion: "Eastern Asia",
    languages: ["Korean"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The most isolated nation on Earth, highly centralized and strictly controlled.",
    dimensions: { cost: 9.8, safety: 3.5, healthcare: 3.5, visaEase: 0.5, digitalInfra: 1.5, climate: 3, english: 1, lgbtqSafety: 1, techEcosystem: 1.5, naturalEnvironment: 3.1 },
    costBreakdown: { rentUsd: 300, groceriesUsd: 150, transportUsd: 10, utilitiesUsd: 30, diningOutUsd: 50, healthInsuranceUsd: 20, totalEstimateUsd: 560 },
    cities: ["Pyongyang", "Kaesong"],
    rawIndicators: { summerHighC: 28, winterLowC: -10, humidityAvg: 65, airQualityIndex: 55, seismicZone: 2, internetReliability: 1.0, englishDailyLife: 1.5, stability: 3.5, authoritarianRisk: 10.0, corruptionRisk: 8.5 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Norway", iso2: "NO", iso3: "NOR", region: "Europe", subregion: "Northern Europe",
    languages: ["Norwegian"], euMember: false, schengen: true, commonwealth: false,
    descriptor: "A wealthy, stable Nordic nation with incredible fjords and a very high standard of living.",
    dimensions: { cost: 2.6, safety: 9.6, healthcare: 9.2, visaEase: 3.5, digitalInfra: 9.4, climate: 2, english: 8.8, lgbtqSafety: 9.6, techEcosystem: 8.8, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 2200, groceriesUsd: 600, transportUsd: 120, utilitiesUsd: 250, diningOutUsd: 600, healthInsuranceUsd: 200, totalEstimateUsd: 3970 },
    cities: ["Oslo", "Bergen", "Stavanger", "Trondheim"],
    rawIndicators: { summerHighC: 21, winterLowC: -5, humidityAvg: 70, airQualityIndex: 15, seismicZone: 1, internetReliability: 9.9, englishDailyLife: 9.5, stability: 9.8, authoritarianRisk: 0.5, corruptionRisk: 0.8 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Oman", iso2: "OM", iso3: "OMN", region: "Asia", subregion: "Western Asia",
    languages: ["Arabic"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A peaceful and welcoming Sultanate with a rich history and dramatic landscapes.",
    dimensions: { cost: 6, safety: 9.4, healthcare: 7.5, visaEase: 3, digitalInfra: 7.4, climate: 2.3, english: 5.2, lgbtqSafety: 2.5, techEcosystem: 6.2, naturalEnvironment: 5.2 },
    costBreakdown: { rentUsd: 1100, groceriesUsd: 350, transportUsd: 70, utilitiesUsd: 130, diningOutUsd: 300, healthInsuranceUsd: 100, totalEstimateUsd: 2050 },
    cities: ["Muscat", "Salalah", "Sohar"],
    rawIndicators: { summerHighC: 38, winterLowC: 17, humidityAvg: 50, airQualityIndex: 45, seismicZone: 2, internetReliability: 8.8, englishDailyLife: 7.2, stability: 9.2, authoritarianRisk: 6.8, corruptionRisk: 3.5 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Pakistan", iso2: "PK", iso3: "PAK", region: "Asia", subregion: "Southern Asia",
    languages: ["Urdu", "English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A diverse nation with ancient history, towering peaks, and a fast-growing tech sector.",
    dimensions: { cost: 8.9, safety: 4.5, healthcare: 4.8, visaEase: 4.4, digitalInfra: 4.9, climate: 4.2, english: 7.2, lgbtqSafety: 1.8, techEcosystem: 6.5, naturalEnvironment: 8.1 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 220, transportUsd: 40, utilitiesUsd: 100, diningOutUsd: 150, healthInsuranceUsd: 60, totalEstimateUsd: 970 },
    cities: ["Karachi", "Lahore", "Islamabad"],
    rawIndicators: { summerHighC: 38, winterLowC: 8, humidityAvg: 55, airQualityIndex: 160, seismicZone: 4, internetReliability: 6.5, englishDailyLife: 8.2, stability: 4.8, authoritarianRisk: 6.5, corruptionRisk: 8.1 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Palau", iso2: "PW", iso3: "PLW", region: "Oceania", subregion: "Micronesia",
    languages: ["Palauan", "English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "An island nation famous for its pristine marine environments and Jellyfish Lake.",
    dimensions: { cost: 5.1, safety: 9.0, healthcare: 4.5, visaEase: 3, digitalInfra: 4.1, climate: 6.7, english: 8.3, lgbtqSafety: 5.7, techEcosystem: 3.5, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 1000, groceriesUsd: 550, transportUsd: 60, utilitiesUsd: 220, diningOutUsd: 350, healthInsuranceUsd: 150, totalEstimateUsd: 2330 },
    cities: ["Ngerulmud", "Koror"],
    rawIndicators: { summerHighC: 31, winterLowC: 24, humidityAvg: 80, airQualityIndex: 15, seismicZone: 1, internetReliability: 6.0, englishDailyLife: 8.5, stability: 9.0, authoritarianRisk: 2.2, corruptionRisk: 4.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Palestine", iso2: "PS", iso3: "PSE", region: "Asia", subregion: "Western Asia",
    languages: ["Arabic"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A region with profound historical and religious significance, currently facing complex geopolitical challenges.",
    dimensions: { cost: 8, safety: 3.0, healthcare: 4.2, visaEase: 1.5, digitalInfra: 4.1, climate: 5.6, english: 3.3, lgbtqSafety: 2.2, techEcosystem: 4.5, naturalEnvironment: 3.7 },
    costBreakdown: { rentUsd: 550, groceriesUsd: 280, transportUsd: 40, utilitiesUsd: 110, diningOutUsd: 180, healthInsuranceUsd: 60, totalEstimateUsd: 1220 },
    cities: ["Ramallah", "Gaza City", "Bethlehem"],
    rawIndicators: { summerHighC: 30, winterLowC: 8, humidityAvg: 60, airQualityIndex: 55, seismicZone: 3, internetReliability: 6.2, englishDailyLife: 4.5, stability: 2.2, authoritarianRisk: 8.5, corruptionRisk: 7.8 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Papua New Guinea", iso2: "PG", iso3: "PNG", region: "Oceania", subregion: "Melanesia",
    languages: ["English", "Tok Pisin", "Hiri Motu"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A frontier of immense cultural diversity and raw natural beauty, currently developing its digital infrastructure.",
    dimensions: { cost: 4.6, safety: 3.2, healthcare: 2.8, visaEase: 2.7, digitalInfra: 2.3, climate: 5.1, english: 7.7, lgbtqSafety: 1.8, techEcosystem: 3.2, naturalEnvironment: 7.7 },
    costBreakdown: { rentUsd: 1600, groceriesUsd: 450, transportUsd: 80, utilitiesUsd: 180, diningOutUsd: 320, healthInsuranceUsd: 150, totalEstimateUsd: 2780 },
    cities: ["Port Moresby", "Lae", "Mount Hagen"],
    rawIndicators: { summerHighC: 31, winterLowC: 23, humidityAvg: 80, airQualityIndex: 45, seismicZone: 5, internetReliability: 4.2, englishDailyLife: 7.8, stability: 3.5, authoritarianRisk: 4.8, corruptionRisk: 7.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Paraguay", iso2: "PY", iso3: "PRY", region: "Americas", subregion: "South America",
    languages: ["Spanish", "Guarani"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A tranquil South American heartland offering exceptional value and a growing digital footprint.",
    dimensions: { cost: 7.9, safety: 6.4, healthcare: 5.2, visaEase: 8, digitalInfra: 4.4, climate: 5.4, english: 2.3, lgbtqSafety: 4.2, techEcosystem: 5.1, naturalEnvironment: 3.7 },
    costBreakdown: { rentUsd: 650, groceriesUsd: 220, transportUsd: 35, utilitiesUsd: 70, diningOutUsd: 180, healthInsuranceUsd: 80, totalEstimateUsd: 1235 },
    cities: ["Asunción", "Ciudad del Este", "Encarnación"],
    rawIndicators: { summerHighC: 33, winterLowC: 13, humidityAvg: 65, airQualityIndex: 55, seismicZone: 1, internetReliability: 6.8, englishDailyLife: 3.2, stability: 7.2, authoritarianRisk: 3.5, corruptionRisk: 5.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Qatar", iso2: "QA", iso3: "QAT", region: "Asia", subregion: "Western Asia",
    languages: ["Arabic", "English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A hyper-modern Gulf state blending traditional culture with ambitious technological investment.",
    dimensions: { cost: 2.8, safety: 5.5, healthcare: 8.4, visaEase: 2.5, digitalInfra: 9.4, climate: 1.5, english: 6.4, lgbtqSafety: 1.2, techEcosystem: 7.8, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 2400, groceriesUsd: 500, transportUsd: 60, utilitiesUsd: 280, diningOutUsd: 550, healthInsuranceUsd: 130, totalEstimateUsd: 3920 },
    cities: ["Doha", "Al Wakrah", "Lusail"],
    rawIndicators: { summerHighC: 42, winterLowC: 14, humidityAvg: 50, airQualityIndex: 135, seismicZone: 1, internetReliability: 9.8, englishDailyLife: 8.5, stability: 9.2, authoritarianRisk: 7.8, corruptionRisk: 2.5 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Russia", iso2: "RU", iso3: "RUS", region: "Europe", subregion: "Eastern Europe",
    languages: ["Russian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A vast Eurasian state where war, sanctions, repression, and detention risk dominate the relocation picture.",
    dimensions: { cost: 6.3, safety: 4.2, healthcare: 6.2, visaEase: 2.1, digitalInfra: 7.7, climate: 1.5, english: 2.7, lgbtqSafety: 0.8, techEcosystem: 7.2, naturalEnvironment: 5.9 },
    costBreakdown: { rentUsd: 950, groceriesUsd: 320, transportUsd: 40, utilitiesUsd: 110, diningOutUsd: 280, healthInsuranceUsd: 70, totalEstimateUsd: 1770 },
    cities: ["Moscow", "Saint Petersburg", "Kazan", "Yekaterinburg"],
    rawIndicators: { summerHighC: 24, winterLowC: -10, humidityAvg: 70, airQualityIndex: 65, seismicZone: 2, internetReliability: 9.1, englishDailyLife: 4.5, stability: 4.2, authoritarianRisk: 9.5, corruptionRisk: 8.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Rwanda", iso2: "RW", iso3: "RWA", region: "Africa", subregion: "Eastern Africa",
    languages: ["Kinyarwanda", "English", "French", "Swahili"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "The 'Land of a Thousand Hills'—a model of African stability and digital-first governance.",
    dimensions: { cost: 7.3, safety: 8.8, healthcare: 5.4, visaEase: 5, digitalInfra: 5.6, climate: 7.2, english: 5.6, lgbtqSafety: 4.8, techEcosystem: 6.5, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 850, groceriesUsd: 280, transportUsd: 30, utilitiesUsd: 90, diningOutUsd: 200, healthInsuranceUsd: 60, totalEstimateUsd: 1510 },
    cities: ["Kigali", "Gisenyi", "Butare"],
    rawIndicators: { summerHighC: 27, winterLowC: 15, humidityAvg: 60, airQualityIndex: 50, seismicZone: 3, internetReliability: 7.8, englishDailyLife: 6.2, stability: 8.5, authoritarianRisk: 6.5, corruptionRisk: 3.8 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Saint Kitts and Nevis", iso2: "KN", iso3: "KNA", region: "Americas", subregion: "Caribbean",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A tranquil Caribbean twin-island nation with a burgeoning tech-for-citizenship pathway.",
    dimensions: { cost: 4, safety: 7.8, healthcare: 5.8, visaEase: 3.5, digitalInfra: 5.1, climate: 7.8, english: 10, lgbtqSafety: 4.6, techEcosystem: 4.8, naturalEnvironment: 8.1 },
    costBreakdown: { rentUsd: 1800, groceriesUsd: 550, transportUsd: 70, utilitiesUsd: 220, diningOutUsd: 450, healthInsuranceUsd: 110, totalEstimateUsd: 3200 },
    cities: ["Basseterre", "Charlestown"],
    rawIndicators: { summerHighC: 31, winterLowC: 23, humidityAvg: 75, airQualityIndex: 25, seismicZone: 4, internetReliability: 7.5, englishDailyLife: 10.0, stability: 8.2, authoritarianRisk: 2.1, corruptionRisk: 3.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Saint Lucia", iso2: "LC", iso3: "LCA", region: "Americas", subregion: "Caribbean",
    languages: ["English", "French Patois"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "Dramatic volcanic landscapes and stunning natural beauty in the heart of the Eastern Caribbean.",
    dimensions: { cost: 4.4, safety: 7.6, healthcare: 5.6, visaEase: 6.4, digitalInfra: 4.9, climate: 7.8, english: 9.7, lgbtqSafety: 2.0, techEcosystem: 4.5, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 1600, groceriesUsd: 500, transportUsd: 60, utilitiesUsd: 190, diningOutUsd: 420, healthInsuranceUsd: 100, totalEstimateUsd: 2870 },
    cities: ["Castries", "Soufrière", "Rodney Bay"],
    rawIndicators: { summerHighC: 31, winterLowC: 23, humidityAvg: 75, airQualityIndex: 22, seismicZone: 4, internetReliability: 7.2, englishDailyLife: 9.5, stability: 8.0, authoritarianRisk: 2.2, corruptionRisk: 3.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Saint Vincent and the Grenadines", iso2: "VC", iso3: "VCT", region: "Americas", subregion: "Caribbean",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "An authentic Caribbean archipelago focused on agricultural tech and climate resilience.",
    dimensions: { cost: 4.8, safety: 7.2, healthcare: 5.2, visaEase: 3.5, digitalInfra: 4.4, climate: 7.8, english: 10, lgbtqSafety: 3.2, techEcosystem: 3.8, naturalEnvironment: 8.5 },
    costBreakdown: { rentUsd: 1300, groceriesUsd: 480, transportUsd: 50, utilitiesUsd: 170, diningOutUsd: 380, healthInsuranceUsd: 90, totalEstimateUsd: 2470 },
    cities: ["Kingstown", "Bequia"],
    rawIndicators: { summerHighC: 31, winterLowC: 24, humidityAvg: 78, airQualityIndex: 20, seismicZone: 4, internetReliability: 6.8, englishDailyLife: 10.0, stability: 7.8, authoritarianRisk: 2.5, corruptionRisk: 4.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Samoa", iso2: "WS", iso3: "WSM", region: "Oceania", subregion: "Polynesia",
    languages: ["Samoan", "English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A peaceful Pacific paradise where traditional culture meets improved digital connectivity.",
    dimensions: { cost: 6.6, safety: 8.5, healthcare: 4.8, visaEase: 3.5, digitalInfra: 3.7, climate: 6.7, english: 7.4, lgbtqSafety: 2, techEcosystem: 3.5, naturalEnvironment: 8.1 },
    costBreakdown: { rentUsd: 900, groceriesUsd: 350, transportUsd: 40, utilitiesUsd: 120, diningOutUsd: 220, healthInsuranceUsd: 70, totalEstimateUsd: 1700 },
    cities: ["Apia", "Salelologa"],
    rawIndicators: { summerHighC: 30, winterLowC: 23, humidityAvg: 80, airQualityIndex: 15, seismicZone: 3, internetReliability: 6.2, englishDailyLife: 7.5, stability: 8.8, authoritarianRisk: 2.8, corruptionRisk: 3.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "San Marino", iso2: "SM", iso3: "SMR", region: "Europe", subregion: "Southern Europe",
    languages: ["Italian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The world's oldest republic, offering a safe, micro-state sanctuary within the Italian peninsula.",
    dimensions: { cost: 5.8, safety: 9.8, healthcare: 8.6, visaEase: 1.5, digitalInfra: 7.4, climate: 5.6, english: 4.4, lgbtqSafety: 7.0, techEcosystem: 6.2, naturalEnvironment: 2.7 },
    costBreakdown: { rentUsd: 1100, groceriesUsd: 380, transportUsd: 50, utilitiesUsd: 160, diningOutUsd: 350, healthInsuranceUsd: 120, totalEstimateUsd: 2160 },
    cities: ["San Marino City", "Dogana", "Borgo Maggiore"],
    rawIndicators: { summerHighC: 28, winterLowC: 2, humidityAvg: 65, airQualityIndex: 30, seismicZone: 2, internetReliability: 9.2, englishDailyLife: 5.5, stability: 9.9, authoritarianRisk: 0.8, corruptionRisk: 1.2 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Sao Tome and Principe", iso2: "ST", iso3: "STP", region: "Africa", subregion: "Middle Africa",
    languages: ["Portuguese"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "An emerald island nation in the Gulf of Guinea, currently expanding its digital horizons.",
    dimensions: { cost: 7.5, safety: 8.2, healthcare: 3.8, visaEase: 3.5, digitalInfra: 2.7, climate: 6.9, english: 1.8, lgbtqSafety: 5.8, techEcosystem: 2.8, naturalEnvironment: 8.8 },
    costBreakdown: { rentUsd: 700, groceriesUsd: 320, transportUsd: 30, utilitiesUsd: 90, diningOutUsd: 180, healthInsuranceUsd: 60, totalEstimateUsd: 1380 },
    cities: ["São Tomé", "Santo António"],
    rawIndicators: { summerHighC: 30, winterLowC: 21, humidityAvg: 80, airQualityIndex: 20, seismicZone: 1, internetReliability: 4.8, englishDailyLife: 2.8, stability: 8.2, authoritarianRisk: 3.5, corruptionRisk: 5.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Saudi Arabia", iso2: "SA", iso3: "SAU", region: "Asia", subregion: "Western Asia",
    languages: ["Arabic", "English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A Kingdom in transition, leveraging massive capital for global technological leadership.",
    dimensions: { cost: 4.4, safety: 5.2, healthcare: 7.8, visaEase: 2.5, digitalInfra: 9.1, climate: 1.5, english: 4.9, lgbtqSafety: 0.5, techEcosystem: 8.4, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 1600, groceriesUsd: 450, transportUsd: 50, utilitiesUsd: 240, diningOutUsd: 400, healthInsuranceUsd: 120, totalEstimateUsd: 2860 },
    cities: ["Riyadh", "Jeddah", "Dammam", "NEOM"],
    rawIndicators: { summerHighC: 43, winterLowC: 9, humidityAvg: 30, airQualityIndex: 125, seismicZone: 2, internetReliability: 9.7, englishDailyLife: 6.8, stability: 9.0, authoritarianRisk: 8.8, corruptionRisk: 3.8 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Senegal", iso2: "SN", iso3: "SEN", region: "Africa", subregion: "Western Africa",
    languages: ["French", "Wolof"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "West Africa's cultural beacon and a rapidly emerging tech hub for the Francophone world.",
    dimensions: { cost: 6.8, safety: 6.8, healthcare: 4.5, visaEase: 3.5, digitalInfra: 5.2, climate: 6.1, english: 2.7, lgbtqSafety: 1.2, techEcosystem: 6.8, naturalEnvironment: 4.5 },
    costBreakdown: { rentUsd: 900, groceriesUsd: 320, transportUsd: 40, utilitiesUsd: 110, diningOutUsd: 220, healthInsuranceUsd: 70, totalEstimateUsd: 1660 },
    cities: ["Dakar", "Saint-Louis", "Thiès"],
    rawIndicators: { summerHighC: 31, winterLowC: 18, humidityAvg: 70, airQualityIndex: 75, seismicZone: 1, internetReliability: 7.8, englishDailyLife: 4.0, stability: 7.2, authoritarianRisk: 5.5, corruptionRisk: 5.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Seychelles", iso2: "SC", iso3: "SYC", region: "Africa", subregion: "Eastern Africa",
    languages: ["Seychellois Creole", "English", "French"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A high-income island nation leading in the blue economy and digital transformation.",
    dimensions: { cost: 3.2, safety: 8.8, healthcare: 6.8, visaEase: 7, digitalInfra: 6.4, climate: 7.2, english: 8.8, lgbtqSafety: 6.5, techEcosystem: 5.2, naturalEnvironment: 9.6 },
    costBreakdown: { rentUsd: 2100, groceriesUsd: 550, transportUsd: 60, utilitiesUsd: 220, diningOutUsd: 480, healthInsuranceUsd: 120, totalEstimateUsd: 3530 },
    cities: ["Victoria", "Beau Vallon"],
    rawIndicators: { summerHighC: 30, winterLowC: 24, humidityAvg: 80, airQualityIndex: 20, seismicZone: 1, internetReliability: 8.5, englishDailyLife: 9.0, stability: 9.1, authoritarianRisk: 2.8, corruptionRisk: 3.2 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Sierra Leone", iso2: "SL", iso3: "SLE", region: "Africa", subregion: "Western Africa",
    languages: ["English", "Krio"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A resilient nation focused on digital literacy and agricultural self-sufficiency.",
    dimensions: { cost: 8, safety: 6.2, healthcare: 3.2, visaEase: 3, digitalInfra: 3, climate: 5.9, english: 8.3, lgbtqSafety: 2.2, techEcosystem: 3.5, naturalEnvironment: 6.6 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 280, transportUsd: 30, utilitiesUsd: 80, diningOutUsd: 150, healthInsuranceUsd: 50, totalEstimateUsd: 1190 },
    cities: ["Freetown", "Bo", "Kenema"],
    rawIndicators: { summerHighC: 31, winterLowC: 23, humidityAvg: 82, airQualityIndex: 60, seismicZone: 1, internetReliability: 5.2, englishDailyLife: 8.2, stability: 6.5, authoritarianRisk: 5.2, corruptionRisk: 7.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Slovakia", iso2: "SK", iso3: "SVK", region: "Europe", subregion: "Central Europe",
    languages: ["Slovak"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "A robust industrial heart of Europe with high safety and a strong technical workforce.",
    dimensions: { cost: 6.3, safety: 8.4, healthcare: 7.2, visaEase: 5.5, digitalInfra: 7.3, climate: 3.8, english: 5.2, lgbtqSafety: 5.5, techEcosystem: 7.4, naturalEnvironment: 5 },
    costBreakdown: { rentUsd: 950, groceriesUsd: 320, transportUsd: 40, utilitiesUsd: 180, diningOutUsd: 280, healthInsuranceUsd: 80, totalEstimateUsd: 1850 },
    cities: ["Bratislava", "Košice", "Žilina"],
    rawIndicators: { summerHighC: 26, winterLowC: -3, humidityAvg: 70, airQualityIndex: 40, seismicZone: 2, internetReliability: 9.1, englishDailyLife: 6.8, stability: 7.8, authoritarianRisk: 3.8, corruptionRisk: 4.5 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Slovenia", iso2: "SI", iso3: "SVN", region: "Europe", subregion: "Southern Europe",
    languages: ["Slovenian"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "Europe's hidden gem—exceptional safety, green landscapes, and progressive social values.",
    dimensions: { cost: 5.9, safety: 9.6, healthcare: 8.4, visaEase: 7.8, digitalInfra: 8.3, climate: 5.1, english: 6.9, lgbtqSafety: 9.2, techEcosystem: 7.8, naturalEnvironment: 8.1 },
    costBreakdown: { rentUsd: 1100, groceriesUsd: 350, transportUsd: 50, utilitiesUsd: 170, diningOutUsd: 320, healthInsuranceUsd: 100, totalEstimateUsd: 2090 },
    cities: ["Ljubljana", "Maribor", "Koper"],
    rawIndicators: { summerHighC: 27, winterLowC: -2, humidityAvg: 70, airQualityIndex: 30, seismicZone: 3, internetReliability: 9.4, englishDailyLife: 8.2, stability: 9.5, authoritarianRisk: 1.5, corruptionRisk: 2.5 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Solomon Islands", iso2: "SB", iso3: "SLB", region: "Oceania", subregion: "Melanesia",
    languages: ["English", "Solomons Pijin"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "An archipelago of stunning biodiversity, currently navigating digital expansion challenges.",
    dimensions: { cost: 6, safety: 6.4, healthcare: 3.5, visaEase: 2.5, digitalInfra: 2.7, climate: 6.4, english: 7.8, lgbtqSafety: 2.1, techEcosystem: 2.5, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 1100, groceriesUsd: 420, transportUsd: 40, utilitiesUsd: 150, diningOutUsd: 250, healthInsuranceUsd: 90, totalEstimateUsd: 2050 },
    cities: ["Honiara", "Gizo"],
    rawIndicators: { summerHighC: 31, winterLowC: 23, humidityAvg: 80, airQualityIndex: 20, seismicZone: 5, internetReliability: 4.5, englishDailyLife: 8.0, stability: 6.8, authoritarianRisk: 4.5, corruptionRisk: 6.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Somalia", iso2: "SO", iso3: "SOM", region: "Africa", subregion: "Eastern Africa",
    languages: ["Somali", "Arabic"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A nation in recovery, seeing a surge in digital finance and connectivity despite security challenges.",
    dimensions: { cost: 6.6, safety: 1.8, healthcare: 2.1, visaEase: 0.5, digitalInfra: 3.3, climate: 5.6, english: 2.3, lgbtqSafety: 0.2, techEcosystem: 3.8, naturalEnvironment: 3 },
    costBreakdown: { rentUsd: 800, groceriesUsd: 380, transportUsd: 40, utilitiesUsd: 130, diningOutUsd: 200, healthInsuranceUsd: 150, totalEstimateUsd: 1700 },
    cities: ["Mogadishu", "Hargeisa", "Garowe"],
    rawIndicators: { summerHighC: 32, winterLowC: 23, humidityAvg: 70, airQualityIndex: 85, seismicZone: 1, internetReliability: 4.2, englishDailyLife: 3.5, stability: 2.5, authoritarianRisk: 8.5, corruptionRisk: 9.5 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "South Sudan", iso2: "SS", iso3: "SSD", region: "Africa", subregion: "Eastern Africa",
    languages: ["English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The world's youngest nation, facing profound developmental and security hurdles.",
    dimensions: { cost: 7.2, safety: 1.5, healthcare: 1.8, visaEase: 0.5, digitalInfra: 1.5, climate: 5.1, english: 7.4, lgbtqSafety: 0.8, techEcosystem: 1.8, naturalEnvironment: 5.9 },
    costBreakdown: { rentUsd: 700, groceriesUsd: 350, transportUsd: 40, utilitiesUsd: 110, diningOutUsd: 180, healthInsuranceUsd: 150, totalEstimateUsd: 1530 },
    cities: ["Juba", "Wau", "Malakal"],
    rawIndicators: { summerHighC: 35, winterLowC: 20, humidityAvg: 65, airQualityIndex: 95, seismicZone: 2, internetReliability: 2.8, englishDailyLife: 7.8, stability: 2.0, authoritarianRisk: 9.2, corruptionRisk: 9.8 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Sri Lanka", iso2: "LK", iso3: "LKA", region: "Asia", subregion: "Southern Asia",
    languages: ["Sinhala", "Tamil", "English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A tropical island powerhouse for tech talent and affordable remote work infrastructure.",
    dimensions: { cost: 7.9, safety: 7.2, healthcare: 6.4, visaEase: 5, digitalInfra: 6.1, climate: 6.1, english: 6.5, lgbtqSafety: 3.8, techEcosystem: 7.1, naturalEnvironment: 7.7 },
    costBreakdown: { rentUsd: 650, groceriesUsd: 220, transportUsd: 30, utilitiesUsd: 80, diningOutUsd: 180, healthInsuranceUsd: 70, totalEstimateUsd: 1230 },
    cities: ["Colombo", "Kandy", "Galle", "Jaffna"],
    rawIndicators: { summerHighC: 31, winterLowC: 22, humidityAvg: 75, airQualityIndex: 65, seismicZone: 1, internetReliability: 8.2, englishDailyLife: 7.2, stability: 6.8, authoritarianRisk: 5.2, corruptionRisk: 6.5 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Sudan", iso2: "SD", iso3: "SDN", region: "Africa", subregion: "Northern Africa",
    languages: ["Arabic", "English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A nation currently enduring severe conflict, impacting all aspects of safety and infrastructure.",
    dimensions: { cost: 7.6, safety: 1.2, healthcare: 2.2, visaEase: 0.5, digitalInfra: 1.8, climate: 4.7, english: 3.3, lgbtqSafety: 0.5, techEcosystem: 2.5, naturalEnvironment: 2.7 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 320, transportUsd: 35, utilitiesUsd: 90, diningOutUsd: 160, healthInsuranceUsd: 150, totalEstimateUsd: 1355 },
    cities: ["Khartoum", "Omdurman", "Port Sudan"],
    rawIndicators: { summerHighC: 41, winterLowC: 15, humidityAvg: 35, airQualityIndex: 110, seismicZone: 2, internetReliability: 3.5, englishDailyLife: 4.2, stability: 1.5, authoritarianRisk: 9.8, corruptionRisk: 9.8 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Suriname", iso2: "SR", iso3: "SUR", region: "Americas", subregion: "South America",
    languages: ["Dutch", "English", "Sranan Tongo"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A diverse South American nation with vast rainforests and a unique Dutch-Caribbean heritage.",
    dimensions: { cost: 7.2, safety: 6.8, healthcare: 4.8, visaEase: 3.5, digitalInfra: 3.7, climate: 6.7, english: 6.1, lgbtqSafety: 6.4, techEcosystem: 3.8, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 800, groceriesUsd: 300, transportUsd: 35, utilitiesUsd: 100, diningOutUsd: 200, healthInsuranceUsd: 80, totalEstimateUsd: 1515 },
    cities: ["Paramaribo", "Nieuw Nickerie"],
    rawIndicators: { summerHighC: 32, winterLowC: 23, humidityAvg: 80, airQualityIndex: 35, seismicZone: 1, internetReliability: 6.5, englishDailyLife: 7.0, stability: 7.4, authoritarianRisk: 3.2, corruptionRisk: 6.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Sweden", iso2: "SE", iso3: "SWE", region: "Europe", subregion: "Northern Europe",
    languages: ["Swedish", "English"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "A global leader in innovation, sustainability, and high-quality social welfare.",
    dimensions: { cost: 4.2, safety: 8.6, healthcare: 9.2, visaEase: 3, digitalInfra: 9.4, climate: 1.8, english: 9.3, lgbtqSafety: 10.0, techEcosystem: 9, naturalEnvironment: 5.9 },
    costBreakdown: { rentUsd: 1800, groceriesUsd: 450, transportUsd: 90, utilitiesUsd: 220, diningOutUsd: 400, healthInsuranceUsd: 60, totalEstimateUsd: 3020 },
    cities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala"],
    rawIndicators: { summerHighC: 22, winterLowC: -5, humidityAvg: 70, airQualityIndex: 25, seismicZone: 1, internetReliability: 9.8, englishDailyLife: 9.5, stability: 9.2, authoritarianRisk: 0.8, corruptionRisk: 1.0 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "China", iso2: "CN", iso3: "CHN", region: "Asia", subregion: "Eastern Asia",
    languages: ["Mandarin"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A global powerhouse offering ultra-modern megacities, deep history, and a world-leading digital ecosystem.",
    dimensions: { cost: 6.9, safety: 4.8, healthcare: 7.2, visaEase: 2, digitalInfra: 9.1, climate: 4.2, english: 2.3, lgbtqSafety: 3.8, techEcosystem: 7.5, naturalEnvironment: 3 },
    costBreakdown: { rentUsd: 850, groceriesUsd: 280, transportUsd: 45, utilitiesUsd: 90, diningOutUsd: 250, healthInsuranceUsd: 120, totalEstimateUsd: 1635 },
    cities: ["Shanghai", "Beijing", "Shenzhen", "Chengdu"],
    rawIndicators: { summerHighC: 32, winterLowC: -4, humidityAvg: 70, airQualityIndex: 85, seismicZone: 3, internetReliability: 9.2, englishDailyLife: 3.2, stability: 8.5, authoritarianRisk: 8.8, corruptionRisk: 4.1 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Finland", iso2: "FI", iso3: "FIN", region: "Europe", subregion: "Northern Europe",
    languages: ["Finnish", "Swedish"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "Consistently ranked as the world's happiest country, with pristine nature and a high-trust society.",
    dimensions: { cost: 5.4, safety: 9.6, healthcare: 8.8, visaEase: 4.5, digitalInfra: 8.8, climate: 1.5, english: 8.8, lgbtqSafety: 9.4, techEcosystem: 8.8, naturalEnvironment: 8.1 },
    costBreakdown: { rentUsd: 1200, groceriesUsd: 350, transportUsd: 65, utilitiesUsd: 180, diningOutUsd: 350, healthInsuranceUsd: 80, totalEstimateUsd: 2225 },
    cities: ["Helsinki", "Tampere", "Oulu"],
    rawIndicators: { summerHighC: 21, winterLowC: -10, humidityAvg: 75, airQualityIndex: 12, seismicZone: 0, internetReliability: 9.8, englishDailyLife: 9.1, stability: 9.8, authoritarianRisk: 0.5, corruptionRisk: 0.6 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "United Kingdom", iso2: "GB", iso3: "GBR", region: "Europe", subregion: "Northern Europe",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A global financial and cultural hub with top-tier education and a mature technology ecosystem.",
    dimensions: { cost: 4.1, safety: 8.2, healthcare: 7.8, visaEase: 2.5, digitalInfra: 8.3, climate: 2.7, english: 10, lgbtqSafety: 9.0, techEcosystem: 9.6, naturalEnvironment: 2.7 },
    costBreakdown: { rentUsd: 1850, groceriesUsd: 400, transportUsd: 120, utilitiesUsd: 250, diningOutUsd: 450, healthInsuranceUsd: 100, totalEstimateUsd: 3170 },
    cities: ["London", "Manchester", "Edinburgh", "Bristol"],
    rawIndicators: { summerHighC: 22, winterLowC: 2, humidityAvg: 80, airQualityIndex: 35, seismicZone: 1, internetReliability: 9.4, englishDailyLife: 10.0, stability: 8.2, authoritarianRisk: 1.2, corruptionRisk: 1.8 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Hungary", iso2: "HU", iso3: "HUN", region: "Europe", subregion: "Eastern Europe",
    languages: ["Hungarian"], euMember: true, schengen: true, commonwealth: false,
    descriptor: "Central European elegance with a burgeoning tech scene and one of the world's most beautiful capital cities.",
    dimensions: { cost: 6.9, safety: 8.5, healthcare: 7.0, visaEase: 7.5, digitalInfra: 7.8, climate: 3.8, english: 4.4, lgbtqSafety: 4, techEcosystem: 7.2, naturalEnvironment: 2.1 },
    costBreakdown: { rentUsd: 850, groceriesUsd: 280, transportUsd: 35, utilitiesUsd: 140, diningOutUsd: 250, healthInsuranceUsd: 60, totalEstimateUsd: 1615 },
    cities: ["Budapest", "Debrecen", "Szeged"],
    rawIndicators: { summerHighC: 27, winterLowC: -2, humidityAvg: 65, airQualityIndex: 45, seismicZone: 1, internetReliability: 9.1, englishDailyLife: 6.2, stability: 7.8, authoritarianRisk: 4.5, corruptionRisk: 5.2 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "North Macedonia", iso2: "MK", iso3: "MKD", region: "Europe", subregion: "Southern Europe",
    languages: ["Macedonian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A hidden Balkan gem offering dramatic mountains, ancient history, and exceptional affordability.",
    dimensions: { cost: 8.7, safety: 7.8, healthcare: 5.2, visaEase: 4, digitalInfra: 6.1, climate: 4.7, english: 4.1, lgbtqSafety: 4.8, techEcosystem: 4.8, naturalEnvironment: 5 },
    costBreakdown: { rentUsd: 450, groceriesUsd: 200, transportUsd: 25, utilitiesUsd: 110, diningOutUsd: 180, healthInsuranceUsd: 50, totalEstimateUsd: 1015 },
    cities: ["Skopje", "Ohrid"],
    rawIndicators: { summerHighC: 31, winterLowC: -3, humidityAvg: 60, airQualityIndex: 65, seismicZone: 4, internetReliability: 7.8, englishDailyLife: 5.8, stability: 6.8, authoritarianRisk: 3.5, corruptionRisk: 5.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Syria", iso2: "SY", iso3: "SYR", region: "Asia", subregion: "Western Asia",
    languages: ["Arabic"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "An ancient civilization still facing severe conflict damage, authoritarian rule, and major travel warnings.",
    dimensions: { cost: 9.7, safety: 1.5, healthcare: 2.2, visaEase: 0.5, digitalInfra: 1.5, climate: 5.1, english: 2.1, lgbtqSafety: 1.2, techEcosystem: 1.5, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 300, groceriesUsd: 150, transportUsd: 15, utilitiesUsd: 40, diningOutUsd: 80, healthInsuranceUsd: 30, totalEstimateUsd: 615 },
    cities: ["Damascus", "Aleppo"],
    rawIndicators: { summerHighC: 36, winterLowC: 2, humidityAvg: 45, airQualityIndex: 80, seismicZone: 3, internetReliability: 3.2, englishDailyLife: 2.8, stability: 1.2, authoritarianRisk: 9.8, corruptionRisk: 9.5 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Togo", iso2: "TG", iso3: "TGO", region: "Africa", subregion: "Western Africa",
    languages: ["French"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A narrow West African nation known for its palm-lined beaches and hilltop villages.",
    dimensions: { cost: 8.6, safety: 5.5, healthcare: 3.2, visaEase: 3.5, digitalInfra: 2.7, climate: 3.8, english: 1.5, lgbtqSafety: 1.8, techEcosystem: 2.8, naturalEnvironment: 2.7 },
    costBreakdown: { rentUsd: 550, groceriesUsd: 220, transportUsd: 30, utilitiesUsd: 70, diningOutUsd: 140, healthInsuranceUsd: 50, totalEstimateUsd: 1060 },
    cities: ["Lomé", "Kpalimé"],
    rawIndicators: { summerHighC: 31, winterLowC: 23, humidityAvg: 80, airQualityIndex: 55, seismicZone: 1, internetReliability: 4.5, englishDailyLife: 2.1, stability: 5.4, authoritarianRisk: 7.2, corruptionRisk: 6.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Tajikistan", iso2: "TJ", iso3: "TJK", region: "Asia", subregion: "Central Asia",
    languages: ["Tajik", "Russian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A mountainous landlocked nation offering some of the world's most spectacular high-altitude scenery.",
    dimensions: { cost: 9.3, safety: 5.5, healthcare: 3.5, visaEase: 4, digitalInfra: 2.3, climate: 3.4, english: 1.3, lgbtqSafety: 4.3, techEcosystem: 2.2, naturalEnvironment: 7.7 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 50, diningOutUsd: 100, healthInsuranceUsd: 40, totalEstimateUsd: 790 },
    cities: ["Dushanbe", "Khujand"],
    rawIndicators: { summerHighC: 35, winterLowC: -2, humidityAvg: 40, airQualityIndex: 75, seismicZone: 4, internetReliability: 3.8, englishDailyLife: 1.8, stability: 6.2, authoritarianRisk: 8.5, corruptionRisk: 7.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Timor-Leste", iso2: "TL", iso3: "TLS", region: "Asia", subregion: "South-Eastern Asia",
    languages: ["Tetum", "Portuguese"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "One of the world's newest nations, featuring untouched coral reefs and rugged mountains.",
    dimensions: { cost: 7.5, safety: 6.8, healthcare: 2.8, visaEase: 3.5, digitalInfra: 1.8, climate: 4.2, english: 2.1, lgbtqSafety: 5.2, techEcosystem: 1.8, naturalEnvironment: 5.9 },
    costBreakdown: { rentUsd: 750, groceriesUsd: 250, transportUsd: 40, utilitiesUsd: 90, diningOutUsd: 180, healthInsuranceUsd: 60, totalEstimateUsd: 1370 },
    cities: ["Dili", "Baucau"],
    rawIndicators: { summerHighC: 31, winterLowC: 22, humidityAvg: 75, airQualityIndex: 25, seismicZone: 3, internetReliability: 3.1, englishDailyLife: 3.2, stability: 6.1, authoritarianRisk: 4.2, corruptionRisk: 7.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Turkmenistan", iso2: "TM", iso3: "TKM", region: "Asia", subregion: "Central Asia",
    languages: ["Turkmen", "Russian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A highly controlled Central Asian nation known for its vast natural gas reserves and unique marble capital.",
    dimensions: { cost: 6.2, safety: 4.1, healthcare: 4.2, visaEase: 0.5, digitalInfra: 2.1, climate: 2.8, english: 1, lgbtqSafety: 1.2, techEcosystem: 2.0, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 1200, groceriesUsd: 300, transportUsd: 20, utilitiesUsd: 30, diningOutUsd: 250, healthInsuranceUsd: 70, totalEstimateUsd: 1870 },
    cities: ["Ashgabat", "Turkmenbashi"],
    rawIndicators: { summerHighC: 38, winterLowC: -1, humidityAvg: 35, airQualityIndex: 60, seismicZone: 4, internetReliability: 2.8, englishDailyLife: 1.5, stability: 8.5, authoritarianRisk: 9.9, corruptionRisk: 8.8 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Tunisia", iso2: "TN", iso3: "TUN", region: "Africa", subregion: "Northern Africa",
    languages: ["Arabic", "French"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A Mediterranean bridge between Europe and Africa, with world-class ruins and golden beaches.",
    dimensions: { cost: 9, safety: 6.8, healthcare: 5.8, visaEase: 4.5, digitalInfra: 4.9, climate: 5.6, english: 2.7, lgbtqSafety: 2.2, techEcosystem: 5.2, naturalEnvironment: 3.7 },
    costBreakdown: { rentUsd: 450, groceriesUsd: 180, transportUsd: 25, utilitiesUsd: 60, diningOutUsd: 140, healthInsuranceUsd: 60, totalEstimateUsd: 915 },
    cities: ["Tunis", "Sousse", "Sfax"],
    rawIndicators: { summerHighC: 33, winterLowC: 8, humidityAvg: 60, airQualityIndex: 50, seismicZone: 2, internetReliability: 7.1, englishDailyLife: 3.8, stability: 5.8, authoritarianRisk: 6.5, corruptionRisk: 6.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Tonga", iso2: "TO", iso3: "TON", region: "Oceania", subregion: "Polynesia",
    languages: ["Tongan", "English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "The 'Friendly Islands' — a Polynesian kingdom of authentic culture and pristine marine life.",
    dimensions: { cost: 6.5, safety: 8.5, healthcare: 4.5, visaEase: 3, digitalInfra: 3.3, climate: 5.1, english: 7.4, lgbtqSafety: 2.8, techEcosystem: 2.8, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 900, groceriesUsd: 350, transportUsd: 40, utilitiesUsd: 150, diningOutUsd: 200, healthInsuranceUsd: 80, totalEstimateUsd: 1720 },
    cities: ["Nuku'alofa", "Neiafu"],
    rawIndicators: { summerHighC: 28, winterLowC: 18, humidityAvg: 75, airQualityIndex: 15, seismicZone: 4, internetReliability: 6.2, englishDailyLife: 8.5, stability: 8.1, authoritarianRisk: 2.5, corruptionRisk: 4.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Trinidad and Tobago", iso2: "TT", iso3: "TTO", region: "Americas", subregion: "Caribbean",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A vibrant twin-island nation blending industrial strength with Carnival energy and lush rainforests.",
    dimensions: { cost: 6.4, safety: 5.2, healthcare: 5.5, visaEase: 3.5, digitalInfra: 6.1, climate: 6.1, english: 10, lgbtqSafety: 4.8, techEcosystem: 5.5, naturalEnvironment: 5.2 },
    costBreakdown: { rentUsd: 950, groceriesUsd: 320, transportUsd: 60, utilitiesUsd: 80, diningOutUsd: 250, healthInsuranceUsd: 90, totalEstimateUsd: 1750 },
    cities: ["Port of Spain", "San Fernando", "Scarborough"],
    rawIndicators: { summerHighC: 31, winterLowC: 22, humidityAvg: 75, airQualityIndex: 40, seismicZone: 3, internetReliability: 8.1, englishDailyLife: 10.0, stability: 6.8, authoritarianRisk: 2.2, corruptionRisk: 5.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Tuvalu", iso2: "TV", iso3: "TUV", region: "Oceania", subregion: "Polynesia",
    languages: ["Tuvaluan", "English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "One of the world's smallest and most remote nations, offering an unmatched pace of island life.",
    dimensions: { cost: 7.1, safety: 9.4, healthcare: 3.2, visaEase: 2, digitalInfra: 1.5, climate: 4.7, english: 7.8, lgbtqSafety: 3.2, techEcosystem: 1.5, naturalEnvironment: 4.5 },
    costBreakdown: { rentUsd: 800, groceriesUsd: 400, transportUsd: 30, utilitiesUsd: 120, diningOutUsd: 150, healthInsuranceUsd: 70, totalEstimateUsd: 1570 },
    cities: ["Funafuti", "Vaitupu"],
    rawIndicators: { summerHighC: 31, winterLowC: 25, humidityAvg: 80, airQualityIndex: 10, seismicZone: 1, internetReliability: 3.5, englishDailyLife: 8.2, stability: 9.2, authoritarianRisk: 1.5, corruptionRisk: 3.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Tanzania", iso2: "TZ", iso3: "TZA", region: "Africa", subregion: "Eastern Africa",
    languages: ["Swahili", "English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "The home of Kilimanjaro and Zanzibar — an East African icon of stability and natural wonder.",
    dimensions: { cost: 8.3, safety: 6.8, healthcare: 4.2, visaEase: 3.5, digitalInfra: 3.7, climate: 5.1, english: 4.9, lgbtqSafety: 1.5, techEcosystem: 4.5, naturalEnvironment: 8.5 },
    costBreakdown: { rentUsd: 600, groceriesUsd: 220, transportUsd: 35, utilitiesUsd: 70, diningOutUsd: 150, healthInsuranceUsd: 60, totalEstimateUsd: 1135 },
    cities: ["Dar es Salaam", "Zanzibar City", "Arusha"],
    rawIndicators: { summerHighC: 30, winterLowC: 18, humidityAvg: 70, airQualityIndex: 45, seismicZone: 2, internetReliability: 6.4, englishDailyLife: 6.5, stability: 7.2, authoritarianRisk: 6.5, corruptionRisk: 6.8 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Ukraine", iso2: "UA", iso3: "UKR", region: "Europe", subregion: "Eastern Europe",
    languages: ["Ukrainian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A resilient nation with a world-class IT workforce while active war continues to dominate safety and infrastructure risk.",
    dimensions: { cost: 8.9, safety: 2.5, healthcare: 4.8, visaEase: 1, digitalInfra: 7.4, climate: 3.4, english: 4.1, lgbtqSafety: 5.2, techEcosystem: 8.2, naturalEnvironment: 2.7 },
    costBreakdown: { rentUsd: 450, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 100, diningOutUsd: 150, healthInsuranceUsd: 40, totalEstimateUsd: 940 },
    cities: ["Kyiv", "Lviv", "Odesa"],
    rawIndicators: { summerHighC: 25, winterLowC: -5, humidityAvg: 70, airQualityIndex: 55, seismicZone: 2, internetReliability: 8.8, englishDailyLife: 6.2, stability: 2.2, authoritarianRisk: 3.5, corruptionRisk: 6.5 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Uganda", iso2: "UG", iso3: "UGA", region: "Africa", subregion: "Eastern Africa",
    languages: ["English", "Swahili"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "The 'Pearl of Africa' — famous for its mountain gorillas, diverse landscapes, and youthful energy.",
    dimensions: { cost: 9.1, safety: 5.5, healthcare: 3.8, visaEase: 3, digitalInfra: 3.3, climate: 5.6, english: 8.3, lgbtqSafety: 0.5, techEcosystem: 4.8, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 180, transportUsd: 30, utilitiesUsd: 60, diningOutUsd: 120, healthInsuranceUsd: 50, totalEstimateUsd: 840 },
    cities: ["Kampala", "Entebbe", "Jinja"],
    rawIndicators: { summerHighC: 27, winterLowC: 16, humidityAvg: 70, airQualityIndex: 65, seismicZone: 3, internetReliability: 5.8, englishDailyLife: 9.1, stability: 6.2, authoritarianRisk: 8.2, corruptionRisk: 7.5 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "United States", iso2: "US", iso3: "USA", region: "Americas", subregion: "North America",
    languages: ["English"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The world's largest economy and premier technology hub, offering unparalleled regional diversity.",
    dimensions: { cost: 2.5, safety: 7.5, healthcare: 7.2, visaEase: 2, digitalInfra: 9.1, climate: 4.2, english: 10, lgbtqSafety: 7.5, techEcosystem: 10.0, naturalEnvironment: 8.1 },
    costBreakdown: { rentUsd: 2200, groceriesUsd: 500, transportUsd: 150, utilitiesUsd: 250, diningOutUsd: 600, healthInsuranceUsd: 450, totalEstimateUsd: 4150 },
    cities: ["New York City", "San Francisco", "Austin", "Miami"],
    rawIndicators: { summerHighC: 28, winterLowC: 0, humidityAvg: 55, airQualityIndex: 35, seismicZone: 3, internetReliability: 9.6, englishDailyLife: 10.0, stability: 7.8, authoritarianRisk: 3.2, corruptionRisk: 1.5 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Uzbekistan", iso2: "UZ", iso3: "UZB", region: "Asia", subregion: "Central Asia",
    languages: ["Uzbek", "Russian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A Silk Road treasure trove rapidly modernizing its economy and opening to the world.",
    dimensions: { cost: 9.1, safety: 5.5, healthcare: 4.5, visaEase: 4.5, digitalInfra: 4.9, climate: 3, english: 1.8, lgbtqSafety: 1.2, techEcosystem: 4.5, naturalEnvironment: 3.7 },
    costBreakdown: { rentUsd: 450, groceriesUsd: 180, transportUsd: 20, utilitiesUsd: 50, diningOutUsd: 120, healthInsuranceUsd: 50, totalEstimateUsd: 870 },
    cities: ["Tashkent", "Samarkand", "Bukhara"],
    rawIndicators: { summerHighC: 36, winterLowC: -2, humidityAvg: 35, airQualityIndex: 65, seismicZone: 4, internetReliability: 6.8, englishDailyLife: 2.5, stability: 8.8, authoritarianRisk: 7.8, corruptionRisk: 7.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Vatican City", iso2: "VA", iso3: "VAT", region: "Europe", subregion: "Southern Europe",
    languages: ["Latin", "Italian"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "The world's smallest sovereign state, an enclave of immense cultural and spiritual significance.",
    dimensions: { cost: 1.5, safety: 9.8, healthcare: 9.2, visaEase: 1.5, digitalInfra: 7.8, climate: 6.1, english: 6.5, lgbtqSafety: 3, techEcosystem: 4.2, naturalEnvironment: 2 },
    costBreakdown: { rentUsd: 3500, groceriesUsd: 600, transportUsd: 50, utilitiesUsd: 200, diningOutUsd: 800, healthInsuranceUsd: 200, totalEstimateUsd: 5350 },
    cities: ["Vatican City", "St. Peter Square"],
    rawIndicators: { summerHighC: 30, winterLowC: 4, humidityAvg: 65, airQualityIndex: 35, seismicZone: 2, internetReliability: 9.2, englishDailyLife: 8.1, stability: 9.9, authoritarianRisk: 5.2, corruptionRisk: 1.2 },
    dataConfidence: "high", lastUpdated: "2026-04-24"
  },
  {
    name: "Venezuela", iso2: "VE", iso3: "VEN", region: "Americas", subregion: "South America",
    languages: ["Spanish"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A nation of extreme natural beauty facing authoritarian rule, economic volatility, crime, and fragile infrastructure.",
    dimensions: { cost: 8.9, safety: 2.8, healthcare: 2.5, visaEase: 1, digitalInfra: 2.3, climate: 5.6, english: 2.1, lgbtqSafety: 3.8, techEcosystem: 2.8, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 450, groceriesUsd: 280, transportUsd: 25, utilitiesUsd: 40, diningOutUsd: 120, healthInsuranceUsd: 60, totalEstimateUsd: 975 },
    cities: ["Caracas", "Maracaibo", "Valencia"],
    rawIndicators: { summerHighC: 30, winterLowC: 18, humidityAvg: 75, airQualityIndex: 45, seismicZone: 3, internetReliability: 3.5, englishDailyLife: 2.8, stability: 2.5, authoritarianRisk: 9.2, corruptionRisk: 9.8 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Vanuatu", iso2: "VU", iso3: "VUT", region: "Oceania", subregion: "Melanesia",
    languages: ["Bislama", "French", "English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A South Pacific archipelago known for its active volcanoes, diverse cultures, and 'blue holes'.",
    dimensions: { cost: 6, safety: 8.8, healthcare: 3.5, visaEase: 5, digitalInfra: 2.7, climate: 5.1, english: 7.4, lgbtqSafety: 5.5, techEcosystem: 2.5, naturalEnvironment: 9.2 },
    costBreakdown: { rentUsd: 1100, groceriesUsd: 400, transportUsd: 50, utilitiesUsd: 180, diningOutUsd: 250, healthInsuranceUsd: 90, totalEstimateUsd: 2070 },
    cities: ["Port Vila", "Luganville"],
    rawIndicators: { summerHighC: 29, winterLowC: 20, humidityAvg: 80, airQualityIndex: 12, seismicZone: 5, internetReliability: 5.5, englishDailyLife: 8.8, stability: 8.5, authoritarianRisk: 1.8, corruptionRisk: 4.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Yemen", iso2: "YE", iso3: "YEM", region: "Asia", subregion: "Western Asia",
    languages: ["Arabic"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A country of profound history and unique architecture, currently facing an extreme humanitarian crisis.",
    dimensions: { cost: 9.1, safety: 1.2, healthcare: 1.5, visaEase: 0.5, digitalInfra: 1.5, climate: 5.6, english: 1.5, lgbtqSafety: 0.8, techEcosystem: 1.2, naturalEnvironment: 3.7 },
    costBreakdown: { rentUsd: 400, groceriesUsd: 250, transportUsd: 30, utilitiesUsd: 50, diningOutUsd: 100, healthInsuranceUsd: 40, totalEstimateUsd: 870 },
    cities: ["Sana'a", "Aden"],
    rawIndicators: { summerHighC: 32, winterLowC: 4, humidityAvg: 45, airQualityIndex: 75, seismicZone: 3, internetReliability: 1.5, englishDailyLife: 1.2, stability: 0.8, authoritarianRisk: 9.8, corruptionRisk: 9.9 },
    dataConfidence: "low", lastUpdated: "2026-04-24"
  },
  {
    name: "Zambia", iso2: "ZM", iso3: "ZMB", region: "Africa", subregion: "Eastern Africa",
    languages: ["English"], euMember: false, schengen: false, commonwealth: true,
    descriptor: "A stable South-Central African nation home to the Victoria Falls and vast wilderness.",
    dimensions: { cost: 8.8, safety: 7.5, healthcare: 4.2, visaEase: 3.5, digitalInfra: 4.1, climate: 5.1, english: 8.8, lgbtqSafety: 1.5, techEcosystem: 4.2, naturalEnvironment: 7.7 },
    costBreakdown: { rentUsd: 500, groceriesUsd: 200, transportUsd: 35, utilitiesUsd: 70, diningOutUsd: 140, healthInsuranceUsd: 60, totalEstimateUsd: 1005 },
    cities: ["Lusaka", "Livingstone", "Ndola"],
    rawIndicators: { summerHighC: 30, winterLowC: 10, humidityAvg: 60, airQualityIndex: 45, seismicZone: 2, internetReliability: 6.2, englishDailyLife: 9.2, stability: 7.8, authoritarianRisk: 4.2, corruptionRisk: 6.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
  {
    name: "Zimbabwe", iso2: "ZW", iso3: "ZWE", region: "Africa", subregion: "Eastern Africa",
    languages: ["English", "Shona", "Ndebele"], euMember: false, schengen: false, commonwealth: false,
    descriptor: "A nation of dramatic landscapes and resilient people, possessing significant agricultural and mineral wealth.",
    dimensions: { cost: 7.3, safety: 5.5, healthcare: 3.8, visaEase: 5.2, digitalInfra: 4.4, climate: 5.6, english: 9.1, lgbtqSafety: 1.8, techEcosystem: 4.5, naturalEnvironment: 7.2 },
    costBreakdown: { rentUsd: 750, groceriesUsd: 320, transportUsd: 45, utilitiesUsd: 120, diningOutUsd: 200, healthInsuranceUsd: 80, totalEstimateUsd: 1515 },
    cities: ["Harare", "Bulawayo", "Victoria Falls"],
    rawIndicators: { summerHighC: 28, winterLowC: 7, humidityAvg: 55, airQualityIndex: 40, seismicZone: 2, internetReliability: 6.8, englishDailyLife: 9.4, stability: 5.8, authoritarianRisk: 7.8, corruptionRisk: 8.2 },
    dataConfidence: "medium", lastUpdated: "2026-04-24"
  },
];
