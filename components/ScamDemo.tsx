"use client";

import { useState, useEffect, useRef } from "react";

const TRANSCRIPT =
  "Boys, can you send me $200? I'm in an accident and needed it for the treatment.";

const FLAGS = [
  {
    label: "Cloned Voice",
    detail: "AI-synthesized voice mimicking a known contact",
  },
  {
    label: "Emotional Manipulation",
    detail: "Accident / injury claim triggers panic response",
  },
  {
    label: "Urgency Injection",
    detail: "Pressure to bypass verification and act fast",
  },
  {
    label: "Immediate Money Demand",
    detail: "Classic social engineering pressure pattern",
  },
];

const NUM_BARS = 28;
const BAR_HEIGHTS = Array.from({ length: NUM_BARS }, (_, i) =>
  Math.round(22 + Math.abs(Math.sin(i * 0.72 + 0.3)) * 72),
);

export default function ScamDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const [voiceNoteVisible, setVoiceNoteVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [visibleFlags, setVisibleFlags] = useState(0);
  const [threatLevel, setThreatLevel] = useState(0);
  const [done, setDone] = useState(false);

  // Start when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.25 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  // Animation timeline
  useEffect(() => {
    if (!started) return;
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setVoiceNoteVisible(true), 500));
    t.push(setTimeout(() => setPlaying(true), 1200));
    t.push(setTimeout(() => setShowTranscript(true), 1700));
    t.push(setTimeout(() => setScanning(true), 5400));
    t.push(setTimeout(() => {
      setPlaying(false);
      setProgress(1);
    }, 5500));
    t.push(setTimeout(() => {
      setScanning(false);
      setVisibleFlags(1);
    }, 6100));
    t.push(setTimeout(() => setVisibleFlags(2), 6500));
    t.push(setTimeout(() => setVisibleFlags(3), 6900));
    t.push(setTimeout(() => setVisibleFlags(4), 7300));
    t.push(setTimeout(() => setThreatLevel(96), 7800));
    t.push(setTimeout(() => setDone(true), 8800));
    return () => t.forEach(clearTimeout);
  }, [started, replayKey]);

  // Smooth waveform progress while "playing"
  useEffect(() => {
    if (!playing) return;
    const start = Date.now();
    const duration = 4100;
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p >= 1) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [playing]);

  const replay = () => {
    setVoiceNoteVisible(false);
    setPlaying(false);
    setProgress(0);
    setShowTranscript(false);
    setScanning(false);
    setVisibleFlags(0);
    setThreatLevel(0);
    setDone(false);
    setReplayKey((k) => k + 1);
  };

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-14 items-center">

      {/* ── PHONE ── */}
      <div className="flex justify-center">
        <div
          className="w-full max-w-[288px] relative"
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
              <svg className="w-4 h-3" fill="currentColor" viewBox="0 0 20 14">
                <rect x="0" y="5" width="3" height="9" rx="1" opacity="0.9" />
                <rect x="4.5" y="3" width="3" height="11" rx="1" opacity="0.9" />
                <rect x="9" y="1" width="3" height="13" rx="1" opacity="0.9" />
                <rect x="13.5" y="0" width="3" height="14" rx="1" opacity="0.9" />
              </svg>
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
              D
            </div>
            <div>
              <div className="text-[15px] font-semibold text-white leading-tight">Dad</div>
              <div className="text-[11px] text-white/38 mt-0.5 mono-label">+1 (555) 847–2931</div>
            </div>
          </div>

          {/* Voice note */}
          <div className="px-4 pt-5 pb-3" style={{ minHeight: "270px" }}>
            <div className="text-center mb-4">
              <span className="text-[11px] text-white/25 mono-label">Today 9:41 AM</span>
            </div>

            {voiceNoteVisible && (
              <div className="msg-appear">
                {/* Voice-note bubble */}
                <div className="flex justify-start">
                  <div
                    className="max-w-[88%] w-full px-3 py-2.5 rounded-2xl rounded-tl-[5px]"
                    style={{ background: "#2c2c2e" }}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Play / pause button */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: playing
                            ? "linear-gradient(135deg, #ff1744, #ff4d6d)"
                            : "rgba(255,255,255,0.12)",
                          boxShadow: playing ? "0 0 18px rgba(255,23,68,0.55)" : "none",
                          transition: "all 0.25s ease",
                        }}
                      >
                        {playing ? (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                            <rect x="2" y="2" width="3" height="8" rx="0.6" />
                            <rect x="7" y="2" width="3" height="8" rx="0.6" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M3 2.2v7.6c0 .5.55.8.97.53l5.5-3.8a.65.65 0 000-1.06l-5.5-3.8A.65.65 0 003 2.2z" />
                          </svg>
                        )}
                      </div>

                      {/* Waveform */}
                      <div className="flex-1 h-7 flex items-center gap-[2px]">
                        {BAR_HEIGHTS.map((h, i) => {
                          const filled = (i + 1) / NUM_BARS <= progress;
                          return (
                            <div
                              key={i}
                              className="flex-1 rounded-full"
                              style={{
                                height: `${h}%`,
                                background: filled ? "#ff4d6d" : "rgba(255,255,255,0.28)",
                                transition: "background 0.18s ease",
                                animation: playing
                                  ? `waveBar ${0.42 + (i % 6) * 0.06}s ease-in-out ${(i % 5) * 0.06}s infinite alternate`
                                  : "none",
                              }}
                            />
                          );
                        })}
                      </div>

                      {/* Speed badge */}
                      <span
                        className="mono-label text-[10px] font-bold tabular-nums shrink-0 px-1.5 py-0.5 rounded"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          color: "rgba(255,255,255,0.55)",
                        }}
                      >
                        1.5×
                      </span>
                    </div>

                    {/* Transcript caption */}
                    {showTranscript && (
                      <p
                        className="mt-2.5 text-[13px] leading-snug text-white/90 px-1"
                        style={{ animation: "fade-up 0.4s ease both" }}
                      >
                        {TRANSCRIPT}
                      </p>
                    )}

                    <div className="flex items-center justify-end gap-1 mt-1.5">
                      <span className="text-[9px] text-white/35 tabular-nums mono-label">9:41 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
              analyzing voice...
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
                transition:
                  "opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)",
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
                This voice was AI-cloned from a few seconds of public audio
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
