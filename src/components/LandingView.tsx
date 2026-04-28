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
    <div className="landing">
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
    </div>
  );
}
