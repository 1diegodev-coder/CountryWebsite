"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw, Share2, MapPin, Check, AlertTriangle, TrendingUp, Globe, Info, Sliders, X } from "lucide-react";
import GlobeViewer from "./GlobeViewer";
import { MatchPayload, EliminatedCountry } from "../lib/schema/match";
import { UserProfile } from "../lib/schema/profile";

interface ResultsViewProps {
  result: MatchPayload;
  onRetake: () => void;
  tweaks: any;
  profile: UserProfile;
  onUpdateResult: (newResult: MatchPayload) => void;
  onUpdateProfile?: (newProfile: UserProfile) => void;
  isReadOnly?: boolean;
}

export default function ResultsView({ 
  result, 
  onRetake, 
  tweaks, 
  profile, 
  onUpdateResult, 
  onUpdateProfile,
  isReadOnly = false 
}: ResultsViewProps) {
  const [activeTab, setActiveTab] = React.useState("insights");
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isWhatIfLoading, setIsWhatIfLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    code: string;
    initialSection?: "overview" | "visa";
  } | null>(null);

  const groupedEliminated = React.useMemo(() => {
    return result.eliminated.reduce((acc, curr) => {
      if (!acc[curr.reason]) acc[curr.reason] = [];
      acc[curr.reason].push(curr);
      return acc;
    }, {} as Record<string, EliminatedCountry[]>);
  }, [result.eliminated]);

  const eliminatedCodes = React.useMemo(() => 
    result.eliminated.map(e => e.countryCode), 
  [result.eliminated]);

  const [showShareModal, setShowShareModal] = useState(false);

  const handleShare = async () => {
    // In a real app, the token is already in result.sessionToken from the initial match
    const url = `${window.location.origin}/r/${result.sessionToken}`;
    setShareUrl(url);
    setShowShareModal(true);
  };

  const copyToClipboard = async () => {
    if (shareUrl) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setIsSharing(true);
        setTimeout(() => setIsSharing(false), 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    }
  };

  const handleWhatIf = async (key: string, value: any) => {
    setIsWhatIfLoading(true);
    try {
      const updatedProfile = { ...profile, [key]: value };
      const response = await fetch("/api/whatif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: updatedProfile }),
      });
      if (response.ok) {
        const newResult = await response.json();
        onUpdateResult({ ...newResult, sessionToken: result.sessionToken });
        onUpdateProfile?.(updatedProfile);
      }
    } catch (e) {
      console.error("What-if error", e);
    } finally {
      setIsWhatIfLoading(false);
    }
  };

  const handleOverride = async (code: string) => {
    const currentOverrides = (profile as any).overrides || [];
    const isAlreadyOverridden = currentOverrides.includes(code);
    const newOverrides = isAlreadyOverridden 
      ? currentOverrides.filter((c: string) => c !== code)
      : [...currentOverrides, code];
    
    handleWhatIf("overrides", newOverrides);
  };

  return (
    <div className="results-layout">
      <header className="results-header">
        <div className="flex items-center gap-3">
          <Globe size={20} className="text-accent-green" />
          <span className="font-display text-lg tracking-tight">CountryDNA</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={onRetake} className="btn-ghost btn-sm">
            <RefreshCcw size={14} className="mr-2" /> {isReadOnly ? "Take Your Own Quiz" : "Retake Quiz"}
          </button>
          {!isReadOnly && (
            <button 
              onClick={handleShare} 
              disabled={isSharing || !result.shareReady}
              className={`btn-primary btn-sm ${isSharing || !result.shareReady ? "opacity-50 cursor-not-allowed" : ""}`}
              title={!result.shareReady ? "Sharing is temporarily unavailable" : ""}
            >
              <Share2 size={14} className="mr-2" /> 
              {isSharing ? "Copied!" : "Share Results"}
            </button>
          )}
        </div>
      </header>

      {!isReadOnly && !result.shareReady && (
        <div className="bg-accent-warning/10 border-b border-accent-warning/20 px-6 py-2 flex items-center gap-2">
          <AlertTriangle size={14} className="text-accent-warning" />
          <span className="text-[10px] text-accent-warning uppercase tracking-wider font-semibold">
            Cloud Sync Offline: Share flow is disabled, but your results are saved locally.
          </span>
        </div>
      )}

      <div className="mirror-banner">
        <p className="mirror-text">
          {result.profileSummary}
        </p>
      </div>

      <div className="results-body">
        {/* Left: Globe & Stats */}
        <div className="results-globe-panel">
          <div className="globe-wrap">
            <GlobeViewer 
              isResults={true} 
              matchResults={result.matches} 
              eliminatedCodes={eliminatedCodes}
            />
          </div>
          <div className="globe-stats">
            <div className="globe-stat">
              <div className="text-xl font-mono text-accent-green">{result.candidateCount}</div>
              <div className="text-[10px] text-text-muted uppercase tracking-widest">Candidates</div>
            </div>
            <div className="globe-stat">
              <div className="text-xl font-mono text-text-muted">{result.eliminatedCount}</div>
              <div className="text-[10px] text-text-muted uppercase tracking-widest">Eliminated</div>
            </div>
          </div>
        </div>

        {/* Center: Match Cards */}
        <div className="match-cards-panel">
          <div className="match-cards-grid">
            {result.matches.map((match, i) => {
              return (
                <motion.div
                  key={match.countryCode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`match-card ${i === 0 ? "top-match" : ""}`}
                >
                  <div className="card-header">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">🌍</span>
                        <h3 className="text-lg font-bold">{match.countryName}</h3>
                        <span className="text-[10px] font-mono text-text-muted bg-bg-elevated px-1.5 py-0.5 rounded uppercase">
                          {match.countryCode}
                        </span>
                        {match.dataConfidence !== "high" && (
                          <span
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-accent-warning bg-accent-warning/10 border border-accent-warning/20 px-1.5 py-0.5 rounded uppercase"
                            title="This country uses lower-confidence source data and should be reviewed before making decisions."
                          >
                            <Info size={10} />
                            {match.dataConfidence} confidence
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed max-w-md">
                        {match.countryDescriptor}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-mono font-bold text-accent-green">
                        {match.score}%
                      </div>
                      <div className="text-[10px] text-text-muted uppercase tracking-widest">Best Fit</div>
                    </div>
                  </div>

                  <div className="match-bar-outer my-4">
                    <motion.div 
                      className="match-bar-inner bg-accent-green" 
                      initial={{ width: 0 }}
                      animate={{ width: `${match.score}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div className="card-section">
                      <h4 className="card-section-title green">WHY IT FITS</h4>
                      <ul className="space-y-2">
                        {match.whyFit.map((bullet, idx) => (
                          <li key={idx} className="bullet green">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="card-section">
                      <h4 className="card-section-title amber">WATCH OUT</h4>
                      <ul className="space-y-2">
                        {match.watchOut.map((bullet, idx) => (
                          <li key={idx} className="bullet amber">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="card-cost mt-4">
                    <TrendingUp size={14} className="text-accent-green" />
                    <span className="font-medium">{match.costRealityText}</span>
                  </div>

                  <div className="card-actions mt-4 pt-4 border-t border-bg-elevated flex gap-3">
                    <button 
                      className="btn-card-primary"
                      onClick={() => setSelectedCountry({ code: match.countryCode, initialSection: "overview" })}
                    >
                      Deep Dive Details
                    </button>
                    <button
                      className="btn-card-ghost"
                      onClick={() => setSelectedCountry({ code: match.countryCode, initialSection: "visa" })}
                    >
                      Visa Guide
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: Insights & Filters */}
        <div className="side-panel bg-bg-surface/30">
          <div className="side-tabs">
            <button 
              className={`side-tab ${activeTab === "insights" ? "active" : ""}`}
              onClick={() => setActiveTab("insights")}
            >
              INSIGHTS
            </button>
            {!isReadOnly && (
              <button 
                className={`side-tab ${activeTab === "whatif" ? "active" : ""}`}
                onClick={() => setActiveTab("whatif")}
              >
                WHAT-IF
              </button>
            )}
            <button 
              className={`side-tab ${activeTab === "eliminated" ? "active" : ""}`}
              onClick={() => setActiveTab("eliminated")}
            >
              ELIM ({result.eliminated.length})
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {activeTab === "insights" && (
              <div className="p-6">
                <h4 className="text-[11px] font-mono text-text-muted uppercase tracking-widest mb-4">Weighting Modifiers</h4>
                <div className="space-y-4">
                  {Object.entries(result.computedWeights).map(([dim, weight]) => (
                    <div key={dim} className="space-y-1">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-text-secondary capitalize">{dim.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-mono text-accent-green">{(weight * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-1 bg-bg-elevated rounded-full overflow-hidden">
                        <div className="h-full bg-accent-green" style={{ width: `${weight * 500}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "whatif" && (
              <div className="p-6 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[11px] font-mono text-text-muted uppercase tracking-widest">Adjust Budget</h4>
                    <span className="text-[11px] font-mono text-accent-green">${profile.budgetUsdMonthly}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="15000"
                    step="500"
                    value={profile.budgetUsdMonthly}
                    onChange={(e) => handleWhatIf("budgetUsdMonthly", parseInt(e.target.value))}
                    className="w-full h-1 bg-bg-elevated rounded-lg appearance-none cursor-pointer accent-accent-green"
                  />
                  <p className="text-[10px] text-text-muted leading-relaxed italic">
                    Increasing your budget may rescue countries previously eliminated for cost.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[11px] font-mono text-text-muted uppercase tracking-widest">Language & Health</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-text-secondary uppercase">English Only</span>
                      <button 
                        onClick={() => handleWhatIf("languageFlexibility", profile.languageFlexibility === "englishOnly" ? "openToLearning" : "englishOnly")}
                        className={`w-8 h-4 rounded-full transition-colors relative ${profile.languageFlexibility === "englishOnly" ? "bg-accent-green" : "bg-bg-elevated"}`}
                      >
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${profile.languageFlexibility === "englishOnly" ? "left-4.5" : "left-0.5"}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-text-secondary uppercase">Chronic Care</span>
                      <button 
                        onClick={() => handleWhatIf("healthcareNeed", profile.healthcareNeed === "chronic" ? "general" : "chronic")}
                        className={`w-8 h-4 rounded-full transition-colors relative ${profile.healthcareNeed === "chronic" ? "bg-accent-green" : "bg-bg-elevated"}`}
                      >
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${profile.healthcareNeed === "chronic" ? "left-4.5" : "left-0.5"}`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[11px] font-mono text-text-muted uppercase tracking-widest">Non-Negotiables</h4>
                  <div className="flex flex-wrap gap-2">
                    {(["lgbtq", "pressFreedom", "lowTax"] as const).map(nn => (
                      <button
                        key={nn}
                        onClick={() => {
                          const current = profile.nonNegotiables || [];
                          const next = current.includes(nn as any) ? current.filter(x => x !== nn) : [...current, nn];
                          handleWhatIf("nonNegotiables", next);
                        }}
                        className={`text-[10px] px-2 py-1 rounded border transition-colors ${
                          profile.nonNegotiables?.includes(nn) 
                            ? "bg-accent-green/10 border-accent-green text-accent-green" 
                            : "border-bg-elevated text-text-muted hover:border-text-muted"
                        }`}
                      >
                        {nn}
                      </button>
                    ))}
                  </div>
                </div>

                {isWhatIfLoading && (
                  <div className="flex items-center gap-2 text-accent-green text-[10px] font-mono animate-pulse">
                    <RefreshCcw size={10} className="animate-spin" />
                    Recalculating...
                  </div>
                )}
              </div>
            )}

            {activeTab === "eliminated" && (
              <div className="elim-log">
                {Object.entries(groupedEliminated).map(([reason, items]) => (
                  <div key={reason} className="elim-group">
                    <div className="bg-bg-elevated/50 px-4 py-2 text-[10px] font-mono text-accent-warning uppercase tracking-widest border-b border-bg-elevated">
                      {reason} ({items.length})
                    </div>
                    {items.map((elim, idx) => {
                      const isOverridden = ((profile as any).overrides || []).includes(elim.countryCode);
                      
                      return (
                        <div key={idx} className="elim-country border-b border-bg-elevated hover:bg-bg-elevated/30 p-4">
                          <div className="flex items-start justify-between gap-3 w-full">
                            <div className="flex items-start gap-3">
                              <span className="text-lg opacity-50">🌍</span>
                              <div>
                                <div className="text-[13px] font-semibold text-text-secondary">{elim.countryName}</div>
                                <div className="text-[11px] text-text-muted leading-relaxed">{elim.detail}</div>
                              </div>
                            </div>
                            {!isReadOnly && (
                              <button 
                                onClick={() => handleOverride(elim.countryCode)}
                                className={`text-[10px] font-mono uppercase px-2 py-1 rounded border transition-all ${
                                  isOverridden 
                                    ? "bg-accent-green text-bg-primary border-accent-green" 
                                    : "text-text-muted border-bg-elevated hover:border-text-muted"
                                }`}
                              >
                                {isOverridden ? "Active" : "Override"}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCountry && (
          <DeepDive 
            code={selectedCountry.code}
            initialSection={selectedCountry.initialSection}
            onClose={() => setSelectedCountry(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-md w-full bg-bg-surface border border-bg-elevated rounded-2xl p-8 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Share Your Results</h3>
                <button onClick={() => setShowShareModal(false)} className="text-text-muted hover:text-text-primary">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-bg-primary rounded-xl border border-bg-elevated space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <div className="text-[10px] font-mono text-accent-green uppercase tracking-widest">Your Top Match</div>
                      <div className="text-lg font-bold">{result.matches[0].countryName}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {result.matches.slice(0, 3).map((m, i) => (
                      <div key={m.countryCode} className="flex justify-between items-center text-xs">
                        <span className="text-text-secondary">{i + 1}. {m.countryName}</span>
                        <span className="font-mono text-accent-green">{m.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Results Link</div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={shareUrl || ""}
                      className="flex-1 bg-bg-primary border border-bg-elevated rounded-lg px-3 py-2 text-xs font-mono"
                    />
                    <button onClick={copyToClipboard} className="btn-primary whitespace-nowrap px-4 text-xs">
                      {isSharing ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <p className="text-[10px] text-text-muted italic">
                    Anyone with this link can view your results. Results expire in 90 days.
                  </p>
                </div>

                <button 
                  className="w-full btn-ghost border-bg-elevated"
                  onClick={() => alert("PNG Card Export is currently in development for V1.1. Please use the 'Share Results' link for now.")}
                >
                  Download Shareable Card (PNG)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <footer className="p-8 border-t border-bg-elevated mt-12 bg-bg-surface/10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-2 text-text-muted">
            <Info size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Legal Disclaimer</span>
          </div>
          <p className="text-[10px] text-text-muted leading-relaxed max-w-2xl">
            CountryDNA provides match estimates for informational purposes only. Scoring is relative and based on generalized country data which may change without notice. These results do not constitute legal, tax, or immigration advice. Always consult with official government sources and qualified professionals before making relocation decisions.
          </p>
          <div className="text-[9px] text-text-muted/50 font-mono">
            V1.0.5 STABLE-BETA • DATA UPDATED {result.generatedAt.split('T')[0]}
          </div>
        </div>
      </footer>
    </div>
  );
}

function DeepDive({
  code,
  initialSection = "overview",
  onClose,
}: {
  code: string;
  initialSection?: "overview" | "visa";
  onClose: () => void;
}) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const visaSectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/countries/${code}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch country details");
        return res.json();
      })
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("We couldn't load the details for this country. Please try again later.");
        setLoading(false);
      });
  }, [code]);

  React.useEffect(() => {
    if (!loading && initialSection === "visa") {
      visaSectionRef.current?.scrollIntoView({ block: "start" });
    }
  }, [initialSection, loading]);

  const hasConfidenceCaveat = data?.dataConfidence && data.dataConfidence !== "high";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-end bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-xl h-full bg-bg-surface border-l border-bg-elevated shadow-2xl overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8 pb-20">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">🌍</span>
                <h2 className="text-3xl font-bold font-display">{data?.name || code}</h2>
              </div>
              {data && (
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-[10px] font-mono text-text-muted uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={10} className="text-accent-green" />
                    <span>{data.capitalCity}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe size={10} className="text-accent-green" />
                    <span>{data.currency.code} ({data.currency.name})</span>
                  </div>
                </div>
              )}
              <p className="text-text-secondary">{data?.descriptor}</p>
              {hasConfidenceCaveat && (
                <div className="mt-4 space-y-2">
                  <div className="inline-flex items-center gap-1 text-[10px] font-mono text-accent-warning bg-accent-warning/10 border border-accent-warning/20 px-2 py-1 rounded uppercase">
                    <Info size={10} />
                    {data.dataConfidence} confidence
                  </div>
                  <p className="text-[11px] text-accent-warning/90 leading-relaxed max-w-sm">
                    {data.dataConfidence === "medium"
                      ? "Some country-level data uses blended or estimated sources. Verify details before making decisions."
                      : "This country has limited or unstable source data. Treat scores as directional and verify details before making decisions."
                    }
                  </p>
                </div>
              )}
            </div>
            <button onClick={onClose} className="p-2 hover:bg-bg-elevated rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-40 bg-bg-elevated rounded-xl" />
              <div className="h-8 w-1/2 bg-bg-elevated rounded" />
              <div className="h-32 bg-bg-elevated rounded-xl" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <AlertTriangle size={48} className="text-accent-warning opacity-50" />
              <p className="text-text-secondary max-w-xs">{error}</p>
              <button onClick={onClose} className="btn-ghost btn-sm border-bg-elevated">Close</button>
            </div>
          ) : (
            <div className="space-y-10">
              <section>
                <h3 className="text-[11px] font-mono text-text-muted uppercase tracking-widest mb-4">Cost Breakdown</h3>
                <div className="grid grid-cols-2 gap-4">
                  {data?.costBreakdown && Object.entries(data.costBreakdown).map(([key, val]) => (
                    key !== 'totalEstimateUsd' && (
                      <div key={key} className="p-4 bg-bg-elevated/50 rounded-xl border border-bg-elevated">
                        <div className="text-[10px] text-text-muted uppercase mb-1">{key.replace('Usd', '')}</div>
                        <div className="text-lg font-mono font-bold">${val as number}</div>
                      </div>
                    )
                  ))}
                  <div className="col-span-2 p-4 bg-accent-green/5 rounded-xl border border-accent-green/20">
                    <div className="text-[10px] text-accent-green uppercase mb-1">Total Monthly Estimate</div>
                    <div className="text-2xl font-mono font-bold text-accent-green">${data?.costBreakdown?.totalEstimateUsd}</div>
                  </div>
                </div>
              </section>

              <section ref={visaSectionRef}>
                <h3 className="text-[11px] font-mono text-text-muted uppercase tracking-widest mb-4">Visa Pathways</h3>
                {data?.visaPathways?.length ? (
                  <div className="space-y-4">
                    {data.visaPathways.map((pathway: any) => (
                      <div key={pathway.pathwayId} className="p-5 bg-bg-elevated/40 rounded-xl border border-bg-elevated space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-sm font-bold text-text-primary">{pathway.name}</h4>
                            <div className="text-[10px] font-mono text-text-muted uppercase mt-1">
                              {pathway.visaType.replace(/-/g, " ")} • Difficulty {pathway.difficultyRating}/5
                            </div>
                          </div>
                          <a
                            href={pathway.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] font-mono text-accent-green uppercase hover:underline"
                          >
                            Source
                          </a>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-[11px]">
                          <div>
                            <div className="text-text-muted uppercase mb-1">Duration</div>
                            <div className="font-mono">{pathway.durationMonths} months</div>
                          </div>
                          <div>
                            <div className="text-text-muted uppercase mb-1">Processing</div>
                            <div className="font-mono">{pathway.processingWeeks[0]}-{pathway.processingWeeks[1]} weeks</div>
                          </div>
                          <div>
                            <div className="text-text-muted uppercase mb-1">Renewable</div>
                            <div className="font-mono">{pathway.renewable ? "Yes" : "No"}</div>
                          </div>
                          <div>
                            <div className="text-text-muted uppercase mb-1">Residency Path</div>
                            <div className="font-mono">
                              {pathway.leadsToResidency
                                ? `${pathway.residencyYearsRequired ?? "Varies"} years`
                                : "No"}
                            </div>
                          </div>
                        </div>
                        {pathway.incomeRequirement && (
                          <div className="p-3 bg-bg-primary/40 rounded-lg border border-bg-elevated">
                            <div className="text-[10px] text-text-muted uppercase mb-1">Income Requirement</div>
                            <div className="font-mono text-sm">
                              {pathway.incomeRequirement.currencyCode} {pathway.incomeRequirement.amount.toLocaleString()} / {pathway.incomeRequirement.period}
                            </div>
                            {pathway.incomeRequirement.notes && (
                              <p className="text-[10px] text-text-muted mt-1">{pathway.incomeRequirement.notes}</p>
                            )}
                          </div>
                        )}
                        {pathway.notes && (
                          <p className="text-[11px] text-text-secondary leading-relaxed">{pathway.notes}</p>
                        )}
                        <div className="text-[9px] text-text-muted font-mono uppercase">
                          Last verified {pathway.lastVerified}
                        </div>
                      </div>
                    ))}
                    <div className="p-4 bg-accent-warning/5 rounded-xl border border-accent-warning/20 flex items-start gap-3">
                      <AlertTriangle size={14} className="text-accent-warning mt-0.5" />
                      <p className="text-[10px] text-text-muted leading-relaxed">
                        Visa information is for general guidance only and may be out of date. Always verify with official sources. This is not legal advice.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 bg-bg-elevated/20 rounded-xl border border-bg-elevated text-[11px] text-text-muted leading-relaxed">
                    Visa pathway data is not available for this country yet.
                  </div>
                )}
              </section>

              <section>
                <h3 className="text-[11px] font-mono text-text-muted uppercase tracking-widest mb-4">Core Dimensions</h3>
                <div className="space-y-4">
                  {data?.dimensions && Object.entries(data.dimensions).map(([key, val]: [string, any]) => (
                    <div key={key} className="space-y-1.5">
                      <div className="flex justify-between text-[12px]">
                        <span className="capitalize text-text-secondary">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-mono font-bold">{val}/10</span>
                      </div>
                      <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-accent-green" 
                          initial={{ width: 0 }}
                          animate={{ width: `${val * 10}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="p-6 bg-bg-elevated/20 rounded-xl border border-bg-elevated flex flex-col items-center text-center space-y-3">
                <Info size={16} className="text-text-muted" />
                <p className="text-[9px] text-text-muted leading-relaxed">
                  Scoring is relative to your specific user profile. These indicators reflect general country-level trends and may not capture regional variations or recent socio-political shifts.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
