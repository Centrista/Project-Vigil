import Link from "next/link";

interface QuizTabsProps {
  active: "pre" | "post";
}

export default function QuizTabs({ active }: QuizTabsProps) {
  const tabs = [
    { id: "pre" as const, label: "Pre Quiz", href: "/risk-quiz", icon: "🎯" },
    { id: "post" as const, label: "Post Quiz", href: "/risk-quiz/post-quiz", icon: "✅" },
  ];

  return (
    <div
      className="sticky top-[76px] z-40 w-full border-b border-white/8"
      style={{ backgroundColor: "rgba(9,16,33,0.88)", backdropFilter: "blur(16px)" }}
    >
      <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex min-w-full items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] p-1.5 sm:min-w-0">
            {tabs.map((tab) => {
              const isActive = tab.id === active;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`relative flex shrink-0 items-center gap-2 rounded-full px-3.5 py-3 text-sm font-semibold transition-all duration-150 sm:px-4 ${
                    isActive ? "nav-link-active bg-white/[0.06] text-white" : "text-white/42 hover:bg-white/[0.05] hover:text-white/88"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="whitespace-nowrap">{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
