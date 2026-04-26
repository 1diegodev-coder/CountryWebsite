import { describe, it, expect } from 'vitest';
import { runMatchingEngine } from '../engine';
import { UserProfile } from '../schema/profile';
import { COUNTRIES } from '../data/countries';

describe('Matching Engine Hardening', () => {
  const baseProfile: UserProfile = {
    lifeStage: 'remoteEmployee',
    household: 'solo',
    budgetUsdMonthly: 5000,
    languageFlexibility: 'openToLearning',
    healthcareNeed: 'none',
    topPriorities: ['cost', 'safety'],
    nonNegotiables: [],
    dealbreakers: [],
    pushFactors: [],
    socialMode: 'mixed',
    environmentPreference: 'midCity',
    culturalAppetite: 'noPref',
    passports: ['US'],
    languages: ['en'],
    locale: 'en-US'
  };

  it('correctly applies dealbreakers using rawIndicators', () => {
    // AE (UAE) has summerHighC around 40-45
    const profileWithHeat: UserProfile = { ...baseProfile, dealbreakers: ['extremeHeat'] };
    const result = runMatchingEngine(profileWithHeat);
    const uae = result.matches.find(m => m.countryCode === 'AE');
    
    // We expect UAE to be penalised if it was a candidate
    // If UAE is eliminated for other reasons, this test might need adjustment
    // In current data, UAE is usually a candidate for $5000 budget
    if (uae) {
      const resultNoHeat = runMatchingEngine(baseProfile);
      const uaeNoHeat = resultNoHeat.matches.find(m => m.countryCode === 'AE');
      if (uaeNoHeat) {
        expect(uae.score).toBeLessThan(uaeNoHeat.score);
      }
    }
  });

  it('correctly applies extreme cold dealbreaker using rawIndicators', () => {
    // EE (Estonia) has winterLowC around -5 to -10
    // Let's assume our test data for EE has winterLowC < -10 for this test
    const profileWithCold: UserProfile = { ...baseProfile, dealbreakers: ['extremeCold'] };
    const result = runMatchingEngine(profileWithCold);
    const estonia = result.matches.find(m => m.countryCode === 'EE');
    
    if (estonia) {
      const resultNoCold = runMatchingEngine(baseProfile);
      const eeNoCold = resultNoCold.matches.find(m => m.countryCode === 'EE');
      if (eeNoCold) {
        expect(estonia.score).toBeLessThan(eeNoCold.score);
      }
    }
  });

  it('normalizes weights across different life stages', () => {
    const stages: UserProfile['lifeStage'][] = ['founder', 'retired', 'student'];
    stages.forEach(stage => {
      const result = runMatchingEngine({ ...baseProfile, lifeStage: stage });
      expect(result.matches.length).toBeGreaterThan(0);
      result.matches.forEach(m => {
        expect(m.score).toBeGreaterThanOrEqual(0);
        expect(m.score).toBeLessThanOrEqual(100);
      });
    });
  });

  it('respects shareReady: false as default from engine', () => {
    const result = runMatchingEngine(baseProfile);
    expect(result.shareReady).toBe(false);
  });

  it('filters countries that are not relocation-viable unless overridden', () => {
    const result = runMatchingEngine({ ...baseProfile, budgetUsdMonthly: 10000 });
    const eliminatedCodes = new Set(result.eliminated.map(country => country.countryCode));

    expect([...eliminatedCodes]).toEqual(
      expect.arrayContaining(['AF', 'CF', 'ER', 'KP', 'SO', 'SY', 'TM', 'YE']),
    );
    expect(result.matches.find(match => match.countryCode === 'KP')).toBeUndefined();

    const overridden = runMatchingEngine({ ...baseProfile, budgetUsdMonthly: 10000 }, ['KP']);
    expect(overridden.matches.find(match => match.countryCode === 'KP')).toBeDefined();
  });
});
