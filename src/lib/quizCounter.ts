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
  const { budgetUsdMonthly, languageFlexibility, nonNegotiables, healthcareNeed, dealbreakers } = answers;

  // 1. Budget Filter (if answered)
  if (budgetUsdMonthly !== undefined) {
    const estMonthly = country.costBreakdown.totalEstimateUsd;
    if (estMonthly > budgetUsdMonthly * 1.15) return false;
  }

  // 2. Baseline Viability (always apply as it's static data)
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
    // Note: Other non-negotiables like pressFreedom, genderEquality, secular are currently 
    // weights in the PRD/engine draft or handled by score mapping, but if they were hard filters 
    // in getEliminationReasons, they'd go here. 
    // Currently, engine.ts only hard-filters lgbtq from nonNegotiables.
  }

  // 5. Healthcare Filter (if answered)
  if (healthcareNeed === 'chronic' && country.dimensions.healthcare < 7) {
    return false;
  }

  // 6. Dealbreakers (if answered)
  if (dealbreakers && dealbreakers.length > 0) {
    if (dealbreakers.includes('extremeHeat') && country.rawIndicators.summerHighC >= 35) return false;
    if (dealbreakers.includes('extremeCold') && country.rawIndicators.winterLowC <= -5) return false;
    if (dealbreakers.includes('authoritarian') && country.rawIndicators.authoritarianRisk >= 7) return false;
    // airPollution/humidity are currently handled as weights/scores in some engine drafts 
    // but if we want to add them as hard filters here we should verify engine.ts parity.
  }

  return true;
}
