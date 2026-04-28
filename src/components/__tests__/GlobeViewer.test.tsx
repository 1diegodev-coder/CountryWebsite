import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import GlobeViewer from "../GlobeViewer";

// Mock react-globe.gl to avoid WebGL issues in tests
vi.mock("react-globe.gl", () => ({
  default: vi.fn(() => <div data-testid="mock-globe" />),
}));

// Mock next/dynamic
vi.mock("next/dynamic", () => ({
  default: vi.fn((loader) => {
    const Component = (props: any) => {
      // In tests, we can simulate different states
      return <div data-testid="dynamic-globe" {...props} />;
    };
    return Component;
  }),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe("GlobeViewer Progressive Enhancement", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default to no reduced motion
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("renders a fallback immediately before WebGL data is available", () => {
    render(<GlobeViewer isResults={false} />);
    expect(screen.getByTestId("globe-fallback")).toBeDefined();
  });

  it("includes candidate/eliminated counts in fallback when isResults is true", () => {
    render(
      <GlobeViewer
        isResults={true}
        matchResults={[{ countryCode: "US", rank: 1, score: 95 }]}
        eliminatedCodes={["CA", "MX"]}
      />
    );
    expect(screen.getByText(/Candidates/)).toBeDefined();
    expect(screen.getByText(/Eliminated/)).toBeDefined();
  });

  it("does not attempt heavy GeoJSON fetch when WebGL is unavailable", async () => {
    // Simulate no WebGL support
    const originalWebGL = window.WebGLRenderingContext;
    // @ts-expect-error: Mocking WebGL unavailability by deleting the global
    delete window.WebGLRenderingContext;

    const fetchSpy = vi.spyOn(global, "fetch");

    render(<GlobeViewer isResults={false} />);

    // We need to wait a bit for the idle callback/timeout
    await new Promise(resolve => setTimeout(resolve, 1100));

    expect(fetchSpy).not.toHaveBeenCalledWith("/data/countries.geojson");

    // Restore
    window.WebGLRenderingContext = originalWebGL;
    fetchSpy.mockRestore();
  });

  it("keeps fallback content visible when the GeoJSON fetch rejects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Fetch failed")));

    render(<GlobeViewer isResults={false} />);

    await new Promise(resolve => setTimeout(resolve, 1100));

    expect(screen.getByTestId("globe-fallback")).toBeDefined();
    // It should have opacity-100 (not hidden)
    const fallback = screen.getByTestId("globe-fallback");
    expect(fallback.className).toContain("opacity-100");

    vi.unstubAllGlobals();
  });
});
