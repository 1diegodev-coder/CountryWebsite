import { DimensionKey, Country, Dimensions, LifeStage } from '@/lib/schema/country';
import { UserProfile } from '@/lib/schema/profile';
import { MatchResult, EliminatedCountry, MatchPayload, EliminationReason } from '@/lib/schema/match';
import { COUNTRIES, LIFE_STAGE_WEIGHTS } from '@/lib/data/countries';
import { NARRATIVE_TEMPLATES } from '@/lib/data/narratives';
import { NarrativeTemplate, NarrativeContext } from '@/lib/schema/narrative';

const DIMENSION_KEYS: DimensionKey[] = [
  'cost', 'safety', 'healthcare', 'visaEase',
  'digitalInfra', 'climate', 'techEcosystem', 'lgbtqSafety',
  'naturalEnvironment', 'english'
];

/**
 * @description Run the matching engine against a UserProfile.
 */
export function runMatchingEngine(profile: UserProfile, overrides: string[] = []): Omit<MatchPayload, 'sessionToken'> {
  const pool = [...COUNTRIES];

  // Phase 1: Hard Filters
  const { candidates, eliminated } = applyHardFilters(pool, profile);

  // Add back overridden countries
  const overrideCountries = overrides.map(code => {
    const c = eliminated.find(e => e.countryCode === code);
    const original = COUNTRIES.find(o => o.iso2 === code);
    return original ? { ...original, is_override: true } : null;
  }).filter((c): c is (Country & { is_override: boolean }) => c !== null);

  const allCandidates = [...candidates, ...overrideCountries];
  
  // Phase 2: Weighted Scoring
  const weights = computeWeights(profile);
  const scored = rankCandidates(allCandidates, weights, profile);

  // Phase 3: Narratives & Formatting
  const matches: MatchResult[] = scored.map((c, index) => ({
    countryCode: c.iso2,
    score: c.matchPct,
    rank: index + 1,
    whyFit: generateWhyFit(c, profile),
    watchOut: generateWatchOut(c, profile),
    costRealityText: generateCostRealityText(c, profile.budgetUsdMonthly),
    dimensionScores: c.dimensions,
  }));

  return {
    shareReady: false, // Default to false; set to true in API if Redis persistence succeeds
    candidateCount: allCandidates.length,
    eliminatedCount: eliminated.length,
    matches,
    eliminated,
    profileSummary: generateProfileSummary(profile),
    computedWeights: weights,
    generatedAt: new Date().toISOString(),
  };
}

function applyHardFilters(countries: Country[], profile: UserProfile): { candidates: Country[], eliminated: EliminatedCountry[] } {
  const candidates: Country[] = [];
  const eliminated: EliminatedCountry[] = [];

  for (const country of countries) {
    const reasons = getEliminationReasons(country, profile);
    if (reasons.length > 0) {
      eliminated.push({
        countryCode: country.iso2,
        reason: reasons[0].code,
        detail: reasons[0].detail
      });
    } else {
      candidates.push(country);
    }
  }

  return { candidates, eliminated };
}

interface InternalEliminationReason {
  code: EliminationReason;
  detail: string;
}

function getEliminationReasons(country: Country, profile: UserProfile): InternalEliminationReason[] {
  const reasons: InternalEliminationReason[] = [];
  const { budgetUsdMonthly, languageFlexibility, nonNegotiables, healthcareNeed } = profile;

  const estMonthly = country.costBreakdown.totalEstimateUsd;
  if (estMonthly > budgetUsdMonthly * 1.15) {
    reasons.push({
      code: 'budget',
      detail: `Est. monthly cost $${estMonthly.toLocaleString()} exceeds your $${budgetUsdMonthly.toLocaleString()} budget`
    });
  }

  if (!isRelocationViable(country)) {
    reasons.push({
      code: 'safety',
      detail: 'Country does not currently meet baseline relocation viability standards'
    });
  }

  if (languageFlexibility === 'englishOnly' && country.rawIndicators.englishDailyLife < 5) {
    reasons.push({
      code: 'language',
      detail: `English is not functional for daily life (shops, admin, healthcare)`
    });
  }

  if (nonNegotiables.includes('lgbtq') && country.dimensions.lgbtqSafety < 5) {
    reasons.push({
      code: 'nonNegotiable',
      detail: 'Country does not meet LGBTQ+ safety and legal protection threshold'
    });
  }

  if (healthcareNeed === 'chronic' && country.dimensions.healthcare < 7) {
    reasons.push({
      code: 'healthcare',
      detail: 'Healthcare system does not meet chronic care requirements'
    });
  }

  return reasons;
}

function isRelocationViable(country: Country): boolean {
  return country.dimensions.safety >= 3 &&
    country.rawIndicators.stability >= 3 &&
    country.dimensions.visaEase >= 2 &&
    country.rawIndicators.authoritarianRisk < 9;
}

function computeWeights(profile: UserProfile): Record<DimensionKey, number> {
  const lifeStage = profile.lifeStage;
  const baseWeights = { ...(LIFE_STAGE_WEIGHTS[lifeStage]) };

  const priorities = profile.topPriorities || [];
  const PRIORITY_DIM_MAP: Record<string, DimensionKey> = {
    cost: 'cost', safety: 'safety', healthcare: 'healthcare',
    visaEase: 'visaEase', climate: 'climate', techEco: 'techEcosystem',
    lowTax: 'techEcosystem',
    nature: 'naturalEnvironment', internet: 'digitalInfra',
    english: 'english', culture: 'naturalEnvironment'
  };

  for (const p of priorities.slice(0, 3)) {
    const dim = PRIORITY_DIM_MAP[p];
    if (dim) {
      const boost = 0.08;
      baseWeights[dim] = (baseWeights[dim] || 0) + boost;
      const others = DIMENSION_KEYS.filter(d => d !== dim);
      const reductionEach = boost / others.length;
      for (const o of others) baseWeights[o] = Math.max(0, (baseWeights[o] || 0) - reductionEach);
    }
  }

  if (profile.household === 'coupleWithKids' || profile.household === 'singleParent') {
    const safetyBoost = 0.05;
    const healthBoost = 0.03;
    baseWeights.safety = (baseWeights.safety || 0) + safetyBoost;
    baseWeights.healthcare = (baseWeights.healthcare || 0) + healthBoost;
    
    const others = DIMENSION_KEYS.filter(d => d !== 'safety' && d !== 'healthcare');
    const reduction = (safetyBoost + healthBoost) / others.length;
    for (const o of others) baseWeights[o] = Math.max(0, (baseWeights[o] || 0) - reduction);
  }

  return baseWeights;
}

interface ScoredCountry extends Country {
  rawScore: number;
  matchPct: number;
}

function rankCandidates(candidates: Country[], weights: Record<DimensionKey, number>, profile: UserProfile): ScoredCountry[] {
  const scored = candidates.map(country => {
    let rawScore = 0;
    for (const dim of DIMENSION_KEYS) {
      const score = country.dimensions[dim] || 5;
      const w = weights[dim] || 0;
      rawScore += score * w;
    }

    // Dealbreaker adjustments using rawIndicators
    if (profile.dealbreakers.includes('extremeHeat') && country.rawIndicators.summerHighC >= 35) {
      rawScore *= 0.8;
    }
    if (profile.dealbreakers.includes('extremeCold') && country.rawIndicators.winterLowC <= -5) {
      rawScore *= 0.85;
    }

    return { ...country, rawScore, matchPct: 0 };
  });

  const maxScore = Math.max(...scored.map(c => c.rawScore), 0.001);
  return scored.map(c => ({
    ...c,
    matchPct: Math.round((c.rawScore / maxScore) * 100)
  })).sort((a, b) => b.matchPct - a.matchPct);
}

function renderTemplate(template: string, context: NarrativeContext): string {
  let rendered = template;
  Object.entries(context).forEach(([key, value]) => {
    rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
  });
  return rendered;
}

function getScoreBand(score: number): 'high' | 'medium' | 'low' {
  if (score >= 7) return 'high';
  if (score >= 4) return 'medium';
  return 'low';
}

function generateWhyFit(country: Country, profile: UserProfile): string[] {
  const context: NarrativeContext = {
    countryName: country.name,
    budget: profile.budgetUsdMonthly,
  };

  const reasons: string[] = [];
  
  DIMENSION_KEYS.forEach(dimKey => {
    const score = country.dimensions[dimKey];
    if (score >= 7) {
      const band = getScoreBand(score);
      const matches = NARRATIVE_TEMPLATES.filter(t => 
        t.dimension === dimKey && 
        t.scoreBand === band && 
        (t.lifeStage === 'all' || t.lifeStage === profile.lifeStage) &&
        t.templateType === 'whyFit'
      );
      
      if (matches.length > 0) {
        reasons.push(renderTemplate(matches[0].template, context));
      }
    }
  });

  if (reasons.length === 0) {
    reasons.push(`Offers a balanced lifestyle that aligns well with your general preferences.`);
  }

  return reasons.slice(0, 5);
}

function generateWatchOut(country: Country, profile: UserProfile): string[] {
  const context: NarrativeContext = {
    countryName: country.name,
    budget: profile.budgetUsdMonthly,
  };

  const issues: string[] = [];

  DIMENSION_KEYS.forEach(dimKey => {
    const score = country.dimensions[dimKey];
    if (score < 5) {
      const band = getScoreBand(score);
      const matches = NARRATIVE_TEMPLATES.filter(t => 
        t.dimension === dimKey && 
        t.scoreBand === band && 
        (t.lifeStage === 'all' || t.lifeStage === profile.lifeStage) &&
        t.templateType === 'watchOut'
      );
      
      if (matches.length > 0) {
        issues.push(renderTemplate(matches[0].template, context));
      }
    }
  });

  if (issues.length === 0) {
    issues.push(`Requires adaptability to local cultural norms and administrative processes.`);
  }

  return issues.slice(0, 3);
}

function generateCostRealityText(country: Country, budget: number): string {
  const est = country.costBreakdown.totalEstimateUsd;
  const diff = budget - est;
  if (diff > 500) {
    return `Highly affordable: Your budget goes far here. You'll likely save ~$${Math.round(diff)} per month against your limit.`;
  } else if (diff >= 0) {
    return `On budget: Estimated costs ($${Math.round(est)}) fit comfortably within your limit.`;
  } else {
    return `Stretched: Estimated costs ($${Math.round(est)}) exceed your ideal budget by ~$${Math.abs(Math.round(diff))}.`;
  }
}

function generateProfileSummary(profile: UserProfile): string {
  if (profile.lifeStage === 'founder' || profile.lifeStage === 'freelancer') {
    return `You're a business builder looking for opportunity and efficiency. Here's how the world looks for you.`;
  } else if (profile.household === 'coupleWithKids' || profile.household === 'singleParent') {
    return `You're building a life abroad for your family — safety, schools, and stability are everything. Here's where the world delivers.`;
  } else if (profile.lifeStage === 'remoteEmployee') {
    return `You're a remote worker who wants a great lifestyle without compromising your career. The world has more options than you'd think.`;
  } else if (profile.pushFactors.includes('exploring')) {
    return `You're not ready to commit — just exploring what's possible. Here's a picture of the world with your preferences in mind.`;
  } else if (profile.nonNegotiables.length > 0) {
    return `You're driven by values first. Here are the countries that share them.`;
  } else if (profile.lifeStage === 'retired' || profile.lifeStage === 'semiRetired') {
    return `You're looking for a comfortable, secure place to enjoy life on your terms. Here's where the world delivers.`;
  }
  
  return `You're looking for a change of pace with a focus on quality of life. Here's how the world matches up.`;
}
