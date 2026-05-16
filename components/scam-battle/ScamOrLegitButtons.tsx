"use client";

import type { Verdict } from "@/lib/scam-battle-engine";

export default function ScamOrLegitButtons({
  onVerdict,
  disabled = false,
}: {
  onVerdict: (v: Verdict) => void;
  disabled?: boolean;
}) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onVerdict("legit")}
        className="group rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-4 text-left transition-all hover:border-emerald-400/45 hover:bg-emerald-400/15 disabled:opacity-40"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">✅</span>
          <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-emerald-300">
            Looks Legit
          </span>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-white/55">
          Trust it, no action needed.
        </p>
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onVerdict("scam")}
        className="group rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-4 text-left transition-all hover:border-rose-400/55 hover:bg-rose-400/15 disabled:opacity-40"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">🚨</span>
          <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-rose-300">
            Looks Sus
          </span>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-white/55">
          Flag it, brace for impact.
        </p>
      </button>
    </div>
  );
}
