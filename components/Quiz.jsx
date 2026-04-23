// CountryDNA — Quiz Flow Component

const { useState, useEffect, useRef, useCallback } = React;

function QuizView({ answers, onAnswer, onComplete, liveCount, toasts, initialStep }) {
  const [currentStep, setCurrentStep] = useState(initialStep || 1);
  const [selected, setSelected] = useState(null);
  const [multiSelected, setMultiSelected] = useState([]);
  const [showInterim, setShowInterim] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const totalSteps = QUESTIONS.length;

  const question = QUESTIONS.find(q => q.step === currentStep);

  // Restore from answers
  useEffect(() => {
    if (question) {
      if (question.type === 'single') setSelected(answers[question.id] ?? null);
      else setMultiSelected(answers[question.id] ?? []);
    }
  }, [currentStep]);

  const handleSingleSelect = useCallback((value) => {
    setSelected(value);
    onAnswer(question.id, value);
    // Auto-advance after 400ms
    setTimeout(() => advance(value), 480);
  }, [question, onAnswer]);

  const handleMultiToggle = useCallback((value) => {
    setMultiSelected(prev => {
      const maxSel = question.maxSelect;
      if (prev.includes(value)) {
        const next = prev.filter(v => v !== value);
        onAnswer(question.id, next);
        return next;
      }
      if (maxSel && prev.length >= maxSel) return prev;
      const next = [...prev, value];
      onAnswer(question.id, next);
      return next;
    });
  }, [question, onAnswer]);

  const advance = useCallback((overrideVal) => {
    if (transitioning) return;
    setTransitioning(true);

    // Show interim results after Q6
    if (currentStep === 6 && !showInterim) {
      setTimeout(() => {
        setShowInterim(true);
        setTransitioning(false);
      }, 300);
      return;
    }

    if (currentStep >= totalSteps) {
      setTimeout(() => { setTransitioning(false); onComplete(); }, 300);
      return;
    }

    setTimeout(() => {
      setCurrentStep(s => s + 1);
      setSelected(null);
      setMultiSelected([]);
      setTransitioning(false);
    }, 300);
  }, [currentStep, totalSteps, transitioning, showInterim, onComplete]);

  const goBack = useCallback(() => {
    if (showInterim) { setShowInterim(false); return; }
    if (currentStep > 1) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentStep(s => s - 1);
        setTransitioning(false);
      }, 200);
    }
  }, [currentStep, showInterim]);

  if (showInterim) {
    return React.createElement(InterimReveal, {
      answers, liveCount,
      onContinue: () => { setShowInterim(false); setCurrentStep(7); },
      onSeeResults: () => onComplete(7)
    });
  }

  if (!question) return null;
  const isMulti = question.type === 'multi';
  const canContinue = isMulti ? (multiSelected.length > 0 || question.optional) : selected !== null;
  const progress = (currentStep / totalSteps) * 100;

  return React.createElement('div', {
    className: 'quiz-layout',
    style: { opacity: transitioning ? 0 : 1, transition: 'opacity 0.3s ease' }
  },
    // Left panel — Question
    React.createElement('div', { className: 'quiz-left' },
      // Progress
      React.createElement('div', { className: 'quiz-progress-area' },
        React.createElement('div', { className: 'quiz-step-label', style: { display:'flex', alignItems:'center', gap:12 } },
          React.createElement('span', { style: { color:'var(--accent-green)', fontFamily:'JetBrains Mono,monospace', fontSize:12 } },
            String(currentStep).padStart(2,'0')
          ),
          React.createElement('span', { style: { color:'#4B5563', fontFamily:'JetBrains Mono,monospace', fontSize:12 } },
            ` / ${String(totalSteps).padStart(2,'0')}`
          ),
          React.createElement('span', { style: { color:'#4B5563', fontFamily:'JetBrains Mono,monospace', fontSize:11, marginLeft:4 } },
            `~${Math.max(1, Math.ceil((totalSteps - currentStep + 1) * 18 / 60))} min left`
          )
        ),
        React.createElement('div', { className: 'progress-bar-outer' },
          React.createElement('div', { className: 'progress-bar-inner', style: { width: `${progress}%` } })
        )
      ),

      // Question text
      React.createElement('div', { className: 'question-body' },
        React.createElement('h2', { className: 'question-text' }, question.question),
        question.subtitle && React.createElement('p', { className: 'question-sub' }, question.subtitle),
        isMulti && question.maxSelect && React.createElement('p', { style: { fontSize:12, color:'#4B5563', marginTop:4, fontFamily:'JetBrains Mono,monospace' } },
          `Select up to ${question.maxSelect} · ${multiSelected.length} selected`
        )
      ),

      // Options
      React.createElement('div', { className: 'options-list' },
        question.options.map(opt =>
          React.createElement(OptionCard, {
            key: opt.value,
            option: opt,
            isSelected: isMulti ? multiSelected.includes(opt.value) : selected === opt.value,
            isMulti,
            onSelect: isMulti ? () => handleMultiToggle(opt.value) : () => handleSingleSelect(opt.value)
          })
        )
      ),

      // Navigation
      React.createElement('div', { className: 'quiz-nav' },
        React.createElement('button', {
          className: 'btn-ghost',
          onClick: goBack,
          disabled: currentStep === 1 && !showInterim
        }, '← Back'),
        isMulti && React.createElement('button', {
          className: `btn-primary${!canContinue ? ' disabled' : ''}`,
          onClick: () => canContinue && advance(),
          disabled: !canContinue
        }, currentStep === totalSteps ? 'See My Results →' : 'Continue →')
      )
    ),

    // Right panel — Globe + live counter
    React.createElement('div', { className: 'quiz-right' },
      React.createElement('div', { className: 'live-counter' },
        React.createElement('span', { style: { fontSize:24 } }, '🌍'),
        React.createElement('div', null,
          React.createElement('div', { className: 'counter-number', key: liveCount }, liveCount),
          React.createElement('div', { style: { fontSize:11, color:'#9CA3AF' } }, 'countries still in')
        )
      ),
      React.createElement('div', { className: 'globe-container' },
        React.createElement(GlobeViewer, {
          matchResults: null,
          eliminatedCodes: Object.keys(answers).length > 0 ? getEliminatedCodes(answers) : [],
          activeStep: currentStep,
          isResults: false
        })
      ),
      // Toasts
      React.createElement('div', { className: 'toast-area' },
        toasts.map((t, i) => React.createElement(EliminationToast, { key: t.id, toast: t }))
      )
    )
  );
}

function getEliminatedCodes(answers) {
  try {
    const { eliminated } = window.applyHardFilters ? 
      { eliminated: COUNTRIES.filter(c => {
        const { candidates } = window.applyHardFilters ? { candidates: [] } : { candidates: [] };
        return false;
      })} : { eliminated: [] };
    // Use engine's getLiveCount to determine eliminated
    return [];
  } catch(e) { return []; }
}

function OptionCard({ option, isSelected, isMulti, onSelect }) {
  return React.createElement('button', {
    className: `option-card${isSelected ? ' selected' : ''}`,
    onClick: onSelect
  },
    React.createElement('div', { className: 'option-card-inner' },
      isMulti
        ? React.createElement('div', { className: `checkbox${isSelected ? ' checked' : ''}` },
            isSelected && React.createElement('span', null, '✓')
          )
        : React.createElement('div', { className: `radio${isSelected ? ' checked' : ''}` }),
      React.createElement('div', { className: 'option-text' },
        React.createElement('div', { className: 'option-label' }, option.label),
        option.sub && React.createElement('div', { className: 'option-sub' }, option.sub)
      )
    )
  );
}

function EliminationToast({ toast }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return React.createElement('div', { className: 'toast' },
    React.createElement('span', { style: { fontSize:18 } }, '🌍'),
    React.createElement('div', null,
      React.createElement('div', { style: { fontSize:13, color:'#F9FAFB', fontWeight:600 } },
        `Narrowed to ${toast.count} countries`
      ),
      React.createElement('div', { style: { fontSize:11, color:'#9CA3AF' } }, toast.reason)
    )
  );
}

function InterimReveal({ answers, liveCount, onContinue, onSeeResults }) {
  const topThree = React.useMemo(() => {
    try {
      const result = runMatchingEngine(answers);
      return result.matches.slice(0, 3);
    } catch(e) { return []; }
  }, [answers]);

  return React.createElement('div', { className: 'interim-overlay' },
    React.createElement('div', { className: 'interim-card' },
      React.createElement('div', { style: { fontSize:12, color:'var(--accent-green)', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.12em', marginBottom:16 } },
        'HALFWAY THERE'
      ),
      React.createElement('h2', { style: { fontSize:28, color:'#F9FAFB', fontWeight:300, marginBottom:8 } },
        'Based on what you\'ve told us so far...'
      ),
      React.createElement('div', { className: 'interim-count' },
        React.createElement('span', { style: { fontSize:48, color:'var(--accent-green)', fontFamily:'JetBrains Mono,monospace', fontWeight:700 } }, liveCount),
        React.createElement('span', { style: { fontSize:16, color:'#9CA3AF', marginLeft:12 } }, 'countries are strong contenders')
      ),
      topThree.length > 0 && React.createElement('div', { style: { marginTop:24, marginBottom:24 } },
        React.createElement('div', { style: { fontSize:11, color:'#4B5563', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.1em', marginBottom:12 } }, 'YOUR TOP 3 SO FAR'),
        React.createElement('div', { style: { display:'flex', gap:12, justifyContent:'center' } },
          topThree.map(c => React.createElement('div', { key: c.code, className: 'interim-country-chip' },
            React.createElement('span', { style: { fontSize:20 } }, c.flag),
            React.createElement('span', { style: { fontSize:13, color:'#F9FAFB' } }, c.name)
          ))
        )
      ),
      React.createElement('p', { style: { color:'#9CA3AF', fontSize:14, lineHeight:1.6, marginBottom:28 } },
        'Answer 7 more questions to get your full personalised results — with detailed reasoning for every match.'
      ),
      React.createElement('div', { style: { display:'flex', gap:12, justifyContent:'center' } },
        React.createElement('button', { className: 'btn-ghost', onClick: onSeeResults }, 'See partial results →'),
        React.createElement('button', { className: 'btn-primary', onClick: onContinue }, 'Continue quiz →')
      )
    )
  );
}

function LandingView({ onStart }) {
  const [hovered, setHovered] = useState(false);
  return React.createElement('div', { className: 'landing' },
    React.createElement('div', { className: 'landing-content' },
      React.createElement('div', { style: { fontSize:12, color:'var(--accent-green)', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.15em', marginBottom:24 } }, 'COUNTRYDNA'),
      React.createElement('h1', { className: 'landing-headline' },
        'Find the country', React.createElement('br', null),
        React.createElement('em', { style: { color:'var(--accent-green)', fontStyle:'italic' } }, 'built for your life')
      ),
      React.createElement('p', { className: 'landing-sub' },
        'A 13-question profiling quiz that matches you to your ideal country for relocation — based on real data, not guesswork.'
      ),
      React.createElement('div', { style: { display:'flex', gap:24, marginBottom:40, color:'#9CA3AF', fontSize:13 } },
        React.createElement('span', null, '⏱ ~4 minutes'),
        React.createElement('span', null, `🌍 ${COUNTRIES.length} countries analysed`),
        React.createElement('span', null, '📊 10 data dimensions')
      ),
      React.createElement('button', {
        className: 'btn-hero',
        onClick: onStart,
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false)
      }, 'Begin your match →'),
      React.createElement('p', { style: { marginTop:16, fontSize:12, color:'#4B5563' } },
        'No account required. Results are yours to keep.'
      )
    ),
    React.createElement('div', { className: 'landing-globe' },
      React.createElement(GlobeViewer, { matchResults: null, eliminatedCodes: [], activeStep: 0, isResults: false })
    )
  );
}

Object.assign(window, { QuizView, LandingView });
