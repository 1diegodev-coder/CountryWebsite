import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';

// Mock GlobeViewer
vi.mock('../GlobeViewer', () => ({
  default: () => <div data-testid="globe-viewer" />
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
    removeItem: (key: string) => { delete store[key]; }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Integration: App -> ResultsView -> WhatIf', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();

    // Mock navigator
    Object.defineProperty(window, 'navigator', {
      value: {
        language: 'en-US',
        languages: ['en-US', 'en'],
      },
      configurable: true,
    });
  });

  it('completes the quiz and triggers a What-If request with a complete profile', async () => {
    // 1. Mock /api/match response
    const mockMatchResult = {
      sessionToken: 'test-token',
      shareReady: false,
      candidateCount: 1,
      eliminatedCount: 0,
      matches: [{
        countryCode: 'PT',
        countryName: 'Portugal',
        countryDescriptor: 'A test country.',
        dataConfidence: 'high',
        score: 95,
        rank: 1,
        whyFit: ['Test fit'],
        watchOut: ['Test watch out'],
        costRealityText: 'Fits budget',
        dimensionScores: {
          cost: 8, safety: 8, healthcare: 8, visaEase: 8,
          digitalInfra: 8, climate: 8, techEcosystem: 8, lgbtqSafety: 8,
          naturalEnvironment: 8, english: 8
        },
      }],
      eliminated: [],
      profileSummary: 'Test summary',
      computedWeights: { cost: 0.1, safety: 0.1, healthcare: 0.1, visaEase: 0.1, digitalInfra: 0.1, climate: 0.1, techEcosystem: 0.1, lgbtqSafety: 0.1, naturalEnvironment: 0.1, english: 0.1 },
      generatedAt: new Date().toISOString(),
    };

    // 2. Mock /api/whatif response
    const mockWhatIfResult = {
      ...mockMatchResult,
      matches: [{ ...mockMatchResult.matches[0], score: 96 }]
    };

    const fetchMock = vi.fn((url, options) => {
      if (url === '/api/match') {
        return Promise.resolve({
          ok: true,
          json: async () => mockMatchResult,
        });
      }
      if (url === '/api/whatif') {
        // Verify that the profile sent to /api/whatif contains languages and locale
        const body = JSON.parse(options.body);
        if (body.profile.languages && body.profile.locale) {
          return Promise.resolve({
            ok: true,
            json: async () => mockWhatIfResult,
          });
        } else {
          return Promise.resolve({
            status: 400,
            ok: false,
            json: async () => ({ error: 'Missing fields', details: body.profile }),
          });
        }
      }
      return Promise.reject(new Error('Unknown URL'));
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<App />);

    // Start Quiz
    fireEvent.click(screen.getByText(/Begin your match/i));

    // Wait for QuizView to render
    await waitFor(() => expect(screen.getByText(/What best describes where you are right now/i)).toBeDefined());

    // Question 1: Life Stage (Single)
    fireEvent.click(screen.getByText(/Remote Worker/i));

    // Question 2: Household (Single)
    fireEvent.click(await screen.findByText(/Just me/i, {}, { timeout: 3000 }));

    // Question 3: Push Factors (Multi)
    fireEvent.click(await screen.findByText(/Lower cost of living/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Continue|Next/i, {}, { timeout: 3000 }));

    // Question 4: Passports (Multi)
    fireEvent.click(await screen.findByText(/United States/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Continue|Next/i, {}, { timeout: 3000 }));

    // Question 5: Budget (Single)
    fireEvent.click(await screen.findByText(/\$2,500 – \$3,500 \/ month/i, {}, { timeout: 3000 }));

    // Question 6: Flexibility (Single)
    fireEvent.click(await screen.findByText(/English only/i, {}, { timeout: 3000 }));

    // Handle Interim Screen
    const refineButton = await screen.findByText(/Answer 7 more to refine/i, {}, { timeout: 3000 });
    fireEvent.click(refineButton);

    // Question 7: Healthcare (Single)
    fireEvent.click(await screen.findByText(/Basic access is fine/i, {}, { timeout: 3000 }));

    // Question 8: Non-negotiables (Multi)
    fireEvent.click(await screen.findByText(/LGBTQ\+ safety and rights/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Continue|Next/i, {}, { timeout: 3000 }));

    // Question 9: Social (Single)
    fireEvent.click(await screen.findByText(/Expat community/i, {}, { timeout: 3000 }));

    // Question 10: Environment (Single)
    fireEvent.click(await screen.findByText(/Big City/i, {}, { timeout: 3000 }));

    // Question 11: Culture (Single)
    fireEvent.click(await screen.findByText(/Broadly familiar/i, {}, { timeout: 3000 }));

    // Question 12: Priorities (Multi)
    fireEvent.click(await screen.findByText(/Safety first/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Continue|Next/i, {}, { timeout: 3000 }));

    // Question 13: Dealbreakers (Multi)
    fireEvent.click(await screen.findByText(/Extreme cold/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/See My Results/i, {}, { timeout: 3000 }));

    // Wait for ResultsView
    await waitFor(() => expect(screen.getByText('Portugal')).toBeDefined(), { timeout: 5000 });

    // Switch to What-If tab
    fireEvent.click(screen.getByText('WHAT-IF'));

    // Trigger What-If change (Budget)
    const whatIfBudgetInput = screen.getByDisplayValue('3500');
    fireEvent.change(whatIfBudgetInput, { target: { value: '4500' } });

    // Wait for What-If request (including debounce)
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('/api/whatif', expect.any(Object));
    }, { timeout: 5000 });

    // Verify last What-If call payload
    const whatIfCall = fetchMock.mock.calls.find(call => call[0] === '/api/whatif');
    const body = JSON.parse(whatIfCall[1].body);
    expect(body.profile).toHaveProperty('languages');
    expect(body.profile).toHaveProperty('locale');
    expect(body.profile.languages).toEqual(['en-US', 'en']);
    expect(body.profile.locale).toBe('en-US');
    expect(body.profile.budgetUsdMonthly).toBe(4500);
  }, 20000);

  it('correctly passes non-negotiables like lowTax to the What-If API', async () => {
    // 1. Mock /api/match response
    const mockMatchResult = {
      sessionToken: 'test-token',
      matches: [{ countryCode: 'PT', countryName: 'Portugal', score: 95, whyFit: [], watchOut: [], dimensionScores: { cost: 8, safety: 8, healthcare: 8, visaEase: 8, digitalInfra: 8, climate: 8, techEcosystem: 8, lgbtqSafety: 8, naturalEnvironment: 8, english: 8 } }],
      eliminated: [],
      computedWeights: {},
      generatedAt: new Date().toISOString(),
    };

    const fetchMock = vi.fn((url, options) => {
      if (url === '/api/match') return Promise.resolve({ ok: true, json: async () => mockMatchResult });
      if (url === '/api/whatif') {
        const body = JSON.parse(options.body);
        return Promise.resolve({ ok: true, json: async () => ({ ...mockMatchResult, profileSummary: `Updated with ${body.profile.nonNegotiables.join(', ')}` }) });
      }
      return Promise.reject(new Error('Unknown URL'));
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<App />);

    // Fast track to ResultsView by mocking engineResult
    // Since we can't easily set state from outside, we'll just go through the quiz one more time but faster if possible
    // Actually, I'll just use the first test's logic but focus on the What-If click

    // Start Quiz
    fireEvent.click(screen.getByText(/Begin your match/i));

    // We'll just reuse the same flow
    fireEvent.click(await screen.findByText(/Remote Worker/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Just me/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Lower cost of living/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Continue|Next/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/United States/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Continue|Next/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/\$2,500 – \$3,500 \/ month/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/English only/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Answer 7 more to refine/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Basic access is fine/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/LGBTQ\+ safety and rights/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Continue|Next/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Expat community/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Big City/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Broadly familiar/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Safety first/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Continue|Next/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Extreme cold/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/See My Results/i, {}, { timeout: 3000 }));

    await waitFor(() => expect(screen.getByText('Portugal')).toBeDefined(), { timeout: 5000 });

    // Switch to What-If tab
    fireEvent.click(screen.getByText('WHAT-IF'));

    // Toggle lowTax non-negotiable
    const lowTaxButton = await screen.findByText('lowTax');
    fireEvent.click(lowTaxButton);

    // Wait for What-If request
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('/api/whatif', expect.any(Object));
    }, { timeout: 5000 });

    // Verify payload contains lowTax
    const whatIfCall = fetchMock.mock.calls.find(call => call[0] === '/api/whatif');
    const body = JSON.parse(whatIfCall[1].body);
    expect(body.profile.nonNegotiables).toContain('lowTax');
  }, 20000);

  it('displays error state when What-If API fails', async () => {
    // 1. Mock /api/match response
    const mockMatchResult = {
      sessionToken: 'test-token',
      matches: [{ countryCode: 'PT', countryName: 'Portugal', score: 95, whyFit: [], watchOut: [], dimensionScores: { cost: 8, safety: 8, healthcare: 8, visaEase: 8, digitalInfra: 8, climate: 8, techEcosystem: 8, lgbtqSafety: 8, naturalEnvironment: 8, english: 8 } }],
      eliminated: [],
      computedWeights: {},
      generatedAt: new Date().toISOString(),
    };

    const fetchMock = vi.fn((url) => {
      if (url === '/api/match') {
        return Promise.resolve({
          ok: true,
          json: async () => mockMatchResult,
        });
      }
      if (url === '/api/whatif') {
        return Promise.resolve({
          status: 500,
          ok: false,
          json: async () => ({ error: 'Server error' }),
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<App />);

    // Start Quiz
    fireEvent.click(screen.getByText(/Begin your match/i));

    // Full Quiz Flow (resilient navigation)
    fireEvent.click(await screen.findByText(/Remote Worker/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Just me/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Lower cost of living/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Continue|Next/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/United States/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Continue|Next/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/\$2,500 – \$3,500 \/ month/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/English only/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Answer 7 more to refine/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Basic access is fine/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/LGBTQ\+ safety and rights/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Continue|Next/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Expat community/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Big City/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Broadly familiar/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Safety first/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Continue|Next/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/Extreme cold/i, {}, { timeout: 3000 }));
    fireEvent.click(await screen.findByText(/See My Results/i, {}, { timeout: 3000 }));

    // Wait for ResultsView
    await waitFor(() => expect(screen.getByText('Portugal')).toBeDefined(), { timeout: 5000 });

    // Switch to What-If tab
    fireEvent.click(screen.getByText('WHAT-IF'));

    // Trigger What-If change (Budget)
    const whatIfBudgetInput = screen.getByDisplayValue('3500');
    fireEvent.change(whatIfBudgetInput, { target: { value: '4500' } });

    // Verify error message appearance
    await waitFor(() => {
      expect(screen.getByText(/Server error/i)).toBeDefined();
    }, { timeout: 5000 });
  }, 20000);
});
