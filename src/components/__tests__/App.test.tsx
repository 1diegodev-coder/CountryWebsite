import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import ResultsView from '../ResultsView';

// Mock GlobeViewer
vi.mock('../GlobeViewer', () => ({
  default: () => <div data-testid="globe-viewer" />
}));

// Mock navigator
Object.defineProperty(window, 'navigator', {
  value: {
    language: 'en-GB',
    languages: ['en-GB', 'en'],
  },
  configurable: true,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage
const localStorageMock = (function() {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
    removeItem: (key: string) => { delete store[key]; }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('App Client Logic', () => {
  it('renders landing page initially', () => {
    render(<App />);
    expect(screen.getByText(/CountryDNA/i)).toBeDefined();
    expect(screen.getByText(/Find the country/i)).toBeDefined();
  });

  it('navigates to quiz on start', async () => {
    render(<App />);
    const startButton = screen.getByText(/Begin your match/i);
    fireEvent.click(startButton);
    const question = await screen.findByText(/What best describes where you are right now/i);
    expect(question).toBeDefined();
  });
});

describe('ResultsView', () => {
  const profile = {
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
    locale: 'en-US',
  } as const;

  it('surfaces low data confidence on result cards', () => {
    render(
      <ResultsView
        result={{
          sessionToken: 'test-token',
          shareReady: false,
          candidateCount: 1,
          eliminatedCount: 0,
          matches: [{
            countryCode: 'AF',
            countryName: 'Afghanistan',
            countryDescriptor: 'A landlocked country in Central Asia.',
            dataConfidence: 'low',
            score: 72,
            rank: 1,
            whyFit: ['Low nominal cost.'],
            watchOut: ['Severe relocation constraints.'],
            costRealityText: 'Highly affordable.',
            dimensionScores: {
              cost: 9.9,
              safety: 1,
              healthcare: 2.1,
              visaEase: 1.5,
              digitalInfra: 1.5,
              climate: 2.8,
              english: 1.7,
              lgbtqSafety: 0.2,
              techEcosystem: 1.1,
              naturalEnvironment: 2.7,
            },
          }],
          eliminated: [],
          profileSummary: 'Test profile',
          computedWeights: {
            cost: 0.15,
            safety: 0.10,
            healthcare: 0.08,
            visaEase: 0.15,
            digitalInfra: 0.18,
            climate: 0.08,
            english: 0.08,
            lgbtqSafety: 0.08,
            techEcosystem: 0.08,
            naturalEnvironment: 0.02,
          },
          generatedAt: new Date().toISOString(),
        }}
        onRetake={vi.fn()}
        tweaks={{}}
        profile={profile as any}
        onUpdateResult={vi.fn()}
        isReadOnly
      />,
    );

    expect(screen.getByText(/Low confidence/i)).toBeDefined();
  });
});
