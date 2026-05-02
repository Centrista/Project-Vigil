import Link from "next/link";

export const metadata = {
  title: "AI Scam Guide — Project Vigil",
  description: "How AI voice cloning, deepfakes, AI phishing, and romance bots work — and how to stop them.",
};

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-bold uppercase tracking-widest text-white/60 mb-8">
        🤖 AI Scam Guide
      </div>
      <h1 className="text-5xl font-black text-white mb-4">How AI Scams Work</h1>
      <p className="text-white/45 text-lg mb-12 max-w-md mx-auto leading-relaxed">
        Every AI attack explained — how it works, why it fools people, and how to defend yourself.
      </p>
      <div className="rounded-2xl glass p-12 mb-8">
        <div className="text-4xl mb-4">🚧</div>
        <h2 className="text-lg font-bold text-white mb-2">Coming Soon</h2>
      </div>
      <Link href="/" className="text-sm font-semibold hover:underline" style={{ color: "#ff1744" }}>← Home</Link>
    </div>
  );
}
