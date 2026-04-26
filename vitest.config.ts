import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    projects: [
      {
        test: {
          name: 'node',
          include: ['src/lib/**/*.test.{ts,tsx}', 'src/app/**/*.test.{ts,tsx}'],
          environment: 'node',
          globals: true,
        },
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src'),
            'server-only': path.resolve(__dirname, 'src/__mocks__/server-only.ts'),
          },
        },
      },
      {
        test: {
          name: 'jsdom',
          include: ['src/components/**/*.test.{ts,tsx}'],
          environment: 'jsdom',
          globals: true,
        },
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src'),
            'server-only': path.resolve(__dirname, 'src/__mocks__/server-only.ts'),
          },
        },
      },
    ],
  },
});
