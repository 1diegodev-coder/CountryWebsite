import { describe, it, expect } from 'vitest';
import { COUNTRIES } from '../data/countries';
import { CountrySchema } from '../schema/country';

describe('Country Data Validation', () => {
  it('all 195 countries satisfy the expanded schema', () => {
    expect(COUNTRIES.length).toBe(195);
    COUNTRIES.forEach(country => {
      const result = CountrySchema.safeParse(country);
      if (!result.success) {
        console.error(`Validation failed for ${country.name}:`, result.error.format());
      }
      expect(result.success).toBe(true);
    });
  });

  it('every country has all 10 required dimensions', () => {
    COUNTRIES.forEach(country => {
      const dims = Object.keys(country.dimensions);
      expect(dims.length).toBe(10);
    });
  });

  it('every country has cities array with at least 2 entries', () => {
    COUNTRIES.forEach(country => {
      expect(Array.isArray(country.cities)).toBe(true);
      expect(country.cities.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('every country has rawIndicators with realistic values', () => {
    COUNTRIES.forEach(country => {
      const ri = country.rawIndicators;
      expect(ri).toBeDefined();
      expect(ri.summerHighC).toBeGreaterThan(-50);
      expect(ri.winterLowC).toBeLessThan(50);
      expect(ri.stability).toBeGreaterThanOrEqual(0);
      expect(ri.stability).toBeLessThanOrEqual(10);
    });
  });

  it('does not award high safety to highly authoritarian countries', () => {
    COUNTRIES
      .filter(country => country.rawIndicators.authoritarianRisk > 9)
      .forEach(country => {
        expect(country.dimensions.safety, country.name).toBeLessThanOrEqual(5);
      });
  });

  it('keeps legal-but-underprotected LGBTQ+ contexts above criminalization-band scores', () => {
    const legalButUnderprotected = ['South Korea', 'Armenia', 'Lesotho'];

    legalButUnderprotected.forEach(name => {
      const country = COUNTRIES.find(country => country.name === name);

      expect(country?.dimensions.lgbtqSafety, name).toBeGreaterThanOrEqual(4);
      expect(country?.dimensions.lgbtqSafety, name).toBeLessThan(5);
    });
  });

  it('keeps weak or worsening legal LGBTQ+ contexts below the non-negotiable threshold', () => {
    // These countries have legal but hostile or worsening LGBTQ+ environments.
    // The engine hard-filters at lgbtqSafety < 5, so all must stay below that threshold.
    // Kazakhstan sits higher (~4.5) than the others due to decriminalisation, but is still
    // below the filter line and would be eliminated when lgbtq is a non-negotiable.
    // Guyana decriminalised in Sep 2023 but remains socially hostile with no legal protections.
    const weakOrWorseningLegalContexts = ['Türkiye', 'Kazakhstan', 'China', 'Georgia', 'Guyana'];

    weakOrWorseningLegalContexts.forEach(name => {
      const country = COUNTRIES.find(country => country.name === name);

      expect(country?.dimensions.lgbtqSafety, name).toBeGreaterThanOrEqual(3);
      expect(country?.dimensions.lgbtqSafety, name).toBeLessThan(5);
    });
  });

  it('keeps currently criminalized LGBTQ+ contexts out of the legal protection band', () => {
    const criminalizedContexts = ['Bahrain'];

    criminalizedContexts.forEach(name => {
      const country = COUNTRIES.find(country => country.name === name);

      expect(country?.dimensions.lgbtqSafety, name).toBeLessThan(3);
    });
  });

  it('keeps credible chronic-care borderline systems above the healthcare hard filter', () => {
    const credibleChronicCare = ['Greece', 'Romania', 'Serbia', 'Hungary', 'United States', 'Jordan'];

    credibleChronicCare.forEach(name => {
      const country = COUNTRIES.find(country => country.name === name);

      expect(country?.dimensions.healthcare, name).toBeGreaterThanOrEqual(7);
    });
  });

  it('keeps fragile chronic-care contexts below the healthcare hard filter', () => {
    const fragileChronicCare = ['Cuba'];

    fragileChronicCare.forEach(name => {
      const country = COUNTRIES.find(country => country.name === name);

      expect(country?.dimensions.healthcare, name).toBeLessThan(7);
    });
  });

  it('keeps legal-but-hostile LGBTQ+ contexts below the non-negotiable threshold', () => {
    const legalButHostile = ['Djibouti', 'El Salvador', 'Guatemala', 'Saint Kitts and Nevis'];

    legalButHostile.forEach(name => {
      const country = COUNTRIES.find(country => country.name === name);

      expect(country?.dimensions.lgbtqSafety, name).toBeLessThan(5);
    });
  });

  it('does not let high-authoritarian contexts present as high-safety matches', () => {
    COUNTRIES
      .filter(country => country.rawIndicators.authoritarianRisk > 7)
      .forEach(country => {
        expect(country.dimensions.safety, country.name).toBeLessThanOrEqual(5.5);
      });
  });

  it('does not give high LGBTQ+ safety scores to authoritarian contexts', () => {
    COUNTRIES
      .filter(country => country.rawIndicators.authoritarianRisk > 6)
      .forEach(country => {
        expect(country.dimensions.lgbtqSafety, country.name).toBeLessThanOrEqual(7);
      });
  });

  it('keeps complex but reachable visa contexts above the relocation viability cutoff', () => {
    const reachableComplexVisaContexts = ['Algeria'];

    reachableComplexVisaContexts.forEach(name => {
      const country = COUNTRIES.find(country => country.name === name);

      expect(country?.dimensions.visaEase, name).toBeGreaterThanOrEqual(2);
    });
  });
});
