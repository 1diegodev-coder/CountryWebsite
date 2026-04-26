import { z } from 'zod';

import { DimensionKeySchema, LifeStageEnum } from './country';

/**
 * A single rendered narrative bullet — the output of resolving a
 * NarrativeTemplate against a specific country and user context.
 */
export const NarrativeSchema = z.object({
  dimension: DimensionKeySchema,
  type: z.enum(['whyFit', 'watchOut', 'personalityMirror']),
  /** Resolved text with all {{placeholders}} substituted. */
  text: z.string().min(1),
});

export type Narrative = z.infer<typeof NarrativeSchema>;

/**
 * A single row in the narrative template library.
 *
 * Templates use {{placeholder}} syntax.  All keys listed in
 * requiredPlaceholders must be supplied at render time — the renderer
 * should throw if any key is absent from the context.
 *
 * Example:
 *   template: "{{countryName}}'s cost sits within your ${{budget}} budget."
 *   requiredPlaceholders: ["countryName", "budget"]
 */
export const NarrativeTemplateSchema = z.object({
  dimension: DimensionKeySchema,
  scoreBand: z.enum(['high', 'medium', 'low']),
  /** Use 'all' when the template applies regardless of life stage. */
  lifeStage: z.union([LifeStageEnum, z.literal('all')]),
  templateType: z.enum(['whyFit', 'watchOut', 'personalityMirror']),
  template: z.string().min(1),
  requiredPlaceholders: z.array(z.string().min(1)),
});

export type NarrativeTemplate = z.infer<typeof NarrativeTemplateSchema>;

export type NarrativeContext = Record<string, string | number>;
