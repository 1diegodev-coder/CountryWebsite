import { describe, it, expect } from 'vitest';
import { getMatchingCount } from '../quizCounter';
import { UserProfile } from '../schema/profile';

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
});
