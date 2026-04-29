import { render, screen, act, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";

// Use a shared object to track property sets in the mock
const sharedState = {
  autoRotate: true,
  canvasListeners: {} as Record<string, (event?: Event) => void>,
};

// Robust mock for canvas element
const mockCanvasElement = {
  getContext: vi.fn().mockReturnValue({}),
  addEventListener: vi.fn((event, cb) => {
    sharedState.canvasListeners[event] = cb;
  }),
  removeEventListener: vi.fn((event) => {
    delete sharedState.canvasListeners[event];
  }),
  getBoundingClientRect: vi.fn().mockReturnValue({
    width: 1000,
    height: 1000,
    top: 0,
    left: 0,
    bottom: 1000,
    right: 1000,
  }),
};

let mockFetch: ReturnType<typeof vi.fn>;

// Mock GlobeWrapper directly
vi.mock("../GlobeWrapper", () => {
  const GlobeWrapperMock = React.forwardRef((props: any, ref: any) => {
    // We access sharedState via a closure that is safe after hoisting
    // Note: Vitest mocks can access variables prefixed with 'mock' or 'shared' sometimes,
    // but the safest is to define them inside or use a stable reference.

    React.useImperativeHandle(ref, () => ({
      controls: () => ({
        get autoRotate() { return (global as any).sharedState.autoRotate; },
        set autoRotate(val) { (global as any).sharedState.autoRotate = val; },
        autoRotateSpeed: 0.35,
      }),
      renderer: () => ({
        domElement: (global as any).mockCanvasElement,
      }),
    }));

    return <div data-testid="mock-globe" />;
  });
  GlobeWrapperMock.displayName = "GlobeWrapperMock";
  return { default: GlobeWrapperMock };
});

// Setup globals for the mock to access
(global as any).sharedState = sharedState;
(global as any).mockCanvasElement = mockCanvasElement;

import GlobeViewer, { __resetGlobeViewerCacheForTests } from "../GlobeViewer";

describe("GlobeViewer Progressive Enhancement", () => {
  const originalCreateElement = document.createElement;

  const flushGlobeActivation = async () => {
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    await act(async () => {
      for (let i = 0; i < 10; i += 1) {
        await Promise.resolve();
      }
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    __resetGlobeViewerCacheForTests();
    sharedState.autoRotate = true;
    sharedState.canvasListeners = {};
    mockCanvasElement.getContext.mockReturnValue({});
    mockCanvasElement.addEventListener.mockImplementation((event, cb) => {
      sharedState.canvasListeners[event] = cb;
    });
    mockCanvasElement.removeEventListener.mockImplementation((event) => {
      delete sharedState.canvasListeners[event];
    });
    mockFetch = vi.fn();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ features: [{ properties: { ISO_A2: "US" } }] }),
    } as Response);
    vi.stubGlobal("fetch", mockFetch);

    // Mock requestIdleCallback to execute immediately
    const requestIdleCallbackMock = vi.fn().mockImplementation((cb) => {
      const handle = setTimeout(cb, 0);
      return handle;
    });
    vi.stubGlobal("requestIdleCallback", requestIdleCallbackMock);
    (window as any).requestIdleCallback = requestIdleCallbackMock;

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

    // Mock IntersectionObserver
    const IntersectionObserverMock = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn(() => {
        callback([{ isIntersecting: true }]);
      }),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

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
    Object.defineProperty(window, "WebGLRenderingContext", {
      configurable: true,
      writable: true,
      value: vi.fn(),
    });

    vi.spyOn(document, "createElement").mockImplementation((tagName: string) => {
      const el = originalCreateElement.call(document, tagName);
      if (tagName === "canvas") return mockCanvasElement as any;

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
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      width: 1000,
      height: 1000,
      top: 0,
      left: 0,
      bottom: 1000,
      right: 1000,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
  });

  afterEach(() => {
    cleanup();
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

    render(<GlobeViewer isResults={false} />);

    await flushGlobeActivation();

    expect(mockFetch).not.toHaveBeenCalledWith("/data/countries.geojson");

    window.WebGLRenderingContext = originalWebGL;
  });

  it("keeps fallback content visible when the GeoJSON fetch rejects", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockFetch.mockRejectedValue(new Error("Fetch failed"));

    render(<GlobeViewer isResults={false} />);

    // Fast-forward through activation and fetch.
    await flushGlobeActivation();

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
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ features: [{ properties: { ISO_A2: "US" } }] }),
    } as Response);

    render(<GlobeViewer isResults={false} />);

    await flushGlobeActivation();

    expect(screen.getByTestId("mock-globe")).toBeDefined();

    // Check sharedState.autoRotate
    expect(sharedState.autoRotate).toBe(false);
  });

  it("pauses auto-rotation when not visible", async () => {
    let intersectCallback: any;
    const IntersectionObserverMock = vi.fn().mockImplementation((callback) => {
      intersectCallback = callback;
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
    });
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

    // Mock successful fetch
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ features: [{ properties: { ISO_A2: "US" } }] }),
    } as Response);

    render(<GlobeViewer isResults={false} />);

    await flushGlobeActivation();

    expect(sharedState.autoRotate).toBe(true);

    // Trigger non-intersecting
    await act(async () => {
      intersectCallback([{ isIntersecting: false }]);
    });

    expect(sharedState.autoRotate).toBe(false);
  });

  it("shows fallback and pauses when WebGL context is lost", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "info").mockImplementation(() => {});
    // Mock successful fetch
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ features: [{ properties: { ISO_A2: "US" } }] }),
    } as Response);

    render(<GlobeViewer isResults={false} />);

    await flushGlobeActivation();

    expect(screen.getByTestId("mock-globe")).toBeDefined();
    expect(screen.getByTestId("globe-fallback").style.opacity).toBe("0");

    // Simulate context loss
    await act(async () => {
      const event = { preventDefault: vi.fn() };
      if (sharedState.canvasListeners["webglcontextlost"]) {
        sharedState.canvasListeners["webglcontextlost"](event);
      }
    });

    expect(screen.getByTestId("globe-fallback").style.opacity).toBe("1");
    expect(sharedState.autoRotate).toBe(false);

    // Simulate context restore
    await act(async () => {
      if (sharedState.canvasListeners["webglcontextrestored"]) {
        sharedState.canvasListeners["webglcontextrestored"]();
      }
    });

    expect(screen.getByTestId("globe-fallback").style.opacity).toBe("0");
    expect(sharedState.autoRotate).toBe(true);
  });
});
