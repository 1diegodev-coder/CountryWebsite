"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Globe } from "lucide-react";
import GlobeViewer from "./GlobeViewer";
import { QUESTIONS, Question } from "../lib/data/questions";

interface QuizViewProps {
  answers: any;
  onAnswer: (id: string, value: any) => void;
  onComplete: () => void;
  initialStep: number;
}

export default function QuizView({ answers, onAnswer, onComplete, initialStep }: QuizViewProps) {
  const [currentStep, setCurrentStep] = useState(initialStep || 1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSteps = QUESTIONS.length;
  const question = QUESTIONS.find((q) => q.step === currentStep);

  const [showInterim, setShowInterim] = useState(false);
  const [interimData, setInterimData] = useState<any>(null);

  const handleNext = async (currentAnswersOverride?: any) => {
    const activeAnswers = currentAnswersOverride || answers;

    if (currentStep === 6) {
      // Fetch interim results
      try {
        const response = await fetch("/api/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...activeAnswers,
            // Fill missing required fields with defaults for interim check
            healthcareNeed: activeAnswers.healthcareNeed || "none",
            nonNegotiables: activeAnswers.nonNegotiables || [],
            socialMode: activeAnswers.socialMode || "mixed",
            environmentPreference: activeAnswers.environmentPreference || "midCity",
            culturalAppetite: activeAnswers.culturalAppetite || "noPref",
            topPriorities: activeAnswers.topPriorities || [],
            dealbreakers: activeAnswers.dealbreakers || [],
            languages: activeAnswers.languages || ["en"],
            locale: "en-US",
            passports: activeAnswers.passports || ["US"],
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setInterimData(data);
          setShowInterim(true);
          return;
        }
      } catch (e) {
        console.error("Interim match error:", e);
      }
    }

    if (currentStep < totalSteps) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      onComplete();
    }
  };

  const handleContinueFromInterim = () => {
    setShowInterim(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleSelect = (value: any) => {
    if (question?.type === "single") {
      onAnswer(question.id, value);

      // Immediately call handleNext with the updated state to avoid stale closure/400
      const updatedAnswers = { ...answers, [question.id]: value };

      setTimeout(() => {
        handleNext(updatedAnswers);
      }, 500);
    } else {
      const currentAnswers = answers[question!.id] || [];
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter((v: any) => v !== value)
        : [...currentAnswers, value];

      if (question?.maxSelect && newAnswers.length > question.maxSelect) return;
      onAnswer(question!.id, newAnswers);
    }
  };

  if (!question) return null;

  const progress = (currentStep / totalSteps) * 100;
  const isMulti = question.type === "multi";
  const currentSelection = answers[question.id];
  const canContinue = isMulti
    ? (Array.isArray(currentSelection) && currentSelection.length > 0)
    : currentSelection !== undefined;

  return (
    <div className="quiz-layout">
      <AnimatePresence>
        {showInterim && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-bg-primary/95 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full bg-bg-surface border border-bg-elevated rounded-2xl p-8 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="text-accent-green" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">You're halfway there!</h3>
              <p className="text-text-secondary mb-8">
                Based on what you've told us so far, we've narrowed it down to
                <span className="text-accent-green font-bold px-1">{interimData?.candidateCount}</span>
                countries.
              </p>

              <div className="space-y-4 mb-8">
                <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Your top 3 contenders so far:</div>
                <div className="flex justify-center gap-3">
                  {interimData?.matches.slice(0, 3).map((m: any) => (
                    <div key={m.countryCode} className="bg-bg-elevated px-3 py-2 rounded-lg border border-bg-elevated flex items-center gap-2">
                      <span className="text-lg">🌍</span>
                      <span className="font-bold text-sm">{m.countryCode}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <button onClick={handleContinueFromInterim} className="btn-primary w-full">
                  Answer 7 more to refine <ArrowRight size={18} className="ml-2" />
                </button>
                <button onClick={() => onComplete()} className="btn-ghost w-full">
                  See partial results now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="quiz-left">
        <div className="quiz-progress-area">
          <div className="quiz-step-label flex items-center gap-3">
            <span className="text-accent-green font-mono text-xs">
              {String(currentStep).padStart(2, "0")}
            </span>
            <span className="text-text-muted font-mono text-xs">
              / {String(totalSteps).padStart(2, "0")}
            </span>
          </div>
          <div className="progress-bar-outer mt-2">
            <motion.div
              className="progress-bar-inner"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="question-body">
          <h2 className="question-text">{question.question}</h2>
          {question.subtitle && <p className="question-sub">{question.subtitle}</p>}
        </div>

        <div className="options-list">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-2"
            >
              {question.options.map((opt) => {
                const isSelected = isMulti
                  ? (Array.isArray(currentSelection) && currentSelection.includes(opt.value))
                  : currentSelection === opt.value;

                return (
                  <button
                    key={String(opt.value)}
                    onClick={() => handleSelect(opt.value)}
                    className={`option-card ${isSelected ? "selected" : ""}`}
                  >
                    <div className="option-card-inner">
                      <div className={`${isMulti ? "checkbox" : "radio"} ${isSelected ? "checked" : ""}`}>
                        {isSelected && isMulti && <Check size={12} strokeWidth={4} />}
                      </div>
                      <div className="option-text">
                        <div className="option-label">{opt.label}</div>
                        {opt.sub && <div className="option-sub">{opt.sub}</div>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="quiz-nav">
          <button
            onClick={handleBack}
            className="btn-ghost"
            disabled={currentStep === 1}
          >
            <ArrowLeft size={16} className="mr-2" /> Back
          </button>

          {isMulti && (
            <button
              onClick={handleNext}
              className={`btn-primary ${!canContinue ? "disabled" : ""}`}
              disabled={!canContinue}
            >
              {currentStep === totalSteps ? "See My Results" : "Continue"} <ArrowRight size={16} className="ml-2" />
            </button>
          )}
        </div>
      </div>

      <div className="quiz-right">
        <div className="live-counter">
          <Globe size={24} className="text-accent-green" />
          <div>
            <div className="counter-number">195</div>
            <div className="text-[11px] text-text-secondary uppercase tracking-wider">countries match</div>
          </div>
        </div>
        <div className="globe-container">
          <GlobeViewer isResults={false} activeStep={currentStep} />
        </div>
      </div>
    </div>
  );
}
