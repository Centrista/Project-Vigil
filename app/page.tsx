import Link from "next/link";
import ScamDemo from "@/components/ScamDemo";
import ScrollReveal from "@/components/ScrollReveal";
import { HOME_DESTINATIONS } from "@/lib/constants";
import { SCAMS } from "@/lib/scams";

const RISK_COLOR = {
  critical: "#ff1744",
  high: "#ff6d00",
  medium: "#0099cc",
} as const;

const TOP_THREATS = [...SCAMS].sort((a, b) => a.rank - b.rank).slice(0, 3);

const DESTINATION_CLUSTERS = [
  { title: "Learn", hrefs: ["/trending-scams", "/pokedex", "/guide"] },
  { title: "Practice", hrefs: ["/risk-quiz", "/simulator", "/scam-battle"] },
  { title: "Act", hrefs: ["/stories", "/emergency"] },
].map((cluster) => ({
  ...cluster,
  items: cluster.hrefs
    .map((href) => HOME_DESTINATIONS.find((d) => d.href === href))
    .filter((d): d is (typeof HOME_DESTINATIONS)[number] => Boolean(d)),
}));

const POKEDEX_PREVIEW = ["passal", "akmon", "dolon", "fanir", "peitho"];

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative overflow-hidden bg-grid">
        <div className="orb orb-drift orb-enter absolute -left-32 top-0 h-[440px] w-[440px] opacity-[0.16]" style={{ backgroundColor: "#ff1744" }} />

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
                <span className="text-white">The scam calling you</span>
                <br />
                <span className="text-white">right now might not</span>
                <br />
                <span className="gradient-text-red">be human.</span>
              </h1>

              <p className="hero-copy fade-up fade-up-delay-2">
                AI clones voices in 30 seconds. Fakes video calls. Writes perfect phishing emails using your real data.
                Do you know how to spot it?
              </p>

              <div className="hero-actions mt-8 fade-up fade-up-delay-3">
                <Link href="/risk-quiz" className="btn-red spring-btn px-8 py-4 text-base rounded-2xl">
                  Take the 2-minute quiz
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/trending-scams" className="btn-ghost px-8 py-4 text-base rounded-2xl">
                  Browse Trending Scams
                </Link>
              </div>
            </div>

            <div className="premium-panel p-6 sm:p-7">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="mono-label flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/50">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#ff1744]" />
                  Live threat board
                </span>
                <Link href="/trending-scams" className="text-xs font-semibold text-white/45 transition-colors hover:text-white/80">
                  See all →
                </Link>
              </div>
              <div className="space-y-4">
                {TOP_THREATS.map((scam) => (
                  <Link key={scam.id} href={`/trending-scams/${scam.id}`} className="card-rail-link group">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl leading-none" aria-hidden="true">{scam.emoji}</span>
                      <div className="min-w-0">
                        <h2 className="text-base font-black leading-snug text-white">{scam.name}</h2>
                        <p className="mono-label mt-1.5 text-[11px] tracking-[0.06em]" style={{ color: RISK_COLOR[scam.riskLevel] }}>
                          {scam.statValue}
                        </p>
                        <p className="mt-1 text-[11px] text-white/40">
                          {scam.statusLabel} · {scam.reportedAt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-frame py-2">
        <ScrollReveal>
          <Link
            href="/pokedex"
            className="group flex flex-col items-start gap-4 rounded-[var(--radius-panel)] border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-white/16 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-5">
              <div className="flex shrink-0">
                {POKEDEX_PREVIEW.map((slug, i) => (
                  <img
                    key={slug}
                    src={`/images/pokedex/${slug}.jpg`}
                    alt=""
                    loading="lazy"
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-2xl border-2 border-[#0c1628] object-cover"
                    style={{ marginLeft: i === 0 ? 0 : -14, transform: `rotate(${(i - 2) * 2.5}deg)` }}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                Nine scam patterns, catalogued as creatures.{" "}
                <span className="font-bold text-white">Meet the Pokédex.</span>
              </p>
            </div>
            <span className="text-sm font-semibold text-white/45 transition-colors group-hover:text-white/85">
              Open the Pokédex →
            </span>
          </Link>
        </ScrollReveal>
      </section>

      <section className="page-section">
        <div className="page-frame">
          <ScrollReveal>
          <div className="warm-panel overflow-hidden">
            <div className="border-b border-[rgba(255,210,100,0.14)] px-6 py-6 sm:px-8">
              <div className="mb-7 max-w-xl">
                <p className="mono-label mb-3 text-[11px] uppercase tracking-[0.22em]" style={{ color: "#e8c96a" }}>
                  Choose your path
                </p>
                <h2 className="section-title mb-3 blur-reveal">Start anywhere. This is the order we&apos;d go in.</h2>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                {DESTINATION_CLUSTERS.map((cluster) => (
                  <div key={cluster.title}>
                    <p className="mb-3 border-b border-white/8 pb-2 text-sm font-bold uppercase tracking-[0.12em] text-white/55">
                      {cluster.title}
                    </p>
                    <div className="space-y-3">
                      {cluster.items.map((item, index) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="card-rail-link-warm group entrance-stagger block"
                          style={{ "--stagger-delay": `${index * 90}ms` } as React.CSSProperties}
                        >
                          <div className="flex items-baseline gap-2.5">
                            <span className="mono-label text-xs font-black" style={{ color: item.accent }}>
                              {item.n}
                            </span>
                            <h3 className="text-lg font-black text-white">{item.label}</h3>
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-white/60">{item.sub}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
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
                <h2 className="section-title mb-3">Watch an AI scam unfold in real time.</h2>
                <p className="section-copy">
                  A cloned voice of a parent, played back in a single message. The AI threat scanner runs the same detection logic we teach in the quiz.
                </p>
              </div>
              <div className="hero-actions lg:justify-end">
                <Link href="/risk-quiz" className="btn-ghost px-6 py-3 text-sm">
                  Start Pre Quiz
                </Link>
                <Link href="/scam-battle" className="btn-red px-6 py-3 text-sm">
                  Battle the Scams
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
            <p className="max-w-2xl flex-1 text-sm leading-relaxed text-white/68 lg:text-base">
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