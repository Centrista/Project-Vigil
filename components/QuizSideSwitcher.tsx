"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface QuizSideSwitcherProps {
  active: "vulnerability" | "pre" | "post";
}

export default function QuizSideSwitcher({ active }: QuizSideSwitcherProps) {
  const pathname = usePathname();

  const tabs = [
    { id: "vulnerability" as const, label: "Vulnerability Quiz", href: "/risk-quiz/vulnerability" },
    { id: "pre" as const, label: "Pre Quiz", href: "/risk-quiz" },
    { id: "post" as const, label: "Post Quiz", href: "/risk-quiz/post-quiz" },
  ];

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div
        className="flex flex-col gap-2 rounded-2xl border border-white/8 p-2"
        style={{
          backgroundColor: "rgba(15, 24, 40, 0.78)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.16)",
        }}
      >
        {tabs.map((tab) => {
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
  );
}
