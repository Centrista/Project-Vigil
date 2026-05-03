import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import QuizTabs from "@/components/QuizTabs";

export const metadata = {
  title: "AI Scam Risk Quiz — Project Vigil",
  description: "10 questions. Find out how vulnerable you are to AI voice cloning, deepfakes, and AI phishing.",
};

export default function RiskQuizPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <QuizTabs active="pre" />

      <div className="relative overflow-hidden bg-grid">
        <div className="orb absolute -top-20 right-0 w-80 h-80 opacity-15" style={{ backgroundColor: "#ff1744" }} />

        <div className="page-frame page-frame-tight relative z-10 text-center pb-28">
          <PageIntro
            eyebrow="AI Scam Risk Assessment"
            title={
              <>
                Would you fall for
                <br />
                <span className="gradient-text-red">an AI scam?</span>
              </>
            }
            description="10 real-world AI scam scenarios. Find out exactly where you&apos;re exposed before scammers do."
            align="center"
            actions={
              <>
                <Link href="/risk-quiz/results" className="btn-red px-10 py-4 text-lg rounded-2xl">
                  Start — 60 Seconds
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/guide" className="btn-ghost px-8 py-4 text-lg rounded-2xl">
                  Study First
                </Link>
              </>
            }
            stats={[
              { label: "Anonymous", tone: "default" },
              { label: "No sign-up", tone: "default" },
              { label: "10 AI scam scenarios", tone: "danger" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
