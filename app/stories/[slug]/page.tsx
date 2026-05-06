import Link from "next/link";
import { notFound } from "next/navigation";
import { STORIES } from "@/lib/stories";

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = STORIES.find((s) => s.slug === slug);
  if (!story) return {};
  return {
    title: `${story.title} — Project Vigil`,
    description: story.pullQuote,
  };
}

const OUTCOME_CONFIG = {
  caught: { label: "CAUGHT", color: "#ff1744", bg: "rgba(255,23,68,0.1)", border: "rgba(255,23,68,0.3)" },
  escaped: { label: "ESCAPED", color: "#22c55e", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.28)" },
  partial: { label: "PARTIAL", color: "#ffa700", bg: "rgba(255,167,0,0.08)", border: "rgba(255,167,0,0.28)" },
};

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = STORIES.find((s) => s.slug === slug);
  if (!story) notFound();

  const outcome = OUTCOME_CONFIG[story.outcome];
  const storyIndex = STORIES.findIndex((s) => s.slug === slug);
  const prevStory = storyIndex > 0 ? STORIES[storyIndex - 1] : null;
  const nextStory = storyIndex < STORIES.length - 1 ? STORIES[storyIndex + 1] : null;

  return (
    <div className="w-full overflow-x-hidden">
      <div className="page-frame page-frame-narrow pt-14">

        <Link
          href="/stories"
          className="link-inline mono-label mb-10 text-xs text-[rgba(20,33,56,0.45)]"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Stories
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-5 flex-wrap">
            <span
              className="mono-label text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded"
              style={{ color: outcome.color, background: outcome.bg, border: `1px solid ${outcome.border}` }}
            >
              {outcome.label}
            </span>
            <span
              className="mono-label text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded"
              style={{ color: story.tagColor, background: `${story.tagColor}10`, border: `1px solid ${story.tagColor}28` }}
            >
              {story.tag}
            </span>
            <span className="mono-label text-[10px] text-white/28">{story.submittedAt}</span>
          </div>

          <h1 className="mb-6 text-4xl font-black leading-tight text-white sm:text-5xl">
            {story.title}
          </h1>

          <blockquote
            className="mb-4 pl-5 text-xl italic leading-relaxed sm:text-2xl"
            style={{
              color: "rgba(20,33,56,0.72)",
              borderLeft: `3px solid ${story.tagColor}`,
            }}
          >
            &ldquo;{story.pullQuote}&rdquo;
          </blockquote>
          <p className="mono-label text-xs text-[rgba(89,72,24,0.55)] pl-5">
            — Age {story.age}, {story.location}
          </p>
        </div>

        <div className="divider-line mb-10" />

        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-10">
          <aside className="mb-10 lg:mb-0">
            <div
              className="warm-panel sticky top-28 p-5"
              style={{
                border: `1px solid ${story.tagColor}22`,
                borderLeft: `3px solid ${story.tagColor}`,
              }}
            >
              <p className="mono-label text-[10px] font-black uppercase tracking-widest text-[rgba(89,72,24,0.55)] mb-4">
                Quick Facts
              </p>
              {[
                { label: "Age", value: String(story.age) },
                { label: "Location", value: story.location },
                { label: "Platform", value: story.platform },
                { label: "Lost", value: story.lossAmount },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-baseline mb-2.5 last:mb-0">
                  <span className="mono-label text-[10px] text-[rgba(89,72,24,0.55)] uppercase tracking-widest">{row.label}</span>
                  <span className="text-sm font-bold text-[#131b30] text-right ml-3">{row.value}</span>
                </div>
              ))}
            </div>
          </aside>

          <div>
            <div className="warm-panel p-6 sm:p-8">
              <div className="space-y-5">
              {story.story.map((paragraph, i) => (
                <p key={i} className="text-[15px] text-[rgba(20,33,56,0.78)] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            </div>
          </div>
        </div>

        <div className="divider-line my-14" />

        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="mono-label text-xs font-bold uppercase tracking-widest" style={{ color: "#ff1744" }}>
              ◈ Red Flags Detected
            </span>
            <span className="mono-label text-xs text-white/28">
              {story.redFlags.length} signals missed
            </span>
          </div>

          <div className="space-y-2.5">
            {story.redFlags.map((flag) => (
              <div
                key={flag.label}
                className="flex items-center gap-3 rounded-[20px] px-4 py-3.5"
                style={{
                  background: "rgba(255,23,68,0.05)",
                  border: "1px solid rgba(255,23,68,0.18)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: "#ff1744", boxShadow: "0 0 6px rgba(255,23,68,0.9)" }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white">{flag.label}</div>
                  <div className="text-xs text-white/38 mt-0.5">{flag.detail}</div>
                </div>
                <span className="mono-label text-[10px] font-black shrink-0" style={{ color: "#ff1744" }}>
                  MISSED
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-14">
          <div
            className="rounded-[24px] px-5 py-5"
            style={{
              background: "rgba(34,197,94,0.05)",
              border: "1px solid rgba(34,197,94,0.2)",
            }}
          >
            <p className="mono-label text-xs font-black uppercase tracking-widest mb-4" style={{ color: "#22c55e" }}>
              What to do instead
            </p>
            <ul className="space-y-2.5">
              {story.whatToDoInstead.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mono-label text-[10px] font-black shrink-0 mt-0.5 w-4 tabular-nums"
                    style={{ color: "#22c55e" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-white/70 leading-snug">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          {prevStory ? (
            <Link
              href={`/stories/${prevStory.slug}`}
              className="group flex items-center gap-2 text-sm text-[rgba(20,33,56,0.45)] hover:text-[rgba(20,33,56,0.85)] transition-colors"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="leading-tight">
                <span className="block mono-label text-[10px] uppercase tracking-widest text-[rgba(89,72,24,0.4)] mb-0.5">Previous</span>
                {prevStory.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextStory ? (
            <Link
              href={`/stories/${nextStory.slug}`}
              className="group flex items-center gap-2 text-sm text-[rgba(20,33,56,0.45)] hover:text-[rgba(20,33,56,0.85)] transition-colors text-right"
            >
              <span className="leading-tight">
                <span className="block mono-label text-[10px] uppercase tracking-widest text-[rgba(89,72,24,0.4)] mb-0.5">Next</span>
                {nextStory.title}
              </span>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>

      </div>
    </div>
  );
}
