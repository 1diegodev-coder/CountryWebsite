import { afterEach, describe, expect, it, vi } from 'vitest';

describe('redis module', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('does not warn during the Next production build when Redis env vars are missing', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '');
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '');
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PHASE', 'phase-production-build');

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { redis } = await import('../redis');

    expect(redis).toBeNull();
    expect(warn).not.toHaveBeenCalled();
  });

  it('warns in development when Redis env vars are missing', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '');
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '');
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('NEXT_PHASE', '');

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { redis } = await import('../redis');

    expect(redis).toBeNull();
    expect(warn).toHaveBeenCalledWith(
      'Redis env vars missing. Sharing/persistence features will be disabled.',
    );
  });
});
