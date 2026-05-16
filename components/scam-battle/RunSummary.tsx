"use client";

import Link from "next/link";
import { POKEDEX_ENTRIES_BY_SLUG } from "@/lib/pokedex";

export default function RunSummary({
  totalScenarios,
  correctCount,
  caughtPokemon,
  encounterScores,
  missedScams,
  onPlayAgain,
}: {
  totalScenarios: number;
  correctCount: number;
  caughtPokemon: string[];
  encounterScores: number[];
  missedScams: string[];
  onPlayAgain: () => void;
}) {
  const accuracyPct = Math.round((correctCount / totalScenarios) * 100);
  const avgDanger =
    encounterScores.length === 0
      ? 0
      : encounterScores.reduce((a, b) => a + b, 0) / encounterScores.length;
  const trainerRank =
    accuracyPct >= 90 && avgDanger <= 3
      ? { label: "Diamond Sleuth", color: "#00d4ff" }
      : accuracyPct >= 75
        ? { label: "Gold Sleuth", color: "#ffd700" }
        : accuracyPct >= 50
          ? { label: "Silver Sleuth", color: "#cbd5e1" }
          : { label: "Bronze Sleuth", color: "#b87333" };

  return (
    <div className="sb-runsummary">
      <div className="sb-runsummary-header">
        <span className="mono-label sb-runsummary-kicker">RUN COMPLETE</span>
        <h1 className="sb-runsummary-title">
          You ended as a{" "}
          <span style={{ color: trainerRank.color }}>{trainerRank.label}</span>
        </h1>
        <p className="sb-runsummary-sub">
          {correctCount} / {totalScenarios} correct calls · {accuracyPct}% accuracy
        </p>
      </div>

      <div className="sb-runsummary-stats">
        <div className="sb-runsummary-stat">
          <span className="mono-label">Correct calls</span>
          <strong>{correctCount} / {totalScenarios}</strong>
        </div>
        <div className="sb-runsummary-stat">
          <span className="mono-label">Pokémon caught</span>
          <strong>{caughtPokemon.length}</strong>
        </div>
        <div className="sb-runsummary-stat">
          <span className="mono-label">Avg encounter danger</span>
          <strong>{avgDanger.toFixed(1)}</strong>
        </div>
      </div>

      {caughtPokemon.length > 0 ? (
        <div className="sb-runsummary-section">
          <span className="mono-label sb-runsummary-section-label">
            ✅ Caught this run
          </span>
          <div className="sb-runsummary-pokemon-row">
            {caughtPokemon.map((slug) => {
              const entry = POKEDEX_ENTRIES_BY_SLUG[slug];
              if (!entry) return null;
              return (
                <Link
                  key={slug}
                  href={`/pokedex/${slug}`}
                  className="sb-runsummary-pokemon-chip"
                >
                  <img src={`/images/pokedex/${entry.image}`} alt={entry.name} />
                  <span>{entry.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}

      {missedScams.length > 0 ? (
        <div className="sb-runsummary-section sb-runsummary-section-warning">
          <span className="mono-label sb-runsummary-section-label">
            ❌ Scams you missed
          </span>
          <div className="sb-runsummary-pokemon-row">
            {missedScams.map((slug) => {
              const entry = POKEDEX_ENTRIES_BY_SLUG[slug];
              if (!entry) return null;
              return (
                <Link
                  key={slug}
                  href={`/pokedex/${slug}`}
                  className="sb-runsummary-pokemon-chip sb-runsummary-pokemon-chip-missed"
                >
                  <img src={`/images/pokedex/${entry.image}`} alt={entry.name} />
                  <span>{entry.name}</span>
                </Link>
              );
            })}
          </div>
          <p className="sb-runsummary-warning-copy">
            Open these in the Pokédex to study the playbook before your next run.
          </p>
        </div>
      ) : null}

      <div className="sb-runsummary-actions">
        <button type="button" className="btn-red w-full px-4 py-3" onClick={onPlayAgain}>
          New Run
        </button>
        <Link href="/pokedex" className="btn-ghost w-full px-4 py-3 text-center">
          Back to Pokédex
        </Link>
      </div>

      <p className="sb-runsummary-footnote">
        Session-only — nothing was saved. Each run gives you a fresh scenario mix.
      </p>
    </div>
  );
}
