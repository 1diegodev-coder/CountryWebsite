import { z } from 'zod';

import { LifeStageEnum } from './country';

export { LifeStageEnum };
export type LifeStageEnumType = z.infer<typeof LifeStageEnum>;

export const PushFactorSchema = z.enum([
  'costTooHigh',
  'politicalSocial',
  'climate',
  'tax',
  'career',
  'lifestyle',
  'healthcare',
  'exploring',
  'decided',
]);

export type PushFactor = z.infer<typeof PushFactorSchema>;

export const HouseholdSchema = z.enum([
  'solo',
  'coupleNoKids',
  'coupleWithKids',
  'singleParent',
  'other',
]);

export type Household = z.infer<typeof HouseholdSchema>;

export const ChildAgeSchema = z.enum(['under5', '5to11', '12to18']);

export type ChildAge = z.infer<typeof ChildAgeSchema>;

export const LanguageFlexibilitySchema = z.enum(['englishOnly', 'openToLearning']);

export type LanguageFlexibility = z.infer<typeof LanguageFlexibilitySchema>;

export const HealthcareNeedSchema = z.enum(['none', 'general', 'chronic', 'prescription']);

export type HealthcareNeed = z.infer<typeof HealthcareNeedSchema>;

export const NonNegotiableSchema = z.enum([
  'lgbtq',
  'pressFreedom',
  'genderEquality',
  'abortion',
  'alcohol',
  'secular',
  'religious',
  'lowTax',
]);

export type NonNegotiable = z.infer<typeof NonNegotiableSchema>;

export const SocialModeSchema = z.enum([
  'deepIntegration',
  'mixed',
  'expatBubble',
  'independent',
]);

export type SocialMode = z.infer<typeof SocialModeSchema>;

export const EnvironmentPreferenceSchema = z.enum([
  'bigCity',
  'midCity',
  'smallTown',
  'rural',
]);

export type EnvironmentPreference = z.infer<typeof EnvironmentPreferenceSchema>;

export const CulturalAppetiteSchema = z.enum([
  'radicallyDifferent',
  'upgradeButFamiliar',
  'similarToHome',
  'noPref',
]);

export type CulturalAppetite = z.infer<typeof CulturalAppetiteSchema>;

export const TopPrioritySchema = z.enum([
  'cost',
  'safety',
  'healthcare',
  'visaEase',
  'climate',
  'techEco',
  'lowTax',
  'nature',
  'expatCommunity',
  'culture',
  'internet',
  'english',
]);

export type TopPriority = z.infer<typeof TopPrioritySchema>;

export const DealbreakerSchema = z.enum([
  'extremeHeat',
  'extremeCold',
  'humidity',
  'airPollution',
  'seismicRisk',
  'highCost',
  'authoritarian',
  'corruption',
  'noInternet',
  'noEnglish',
  'unstable',
]);

export type Dealbreaker = z.infer<typeof DealbreakerSchema>;

/**
 * Matches all 13 PRD quiz questions exactly.
 *
 * Q1  lifeStage          Q8  languageFlexibility
 * Q2  household          Q9  healthcareNeed
 * Q3  childrenAges       Q10 nonNegotiables
 * Q4  pushFactors        Q11 socialMode
 * Q5  passports          Q12 environmentPreference
 * Q6  budgetUsdMonthly   Q13 culturalAppetite
 * Q7  languages          +   topPriorities / dealbreakers / locale
 */
export const UserProfileSchema = z.object({
  lifeStage: LifeStageEnum,
  household: HouseholdSchema,
  /** Present only when household is 'coupleWithKids' or 'singleParent'. */
  childrenAges: z.array(ChildAgeSchema).optional(),
  pushFactors: z.array(PushFactorSchema),
  /** ISO 3166-1 alpha-2 passport codes. At least one required. */
  passports: z.array(z.string().length(2)).min(1),
  budgetUsdMonthly: z.number().positive(),
  /** BCP 47 language codes (e.g. ['en', 'es']). At least one required. */
  languages: z.array(z.string().min(2)).min(1),
  languageFlexibility: LanguageFlexibilitySchema,
  healthcareNeed: HealthcareNeedSchema,
  nonNegotiables: z.array(NonNegotiableSchema),
  socialMode: SocialModeSchema,
  environmentPreference: EnvironmentPreferenceSchema,
  culturalAppetite: CulturalAppetiteSchema,
  /** Up to 3 priority keys that boost scoring weights. */
  topPriorities: z.array(TopPrioritySchema).max(3),
  dealbreakers: z.array(DealbreakerSchema),
  /** ISO 3166-1 alpha-2 codes of countries to force-include in matches. */
  overrides: z.array(z.string().length(2)).optional(),
  /** BCP 47 locale for localised output (e.g. 'en-US'). */
  locale: z.string().min(2),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
