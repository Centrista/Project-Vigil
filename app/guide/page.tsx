import PageIntro from "@/components/PageIntro";
import GuideCatalog from "@/components/GuideCatalog";
import { GUIDE_ENTRIES } from "@/lib/guide-data";

export const metadata = {
  title: "AI Scam Guide — Project Vigil",
  description:
    "How AI voice cloning, deepfakes, phishing, romance bots, and 16+ more scams work — with red flags and defense tips.",
};

export default function GuidePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative overflow-hidden bg-grid">
        <div
          className="orb orb-drift absolute -top-40 -left-40 w-[520px] h-[520px] opacity-[0.14]"
          style={{ backgroundColor: "#ff1744" }}
        />
        <div
          className="orb orb-drift absolute -top-10 right-0 w-[400px] h-[400px] opacity-[0.09]"
          style={{ backgroundColor: "#00d4ff", animationDelay: "6s" }}
        />
        <div
          className="orb orb-drift absolute bottom-0 left-1/2 w-[280px] h-[280px] opacity-[0.06]"
          style={{ backgroundColor: "#a855f7", animationDelay: "3s" }}
        />

        <div className="page-frame relative z-10 pb-12">
          <PageIntro
            eyebrow="AI Scam Guide"
            title="How AI Scams Work"
            description="Every attack explained — how it works, why it works, and how to defend before the pressure hits."
            stats={[
              { label: `${GUIDE_ENTRIES.length} scams catalogued`, tone: "default" },
              { label: "AI-Native · AI-Transformed · Traditional", tone: "danger" },
            ]}
            className="fade-up"
          />
        </div>
      </section>

      <div className="page-section">
        <div className="page-frame page-frame-narrow pt-10">
          <GuideCatalog />
        </div>
      </div>
    </div>
  );
}
