"use client";

import { useState } from "react";
import GuideCard from "@/components/GuideCard";
import { GUIDE_ENTRIES, CATEGORY_META, type Category } from "@/lib/guide-data";

type Tab = Category | "all";

const TABS: { id: Tab; label: string; color: string }[] = [
  { id: "all", label: "All", color: "#ffffff" },
  { id: "ai-native", label: "AI-Native", color: CATEGORY_META["ai-native"].color },
  { id: "ai-transformed", label: "AI-Transformed", color: CATEGORY_META["ai-transformed"].color },
  { id: "traditional", label: "Traditional", color: CATEGORY_META["traditional"].color },
];

export default function GuideCatalog() {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const counts: Record<Tab, number> = {
    all: GUIDE_ENTRIES.length,
    "ai-native": GUIDE_ENTRIES.filter((e) => e.category === "ai-native").length,
    "ai-transformed": GUIDE_ENTRIES.filter((e) => e.category === "ai-transformed").length,
    traditional: GUIDE_ENTRIES.filter((e) => e.category === "traditional").length,
  };

  const filtered =
    activeTab === "all"
      ? GUIDE_ENTRIES
      : GUIDE_ENTRIES.filter((e) => e.category === activeTab);

  return (
    <div>
      <div className="mb-8 inline-flex flex-wrap gap-2 rounded-full border border-white/8 bg-white/[0.03] p-1.5">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all duration-200 whitespace-nowrap"
              style={
                isActive
                  ? {
                      background:
                        tab.id === "all"
                          ? "rgba(255,255,255,0.14)"
                          : `${tab.color}22`,
                      color: tab.id === "all" ? "#ffffff" : tab.color,
                      boxShadow:
                        tab.id === "all"
                          ? "0 1px 8px rgba(0,0,0,0.3)"
                          : `0 1px 8px ${tab.color}30`,
                    }
                  : {
                      background: "transparent",
                      color: "rgba(255,255,255,0.32)",
                    }
              }
            >
              {tab.label}
              <span
                className="mono-label text-[10px] font-black px-1.5 py-0.5 rounded tabular-nums"
                style={{
                  background: isActive
                    ? tab.id === "all"
                      ? "rgba(255,255,255,0.18)"
                      : `${tab.color}30`
                    : "rgba(255,255,255,0.08)",
                  color: isActive
                    ? tab.id === "all"
                      ? "rgba(255,255,255,0.9)"
                      : tab.color
                    : "rgba(255,255,255,0.22)",
                }}
              >
                {counts[tab.id]}
              </span>
            </button>
          );
        })}
      </div>

      {activeTab !== "all" && (
        <div
          className="fade-up mb-7 flex items-center gap-3 rounded-[20px] px-4 py-4"
          style={{
            background: `${CATEGORY_META[activeTab].color}08`,
            border: `1px solid ${CATEGORY_META[activeTab].color}22`,
          }}
        >
          <span
            className="w-0.5 self-stretch rounded-full shrink-0"
            style={{ background: CATEGORY_META[activeTab].color }}
          />
          <p
            className="text-sm font-semibold leading-snug"
            style={{ color: `${CATEGORY_META[activeTab].color}cc` }}
          >
            {CATEGORY_META[activeTab].description}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((entry) => (
          <GuideCard key={entry.slug} entry={entry} />
        ))}
      </div>

      <p className="mono-label text-[11px] text-white/20 mt-6 text-right">
        {filtered.length} entries · Click any card to expand
      </p>
    </div>
  );
}
