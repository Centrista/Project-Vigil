"use client";

import Link from "next/link";

interface QuizSideSwitcherProps {
  active: "vulnerability" | "pre" | "post";
}

const TABS = [
  { id: "vulnerability" as const, label: "Vulnerability Quiz", shortLabel: "Vulnerability", href: "/risk-quiz/vulnerability" },
  { id: "pre" as const, label: "Pre Quiz", shortLabel: "Pre", href: "/risk-quiz" },
  { id: "post" as const, label: "Post Quiz", shortLabel: "Post", href: "/risk-quiz/post-quiz" },
];

export default function QuizSideSwitcher({ active }: QuizSideSwitcherProps) {
  return (
    <>
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div
          className="flex flex-col gap-2 rounded-2xl border border-white/8 p-2"
          style={{
            backgroundColor: "rgba(15, 24, 40, 0.78)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.16)",
          }}
        >
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? "border border-white/10 bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    : "text-white/40 hover:bg-white/[0.04] hover:text-white/78"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="page-frame page-frame-tight lg:hidden">
        <div
          className="mx-auto mt-4 mb-2 flex w-full max-w-md items-center gap-1 rounded-2xl border border-white/8 p-1"
          style={{
            backgroundColor: "rgba(15, 24, 40, 0.78)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.16)",
          }}
        >
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`flex flex-1 items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? "border border-white/10 bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    : "text-white/45 hover:bg-white/[0.04] hover:text-white/80"
                }`}
              >
                {tab.shortLabel}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
