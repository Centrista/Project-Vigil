import Link from "next/link";
import ScamDemo from "@/components/ScamDemo";
import ScrollReveal from "@/components/ScrollReveal";
import { ALERTS } from "@/lib/alerts";
import { GUIDE_ENTRIES } from "@/lib/guide-data";
import { HOME_DESTINATIONS, SCAM_TYPES } from "@/lib/constants";
import { STORIES } from "@/lib/stories";

const SIGNALS = [
  { label: "Scams mapped", value: `${GUIDE_ENTRIES.length}+`, tone: "premium-chip premium-chip-info" },
  { label: "Stories logged", value: String(STORIES.length), tone: "premium-chip premium-chip-purple" },
  { label: "Active alerts", value: String(ALERTS.length || 0), tone: "premium-chip premium-chip-danger" },
  { label: "Attack types", value: String(SCAM_TYPES.length), tone: "premium-chip premium-chip-amber" },
];

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative overflow-hidden bg-grid">
        <div className="orb orb-drift absolute -left-32 top-0 h-[440px] w-[440px] opacity-[0.18]" style={{ backgroundColor: "#ff1744" }} />
        <div className="orb orb-drift absolute right-0 top-8 h-[360px] w-[360px] opacity-[0.12]" style={{ backgroundColor: "#00d4ff", animationDelay: "4s" }} />
        <div className="orb orb-drift absolute left-1/2 bottom-0 h-[300px] w-[300px] opacity-[0.07]" style={{ backgroundColor: "#a855f7", animationDelay: "8s" }} />

        <div className="page-frame">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="hero-kicker fade-up">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="pulse-ring absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#ff1744" }} />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#ff1744" }} />
                </span>
                AI Scam Defense · Project Vigil
              </div>

              <h1 className="hero-title fade-up fade-up-delay-1">
                <span className="gradient-text-red">The scam calling you</span>
                <br />
                <span className="gradient-text-red">right now might not</span>
                <br />
                <span className="text-white">be human.</span>
              </h1>

              <p className="hero-copy fade-up fade-up-delay-2">
                AI clones voices in 30 seconds. Fakes video calls. Writes perfect phishing emails using your real data.
                Do you know how to spot it?
              </p>

              <div className="hero-actions mt-8 fade-up fade-up-delay-3">
                <Link href="/risk-quiz" className="btn-red glow-breathe px-8 py-4 text-base rounded-2xl">
                  Test My AI Scam IQ
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/trending-scams" className="btn-ghost px-8 py-4 text-base rounded-2xl">
                  Browse Trending Scams
                </Link>
              </div>

              <div className="hero-stats mt-8 fade-up fade-up-delay-3">
                {SIGNALS.map((signal) => (
                  <span key={signal.label} className={signal.tone}>
                    {signal.value} {signal.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="premium-panel float-y p-6 sm:p-7">
              <div className="eyebrow-row">
                <span className="premium-dot" />
                <span className="mono-label text-[11px] uppercase tracking-[0.22em] text-white/40">
                  Signal Brief
                </span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Trending scams",
                    body: "Track the threats rising right now, filter by risk, and spot sudden spikes before they normalize.",
                    href: "/trending-scams",
                    accent: "#ff1744",
                  },
                  {
                    title: "Learn the mechanics",
                    body: "Break every attack into how it works, why it works, and what to do when it appears.",
                    href: "/guide",
                    accent: "#00d4ff",
                  },
                  {
                    title: "Move fast in a crisis",
                    body: "If something feels off, jump to the response path instead of second-guessing your instincts.",
                    href: "/emergency",
                    accent: "#ff6d00",
                  },
                ].map((item) => (
                  <Link key={item.href} href={item.href} className="card-rail-link group">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="mono-label mb-2 text-[11px] uppercase tracking-[0.22em]" style={{ color: item.accent }}>
                          Recommended
                        </div>
                        <h2 className="text-xl font-black text-white">{item.title}</h2>
                      </div>
                      <svg className="mt-1 h-4 w-4 text-white/24 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white/55" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <p className="text-sm leading-relaxed text-white/52">{item.body}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-frame">
          <ScrollReveal>
          <div className="warm-panel overflow-hidden">
            <div className="grid gap-6 border-b border-[rgba(255,210,100,0.14)] px-6 py-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <div className="hero-kicker mb-4" style={{ color: "#e8c96a" }}>Choose your path</div>
                <h2 className="section-title mb-3 max-w-sm">Start where you need clarity most.</h2>
                <p className="section-copy max-w-md">
                  Learn the attacks, test yourself, scan current threats, or move straight into response mode.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {HOME_DESTINATIONS.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="card-rail-link-warm group entrance-stagger"
                    style={{ "--stagger-delay": `${index * 90}ms` } as React.CSSProperties}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="mono-label text-xs font-black" style={{ color: item.accent }}>
                        {item.n}
                      </span>
                      <svg className="h-4 w-4 text-white/18 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white/45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-black text-white">{item.label}</h3>
                      <p className="text-sm leading-relaxed text-white/48">{item.sub}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="page-section">
        <div className="page-frame">
          <ScrollReveal>
          <div className="premium-panel overflow-hidden">
            <div className="grid gap-8 border-b border-white/8 px-6 py-7 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <div className="hero-kicker mb-4">Live Simulation</div>
                <h2 className="section-title mb-3">Watch an AI scam unfold in real time.</h2>
                <p className="section-copy">
                  This is what a voice-clone phishing attempt looks like as a text. The AI threat scanner runs the same detection logic we teach in the quiz.
                </p>
              </div>
              <div className="hero-actions lg:justify-end">
                <Link href="/risk-quiz" className="btn-ghost px-6 py-3 text-sm">
                  Start Pre Quiz
                </Link>
                <Link href="/guide" className="btn-red px-6 py-3 text-sm">
                  Study the Attacks
                </Link>
              </div>
            </div>
            <div className="px-6 py-8 sm:px-8">
              <ScamDemo />
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="page-section">
        <div className="page-frame">
          <ScrollReveal>
          <Link
            href="/emergency"
            className="premium-panel premium-panel-amber group flex flex-col gap-5 px-6 py-6 sm:px-8 lg:flex-row lg:items-center"
          >
            <div className="flex items-center gap-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ff1744]/18 bg-[#ff1744]/10">
                <span className="pulse-ring absolute inline-flex h-3.5 w-3.5 rounded-full" style={{ backgroundColor: "#ff1744", opacity: 0.55 }} />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#ff1744]" />
              </div>
              <div>
                <div className="mono-label mb-2 text-[11px] uppercase tracking-[0.22em] text-[#ff9ab1]">
                  Emergency Path
                </div>
                <h2 className="text-2xl font-black text-white">Think you just got hit?</h2>
              </div>
            </div>
            <p className="max-w-2xl flex-1 text-sm leading-relaxed text-white/58 lg:text-base">
              Don&apos;t freeze. Move straight into the response path to secure accounts, preserve evidence, and avoid the second mistake scammers count on.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-white transition-all duration-200 group-hover:gap-3">
              Open Emergency Guide
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}