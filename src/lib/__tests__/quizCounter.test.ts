import { describe, it, expect } from 'vitest';
import { getMatchingCount } from '../quizCounter';
import { UserProfile } from '../schema/profile';
import { runMatchingEngine } from '../engine';

describe('quizCounter', () => {
  it('returns initial count for empty profile (including baseline viability filters)', () => {
    const count = getMatchingCount({});
    // Should be less than 195 because some countries fail baseline viability (safety/stability/etc)
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(195);
  });

  it('narrows count as budget is added', () => {
    const initial = getMatchingCount({});
    const narrowed = getMatchingCount({ budgetUsdMonthly: 1500 });
    expect(narrowed).toBeLessThan(initial);
  });

  it('narrows count for non-negotiables like LGBTQ+', () => {
    const initial = getMatchingCount({});
    const narrowed = getMatchingCount({ nonNegotiables: ['lgbtq'] });
    expect(narrowed).toBeLessThan(initial);
  });

  it('does NOT narrow count for score-only dealbreakers like extreme heat', () => {
    const initial = getMatchingCount({});
    // dealbreakers are weights in the engine, not hard filters, so they shouldn't change the count
    const afterDealbreaker = getMatchingCount({ dealbreakers: ['extremeHeat'] });
    expect(afterDealbreaker).toBe(initial);
  });

  describe('Parity Regression Guard', () => {
    const baselineProfile: UserProfile = {
      lifeStage: 'remoteEmployee',
      household: 'solo',
      pushFactors: ['lifestyle'],
      passports: ['US'],
      budgetUsdMonthly: 5000,
      languages: ['en'],
      languageFlexibility: 'openToLearning',
      healthcareNeed: 'general',
      nonNegotiables: [],
      socialMode: 'mixed',
      environmentPreference: 'bigCity',
      culturalAppetite: 'upgradeButFamiliar',
      topPriorities: ['cost'],
      dealbreakers: [],
      locale: 'en-US'
    };

    it('matches engine count for baseline profile', () => {
      const engineResult = runMatchingEngine(baselineProfile);
      expect(getMatchingCount(baselineProfile)).toBe(engineResult.matches.length);
    });

    it('matches engine count for low budget profile', () => {
      const profile = { ...baselineProfile, budgetUsdMonthly: 1200 };
      const engineResult = runMatchingEngine(profile);
      expect(getMatchingCount(profile)).toBe(engineResult.matches.length);
    });

    it('matches engine count for englishOnly language flexibility', () => {
      const profile = { ...baselineProfile, languageFlexibility: 'englishOnly' as const };
      const engineResult = runMatchingEngine(profile);
      expect(getMatchingCount(profile)).toBe(engineResult.matches.length);
    });

    it('matches engine count for LGBTQ non-negotiable', () => {
      const profile = { ...baselineProfile, nonNegotiables: ['lgbtq' as const] };
      const engineResult = runMatchingEngine(profile);
      expect(getMatchingCount(profile)).toBe(engineResult.matches.length);
    });

    it('matches engine count for chronic healthcare need', () => {
      const profile = { ...baselineProfile, healthcareNeed: 'chronic' as const };
      const engineResult = runMatchingEngine(profile);
      expect(getMatchingCount(profile)).toBe(engineResult.matches.length);
    });

    it('maintains parity even with dealbreakers (proving they do not eliminate)', () => {
      const profile = { ...baselineProfile, dealbreakers: ['extremeHeat' as const, 'extremeCold' as const] };
      const engineResult = runMatchingEngine(profile);
      expect(getMatchingCount(profile)).toBe(engineResult.matches.length);
    });
  });
});
