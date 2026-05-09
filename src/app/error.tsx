"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#C47A3A" }}>
        Something went wrong
      </p>
      <h1 className="text-4xl font-bold mb-4" style={{ color: "#2C2420" }}>
        An error occurred
      </h1>
      <p className="text-base mb-10" style={{ color: "#6B5E55" }}>
        We hit an unexpected problem loading this page. Please try again, and if
        the issue persists contact us at{" "}
        <a href="mailto:hello@417freelancers.com" className="hover:underline" style={{ color: "#C47A3A" }}>
          hello@417freelancers.com
        </a>
        .
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 text-sm font-medium rounded-md btn-primary"
      >
        Try again
      </button>
    </div>
  );
}
