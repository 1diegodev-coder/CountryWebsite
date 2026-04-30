"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Globe, MapPin, Check, Info } from "lucide-react";
import LandingView from "./LandingView";
import QuizView from "./QuizView";
import ResultsView from "./ResultsView";
import { UserProfile } from "../lib/schema/profile";
import { MatchPayload } from "../lib/schema/match";
import { trackEvent, bucketMatchCount } from "../lib/telemetry";

const STORAGE_KEYS = {
  SCREEN: "cdna_screen",
  ANSWERS: "cdna_answers",
  RESULT: "cdna_result",
  RESUME_STEP: "cdna_resume_step",
};

const TWEAK_DEFAULTS = {
  accentColor: "#4ADE80",
  cardDensity: "comfortable",
  minMatchPct: 65,
  globeRotate: true,
  showBars: true,
};

export default function App() {
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState("landing");
  const [answers, setAnswers] = useState<Partial<UserProfile>>({});
  const [engineResult, setEngineResult] = useState<MatchPayload | null>(null);
  const [resumeStep, setResumeStep] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Hydration
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedScreen = localStorage.getItem(STORAGE_KEYS.SCREEN);
      const savedAnswers = localStorage.getItem(STORAGE_KEYS.ANSWERS);
      const savedResult = localStorage.getItem(STORAGE_KEYS.RESULT);
      const savedStep = localStorage.getItem(STORAGE_KEYS.RESUME_STEP);

      if (savedScreen) setScreen(savedScreen);
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
      if (savedResult) setEngineResult(JSON.parse(savedResult));
      if (savedStep) setResumeStep(parseInt(savedStep, 10));
    } catch (e) {
      console.warn("Failed to load state from localStorage", e);
    }
  }, []);

  // Persist state
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem(STORAGE_KEYS.SCREEN, screen);
    localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
    if (engineResult) {
      localStorage.setItem(STORAGE_KEYS.RESULT, JSON.stringify(engineResult));
    }
    localStorage.setItem(STORAGE_KEYS.RESUME_STEP, resumeStep.toString());
  }, [screen, answers, engineResult, resumeStep, isMounted]);

  // Sync accent colour
  useEffect(() => {
    document.documentElement.style.setProperty("--accent-green", tweaks.accentColor);
  }, [tweaks.accentColor]);

  const handleStart = () => {
    setScreen("quiz");
    trackEvent("quiz_started");
  };

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleComplete = async () => {
    try {
      // Derive locale and languages from browser/input
      const locale = navigator.language || "en-US";
      const browserLanguages = navigator.languages ? [...navigator.languages] : [locale.split("-")[0]];

      const fullProfile = {
        ...answers,
        languages: browserLanguages,
        locale: locale,
      };

      const response = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullProfile),
      });

      if (!response.ok) throw new Error("Match request failed");

      const result = await response.json();

      // Persist the full profile used for the match
      setAnswers(fullProfile as UserProfile);
      setEngineResult(result);
      setScreen("results");

      trackEvent("quiz_completed", {
        matchCountBucket: bucketMatchCount(result.matches.length)
      });
    } catch (e) {
      console.error("Match error:", e);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setEngineResult(null);
    setResumeStep(0);
    setScreen("quiz");
    localStorage.removeItem(STORAGE_KEYS.ANSWERS);
    localStorage.removeItem(STORAGE_KEYS.RESULT);
    localStorage.removeItem(STORAGE_KEYS.RESUME_STEP);
  };

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={`min-h-screen bg-bg-primary text-text-primary overflow-x-hidden ${prefersReducedMotion ? "motion-reduce" : ""}`}>
      <AnimatePresence mode="wait">
        {screen === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingView onStart={handleStart} />
          </motion.div>
        )}

        {screen === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizView
              answers={answers}
              onAnswer={handleAnswer}
              onComplete={handleComplete}
              initialStep={resumeStep}
            />
          </motion.div>
        )}

        {screen === "results" && engineResult && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResultsView
              result={engineResult}
              onRetake={handleRetake}
              tweaks={tweaks}
              profile={answers as UserProfile}
              onUpdateResult={setEngineResult}
              onUpdateProfile={(p) => setAnswers(p)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <TweaksPanel tweaks={tweaks} onChange={setTweaks} />
    </div>
  );
}

function TweaksPanel({ tweaks, onChange }: { tweaks: any; onChange: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const set = (key: string, value: any) => {
    onChange({ ...tweaks, [key]: value });
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Simple focus trap: when open, focus the first element in tweaks panel
  useEffect(() => {
    if (isOpen) {
      const focusable = panelRef.current?.querySelectorAll('button, input');
      if (focusable && focusable.length > 0) {
        (focusable[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open UI Tweaks"
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-[9999] w-10 h-10 rounded-full flex items-center justify-center transition-all bg-bg-surface border border-bg-elevated hover:border-accent-green"
        style={{ color: isOpen ? "var(--accent-green)" : "var(--text-secondary)" }}
      >
        <Settings size={20} className={isOpen ? "animate-spin-slow" : ""} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 z-[9999] w-64 bg-bg-surface border border-bg-elevated rounded-xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-label="UI Tweaks Panel"
          >
            <div className="p-3 bg-bg-elevated flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-widest text-accent-green uppercase">Tweaks</span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
                className="text-text-muted hover:text-text-primary"
                aria-label="Close Tweaks"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-4 space-y-6">
              <div>
                <label id="accent-color-label" className="text-[11px] font-semibold text-text-secondary uppercase mb-3 block">Accent Color</label>
                <div className="flex gap-2" role="group" aria-labelledby="accent-color-label">
                  {[
                    { hex: "#4ADE80", name: "Green" },
                    { hex: "#60A5FA", name: "Blue" },
                    { hex: "#FBBF24", name: "Yellow" },
                    { hex: "#F472B6", name: "Pink" }
                  ].map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => set("accentColor", c.hex)}
                      aria-label={`Set accent color to ${c.name}`}
                      aria-pressed={tweaks.accentColor === c.hex}
                      className={`w-7 h-7 rounded-full transition-all ${
                        tweaks.accentColor === c.hex ? "ring-2 ring-white ring-offset-2 ring-offset-bg-surface" : ""
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="min-match-range" className="text-[11px] font-semibold text-text-secondary uppercase">Min Match %</label>
                  <span className="text-[11px] font-mono text-accent-green">{tweaks.minMatchPct}%</span>
                </div>
                <input
                  id="min-match-range"
                  type="range"
                  min="0"
                  max="90"
                  step="5"
                  value={tweaks.minMatchPct}
                  onChange={(e) => set("minMatchPct", parseInt(e.target.value))}
                  className="w-full h-1 bg-bg-elevated rounded-lg appearance-none cursor-pointer accent-accent-green"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
