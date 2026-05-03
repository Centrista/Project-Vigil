import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import QuizTabs from "@/components/QuizTabs";

export const metadata = {
  title: "Post Quiz — Project Vigil",
  description: "Finish the follow-up post quiz after completing the knowledge check.",
};

const POST_QUIZ_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeiin386XNwDnAuC-kUo2It0BE8abyzgHhocYw6m31f1M5NYg/viewform";
const POST_QUIZ_FORM_EMBED_URL = `${POST_QUIZ_FORM_URL}?embedded=true`;

export default function PostQuizPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <QuizTabs active="post" />

      <div className="page-frame page-frame-tight pt-14 pb-28">
        <PageIntro
          eyebrow="Post Quiz"
          title={
            <>
              Finish the follow-up
              <br />
              <span className="gradient-text-red">after the knowledge test.</span>
            </>
          }
          description="Use the embedded Google Form below to complete the post-quiz step and close out the full assessment flow."
          align="left"
          stats={[
            { label: "Embedded post-quiz", tone: "info" },
            { label: "Follow-up step", tone: "default" },
            { label: "Final checkpoint", tone: "danger" },
          ]}
          actions={
            <>
              <Link
                href={POST_QUIZ_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-red px-8 py-4 text-base rounded-2xl"
              >
                Open in Google Forms
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/risk-quiz/results" className="btn-ghost px-8 py-4 text-base rounded-2xl">
                Back to Knowledge Test
              </Link>
            </>
          }
        />

        <div className="premium-panel premium-panel-info mt-10 overflow-hidden p-4 sm:p-5">
          <div className="eyebrow-row mb-4 flex-wrap justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="premium-dot" />
              <span className="mono-label text-[11px] uppercase tracking-[0.24em] text-white/42">
                Embedded Post Quiz
              </span>
            </div>
            <Link
              href={POST_QUIZ_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="mono-label inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/54 transition-colors hover:text-white"
            >
              Open in new tab
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5h5m0 0v5m0-5L10 14" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
              </svg>
            </Link>
          </div>

          <p className="mb-4 max-w-2xl text-sm leading-relaxed text-white/46">
            If the embedded form feels cramped on your device, use the direct Google Forms link instead and come back here to keep moving through Project Vigil.
          </p>

          <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white">
            <iframe
              title="Project Vigil Post Quiz"
              src={POST_QUIZ_FORM_EMBED_URL}
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
  );
}
