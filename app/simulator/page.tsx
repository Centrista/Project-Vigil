import Link from "next/link";
import PageIntro from "@/components/PageIntro";

export const metadata = {
  title: "Deepfake Voice Simulator — Project Vigil",
  description: "Can you tell when AI is faking a voice? Train your ear on real samples, then test yourself against AI clones.",
};

// Resolve simulator URL:
//   1. NEXT_PUBLIC_SIMULATOR_URL  → override (set in Vercel env vars if you redeploy)
//   2. Otherwise                  → the production simulator deployment
const SIMULATOR_URL =
  process.env.NEXT_PUBLIC_SIMULATOR_URL ?? "https://vigil-simulator.vercel.app";

export default function SimulatorPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="page-section">
        <div className="page-frame page-frame-narrow">
          <PageIntro
            eyebrow="Deepfake Voice Simulator"
            title={
              <>
                Can you tell when AI is{" "}
                <span className="gradient-text-red">faking a voice?</span>
              </>
            }
            description="Listen to 5 real voice samples from one person to learn their voice. Then we test you with 4 new clips — 2 real, 2 cloned by AI. Spot the fakes."
            align="center"
            actions={
              <Link
                href={SIMULATOR_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-red px-6 py-3 text-sm"
              >
                Open in new tab
              </Link>
            }
          />

          <div className="premium-panel premium-panel-danger overflow-hidden p-4 sm:p-5">
            <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#0c1628]">
              <iframe
                title="Project Vigil — Deepfake Voice Simulator"
                src={SIMULATOR_URL}
                className="block w-full"
                style={{ minHeight: "920px", border: 0, borderRadius: "22px", background: "#0c1628" }}
                allow="autoplay; clipboard-write"
                loading="lazy"
              >
                Loading…
              </iframe>
            </div>

            <p className="mono-label mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-white/35">
              Runs in your browser. Nothing is recorded.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
