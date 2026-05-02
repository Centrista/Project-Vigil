import Link from "next/link";

export const metadata = {
  title: "Submit an AI Scam — Project Vigil",
  description: "Encountered an AI scam? Report it anonymously to help us map new attack patterns.",
};

export default function SubmitScamPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-bold uppercase tracking-widest text-white/60 mb-8">
        📡 Report an AI Scam
      </div>
      <h1 className="text-5xl font-black text-white mb-4">
        Report an <span className="gradient-text-cyan">AI Scam</span>
      </h1>
      <p className="text-white/45 text-lg mb-12 max-w-md mx-auto leading-relaxed">
        Encountered a voice clone, deepfake, AI phishing, or romance bot? Submit it anonymously.
        Every report helps map new AI attack patterns.
      </p>
      <div className="rounded-2xl glass p-12 mb-8">
        <div className="text-4xl mb-4">🚧</div>
        <h2 className="text-lg font-bold text-white mb-2">Coming Soon</h2>
        <p className="text-white/35 text-sm">Anonymous submission form launching with the backend.</p>
      </div>
      <Link href="/" className="text-sm font-semibold hover:underline" style={{ color: "#ff1744" }}>← Home</Link>
    </div>
  );
}
