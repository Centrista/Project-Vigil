import Link from "next/link";
import ScamDemo from "@/components/ScamDemo";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-grid">
        <div className="orb absolute -top-40 -left-40 w-[520px] h-[520px] opacity-20"
          style={{ backgroundColor: "#ff1744" }} />
        <div className="orb absolute -top-10 right-0 w-[420px] h-[420px] opacity-10"
          style={{ backgroundColor: "#00d4ff" }} />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-28 text-center">

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass mb-10 fade-up">
            <span className="relative flex h-2.5 w-2.5">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: "#ff1744" }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ backgroundColor: "#ff1744" }} />
            </span>
            <span className="mono-label text-xs font-bold uppercase tracking-widest text-white/60">
              AI Scam Defense · Project Vigil
            </span>
          </div>

          <h1 className="text-[clamp(2.8rem,8.5vw,6rem)] font-black leading-[0.92] tracking-tight mb-6 fade-up fade-up-delay-1">
            <span className="gradient-text-red">The scam calling you</span>
            <br />
            <span className="gradient-text-red">right now might not</span>
            <br />
            <span className="text-white">be human.</span>
          </h1>

          <p className="text-lg text-white/45 max-w-xl mx-auto mb-14 leading-relaxed fade-up fade-up-delay-2">
            AI clones voices in 30 seconds. Fakes video calls. Writes perfect phishing emails using your real data.
            Do you know how to spot it?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up fade-up-delay-3">
            <Link
              href="/risk-quiz"
              className="btn-red inline-flex items-center gap-2.5 px-9 py-4 text-lg rounded-xl"
            >
              Test My AI Scam IQ
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/risk-quiz/results" className="btn-ghost inline-flex items-center gap-2 px-8 py-4 text-lg">
              Test Your Knowledge →
            </Link>
          </div>
        </div>
      </section>

      {/* ── LIVE SCAM DEMO ── */}
      <section
        style={{
          backgroundColor: "#0b0f22",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs mb-5"
              style={{
                background: "rgba(0,212,255,0.07)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "#00d4ff",
              }}
            >
              <span className="mono-label font-bold uppercase tracking-widest">◈ Live Simulation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Watch an AI scam unfold in real time
            </h2>
            <p className="text-white/40 max-w-md mx-auto text-sm leading-relaxed">
              This is what a voice-clone phishing attempt looks like as a text. The AI threat scanner
              runs the same detection logic we teach in the quiz.
            </p>
          </div>

          <ScamDemo />
        </div>
      </section>

      {/* ── QUICK NAV ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #1e2438, #1a1f2e)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {[
            { n: "01", label: "AI Risk Quiz", sub: "Discover exactly how vulnerable you are", href: "/risk-quiz", accent: "#ff1744" },
            { n: "02", label: "AI Scam Guide", sub: "Every attack type — how it works and how to block it", href: "/guide", accent: "#00d4ff" },
            { n: "03", label: "Spot the Fake", sub: "Train your eye to detect AI-generated content", href: "/simulator", accent: "#a855f7" },
            { n: "04", label: "Real Stories", sub: "Cases from teens who nearly got taken", href: "/stories", accent: "#ffa700" },
          ].map((item, i, arr) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-5 px-7 py-5 transition-all duration-200 hover:bg-white/[0.03]"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.055)" : "none" }}
            >
              <span
                className="mono-label text-xs font-black shrink-0 w-7 tabular-nums"
                style={{ color: item.accent }}
              >
                {item.n}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-[15px] leading-tight">
                  {item.label}
                </div>
                <div className="text-xs text-white/38 mt-0.5 leading-snug">
                  {item.sub}
                </div>
              </div>
              <svg
                className="w-4 h-4 shrink-0 text-white/18 group-hover:text-white/45 group-hover:translate-x-0.5 transition-all duration-200"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* ── EMERGENCY ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-20">
        <Link
          href="/emergency"
          className="group flex items-center gap-5 rounded-2xl px-7 py-5 transition-all duration-200 hover:bg-white/[0.02]"
          style={{
            background: "rgba(255,23,68,0.04)",
            border: "1px solid rgba(255,23,68,0.16)",
          }}
        >
          <div
            className="w-0.5 self-stretch rounded-full shrink-0"
            style={{ background: "linear-gradient(180deg, #ff1744 0%, rgba(255,23,68,0.15) 100%)" }}
          />
          <div className="relative flex items-center justify-center shrink-0">
            <span className="pulse-ring absolute inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#ff1744", opacity: 0.6 }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: "#ff1744" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-white text-[15px] leading-tight">Think you just got hit?</div>
            <div className="text-xs text-white/38 mt-0.5 leading-snug">
              Don&apos;t freeze — follow the emergency steps to lock down your accounts now.
            </div>
          </div>
          <span
            className="mono-label text-xs font-black shrink-0 flex items-center gap-1.5 group-hover:gap-2 transition-all duration-200 whitespace-nowrap"
            style={{ color: "#ff1744" }}
          >
            Emergency Guide
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </Link>
      </section>

    </div>
  );
}
