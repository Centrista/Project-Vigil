"use client";

type ThreatLevel = "critical" | "high" | "medium";

interface TrendingHeaderProps {
  threatLevel: ThreatLevel;
  threatPercent: number;
  isThreatExpanded: boolean;
  isRefreshing: boolean;
  showRefreshFlash: boolean;
  onToggleExpanded: () => void;
  onRefresh: () => void;
}

const THREAT_META: Record<
  ThreatLevel,
  { tone: string; border: string; glow: string; fill: string; pulseClass: string }
> = {
  critical: {
    tone: "rgba(255,23,68,0.16)",
    border: "rgba(255,23,68,0.28)",
    glow: "0 0 40px rgba(255,23,68,0.18)",
    fill: "linear-gradient(90deg, #ff1744 0%, #ff4d6d 100%)",
    pulseClass: "threat-heartbeat",
  },
  high: {
    tone: "rgba(255,109,0,0.14)",
    border: "rgba(255,109,0,0.24)",
    glow: "0 0 34px rgba(255,109,0,0.16)",
    fill: "linear-gradient(90deg, #ff6d00 0%, #ff9a3d 100%)",
    pulseClass: "threat-heartbeat",
  },
  medium: {
    tone: "rgba(0,212,255,0.12)",
    border: "rgba(0,212,255,0.22)",
    glow: "0 0 30px rgba(0,212,255,0.12)",
    fill: "linear-gradient(90deg, #00d4ff 0%, #4de7ff 100%)",
    pulseClass: "",
  },
};

export default function TrendingHeader({
  threatLevel,
  threatPercent,
  isThreatExpanded,
  isRefreshing,
  showRefreshFlash,
  onToggleExpanded,
  onRefresh,
}: TrendingHeaderProps) {
  const meta = THREAT_META[threatLevel];

  return (
    <section className="relative">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-2 glass"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span
                  className="pulse-ring absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: "#ff1744" }}
                />
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: "#ff1744" }}
                />
              </span>
              <span className="sr-only">Trending Scams</span>
              <div className="trending-redacted h-2.5 w-28 rounded-full" aria-hidden="true" />
            </div>

            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-2"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <span className="sr-only">Last updated recently</span>
              <div className="trending-redacted h-2.5 w-20 rounded-full" aria-hidden="true" />
            </div>
          </div>

          <h1 className="sr-only">Trending Scams</h1>
          <p className="sr-only">Real-time threats hitting teens right now.</p>

          <div className="space-y-3" aria-hidden="true">
            <div className="trending-redacted h-10 w-[min(100%,24rem)] rounded-2xl" />
            <div className="trending-redacted h-4 w-[min(100%,18rem)] rounded-full opacity-70" />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 self-start">
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label="Refresh trending scam dashboard placeholders"
            className={`group inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-[#ff1744]/50 ${isRefreshing ? "opacity-85" : ""}`}
          >
            <svg
              className={`h-5 w-5 text-white/70 transition-transform duration-300 ${isRefreshing ? "refresh-spin" : "group-hover:rotate-90"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h5M20 20v-5h-5M5.6 14.2a7 7 0 0011.4 2.3M18.4 9.8A7 7 0 007 7.5"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={onToggleExpanded}
            aria-expanded={isThreatExpanded}
            aria-label={isThreatExpanded ? "Collapse threat breakdown" : "Expand threat breakdown"}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-[#ff1744]/50"
          >
            <div className="trending-redacted h-2.5 w-16 rounded-full" aria-hidden="true" />
            <svg
              className={`h-4 w-4 text-white/55 transition-transform duration-300 ${isThreatExpanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`mt-6 rounded-[28px] border p-5 sm:p-6 ${meta.pulseClass} ${showRefreshFlash ? "threat-refresh-flash" : ""}`}
        style={{
          background: `linear-gradient(145deg, ${meta.tone} 0%, rgba(26,31,46,0.95) 75%)`,
          borderColor: meta.border,
          boxShadow: meta.glow,
        }}
      >
        <button
          type="button"
          onClick={onToggleExpanded}
          className="w-full text-left"
          aria-expanded={isThreatExpanded}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-4 flex flex-wrap items-center gap-3" aria-hidden="true">
                <div className="trending-redacted h-3 w-24 rounded-full" />
                <div className="threat-pill-glow rounded-full border border-white/10 px-3 py-1.5">
                  <div className="trending-redacted h-2.5 w-16 rounded-full" />
                </div>
              </div>

              <div className="space-y-3" aria-hidden="true">
                <div className="trending-redacted h-8 w-[min(100%,18rem)] rounded-2xl" />
                <div className="trending-redacted h-3.5 w-[min(100%,13rem)] rounded-full opacity-70" />
              </div>
            </div>

            <div className="grid min-w-[220px] gap-3 sm:grid-cols-2 lg:w-[280px]" aria-hidden="true">
              <div className="rounded-2xl border border-white/8 bg-black/10 p-4">
                <div className="trending-redacted mb-3 h-2.5 w-14 rounded-full" />
                <div className="trending-redacted h-6 w-16 rounded-xl" />
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/10 p-4">
                <div className="trending-redacted mb-3 h-2.5 w-14 rounded-full" />
                <div className="trending-redacted h-6 w-18 rounded-xl" />
              </div>
            </div>
          </div>

          <div className="mt-6" aria-hidden="true">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="trending-redacted h-2.5 w-28 rounded-full" />
              <div className="trending-redacted h-2.5 w-20 rounded-full opacity-70" />
            </div>
            <div className="h-3 rounded-full bg-white/8">
              <div
                className="threat-bar-fill h-3 rounded-full"
                style={{
                  width: `${threatPercent}%`,
                  background: meta.fill,
                }}
              />
            </div>
          </div>
        </button>

        {isThreatExpanded && (
          <div
            className="card-content-in mt-5 border-t border-white/10 pt-5"
            role="region"
            aria-label="Threat breakdown details"
          >
            <div className="grid gap-3 md:grid-cols-3" aria-hidden="true">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/8 bg-black/10 p-4"
                >
                  <div className="trending-redacted mb-3 h-2.5 w-18 rounded-full" />
                  <div className="space-y-2">
                    <div className="trending-redacted h-3 w-full rounded-full" />
                    <div className="trending-redacted h-3 w-4/5 rounded-full opacity-70" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
