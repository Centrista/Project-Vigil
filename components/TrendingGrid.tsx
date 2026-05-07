"use client";

import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import TrendingFilters, {
  type TrendingFilterId,
  type TrendingSuggestion,
  type TrendingView,
} from "@/components/TrendingFilters";
import TrendingHeader from "@/components/TrendingHeader";
import TrendingScamCard from "@/components/TrendingScamCard";

export type ThreatLevel = "critical" | "high" | "medium";
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

const PLACEHOLDER_ITEMS: TrendingPlaceholderItem[] = [
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

const FILTERS: { id: TrendingFilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "high-risk", label: "High Risk" },
  { id: "medium-risk", label: "Medium Risk" },
  { id: "low-risk", label: "Low Risk" },
  { id: "last-7-days", label: "Last 7 Days" },
  { id: "last-30-days", label: "Last 30 Days" },
];

function getThreatLevel(items: TrendingPlaceholderItem[]): ThreatLevel {
  const criticalCount = items.filter((item) => item.riskLevel === "critical").length;
  if (criticalCount >= 2) return "critical";
  if (items.some((item) => item.riskLevel === "high")) return "high";
  return "medium";
}

function rotateItems(items: TrendingPlaceholderItem[]) {
  const rotated = [...items.slice(1), items[0]];
  return rotated.map((item, index) => ({
    ...item,
    rank: index + 1,
    isTop: index === 0,
    isSpiking: index % 3 === 0,
    reportsDelta: 12 + ((item.reportsDelta + index * 7) % 41),
    reportsThisWeek: 9 + ((item.reportsThisWeek + index * 5) % 37),
  }));
}

function withinLastDays(label: string, days: number) {
  const dates = ["May 3", "May 1", "Apr 29", "Apr 27", "Apr 24", "Apr 21", "Apr 18", "Apr 8", "Mar 30"];
  const index = dates.indexOf(label);
  if (index === -1) return false;
  return days === 7 ? index <= 3 : index <= 7;
}

function matchesFilter(item: TrendingPlaceholderItem, filter: TrendingFilterId) {
  switch (filter) {
    case "high-risk":
      return item.riskLevel === "critical" || item.riskLevel === "high";
    case "medium-risk":
      return item.riskLevel === "medium";
    case "low-risk":
      return false;
    case "last-7-days":
      return withinLastDays(item.reportedAt, 7);
    case "last-30-days":
      return withinLastDays(item.reportedAt, 30);
    default:
      return true;
  }
}

function matchesQuery(item: TrendingPlaceholderItem, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return `${item.name} ${item.categoryLabel}`.toLowerCase().includes(normalized);
}

function buildResultSummary(activeFilter: TrendingFilterId, view: TrendingView, count: number) {
  const filterLabel = FILTERS.find((filter) => filter.id === activeFilter)?.label ?? "All";
  return `${count} result${count === 1 ? "" : "s"} · ${filterLabel} · ${view === "grid" ? "Grid View" : "Timeline View"}`;
}

export default function TrendingGrid() {
  const [items, setItems] = useState(PLACEHOLDER_ITEMS);
  const [activeFilter, setActiveFilter] = useState<TrendingFilterId>("all");
  const [view, setView] = useState<TrendingView>("grid");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isThreatExpanded, setIsThreatExpanded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showRefreshFlash, setShowRefreshFlash] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(-1);
  const [lastUpdatedLabel, setLastUpdatedLabel] = useState("just now");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 180);

    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = window.setTimeout(() => setIsTransitioning(false), 220);
    return () => window.clearTimeout(timer);
  }, [activeFilter, debouncedQuery, view]);

  useEffect(() => {
    if (!showRefreshFlash) return;
    const timer = window.setTimeout(() => setShowRefreshFlash(false), 1200);
    return () => window.clearTimeout(timer);
  }, [showRefreshFlash]);

  useEffect(() => {
    setHighlightedSuggestion(-1);
  }, [query]);

  const filteredItems = useMemo(
    () => items.filter((item) => matchesFilter(item, activeFilter) && matchesQuery(item, debouncedQuery)),
    [activeFilter, debouncedQuery, items],
  );

  const filters = useMemo(
    () =>
      FILTERS.map((filter) => ({
        ...filter,
        count: items.filter((item) => matchesFilter(item, filter.id)).length,
      })),
    [items],
  );

  const suggestions = useMemo<TrendingSuggestion[]>(
    () =>
      items
        .filter((item) => matchesQuery(item, query))
        .slice(0, 4)
        .map((item) => ({
          id: item.id,
          label: item.name,
          meta: `${item.categoryLabel} · ${item.reportsThisWeek} reports this week`,
        })),
    [items, query],
  );

  const showSuggestions = isSearchFocused && query.trim().length > 0 && suggestions.length > 0;
  const threatLevel = getThreatLevel(filteredItems.length > 0 ? filteredItems : items);
  const threatPercent = filteredItems.length === 0 ? 12 : Math.min(100, 42 + filteredItems.length * 6);
  const reportedThisWeek = filteredItems.reduce((sum, item) => sum + item.reportsThisWeek, 0) || items.reduce((sum, item) => sum + item.reportsThisWeek, 0);
  const trendDelta = Math.max(...(filteredItems.length > 0 ? filteredItems : items).map((item) => item.reportsDelta));
  const breakdown = [
    {
      label: "Critical signals",
      value: String(items.filter((item) => item.riskLevel === "critical").length),
      tone: "danger" as const,
    },
    {
      label: "Active spikes",
      value: String(items.filter((item) => item.isSpiking).length),
      tone: "warm" as const,
    },
    {
      label: "Visible categories",
      value: "3 tracked",
      tone: "info" as const,
    },
  ];

  const handleFilterChange = (filterId: TrendingFilterId) => {
    setActiveFilter(filterId);
    setIsMobileMenuOpen(false);
  };

  const handleRefresh = () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setIsThreatExpanded(false);

    window.setTimeout(() => {
      setItems((currentItems) => rotateItems(currentItems));
      setShowRefreshFlash(true);
      setLastUpdatedLabel("just now");
    }, 260);

    window.setTimeout(() => {
      setIsRefreshing(false);
    }, 850);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedSuggestion((current) => (current + 1) % suggestions.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedSuggestion((current) => (current <= 0 ? suggestions.length - 1 : current - 1));
    }

    if (event.key === "Enter" && highlightedSuggestion >= 0) {
      event.preventDefault();
      const suggestion = suggestions[highlightedSuggestion];
      if (suggestion) {
        setQuery(suggestion.label);
        setIsSearchFocused(false);
      }
    }

    if (event.key === "Escape") {
      setIsSearchFocused(false);
    }
  };

  const emptyStateTitle =
    activeFilter === "low-risk"
      ? "No low-risk threats in the current board."
      : debouncedQuery
        ? "No threats match that search."
        : "No threats match this filter.";

  return (
    <div>
      <TrendingHeader
        threatLevel={threatLevel}
        threatPercent={threatPercent}
        reportedThisWeek={reportedThisWeek}
        trendDelta={trendDelta}
        lastUpdatedLabel={lastUpdatedLabel}
        breakdown={breakdown}
        isThreatExpanded={isThreatExpanded}
        isRefreshing={isRefreshing}
        showRefreshFlash={showRefreshFlash}
        onToggleExpanded={() => setIsThreatExpanded((value) => !value)}
        onRefresh={handleRefresh}
      />

      <TrendingFilters
        filters={filters}
        activeFilter={activeFilter}
        query={query}
        debouncedQuery={debouncedQuery}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        view={view}
        isTransitioning={isTransitioning}
        isMobileMenuOpen={isMobileMenuOpen}
        highlightedSuggestion={highlightedSuggestion}
        onFilterChange={handleFilterChange}
        onQueryChange={setQuery}
        onClearQuery={() => setQuery("")}
        onViewChange={setView}
        onFocusSearch={() => setIsSearchFocused(true)}
        onBlurSearch={() => window.setTimeout(() => setIsSearchFocused(false), 120)}
        onSuggestionSelect={(suggestion) => {
          setQuery(suggestion.label);
          setIsSearchFocused(false);
        }}
        onToggleMobileMenu={() => setIsMobileMenuOpen((value) => !value)}
        onSearchKeyDown={handleSearchKeyDown}
      />

      <section className="mt-8">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mono-label text-[11px] uppercase tracking-[0.22em] text-white/32">
              Active view
            </div>
            <div className="mt-1 text-sm font-semibold text-white/78">
              {buildResultSummary(activeFilter, view, filteredItems.length)}
            </div>
          </div>
          <div className="text-sm text-white/38">
            {debouncedQuery ? `Searching for “${debouncedQuery}”` : "No search term applied"}
          </div>
        </div>

        {view === "grid" ? (
          <div className={`grid grid-cols-1 gap-4 transition-opacity duration-200 sm:grid-cols-2 xl:grid-cols-3 ${isTransitioning ? "opacity-55" : "opacity-100"}`}>
            {filteredItems.map((item, index) => (
              <TrendingScamCard
                key={`${item.id}-${item.rank}`}
                item={item}
                index={index}
                isMatched={debouncedQuery.length > 0 && matchesQuery(item, debouncedQuery)}
                showRefreshFlash={showRefreshFlash && index < 3}
              />
            ))}

            {filteredItems.length === 0 && (
              <div className="premium-panel p-8 sm:col-span-2 xl:col-span-3">
                <div className="mono-label mb-3 text-[11px] uppercase tracking-[0.22em] text-white/28">
                  Empty state
                </div>
                <h3 className="mb-2 text-2xl font-black text-white">{emptyStateTitle}</h3>
                <p className="max-w-xl text-sm leading-relaxed text-white/48">
                  Try another search, switch to a broader filter, or use “All” to reset the board.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-4 sm:p-6 ${isTransitioning ? "opacity-55" : "opacity-100"}`}>
            <div className="absolute bottom-6 left-[1.45rem] top-6 w-px bg-gradient-to-b from-[#ff1744]/0 via-[#ff1744]/40 to-[#00d4ff]/0 sm:left-[1.95rem]" />

            <div className="grid gap-4">
              {filteredItems.map((item, index) => (
                <div
                  key={`${item.id}-${item.rank}-timeline`}
                  className="timeline-row-enter relative flex gap-4 rounded-[24px] border border-white/10 bg-black/10 p-4 transition-all duration-200 hover:border-white/16 hover:bg-white/[0.04]"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="relative z-10 flex w-7 justify-center pt-1">
                    <div className={`h-3.5 w-3.5 rounded-full border border-white/10 ${item.isSpiking ? "spike-dot-pulse bg-[#ff1744]" : "bg-[#00d4ff]/70"}`} />
                  </div>

                  <div className="min-w-0 flex-1 rounded-[20px] border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="premium-chip">{`#${item.rank}`}</span>
                          <span className="premium-chip premium-chip-danger">{item.categoryLabel}</span>
                        </div>
                        <h3 className="mb-2 text-xl font-black text-white">{item.name}</h3>
                        <p className="text-sm leading-relaxed text-white/48">{item.summary}</p>
                      </div>

                      <div className="flex items-center gap-3 self-start">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                          <div className="mono-label text-[10px] uppercase tracking-[0.22em] text-white/30">
                            Reported
                          </div>
                          <div className="mt-1 text-base font-semibold text-white">{item.reportedAt}</div>
                        </div>
                        <div className="group relative rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                          <div className="text-sm font-semibold text-white/78">Spike view</div>
                          <div className="pointer-events-none absolute right-0 top-[calc(100%+0.75rem)] hidden w-36 rounded-2xl border border-white/10 bg-[#0f1426]/95 p-3 shadow-[0_18px_36px_rgba(0,0,0,0.42)] group-hover:block">
                            <div className="mb-2 flex items-end gap-1">
                              {[14, 22, 18, 28, 34].map((height, barIndex) => (
                                <div
                                  key={barIndex}
                                  className="mini-chart-bar w-3 rounded-t-full"
                                  style={{
                                    height,
                                    background:
                                      item.riskLevel === "medium"
                                        ? "linear-gradient(180deg, #00d4ff 0%, rgba(255,255,255,0.16) 100%)"
                                        : "linear-gradient(180deg, #ff1744 0%, rgba(255,255,255,0.16) 100%)",
                                  }}
                                />
                              ))}
                            </div>
                            <div className="text-xs text-white/38">Mini trend chart</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredItems.length === 0 && (
                <div className="premium-panel p-8">
                  <div className="mono-label mb-3 text-[11px] uppercase tracking-[0.22em] text-white/28">
                    Empty state
                  </div>
                  <h3 className="mb-2 text-2xl font-black text-white">{emptyStateTitle}</h3>
                  <p className="text-sm leading-relaxed text-white/48">
                    Switch back to Grid View or widen your current filter to see more placeholder entries.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
