import { Redis } from '@upstash/redis';

/**
 * Deployment requirement:
 * Configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
 * before the first preview/production deployment where any of these
 * Phase 2 features are expected to work end to end:
 * - POST /api/match share-token persistence
 * - GET /api/results/[token] shared result lookup
 * - /r/[token] shared result pages
 *
 * Local development can run without these values, but shared URLs will not persist.
 */
if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  console.warn('Redis environment variables are missing. Redis functionality will be disabled.');
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export const REDIS_TTL = 60 * 60 * 24 * 90; // 90 days in seconds
