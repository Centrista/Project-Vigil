"use client";

import { useState, useEffect, useRef } from "react";

const MESSAGES = [
  { id: 1, text: "Hey its mom. I need you to do something for me real quick" },
  { id: 2, text: "Im at the hospital and my phone died. Borrowed someone's phone. Can you send $200 on Venmo right now? Its an emergency" },
  { id: 3, text: "Dont call this number back just send it. Please hurry" },
];

const FLAGS = [
  {
    label: "Urgency Injection",
    detail: "Creates panic to bypass critical thinking",
  },
  {
    label: "Unverifiable Identity",
    detail: "Unknown number spoofed as a known contact",
  },
  {
    label: "Verification Block",
    detail: "'Don't call back' eliminates all identity checks",
  },
  {
    label: "Immediate Money Demand",
    detail: "Classic social engineering pressure pattern",
  },
];

export default function ScamDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const [visibleMsgs, setVisibleMsgs] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [visibleFlags, setVisibleFlags] = useState(0);
  const [threatLevel, setThreatLevel] = useState(0);
  const [done, setDone] = useState(false);

  // Start when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  // Animation timeline
  useEffect(() => {
    if (!started) return;
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setVisibleMsgs(1), 700));
    t.push(setTimeout(() => setShowTyping(true), 1600));
    t.push(setTimeout(() => { setShowTyping(false); setVisibleMsgs(2); }, 3100));
    t.push(setTimeout(() => setShowTyping(true), 3900));
    t.push(setTimeout(() => { setShowTyping(false); setVisibleMsgs(3); }, 5200));
    t.push(setTimeout(() => setScanning(true), 6000));
    t.push(setTimeout(() => { setScanning(false); setVisibleFlags(1); }, 6900));
    t.push(setTimeout(() => setVisibleFlags(2), 7350));
    t.push(setTimeout(() => setVisibleFlags(3), 7800));
    t.push(setTimeout(() => setVisibleFlags(4), 8250));
    t.push(setTimeout(() => setThreatLevel(94), 8900));
    t.push(setTimeout(() => setDone(true), 10200));
    return () => t.forEach(clearTimeout);
  }, [started, replayKey]);

  const replay = () => {
    setVisibleMsgs(0);
    setShowTyping(false);
    setScanning(false);
    setVisibleFlags(0);
    setThreatLevel(0);
    setDone(false);
    setReplayKey((k) => k + 1);
  };

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

      {/* ── PHONE ── */}
      <div className="flex justify-center">
        <div
          className="w-[288px] relative"
          style={{
            borderRadius: "44px",
            background: "#080808",
            border: "2px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(255,23,68,0.06)",
          }}
        >
          {/* Inner screen glow */}
          <div
            className="absolute inset-x-3 top-3 h-24 rounded-t-3xl pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
            }}
          />

          {/* Status bar */}
          <div className="flex items-center justify-between px-7 pt-5 pb-1">
            <span className="text-[12px] font-semibold text-white mono-label">9:41</span>
            <div className="flex gap-1.5 items-center text-white">
              {/* signal */}
              <svg className="w-4 h-3" fill="currentColor" viewBox="0 0 20 14">
                <rect x="0" y="5" width="3" height="9" rx="1" opacity="0.9" />
                <rect x="4.5" y="3" width="3" height="11" rx="1" opacity="0.9" />
                <rect x="9" y="1" width="3" height="13" rx="1" opacity="0.9" />
                <rect x="13.5" y="0" width="3" height="14" rx="1" opacity="0.9" />
              </svg>
              {/* battery */}
              <div className="flex items-center gap-px">
                <div className="w-6 h-3 rounded-sm border border-white/40 p-px">
                  <div className="h-full rounded-sm bg-white/80" style={{ width: "80%" }} />
                </div>
                <div className="w-0.5 h-1.5 rounded-r-sm bg-white/40" />
              </div>
            </div>
          </div>

          {/* Contact header */}
          <div
            className="flex items-center gap-3 px-5 py-3 mt-1"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                boxShadow: "0 2px 8px rgba(139,92,246,0.5)",
              }}
            >
              M
            </div>
            <div>
              <div className="text-[15px] font-semibold text-white leading-tight">Mom</div>
              <div className="text-[11px] text-white/38 mt-0.5 mono-label">+1 (555) 847–2931</div>
            </div>
          </div>

          {/* Messages */}
          <div className="px-4 pt-5 pb-3" style={{ minHeight: "270px" }}>
            <div className="text-center mb-4">
              <span
                className="text-[11px] text-white/25 mono-label"
              >
                Today 9:41 AM
              </span>
            </div>
            <div className="space-y-2.5">
              {visibleMsgs >= 1 && (
                <div className="flex justify-start msg-appear">
                  <div
                    className="max-w-[82%] px-3.5 py-2.5 rounded-2xl rounded-tl-[5px] text-[14px] leading-relaxed text-white"
                    style={{ background: "#2c2c2e" }}
                  >
                    {MESSAGES[0].text}
                  </div>
                </div>
              )}

              {showTyping && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl rounded-tl-[5px]" style={{ background: "#2c2c2e" }}>
                    <div className="flex gap-1.5 items-center h-4">
                      {[0, 160, 320].map((d) => (
                        <div
                          key={d}
                          className="w-2 h-2 rounded-full bg-white/45 animate-bounce"
                          style={{ animationDelay: `${d}ms`, animationDuration: "1s" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {visibleMsgs >= 2 && (
                <div className="flex justify-start msg-appear">
                  <div
                    className="max-w-[82%] px-3.5 py-2.5 rounded-2xl rounded-tl-[5px] text-[14px] leading-relaxed text-white"
                    style={{ background: "#2c2c2e" }}
                  >
                    {MESSAGES[1].text}
                  </div>
                </div>
              )}

              {visibleMsgs >= 3 && (
                <div className="flex justify-start msg-appear">
                  <div
                    className="max-w-[82%] px-3.5 py-2.5 rounded-2xl rounded-tl-[5px] text-[14px] leading-relaxed text-white"
                    style={{ background: "#2c2c2e" }}
                  >
                    {MESSAGES[2].text}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input bar */}
          <div className="px-4 pb-7 pt-2">
            <div
              className="flex items-center px-4 py-2.5 rounded-full"
              style={{
                background: "#1c1c1e",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span className="text-[13px] text-white/18 flex-1">iMessage</span>
              <div className="w-6 h-6 rounded-full bg-white/8 flex items-center justify-center">
                <svg className="w-3 h-3 text-white/20" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DETECTION PANEL ── */}
      <div>
        <div className="flex items-center gap-2.5 mb-6">
          <span className="mono-label text-xs font-bold uppercase tracking-widest" style={{ color: "#00d4ff" }}>
            ◈ AI Threat Scanner
          </span>
          {scanning && (
            <span className="mono-label text-xs text-white/35 animate-pulse">
              analyzing...
            </span>
          )}
        </div>

        <div className="space-y-2.5">
          {FLAGS.map((flag, i) => (
            <div
              key={flag.label}
              style={{
                opacity: visibleFlags > i ? 1 : 0,
                transform: visibleFlags > i ? "translateX(0)" : "translateX(14px)",
                transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                style={{
                  background: "rgba(255,23,68,0.05)",
                  border: "1px solid rgba(255,23,68,0.18)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: "#ff1744",
                    boxShadow: "0 0 6px rgba(255,23,68,0.9)",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white">{flag.label}</div>
                  <div className="text-xs text-white/38 mt-0.5">{flag.detail}</div>
                </div>
                <span
                  className="mono-label text-[11px] font-black shrink-0"
                  style={{ color: "#ff1744" }}
                >
                  DETECTED
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Threat level bar */}
        <div
          className="mt-4 rounded-xl overflow-hidden"
          style={{
            opacity: visibleFlags >= 4 ? 1 : 0,
            transition: "opacity 0.5s ease 0.2s",
            background: "rgba(255,23,68,0.05)",
            border: "1px solid rgba(255,23,68,0.2)",
          }}
        >
          <div className="px-5 py-4">
            <div className="flex justify-between items-baseline mb-3">
              <span className="mono-label text-[11px] font-bold uppercase tracking-widest text-white/40">
                AI Threat Confidence
              </span>
              <span className="mono-label text-xl font-black tabular-nums" style={{ color: "#ff1744" }}>
                {threatLevel}%
              </span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div
                className="h-1.5 rounded-full threat-bar-fill"
                style={{
                  width: `${threatLevel}%`,
                  background: "linear-gradient(90deg, #ff1744, #ff4d6d)",
                }}
              />
            </div>
            {done && (
              <p className="mono-label text-[11px] mt-3.5 text-white/30">
                This message was AI-generated in approximately 0.3 seconds
              </p>
            )}
          </div>
        </div>

        {done && (
          <button
            onClick={replay}
            className="mono-label mt-4 text-xs text-white/28 hover:text-white/55 transition-colors flex items-center gap-1.5"
          >
            ↺ replay demo
          </button>
        )}
      </div>
    </div>
  );
}
