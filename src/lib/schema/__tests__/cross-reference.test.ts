import { readdir } from 'node:fs/promises';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

const PROFILE_DIR = path.resolve(process.cwd(), 'fixtures/profiles');
const EXPECTED_DIR = path.resolve(process.cwd(), 'fixtures/expected');

function fixturePrefix(fileName: string) {
  const match = fileName.match(/^(\d{3})/);
  return match?.[1] ?? null;
}

async function fixturePrefixes(dir: string, extension: '.yaml' | '.json') {
  const entries = await readdir(dir);
  return entries
    .filter((entry) => entry.endsWith(extension))
    .map((entry) => fixturePrefix(entry))
    .filter((value): value is string => value !== null)
    .sort();
}

describe('fixture cross references', () => {
  it('keeps profile and expected fixtures paired by NNN prefix with 25 files each', async () => {
    const [profilePrefixes, expectedPrefixes] = await Promise.all([
      fixturePrefixes(PROFILE_DIR, '.yaml'),
      fixturePrefixes(EXPECTED_DIR, '.json'),
    ]);

    expect(profilePrefixes).toHaveLength(25);
    expect(expectedPrefixes).toHaveLength(25);
    expect(profilePrefixes).toEqual(expectedPrefixes);
  });
});
