"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, Globe, RefreshCcw } from "lucide-react";

export default function ExpiredResult() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-accent-warning/10 rounded-full flex items-center justify-center text-accent-warning">
            <AlertTriangle size={40} />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold font-display">Link Expired or Missing</h1>
          <p className="text-text-secondary text-sm leading-relaxed">
            We couldn&apos;t find these results. Shared results expire after 90 days.
          </p>
        </div>

        <div className="pt-4 space-y-4">
          <Link
            href="/"
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <RefreshCcw size={16} />
            Take Your Own Quiz
          </Link>

          <div className="flex items-center justify-center gap-2 text-[10px] text-text-muted uppercase tracking-widest font-mono">
            <Globe size={12} className="text-accent-green" />
            <span>CountryDNA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
