"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ResultsView from "@/components/ResultsView";
import { MatchPayload } from "@/lib/schema/match";
import { UserProfile } from "@/lib/schema/profile";
import { Globe } from "lucide-react";

export default function SharedResultsPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  
  const [result, setResult] = useState<MatchPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    fetch(`/api/results/${token}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to load results");
        }
        return res.json();
      })
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  const handleRetake = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center gap-4">
        <Globe size={40} className="text-accent-green animate-spin-slow" />
        <p className="text-text-muted font-mono text-sm tracking-widest uppercase animate-pulse">
          Retrieving Shared Results...
        </p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center gap-6 p-4 text-center">
        <div className="w-16 h-16 rounded-full bg-bg-elevated flex items-center justify-center mb-2">
          <Globe size={32} className="text-text-muted opacity-20" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-display mb-2">Results Not Found</h1>
          <p className="text-text-secondary max-w-md mx-auto">
            This shared link may have expired or is invalid. Take the quiz yourself to find your ideal home.
          </p>
        </div>
        <button 
          onClick={() => router.push("/")}
          className="btn-primary"
        >
          Take the Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <ResultsView
        result={result}
        onRetake={handleRetake}
        tweaks={{ accentColor: "#4ADE80", minMatchPct: 65 }} // Defaults
        profile={{} as UserProfile} // Mock profile, What-If is hidden
        onUpdateResult={() => {}}
        isReadOnly={true}
      />
    </div>
  );
}
