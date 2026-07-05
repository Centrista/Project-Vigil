"use client";

import { useEffect, useMemo, useState } from "react";
import TrendingScamCard from "@/components/TrendingScamCard";
import { SCAMS } from "@/lib/scams";
import type { ScamItem } from "@/lib/scams";

type FilterId = "all" | "critical" | "high" | "medium" | "spiking";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all",      label: "All" },
  { id: "critical", label: "Critical" },
  { id: "high",     label: "High Risk" },
  { id: "medium",   label: "Medium" },
  { id: "spiking",  label: "Spiking" },
];

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
    () => SCAMS.filter(item => matchesFilter(item, activeFilter) && matchesQuery(item, debouncedQuery)),
    [activeFilter, debouncedQuery],
  );

  const criticalCount = SCAMS.filter(i => i.riskLevel === "critical").length;
  const spikingCount  = SCAMS.filter(i => i.isSpiking).length;

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
          Real scams hitting Singapore right now, sourced from SPF advisories and the Annual Scam and Cybercrime Brief 2025. Click any card for the full breakdown.
        </p>
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="premium-chip premium-chip-danger chip-enter">{criticalCount} critical</span>
          <span className="premium-chip premium-chip-warm chip-enter chip-enter-delay-1">{spikingCount} spiking</span>
          <span className="premium-chip chip-enter chip-enter-delay-2">{SCAMS.length} tracked</span>
        </div>
        <p className="mono-label text-[11px] text-white/38">
          Last updated: 2 July 2026 · Sources: SPF, ScamShield
        </p>
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
            aria-label="Search threats"
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
    </div>
  );
}
