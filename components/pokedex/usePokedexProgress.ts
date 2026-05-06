"use client";

import { useEffect, useState } from "react";

const VIEWED_STORAGE_KEY = "project-vigil-pokedex-viewed";
const LEARNED_STORAGE_KEY = "project-vigil-pokedex-learned";

function readStoredSlugs(storageKey: string) {
  if (typeof window === "undefined") {
    return new Set<string>();
  }

  try {
    const raw = window.localStorage.getItem(storageKey);

    if (!raw) {
      return new Set<string>();
    }

    const parsed = JSON.parse(raw);

    return new Set(
      Array.isArray(parsed)
        ? parsed.filter((value): value is string => typeof value === "string")
        : [],
    );
  } catch {
    return new Set<string>();
  }
}

export function usePokedexProgress() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [viewedSlugs, setViewedSlugs] = useState<Set<string>>(new Set());
  const [learnedSlugs, setLearnedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    setViewedSlugs(readStoredSlugs(VIEWED_STORAGE_KEY));
    setLearnedSlugs(readStoredSlugs(LEARNED_STORAGE_KEY));
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(
      VIEWED_STORAGE_KEY,
      JSON.stringify(Array.from(viewedSlugs)),
    );
  }, [hasHydrated, viewedSlugs]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(
      LEARNED_STORAGE_KEY,
      JSON.stringify(Array.from(learnedSlugs)),
    );
  }, [hasHydrated, learnedSlugs]);

  function markViewed(slug: string) {
    setViewedSlugs((current) => {
      if (current.has(slug)) {
        return current;
      }

      const next = new Set(current);
      next.add(slug);
      return next;
    });
  }

  function toggleLearned(slug: string) {
    setLearnedSlugs((current) => {
      const next = new Set(current);

      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }

      return next;
    });
  }

  return {
    hasHydrated,
    viewedSlugs,
    learnedSlugs,
    markViewed,
    toggleLearned,
  };
}
