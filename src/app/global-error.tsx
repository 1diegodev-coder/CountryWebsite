'use client';

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-[#0A0E14] text-white flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-400 mb-8 max-w-md">
            A critical error occurred. We've been notified and are looking into it.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-[#4ADE80] text-black font-semibold rounded-md hover:bg-[#22C55E] transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
