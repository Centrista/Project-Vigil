"use client";

import type { VerdictOutcome } from "@/lib/scam-battle-engine";

export default function VerdictReveal({
  outcome,
  redFlags,
  onContinue,
}: {
  outcome: VerdictOutcome;
  redFlags?: string[];
  onContinue: () => void;
}) {
  const isCorrect =
    outcome.kind === "scam-caught" || outcome.kind === "legit-confirmed";
  const isScamMissed = outcome.kind === "scam-missed";
  const isFalseAlarm = outcome.kind === "legit-false-alarm";

  const tone = isCorrect
    ? { accent: "#22c55e", label: "CORRECT", emoji: "✅" }
    : isScamMissed
      ? { accent: "#ff1744", label: "MISSED IT", emoji: "❌" }
      : { accent: "#f59e0b", label: "FALSE ALARM", emoji: "⚠️" };

  const headline =
    outcome.kind === "scam-caught"
      ? "You spotted the scam — encounter incoming."
      : outcome.kind === "scam-missed"
        ? "That was a scam. You would've fallen for it."
        : outcome.kind === "legit-confirmed"
          ? "That was real. Good call."
          : "That was actually legit — you would've blocked a real message.";

  const continueLabel =
    outcome.kind === "scam-caught" ? "Enter Encounter →" : "Next message →";

  return (
    <div
      className="mt-5 overflow-hidden rounded-[24px] border bg-white/[0.03] backdrop-blur-[6px]"
      style={{
        borderColor: `${tone.accent}55`,
        boxShadow: `0 20px 60px ${tone.accent}22, inset 0 0 0 1px ${tone.accent}22`,
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: `${tone.accent}1f` }}
      >
        <span className="text-base">{tone.emoji}</span>
        <span
          className="mono-label text-[11px] uppercase tracking-[0.22em]"
          style={{ color: tone.accent }}
        >
          {tone.label}
        </span>
      </div>
      <div className="px-4 py-4">
        <h3 className="text-[15px] font-semibold leading-snug text-white">
          {headline}
        </h3>

        {outcome.kind !== "scam-caught" && outcome.kind !== "legit-confirmed" && outcome.lesson ? (
          <p className="mt-2 text-[12px] leading-relaxed text-white/65">
            {outcome.lesson}
          </p>
        ) : null}

        {redFlags && redFlags.length > 0 ? (
          <div className="mt-3 rounded-xl border border-white/8 bg-white/[0.03] p-3">
            <p className="mono-label mb-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
              {isFalseAlarm ? "Why it was actually fine" : "Tells you can use"}
            </p>
            <ul className="space-y-1.5">
              {redFlags.map((flag) => (
                <li
                  key={flag}
                  className="flex gap-2 text-[11px] leading-relaxed text-white/70"
                >
                  <span style={{ color: tone.accent }}>•</span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <button
          type="button"
          onClick={onContinue}
          className="btn-red mt-4 w-full px-4 py-3 text-[13px]"
          style={
            isCorrect && outcome.kind !== "scam-caught"
              ? { background: tone.accent, boxShadow: "none" }
              : undefined
          }
        >
          {continueLabel}
        </button>
      </div>
    </div>
  );
}
