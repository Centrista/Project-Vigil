import QuizTabs from "@/components/QuizTabs";
import KnowledgeQuiz from "@/components/KnowledgeQuiz";

export const metadata = {
  title: "Test Your Knowledge — Project Vigil",
  description: "5 real-world AI scam scenarios. How many can you get right?",
};

export default function TestKnowledgePage() {
  return (
    <div className="w-full overflow-x-hidden">

      <QuizTabs active="knowledge" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-14 pb-24">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mono-label text-xs font-bold uppercase tracking-widest text-white/55 mb-7">
            🧠 Knowledge Check
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight">
            Test Your<br />
            <span className="gradient-text-red">AI Scam IQ</span>
          </h1>
          <p className="text-white/42 text-base max-w-sm mx-auto leading-relaxed">
            5 real-world scenarios. Pick what you&apos;d actually do — then see how AI would have played you.
          </p>
        </div>

        <KnowledgeQuiz />
      </div>
    </div>
  );
}
