import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="border-t border-white/10 mt-auto"
      style={{ backgroundColor: "#0a0e27" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-lg font-black tracking-widest uppercase" style={{ color: "#ff1744", letterSpacing: "0.12em" }}>
                PROJECT
              </span>
              <span className="text-lg font-black tracking-widest uppercase text-white" style={{ letterSpacing: "0.12em" }}>
                VIGIL
              </span>
            </div>
            <p className="text-sm text-white/45 leading-relaxed mb-3">
              AI is writing the phishing emails. Cloning the voices. Faking the faces.
              We teach teens to fight back.
            </p>
            <p className="text-xs text-white/25">
              AI Scam Defense Platform
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">
              Defend Yourself
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.slice(4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/submit-scam" className="text-sm font-semibold transition-colors" style={{ color: "#ff1744" }}>
                  + Submit a Scam
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/25">
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
