import type { Metadata } from "next";
import { redis } from "@/lib/redis";
import { MatchPayload } from "@/lib/schema/match";
import SharedResultsClient from "./SharedResultsClient";
import ExpiredResult from "./ExpiredResult";

type Props = { params: Promise<{ token: string }> };

async function fetchResult(token: string): Promise<MatchPayload | null> {
  if (!redis) return null;
  const data = await redis.get(`result:${token}`);
  if (!data) return null;
  return (typeof data === "string" ? JSON.parse(data) : data) as MatchPayload;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const result = await fetchResult(token);

  if (!result || result.matches.length === 0) {
    return { title: "CountryDNA — Shared Results" };
  }

  const topMatch = result.matches[0];
  const title = `${topMatch.countryName} is your top match — CountryDNA`;
  const description = result.profileSummary;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function SharedResultsPage({ params }: Props) {
  const { token } = await params;

  if (!token) {
    return <ExpiredResult />;
  }

  const result = await fetchResult(token);

  if (!result) {
    return <ExpiredResult />;
  }

  return <SharedResultsClient result={result} />;
}
