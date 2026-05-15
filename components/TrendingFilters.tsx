"use client";

import type { KeyboardEvent } from "react";

export type TrendingView = "grid" | "timeline";
export type TrendingFilterId =
  | "all"
  | "high-risk"
  | "medium-risk"
  | "low-risk"
  | "last-7-days"
  | "last-30-days";

export interface TrendingSuggestion {
  id: string;
  label: string;
  meta: string;
}

interface FilterDefinition {
  id: TrendingFilterId;
  label: string;
  count: number;
}

interface TrendingFiltersProps {
  filters: FilterDefinition[];
  activeFilter: TrendingFilterId;
  query: string;
  debouncedQuery: string;
  suggestions: TrendingSuggestion[];
  showSuggestions: boolean;
  view: TrendingView;
  isTransitioning: boolean;
  isMobileMenuOpen: boolean;
  highlightedSuggestion: number;
  onFilterChange: (filterId: TrendingFilterId) => void;
  onQueryChange: (value: string) => void;
  onClearQuery: () => void;
  onViewChange: (view: TrendingView) => void;
  onFocusSearch: () => void;
  onBlurSearch: () => void;
  onSuggestionSelect: (suggestion: TrendingSuggestion) => void;
  onToggleMobileMenu: () => void;
  onSearchKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export default function TrendingFilters({
  filters,
  activeFilter,
  query,
  debouncedQuery,
  suggestions,
  showSuggestions,
  view,
  isTransitioning,
  isMobileMenuOpen,
  highlightedSuggestion,
  onFilterChange,
  onQueryChange,
  onClearQuery,
  onViewChange,
  onFocusSearch,
  onBlurSearch,
  onSuggestionSelect,
  onToggleMobileMenu,
  onSearchKeyDown,
}: TrendingFiltersProps) {
  const activeFilterLabel = filters.find((filter) => filter.id === activeFilter)?.label ?? "All";

  return (
    <section className="sticky top-[88px] z-30 mt-8 rounded-[28px] border border-white/10 bg-[rgba(9,16,33,0.82)] px-4 py-4 shadow-[0_18px_44px_rgba(0,0,0,0.22)] backdrop-blur-md sm:px-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-center justify-between gap-3 sm:hidden">
              <button
                type="button"
                onClick={onToggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="trending-mobile-filter-menu"
                className="inline-flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] focus:outline-none"
              >
                <div>
                  <div className="text-sm font-semibold text-white">{activeFilterLabel}</div>
                  <div className="text-xs text-white/36">Filter results</div>
                </div>
                <svg
                  className={`h-4 w-4 text-white/55 transition-transform duration-200 ${isMobileMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div className="hidden flex-wrap gap-2 sm:flex">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => onFilterChange(filter.id)}
                    aria-pressed={isActive}
                    className={`group inline-flex items-center gap-2 rounded-full border px-4 py-3 transition-all duration-200 ${isActive ? "filter-pill-active" : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:bg-white/[0.06]"} ${isTransitioning ? "filter-fade" : ""}`}
                  >
                    <span className="text-sm font-semibold">{filter.label}</span>
                    <span className={`rounded-full px-2 py-1 mono-label text-[10px] ${isActive ? "bg-white/10 text-white/90" : "bg-white/[0.06] text-white/35"}`}>
                      {filter.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {isMobileMenuOpen && (
              <div id="trending-mobile-filter-menu" className="card-content-in mt-3 grid gap-2 sm:hidden">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => onFilterChange(filter.id)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${isActive ? "filter-pill-active" : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"}`}
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">{filter.label}</div>
                        <div className="text-xs text-white/36">{filter.count} results</div>
                      </div>
                      <span className="mono-label text-[10px] text-white/38">{filter.count}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2 self-start rounded-2xl border border-white/10 bg-white/[0.04] p-1.5">
            {([
              { id: "grid", label: "Grid View" },
              { id: "timeline", label: "Timeline View" },
            ] as const).map((option) => {
              const isActive = option.id === view;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onViewChange(option.id)}
                  aria-pressed={isActive}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${isActive ? "filter-pill-active" : "text-white/55 hover:bg-white/[0.06] hover:text-white/80"}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <label htmlFor="trending-scam-search" className="mb-2 block text-sm font-semibold text-white/72">
            Search scam names
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                />
              </svg>
            </div>
            <input
              id="trending-scam-search"
              type="text"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              onFocus={onFocusSearch}
              onBlur={onBlurSearch}
              onKeyDown={onSearchKeyDown}
              autoComplete="off"
              placeholder="Search scam names"
              aria-label="Search trending scams"
              className="w-full rounded-[22px] border border-white/10 bg-white/[0.04] px-12 py-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/22 focus:border-[#ff1744]/40 focus:bg-white/[0.05]"
              aria-describedby="trending-search-status"
            />

            {query.length > 0 && (
              <button
                type="button"
                onClick={onClearQuery}
                aria-label="Clear trending scam search"
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/55 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <svg className="clear-fade-in h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <p id="trending-search-status" className="mt-2 text-xs text-white/36">
            {debouncedQuery ? `${suggestions.length} suggestion${suggestions.length === 1 ? "" : "s"} available.` : "Search works in real time and supports keyboard navigation."}
          </p>

          {showSuggestions && (
            <div
              className="card-content-in absolute left-0 right-0 top-[calc(100%+0.75rem)] z-20 rounded-[24px] border border-white/10 bg-[#121729]/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md"
              role="listbox"
              aria-label="Trending scam search suggestions"
            >
              <div className="mb-2 flex items-center justify-between px-2">
                <div className="mono-label text-[10px] uppercase tracking-[0.22em] text-white/30">
                  Suggestions
                </div>
                <div className="mono-label text-[10px] uppercase tracking-[0.22em] text-white/24">
                  Enter to select
                </div>
              </div>

              <div className="grid gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    role="option"
                    aria-selected={highlightedSuggestion === index}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => onSuggestionSelect(suggestion)}
                    className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all duration-200 ${highlightedSuggestion === index ? "border-[#ff1744]/24 bg-[#ff1744]/10" : "border-white/8 bg-white/[0.03] hover:border-[#ff1744]/20 hover:bg-white/[0.06]"}`}
                  >
                    <div className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "spike-dot-pulse bg-[#ff1744]" : "bg-white/20"}`} />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-white">{suggestion.label}</div>
                      <div className="mt-1 text-xs text-white/38">{suggestion.meta}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
