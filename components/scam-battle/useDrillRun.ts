"use client";

import { useCallback, useMemo, useState } from "react";
import {
  buildRun,
  evaluateVerdict,
  type InboxScenario,
  type Verdict,
  type VerdictOutcome,
} from "@/lib/scam-battle-engine";
import { INBOX_POOL } from "@/lib/scam-battle-scenarios";

export type RunPhase =
  | "viewing"        // player is reading the current scenario
  | "verdict"        // verdict reveal card showing
  | "encounter"      // Pokémon encounter screen active
  | "summary";       // end-of-run report

export interface DrillRunState {
  scenarios: InboxScenario[];
  index: number;
  phase: RunPhase;
  lastOutcome: VerdictOutcome | null;
  correctCount: number;
  caughtPokemon: string[];      // slugs caught via correct sus call
  encounterScores: number[];    // raw danger totals, lower is better
  missedScams: string[];        // slugs of scams flagged as legit
}

export interface DrillRunApi {
  state: DrillRunState;
  currentScenario: InboxScenario | null;
  submitVerdict: (v: Verdict) => void;
  dismissReveal: () => void;
  completeEncounter: (slug: string, totalDanger: number) => void;
  skipEncounter: () => void;
  restart: () => void;
  totalScenarios: number;
}

const RUN_LENGTH = 8;

function buildInitial(): DrillRunState {
  const { scenarios } = buildRun(INBOX_POOL, RUN_LENGTH);
  return {
    scenarios,
    index: 0,
    phase: "viewing",
    lastOutcome: null,
    correctCount: 0,
    caughtPokemon: [],
    encounterScores: [],
    missedScams: [],
  };
}

export function useDrillRun(): DrillRunApi {
  const [state, setState] = useState<DrillRunState>(() => buildInitial());

  const currentScenario = useMemo(
    () => state.scenarios[state.index] ?? null,
    [state.scenarios, state.index],
  );

  const submitVerdict = useCallback((v: Verdict) => {
    setState((prev) => {
      if (prev.phase !== "viewing") return prev;
      const scenario = prev.scenarios[prev.index];
      if (!scenario) return prev;
      const outcome = evaluateVerdict(scenario, v);
      const correct =
        outcome.kind === "scam-caught" || outcome.kind === "legit-confirmed";
      const missed =
        outcome.kind === "scam-missed"
          ? [...prev.missedScams, outcome.pokemonSlug]
          : prev.missedScams;
      return {
        ...prev,
        phase: "verdict",
        lastOutcome: outcome,
        correctCount: prev.correctCount + (correct ? 1 : 0),
        missedScams: missed,
      };
    });
  }, []);

  const dismissReveal = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "verdict") return prev;
      // If the player correctly identified a scam, trigger the encounter.
      if (prev.lastOutcome?.kind === "scam-caught") {
        return { ...prev, phase: "encounter" };
      }
      // Otherwise advance to next scenario or end run.
      const nextIndex = prev.index + 1;
      if (nextIndex >= prev.scenarios.length) {
        return { ...prev, phase: "summary", lastOutcome: null };
      }
      return {
        ...prev,
        index: nextIndex,
        phase: "viewing",
        lastOutcome: null,
      };
    });
  }, []);

  const completeEncounter = useCallback(
    (slug: string, totalDanger: number) => {
      setState((prev) => {
        const nextIndex = prev.index + 1;
        const caught = prev.caughtPokemon.includes(slug)
          ? prev.caughtPokemon
          : [...prev.caughtPokemon, slug];
        const scores = [...prev.encounterScores, totalDanger];
        if (nextIndex >= prev.scenarios.length) {
          return {
            ...prev,
            phase: "summary",
            caughtPokemon: caught,
            encounterScores: scores,
            lastOutcome: null,
          };
        }
        return {
          ...prev,
          index: nextIndex,
          phase: "viewing",
          caughtPokemon: caught,
          encounterScores: scores,
          lastOutcome: null,
        };
      });
    },
    [],
  );

  const skipEncounter = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.index + 1;
      if (nextIndex >= prev.scenarios.length) {
        return { ...prev, phase: "summary", lastOutcome: null };
      }
      return {
        ...prev,
        index: nextIndex,
        phase: "viewing",
        lastOutcome: null,
      };
    });
  }, []);

  const restart = useCallback(() => {
    setState(buildInitial());
  }, []);

  return {
    state,
    currentScenario,
    submitVerdict,
    dismissReveal,
    completeEncounter,
    skipEncounter,
    restart,
    totalScenarios: state.scenarios.length,
  };
}
