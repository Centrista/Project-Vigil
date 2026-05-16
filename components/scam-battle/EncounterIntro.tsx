"use client";

import { useEffect, useState } from "react";
import PokemonSprite from "@/components/scam-battle/PokemonSprite";
import type { PokemonScam } from "@/lib/pokedex";

export default function EncounterIntro({
  entry,
  onComplete,
}: {
  entry: PokemonScam;
  onComplete: () => void;
}) {
  const [stage, setStage] = useState<"flash" | "silhouette" | "reveal" | "banner">(
    "flash",
  );

  useEffect(() => {
    const t1 = setTimeout(() => setStage("silhouette"), 250);
    const t2 = setTimeout(() => setStage("reveal"), 900);
    const t3 = setTimeout(() => setStage("banner"), 1500);
    const t4 = setTimeout(() => onComplete(), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="sb-intro-root">
      {stage === "flash" ? <div className="sb-intro-flash" /> : null}
      <div className="sb-intro-stage">
        {(stage === "silhouette" || stage === "reveal" || stage === "banner") && (
          <PokemonSprite
            entry={entry}
            state={stage === "silhouette" ? "intro-silhouette" : "intro-reveal"}
            size={240}
          />
        )}
        {stage === "banner" ? (
          <div className="sb-intro-banner">
            <span className="sb-intro-banner-kicker">WILD SCAM APPEARED!</span>
            <span className="sb-intro-banner-name">{entry.name.toUpperCase()}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
