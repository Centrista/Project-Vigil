"use client";

import Link from "next/link";
import EncounterStage from "@/components/scam-battle/EncounterStage";
import InboxFeed from "@/components/scam-battle/InboxFeed";
import RunSummary from "@/components/scam-battle/RunSummary";
import { useDrillRun } from "@/components/scam-battle/useDrillRun";

export default function ScamBattleRunPage() {
  const run = useDrillRun();
  const { state, currentScenario, submitVerdict, dismissReveal, completeEncounter, skipEncounter, restart, totalScenarios } = run;

  return (
    <div className="w-full overflow-x-hidden">
      <div className="page-section">
        <div className="page-frame page-frame-narrow space-y-5 pt-6">
          {state.phase !== "summary" ? (
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/"
                className="mono-label text-[11px] uppercase tracking-[0.22em] text-white/45 hover:text-white/80"
              >
                ← Exit
              </Link>
              <span className="mono-label text-[11px] uppercase tracking-[0.22em] text-white/45">
                Message {Math.min(state.index + 1, totalScenarios)} / {totalScenarios}
              </span>
            </div>
          ) : null}

          {state.phase === "viewing" && currentScenario ? (
            <InboxFeed
              scenario={currentScenario}
              phase="viewing"
              outcome={null}
              onVerdict={submitVerdict}
              onContinue={dismissReveal}
            />
          ) : null}

          {state.phase === "verdict" && currentScenario && state.lastOutcome ? (
            <InboxFeed
              scenario={currentScenario}
              phase="verdict"
              outcome={state.lastOutcome}
              onVerdict={submitVerdict}
              onContinue={dismissReveal}
            />
          ) : null}

          {state.phase === "encounter" && state.lastOutcome?.kind === "scam-caught" ? (
            <EncounterStage
              pokemonSlug={state.lastOutcome.pokemonSlug}
              onComplete={completeEncounter}
              onSkip={skipEncounter}
            />
          ) : null}

          {state.phase === "summary" ? (
            <RunSummary
              totalScenarios={totalScenarios}
              correctCount={state.correctCount}
              caughtPokemon={state.caughtPokemon}
              encounterScores={state.encounterScores}
              missedScams={state.missedScams}
              onPlayAgain={restart}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
