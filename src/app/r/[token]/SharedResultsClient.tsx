"use client";

import { useRouter } from "next/navigation";
import ResultsView from "@/components/ResultsView";
import { MatchPayload } from "@/lib/schema/match";
import { UserProfile } from "@/lib/schema/profile";

export default function SharedResultsClient({ result }: { result: MatchPayload }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg-primary">
      <ResultsView
        result={result}
        onRetake={() => router.push("/")}
        tweaks={{ accentColor: "#4ADE80", minMatchPct: 65 }}
        profile={{} as UserProfile}
        onUpdateResult={() => {}}
        isReadOnly={true}
      />
    </div>
  );
}
