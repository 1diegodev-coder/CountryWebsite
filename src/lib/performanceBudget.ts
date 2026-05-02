/**
 * Coarse performance budgets for Soft Beta.
 * These are user-centered thresholds in milliseconds.
 */
export const PERFORMANCE_BUDGETS = {
  LANDING_READY: 1500,
  QUIZ_STEP_LATENCY: 100,
  RESULTS_INITIAL_RENDER: 800,
  DEEP_DIVE_OPEN: 300,
  WHAT_IF_LATENCY: 1500,
  SHARE_MODAL_OPEN: 200,
} as const;

export type BudgetKey = keyof typeof PERFORMANCE_BUDGETS;

/**
 * Checks if a measured duration meets the budget.
 * returns true if within budget, false if exceeded.
 */
export function checkBudget(key: BudgetKey, durationMs: number): boolean {
  return durationMs <= PERFORMANCE_BUDGETS[key];
}

/**
 * Coarse device matrix expectations
 */
export const DEVICE_VIEWPORTS = {
  MOBILE: { width: 390, height: 844 },
  TABLET: { width: 768, height: 1024 },
  LAPTOP: { width: 1280, height: 800 },
  DESKTOP: { width: 1440, height: 900 },
};
