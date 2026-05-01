"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Globe as GlobeIcon, BarChart3 } from "lucide-react";
import GlobeViewer from "./GlobeViewer";

interface LandingViewProps {
  onStart: () => void;
}

export default function LandingView({ onStart }: LandingViewProps) {
  return (
    <div className="landing-wrapper h-screen overflow-y-auto scroll-smooth">
      <div className="landing relative min-h-screen">
        <div className="landing-content">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[12px] text-accent-green font-mono tracking-[0.15em] mb-6 uppercase"
          >
            CountryDNA
          </motion.div>
          
          <h1 className="landing-headline">
            Find the country<br />
            <span className="text-accent-green italic">built for your life</span>
          </h1>
          
          <p className="landing-sub">
            A 13-question profiling quiz that matches you to your ideal country for relocation — based on real data, not guesswork.
          </p>
          
          <div className="flex flex-wrap gap-6 mb-10 text-text-secondary text-[13px]">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-accent-green" />
              <span>~4 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <GlobeIcon size={16} className="text-accent-green" />
              <span>195 countries analysed</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-accent-green" />
              <span>10 data dimensions</span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="btn-hero"
          >
            Begin your match <ArrowRight size={18} className="ml-2" />
          </motion.button>
          
          <p className="mt-4 text-[12px] text-text-muted">
            No account required. Results are yours to keep.
          </p>
        </div>
        
        <div className="landing-globe">
          <GlobeViewer 
            isResults={false}
            activeStep={0}
          />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted animate-bounce md:left-20 md:translate-x-0 md:items-start">
          <span className="text-[10px] font-mono uppercase tracking-widest">How it works</span>
          <ArrowRight size={14} className="rotate-90" />
        </div>
      </div>

      {/* ── HOW IT WORKS ────────────────────────────────────────── */}
      <section className="bg-bg-surface border-y border-bg-elevated py-24 px-8 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl mb-16 text-center md:text-left">Three steps to your perfect match</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-bg-elevated rounded-lg flex items-center justify-center text-accent-green border border-bg-elevated">
                <BarChart3 size={20} />
              </div>
              <h3 className="font-semibold text-lg">1. Build your profile</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Answer 13 targeted questions about your lifestyle, budget, and non-negotiables. We don't just ask where you want to go — we ask how you want to live.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 bg-bg-elevated rounded-lg flex items-center justify-center text-accent-green border border-bg-elevated">
                <GlobeIcon size={20} />
              </div>
              <h3 className="font-semibold text-lg">2. Real-time matching</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Our engine filters 195 countries against your constraints in real-time. We eliminate matches that don't meet your safety, visa, or budget requirements.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 bg-bg-elevated rounded-lg flex items-center justify-center text-accent-green border border-bg-elevated">
                <ArrowRight size={20} />
              </div>
              <h3 className="font-semibold text-lg">3. Deep-dive insights</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Get a ranked list with verified visa pathways, cost-of-living breakdowns, and data snapshots to help you make a confident decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PREVIEW SECTION ─────────────────────────────────────── */}
      <section className="py-24 px-8 md:px-20 bg-bg-primary">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-block px-3 py-1 bg-accent-green/10 border border-accent-green/20 rounded text-accent-green text-[10px] font-mono uppercase tracking-wider">
              Product Preview
            </div>
            <h2 className="font-display text-4xl leading-tight">Data-driven transparency, not marketing fluff.</h2>
            <p className="text-text-secondary leading-relaxed">
              Every match includes a breakdown of why it fits and — more importantly — what to watch out for. We source our data from official government references and verified indexes.
            </p>
            <div className="space-y-3">
              {[
                "Verified Visa Pathways & requirements",
                "Monthly cost of living estimates",
                "Safety, Stability & Digital Infrastructure scores",
                "Real-time What-If scenario testing"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md">
            <div className="bg-bg-surface border border-bg-elevated rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-accent-green/20 flex items-center justify-center text-accent-green font-bold">PT</div>
                  <span className="font-semibold">Portugal</span>
                </div>
                <div className="text-xs font-mono text-accent-green">94% Match</div>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-bg-elevated rounded-lg space-y-2">
                  <div className="text-[10px] font-mono text-accent-green uppercase tracking-wider">Why it fits</div>
                  <div className="text-xs text-text-secondary italic">"Strong tech ecosystem for founders with a high safety threshold."</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border border-bg-elevated rounded-lg space-y-1">
                    <div className="text-[10px] font-mono text-text-muted uppercase">Monthly Cost</div>
                    <div className="text-sm font-semibold">$2,450</div>
                  </div>
                  <div className="p-3 border border-bg-elevated rounded-lg space-y-1">
                    <div className="text-[10px] font-mono text-text-muted uppercase">Digital Infra</div>
                    <div className="text-sm font-semibold text-accent-blue">8.4 / 10</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-bg-elevated">
                <button className="w-full py-2 bg-bg-elevated rounded-lg text-xs font-semibold hover:bg-bg-elevated/80 transition-colors">
                  View full deep-dive
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER / LEGAL ──────────────────────────────────────── */}
      <footer className="py-12 px-8 md:px-20 border-t border-bg-elevated bg-bg-surface">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-md space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-text-muted">CountryDNA</div>
            <p className="text-[11px] text-text-muted leading-relaxed uppercase">
              CountryDNA provides data-driven matching for informational purposes. 
              We are not a legal, tax, or immigration advisory service. Always verify 
              official requirements with relevant government authorities before making relocation decisions.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <div className="text-[11px] text-text-muted">© 2026 CountryDNA. Built for builders.</div>
            <button onClick={onStart} className="text-xs text-accent-green hover:underline">Start the quiz</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
