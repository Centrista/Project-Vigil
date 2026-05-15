import Link from "next/link";
import PageIntro from "@/components/PageIntro";

export const metadata = {
  title: "Submit an AI Scam — Project Vigil",
  description: "Encountered an AI scam? Report it anonymously to help us map new attack patterns.",
};

const SUBMIT_FORM_URL = process.env.NEXT_PUBLIC_SUBMIT_FORM_URL ?? "";
const SUBMIT_FORM_EMBED_URL = SUBMIT_FORM_URL ? `${SUBMIT_FORM_URL}?embedded=true` : "";

export default function SubmitScamPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="page-section">
        <div className="page-frame page-frame-narrow">
          <PageIntro
            eyebrow="Report an AI Scam"
            title={
              <>
                Report an <span className="gradient-text-cyan">AI Scam</span>
              </>
            }
            description="Encountered a voice clone, deepfake, AI phishing, or romance bot? Submit it anonymously. Every report helps map new AI attack patterns."
            align="center"
            stats={[
              { label: "Fully anonymous", tone: "info" },
              { label: "Voice / video / text", tone: "warm" },
              { label: "Feeds the alerts page", tone: "success" },
            ]}
            actions={
              <Link
                href={SUBMIT_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-red px-6 py-3 text-sm"
              >
                Open in Google Forms
              </Link>
            }
          />

          <div className="premium-panel premium-panel-info overflow-hidden p-4 sm:p-5">
            <div className="eyebrow-row mb-4">
              <span className="premium-dot" />
              <span className="mono-label text-[11px] uppercase tracking-[0.24em] text-white/42">
                Anonymous Intake
              </span>
            </div>

            <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white">
              <iframe
                title="Project Vigil — Submit an AI Scam"
                src={SUBMIT_FORM_EMBED_URL}
                className="block w-full bg-white"
                style={{ minHeight: "1200px", border: 0 }}
                loading="lazy"
              >
                Loading…
              </iframe>
            </div>

            <p className="mono-label mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-white/35">
              No login required. Nothing about you is collected.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
