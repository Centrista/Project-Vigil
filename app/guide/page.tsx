import GuideCatalog from "@/components/GuideCatalog";
import { GUIDE_ENTRIES } from "@/lib/guide-data";

export const metadata = {
  title: "AI Scam Guide — Project Vigil",
  description:
    "How AI voice cloning, deepfakes, phishing, romance bots, and 16+ more scams work — with red flags and defense tips.",
};

export default function GuidePage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-grid">
        <div
          className="orb absolute -top-40 -left-40 w-[520px] h-[520px] opacity-[0.12]"
          style={{ backgroundColor: "#ff1744" }}
        />
        <div
          className="orb absolute -top-10 right-0 w-[400px] h-[400px] opacity-[0.07]"
          style={{ backgroundColor: "#00d4ff" }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 mono-label text-xs font-bold uppercase tracking-widest text-white/55 fade-up">
            🤖 AI Scam Guide
          </div>

          <h1 className="text-5xl sm:text-6xl font-black text-white leading-[0.95] tracking-tight mb-4 fade-up fade-up-delay-1">
            How AI Scams Work
          </h1>

          <p className="text-white/45 text-lg max-w-lg leading-relaxed mb-5 fade-up fade-up-delay-2">
            Every attack explained — how it works, why it works, how to defend.
          </p>

          <div className="flex flex-wrap items-center gap-3 fade-up fade-up-delay-3">
            <span
              className="mono-label text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg"
              style={{
                color: "rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {GUIDE_ENTRIES.length} scams catalogued
            </span>
            <span
              className="mono-label text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg"
              style={{
                color: "#ff1744cc",
                background: "rgba(255,23,68,0.08)",
                border: "1px solid rgba(255,23,68,0.2)",
              }}
            >
              AI-Native · AI-Transformed · Traditional
            </span>
          </div>
        </div>
      </section>

      {/* ── Catalog ── */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-10 pb-24">
        <GuideCatalog />
      </div>
    </div>
  );
}
