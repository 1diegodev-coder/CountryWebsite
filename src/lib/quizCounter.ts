import "server-only";

import { UserProfile } from './schema/profile';
import { Country } from './schema/country';
import { COUNTRIES } from './data/countries';

/**
 * @description Returns the count of countries that still match the partial user profile.
 * Only applies filters for which we have answers.
 */
export function getMatchingCount(answers: Partial<UserProfile>): number {
  let count = 0;

  for (const country of COUNTRIES) {
    if (isStillMatch(country, answers)) {
      count++;
    }
  }

  return count;
}

/**
 * @description Pure helper to check if a country matches partial answers.
 * Logic must stay in sync with src/lib/engine.ts getEliminationReasons.
 */
function isStillMatch(country: Country, answers: Partial<UserProfile>): boolean {
  const { budgetUsdMonthly, languageFlexibility, nonNegotiables, healthcareNeed } = answers;

  // 1. Budget Filter (if answered)
  if (budgetUsdMonthly !== undefined) {
    const estMonthly = country.costBreakdown.totalEstimateUsd;
    if (estMonthly > budgetUsdMonthly * 1.15) return false;
  }

  // 2. Baseline Viability (always apply as it's static data)
  // Logic from src/lib/engine.ts:isRelocationViable
  if (country.dimensions.safety < 3 || 
      country.rawIndicators.stability < 3 || 
      country.dimensions.visaEase < 2 || 
      country.rawIndicators.authoritarianRisk >= 9) {
    return false;
  }

  // 3. Language Filter (if answered)
  if (languageFlexibility === 'englishOnly' && country.rawIndicators.englishDailyLife < 5) {
    return false;
  }

  // 4. Non-Negotiables (if answered)
  if (nonNegotiables && nonNegotiables.length > 0) {
    if (nonNegotiables.includes('lgbtq') && country.dimensions.lgbtqSafety < 5) return false;
  }

  // 5. Healthcare Filter (if answered)
  if (healthcareNeed === 'chronic' && country.dimensions.healthcare < 7) {
    return false;
  }

  // Note: Selected 'dealbreakers' (extremeHeat, extremeCold, authoritarian < 7) 
  // are score penalties in src/lib/engine.ts:rankCandidates, NOT hard filters.
  // We do not eliminate on them here to maintain parity with the engine.

  return true;
}
