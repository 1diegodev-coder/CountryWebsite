import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import path from "path";
import { withSentryConfig } from "@sentry/nextjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
};

export default withSentryConfig(nextConfig, {
  silent: true,
  disableLogger: true,
  telemetry: false,
});
