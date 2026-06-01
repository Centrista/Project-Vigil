"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

interface PokedexLink {
  slug: string;
  label: string;
}

interface Scenario {
  emoji: string;
  title: string;
  subtitle: string;
  /** Bold lead line shown before the steps (used by the photo-threat callout). */
  lead?: string;
  steps: string[];
  links: PokedexLink[];
  /** Render as a distinct, calm callout rather than the standard accent card. */
  calm?: boolean;
  accent: string;
}

// Blocks + copy are taken word-for-word from the "Been Scammed?" help-page doc.
// Pokédex links map each block to the matching creature(s) that exist in the catalogue.
const SCENARIOS: Scenario[] = [
  {
    emoji: "🛒",
    title: "I paid for something fake, or it never arrived",
    subtitle:
      "Shopping deals, game top-ups, an “investment” or giveaway from an influencer or celebrity.",
    steps: [
      "Report the seller, listing or account to the platform (Carousell, Shopee, Instagram, the game).",
      "Ask your bank or card provider about reversing the payment — tell them it was a scam.",
      "Keep every receipt and order confirmation as evidence.",
    ],
    links: [
      { slug: "glaukult", label: "E-Commerce" },
      { slug: "fanir", label: "Gaming" },
      { slug: "akmon", label: "Deepfake Video" },
    ],
    accent: "#22c55e",
  },
  {
    emoji: "📱",
    title: "I clicked a link or typed in my login or card details",
    subtitle: "Phishing messages, fake login pages, dodgy QR codes.",
    steps: [
      "Change that password right now — and anywhere else you used the same one. Switch on 2FA.",
      "Watch for logins or transactions you didn’t make. If you entered card details, freeze the card.",
    ],
    links: [{ slug: "dolon", label: "AI Phishing" }],
    accent: "#00d4ff",
  },
  {
    emoji: "📲",
    title: "My account got hacked or taken over",
    subtitle: "Social media or gaming account hijacked.",
    steps: [
      "Use the platform’s “account recovery” / “my account was hacked” flow to get it back.",
      "Once you’re in, change the password and turn on 2FA.",
      "Warn your friends and followers it was hacked — so they don’t fall for messages “from you.”",
    ],
    links: [{ slug: "fanir", label: "Gaming" }],
    accent: "#f59e0b",
  },
  {
    emoji: "🔊",
    title: "A “family member or friend” urgently needed money",
    subtitle:
      "A call or video call from someone who isn’t really them — AI voice cloning or a deepfake.",
    steps: [
      "After the steps above, contact the real person on a number you already know, to check they’re actually okay.",
      "It was almost certainly a cloned voice or faked video. Warn your family, and agree on a “safe word” only you lot know for next time.",
    ],
    links: [
      { slug: "passal", label: "Deepfake Audio" },
      { slug: "akmon", label: "Deepfake Video" },
    ],
    accent: "#ff1744",
  },
  {
    emoji: "💸",
    title: "I moved money for a “job,” or let someone use my account",
    subtitle: "Fake job tasks, or being recruited as a money mule.",
    steps: [
      "Stop now. Don’t transfer anything else, no matter what they say.",
      "Report it to the police and your bank straight away. Coming forward early protects you — this is exactly what the police want to hear about.",
    ],
    links: [{ slug: "circe", label: "Job Scams" }],
    accent: "#ff6d00",
  },
  {
    emoji: "😨",
    title: "Someone’s threatening to share nude or private photos of me",
    subtitle: "Including fake or AI-generated ones.",
    lead: "This is a crime, and it’s being done to you. Don’t handle it alone.",
    steps: [
      "Don’t pay, and don’t send anything more. Paying almost never makes it stop — it usually makes it worse.",
      "Don’t delete the messages. Screenshot them as evidence, then stop replying.",
      "Tell a trusted adult — a parent, teacher or school counsellor. This feels impossible, but it’s the single most important step.",
      "Report it to the police (call 999 if you feel unsafe) and to the app it happened on.",
      "Get the images taken down: use Take It Down (takeitdown.ncmec.org) — a free, anonymous service for under-18s that removes nude or sexual images, real or AI-faked, from major platforms. Your photo never leaves your device.",
    ],
    links: [{ slug: "acteon", label: "Sextortion" }],
    calm: true,
    accent: "#60a5fa",
  },
];

const LINK_CLASS =
  "font-semibold text-white underline decoration-white/40 underline-offset-2 transition hover:decoration-white";

// Keep the copy verbatim but make key references actionable: tap-to-call numbers
// and real links for the police portal and Take It Down.
function linkify(text: string): ReactNode[] {
  const parts = text.split(/(takeitdown\.ncmec\.org|police\.gov\.sg|\b1799\b|\b999\b)/g);
  return parts.map((part, i) => {
    if (part === "takeitdown.ncmec.org")
      return (
        <a key={i} href="https://takeitdown.ncmec.org" target="_blank" rel="noreferrer" className={LINK_CLASS}>
          takeitdown.ncmec.org
        </a>
      );
    if (part === "police.gov.sg")
      return (
        <a key={i} href="https://www.police.gov.sg/iwitness" target="_blank" rel="noreferrer" className={LINK_CLASS}>
          police.gov.sg
        </a>
      );
    if (part === "1799")
      return (
        <a key={i} href="tel:1799" className={LINK_CLASS}>
          1799
        </a>
      );
    if (part === "999")
      return (
        <a key={i} href="tel:999" className={LINK_CLASS}>
          999
        </a>
      );
    return part;
  });
}

function ScenarioBlock({ scenario }: { scenario: Scenario }) {
  const [open, setOpen] = useState(false);
  const accent = scenario.accent;

  return (
    <motion.div
      className="overflow-hidden rounded-2xl border bg-black/20"
      animate={{
        borderColor: open ? `${accent}55` : `${accent}26`,
        boxShadow: open ? `0 16px 40px -22px ${accent}aa` : "0 0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: scenario.calm
          ? `linear-gradient(180deg, ${accent}14 0%, rgba(11,17,32,0.96) 60%)`
          : `linear-gradient(180deg, ${accent}0f 0%, rgba(11,17,32,0.96) 55%)`,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.025] sm:px-6"
      >
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl"
          style={{ background: `${accent}1f`, border: `1px solid ${accent}40` }}
          aria-hidden
        >
          {scenario.emoji}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-black leading-snug text-white sm:text-base">
            {scenario.title}
          </span>
          <span className="mt-0.5 block text-[13px] leading-snug text-white/50">
            {scenario.subtitle}
          </span>
        </span>
        <svg
          className="h-5 w-5 shrink-0 text-white/40 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "none", color: open ? accent : undefined }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 pt-1 sm:px-6 sm:pb-6">
          {scenario.lead && (
            <p className="mb-3 text-[15px] font-black leading-snug" style={{ color: accent }}>
              {scenario.lead}
            </p>
          )}
          <ol className="space-y-2.5">
            {scenario.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black"
                  style={{ background: `${accent}26`, color: accent }}
                >
                  {i + 1}
                </span>
                <span className="text-[14px] leading-relaxed text-white/80">{linkify(step)}</span>
              </li>
            ))}
          </ol>

          {scenario.links.length > 0 && (
            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                Learn how this one works
              </p>
              <div className="flex flex-wrap gap-2">
                {scenario.links.map((link) => (
                  <Link
                    key={link.slug}
                    href={`/pokedex/${link.slug}`}
                    className="premium-chip transition hover:bg-white/10"
                    style={{ borderColor: `${accent}40` }}
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
            </div>
          )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EmergencyScenarios() {
  return (
    <div className="space-y-3">
      {SCENARIOS.map((scenario) => (
        <ScenarioBlock key={scenario.title} scenario={scenario} />
      ))}
    </div>
  );
}
