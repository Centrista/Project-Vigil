import Link from "next/link";

interface QuizTabsProps {
  active: "pre" | "post";
}

export default function QuizTabs({ active }: QuizTabsProps) {
  const tabs = [
    { id: "pre" as const, label: "Pre Quiz", href: "/risk-quiz" },
    { id: "post" as const, label: "Post Quiz", href: "/risk-quiz/post-quiz" },
  ];

  return (
    <div className="sticky top-[74px] z-40 w-full">
      <div className="mx-auto max-w-3xl px-4 pb-1 pt-2 sm:px-6 sm:pt-2.5 lg:px-8">
        <div className="flex justify-center">
          <div
            className="inline-flex min-w-[280px] items-center gap-1 rounded-full border border-white/8 p-1"
            style={{
              backgroundColor: "rgba(15, 24, 40, 0.78)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
            }}
          >
            {tabs.map((tab) => {
              const isActive = tab.id === active;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`flex min-w-[132px] flex-1 items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? "border border-white/10 bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                      : "text-white/40 hover:bg-white/[0.04] hover:text-white/78"
                  }`}
                >
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
