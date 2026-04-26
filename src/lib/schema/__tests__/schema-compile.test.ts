import { describe, expect, it } from 'vitest';
import { z, ZodFirstPartyTypeKind, ZodNumber, ZodObject, ZodUnion } from 'zod';

import {
  CountrySchema,
  type Country,
  DimensionKeySchema,
  type DimensionKey,
  LifeStageEnum,
} from '../country';
import { MatchResultSchema, type MatchResult } from '../match';
import {
  NarrativeSchema,
  NarrativeTemplateSchema,
  type Narrative,
  type NarrativeTemplate,
} from '../narrative';
import { UserProfileSchema, type UserProfile } from '../profile';
import { VisaSchema, type Visa } from '../visa';

function expectSchemaAndType<T>(value: z.ZodType<T>) {
  // @ts-expect-error expectTypeOf inside generic function can be tricky with type inference
  expectTypeOf<T>().toEqualTypeOf<z.infer<typeof value>>();
  expect(typeof value.safeParse).toBe('function');
}

function getScoreNumberSchema(schema: typeof MatchResultSchema) {
  const shape = (schema as unknown as ZodObject<any>).shape;
  return shape.score as ZodNumber;
}

describe('schema compile contracts', () => {
  it('exports every schema alongside its TypeScript type', () => {
    expectSchemaAndType<Country>(CountrySchema as z.ZodType<Country>);
    expectSchemaAndType<Visa>(VisaSchema as z.ZodType<Visa>);
    expectSchemaAndType<UserProfile>(UserProfileSchema as z.ZodType<UserProfile>);
    expectSchemaAndType<MatchResult>(MatchResultSchema as z.ZodType<MatchResult>);
    expectSchemaAndType<Narrative>(NarrativeSchema as z.ZodType<Narrative>);
    expectSchemaAndType<NarrativeTemplate>(NarrativeTemplateSchema as z.ZodType<NarrativeTemplate>);
  });

  it('keeps DimensionKey union at exactly 10 members', () => {
    const optionCount =
      DimensionKeySchema._def.typeName === ZodFirstPartyTypeKind.ZodEnum
        ? DimensionKeySchema.options.length
        : (DimensionKeySchema as unknown as ZodUnion<any>).options.length;

    expectTypeOf<DimensionKey>().toEqualTypeOf<z.infer<typeof DimensionKeySchema>>();
    expect(optionCount).toBe(10);
  });

  it('keeps LifeStageEnum at exactly 7 members', () => {
    expect(LifeStageEnum.options).toHaveLength(7);
  });

  it("keeps NarrativeTemplate scoreBand as 'high' | 'medium' | 'low'", () => {
    const scoreBandSchema = (NarrativeTemplateSchema as unknown as ZodObject<any>).shape.scoreBand;

    expectTypeOf<NarrativeTemplate['scoreBand']>().toEqualTypeOf<'high' | 'medium' | 'low'>();
    expect(scoreBandSchema._def.typeName).toBe(ZodFirstPartyTypeKind.ZodEnum);
    expect((scoreBandSchema as typeof LifeStageEnum).options).toEqual(['high', 'medium', 'low']);
  });

  it('constrains MatchResult score to the 0-100 range', () => {
    const scoreSchema = getScoreNumberSchema(MatchResultSchema);
    const checks = scoreSchema._def.checks;

    expect(checks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ kind: 'min', value: 0 }),
        expect.objectContaining({ kind: 'max', value: 100 }),
      ]),
    );
  });
});
