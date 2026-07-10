"use client";

import { useCallback, useMemo, useState } from "react";
import {
  startEncounter,
  submitChoice,
  assembleReport,
  hydrate,
  type ChoiceId,
  type EncounterChoice,
  type EncounterReport,
  type EncounterState,
  type EncounterTree,
} from "@/lib/scam-battle-engine";

export type EncounterPhase = "intro" | "battle" | "result";

export interface EncounterApi {
  phase: EncounterPhase;
  state: EncounterState;
  report: EncounterReport | null;
  tree: EncounterTree;
  // computed for the current turn
  scammerMessage: string;
  coachingFeedback: string | undefined;
  choices: EncounterChoice[];
  // lesson surfaced on the terminal choice (hydrated with tokens)
  endingNote: string | undefined;
  // hp values for visuals
  playerHp: number;     // 100 down to 0
  pokemonHp: number;    // 100 down to 0
  // actions
  beginBattle: () => void;
  pickChoice: (id: ChoiceId) => void;
  restart: () => void;
}

const MAX_HP = 100;
const HP_PER_TURN = 25;

export function useEncounter(tree: EncounterTree): EncounterApi {
  const [phase, setPhase] = useState<EncounterPhase>("intro");
  // startEncounter() picks randomly, so this must only ever run on the client.
  // Guaranteed by the run page, which renders a skeleton until useDrillRun is
  // ready — an encounter can therefore never appear in prerendered HTML.
  const [state, setState] = useState<EncounterState>(() => startEncounter(tree));
  const [report, setReport] = useState<EncounterReport | null>(null);

  const beginBattle = useCallback(() => setPhase("battle"), []);

  const pickChoice = useCallback(
    (id: ChoiceId) => {
      setState((prev) => {
        const next = submitChoice(prev, id);
        if (next.isFinished) {
          setReport(assembleReport(next, tree));
          setTimeout(() => setPhase("result"), 900);
        }
        return next;
      });
    },
    [tree],
  );

  const restart = useCallback(() => {
    setState(startEncounter(tree));
    setReport(null);
    setPhase("intro");
  }, [tree]);

  // Latest turn in history
  const latest = state.history[state.history.length - 1];
  const scammerMessage = useMemo(
    () => (latest ? hydrate(latest.scammerRaw, state.tokens) : ""),
    [latest, state.tokens],
  );
  const choices = useMemo(
    () => state.currentChoices ?? [],
    [state.currentChoices],
  );

  // HP visuals — derived from cumulative danger
  const totalSafeCredit = useMemo(() => {
    return state.history.reduce((acc, h) => {
      if (h.playerChoiceDanger === undefined) return acc;
      return acc + (5 - h.playerChoiceDanger) * 5;
    }, 0);
  }, [state.history]);

  const playerHp = Math.max(0, MAX_HP - state.totalDanger * HP_PER_TURN);
  const pokemonHp = Math.max(0, MAX_HP - totalSafeCredit);

  const endingNote = useMemo(() => {
    if (!state.isFinished) return undefined;
    const terminal = state.history.find((h) => h.endingNote);
    return terminal?.endingNote ? hydrate(terminal.endingNote, state.tokens) : undefined;
  }, [state.history, state.tokens, state.isFinished]);

  return {
    phase,
    state,
    report,
    tree,
    scammerMessage,
    coachingFeedback: latest?.coachingFeedback,
    choices,
    endingNote,
    playerHp,
    pokemonHp,
    beginBattle,
    pickChoice,
    restart,
  };
}
