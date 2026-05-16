"use client";

import type { CSSProperties } from "react";
import type { InboxMessage, InboxScenario, Platform } from "@/lib/scam-battle-engine";

// ---------------- Avatar ----------------

function Avatar({
  seed,
  color,
  size = 36,
}: {
  seed?: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{
        width: size,
        height: size,
        background: color ?? "#475569",
        fontSize: size * 0.42,
      }}
    >
      {(seed ?? "?").slice(0, 1).toUpperCase()}
    </div>
  );
}

// ---------------- Message bubbles ----------------

function VoiceBubble({
  durationSec = 0,
  transcript,
  variant,
}: {
  durationSec?: number;
  transcript?: string;
  variant: "incoming" | "outgoing";
}) {
  const isIncoming = variant === "incoming";
  return (
    <div
      className={`flex max-w-[88%] flex-col gap-1 rounded-2xl px-3 py-2.5 ${
        isIncoming
          ? "rounded-tl-md bg-white/[0.08] text-white"
          : "ml-auto rounded-tr-md bg-emerald-600/30 text-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
          <span className="text-[10px]">▶</span>
        </div>
        <div className="flex flex-1 items-center gap-1">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="block w-[2px] rounded-full bg-white/40"
              style={{ height: 3 + ((i * 7) % 12) }}
            />
          ))}
        </div>
        <span className="mono-label text-[10px] text-white/60">
          {Math.floor(durationSec / 60)}:{String(durationSec % 60).padStart(2, "0")}
        </span>
      </div>
      {transcript ? (
        <p className="mt-1 border-t border-white/10 pt-2 text-[11px] leading-relaxed text-white/65">
          <span className="mono-label mr-2 text-[9px] text-white/40">TRANSCRIPT</span>
          {transcript}
        </p>
      ) : null}
    </div>
  );
}

function LinkCard({
  displayText,
  outgoing,
}: {
  displayText: string;
  outgoing?: boolean;
}) {
  return (
    <div
      className={`mt-2 flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 ${
        outgoing ? "bg-emerald-600/20" : "bg-white/[0.04]"
      }`}
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-[12px]">
        🔗
      </div>
      <span className="break-all text-[11px] font-medium text-cyan-300 underline">
        {displayText}
      </span>
    </div>
  );
}

function AttachmentBox({ label }: { label: string }) {
  return (
    <div className="mt-1 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-[12px]">
        🖼
      </div>
      <span className="text-[11px] text-white/60">{label}</span>
    </div>
  );
}

function TextBubble({
  msg,
  variant,
  accent,
}: {
  msg: InboxMessage;
  variant: "incoming" | "outgoing";
  accent: string;
}) {
  if (msg.isVoiceNote) {
    return (
      <VoiceBubble
        durationSec={msg.voiceDurationSec}
        transcript={msg.voiceTranscript}
        variant={variant}
      />
    );
  }
  const isIncoming = variant === "incoming";
  return (
    <div
      className={`max-w-[88%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
        isIncoming
          ? "rounded-tl-md bg-white/[0.08] text-white"
          : "ml-auto rounded-tr-md text-white"
      }`}
      style={!isIncoming ? { background: accent } : undefined}
    >
      <p className="whitespace-pre-wrap">{msg.body}</p>
      {msg.link ? <LinkCard displayText={msg.link.displayText} outgoing={!isIncoming} /> : null}
      {msg.attachmentLabel ? <AttachmentBox label={msg.attachmentLabel} /> : null}
    </div>
  );
}

// ---------------- Platform shells ----------------

const PLATFORM_THEME: Record<
  Platform,
  { headerBg: string; headerAccent: string; bubbleAccent: string; label: string; surface: string }
> = {
  whatsapp: {
    headerBg: "linear-gradient(180deg, #075e54 0%, #054b43 100%)",
    headerAccent: "#25d366",
    bubbleAccent: "#005c4b",
    label: "WhatsApp",
    surface: "#0b1419",
  },
  instagram: {
    headerBg: "linear-gradient(180deg, #1a0d24 0%, #0a0410 100%)",
    headerAccent: "#e1306c",
    bubbleAccent: "#3897f0",
    label: "Instagram DM",
    surface: "#0a0410",
  },
  sms: {
    headerBg: "linear-gradient(180deg, #1c2733 0%, #0e1620 100%)",
    headerAccent: "#3b82f6",
    bubbleAccent: "#1f6feb",
    label: "Messages (SMS)",
    surface: "#0e1620",
  },
  gmail: {
    headerBg: "linear-gradient(180deg, #1f1f1f 0%, #121212 100%)",
    headerAccent: "#ea4335",
    bubbleAccent: "#1a73e8",
    label: "Gmail",
    surface: "#121212",
  },
  carousell: {
    headerBg: "linear-gradient(180deg, #ff5b32 0%, #d94720 100%)",
    headerAccent: "#ffffff",
    bubbleAccent: "#1f2937",
    label: "Carousell",
    surface: "#0f172a",
  },
  telegram: {
    headerBg: "linear-gradient(180deg, #2aabee 0%, #1e7fb8 100%)",
    headerAccent: "#ffffff",
    bubbleAccent: "#2aabee",
    label: "Telegram",
    surface: "#0e1a26",
  },
};

function ShellHeader({
  platform,
  scenario,
}: {
  platform: Platform;
  scenario: InboxScenario;
}) {
  const theme = PLATFORM_THEME[platform];
  const subtitle =
    scenario.sender.subtitleHint ??
    scenario.sender.phone ??
    scenario.sender.email ??
    scenario.sender.handle;

  return (
    <div
      className="flex items-center gap-3 px-4 py-3"
      style={{ background: theme.headerBg }}
    >
      <Avatar
        seed={scenario.sender.avatarSeed ?? scenario.sender.name}
        color={scenario.sender.avatarColor}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-[13px] font-semibold text-white">
            {scenario.sender.name}
          </span>
          {scenario.sender.verified ? (
            <span className="text-[10px] text-sky-400">✓</span>
          ) : null}
        </div>
        {subtitle ? (
          <p className="truncate text-[10px] text-white/60">{subtitle}</p>
        ) : null}
      </div>
      <span
        className="mono-label rounded-full px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-white/80"
        style={{ background: "rgba(255,255,255,0.10)" }}
      >
        {theme.label}
      </span>
    </div>
  );
}

function MessageList({
  scenario,
  accent,
}: {
  scenario: InboxScenario;
  accent: string;
}) {
  return (
    <div className="flex flex-col gap-2 px-4 py-4">
      {scenario.subjectLine ? (
        <div className="mb-2 border-b border-white/10 pb-2">
          <p className="mono-label text-[10px] text-white/40">SUBJECT</p>
          <p className="text-[13px] font-semibold text-white">{scenario.subjectLine}</p>
        </div>
      ) : null}
      {scenario.messages.map((m, idx) => (
        <TextBubble
          key={idx}
          msg={m}
          variant={m.isOutgoing ? "outgoing" : "incoming"}
          accent={accent}
        />
      ))}
      <div className="mt-1 flex justify-end">
        <span className="mono-label text-[9px] uppercase tracking-[0.18em] text-white/35">
          {scenario.timestamp}
        </span>
      </div>
    </div>
  );
}

// ---------------- ScenarioCard ----------------

export default function ScenarioCard({ scenario }: { scenario: InboxScenario }) {
  const theme = PLATFORM_THEME[scenario.platform];
  return (
    <div
      className="overflow-hidden rounded-[24px] border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
      style={
        {
          background: theme.surface,
          "--shell-accent": theme.headerAccent,
        } as CSSProperties
      }
    >
      <ShellHeader platform={scenario.platform} scenario={scenario} />
      <MessageList scenario={scenario} accent={theme.bubbleAccent} />
    </div>
  );
}
