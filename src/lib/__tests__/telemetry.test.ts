import { describe, it, expect, vi } from "vitest";
import { trackEvent, bucketMatchCount } from "../telemetry";

describe("Telemetry", () => {
  it("sanitizes forbidden keys from metadata", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    trackEvent("quiz_completed" as any, {
      matchCountBucket: "1-5",
      passport: "US", // Forbidden
      budget: 5000,   // Forbidden
      safeField: true
    } as any);

    expect(consoleSpy).toHaveBeenCalledWith(
      "[Telemetry] quiz_completed",
      expect.objectContaining({
        matchCountBucket: "1-5",
        safeField: true
      })
    );

    const loggedMetadata = consoleSpy.mock.calls[0][1];
    expect(loggedMetadata).not.toHaveProperty("passport");
    expect(loggedMetadata).not.toHaveProperty("budget");

    consoleSpy.mockRestore();
  });

  it("buckets match counts correctly", () => {
    expect(bucketMatchCount(0)).toBe("0");
    expect(bucketMatchCount(1)).toBe("1-5");
    expect(bucketMatchCount(5)).toBe("1-5");
    expect(bucketMatchCount(6)).toBe("6-20");
    expect(bucketMatchCount(20)).toBe("6-20");
    expect(bucketMatchCount(21)).toBe("21-50");
    expect(bucketMatchCount(50)).toBe("21-50");
    expect(bucketMatchCount(51)).toBe("51+");
    expect(bucketMatchCount(100)).toBe("51+");
  });
});
