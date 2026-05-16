import Link from "next/link";
import PageIntro from "@/components/PageIntro";

export const metadata = {
  title: "Scam Simulator — Project Vigil",
  description:
    "Read incoming messages, decide if each one is scam or legit, and battle the Pokémon hiding behind real scam patterns. A Pokémon-themed scam simulator for teens.",
};

export default function ScamBattleLanding() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative overflow-hidden bg-grid-soft">
        <div
          className="orb orb-drift absolute -top-32 left-0 h-[360px] w-[360px] opacity-[0.15]"
          style={{ backgroundColor: "#ff1744" }}
        />
        <div
          className="orb orb-drift absolute top-12 right-0 h-[420px] w-[420px] opacity-[0.11]"
          style={{ backgroundColor: "#00d4ff", animationDelay: "4s" }}
        />

        <div className="page-frame page-frame-narrow relative z-10 pb-10">
          <PageIntro
            eyebrow="Pokémon Scam Simulator"
            title={
              <>
                Spot the scam,
                <br />
                <span className="gradient-text-red">battle the Pokémon.</span>
              </>
            }
            description="Real-feeling messages land in your inbox — some scams, some legit. Spot which is which. Get a scam right and the matching Scam Pokémon spawns for a multi-turn battle. Session-only, zero data saved."
            stats={[
              { label: "8 messages per run", tone: "default" },
              { label: "9 Scam Pokémon", tone: "danger" },
              { label: "Session-only", tone: "info" },
            ]}
            actions={
              <Link href="/scam-battle/run" className="btn-red px-6 py-3 text-sm">
                Begin Run →
              </Link>
            }
            align="center"
            className="fade-up"
          />
        </div>
      </section>

      <div className="page-section">
        <div className="page-frame page-frame-narrow space-y-4 pt-6">
          <section className="premium-panel space-y-3 p-5">
            <span className="mono-label text-[11px] uppercase tracking-[0.22em] text-white/45">
              How a run works
            </span>
            <ol className="space-y-2.5 text-[13px] leading-relaxed text-white/78">
              <li>
                <span className="mono-label mr-2 text-cyan-300">01.</span>
                A message arrives in a realistic platform shell — WhatsApp, IG DM, SMS, Carousell, Gmail, Telegram.
              </li>
              <li>
                <span className="mono-label mr-2 text-cyan-300">02.</span>
                Decide:{" "}
                <span className="font-semibold text-emerald-300">Looks Legit</span> or{" "}
                <span className="font-semibold text-rose-300">Looks Sus</span>.
              </li>
              <li>
                <span className="mono-label mr-2 text-cyan-300">03.</span>
                Correct sus call → a wild Scam Pokémon appears. Multi-turn battle: pick the safest response each turn.
              </li>
              <li>
                <span className="mono-label mr-2 text-cyan-300">04.</span>
                End-of-run report: accuracy, Pokémon caught, scams you missed. Replay for a fresh mix.
              </li>
            </ol>
          </section>

          <section className="premium-panel space-y-3 p-5">
            <span className="mono-label text-[11px] uppercase tracking-[0.22em] text-white/45">
              Why this exists
            </span>
            <p className="text-[13px] leading-relaxed text-white/78">
              Scam-spotting is a skill you build by reps, not by reading. This is a sandbox where you face the
              same playbook scammers use on Sec 1–4 students in real life — at safe-distance, with feedback after
              every call. The legit decoys are tuned to look scam-shaped, so you can&apos;t pattern-match on brand
              names alone.
            </p>
          </section>

          <section className="premium-panel premium-panel-danger space-y-3 p-5">
            <span className="mono-label text-[11px] uppercase tracking-[0.22em] text-white/55">
              Sensitive content note
            </span>
            <p className="text-[12px] leading-relaxed text-white/72">
              Sextortion and pig-butchering scenarios are included because they target teens in Singapore right
              now. Both are handled abstractly — no explicit content, every choice set offers a report/block/tell-an-adult
              option scored as the best move. If anything you see here mirrors a real situation: don&apos;t reply,
              don&apos;t pay, screenshot, block, tell a trusted adult, call 1799.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
