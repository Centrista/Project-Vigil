"use client";

import type { CSSProperties } from "react";
import { hydrate, type ChoiceId, type EncounterChoice } from "@/lib/scam-battle-engine";

const DANGER_HINTS: Record<number, { label: string; color: string }> = {
  0: { label: "SAFE", color: "#22c55e" },
  1: { label: "SAFE", color: "#22c55e" },
  2: { label: "RISKY", color: "#f59e0b" },
  3: { label: "RISKY", color: "#f59e0b" },
  4: { label: "DANGER", color: "#ff1744" },
  5: { label: "DANGER", color: "#ff1744" },
};

export default function EncounterChoices({
  choices,
  tokens,
  onPick,
  disabled = false,
}: {
  choices: EncounterChoice[];
  tokens: Record<string, string>;
  onPick: (id: ChoiceId) => void;
  disabled?: boolean;
}) {
  return (
    <div className="sb-choices">
      {choices.map((c, idx) => (
        <button
          key={c.id}
          type="button"
          disabled={disabled}
          onClick={() => onPick(c.id)}
          className="sb-choice-btn"
          style={{ "--sb-choice-delay": `${idx * 80}ms` } as CSSProperties}
        >
          <span className="sb-choice-letter">{c.id.toUpperCase()}</span>
          <span className="sb-choice-text">{hydrate(c.text, tokens)}</span>
        </button>
      ))}
    </div>
  );
}

// Hint label exported for use in result screens if needed.
export function dangerHint(danger: number) {
  return DANGER_HINTS[Math.min(5, Math.max(0, danger))];
}
