import { describe, expect, it } from 'vitest';

import { VisaSchema } from '../visa';

describe('VisaSchema', () => {
  const validVisa = {
    pathwayId: 'PT-D8',
    countryCode: 'PT',
    visaType: 'digital-nomad',
    name: 'D8 Digital Nomad Visa',
    eligibleLifeStages: ['founder', 'remoteEmployee', 'freelancer'],
    incomeRequirement: {
      amount: 3480,
      currencyCode: 'EUR',
      period: 'monthly',
      notes: 'Minimum income varies by household size.',
    },
    durationMonths: 12,
    renewable: true,
    leadsToResidency: true,
    residencyYearsRequired: 5,
    processingWeeks: [4, 12],
    difficultyRating: 3,
    requiresEmployer: false,
    requiresMinIncome: true,
    notes: 'Verify details with the official government portal before acting.',
    sourceUrl: 'https://vistos.mne.gov.pt/',
    lastVerified: '2026-04-27',
  };

  it('accepts the PRD-level visa pathway contract', () => {
    expect(VisaSchema.safeParse(validVisa).success).toBe(true);
  });

  it('requires source attribution and verification date', () => {
    const result = VisaSchema.safeParse({
      ...validVisa,
      sourceUrl: undefined,
      lastVerified: undefined,
    });

    expect(result.success).toBe(false);
  });

  it('requires income details when a pathway requires minimum income', () => {
    const result = VisaSchema.safeParse({
      ...validVisa,
      incomeRequirement: undefined,
      requiresMinIncome: true,
    });

    expect(result.success).toBe(false);
  });
});
