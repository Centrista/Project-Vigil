"use client";

import { useState } from "react";
import Link from "next/link";
import type { GuideEntry } from "@/lib/guide-data";

function SectionBlock({
  label,
  accentColor,
  children,
}: {
  label: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: `${accentColor}07`,
        border: `1px solid ${accentColor}18`,
        borderLeft: `3px solid ${accentColor}65`,
      }}
    >
      <div
        className="mono-label text-[9px] font-black uppercase tracking-[0.2em] mb-3"
        style={{ color: `${accentColor}aa` }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

export default function GuideCard({ entry }: { entry: GuideEntry }) {
  const [expanded, setExpanded] = useState(false);
  const entryBadge = String(entry.id).padStart(2, "0");

  return (
    <div
      id={entry.slug}
      className="flex flex-col overflow-hidden transition-all duration-300"
      style={{
        borderRadius: "20px",
        background: "linear-gradient(160deg, rgba(14,20,38,0.98) 0%, rgba(10,15,26,1) 100%)",
        border: `1px solid ${entry.categoryColor}28`,
        borderTop: `2px solid ${entry.categoryColor}90`,
        boxShadow: expanded
          ? `0 12px 48px rgba(0,0,0,0.55), 0 0 0 1px ${entry.categoryColor}18, inset 0 1px 0 rgba(255,255,255,0.04)`
          : "0 4px 20px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {/* Header — always visible */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left px-5 pt-5 pb-4 focus:outline-none group"
      >
        <div className="flex items-start gap-3.5">
          {/* Number badge */}
          <div
            className="mono-label shrink-0 flex h-10 w-10 items-center justify-center text-[11px] font-black tracking-[0.16em] transition-all duration-200"
            style={{
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${entry.categoryColor}22 0%, ${entry.categoryColor}0c 100%)`,
              border: `1px solid ${entry.categoryColor}40`,
              color: entry.categoryColor,
              boxShadow: expanded ? `0 0 12px ${entry.categoryColor}30` : "none",
            }}
          >
            {entryBadge}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span
                className="mono-label text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-lg"
                style={{
                  color: entry.categoryColor,
                  background: `${entry.categoryColor}18`,
                  border: `1px solid ${entry.categoryColor}35`,
                }}
              >
                {entry.categoryLabel}
              </span>
            </div>
            <h3 className="font-black text-white text-[15px] leading-tight">{entry.name}</h3>
            <p className="mt-1 text-[12px] text-white/56 leading-snug">{entry.tagline}</p>
          </div>

          {/* Chevron */}
          <div
            className="shrink-0 mt-1 w-7 h-7 flex items-center justify-center transition-all duration-300"
            style={{
              borderRadius: "10px",
              background: expanded ? `${entry.categoryColor}20` : "rgba(255,255,255,0.04)",
              border: expanded ? `1px solid ${entry.categoryColor}40` : "1px solid rgba(255,255,255,0.08)",
              color: expanded ? entry.categoryColor : "rgba(255,255,255,0.28)",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-6 pt-2 space-y-3 card-content-in">
          <div style={{ height: "1px", background: `linear-gradient(90deg, ${entry.categoryColor}30, transparent)` }} />

          {/* What It Is */}
          <SectionBlock label="What It Is" accentColor={entry.categoryColor}>
            <p className="text-[13px] text-white/70 leading-relaxed">{entry.whatIsIt}</p>
          </SectionBlock>

          {/* How It Works */}
          <SectionBlock label="How It Works" accentColor={entry.categoryColor}>
            <ol className="space-y-2.5">
              {entry.howItWorks.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mono-label shrink-0 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{
                      background: `${entry.categoryColor}28`,
                      color: entry.categoryColor,
                      border: `1px solid ${entry.categoryColor}45`,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[13px] text-white/62 leading-snug">{step}</span>
                </li>
              ))}
            </ol>
          </SectionBlock>

          {/* Red Flags */}
          <SectionBlock label="Red Flags" accentColor="#ff1744">
            <ul className="space-y-2">
              {entry.redFlags.map((flag, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <svg className="shrink-0 mt-[3px] w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#ff1744" strokeWidth="1.2" />
                    <path d="M8 4.5v4M8 10.5v1" stroke="#ff1744" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-[13px] text-white/62 leading-snug">{flag}</span>
                </li>
              ))}
            </ul>
          </SectionBlock>

          {/* What To Do */}
          <SectionBlock label="What To Do" accentColor="#22c55e">
            <ul className="space-y-2">
              {entry.whatToDo.map((action, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <svg className="shrink-0 mt-[3px] w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#22c55e" strokeWidth="1.2" />
                    <path d="M5 8l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[13px] text-white/62 leading-snug">{action}</span>
                </li>
              ))}
            </ul>
          </SectionBlock>

          {/* Stat */}
          <div
            className="rounded-2xl px-4 py-3.5 flex items-center gap-3"
            style={{
              background: `${entry.categoryColor}0c`,
              border: `1px solid ${entry.categoryColor}20`,
            }}
          >
            <span className="mono-label text-[9px] font-black uppercase tracking-[0.2em] shrink-0" style={{ color: `${entry.categoryColor}aa` }}>
              Stat
            </span>
            <p className="text-[13px] font-semibold text-white/75 leading-snug">{entry.stat}</p>
          </div>

          {/* Teen Story */}
          <div
            className="rounded-2xl px-5 py-4 relative overflow-hidden"
            style={{
              background: "rgba(255,167,0,0.06)",
              border: "1px solid rgba(255,167,0,0.2)",
            }}
          >
            <span
              className="absolute -top-1 left-2 text-5xl leading-none select-none pointer-events-none"
              style={{ color: "rgba(255,167,0,0.14)", fontFamily: "Georgia, serif" }}
            >
              &ldquo;
            </span>
            <span className="mono-label text-[9px] font-black uppercase tracking-[0.2em] block mb-2" style={{ color: "rgba(255,167,0,0.7)" }}>
              Real Story
            </span>
            <p className="text-[13px] text-white/60 leading-relaxed pl-1 italic relative z-10">
              {entry.teenStory}
            </p>
          </div>

          {/* Pokédex link */}
          {entry.pokedexSlug && (
            <Link
              href={`/pokedex#${entry.pokedexSlug}`}
              className="mono-label text-[11px] font-bold flex items-center gap-1.5 pt-1 transition-opacity hover:opacity-65"
              style={{ color: entry.categoryColor }}
            >
              View in Scam Pokédex
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
