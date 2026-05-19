"use client";

import { useEffect, useState } from "react";
import EncounterChoices from "@/components/scam-battle/EncounterChoices";
import EncounterDialogue from "@/components/scam-battle/EncounterDialogue";
import EncounterIntro from "@/components/scam-battle/EncounterIntro";
import EncounterResult from "@/components/scam-battle/EncounterResult";
import HPBar from "@/components/scam-battle/HPBar";
import PokemonSprite, { type SpriteState } from "@/components/scam-battle/PokemonSprite";
import { useEncounter } from "@/components/scam-battle/useEncounter";
import { getEncounterTree } from "@/lib/scam-battle-encounters";
import type { ChoiceId } from "@/lib/scam-battle-engine";
import { getPokedexEntryBySlug } from "@/lib/pokedex";

export default function EncounterStage({
  pokemonSlug,
  onComplete,
  onSkip,
}: {
  pokemonSlug: string;
  onComplete: (slug: string, totalDanger: number) => void;
  onSkip: () => void;
}) {
  const entry = getPokedexEntryBySlug(pokemonSlug);
  const tree = getEncounterTree(pokemonSlug);
  if (!entry || !tree) {
    return (
      <div className="sb-stage-error">
        <p>Encounter not available for: {pokemonSlug}</p>
        <button type="button" className="btn-ghost mt-3" onClick={onSkip}>
          Skip
        </button>
      </div>
    );
  }

  return <EncounterStageInner entry={entry} tree={tree} onComplete={onComplete} />;
}

function EncounterStageInner({
  entry,
  tree,
  onComplete,
}: {
  entry: ReturnType<typeof getPokedexEntryBySlug> & {};
  tree: ReturnType<typeof getEncounterTree> & {};
  onComplete: (slug: string, totalDanger: number) => void;
}) {
  const api = useEncounter(tree);
  const [spriteState, setSpriteState] = useState<SpriteState>("idle");
  const [shakeKey, setShakeKey] = useState(0);
  const [flashKind, setFlashKind] = useState<"none" | "good" | "bad">("none");

  // Trigger flinch / flash visuals when the player picks a choice
  useEffect(() => {
    const last = api.state.history[api.state.history.length - 1];
    const danger = last?.playerChoiceDanger;
    if (danger === undefined) return;
    if (danger >= 4) {
      setFlashKind("bad");
      setShakeKey((k) => k + 1);
    } else if (danger <= 1) {
      setFlashKind("good");
      setSpriteState("flinch");
      setTimeout(() => setSpriteState("idle"), 450);
    }
    const t = setTimeout(() => setFlashKind("none"), 450);
    return () => clearTimeout(t);
  }, [api.state.history.length]);

  if (api.phase === "intro") {
    return <EncounterIntro entry={entry!} onComplete={api.beginBattle} />;
  }

  if (api.phase === "result" && api.report) {
    return (
      <EncounterResult
        entry={entry!}
        report={api.report}
        endingNote={api.endingNote}
        onContinue={() => onComplete(entry!.slug, api.state.totalDanger)}
        onRetry={api.restart}
      />
    );
  }

  return (
    <div className={`sb-stage ${flashKind !== "none" ? `sb-stage-flash-${flashKind}` : ""}`}>
      <div key={shakeKey} className="sb-stage-shake-wrap">
        <div className="sb-stage-hpbars">
          <HPBar hp={api.pokemonHp} label={`${entry!.name} — manipulation`} align="left" />
          <HPBar hp={api.playerHp} label="Your vigilance" align="right" />
        </div>

        <div className="sb-stage-arena">
          <PokemonSprite entry={entry!} state={spriteState} size={220} />
        </div>

        <EncounterDialogue
          scammerMessage={api.scammerMessage}
          coachingFeedback={api.coachingFeedback}
        />

        <EncounterChoices
          choices={api.choices}
          tokens={api.state.tokens}
          onPick={(id: ChoiceId) => api.pickChoice(id)}
          disabled={api.state.isFinished}
        />
      </div>
    </div>
  );
}
