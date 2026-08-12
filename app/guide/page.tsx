import Link from "next/link";
import type { ReactNode } from "react";
import PageIntro from "@/components/PageIntro";
import {
  SCAM_GUIDES,
  GUIDE_CROSSLINKS,
  type ScamGuide,
} from "@/lib/educational-guide";
import {
  POKEDEX_ENTRIES_BY_SLUG,
  POKEDEX_TYPE_META,
} from "@/lib/pokedex";

export const metadata = {
  title: "Educational Guide — Project Vigil",
  description:
    "How AI-powered scams actually work, what they look like when they hit you, and why they target teens — broken down scam by scam.",
};

function SubHeading({
  label,
  accent,
  children,
}: {
  label: string;
  accent: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
      />
      <h3 className="mono-label text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
        {label}
      </h3>
      {children}
    </div>
  );
}

function GuideSection({ guide }: { guide: ScamGuide }) {
  const entry = POKEDEX_ENTRIES_BY_SLUG[guide.slug];
  const typeMeta = entry ? POKEDEX_TYPE_META[entry.type] : null;
  const accent = guide.accent;

  return (
    <section
      id={guide.slug}
      className="premium-panel scroll-mt-28 p-6 sm:p-8"
      style={{
        borderColor: `${accent}3d`,
        background: `linear-gradient(180deg, ${accent}14 0%, rgba(11,17,32,0.98) 42%)`,
      }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl"
            style={{ background: `${accent}1f`, border: `1px solid ${accent}40` }}
            aria-hidden
          >
            {guide.icon}
          </div>
          <div>
            <h2
              className="text-[clamp(1.6rem,4vw,2.4rem)] font-black leading-none"
              style={{ color: accent }}
            >
              {guide.title}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="premium-chip text-[10px]">
                Creature&nbsp;·&nbsp;{guide.creature}
              </span>
              {entry && (
                <span className="premium-chip text-[10px]">
                  Threat&nbsp;{"●".repeat(entry.threatLevel)}
                  <span className="opacity-40">{"●".repeat(5 - entry.threatLevel)}</span>
                </span>
              )}
              {entry && typeMeta && (
                <span
                  className="premium-chip text-[10px]"
                  style={{ borderColor: `${typeMeta.color}55`, color: typeMeta.color }}
                >
                  {entry.type}
                </span>
              )}
            </div>
          </div>
        </div>
        {entry && (
          <Link
            href={`/pokedex/${guide.slug}`}
            className="btn-ghost px-4 py-2 text-xs"
          >
            View in Pokédex →
          </Link>
        )}
      </div>

      <p className="mt-5 max-w-3xl text-[1.05rem] font-semibold leading-relaxed text-white/85">
        {guide.hook}
      </p>

      <div className="divider-line my-7" />

      {/* Red flags + How it works */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <SubHeading label="🚩 Red Flags" accent={accent} />
          <ul className="space-y-3">
            {guide.redFlags.map((flag, i) => (
              <li
                key={i}
                className="rounded-xl border border-white/10bg-white/[0.03] p-3.5 text-sm leading-relaxed text-white/70"
              >
                {flag}
              </li>
            ))}
          </ul>

          {/* Caution attached to the tells above */}
          {guide.caveat && (
            <div
              className="mt-3 rounded-xl border-l-[3px] p-3.5"
              style={{ background: `${accent}1f`, borderLeftColor: accent }}
            >
              <p
                className="mb-1.5 text-[11px] font-black uppercase tracking-[0.12em]"
                style={{ color: accent }}
              >
                ⚠ Tells aren&apos;t enough
              </p>
              <p className="text-sm font-semibold leading-relaxed text-white/85">
                {guide.caveat}
              </p>
            </div>
          )}
        </div>
        <div>
          <SubHeading label="⚙️ How It Works" accent={accent} />
          <ol className="space-y-3">
            {guide.howItWorks.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black"
                  style={{ background: `${accent}26`, color: accent }}
                >
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-white/70">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Why teens — the MVP block */}
      <div
        className="mt-7 rounded-2xl p-5"
        style={{ background: `${accent}12`, border: `1px solid ${accent}33` }}
      >
        <SubHeading label="🎯 Why Teens Fall For It" accent={accent} />
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {guide.whyTeens.map((reason, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-white/75">
              <span style={{ color: accent }}>▸</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Real examples */}
      <div className="mt-7">
        <SubHeading label="📁 Real Cases" accent={accent} />
        <div className="grid gap-4 md:grid-cols-3">
          {guide.examples.map((ex) => (
            <div
              key={ex.title}
              className="rounded-2xl border border-white/10bg-black/20 p-4"
            >
              <h4 className="mb-2 text-sm font-black text-white">{ex.title}</h4>
              <p className="text-[13px] leading-relaxed text-white/60">{ex.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Anatomy of a real one */}
      {guide.anatomy && (
        <div className="mt-7 rounded-2xl border border-white/10 bg-black/30 p-5">
          <SubHeading label="🔬 Anatomy Of A Real One" accent={accent} />
          <p className="mb-4 text-sm leading-relaxed text-white/70">{guide.anatomy.lead}</p>
          <div className="space-y-2.5">
            {guide.anatomy.points.map((pt) => (
              <div
                key={pt.flag}
                className="flex flex-col gap-1 rounded-xl border-l-2 bg-white/[0.03] p-3 sm:flex-row sm:gap-4"
                style={{ borderLeftColor: accent }}
              >
                <span
                  className="shrink-0 text-xs font-black uppercase tracking-wide sm:w-40"
                  style={{ color: accent }}
                >
                  {pt.flag}
                </span>
                <span className="text-[13px] leading-relaxed text-white/65">{pt.detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}

export default function GuidePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="page-section">
        <div className="relative overflow-hidden bg-grid">
          <div
            className="orb orb-drift absolute -top-24 right-0 h-80 w-80 opacity-[0.16]"
            style={{ backgroundColor: "#00d4ff" }}
          />
          <div
            className="orb orb-drift absolute bottom-10 left-0 h-72 w-72 opacity-[0.10]"
            style={{ backgroundColor: "#ff1744", animationDelay: "6s" }}
          />

          <div className="page-frame relative z-10">
            <PageIntro
              eyebrow="Educational Guide"
              title={
                <>
                  Know the
                  <br />
                  <span className="gradient-text-cyan">scam.</span>
                </>
              }
              description="Before it knows you. Six AI-powered scams broken down the way they actually hit you — the red flags, the psychology, the blind spots they exploit, and real cases. Not a textbook. A field manual."
              align="center"
            />

            {/* Jump nav */}
            <nav className="mb-10 flex flex-wrap justify-center gap-2.5">
              {SCAM_GUIDES.map((g) => (
                <a
                  key={g.slug}
                  href={`#${g.slug}`}
                  className="premium-chip transition hover:bg-white/10"
                  style={{ borderColor: `${g.accent}40` }}
                >
                  <span aria-hidden>{g.icon}</span> {g.title}
                </a>
              ))}
            </nav>

            <div className="space-y-8">
              {SCAM_GUIDES.map((g) => (
                <GuideSection key={g.slug} guide={g} />
              ))}
            </div>

            {/* Cross-links to creatures with no written section yet */}
            <div className="mt-10 premium-panel premium-panel-soft p-6 sm:p-8">
              <h2 className="section-title mb-2">Three more scams to know.</h2>
              <p className="section-copy mb-6 max-w-2xl text-sm">
                These don&apos;t have a full written breakdown yet, but they&apos;re catalogued as
                creatures in the Pokédex — tap through to see how each one operates.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {GUIDE_CROSSLINKS.map((link) => {
                  const entry = POKEDEX_ENTRIES_BY_SLUG[link.slug];
                  if (!entry) return null;
                  const typeMeta = POKEDEX_TYPE_META[entry.type];
                  return (
                    <Link
                      key={link.slug}
                      href={`/pokedex/${link.slug}`}
                      className="card-rail-link card-hover"
                    >
                      <span
                        className="mono-label text-[10px] uppercase tracking-[0.2em]"
                        style={{ color: typeMeta.color }}
                      >
                        {entry.type}
                      </span>
                      <h3 className="text-lg font-black text-white">{entry.name}</h3>
                      <p className="text-sm leading-relaxed text-white/55">{link.label}</p>
                      <span className="link-inline mt-auto text-xs">View in Pokédex →</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bridge to emergency guide */}
            <div className="mt-8 premium-panel premium-panel-danger p-6 text-center sm:p-8">
              <h2 className="section-title mb-2">Already been hit by one of these?</h2>
              <p className="section-copy mx-auto mb-5 max-w-xl text-sm">
                Don&apos;t freeze and don&apos;t stay silent. The Emergency Guide has the exact steps
                to take in the next five minutes — plus every hotline you need.
              </p>
              <Link href="/emergency" className="btn-red px-7 py-3">
                Go to the Emergency Guide →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
