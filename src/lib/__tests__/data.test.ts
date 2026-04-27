import { describe, it, expect } from 'vitest';
import { COUNTRIES } from '../data/countries';
import { CountrySchema } from '../schema/country';
import { VisaSchema } from '../schema/visa';

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

  // ... (rest of existing tests)

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

  it('every country has non-empty capitalCity', () => {
    COUNTRIES.forEach(country => {
      expect(country.capitalCity).toBeDefined();
      expect(country.capitalCity.length).toBeGreaterThan(0);
    });
  });

  it('every country has valid currency metadata', () => {
    COUNTRIES.forEach(country => {
      expect(country.currency).toBeDefined();
      expect(country.currency.code).toMatch(/^[A-Z]{3}$/);
      expect(country.currency.name.length).toBeGreaterThan(0);
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

  describe('Visa Pathways Coverage', () => {
    const TOP_40_COUNTRIES = [
      'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
      'Spain', 'Portugal', 'United Arab Emirates', 'Singapore', 'Switzerland',
      'France', 'Netherlands', 'Mexico', 'Thailand', 'Japan', 'Italy',
      'New Zealand', 'Ireland', 'Vietnam', 'Malaysia', 'Costa Rica',
      'Indonesia', 'Philippines', 'Brazil', 'Panama', 'Türkiye',
      'South Africa', 'China', 'India', 'Greece', 'Austria', 'Sweden',
      'Norway', 'Denmark', 'Belgium', 'Poland', 'Czech Republic', 'Israel',
      'Saudi Arabia', 'South Korea'
    ];

    const OFFICIAL_OR_AUTHORIZED_VISA_HOSTS = new Set([
      'digitalnomads.goturkiye.com',
      'enterprise.gov.ie',
      'immi.homeaffairs.gov.au',
      'ind.nl',
      'indianvisaonline.gov.in',
      'lanhsuvietnam.gov.vn',
      'ltr.boi.go.th',
      'mdec.my',
      'molina.imigrasi.go.id',
      'pg.china-embassy.gov.cn',
      'pr.gov.sa',
      'pra.gov.ph',
      'thaievisa.go.th',
      'travel.state.gov',
      'u.ae',
      'vistoperitalia.esteri.it',
      'vistos.mne.gov.pt',
      'www.belgium.be',
      'www.canada.ca',
      'www.dha.gov.za',
      'www.exteriores.gob.es',
      'www.gob.mx',
      'www.gov.br',
      'www.gov.il',
      'www.gov.pl',
      'www.gov.uk',
      'www.hikorea.go.kr',
      'www.immigration.govt.nz',
      'www.isa.go.jp',
      'www.make-it-in-germany.com',
      'www.mfa.gr',
      'www.migracion.go.cr',
      'www.migracion.gob.pa',
      'www.migration.gv.at',
      'www.migrationsverket.se',
      'www.mofa.go.jp',
      'www.mom.gov.sg',
      'www.mvcr.cz',
      'www.nyidanmark.dk',
      'www.sem.admin.ch',
      'www.service-public.fr',
      'www.udi.no',
      'www.uscis.gov',
    ]);

    it('every top 40 country has between 1 and 4 visa pathways', () => {
      TOP_40_COUNTRIES.forEach(name => {
        const country = COUNTRIES.find(c => c.name === name);
        expect(country, `${name} not found in COUNTRIES`).toBeDefined();
        expect(country?.visaPathways, `${name} missing visaPathways`).toBeDefined();
        expect(country?.visaPathways?.length).toBeGreaterThanOrEqual(1);
        expect(country?.visaPathways?.length).toBeLessThanOrEqual(4);
      });
    });

    it('every visa pathway is valid according to VisaSchema', () => {
      COUNTRIES.forEach(country => {
        country.visaPathways?.forEach(pathway => {
          const result = VisaSchema.safeParse(pathway);
          if (!result.success) {
            console.error(`Visa validation failed for ${country.name} / ${pathway.pathwayId}:`, result.error.format());
          }
          expect(result.success).toBe(true);
        });
      });
    });

    it('every visa pathway countryCode matches the containing country iso2', () => {
      COUNTRIES.forEach(country => {
        country.visaPathways?.forEach(pathway => {
          expect(pathway.countryCode).toBe(country.iso2);
        });
      });
    });

    it('every visa pathway has an official HTTPS sourceUrl and recent lastVerified date', () => {
      COUNTRIES.forEach(country => {
        country.visaPathways?.forEach(pathway => {
          const sourceUrl = new URL(pathway.sourceUrl);
          expect(sourceUrl.protocol).toBe('https:');
          expect(OFFICIAL_OR_AUTHORIZED_VISA_HOSTS.has(sourceUrl.hostname), pathway.sourceUrl).toBe(true);
          expect(pathway.sourceUrl).not.toBe('https://www.mps.gov.cn/');
          expect(pathway.sourceUrl).not.toContain('/students-and-employment');
          expect(pathway.lastVerified).toMatch(/^2026-04/);
        });
      });
    });
  });
});
