"use client";

import type { CSSProperties } from "react";
import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PokemonCard from "@/components/pokedex/PokemonCard";
import PokemonModal from "@/components/pokedex/PokemonModal";
import { usePokedexProgress } from "@/components/pokedex/usePokedexProgress";
import {
  getPokedexRelatedEntry,
  POKEDEX_TYPE_META,
  type PokemonScam,
  type PokemonScamType,
} from "@/lib/pokedex";

const FILTERS: Array<"All" | PokemonScamType> = [
  "All",
  "AI-Native",
  "AI-Transformed",
  "Traditional",
];

function buildSearchUrl(
  pathname: string,
  currentSearch: string,
  slug: string | null,
) {
  const nextParams = new URLSearchParams(currentSearch.replace(/^\?/, ""));

  if (slug) {
    nextParams.set("entry", slug);
  } else {
    nextParams.delete("entry");
  }

  const nextQuery = nextParams.toString();
  return {
    nextSearch: nextQuery ? `?${nextQuery}` : "",
    nextUrl: nextQuery ? `${pathname}?${nextQuery}` : pathname,
  };
}

export default function PokemonGrid({
  entries,
}: {
  entries: PokemonScam[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | PokemonScamType>("All");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [currentSearch, setCurrentSearch] = useState("");
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const deferredSearch = useDeferredValue(searchTerm);
  const { viewedSlugs, learnedSlugs, markViewed, toggleLearned } = usePokedexProgress();

  useEffect(() => {
    function syncFromUrl() {
      const nextSearch = window.location.search;
      const params = new URLSearchParams(nextSearch.replace(/^\?/, ""));
      const querySlug = params.get("entry");
      setCurrentSearch(nextSearch);

      if (!querySlug) {
        setActiveSlug(null);
        return;
      }

      const matchingEntry = entries.find((entry) => entry.slug === querySlug);

      if (!matchingEntry) {
        setActiveSlug(null);
        return;
      }

      setActiveSlug(matchingEntry.slug);
      markViewed(matchingEntry.slug);
    }

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);

    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [entries, markViewed]);

  const normalizedSearch = deferredSearch.trim().toLowerCase();
  const filteredEntries = entries.filter((entry) => {
    const matchesFilter = activeFilter === "All" || entry.type === activeFilter;
    const matchesSearch =
      normalizedSearch.length === 0 ||
      `${entry.name} ${entry.scamLabel} ${entry.type}`.toLowerCase().includes(normalizedSearch);

    return matchesFilter && matchesSearch;
  });

  const activeEntry = activeSlug
    ? entries.find((entry) => entry.slug === activeSlug) ?? null
    : null;
  const relatedEntry = activeEntry ? getPokedexRelatedEntry(activeEntry) : undefined;
  const viewedCount = Array.from(viewedSlugs).filter((slug) =>
    entries.some((entry) => entry.slug === slug),
  ).length;
  const learnedCount = Array.from(learnedSlugs).filter((slug) =>
    entries.some((entry) => entry.slug === slug),
  ).length;
  const progressPercent = Math.round((viewedCount / entries.length) * 100);

  function openEntry(slug: string) {
    setShareFeedback(null);
    setActiveSlug(slug);
    markViewed(slug);

    const { nextSearch, nextUrl } = buildSearchUrl(pathname, currentSearch, slug);
    setCurrentSearch(nextSearch);
    startTransition(() => router.replace(nextUrl, { scroll: false }));
  }

  function closeEntry() {
    setActiveSlug(null);
    setShareFeedback(null);

    const { nextSearch, nextUrl } = buildSearchUrl(pathname, currentSearch, null);
    setCurrentSearch(nextSearch);
    startTransition(() => router.replace(nextUrl, { scroll: false }));
  }

  async function handleShare(entry: PokemonScam) {
    const shareUrl = `${window.location.origin}/pokedex/${entry.slug}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: entry.name,
          text: entry.scamLabel,
          url: shareUrl,
        });
        setShareFeedback("Shared with your device share sheet.");
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setShareFeedback("Share link copied for Instagram or messages.");
    } catch {
      setShareFeedback("Sharing was cancelled or unavailable on this device.");
    }
  }

  return (
    <div className="space-y-6">
      <section className="premium-panel pokedex-toolbar">
        <div className="pokedex-toolbar-top">
          <label className="pokedex-search-shell">
            <span className="mono-label pokedex-search-label">Search</span>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by scam, creature, or family"
              className="pokedex-search-input"
            />
          </label>

          <div className="pokedex-progress-panel">
            <div className="pokedex-progress-meta">
              <span className="mono-label">You&apos;ve viewed {viewedCount} scams</span>
              <span className="mono-label">{progressPercent}% complete</span>
            </div>
            <div className="pokedex-progress-track">
              <div
                className="pokedex-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="pokedex-progress-copy">
              {learnedCount} of {entries.length} marked learned
            </p>
          </div>
        </div>

        <div className="pokedex-filter-row">
          {FILTERS.map((filter) => {
            const count =
              filter === "All"
                ? entries.length
                : entries.filter((entry) => entry.type === filter).length;
            const isActive = activeFilter === filter;
            const color =
              filter === "All" ? "#ffffff" : POKEDEX_TYPE_META[filter].color;

            return (
              <button
                key={filter}
                type="button"
                className={`pokedex-filter-pill ${isActive ? "pokedex-filter-pill-active" : ""}`}
                style={
                  {
                    "--filter-accent": color,
                  } as CSSProperties
                }
                onClick={() => setActiveFilter(filter)}
              >
                <span>{filter}</span>
                <span className="mono-label pokedex-filter-count">{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {learnedCount === entries.length ? (
        <div className="premium-panel premium-panel-danger pokedex-celebration">
          <span className="mono-label pokedex-celebration-kicker">100% COMPLETE</span>
          <h2 className="pokedex-celebration-title">Every scam card has been learned.</h2>
          <p className="pokedex-celebration-copy">
            You&apos;ve completed the full field guide and unlocked the whole catalogue.
          </p>
        </div>
      ) : null}

      <div className="pokedex-grid">
        {filteredEntries.map((entry, index) => (
          <PokemonCard
            key={entry.slug}
            entry={entry}
            index={index}
            isLearned={learnedSlugs.has(entry.slug)}
            onOpen={() => openEntry(entry.slug)}
          />
        ))}
      </div>

      {filteredEntries.length === 0 ? (
        <div className="premium-panel pokedex-empty-state">
          <span className="mono-label">No entries match this filter.</span>
        </div>
      ) : null}

      <p className="mono-label pokedex-grid-count">
        {filteredEntries.length} entries shown · {entries.length} total catalogued
      </p>

      {activeEntry ? (
        <PokemonModal
          key={activeEntry.slug}
          entry={activeEntry}
          relatedEntry={relatedEntry}
          isLearned={learnedSlugs.has(activeEntry.slug)}
          onToggleLearned={() => toggleLearned(activeEntry.slug)}
          onShare={() => handleShare(activeEntry)}
          shareFeedback={shareFeedback}
          onOpenRelated={
            relatedEntry
              ? () => {
                  setShareFeedback(null);
                  openEntry(relatedEntry.slug);
                }
              : undefined
          }
          onCloseComplete={closeEntry}
        />
      ) : null}
    </div>
  );
}
