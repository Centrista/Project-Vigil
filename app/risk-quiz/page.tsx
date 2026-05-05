import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import QuizTabs from "@/components/QuizTabs";

export const metadata = {
  title: "AI Scam Risk Quiz — Project Vigil",
  description: "10 questions. Find out how vulnerable you are to AI voice cloning, deepfakes, and AI phishing.",
};

const PRE_QUIZ_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfSoj5Cio2dzIMWCOjIYLmKoPFwSxCqo8yvd6FHukjxcahNzA/viewform";
const PRE_QUIZ_FORM_EMBED_URL = `${PRE_QUIZ_FORM_URL}?embedded=true`;

export default function RiskQuizPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <QuizTabs active="pre" />

      <div className="relative overflow-hidden bg-grid">
        <div className="orb absolute -top-20 right-0 w-80 h-80 opacity-15" style={{ backgroundColor: "#ff1744" }} />

        <div className="page-frame page-frame-tight relative z-10 pb-28 pt-14">
          <PageIntro
            eyebrow="AI Scam Risk Assessment"
            title={
              <>
                Take the scam pre-quiz
              </>
            }
            description="Start with the embedded Google Form below, then move into the post-quiz follow-up once you&apos;re ready."
            align="left"
            actions={
              <Link
                href={PRE_QUIZ_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-red px-8 py-4 text-base rounded-2xl"
              >
                Open in Google Forms
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0-5 5m5-5H6" />
                </svg>
              </Link>
            }
            stats={[
              { label: "Embedded pre-quiz", tone: "info" },
              { label: "Anonymous", tone: "default" },
              { label: "Post quiz follows", tone: "danger" },
            ]}
          />

          <div className="premium-panel premium-panel-info mt-10 overflow-hidden p-4 sm:p-5">
            <div className="eyebrow-row mb-4">
              <div className="flex items-center gap-2">
                <span className="premium-dot" />
                <span className="mono-label text-[11px] uppercase tracking-[0.24em] text-white/42">
                  Embedded Pre-Quiz
                </span>
              </div>
            </div>

            <p className="mb-4 max-w-2xl text-sm leading-relaxed text-white/46">
              If the embedded form feels cramped on your device, use the direct Google Forms link instead, then come back here to continue the quiz flow.
            </p>

            <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white">
              <iframe
                title="Project Vigil Scam Pre-Quiz"
                src={PRE_QUIZ_FORM_EMBED_URL}
                className="block w-full bg-white"
                style={{ minHeight: "1320px", border: 0 }}
                loading="lazy"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
