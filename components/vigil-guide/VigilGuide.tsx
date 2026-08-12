"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  buildReply,
  GUIDE_GREETING,
  GUIDE_STARTERS,
  type GuideMatch,
} from "@/lib/vigil-guide";

interface Turn {
  role: "guide" | "user";
  text: string;
  matches?: GuideMatch[];
}

export default function VigilGuide() {
  // Never render during SSR — the transcript is client state only.
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([{ role: "guide", text: GUIDE_GREETING }]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on navigation so the destination is visible; keep the transcript.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [turns, typing, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!mounted) return null;

  const send = (raw: string) => {
    const q = raw.trim();
    if (!q || typing) return;
    setDraft("");
    setTurns((prev) => [...prev, { role: "user", text: q }]);
    setTyping(true);
    // Deterministic reply; the short delay just gives the thread a chat rhythm.
    setTimeout(() => {
      const reply = buildReply(q);
      setTurns((prev) => [...prev, { role: "guide", text: reply.text, matches: reply.matches }]);
      setTyping(false);
    }, 500);
  };

  const showStarters = turns.length === 1;

  return (
    <>
      {!open ? (
        <button
          type="button"
          className="vg-fab"
          onClick={() => setOpen(true)}
          aria-label="Open the Vigil guide chat"
        >
          <svg className="h-4.5 w-4.5" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h8m-8 4h5m-9 7V6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H8l-4 4z"
            />
          </svg>
          Ask the guide
        </button>
      ) : null}

      <div className={`vg-sheet ${open ? "vg-sheet-open" : ""}`} role="dialog" aria-label="Vigil guide chat" aria-hidden={!open}>
        <div className="vg-head">
          <div>
            <span className="mono-label text-[10px] uppercase tracking-[0.22em] text-white/45">
              Not an AI · Keyword guide
            </span>
            <p className="vg-title">Vigil Guide</p>
          </div>
          <button type="button" className="vg-close" aria-label="Close chat" onClick={() => setOpen(false)}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="vg-scroll" ref={scrollRef}>
          {turns.map((turn, i) => (
            <div key={i} className={turn.role === "user" ? "vg-msg vg-msg-user" : "vg-msg vg-msg-guide"}>
              <p>{turn.text}</p>
              {turn.matches && turn.matches.length > 0 ? (
                <div className="vg-cards">
                  {turn.matches.map((m) => (
                    <Link key={m.href} href={m.href} className="vg-card">
                      <span className="vg-card-title">{m.title}</span>
                      <span className="vg-card-sub">{m.subtitle}</span>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}

          {typing ? (
            <div className="vg-msg vg-msg-guide vg-typing" aria-label="Guide is replying">
              <span />
              <span />
              <span />
            </div>
          ) : null}

          {showStarters && !typing ? (
            <div className="vg-starters">
              {GUIDE_STARTERS.map((s) => (
                <button key={s} type="button" className="vg-starter" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <form
          className="vg-input-row"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <input
            ref={inputRef}
            type="text"
            className="vg-input"
            placeholder="Describe what's going on…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={160}
          />
          <button type="submit" className="vg-send" aria-label="Send">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0-5 5m5-5H6" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
