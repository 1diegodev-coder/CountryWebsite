// CountryDNA — Main App Component

const { useState: useStateA, useEffect: useEffectA, useCallback: useCallbackA, useRef: useRefA, useMemo: useMemoA } = React;

// ─── TWEAKS ──────────────────────────────────────────────────────────────────
function TweaksPanel({ tweaks, onChange }) {
  const [open, setOpen] = useStateA(false);

  useEffectA(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  // Sync accent colour to CSS custom property so all CSS-based elements update
  useEffectA(() => {
    document.documentElement.style.setProperty('--accent-green', tweaks.accentColor || '#4ADE80');
  }, [tweaks.accentColor]);

  const set = (key, value) => {
    onChange({ ...tweaks, [key]: value });
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
  };

  const ac = tweaks.accentColor || '#4ADE80';

  return React.createElement(React.Fragment, null,
    // Gear button — always visible
    React.createElement('button', {
      onClick: () => setOpen(o => !o),
      title: 'Customise appearance',
      style: {
        position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
        width: 40, height: 40, borderRadius: '50%',
        background: open ? ac : '#13181F',
        border: `1px solid ${open ? ac : '#1C2330'}`,
        color: open ? '#0A0E14' : '#9CA3AF',
        fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        transition: 'all 0.2s', cursor: 'pointer',
      }
    }, '⚙'),

    // Panel — shown when open
    open && React.createElement('div', {
      style: {
        position: 'fixed', bottom: 72, right: 24, zIndex: 9999,
        background: '#13181F', border: '1px solid #1C2330',
        borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        width: 260, overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
        animation: 'slideUp 0.2s ease',
      }
    },
      // Header
      React.createElement('div', {
        style: { padding: '12px 16px', background: '#1C2330', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
      },
        React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: ac, letterSpacing: '0.1em' } }, 'TWEAKS'),
        React.createElement('button', {
          onClick: () => setOpen(false),
          style: { color: '#4B5563', fontSize: 16, lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px' }
        }, '✕')
      ),

      // Body
      React.createElement('div', { style: { padding: 16, display: 'flex', flexDirection: 'column', gap: 18 } },

        // Accent colour
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 11, color: '#9CA3AF', marginBottom: 8, fontWeight: 600 } }, 'ACCENT COLOUR'),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            [['#4ADE80','Green'],['#60A5FA','Blue'],['#FBBF24','Amber'],['#F472B6','Pink']].map(([color, label]) =>
              React.createElement('button', {
                key: color,
                onClick: () => set('accentColor', color),
                title: label,
                style: {
                  width: 28, height: 28, borderRadius: '50%', background: color,
                  border: tweaks.accentColor === color ? '3px solid white' : '3px solid transparent',
                  cursor: 'pointer', transition: 'border 0.15s', flexShrink: 0
                }
              })
            )
          )
        ),

        // Card density
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 11, color: '#9CA3AF', marginBottom: 8, fontWeight: 600 } }, 'CARD DENSITY'),
          React.createElement('div', { style: { display: 'flex', gap: 6 } },
            ['comfortable', 'compact'].map(d => {
              const active = tweaks.cardDensity === d;
              return React.createElement('button', {
                key: d,
                onClick: () => set('cardDensity', d),
                style: {
                  flex: 1, padding: '6px 0', fontSize: 12, fontWeight: 600,
                  borderRadius: 6,
                  border: active ? `1px solid ${ac}` : '1px solid #1C2330',
                  background: active ? `${ac}1A` : '#1C2330',
                  color: active ? ac : '#9CA3AF',
                  cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.15s'
                }
              }, d);
            })
          )
        ),

        // Min match filter
        React.createElement('div', null,
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } },
            React.createElement('span', { style: { fontSize: 11, color: '#9CA3AF', fontWeight: 600 } }, 'HIDE BELOW'),
            React.createElement('span', { style: { fontSize: 11, color: '#F9FAFB', fontFamily: 'JetBrains Mono, monospace' } }, `${tweaks.minMatchPct}%`)
          ),
          React.createElement('input', {
            type: 'range', min: 0, max: 90, step: 5, value: tweaks.minMatchPct,
            onChange: e => set('minMatchPct', +e.target.value),
            style: { width: '100%', accentColor: ac }
          })
        ),

        // Globe auto-rotate
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('span', { style: { fontSize: 11, color: '#9CA3AF', fontWeight: 600 } }, 'GLOBE AUTO-ROTATE'),
          React.createElement('button', {
            onClick: () => set('globeRotate', !tweaks.globeRotate),
            style: {
              width: 40, height: 22, borderRadius: 11,
              background: tweaks.globeRotate ? ac : '#374151',
              border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s'
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: 3, left: tweaks.globeRotate ? 21 : 3,
                width: 16, height: 16, borderRadius: '50%', background: 'white',
                transition: 'left 0.2s'
              }
            })
          )
        ),

        // Show match bars
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('span', { style: { fontSize: 11, color: '#9CA3AF', fontWeight: 600 } }, 'MATCH BARS'),
          React.createElement('button', {
            onClick: () => set('showBars', !tweaks.showBars),
            style: {
              width: 40, height: 22, borderRadius: 11,
              background: tweaks.showBars ? ac : '#374151',
              border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s'
            }
          },
            React.createElement('div', {
              style: {
                position: 'absolute', top: 3, left: tweaks.showBars ? 21 : 3,
                width: 16, height: 16, borderRadius: '50%', background: 'white',
                transition: 'left 0.2s'
              }
            })
          )
        )
      )
    )
  );
}

// ─── TOAST MANAGER ───────────────────────────────────────────────────────────
function useToasts() {
  const [toasts, setToasts] = useStateA([]);
  const addToast = useCallbackA((count, reason) => {
    const id = Date.now();
    setToasts(t => [...t.slice(-2), { id, count, reason }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);
  return [toasts, addToast];
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
function App() {
  const [tweaks, setTweaks] = useStateA(TWEAK_DEFAULTS);
  const [screen, setScreen] = useStateA(() => {
    try { return localStorage.getItem('cdna_screen') || 'landing'; } catch(e) { return 'landing'; }
  });
  const [answers, setAnswers] = useStateA(() => {
    try { return JSON.parse(localStorage.getItem('cdna_answers') || '{}'); } catch(e) { return {}; }
  });
  const [engineResult, setEngineResult] = useStateA(() => {
    try { return JSON.parse(localStorage.getItem('cdna_result') || 'null'); } catch(e) { return null; }
  });
  const [overrides, setOverrides] = useStateA([]);
  const [liveCount, setLiveCount] = useStateA(COUNTRIES.length);
  const [toasts, addToast] = useToasts();
  const [resumeStep, setResumeStep] = useStateA(() => {
    try { return parseInt(localStorage.getItem('cdna_resume_step') || '0', 10) || 0; } catch(e) { return 0; }
  });
  const prevCountRef = useRefA(COUNTRIES.length);

  // Persist state
  useEffectA(() => {
    try { localStorage.setItem('cdna_screen', screen); } catch(e) {}
  }, [screen]);
  useEffectA(() => {
    try { localStorage.setItem('cdna_answers', JSON.stringify(answers)); } catch(e) {}
  }, [answers]);

  // Restore shared results from URL hash (#s=<base64>)
  useEffectA(() => {
    try {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#s=')) {
        const decoded = JSON.parse(atob(hash.slice(3)));
        if (decoded && typeof decoded === 'object') {
          setAnswers(decoded);
          const result = runMatchingEngine(decoded, []);
          setEngineResult(result);
          setScreen('results');
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    } catch(e) {}
  }, []);

  const handleAnswer = useCallbackA((questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Recompute live count
    try {
      const newCount = getLiveCount(newAnswers);
      if (newCount !== prevCountRef.current) {
        const diff = prevCountRef.current - newCount;
        if (diff > 0) {
          const q = QUESTIONS.find(q => q.id === questionId);
          addToast(newCount, `Narrowed by ${diff} · ${q?.question?.slice(0, 40)}...`);
        }
        prevCountRef.current = newCount;
        setLiveCount(newCount);
      }
    } catch(e) {}
  }, [answers, addToast]);

  const handleComplete = useCallbackA((fromStep) => {
    try {
      const result = runMatchingEngine(answers, overrides);
      setEngineResult(result);
      const resume = (fromStep && fromStep < QUESTIONS.length) ? fromStep : 0;
      setResumeStep(resume);
      try {
        localStorage.setItem('cdna_result', JSON.stringify(result));
        localStorage.setItem('cdna_resume_step', String(resume));
      } catch(e) {}
      setScreen('results');
    } catch(e) {
      console.error('Engine error:', e);
    }
  }, [answers, overrides]);

  const handleContinueQuiz = useCallbackA(() => {
    setScreen('quiz');
  }, []);

  const handleOverride = useCallbackA((code) => {
    const newOverrides = [...new Set([...overrides, code])];
    setOverrides(newOverrides);
    if (engineResult) {
      try {
        const result = runMatchingEngine(answers, newOverrides);
        setEngineResult(result);
      } catch(e) {}
    }
  }, [overrides, answers, engineResult]);

  const handleRetake = useCallbackA(() => {
    setAnswers({});
    setOverrides([]);
    setEngineResult(null);
    setResumeStep(0);
    setLiveCount(COUNTRIES.length);
    prevCountRef.current = COUNTRIES.length;
    try {
      localStorage.removeItem('cdna_answers');
      localStorage.removeItem('cdna_result');
      localStorage.removeItem('cdna_screen');
      localStorage.removeItem('cdna_resume_step');
    } catch(e) {}
    setScreen('quiz');
  }, []);

  if (screen === 'landing') {
    return React.createElement(LandingView, { onStart: () => setScreen('quiz') });
  }

  if (screen === 'quiz') {
    const startStep = resumeStep > 0 ? resumeStep : Math.max(1, Object.keys(answers).length);
    return React.createElement('div', null,
      React.createElement(QuizView, {
        answers, onAnswer: handleAnswer,
        onComplete: handleComplete,
        liveCount, toasts,
        initialStep: startStep
      }),
      React.createElement(TweaksPanel, { tweaks, onChange: setTweaks })
    );
  }

  if (screen === 'results' && engineResult) {
    const answeredCount = Object.keys(answers).length;
    const isIncomplete = answeredCount < QUESTIONS.length;
    const continueStep = resumeStep > 0 ? resumeStep : (isIncomplete ? answeredCount + 1 : 0);
    return React.createElement('div', null,
      React.createElement(ResultsView, {
        engineResult, answers,
        onRetake: handleRetake,
        overrides, onOverride: handleOverride,
        onContinueQuiz: handleContinueQuiz,
        continueStep,
        isPartial: isIncomplete,
        tweaks
      }),
      React.createElement(TweaksPanel, { tweaks, onChange: setTweaks })
    );
  }

  // Fallback
  if (screen === 'results' && !engineResult) {
    setScreen('quiz');
    return null;
  }

  return null;
}

// Mount
const rootEl = document.getElementById('app');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(React.createElement(App));
}
