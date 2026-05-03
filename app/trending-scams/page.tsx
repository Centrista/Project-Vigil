import type { Metadata } from "next";
import TrendingGrid from "@/components/TrendingGrid";

export const metadata: Metadata = {
  title: "Trending Scams — Project Vigil",
  description:
    "A live wireframe for the Trending Scams dashboard. Structure only, with interactive placeholders and no published scam content yet.",
};

export default function TrendingScamsPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative overflow-hidden bg-grid">
        <div
          className="orb absolute -top-40 -left-40 h-[520px] w-[520px] opacity-[0.16]"
          style={{ backgroundColor: "#ff1744" }}
        />
        <div
          className="orb absolute right-0 top-10 h-[380px] w-[380px] opacity-[0.08]"
          style={{ backgroundColor: "#00d4ff" }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pt-20">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="trending-redacted h-10 w-10 rounded-2xl" aria-hidden="true" />
              <div className="space-y-2" aria-hidden="true">
                <div className="trending-redacted h-3 w-32 rounded-full" />
                <div className="trending-redacted h-2.5 w-20 rounded-full opacity-60" />
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3" aria-hidden="true">
              <div className="trending-redacted h-10 w-28 rounded-full" />
              <div className="trending-redacted h-10 w-16 rounded-full" />
            </div>
          </div>

          <div className="rounded-[32px] border border-white/8 bg-white/[0.02] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-6 lg:p-8">
            <TrendingGrid />
          </div>
        </div>
      </section>
    </div>
  );
}
