import { z } from 'zod';

export const DimensionKeySchema = z.enum([
  'cost',
  'safety',
  'healthcare',
  'visaEase',
  'english',
  'digitalInfra',
  'climate',
  'techEcosystem',
  'lgbtqSafety',
  'naturalEnvironment',
]);

export type DimensionKey = z.infer<typeof DimensionKeySchema>;

/**
 * LifeStageEnum lives here (not in profile.ts) so schema-compile.test.ts
 * can import it alongside DimensionKeySchema from a single file.
 */
export const LifeStageEnum = z.enum([
  'founder',
  'remoteEmployee',
  'freelancer',
  'localEmployee',
  'student',
  'semiRetired',
  'retired',
]);

export type LifeStage = z.infer<typeof LifeStageEnum>;

export const DimensionsSchema = z.object({
  cost: z.number().min(0).max(10),
  safety: z.number().min(0).max(10),
  healthcare: z.number().min(0).max(10),
  visaEase: z.number().min(0).max(10),
  english: z.number().min(0).max(10),
  digitalInfra: z.number().min(0).max(10),
  climate: z.number().min(0).max(10),
  techEcosystem: z.number().min(0).max(10),
  lgbtqSafety: z.number().min(0).max(10),
  naturalEnvironment: z.number().min(0).max(10),
});

export type Dimensions = z.infer<typeof DimensionsSchema>;

export const CostBreakdownSchema = z.object({
  rentUsd: z.number().nonnegative(),
  groceriesUsd: z.number().nonnegative(),
  transportUsd: z.number().nonnegative(),
  utilitiesUsd: z.number().nonnegative(),
  diningOutUsd: z.number().nonnegative(),
  healthInsuranceUsd: z.number().nonnegative(),
  totalEstimateUsd: z.number().nonnegative(),
});

export type CostBreakdown = z.infer<typeof CostBreakdownSchema>;

export const RawIndicatorsSchema = z.object({
  summerHighC: z.number(),
  winterLowC: z.number(),
  humidityAvg: z.number().min(0).max(100),
  airQualityIndex: z.number().min(0),
  seismicZone: z.number().min(0).max(5),
  internetReliability: z.number().min(0).max(10),
  englishDailyLife: z.number().min(0).max(10),
  stability: z.number().min(0).max(10),
  authoritarianRisk: z.number().min(0).max(10),
  corruptionRisk: z.number().min(0).max(10),
});

export type RawIndicators = z.infer<typeof RawIndicatorsSchema>;

import { VisaSchema } from './visa';

export const DataConfidenceSchema = z.enum(['high', 'medium', 'low']);
export type DataConfidence = z.infer<typeof DataConfidenceSchema>;

export const CountrySchema = z.object({
  name: z.string().min(1),
  iso2: z.string().length(2),
  iso3: z.string().length(3),
  region: z.string().min(1),
  subregion: z.string().min(1),
  languages: z.array(z.string().min(1)).min(1),
  euMember: z.boolean(),
  schengen: z.boolean(),
  commonwealth: z.boolean(),
  descriptor: z.string().min(1),
  dimensions: DimensionsSchema,
  costBreakdown: CostBreakdownSchema,
  visaPathways: z.array(VisaSchema).optional(),
  cities: z.array(z.string()).default([]),
  rawIndicators: RawIndicatorsSchema,
  dataConfidence: DataConfidenceSchema,
  lastUpdated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  capitalCity: z.string().min(1),
  currency: z.object({
    code: z.string().length(3),
    name: z.string().min(1),
  }),
});

export type Country = z.infer<typeof CountrySchema>;

/** Country shape returned by the public API (internal fields stripped). */
export const PublicCountrySchema = CountrySchema.extend({
  snapshot: z.object({
    internetSpeed: z.number().optional(), // Derived or direct
    internetReliability: z.number(),
    englishDailyLife: z.number(),
    stability: z.number(),
    airQualityIndex: z.number(),
    climate: z.object({
      summerHigh: z.number(),
      winterLow: z.number(),
    }),
  }).optional(),
}).omit({
  lastUpdated: true,
  rawIndicators: true,
});

export type PublicCountry = z.infer<typeof PublicCountrySchema>;
