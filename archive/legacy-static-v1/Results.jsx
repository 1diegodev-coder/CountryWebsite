// CountryDNA — Results View Component

const { useState: useStateR, useEffect: useEffectR, useRef: useRefR, useMemo: useMemoR, useCallback: useCallbackR } = React;

const DIM_LABELS = {
  economic_accessibility: 'Economic Access', visa_residency: 'Visa & Residency',
  safety_stability: 'Safety', healthcare_quality: 'Healthcare',
  digital_infrastructure: 'Digital Infra', climate_match: 'Climate',
  social_cultural_fit: 'Social Fit', values_alignment: 'Values',
  economic_opportunity: 'Opportunity', lifestyle_match: 'Lifestyle'
};

const DATA_YEAR = 2024;
const DATA_SOURCES = {
  monthly_cost_usd:  { label: 'Monthly cost est.',   source: 'Numbeo Cost of Living Index',     year: 2024 },
  gpi_score:         { label: 'Safety index (GPI)',  source: 'Global Peace Index (IEP)',         year: 2024 },
  ef_epi_score:      { label: 'English proficiency', source: 'EF English Proficiency Index',     year: 2024 },
  ookla_mbps:        { label: 'Internet speed',      source: 'Ookla Speedtest Global Index',     year: 2024 },
  ilga_lgbtq_score:  { label: 'LGBTQ+ rights',       source: 'ILGA World Rainbow Map',           year: 2024 },
  rsf_press_freedom: { label: 'Press freedom',       source: 'Reporters Without Borders (RSF)',  year: 2024 },
};

function ResultsView({ engineResult, answers, onRetake, overrides, onOverride, onContinueQuiz, continueStep, isPartial, tweaks = {} }) {
  const accent = tweaks.accentColor || '#4ADE80';
  const compact = tweaks.cardDensity === 'compact';
  const minPct = tweaks.minMatchPct || 0;
  const showBars = tweaks.showBars !== false;
  const [sidePanel, setSidePanel] = useState('log'); // 'log' | 'whatif' | 'share'
  const [expandedCard, setExpandedCard] = useState(null);
  const [deepDive, setDeepDive] = useState(null);
  const [whatIfAnswers, setWhatIfAnswers] = useState(answers);
  const [whatIfResult, setWhatIfResult] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const activeResult = whatIfResult || engineResult;

  useEffectR(() => {
    setTimeout(() => setRevealed(true), 100);
  }, []);

  const handleWhatIf = useCallbackR((key, value) => {
    const newAnswers = { ...whatIfAnswers, [key]: value };
    setWhatIfAnswers(newAnswers);
    try {
      const res = runWhatIf(answers, { [key]: value });
      setWhatIfResult(res);
    } catch(e) {}
  }, [whatIfAnswers, answers]);

  if (deepDive) {
    return React.createElement(DeepDiveView, {
      country: deepDive,
      match: activeResult.matches.find(m => m.code === deepDive.code),
      answers,
      onBack: () => setDeepDive(null)
    });
  }

  return React.createElement('div', { className: 'results-layout' },
    // Header
    React.createElement('div', { className: 'results-header' },
      React.createElement('div', { style: { display:'flex', alignItems:'center', gap:16 } },
        React.createElement('div', { style: { fontSize:11, color: accent, fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.12em' } }, 'COUNTRYDNA'),
        React.createElement('div', { style: { width:1, height:16, background:'#1C2330' } }),
        React.createElement('div', { style: { fontSize:13, color:'#9CA3AF' } },
          `${activeResult.candidate_count} matches · ${activeResult.eliminated_count} eliminated`
        )
      ),
      React.createElement('div', { style: { display:'flex', gap:8 } },
        React.createElement('button', {
          className: 'btn-primary btn-sm',
          onClick: onContinueQuiz,
          style: { background: accent, color: '#0A0E14' },
          title: isPartial ? 'Keep answering to sharpen results' : 'Revisit your answers'
        }, isPartial ? '✎ Refine answers' : '✎ Edit answers'),
        React.createElement('button', { className: 'btn-ghost btn-sm', onClick: onRetake }, '↺ Retake'),
        React.createElement('button', { className: `btn-ghost btn-sm${sidePanel==='share'?' active':''}`, onClick: () => setSidePanel(p => p==='share'?null:'share') }, '⬆ Share')
      )
    ),

    // Mirror text
    React.createElement('div', { className: 'mirror-banner' },
      React.createElement('p', { className: 'mirror-text' }, activeResult.personality_mirror),
      isPartial && React.createElement('div', {
        style: { marginTop:10, display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }
      },
        React.createElement('span', { style: { fontSize:12, color:'#FBBF24' } },
          `⚡ Based on ${Object.keys(answers).length} of ${QUESTIONS.length} questions — results will sharpen as you answer more.`
        ),
        React.createElement('button', {
          className: 'btn-primary btn-sm',
          onClick: onContinueQuiz,
          style: { background: accent, color: '#0A0E14' }
        }, 'Continue refining →')
      )
    ),

    // Main 3-column layout
    React.createElement('div', { className: 'results-body' },

      // Globe panel
      React.createElement('div', { className: 'results-globe-panel' },
        React.createElement('div', { className: 'globe-wrap' },
          React.createElement(GlobeViewer, {
            matchResults: activeResult.matches,
            eliminatedCodes: activeResult.eliminated.map(e => e.code),
            isResults: true
          })
        ),
        React.createElement('div', { className: 'globe-stats' },
          React.createElement('div', { className: 'globe-stat' },
            React.createElement('div', { style: { fontSize:22, color:'#4ADE80', fontFamily:'JetBrains Mono,monospace' } }, activeResult.candidate_count),
            React.createElement('div', { style: { fontSize:11, color:'#9CA3AF' } }, 'matches')
          ),
          React.createElement('div', { className: 'globe-stat' },
            React.createElement('div', { style: { fontSize:22, color:'#374151', fontFamily:'JetBrains Mono,monospace' } }, activeResult.eliminated_count),
            React.createElement('div', { style: { fontSize:11, color:'#9CA3AF' } }, 'eliminated')
          )
        )
      ),

      // Match cards
      React.createElement('div', { className: 'match-cards-panel' },
        React.createElement('div', { style: { fontSize:11, color:'#4B5563', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.1em', marginBottom:16 } },
          `YOUR TOP ${Math.min(activeResult.matches.length, 10)} MATCHES`
        ),
        React.createElement('div', { className: 'match-cards-grid' },
          activeResult.matches
            .filter(m => m.matchPct >= minPct)
            .slice(0, 10)
            .map((match, i) =>
              React.createElement(MatchCard, {
                key: match.code,
                match, index: i,
                isExpanded: expandedCard === match.code,
                revealed, accent, compact, showBars, answers,
                onExpand: () => setExpandedCard(c => c === match.code ? null : match.code),
                onDeepDive: () => setDeepDive(COUNTRIES.find(c => c.code === match.code))
              })
            )
        ),
        activeResult.eliminated.length > 0 && React.createElement('div', { style: { marginTop: 24, opacity: 0.85 } },
          React.createElement('div', { style: { fontSize:11, color:'#4B5563', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.1em', marginBottom:12 } }, 'CLOSE BUT ELIMINATED'),
          activeResult.eliminated.slice(0, 3).map((c, i) =>
            React.createElement('div', { key: c.code, style: { display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'#13181F', border:'1px solid #1C2330', borderRadius:8, marginBottom: i < 2 ? 8 : 0 } },
              React.createElement('span', { style: { fontSize:20 } }, c.flag),
              React.createElement('div', { style: { flex:1, minWidth:0 } },
                React.createElement('div', { style: { fontSize:13, color:'#F9FAFB', fontWeight:600 } }, c.name),
                React.createElement('div', { style: { fontSize:11, color:'#9CA3AF', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' } },
                  c.elimination_reasons && c.elimination_reasons[0] ? c.elimination_reasons[0].detail : ''
                )
              ),
              React.createElement('button', { className: 'btn-override', onClick: () => onOverride(c.code), title: 'Override elimination' }, 'Override')
            )
          )
        )
      ),

      // Side panel
      React.createElement('div', { className: 'side-panel' },
        React.createElement('div', { className: 'side-tabs' },
          ['log', 'whatif', 'share'].map(tab =>
            React.createElement('button', {
              key: tab,
              className: `side-tab${sidePanel===tab?' active':''}`,
              onClick: () => setSidePanel(p => p===tab ? null : tab)
            }, tab === 'log' ? 'Eliminations' : tab === 'whatif' ? 'What If' : 'Share')
          )
        ),
        sidePanel === 'log' && React.createElement(EliminationLog, {
          eliminated: activeResult.eliminated,
          onOverride: (code) => { onOverride(code); setWhatIfResult(null); }
        }),
        sidePanel === 'whatif' && React.createElement(WhatIfPanel, {
          answers, whatIfAnswers, onWhatIf: handleWhatIf,
          delta: whatIfResult ? {
            added: whatIfResult.candidate_count - engineResult.candidate_count
          } : null,
          onReset: () => { setWhatIfAnswers(answers); setWhatIfResult(null); }
        }),
        sidePanel === 'share' && React.createElement(SharePanel, { matches: activeResult.matches.slice(0,5), answers })
      )
    ),

    // Legal disclaimer
    React.createElement('div', { className: 'legal-disclaimer' },
      '⚠ CountryDNA provides general research information only. Nothing here constitutes legal, immigration, financial, or medical advice. Always verify with official government sources or qualified professionals before making decisions.'
    )
  );
}

function getPersonalisationPrefix(answers) {
  const { budget, household, life_stage } = answers;
  if (budget <= 2500) return `On a $${Number(budget).toLocaleString()}/mo budget: `;
  if (budget >= 5000) return `With your $${Number(budget).toLocaleString()}/mo budget: `;
  if (household === 'solo') return 'As a solo mover: ';
  if (household === 'couple') return 'As a couple: ';
  if (['family_young','family_teen'].includes(household)) return 'Moving with family: ';
  if (life_stage === 'retiree') return 'For your retirement: ';
  if (life_stage === 'founder') return 'As a founder: ';
  return null;
}

function MatchCard({ match, index, isExpanded, revealed, onExpand, onDeepDive, accent = '#4ADE80', compact = false, showBars = true, answers = {} }) {
  const pct = match.matchPct;
  const glowColor = match.is_top_match ? accent : pct >= 80 ? '#16A34A' : pct >= 65 ? '#CA8A04' : '#6B7280';
  const pad = compact ? '12px 14px' : '18px';

  return React.createElement('div', {
    className: `match-card${match.is_top_match ? ' top-match' : ''}${match.is_override ? ' override' : ''}`,
    style: {
      padding: pad,
      animationDelay: `${index * 80}ms`,
      opacity: revealed ? 1 : 0,
      transform: revealed ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.4s ease ${index * 80}ms, transform 0.4s ease ${index * 80}ms`,
      boxShadow: match.is_top_match ? `0 0 24px rgba(74,222,128,0.15)` : 'none',
      borderColor: match.is_top_match ? `${accent}55` : undefined,
    }
  },
    // Card header
    React.createElement('div', { className: 'card-header' },
      React.createElement('div', { style: { display:'flex', alignItems:'center', gap:10 } },
        React.createElement('span', { style: { fontSize: compact ? 20 : 24 } }, match.flag),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize:13, color:'#F9FAFB', fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' } }, match.name),
          React.createElement('div', { style: { fontSize:11, color:'#9CA3AF' } }, `${match.region}${match.is_eu ? ' · EU' : ''}${match.is_schengen ? ' · Schengen' : ''}`)
        )
      ),
      React.createElement('div', { style: { textAlign:'right' } },
        React.createElement('div', { style: { fontSize:22, fontFamily:'JetBrains Mono,monospace', color: pct >= 80 ? accent : pct >= 65 ? '#FBBF24' : '#9CA3AF', fontWeight:700 } }, `${pct}%`),
        match.is_override && React.createElement('div', { style: { fontSize:10, color:'#FBBF24', fontFamily:'JetBrains Mono,monospace' } }, 'OVERRIDE')
      )
    ),

    // Match bar
    showBars && React.createElement('div', { className: 'match-bar-outer' },
      React.createElement('div', { className: 'match-bar-inner', style: { width: `${pct}%`, background: pct >= 80 ? accent : pct >= 65 ? '#CA8A04' : '#6B7280' } })
    ),

    // Why fit
    match.narratives && React.createElement('div', { className: 'card-section' },
      React.createElement('div', { className: 'card-section-title green' }, 'WHY YOU FIT'),
      match.narratives.why_fit.slice(0, isExpanded ? 4 : 2).map((pt, i) => {
        const prefix = i === 0 ? getPersonalisationPrefix(answers) : null;
        return React.createElement('div', { key: i, className: 'bullet green' },
          prefix
            ? React.createElement(React.Fragment, null,
                React.createElement('span', { style: { color: accent, fontWeight: 600 } }, prefix),
                pt
              )
            : pt
        );
      })
    ),

    // Watch out
    match.narratives && match.narratives.watch_out.length > 0 && React.createElement('div', { className: 'card-section' },
      React.createElement('div', { className: 'card-section-title amber' }, 'WATCH OUT FOR'),
      match.narratives.watch_out.slice(0, isExpanded ? 3 : 1).map((pt, i) =>
        React.createElement('div', { key: i, className: 'bullet amber' }, pt)
      )
    ),

    // Cost reality
    match.cost_reality && React.createElement('div', { className: 'card-cost' },
      React.createElement('span', { style: { color:'#9CA3AF', fontSize:12 } }, 'Monthly est. '),
      React.createElement('span', { style: { color:'#F9FAFB', fontFamily:'JetBrains Mono,monospace', fontSize:12 } },
        `$${match.cost_reality.estimated_low.toLocaleString()}–$${match.cost_reality.estimated_high.toLocaleString()}`
      ),
      match.cost_reality.saving_vs_budget && match.cost_reality.saving_vs_budget > 200 &&
        React.createElement('span', { style: { color:'#4ADE80', fontSize:12, marginLeft:8 } },
          `saves ~$${match.cost_reality.saving_vs_budget.toLocaleString()}/mo`
        )
    ),

    // Expanded: dimension scores
    isExpanded && match.dimScores && React.createElement('div', { className: 'card-dims' },
      React.createElement('div', { className: 'card-section-title', style: { color:'#4B5563', marginBottom:8 } }, 'DIMENSION BREAKDOWN'),
      Object.entries(match.dimScores)
        .sort((a, b) => b[1].score - a[1].score)
        .map(([dim, { score, weight }]) =>
          React.createElement('div', { key: dim, className: 'dim-row' },
            React.createElement('span', { className: 'dim-label' }, DIM_LABELS[dim] || dim),
            React.createElement('div', { className: 'dim-bar-outer' },
              React.createElement('div', { className: 'dim-bar-inner', style: { width: `${score * 10}%`, opacity: 0.4 + weight * 4 } })
            ),
            React.createElement('span', { className: 'dim-score' }, score.toFixed(1))
          )
        )
    ),

    // Actions
    React.createElement('div', { className: 'card-actions' },
      React.createElement('button', { className: 'btn-card-primary', onClick: onDeepDive }, 'Explore →'),
      React.createElement('button', { className: 'btn-card-ghost', onClick: onExpand },
        isExpanded ? 'Less ↑' : 'More ↓'
      )
    )
  );
}

function EliminationLog({ eliminated, onOverride }) {
  const grouped = useMemoR(() => {
    const g = {};
    for (const c of eliminated) {
      for (const r of (c.elimination_reasons || [])) {
        if (!g[r.label]) g[r.label] = [];
        g[r.label].push({ ...c, primaryReason: r });
      }
    }
    return g;
  }, [eliminated]);

  const [openGroups, setOpenGroups] = useState({});

  return React.createElement('div', { className: 'elim-log' },
    Object.entries(grouped).map(([label, countries]) =>
      React.createElement('div', { key: label, className: 'elim-group' },
        React.createElement('button', {
          className: 'elim-group-header',
          onClick: () => setOpenGroups(g => ({ ...g, [label]: !g[label] }))
        },
          React.createElement('span', { style: { color:'#9CA3AF', fontSize:12, textTransform:'uppercase', letterSpacing:'0.08em' } },
            `${label} `
          ),
          React.createElement('span', { style: { color:'#4B5563', fontSize:12 } }, `(${countries.length})`),
          React.createElement('span', { style: { marginLeft:'auto', color:'#4B5563' } }, openGroups[label] ? '▲' : '▼')
        ),
        openGroups[label] && React.createElement('div', { className: 'elim-countries' },
          countries.map(c =>
            React.createElement('div', { key: c.code, className: 'elim-country' },
              React.createElement('span', { style: { fontSize:16 } }, c.flag),
              React.createElement('div', { style: { flex:1, minWidth:0 } },
                React.createElement('div', { style: { fontSize:13, color:'#F9FAFB' } }, c.name),
                React.createElement('div', { style: { fontSize:11, color:'#9CA3AF', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' } },
                  c.primaryReason.detail
                )
              ),
              React.createElement('button', {
                className: 'btn-override',
                onClick: () => onOverride(c.code),
                title: 'Override elimination'
              }, 'Override')
            )
          )
        )
      )
    )
  );
}

function WhatIfPanel({ answers, whatIfAnswers, onWhatIf, delta, onReset }) {
  return React.createElement('div', { className: 'whatif-panel' },
    React.createElement('p', { style: { fontSize:12, color:'#9CA3AF', marginBottom:20, lineHeight:1.5 } },
      'Adjust constraints and watch results update in real time.'
    ),

    React.createElement(WhatIfSlider, {
      label: 'Monthly Budget', unit: '$', prefix: '$',
      min: 1000, max: 10000, step: 500,
      value: whatIfAnswers.budget || answers.budget || 3000,
      original: answers.budget,
      onChange: v => onWhatIf('budget', v)
    }),

    React.createElement(WhatIfSlider, {
      label: 'Healthcare Requirement',
      min: 1, max: 4, step: 1,
      value: { basic:1, good_general:2, high_quality:3, critical:4 }[whatIfAnswers.healthcare || answers.healthcare || 'good_general'],
      original: { basic:1, good_general:2, high_quality:3, critical:4 }[answers.healthcare || 'good_general'],
      labels: ['Basic', 'General', 'High Quality', 'Critical'],
      onChange: v => {
        const map = {1:'basic', 2:'good_general', 3:'high_quality', 4:'critical'};
        onWhatIf('healthcare', map[v]);
      }
    }),

    delta && React.createElement('div', { className: 'whatif-delta' },
      delta.added > 0
        ? `↑ ${delta.added} more countries now qualify`
        : delta.added < 0
        ? `↓ ${Math.abs(delta.added)} fewer countries qualify`
        : 'Same number of countries qualify'
    ),

    React.createElement('button', { className: 'btn-ghost btn-sm', style: { marginTop:16 }, onClick: onReset }, '↺ Reset to my answers')
  );
}

function WhatIfSlider({ label, min, max, step, value, original, unit, prefix, labels, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return React.createElement('div', { style: { marginBottom:24 } },
    React.createElement('div', { style: { display:'flex', justifyContent:'space-between', marginBottom:8 } },
      React.createElement('span', { style: { fontSize:12, color:'#9CA3AF' } }, label),
      React.createElement('span', { style: { fontSize:12, color:'#F9FAFB', fontFamily:'JetBrains Mono,monospace' } },
        labels ? labels[value - min] : `${prefix || ''}${value.toLocaleString()}${unit && !prefix ? unit : ''}`
      )
    ),
    React.createElement('input', {
      type: 'range', min, max, step, value,
      className: 'whatif-range',
      onChange: e => onChange(+e.target.value)
    }),
    value !== original && React.createElement('div', { style: { fontSize:11, color:'#FBBF24', marginTop:4 } },
      `Original: ${labels ? labels[original - min] : `${prefix||''}${original.toLocaleString()}`}`
    )
  );
}

function SharePanel({ matches, answers }) {
  const [copied, setCopied] = useStateR(false);
  const [downloading, setDownloading] = useStateR(false);
  const previewRef = useRefR(null);
  const shareUrl = useMemoR(() => {
    try {
      const encoded = btoa(JSON.stringify(answers));
      return window.location.origin + window.location.pathname + '#s=' + encoded;
    } catch(e) { return window.location.href; }
  }, [answers]);

  const copyLink = () => {
    navigator.clipboard?.writeText(shareUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadImage = async () => {
    const el = previewRef.current;
    if (!el || !window.html2canvas) return;
    setDownloading(true);
    try {
      const canvas = await window.html2canvas(el, { backgroundColor: '#0A0E14', scale: 2, useCORS: true });
      const link = document.createElement('a');
      link.download = 'my-countrydna-matches.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return React.createElement('div', { className: 'share-panel' },
    React.createElement('div', { className: 'share-card-preview', ref: previewRef },
      React.createElement('div', { style: { fontSize:11, color:'#4ADE80', fontFamily:'JetBrains Mono,monospace', marginBottom:12 } }, 'COUNTRYDNA — MY MATCHES'),
      matches.map((m, i) => React.createElement('div', { key: m.code, style: { display:'flex', alignItems:'center', gap:8, marginBottom:8 } },
        React.createElement('span', null, m.flag),
        React.createElement('span', { style: { fontSize:13, color:'#F9FAFB', flex:1 } }, m.name),
        React.createElement('div', { style: { height:4, width:80, background:'#1C2330', borderRadius:2, overflow:'hidden' } },
          React.createElement('div', { style: { height:'100%', width:`${m.matchPct}%`, background: m.is_top_match ? '#4ADE80' : '#9CA3AF', borderRadius:2 } })
        ),
        React.createElement('span', { style: { fontSize:11, color:'#9CA3AF', fontFamily:'JetBrains Mono,monospace', minWidth:36 } }, `${m.matchPct}%`)
      )),
      React.createElement('div', { style: { fontSize:11, color:'#4B5563', marginTop:8 } }, 'countrydna.io')
    ),
    React.createElement('div', { className: 'share-url-row' },
      React.createElement('div', { className: 'share-url', style: { fontSize:10, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' } }, shareUrl),
      React.createElement('button', { className: 'btn-primary btn-sm', onClick: copyLink },
        copied ? '✓ Copied' : 'Copy link'
      )
    ),
    React.createElement('button', {
      className: 'btn-ghost btn-sm',
      onClick: downloadImage,
      disabled: downloading,
      style: { marginTop:8, width:'100%' }
    }, downloading ? 'Generating…' : '⬇ Save as image'),
    React.createElement('p', { style: { fontSize:11, color:'#4B5563', marginTop:8 } }, 'Shareable link — no account needed.')
  );
}

function DeepDiveView({ country, match, answers, onBack }) {
  if (!match) return null;

  return React.createElement('div', { className: 'deep-dive' },
    React.createElement('div', { className: 'deep-header' },
      React.createElement('button', { className: 'btn-ghost btn-sm', onClick: onBack }, '← Back to results'),
      React.createElement('div', { className: 'legal-disclaimer', style: { margin:0 } },
        'Visa information is for general guidance only. Always verify with official sources. This is not legal advice.'
      )
    ),

    React.createElement('div', { className: 'deep-body' },
      // Hero
      React.createElement('div', { className: 'deep-hero' },
        React.createElement('div', { style: { fontSize:56 } }, country.flag),
        React.createElement('div', null,
          React.createElement('h1', { className: 'deep-title' }, country.name),
          React.createElement('div', { style: { fontSize:14, color:'#9CA3AF', marginBottom:8 } }, country.region),
          React.createElement('div', { style: { fontSize:32, fontFamily:'JetBrains Mono,monospace', color:'#4ADE80', fontWeight:700 } }, `${match.matchPct}% match`),
          React.createElement('p', { style: { color:'#9CA3AF', fontSize:14, maxWidth:480, lineHeight:1.6, marginTop:8 } }, country.descriptor)
        )
      ),

      React.createElement('div', { className: 'deep-grid' },
        // Dimension breakdown
        React.createElement('div', { className: 'deep-card' },
          React.createElement('h3', { className: 'deep-card-title' }, 'Match Breakdown'),
          match.dimScores && Object.entries(match.dimScores)
            .sort((a, b) => b[1].score * b[1].weight - a[1].score * a[1].weight)
            .map(([dim, { score, weight }]) =>
              React.createElement('div', { key: dim, className: 'deep-dim-row' },
                React.createElement('span', { className: 'dim-label' }, DIM_LABELS[dim]),
                React.createElement('div', { className: 'dim-bar-outer', style: { flex:1 } },
                  React.createElement('div', {
                    className: 'dim-bar-inner',
                    style: { width: `${score * 10}%`, background: score >= 8 ? '#4ADE80' : score >= 6 ? '#FBBF24' : '#374151' }
                  })
                ),
                React.createElement('span', { className: 'dim-score' }, score.toFixed(1)),
                React.createElement('span', { style: { fontSize:10, color:'#4B5563', fontFamily:'JetBrains Mono,monospace', minWidth:36 } },
                  `${(weight * 100).toFixed(0)}%w`
                )
              )
            )
        ),

        // Why fit + Watch out
        React.createElement('div', { className: 'deep-card' },
          React.createElement('h3', { className: 'deep-card-title' }, 'Why You Fit'),
          match.narratives && match.narratives.why_fit.map((p, i) =>
            React.createElement('div', { key: i, className: 'bullet green', style: { marginBottom:10 } }, p)
          ),
          React.createElement('h3', { className: 'deep-card-title', style: { marginTop:20 } }, 'Watch Out For'),
          match.narratives && match.narratives.watch_out.map((p, i) =>
            React.createElement('div', { key: i, className: 'bullet amber', style: { marginBottom:10 } }, p)
          )
        ),

        // Cost reality check
        React.createElement('div', { className: 'deep-card' },
          React.createElement('h3', { className: 'deep-card-title' }, 'Cost Reality Check'),
          React.createElement('p', { style: { fontSize:13, color:'#9CA3AF', marginBottom:16 } },
            `Based on your $${(answers.budget||3000).toLocaleString()}/month budget:`
          ),
          [
            ['1-bed rent (capital)', `$${country.cost_breakdown.rent_1bed_capital.toLocaleString()}`],
            ['1-bed rent (secondary city)', `$${country.cost_breakdown.rent_1bed_secondary.toLocaleString()}`],
            ['Groceries', `$${country.cost_breakdown.groceries.toLocaleString()}/mo`],
            ['Dining out (avg)', `$${country.cost_breakdown.dining_out_meal}/meal`],
            ['Transport', `$${country.cost_breakdown.transport}/mo`],
            ['Coworking', `$${country.cost_breakdown.coworking}/mo`],
            ['Private health insurance', `$${country.cost_breakdown.health_insurance}/mo`],
          ].map(([label, val]) =>
            React.createElement('div', { key: label, style: { display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid #1C2330' } },
              React.createElement('span', { style: { fontSize:13, color:'#9CA3AF' } }, label),
              React.createElement('span', { style: { fontSize:13, color:'#F9FAFB', fontFamily:'JetBrains Mono,monospace' } }, val)
            )
          ),
          match.cost_reality && React.createElement('div', { style: { marginTop:12, padding:'10px 12px', background:'#1C2330', borderRadius:8 } },
            React.createElement('div', { style: { fontSize:13, color:'#9CA3AF' } }, 'Estimated total range'),
            React.createElement('div', { style: { fontSize:18, color:'#F9FAFB', fontFamily:'JetBrains Mono,monospace', fontWeight:700 } },
              `$${match.cost_reality.estimated_low.toLocaleString()} – $${match.cost_reality.estimated_high.toLocaleString()}/mo`
            ),
            match.cost_reality.saving_vs_budget > 0 && React.createElement('div', { style: { fontSize:12, color:'#4ADE80', marginTop:4 } },
              `Saves you ~$${match.cost_reality.saving_vs_budget.toLocaleString()}/month vs. your budget`
            )
          )
        ),

        // Visa pathways
        React.createElement('div', { className: 'deep-card' },
          React.createElement('h3', { className: 'deep-card-title' }, 'Visa Pathways'),
          country.visa_pathways.map((vp, i) =>
            React.createElement('div', { key: i, className: 'visa-card' },
              React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 } },
                React.createElement('div', { style: { fontSize:14, color:'#F9FAFB', fontWeight:600 } }, vp.name),
                React.createElement('div', { style: { display:'flex', gap:2 } },
                  Array.from({length:5}).map((_,j) =>
                    React.createElement('div', { key:j, style: { width:6, height:6, borderRadius:'50%', background: j < vp.difficulty ? '#FBBF24' : '#1C2330' } })
                  )
                )
              ),
              React.createElement('div', { style: { display:'flex', gap:16, flexWrap:'wrap', marginBottom:8 } },
                vp.min_income_usd > 0 && React.createElement('span', { className: 'visa-tag' }, `Min $${vp.min_income_usd.toLocaleString()}/mo`),
                React.createElement('span', { className: 'visa-tag' }, `${vp.duration_months}mo`),
                React.createElement('span', { className: 'visa-tag' }, `~${vp.processing_weeks}wk processing`),
                vp.leads_to_residency && React.createElement('span', { className: 'visa-tag green' }, 'Leads to PR')
              ),
              React.createElement('p', { style: { fontSize:12, color:'#9CA3AF', lineHeight:1.5 } }, vp.notes)
            )
          )
        ),

        // Key data snapshot
        React.createElement('div', { className: 'deep-card' },
          React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:16 } },
            React.createElement('h3', { className: 'deep-card-title', style: { marginBottom:0 } }, 'Key Data'),
            React.createElement('span', { style: { fontSize:10, color:'#4B5563', fontFamily:'JetBrains Mono,monospace' } }, `Data: ${DATA_YEAR}`)
          ),
          [
            ['Monthly cost est.', `$${country.raw_data.monthly_cost_usd.toLocaleString()}`],
            ['Safety index (GPI)', country.raw_data.gpi_score.toFixed(3)],
            ['English proficiency', `${country.raw_data.ef_epi_score} / 100`],
            ['Internet speed', `${country.raw_data.ookla_mbps} Mbps median`],
            ['LGBTQ+ rights', `${country.raw_data.ilga_lgbtq_score} / 100`],
            ['Press freedom', `${country.raw_data.rsf_press_freedom} / 100`],
          ].map(([label, val]) =>
            React.createElement('div', { key: label, style: { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #1C2330' } },
              React.createElement('span', { style: { fontSize:13, color:'#9CA3AF' } }, label),
              React.createElement('span', { style: { fontSize:13, color:'#F9FAFB', fontFamily:'JetBrains Mono,monospace' } }, val)
            )
          ),
          React.createElement('div', { style: { marginTop:12, padding:'10px 12px', background:'#0A0E14', borderRadius:6 } },
            React.createElement('div', { style: { fontSize:10, color:'#4B5563', fontFamily:'JetBrains Mono,monospace', marginBottom:6 } }, 'SOURCES'),
            Object.values(DATA_SOURCES).map(({ label, source, year }) =>
              React.createElement('div', { key: label, style: { fontSize:10, color:'#4B5563', marginBottom:2 } },
                React.createElement('span', { style: { color:'#6B7280' } }, `${label}: `),
                `${source} (${year})`
              )
            )
          )
        )
      )
    )
  );
}

Object.assign(window, { ResultsView });
