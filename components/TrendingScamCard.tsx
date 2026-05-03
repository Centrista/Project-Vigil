"use client";

import Link from "next/link";

type ThreatLevel = "critical" | "high" | "medium";
type TrendingCategory = "ai-native" | "ai-transformed" | "traditional";

interface TrendingPlaceholderItem {
  id: string;
  rank: number;
  riskLevel: ThreatLevel;
  category: TrendingCategory;
  reportsDelta: number;
  isSpiking: boolean;
  isTop: boolean;
  reportedAt: string;
}

interface TrendingScamCardProps {
  item: TrendingPlaceholderItem;
  index: number;
  isDimmed: boolean;
  isMatched: boolean;
  showRefreshFlash: boolean;
}

const ACCENT_META: Record<ThreatLevel, { color: string; background: string; border: string }> = {
  critical: {
    color: "#ff1744",
    background: "rgba(255,23,68,0.08)",
    border: "rgba(255,23,68,0.2)",
  },
  high: {
    color: "#ff6d00",
    background: "rgba(255,109,0,0.08)",
    border: "rgba(255,109,0,0.18)",
  },
  medium: {
    color: "#00d4ff",
    background: "rgba(0,212,255,0.08)",
    border: "rgba(0,212,255,0.18)",
  },
};

export default function TrendingScamCard({
  item,
  index,
  isDimmed,
  isMatched,
  showRefreshFlash,
}: TrendingScamCardProps) {
  const accent = ACCENT_META[item.riskLevel];

  return (
    <article
      className={`card-premium card-hover trending-card-enter trending-card-glow relative overflow-hidden rounded-[28px] p-5 sm:p-6 ${isDimmed ? "opacity-45" : "opacity-100"} ${showRefreshFlash ? "refresh-outline-flash" : ""}`}
      style={{
        animationDelay: `${index * 70}ms`,
        borderColor: accent.border,
        boxShadow: isMatched
          ? `0 0 0 1px ${accent.border}, 0 14px 42px rgba(0,0,0,0.4), 0 0 36px ${accent.background}`
          : `0 0 0 1px ${accent.border}, 0 14px 42px rgba(0,0,0,0.32)`,
      }}
    >
      <span className="sr-only">
        Placeholder trending scam card ranked {item.rank}, {item.riskLevel} risk, {item.category}, reported on{" "}
        {item.reportedAt}.
      </span>

      <div
        className="pointer-events-none absolute inset-x-8 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3" aria-hidden="true">
          <div
            className="trending-redacted flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border"
            style={{
              background: accent.background,
              borderColor: accent.border,
            }}
          >
            <div className="h-3 w-4 rounded-full bg-white/35" />
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="trending-redacted h-5 w-10 rounded-full" />
              <div
                className="trending-redacted h-5 w-24 rounded-full"
                style={{ background: `${accent.color}18` }}
              />
              <div className="trending-redacted h-5 w-16 rounded-full opacity-80" />
            </div>
            <div className="trending-redacted h-5 w-[min(100%,13rem)] rounded-xl" />
            <div className="space-y-2">
              <div className="trending-redacted h-3 w-full rounded-full" />
              <div className="trending-redacted h-3 w-4/5 rounded-full opacity-70" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2" aria-hidden="true">
          {item.isTop && (
            <div className="badge-shake-on-load rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
              <div className="trending-redacted h-2.5 w-14 rounded-full" />
            </div>
          )}

          {item.isSpiking && (
            <div className="flex items-center gap-2 rounded-full border border-[#ff1744]/20 bg-[#ff1744]/10 px-3 py-1.5">
              <span className="flame-blink text-sm text-[#ff1744]">●</span>
              <div className="trending-redacted h-2.5 w-10 rounded-full" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3" aria-hidden="true">
        <div className="space-y-2">
          <div className="trending-redacted h-2.5 w-20 rounded-full" />
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${item.reportsDelta > 30 ? "trend-bounce" : ""}`}
              style={{
                borderColor: accent.border,
                color: accent.color,
                background: accent.background,
              }}
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 14l5-5 5 5" />
              </svg>
            </span>
            <div className="trending-redacted h-4 w-16 rounded-full" />
          </div>
        </div>

        <div className="group relative">
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
            <div className="trending-redacted h-2.5 w-12 rounded-full" />
          </div>

          <div className="pointer-events-none absolute right-0 top-[calc(100%+0.75rem)] hidden w-40 rounded-2xl border border-white/10 bg-[#0f1426]/95 p-3 shadow-[0_18px_36px_rgba(0,0,0,0.42)] group-hover:block">
            <div className="mb-2 flex items-end gap-1" aria-hidden="true">
              {[28, 18, 36, 42, 24, 48, 30].map((height, barIndex) => (
                <div
                  key={barIndex}
                  className="mini-chart-bar w-3 rounded-t-full"
                  style={{
                    height,
                    background: `linear-gradient(180deg, ${accent.color} 0%, rgba(255,255,255,0.16) 100%)`,
                    animationDelay: `${barIndex * 80}ms`,
                  }}
                />
              ))}
            </div>
            <div className="trending-redacted h-2.5 w-20 rounded-full" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((bar) => (
            <div
              key={bar}
              className="mini-chart-bar rounded-full"
              style={{
                width: 10,
                height: 6 + bar * 4,
                background: `${accent.color}${bar === 2 ? "aa" : "66"}`,
              }}
            />
          ))}
        </div>

        <Link
          href="/guide"
          aria-label="Open the educational guide placeholder destination"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-white/80 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ff1744]/50"
        >
          <span className="sr-only">Learn more in the educational guide</span>
          <div className="trending-redacted h-2.5 w-16 rounded-full" aria-hidden="true" />
          <svg className="h-3.5 w-3.5 text-white/45" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
