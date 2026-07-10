import Link from "next/link";
import PageIntro from "@/components/PageIntro";

export const metadata = {
  title: "Deepfake Image Tester — Project Vigil",
  description: "Ten photos. Half are real people. Half never existed. Can you tell the difference?",
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
            eyebrow="Deepfake Image Tester"
            title={
              <>
                Can you spot an{" "}
                <span className="gradient-text-red">AI-generated face?</span>
              </>
            }
            description="We'll show you 10 photos — half real, half AI-generated. For each one, decide: real, or fake? Most people score close to a coin flip."
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
                title="Project Vigil — Deepfake Image Tester"
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
              Voice cloning test coming soon. Runs in your browser. Nothing is recorded.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
