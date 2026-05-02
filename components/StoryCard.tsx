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
}

export default function StoryCard({ story, isLast = false }: StoryCardProps) {
  const outcome = OUTCOME_CONFIG[story.outcome];

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group block py-6 transition-all duration-200 hover:bg-white/[0.025] -mx-4 px-4 rounded-xl"
      style={{ borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.055)" }}
    >
      <div className="flex items-start gap-4">

        {/* Main content */}
        <div className="flex-1 min-w-0">

          {/* Top badges row */}
          <div className="flex items-center gap-2.5 mb-3 flex-wrap">
            <span
              className="mono-label text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded"
              style={{ color: outcome.color, background: outcome.bg, border: `1px solid ${outcome.border}` }}
            >
              {outcome.label}
            </span>
            <span
              className="mono-label text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
              style={{ color: story.tagColor, background: `${story.tagColor}10`, border: `1px solid ${story.tagColor}28` }}
            >
              {story.tag}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-black text-white text-xl leading-tight mb-2 group-hover:text-white/90 transition-colors">
            {story.title}
          </h2>

          {/* Pull quote */}
          <p className="text-sm text-white/52 italic leading-relaxed mb-3">
            &ldquo;{story.pullQuote}&rdquo;
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-1.5">
            <span className="mono-label text-[11px] text-white/28">
              Age {story.age} · {story.location} · Lost: {story.lossAmount}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <svg
          className="w-4 h-4 shrink-0 mt-1 text-white/18 group-hover:text-white/42 group-hover:translate-x-0.5 transition-all duration-200"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
