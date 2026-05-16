"use client";

import ScenarioCard from "@/components/scam-battle/ScenarioCard";
import ScamOrLegitButtons from "@/components/scam-battle/ScamOrLegitButtons";
import VerdictReveal from "@/components/scam-battle/VerdictReveal";
import type {
  InboxScenario,
  Verdict,
  VerdictOutcome,
} from "@/lib/scam-battle-engine";

export default function InboxFeed({
  scenario,
  phase,
  outcome,
  onVerdict,
  onContinue,
}: {
  scenario: InboxScenario;
  phase: "viewing" | "verdict";
  outcome: VerdictOutcome | null;
  onVerdict: (v: Verdict) => void;
  onContinue: () => void;
}) {
  const redFlagsForReveal =
    outcome && outcome.kind === "legit-false-alarm"
      ? // for false alarms we use the "why it was legit" lesson set
        scenario.redFlagsToTeach
      : outcome && outcome.kind === "legit-confirmed"
        ? scenario.redFlagsToTeach
        : outcome && (outcome.kind === "scam-caught" || outcome.kind === "scam-missed")
          ? outcome.redFlags
          : [];

  return (
    <div className="mx-auto w-full max-w-[440px]">
      <ScenarioCard scenario={scenario} />

      {phase === "viewing" ? (
        <>
          <p className="mono-label mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-white/40">
            Read the message — is it scam or legit?
          </p>
          <ScamOrLegitButtons onVerdict={onVerdict} />
        </>
      ) : null}

      {phase === "verdict" && outcome ? (
        <VerdictReveal
          outcome={outcome}
          redFlags={redFlagsForReveal}
          onContinue={onContinue}
        />
      ) : null}
    </div>
  );
}
