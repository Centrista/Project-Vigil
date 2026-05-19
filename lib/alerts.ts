export interface Alert {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  severity: "critical" | "high" | "medium";
  weekOf: string;
  learnMoreHref: string;
}

// Add new alerts here — newest first.
// Example entry:
// {
//   id: "may-2026-gaming-refund",
//   title: "Fake Game Refund Texts Surge on Roblox",
//   description: "A new wave of SMS messages impersonating Roblox Support is offering fake refunds to collect login credentials.",
//   category: "Gaming Scams",
//   categoryColor: "#00c853",
//   severity: "high",
//   weekOf: "Week of May 5, 2026",
//   learnMoreHref: "/scam-battle",
// },

export const ALERTS: Alert[] = [
  {
    id: "may-2026-ai-sextortion-nudify",
    title: "AI Sextortion Surge — Nudify Apps Targeting Teens",
    description: "AI 'nudifier' apps are turning innocent photos from Instagram and Snapchat into fake explicit images. Attackers then message teens demanding money or real images under threat of sharing the fake content. Risk of sextortion in the U.S. rose 137% in 2025 — boys aged 14–17 are the most targeted group. Never pay. Screenshot evidence and report to the NCMEC CyberTipline immediately.",
    category: "AI Sextortion",
    categoryColor: "#ff1744",
    severity: "critical",
    weekOf: "Week of May 5, 2026",
    learnMoreHref: "/scam-battle",
  },
  {
    id: "apr-2026-pig-butchering-romance-bots",
    title: "Pig Butchering Romance Bots Flooding Dating Apps",
    description: "AI chatbots trained to simulate romantic partners are operating at scale on Tinder, Instagram DMs, and WhatsApp. After weeks of emotional grooming they steer victims toward a fake crypto investment platform. Americans lost $11.37 billion to this scam in 2025. Red flag: they always have an excuse to avoid a live unscripted video call — because they can't do one.",
    category: "Romance Bot Scam",
    categoryColor: "#a855f7",
    severity: "critical",
    weekOf: "Week of Apr 28, 2026",
    learnMoreHref: "/scam-battle",
  },
  {
    id: "apr-2026-fake-job-graduation",
    title: "AI Fake Job Listings Spiking — Graduation Season",
    description: "AI-generated recruiter profiles and job listings are surging on LinkedIn and Indeed, targeting new graduates. Fake 'onboarding' flows collect your SSN, bank details, and ID for identity theft. FTC received 105,000 job scam reports in 2024 — losses jumped from $90M to $513M. Always verify any job offer by calling the company's official listed number before submitting any personal documents.",
    category: "AI Job Scam",
    categoryColor: "#ff6d00",
    severity: "high",
    weekOf: "Week of Apr 21, 2026",
    learnMoreHref: "/scam-battle",
  },
  {
    id: "apr-2026-celebrity-deepfake-crypto",
    title: "Celebrity Deepfake Crypto Ads Resurging on Social Media",
    description: "AI-generated videos of Elon Musk, Taylor Swift, and MrBeast are running as paid ads on YouTube and Instagram promoting fake crypto giveaways and investment platforms. The Nomani investment scam using deepfake celebrity video surged 62% in 2025. Humans correctly identify high-quality deepfakes only 24.5% of the time — if a celebrity is offering free money online, it is fake.",
    category: "Deepfake Crypto Scam",
    categoryColor: "#00d4ff",
    severity: "high",
    weekOf: "Week of Apr 14, 2026",
    learnMoreHref: "/scam-battle",
  },
  {
    id: "apr-2026-voice-clone-emergency",
    title: "AI Voice Clone Emergency Calls Targeting Families",
    description: "Scammers clone a teen's voice from just 3 seconds of social media audio, then call parents claiming they're in an accident, arrested, or kidnapped. A second AI voice poses as a lawyer demanding immediate 'bail' via wire transfer or gift cards. This scam cost one Florida family $15,000 in a single afternoon. Hang up and call the person directly on a number you already have saved.",
    category: "Voice Clone Scam",
    categoryColor: "#ff1744",
    severity: "critical",
    weekOf: "Week of Apr 7, 2026",
    learnMoreHref: "/scam-battle",
  },
  {
    id: "mar-2026-irs-ai-robocall",
    title: "IRS AI Robocall Wave — New Numbers Circulating",
    description: "A new cluster of AI-powered robocalls is impersonating IRS agents, claiming your Social Security number is 'suspended' and an arrest warrant is active unless you pay immediately via gift card or wire transfer. Government impersonation complaints nearly doubled to 32,500 in 2025, with losses reaching $797M. The IRS never calls to demand immediate payment or threaten arrest — hang up.",
    category: "Gov Impersonation",
    categoryColor: "#f59e0b",
    severity: "high",
    weekOf: "Week of Mar 31, 2026",
    learnMoreHref: "/scam-battle",
  },
  {
    id: "mar-2026-fraudgpt-phishing-kits",
    title: "FraudGPT Phishing Kits Spreading via Telegram",
    description: "FraudGPT toolkits ($200/month) are being distributed across Telegram channels, enabling anyone to generate perfectly personalized phishing emails using scraped social media data — no technical skill required. AI-driven phishing attacks increased 1,265% since generative AI went mainstream, with 82.6% of detected phishing emails now AI-written. The old tells — bad grammar, generic greetings — are completely gone.",
    category: "AI Phishing Infrastructure",
    categoryColor: "#ff1744",
    severity: "high",
    weekOf: "Week of Mar 24, 2026",
    learnMoreHref: "/scam-battle",
  },
];
