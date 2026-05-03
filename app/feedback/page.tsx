import Link from "next/link";
import PageIntro from "@/components/PageIntro";

export const metadata = {
  title: "Feedback — Project Vigil",
  description: "Share feedback or report something you think we should know.",
};

const FEEDBACK_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfVMaFCxd_uluFtglZOP9j3j2rJHP5RxVu7a9jCYpTV6SwYBg/viewform";
const FEEDBACK_FORM_EMBED_URL = `${FEEDBACK_FORM_URL}?embedded=true`;

export default function FeedbackPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="page-section">
        <div className="page-frame page-frame-narrow">
          <PageIntro
            eyebrow="Feedback"
            title="Feedback"
            description="Suggestions, bug reports, or anything else — we want to hear it. You can submit feedback directly below without leaving Project Vigil."
            align="center"
            stats={[
              { label: "Embedded submission", tone: "info" },
              { label: "Fast product feedback", tone: "default" },
              { label: "Opens in place", tone: "success" },
            ]}
            actions={
              <>
                <Link
                  href={FEEDBACK_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-red px-6 py-3 text-sm"
                >
                  Open in Google Forms
                </Link>
                <Link href="/trending-scams" className="btn-ghost px-6 py-3 text-sm">
                  Browse Trending Scams
                </Link>
              </>
            }
          />

          <div className="premium-panel premium-panel-info overflow-hidden p-4 sm:p-5">
            <div className="eyebrow-row">
              <span className="premium-dot" />
              <span className="mono-label text-[11px] uppercase tracking-[0.24em] text-white/42">
                Embedded Form
              </span>
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-relaxed text-white/58">
                If the embedded form feels cramped on your device, use the direct Google Forms link instead.
              </p>
              <Link
                href={FEEDBACK_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="link-inline text-sm font-semibold text-white/72"
              >
                Open in new tab
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5h6m0 0v6m0-6L10 14" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 9v10h10" />
                </svg>
              </Link>
            </div>

            <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white">
              <iframe
                title="Project Vigil Feedback Form"
                src={FEEDBACK_FORM_EMBED_URL}
                className="block w-full bg-white"
                style={{ minHeight: "1280px", border: 0 }}
                loading="lazy"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
