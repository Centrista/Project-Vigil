import type { InboxScenario } from "./scam-battle-engine";

// Inbox previews — the messages players evaluate before any encounter triggers.
// Each scam maps to a Pokédex entry via `pokemonSlug` so a correct "scam"
// verdict spawns the matching Pokémon encounter.
//
// Legit decoys are deliberately chosen to live in the SAME territory as one of
// the 9 Pokémon (e.g. legit Singpass push beside the Dolon Singpass phish) so
// players have to use the full pattern to decide, not just the brand name.

export const INBOX_POOL: InboxScenario[] = [
  // ============================================================
  // SCAMS — one per Pokédex entry
  // ============================================================

  // 1. PASSAL — Deepfake audio mum
  {
    id: "passal-whatsapp-1",
    platform: "whatsapp",
    sender: {
      name: "Mom 💕",
      phone: "+65 8234 9981",
      avatarSeed: "M",
      avatarColor: "#ff6d9e",
      isKnownContact: false,
      subtitleHint: "online",
    },
    messages: [
      {
        body: "🎙️ Voice note",
        isVoiceNote: true,
        voiceDurationSec: 42,
        voiceTranscript:
          "Boy ah!! Mommy got into accident at AYE just now... cannot use my phone properly, screen cracked. Quickly PayNow $340 to this number for the tow truck uncle, very urgent! Don't tell daddy first, I settle later with him.",
      },
      { body: "Quickly leh boy 😭" },
      { body: "+65 8234 9981 — PayNow this number okay" },
    ],
    timestamp: "11:47 pm",
    verdict: "scam",
    pokemonSlug: "passal",
    redFlagsToTeach: [
      "PayNow number isn't mum's saved one",
      "'Don't tell daddy' — secrecy push",
      "Urgency stops you from verifying",
      "Voice notes can be AI-cloned in under 30 seconds",
    ],
    whyItsScamLesson:
      "The voice sounds like mum because AI cloned it from her TikTok / voice notes. Real mum would use her usual PayNow number, not a fresh one, and wouldn't need secrecy from dad.",
  },

  // 2. AKMON — Deepfake video cousin
  {
    id: "akmon-whatsapp-1",
    platform: "whatsapp",
    sender: {
      name: "Cousin Jeremy",
      phone: "+65 8455 7820",
      avatarSeed: "J",
      avatarColor: "#5d8fff",
      isKnownContact: false,
      subtitleHint: "online — calling now",
    },
    messages: [
      {
        body: "📹 Video call screenshot — that's me bro, see?",
        image: {
          src: "/images/scam-shots/ai-videocall-01.jpg",
          caption: "Video call · weak signal · 0:11",
          aiTag: true,
          alt: "Blurry video-call still of a young man",
        },
      },
      {
        body: "Eh bro!! I'm in JB for the trip, lost my wallet. Connection super lousy here — PayNow me $420 ah? Send to +65 8455 7820, my colleague will bring cash to me. Quick lah, my battery dying.",
      },
    ],
    timestamp: "Sun 9:03 pm",
    verdict: "scam",
    pokemonSlug: "akmon",
    redFlagsToTeach: [
      "Video looks slightly off — lip sync, glitchy when 'cousin' talks fast",
      "Number isn't his saved one in your contacts",
      "'Battery dying' is the excuse to stop you verifying",
      "Real cousin wouldn't need a colleague's PayNow",
    ],
    whyItsScamLesson:
      "Deepfake video is now real enough to fool a quick glance. Hang up, call back on his saved number, and demand a hand-to-face wave before sending anything.",
  },

  // 3. DOLON — AI phishing as Singpass
  {
    id: "dolon-sms-1",
    platform: "sms",
    sender: {
      name: "Singpass",
      phone: "+65 9012 4477",
      avatarSeed: "S",
      avatarColor: "#ef4444",
      isKnownContact: false,
      subtitleHint: "Unknown number",
    },
    messages: [
      {
        body: "URGENT: Your Singpass was accessed from Johor Bahru at 02:14am. Verify your identity within 30 minutes or your account will be locked permanently. Tap to verify:",
        link: {
          displayText: "sing-pass-verify.sg/auth",
          actualUrl: "https://sing-pass-verify.sg/auth",
        },
      },
    ],
    timestamp: "2:18 am",
    verdict: "scam",
    pokemonSlug: "dolon",
    redFlagsToTeach: [
      "Real Singpass uses short codes like 77000, not a phone number",
      "URL is sing-pass-verify.sg — real domain is singpass.gov.sg",
      "Urgency timer (30 min) is fake — Singpass never threatens permanent lockout via SMS",
      "Sent at 2am — scammers hit when you're half-asleep",
    ],
    whyItsScamLesson:
      "Whenever something asks you to 'verify your identity' via a link, IGNORE THE LINK. Open the real Singpass app and check login history there. The real app shows zero foreign logins.",
  },

  // 4. ACTEON — Sextortion (handled with rails)
  {
    id: "acteon-ig-1",
    platform: "instagram",
    sender: {
      name: "unknown_user_4471",
      handle: "unknown_user_4471",
      avatarSeed: "?",
      avatarColor: "#475569",
      isKnownContact: false,
      subtitleHint: "Active 2m ago · Joined recently",
    },
    messages: [
      {
        body: "I have edited photos of you that look real. Pay $200 via PayNow within 24 hours or I post them to your followers.",
      },
      { body: "Don't tell anyone. I'm watching your account." },
      { body: "Reply to confirm." },
    ],
    timestamp: "12:34 am",
    verdict: "scam",
    pokemonSlug: "acteon",
    redFlagsToTeach: [
      "Stranger account with no profile photo, recently created",
      "Threat with no proof — they don't actually have anything real",
      "Demand for payment + secrecy + deadline = textbook sextortion",
      "AI generates the 'edited photos' from public social media — usually they have nothing real",
    ],
    whyItsScamLesson:
      "If this ever happens for real: do NOT reply, do NOT pay, do NOT send anything. Screenshot everything, block the account, tell a parent or teacher immediately, and call 1799 (ScamShield). You are not in trouble — the scammer is.",
  },

  // 5. FANIR — Gaming Discord scam
  {
    id: "fanir-discord-1",
    platform: "telegram", // visual closest to discord; we render as telegram-style chat
    sender: {
      name: "Roblox Staff Verified ✓",
      handle: "@robloxstaff_official_sg",
      avatarSeed: "R",
      avatarColor: "#22c55e",
      isKnownContact: false,
      subtitleHint: "Discord DM — fake 'Staff' tag, no real verification",
    },
    messages: [
      { body: "Yo bro saw you grinding earlier! 🔥" },
      { body: "I got a free Robux generator — 10,000 Robux no charge, beta partnership only for active players." },
      {
        body: "Just log in to verify ur account so we can credit it:",
        link: {
          displayText: "bit.ly/roblox-verify-gen-sg",
          actualUrl: "https://bit.ly/roblox-verify-gen-sg",
        },
      },
    ],
    timestamp: "Sat 8:22 pm",
    verdict: "scam",
    pokemonSlug: "fanir",
    redFlagsToTeach: [
      "Real Roblox staff never DM you in Discord — official support is in-game",
      "'Free Robux generator' does not exist. Currency only comes from the official store.",
      "Asks you to log in on a third-party site = account theft",
      "bit.ly shortened link hides the real destination",
    ],
    whyItsScamLesson:
      "Anyone DMing you offering free game currency is trying to steal your account. Real games never run 'beta partnerships' through random Discord accounts.",
  },

  // 6. CIRCE — Telegram job scam
  {
    id: "circe-telegram-1",
    platform: "telegram",
    sender: {
      name: "HR — SG Marketing 🎯",
      handle: "@sg_easy_tasks_hr",
      phone: "+60 16 884 2207",
      avatarSeed: "H",
      avatarColor: "#f59e0b",
      avatarImage: "/images/scam-shots/ai-face-03.jpg",
      isKnownContact: false,
      subtitleHint: "Telegram — Malaysian number",
    },
    messages: [
      {
        body: "Hi! 🎉 Part-time online job for students. Just like/subscribe YouTube videos, $5 per task, paid daily via PayNow.",
      },
      { body: "Suitable for Sec 1-4 students. No experience needed. Reply YES to start your first paid task!" },
    ],
    timestamp: "Thu 4:12 pm",
    verdict: "scam",
    pokemonSlug: "circe",
    redFlagsToTeach: [
      "$5 per like is ~10x the real going rate — too good to be true",
      "+60 (Malaysian) number for a 'Singapore' job",
      "Real SG companies don't hire through Telegram",
      "The bait: first few tasks pay; then 'VIP tier' demands a deposit",
    ],
    whyItsScamLesson:
      "No real job asks YOU to deposit money to 'unlock higher-paying tasks'. The first small payment is the lure that builds trust before the real ask.",
  },

  // 7. GLAUKULT — Carousell ecommerce scam (rendered as a LISTING, not a chat)
  {
    id: "glaukult-carousell-1",
    platform: "carousell",
    sender: {
      name: "bargain_finds_sg",
      handle: "@bargain_finds_sg",
      avatarSeed: "B",
      avatarColor: "#06b6d4",
      isKnownContact: false,
      subtitleHint: "Joined 3 days ago · 0 reviews · No verified ID",
    },
    listingPreview: {
      productTitle: "AirPods Pro 2 — Brand New Sealed",
      productEmoji: "🎧",
      productImage: "/images/scam-shots/product-earbuds.jpg",
      priceNow: "$80",
      priceMarket: "$349",
      sellerBadge: "Joined 3 days ago · 0 reviews",
      fakeReviews: [
        {
          author: "@happy_buyer_99",
          body: "Item arrived fast, seller very nice 👍 highly recommend!!",
          stars: 5,
        },
        {
          author: "@sgshopper_x",
          body: "Same as picture, real deal. Will buy again 🙏",
          stars: 5,
        },
      ],
    },
    messages: [
      {
        body: "Hi! Last 2 sets — PayNow me directly for an extra 20% off, no need go through Carousell payment (very slow leh).",
      },
      {
        body: "WhatsApp me at +65 8554 9982 to confirm, I send you the PayNow QR.",
      },
    ],
    timestamp: "Yesterday 7:55 pm",
    verdict: "scam",
    pokemonSlug: "glaukult",
    redFlagsToTeach: [
      "AirPods Pro 2 retail $349 — $80 is impossible for legit new stock",
      "Account joined 3 days ago, zero real reviews",
      "Listing photo is a generic stock image — not a real photo of the actual item",
      "Reviews are AI-template style — same emoji pattern, no specifics",
      "Pushes payment OUTSIDE Carousell's protection",
    ],
    whyItsScamLesson:
      "Insist on Carousell Protection / Shopee Guarantee — platform payment is exactly the safety net you're paying for. Anyone refusing it is hiding something.",
  },

  // 8. PONSI — Investment scam
  {
    id: "ponsi-tiktok-1",
    platform: "instagram", // visual close enough; we render as IG-style DM
    sender: {
      name: "sgtrader_lambo",
      handle: "@sgtrader_lambo",
      avatarSeed: "L",
      avatarColor: "#a855f7",
      avatarImage: "/images/scam-shots/ai-face-01.jpg",
      verified: false,
      isKnownContact: false,
      subtitleHint: "Bio: \"24, made my first 100k at 22\" · Profile pic looks AI-generated",
    },
    messages: [
      { body: "Yo bro you commented on my live earlier, I added you 🙏" },
      {
        body: "I run an exclusive VIP trading group — 30% weekly returns GUARANTEED. Beginners welcome, I do all the trades for you.",
      },
      { body: "Min deposit only $300 to start. DM me \"VIP\" to join before slots close tonight." },
    ],
    timestamp: "Tue 10:41 pm",
    verdict: "scam",
    pokemonSlug: "ponsi",
    redFlagsToTeach: [
      "'GUARANTEED' returns don't exist in any real investment",
      "30% weekly = a real fund would charge for that, not give it free",
      "'Slots close tonight' = artificial urgency",
      "AI-generated 'rich young trader' face + flashy story = classic Ponsi avatar",
    ],
    whyItsScamLesson:
      "If a returns offer uses the word 'guaranteed', it's a scam. Always. Real licensed investments are regulated by MAS — these never are.",
  },

  // 9. PEITHO — Pig-butchering / love scam (sensitive rails)
  {
    id: "peitho-ig-1",
    platform: "instagram",
    sender: {
      name: "rachel_lim_19",
      handle: "@rachel_lim_19",
      avatarSeed: "R",
      avatarColor: "#ec4899",
      avatarImage: "/images/scam-shots/ai-face-02.jpg",
      isKnownContact: false,
      subtitleHint: "3 mutual followers from HCI · Active now",
    },
    messages: [
      {
        body: "Hey! Saw we have like 3 mutual followers from HCI. You seem cool, how was your weekend? 😊",
      },
      {
        body: "(Day 4 of chatting, she's been super friendly):",
      },
      {
        body: "Hey, slightly random — I'm helping my uncle launch a crypto thing, super early access. Made $800 in 2 weeks. Wanna try with just $200? I can walk you through. Don't tell anyone else, exclusive to my close friends 💜",
      },
    ],
    timestamp: "Now",
    verdict: "scam",
    pokemonSlug: "peitho",
    redFlagsToTeach: [
      "Stranger who builds rapport fast over a few days",
      "Pivot from chat to 'investment opportunity' is the scam moment",
      "'Don't tell anyone' isolation push",
      "Friend-of-uncle crypto = unregulated = unrecoverable money",
    ],
    whyItsScamLesson:
      "Any online-only friend who pivots from friendly chat to asking for money, crypto, or 'a small favour' is running the pig-butchering playbook. Real friends don't pitch you investments — and they don't need secrecy.",
  },

  // ============================================================
  // ALTERNATE SCAM SCENARIOS — second variant per Pokémon
  // so runs get different opening shots, not the same one twice.
  // ============================================================

  // 1b. PASSAL — Voice clone "DAD" instead of mum
  {
    id: "passal-whatsapp-2",
    platform: "whatsapp",
    sender: {
      name: "Daddy",
      phone: "+65 9883 1207",
      avatarSeed: "D",
      avatarColor: "#3478F6",
      isKnownContact: false,
      subtitleHint: "Unknown number — using display name 'Daddy'",
    },
    messages: [
      {
        body: "🎙️ Voice note",
        isVoiceNote: true,
        voiceDurationSec: 28,
        voiceTranscript:
          "Boy ah, daddy in trouble! Got pulled over at the checkpoint, phone almost no battery. PayNow $480 to this number for the officer fine, settle today only. Don't tell mummy first, she will panic. Quick okay.",
      },
      { body: "Cannot call back, signal very weak here" },
    ],
    timestamp: "Fri 6:18 pm",
    verdict: "scam",
    pokemonSlug: "passal",
    redFlagsToTeach: [
      "Number isn't dad's saved one in your contacts",
      "'Don't tell mum' — same secrecy trick as the mum variant",
      "Officers never collect fines via PayNow",
      "Voice + urgency + new number = textbook Passal",
    ],
    whyItsScamLesson:
      "Same playbook, different parent. No real officer takes a fine through a personal PayNow. Hang up, call dad's saved number, loop in mum — that whole frame falls apart the moment you verify.",
  },

  // 1c. PASSAL + AKMON combined — Fake Zoom call from "form teacher" (voice + video deepfake together)
  {
    id: "passal-akmon-zoom",
    platform: "gmail",
    sender: {
      name: "Mrs Tan (Form Teacher)",
      email: "ms.tan.hci.urgent@hci-edu.sg",
      avatarSeed: "T",
      avatarColor: "#ef4444",
      isKnownContact: false,
      subtitleHint: "Lookalike domain — real one is hci.edu.sg",
    },
    subjectLine: "URGENT — Join Zoom now (parent meeting)",
    messages: [
      {
        body: "Dear student, please join the emergency Zoom now — your parent is on the call to discuss a serious matter regarding your account. Camera and mic must be on. Do not tell other students.",
      },
      {
        body: "Zoom: zoom-hci-urgent.com/j/8472019 (Meeting ID 8472019, passcode HCI2026)",
        link: {
          displayText: "zoom-hci-urgent.com/j/8472019",
          actualUrl: "https://zoom-hci-urgent.com/j/8472019",
        },
      },
      {
        body: "(If you join: a deepfake of Mrs Tan's face appears with a cloned voice. A second window 'connects mum' — another deepfake — and both pressure you to PayNow $400 to clear a 'school payment block' before midnight.)",
      },
    ],
    timestamp: "9:42 pm",
    verdict: "scam",
    pokemonSlug: "passal",
    redFlagsToTeach: [
      "Email domain is hci-edu.sg (fake) — real HCI is hci.edu.sg",
      "Real teachers never run urgent Zoom calls at night with secrecy rules",
      "Both the teacher AND the parent on the same call = both are deepfakes (Akmon + Passal together)",
      "Any meeting that demands PayNow before 'unlocking' something is the entire scam",
    ],
    whyItsScamLesson:
      "This is the next-generation scam — voice clone (Passal) + face deepfake (Akmon) running side-by-side in a fake Zoom to overwhelm your verification reflex. Two 'people' on the call doesn't mean it's real; both can be fake. Always hang up and call the school directly using the published main line.",
  },

  // 2b. AKMON — Deepfake "older brother stuck overseas"
  {
    id: "akmon-whatsapp-2",
    platform: "whatsapp",
    sender: {
      name: "Kor 哥",
      phone: "+65 8771 4093",
      avatarSeed: "K",
      avatarColor: "#0ea5e9",
      isKnownContact: false,
      subtitleHint: "Unknown number — calling now",
    },
    messages: [
      {
        body: "📹 Incoming video call... [tap to view]",
        attachmentLabel: "Choppy video — kor's face buffering every few seconds",
      },
      {
        body: "Bro ATM eaten my card at Bangkok, hotel asking for deposit. PayNow $580 to my friend here can? Number is +65 8771 4093. Camera quality damn bad lah, hotel wifi sian one.",
      },
      { body: "Quick eh kor leaving lobby soon" },
    ],
    timestamp: "Sun 11:42 pm",
    verdict: "scam",
    pokemonSlug: "akmon",
    redFlagsToTeach: [
      "Video stutters every time he 'talks fast' — deepfakes break on quick mouth movement",
      "'Friend's PayNow' is a stranger's account",
      "Hotel wifi excuse hides the deepfake glitches",
      "Real kor would call from his saved WhatsApp, not a new number",
    ],
    whyItsScamLesson:
      "Hang up. Call your brother's normal number — most of the time he's already home and has no idea you got this call. Never PayNow to a 'friend of family' number.",
  },

  // 3b. DOLON — DBS card "suspicious transaction" phish (SMS)
  {
    id: "dolon-sms-2",
    platform: "sms",
    sender: {
      name: "DBS Alert",
      phone: "+65 9224 0188",
      avatarSeed: "D",
      avatarColor: "#dc2626",
      isKnownContact: false,
      subtitleHint: "Unknown number posing as DBS",
    },
    messages: [
      {
        body: "DBS: Charge of S$2,148.00 at SHOPEE THAILAND on your card ending 8821. If not you, dispute within 24h or you'll be liable. Dispute now:",
        link: {
          displayText: "dbs-secure-portal.com/dispute",
          actualUrl: "https://dbs-secure-portal.com/dispute",
        },
      },
    ],
    timestamp: "1:36 am",
    verdict: "scam",
    pokemonSlug: "dolon",
    redFlagsToTeach: [
      "Real DBS uses short code DBS, not a phone number",
      "Domain dbs-secure-portal.com isn't real — DBS uses dbs.com.sg",
      "Card ending '8821' is a guess — if it doesn't match your real card, it's fake",
      "Sent at 1am — half-asleep panic is the goal",
    ],
    whyItsScamLesson:
      "Open the real DBS app and check transactions there. No real charge will exist. The link only goes to a form designed to steal your card number, CVV, and OTP.",
  },

  // 4b. ACTEON — Telegram cold DM sextortion (no profile pic, fake screenshot threat)
  {
    id: "acteon-telegram-2",
    platform: "telegram",
    sender: {
      name: "anon_user_8821",
      handle: "@anon_user_8821",
      avatarSeed: "?",
      avatarColor: "#334155",
      isKnownContact: false,
      subtitleHint: "No bio · Joined this week",
    },
    messages: [
      { body: "I have screenshots of you. You know what I mean." },
      { body: "PayNow $300 in 12 hours or your whole class sees them tomorrow morning." },
      { body: "I have your school list. Don't test me." },
    ],
    timestamp: "11:08 pm",
    verdict: "scam",
    pokemonSlug: "acteon",
    redFlagsToTeach: [
      "No proof of any actual screenshots — just vague threats",
      "'I have your school list' is a bluff — scammers spam this to hundreds at once",
      "Deadline + secrecy + payment demand = sextortion pattern",
      "Empty profile + recent account = textbook throwaway",
    ],
    whyItsScamLesson:
      "Even if this happened for real: do not reply, do not pay. Screenshot, block, tell a parent or teacher, call 1799. Replying once is the win they want — silence is what defeats them.",
  },

  // 5b. FANIR — TikTok comment → DM "free V-Bucks generator"
  {
    id: "fanir-tiktok-2",
    platform: "instagram",
    sender: {
      name: "fortnite_vbucks_official",
      handle: "@fortnite_vbucks_official",
      avatarSeed: "F",
      avatarColor: "#a855f7",
      isKnownContact: false,
      subtitleHint: "Instagram — fake 'official' in name, no verified tick",
    },
    messages: [
      { body: "Hey bro saw your fortnite clip 🔥 wanna 5000 free V-Bucks?" },
      { body: "Just enter your Epic login on this site, takes 30s:" },
      {
        body: "Link below ⬇️",
        link: {
          displayText: "vbucks-gen-sg.online",
          actualUrl: "https://vbucks-gen-sg.online",
        },
      },
    ],
    timestamp: "Sat 11:24 pm",
    verdict: "scam",
    pokemonSlug: "fanir",
    redFlagsToTeach: [
      "Epic Games never runs V-Bucks giveaways through DMs",
      "'Official' in the name with no verified tick is a tell",
      "Any site asking for your game login that isn't the official store = account theft",
      "Generators do not exist — full stop",
    ],
    whyItsScamLesson:
      "If V-Bucks, Robux, Primogems, or any in-game currency comes from anywhere except the official in-game store, it's a scam. Period. The 'verification login' is just account theft with a coat of paint.",
  },

  // 6b. CIRCE — WhatsApp "SG HR" with brand-deal angle
  {
    id: "circe-whatsapp-2",
    platform: "whatsapp",
    sender: {
      name: "Recruiter SG",
      phone: "+65 8021 7748",
      avatarSeed: "R",
      avatarColor: "#f59e0b",
      isKnownContact: false,
      subtitleHint: "Unknown SG number — no verified business badge",
    },
    messages: [
      {
        body: "Hi! We're a SG marketing agency, saw your TikTok 👀 We pay $50 per branded TikTok repost, $300 sign-up bonus for first 24 hours.",
      },
      { body: "Reply YES and we send you the brief + bonus." },
    ],
    timestamp: "Wed 5:21 pm",
    verdict: "scam",
    pokemonSlug: "circe",
    redFlagsToTeach: [
      "No agency, no website link, no portfolio — just WhatsApp DMs",
      "$50 per repost is 10–20x what real micro-creators earn",
      "'Sign-up bonus in 24 hours' = urgency before you think",
      "Real brand deals never start with a cold WhatsApp from a personal number",
    ],
    whyItsScamLesson:
      "After 'YES' they ask for your bank info for the 'bonus,' then a 'security deposit' to unlock higher tiers. The bonus is bait. Real brand partnerships start with a company email and a contract — not a WhatsApp.",
  },

  // 7b. GLAUKULT — TikTok Shop seller pushing direct PayNow
  {
    id: "glaukult-tiktokshop-2",
    platform: "instagram",
    sender: {
      name: "stanley_dropship_sg",
      handle: "@stanley_dropship_sg",
      avatarSeed: "S",
      avatarColor: "#10b981",
      isKnownContact: false,
      subtitleHint: "TikTok Shop seller · 5 followers · No verified tick",
    },
    messages: [
      { body: "Hey saw u like our Stanley listing! Got special bulk price for u — $35 for 30oz (retail $89)." },
      {
        body: "Pay direct PayNow lah, TikTok Shop charge me 18% commission. WhatsApp +65 8990 1287 for the QR.",
      },
      { body: "Only 5 sets left at this price 🏃‍♀️" },
    ],
    timestamp: "Yesterday 9:32 pm",
    verdict: "scam",
    pokemonSlug: "glaukult",
    redFlagsToTeach: [
      "Retail $89 — $35 is impossibly cheap for genuine stock",
      "'Pay direct, skip platform commission' = avoiding buyer protection",
      "5-follower seller account with no order history",
      "Artificial scarcity ('5 sets left') stops you researching",
    ],
    whyItsScamLesson:
      "TikTok Shop's commission is exactly what funds your buyer protection. Any seller pushing you OFF the platform is asking you to give up the only safety net you have.",
  },

  // 8b. PONSI — Telegram VIP crypto group invite from a "friend"
  {
    id: "ponsi-telegram-2",
    platform: "telegram",
    sender: {
      name: "Wei Han 🚀",
      handle: "@weihan_invest_sg",
      avatarSeed: "W",
      avatarColor: "#22c55e",
      isKnownContact: false,
      subtitleHint: "0 mutual contacts · Profile pic looks AI-generated",
    },
    messages: [
      {
        body: "Eh bro, my cousin's running this private crypto signal group. Members made 4x in 3 weeks 📈",
      },
      {
        body: "He's onboarding 5 new ppl tonight only — min top-up $500. I can vouch for u, just dont tell others ah, group has a cap.",
      },
      { body: "Link: t.me/sg_alpha_signals_vip (real telegram link though group itself is fake)" },
    ],
    timestamp: "Mon 9:48 pm",
    verdict: "scam",
    pokemonSlug: "ponsi",
    redFlagsToTeach: [
      "Stranger pretending you've met — '0 mutual contacts' gives it away",
      "'4x returns in 3 weeks' — no legit signal group claims that",
      "Profile picture has the AI-generated 'too perfect' look",
      "Secrecy push ('don't tell others') = isolation tactic",
    ],
    whyItsScamLesson:
      "VIP crypto signal groups run the same script: 'first signal' makes money on paper, then a 'top-up' is required to claim it, then a 'tax fee', then nothing. Every step is engineered to extract more deposits.",
  },

  // 9b. PEITHO — Snapchat add → quick favour pivot (money mule recruitment variant)
  {
    id: "peitho-snapchat-2",
    platform: "instagram",
    sender: {
      name: "jade.ng",
      handle: "@jade.ng",
      avatarSeed: "J",
      avatarColor: "#ec4899",
      isKnownContact: false,
      subtitleHint: "Snap added you · 1 mutual story view from your school",
    },
    messages: [
      {
        body: "heyy saw u in @your.school's story 👀 you in sec 3 right? we have similar friends ahaha",
      },
      {
        body: "(After 2 days of friendly chat about school, K-pop, exam stress):",
      },
      {
        body: "omg random question — can u help me with something? My PayNow not working & I got a refund coming in tmr. Can the $400 go to ur acc first, then u PayNow me back? Don't tell ur parents la, they wun get it 💜",
      },
    ],
    timestamp: "Now",
    verdict: "scam",
    pokemonSlug: "peitho",
    redFlagsToTeach: [
      "New 'friend' asking you to move money through your account = money mule recruitment",
      "'Don't tell your parents' = isolation push, the Peitho signature",
      "Real refunds go back to the original payer, never via a stranger's account",
      "Fast friendship + small favour = the entry version of pig-butchering",
    ],
    whyItsScamLesson:
      "This is how money mule recruitment starts — innocent-looking 'pass-through' favour that makes your bank account part of a scam network. You can be charged for it. Real friends never need your account as a middle stop.",
  },

  // ============================================================
  // LEGIT DECOYS — each one lives in the same territory as a Pokémon
  // so players must use the full pattern, not just brand matching.
  // ============================================================

  // L1. Real mum lunch money (Passal-adjacent territory)
  {
    id: "legit-mum-lunch",
    platform: "whatsapp",
    sender: {
      name: "Mom",
      phone: "+65 9123 4567",
      avatarSeed: "M",
      avatarColor: "#ff6d9e",
      isKnownContact: true,
      subtitleHint: "last seen today at 12:14 pm",
    },
    messages: [
      {
        body: "Eh boy, can PayNow me $30 ah? Buying ingredients for tonight's family dinner, I left wallet at home 🙄",
      },
      { body: "Auntie Mei coming over so cooking bigger portion. Pay you back from grocery jar tonight." },
    ],
    timestamp: "12:14 pm",
    verdict: "legit",
    whyItsLegitLesson:
      "This is mum's saved number, small amount, specific context (Auntie Mei, family dinner), no urgency, no secrecy, reciprocal payback. All the actual scam-features are absent — just the surface looks similar to a Passal attempt.",
    redFlagsToTeach: [
      "Sender is mum's actual saved contact",
      "Amount is small and matches a normal grocery run",
      "Context is specific — scammers stay vague",
      "No urgency, no secrecy, no stranger PayNow number",
    ],
  },

  // L2. Legit Singpass push notification (Dolon-adjacent)
  {
    id: "legit-singpass-push",
    platform: "sms",
    sender: {
      name: "Singpass",
      phone: "77000",
      avatarSeed: "S",
      avatarColor: "#dc2626",
      isKnownContact: true,
      subtitleHint: "Official short code",
    },
    messages: [
      {
        body: "Singpass: New device logged in — iPhone 14, Wi-Fi network HCI-Student, 16/05 at 14:22. If this was you, no action needed. If not, open the Singpass app to manage devices.",
      },
    ],
    timestamp: "2:22 pm",
    verdict: "legit",
    whyItsLegitLesson:
      "Real Singpass uses the short code 77000 (not a phone number), no links, the device + network match what you're using, and it tells you what to do IF something's wrong — no urgency, no threat. The fake Dolon version uses a phone number, fake URL, and a deadline.",
    redFlagsToTeach: [
      "Short code 77000 = real Singpass sender",
      "Device + Wi-Fi match what you're actually on",
      "No links, no buttons to click — just info",
      "No urgency, no 'verify within 30 minutes' threat",
    ],
  },

  // L3. Real Carousell buyer wanting your keyboard (Glaukult-adjacent)
  {
    id: "legit-carousell-buyer",
    platform: "carousell",
    sender: {
      name: "kelvin_chua_88",
      handle: "@kelvin_chua_88",
      avatarSeed: "K",
      avatarColor: "#0891b2",
      isKnownContact: false,
      subtitleHint: "Joined 2022 · 47 reviews · 4.9★",
    },
    messages: [
      {
        body: "Hi bro, interested in the keychron K2 you listed at $80. Can I collect from Bishan MRT tomorrow evening?",
      },
      {
        body: "I'll pay through Carousell Protection when we meet. Drop your time when you can.",
      },
    ],
    timestamp: "Mon 9:14 pm",
    verdict: "legit",
    whyItsLegitLesson:
      "You're the SELLER here — the buyer paying you through Carousell Protection is the normal, safe flow. Account has history (47 reviews, 4.9★), MRT meetup, no off-platform payment request. Glaukult would push PayNow outside Carousell.",
    redFlagsToTeach: [
      "Buyer wants to use Carousell Protection — the safe flow",
      "Account has real history and reviews",
      "Public meetup location (Bishan MRT) — physical handover possible",
      "No off-platform payment request",
    ],
  },

  // L4. Legit TikTok Shop shipping update (Glaukult-adjacent)
  {
    id: "legit-tiktok-shipping",
    platform: "sms",
    sender: {
      name: "TikTok Shop",
      phone: "70505",
      avatarSeed: "T",
      avatarColor: "#000000",
      isKnownContact: true,
      subtitleHint: "Verified short code",
    },
    messages: [
      {
        body: "TikTok Shop: Your order #TS4827193-SG (Stanley cup 30oz) has shipped via Ninja Van. Tracking: NV4827193SG. Expected delivery 18-19 May. Manage in the TikTok app.",
      },
    ],
    timestamp: "10:08 am",
    verdict: "legit",
    whyItsLegitLesson:
      "You actually placed this order. The short code is real (70505), the order number format matches your order history, the courier is named, and there's no link to click — they tell you to use the TikTok app. A Glaukult scam version would invent a fake order to lure you to click a tracking link.",
    redFlagsToTeach: [
      "Order corresponds to one you actually placed",
      "Real short code (70505)",
      "Tells you to use the TikTok app — no external link",
      "Specific tracking number you can verify with Ninja Van directly",
    ],
  },

  // L5. Real Discord friend wanting to play (Fanir-adjacent)
  {
    id: "legit-discord-friend",
    platform: "telegram", // visual proxy for discord DM
    sender: {
      name: "marcusplays",
      handle: "@marcusplays",
      avatarSeed: "M",
      avatarColor: "#7c3aed",
      isKnownContact: true,
      subtitleHint: "Friend since 2023 · Online",
    },
    messages: [
      { body: "yo down for a few games of MLBB later" },
      { body: "I'm tryna grind to mythic this season 💀 carry me bro" },
    ],
    timestamp: "Tue 6:30 pm",
    verdict: "legit",
    whyItsLegitLesson:
      "Real friend (saved contact, known since 2023), normal banter, no links, no logins, no offers of free anything. Fanir would lead with 'free Robux generator' or 'rare skin trade — login here'.",
    redFlagsToTeach: [
      "Saved friend with chat history",
      "Normal gaming chat — no offers, no logins, no links",
      "No 'staff' tags or fake verification claims",
      "Asking to play together, not asking for your account",
    ],
  },

  // L6. Legit HCI / MOE school email (Dolon-adjacent)
  {
    id: "legit-hci-email",
    platform: "gmail",
    sender: {
      name: "Mrs Tan (Form Teacher)",
      email: "tan_meiling@hci.edu.sg",
      avatarSeed: "T",
      avatarColor: "#0ea5e9",
      isKnownContact: true,
      subtitleHint: "From hci.edu.sg",
    },
    messages: [
      {
        body: "Dear class, the CCA briefing on Friday has been moved from 3pm to 4pm due to a hall booking clash. Please update your calendars. Reply if you have any conflicts. — Mrs Tan",
      },
    ],
    subjectLine: "[3A1] CCA briefing time change — Friday",
    timestamp: "Wed 11:02 am",
    verdict: "legit",
    whyItsLegitLesson:
      "Real teacher from real HCI email domain (hci.edu.sg), no money ask, no links, no urgency, ordinary school admin tone. A Dolon version would be from a lookalike domain like hci-edu.sg or moe-portal.com and demand you 'verify your student account'.",
    redFlagsToTeach: [
      "Email is from the real hci.edu.sg domain",
      "No links, no attachments, no money mention",
      "Normal tone — no scare tactics or threats",
      "Specific context (CCA, Friday, 3A1) that scammers can't fake",
    ],
  },

  // L7. Real IG DM from saved friend (Acteon/Peitho-adjacent)
  {
    id: "legit-ig-friend",
    platform: "instagram",
    sender: {
      name: "ashleyzz",
      handle: "@ashleyzz",
      avatarSeed: "A",
      avatarColor: "#ec4899",
      isKnownContact: true,
      subtitleHint: "Mutual friends · Followed since 2023",
    },
    messages: [
      { body: "omg did u see the new netflix doc on insta scams 💀" },
      { body: "we should watch it tgt this wknd" },
    ],
    timestamp: "Fri 10:14 pm",
    verdict: "legit",
    whyItsLegitLesson:
      "Real friend (mutual followers, saved as a contact, you've chatted before), normal vibe, no money ask, no 'opportunity', no isolation push. Peitho would be a brand-new account asking to add you and pivoting to crypto by day 4.",
    redFlagsToTeach: [
      "Saved friend with chat history",
      "Normal conversation — no money, no investment, no 'opportunity'",
      "Mutuals and shared context (Netflix doc)",
      "No secrecy push, no 'don't tell anyone'",
    ],
  },

  // L8. Real classmate Telegram class group invite (Circe-adjacent)
  {
    id: "legit-classmate-telegram",
    platform: "telegram",
    sender: {
      name: "Wei Jie (3A1)",
      handle: "@weijie_hci",
      phone: "+65 9223 4471",
      avatarSeed: "W",
      avatarColor: "#10b981",
      isKnownContact: true,
      subtitleHint: "Classmate · Saved contact",
    },
    messages: [
      {
        body: "bro just made the chem revision group chat for our class. link below — only 3A1 ppl",
      },
      { body: "t.me/+hci3a1_chem (real telegram invite link)" },
    ],
    timestamp: "Wed 7:30 pm",
    verdict: "legit",
    whyItsLegitLesson:
      "Saved classmate, +65 SG number, real Telegram invite (t.me/+...), context that matches your real class. Circe would be a +60/+84 stranger offering you $5/like 'jobs' — not a classmate sharing a study group.",
    redFlagsToTeach: [
      "Saved classmate, SG +65 number",
      "Context matches your actual class (3A1)",
      "Real Telegram invite link (t.me/+...) — not a redirect or bit.ly",
      "No money ask, no 'easy task' job offer",
    ],
  },

  // ============================================================
  // AI-IMAGE SCENARIOS — fabricated visual "proof" + a legit photo
  // ============================================================

  // 3c. DOLON — AI-fabricated "breaking news" image + phishing link
  {
    id: "dolon-fake-news-1",
    platform: "telegram",
    sender: {
      name: "SG News Alert 🚨",
      handle: "@sg_breaking_alert",
      avatarSeed: "N",
      avatarColor: "#ef4444",
      isKnownContact: false,
      subtitleHint: "Channel · 12k subscribers · forwarded to you",
    },
    messages: [
      {
        body: "🚨 BREAKING: Major SG bank hit this morning — accounts being drained. Photo from the scene 👇",
        image: {
          src: "/images/scam-shots/ai-news-01.jpg",
          caption: "Forwarded · \"live from CBD\"",
          aiTag: true,
          alt: "Dramatic AI-generated image of an exploding city street",
        },
      },
      {
        body: "Protect your account NOW — verify your details before 6pm or your funds get frozen:",
        link: {
          displayText: "dbs-secure-alert.sg/verify",
          actualUrl: "https://dbs-secure-alert.sg/verify",
        },
      },
    ],
    timestamp: "8:47 am",
    verdict: "scam",
    pokemonSlug: "dolon",
    redFlagsToTeach: [
      "The 'news photo' is AI-generated — cinematic, no real source or agency",
      "Real banks and news outlets don't break stories via a random Telegram channel",
      "URL is dbs-secure-alert.sg — not the real dbs.com.sg",
      "Fear + a countdown ('before 6pm') is engineered to rush you past thinking",
    ],
    whyItsScamLesson:
      "AI can fabricate a dramatic 'news' image in seconds to make a fake crisis feel real. Never act on a shocking forwarded photo — check a real news site, and open your banking app directly, never through a link in a message.",
  },

  // L9. LEGIT — a saved friend shares a genuine (real) photo
  {
    id: "legit-friend-photo",
    platform: "whatsapp",
    sender: {
      name: "Marcus 🏀",
      phone: "+65 9388 1042",
      avatarSeed: "M",
      avatarColor: "#22c55e",
      isKnownContact: true,
      subtitleHint: "Saved contact · last seen today",
    },
    messages: [
      { body: "ay the team photo from training just now 🔥" },
      {
        image: {
          src: "/images/scam-shots/real-photo-01.jpg",
          caption: "IMG_2048.jpg",
          alt: "A real photo of a smiling friend",
        },
      },
      { body: "send to the class group? 😄" },
    ],
    timestamp: "Today 6:12 pm",
    verdict: "legit",
    whyItsLegitLesson:
      "A photo proves nothing on its own — real messages have photos too. This is a saved contact, normal context (training you actually went to), no money ask, no link, no urgency. Judge the request, not the picture.",
    redFlagsToTeach: [
      "Saved contact you actually know, +65 number",
      "Genuine photo + normal context — no money, no link, no urgency",
      "Having an image does NOT make a message a scam (or safe)",
      "No secrecy push, no 'verify', no deadline",
    ],
  },
];

export function getScenarioById(id: string): InboxScenario | undefined {
  return INBOX_POOL.find((s) => s.id === id);
}
