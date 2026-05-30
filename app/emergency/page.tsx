import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import {
  TRIAGE,
  HOTLINES,
  PLAYBOOKS,
  type Hotline,
  type Playbook,
} from "@/lib/emergency-guide";

export const metadata = {
  title: "Emergency Guide — Project Vigil",
  description:
    "Think you've been hit by an AI scam? The exact steps to take in the next five minutes, every Singapore hotline you need, and a playbook for each scam.",
};

const TONE: Record<Hotline["tone"], string> = {
  info: "#00d4ff",
  danger: "#ff1744",
  warm: "#ff6d00",
  calm: "#a855f7",
  success: "#22c55e",
};

function HotlineCard({ hotline, index }: { hotline: Hotline; index: number }) {
  const color = TONE[hotline.tone];
  return (
    <div
      className="entrance-stagger group relative overflow-hidden rounded-2xl border bg-black/20 p-5"
      style={{
        borderColor: `${color}33`,
        background: `linear-gradient(180deg, ${color}12 0%, rgba(11,17,32,0.9) 60%)`,
        ["--stagger-delay" as string]: `${index * 70}ms`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: color }}
      />
      <p className="text-sm font-black uppercase tracking-wide" style={{ color }}>
        {hotline.label}
      </p>
      <div className="mt-2.5 space-y-1.5">
        {hotline.numbers.map((n) =>
          n.tel ? (
            <a
              key={n.display}
              href={`tel:${n.tel}`}
              className="block text-lg font-black leading-tight text-white transition hover:opacity-80"
            >
              {n.display}
            </a>
          ) : (
            <p key={n.display} className="block text-sm font-bold leading-tight text-white/85">
              {n.display}
            </p>
          ),
        )}
      </div>
      <p className="mt-2.5 text-[13px] leading-relaxed text-white/55">{hotline.blurb}</p>
    </div>
  );
}

function PlaybookCard({ playbook, index }: { playbook: Playbook; index: number }) {
  const accent = playbook.accent;
  return (
    <section
      id={playbook.id}
      className="premium-panel entrance-stagger scroll-mt-28 p-6 sm:p-8"
      style={{
        borderColor: `${accent}3d`,
        background: `linear-gradient(180deg, ${accent}12 0%, rgba(11,17,32,0.98) 44%)`,
        ["--stagger-delay" as string]: `${index * 60}ms`,
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
          style={{ background: `${accent}1f`, border: `1px solid ${accent}40` }}
          aria-hidden
        >
          {playbook.icon}
        </div>
        <div>
          <h2
            className="text-[clamp(1.3rem,3.2vw,1.85rem)] font-black leading-tight"
            style={{ color: accent }}
          >
            {playbook.title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-white/55">
            <span className="font-bold text-white/75">Use this if:</span> {playbook.when}
          </p>
        </div>
      </div>

      <ol className="mt-6 space-y-3">
        {playbook.steps.map((step, i) => (
          <li key={i} className="flex gap-3.5">
            <span
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black"
              style={{ background: `${accent}26`, color: accent }}
            >
              {i + 1}
            </span>
            <span className="text-[15px] leading-relaxed text-white/80">{step}</span>
          </li>
        ))}
      </ol>

      {playbook.callout && (
        <div
          className="mt-6 rounded-2xl border p-4"
          style={
            playbook.callout.tone === "warn"
              ? { borderColor: "#ff174433", background: "#ff174412" }
              : { borderColor: "#a855f733", background: "#a855f712" }
          }
        >
          <p
            className="mb-1 text-xs font-black uppercase tracking-wide"
            style={{ color: playbook.callout.tone === "warn" ? "#ff6d00" : "#c4b5fd" }}
          >
            {playbook.callout.tone === "warn" ? "⚠ " : "♥ "}
            {playbook.callout.title}
          </p>
          <p className="text-[13px] leading-relaxed text-white/70">{playbook.callout.body}</p>
        </div>
      )}
    </section>
  );
}

export default function EmergencyPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="page-section">
        <div className="relative overflow-hidden bg-grid">
          <div
            className="orb orb-drift absolute -top-24 left-0 h-96 w-96 opacity-[0.20]"
            style={{ backgroundColor: "#ff1744" }}
          />
          <div
            className="orb orb-drift absolute right-0 top-20 h-72 w-72 opacity-[0.10]"
            style={{ backgroundColor: "#ff6d00", animationDelay: "5s" }}
          />

          <div className="page-frame relative z-10">
            <PageIntro
              eyebrow="Emergency"
              title={
                <>
                  Breathe.
                  <br />
                  <span className="gradient-text-red">Act fast.</span>
                </>
              }
              description="Just been hit by an AI scam? No panic, no shame. Work down the first five minutes, call the right number, then find your scam below for the exact next steps."
              align="center"
            />

            {/* Reassurance bar */}
            <div className="fade-up mx-auto mb-12 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-center">
              <p className="text-[15px] leading-relaxed text-white/70">
                Scams are engineered to make you panic, feel stupid, and stay quiet — they fool
                adults too. Getting caught doesn&apos;t make you careless.{" "}
                <span className="font-bold text-white">
                  The fastest, smartest move is to tell someone now.
                </span>{" "}
                You&apos;ll be okay.
              </p>
            </div>

            {/* First 5 minutes */}
            <div className="mb-14">
              <h2 className="section-title mb-8 text-center">The first five minutes</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {TRIAGE.map((step, i) => (
                  <div
                    key={step.title}
                    className="entrance-stagger relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-5"
                    style={{ ["--stagger-delay" as string]: `${i * 80}ms` }}
                  >
                    <span className="gradient-text-red mb-2 block text-3xl font-black leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mb-1.5 text-base font-black text-white">{step.title}</h3>
                    <p className="text-[13px] leading-relaxed text-white/55">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotlines */}
            <div className="mb-14">
              <h2 className="section-title mb-3 text-center">Tap a number to call</h2>
              <p className="section-copy mx-auto mb-8 max-w-2xl text-center text-sm">
                All free, all reachable now. When money&apos;s involved, the bank line comes first —
                every minute counts.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {HOTLINES.map((h, i) => (
                  <HotlineCard key={h.label} hotline={h} index={i} />
                ))}
              </div>
            </div>

            {/* Playbooks */}
            <h2 className="section-title mb-6 text-center">Exact steps, by scam</h2>

            <nav className="mb-10 flex flex-wrap justify-center gap-2.5">
              {PLAYBOOKS.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="premium-chip transition hover:bg-white/10"
                  style={{ borderColor: `${p.accent}40` }}
                >
                  <span aria-hidden>{p.icon}</span> {p.title}
                </a>
              ))}
            </nav>

            <div className="space-y-6">
              {PLAYBOOKS.map((p, i) => (
                <PlaybookCard key={p.id} playbook={p} index={i} />
              ))}
            </div>

            {/* Bridge back to the guide */}
            <div className="mt-12 premium-panel premium-panel-info p-6 text-center sm:p-8">
              <h2 className="section-title mb-2">Want to spot them earlier?</h2>
              <p className="section-copy mx-auto mb-5 max-w-xl text-sm">
                The Educational Guide breaks down how each of these scams works before it reaches
                you — the red flags, the psychology, and real cases.
              </p>
              <Link href="/guide" className="btn-red px-7 py-3">
                Read the Educational Guide →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
