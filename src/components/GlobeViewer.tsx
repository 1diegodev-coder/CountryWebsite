"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import React from "react";
import Globe from "./GlobeWrapper";

let countriesGeoJsonCache: any | null = null;
let countriesGeoJsonPromise: Promise<any> | null = null;

function loadCountriesGeoJson() {
  if (countriesGeoJsonCache) return Promise.resolve(countriesGeoJsonCache);
  if (!countriesGeoJsonPromise) {
    countriesGeoJsonPromise = fetch("/data/countries.geojson")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load countries GeoJSON");
        return res.json();
      })
      .then(data => {
        countriesGeoJsonCache = data;
        return data;
      })
      .catch(error => {
        countriesGeoJsonPromise = null;
        throw error;
      });
  }
  return countriesGeoJsonPromise;
}

function hasWebGLSupport() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch (e) {
    return false;
  }
}

interface GlobeViewerProps {
  matchResults?: any[];
  eliminatedCodes?: string[];
  activeStep?: number;
  isResults: boolean;
}

export default function GlobeViewer({ matchResults, eliminatedCodes, isResults }: GlobeViewerProps) {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [countries, setCountries] = useState<any>({ features: [] });
  const [isMounted, setIsMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [webGlActive, setWebGlActive] = useState(false);
  const [webGlError, setWebGlError] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const updateMotion = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", updateMotion);

    // Progressive Activation: Defer WebGL
    if (hasWebGLSupport()) {
      const activate = () => {
        setWebGlActive(true);
        loadCountriesGeoJson()
          .then(setCountries)
          .catch(error => {
            console.error("Globe GeoJSON load error:", error);
            setWebGlError(true);
          });
      };

      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => activate(), { timeout: 2000 });
      } else {
        setTimeout(activate, 1000);
      }
    } else {
      setWebGlError(true);
    }

    return () => mediaQuery.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const { width, height } = container.getBoundingClientRect();
      setDimensions({
        width: Math.max(0, Math.floor(width)),
        height: Math.max(0, Math.floor(height)),
      });
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []); // Only run once on mount

  useEffect(() => {
    const controls = globeRef.current?.controls?.();
    if (!controls) return;

    controls.autoRotate = !prefersReducedMotion;
    controls.autoRotateSpeed = 0.35;
  }, [prefersReducedMotion, dimensions.width, dimensions.height, webGlActive, countries.features.length]);

  const getCountryColor = useCallback((d: any) => {
    const code = d.properties.ISO_A2;
    if (!code) return "rgba(45,55,72,0.6)";

    if (isResults && matchResults) {
      const match = matchResults.find(m => m.countryCode === code);
      if (match) {
        if (match.rank === 1) return "#4ADE80"; // accent-primary (top match)
        if (match.score >= 80) return "#16A34A"; // scored-high
        if (match.score >= 65) return "#CA8A04"; // scored-mid
        return "#854D0E"; // scored-low
      }
      if (eliminatedCodes?.includes(code)) return "#1A2030";
    }

    // Neutral state
    return "rgba(45,55,72,0.75)";
  }, [matchResults, eliminatedCodes, isResults]);

  const getCountryAltitude = useCallback((d: any) => {
    const code = d.properties.ISO_A2;
    if (!isResults || !matchResults) return 0.01;
    const match = matchResults.find(m => m.countryCode === code);
    if (match?.rank === 1) return 0.08;
    if (match && match.rank <= 5) return 0.04;
    return 0.01;
  }, [matchResults, isResults]);

  const candidateCount = matchResults?.length || 0;
  const eliminatedCount = eliminatedCodes?.length || 0;

  // Fallback shell is rendered unconditionally for immediate first-paint.
  // We use inline styles for motion gating to ensure immediate reliability.
  const showWebGl = isMounted && webGlActive && !webGlError && countries.features.length > 0 && dimensions.width > 0;

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full h-full"
      style={{ width: "100%", height: "100%" }}
      role="img"
      aria-label="Interactive 3D globe showing matching countries"
    >
      {/* Fallback Shell: lightweight and renders immediately */}
      <div
        data-testid="globe-fallback"
        className="absolute inset-0 flex flex-col items-center justify-center"
        aria-label="Globe visualization loading"
        style={{
          zIndex: 10,
          opacity: showWebGl ? 0 : 1,
          transition: prefersReducedMotion ? "none" : "opacity 700ms ease-in-out",
          pointerEvents: showWebGl ? "none" : "auto"
        }}
      >
        <div className="relative w-48 h-48 rounded-full border border-bg-elevated bg-bg-surface/30 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-radial-gradient from-accent-blue/10 to-transparent"
            style={{
              animation: prefersReducedMotion ? "none" : "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
            }}
          />
          <div className="text-text-muted opacity-20">
            <svg viewBox="0 0 100 100" className="w-32 h-32 fill-current">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <path d="M5,50 Q25,25 50,25 T95,50" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <path d="M5,50 Q25,75 50,75 T95,50" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
          {isResults && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="text-2xl font-mono font-bold text-accent-green">{candidateCount}</div>
              <div className="text-[8px] uppercase tracking-widest text-text-muted">Candidates</div>
              <div className="mt-2 text-xl font-mono text-text-muted">{eliminatedCount}</div>
              <div className="text-[8px] uppercase tracking-widest text-text-muted/50">Eliminated</div>
            </div>
          )}
        </div>
      </div>

      {/* WebGL Globe: dynamic client-only component */}
      {showWebGl && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          showAtmosphere={true}
          atmosphereColor="#60A5FA"
          atmosphereAltitude={0.15}
          polygonsData={countries.features}
          polygonCapColor={getCountryColor}
          polygonSideColor={() => "rgba(0, 0, 0, 0.1)"}
          polygonStrokeColor={() => "rgba(255, 255, 255, 0.1)"}
          polygonAltitude={getCountryAltitude}
          polygonLabel={({ properties: d }: any) => `
            <div class="bg-bg-surface border border-bg-elevated p-2 rounded-lg text-xs shadow-2xl">
              <b class="text-text-primary uppercase tracking-wider">${d.ADMIN}</b>
            </div>
          `}
        />
      )}
    </div>
  );
}
