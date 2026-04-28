import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import ResultsView from "../ResultsView";

// Mock GlobeViewer
vi.mock("../GlobeViewer", () => ({
  default: () => <div data-testid="globe-viewer" />
}));

const mockMatches = Array.from({ length: 25 }, (_, i) => ({
  countryCode: `C${i}`,
  countryName: `Country ${i}`,
  countryDescriptor: `Description ${i}`,
  score: 90 - i,
  rank: i + 1,
  whyFit: ["Fit"],
  watchOut: ["Watch"],
  costRealityText: "Cost",
  dimensionScores: {} as any,
}));

const mockResult = {
  sessionToken: "test-token",
  shareReady: true,
  candidateCount: 25,
  eliminatedCount: 0,
  matches: mockMatches,
  eliminated: [],
  profileSummary: "Profile",
  computedWeights: {} as any,
  generatedAt: new Date().toISOString(),
};

const mockProfile = {
  budgetUsdMonthly: 5000,
} as any;

describe("ResultsView Performance and Debounce", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initially renders only the first batch of match cards", () => {
    render(
      <ResultsView
        result={mockResult}
        onRetake={vi.fn()}
        tweaks={{}}
        profile={mockProfile}
        onUpdateResult={vi.fn()}
      />
    );

    // Should find 10 matches initially
    const cards = screen.getAllByRole("heading", { level: 3 });
    expect(cards.length).toBe(10);
    expect(screen.getByText(/Show more matches/i)).toBeDefined();
  });

  it("Show more reveals the next batch without changing ordering", () => {
    render(
      <ResultsView
        result={mockResult}
        onRetake={vi.fn()}
        tweaks={{}}
        profile={mockProfile}
        onUpdateResult={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText(/Show more matches/i));

    const cards = screen.getAllByRole("heading", { level: 3 });
    expect(cards.length).toBe(20);
    expect(cards[0].textContent).toBe("Country 0");
    expect(cards[19].textContent).toBe("Country 19");
  });

  it("What-If slider changes are debounced", async () => {
    const fetchSpy = vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ...mockResult, matches: mockMatches.slice(0, 5) }),
    }));

    render(
      <ResultsView
        result={mockResult}
        onRetake={vi.fn()}
        tweaks={{}}
        profile={mockProfile}
        onUpdateResult={vi.fn()}
      />
    );

    // Switch to What-If tab
    fireEvent.click(screen.getByText(/WHAT-IF/i));

    const slider = screen.getByRole("slider");

    // Simulate rapid changes
    fireEvent.change(slider, { target: { value: "6000" } });
    fireEvent.change(slider, { target: { value: "7000" } });
    fireEvent.change(slider, { target: { value: "8000" } });

    // Wait for debounce (suggested 250-400ms)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Should only have been called once with the final value
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const lastCallBody = JSON.parse((global.fetch as any).mock.calls[0][1].body);
    expect(lastCallBody.profile.budgetUsdMonthly).toBe(8000);

    vi.unstubAllGlobals();
  });

  it("older What-If responses cannot overwrite newer results", async () => {
    let callCount = 0;
    vi.stubGlobal("fetch", vi.fn().mockImplementation(() => {
      callCount++;
      const currentCall = callCount;
      return new Promise(resolve => {
        // First call is slow, second call is fast
        const timeout = currentCall === 1 ? 500 : 50;
        setTimeout(() => {
          resolve({
            ok: true,
            json: async () => ({
              ...mockResult,
              sessionToken: `token-${currentCall}`,
              matches: mockMatches.slice(0, currentCall)
            }),
          });
        }, timeout);
      });
    }));

    const onUpdateResult = vi.fn();

    render(
      <ResultsView
        result={mockResult}
        onRetake={vi.fn()}
        tweaks={{}}
        profile={mockProfile}
        onUpdateResult={onUpdateResult}
      />
    );

    fireEvent.click(screen.getByText(/WHAT-IF/i));
    const slider = screen.getByRole("slider");

    // First change
    fireEvent.change(slider, { target: { value: "6000" } });
    // Second change (after a bit but before first one finishes)
    await new Promise(resolve => setTimeout(resolve, 400));
    fireEvent.change(slider, { target: { value: "7000" } });

    // Wait for everything to finish
    await new Promise(resolve => setTimeout(resolve, 1000));

    // onUpdateResult should have been called, but the final state should be from call 2
    expect(onUpdateResult).toHaveBeenCalledTimes(1);
    expect(onUpdateResult).toHaveBeenLastCalledWith(expect.objectContaining({
      matches: expect.arrayContaining([
        expect.objectContaining({ countryCode: "C0" }),
        expect.objectContaining({ countryCode: "C1" }),
      ])
    }));
    const lastCall = onUpdateResult.mock.calls[0][0];
    expect(lastCall.matches.length).toBe(2);

    vi.unstubAllGlobals();
  });
});
