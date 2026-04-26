import { z } from 'zod';

export const VisaSchema = z.object({
  /** ISO2 code of the destination country. */
  countryCode: z.string().length(2),
  /** ISO2 code of the applicant's passport country. */
  passportCode: z.string().length(2),
  /** Machine-readable type identifier (e.g. 'digital-nomad', 'skilled-worker'). */
  visaType: z.string().min(1),
  /** Human-readable visa name (e.g. 'Digital Nomad Visa'). */
  name: z.string().min(1),
  /** [min, max] processing time in calendar weeks. */
  processingWeeks: z.tuple([z.number().nonnegative(), z.number().nonnegative()]),
  /** 1 = trivial, 5 = extremely difficult. */
  difficultyRating: z.number().int().min(1).max(5),
  requiresEmployer: z.boolean(),
  requiresMinIncome: z.boolean(),
  notes: z.string().optional(),
  sourceUrl: z.string().url().optional(),
  /** ISO 8601 date (YYYY-MM-DD) when data was last verified. */
  lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type Visa = z.infer<typeof VisaSchema>;
