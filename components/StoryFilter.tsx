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
    "Deepfake Scam",
    "Impersonation Scam",
    "Investment Fraud",
    "Retail Fraud",
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
              className={`flex-shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-150 ${isActive ? "story-filter-pill-active" : "story-filter-pill"}`}
            >
              <span>{tag}</span>
              <span className={`ml-2 rounded-full px-2 py-0.5 mono-label text-[10px] ${isActive ? "bg-[rgba(150,110,20,0.15)] text-[#131b30]" : "bg-[rgba(180,140,60,0.12)] text-[rgba(20,33,56,0.45)]"}`}>
                {counts[tag]}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="warm-panel p-12 text-center">
          <p className="text-sm text-[rgba(20,33,56,0.45)]">No stories in this category yet.</p>
        </div>
      ) : (
        <div className="warm-panel overflow-hidden px-4">
          {filtered.map((story, i) => (
            <StoryCard
              key={story.slug}
              story={story}
              isLast={i === filtered.length - 1}
              animIndex={i}
            />
          ))}
        </div>
      )}

      <p className="mono-label text-[11px] text-[rgba(89,72,24,0.5)] mt-4 text-right">
        {filtered.length} {filtered.length === 1 ? "story" : "stories"} · All accounts anonymous
      </p>
    </div>
  );
}
