import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import QuizSideSwitcher from "@/components/QuizSideSwitcher";

export const metadata = {
  title: "Post Quiz — Project Vigil",
  description: "Finish the follow-up post quiz to complete the assessment flow.",
};

const POST_QUIZ_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeiin386XNwDnAuC-kUo2It0BE8abyzgHhocYw6m31f1M5NYg/viewform";
const POST_QUIZ_FORM_EMBED_URL = `${POST_QUIZ_FORM_URL}?embedded=true`;

export default function PostQuizPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <QuizSideSwitcher active="post" />

      <div className="page-frame page-frame-tight pt-2 pb-28">
        <PageIntro
          eyebrow="Post Quiz"
          title={
            <>
              Finish the follow-up
              <br />
              <span className="gradient-text-red">to complete the flow.</span>
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
          }
        />

        <div className="premium-panel premium-panel-info mt-10 overflow-hidden p-4 sm:p-5">
          <div className="eyebrow-row mb-4">
            <div className="flex items-center gap-2">
              <span className="premium-dot" />
              <span className="mono-label text-[11px] uppercase tracking-[0.24em] text-white/42">
                Embedded Post Quiz
              </span>
            </div>
          </div>

          <p className="mb-4 max-w-2xl text-sm leading-relaxed text-white/46">
            If the embedded form feels cramped on your device, use the direct Google Forms link instead and come back here to keep moving through Project Vigil.
          </p>

          <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white">
            <iframe
              title="Project Vigil Post Quiz"
              src={POST_QUIZ_FORM_EMBED_URL}
              className="block w-full bg-white"
              style={{ minHeight: "1320px", border: 0, borderRadius: "22px" }}
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
