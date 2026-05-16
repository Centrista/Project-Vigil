"use client";

import type { CSSProperties } from "react";
import { POKEDEX_TYPE_META, type PokemonScam } from "@/lib/pokedex";

export type SpriteState = "intro-silhouette" | "intro-reveal" | "idle" | "flinch" | "victory-pose" | "captured";

export default function PokemonSprite({
  entry,
  state = "idle",
  size = 220,
}: {
  entry: PokemonScam;
  state?: SpriteState;
  size?: number;
}) {
  const typeMeta = POKEDEX_TYPE_META[entry.type];
  const accent = typeMeta.color;
  const glow = typeMeta.glow;

  const animClass = {
    "intro-silhouette": "sb-sprite-silhouette",
    "intro-reveal": "sb-sprite-reveal",
    idle: "sb-sprite-idle",
    flinch: "sb-sprite-flinch",
    "victory-pose": "sb-sprite-victory",
    captured: "sb-sprite-captured",
  }[state];

  return (
    <div
      className="sb-sprite-stage"
      style={
        {
          width: size,
          height: size + 30,
          "--sb-accent": accent,
          "--sb-glow": glow,
        } as CSSProperties
      }
    >
      <div className="sb-sprite-platform" aria-hidden="true" />
      <div className={`sb-sprite-img-wrap ${animClass}`}>
        <img
          src={`/images/pokedex/${entry.image}`}
          alt={entry.name}
          className="sb-sprite-img"
          draggable={false}
        />
      </div>
    </div>
  );
}
