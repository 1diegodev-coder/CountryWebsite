import { z } from 'zod';

import { DimensionKeySchema, DimensionsSchema } from './country';

export const EliminationReasonSchema = z.enum([
  'budget',
  'language',
  'nonNegotiable',
  'passport',
  'safety',
  'healthcare',
]);

export type EliminationReason = z.infer<typeof EliminationReasonSchema>;

export const MatchResultSchema = z.object({
  /** ISO2 country code. */
  countryCode: z.string().length(2),
  /** Normalised match score 0–100. */
  score: z.number().min(0).max(100),
  /** 1-indexed rank among all non-eliminated countries. */
  rank: z.number().int().positive(),
  /** Bullet strings explaining why this country fits the profile. */
  whyFit: z.array(z.string().min(1)),
  /** Bullet strings flagging potential downsides. */
  watchOut: z.array(z.string().min(1)),
  /** Human-readable cost-of-living summary calibrated to the user's budget. */
  costRealityText: z.string().min(1),
  /** Raw dimension scores used to derive the overall score. */
  dimensionScores: DimensionsSchema,
});

export type MatchResult = z.infer<typeof MatchResultSchema>;

export const EliminatedCountrySchema = z.object({
  countryCode: z.string().length(2),
  reason: EliminationReasonSchema,
  detail: z.string().min(1),
});

export type EliminatedCountry = z.infer<typeof EliminatedCountrySchema>;

export const MatchPayloadSchema = z.object({
  /** Opaque token stored in Redis; used as the share/recall key. */
  sessionToken: z.string().min(1),
  /** Whether the result was successfully persisted to Redis for sharing. */
  shareReady: z.boolean(),
  candidateCount: z.number().int().nonnegative(),
  eliminatedCount: z.number().int().nonnegative(),
  /** Ranked match results, best first. */
  matches: z.array(MatchResultSchema),
  eliminated: z.array(EliminatedCountrySchema),
  profileSummary: z.string().min(1),
  /**
   * Final per-dimension weights after life-stage base + priority boosts + household modifiers.
   * Keys must cover all DimensionKey values; values are relative (not normalised to 1.0).
   */
  computedWeights: z.record(DimensionKeySchema, z.number().nonnegative()),
  /** ISO 8601 datetime string. */
  generatedAt: z.string().datetime(),
});

export type MatchPayload = z.infer<typeof MatchPayloadSchema>;
