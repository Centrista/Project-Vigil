export interface Story {
  slug: string;
  title: string;
  tag: string;
  tagColor: string;
  age: number;
  location: string;
  platform: string;
  lossAmount: string;
  outcome: "caught" | "escaped" | "partial";
  pullQuote: string;
  summary: string;
  story: string[];
  redFlags: { label: string; detail: string }[];
  whatToDoInstead: string[];
  submittedAt: string;
}

export const STORIES: Story[] = [
  {
    slug: "fortnite-vbucks-scam",
    title: "The 'Free V-Bucks Generator' That Wiped My Account",
    tag: "Gaming Scams",
    tagColor: "#00c853",
    age: 14,
    location: "Houston, TX",
    platform: "Discord",
    lossAmount: "$0 (account recovered after 3 weeks)",
    outcome: "caught",
    pullQuote: "It walked me through 12 steps. By step 8, I'd already handed them everything they needed.",
    summary:
      "A Discord server promising free V-Bucks walked him through a fake 'anti-bot verification' process. Twelve steps later, his Fortnite account was locked, his saved card had two charges he didn't make, and the server had vanished.",
    story: [
      "I got a DM from someone in a Fortnite Discord I was already in. They said there was a private giveaway server — you had to be invited, so it felt exclusive. The server looked completely legitimate. Custom banner, 40,000 members, pinned rules, a staff team. The main channel had people posting screenshots of their V-Bucks balances going up.",
      "The process was called 'anti-bot verification.' You had to complete a series of steps to prove you were a real player and not someone farming the system. Step 1 was connecting your Epic account. Step 3 asked you to 'temporarily' share your login for identity confirmation. By then I was already several steps in and it felt like quitting would mean losing the reward.",
      "I completed all 12 steps. Within an hour, I got an email that my Epic account password had been changed. Then another email — a purchase receipt for 13,500 V-Bucks and a Crew subscription charged to the card my parents had saved to the account. The Discord server was gone. The account that DM'd me was gone.",
      "My mom had to call the bank to dispute the charges, which took three weeks to resolve. Epic support eventually helped us recover the account, but everything in it — skins, saves, progress — had been messed with. The card my parents had connected was their debit card, not a credit card, so the money was actually gone from their account while the dispute was pending.",
      "Looking back, every step of that verification process was designed to normalize giving up access. Each small step made the next one feel reasonable. No single step felt like the moment I got scammed — but together they added up to giving a stranger my full login.",
    ],
    redFlags: [
      {
        label: "Invitation-Only Scarcity",
        detail: "Making something feel exclusive increases compliance. A 'private' giveaway you got invited to is just a targeted lure.",
      },
      {
        label: "Large Member Count as Social Proof",
        detail: "Bot farms inflate Discord member counts instantly. 40,000 members proves nothing — most are fake accounts.",
      },
      {
        label: "Multi-Step Verification",
        detail: "Legitimate platforms never ask you to share your login credentials as part of a verification process. Ever.",
      },
      {
        label: "Server Disappears After Completion",
        detail: "Scam servers are set up to vanish. Once they have what they need, the whole environment is deleted within hours.",
      },
    ],
    whatToDoInstead: [
      "No legitimate game publisher distributes free in-game currency through Discord. There is no real version of this.",
      "Never enter your game login credentials anywhere except the official game client or official website.",
      "If a debit card is linked to gaming accounts, consider replacing it with a low-limit prepaid card so exposure is capped.",
    ],
    submittedAt: "November 2024",
  },
  {
    slug: "instagram-job-money-mule",
    title: "My $200-a-Week 'Remote Job' Was a Money Laundering Scheme",
    tag: "Job Scams",
    tagColor: "#ffd600",
    age: 16,
    location: "Atlanta, GA",
    platform: "Instagram DM",
    lossAmount: "$0 (bank froze account before loss)",
    outcome: "escaped",
    pullQuote: "They called it 'payment processing.' My bank called it fraud. Those are very different things.",
    summary:
      "A DM offering $200 a week to 'process payments' for a small business seemed like an easy first job. Within a week, she'd received and forwarded $1,400 of stolen money through her personal account before her bank flagged the activity.",
    story: [
      "I'd been looking for my first job for months — everywhere was either 16+ with a work permit or needed experience I didn't have. Then I got a DM on Instagram from an account that looked like a small clothing brand. They said they'd seen my posts and thought I had 'good energy,' and asked if I wanted to make $200 a week doing remote work as a 'payment processor.'",
      "The job was simple: they'd send money to my Zelle or Cash App, I'd take out my $50 weekly cut, and forward the rest to a list of vendors they'd give me. They said their payment system was broken and they needed someone in the US to handle transfers while they fixed it. It made just enough sense that I didn't push back.",
      "The first week I received $400 and forwarded $350 as instructed. The second week it was $1,000. I forwarded $950. I'd made $100 and it felt real. Then on day 10, my bank called my mom. The deposits were flagged as likely stolen funds — they were payments from people who'd had their bank accounts compromised. My account was frozen pending investigation.",
      "My mom had to go to the bank in person with documentation. The business Instagram account had been deleted. The phone number I had for 'my contact' was disconnected. My bank eventually cleared me after I explained and cooperated, but the account stayed frozen for over a month and my mom's name was attached to the investigation because I was a minor.",
      "What I didn't know — and what they were counting on me not knowing — is that this is called being a 'money mule.' It's how criminal organizations move stolen funds without getting caught. They use real teens with real accounts to create distance between themselves and the fraud. Even if I didn't know what I was doing, I could have faced real consequences.",
    ],
    redFlags: [
      {
        label: "Unsolicited Job Offer via DM",
        detail: "Real employers don't discover teens through Instagram posts and DM them job offers. This is a targeted recruitment tactic.",
      },
      {
        label: "Payment Processing as the Entire Job",
        detail: "Any 'job' where the work is receiving and forwarding money is money laundering by definition. There's no legitimate version of this role.",
      },
      {
        label: "Vague Explanation for Cash Flow",
        detail: "'Our payment system is broken' is a script designed to sound just plausible enough to avoid questions.",
      },
      {
        label: "Escalating Transfer Amounts",
        detail: "Starting small builds trust before the volume increases. By week two the amounts had more than doubled.",
      },
    ],
    whatToDoInstead: [
      "Any job that involves receiving money from strangers and forwarding it elsewhere is a money mule scheme — no exceptions.",
      "Legitimate first jobs (retail, food service, tutoring) have in-person interviews, paper applications, and verifiable employers.",
      "If you've already transferred money and suspect fraud, call your bank immediately — the sooner you report, the better the outcome.",
    ],
    submittedAt: "January 2025",
  },
  {
    slug: "voice-clone-mom",
    title: "My 'Mom' Needed $200 Right Now",
    tag: "Deepfake Video",
    tagColor: "#ff6d00",
    age: 17,
    location: "Austin, TX",
    platform: "Phone Call",
    lossAmount: "$200",
    outcome: "caught",
    pullQuote: "I transferred the money before I even thought to call her back. The voice was perfect.",
    summary:
      "A phone call that sounded exactly like her mom sent her into a panic. She sent $200 before she realized her real mom was sitting in the next room.",
    story: [
      "It was a Tuesday afternoon and I was doing homework when my phone rang. The caller ID said 'Mom.' I picked up and it was her voice — same way she says my name, same little rush of breath she does when she's stressed. She said she was at the hospital, that her phone had died, and that she needed me to send $200 on Venmo immediately.",
      "She told me not to call back because she'd borrowed a stranger's phone. I didn't question it. My brain just went into emergency mode. I opened Venmo and sent the money in under two minutes.",
      "About ten minutes later my actual mom walked into my room asking what I wanted for dinner. She'd been home the entire time. She never called me. Her phone was in her pocket.",
      "I reported it to Venmo but the money was already gone. The number had been spoofed to look exactly like my mom's real number in my contacts. The AI had cloned her voice — probably from videos on her Facebook — and the whole call took less than 90 seconds.",
      "The worst part isn't the $200. It's knowing that I heard her voice, her actual voice, and it meant nothing. The AI sounded more like her than a bad impression would. I still don't fully trust phone calls anymore.",
    ],
    redFlags: [
      {
        label: "Caller ID Spoofing",
        detail: "A number appearing as a saved contact does not confirm the caller's identity — spoofing is trivial.",
      },
      {
        label: "Urgency + No Callback",
        detail: "'Don't call back' is engineered to eliminate the one verification step that would expose the scam.",
      },
      {
        label: "Unusual Payment Request",
        detail: "A real emergency via a borrowed phone would never require Venmo. Real emergencies have other channels.",
      },
      {
        label: "Voice Trust Assumption",
        detail: "AI can clone a recognizable voice from 30 seconds of public audio. Your ear alone is not a reliable identity check.",
      },
    ],
    whatToDoInstead: [
      "Hang up immediately — do not stay on the line.",
      "Call back on the number you already have saved. If unreachable, try a second family member.",
      "Establish a family code word in advance that no AI can guess.",
    ],
    submittedAt: "March 2025",
  },
  {
    slug: "snapchat-sextortion",
    title: "They Said They'd Send It to Everyone at My School",
    tag: "Sextortion",
    tagColor: "#ff1744",
    age: 16,
    location: "Phoenix, AZ",
    platform: "Snapchat",
    lossAmount: "$0 (refused to pay — got support)",
    outcome: "escaped",
    pullQuote: "The moment I stopped responding, the threats got louder. My counselor said that was actually a good sign.",
    summary:
      "After being manipulated into sharing a photo by someone he'd been talking to for weeks, he was immediately threatened with exposure to his school and family unless he paid. He told his mom, contacted the CyberTipline, and didn't pay — and the threats stopped.",
    story: [
      "We'd been talking on Snapchat for about three weeks. They said they went to a school in a different state — not anyone I could verify. The conversations felt real and the account had been around for years with a real-looking history. When they asked me to share a photo, I'd already built enough trust that it didn't immediately feel dangerous.",
      "Within minutes of sending it, everything changed. The tone flipped completely. They sent screenshots proving they'd saved what I sent — Snapchat's save protection hadn't worked. They said they had my full name, my school, my friends list from a profile I'd had public. They demanded $300 or they'd send the image to everyone.",
      "I went completely cold. I couldn't breathe. I started doing the math in my head — how to get $300 without my parents knowing, whether paying would actually make it stop. I didn't sleep that night.",
      "The next morning I told my mom. That was the hardest thing I've ever done. She didn't react the way I was afraid she would. She sat with me and we called the NCMEC CyberTipline together (1-800-843-5678). The counselor there told us something that actually helped: in the vast majority of cases like this, people who threaten to expose you want money, not exposure. Paying rarely ends it and usually escalates it.",
      "We stopped all contact and blocked the account. The threats came in on a new account for about two days and then stopped entirely. It's been four months. Nothing was ever sent. My school counselor helped me process the aftermath. If I could say one thing: tell someone the same day. The shame of telling is nothing compared to going through it alone.",
    ],
    redFlags: [
      {
        label: "Trust Built Before the Ask",
        detail: "Sextortion accounts invest weeks building emotional connection before making any request — the relationship is manufactured for this purpose.",
      },
      {
        label: "Immediate Pivot to Threats",
        detail: "The moment content is shared, the persona drops. The threat is scripted and ready — it was the plan from the beginning.",
      },
      {
        label: "'I Have Your Friends List'",
        detail: "Public social profiles make it trivial to find a target's school, family, and contacts. This information is part of the threat package.",
      },
      {
        label: "Pressure to Pay Quickly",
        detail: "Urgency and shame are the tools. The goal is to get payment before the target tells anyone who could help them think clearly.",
      },
    ],
    whatToDoInstead: [
      "Do not pay — paying rarely ends it and usually triggers escalating demands.",
      "Tell a trusted adult the same day. Shame is what the scammer is counting on to keep you silent.",
      "Contact the NCMEC CyberTipline: 1-800-843-5678 or CyberTipline.org — they handle this situation daily and will not judge you.",
      "Preserve evidence (screenshots) before blocking, then block everywhere at once.",
    ],
    submittedAt: "April 2025",
  },
];
