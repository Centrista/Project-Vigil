import QuizTabs from "@/components/QuizTabs";
import KnowledgeQuiz from "@/components/KnowledgeQuiz";
import PageIntro from "@/components/PageIntro";

export const metadata = {
  title: "Test Your Knowledge — Project Vigil",
  description: "5 real-world AI scam scenarios. How many can you get right?",
};

export default function TestKnowledgePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <QuizTabs active="knowledge" />

      <div className="page-frame page-frame-tight pt-14">
        <PageIntro
          eyebrow="Knowledge Check"
          title={
            <>
              Test Your
              <br />
              <span className="gradient-text-red">AI Scam IQ</span>
            </>
          }
          description="5 real-world scenarios. Pick what you&apos;d actually do — then see how AI would have played you."
          align="center"
          stats={[
            { label: "Scenario-based", tone: "default" },
            { label: "Immediate feedback", tone: "info" },
            { label: "5 questions", tone: "danger" },
          ]}
        />

        <KnowledgeQuiz />
      </div>
    </div>
  );
}
