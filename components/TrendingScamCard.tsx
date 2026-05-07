"use client";

import Link from "next/link";

type ThreatLevel = "critical" | "high" | "medium";
type TrendingCategory = "ai-native" | "ai-transformed" | "traditional";

interface TrendingPlaceholderItem {
  id: string;
  name: string;
  summary: string;
  rank: number;
  riskLevel: ThreatLevel;
  category: TrendingCategory;
  categoryLabel: string;
  reportsThisWeek: number;
  reportsDelta: number;
  isSpiking: boolean;
  isTop: boolean;
  reportedAt: string;
}

interface TrendingScamCardProps {
  item: TrendingPlaceholderItem;
  index: number;
  isMatched: boolean;
  showRefreshFlash: boolean;
}

const ACCENT_META: Record<ThreatLevel, { color: string; background: string; border: string; label: string }> = {
  critical: {
    color: "#ff1744",
    background: "rgba(255,23,68,0.08)",
    border: "rgba(255,23,68,0.2)",
    label: "High Risk",
  },
  high: {
    color: "#ff6d00",
    background: "rgba(255,109,0,0.08)",
    border: "rgba(255,109,0,0.18)",
    label: "Medium Risk",
  },
  medium: {
    color: "#00d4ff",
    background: "rgba(0,212,255,0.08)",
    border: "rgba(0,212,255,0.18)",
    label: "Low Risk",
  },
};

export default function TrendingScamCard({
  item,
  index,
  isMatched,
  showRefreshFlash,
}: TrendingScamCardProps) {
  const accent = ACCENT_META[item.riskLevel];

  return (
    <article
      className={`card-premium card-hover trending-card-enter trending-card-glow relative overflow-hidden rounded-[28px] p-5 sm:p-6 ${showRefreshFlash ? "refresh-outline-flash" : ""}`}
      style={{
        animationDelay: `${index * 70}ms`,
        borderColor: accent.border,
        boxShadow: isMatched
          ? `0 0 0 1px ${accent.border}, 0 14px 42px rgba(0,0,0,0.4), 0 0 36px ${accent.background}`
          : `0 0 0 1px ${accent.border}, 0 14px 42px rgba(0,0,0,0.32)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-8 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
          opacity: 0.5,
        }}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="premium-chip">{`#${item.rank}`}</span>
            <span
              className="premium-chip"
              style={{
                color: accent.color,
                background: `${accent.color}14`,
                borderColor: accent.border,
              }}
            >
              {item.categoryLabel}
            </span>
            <span
              className="premium-chip"
              style={{
                color: accent.color,
                background: accent.background,
                borderColor: accent.border,
              }}
            >
              {accent.label}
            </span>
          </div>

          <h3 className="mb-2 text-2xl font-black leading-tight text-white">{item.name}</h3>
          <p className="max-w-md text-sm leading-relaxed text-white/64">{item.summary}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {item.isTop && <span className="badge-shake-on-load premium-chip premium-chip-danger">#1 This Week</span>}
          {item.isSpiking && (
            <span className="premium-chip premium-chip-danger">
              <span className="flame-blink">●</span>
              Spiking
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[24px] border border-[rgba(255,224,112,0.15)] bg-[rgba(255,248,222,0.07)] p-4">
            <div className="mono-label mb-2 text-[10px] uppercase tracking-[0.22em] text-white/52">Reports this week</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white">{item.reportsThisWeek}</span>
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${item.reportsDelta > 30 ? "trend-bounce" : ""}`} style={{ color: accent.color, background: accent.background }}>
                ↑ {item.reportsDelta}%
              </span>
            </div>
          </div>
          <div className="rounded-[24px] border border-[rgba(255,224,112,0.15)] bg-[rgba(255,248,222,0.07)] p-4">
            <div className="mono-label mb-2 text-[10px] uppercase tracking-[0.22em] text-white/52">Last reported</div>
            <div className="text-base font-semibold text-white">{item.reportedAt}</div>
            <div className="mt-1 text-xs text-white/52">Placeholder verification timestamp</div>
          </div>
        </div>

        <div className="group relative justify-self-start sm:justify-self-end">
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/72">
            7-day spike
          </div>
          <div className="pointer-events-none absolute right-0 top-[calc(100%+0.75rem)] hidden w-40 rounded-2xl border border-[rgba(255,224,112,0.2)] bg-[rgba(28,35,56,0.95)] p-3 shadow-[0_18px_36px_rgba(0,0,0,0.42)] group-hover:block">
            <div className="mb-2 flex items-end gap-1">
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
            <div className="text-xs text-white/52">Visual placeholder spike chart</div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
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
          <span className="text-xs text-white/52">Threat movement</span>
        </div>

        <Link
          href="/guide"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-white/80 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
        >
          Learn More
          <svg className="h-3.5 w-3.5 text-white/45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
