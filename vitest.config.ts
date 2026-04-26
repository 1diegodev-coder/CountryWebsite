import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
    environmentMatchGlobs: [
      ['src/components/**', 'jsdom'],
      ['src/lib/**', 'node'],
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
