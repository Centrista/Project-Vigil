"use client";

import { useState } from "react";
import Link from "next/link";
import type { GuideEntry } from "@/lib/guide-data";

function Section({
  label,
  accentColor,
  children,
}: {
  label: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <div
        className="mono-label text-[10px] font-black uppercase tracking-widest mb-2.5"
        style={{ color: `${accentColor}90` }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

export default function GuideCard({ entry }: { entry: GuideEntry }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      id={entry.slug}
      className="rounded-2xl overflow-hidden flex flex-col transition-all duration-200"
      style={{
        background: "linear-gradient(160deg, #1e2438 0%, #1a1f2e 100%)",
        border: `1px solid ${entry.categoryColor}22`,
        borderTop: `3px solid ${entry.categoryColor}`,
        boxShadow: expanded
          ? `0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px ${entry.categoryColor}15`
          : "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* ── Card header (always visible) ── */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left p-5 pb-4 focus:outline-none"
        style={{
          background: `linear-gradient(135deg, ${entry.categoryColor}14 0%, ${entry.categoryColor}04 100%)`,
        }}
      >
        <div className="flex items-start gap-3">
          {/* Icon box */}
          <div
            className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
            style={{
              background: `${entry.categoryColor}15`,
              border: `1px solid ${entry.categoryColor}30`,
            }}
          >
            {entry.icon}
          </div>

          {/* Text block */}
          <div className="flex-1 min-w-0">
            <span
              className="mono-label text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded inline-block mb-1.5"
              style={{
                color: entry.categoryColor,
                background: `${entry.categoryColor}20`,
                border: `1px solid ${entry.categoryColor}40`,
              }}
            >
              {entry.categoryLabel}
            </span>
            <h3 className="font-black text-white text-[15px] leading-tight mb-1">
              {entry.name}
            </h3>
            <p className="text-xs text-white/42 leading-snug">{entry.tagline}</p>
          </div>

          {/* Chevron */}
          <div
            className="shrink-0 mt-1 w-6 h-6 rounded-lg flex items-center justify-center transition-transform duration-300"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.35)",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* ── Expanded content ── */}
      {expanded && (
        <div
          className="px-5 pb-6 pt-1 card-content-in"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* What Is It */}
          <Section label="What It Is" accentColor={entry.categoryColor}>
            <p className="text-sm text-white/62 leading-relaxed">{entry.whatIsIt}</p>
          </Section>

          {/* How It Works */}
          <Section label="How It Works" accentColor={entry.categoryColor}>
            <ol className="space-y-2">
              {entry.howItWorks.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="mono-label shrink-0 text-[10px] font-black w-5 h-5 rounded flex items-center justify-center mt-0.5"
                    style={{
                      background: `${entry.categoryColor}20`,
                      color: entry.categoryColor,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm text-white/58 leading-snug">{step}</span>
                </li>
              ))}
            </ol>
          </Section>

          {/* Red Flags */}
          <Section label="Red Flags" accentColor="#ff1744">
            <ul className="space-y-2">
              {entry.redFlags.map((flag, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "#ff1744" }}
                  />
                  <span className="text-sm text-white/58 leading-snug">{flag}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* What To Do */}
          <Section label="What To Do" accentColor="#22c55e">
            <ul className="space-y-2">
              {entry.whatToDo.map((action, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "#22c55e" }}
                  />
                  <span className="text-sm text-white/58 leading-snug">{action}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* By The Numbers */}
          <Section label="By The Numbers" accentColor={entry.categoryColor}>
            <div
              className="rounded-xl p-4"
              style={{
                background: `${entry.categoryColor}08`,
                border: `1px solid ${entry.categoryColor}22`,
              }}
            >
              <p className="text-sm font-semibold text-white/80 leading-relaxed">
                {entry.stat}
              </p>
            </div>
          </Section>

          {/* Teen Story */}
          <Section label="Real Story" accentColor="#ffa700">
            <div
              className="rounded-xl p-4 relative"
              style={{
                background: "rgba(255,167,0,0.06)",
                border: "1px solid rgba(255,167,0,0.18)",
              }}
            >
              <span
                className="absolute top-2 left-3 text-3xl leading-none select-none"
                style={{ color: "rgba(255,167,0,0.18)", fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </span>
              <p className="text-sm text-white/58 leading-relaxed pl-4 italic">
                {entry.teenStory}
              </p>
            </div>
          </Section>

          {/* Pokédex link */}
          {entry.pokedexSlug && (
            <Link
              href={`/pokedex#${entry.pokedexSlug}`}
              className="mono-label text-[11px] font-bold flex items-center gap-1.5 mt-4 transition-opacity hover:opacity-65"
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
