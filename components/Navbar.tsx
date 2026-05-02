"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(10,14,39,0.92)" : "#0a0e27",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
            <span
              className="text-xl font-black tracking-widest uppercase transition-all duration-200 group-hover:opacity-90"
              style={{ color: "#ff1744", letterSpacing: "0.12em" }}
            >
              PROJECT
            </span>
            <span
              className="text-xl font-black tracking-widest uppercase text-white transition-all duration-200 group-hover:opacity-90"
              style={{ letterSpacing: "0.12em" }}
            >
              VIGIL
            </span>
            <span
              className="ml-1 w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#ff1744" }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-all duration-150 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Submit Scam CTA */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link
              href="/submit-scam"
              className="btn-red px-4 py-2 text-sm rounded-lg"
            >
              + Submit a Scam
            </Link>
          </div>

          {/* Mobile right side */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/submit-scam"
              className="btn-red px-3 py-1.5 text-xs rounded-lg"
            >
              + Submit
            </Link>
            <button
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden border-t border-white/8 px-4 pb-5 pt-3"
          style={{ backgroundColor: "rgba(10,14,39,0.98)", backdropFilter: "blur(20px)" }}
        >
          <div className="grid grid-cols-2 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
