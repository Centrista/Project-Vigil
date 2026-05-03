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
  const counts = tags.reduce<Record<string, number>>((acc, tag) => {
    acc[tag] = tag === "All" ? stories.length : stories.filter((story) => story.tag === tag).length;
    return acc;
  }, {});

  const filtered = active === "All" ? stories : stories.filter((s) => s.tag === active);

  return (
    <div>
      <div
        className="mb-8 flex items-center gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {tags.map((tag) => {
          const isActive = tag === active;
          return (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              className={`flex-shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-150 ${isActive ? "filter-pill-active" : "border-white/10 bg-white/[0.03] text-white/52 hover:border-white/18 hover:bg-white/[0.05] hover:text-white"}`}
            >
              <span>{tag}</span>
              <span className={`ml-2 rounded-full px-2 py-0.5 mono-label text-[10px] ${isActive ? "bg-white/10 text-white/88" : "bg-white/[0.06] text-white/35"}`}>
                {counts[tag]}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="premium-panel p-12 text-center">
          <p className="text-sm text-white/34">No stories in this category yet.</p>
        </div>
      ) : (
        <div className="premium-panel overflow-hidden px-4">
          {filtered.map((story, i) => (
            <StoryCard
              key={story.slug}
              story={story}
              isLast={i === filtered.length - 1}
            />
          ))}
        </div>
      )}

      <p className="mono-label text-[11px] text-white/22 mt-4 text-right">
        {filtered.length} {filtered.length === 1 ? "story" : "stories"} · All accounts anonymous
      </p>
    </div>
  );
}
