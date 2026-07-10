"use client";

import Link from "next/link";
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
    <div className="w-full overflow-x-hidden">
      <section className="page-section">
        <div className="page-frame page-frame-narrow">
          <div className="premium-panel premium-panel-danger p-8 text-center sm:p-12">
            <span className="mono-label text-[11px] uppercase tracking-[0.22em] text-white/40">
              Error
            </span>

            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Something broke on our end.
            </h1>

            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/60">
              This page hit an error. It&apos;s not something you did.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button type="button" onClick={reset} className="btn-red px-6 py-3 text-sm">
                Try again
              </button>
              <Link
                href="/"
                className="btn-ghost px-6 py-3 text-sm"
              >
                Back to safety
              </Link>
            </div>

            {error.digest ? (
              <p className="mono-label mt-8 text-[10px] uppercase tracking-[0.22em] text-white/25">
                Ref {error.digest}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
