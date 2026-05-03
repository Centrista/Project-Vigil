"use client";

import { useEffect, useState } from "react";
import TrendingFilters, {
  type TrendingFilterId,
  type TrendingView,
} from "@/components/TrendingFilters";
import TrendingHeader from "@/components/TrendingHeader";
import TrendingScamCard from "@/components/TrendingScamCard";

export type ThreatLevel = "critical" | "high" | "medium";
type TrendingCategory = "ai-native" | "ai-transformed" | "traditional";

export interface TrendingPlaceholderItem {
  id: string;
  rank: number;
  riskLevel: ThreatLevel;
  category: TrendingCategory;
  reportsDelta: number;
  isSpiking: boolean;
  isTop: boolean;
  reportedAt: string;
}

const PLACEHOLDER_ITEMS: TrendingPlaceholderItem[] = [
  {
    id: "voice-clone-override",
    rank: 1,
    riskLevel: "critical",
    category: "ai-native",
    reportsDelta: 48,
    isSpiking: true,
    isTop: true,
    reportedAt: "2026-05-03",
  },
  {
    id: "deepfake-drop",
    rank: 2,
    riskLevel: "critical",
    category: "ai-transformed",
    reportsDelta: 36,
    isSpiking: true,
    isTop: false,
    reportedAt: "2026-05-01",
  },
  {
    id: "delivery-clone-thread",
    rank: 3,
    riskLevel: "high",
    category: "traditional",
    reportsDelta: 24,
    isSpiking: false,
    isTop: false,
    reportedAt: "2026-04-29",
  },
  {
    id: "campus-broker-ping",
    rank: 4,
    riskLevel: "high",
    category: "ai-native",
    reportsDelta: 19,
    isSpiking: false,
    isTop: false,
    reportedAt: "2026-04-27",
  },
  {
    id: "friend-pass-reset",
    rank: 5,
    riskLevel: "medium",
    category: "traditional",
    reportsDelta: 14,
    isSpiking: false,
    isTop: false,
    reportedAt: "2026-04-24",
  },
  {
    id: "creator-collab-echo",
    rank: 6,
    riskLevel: "medium",
    category: "ai-transformed",
    reportsDelta: 11,
    isSpiking: false,
    isTop: false,
    reportedAt: "2026-04-21",
  },
  {
    id: "stream-key-lure",
    rank: 7,
    riskLevel: "high",
    category: "ai-native",
    reportsDelta: 28,
    isSpiking: true,
    isTop: false,
    reportedAt: "2026-04-18",
  },
  {
    id: "club-invite-shadow",
    rank: 8,
    riskLevel: "medium",
    category: "traditional",
    reportsDelta: 8,
    isSpiking: false,
    isTop: false,
    reportedAt: "2026-04-08",
  },
  {
    id: "job-board-ghost",
    rank: 9,
    riskLevel: "critical",
    category: "ai-transformed",
    reportsDelta: 33,
    isSpiking: true,
    isTop: false,
    reportedAt: "2026-03-30",
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

  return rotated
    .map((item, index) => {
      const shouldSpike = index % 3 === 0;
      const riskLevel: ThreatLevel =
        index < 2 ? "critical" : index < 6 ? "high" : "medium";

      return {
        ...item,
        rank: index + 1,
        isTop: index === 0,
        isSpiking: shouldSpike,
        riskLevel,
        reportsDelta: 12 + ((item.reportsDelta + index * 7) % 41),
      };
    })
    .sort((a, b) => a.rank - b.rank);
}

function withinLastDays(dateString: string, days: number) {
  const cutoff = new Date("2026-05-03T00:00:00.000Z");
  cutoff.setUTCDate(cutoff.getUTCDate() - days);
  return new Date(dateString) >= cutoff;
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
    case "all":
    default:
      return true;
  }
}

function matchesQuery(item: TrendingPlaceholderItem, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return item.id.toLowerCase().includes(normalized);
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

  const filteredItems = items.filter(
    (item) => matchesFilter(item, activeFilter) && matchesQuery(item, debouncedQuery),
  );

  const filters = FILTERS.map((filter) => ({
    ...filter,
    count: items.filter((item) => matchesFilter(item, filter.id)).length,
  }));

  const suggestions = items
    .filter((item) => matchesQuery(item, query))
    .slice(0, 4)
    .map((item) => item.id);

  const showSuggestions = isSearchFocused && query.trim().length > 0 && suggestions.length > 0;
  const threatLevel = getThreatLevel(filteredItems.length > 0 ? filteredItems : items);
  const threatPercent = filteredItems.length === 0 ? 12 : Math.min(100, 42 + filteredItems.length * 6);

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
    }, 260);

    window.setTimeout(() => {
      setIsRefreshing(false);
    }, 850);
  };

  return (
    <div>
      <TrendingHeader
        threatLevel={threatLevel}
        threatPercent={threatPercent}
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
        onFilterChange={handleFilterChange}
        onQueryChange={setQuery}
        onClearQuery={() => setQuery("")}
        onViewChange={setView}
        onFocusSearch={() => setIsSearchFocused(true)}
        onBlurSearch={() => window.setTimeout(() => setIsSearchFocused(false), 120)}
        onSuggestionSelect={(suggestion) => {
          setQuery(suggestion);
          setIsSearchFocused(false);
        }}
        onToggleMobileMenu={() => setIsMobileMenuOpen((value) => !value)}
      />

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="trending-redacted h-3 w-28 rounded-full" aria-hidden="true" />
          <div className="trending-redacted h-3 w-20 rounded-full opacity-70" aria-hidden="true" />
        </div>

        {view === "grid" ? (
          <div
            className={`grid grid-cols-1 gap-4 transition-opacity duration-200 sm:grid-cols-2 xl:grid-cols-3 ${isTransitioning ? "opacity-55" : "opacity-100"}`}
          >
            {filteredItems.map((item, index) => (
              <TrendingScamCard
                key={`${item.id}-${item.rank}`}
                item={item}
                index={index}
                isDimmed={false}
                isMatched={debouncedQuery.length > 0 && matchesQuery(item, debouncedQuery)}
                showRefreshFlash={showRefreshFlash && index < 3}
              />
            ))}

            {filteredItems.length === 0 && (
              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:col-span-2 xl:col-span-3">
                <span className="sr-only">No placeholder results match the current search and filter state.</span>
                <div className="space-y-3" aria-hidden="true">
                  <div className="trending-redacted h-6 w-44 rounded-2xl" />
                  <div className="trending-redacted h-3 w-64 rounded-full" />
                  <div className="trending-redacted h-3 w-36 rounded-full opacity-70" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-4 sm:p-6 ${isTransitioning ? "opacity-55" : "opacity-100"}`}
          >
            <div
              className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-gradient-to-b from-[#ff1744]/0 via-[#ff1744]/40 to-[#00d4ff]/0 sm:left-[1.9rem]"
              aria-hidden="true"
            />

            <div className="grid gap-4">
              {filteredItems.map((item, index) => (
                <div
                  key={`${item.id}-${item.rank}-timeline`}
                  className="timeline-row-enter relative flex gap-4 rounded-[24px] border border-white/8 bg-black/10 p-4 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.04]"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <span className="sr-only">
                    Timeline placeholder entry for rank {item.rank} reported on {item.reportedAt}.
                  </span>

                  <div className="relative z-10 flex w-7 justify-center pt-1" aria-hidden="true">
                    <div className={`h-3.5 w-3.5 rounded-full border border-white/10 ${item.isSpiking ? "spike-dot-pulse bg-[#ff1744]" : "bg-[#00d4ff]/70"}`} />
                  </div>

                  <div className="min-w-0 flex-1 rounded-[20px] border border-white/8 bg-white/[0.02] p-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0 flex-1 space-y-3" aria-hidden="true">
                        <div className="trending-redacted h-4 w-24 rounded-full" />
                        <div className="trending-redacted h-5 w-[min(100%,14rem)] rounded-xl" />
                        <div className="trending-redacted h-3 w-4/5 rounded-full opacity-70" />
                      </div>

                      <div className="flex items-center gap-3 self-start" aria-hidden="true">
                        <div className="group relative rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                          <div className="trending-redacted h-3 w-18 rounded-full" />
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
                            <div className="trending-redacted h-2.5 w-16 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredItems.length === 0 && (
                <div className="rounded-[24px] border border-white/10 bg-black/10 p-5">
                  <span className="sr-only">No timeline placeholders match the current state.</span>
                  <div className="space-y-3" aria-hidden="true">
                    <div className="trending-redacted h-6 w-40 rounded-2xl" />
                    <div className="trending-redacted h-3 w-56 rounded-full" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
