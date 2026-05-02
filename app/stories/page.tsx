import { STORIES } from "@/lib/stories";
import StoryFilter from "@/components/StoryFilter";

export const metadata = {
  title: "Real Stories — Project Vigil",
  description: "First-hand accounts from teens who were hit by AI scams.",
};

export default function StoriesPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-16 pb-24">

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mono-label text-xs font-bold uppercase tracking-widest text-white/55 mb-7">
            💬 Anonymous Accounts
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight">
            Real Stories.<br />
            <span className="gradient-text-red">Real Losses.</span>
          </h1>
          <p className="text-white/42 text-base max-w-sm leading-relaxed">
            First-hand accounts from teens who encountered AI scams. Their experience is your warning.
          </p>
        </div>

        {/* Filtered story list */}
        <StoryFilter stories={STORIES} />

      </div>
    </div>
  );
}
