import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { describe, expect, it } from 'vitest';

const ROUTE_ROOTS = [
  path.resolve(process.cwd(), 'src/app/api'),
  path.resolve(process.cwd(), 'app/api'),
  path.resolve(process.cwd(), 'src/pages/api'),
  path.resolve(process.cwd(), 'pages/api'),
];

async function collectRouteFiles(root: string): Promise<string[]> {
  try {
    const entries = await readdir(root, { withFileTypes: true });
    const nested = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(root, entry.name);
        if (entry.isDirectory()) {
          return collectRouteFiles(fullPath);
        }

        if (
          entry.isFile() &&
          (entry.name === 'route.ts' ||
            entry.name === 'route.js' ||
            entry.name.endsWith('.api.ts') ||
            entry.name.endsWith('.api.js'))
        ) {
          return [fullPath];
        }

        return [];
      }),
    );

    return nested.flat();
  } catch {
    return [];
  }
}

async function getAllRouteFiles() {
  const routeFiles = await Promise.all(ROUTE_ROOTS.map((root) => collectRouteFiles(root)));
  return routeFiles.flat().sort();
}

describe('api route stubs', () => {
  it('compile and export a GET or POST handler', async () => {
    const routeFiles = await getAllRouteFiles();
    expect(routeFiles.length).toBeGreaterThan(0);

    await Promise.all(
      routeFiles.map(async (routeFile) => {
        const routeModule = await import(pathToFileURL(routeFile).href);
        expect(typeof routeModule.GET === 'function' || typeof routeModule.POST === 'function').toBe(
          true,
        );
      }),
    );
  }, 20000);
});
