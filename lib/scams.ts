export type ThreatLevel = "critical" | "high" | "medium";

export interface ScamItem {
  id: string;
  name: string;
  emoji: string;
  summary: string;
  rank: number;
  riskLevel: ThreatLevel;
  category: "ai-native" | "ai-transformed" | "traditional" | "platform-trend";
  categoryLabel: string;
  statusLabel: string;
  isSpiking: boolean;
  isTop: boolean;
  statValue: string;
  statCaption: string;
  reportedAt: string;
  tipsLabel: string;
  tips: string[];
  kickerLabel?: string;
  kicker?: string;
  source: string;
}

export const SCAMS: ScamItem[] = [
  {
    id: "bts-arirang-concert-ticket-scam",
    name: "BTS 'Arirang' Concert Ticket Scams",
    emoji: "🎫",
    summary:
      "Fake ticket listings on X, Instagram and Carousell promise BTS 'Arirang' seats. You pay via PayNow or a QR code, then get hit with fake admin fees. The tickets never arrive. Scammers send screenshots of fake tickets and receipts to look legit, then pressure you with 'limited time left.'",
    rank: 1,
    riskLevel: "critical",
    category: "traditional",
    categoryLabel: "Traditional",
    statusLabel: "Active now",
    isSpiking: true,
    isTop: true,
    statValue: "62+ cases · $68,200+ lost",
    statCaption: "Since 1 June 2026, for one concert",
    reportedAt: "10 Jun 2026",
    tipsLabel: "Red flags",
    tips: [
      "Any ticket listed outside Ticketmaster.",
      "A PayNow transfer to a stranger.",
      "\"Pay now or lose it\" pressure tactics.",
      "Seller claims they can \"transfer tickets to your Ticketmaster account\" — tickets are strictly non-transferable and never issued via email.",
    ],
    kickerLabel: "The kicker",
    kicker: "Even if the ticket is real, resale buyers get turned away at the gate. No refund.",
    source: "SPF Advisory, 10 June 2026 · 722 concert ticket scam cases Jan–Oct 2025 ($615,000+ lost)",
  },
  {
    id: "deepfake-pm-wong-zoom-call",
    name: "Deepfake \"PM Wong\" Zoom Call: $4.9M Gone",
    emoji: "🎭",
    summary:
      "A Singapore businessman got a WhatsApp message impersonating the Secretary to the Cabinet, inviting him to a meeting with PM Lawrence Wong. The Zoom call appeared to include PM Wong, President Tharman and other officials — every one of them fabricated with deepfake AI. He was instructed to transfer at least S$4.9 million. The fake call even ended with \"PM Wong\" thanking him by name.",
    rank: 2,
    riskLevel: "critical",
    category: "ai-native",
    categoryLabel: "AI-Native",
    statusLabel: "Confirmed May 2026",
    isSpiking: false,
    isTop: false,
    statValue: "S$4.9M transferred",
    statCaption: "Single deepfake Zoom call, May 2026",
    reportedAt: "14–16 May 2026",
    tipsLabel: "Defence",
    tips: [
      "Government officials will NEVER ask you to transfer money over a call.",
      "Verify on a second channel, always — call the person back on a number you already have.",
      "Unsure? Call ScamShield: 1799 (24/7).",
    ],
    kickerLabel: "Why it matters",
    kicker: "If a deepfake can fake the Prime Minister on a LIVE call, it can fake your mum on a WhatsApp video call.",
    source: "SPF News Release, 14–16 May 2026 (SPF released the actual footage)",
  },
  {
    id: "ai-faked-image-extortion-emails",
    name: "AI-Faked Image Extortion Emails",
    emoji: "😨",
    summary:
      "Victims receive emails containing images of themselves digitally modified by AI to appear sexual. The scammer never had a real photo — your public Instagram pictures are enough raw material.",
    rank: 3,
    riskLevel: "critical",
    category: "ai-native",
    categoryLabel: "AI-Native",
    statusLabel: "New: March 2026",
    isSpiking: true,
    isTop: false,
    statValue: "Emerging threat",
    statCaption: "First SPF advisory: 14 April 2026",
    reportedAt: "14 Apr 2026",
    tipsLabel: "Defence",
    tips: [
      "Don't pay. Don't reply.",
      "Screenshot everything.",
      "Tell a trusted adult and report it.",
      "Under 18? NCMEC \"Take It Down\" removes images free and anonymously.",
    ],
    source: "SPF Advisory, 14 April 2026",
  },
  {
    id: "money-mule-recruitment-teens",
    name: "Money Mule Recruitment: Teens Are Getting Charged",
    emoji: "💸",
    summary:
      "Teens are getting arrested. An 18-year-old was charged in January 2026 after selling two bank accounts to a syndicate for a promised $1,000 each. A February 2026 operation charged 24 people aged 16 to 51. A May 2026 crackdown investigated 295 people, including a 15-year-old — our age.",
    rank: 4,
    riskLevel: "high",
    category: "traditional",
    categoryLabel: "Traditional",
    statusLabel: "Ongoing Crackdown",
    isSpiking: true,
    isTop: false,
    statValue: "295 people investigated",
    statCaption: "Includes a 15-year-old, May 2026 crackdown",
    reportedAt: "Jan–May 2026",
    tipsLabel: "Red flags",
    tips: [
      "\"Rent me your bank account.\"",
      "\"$1,000 for your Singpass login.\"",
      "\"Just receive this money and forward it.\"",
    ],
    kickerLabel: "The stakes",
    kicker: "Since 30 December 2025, scam mules face discretionary caning of up to 12 strokes, plus criminal charges and restrictions on your bank accounts and mobile lines.",
    source: "SPF News Releases, Jan–May 2026",
  },
  {
    id: "fake-spf-popup-browser-lock",
    name: "Fake \"SPF\" Pop-Up That Locks Your Browser",
    emoji: "🚨",
    summary:
      "While browsing, a pop-up with the SPF logo claims you have outstanding fines, and your browser looks frozen. Scammers force full-screen mode and hide your cursor to fake a \"locked\" computer, then demand card details to pay the \"fine.\"",
    rank: 5,
    riskLevel: "medium",
    category: "ai-transformed",
    categoryLabel: "AI-Transformed",
    statusLabel: "Feb 2026 Advisory",
    isSpiking: false,
    isTop: false,
    statValue: "Fake fines, frozen screen",
    statCaption: "SPF advisory, 24 February 2026",
    reportedAt: "24 Feb 2026",
    tipsLabel: "Defence",
    tips: [
      "The SPF cannot lock or freeze your computer.",
      "Press Ctrl+Alt+Delete → Task Manager → force quit. That's the whole fix.",
    ],
    source: "SPF Advisory, 24 February 2026",
  },
  {
    id: "tiktok-rising-scam-platform",
    name: "TikTok: The Only Platform Where Scams Are Rising",
    emoji: "📱",
    summary:
      "Scams on TikTok rose 37.8% in 2025 while Facebook, Instagram, WhatsApp, Telegram and Carousell all fell after new platform regulations. Scammers are migrating to where you are.",
    rank: 6,
    riskLevel: "medium",
    category: "platform-trend",
    categoryLabel: "Platform Trend",
    statusLabel: "Platform Trend",
    isSpiking: true,
    isTop: false,
    statValue: "+37.8% on TikTok",
    statCaption: "While other platforms fell, 2025",
    reportedAt: "2025",
    tipsLabel: "Red flags",
    tips: [
      "Any \"deal\" or \"investment\" pitch that starts in your DMs or comments.",
      "Sellers or \"opportunities\" with no presence outside TikTok.",
      "Urgency to move the conversation off-platform to WhatsApp or Telegram.",
    ],
    source: "SPF Annual Scam and Cybercrime Brief 2025",
  },
  {
    id: "ai-ecommerce-scams",
    name: "E-Commerce Scams: Still #1 for Your Age Group",
    emoji: "🛍️",
    summary:
      "E-commerce scams topped Singapore's case count in 2025, and youths mostly fell for e-commerce. The AI layer: fake listings, AI-generated product photos, and chatbot \"sellers\" that reply instantly and convincingly. The accounts look legit with seemingly real reviews. The scam is traditional — AI just makes it faster and more believable.",
    rank: 7,
    riskLevel: "high",
    category: "ai-transformed",
    categoryLabel: "AI-Transformed",
    statusLabel: "Top of the List",
    isSpiking: false,
    isTop: true,
    statValue: "#1 scam type for teens",
    statCaption: "SPF Annual Brief 2025",
    reportedAt: "2025",
    tipsLabel: "Red flags",
    tips: [
      "Prices far below market rate with a chatbot seller that replies instantly.",
      "Reviews that all sound the same, or a seller history that's brand new.",
      "Any request to pay via PayNow or bank transfer instead of the platform's built-in checkout.",
    ],
    source: "SPF Annual Scam and Cybercrime Brief 2025",
  },
  {
    id: "ai-disability-begging-videos",
    name: "AI \"Disabled Creators\" Begging for Your Money",
    emoji: "🎥",
    summary:
      "A creator with Down syndrome films herself making a crochet bag. She thanks you for the support. She asks you to buy one, or just donate. She does not exist. AI-generated videos of disabled people — and of elderly and Black creators — are flooding YouTube Shorts, TikTok and Instagram, engineered to convert your sympathy into a sale or a transfer. The products are usually stolen from real disabled artisans, then drop-shipped from Shein. The faces are often deepfaked onto footage taken from real creators' accounts.",
    rank: 8,
    riskLevel: "high",
    category: "ai-native",
    categoryLabel: "AI-Native",
    statusLabel: "Spiking now",
    isSpiking: true,
    isTop: false,
    statValue: "30+ fake accounts · 130,000 followers on one",
    statCaption: "Across Instagram, YouTube and TikTok",
    reportedAt: "18 Jun 2026",
    tipsLabel: "Red flags",
    tips: [
      "The face is soft, smeared or subtly melting at the edges — especially around the hands, teeth and the seam where the jaw meets the neck.",
      "The account grew to six figures in weeks. Real disability advocates take years — one real advocate built 24,000 followers over years while an AI account passed 130,000 in months.",
      "Every video ends with a link. A shop, a donation page, a \"support my work\" button.",
      "The same handicraft appears on three different \"creators'\" accounts — the product photo was lifted from a real artisan and the faces were swapped.",
      "The charity named is real, but the account has no connection to it. One AI account falsely claimed to fundraise for the National Down Syndrome Society.",
    ],
    kickerLabel: "The kicker",
    kicker:
      "These videos crowd out the real disabled entrepreneurs they're stealing from. The money you meant for them goes to a dropshipper — and the feed learns to show you more fakes.",
    source:
      "CBS News Confirmed, 6 May 2025 · AFP / France 24, 18 June 2026 · Instagram opened an investigation into AI profiles impersonating disabled people, Feb 2026",
  },
];
