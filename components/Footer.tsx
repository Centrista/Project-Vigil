import Link from "next/link";
import { FOOTER_GROUPS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="mt-auto border-t border-white/10"
      style={{ backgroundColor: "rgba(12,22,40,0.94)" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
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
              <span className="premium-chip premium-chip-purple">Built for teens</span>
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
            © 2026 Project Vigil. Built to protect the next generation from AI-powered fraud.
          </p>
          <p className="text-xs text-white/20">
            Not affiliated with any government agency.
          </p>
        </div>
      </div>
    </footer>
  );
}
