import type { CSSProperties } from "react";
import type { PokemonScamRarity } from "@/lib/pokedex";

const RARITY_FILL_MAP: Record<PokemonScamRarity, number[]> = {
  Common: [0, 0, 0],
  Uncommon: [1, 0.5, 0],
  Rare: [1, 1, 1],
};

function RarityStar({
  fill,
  glow,
}: {
  fill: number;
  glow: boolean;
}) {
  return (
    <span
      className={`pokedex-rarity-star ${glow ? "pokedex-rarity-star-glow" : ""}`}
      aria-hidden="true"
    >
      <span className="pokedex-rarity-star-outline">☆</span>
      {fill > 0 ? (
        <span
          className="pokedex-rarity-star-fill"
          style={{ "--star-fill": `${fill * 100}%` } as CSSProperties}
        >
          ★
        </span>
      ) : null}
    </span>
  );
}

export default function PokemonRarityStars({
  rarity,
}: {
  rarity: PokemonScamRarity;
}) {
  const fillValues = RARITY_FILL_MAP[rarity];

  return (
    <div className="pokedex-rarity-row" aria-label={`${rarity} rarity`}>
      {fillValues.map((fillValue, index) => (
        <RarityStar
          key={`${rarity}-${index}`}
          fill={fillValue}
          glow={rarity === "Rare"}
        />
      ))}
    </div>
  );
}
