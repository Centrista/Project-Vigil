"use client";

import { useState } from "react";
import type { Story } from "@/lib/stories";
import StoryCard from "@/components/StoryCard";

interface StoryFilterProps {
  stories: Story[];
}

export default function StoryFilter({ stories }: StoryFilterProps) {
  const [active, setActive] = useState("All");

  const CATEGORY_ORDER = [
    "All",
    "Gaming Scams",
    "Job Scams",
    "Deepfake Video",
"Sextortion",
    "AI Phishing",
  ];

  const tags = CATEGORY_ORDER;

  const filtered = active === "All" ? stories : stories.filter((s) => s.tag === active);

  return (
    <div>
      {/* Filter tabs */}
      <div
        className="flex items-center gap-1 mb-8 -mx-1 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {tags.map((tag) => {
          const isActive = tag === active;
          return (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              className="relative flex-shrink-0 px-4 py-2 text-sm font-semibold transition-all duration-150 rounded-lg"
              style={{
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.38)",
                background: isActive ? "rgba(255,255,255,0.07)" : "transparent",
              }}
            >
              {tag}
              {isActive && (
                <span
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                  style={{ backgroundColor: "#ff1744" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Story list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-white/30 text-sm">No stories in this category yet.</p>
        </div>
      ) : (
        <div
          className="rounded-2xl overflow-hidden px-4"
          style={{
            background: "linear-gradient(145deg, #1e2438, #1a1f2e)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {filtered.map((story, i) => (
            <StoryCard
              key={story.slug}
              story={story}
              isLast={i === filtered.length - 1}
            />
          ))}
        </div>
      )}

      {/* Count */}
      <p className="mono-label text-[11px] text-white/22 mt-4 text-right">
        {filtered.length} {filtered.length === 1 ? "story" : "stories"} · All accounts anonymous
      </p>
    </div>
  );
}
