import type { Country } from '../../../schema/country';

/**
 * Canonical mock Country object for tests. Typed against the live Country
 * schema — TypeScript will error here immediately if a required field is
 * added or removed from CountrySchema, preventing silent runtime crashes
 * in jsdom tests.
 *
 * Use this fixture wherever a full Country object is needed in tests instead
 * of duplicating inline mock objects that can drift from the schema.
 */
export const mockCountryPT: Country = {
  name: 'Portugal',
  iso2: 'PT',
  iso3: 'PRT',
  region: 'Europe',
  subregion: 'Southern Europe',
  languages: ['Portuguese'],
  euMember: true,
  schengen: true,
  commonwealth: false,
  descriptor: 'A sun-drenched Atlantic nation where old-world charm meets modern digital infrastructure.',
  capitalCity: 'Lisbon',
  currency: { code: 'EUR', name: 'Euro' },
  dataConfidence: 'medium',
  lastUpdated: '2026-04-21',
  dimensions: {
    cost: 5.7,
    safety: 8.6,
    healthcare: 7.2,
    visaEase: 8,
    digitalInfra: 5.7,
    climate: 6.7,
    english: 4.8,
    lgbtqSafety: 8.3,
    techEcosystem: 7.1,
    naturalEnvironment: 5.2,
  },
  costBreakdown: {
    rentUsd: 1350,
    groceriesUsd: 280,
    transportUsd: 42,
    utilitiesUsd: 120,
    diningOutUsd: 280,
    healthInsuranceUsd: 90,
    totalEstimateUsd: 2162,
  },
  rawIndicators: {
    summerHighC: 28,
    winterLowC: 8,
    humidityAvg: 65,
    airQualityIndex: 35,
    seismicZone: 3,
    internetReliability: 8.5,
    englishDailyLife: 7.2,
    stability: 8.8,
    authoritarianRisk: 1.5,
    corruptionRisk: 2.1,
  },
  cities: ['Lisbon', 'Porto', 'Lagos'],
  visaPathways: [
    {
      pathwayId: 'PT-D8',
      countryCode: 'PT',
      visaType: 'digital-nomad',
      name: 'D8 Digital Nomad Visa',
      eligibleLifeStages: ['remoteEmployee', 'freelancer'],
      incomeRequirement: {
        amount: 3480,
        currencyCode: 'EUR',
        period: 'monthly',
      },
      durationMonths: 12,
      renewable: true,
      leadsToResidency: true,
      residencyYearsRequired: 5,
      processingWeeks: [4, 12],
      difficultyRating: 3,
      requiresEmployer: false,
      requiresMinIncome: true,
      sourceUrl: 'https://vistos.mne.gov.pt/',
      lastVerified: '2026-04-27',
    },
  ],
};
