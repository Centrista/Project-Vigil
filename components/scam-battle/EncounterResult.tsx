"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PokemonSprite from "@/components/scam-battle/PokemonSprite";
import type { EncounterReport } from "@/lib/scam-battle-engine";
import type { PokemonScam } from "@/lib/pokedex";

export default function EncounterResult({
  entry,
  report,
  onContinue,
  onRetry,
}: {
  entry: PokemonScam;
  report: EncounterReport;
  onContinue: () => void;
  onRetry: () => void;
}) {
  const [captureStage, setCaptureStage] = useState<
    "throwing" | "shake1" | "shake2" | "shake3" | "caught" | "report"
  >("throwing");

  useEffect(() => {
    const t1 = setTimeout(() => setCaptureStage("shake1"), 450);
    const t2 = setTimeout(() => setCaptureStage("shake2"), 850);
    const t3 = setTimeout(() => setCaptureStage("shake3"), 1250);
    const t4 = setTimeout(() => setCaptureStage("caught"), 1650);
    const t5 = setTimeout(() => setCaptureStage("report"), 2400);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, []);

  if (captureStage !== "report") {
    return (
      <div className="sb-result-capture">
        <PokemonSprite
          entry={entry}
          state={captureStage === "caught" ? "captured" : "victory-pose"}
          size={200}
        />
        <div className={`sb-pokeball sb-pokeball-${captureStage}`}>
          <div className="sb-pokeball-top" />
          <div className="sb-pokeball-band" />
          <div className="sb-pokeball-bottom" />
          <div className="sb-pokeball-center" />
        </div>
        {captureStage === "caught" ? (
          <p className="sb-result-caught-text">Caught {entry.name}!</p>
        ) : null}
      </div>
    );
  }

  const starGlyphs = "★★★".slice(0, report.stars).padEnd(3, "☆");

  return (
    <div className="sb-result">
      <div className="sb-result-header">
        <div className="sb-result-stars" aria-label={`${report.stars} stars`}>
          {starGlyphs}
        </div>
        <h2 className="sb-result-title">{entry.name} — Encounter Report</h2>
        <p className="sb-result-summary">{report.summary}</p>
      </div>

      {report.redFlagsCaught.length > 0 ? (
        <div className="sb-result-section sb-result-section-caught">
          <span className="mono-label sb-result-section-label">✅ You spotted</span>
          <ul>
            {report.redFlagsCaught.map((f) => (
              <li key={f.id}>{f.description}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {report.redFlagsMissed.length > 0 ? (
        <div className="sb-result-section sb-result-section-missed">
          <span className="mono-label sb-result-section-label">❌ You missed</span>
          <ul>
            {report.redFlagsMissed.map((f) => (
              <li key={f.id}>{f.description}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="sb-result-actions">
        <button type="button" className="btn-ghost flex-1" onClick={onRetry}>
          Battle Again
        </button>
        <button type="button" className="btn-red flex-1" onClick={onContinue}>
          Continue Run →
        </button>
        <Link
          href={`/pokedex/${entry.slug}`}
          className="mono-label sb-result-pokedex-link"
        >
          View in Pokédex →
        </Link>
      </div>
    </div>
  );
}
