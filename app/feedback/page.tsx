import Link from "next/link";

export const metadata = {
  title: "Feedback — Project Vigil",
  description: "Share feedback or report something you think we should know.",
};

export default function FeedbackPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-bold uppercase tracking-widest text-white/60 mb-8">
        📝 Feedback
      </div>
      <h1 className="text-5xl font-black text-white mb-4">Feedback</h1>
      <p className="text-white/45 text-lg mb-12 max-w-md mx-auto leading-relaxed">
        Suggestions, bug reports, or anything else — we want to hear it.
      </p>
      <div className="rounded-2xl glass p-12 mb-8">
        <div className="text-4xl mb-4">🚧</div>
        <h2 className="text-lg font-bold text-white mb-2">Coming Soon</h2>
      </div>
      <Link href="/" className="text-sm font-semibold hover:underline" style={{ color: "#ff1744" }}>← Home</Link>
    </div>
  );
}
