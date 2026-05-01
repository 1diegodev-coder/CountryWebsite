import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import ResultsView from '../ResultsView';
import React from 'react';

// Mock GlobeViewer to avoid WebGL issues
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

describe('Phase 11: Product Polish', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    // Reset fetch mock
    global.fetch = vi.fn().mockImplementation((url, options) => {
      if (url === '/api/match/count') {
        const body = JSON.parse(options.body);
        let count = 164;
        if (body.budgetUsdMonthly === 1500) count = 80;
        if (body.nonNegotiables?.includes('lgbtq')) count = 60;
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ count })
        });
      }
      if (url === '/api/match') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            matches: [{ 
              countryCode: 'PT', 
              countryName: 'Portugal', 
              score: 95, 
              rank: 1, 
              whyFit: [], 
              watchOut: [], 
              costRealityText: 'Affordable',
              dimensionScores: {}
            }],
            eliminated: [{
              countryCode: 'US',
              countryName: 'United States',
              reason: 'budget',
              detail: 'Too expensive'
            }],
            candidateCount: 1,
            eliminatedCount: 194,
            computedWeights: {},
            generatedAt: new Date().toISOString()
          })
        });
      }
      if (url.startsWith('/api/countries/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            name: 'Portugal',
            iso2: 'PT',
            descriptor: 'A sunny place',
            dimensions: { safety: 8, healthcare: 8 },
            costBreakdown: { totalEstimateUsd: 2500 },
            currency: { code: 'EUR', name: 'Euro' },
            capitalCity: 'Lisbon',
            snapshot: {
              stability: 9,
              englishDailyLife: 7,
              internetReliability: 8,
              airQualityIndex: 45,
              climate: { summerHigh: 28, winterLow: 12 }
            }
          })
        });
      }
      return Promise.reject(new Error('Unknown API'));
    });
  });

  it('quiz counter narrows as user selects options', async () => {
    render(<App />);
    
    // Start quiz
    fireEvent.click(screen.getByText(/Begin your match/i));
    
    // Wait for quiz
    await waitFor(() => expect(screen.getByText(/What best describes/i)).toBeDefined());

    // Initial count
    const initialCounter = screen.getByText(/countries match/i).parentElement;
    const initialCount = parseInt(initialCounter?.textContent || "0");
    expect(initialCount).toBeLessThanOrEqual(195);
    expect(initialCount).toBeGreaterThan(0);
    
    // Step 1: Life Stage
    fireEvent.click(screen.getByText(/Founder/i));
    
    // Step 2: Household
    expect(await screen.findByText(/Who's coming with you/i, {}, { timeout: 2000 })).toBeDefined();
    fireEvent.click(await screen.findByText(/Just me/i, {}, { timeout: 2000 }));
    
    // Step 3: Push factors
    expect(await screen.findByText(/What's driving the idea/i, {}, { timeout: 2000 })).toBeDefined();
    fireEvent.click(await screen.findByText(/Tax optimisation/i, {}, { timeout: 2000 }));
    fireEvent.click(screen.getByText(/Continue/i));

    // Step 4: Passports
    expect(await screen.findByText(/Which passports do you hold/i, {}, { timeout: 2000 })).toBeDefined();
    fireEvent.click(await screen.findByText(/United States/i, {}, { timeout: 2000 }));
    fireEvent.click(screen.getByText(/Continue/i));

    // Step 5: Budget
    expect(await screen.findByText(/monthly budget/i, {}, { timeout: 2000 })).toBeDefined();
    // Wait for the actual options to appear (Framer Motion mode="wait" delay)
    expect(await screen.findByText(/Under \$1,500/i, {}, { timeout: 2000 })).toBeDefined();

    const counter = screen.getByText(/countries match/i).parentElement;
    const countBeforeBudget = parseInt(counter?.textContent || "0");
    
    fireEvent.click(screen.getByText(/Under \$1,500/i));
    
    await waitFor(() => {
      const countAfterBudget = parseInt(screen.getByText(/countries match/i).parentElement?.textContent || "0");
      expect(countAfterBudget).toBeLessThan(countBeforeBudget);
    }, { timeout: 2000 });
  });

  it('ResultsView renders snapshot and elimination details', async () => {
    const mockResult = {
      matches: [{ 
        countryCode: 'PT', 
        countryName: 'Portugal', 
        score: 95, 
        rank: 1, 
        whyFit: ['Great sun'], 
        watchOut: ['Bureaucracy'], 
        costRealityText: 'Affordable',
        dimensionScores: { safety: 8, healthcare: 8 }
      }],
      eliminated: [{
        countryCode: 'US',
        countryName: 'United States',
        reason: 'budget',
        detail: 'Est. monthly cost $5,500 exceeds your $2,500 budget'
      }],
      candidateCount: 1,
      eliminatedCount: 194,
      computedWeights: { safety: 0.2, healthcare: 0.2 },
      generatedAt: new Date().toISOString(),
      shareReady: true,
      sessionToken: 'test-token'
    };

    const mockProfile = {
      budgetUsdMonthly: 2500,
      lifeStage: 'founder',
      nonNegotiables: []
    } as any;

    render(
      <ResultsView 
        result={mockResult as any} 
        onRetake={vi.fn()} 
        tweaks={{}} 
        profile={mockProfile} 
        onUpdateResult={vi.fn()} 
      />
    );

    // Check Elimination Tab
    fireEvent.click(screen.getByText(/ELIM \(1\)/i));
    expect(screen.getByText(/United States/i)).toBeDefined();
    // Use a regex or specific element to avoid ambiguity
    expect(screen.getAllByText(/budget/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/exceeds your \$2,500 budget/i)).toBeDefined();

    // Open Deep Dive
    fireEvent.click(screen.getByText(/Deep Dive Details/i));
    
    // Wait for API mock
    await waitFor(() => expect(screen.getByText(/Data Snapshot/i)).toBeDefined());
    expect(screen.getByText(/Stability/i)).toBeDefined();
    expect(screen.getByText(/Climate Range/i)).toBeDefined();
    expect(screen.getByText(/12°C to 28°C/i)).toBeDefined();
  });
});
