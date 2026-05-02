"use client";

import { useState } from "react";

interface ScamCardProps {
  icon?: string;
  title: string;
  description: string;
  warning?: string;
  riskLevel?: "High" | "Medium" | "Low";
  expandable?: boolean;
  children?: React.ReactNode;
}

export default function ScamCard({
  icon,
  title,
  description,
  warning,
  riskLevel,
  expandable = false,
  children,
}: ScamCardProps) {
  const [expanded, setExpanded] = useState(false);

  const riskColors = {
    High: { bg: "rgba(255,23,68,0.15)", text: "#ff1744", border: "rgba(255,23,68,0.3)" },
    Medium: { bg: "rgba(255,167,0,0.15)", text: "#ffa700", border: "rgba(255,167,0,0.3)" },
    Low: { bg: "rgba(0,212,255,0.15)", text: "#00d4ff", border: "rgba(0,212,255,0.3)" },
  };

  const risk = riskLevel ? riskColors[riskLevel] : null;

  return (
    <div
      className="rounded-xl border border-white/10 p-5 transition-all duration-200 hover:border-white/20"
      style={{ backgroundColor: "#1a1f2e" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          {icon && (
            <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <h3 className="font-bold text-white text-base">{title}</h3>
              {risk && (
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: risk.bg,
                    color: risk.text,
                    borderColor: risk.border,
                  }}
                >
                  {riskLevel} Risk
                </span>
              )}
            </div>
            <p className="text-sm text-white/60 leading-relaxed">{description}</p>
          </div>
        </div>

        {expandable && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {warning && !expandable && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-xs text-white/50">
            <span className="font-semibold" style={{ color: "#00d4ff" }}>Tip: </span>
            {warning}
          </p>
        </div>
      )}

      {expandable && expanded && (
        <div className="mt-3 pt-3 border-t border-white/10 animate-in fade-in duration-200">
          {warning && (
            <p className="text-xs text-white/50 mb-2">
              <span className="font-semibold" style={{ color: "#00d4ff" }}>Tip: </span>
              {warning}
            </p>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
