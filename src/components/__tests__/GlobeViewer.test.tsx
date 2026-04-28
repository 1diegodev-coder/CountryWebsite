import { render, screen, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";

// Use a shared object to track property sets in the mock
const sharedState = {
  autoRotate: true,
};

// Mock GlobeWrapper directly
vi.mock("../GlobeWrapper", () => {
  const GlobeWrapperMock = React.forwardRef((props: any, ref: any) => {
    const controlsObj = {
      get autoRotate() { return sharedState.autoRotate; },
      set autoRotate(val) { sharedState.autoRotate = val; },
      autoRotateSpeed: 0.35,
    };

    React.useImperativeHandle(ref, () => ({
      controls: () => controlsObj,
    }));

    return <div data-testid="mock-globe" />;
  });
  GlobeWrapperMock.displayName = "GlobeWrapperMock";
  return { default: GlobeWrapperMock };
});
import GlobeViewer from "../GlobeViewer";

describe("GlobeViewer Progressive Enhancement", () => {
  const originalCreateElement = document.createElement;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    sharedState.autoRotate = true;

    // Mock requestIdleCallback to execute immediately
    vi.stubGlobal("requestIdleCallback", vi.fn().mockImplementation((cb) => {
      const handle = setTimeout(cb, 0);
      return handle;
    }));

    // Mock ResizeObserver
    const ResizeObserverMock = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn((element) => {
        // Immediate callback
        callback([{ contentRect: { width: 1000, height: 1000 } }]);
      }),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    vi.stubGlobal("ResizeObserver", ResizeObserverMock);

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

    // Robust WebGL support mock
    if (!window.WebGLRenderingContext) {
      (window as any).WebGLRenderingContext = vi.fn();
    }

    const mockCanvas = {
      getContext: vi.fn().mockImplementation((type) => {
        if (type === "webgl" || type === "experimental-webgl") return {};
        return null;
      }),
    };

    vi.spyOn(document, "createElement").mockImplementation((tagName: string) => {
      const el = originalCreateElement.call(document, tagName);
      if (tagName === "canvas") return mockCanvas as any;

      el.getBoundingClientRect = vi.fn().mockReturnValue({
        width: 1000,
        height: 1000,
        top: 0,
        left: 0,
        bottom: 1000,
        right: 1000,
      });
      return el;
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("renders a fallback immediately (sync) before any effects", () => {
    render(<GlobeViewer isResults={false} />);
    const fallback = screen.getByTestId("globe-fallback");
    expect(fallback).toBeDefined();
    expect(fallback.style.opacity).toBe("1");
  });

  it("includes candidate/eliminated counts in fallback when isResults is true", () => {
    render(
      <GlobeViewer
        isResults={true}
        matchResults={[{ countryCode: "US", rank: 1, score: 95 }]}
        eliminatedCodes={["CA", "MX"]}
      />
    );
    expect(screen.getByText(/1/)).toBeDefined();
    expect(screen.getByText(/2/)).toBeDefined();
    expect(screen.getByText(/Candidates/)).toBeDefined();
    expect(screen.getByText(/Eliminated/)).toBeDefined();
  });

  it("does not attempt heavy GeoJSON fetch when WebGL is unavailable", async () => {
    const originalWebGL = window.WebGLRenderingContext;
    // @ts-expect-error: Mocking WebGL unavailability
    delete window.WebGLRenderingContext;

    const fetchSpy = vi.spyOn(global, "fetch");

    render(<GlobeViewer isResults={false} />);

    await act(async () => {
      vi.runAllTimers();
    });

    expect(fetchSpy).not.toHaveBeenCalledWith("/data/countries.geojson");

    window.WebGLRenderingContext = originalWebGL;
  });

  it("keeps fallback content visible when the GeoJSON fetch rejects", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new Error("Fetch failed"));

    render(<GlobeViewer isResults={false} />);

    // Fast-forward through activation and fetch
    await act(async () => {
      vi.runAllTimers();
    });

    const fallback = screen.getByTestId("globe-fallback");
    expect(fallback.style.opacity).toBe("1");
  });

  it("respects prefers-reduced-motion for auto-rotation", async () => {
    // Mock reduced motion = true
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    // Mock successful fetch
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ features: [{ properties: { ISO_A2: "US" } }] }),
    } as Response);

    render(<GlobeViewer isResults={false} />);

    // Advance timers in act to trigger activation
    await act(async () => {
      vi.runAllTimers();
    });

    // Check mock globe is present
    expect(screen.getByTestId("mock-globe")).toBeDefined();

    // Check sharedState.autoRotate
    expect(sharedState.autoRotate).toBe(false);
  });
});
