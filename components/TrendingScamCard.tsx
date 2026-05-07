"use client";

import Link from "next/link";
import type { ScamItem, ThreatLevel } from "@/lib/scams";

export type { ScamItem, ThreatLevel };

const RISK: Record<ThreatLevel, { color: string; label: string }> = {
  critical: { color: "#ff1744", label: "Critical" },
  high:     { color: "#ff6d00", label: "High Risk" },
  medium:   { color: "#0099cc", label: "Medium" },
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
        borderRadius: "18px",
        background: "linear-gradient(160deg, #f5f7ff 0%, #edf0fc 100%)",
        border: `1px solid ${risk.color}20`,
        borderTop: `3px solid ${risk.color}`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)",
        transition: "transform 220ms cubic-bezier(0.16,1,0.3,1), box-shadow 220ms cubic-bezier(0.16,1,0.3,1)",
        textDecoration: "none",
      } as React.CSSProperties}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 18px 42px rgba(0,0,0,0.16), 0 0 0 1px ${risk.color}28`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)";
      }}
    >
      <div className="flex flex-1 flex-col p-4">
        {/* Row 1: rank + category + spike + view arrow */}
        <div className="mb-3 flex items-center justify-between gap-2">
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

        {/* Name */}
        <h3 className="mb-2 text-[15px] font-black leading-tight" style={{ color: "#07102b" }}>
          {item.name}
        </h3>

        {/* Summary */}
        <p className="mb-4 flex-1 text-[12px] leading-snug line-clamp-3" style={{ color: "rgba(7,16,43,0.60)" }}>
          {item.summary}
        </p>

        {/* Stats strip */}
        <div
          className="grid grid-cols-3 gap-1 rounded-[12px] px-3 py-2.5"
          style={{
            background: "rgba(190,145,0,0.07)",
            border: "1px solid rgba(190,145,0,0.16)",
          }}
        >
          <div>
            <div className="mono-label mb-0.5 text-[9px] uppercase tracking-widest" style={{ color: "rgba(7,16,43,0.38)" }}>
              Reports
            </div>
            <div className="text-[14px] font-black" style={{ color: "#07102b" }}>
              {item.reportsThisWeek.toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="mono-label mb-0.5 text-[9px] uppercase tracking-widest" style={{ color: "rgba(7,16,43,0.38)" }}>
              7-day
            </div>
            <div className="text-[14px] font-black" style={{ color: risk.color }}>
              ↑{item.reportsDelta}%
            </div>
          </div>
          <div className="text-right">
            <div className="mono-label mb-0.5 text-[9px] uppercase tracking-widest" style={{ color: "rgba(7,16,43,0.38)" }}>
              Latest
            </div>
            <div className="text-[12px] font-semibold" style={{ color: "rgba(7,16,43,0.58)" }}>
              {item.reportedAt}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
