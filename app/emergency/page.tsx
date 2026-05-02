import Link from "next/link";

export const metadata = {
  title: "Emergency Guide — Project Vigil",
  description: "Got hit by an AI scam? Follow these steps immediately.",
};

export default function EmergencyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
        style={{ backgroundColor: "rgba(255,23,68,0.1)", color: "#ff1744", border: "1px solid rgba(255,23,68,0.3)" }}
      >
        🚨 Emergency
      </div>
      <h1 className="text-5xl font-black text-white mb-4">Emergency Guide</h1>
      <p className="text-white/45 text-lg mb-12 max-w-md mx-auto leading-relaxed">
        Think you just got hit by an AI scam? Step-by-step actions to lock down your accounts right now.
      </p>
      <div
        className="rounded-2xl p-12 mb-8"
        style={{ backgroundColor: "rgba(255,23,68,0.06)", border: "1px solid rgba(255,23,68,0.2)" }}
      >
        <div className="text-4xl mb-4">🚧</div>
        <h2 className="text-lg font-bold text-white mb-2">Coming Soon</h2>
      </div>
      <Link href="/" className="text-sm font-semibold hover:underline" style={{ color: "#ff1744" }}>← Home</Link>
    </div>
  );
}
