import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
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
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
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
    // Count-aware label: Show 10 more of 25
    expect(screen.getByText(/Show 10 more of 25/i)).toBeDefined();
    expect(screen.getByLabelText(/Show 10 more of 25 matches/i)).toBeDefined();
  });

  it("Show more reveals the next batch and updates the count-aware label", async () => {
    render(
      <ResultsView
        result={mockResult}
        onRetake={vi.fn()}
        tweaks={{}}
        profile={mockProfile}
        onUpdateResult={vi.fn()}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByText(/Show 10 more of 25/i));
    });

    const cards = screen.getAllByRole("heading", { level: 3 });
    expect(cards.length).toBe(20);
    expect(cards[0].textContent).toBe("Country 0");
    expect(cards[19].textContent).toBe("Country 19");

    // Next batch is partial: Show 5 more of 25
    expect(screen.getByText(/Show 5 more of 25/i)).toBeDefined();
    expect(screen.getByLabelText(/Show 5 more of 25 matches/i)).toBeDefined();
  });

  it("What-If slider changes are debounced", async () => {
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ ...mockResult, matches: mockMatches.slice(0, 5) }),
    } as Response);

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
    await act(async () => {
      fireEvent.change(slider, { target: { value: "6000" } });
      fireEvent.change(slider, { target: { value: "7000" } });
      fireEvent.change(slider, { target: { value: "8000" } });
    });

    // Advance through debounce (350ms)
    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    // Should only have been called once with the final value
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const lastCallBody = JSON.parse((fetchSpy as any).mock.calls[0][1].body);
    expect(lastCallBody.profile.budgetUsdMonthly).toBe(8000);

    vi.unstubAllGlobals();
  });

  it("older What-If responses cannot overwrite newer results", async () => {
    let callCount = 0;
    const fetchSpy = vi.stubGlobal("fetch", vi.fn().mockImplementation(() => {
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

    // First change (T=0)
    await act(async () => {
      fireEvent.change(slider, { target: { value: "6000" } });
    });

    // Wait T=400 (starts first fetch at T=350, then user changes again at T=400)
    await act(async () => {
      vi.advanceTimersByTime(400);
      fireEvent.change(slider, { target: { value: "7000" } });
    });

    // Advance T=750 (starts second fetch at T=350+400=750)
    await act(async () => {
      vi.advanceTimersByTime(350);
    });

    // Now advance for first fetch to "finish" and second to "finish"
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    // onUpdateResult should have been called only for the latest valid request
    expect(onUpdateResult).toHaveBeenCalledTimes(1);
    const lastCall = onUpdateResult.mock.calls[0][0];
    expect(lastCall.matches.length).toBe(2); // From call 2

    vi.unstubAllGlobals();
  });
});
