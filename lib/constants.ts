import { POKEDEX_ENTRY_COUNT } from "@/lib/pokedex";

export const COLORS = {
  navy: "#0a0e27",
  card: "#1a1f2e",
  red: "#ff1744",
  cyan: "#00d4ff",
  orange: "#ff6d00",
  green: "#22c55e",
  white: "#ffffff",
} as const;

export const NAV_LINKS = [
  { label: "Pre & Post Quiz", href: "/risk-quiz", description: "Complete the quiz flow.", tone: COLORS.red },
  { label: "Scam Pokédex", href: "/pokedex", description: "Browse the threat catalogue.", tone: "#8b5cf6" },
  { label: "Scam Battle", href: "/scam-battle", description: "Spot the scam, battle the Pokémon.", tone: "#ff1744" },
  { label: "Trending", href: "/trending-scams", description: "Track active scam patterns.", tone: COLORS.red },
  { label: "Guide", href: "/guide", description: "Educational Guide.", tone: COLORS.cyan },
  { label: "Stories", href: "/stories", description: "Read real teen experiences.", tone: "#f59e0b" },
  { label: "Emergency", href: "/emergency", description: "What to do right now.", tone: COLORS.orange },
  { label: "Deepfake Tester", href: "/simulator", description: "Practice spotting AI fakes.", tone: COLORS.cyan },
  { label: "Feedback", href: "/feedback", description: "Send product feedback.", tone: "rgba(255,255,255,0.75)" },
] as const;

export const PRIMARY_NAV_LINKS = [
  "/risk-quiz",
  "/pokedex",
  "/scam-battle",
  "/trending-scams",
  "/guide",
  "/stories",
  "/emergency",
  "/simulator",
] as const;

export const FOOTER_GROUPS = [
  {
    title: "Learn",
    links: [
      { label: "Trending Scams", href: "/trending-scams" },
      { label: "Deepfake Tester", href: "/simulator" },
      { label: "Scam Pokédex", href: "/pokedex" },
    ],
  },
  {
    title: "Practice",
    links: [
      { label: "Scam Battle", href: "/scam-battle" },
      { label: "Pre Quiz", href: "/risk-quiz" },
      { label: "Post Quiz", href: "/risk-quiz/post-quiz" },
      { label: "Real Stories", href: "/stories" },
    ],
  },
  {
    title: "Act",
    links: [
      { label: "Emergency Guide", href: "/emergency" },
      { label: "Feedback", href: "/feedback" },
    ],
  },
] as const;

export const HOME_DESTINATIONS = [
  {
    n: "01",
    label: "Trending Scams",
    sub: "See the scams rising right now and what makes them dangerous.",
    href: "/trending-scams",
    accent: COLORS.red,
  },
  {
    n: "02",
    label: "Scam Pokédex",
    sub: `Catalogue of ${POKEDEX_ENTRY_COUNT} creatures, each one a scam pattern targeting teens right now.`,
    href: "/pokedex",
    accent: COLORS.cyan,
  },
  {
    n: "03",
    label: "AI Risk Quiz",
    sub: "Discover exactly where your instincts are strong and where they fail.",
    href: "/risk-quiz",
    accent: COLORS.red,
  },
  {
    n: "04",
    label: "Real Stories",
    sub: "Read what happened to other teens before the same tactics hit you.",
    href: "/stories",
    accent: COLORS.cyan,
  },
  {
    n: "05",
    label: "Educational Guide",
    sub: "Understand how each scam actually works, step by step.",
    href: "/guide",
    accent: COLORS.cyan,
  },
  {
    n: "06",
    label: "Emergency Guide",
    sub: "Move fast when something feels off and lock down the damage early.",
    href: "/emergency",
    accent: "#f59e0b",
  },
  {
    n: "07",
    label: "Deepfake Tester",
    sub: "Ten photos. Half are AI. Find out how good you really are.",
    href: "/simulator",
    accent: COLORS.red,
  },
  {
    n: "08",
    label: "Scam Battle",
    sub: "Survive a scam inbox — spot it, then battle the creature behind it.",
    href: "/scam-battle",
    accent: COLORS.red,
  },
] as const;

/**
 * The suggested order through the site — rendered as numbered steps in the
 * mobile menu and surfaced by the Vigil Guide widget's "Where do I start?".
 * Purely presentational; PRIMARY_NAV_LINKS stays the nav's source of truth.
 */
export const LEARNING_PATH = [
  { step: 1, href: "/trending-scams", label: "Trending Scams", why: "See what's attacking teens right now." },
  { step: 2, href: "/pokedex", label: "Scam Pokédex", why: "Meet the creature behind each scam pattern." },
  { step: 3, href: "/guide", label: "Educational Guide", why: "Learn how each one actually works." },
  { step: 4, href: "/simulator", label: "Deepfake Tester", why: "Test your eye against AI-generated faces." },
  { step: 5, href: "/scam-battle", label: "Scam Battle", why: "Survive a scam inbox, one verdict at a time." },
  { step: 6, href: "/risk-quiz", label: "Pre & Post Quiz", why: "Measure what you've actually learned." },
  { step: 7, href: "/stories", label: "Real Stories", why: "Read what happened when people missed the signs." },
  { step: 8, href: "/emergency", label: "Emergency", why: "Know the moves before you ever need them." },
] as const;

export const SCAM_TYPES = [
  {
    id: "voice-cloning",
    title: "AI Voice Cloning",
    description:
      "Scammers clone a family member's voice in under 30 seconds using a public video or voicemail, then call you pretending it's them in an emergency.",
    warning:
      "Hang up and call the person back on a number you already know. AI can clone tone, accent, and emotion — don't trust a voice alone.",
    riskLevel: "High",
  },
  {
    id: "deepfake-video",
    title: "Deepfake Video Call",
    description:
      "Live AI-generated video of a boss, celebrity, or government official. Used in fake job interviews, investment pitches, and extortion attempts.",
    warning:
      "Ask something only the real person would know. Deepfakes struggle with fast movement — ask them to wave or touch their face.",
    riskLevel: "High",
  },
  {
    id: "ai-phishing",
    title: "AI Phishing",
    description:
      "Emails and DMs written by AI using your real name, school, location, and interests scraped from social media. No typos. No generic greetings. Completely convincing.",
    warning:
      "The old tell of bad grammar is gone. Hover over links before clicking. Go directly to sites instead of clicking email links.",
    riskLevel: "High",
  },
  {
    id: "romance-bot",
    title: "AI Romance Bot",
    description:
      "AI chatbots trained to build emotional connections over days or weeks on dating apps and social media, then pivot to asking for money, gift cards, or personal info.",
    warning:
      "Ask for a spontaneous, unscripted live video call. AI bots can't do that — they'll always make an excuse.",
    riskLevel: "High",
  },
  {
    id: "synthetic-identity",
    title: "Synthetic Fake Profile",
    description:
      "AI-generated profile photos, bios, and posting histories used to create fake social media identities at scale. Used to build trust before scamming.",
    warning:
      "Right-click profile pictures and reverse image search them. AI face generators leave subtle artifacts — look for unnatural ears, hair edges, or backgrounds.",
    riskLevel: "Medium",
  },
  {
    id: "ai-job-scam",
    title: "AI Interview Scam",
    description:
      "Fake job listings where an AI \"interviewer\" conducts the entire hiring process and collects your SSN, bank info, and ID as part of fake onboarding.",
    warning:
      "Real employers never ask for banking info before your first day. Verify any job offer by calling the company's official number.",
    riskLevel: "High",
  },
  {
    id: "robocall-ai",
    title: "AI Robocall",
    description:
      "Hyper-realistic AI phone calls impersonating your bank, the IRS, or tech support — with natural-sounding speech, hold music, and fake case numbers.",
    warning:
      "Hang up and call back on the number on your card or the official website. Real institutions never demand immediate payment over phone.",
    riskLevel: "Medium",
  },
  {
    id: "deepfake-id",
    title: "Deepfake ID Bypass",
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
    range: "0–40",
    color: "#ff1744",
    desc: "An AI-cloned voice, a deepfake video call, a perfectly written phishing email — any of these would fool you right now.",
  },
  {
    level: "Cautious Clicker",
    range: "41–70",
    color: "#ffa700",
    desc: "You'd catch the old-school scams, but AI-generated ones still have you. A few upgrades and you're dangerous.",
  },
  {
    level: "Digital Defender",
    range: "71–100",
    color: "#00d4ff",
    desc: "You understand how AI is being weaponized against real people. Most haven't caught up to where you are.",
  },
] as const;
