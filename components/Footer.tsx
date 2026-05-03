import Link from "next/link";
import { FOOTER_GROUPS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="mt-auto border-t border-white/10"
      style={{ backgroundColor: "rgba(9,16,33,0.92)" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="premium-panel mb-8 overflow-hidden p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <div className="hero-kicker mb-4">Need a next step?</div>
              <h2 className="section-title mb-3 max-w-xl">
                Move from panic to a plan in one click.
              </h2>
              <p className="section-copy max-w-xl">
                Browse what is trending, test your instincts, or jump straight to the emergency playbook if something feels off right now.
              </p>
            </div>
            <div className="hero-actions lg:justify-end">
              <Link href="/trending-scams" className="btn-red px-6 py-3 text-sm">
                Open Trending Scams
              </Link>
              <Link href="/emergency" className="btn-ghost px-6 py-3 text-sm">
                Emergency Guide
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg font-black tracking-widest uppercase" style={{ color: "#ff1744", letterSpacing: "0.12em" }}>
                PROJECT
              </span>
              <span className="text-lg font-black tracking-widest uppercase text-white" style={{ letterSpacing: "0.12em" }}>
                VIGIL
              </span>
            </div>
            <p className="mb-4 max-w-md text-sm leading-relaxed text-white/52">
              AI is writing the phishing emails. Cloning the voices. Faking the faces.
              We teach teens to fight back.
            </p>
            <div className="hero-stats">
              <span className="premium-chip premium-chip-danger">AI Scam Defense Platform</span>
              <span className="premium-chip">Built for teens</span>
            </div>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="mono-label mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-white/42">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/8 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/26">
            © 2025 Project Vigil. Built to protect the next generation from AI-powered fraud.
          </p>
          <p className="text-xs text-white/20">
            Not affiliated with any government agency.
          </p>
        </div>
      </div>
    </footer>
  );
}
