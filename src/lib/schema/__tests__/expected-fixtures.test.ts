import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import { describe, expect, it } from 'vitest';
import { z } from 'zod';

const EXPECTED_DIR = path.resolve(process.cwd(), 'fixtures/expected');
const ISO2_REGEX = /^[A-Z]{2}$/;

const ExpectedFixtureSchema = z.object({
  top5: z.array(
    z.object({
      countryCode: z.string(),
      reason: z.string(),
    }),
  ),
  zero_results: z.union([
    z.literal(false),
    z.object({
      reason: z.string(),
    }),
  ]),
});

async function getExpectedFixtures() {
  const entries = await readdir(EXPECTED_DIR);
  return entries.filter((entry) => entry.endsWith('.json')).sort();
}

describe('expected fixtures', () => {
  it('parse and satisfy the expected fixture contract', async () => {
    const fixtureFiles = await getExpectedFixtures();

    await Promise.all(
      fixtureFiles.map(async (fileName) => {
        const raw = await readFile(path.join(EXPECTED_DIR, fileName), 'utf8');
        const parsedJson = JSON.parse(raw);
        const parsedFixture = ExpectedFixtureSchema.parse(parsedJson);

        expect(
          parsedFixture.top5.length === 5 || parsedFixture.zero_results !== false,
        ).toBe(true);
        expect(parsedFixture.top5.every((entry) => ISO2_REGEX.test(entry.countryCode))).toBe(true);
      }),
    );
  });
});
