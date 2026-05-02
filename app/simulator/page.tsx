import Link from "next/link";

export const metadata = {
  title: "Spot the Fake — Project Vigil",
  description: "Can you tell AI-generated content from real? Interactive deepfake and phishing detection training.",
};

export default function SimulatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-bold uppercase tracking-widest text-white/60 mb-8">
        🕹️ AI Detection Simulator
      </div>
      <h1 className="text-5xl font-black text-white mb-4">Spot the Fake</h1>
      <p className="text-white/45 text-lg mb-12 max-w-md mx-auto leading-relaxed">
        Real vs. AI-generated voices, messages, and faces. Train your instincts before scammers test them.
      </p>
      <div className="rounded-2xl glass p-12 mb-8">
        <div className="text-4xl mb-4">🚧</div>
        <h2 className="text-lg font-bold text-white mb-2">Coming Soon</h2>
      </div>
      <Link href="/" className="text-sm font-semibold hover:underline" style={{ color: "#ff1744" }}>← Home</Link>
    </div>
  );
}
