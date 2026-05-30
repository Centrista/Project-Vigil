import type { ReactNode } from "react";

interface PageIntroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  align?: "left" | "center";
  actions?: ReactNode;
  className?: string;
}

export default function PageIntro({
  eyebrow,
  title,
  description,
  align = "left",
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

      {actions && (
        <div className={`hero-support ${centered ? "justify-center" : ""}`}>
          <div className={`hero-actions ${centered ? "justify-center" : ""}`}>{actions}</div>
        </div>
      )}
    </div>
  );
}
