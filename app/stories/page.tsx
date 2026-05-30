import PageIntro from "@/components/PageIntro";
import { STORIES } from "@/lib/stories";
import StoryFilter from "@/components/StoryFilter";

export const metadata = {
  title: "Real Stories — Project Vigil",
  description: "First-hand accounts from teens who were hit by AI scams.",
};

export default function StoriesPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="page-frame page-frame-narrow">
        <PageIntro
          eyebrow="Anonymous Accounts"
          title={
            <>
              Real Stories.
              <br />
              <span className="gradient-text-red">Real Losses.</span>
            </>
          }
          description="First-hand accounts from teens who encountered AI scams. Their experience is your warning."
        />
        <StoryFilter stories={STORIES} />
      </div>
    </div>
  );
}
