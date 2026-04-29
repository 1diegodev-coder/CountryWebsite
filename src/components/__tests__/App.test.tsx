import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';
import ResultsView from '../ResultsView';
import { mockCountryPT } from '../../lib/__tests__/fixtures/country.fixture';

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
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

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

    expect(screen.getByText(/low confidence/i)).toBeDefined();
  });

  it('opens Deep Dive directly to visa pathway content', async () => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockCountryPT,
      }),
    );

    render(
      <ResultsView
        result={{
          sessionToken: 'test-token',
          shareReady: false,
          candidateCount: 1,
          eliminatedCount: 0,
          matches: [{
            countryCode: 'PT',
            countryName: 'Portugal',
            countryDescriptor: 'A sun-drenched Atlantic nation where old-world charm meets modern digital infrastructure.',
            dataConfidence: 'medium',
            score: 88,
            rank: 1,
            whyFit: ['Strong visa access.'],
            watchOut: ['Housing costs can be high.'],
            costRealityText: 'Fits the stated budget.',
            dimensionScores: {
              cost: 5.7,
              safety: 8.6,
              healthcare: 7.2,
              visaEase: 8,
              digitalInfra: 5.7,
              climate: 6.7,
              english: 4.8,
              lgbtqSafety: 8.3,
              techEcosystem: 7.1,
              naturalEnvironment: 5.2,
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

    fireEvent.click(screen.getByText('Visa Guide'));

    expect(await screen.findByText('D8 Digital Nomad Visa')).toBeDefined();
    expect(screen.getByText(/Visa information is for general guidance only/i)).toBeDefined();
    expect(screen.getAllByText(/Medium confidence/i).length).toBeGreaterThanOrEqual(2);

    vi.unstubAllGlobals();
  });

  it('shows appropriate confidence caveats in Deep Dive', async () => {
    const mockCountryData = (confidence: string) => ({
      name: 'Test Country',
      iso2: 'TC',
      descriptor: 'A test country.',
      capitalCity: 'Test City',
      currency: { code: 'TST', name: 'Test' },
      dataConfidence: confidence,
      costBreakdown: { totalEstimateUsd: 2000 },
      dimensions: {},
      visaPathways: [],
    });

    const setupDeepDive = async (confidence: string) => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockCountryData(confidence),
      }));

      render(
        <ResultsView
          result={{
            sessionToken: 'test-token',
            shareReady: false,
            candidateCount: 1,
            eliminatedCount: 0,
            matches: [{
              countryCode: 'TC',
              countryName: 'Test Country',
              countryDescriptor: 'A test country.',
              dataConfidence: confidence as any,
              score: 80,
              rank: 1,
              whyFit: [],
              watchOut: [],
              costRealityText: 'Fits budget',
              dimensionScores: {} as any,
            }],
            eliminated: [],
            profileSummary: 'Test',
            computedWeights: {} as any,
            generatedAt: new Date().toISOString(),
          }}
          onRetake={vi.fn()}
          tweaks={{}}
          profile={profile as any}
          onUpdateResult={vi.fn()}
          isReadOnly
        />
      );

      fireEvent.click(screen.getByText('Deep Dive Details'));
      await screen.findByText('Test Country');
    };

    // Case 1: Medium Confidence
    await setupDeepDive('medium');
    expect(screen.getAllByText(/Medium confidence/i).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/Some country-level data uses blended or estimated sources/i)).toBeDefined();
    vi.unstubAllGlobals();
    cleanup();

    // Case 2: Low Confidence
    await setupDeepDive('low');
    expect(screen.getAllByText(/low confidence/i).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/This country has limited or unstable source data/i)).toBeDefined();
    vi.unstubAllGlobals();
    cleanup();

    // Case 3: High Confidence (should not show caveat)
    await setupDeepDive('high');
    expect(screen.queryByText(/Some country-level data uses blended or estimated sources/i)).toBeNull();
    expect(screen.queryByText(/This country has limited or unstable source data/i)).toBeNull();
    vi.unstubAllGlobals();
    cleanup();
  });
});

describe('Accessibility', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('Tweaks panel handles escape key and focus return', async () => {
    render(<App />);
    const trigger = screen.getByLabelText(/Open UI Tweaks/i);

    // Open
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    // Focus should be in panel (first button is Close Tweaks)
    const closeBtn = screen.getByLabelText(/Close Tweaks/i);
    expect(document.activeElement).toBe(closeBtn);

    // Escape to close
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(trigger);
  });

  it('Quiz options have correct roles and states', async () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Begin your match/i));

    const options = await screen.findAllByRole('radio');
    expect(options.length).toBeGreaterThan(0);

    fireEvent.click(options[0]);
    expect(options[0].getAttribute('aria-checked')).toBe('true');
  });
});

describe('ResultsView Accessibility', () => {
  const mockResult = {
    sessionToken: 'test-token',
    shareReady: true,
    candidateCount: 1,
    eliminatedCount: 0,
    matches: [{
      countryCode: 'PT',
      countryName: 'Portugal',
      countryDescriptor: 'Descriptor',
      dataConfidence: 'high',
      score: 95,
      rank: 1,
      whyFit: [],
      watchOut: [],
      costRealityText: 'Fits',
      dimensionScores: {} as any,
    }],
    eliminated: [],
    profileSummary: 'Test profile',
    computedWeights: {} as any,
    generatedAt: new Date().toISOString(),
  };

  const profile = {
    budgetUsdMonthly: 5000,
    languageFlexibility: 'openToLearning',
    healthcareNeed: 'none',
    nonNegotiables: [],
  };

  it('Share modal handles escape and focus return', async () => {
    render(
      <ResultsView
        result={mockResult as any}
        onRetake={vi.fn()}
        tweaks={{}}
        profile={profile as any}
        onUpdateResult={vi.fn()}
      />
    );

    const shareBtn = screen.getByLabelText(/Share your results/i);
    fireEvent.click(shareBtn);

    expect(screen.getByRole('dialog')).toBeDefined();
    const closeBtn = screen.getByLabelText(/Close share modal/i);
    expect(document.activeElement).toBe(closeBtn);

    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(document.activeElement).toBe(shareBtn);
  });

  it('Deep Dive handles escape and focus return', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ name: 'Portugal', capitalCity: 'Lisbon', currency: { code: 'EUR', name: 'Euro' }, visaPathways: [] }),
    }));

    render(
      <ResultsView
        result={mockResult as any}
        onRetake={vi.fn()}
        tweaks={{}}
        profile={profile as any}
        onUpdateResult={vi.fn()}
      />
    );

    const deepDiveBtn = screen.getByLabelText(/View deep dive details for Portugal/i);
    fireEvent.click(deepDiveBtn);

    await screen.findByRole('dialog');

    // Focus should be in deep dive (close button is first focusable element)
    const closeBtn = screen.getByLabelText(/Close details/i);
    await waitFor(() => expect(document.activeElement).toBe(closeBtn));

    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(document.activeElement).toBe(deepDiveBtn);

    vi.unstubAllGlobals();
  });
});
