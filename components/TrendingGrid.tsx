"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import TrendingScamCard, { type ScamItem, type ThreatLevel } from "@/components/TrendingScamCard";
import { ALERTS } from "@/lib/alerts";

type FilterId = "all" | "critical" | "high" | "medium" | "spiking";

const ITEMS: ScamItem[] = [
  {
    id: "ai-voice-clone-emergency",
    name: "AI Voice Clone Emergency Call",
    summary: "Scammers clone a family member's voice from 3 seconds of social media audio, then call parents claiming they've been in an accident or arrested. A second AI voice poses as a lawyer demanding immediate wire transfer or gift card 'bail'. Tens of thousands of reports filed with the FTC — one family lost $15,000 in a single afternoon.",
    rank: 1,
    riskLevel: "critical",
    category: "ai-native",
    categoryLabel: "AI-Native",
    reportsThisWeek: 3840,
    reportsDelta: 62,
    isSpiking: true,
    isTop: true,
    reportedAt: "May 5",
  },
  {
    id: "pig-butchering-romance-bot",
    name: "Pig Butchering Romance Bot",
    summary: "AI chatbots simulate a romantic partner over weeks on dating apps and Instagram DMs, then pivot to a fake crypto investment platform. The bot always has an excuse to avoid a live unscripted video call. Americans lost $11.37 billion to this scam type in 2025 — the fastest-growing fraud category due to AI automation.",
    rank: 2,
    riskLevel: "critical",
    category: "ai-native",
    categoryLabel: "AI-Native",
    reportsThisWeek: 3210,
    reportsDelta: 48,
    isSpiking: true,
    isTop: false,
    reportedAt: "May 5",
  },
  {
    id: "ai-sextortion-nudify",
    name: "AI Sextortion — Nudify Deepfake",
    summary: "Attackers run innocent photos from Instagram or Snapchat through AI 'nudifier' apps, then threaten to share the fake explicit images unless the victim pays or sends real images. Risk of sextortion in the U.S. rose 137% in 2025. Boys aged 14–17 are the most targeted demographic. Never pay — it always escalates.",
    rank: 3,
    riskLevel: "critical",
    category: "ai-native",
    categoryLabel: "AI-Native",
    reportsThisWeek: 2750,
    reportsDelta: 137,
    isSpiking: true,
    isTop: false,
    reportedAt: "May 4",
  },
  {
    id: "deepfake-video-call-fraud",
    name: "Deepfake Video Call Fraud",
    summary: "Real-time AI deepfakes of bosses, CEOs, or authority figures on Zoom or FaceTime are used to instruct victims to wire money or hand over credentials. UK engineering firm Arup lost $25 million in a single deepfake CFO call in 2024. Documented deepfake fraud losses exceeded $200 million in Q1 2025 alone.",
    rank: 4,
    riskLevel: "critical",
    category: "ai-transformed",
    categoryLabel: "AI-Transformed",
    reportsThisWeek: 2180,
    reportsDelta: 44,
    isSpiking: true,
    isTop: false,
    reportedAt: "May 3",
  },
  {
    id: "ai-hyper-personalized-phishing",
    name: "AI Hyper-Personalized Phishing",
    summary: "AI tools scrape your name, school, workplace, and recent posts to craft perfectly personalized phishing emails with zero grammar errors and no generic greetings. Phishing attacks increased 1,265% since generative AI went mainstream — 82.6% of detected phishing emails are now AI-written. The old tells are completely gone.",
    rank: 5,
    riskLevel: "high",
    category: "ai-transformed",
    categoryLabel: "AI-Transformed",
    reportsThisWeek: 1920,
    reportsDelta: 38,
    isSpiking: false,
    isTop: false,
    reportedAt: "May 2",
  },
  {
    id: "fake-ai-recruiter-job-scam",
    name: "Fake AI Recruiter / Job Scam",
    summary: "AI-generated recruiter profiles and job listings on LinkedIn and Indeed lure victims into fake onboarding flows that collect SSN, bank account numbers, and ID photos for identity theft — or demand upfront 'training fees'. FTC received 105,000 job scam reports in 2024, with losses jumping from $90M to $513M year-over-year.",
    rank: 6,
    riskLevel: "high",
    category: "ai-transformed",
    categoryLabel: "AI-Transformed",
    reportsThisWeek: 1540,
    reportsDelta: 29,
    isSpiking: false,
    isTop: false,
    reportedAt: "Apr 30",
  },
  {
    id: "celebrity-deepfake-crypto-ad",
    name: "Celebrity Deepfake Crypto Ad",
    summary: "AI-generated videos of Elon Musk, Taylor Swift, and MrBeast run as paid social media ads promoting fake crypto giveaways and investment platforms. The Nomani investment scam using this tactic surged 62% in 2025. Humans correctly identify high-quality deepfake video only 24.5% of the time — your eyes can no longer be trusted.",
    rank: 7,
    riskLevel: "high",
    category: "ai-native",
    categoryLabel: "AI-Native",
    reportsThisWeek: 1190,
    reportsDelta: 62,
    isSpiking: true,
    isTop: false,
    reportedAt: "Apr 28",
  },
  {
    id: "ai-gov-impersonation-robocall",
    name: "AI Government Impersonation Robocall",
    summary: "AI voices impersonate IRS agents, Social Security officials, or FBI investigators, claiming your SSN is suspended or an arrest warrant is active. Government impersonation complaints nearly doubled from 17,300 to 32,500 in 2025, with losses hitting $797M. The IRS never calls to demand immediate payment or threaten arrest.",
    rank: 8,
    riskLevel: "high",
    category: "ai-transformed",
    categoryLabel: "AI-Transformed",
    reportsThisWeek: 980,
    reportsDelta: 34,
    isSpiking: false,
    isTop: false,
    reportedAt: "Apr 25",
  },
  {
    id: "ai-tech-support-popup",
    name: "AI Tech Support Pop-Up Scam",
    summary: "Fake browser alerts or AI robocalls impersonating Microsoft or Apple claim your device is infected. A convincing AI voice guides you to install remote access software, then steals passwords and bank details directly. Tech support scams caused $2.1 billion in losses in 2025 — Microsoft now blocks over 4,400 suspicious remote access attempts per day.",
    rank: 9,
    riskLevel: "medium",
    category: "traditional",
    categoryLabel: "Traditional",
    reportsThisWeek: 720,
    reportsDelta: 18,
    isSpiking: false,
    isTop: false,
    reportedAt: "Apr 22",
  },
];

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all",      label: "All" },
  { id: "critical", label: "Critical" },
  { id: "high",     label: "High Risk" },
  { id: "medium",   label: "Medium" },
  { id: "spiking",  label: "Spiking" },
];

const ALERT_SEVERITY: Record<string, { color: string; label: string }> = {
  critical: { color: "#ff1744", label: "CRITICAL" },
  high:     { color: "#ff6d00", label: "HIGH" },
  medium:   { color: "#ffd600", label: "MEDIUM" },
};

function matchesFilter(item: ScamItem, filter: FilterId) {
  if (filter === "all") return true;
  if (filter === "spiking") return item.isSpiking;
  return item.riskLevel === filter;
}

function matchesQuery(item: ScamItem, q: string) {
  if (!q.trim()) return true;
  return item.name.toLowerCase().includes(q.toLowerCase().trim());
}

export default function TrendingGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [query, setQuery]               = useState("");
  const [debouncedQuery, setDebounced]  = useState("");
  const [isTransitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query), 180);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    setTransitioning(true);
    const t = window.setTimeout(() => setTransitioning(false), 200);
    return () => window.clearTimeout(t);
  }, [activeFilter, debouncedQuery]);

  const filteredItems = useMemo(
    () => ITEMS.filter(item => matchesFilter(item, activeFilter) && matchesQuery(item, debouncedQuery)),
    [activeFilter, debouncedQuery],
  );

  const criticalCount = ITEMS.filter(i => i.riskLevel === "critical").length;
  const spikingCount  = ITEMS.filter(i => i.isSpiking).length;

  return (
    <div>
      {/* ── HEADER ── */}
      <div className="mb-8">
        <div className="hero-kicker mb-4">
          <span className="relative flex h-2.5 w-2.5">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#ff1744" }} />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full neon-flicker" style={{ backgroundColor: "#ff1744" }} />
          </span>
          Live Threat Board
        </div>
        <h1 className="mb-3 text-[clamp(2.4rem,6vw,4.5rem)] font-black leading-[0.94] tracking-[-0.05em] text-white">
          Trending Scams
        </h1>
        <p className="mb-5 max-w-2xl text-base leading-relaxed text-white/64">
          The AI attacks rising fastest right now — ranked by volume, filtered by risk.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="premium-chip premium-chip-danger chip-enter">{criticalCount} critical</span>
          <span className="premium-chip premium-chip-warm chip-enter chip-enter-delay-1">{spikingCount} spiking</span>
          <span className="premium-chip chip-enter chip-enter-delay-2">{ITEMS.length} tracked</span>
        </div>
      </div>

      {/* ── FILTERS + SEARCH ── */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={
                activeFilter === f.id
                  ? "filter-pill-active rounded-full px-4 py-2 text-sm font-semibold"
                  : "rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/64 transition-all hover:border-white/20 hover:text-white/90"
              }
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative sm:w-52">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search threats…"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-white/22 focus:bg-white/[0.05]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/38 hover:text-white/70"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── CARDS ── */}
      <div className={`grid grid-cols-1 gap-3 transition-opacity duration-200 sm:grid-cols-2 xl:grid-cols-3 ${isTransitioning ? "opacity-50" : "opacity-100"}`}>
        {filteredItems.map((item, i) => (
          <TrendingScamCard key={item.id} item={item} index={i} />
        ))}
        {filteredItems.length === 0 && (
          <div className="py-14 text-center text-white/42 sm:col-span-2 xl:col-span-3">
            No threats match this filter.{" "}
            <button type="button" className="underline" onClick={() => { setActiveFilter("all"); setQuery(""); }}>
              Clear
            </button>
          </div>
        )}
      </div>

      {/* ── ALERTS SECTION ── */}
      {ALERTS.length > 0 && (
        <section className="mt-14">
          <div className="divider-line mb-8" />
          <div className="eyebrow-row mb-3">
            <span className="premium-dot" />
            <span className="mono-label text-[11px] uppercase tracking-[0.22em] text-white/56">Scam Alerts</span>
          </div>
          <h2 className="section-title mb-2">Latest Verified Alerts</h2>
          <p className="section-copy mb-6 max-w-xl text-sm">
            New AI attack techniques as they emerge — updated bi-weekly.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ALERTS.map(alert => {
              const sev = ALERT_SEVERITY[alert.severity] ?? ALERT_SEVERITY.high;
              return (
                <div
                  key={alert.id}
                  className="flex flex-col overflow-hidden"
                  style={{
                    borderRadius: "20px",
                    background: "linear-gradient(160deg, rgba(14,20,38,0.98) 0%, rgba(10,15,26,1) 100%)",
                    border: `1px solid ${sev.color}1c`,
                    borderTop: `3px solid ${sev.color}`,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.03)",
                  }}
                >
                  <div className="flex flex-1 flex-col p-4">
                    {/* Badges */}
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className="mono-label text-[10px] font-black rounded-lg px-2 py-0.5"
                        style={{ color: sev.color, background: `${sev.color}12`, border: `1px solid ${sev.color}28` }}
                      >
                        {sev.label}
                      </span>
                      <span
                        className="mono-label text-[10px] rounded-lg px-2 py-0.5"
                        style={{ color: alert.categoryColor, background: `${alert.categoryColor}12`, border: `1px solid ${alert.categoryColor}28` }}
                      >
                        {alert.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-[14px] font-black leading-snug text-white">{alert.title}</h3>

                    {/* Description */}
                    <p className="mb-4 flex-1 text-[12px] leading-relaxed text-white/60 line-clamp-4">{alert.description}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.75rem" }}>
                      <span className="mono-label text-[10px] text-white/42">{alert.weekOf}</span>
                      <Link
                        href={alert.learnMoreHref}
                        className="mono-label flex items-center gap-1 text-[10px] font-bold transition-opacity hover:opacity-70"
                        style={{ color: sev.color }}
                      >
                        Learn more
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mono-label mt-5 text-right text-[10px] text-white/40">
            {ALERTS.length} alert{ALERTS.length === 1 ? "" : "s"} · Updated bi-weekly · All threats verified
          </p>
        </section>
      )}
    </div>
  );
}
