"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS, PRIMARY_NAV_LINKS } from "@/lib/constants";

const PRIMARY_LINKS = NAV_LINKS.filter((link) =>
  PRIMARY_NAV_LINKS.includes(link.href as (typeof PRIMARY_NAV_LINKS)[number]),
);

const SECONDARY_LINKS = NAV_LINKS.filter(
  (link) => !PRIMARY_NAV_LINKS.includes(link.href as (typeof PRIMARY_NAV_LINKS)[number]),
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300">
      <div
        className="nav-shell transition-all duration-300"
        style={{
          boxShadow: scrolled ? "0 14px 40px rgba(0,0,0,0.28)" : "none",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[76px] items-center justify-between gap-4 py-3">
            <Link href="/" className="group flex shrink-0 items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-sm font-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                style={{ letterSpacing: "0.12em" }}
              >
                PV
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-black uppercase tracking-[0.22em] text-white transition-opacity duration-200 group-hover:opacity-90">
                    Project Vigil
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff1744]" />
                </div>
                <p className="mono-label text-[10px] uppercase tracking-[0.22em] text-white/35">
                  AI Scam Defense
                </p>
              </div>
            </Link>

            <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] p-1.5">
              {PRIMARY_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link whitespace-nowrap ${isActive ? "nav-link-active" : ""}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                href="/trending-scams"
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] ${
                  pathname === "/trending-scams"
                    ? "border-[#ff1744]/25 bg-[#ff1744]/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/18 hover:text-white"
                }`}
              >
                Live Threats
              </Link>
              <Link href="/submit-scam" className="btn-red px-4 py-2 text-sm rounded-xl">
                + Submit a Scam
              </Link>
            </div>

            <div className="flex xl:hidden items-center gap-2">
              <Link href="/submit-scam" className="btn-red px-3 py-2 text-xs rounded-xl">
                + Submit
              </Link>
              <button
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 text-white/70 transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                onClick={() => setMenuOpen((open) => !open)}
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
      </div>

      {menuOpen && (
        <div
          className="xl:hidden border-t border-white/8 px-4 pb-5 pt-4"
          style={{ backgroundColor: "rgba(9,16,33,0.96)", backdropFilter: "blur(18px)" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 px-1">
              <p className="mono-label text-[11px] uppercase tracking-[0.22em] text-white/28">
                Primary Routes
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {PRIMARY_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-2xl border p-4 transition-all ${
                      isActive
                        ? "border-[#ff1744]/24 bg-[#ff1744]/10"
                        : "border-white/8 bg-white/[0.03] hover:border-white/18 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="text-sm font-semibold text-white">{link.label}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/42">
                      {link.description}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mb-4 mt-5 px-1">
              <p className="mono-label text-[11px] uppercase tracking-[0.22em] text-white/28">
                More Tools
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {SECONDARY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/62 transition-all hover:border-white/18 hover:bg-white/[0.05] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
