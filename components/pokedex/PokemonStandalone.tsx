"use client";

import { useEffect, useState } from "react";
import PokemonDetailPanel from "@/components/pokedex/PokemonDetailPanel";
import { usePokedexProgress } from "@/components/pokedex/usePokedexProgress";
import type { PokemonScam } from "@/lib/pokedex";

export default function PokemonStandalone({
  entry,
  relatedEntry,
}: {
  entry: PokemonScam;
  relatedEntry?: PokemonScam;
}) {
  const { learnedSlugs, markViewed, toggleLearned } = usePokedexProgress();
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const isLearned = learnedSlugs.has(entry.slug);

  useEffect(() => {
    markViewed(entry.slug);
  }, [entry.slug, markViewed]);

  async function handleShare() {
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
    <PokemonDetailPanel
      entry={entry}
      relatedEntry={relatedEntry}
      isLearned={isLearned}
      onToggleLearned={() => toggleLearned(entry.slug)}
      onShare={handleShare}
      shareFeedback={shareFeedback}
      primaryHref={`/pokedex?entry=${entry.slug}`}
      primaryLabel="View in Grid"
      relatedHref={relatedEntry ? `/pokedex/${relatedEntry.slug}` : undefined}
      variant="standalone"
    />
  );
}
