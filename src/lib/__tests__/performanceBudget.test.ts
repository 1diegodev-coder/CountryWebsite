import { describe, it, expect } from "vitest";
import { PERFORMANCE_BUDGETS, checkBudget } from "../performanceBudget";

describe("Performance Budget Helper", () => {
  it("validates budgets correctly", () => {
    expect(checkBudget("LANDING_READY", 1000)).toBe(true);
    expect(checkBudget("LANDING_READY", 1600)).toBe(false);
  });

  it("has reasonable defaults for soft beta", () => {
    expect(PERFORMANCE_BUDGETS.QUIZ_STEP_LATENCY).toBeLessThanOrEqual(100);
    expect(PERFORMANCE_BUDGETS.WHAT_IF_LATENCY).toBe(1500);
  });

  it("handles boundary conditions", () => {
    expect(checkBudget("SHARE_MODAL_OPEN", 200)).toBe(true);
  });
});
