// ─── EDUCATIONAL GUIDE ───────────────────────────────────────────────────────
// Source of truth for the /guide page. Content is drawn from the Project Vigil
// research doc (Deepfake Audio, Deepfake Video, AI Phishing, Sextortion, Gaming,
// Jobs). Each entry is tied to its Pokédex creature by `slug`. Typos in the
// source have been cleaned, but every fact, figure, name and example is kept.
//
// Pokédex creatures with NO written section in the doc (Glaukult / Ecommerce,
// Ponsi / Investment, Peitho / Love) are surfaced as cross-links at the bottom
// of the page instead of being invented here.
// ─────────────────────────────────────────────────────────────────────────────

export interface GuideExample {
  title: string;
  body: string;
}

export interface GuideAnatomyPoint {
  flag: string;
  detail: string;
}

export interface ScamGuide {
  /** Matches the Pokédex slug so the section can pull the creature's stats. */
  slug: string;
  creature: string;
  title: string;
  /** One-line attention hook shown under the title. */
  hook: string;
  /** Accent colour used for the section's heading, rail and dots. */
  accent: string;
  icon: string;
  redFlags: string[];
  howItWorks: string[];
  whyTeens: string[];
  examples: GuideExample[];
  /** "Anatomy of a real one" — breakdown of an actual sample from the doc. */
  anatomy?: {
    lead: string;
    points: GuideAnatomyPoint[];
  };
  /** Closing caution shown at the end of the section, after the anatomy block. */
  caveat?: string;
}

export const SCAM_GUIDES: ScamGuide[] = [
  // ── 1. DEEPFAKE AUDIO — Passal ──────────────────────────────────────────────
  {
    slug: "passal",
    creature: "Passal",
    title: "Deepfake Audio",
    hook: "A cloned voice of someone you love, calling in a panic. The voice is real to your ears. The emergency is not.",
    accent: "#ff1744",
    icon: "🎙️",
    redFlags: [
      "The voice is suspiciously perfect. Real voices have tiny natural wobbles in pitch and texture — AI audio is often “too clean” and missing those micro-imperfections.",
      "No “umm”s, no natural pauses. Real people stumble and breathe mid-sentence. Flawless, unbroken delivery is a tell.",
      "The background sounds wrong. A real call has messy ambient noise; AI clips often have only one or two sounds bolted on to fake “realness.” Listen for sterile silence, room acoustics that shift, or splicing glitches.",
    ],
    howItWorks: [
      "The caller claims someone you love is in danger or in deep trouble right now.",
      "That manufactured emergency floods you with urgency and fear so you stop thinking and start reacting.",
      "Hearing a familiar voice short-circuits your judgement — your worry for the person clouds everything else, and you hand over money before you verify.",
    ],
    whyTeens: [
      "Your brain is still wiring up. The prefrontal cortex (the planning, “wait a second” part) isn't fully developed, so emotional reactions can fire faster than logical ones — fast feelings, big consequences.",
      "You grew up trusting the internet as a source of truth, which quietly nudges you toward riskier clicks.",
      "Most teens are confident they could spot AI — but very few actually can, consistently. Overconfidence plus naivety is exactly the gap scammers aim for.",
    ],
    examples: [
      {
        title: "The $25 million video call",
        body: "A finance worker at a multinational firm was tricked into paying out US$25 million after joining a video conference with the company's “CFO” and colleagues. Every single person on that call was a deepfake, built from real footage of online meetings. It was only uncovered when the worker later checked with head office.",
      },
      {
        title: "Operation Monopoly — $36 million",
        body: "Dubai Police dismantled a 43-person gang that stole US$36 million from two Asian companies. They hacked corporate email to watch real deals, then used AI voice clones to call branch managers and “confirm” fraudulent wire transfers. Interpol got involved — proof deepfakes are now standard tools for organised crime.",
      },
      {
        title: "The $243,000 boss clone",
        body: "One of the first recorded cases: a UK energy firm lost US$243,000 when criminals cloned the voice of the German parent-company boss so convincingly that staff noticed nothing. They were told to wire money to a “Hungarian supplier” — which was instantly moved on to Mexico and beyond.",
      },
    ],
    anatomy: {
      lead: "We ran a real AI-generated voice clip (a synthetic “John Mitchell” persona) through analysis. Here's what gave it away:",
      points: [
        { flag: "No breathing", detail: "A complete absence of the little breaths real speakers take before stressed words." },
        { flag: "Robotic prosody", detail: "Monotone, measured, over-scripted pacing — the rhythm of a real human is unpredictable in a way AI smooths flat." },
        { flag: "Perfectly clean noise floor", detail: "No natural room reflections at all; the waveform shows artificial normalisation typical of voice synthesis." },
        { flag: "Zero filler words", detail: "Sentences were flawlessly structured with no “um” or “uh”, and the content was oddly generic." },
        { flag: "Detection score 0.9927", detail: "A deepfake detector rated it near-certain to be a fully AI-generated voice." },
      ],
    },
  },

  // ── 2. DEEPFAKE VIDEO — Akmon ───────────────────────────────────────────────
  {
    slug: "akmon",
    creature: "Akmon",
    title: "Deepfake Video",
    hook: "Passal's twin. Same trick, now with a face — a fake video of someone you trust, asking you to act.",
    accent: "#a855f7",
    icon: "🎬",
    redFlags: [
      "Watermarks and blurry patches. AI tools often stamp videos; even when that's scrubbed off, look for soft blurry blobs that appear and vanish in different parts of the frame.",
      "“Conveniently” low quality. Loads of AI clips pose as doorbell or CCTV footage, because we already expect that to look rough. In that footage, timestamps often miscount or show garbled numbers and letters.",
      "Frame-by-frame weirdness. AI builds video one image at a time, so if you slow it down, frames don't quite match — especially in dark areas.",
      "Broken objects and text. AI nails faces and arms (tons of training data) but fumbles rarer things like feet or brand-new products, and renders text as warped, shifting, nonsense letters.",
    ],
    howItWorks: [
      "Scammers paste real, recognisable people (CEOs, celebrities) over real footage so the actions look genuine and credible.",
      "They drop these fakes into Zoom calls to hit high-value targets, impersonating staff using publicly available info.",
      "Then they ask for a large company transfer. It's one of the most lucrative ways criminals are using AI right now.",
    ],
    whyTeens: [
      "You grew up with AI clips and real clips mixed together, so you never built the instinct for “what real video feels like.”",
      "Adults spent decades with only real video, building an unconscious mental model you haven't had time to form.",
      "This gap only widens as AI video floods feeds and genuinely real video becomes harder to find.",
    ],
    examples: [
      {
        title: "Same playbook as the voice clones",
        body: "The $25M deepfake conference call is the headline case here too — it wasn't just a cloned voice, it was cloned faces in a live video meeting. Audio and video deepfakes (Passal and Akmon) almost always work as a pair.",
      },
    ],
    anatomy: {
      lead: "We broke down a real AI product video (a lip-tint clip). Three physics-breaking tells:",
      points: [
        { flag: "Morphing text", detail: "The brand name on the tube warps and stretches as the hand moves; the smaller text below is illegible and keeps shifting into fake characters." },
        { flag: "Impossible physics", detail: "The cap separates from the tube on its own, fingers clip into the plastic, and a fingertip glides over lips without ever deforming against them." },
        { flag: "Teleporting movement", detail: "Hands move too fast and seem to jump position — because AI predicts the next frame rather than understanding how bodies actually move." },
      ],
    },
    caveat:
      "If you're unsure, check anyway. Deepfake video is advancing so fast that the newest fakes can pass every tell on this page, so spotting nothing is not proof it's real. Verify through a separate channel you already trust before you act on it.",
  },

  // ── 3. AI PHISHING — Dolon ──────────────────────────────────────────────────
  {
    slug: "dolon",
    creature: "Dolon",
    title: "AI Phishing",
    hook: "A message that looks official, sounds urgent, and knows just enough about you to feel real. One tap is all it wants.",
    accent: "#00d4ff",
    icon: "🎣",
    redFlags: [
      "A misspelled or “off” link or address — an extra number, a swapped letter, a weird ending. Real brands don't do this.",
      "It asks you to send personal info by email or text. Real companies handle that through their official site or physical mail, never a random message.",
      "Too good (or too scary) to be true. A prize for a contest you never entered, or a sudden threat you weren't expecting, is almost always fake.",
      "“https means it's safe” is a myth scammers exploit — the S only means the connection is encrypted, not that the site is legitimate.",
    ],
    howItWorks: [
      "The scammer impersonates a government body or a business you'd trust.",
      "They dangle a big prize, or threaten severe consequences, to push you into handing over personal info.",
      "Urgency is the weapon — panic creates a mental fog where you can't think clearly, and that's when you comply.",
      "The address is crafted to look real: a missing letter, an extra full stop, or a fake subdomain mimicking the genuine one.",
      "Once they have your details, they drain your money, take over your accounts, or commit identity theft.",
    ],
    whyTeens: [
      "Teens feel impulse emotions like fear and excitement most intensely, and those emotions are exactly what these scams hijack.",
      "You've safely clicked thousands of links, which breeds overconfidence and dulls your guard against the one bad one.",
      "The sheer daily flood of links, notifications and messages makes carefully vetting every single one exhausting.",
    ],
    examples: [
      {
        title: "Fake school & tuition fees (SG, 2025)",
        body: "From August 2025, at least 16 cases and S$38,000 lost: scammers used compromised school email accounts (including Temasek Polytechnic student addresses) to demand urgent fee payments. A second wave on 14 Oct 2025 hit 15+ more cases and S$44,000 in days, using lookalike domains. ITE's logo was abused too, triggering a police report.",
      },
      {
        title: "The $8 EZ-Link “deal” (SG, 2025)",
        body: "Since August 2025, at least 45 cases and S$59,000 lost. Facebook and Instagram ads impersonated EZ-Link, SimplyGo and the LTA with cheap-travel promos — one offered “SG60 Unlimited Travel for 12 months for $8.00.” The fake sites harvested card details, banking logins and OTPs.",
      },
      {
        title: "“I'm from TikTok HR”",
        body: "Fraudsters posed as TikTok staff, texting teens that they could earn up to £800 a day just liking videos. In a survey of 1,000 teens, 23% didn't know criminals impersonate brands — and while 77% said they'd spot a fake text, half of them actually failed when shown one.",
      },
    ],
    anatomy: {
      lead: "A fake “Texas court / DMV” text, taken apart:",
      points: [
        { flag: "Wrong country code", detail: "The number started with +212 — that's Morocco. A Texas court would never contact you from there." },
        { flag: "Fake official URL", detail: "The link was tx.govmey.autos/dmv. Real government sites use .gov or texas.gov, never .autos — and “govmey” is a made-up word designed to look official at a glance." },
        { flag: "Fear stacking", detail: "It threatened an arrest warrant, licence suspension, vehicle impoundment, wage garnishment AND asset seizure all at once, to overwhelm you." },
        { flag: "Wrong channel", detail: "Real notices come by physical mail through proper channels and raise one consequence at a time — not five, by text." },
      ],
    },
  },

  // ── 4. SEXTORTION — Acteon ──────────────────────────────────────────────────
  {
    slug: "acteon",
    creature: "Acteon",
    title: "Sextortion",
    hook: "It runs on shame and silence. The fake “proof” has no real power — and telling someone is how you win.",
    accent: "#f43f5e",
    icon: "🔒",
    redFlags: [
      "AI version: they reference things you actually posted (a new app, a new game) to seem like they know you.",
      "AI version: their “proof” image has tells of a deepfake — unnatural skin texture, blurred edges around the hairline, lighting that doesn't match. Cross-check it against the deepfake guide above.",
      "AI version: you don't remember ever sending those images or doing that on camera — because you didn't. That's your strongest sign it's fabricated.",
      "Traditional: a stranger floods you with compliments, using your social media to fake closeness fast.",
      "Traditional: they push to move to a private/encrypted app (like WhatsApp) early “for privacy” — really to dodge platform monitoring.",
      "Traditional: they claim vague mutual friends, and send explicit images quickly to pressure you into doing the same.",
    ],
    howItWorks: [
      "AI version: they pull your photos from social media, use AI to fake explicit images of you, then threaten to post them unless you pay — weaponising fear and your reputation.",
      "AI version: they may claim they “installed a virus and recorded you” to make a fake clip feel real.",
      "Traditional: they pose as a teen who likes you, coax real images out of you, then blackmail you.",
      "Either way, they're betting you'll be too scared or embarrassed to tell anyone — so you pay quietly.",
    ],
    whyTeens: [
      "Fear, shame and pride stop teens reaching out — some even believe they're “in the wrong” and just obey.",
      "Teens post the most online, handing scammers material and details to make their threats believable.",
      "Social reputation feels enormous at this age — a teen may fear one image will define them forever, while an adult would assume people see through it.",
      "Lonely teens craving connection are far more receptive to an “ideal companion's” early requests.",
    ],
    examples: [
      {
        title: "Samuel — Canada, 2022",
        body: "A 17-year-old was contacted on Snapchat by someone posing as a girl his age, manipulated into sending images, then extorted immediately. The whole ordeal lasted only hours before he took his own life. His family went public to warn other teens and parents — because the one thing that breaks this scam is refusing to suffer in silence.",
      },
      {
        title: "The 764 Network",
        body: "Not one case but an organised online predator network that systematically targeted minors — some as young as 8 — across Discord and Telegram, using sextortion and extreme manipulation. Arrests followed across the US and UK from 2022, and it was classified as a criminal extremist network.",
      },
    ],
    anatomy: {
      lead: "A real grooming-to-extortion chat, beat by beat:",
      points: [
        { flag: "Instant fake connection", detail: "“I saw your comment on Jake's post… I'm friends with Jake from camp. You go to Westview right?” — a bond built from your public info that feels safe but can't actually be verified." },
        { flag: "Move to Snapchat, fast", detail: "“Add me on Snapchat, I'm barely on Instagram.” Snapchat messages are harder to trace once deleted and less monitored." },
        { flag: "Flattery, then the trap", detail: "“You're really cute… I sent you something, don't be shy.” The moment an image is sent: “You have 2 hours to send $300 or this goes to everyone following you.”" },
        { flag: "The AI threat", detail: "“I have explicit videos of you from your own camera… $500 in Bitcoin in 3 hours or I send this to everyone. Don't tell anyone — by the time they help, it'll be too late.” It's a script. It's a lie. Tell someone." },
      ],
    },
  },

  // ── 5. GAMING — Fanir ───────────────────────────────────────────────────────
  {
    slug: "fanir",
    creature: "Fanir",
    title: "Gaming Scams",
    hook: "Free skins, cheap currency, a friendly trade. It corrupts the thing you love to play.",
    accent: "#f59e0b",
    icon: "🎮",
    redFlags: [
      "Free in-game currency or items — normally paywalled — from an unofficial source. It's fake, and it'll either steal your account or your info.",
      "Lookalike sites and handles like “R0blox” or “Robloxs,” especially if shared in Discord or in-game chat.",
      "“Account sharing”: being asked for your login “to receive” a reward or trade. That's a takeover — they change the email/password, then resell or ransom your account.",
    ],
    howItWorks: [
      "Limited-time, limited-quantity offers to rush you before you can think.",
      "Impersonating support agents — since real support is one of the few who'd ever need account info, the fake feels less suspicious.",
      "Fake “your account is hacked / banned” images to panic you into handing over details.",
      "Playing the long game: befriending you over days or weeks, then slipping the scam in once you trust them.",
    ],
    whyTeens: [
      "FOMO: when friends have currency or cosmetics, you feel left out and chase the cheapest way to get them — and desperation clouds judgement.",
      "No steady income: stuck in school with no easy money, you go looking for free shortcuts and ignore the warning signs.",
      "Naivety: games feel like a pure, harmless space, so your guard drops and obvious red flags slide past.",
      "Pride: too embarrassed to admit being scammed, so you stay quiet, don't learn from it, and get hit again.",
    ],
    examples: [
      {
        title: "“Fulfillment TCG” — Pokémon cards (SG, 2026)",
        body: "An online store on Carousell and Telegram offered cheap pre-orders for the new Ascended Heroes sets. It built trust for months with small deliveries and even real refunds — then, once hype peaked and big bank transfers rolled in, it vanished, blaming a supplier who'd “gambled away” the money. 100+ victims, over S$700,000 lost, one losing S$89,000.",
      },
      {
        title: "Steam API key phishing — Counter-Strike",
        body: "Fake tournament, gambling and modding sites ask you to log in with Steam. The moment you do, a hidden API key hands a bot invisible control of your account. It waits for you to trade with a real friend, intercepts it, clones the friend's profile, and reroutes your valuable items. One breach of collector “HFB” drained an estimated $2M–$10M.",
      },
      {
        title: "CSGO Lotto — the influencer con (2016)",
        body: "YouTubers TmarTn and Syndicate hyped a skin-gambling site they pretended to “discover,” filming huge wins for millions of young fans. They secretly owned the site and rigged their own wins. The exposé led to a US FTC investigation and new transparency rules for influencers.",
      },
    ],
    anatomy: {
      lead: "How to read a fake “gaming company” email:",
      points: [
        { flag: "Free email address", detail: "A real company uses its own official domain, not a free Gmail account." },
        { flag: "Asks for sensitive info", detail: "Real companies never ask for photo ID or billing details by email — that happens on their site." },
        { flag: "Out-of-the-blue refund", detail: "Refunds go back through your original payment method automatically; companies don't email you to arrange one." },
        { flag: "Third-party “recovery” link", detail: "Official account recovery uses automated, time-gated links back to the real site — never a random third-party link." },
        { flag: "Reality check", detail: "Gaming companies can't recover stolen funds — they can't seize bank accounts, and scammers usually operate from another country." },
      ],
    },
  },

  // ── 6. JOBS — Circe ─────────────────────────────────────────────────────────
  {
    slug: "circe",
    creature: "Circe",
    title: "Job Scams",
    hook: "Your first taste of independence, weaponised. High pay, no experience, no interview — and a catch.",
    accent: "#ff6d00",
    icon: "💼",
    redFlags: [
      "Too good to be true: work-from-home, a few hours, very high pay. Almost no real job looks like that.",
      "Unsolicited offers over WhatsApp or DMs when you never applied — they're spraying thousands of people at once.",
      "No interview. Real employers want to meet you; scams skip it to rush you straight into “working.”",
      "No verifiable online presence. Real companies are easy to find; a thin or missing footprint lets a scammer vanish the moment authorities show up.",
    ],
    howItWorks: [
      "They reach out on Instagram or WhatsApp. Once you're in, they either steal your personal info for identity theft, or get you to pay for “training” or “equipment” — often both.",
      "Irresistible terms (high pay, low effort, no experience) widen the net so more people qualify and bite.",
      "They target the desperate — anyone near financial hardship whose judgement is clouded by need.",
      "They manufacture urgency (“limited spots, sign up now”) to cut your thinking time.",
      "They build real trust first — paying you as promised for a few weeks — then ask you to pay for “equipment,” and you comply because you trust them now.",
    ],
    whyTeens: [
      "First-time job seekers don't know what's normal, so red flags like “great pay, no interview” don't register as wrong.",
      "Teens over-trust the internet and feel sure they'd never be fooled — overconfidence is the flaw being exploited.",
      "A teen's clean, near-empty credit history is ideal for identity theft and bank fraud, which makes your details genuinely valuable to sell.",
    ],
    examples: [
      {
        title: "Alexandra — New York, 2020",
        body: "She applied for a “graphic designer” role at Steak 'n Shake via Indeed. An emailed “screening test” was actually a data-harvesting exercise; the scammer used her details to file a fraudulent unemployment claim in her name. The same crew rebuilt Spirit Airlines' hiring site, asking applicants to upload both sides of their driver's licence. Real branding, fake process, real identity theft.",
      },
      {
        title: "The 16-year-old in Aurora, Colorado",
        body: "Scammers reached a teen on social media and offered a cut just for “letting them use his bank account.” They deposited forged money orders and withdrew the cash before it bounced. The bank held him responsible — so he ended up owing money. Charges included money laundering and identity theft; one co-accused was also 16. Letting someone use your account makes you a money mule, and you carry the blame.",
      },
    ],
  },
];

export const SCAM_GUIDES_BY_SLUG = Object.fromEntries(
  SCAM_GUIDES.map((g) => [g.slug, g]),
) as Record<string, ScamGuide>;

/** Pokédex creatures the doc has no written section for — surfaced as cross-links. */
export const GUIDE_CROSSLINKS: { slug: string; label: string }[] = [
  { slug: "glaukult", label: "E-commerce / fake-seller scams" },
  { slug: "ponsi", label: "Investment & crypto scams" },
  { slug: "peitho", label: "Romance / pig-butchering scams" },
];
