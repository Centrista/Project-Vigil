"use client";

export type TrendingView = "grid" | "timeline";
export type TrendingFilterId =
  | "all"
  | "high-risk"
  | "medium-risk"
  | "low-risk"
  | "last-7-days"
  | "last-30-days";

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
  suggestions: string[];
  showSuggestions: boolean;
  view: TrendingView;
  isTransitioning: boolean;
  isMobileMenuOpen: boolean;
  onFilterChange: (filterId: TrendingFilterId) => void;
  onQueryChange: (value: string) => void;
  onClearQuery: () => void;
  onViewChange: (view: TrendingView) => void;
  onFocusSearch: () => void;
  onBlurSearch: () => void;
  onSuggestionSelect: (suggestion: string) => void;
  onToggleMobileMenu: () => void;
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
  onFilterChange,
  onQueryChange,
  onClearQuery,
  onViewChange,
  onFocusSearch,
  onBlurSearch,
  onSuggestionSelect,
  onToggleMobileMenu,
}: TrendingFiltersProps) {
  return (
    <section className="mt-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between gap-3 sm:hidden">
            <button
              type="button"
              onClick={onToggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="trending-mobile-filter-menu"
              className="inline-flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-[#ff1744]/50"
            >
              <span className="sr-only">Open trending scam filters</span>
              <div className="flex items-center gap-3" aria-hidden="true">
                <div className="trending-redacted h-3 w-24 rounded-full" />
                <div className="trending-redacted h-6 w-8 rounded-full" />
              </div>
              <svg
                className={`h-4 w-4 text-white/55 transition-transform duration-200 ${isMobileMenuOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
                  aria-label={`${filter.label} filter, ${filter.count} items`}
                  className={`group inline-flex items-center gap-2 rounded-full border px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff1744]/50 ${isActive ? "filter-pill-active" : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:bg-white/[0.06]"} ${isTransitioning ? "filter-fade" : ""}`}
                >
                  <span className="sr-only">{filter.label}</span>
                  <div className="trending-redacted h-2.5 w-18 rounded-full" aria-hidden="true" />
                  <div
                    className={`rounded-full px-2 py-1 ${isActive ? "bg-white/10" : "bg-white/[0.06]"}`}
                    aria-hidden="true"
                  >
                    <div className="trending-redacted h-2 w-6 rounded-full opacity-80" />
                  </div>
                </button>
              );
            })}
          </div>

          {isMobileMenuOpen && (
            <div
              id="trending-mobile-filter-menu"
              className="card-content-in mt-3 grid gap-2 sm:hidden"
            >
              {filters.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => onFilterChange(filter.id)}
                    aria-pressed={isActive}
                    aria-label={`${filter.label} filter, ${filter.count} items`}
                    className={`inline-flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff1744]/50 ${isActive ? "filter-pill-active" : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"}`}
                  >
                    <span className="sr-only">{filter.label}</span>
                    <div className="trending-redacted h-2.5 w-24 rounded-full" aria-hidden="true" />
                    <div className="trending-redacted h-6 w-8 rounded-full" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 self-start rounded-2xl border border-white/10 bg-white/[0.04] p-1.5">
          {(["grid", "timeline"] as TrendingView[]).map((option) => {
            const isActive = option === view;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onViewChange(option)}
                aria-pressed={isActive}
                aria-label={option === "grid" ? "Grid view" : "Timeline view"}
                className={`rounded-xl px-4 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff1744]/50 ${isActive ? "filter-pill-active" : "text-white/55 hover:bg-white/[0.06] hover:text-white/80"}`}
              >
                <span className="sr-only">{option === "grid" ? "Grid view" : "Timeline view"}</span>
                <div className="trending-redacted h-2.5 w-14 rounded-full" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-5">
        <label htmlFor="trending-scam-search" className="sr-only">
          Search trending scams
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
            autoComplete="off"
            className="w-full rounded-[22px] border border-white/10 bg-white/[0.04] px-12 py-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/18 focus:border-[#ff1744]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#ff1744]/40"
            placeholder=""
            aria-describedby="trending-search-status"
          />

          {query.length > 0 && (
            <button
              type="button"
              onClick={onClearQuery}
              aria-label="Clear trending scam search"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/55 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <svg className="h-4 w-4 clear-fade-in" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <p id="trending-search-status" className="sr-only">
          {debouncedQuery ? `${suggestions.length} placeholder suggestions available.` : "Type to search placeholder scams."}
        </p>

        {showSuggestions && (
          <div
            className="card-content-in absolute left-0 right-0 top-[calc(100%+0.75rem)] z-20 rounded-[24px] border border-white/10 bg-[#121729]/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md"
            role="listbox"
            aria-label="Trending scam search suggestions"
          >
            <div className="mb-2 flex items-center justify-between px-2">
              <div className="trending-redacted h-2.5 w-20 rounded-full" aria-hidden="true" />
              <div className="trending-redacted h-2.5 w-14 rounded-full opacity-70" aria-hidden="true" />
            </div>

            <div className="grid gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion}-${index}`}
                  type="button"
                  role="option"
                  aria-label={`Use suggestion ${suggestion}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => onSuggestionSelect(suggestion)}
                  className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3 text-left transition-all duration-200 hover:border-[#ff1744]/20 hover:bg-white/[0.06]"
                >
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "spike-dot-pulse bg-[#ff1744]" : "bg-white/20"}`}
                    aria-hidden="true"
                  />
                  <span className="sr-only">{suggestion}</span>
                  <div className="min-w-0 flex-1 space-y-2" aria-hidden="true">
                    <div className="trending-redacted h-2.5 w-32 rounded-full" />
                    <div className="trending-redacted h-2 w-20 rounded-full opacity-70" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
