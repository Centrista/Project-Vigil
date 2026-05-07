import Link from "next/link";
import type { Story } from "@/lib/stories";

const OUTCOME_CONFIG = {
  caught: { label: "CAUGHT", color: "#ff1744", bg: "rgba(255,23,68,0.1)", border: "rgba(255,23,68,0.3)" },
  escaped: { label: "ESCAPED", color: "#22c55e", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.28)" },
  partial: { label: "PARTIAL", color: "#ffa700", bg: "rgba(255,167,0,0.08)", border: "rgba(255,167,0,0.28)" },
};

interface StoryCardProps {
  story: Story;
  isLast?: boolean;
  animIndex?: number;
}

export default function StoryCard({ story, isLast = false, animIndex = 0 }: StoryCardProps) {
  const outcome = OUTCOME_CONFIG[story.outcome];

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group block -mx-4 rounded-[22px] px-4 py-6 transition-all duration-200 fade-up hover:bg-[rgba(255,220,100,0.06)]"
      style={{
        borderBottom: isLast ? "none" : "1px solid rgba(200,165,70,0.22)",
        animationDelay: `${animIndex * 55}ms`,
      }}
    >
      <div
        className="pl-4"
        style={{ borderLeft: `3px solid ${story.tagColor}60` }}
      >
        {/* Top row: badges + loss amount */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="mono-label text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded"
              style={{ color: outcome.color, background: outcome.bg, border: `1px solid ${outcome.border}` }}
            >
              {outcome.label}
            </span>
            <span
              className="mono-label text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
              style={{ color: story.tagColor, background: `${story.tagColor}18`, border: `1px solid ${story.tagColor}28` }}
            >
              {story.tag}
            </span>
          </div>

          {/* Loss amount callout */}
          <div className="shrink-0 text-right">
            <span className="mono-label text-[9px] uppercase tracking-widest text-white/28 block mb-0.5">LOST</span>
            <span className="text-sm font-black leading-tight" style={{ color: "#ff4040" }}>
              {story.lossAmount}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-xl font-black leading-tight text-[#131b30] transition-colors group-hover:text-[#131b30]/90">
          {story.title}
        </h2>

        {/* Pull quote */}
        <p className="text-sm text-[rgba(20,33,56,0.62)] italic leading-relaxed mb-3">
          &ldquo;{story.pullQuote}&rdquo;
        </p>

        {/* Metadata + arrow */}
        <div className="flex items-center justify-between gap-3">
          <span className="mono-label text-[11px] text-[rgba(89,72,24,0.55)]">
            {story.location} · {story.platform} · {story.submittedAt}
          </span>
          <svg
            className="w-4 h-4 shrink-0 transition-all duration-200 group-hover:translate-x-0.5 story-card-arrow"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
