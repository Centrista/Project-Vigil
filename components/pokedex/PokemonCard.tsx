"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import PokemonRarityStars from "@/components/pokedex/PokemonRarityStars";
import type { PokemonScam } from "@/lib/pokedex";
import { POKEDEX_TYPE_META } from "@/lib/pokedex";

export default function PokemonCard({
  entry,
  index,
  isLearned,
  onOpen,
}: {
  entry: PokemonScam;
  index: number;
  isLearned: boolean;
  onOpen: () => void;
}) {
  const typeMeta = POKEDEX_TYPE_META[entry.type];

  return (
    <button
      type="button"
      className="pokedex-card pokedex-card-enter"
      style={
        {
          "--pokedex-accent": typeMeta.color,
          "--pokedex-glow": typeMeta.glow,
          "--pokedex-card-delay": `${index * 70}ms`,
        } as CSSProperties
      }
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`Open ${entry.name}`}
    >
      <span className="pokedex-card-noise" aria-hidden="true" />
      <span className="pokedex-card-foil" aria-hidden="true" />
      <div className="pokedex-card-header">
        <span className="mono-label pokedex-card-number">
          #{String(entry.number).padStart(3, "0")}
        </span>
        <span
          className="mono-label pokedex-card-type"
          style={{
            color: typeMeta.color,
            background: typeMeta.badgeBackground,
            borderColor: `${typeMeta.color}45`,
          }}
        >
          {entry.type}
        </span>
      </div>

      <p
        className="mono-label pokedex-card-scam-label"
        style={{ color: typeMeta.color }}
      >
        {entry.scamLabel}
      </p>

      <div className="pokedex-card-titlebar">
        <h2 className="pokedex-card-name">{entry.name}</h2>
        <div className="pokedex-card-threat">
          <span className="mono-label pokedex-card-threat-label">TL</span>
          <span className="pokedex-card-threat-value">{entry.threatLevel}</span>
        </div>
      </div>

      <div className="pokedex-card-rarity">
        <PokemonRarityStars rarity={entry.rarity} />
        {isLearned ? <span className="pokedex-card-learned">LEARNED</span> : null}
      </div>

      <div className="pokedex-card-type-line">{entry.pokemonType.join(" / ")}</div>

      <div className="pokedex-card-image-frame">
        <div className="pokedex-card-image-frame-top">
          <span className="mono-label">Field Art</span>
          <span className="mono-label">{entry.rarity}</span>
        </div>
        <div className="pokedex-card-image-glow" aria-hidden="true" />
        <div className="pokedex-card-image-wrap">
          <Image
            src={`/images/pokedex/${entry.image}`}
            alt={entry.name}
            width={160}
            height={160}
            className="pokedex-card-image"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 22vw, 160px"
          />
        </div>
      </div>

      <div className="pokedex-card-body">
        <p className="pokedex-card-caption">Click to unleash full intel</p>
      </div>
    </button>
  );
}
