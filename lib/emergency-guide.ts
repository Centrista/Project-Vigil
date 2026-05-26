// ─── EMERGENCY GUIDE ─────────────────────────────────────────────────────────
// Source of truth for the /emergency page. Built for 13–16 year olds in
// Singapore: a universal first-response triage, real verified SG hotlines, and
// hyper-specific "what to do right now" playbooks for every scam catalogued in
// the Pokédex (the 9 creatures, grouped into 8 playbooks).
//
// Hotlines verified May 2026: ScamShield 1799, Police 999 / 1800-255-0000,
// NAVH 1800-777-0000 (MSF), SOS 1767 + CareText 9151 1767, bank fraud lines.
// ─────────────────────────────────────────────────────────────────────────────

export interface TriageStep {
  title: string;
  body: string;
}

export interface Hotline {
  label: string;
  tone: "info" | "danger" | "warm" | "calm" | "success";
  blurb: string;
  numbers: { display: string; tel?: string }[];
}

export interface PlaybookCallout {
  tone: "warn" | "calm";
  title: string;
  body: string;
}

export interface Playbook {
  id: string;
  /** Pokédex slugs this playbook covers. */
  creatures: string[];
  title: string;
  /** The trigger — "use this if…". */
  when: string;
  accent: string;
  icon: string;
  steps: string[];
  callout?: PlaybookCallout;
}

// ── The first 5 minutes — works for ANY scam ────────────────────────────────
export const TRIAGE: TriageStep[] = [
  {
    title: "Stop. Cut contact.",
    body: "Don't reply, don't click, don't send one more thing. That pressure to act “right now” IS the scam. Slowing down is winning.",
  },
  {
    title: "Do not pay.",
    body: "If they swear paying makes it stop — that's the lie. Paying almost never ends it; it just marks you as someone who pays.",
  },
  {
    title: "Screenshot everything first.",
    body: "Before you block: capture the messages, username, profile, links and any payment details. That's your evidence — don't delete it.",
  },
  {
    title: "Money involved? Call your bank now.",
    body: "If you sent money or gave any card/banking details or an OTP, ring your bank's 24h fraud hotline immediately to freeze it (numbers below). Speed matters most here.",
  },
  {
    title: "Tell a trusted adult & report it.",
    body: "A parent, teacher, or older sibling. You are not in trouble — staying silent is the only thing that helps the scammer.",
  },
];

// ── Who to call — Singapore ──────────────────────────────────────────────────
export const HOTLINES: Hotline[] = [
  {
    label: "ScamShield Helpline",
    tone: "info",
    blurb: "24/7. Not sure if it's a scam, or just got hit? Start here — they can connect you straight to your bank.",
    numbers: [{ display: "1799", tel: "1799" }],
  },
  {
    label: "Police — emergency",
    tone: "danger",
    blurb: "If you feel unsafe right now, or someone is threatening you or your family.",
    numbers: [{ display: "999", tel: "999" }],
  },
  {
    label: "Police — report a scam",
    tone: "danger",
    blurb: "Non-emergency reports. You can also file online at police.gov.sg/iwitness.",
    numbers: [{ display: "1800-255-0000", tel: "1800255000" }],
  },
  {
    label: "Anti-Violence Helpline (NAVH)",
    tone: "warm",
    blurb: "24/7 for sextortion, leaked or faked intimate images, and online sexual harassment.",
    numbers: [{ display: "1800-777-0000", tel: "1800777000" }],
  },
  {
    label: "Samaritans of Singapore (SOS)",
    tone: "calm",
    blurb: "24/7 emotional support if it all feels like too much. Or text CareText on WhatsApp 9151 1767.",
    numbers: [
      { display: "1767", tel: "1767" },
      { display: "CareText · WhatsApp 9151 1767" },
    ],
  },
  {
    label: "Your bank — freeze the money",
    tone: "success",
    blurb: "Call the second money, cards or banking logins are involved. DBS users can also flip the Safety Switch inside the app.",
    numbers: [
      { display: "DBS / POSB · 1800 339 6963", tel: "18003396963" },
      { display: "OCBC · 6363 3333", tel: "63633333" },
      { display: "UOB · 6255 0160", tel: "62550160" },
    ],
  },
];

// ── Per-scam playbooks (cover all 9 Pokédex creatures) ───────────────────────
export const PLAYBOOKS: Playbook[] = [
  {
    id: "deepfake-call",
    creatures: ["passal", "akmon"],
    title: "A deepfake call — voice or video",
    when: "A “family member” or “boss” calls or video-calls in a panic, needing money or a transfer immediately.",
    accent: "#ff1744",
    icon: "🎙️",
    steps: [
      "Hang up. Do not act on anything said on that call — not a transfer, not a code, nothing.",
      "Call the real person back yourself on the number you already have saved — never a number the caller gives you. A 30-second callback breaks this scam every time.",
      "Can't reach them? Contact another family member who can physically check on them before you do anything.",
      "Lock in a family “safe word” now, so any future “emergency” call can be checked in one question.",
      "Report the number on the ScamShield Helpline (1799). If any money already moved, call your bank's fraud hotline first.",
    ],
    callout: {
      tone: "calm",
      title: "A real voice means nothing now",
      body: "AI can clone a voice or face from a few seconds of video online. Hearing “them” is no longer proof it's them. Verifying through a second channel is.",
    },
  },
  {
    id: "phishing",
    creatures: ["dolon"],
    title: "A phishing link, text or email",
    when: "A message about a prize, a fee, a “suspended account,” or a court/government threat pushes you to tap a link or enter details.",
    accent: "#00d4ff",
    icon: "🎣",
    steps: [
      "Did you enter card details, a banking login or an OTP? Call your bank's 24h fraud hotline NOW and freeze the account (DBS users: flip the Safety Switch in the app).",
      "Then change the password for any account you typed in, and turn on 2-factor authentication.",
      "Only clicked but typed nothing? Close it, change that account's password anyway, and don't enter anything.",
      "Check the real source by opening the official app or typing the real website yourself — never trust the link in the message.",
      "Report it: forward the scam to ScamShield (1799) and file at police.gov.sg/iwitness.",
    ],
  },
  {
    id: "sextortion",
    creatures: ["acteon"],
    title: "Sextortion — “pay or I'll post it”",
    when: "Someone threatens to share real or AI-faked intimate images of you unless you pay or send more.",
    accent: "#f43f5e",
    icon: "🔒",
    steps: [
      "STOP. Do not pay and do not send anything more. Paying never makes it stop — it tells them you'll pay again.",
      "Screenshot the threats, their username and profile first — then block them on every platform.",
      "Tell a trusted adult right now. This is not your fault, you are not in trouble, and silence is the only power this scam has.",
      "Report the account in-app (Instagram: profile → ⋯ → Report → “Pretending to be someone else”). Set your account to private and limit who can DM you.",
      "Call the Police (999 if you feel unsafe) and the Anti-Violence Helpline NAVH (1800-777-0000).",
      "Worried images could spread? Use NCMEC's free “Take It Down” tool (takeitdown.ncmec.org) to get images of under-18s removed.",
    ],
    callout: {
      tone: "calm",
      title: "Read this twice",
      body: "Reaching out for help is the bravest, smartest move here — not a weakness. If it feels like too much, call SOS on 1767 or text CareText on WhatsApp 9151 1767, any time, day or night.",
    },
  },
  {
    id: "gaming",
    creatures: ["fanir"],
    title: "A gaming scam — free skins, cheap currency, account “help”",
    when: "A “free reward,” trade, or “support agent” asks you to log in somewhere or hand over your account.",
    accent: "#f59e0b",
    icon: "🎮",
    steps: [
      "Stop the trade. Never share your password, login or 2FA code with anyone — not even “support.”",
      "Change your game password immediately and turn on 2-factor authentication.",
      "On Steam: revoke your API key (Account details → manage API key) and sign out of all other devices — that's how the trade-hijacking bots stay in control.",
      "Contact official support only through the game's own app or website — never a link someone messaged you.",
      "Report the fake site or handle in-platform. If you paid real money, call your bank — gaming companies usually can't recover funds.",
    ],
  },
  {
    id: "job-mule",
    creatures: ["circe"],
    title: "A job scam — and the money-mule trap",
    when: "An unsolicited “job” with great pay and no interview asks for a fee, your IC, or use of your bank account.",
    accent: "#ff6d00",
    icon: "💼",
    steps: [
      "Stop replying. Never pay for “training” or “equipment,” and never send your IC/NRIC, photos of your ID, or your banking login.",
      "Already let someone use your account or sent your bank details? Call your bank's fraud hotline now, then file a police report at police.gov.sg/iwitness. Being upfront protects you.",
      "Gave away ID photos? Tell your bank, watch for accounts opened in your name, and lodge a police report.",
      "Check any “employer” through their real official website, and report the scam to ScamShield (1799).",
    ],
    callout: {
      tone: "warn",
      title: "Never let anyone “use” your bank account",
      body: "Receiving money for a stranger makes YOU the money mule. The bank holds you responsible for it — like the 16-year-old in the Aurora case who ended up owing the money — and you can be charged. No “cut” is worth it.",
    },
  },
  {
    id: "ecommerce",
    creatures: ["glaukult"],
    title: "A fake seller / shopping scam",
    when: "A deal on Carousell, an IG/TikTok shop, or a Telegram group asks for a direct bank transfer for goods that never arrive.",
    accent: "#22c55e",
    icon: "🛒",
    steps: [
      "Stop any further payment. Screenshot the listing, the chat, the payment, and the seller's profile.",
      "Already paid by bank transfer? Call your bank's fraud hotline right away to try to recall or freeze it, then report to the Police.",
      "Report the seller and listing on the platform, and to ScamShield (1799).",
      "From now on: pay on delivery or use buyer-protected payment — never bank-transfer a stranger directly, no matter how good the deal.",
    ],
  },
  {
    id: "investment",
    creatures: ["ponsi"],
    title: "An investment or crypto scam",
    when: "An “amazing returns” app or “mentor” asks you to deposit more — or to pay a fee to “unlock” or withdraw your money.",
    accent: "#a855f7",
    icon: "📈",
    steps: [
      "Stop sending money immediately — including any fee to “release” your funds. That fee is part of the scam.",
      "Do not install any “support” or remote-access app they ask you to.",
      "Screenshot everything: the platform, the chat, transaction IDs and wallet addresses.",
      "Call your bank to stop or freeze transfers, then report to the Police and ScamShield (1799). Crypto is usually unrecoverable, so report fast.",
    ],
  },
  {
    id: "romance",
    creatures: ["peitho"],
    title: "A romance / pig-butchering scam",
    when: "An online partner you've never met in person starts asking for money — or steers you into an “investment.”",
    accent: "#ec4899",
    icon: "💔",
    steps: [
      "Stop sending money and stop any “investment” they introduced you to — that's where pig-butchering turns brutal.",
      "Screenshot the profile and chats, then reverse-image-search their photos (they're usually stolen).",
      "Block and report the profile in the app, and tell a trusted adult — this is engineered manipulation, not your failure.",
      "Sent money? Call your bank's fraud hotline and report to the Police + ScamShield (1799). For the emotional side, SOS is there 24/7 on 1767.",
    ],
  },
];
