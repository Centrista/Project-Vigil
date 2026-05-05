import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { POKEDEX_ENTRIES, type PokedexEntry } from "@/lib/pokedex";

export const metadata = {
  title: "Scam Pokédex — Project Vigil",
  description: "Every AI-powered scam type catalogued — strengths, weaknesses, habitat, and how to defend yourself.",
};

function PokedexCard({ entry }: { entry: PokedexEntry }) {
  const entryNum = String(entry.id).padStart(3, "0");
  return (
    <div
      className="card-hover flex flex-col overflow-hidden rounded-[24px]"
      style={{
        border: `2px solid ${entry.typeColor}35`,
        borderTop: `4px solid ${entry.typeColor}`,
        background: "linear-gradient(160deg, #1e2438 0%, #1a1f2e 100%)",
        boxShadow: `0 14px 38px rgba(0,0,0,0.26), 0 0 0 0 ${entry.typeColor}00`,
      }}
    >
      {/* Header band */}
      <div
        className="px-4 pt-4 pb-3 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${entry.typeColor}18 0%, ${entry.typeColor}06 100%)`,
        }}
      >
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
          }}
        />
        <div className="relative flex items-center justify-between mb-3">
          <span
            className="mono-label text-sm font-black tabular-nums"
            style={{ color: `${entry.typeColor}80` }}
          >
            #{entryNum}
          </span>
          <span
            className="mono-label text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded"
            style={{
              color: entry.typeColor,
              background: `${entry.typeColor}20`,
              border: `1px solid ${entry.typeColor}45`,
            }}
          >
            {entry.type}
          </span>
        </div>
        <div className="relative flex items-center justify-center py-3">
          <div
            className="mono-label flex h-16 w-16 items-center justify-center rounded-xl text-sm font-black tracking-[0.2em]"
            style={{
              background: `${entry.typeColor}12`,
              border: `1px solid ${entry.typeColor}25`,
              color: `${entry.typeColor}cc`,
            }}
          >
            {entryNum}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        <h2 className="mono-label font-black text-white text-base uppercase tracking-wide leading-tight mb-2">
          {entry.name}
        </h2>
        <p className="text-xs text-white/48 leading-relaxed mb-4 flex-1">
          {entry.description}
        </p>

        {/* Strengths */}
        {entry.strengths.length > 0 && (
          <div className="mb-3">
            <div className="mono-label text-[10px] font-black uppercase tracking-widest text-white/30 mb-1.5">
              Why It Works
            </div>
            <ul className="space-y-1">
              {entry.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="shrink-0 mt-[5px] w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#ff1744" }} />
                  <span className="text-[11px] text-white/55 leading-snug">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weaknesses */}
        {entry.weaknesses.length > 0 && (
          <div className="mb-3">
            <div className="mono-label text-[10px] font-black uppercase tracking-widest text-white/30 mb-1.5">
              Red Flags
            </div>
            <ul className="space-y-1">
              {entry.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="shrink-0 mt-[5px] w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#22c55e" }} />
                  <span className="text-[11px] text-white/55 leading-snug">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Habitat */}
        {entry.habitat.length > 0 && (
          <div className="mb-4">
            <div className="mono-label text-[10px] font-black uppercase tracking-widest text-white/30 mb-1.5">
              Habitat
            </div>
            <div className="flex flex-wrap gap-1.5">
              {entry.habitat.map((h, i) => (
                <span
                  key={i}
                  className="mono-label text-[10px] px-2 py-0.5 rounded"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Guide link */}
        <Link
          href={entry.guideSlug ? `/guide#${entry.guideSlug}` : "/guide"}
          className="mono-label text-[11px] font-bold flex items-center gap-1 mt-auto transition-opacity hover:opacity-70"
          style={{ color: entry.typeColor }}
        >
          View in Guide
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function PokedexPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="page-frame">
        <PageIntro
          eyebrow="Threat Catalogue"
          title={
            <>
              Scam
              <br />
              <span className="gradient-text-red">Pokédex.</span>
            </>
          }
          description="Every AI-powered scam type catalogued. Know its strengths, its weaknesses, and where it hunts."
          stats={[
            { label: `${POKEDEX_ENTRIES.length} / 16+ catalogued`, tone: "default" },
            { label: "Field guide format", tone: "info" },
          ]}
        />

        {POKEDEX_ENTRIES.length === 0 ? (
          <div className="premium-panel p-16 text-center">
            <div className="mono-label text-2xl font-black text-white/10 mb-3 tracking-widest">
              #000
            </div>
            <div className="mono-label text-xs text-white/25 uppercase tracking-widest mb-3">
              Catalogue Loading...
            </div>
            <p className="text-white/30 text-sm max-w-xs mx-auto leading-relaxed">
              First entries coming soon — 16+ scam types will be catalogued here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {POKEDEX_ENTRIES.map((entry) => (
              <PokedexCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}

        {POKEDEX_ENTRIES.length > 0 && (
          <p className="mono-label text-[11px] text-white/22 mt-5 text-right">
            {POKEDEX_ENTRIES.length} entries catalogued · Targeting AI-assisted scams only
          </p>
        )}
      </div>
    </div>
  );
}
