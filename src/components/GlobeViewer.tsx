"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with WebGL
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface GlobeViewerProps {
  matchResults?: any[];
  eliminatedCodes?: string[];
  activeStep?: number;
  isResults: boolean;
}

export default function GlobeViewer({ matchResults, eliminatedCodes, isResults }: GlobeViewerProps) {
  const globeRef = useRef<any>(null);
  const [countries, setCountries] = useState<any>({ features: [] });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetch("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson")
      .then(res => res.json())
      .then(setCountries);
  }, []);

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

  if (!isMounted) return null;

  return (
    <div className="w-full h-full relative">
      <Globe
        ref={globeRef}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#60A5FA"
        atmosphereAltitude={0.15}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
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
    </div>
  );
}
