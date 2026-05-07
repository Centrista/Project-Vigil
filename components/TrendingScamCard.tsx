"use client";

import Link from "next/link";
import type { ScamItem, ThreatLevel } from "@/lib/scams";

export type { ScamItem, ThreatLevel };

const RISK: Record<ThreatLevel, { color: string; label: string }> = {
  critical: { color: "#ff1744", label: "Critical" },
  high:     { color: "#ff6d00", label: "High Risk" },
  medium:   { color: "#00d4ff", label: "Medium" },
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
        background: "linear-gradient(160deg, rgba(14,20,38,0.98) 0%, rgba(10,15,26,1) 100%)",
        border: `1px solid ${risk.color}1e`,
        borderTop: `3px solid ${risk.color}`,
        boxShadow: "0 8px 28px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.03)",
        transition: "transform 220ms cubic-bezier(0.16,1,0.3,1), box-shadow 220ms cubic-bezier(0.16,1,0.3,1)",
        textDecoration: "none",
      } as React.CSSProperties}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px rgba(0,0,0,0.38), 0 0 0 1px ${risk.color}28, inset 0 1px 0 rgba(255,255,255,0.04)`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.03)";
      }}
    >
      <div className="flex flex-1 flex-col p-4">
        {/* Row 1: rank + category + spike */}
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
            className="mono-label text-[9px] font-black flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: risk.color }}
          >
            View →
          </span>
        </div>

        {/* Name */}
        <h3 className="mb-2 text-[15px] font-black leading-tight text-white">{item.name}</h3>

        {/* Summary */}
        <p className="mb-4 flex-1 text-[12px] leading-snug text-white/62 line-clamp-3">{item.summary}</p>

        {/* Stats strip */}
        <div
          className="grid grid-cols-3 gap-1 rounded-[14px] px-3 py-2.5"
          style={{
            background: "rgba(255,224,112,0.045)",
            border: "1px solid rgba(255,224,112,0.10)",
          }}
        >
          <div>
            <div className="mono-label mb-0.5 text-[9px] uppercase tracking-widest text-white/44">Reports</div>
            <div className="text-[14px] font-black text-white">{item.reportsThisWeek.toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="mono-label mb-0.5 text-[9px] uppercase tracking-widest text-white/44">7-day</div>
            <div className="text-[14px] font-black" style={{ color: risk.color }}>↑{item.reportsDelta}%</div>
          </div>
          <div className="text-right">
            <div className="mono-label mb-0.5 text-[9px] uppercase tracking-widest text-white/44">Latest</div>
            <div className="text-[12px] font-semibold text-white/72">{item.reportedAt}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
