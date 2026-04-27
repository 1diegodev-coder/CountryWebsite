import { z } from 'zod';

export const VisaEligibleLifeStageSchema = z.enum([
  'founder',
  'remoteEmployee',
  'freelancer',
  'localEmployee',
  'student',
  'semiRetired',
  'retired',
]);

export type VisaEligibleLifeStage = z.infer<typeof VisaEligibleLifeStageSchema>;

export const VisaIncomeRequirementSchema = z.object({
  amount: z.number().nonnegative(),
  currencyCode: z.string().length(3),
  period: z.enum(['monthly', 'annual', 'oneTime']),
  notes: z.string().optional(),
});

export type VisaIncomeRequirement = z.infer<typeof VisaIncomeRequirementSchema>;

export const VisaSchema = z
  .object({
    /** Stable machine-readable identifier for this visa pathway. */
    pathwayId: z.string().min(1),
    /** ISO2 code of the destination country. */
    countryCode: z.string().length(2),
    /** Machine-readable type identifier (e.g. 'digital-nomad', 'skilled-worker'). */
    visaType: z.string().min(1),
    /** Human-readable visa name (e.g. 'Digital Nomad Visa'). */
    name: z.string().min(1),
    /** Life stages this pathway is most relevant for. */
    eligibleLifeStages: z.array(VisaEligibleLifeStageSchema).min(1),
    /** Minimum income or funds requirement, when applicable. */
    incomeRequirement: VisaIncomeRequirementSchema.optional(),
    /** Visa or residence permit duration in months. */
    durationMonths: z.number().int().positive(),
    renewable: z.boolean(),
    leadsToResidency: z.boolean(),
    residencyYearsRequired: z.number().nonnegative().nullable(),
    /** [min, max] processing time in calendar weeks. */
    processingWeeks: z.tuple([z.number().nonnegative(), z.number().nonnegative()]),
    /** 1 = trivial, 5 = extremely difficult. */
    difficultyRating: z.number().int().min(1).max(5),
    requiresEmployer: z.boolean(),
    requiresMinIncome: z.boolean(),
    notes: z.string().optional(),
    sourceUrl: z.string().url(),
    /** ISO 8601 date (YYYY-MM-DD) when data was last verified. */
    lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  })
  .refine((pathway) => !pathway.requiresMinIncome || pathway.incomeRequirement, {
    message: 'incomeRequirement is required when requiresMinIncome is true',
    path: ['incomeRequirement'],
  });

export type Visa = z.infer<typeof VisaSchema>;
