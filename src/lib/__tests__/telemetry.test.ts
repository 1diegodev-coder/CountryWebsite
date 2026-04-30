import { describe, it, expect, vi } from "vitest";
import {
  bucketMatchCount,
  sanitizeSentryEvent,
  sanitizeTelemetryMetadata,
  trackEvent
} from "../telemetry";

describe("Telemetry", () => {
  it("sanitizes forbidden and unknown keys from metadata", () => {
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
        matchCountBucket: "1-5"
      })
    );

    const loggedMetadata = consoleSpy.mock.calls[0][1];
    expect(loggedMetadata).not.toHaveProperty("passport");
    expect(loggedMetadata).not.toHaveProperty("budget");
    expect(loggedMetadata).not.toHaveProperty("safeField");

    consoleSpy.mockRestore();
  });

  it("does not emit exact countries or raw What-If field names", () => {
    expect(sanitizeTelemetryMetadata("deep_dive_opened", {
      section: "visa",
      countryCode: "PT"
    } as any)).toEqual({ section: "visa" });

    expect(sanitizeTelemetryMetadata("what_if_used", {
      field: "budgetUsdMonthly"
    } as any)).toEqual({});
  });

  it("recursively scrubs sensitive Sentry event fields and share tokens", () => {
    const event = sanitizeSentryEvent({
      request: {
        url: "https://example.com/r/abc123XY",
        data: { passport: "US", safe: "ok" },
        headers: { cookie: "session=secret", accept: "application/json" }
      },
      extra: {
        profile: { budgetUsdMonthly: 5000 },
        nested: {
          healthcare: "chronic",
          retained: "value"
        }
      }
    });

    expect(event.request.url).toBe("https://example.com/r/[redacted]");
    expect(event.request.data).toEqual({ safe: "ok" });
    expect(event.request.headers).toEqual({ accept: "application/json" });
    expect(event.extra).not.toHaveProperty("profile");
    expect(event.extra.nested).toEqual({ retained: "value" });
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
