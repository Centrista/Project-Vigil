"use client";

type ThreatLevel = "critical" | "high" | "medium";

interface BreakdownStat {
  label: string;
  value: string;
  tone: "danger" | "info" | "warm" | "default";
}

interface TrendingHeaderProps {
  threatLevel: ThreatLevel;
  threatPercent: number;
  reportedThisWeek: number;
  trendDelta: number;
  lastUpdatedLabel: string;
  breakdown: BreakdownStat[];
  isThreatExpanded: boolean;
  isRefreshing: boolean;
  showRefreshFlash: boolean;
  onToggleExpanded: () => void;
  onRefresh: () => void;
}

const THREAT_META: Record<
  ThreatLevel,
  { label: string; tone: string; border: string; fill: string; chip: string; pulseClass: string }
> = {
  critical: {
    label: "CRITICAL",
    tone: "rgba(255,109,0,0.12)",
    border: "rgba(255,109,0,0.28)",
    fill: "linear-gradient(90deg, #ff6d00 0%, #ffa500 100%)",
    chip: "premium-chip premium-chip-warm",
    pulseClass: "threat-heartbeat",
  },
  high: {
    label: "HIGH",
    tone: "rgba(255,109,0,0.12)",
    border: "rgba(255,109,0,0.28)",
    fill: "linear-gradient(90deg, #ff6d00 0%, #ff9846 100%)",
    chip: "premium-chip premium-chip-warm",
    pulseClass: "threat-heartbeat",
  },
  medium: {
    label: "MEDIUM",
    tone: "rgba(0,212,255,0.12)",
    border: "rgba(0,212,255,0.28)",
    fill: "linear-gradient(90deg, #00d4ff 0%, #57e8ff 100%)",
    chip: "premium-chip premium-chip-info",
    pulseClass: "",
  },
};

const CHIP_CLASS: Record<BreakdownStat["tone"], string> = {
  default: "premium-chip",
  danger: "premium-chip premium-chip-danger",
  info: "premium-chip premium-chip-info",
  warm: "premium-chip premium-chip-warm",
};

export default function TrendingHeader({
  threatLevel,
  threatPercent,
  reportedThisWeek,
  trendDelta,
  lastUpdatedLabel,
  breakdown,
  isThreatExpanded,
  isRefreshing,
  showRefreshFlash,
  onToggleExpanded,
  onRefresh,
}: TrendingHeaderProps) {
  const meta = THREAT_META[threatLevel];

  return (
    <section className="relative">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="hero-kicker mb-5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#ff1744" }} />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff1744]" />
            </span>
            Live Threat Board
          </div>

          <h1 className="mb-4 max-w-2xl text-[clamp(2.6rem,7vw,5.1rem)] font-black leading-[0.94] tracking-[-0.05em] text-white">
            Trending Scams
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/58 sm:text-lg">
            Real-time threats hitting teens right now. Filter by risk, scan what is climbing, and move into the guide before the same pressure lands on you.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start lg:justify-end">
          <span className="premium-chip">
            Last updated {lastUpdatedLabel}
          </span>
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label="Refresh trending scam dashboard"
            className="btn-ghost rounded-2xl px-4 py-3 text-sm"
          >
            <svg
              className={`h-4 w-4 ${isRefreshing ? "refresh-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h5M20 20v-5h-5M5.6 14.2a7 7 0 0011.4 2.3M18.4 9.8A7 7 0 007 7.5"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <div
        className={`mt-8 rounded-[28px] border p-5 sm:p-6 ${meta.pulseClass} ${showRefreshFlash ? "threat-refresh-flash" : ""}`}
        style={{
          background: `linear-gradient(160deg, ${meta.tone} 0%, rgba(18,24,42,0.96) 70%)`,
          borderColor: meta.border,
        }}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className={meta.chip}>{meta.label}</span>
              <span className="premium-chip premium-chip-danger">
                ↑ +{trendDelta}% vs last week
              </span>
            </div>
            <h2 className="mb-2 max-w-xl text-2xl font-black leading-tight text-white sm:text-3xl">
              {reportedThisWeek} new scams reported this week
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-white/52 sm:text-base">
              This board surfaces the attacks rising fastest right now, ranked by how aggressively they&rsquo;re being reported each week.
            </p>
          </div>

          <div className="grid min-w-[220px] gap-3 sm:grid-cols-2 lg:w-[320px]">
            {breakdown.slice(0, 2).map((item) => (
              <div key={item.label} className="rounded-[20px] border border-white/10 bg-black/10 p-4">
                <div className="mono-label mb-2 text-[10px] uppercase tracking-[0.22em] text-white/38">
                  {item.label}
                </div>
                <div className="text-xl font-black text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-label text-[11px] uppercase tracking-[0.22em] text-white/38">
              Threat meter
            </span>
            <span className="mono-label text-[11px] uppercase tracking-[0.22em] text-white/32">
              Expansion pressure
            </span>
          </div>
          <div className="h-3 rounded-full bg-white/10">
            <div className="threat-bar-fill h-3 rounded-full" style={{ width: `${threatPercent}%`, background: meta.fill }} />
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleExpanded}
          aria-expanded={isThreatExpanded}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-white/78 hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
        >
          {isThreatExpanded ? "Hide breakdown" : "Show breakdown"}
          <svg
            className={`h-4 w-4 transition-transform duration-300 ${isThreatExpanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isThreatExpanded && (
          <div className="card-content-in mt-5 grid gap-3 border-t border-white/10 pt-5 md:grid-cols-3">
            {breakdown.map((item) => (
              <div key={item.label} className="rounded-[20px] border border-white/10 bg-black/10 p-4">
                <div className={`mb-3 inline-flex ${CHIP_CLASS[item.tone]}`}>{item.label}</div>
                <div className="text-2xl font-black text-white">{item.value}</div>
                <p className="mt-2 text-sm text-white/48">
                  Tracked across the past seven days of reports.
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
