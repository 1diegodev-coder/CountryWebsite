import 'server-only';
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

export const matchRatelimit: Ratelimit | null = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '60 s'),
      prefix: 'rl:match',
    })
  : null;

export const whatifRatelimit: Ratelimit | null = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '60 s'),
      prefix: 'rl:whatif',
    })
  : null;

export const matchCountRatelimit: Ratelimit | null = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(120, '60 s'),
      prefix: 'rl:matchCount',
    })
  : null;
