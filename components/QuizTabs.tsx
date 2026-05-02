import Link from "next/link";

interface QuizTabsProps {
  active: "pre" | "knowledge";
}

export default function QuizTabs({ active }: QuizTabsProps) {
  const tabs = [
    { id: "pre" as const, label: "Take the Quiz", href: "/risk-quiz", icon: "🎯" },
    { id: "knowledge" as const, label: "Test Knowledge", href: "/risk-quiz/results", icon: "🧠" },
  ];

  return (
    <div
      className="sticky top-16 z-40 w-full border-b border-white/8"
      style={{ backgroundColor: "rgba(10,14,39,0.95)", backdropFilter: "blur(16px)" }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 py-1">
          {tabs.map((tab) => {
            const isActive = tab.id === active;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className="relative flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all duration-150"
                style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.38)" }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: "#ff1744" }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
