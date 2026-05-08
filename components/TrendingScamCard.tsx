"use client";

import Link from "next/link";
import Image from "next/image";
import type { ScamItem, ThreatLevel } from "@/lib/scams";

export type { ScamItem, ThreatLevel };

const RISK: Record<ThreatLevel, { color: string; label: string }> = {
  critical: { color: "#ff1744", label: "CRITICAL" },
  high:     { color: "#ff6d00", label: "HIGH RISK" },
  medium:   { color: "#0099cc", label: "MEDIUM" },
};

export default function TrendingScamCard({ item, index }: { item: ScamItem; index: number }) {
  const risk = RISK[item.riskLevel];

  return (
    <Link
      href={`/trending-scams/${item.id}`}
      className="group trending-card-enter entrance-stagger flex flex-col overflow-hidden"
      style={{
        "--stagger-delay": `${index * 55}ms`,
        animationDelay: `${index * 55}ms`,
        borderRadius: "20px",
        background: "linear-gradient(160deg, #f5f7ff 0%, #edf0fc 100%)",
        border: `1px solid ${risk.color}1e`,
        borderTop: `3px solid ${risk.color}`,
        boxShadow: "0 2px 14px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)",
        transition: "transform 220ms cubic-bezier(0.16,1,0.3,1), box-shadow 220ms cubic-bezier(0.16,1,0.3,1)",
        textDecoration: "none",
      } as React.CSSProperties}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 44px rgba(0,0,0,0.16), 0 0 0 1px ${risk.color}26`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 14px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)";
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-2 px-4 pt-3.5 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="mono-label text-[11px] font-black" style={{ color: risk.color }}>
            #{String(item.rank).padStart(2, "0")}
          </span>
          <span
            className="mono-label text-[10px] font-black rounded-lg px-2 py-0.5"
            style={{ color: risk.color, background: `${risk.color}14`, border: `1px solid ${risk.color}28` }}
          >
            {item.categoryLabel}
          </span>
          {item.isSpiking && (
            <span className="flame-blink text-[10px]" style={{ color: "#ff1744" }}>●</span>
          )}
        </div>
        <span
          className="mono-label text-[9px] font-black opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          style={{ color: risk.color }}
        >
          View →
        </span>
      </div>

      {/* Image frame — Pokédex-inspired */}
      <div
        className="relative mx-3 overflow-hidden"
        style={{
          borderRadius: "14px",
          border: "1.5px solid rgba(255,224,110,0.55)",
          background: "linear-gradient(180deg, rgba(255,242,180,0.80) 0%, rgba(185,215,255,0.88) 52%, rgba(96,155,228,0.92) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22)",
        }}
      >
        {/* Frame top bar */}
        <div
          className="flex items-center justify-between px-2.5 py-1.5"
          style={{
            background: "linear-gradient(180deg, rgba(255,248,210,0.97) 0%, rgba(240,216,128,0.95) 100%)",
            borderBottom: "1px solid rgba(63,74,106,0.18)",
          }}
        >
          <span className="mono-label text-[9px] font-black" style={{ color: "rgba(20,33,56,0.66)" }}>
            FIELD REPORT
          </span>
          <span className="mono-label text-[9px] font-black" style={{ color: risk.color }}>
            {risk.label}
          </span>
        </div>

        {/* Image with glow */}
        <div className="relative h-[138px] w-full">
          <div
            className="absolute rounded-full"
            style={{
              inset: "14% 18%",
              background: risk.color,
              filter: "blur(28px)",
              opacity: 0.28,
            }}
          />
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="relative object-cover"
            sizes="(max-width: 640px) calc(100vw - 1.5rem), (max-width: 1280px) calc(50vw - 2rem), calc(33vw - 1.5rem)"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-4 pt-3 pb-4">
        <h3 className="mb-1.5 text-[14px] font-black leading-snug" style={{ color: "#07102b" }}>
          {item.name}
        </h3>
        <p className="mb-3 flex-1 text-[11.5px] leading-snug line-clamp-2" style={{ color: "rgba(7,16,43,0.54)" }}>
          {item.summary}
        </p>
        {/* Compact stats row */}
        <div className="mono-label text-[10px]" style={{ color: "rgba(7,16,43,0.42)" }}>
          {item.reportsThisWeek.toLocaleString()} reports
          <span className="mx-1.5 opacity-50">·</span>
          <span style={{ color: risk.color }}>↑{item.reportsDelta}%</span>
          <span className="mx-1.5 opacity-50">·</span>
          {item.reportedAt}
        </div>
      </div>
    </Link>
  );
}
