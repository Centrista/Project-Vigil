import type { Metadata } from "next";
import TrendingGrid from "@/components/TrendingGrid";

export const metadata: Metadata = {
  title: "Trending Scams — Project Vigil",
  description:
    "A live premium dashboard for trending scam patterns, filterable by risk and time window.",
};

export default function TrendingScamsPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative overflow-hidden bg-grid-soft">
        <div className="orb absolute -left-24 top-0 h-[440px] w-[440px] opacity-[0.18]" style={{ backgroundColor: "#ff1744" }} />
        <div className="orb absolute right-0 top-14 h-[340px] w-[340px] opacity-[0.08]" style={{ backgroundColor: "#00d4ff" }} />

        <div className="page-frame">
          <div className="page-panel p-4 sm:p-6 lg:p-8">
            <TrendingGrid />
          </div>
        </div>
      </section>
    </div>
  );
}
