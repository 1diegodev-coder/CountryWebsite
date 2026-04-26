import "server-only";

import { NarrativeTemplate } from '../schema/narrative';

export const NARRATIVE_TEMPLATES: NarrativeTemplate[] = [
  // WHY FIT - COST
  {
    dimension: 'cost',
    scoreBand: 'high',
    lifeStage: 'all',
    templateType: 'whyFit',
    template: "Your budget goes significantly further here than in most Western countries — expect a comfortable lifestyle.",
    requiredPlaceholders: []
  },
  {
    dimension: 'cost',
    scoreBand: 'high',
    lifeStage: 'all',
    templateType: 'whyFit',
    template: "Excellent value for money, allowing for a premium lifestyle on your ${{budget}} budget.",
    requiredPlaceholders: ['budget']
  },

  // WHY FIT - VISA
  {
    dimension: 'visaEase',
    scoreBand: 'high',
    lifeStage: 'founder',
    templateType: 'whyFit',
    template: "Straightforward pathways for entrepreneurs and business founders, including startup-friendly residency options.",
    requiredPlaceholders: []
  },
  {
    dimension: 'visaEase',
    scoreBand: 'high',
    lifeStage: 'remoteEmployee',
    templateType: 'whyFit',
    template: "Accessible digital nomad or remote work visas available, tailored for professionals like you.",
    requiredPlaceholders: []
  },
  {
    dimension: 'visaEase',
    scoreBand: 'high',
    lifeStage: 'retired',
    templateType: 'whyFit',
    template: "Favourable retirement visa pathways with clear and manageable income requirements.",
    requiredPlaceholders: []
  },

  // WHY FIT - SAFETY
  {
    dimension: 'safety',
    scoreBand: 'high',
    lifeStage: 'all',
    templateType: 'whyFit',
    template: "Highly ranked for personal safety, low crime, and political stability, providing peace of mind.",
    requiredPlaceholders: []
  },
  {
    dimension: 'safety',
    scoreBand: 'high',
    lifeStage: 'all',
    templateType: 'whyFit',
    template: "Exceptional safety and stability make it an ideal environment for your family to thrive.",
    requiredPlaceholders: []
  },

  // WHY FIT - HEALTHCARE
  {
    dimension: 'healthcare',
    scoreBand: 'high',
    lifeStage: 'all',
    templateType: 'whyFit',
    template: "World-class healthcare system capable of supporting your specific medical requirements.",
    requiredPlaceholders: []
  },

  // WATCH OUT
  {
    dimension: 'visaEase',
    scoreBand: 'low',
    lifeStage: 'all',
    templateType: 'watchOut',
    template: "Bureaucracy and visa processing can be slow and complex — start your application early.",
    requiredPlaceholders: []
  },
  {
    dimension: 'english',
    scoreBand: 'low',
    lifeStage: 'all',
    templateType: 'watchOut',
    template: "Low English penetration means navigating local administration will be challenging without a translator or language skills.",
    requiredPlaceholders: []
  },
  {
    dimension: 'cost',
    scoreBand: 'low',
    lifeStage: 'all',
    templateType: 'watchOut',
    template: "Housing and general living costs are high; you may need to adjust your expectations for accommodation.",
    requiredPlaceholders: []
  }
];
