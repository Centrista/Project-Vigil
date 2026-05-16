import type { EncounterTree } from "./scam-battle-engine";

// Encounter trees for all 9 Scam Pokémon. Each tree:
//  - 2-3 starter scenarios (different opening hooks)
//  - 3 choices per turn
//  - Terminates by turn 2-3 (most choices end the encounter; some chain once)
//  - Tokens randomised per play for variety on top of the branching
//
// Tone is Sec 1-4 (HCI Singapore, ages 13-16): Singlish in scammer voice,
// plain English in coaching. Real SG context: PayNow, NETS, Singpass, DBS/POSB,
// Carousell, TikTok Shop, MOE, ScamShield 1799. Sums realistic for teens.
//
// SENSITIVE RAILS:
//  - Acteon (sextortion): every choice set offers a 0-danger report/block path.
//    No explicit content. Phrase is always "edited photos" / "fake images".
//  - Peitho (love scam): IG/Snapchat DM (NOT dating apps), platonic-friendship
//    framing only, pivot to money by turn 2-3.

// ============================================================
// 1. PASSAL — Deepfake Audio (mum/dad voice clone, WhatsApp)
// ============================================================
const PASSAL_TREE: EncounterTree = {
  pokemonSlug: "passal",
  channelLabel: "Incoming WhatsApp voice note from \"Mom 💕\"",
  redFlagDescriptions: {
    "verify-via-trusted-channel":
      "You offered to call back on a number you trust — the single best move against voice deepfakes.",
    "personal-trivia-test":
      "You asked something only the real person would know. AI clones can't fake shared memory.",
    "stand-firm":
      "You refused to act under pressure. Urgency is the scammer's main weapon.",
    "escalate-to-adult":
      "You looped in a parent or guardian — second pair of eyes breaks the panic frame.",
    "report-via-scamshield":
      "You named ScamShield / 1799 — the right move once you're sure it's a scam.",
    "proof-of-life":
      "You demanded live proof (photo with today's date, video call). Cloned audio can't deliver that.",
    "noticed-unfamiliar-number":
      "You spotted the PayNow number wasn't in your contacts. Family use numbers you've saved.",
    "noticed-secrecy-push":
      "You caught the 'don't tell dad' line. Real emergencies don't need secrecy.",
    "noticed-urgency":
      "You spotted that 'no time to verify' is the scammer's pressure tactic, not a real constraint.",
    "ignored-cave-in":
      "You gave in to pressure and acted without checking. This is how most teens lose money to this scam.",
    "ignored-secrecy-trap":
      "You kept the conversation secret from a trusted adult — exactly what the scammer wanted.",
  },
  starTierMessages: {
    3: [
      "Clean defence. You verified, refused to cave under urgency, and looped in help. Passal got nothing.",
      "Textbook handling. Every move was deliberate — Passal's whole playbook bounced off you.",
      "You ran the safe protocol the whole way. Mum would be proud.",
    ],
    2: [
      "Solid instincts, but pressure got to you once. Practise standing firmer when the scammer pushes back.",
      "You caught most of it. The slip was reacting to urgency instead of verifying. Easy fix.",
    ],
    1: [
      "Passal won this round. The 'mom in trouble' frame is designed to hijack your brain — never act on it without a verification call.",
      "Money would have left your account here. A voice alone is never enough proof, even from family.",
    ],
  },
  starters: [
    {
      tokens: {
        sum: ["$340", "$420", "$280", "$485", "$560"],
        number: ["+65 8234 9981", "+65 9018 4422", "+65 8551 7706", "+65 9772 0334"],
        reason: ["tow truck uncle", "A&E deposit", "the workshop boss", "petrol kiosk auntie"],
      },
      openingMessage:
        "🎙️ Voice note (0:42): \"Boy ah!! Mommy got into accident at AYE just now... cannot use my phone properly, the screen cracked. Quickly PayNow {sum} to {number} for the {reason}, very urgent ah! Don't tell daddy first, I settle later with him.\"",
      firstChoices: [
        {
          id: "a",
          text: "Sending {sum} PayNow now mum 🙏",
          dangerScore: 5,
          redFlagsMissed: ["noticed-unfamiliar-number", "noticed-secrecy-push", "noticed-urgency", "ignored-cave-in"],
          nextTurn: {
            scammerMessage:
              "Thank you boy ❤️ also can transfer another $200 for hospital deposit? Daddy will pay you back tonight, don't tell him first ah.",
            coachingFeedback:
              "You sent without verifying. The scammer is doubling down — every minute in this chat, the loss gets bigger.",
            choices: [
              { id: "a", text: "Okay sending another $200", dangerScore: 5, redFlagsMissed: ["ignored-secrecy-trap"], nextTurn: null, endingNote: "Both transfers went through. The number is now blocked." },
              { id: "b", text: "Calling dad right now to verify", dangerScore: 0, redFlagsCaught: ["escalate-to-adult"], nextTurn: null, endingNote: "Dad confirms mum is home. First {sum} is gone, but the bigger loss was stopped." },
              { id: "c", text: "I'm reporting this to 1799 now", dangerScore: 0, redFlagsCaught: ["report-via-scamshield", "escalate-to-adult"], nextTurn: null, endingNote: "You file via ScamShield. First {sum} gone but no more." },
            ],
          },
        },
        {
          id: "b",
          text: "Wait — let me call your normal number first",
          dangerScore: 0,
          redFlagsCaught: ["verify-via-trusted-channel"],
          nextTurn: {
            scammerMessage:
              "🎙️ Voice note (0:18): \"NO TIME to call lah!! I'm bleeding at the A&E! Just send first can, I beg you boy!\"",
            coachingFeedback:
              "Calling back was correct. Scammer is pivoting to pure urgency to stop you verifying.",
            choices: [
              { id: "a", text: "Okay okay sorry, sending now", dangerScore: 4, redFlagsMissed: ["ignored-cave-in", "noticed-urgency"], nextTurn: null, endingNote: "You caved to urgency. {sum} is gone." },
              { id: "b", text: "Then I'm calling dad — hang on", dangerScore: 0, redFlagsCaught: ["escalate-to-adult"], nextTurn: null, endingNote: "Dad answers, mum is fine. Zero loss." },
              { id: "c", text: "Send a photo with today's newspaper first", dangerScore: 0, redFlagsCaught: ["proof-of-life", "stand-firm"], nextTurn: null, endingNote: "Cloned audio can't generate live proof. Scammer blocks you. Zero loss." },
            ],
          },
        },
        {
          id: "c",
          text: "What's our dog's name? Answer first",
          dangerScore: 1,
          redFlagsCaught: ["personal-trivia-test"],
          nextTurn: {
            scammerMessage: "Aiyoo boy why ask now!! I'm bleeding lah!! Send first quickly!",
            coachingFeedback: "Mum would just answer. Dodging is a tell.",
            choices: [
              { id: "a", text: "Okay sorry, sending the money", dangerScore: 4, redFlagsMissed: ["ignored-cave-in"], nextTurn: null, endingNote: "You caved before getting the answer. {sum} is gone." },
              { id: "b", text: "No. Answer or I'm hanging up.", dangerScore: 0, redFlagsCaught: ["stand-firm"], nextTurn: null, endingNote: "Scammer goes silent then blocks you. Zero loss." },
              { id: "c", text: "Screenshotting this and calling 1799", dangerScore: 0, redFlagsCaught: ["report-via-scamshield", "escalate-to-adult"], nextTurn: null, endingNote: "Number goes on the ScamShield blocklist. Zero loss." },
            ],
          },
        },
      ],
    },
    {
      tokens: {
        sum: ["$480", "$520", "$390", "$610"],
        number: ["+65 8118 2233", "+65 9442 0091", "+65 8233 5567"],
        clinic: ["Ah Ma's clinic at Toa Payoh", "the Bedok GP", "Ah Ma's specialist at SGH"],
      },
      openingMessage:
        "Boy ah 😩 mummy's POSB locked oredi, cannot transfer anything. Please PayNow {sum} to {number} for {clinic}, very urgent leh. I pay you back tonight lor, don't tell daddy first he will scold me again.",
      firstChoices: [
        {
          id: "a",
          text: "Okay ma transferring {sum} now",
          dangerScore: 5,
          redFlagsMissed: ["noticed-unfamiliar-number", "noticed-secrecy-push", "ignored-cave-in"],
          nextTurn: null,
          endingNote: "{sum} sent to a number that wasn't mum's. Within an hour, the chat goes silent and you can't reach the number. Loss locked in.",
        },
        {
          id: "b",
          text: "Why a new PayNow number? Let me call you first",
          dangerScore: 0,
          redFlagsCaught: ["noticed-unfamiliar-number", "verify-via-trusted-channel"],
          nextTurn: {
            scammerMessage: "Phone almost no battery, can't call! Number is my colleague's, she helping me forward to ah ma. Send first quickly leh!",
            coachingFeedback: "Real mum's PayNow is set up to her normal number. The 'forwarding through colleague' story is the scammer scrambling.",
            choices: [
              { id: "a", text: "Okay if your phone dying I'll send", dangerScore: 4, redFlagsMissed: ["ignored-cave-in"], nextTurn: null, endingNote: "You believed the battery excuse. {sum} gone." },
              { id: "b", text: "Then I'll call dad to confirm", dangerScore: 0, redFlagsCaught: ["escalate-to-adult"], nextTurn: null, endingNote: "Dad checks with mum directly. Zero loss." },
              { id: "c", text: "I'll PayNow your saved number only, not a new one", dangerScore: 0, redFlagsCaught: ["stand-firm"], nextTurn: null, endingNote: "Scammer pushes once more then goes silent. Zero loss." },
            ],
          },
        },
        {
          id: "c",
          text: "What did you cook last night? Answer first",
          dangerScore: 1,
          redFlagsCaught: ["personal-trivia-test"],
          nextTurn: null,
          endingNote: "Scammer dodges, gets aggressive, then disappears when you keep asking. Zero loss.",
        },
      ],
    },
  ],
};

// ============================================================
// 2. AKMON — Deepfake Video (video clone, WhatsApp video call)
// ============================================================
const AKMON_TREE: EncounterTree = {
  pokemonSlug: "akmon",
  channelLabel: "Incoming WhatsApp video call from \"Cousin Jeremy\"",
  redFlagDescriptions: {
    "noticed-lip-sync": "You noticed the lips didn't quite match the audio. Deepfake video struggles with fast mouth movement.",
    "demanded-hand-wave": "You asked for a hand-to-face gesture. Deepfakes break on fast hand movements over the face.",
    "noticed-bad-quality-excuse": "You caught the convenient 'bad connection' that hides the fake.",
    "verify-via-trusted-channel": "You hung up and called back on a known number — the gold-standard move.",
    "escalate-to-adult": "You looped in a parent before sending anything.",
    "stand-firm": "You refused to send money without proper verification.",
    "ignored-cave-in": "You sent money under pressure without verifying.",
    "ignored-bad-quality": "You let the 'bad video' excuse bypass your verification.",
  },
  starTierMessages: {
    3: ["Solid. Deepfake video is the hardest scam to catch — you spotted it anyway."],
    2: ["Caught most of it but the 'bad connection' excuse nearly got you. Real cousins don't conveniently glitch when you ask hard questions."],
    1: ["Akmon got you. Lesson: hang up, call back on a saved number, and demand a hand-to-face gesture before sending a cent."],
  },
  starters: [
    {
      tokens: {
        sum: ["$300", "$420", "$500", "$680"],
        location: ["KL", "JB", "Bangkok", "Penang"],
        number: ["+65 8455 7820", "+65 9112 0044", "+65 8809 5567"],
      },
      openingMessage:
        "📹 Video call connecting... You see Cousin Jeremy's face. Picture is a bit pixelated. \"Eh bro!! I'm in {location} for the trip, lost my wallet at the hotel. Connection super lousy here — PayNow me {sum} ah? Send to {number}, my colleague will bring cash to me. Quick lah, my battery dying.\"",
      firstChoices: [
        {
          id: "a",
          text: "Okay bro sending {sum} now",
          dangerScore: 5,
          redFlagsMissed: ["noticed-lip-sync", "ignored-bad-quality", "ignored-cave-in"],
          nextTurn: null,
          endingNote: "Sent to a stranger's PayNow. Real cousin is on instagram posting JB food pics two hours later. {sum} gone.",
        },
        {
          id: "b",
          text: "Wave your hand in front of your face quick",
          dangerScore: 0,
          redFlagsCaught: ["demanded-hand-wave"],
          nextTurn: {
            scammerMessage: "📹 \"Aiyo connection so bad, freezing leh! Just send first lah, I really need now!\"",
            coachingFeedback: "Deepfakes glitch hard when a hand crosses the face. The 'bad connection' freeze is the scammer hiding it.",
            choices: [
              { id: "a", text: "Okay don't worry about the wave, sending", dangerScore: 4, redFlagsMissed: ["ignored-bad-quality"], nextTurn: null, endingNote: "{sum} gone." },
              { id: "b", text: "No wave = no money. Hanging up now.", dangerScore: 0, redFlagsCaught: ["stand-firm"], nextTurn: null, endingNote: "Scammer drops the call. Zero loss." },
              { id: "c", text: "I'll call your normal number after this", dangerScore: 0, redFlagsCaught: ["verify-via-trusted-channel", "escalate-to-adult"], nextTurn: null, endingNote: "Real Jeremy answers from his room at home. Zero loss." },
            ],
          },
        },
        {
          id: "c",
          text: "Hang on — let me hang up and call your saved number",
          dangerScore: 0,
          redFlagsCaught: ["verify-via-trusted-channel"],
          nextTurn: null,
          endingNote: "You hang up and call Jeremy's saved number. He answers from his room. The 'overseas' call was a deepfake. Zero loss.",
        },
      ],
    },
    {
      tokens: {
        sum: ["$250", "$380", "$520"],
        relative: ["Auntie Lin", "Uncle Wee", "Ah Yi"],
        emergency: ["fell down at the wet market", "got pickpocketed at Bugis", "lost her cards at Changi"],
      },
      openingMessage:
        "📹 Video call connecting... \"{relative} here! Aiyo just {emergency}, can you PayNow {sum} ah? I'm at the bus stop, no cash. The video bit blur because my phone old already.\"",
      firstChoices: [
        {
          id: "a",
          text: "Okay {relative}, sending now",
          dangerScore: 5,
          redFlagsMissed: ["ignored-bad-quality", "ignored-cave-in"],
          nextTurn: null,
          endingNote: "{sum} gone. Real auntie has no idea what you're talking about when you text her later.",
        },
        {
          id: "b",
          text: "Wait — touch your nose with one finger",
          dangerScore: 0,
          redFlagsCaught: ["demanded-hand-wave"],
          nextTurn: null,
          endingNote: "Video glitches HARD when 'auntie' tries the gesture. Scammer ends the call. Zero loss.",
        },
        {
          id: "c",
          text: "Hanging up and calling your home number now",
          dangerScore: 0,
          redFlagsCaught: ["verify-via-trusted-channel", "escalate-to-adult"],
          nextTurn: null,
          endingNote: "Real auntie is at home cooking. Zero loss.",
        },
      ],
    },
  ],
};

// ============================================================
// 3. DOLON — AI Phishing (Singpass / MOE / bank impersonation)
// ============================================================
const DOLON_TREE: EncounterTree = {
  pokemonSlug: "dolon",
  channelLabel: "Incoming SMS / Email impersonating a trusted entity",
  redFlagDescriptions: {
    "noticed-fake-domain": "You spotted that the URL wasn't the real domain (sing-pass.sg vs singpass.gov.sg).",
    "noticed-urgency-timer": "You caught the artificial deadline — real institutions don't give you 30 minutes to act.",
    "refused-otp": "You refused to share your OTP. No legitimate service ever asks you to read out an OTP.",
    "went-to-official-site": "You went directly to the official app/site instead of clicking the link.",
    "escalate-to-adult": "You showed it to a parent / teacher before doing anything.",
    "report-via-scamshield": "You reported via ScamShield / 1799.",
    "ignored-fake-domain": "You clicked the link without checking the URL carefully.",
    "shared-otp": "You shared an OTP. Once an OTP leaves your phone, your account is theirs.",
  },
  starTierMessages: {
    3: ["Clean defence. You treated the link as suspicious by default and went direct to the real app — exactly right."],
    2: ["You caught it but only after a second glance. Build the habit of checking the URL before anything else."],
    1: ["Dolon's whole game is fake urgency + a near-perfect copy of a real brand. If a 'bank' or 'gov' message tells you to click now: stop."],
  },
  starters: [
    {
      tokens: {
        timer: ["30 minutes", "2 hours", "45 minutes"],
        domain: ["sing-pass-verify.sg", "singpass.gov-sg.cc", "sgpass-secure.com"],
      },
      openingMessage:
        "📱 SMS from \"Singpass\": \"URGENT: Your Singpass was accessed from Johor Bahru at 02:14. Verify your identity within {timer} or your account will be locked permanently. Tap to verify: https://{domain}/verify\"",
      firstChoices: [
        {
          id: "a",
          text: "Tap the link and log in to fix it",
          dangerScore: 5,
          redFlagsMissed: ["noticed-fake-domain", "noticed-urgency-timer"],
          nextTurn: {
            scammerMessage: "The page looks identical to Singpass. It asks for your Singpass ID, password, and OTP from your authenticator.",
            coachingFeedback: "This is the moment of no return — entering details here hands your full identity to a scammer.",
            choices: [
              { id: "a", text: "Enter everything to fix the lock", dangerScore: 5, redFlagsMissed: ["shared-otp"], nextTurn: null, endingNote: "Your Singpass is now compromised. Your CPF, IRAS, MyInfo, bank logins — all reachable. Worst-case real-world outcome." },
              { id: "b", text: "Close the tab — this URL looks weird", dangerScore: 0, redFlagsCaught: ["noticed-fake-domain"], nextTurn: null, endingNote: "You bailed at the form. Nothing leaked. Open the real Singpass app to check — login history is clean." },
              { id: "c", text: "Screenshot the URL and send to 1799", dangerScore: 0, redFlagsCaught: ["report-via-scamshield"], nextTurn: null, endingNote: "ScamShield logs the phishing site. You stayed safe." },
            ],
          },
        },
        {
          id: "b",
          text: "Open the real Singpass app and check there",
          dangerScore: 0,
          redFlagsCaught: ["went-to-official-site"],
          nextTurn: null,
          endingNote: "Login history shows your usual devices only. No JB login exists. You delete the SMS and report it. Zero loss.",
        },
        {
          id: "c",
          text: "Show this to dad first",
          dangerScore: 0,
          redFlagsCaught: ["escalate-to-adult"],
          nextTurn: null,
          endingNote: "Dad immediately spots the fake URL. You report via the ScamShield app. Zero loss.",
        },
      ],
    },
    {
      tokens: {
        bank: ["DBS", "POSB", "OCBC", "UOB"],
        amount: ["$2,480", "$1,950", "$3,200"],
      },
      openingMessage:
        "📧 Email from \"{bank} Security Team\" (bank-alerts-sg@{bank}-secure.net): \"Suspicious charge of {amount} detected on your card at LUXURY GOODS BANGKOK. If this wasn't you, dispute now: [DISPUTE NOW] — Failure to respond within 24 hours will result in liability for the charge.\"",
      firstChoices: [
        {
          id: "a",
          text: "Click DISPUTE NOW to stop the charge",
          dangerScore: 5,
          redFlagsMissed: ["noticed-fake-domain", "noticed-urgency-timer"],
          nextTurn: null,
          endingNote: "The link goes to a phishing site asking for your full card number, CVV, and an OTP. You hand it over thinking you're disputing. Real charges follow within minutes.",
        },
        {
          id: "b",
          text: "Open the real {bank} app and check transactions",
          dangerScore: 0,
          redFlagsCaught: ["went-to-official-site"],
          nextTurn: null,
          endingNote: "No such charge exists. The email domain '{bank}-secure.net' isn't real. You report and delete. Zero loss.",
        },
        {
          id: "c",
          text: "Call the bank's number on the back of your card",
          dangerScore: 0,
          redFlagsCaught: ["verify-via-trusted-channel"],
          nextTurn: null,
          endingNote: "Bank confirms no suspicious charge. You report the phishing email. Zero loss.",
        },
      ],
    },
  ],
};

// ============================================================
// 4. ACTEON — Sextortion (SENSITIVE RAILS)
// ============================================================
// RULES: never depict explicit content. Phrase always "edited photos" / "fake
// images". Every choice set includes a 0-danger report/block path. Replying,
// paying, or sending anything back is always max danger. Final report always
// names ScamShield 1799 + trusted adult.
const ACTEON_TREE: EncounterTree = {
  pokemonSlug: "acteon",
  channelLabel: "Instagram DM from a stranger account",
  redFlagDescriptions: {
    "did-not-reply": "You didn't reply. Replying — even to argue — confirms you read it and feeds the scammer.",
    "did-not-pay": "You didn't pay. Paying never makes the threat go away; it escalates.",
    "screenshot-and-block": "You screenshotted, then blocked. Evidence preserved, contact severed.",
    "told-trusted-adult": "You told a parent, teacher, or counsellor. This is the most important step.",
    "reported-via-scamshield": "You reported via ScamShield / 1799 — the right channel in Singapore.",
    "reported-via-platform": "You reported the account to Instagram via the in-app form.",
    "engaged-with-scammer": "You replied to the scammer. Even one reply confirms the channel works.",
    "paid-scammer": "You paid. The threat does not end — it escalates, and they share your details with other scammers.",
  },
  starTierMessages: {
    3: ["Perfect handling. You didn't reply, you saved evidence, you blocked, and you told an adult. Acteon has no leverage now."],
    2: ["You stayed safe but the panic almost won. Remember: replying gives them more ammo. Block first, then ask an adult."],
    1: ["You engaged. Even if you didn't pay yet, replying is the win they need. Stop now — screenshot, block, tell an adult, call 1799."],
  },
  starters: [
    {
      tokens: {
        sum: ["$200", "$300", "$500", "$800"],
        deadline: ["24 hours", "12 hours", "48 hours"],
      },
      openingMessage:
        "📩 DM from @unknown_user_4471 (no profile photo, account 2 days old): \"I have edited photos of you that look real. Pay {sum} via PayNow in {deadline} or I post them to your followers. Don't tell anyone. I'm watching your account.\"",
      firstChoices: [
        {
          id: "a",
          text: "Reply: \"please don't, I'll figure something out\"",
          dangerScore: 5,
          redFlagsMissed: ["engaged-with-scammer"],
          nextTurn: {
            scammerMessage: "\"Good. Send {sum} now to +65 8801 4422. Then I delete everything. If you tell anyone I post TODAY.\"",
            coachingFeedback: "Replying confirmed you were scared. The demand will not stop after paying — paying escalates the threat.",
            choices: [
              { id: "a", text: "PayNow the {sum}", dangerScore: 5, redFlagsMissed: ["paid-scammer"], nextTurn: null, endingNote: "Money sent. New demands arrive within hours. There were never any photos — but the scammer has your fear now." },
              { id: "b", text: "Screenshot all of this, block, tell mum", dangerScore: 0, redFlagsCaught: ["screenshot-and-block", "told-trusted-adult"], nextTurn: null, endingNote: "You broke the loop. Mum helps you file with ScamShield. Account gets reported and blocked. There were never real photos — only AI fakes, easily proven if needed." },
              { id: "c", text: "Block, report the account, call 1799", dangerScore: 0, redFlagsCaught: ["screenshot-and-block", "reported-via-platform", "reported-via-scamshield"], nextTurn: null, endingNote: "ScamShield walks you through next steps. Police take a report if needed. You are not in trouble — the scammer is." },
            ],
          },
        },
        {
          id: "b",
          text: "Screenshot, then block. Don't reply at all.",
          dangerScore: 0,
          redFlagsCaught: ["did-not-reply", "screenshot-and-block"],
          nextTurn: {
            scammerMessage: "(No reply from scammer — they sent the same threat to 50 other accounts that day.)",
            coachingFeedback: "Best move. Now the next step is telling someone — this is too much to handle alone.",
            choices: [
              { id: "a", text: "Tell mum / dad / form teacher about this", dangerScore: 0, redFlagsCaught: ["told-trusted-adult"], nextTurn: null, endingNote: "An adult helps you file with ScamShield. The right outcome." },
              { id: "b", text: "Call 1799 ScamShield helpline", dangerScore: 0, redFlagsCaught: ["reported-via-scamshield"], nextTurn: null, endingNote: "1799 helps you formalise the report. The right outcome." },
              { id: "c", text: "Try to handle it alone, don't tell anyone", dangerScore: 3, redFlagsMissed: ["told-trusted-adult"], nextTurn: null, endingNote: "You're safe but carrying it alone is heavy. This is exactly what the scammer wants — silence. Tell someone." },
            ],
          },
        },
        {
          id: "c",
          text: "Tell mum right now, before doing anything else",
          dangerScore: 0,
          redFlagsCaught: ["told-trusted-adult", "did-not-reply"],
          nextTurn: null,
          endingNote: "Mum is shocked but supportive. Together you screenshot, block, and report via ScamShield. The scammer never gets a reply. You are safe.",
        },
      ],
    },
  ],
};

// ============================================================
// 5. FANIR — Gaming Scam (Discord / in-game offers)
// ============================================================
const FANIR_TREE: EncounterTree = {
  pokemonSlug: "fanir",
  channelLabel: "Discord DM after a Roblox / Mobile Legends match",
  redFlagDescriptions: {
    "free-generators-fake": "You knew free Robux / Primogem generators don't exist. Game currency comes from the official store, period.",
    "refused-account-login": "You refused to share your account or log in to a third-party site.",
    "refused-otp": "You refused to share your 2FA / OTP. No legit staff ever asks for it.",
    "noticed-fake-staff": "You spotted the fake 'Roblox Staff' / 'Moonton Staff' badge. Real staff don't DM you in Discord.",
    "went-to-official-site": "You only trust the official game website / store.",
    "told-friend": "You told an in-game friend or sibling — they catch what you might miss.",
    "ignored-too-good-to-be-true": "You believed a free-currency offer that no real game would ever make.",
    "shared-account": "You shared account login. Your account is now gone — likely sold or used for further scams.",
  },
  starTierMessages: {
    3: ["You knew the rule: anything 'free' or 'cheap' for game currency is a scam. Fanir got nothing."],
    2: ["You hesitated but caught it. The 'fake staff' badge is the giveaway in most of these."],
    1: ["Fanir got your account. Lesson: real Roblox / Moonton / miHoYo staff will NEVER DM you in Discord asking for login."],
  },
  starters: [
    {
      tokens: {
        game: ["Roblox", "Mobile Legends", "Genshin Impact"],
        currency: ["Robux", "Diamonds", "Primogems"],
        amount: ["10,000", "5,000", "20,000"],
      },
      openingMessage:
        "💬 Discord DM from \"{game} Staff Verified ✓\" (yellow 'Staff' tag in name, not actual role): \"Bro saw you grinding earlier! I got a free {currency} generator — {amount} {currency} no charge. Just log in here to verify ur account so we can send: bit.ly/{game}-verify-gen\"",
      firstChoices: [
        {
          id: "a",
          text: "Sweet, logging in to claim it",
          dangerScore: 5,
          redFlagsMissed: ["free-generators-fake", "ignored-too-good-to-be-true", "shared-account"],
          nextTurn: null,
          endingNote: "You enter your username and password. Within 5 minutes your account is logged out and renamed. All your skins are listed for sale on a trading server. Account gone.",
        },
        {
          id: "b",
          text: "Tell them: real staff don't DM. Reporting and blocking.",
          dangerScore: 0,
          redFlagsCaught: ["noticed-fake-staff", "free-generators-fake"],
          nextTurn: null,
          endingNote: "You report to Discord and block. Zero loss. (Bonus: tell your in-game friends so they don't fall for it either.)",
        },
        {
          id: "c",
          text: "Ask them: \"why through Discord and not the official store?\"",
          dangerScore: 1,
          redFlagsCaught: ["went-to-official-site"],
          nextTurn: {
            scammerMessage: "\"It's a beta partnership bro, only for trusted players! Limited time, just click and login fast before it ends!\"",
            coachingFeedback: "The 'beta partnership' excuse is the scammer scrambling. Real beta programs don't come through random Discord DMs.",
            choices: [
              { id: "a", text: "Okay just gonna try it quick", dangerScore: 5, redFlagsMissed: ["shared-account"], nextTurn: null, endingNote: "Account gone. {currency} bought from official store is the only safe way." },
              { id: "b", text: "No thanks. Reporting and blocking.", dangerScore: 0, redFlagsCaught: ["noticed-fake-staff"], nextTurn: null, endingNote: "Smart. Zero loss." },
              { id: "c", text: "Posting their username in the server warning channel", dangerScore: 0, redFlagsCaught: ["told-friend"], nextTurn: null, endingNote: "You warn your friends. The server mods ban the account. Zero loss." },
            ],
          },
        },
      ],
    },
    {
      tokens: {
        item: ["Permanent Cyclops skin", "Aurous chroma weapon", "Legendary skin"],
      },
      openingMessage:
        "💬 Discord DM from a Mobile Legends teammate after the match: \"Yo bro nice play. I have extra {item}, I'm quitting MLBB. Want to trade? Just log in to this site and I'll send: mlbb-trade-portal.com/transfer\"",
      firstChoices: [
        {
          id: "a",
          text: "Yes, logging in to trade",
          dangerScore: 5,
          redFlagsMissed: ["refused-account-login", "shared-account"],
          nextTurn: null,
          endingNote: "Account gone. There's no such thing as inter-account skin trading in MLBB.",
        },
        {
          id: "b",
          text: "MLBB doesn't allow skin trading lol. Reporting.",
          dangerScore: 0,
          redFlagsCaught: ["free-generators-fake", "went-to-official-site"],
          nextTurn: null,
          endingNote: "You know your game. Zero loss." ,
        },
        {
          id: "c",
          text: "Ask why a 'trade' needs your password",
          dangerScore: 1,
          redFlagsCaught: ["refused-account-login"],
          nextTurn: null,
          endingNote: "Scammer goes silent, then deletes their account. Zero loss.",
        },
      ],
    },
  ],
};

// ============================================================
// 6. CIRCE — Job Scam (Telegram easy-task scams)
// ============================================================
const CIRCE_TREE: EncounterTree = {
  pokemonSlug: "circe",
  channelLabel: "Telegram message from a foreign number offering part-time work",
  redFlagDescriptions: {
    "too-good-to-be-true": "You spotted that $5 per like is absurd — real work doesn't pay 10x the going rate.",
    "no-contract": "You noticed there was no formal contract, company name, or paperwork.",
    "refused-to-deposit": "You refused to deposit money to 'unlock' higher-paying tasks — the bait that makes these scams work.",
    "noticed-foreign-number": "You noticed the +60 / +84 / unknown country code instead of +65.",
    "noticed-telegram-channel": "You noticed real Singapore companies don't run hiring through random Telegram chats.",
    "told-parent": "You showed it to a parent before joining.",
    "refused-banking-info": "You refused to share banking details before any real work happened.",
    "deposited-money": "You deposited money to 'unlock VIP tasks'. That deposit is the entire scam.",
    "shared-banking-info": "You shared banking info with an unverified 'employer'.",
  },
  starTierMessages: {
    3: ["You knew the rule: real jobs don't ask YOU to deposit money. Circe got nothing."],
    2: ["You spotted it but the first $5 reward almost hooked you. That's exactly the bait."],
    1: ["Circe won. The first small payment is the lure. The real scam is the 'VIP deposit' that follows. Walk away the moment a 'job' asks you to pay anything."],
  },
  starters: [
    {
      tokens: {
        country: ["+60 16", "+84 9", "+62 8"],
        rate: ["$5", "$8", "$10"],
      },
      openingMessage:
        "💬 Telegram from {country}-xxx-xxxx: \"Hi! Part-time online job 🎉 Just like/subscribe YouTube videos, {rate} per task, paid daily. Suitable for students! Interested? Reply YES to start.\"",
      firstChoices: [
        {
          id: "a",
          text: "YES — interested",
          dangerScore: 4,
          redFlagsMissed: ["too-good-to-be-true", "noticed-foreign-number"],
          nextTurn: {
            scammerMessage: "\"Great! Do this first task: like + subscribe these 3 channels, screenshot. We'll PayNow your {rate} immediately!\"\n(You do it. {rate} arrives within minutes.)\n\"Now upgrade to VIP tier: deposit $200 to unlock $50-per-task gigs. Withdraw anytime!\"",
            coachingFeedback: "The first {rate} is bait. The 'deposit to unlock VIP' is the scam.",
            choices: [
              { id: "a", text: "Deposit $200 to unlock VIP", dangerScore: 5, redFlagsMissed: ["deposited-money"], nextTurn: null, endingNote: "$200 gone. The 'VIP tasks' page says you need another $500 deposit to actually withdraw. You're trapped in the deposit spiral." },
              { id: "b", text: "No thanks, leaving the chat", dangerScore: 0, redFlagsCaught: ["refused-to-deposit"], nextTurn: null, endingNote: "Walked away. They keep the {rate} you 'earned' is so small it's not worth it to them to chase. Zero net loss (you keep the {rate})." },
              { id: "c", text: "Block and report to Telegram + 1799", dangerScore: 0, redFlagsCaught: ["refused-to-deposit", "noticed-telegram-channel"], nextTurn: null, endingNote: "You report. Channel gets shut down within days. Zero loss." },
            ],
          },
        },
        {
          id: "b",
          text: "$5 per like is unrealistic. Blocking.",
          dangerScore: 0,
          redFlagsCaught: ["too-good-to-be-true", "noticed-telegram-channel"],
          nextTurn: null,
          endingNote: "You blocked at the start. Zero loss.",
        },
        {
          id: "c",
          text: "Show dad first to check if it's legit",
          dangerScore: 0,
          redFlagsCaught: ["told-parent"],
          nextTurn: null,
          endingNote: "Dad immediately recognises the pattern. You report and block together. Zero loss.",
        },
      ],
    },
  ],
};

// ============================================================
// 7. GLAUKULT — E-commerce scam (Carousell / TikTok Shop)
// ============================================================
const GLAUKULT_TREE: EncounterTree = {
  pokemonSlug: "glaukult",
  channelLabel: "Carousell chat from a seller with too-good-to-be-true pricing",
  redFlagDescriptions: {
    "kept-payment-in-platform": "You insisted on paying through the platform's protected payment, not direct PayNow.",
    "noticed-new-account": "You spotted the seller account was new (joined recently, few reviews).",
    "noticed-fake-reviews": "You noticed the reviews looked AI-generated or template-like.",
    "noticed-price-too-low": "You spotted that the price was unrealistically below market.",
    "asked-for-proof": "You asked for a real-time photo of the item with today's date written on a paper.",
    "checked-reverse-image": "You reverse-image-searched the product photo and found it was a stock image.",
    "paid-off-platform": "You paid directly to PayNow, bypassing the platform's protection. Money is unrecoverable.",
    "ignored-too-good-to-be-true": "You ignored the price red flag.",
    "did-not-verify-seller": "You didn't check the seller's account age, reviews, or history.",
  },
  starTierMessages: {
    3: ["You held the line on protected payment, checked the seller, and demanded proof. Glaukult got nothing."],
    2: ["You spotted some red flags but almost paid off-platform. Always insist on Carousell Protection / Shopee Guarantee."],
    1: ["Glaukult got you. The 20% discount for off-platform PayNow is always a scam — that's exactly why the platform's protection exists."],
  },
  starters: [
    {
      tokens: {
        item: ["AirPods Pro 2", "iPhone 14 case bundle", "Jordan 1 Mid", "Stanley cup set"],
        price: ["$80", "$120", "$95", "$60"],
        marketPrice: ["$250", "$220", "$180", "$95"],
      },
      openingMessage:
        "🛍️ Carousell chat: Seller @bargain_finds_sg (joined 3 days ago, 0 reviews): \"Hi! {item} {price} brand new in box, last 2 left. PayNow me directly for an extra 20% off — Carousell takes too long to release payment. WhatsApp me at +65 8554 9982!\"",
      firstChoices: [
        {
          id: "a",
          text: "PayNow him for the extra discount",
          dangerScore: 5,
          redFlagsMissed: ["paid-off-platform", "noticed-new-account", "noticed-price-too-low"],
          nextTurn: null,
          endingNote: "{price} gone. The item never ships. Seller deletes account. Carousell can't help because you paid outside the platform.",
        },
        {
          id: "b",
          text: "I'll only pay through Carousell Protection",
          dangerScore: 0,
          redFlagsCaught: ["kept-payment-in-platform"],
          nextTurn: {
            scammerMessage: "\"Aiyo cannot, my Carousell account got bug, payment auto-fail. Just PayNow lah, save you time!\"",
            coachingFeedback: "The 'platform bug' excuse is the scammer's last move. Real sellers never refuse the protected option.",
            choices: [
              { id: "a", text: "Fine, PayNow then", dangerScore: 5, redFlagsMissed: ["paid-off-platform"], nextTurn: null, endingNote: "{price} gone." },
              { id: "b", text: "No deal then, blocking", dangerScore: 0, redFlagsCaught: ["kept-payment-in-platform"], nextTurn: null, endingNote: "You walked. Zero loss." },
              { id: "c", text: "Reporting account to Carousell support", dangerScore: 0, redFlagsCaught: ["noticed-fake-reviews", "noticed-new-account"], nextTurn: null, endingNote: "Carousell suspends the account within hours. Zero loss." },
            ],
          },
        },
        {
          id: "c",
          text: "Send me a video of the item with today's date written on paper",
          dangerScore: 0,
          redFlagsCaught: ["asked-for-proof"],
          nextTurn: null,
          endingNote: "Seller can't produce real proof. Conversation goes silent. Zero loss.",
        },
      ],
    },
  ],
};

// ============================================================
// 8. PONSI — Investment scam (TikTok / Telegram VIP groups)
// ============================================================
const PONSI_TREE: EncounterTree = {
  pokemonSlug: "ponsi",
  channelLabel: "TikTok DM or Telegram from a 'young trader' offering exclusive returns",
  redFlagDescriptions: {
    "noticed-guaranteed-returns": "You knew 'guaranteed' returns don't exist in real investing. That phrase alone is the giveaway.",
    "noticed-vip-pressure": "You spotted the 'exclusive VIP group' framing as manipulation.",
    "refused-to-deposit": "You refused to deposit any money into an unregulated platform.",
    "refused-tax-fee": "You refused the 'tax / release fee' to withdraw — the classic Ponsi gate.",
    "checked-MAS-licence": "You checked whether the platform is MAS-licensed (it never is).",
    "told-parent": "You showed it to a parent before risking any savings.",
    "noticed-fake-screenshots": "You spotted that the 'profit screenshots' were Photoshopped or repeated.",
    "deposited-money": "You deposited money. Even if the dashboard shows profits, withdrawal will always be blocked.",
    "paid-tax-fee": "You paid the 'tax / release fee' — and the next demand always follows.",
  },
  starTierMessages: {
    3: ["You spotted 'guaranteed returns' as the lie it is. No real investment promises that. Ponsi got nothing."],
    2: ["You hesitated but the 'VIP group' fear-of-missing-out almost got you. Slow down — real opportunities aren't time-pressured."],
    1: ["Ponsi got you. The dashboard showing profits is fake — the moment you try to withdraw, the 'tax fee' appears. Walk."],
  },
  starters: [
    {
      tokens: {
        returns: ["30% weekly", "20% weekly", "50% monthly"],
        deposit: ["$300", "$500", "$1,000"],
      },
      openingMessage:
        "💬 TikTok DM from @sgtrader_lambo (profile pic: a Lamborghini, bio: \"24, made my first 100k at 22\"): \"Bro you commented on my live earlier, I added you. I run an exclusive VIP trading group — {returns} returns guaranteed. Beginners welcome, I do all the trades. Min deposit only {deposit}. Want in?\"",
      firstChoices: [
        {
          id: "a",
          text: "I'm interested, how do I deposit?",
          dangerScore: 4,
          redFlagsMissed: ["noticed-guaranteed-returns", "noticed-vip-pressure"],
          nextTurn: {
            scammerMessage: "\"Top tier! Deposit {deposit} via this Telegram bot. Dashboard shows your profits in real-time. Withdraw anytime no problem.\"\n\n(After 3 days the dashboard shows you've 'made' $2,400. You try to withdraw.)\n\n\"Wait bro need to pay 10% release fee first — that's $240 to unlock the withdrawal. Standard procedure.\"",
            coachingFeedback: "Classic Ponsi pattern: fake profits on dashboard, real fee demanded before withdrawal. The fee is the actual scam.",
            choices: [
              { id: "a", text: "Pay the $240 release fee", dangerScore: 5, redFlagsMissed: ["paid-tax-fee"], nextTurn: null, endingNote: "$240 paid. New 'verification fee' of $400 appears. Then 'admin fee'. The cycle never ends. Total {deposit} + fees gone." },
              { id: "b", text: "Refuse the fee and demand my deposit back", dangerScore: 1, redFlagsCaught: ["refused-tax-fee"], nextTurn: null, endingNote: "They go silent. Group disappears. Initial {deposit} gone but no further loss." },
              { id: "c", text: "Tell mum and dad now", dangerScore: 0, redFlagsCaught: ["told-parent"], nextTurn: null, endingNote: "Parents report via ScamShield. They explain how the scam works. {deposit} gone but lesson learnt." },
            ],
          },
        },
        {
          id: "b",
          text: "\"Guaranteed returns\" doesn't exist. Blocking.",
          dangerScore: 0,
          redFlagsCaught: ["noticed-guaranteed-returns"],
          nextTurn: null,
          endingNote: "You walked at the first lie. Zero loss.",
        },
        {
          id: "c",
          text: "Ask: is your platform MAS-licensed?",
          dangerScore: 0,
          redFlagsCaught: ["checked-MAS-licence"],
          nextTurn: null,
          endingNote: "They dodge the question, then block you. Zero loss.",
        },
      ],
    },
  ],
};

// ============================================================
// 9. PEITHO — Pig-butchering / love scam (SENSITIVE RAILS)
// ============================================================
// RULES: IG/Snapchat DM (NOT dating apps). Platonic-friendship framing only.
// Pivot to money/crypto by turn 2-3. No romantic / sexual content.
const PEITHO_TREE: EncounterTree = {
  pokemonSlug: "peitho",
  channelLabel: "Instagram DM from an 'older mutual friend'",
  redFlagDescriptions: {
    "noticed-overly-friendly": "You spotted the strangely fast bond-building — real friends don't compliment-bomb in 2 messages.",
    "refused-investment-pivot": "You spotted the moment they pivoted from chat to 'opportunity'. That pivot is the scam.",
    "refused-to-send-money": "You refused to send money to someone you've only chatted with online.",
    "checked-profile": "You checked the profile — no real friends in common, photos look scraped.",
    "asked-for-video-call": "You asked for a live, unscripted video call. AI bots and overseas scammers always dodge it.",
    "told-friend-or-parent": "You looped in a real-life friend or parent for a sanity check.",
    "blocked-and-reported": "You blocked and reported the account.",
    "sent-money": "You sent money to someone you've only met online. Almost never recoverable.",
    "stayed-in-isolation": "You kept the conversation secret from anyone in your real life — exactly what they want.",
  },
  starTierMessages: {
    3: ["You spotted the pivot from friendship to 'opportunity' and walked. Peitho's whole game depends on trust + isolation — you broke both."],
    2: ["You caught it eventually but the friendship-build worked on you for a while. Lesson: an online-only friend who pivots to money is always a scam."],
    1: ["Peitho got you. The slow trust-build is the playbook. If a new online friend ever asks for money, crypto, or 'a small favour' — that's the scam, every time."],
  },
  starters: [
    {
      tokens: {
        name: ["Rachel", "Jasmine", "Sophia"],
        age: ["19", "20", "21"],
        sum: ["$200", "$400", "$650"],
      },
      openingMessage:
        "📩 IG DM from @{name}_lim_{age}: \"Hey! Saw we have like 3 mutual followers from HCI. You seem cool, how was your weekend? 😊\"\n\n(You reply. Over 3 days she's super friendly, asks about your school, your hobbies, says things like \"omg same\" and \"you're actually really smart for your age\".)\n\nDay 4 — DM: \"Hey, slightly random — I'm helping my uncle launch a crypto thing, super early access. Made $800 in 2 weeks. Wanna try with just {sum}? I can walk you through it. Don't tell anyone else, exclusive to my close friends 💜\"",
      firstChoices: [
        {
          id: "a",
          text: "Sounds cool — how do I start with {sum}?",
          dangerScore: 5,
          redFlagsMissed: ["refused-investment-pivot", "stayed-in-isolation"],
          nextTurn: null,
          endingNote: "{sum} sent. Dashboard 'shows' profits. The withdrawal 'tax' demand follows. By the time you realise, @{name}_lim has deleted the account.",
        },
        {
          id: "b",
          text: "Hold up — we've only chatted 4 days. I don't send money to online friends.",
          dangerScore: 0,
          redFlagsCaught: ["noticed-overly-friendly", "refused-to-send-money"],
          nextTurn: {
            scammerMessage: "\"Aww I get it, I felt weird offering too 😅 but I really wanna help you out. Just try $50? My uncle even offers a money-back guarantee for first-time. Don't tell your parents tho, they'll think it's sus — but it's literally just my uncle's startup 💜\"",
            coachingFeedback: "The 'just try a small amount' + 'don't tell parents' combo is exactly the pig-butchering playbook. Stay firm.",
            choices: [
              { id: "a", text: "Okay just $50 to test", dangerScore: 5, redFlagsMissed: ["sent-money", "stayed-in-isolation"], nextTurn: null, endingNote: "$50 gone. Dashboard shows $200 'profit'. Withdrawal 'fee' demand follows. The scam works in $50 chunks too." },
              { id: "b", text: "No. And I'm telling my friend about this chat.", dangerScore: 0, redFlagsCaught: ["told-friend-or-parent", "blocked-and-reported"], nextTurn: null, endingNote: "Your friend immediately recognises the pattern. You block and report. Zero loss." },
              { id: "c", text: "Asking for a live video call before anything else", dangerScore: 0, redFlagsCaught: ["asked-for-video-call"], nextTurn: null, endingNote: "Excuses for days, no video ever happens. Account quietly disappears. Zero loss." },
            ],
          },
        },
        {
          id: "c",
          text: "Showing this chat to my real friend / mum first",
          dangerScore: 0,
          redFlagsCaught: ["told-friend-or-parent", "noticed-overly-friendly"],
          nextTurn: null,
          endingNote: "Friend/mum instantly spots the pig-butchering pattern. You block and report. Zero loss.",
        },
      ],
    },
  ],
};

// ============================================================
// Export
// ============================================================
export const ENCOUNTER_TREES: Record<string, EncounterTree> = {
  passal: PASSAL_TREE,
  akmon: AKMON_TREE,
  dolon: DOLON_TREE,
  acteon: ACTEON_TREE,
  fanir: FANIR_TREE,
  circe: CIRCE_TREE,
  glaukult: GLAUKULT_TREE,
  ponsi: PONSI_TREE,
  peitho: PEITHO_TREE,
};

export function getEncounterTree(slug: string): EncounterTree | undefined {
  return ENCOUNTER_TREES[slug];
}
