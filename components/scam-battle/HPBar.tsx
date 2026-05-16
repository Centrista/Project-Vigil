"use client";

import type { CSSProperties } from "react";

export default function HPBar({
  hp,
  max = 100,
  label,
  align = "left",
}: {
  hp: number;
  max?: number;
  label: string;
  align?: "left" | "right";
}) {
  const pct = Math.max(0, Math.min(100, (hp / max) * 100));
  const color =
    pct > 50 ? "#22c55e" : pct > 20 ? "#f59e0b" : "#ff1744";
  return (
    <div className={`sb-hp ${align === "right" ? "sb-hp-right" : ""}`}>
      <div className="sb-hp-meta">
        <span className="mono-label sb-hp-label">{label}</span>
        <span className="mono-label sb-hp-value">{Math.round(hp)} / {max}</span>
      </div>
      <div className="sb-hp-track">
        <div
          className="sb-hp-fill"
          style={
            {
              width: `${pct}%`,
              "--hp-color": color,
            } as CSSProperties
          }
        />
      </div>
    </div>
  );
}
