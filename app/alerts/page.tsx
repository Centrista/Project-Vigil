import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { ALERTS, type Alert } from "@/lib/alerts";

export const metadata = {
  title: "Scam Alerts — Project Vigil",
  description: "Bi-weekly alerts on the latest AI scam techniques targeting teens.",
};

const SEVERITY = {
  critical: { label: "CRITICAL", color: "#ff1744", bg: "rgba(255,23,68,0.08)", border: "rgba(255,23,68,0.28)" },
  high:     { label: "HIGH",     color: "#ff6d00", bg: "rgba(255,109,0,0.08)", border: "rgba(255,109,0,0.28)" },
  medium:   { label: "MEDIUM",   color: "#ffd600", bg: "rgba(255,214,0,0.08)", border: "rgba(255,214,0,0.28)" },
};

function AlertCard({ alert }: { alert: Alert }) {
  const sev = SEVERITY[alert.severity];
  return (
    <div
      className="group card-hover entrance-stagger flex flex-col rounded-[24px] p-5"
      style={{
        background: "linear-gradient(145deg, rgba(28,36,58,0.96), rgba(20,28,48,0.98))",
        border: "1px solid rgba(255,255,255,0.09)",
        borderLeft: `3px solid ${sev.color}`,
        boxShadow: "0 12px 34px rgba(0,0,0,0.20)",
      }}
    >
      {/* Badges */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span
          className="mono-label text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg"
          style={{ color: sev.color, background: sev.bg, border: `1px solid ${sev.border}` }}
        >
          {sev.label}
        </span>
        <span
          className="mono-label text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg"
          style={{
            color: alert.categoryColor,
            background: `${alert.categoryColor}12`,
            border: `1px solid ${alert.categoryColor}30`,
          }}
        >
          {alert.category}
        </span>
      </div>

      {/* Title */}
      <h2 className="font-black text-white text-[17px] leading-snug mb-2">
        {alert.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-white/50 leading-relaxed flex-1 mb-5">
        {alert.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="mono-label text-[11px] text-white/28">{alert.weekOf}</span>
        <Link
          href={alert.learnMoreHref}
          className="mono-label text-[11px] font-bold flex items-center gap-1 transition-opacity hover:opacity-70"
          style={{ color: sev.color }}
        >
          Read Alert
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function AlertsPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="page-frame">
        <PageIntro
          eyebrow="Live Threat Feed"
          title={
            <>
              Scam Alerts.
              <br />
              <span className="gradient-text-red">Stay Current.</span>
            </>
          }
          description="New AI attack techniques drop constantly. Fresh alerts every two weeks so you know what&apos;s active right now."
          stats={[
            { label: "Updated bi-weekly", tone: "default" },
            { label: `${ALERTS.length} verified alerts`, tone: "danger" },
          ]}
        />

        {ALERTS.length === 0 ? (
          <div className="premium-panel p-16 text-center">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 mono-label text-[10px] font-bold uppercase tracking-widest"
              style={{
                background: "rgba(255,23,68,0.06)",
                border: "1px solid rgba(255,23,68,0.18)",
                color: "rgba(255,23,68,0.7)",
              }}
            >
              First Alert Coming Soon
            </div>
            <p className="text-white/30 text-sm max-w-xs mx-auto leading-relaxed">
              Check back soon — new scam alerts post bi-weekly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ALERTS.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        )}

        {ALERTS.length > 0 && (
          <p className="mono-label text-[11px] text-white/22 mt-5 text-right">
            {ALERTS.length} {ALERTS.length === 1 ? "alert" : "alerts"} · Updated bi-weekly · All threats verified
          </p>
        )}
      </div>
    </div>
  );
}
