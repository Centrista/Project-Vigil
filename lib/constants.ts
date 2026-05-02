export const COLORS = {
  navy: "#0a0e27",
  card: "#1a1f2e",
  red: "#ff1744",
  cyan: "#00d4ff",
  white: "#ffffff",
} as const;

export const NAV_LINKS = [
  { label: "Risk Quiz", href: "/risk-quiz" },
  { label: "Guide", href: "/guide" },
  { label: "Simulator", href: "/simulator" },
  { label: "Stories", href: "/stories" },
  { label: "Scam Pokédex", href: "/pokedex" },
  { label: "Emergency", href: "/emergency" },
  { label: "Alerts", href: "/alerts" },
  { label: "Feedback", href: "/feedback" },
] as const;

export const SCAM_TYPES = [
  {
    id: "voice-cloning",
    title: "AI Voice Cloning",
    icon: "🎙️",
    description:
      "Scammers clone a family member's voice in under 30 seconds using a public video or voicemail, then call you pretending it's them in an emergency.",
    warning:
      "Hang up and call the person back on a number you already know. AI can clone tone, accent, and emotion — don't trust a voice alone.",
    riskLevel: "High",
  },
  {
    id: "deepfake-video",
    title: "Deepfake Video Call",
    icon: "🎭",
    description:
      "Live AI-generated video of a boss, celebrity, or government official. Used in fake job interviews, investment pitches, and extortion attempts.",
    warning:
      "Ask something only the real person would know. Deepfakes struggle with fast movement — ask them to wave or touch their face.",
    riskLevel: "High",
  },
  {
    id: "ai-phishing",
    title: "AI Phishing",
    icon: "📧",
    description:
      "Emails and DMs written by AI using your real name, school, location, and interests scraped from social media. No typos. No generic greetings. Completely convincing.",
    warning:
      "The old tell of bad grammar is gone. Hover over links before clicking. Go directly to sites instead of clicking email links.",
    riskLevel: "High",
  },
  {
    id: "romance-bot",
    title: "AI Romance Bot",
    icon: "💔",
    description:
      "AI chatbots trained to build emotional connections over days or weeks on dating apps and social media, then pivot to asking for money, gift cards, or personal info.",
    warning:
      "Ask for a spontaneous, unscripted live video call. AI bots can't do that — they'll always make an excuse.",
    riskLevel: "High",
  },
  {
    id: "synthetic-identity",
    title: "Synthetic Fake Profile",
    icon: "🖼️",
    description:
      "AI-generated profile photos, bios, and posting histories used to create fake social media identities at scale. Used to build trust before scamming.",
    warning:
      "Right-click profile pictures and reverse image search them. AI face generators leave subtle artifacts — look for unnatural ears, hair edges, or backgrounds.",
    riskLevel: "Medium",
  },
  {
    id: "ai-job-scam",
    title: "AI Interview Scam",
    icon: "💼",
    description:
      "Fake job listings where an AI \"interviewer\" conducts the entire hiring process and collects your SSN, bank info, and ID as part of fake onboarding.",
    warning:
      "Real employers never ask for banking info before your first day. Verify any job offer by calling the company's official number.",
    riskLevel: "High",
  },
  {
    id: "robocall-ai",
    title: "AI Robocall",
    icon: "📞",
    description:
      "Hyper-realistic AI phone calls impersonating your bank, the IRS, or tech support — with natural-sounding speech, hold music, and fake case numbers.",
    warning:
      "Hang up and call back on the number on your card or the official website. Real institutions never demand immediate payment over phone.",
    riskLevel: "Medium",
  },
  {
    id: "deepfake-id",
    title: "Deepfake ID Bypass",
    icon: "🆔",
    description:
      "AI-generated fake IDs and selfies that fool identity verification (KYC) systems, used to open bank accounts, loans, or crypto wallets in your name.",
    warning:
      "Monitor your credit regularly. Freeze your credit if your ID info has been exposed in a data breach.",
    riskLevel: "High",
  },
] as const;

export const RISK_PROFILES = [
  {
    level: "Easy Target",
    emoji: "🎯",
    range: "0–40",
    color: "#ff1744",
    desc: "An AI-cloned voice, a deepfake video call, a perfectly written phishing email — any of these would fool you right now.",
  },
  {
    level: "Cautious Clicker",
    emoji: "👀",
    range: "41–70",
    color: "#ffa700",
    desc: "You'd catch the old-school scams, but AI-generated ones still have you. A few upgrades and you're dangerous.",
  },
  {
    level: "Digital Defender",
    emoji: "🛡️",
    range: "71–100",
    color: "#00d4ff",
    desc: "You understand how AI is being weaponized against real people. Most haven't caught up to where you are.",
  },
] as const;
