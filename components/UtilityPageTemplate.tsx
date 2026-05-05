import type { ReactNode } from "react";
import PageIntro from "@/components/PageIntro";

interface UtilityPageTemplateProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  previewTitle: string;
  previewBody: string;
  bullets: string[];
  accentTone?: "danger" | "info" | "warm";
}

const PREVIEW_CLASS: Record<NonNullable<UtilityPageTemplateProps["accentTone"]>, string> = {
  danger: "premium-panel premium-panel-danger",
  info: "premium-panel premium-panel-info",
  warm: "premium-panel premium-panel-warm",
};

export default function UtilityPageTemplate({
  eyebrow,
  title,
  description,
  previewTitle,
  previewBody,
  bullets,
  accentTone = "info",
}: UtilityPageTemplateProps) {
  return (
    <div className="page-section">
      <div className="page-frame page-frame-narrow">
        <PageIntro
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div className={`${PREVIEW_CLASS[accentTone]} page-utility-panel mx-auto max-w-4xl`}>
          <div className="eyebrow-row">
            <span className="premium-dot" />
            <span className="mono-label text-[11px] uppercase tracking-[0.24em] text-white/45">
              Product Preview
            </span>
          </div>

          <h2 className="section-title mb-3 max-w-2xl">{previewTitle}</h2>
          <p className="section-copy max-w-2xl">{previewBody}</p>

          <div className="utility-bullet-grid">
            {bullets.map((bullet) => (
              <div key={bullet} className="utility-bullet-card">
                <span className="utility-bullet-dot" />
                <p>{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
