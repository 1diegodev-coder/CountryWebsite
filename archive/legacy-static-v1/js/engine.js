// CountryDNA — Matching Engine
// Phase 1: Hard Filters → Phase 2: Weighted Scoring → Phase 3: Narratives

const DIMENSION_KEYS = [
  'economic_accessibility','visa_residency','safety_stability','healthcare_quality',
  'digital_infrastructure','climate_match','social_cultural_fit','values_alignment',
  'economic_opportunity','lifestyle_match'
];

// ─── PHASE 1: HARD FILTERS ───────────────────────────────────────────────────

function applyHardFilters(countries, answers) {
  const eliminated = [];
  const candidates = [];

  for (const country of countries) {
    const reasons = getEliminationReasons(country, answers);
    if (reasons.length > 0) {
      eliminated.push({ ...country, elimination_reasons: reasons });
    } else {
      candidates.push(country);
    }
  }

  return { candidates, eliminated };
}

function getEliminationReasons(country, answers) {
  const reasons = [];
  const { budget, language, non_negotiables = [], dealbreakers = [], healthcare } = answers;

  // Budget filter: country cost > budget * 1.15
  if (budget && country.raw_data.monthly_cost_usd > budget * 1.15) {
    reasons.push({
      code: 'BUDGET',
      label: 'Budget',
      detail: `Est. monthly cost $${country.raw_data.monthly_cost_usd.toLocaleString()} exceeds your $${budget.toLocaleString()} budget`
    });
  }

  // Language filter
  if (language === 'english_only' && country.raw_data.ef_epi_score < 52) {
    reasons.push({
      code: 'LANGUAGE',
      label: 'Language barrier',
      detail: `English proficiency score (${country.raw_data.ef_epi_score}) is below the threshold for English-only living`
    });
  }

  // Non-negotiables
  if (non_negotiables.includes('lgbtq') && country.raw_data.ilga_lgbtq_score < 30) {
    reasons.push({
      code: 'NON_NEGOTIABLE',
      label: 'LGBTQ+ rights',
      detail: 'Country does not meet LGBTQ+ safety and legal protection threshold'
    });
  }
  if (non_negotiables.includes('press_freedom') && country.raw_data.rsf_press_freedom < 40) {
    reasons.push({
      code: 'NON_NEGOTIABLE',
      label: 'Press freedom',
      detail: `Press freedom score (${country.raw_data.rsf_press_freedom}) is critically low`
    });
  }
  if (non_negotiables.includes('democracy') && country.dimension_scores.values_alignment < 5) {
    reasons.push({
      code: 'NON_NEGOTIABLE',
      label: 'Democratic governance',
      detail: 'Country does not meet democratic governance threshold'
    });
  }
  if (non_negotiables.includes('english_access') && country.raw_data.ef_epi_score < 55) {
    reasons.push({
      code: 'NON_NEGOTIABLE',
      label: 'English access',
      detail: `English proficiency (${country.raw_data.ef_epi_score}) does not meet your requirement`
    });
  }

  // Healthcare critical need
  if (healthcare === 'critical' && country.dimension_scores.healthcare_quality < 7) {
    reasons.push({
      code: 'HEALTHCARE',
      label: 'Healthcare',
      detail: 'Healthcare system does not meet critical care requirements'
    });
  }

  // Dealbreakers (soft → hard for extreme cases)
  if (dealbreakers.includes('extreme_heat') && country.code === 'AE') {
    reasons.push({ code: 'DEALBREAKER', label: 'Extreme heat', detail: 'Temperatures regularly exceed 40°C from May to September' });
  }
  if (dealbreakers.includes('extreme_cold') && ['EE'].includes(country.code)) {
    reasons.push({ code: 'DEALBREAKER', label: 'Extreme cold', detail: 'Harsh winters with very limited daylight hours' });
  }
  if (dealbreakers.includes('seismic_risk') && country.code === 'JP') {
    reasons.push({ code: 'DEALBREAKER', label: 'Seismic risk', detail: 'Japan sits on a major tectonic fault line — frequent earthquake activity' });
  }
  if (dealbreakers.includes('very_high_cost') && country.raw_data.monthly_cost_usd > 4000) {
    reasons.push({ code: 'DEALBREAKER', label: 'Very high cost', detail: `Monthly cost of $${country.raw_data.monthly_cost_usd.toLocaleString()} is among the world's highest` });
  }
  if (dealbreakers.includes('limited_english') && country.raw_data.ef_epi_score < 54) {
    reasons.push({ code: 'DEALBREAKER', label: 'Limited English', detail: 'English penetration is low — daily life requires local language' });
  }

  // Passport access check
  if (answers.passports && country.visa_access) {
    const access = country.visa_access[answers.passports];
    if (access === 'restricted') {
      reasons.push({
        code: 'PASSPORT',
        label: 'Passport access',
        detail: 'Entry and long-term residency is very difficult with your passport — check official sources'
      });
    }
  }

  return reasons;
}

// ─── PHASE 2: WEIGHTED SCORING ───────────────────────────────────────────────

function computeWeights(answers) {
  const lifeStage = answers.life_stage || 'optimiser';
  const baseWeights = { ...(LIFE_STAGE_WEIGHTS[lifeStage] || LIFE_STAGE_WEIGHTS.optimiser) };

  // Priority boosts (+8% each, redistributed)
  const priorities = answers.priorities || [];
  const PRIORITY_DIM_MAP = {
    low_tax: 'economic_opportunity', safety: 'safety_stability', nature: 'lifestyle_match',
    internet: 'digital_infrastructure', healthcare_q: 'healthcare_quality',
    budget_stretch: 'economic_accessibility', easy_visa: 'visa_residency',
    culture: 'social_cultural_fit', values_align: 'values_alignment', opportunity: 'economic_opportunity'
  };

  for (const p of priorities.slice(0, 3)) {
    const dim = PRIORITY_DIM_MAP[p];
    if (dim) {
      const boost = 0.08;
      baseWeights[dim] = (baseWeights[dim] || 0) + boost;
      // Redistribute from all other dims
      const others = DIMENSION_KEYS.filter(d => d !== dim);
      const reductionEach = boost / others.length;
      for (const o of others) baseWeights[o] = Math.max(0, (baseWeights[o] || 0) - reductionEach);
    }
  }

  // Modifier: children in household
  if (['family_young', 'family_teen'].includes(answers.household)) {
    baseWeights.safety_stability = (baseWeights.safety_stability || 0) + 0.05;
    baseWeights.healthcare_quality = (baseWeights.healthcare_quality || 0) + 0.03;
    baseWeights.lifestyle_match = Math.max(0, (baseWeights.lifestyle_match || 0) - 0.03);
    baseWeights.digital_infrastructure = Math.max(0, (baseWeights.digital_infrastructure || 0) - 0.05);
  }

  // Modifier: tax push factor
  const pushFactors = answers.push_factors || [];
  if (pushFactors.includes('tax')) {
    baseWeights.economic_opportunity = (baseWeights.economic_opportunity || 0) + 0.05;
    baseWeights.visa_residency = (baseWeights.visa_residency || 0) + 0.03;
    baseWeights.lifestyle_match = Math.max(0, (baseWeights.lifestyle_match || 0) - 0.04);
    baseWeights.climate_match = Math.max(0, (baseWeights.climate_match || 0) - 0.04);
  }

  // Modifier: healthcare push factor
  if (pushFactors.includes('healthcare')) {
    baseWeights.healthcare_quality = (baseWeights.healthcare_quality || 0) + 0.08;
    baseWeights.lifestyle_match = Math.max(0, (baseWeights.lifestyle_match || 0) - 0.04);
    baseWeights.digital_infrastructure = Math.max(0, (baseWeights.digital_infrastructure || 0) - 0.04);
  }

  // Normalise to sum = 1.0
  const total = DIMENSION_KEYS.reduce((s, k) => s + (baseWeights[k] || 0), 0);
  for (const k of DIMENSION_KEYS) baseWeights[k] = (baseWeights[k] || 0) / total;

  return baseWeights;
}

function scoreCountry(country, weights, answers) {
  let rawScore = 0;
  const dimScores = {};

  for (const dim of DIMENSION_KEYS) {
    const score = country.dimension_scores[dim] || 5;
    const w = weights[dim] || 0;
    const weighted = score * w;
    rawScore += weighted;
    dimScores[dim] = { score, weight: w, contribution: weighted };
  }

  // Climate penalty from dealbreakers
  const dealbreakers = answers.dealbreakers || [];
  if (dealbreakers.includes('extreme_heat') && country.code === 'AE') rawScore *= 0.8;
  if (dealbreakers.includes('extreme_cold') && country.code === 'EE') rawScore *= 0.85;
  if (dealbreakers.includes('high_humidity') && ['TH', 'SG', 'CR'].includes(country.code)) rawScore *= 0.9;
  if (dealbreakers.includes('seismic_risk') && country.code === 'JP') rawScore *= 0.85;

  return { rawScore, dimScores };
}

function rankCandidates(candidates, answers) {
  const weights = computeWeights(answers);
  const scored = candidates.map(country => {
    const { rawScore, dimScores } = scoreCountry(country, weights, answers);
    return { ...country, rawScore, dimScores, weights };
  });

  // Normalise to top = 100
  const maxScore = Math.max(...scored.map(c => c.rawScore));
  return scored.map(c => ({
    ...c,
    matchPct: Math.round((c.rawScore / maxScore) * 100)
  })).sort((a, b) => b.matchPct - a.matchPct);
}

// ─── PHASE 3: NARRATIVES ─────────────────────────────────────────────────────

function generateNarratives(country, answers) {
  const lifeStage = answers.life_stage || 'default';
  const whyFitPool = [
    ...(country.why_fit[lifeStage] || []),
    ...(country.why_fit.all || []),
    ...(country.why_fit.default || [])
  ];
  const watchOutPool = [
    ...(country.watch_out.all || []),
    ...(country.watch_out[lifeStage] || []),
    ...(country.watch_out.values || []),
    ...(country.watch_out.all2 || [])
  ];

  return {
    why_fit: [...new Set(whyFitPool)].slice(0, 4),
    watch_out: [...new Set(watchOutPool)].slice(0, 3)
  };
}

function generateCostReality(country, budget) {
  const cb = country.cost_breakdown;
  if (!cb) {
    const base = country.raw_data?.monthly_cost_usd || 2000;
    return {
      estimated_low: Math.round(base * 0.85),
      estimated_high: Math.round(base * 1.15),
      saving_vs_budget: budget ? budget - base : null,
      breakdown: null
    };
  }
  const total = cb.rent_1bed_secondary + cb.groceries + cb.dining_out_meal * 15 +
    cb.transport + cb.coworking + cb.gym + cb.health_insurance;
  const totalCapital = cb.rent_1bed_capital + cb.groceries + cb.dining_out_meal * 20 +
    cb.transport + cb.coworking + cb.gym + cb.health_insurance;

  const saving = budget ? budget - Math.round((total + totalCapital) / 2) : null;

  return {
    estimated_low: total,
    estimated_high: totalCapital,
    saving_vs_budget: saving,
    breakdown: cb
  };
}

function generatePersonalityMirror(answers) {
  const { life_stage, push_factors = [], household, priorities = [] } = answers;
  const topPriority = priorities[0];

  const mirrors = {
    founder: `You're building something — and you know that where you build matters as much as what you build. Here's how the world looks for a founder on the move.`,
    remote_worker: `You've unlocked location independence. Now let's find the place that makes that independence feel like freedom, not just convenience.`,
    freelancer: `You work for yourself — which means you can live anywhere. Here are the places that reward that decision most.`,
    family: `You're building a life, not just a base. Safety, schools, and stability aren't compromises — they're the whole point. Here's where the world delivers.`,
    retiree: `You've earned the freedom to choose on your terms. Here's where your standard of living actually improves.`,
    optimiser: `You're looking at this analytically — quality of life per dollar, safety per square metre, opportunity per kilometre from the airport. So are we.`,
    values_led: `You're not just moving countries — you're choosing an environment that reflects who you are. Here are the places that share your values.`,
  };

  return mirrors[life_stage] || `You're exploring what's possible. Here's a picture of the world with your preferences in mind.`;
}

// ─── MAIN ENTRY POINT ────────────────────────────────────────────────────────

function runMatchingEngine(answers, overrides = []) {
  let pool = [...COUNTRIES];

  // Apply overrides (countries re-added by user)
  const { candidates: filtered, eliminated } = applyHardFilters(pool, answers);

  // Add back overridden countries (with override badge)
  const overrideCountries = overrides.map(code => {
    const c = eliminated.find(e => e.code === code);
    return c ? { ...c, is_override: true } : null;
  }).filter(Boolean);

  const allCandidates = [...filtered, ...overrideCountries];
  const ranked = rankCandidates(allCandidates, answers);
  const weights = computeWeights(answers);

  // Add narratives and cost reality
  const results = ranked.map(country => ({
    ...country,
    narratives: generateNarratives(country, answers),
    cost_reality: generateCostReality(country, answers.budget),
    is_top_match: false
  }));

  if (results.length > 0) results[0].is_top_match = true;

  return {
    matches: results,
    eliminated,
    weights,
    candidate_count: allCandidates.length,
    eliminated_count: eliminated.length,
    personality_mirror: generatePersonalityMirror(answers),
    total_countries: COUNTRIES.length
  };
}

// Count how many countries pass filters after each question (for live counter)
function getLiveCount(answersUpToNow) {
  const { candidates } = applyHardFilters(COUNTRIES, answersUpToNow);
  return candidates.length;
}

// What-if scenario: recompute with modified constraints
function runWhatIf(answers, modifications) {
  const modifiedAnswers = { ...answers, ...modifications };
  return runMatchingEngine(modifiedAnswers);
}

Object.assign(window, { runMatchingEngine, getLiveCount, runWhatIf, computeWeights, DIMENSION_KEYS });
