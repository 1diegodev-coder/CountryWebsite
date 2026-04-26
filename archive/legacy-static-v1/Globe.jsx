// CountryDNA — Globe Component
// Uses Globe.gl (WebGL) with topojson country polygons

const NUMERIC_TO_CODE = Object.fromEntries(COUNTRIES.map(c => [c.iso_numeric, c.code]));

function GlobeViewer({ matchResults, eliminatedCodes, activeStep, isResults }) {
  const containerRef = React.useRef(null);
  const globeRef = React.useRef(null);
  const [globeReady, setGlobeReady] = React.useState(false);
  const [fallback, setFallback] = React.useState(false);
  const [tooltip, setTooltip] = React.useState(null);

  const getCountryColor = React.useCallback((numericId) => {
    const code = NUMERIC_TO_CODE[numericId];
    if (!code) return 'rgba(45,55,72,0.6)';

    if (isResults && matchResults) {
      const match = matchResults.find(m => m.code === code);
      if (match) {
        if (match.is_top_match) return getComputedStyle(document.documentElement).getPropertyValue('--accent-green').trim() || '#4ADE80';
        if (match.matchPct >= 80) return '#16A34A';
        if (match.matchPct >= 65) return '#CA8A04';
        if (match.matchPct >= 50) return '#854D0E';
        return '#4B5563';
      }
      if (eliminatedCodes && eliminatedCodes.includes(code)) return '#1A2030';
    }
    return 'rgba(45,55,72,0.75)';
  }, [matchResults, eliminatedCodes, isResults]);

  const getCountryAltitude = React.useCallback((numericId) => {
    const code = NUMERIC_TO_CODE[numericId];
    if (!code || !isResults || !matchResults) return 0.005;
    const match = matchResults.find(m => m.code === code);
    if (!match) return 0.005;
    if (match.is_top_match) return 0.06;
    if (match.matchPct >= 80) return 0.04;
    if (match.matchPct >= 65) return 0.025;
    return 0.01;
  }, [matchResults, isResults]);

  // Initialize globe
  React.useEffect(() => {
    if (!containerRef.current) return;
    if (typeof window.Globe === 'undefined') { setFallback(true); return; }
    if (typeof window.topojson === 'undefined') { setFallback(true); return; }

    const el = containerRef.current;
    const w = el.clientWidth || 400;
    const h = el.clientHeight || 400;

    let globe;
    try {
      globe = window.Globe({ animateIn: false })(el);
      globe
        .width(w).height(h)
        .backgroundColor('#0A0E14')
        .showAtmosphere(true)
        .atmosphereColor('#60A5FA')
        .atmosphereAltitude(0.12)
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
        .showGraticules(false)
        .polygonStrokeColor(() => 'rgba(96,165,250,0.25)')
        .polygonSideColor(() => 'rgba(0,0,0,0.1)')
        .polygonLabel(d => {
          const code = NUMERIC_TO_CODE[+d.id];
          const c = COUNTRIES.find(c => c.code === code);
          return c ? `<div style="background:#13181F;border:1px solid #374151;padding:6px 10px;border-radius:6px;font-size:12px;color:#F9FAFB;font-family:Inter,sans-serif">${c.flag} ${c.name}</div>` : '';
        })
        .onGlobeReady(() => setGlobeReady(true));

      globeRef.current = globe;

      // Load countries polygons
      fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        .then(r => r.json())
        .then(world => {
          const countries = window.topojson.feature(world, world.objects.countries);
          globe
            .polygonsData(countries.features)
            .polygonCapColor(d => getCountryColor(+d.id))
            .polygonAltitude(d => getCountryAltitude(+d.id));
          setGlobeReady(true);
        })
        .catch(() => setFallback(true));

      // Auto-rotate
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.4;
      globe.controls().enableZoom = true;

    } catch(e) {
      setFallback(true);
    }

    return () => {
      if (globe && el._globe) {
        try { globe._destructor && globe._destructor(); } catch(e) {}
      }
    };
  }, []);

  // Update colors when results change
  React.useEffect(() => {
    if (!globeRef.current || !globeReady) return;
    try {
      globeRef.current
        .polygonCapColor(d => getCountryColor(+d.id))
        .polygonAltitude(d => getCountryAltitude(+d.id));

      // On results reveal, rotate to top match
      if (isResults && matchResults && matchResults[0]) {
        const top = matchResults[0];
        globeRef.current.pointOfView({ lat: top.lat, lng: top.lng, altitude: 2.0 }, 1200);
      }
    } catch(e) {}
  }, [matchResults, eliminatedCodes, isResults, globeReady, getCountryColor, getCountryAltitude]);

  // Resize observer
  React.useEffect(() => {
    if (!containerRef.current || !globeRef.current) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      try { globeRef.current.width(width).height(height); } catch(e) {}
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [globeReady]);

  if (fallback) return React.createElement(GlobeFallback, { matchResults, eliminatedCodes, isResults });

  return React.createElement('div', { style: { position:'relative', width:'100%', height:'100%' } },
    React.createElement('div', { ref: containerRef, style: { width:'100%', height:'100%' } }),
    !globeReady && React.createElement('div', {
      style: { position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:'#9CA3AF', fontSize:14, fontFamily:'Inter,sans-serif' }
    }, React.createElement('div', { style: { textAlign:'center' } },
      React.createElement('div', { style: { fontSize:32, marginBottom:8, animation:'spin 2s linear infinite' } }, '🌍'),
      React.createElement('div', null, 'Loading globe...')
    )),
    isResults && matchResults && React.createElement(GlobeLegend, { matches: matchResults.slice(0,5) })
  );
}

function GlobeLegend({ matches }) {
  return React.createElement('div', {
    style: { position:'absolute', bottom:16, left:16, background:'rgba(19,24,31,0.92)', border:'1px solid #1C2330', borderRadius:10, padding:'12px 16px', backdropFilter:'blur(8px)' }
  },
    React.createElement('div', { style: { fontSize:10, color:'#4B5563', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.1em', marginBottom:8 } }, 'TOP MATCHES'),
    matches.map((m, i) => React.createElement('div', { key: m.code, style: { display:'flex', alignItems:'center', gap:8, marginBottom: i < matches.length-1 ? 4 : 0 } },
      React.createElement('span', { style: { fontSize:14 } }, m.flag),
      React.createElement('span', { style: { fontSize:12, color:'#F9FAFB', fontFamily:'Inter,sans-serif' } }, m.name),
      React.createElement('span', { style: { fontSize:11, color: m.is_top_match ? 'var(--accent-green)' : '#9CA3AF', fontFamily:'JetBrains Mono,monospace', marginLeft:'auto' } }, `${m.matchPct}%`)
    ))
  );
}

// Canvas-based fallback globe
function GlobeFallback({ matchResults, isResults }) {
  const canvasRef = React.useRef(null);
  const animRef = React.useRef(null);
  const rotationRef = React.useRef(0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cx = W/2, cy = H/2, r = Math.min(W,H)*0.42;

    const points = COUNTRIES.map(c => ({ code: c.code, lat: c.lat, lng: c.lng, flag: c.flag }));

    function getColor(code) {
      if (!isResults || !matchResults) return getComputedStyle(document.documentElement).getPropertyValue('--accent-green').trim() || '#4ADE80';
      const m = matchResults.find(x => x.code === code);
      if (!m) return '#374151';
      if (m.is_top_match) return getComputedStyle(document.documentElement).getPropertyValue('--accent-green').trim() || '#4ADE80';
      if (m.matchPct >= 80) return '#16A34A';
      if (m.matchPct >= 65) return '#CA8A04';
      return '#854D0E';
    }

    function project(lat, lng, rotation) {
      const latR = lat * Math.PI / 180;
      const lngR = (lng + rotation) * Math.PI / 180;
      const x = cx + r * Math.cos(latR) * Math.sin(lngR);
      const y = cy - r * Math.sin(latR);
      const visible = Math.cos(latR) * Math.cos(lngR) > -0.1;
      return { x, y, visible, depth: Math.cos(latR) * Math.cos(lngR) };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Globe sphere
      const grad = ctx.createRadialGradient(cx - r*0.2, cy - r*0.2, r*0.1, cx, cy, r);
      grad.addColorStop(0, '#1C2330');
      grad.addColorStop(0.6, '#13181F');
      grad.addColorStop(1, '#0A0E14');
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2);
      ctx.fillStyle = grad; ctx.fill();

      // Grid lines
      ctx.strokeStyle = 'rgba(31,41,55,0.5)'; ctx.lineWidth = 0.5;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        for (let lng = -180; lng <= 180; lng += 5) {
          const { x, y, visible } = project(lat, lng, rotationRef.current);
          if (visible) { lng === -180 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
        }
        ctx.stroke();
      }
      for (let lng = -180; lng <= 150; lng += 30) {
        ctx.beginPath(); let first = true;
        for (let lat = -80; lat <= 80; lat += 5) {
          const { x, y, visible } = project(lat, lng, rotationRef.current);
          if (visible) { first ? ctx.moveTo(x, y) : ctx.lineTo(x, y); first = false; }
          else { first = true; }
        }
        ctx.stroke();
      }

      // Atmosphere glow
      const atm = ctx.createRadialGradient(cx, cy, r*0.95, cx, cy, r*1.15);
      atm.addColorStop(0, 'rgba(96,165,250,0.08)');
      atm.addColorStop(1, 'rgba(96,165,250,0)');
      ctx.beginPath(); ctx.arc(cx, cy, r*1.15, 0, Math.PI*2);
      ctx.fillStyle = atm; ctx.fill();

      // Country dots
      const sorted = points
        .map(p => ({ ...p, ...project(p.lat, p.lng, rotationRef.current) }))
        .filter(p => p.visible)
        .sort((a, b) => b.depth - a.depth);

      for (const p of sorted) {
        const color = getColor(p.code);
        const m = matchResults && matchResults.find(x => x.code === p.code);
        const isTop = m && m.is_top_match;
        const dotR = isTop ? 6 : 4;

        if (isTop) {
          ctx.beginPath(); ctx.arc(p.x, p.y, dotR + 4, 0, Math.PI*2);
          const pulse = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, dotR + 6);
          pulse.addColorStop(0, 'rgba(74,222,128,0.3)');
          pulse.addColorStop(1, 'rgba(74,222,128,0)');
          ctx.fillStyle = pulse; ctx.fill();
        }

        ctx.beginPath(); ctx.arc(p.x, p.y, dotR, 0, Math.PI*2);
        ctx.fillStyle = color; ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.5)'; ctx.lineWidth = 1; ctx.stroke();
      }

      rotationRef.current += 0.15;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [matchResults, isResults]);

  return React.createElement('div', { style: { width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' } },
    React.createElement('canvas', { ref: canvasRef, width: 400, height: 400, style: { maxWidth:'100%', maxHeight:'100%' } }),
    isResults && matchResults && React.createElement(GlobeLegend, { matches: matchResults.slice(0,5) })
  );
}

Object.assign(window, { GlobeViewer });
