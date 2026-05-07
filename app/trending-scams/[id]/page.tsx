import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SCAMS } from "@/lib/scams";

type ThreatLevel = "critical" | "high" | "medium";

const RISK: Record<ThreatLevel, { color: string; label: string }> = {
  critical: { color: "#ff1744", label: "Critical" },
  high:     { color: "#ff6d00", label: "High Risk" },
  medium:   { color: "#00d4ff", label: "Medium" },
};

export function generateStaticParams() {
  return SCAMS.map(s => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const scam = SCAMS.find(s => s.id === id);
  if (!scam) return { title: "Not Found" };
  return {
    title: `${scam.name} — Project Vigil`,
    description: scam.summary.slice(0, 155),
  };
}

export default async function ScamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scam = SCAMS.find(s => s.id === id);
  if (!scam) notFound();

  const risk = RISK[scam.riskLevel];

  const prevScam = SCAMS.find(s => s.rank === scam.rank - 1);
  const nextScam = SCAMS.find(s => s.rank === scam.rank + 1);

  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative overflow-hidden">
        {/* Orbs */}
        <div
          className="orb orb-drift pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] opacity-[0.12]"
          style={{ backgroundColor: risk.color }}
        />
        <div
          className="orb orb-drift pointer-events-none absolute right-0 top-20 h-[320px] w-[320px] opacity-[0.07]"
          style={{ backgroundColor: "#00d4ff", animationDelay: "5s" }}
        />

        <div className="page-frame py-10 sm:py-14">
          {/* Back */}
          <Link
            href="/trending-scams"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/52 transition-colors hover:text-white/90"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Threats
          </Link>

          {/* Badges */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span
              className="mono-label text-[11px] font-black rounded-xl px-3 py-1"
              style={{ color: risk.color, background: `${risk.color}14`, border: `1px solid ${risk.color}30` }}
            >
              {risk.label}
            </span>
            <span
              className="mono-label text-[11px] font-black rounded-xl px-3 py-1"
              style={{ color: risk.color, background: `${risk.color}0a`, border: `1px solid ${risk.color}20` }}
            >
              {scam.categoryLabel}
            </span>
            {scam.isSpiking && (
              <span
                className="mono-label text-[11px] font-black rounded-xl px-3 py-1"
                style={{ color: "#ff1744", background: "rgba(255,23,68,0.10)", border: "1px solid rgba(255,23,68,0.26)" }}
              >
                ● Spiking
              </span>
            )}
            <span className="mono-label text-[11px] text-white/40">Rank #{String(scam.rank).padStart(2, "0")}</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-[clamp(2rem,5vw,3.8rem)] font-black leading-[0.95] tracking-[-0.04em] text-white">
            {scam.name}
          </h1>

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            {/* Left column */}
            <div className="flex flex-col gap-6">
              {/* Summary */}
              <div
                className="rounded-[20px] p-5 sm:p-6"
                style={{
                  background: "linear-gradient(160deg, rgba(14,20,38,0.98) 0%, rgba(10,15,26,1) 100%)",
                  border: `1px solid ${risk.color}1e`,
                  borderTop: `3px solid ${risk.color}`,
                  boxShadow: "0 8px 28px rgba(0,0,0,0.28)",
                }}
              >
                <div className="mono-label mb-3 text-[10px] uppercase tracking-[0.18em] text-white/44">How it works</div>
                <p className="text-[15px] leading-relaxed text-white/82">{scam.summary}</p>
              </div>

              {/* Protection tips */}
              <div
                className="rounded-[20px] p-5 sm:p-6"
                style={{
                  background: "linear-gradient(160deg, rgba(14,20,38,0.98) 0%, rgba(10,15,26,1) 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.20)",
                }}
              >
                <div className="mono-label mb-4 text-[10px] uppercase tracking-[0.18em] text-white/44">How to stay safe</div>
                <ul className="flex flex-col gap-3">
                  {scam.tips.map((tip, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                        style={{ background: `${risk.color}18`, color: risk.color, border: `1px solid ${risk.color}30` }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-[13px] leading-relaxed text-white/74">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column — stats */}
            <div className="flex flex-col gap-4">
              <div
                className="rounded-[20px] p-5"
                style={{
                  background: "linear-gradient(160deg, rgba(14,20,38,0.98) 0%, rgba(10,15,26,1) 100%)",
                  border: "1px solid rgba(255,224,112,0.12)",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.20)",
                }}
              >
                <div className="mono-label mb-4 text-[10px] uppercase tracking-[0.18em] text-white/44">This week</div>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="mono-label mb-0.5 text-[9px] uppercase tracking-widest text-white/38">Reports filed</div>
                    <div className="text-[28px] font-black leading-none text-white">{scam.reportsThisWeek.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="mono-label mb-0.5 text-[9px] uppercase tracking-widest text-white/38">7-day change</div>
                    <div className="text-[28px] font-black leading-none" style={{ color: risk.color }}>↑{scam.reportsDelta}%</div>
                  </div>
                  <div>
                    <div className="mono-label mb-0.5 text-[9px] uppercase tracking-widest text-white/38">Last reported</div>
                    <div className="text-[16px] font-bold text-white/76">{scam.reportedAt}</div>
                  </div>
                </div>
              </div>

              {/* Report CTA */}
              <a
                href="https://reportfraud.ftc.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-[16px] px-5 py-4 text-center text-sm font-bold transition-opacity hover:opacity-80"
                style={{
                  background: `${risk.color}18`,
                  border: `1px solid ${risk.color}30`,
                  color: risk.color,
                }}
              >
                Report this scam →
              </a>
            </div>
          </div>

          {/* Prev / Next nav */}
          {(prevScam || nextScam) && (
            <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-8">
              {prevScam ? (
                <Link
                  href={`/trending-scams/${prevScam.id}`}
                  className="group flex flex-col gap-1 text-left"
                >
                  <span className="mono-label text-[10px] text-white/38">← Previous</span>
                  <span className="text-sm font-bold text-white/70 transition-colors group-hover:text-white">
                    {prevScam.name}
                  </span>
                </Link>
              ) : <div />}
              {nextScam ? (
                <Link
                  href={`/trending-scams/${nextScam.id}`}
                  className="group flex flex-col items-end gap-1 text-right"
                >
                  <span className="mono-label text-[10px] text-white/38">Next →</span>
                  <span className="text-sm font-bold text-white/70 transition-colors group-hover:text-white">
                    {nextScam.name}
                  </span>
                </Link>
              ) : <div />}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
