import type { ReactNode } from "react";

interface PageIntroStat {
  label: string;
  tone?: "default" | "danger" | "info" | "success" | "warm";
}

interface PageIntroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  align?: "left" | "center";
  stats?: PageIntroStat[];
  actions?: ReactNode;
  className?: string;
}

const STAT_TONE_CLASS: Record<NonNullable<PageIntroStat["tone"]>, string> = {
  default: "premium-chip",
  danger: "premium-chip premium-chip-danger",
  info: "premium-chip premium-chip-info",
  success: "premium-chip premium-chip-success",
  warm: "premium-chip premium-chip-warm",
};

export default function PageIntro({
  eyebrow,
  title,
  description,
  align = "left",
  stats = [],
  actions,
  className = "",
}: PageIntroProps) {
  const centered = align === "center";

  return (
    <div className={`page-intro ${centered ? "page-intro-center" : ""} ${className}`.trim()}>
      <div className={`hero-kicker ${centered ? "justify-center" : ""}`}>
        {eyebrow}
      </div>

      <h1 className={`hero-title ${centered ? "mx-auto" : ""}`}>{title}</h1>
      <p className={`hero-copy ${centered ? "mx-auto" : ""}`}>{description}</p>

      {(stats.length > 0 || actions) && (
        <div className={`hero-support ${centered ? "justify-center" : ""}`}>
          {stats.length > 0 && (
            <div className={`hero-stats ${centered ? "justify-center" : ""}`}>
              {stats.map((stat) => (
                <span
                  key={stat.label}
                  className={STAT_TONE_CLASS[stat.tone ?? "default"]}
                >
                  {stat.label}
                </span>
              ))}
            </div>
          )}
          {actions && <div className={`hero-actions ${centered ? "justify-center" : ""}`}>{actions}</div>}
        </div>
      )}
    </div>
  );
}
