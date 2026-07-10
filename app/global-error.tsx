"use client";

import { useEffect } from "react";

/**
 * Replaces the root layout when the error escapes it, so globals.css may not
 * have loaded. Everything here is inline-styled on purpose — this screen has to
 * render even when the stylesheet is the thing that broke.
 */
export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c1628",
          color: "#ffffff",
          fontFamily:
            '"Avenir Next", "Segoe UI Variable", "SF Pro Display", system-ui, sans-serif',
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "520px", textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Error
          </p>

          <h1 style={{ margin: "16px 0 0", fontSize: "32px", lineHeight: 1.15 }}>
            Something broke on our end.
          </h1>

          <p
            style={{
              margin: "16px 0 0",
              fontSize: "16px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            This page hit an error. It&apos;s not something you did.
          </p>

          <div
            style={{
              marginTop: "32px",
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                cursor: "pointer",
                border: 0,
                borderRadius: "999px",
                padding: "14px 24px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#ffffff",
                background: "#ff1744",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                borderRadius: "999px",
                padding: "14px 24px",
                fontSize: "14px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.8)",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.16)",
                textDecoration: "none",
              }}
            >
              Back to safety
            </a>
          </div>

          {error.digest ? (
            <p
              style={{
                marginTop: "32px",
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              Ref {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
