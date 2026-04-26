import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import yaml from 'js-yaml';
import { describe, expect, it } from 'vitest';

import { UserProfileSchema } from '../profile';

const PROFILE_DIR = path.resolve(process.cwd(), 'fixtures/profiles');
const ISO2_REGEX = /^[A-Z]{2}$/;

async function getProfileFixtures() {
  const entries = await readdir(PROFILE_DIR);
  return entries.filter((entry) => entry.endsWith('.yaml')).sort();
}

describe('profile fixtures', () => {
  it('parse and validate against UserProfileSchema', async () => {
    const fixtureFiles = await getProfileFixtures();

    await Promise.all(
      fixtureFiles.map(async (fileName) => {
        const raw = await readFile(path.join(PROFILE_DIR, fileName), 'utf8');
        const parsedYaml = yaml.load(raw);
        const parsedProfile = UserProfileSchema.parse(parsedYaml);

        expect(Array.isArray(parsedProfile.passports)).toBe(true);
        expect(parsedProfile.passports.every((code) => ISO2_REGEX.test(code))).toBe(true);
        expect(parsedProfile.topPriorities.length).toBeLessThanOrEqual(3);
      }),
    );
  });
});
