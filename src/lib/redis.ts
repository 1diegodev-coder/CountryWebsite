import { Redis } from '@upstash/redis';

export const REDIS_TTL = 60 * 60 * 24 * 90; // 90 days

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  if (process.env.NODE_ENV !== 'test') {
    console.warn(
      'Redis env vars missing. Sharing/persistence features will be disabled.'
    );
  }
}

export const redis: Redis | null =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;
