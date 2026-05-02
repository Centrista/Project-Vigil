import Link from "next/link";
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

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-20 pb-28 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-bold uppercase tracking-widest text-white/60 mb-8">
            🤖 AI Scam Risk Assessment
          </div>

          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight">
            Would you fall for<br />
            <span className="gradient-text-red">an AI scam?</span>
          </h1>

          <p className="text-white/45 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
            10 real-world AI scam scenarios. Find out exactly where you&apos;re exposed
            before scammers do.
          </p>

          <Link
            href="/risk-quiz/results"
            className="btn-red inline-flex items-center gap-2.5 px-10 py-4 text-lg rounded-xl mb-5"
          >
            Start — 60 Seconds
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <p className="text-xs text-white/25">Anonymous · No sign-up · 10 AI scam scenarios</p>
        </div>
      </div>

      <div className="text-center py-8">
        <Link href="/" className="text-sm font-semibold hover:underline" style={{ color: "#ff1744" }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
