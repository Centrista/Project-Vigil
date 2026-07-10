"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  GUIDE_TREE,
  matchQuery,
  type GuideMatch,
  type GuideNode,
} from "@/lib/vigil-guide";

interface Turn {
  kind: "guide" | "user";
  text: string;
  node?: GuideNode;
  matches?: GuideMatch[];
}

const ROOT = GUIDE_TREE.root;

function guideTurn(node: GuideNode): Turn {
  return { kind: "guide", text: node.prompt, node };
}

export default function VigilGuide() {
  // Never render during SSR — the transcript is client state only.
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([guideTurn(ROOT)]);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close (and reset to root) when the user navigates somewhere.
  useEffect(() => {
    setOpen(false);
    setTurns([guideTurn(ROOT)]);
    setDraft("");
  }, [pathname]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [turns, open]);

  if (!mounted) return null;

  const current = turns[turns.length - 1];

  const pickChip = (label: string, nextId: string) => {
    const node = GUIDE_TREE[nextId];
    if (!node) return;
    setTurns((prev) => [...prev, { kind: "user", text: label }, guideTurn(node)]);
  };

  const submit = () => {
    const q = draft.trim();
    if (!q) return;
    setDraft("");
    const matches = matchQuery(q);
    const reply: Turn =
      matches.length > 0
        ? {
            kind: "guide",
            text: matches.length === 1 ? "This is the page you want:" : "Closest matches on the site:",
            matches,
          }
        : {
            kind: "guide",
            text: "I didn't catch that. I'm a simple guide, not an AI — here's what I can point you to:",
            node: ROOT,
          };
    setTurns((prev) => [...prev, { kind: "user", text: q }, reply]);
  };

  return (
    <div className="vg-root">
      {open ? (
        <div className="vg-panel premium-panel" role="dialog" aria-label="Vigil Guide">
          <div className="vg-head">
            <div>
              <span className="mono-label text-[10px] uppercase tracking-[0.22em] text-white/45">
                Not an AI · Scripted guide
              </span>
              <p className="vg-title">Vigil Guide</p>
            </div>
            <button
              type="button"
              className="vg-close"
              aria-label="Close guide"
              onClick={() => setOpen(false)}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="vg-scroll" ref={scrollRef}>
            {turns.map((turn, i) => (
              <div key={i} className={turn.kind === "user" ? "vg-msg vg-msg-user" : "vg-msg vg-msg-guide"}>
                <p>{turn.text}</p>
                {turn.matches ? (
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

            {current.node ? (
              <div className="vg-chips">
                {current.node.chips.map((chip) =>
                  chip.href ? (
                    <Link key={chip.label} href={chip.href} className="vg-chip">
                      {chip.label}
                    </Link>
                  ) : (
                    <button
                      key={chip.label}
                      type="button"
                      className="vg-chip"
                      onClick={() => pickChip(chip.label, chip.next!)}
                    >
                      {chip.label}
                    </button>
                  ),
                )}
                {current.node.id !== "root" ? (
                  <button
                    type="button"
                    className="vg-chip vg-chip-muted"
                    onClick={() => setTurns((prev) => [...prev, guideTurn(ROOT)])}
                  >
                    ← Start over
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>

          <form
            className="vg-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <input
              type="text"
              className="vg-input"
              placeholder="type a question…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={120}
            />
            <button type="submit" className="vg-send" aria-label="Send">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0-5 5m5-5H6" />
              </svg>
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          className="vg-fab"
          onClick={() => setOpen(true)}
          aria-label="Open Vigil Guide — where do I start?"
        >
          <span className="vg-fab-dot" aria-hidden="true" />
          Lost? Start here
        </button>
      )}
    </div>
  );
}
