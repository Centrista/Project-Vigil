"use client";

import { useEffect, useState } from "react";
import PokemonDetailPanel from "@/components/pokedex/PokemonDetailPanel";
import type { PokemonScam } from "@/lib/pokedex";

const CLOSE_DURATION_MS = 360;

export default function PokemonModal({
  entry,
  relatedEntry,
  isLearned,
  onToggleLearned,
  onShare,
  shareFeedback,
  onOpenRelated,
  onCloseComplete,
}: {
  entry: PokemonScam;
  relatedEntry?: PokemonScam;
  isLearned: boolean;
  onToggleLearned: () => void;
  onShare: () => void;
  shareFeedback?: string | null;
  onOpenRelated?: () => void;
  onCloseComplete: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);

  function requestClose() {
    if (isClosing) {
      return;
    }

    setIsClosing(true);
    window.setTimeout(() => {
      onCloseComplete();
    }, CLOSE_DURATION_MS);
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        requestClose();
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isClosing, onCloseComplete]);

  return (
    <div
      className={`pokedex-modal-shell ${isClosing ? "pokedex-modal-shell-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={entry.name}
    >
      <button
        type="button"
        className="pokedex-modal-backdrop"
        aria-label="Close modal"
        onClick={requestClose}
      />

      <div className="pokedex-modal-frame">
        <button
          type="button"
          className="pokedex-modal-close"
          aria-label="Close modal"
          onClick={requestClose}
        >
          ×
        </button>

        <PokemonDetailPanel
          entry={entry}
          relatedEntry={relatedEntry}
          isLearned={isLearned}
          onToggleLearned={onToggleLearned}
          onShare={onShare}
          shareFeedback={shareFeedback}
          primaryHref={`/pokedex/${entry.slug}`}
          primaryLabel="Learn More →"
          onOpenRelated={onOpenRelated}
        />
      </div>
    </div>
  );
}
