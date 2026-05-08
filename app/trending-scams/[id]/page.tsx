import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SCAMS } from "@/lib/scams";

type ThreatLevel = "critical" | "high" | "medium";

const RISK: Record<ThreatLevel, { color: string; label: string }> = {
  critical: { color: "#ff1744", label: "Critical" },
  high:     { color: "#ff6d00", label: "High Risk" },
  medium:   { color: "#0099cc", label: "Medium" },
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

  const lightCard: React.CSSProperties = {
    borderRadius: "18px",
    background: "linear-gradient(160deg, #f5f7ff 0%, #edf0fc 100%)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)",
  };

  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative overflow-hidden">
        <div
          className="orb orb-drift pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] opacity-[0.10]"
          style={{ backgroundColor: risk.color }}
        />
        <div
          className="orb orb-drift pointer-events-none absolute right-0 top-20 h-[320px] w-[320px] opacity-[0.06]"
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
              style={{ color: risk.color, background: `${risk.color}18`, border: `1px solid ${risk.color}32` }}
            >
              {risk.label}
            </span>
            <span
              className="mono-label text-[11px] font-bold rounded-xl px-3 py-1"
              style={{ color: risk.color, background: `${risk.color}0e`, border: `1px solid ${risk.color}22` }}
            >
              {scam.categoryLabel}
            </span>
            {scam.isSpiking && (
              <span
                className="mono-label text-[11px] font-black rounded-xl px-3 py-1"
                style={{ color: "#ff1744", background: "rgba(255,23,68,0.12)", border: "1px solid rgba(255,23,68,0.28)" }}
              >
                ● Spiking
              </span>
            )}
            <span className="mono-label text-[11px] text-white/38">
              Rank #{String(scam.rank).padStart(2, "0")}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-8 text-[clamp(2rem,5vw,3.6rem)] font-black leading-[0.95] tracking-[-0.04em] text-white">
            {scam.name}
          </h1>

          <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
            {/* Left column */}
            <div className="flex flex-col gap-5">

              {/* Image frame */}
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: "18px",
                  border: "1.5px solid rgba(255,224,110,0.55)",
                  background: "linear-gradient(180deg, rgba(255,242,180,0.80) 0%, rgba(185,215,255,0.88) 52%, rgba(96,155,228,0.92) 100%)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.22)",
                }}
              >
                <div
                  className="flex items-center justify-between px-3 py-2"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,248,210,0.97) 0%, rgba(240,216,128,0.95) 100%)",
                    borderBottom: "1px solid rgba(63,74,106,0.18)",
                  }}
                >
                  <span className="mono-label text-[10px] font-black" style={{ color: "rgba(20,33,56,0.66)" }}>
                    FIELD REPORT
                  </span>
                  <span className="mono-label text-[10px] font-black" style={{ color: risk.color }}>
                    {risk.label.toUpperCase()}
                  </span>
                </div>
                <div className="relative h-[240px] w-full">
                  <div
                    className="absolute rounded-full"
                    style={{ inset: "10% 18%", background: risk.color, filter: "blur(42px)", opacity: 0.20 }}
                  />
                  <Image
                    src={scam.image}
                    alt={scam.name}
                    fill
                    className="relative object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                </div>
              </div>

              {/* How it works */}
              <div
                style={{
                  ...lightCard,
                  border: `1px solid ${risk.color}20`,
                  borderTop: `3px solid ${risk.color}`,
                  padding: "1.4rem 1.5rem",
                }}
              >
                <div
                  className="mono-label mb-3 text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: "rgba(7,16,43,0.38)" }}
                >
                  How it works
                </div>
                <p className="text-[15px] leading-relaxed" style={{ color: "rgba(7,16,43,0.78)" }}>
                  {scam.summary}
                </p>
              </div>

              {/* How to stay safe */}
              <div
                style={{
                  ...lightCard,
                  border: "1px solid rgba(7,16,43,0.08)",
                  padding: "1.4rem 1.5rem",
                }}
              >
                <div
                  className="mono-label mb-4 text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: "rgba(7,16,43,0.38)" }}
                >
                  How to stay safe
                </div>
                <ul className="flex flex-col gap-3">
                  {scam.tips.map((tip, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                        style={{
                          background: `${risk.color}18`,
                          color: risk.color,
                          border: `1px solid ${risk.color}30`,
                        }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-[13px] leading-relaxed" style={{ color: "rgba(7,16,43,0.68)" }}>
                        {tip}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column — stats */}
            <div className="flex flex-col gap-4">

              {/* Stats card */}
              <div
                style={{
                  ...lightCard,
                  border: "1px solid rgba(190,145,0,0.18)",
                  padding: "1.4rem",
                }}
              >
                <div
                  className="mono-label mb-4 text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: "rgba(7,16,43,0.38)" }}
                >
                  This week
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <div
                      className="mono-label mb-0.5 text-[9px] uppercase tracking-widest"
                      style={{ color: "rgba(7,16,43,0.34)" }}
                    >
                      Reports filed
                    </div>
                    <div className="text-[30px] font-black leading-none" style={{ color: "#07102b" }}>
                      {scam.reportsThisWeek.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div
                      className="mono-label mb-0.5 text-[9px] uppercase tracking-widest"
                      style={{ color: "rgba(7,16,43,0.34)" }}
                    >
                      7-day change
                    </div>
                    <div className="text-[30px] font-black leading-none" style={{ color: risk.color }}>
                      ↑{scam.reportsDelta}%
                    </div>
                  </div>
                  <div>
                    <div
                      className="mono-label mb-0.5 text-[9px] uppercase tracking-widest"
                      style={{ color: "rgba(7,16,43,0.34)" }}
                    >
                      Last reported
                    </div>
                    <div className="text-[16px] font-bold" style={{ color: "rgba(7,16,43,0.62)" }}>
                      {scam.reportedAt}
                    </div>
                  </div>
                </div>
              </div>

              {/* Report CTA */}
              <a
                href="https://reportfraud.ftc.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-[14px] px-5 py-4 text-center text-sm font-bold transition-opacity hover:opacity-80"
                style={{
                  background: `${risk.color}14`,
                  border: `1px solid ${risk.color}28`,
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
                <Link href={`/trending-scams/${prevScam.id}`} className="group flex flex-col gap-1 text-left">
                  <span className="mono-label text-[10px] text-white/38">← Previous</span>
                  <span className="text-sm font-bold text-white/64 transition-colors group-hover:text-white">
                    {prevScam.name}
                  </span>
                </Link>
              ) : <div />}
              {nextScam ? (
                <Link href={`/trending-scams/${nextScam.id}`} className="group flex flex-col items-end gap-1 text-right">
                  <span className="mono-label text-[10px] text-white/38">Next →</span>
                  <span className="text-sm font-bold text-white/64 transition-colors group-hover:text-white">
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
