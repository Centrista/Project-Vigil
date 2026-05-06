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
    slug: "zoom-deepfake-singapore",
    title: "The Deepfake Zoom Call That Cost His Company S$672,000",
    tag: "Deepfake Scam",
    tagColor: "#ff6d00",
    age: 42,
    location: "Singapore",
    platform: "Zoom",
    lossAmount: "US$499,000 (S$672,000)",
    outcome: "partial",
    pullQuote: "Every face on that call was someone I recognised. Every single one of them was a lie.",
    summary:
      "A Singapore finance director was lured into a Zoom call where every 'colleague' — including the CEO — was a real-time deepfake. He transferred US$499,000 the next day before realising the meeting had never actually happened.",
    story: [
      "In March 2026, a finance director at a Singaporean company received an urgent call from a supposed lawyer regarding a confidential corporate restructuring project. The lawyer emphasised the project's sensitivity and persuaded the director to sign a non-disclosure agreement, framing secrecy as a standard professional requirement.",
      "On March 25, the director was told the scheduled video conference was being moved up — to that same afternoon. He joined the Zoom call and saw familiar faces: colleagues he recognised, and at the head of the meeting, the company's Chief Executive Officer. The conversation was fluid, credible, and entirely professional. In reality, every participant other than the director was a deepfake — their faces and voices reconstructed in real time using AI trained on publicly available footage.",
      "Based on instructions from that fraudulent video conference and follow-up correspondence with the fake lawyer, the director transferred over US$499,000 from the company's HSBC bank account to a local corporate account on March 26. He had no reason to doubt the order. The account he transferred to was a money mule account, and approximately US$494,000 was immediately moved across the border into Hong Kong bank accounts.",
      "The fraud only unravelled on March 27, when the perpetrators overplayed their hand. Growing bolder, they requested an additional transfer of US$1.4 million. The amount was large enough to trigger caution. The director made a direct call to the actual CEO — and discovered that the executive had never participated in any such meeting.",
      "By that point, nearly half a million dollars had already left Singapore. The case highlighted how far deepfake technology had advanced: no longer a theoretical threat confined to manipulated social media clips, but a real-time impersonation tool capable of bypassing the trust a person places in the faces and voices of the people they work with every day.",
    ],
    redFlags: [
      {
        label: "Unsolicited Confidentiality Demand",
        detail: "Being asked to sign an NDA before a major financial discussion — especially one initiated by a stranger — is a pressure tactic designed to prevent the victim from seeking a second opinion.",
      },
      {
        label: "Last-Minute Schedule Change",
        detail: "Moving a meeting to the same day compresses the verification window. Urgency is a deliberate tool to prevent due diligence.",
      },
      {
        label: "Familiar Faces ≠ Real Identity",
        detail: "AI can reconstruct recognisable video and voice from public footage in real time. Seeing someone's face on a video call is no longer proof they are who they appear to be.",
      },
      {
        label: "Instructions Delivered Only Through the Call",
        detail: "Real corporate financial authorisations involve paper trails, dual approvals, and verification channels outside a single video call.",
      },
      {
        label: "Escalating Payment Requests",
        detail: "The request for a second, larger transfer on day two is a pattern: scammers test the water with a large payment, then immediately push for more.",
      },
    ],
    whatToDoInstead: [
      "Before executing any large transfer, verify the instruction through a separate, independent channel — call the CEO directly on a known number, not one provided in the meeting.",
      "Establish a company policy requiring dual authorisation for all transfers above a set threshold, regardless of who gives the instruction.",
      "Treat any combination of 'urgent', 'confidential', and 'large financial transfer' as an automatic trigger for heightened verification.",
    ],
    submittedAt: "March 2026",
  },
  {
    slug: "hong-kong-deepfake-25m",
    title: "He Authorised US$25.6 Million After a Meeting That Never Happened",
    tag: "Deepfake Scam",
    tagColor: "#ff6d00",
    age: 35,
    location: "Hong Kong",
    platform: "Video Conference",
    lossAmount: "US$25.6 million (HK$200 million)",
    outcome: "escaped",
    pullQuote: "I saw the CFO. I heard the CFO. The CFO was not there.",
    summary:
      "A finance worker at a multinational firm transferred US$25.6 million after a video call where every participant except him was a high-fidelity AI deepfake — including the company's UK-based CFO.",
    story: [
      "In early 2024, a finance employee at a multinational firm in Hong Kong received a message purportedly from the company's UK-based Chief Financial Officer requesting a 'secret transaction.' The employee was immediately suspicious. It had the hallmarks of a phishing attempt — an unusual channel, an unusual ask, and language that seemed slightly off.",
      "His scepticism was neutralised by a video call. On screen were the CFO and several familiar colleagues, all speaking naturally and appearing exactly as he knew them. According to the Hong Kong Police, every person on that call — except the victim — was a high-fidelity AI recreation built from publicly available footage of the company's actual staff.",
      "Reassured by what he had seen and heard, the employee authorised the transfer of US$25.6 million across fifteen separate transactions. At no point did he contact anyone at the company through an independent channel to verify the instruction.",
      "The deception was not discovered until after the funds had been fully remitted and the employee reached out to the corporation's actual head office to follow up. He was told no such instruction had ever been given. The CFO had never requested a secret transaction. The colleagues on that call had never joined a meeting.",
      "The case — involving HK$200 million in losses and unprecedented use of multi-person real-time deepfake technology — became a landmark in corporate fraud. Hong Kong police confirmed it was the largest known instance of deepfake-enabled financial theft at the time, and it fundamentally changed how financial institutions approach video-based instruction verification.",
    ],
    redFlags: [
      {
        label: "'Secret Transaction' Framing",
        detail: "Labelling a large financial transfer as 'secret' is designed to prevent the victim from consulting colleagues who would immediately recognise it as fraud.",
      },
      {
        label: "Initial Suspicion Overridden by Video",
        detail: "The employee's instincts were correct. The deepfake video call was deployed specifically to override correct suspicion — a deliberate feature of the attack.",
      },
      {
        label: "Multiple Recognisable Faces, All Fake",
        detail: "A single deepfake can be explained away. Multiple familiar colleagues appearing simultaneously raises perceived legitimacy — and in this case, every one of them was reconstructed from public footage.",
      },
      {
        label: "No Independent Verification Before Transfer",
        detail: "Fifteen separate transactions were authorised without a single direct call to any participant through a pre-existing contact number.",
      },
    ],
    whatToDoInstead: [
      "Any instruction to transfer large sums labelled 'secret' should be treated as automatically suspicious — legitimate corporate transactions leave paper trails by design.",
      "Before authorising large transfers, call the requester on a contact number you already have — not one provided in the request.",
      "Companies should implement out-of-band verification for wire transfers above a set threshold, making video-call-only authorisation insufficient.",
    ],
    submittedAt: "February 2024",
  },
  {
    slug: "singapore-gois-1m",
    title: "Fake MAS Officers Drained S$1.1 Million in Eight Days",
    tag: "Impersonation Scam",
    tagColor: "#ffd600",
    age: 58,
    location: "Singapore",
    platform: "Phone Call",
    lossAmount: "S$1.1 million",
    outcome: "caught",
    pullQuote: "They told me to tell the bank the money was for investments. I believed them. That was the last lie I told for them.",
    summary:
      "A victim was convinced by callers posing as M1 staff and MAS officers that his accounts were frozen and his assets needed to be 'surrendered' for an official investigation. Over eight days he handed over gold, cryptocurrency, and QR payments totalling S$1.1 million.",
    story: [
      "In October 2025, a Singaporean resident received an unsolicited call from someone claiming to be an M1 staff member, informing him of a fictitious mobile contract taken out in his name. The caller alleged that his identity had been used in an 'information leak' and transferred the call to individuals posing as officers from the Monetary Authority of Singapore.",
      "These impersonators told the victim that his bank accounts had been frozen as part of a financial investigation, and that his assets needed to be surrendered to authorities for safekeeping. The framing was clinical and authoritative — the language of regulation and law enforcement, designed to make compliance feel like the only responsible option.",
      "Between October 14 and 22, the victim was systematically stripped of his wealth through four separate methods. He handed approximately S$350,000 in gold bars to a female courier on two occasions. He converted and transferred S$124,900 in cryptocurrency to wallet addresses provided by the fake officers. He scanned over 60 QR codes generated on the YouTrip platform — draining more than S$600,000 — with the scammers describing each one as a 'verification transaction.' He also transferred approximately S$26,500 via PayNow to a local account.",
      "A critical layer of the scheme was coaching. When the victim's bank flagged suspicious transfers, he was instructed by the scammers to tell bank staff the funds were intended for 'investments' or 'gifts.' He did so. This guidance was rehearsed and specific — the scammers had encountered these safeguards before and had prepared him to defeat them.",
      "The scheme was ultimately halted not by the victim recognising the fraud, but by OCBC bank identifying an unusual transaction pattern and alerting the Anti-Scam Centre, who contacted the victim and successfully convinced him he had been targeted. The Singapore Police Force subsequently conducted an island-wide enforcement operation, arresting 24 individuals and investigating nine more.",
    ],
    redFlags: [
      {
        label: "Cold Call About an Unknown Account or Contract",
        detail: "A call informing you of an account, contract, or investigation you were unaware of is a classic impersonation entry point. Hang up and call the organisation directly using an official number.",
      },
      {
        label: "'Your Assets Must Be Surrendered for Investigation'",
        detail: "No real government agency will ever ask you to hand over gold, transfer cryptocurrency, or make QR payments as part of a legal investigation. This request, in any form, is fraud.",
      },
      {
        label: "Coached to Lie to Bank Staff",
        detail: "Being told to misrepresent the purpose of a transfer to your own bank is a definitive sign that the person instructing you knows the transfer is fraudulent.",
      },
      {
        label: "QR Codes Framed as 'Verification'",
        detail: "Scanning a QR code generated by someone else and described as a 'verification step' is a payment to that person. No verification process works this way.",
      },
      {
        label: "Multi-Method, Multi-Day Escalation",
        detail: "Using four different methods across eight days is deliberate — it spreads the loss across platforms to avoid triggering any single fraud detection system.",
      },
    ],
    whatToDoInstead: [
      "If someone calls claiming to be from a government agency and asks you to transfer assets, hang up and call the agency's official number directly — never use a number the caller provides.",
      "No legitimate investigation requires physical gold handovers, crypto transfers, or QR code payments. These are untraceable payment methods — a deliberate choice by scammers.",
      "If a bank questions your transfer and someone else has told you what to say, stop the transaction immediately and tell the bank the truth.",
    ],
    submittedAt: "October 2025",
  },
  {
    slug: "tradenation-luxury-scam",
    title: "The Supercar Couple Who Stole S$32 Million and Fled in a Lorry",
    tag: "Retail Fraud",
    tagColor: "#7c4dff",
    age: 33,
    location: "Singapore",
    platform: "Social Media / Direct Order",
    lossAmount: "S$32 million (178 victims)",
    outcome: "caught",
    pullQuote: "Their Instagram showed a McLaren and a Corvette. My life savings bought them that life.",
    summary:
      "Pi Jiapeng and Pansuk Siriwipa ran Tradenation and Tradeluxury — a luxury goods pre-order business backed by a carefully curated social media facade of supercars and wealth. Over 178 victims paid large upfront deposits for watches and bags that were never intended to be delivered.",
    story: [
      "Between 2021 and 2022, Pi Jiapeng and his Thai wife Pansuk Siriwipa operated two companies — Tradenation and Tradeluxury — built on a simple and devastating model. Customers paid large upfront deposits to pre-order luxury goods: Rolex watches, Patek Philippes, high-end handbags. The goods were never delivered. The deposits were never refunded. The business existed not to sell watches, but to collect capital.",
      "The operation was sustained by a social media strategy that turned perceived wealth into trust. The couple maintained visible Instagram presences showcasing a fleet of luxury cars — including a McLaren and a rare Chevrolet Corvette — along with the lifestyle imagery of Singapore's elite. For buyers looking to source luxury goods through a reseller, their apparent success functioned as a kind of accreditation. If they could afford to drive a McLaren, they were presumably doing something right.",
      "The scale of the individual losses was severe. A business owner known as 'Ali' transferred S$800,000 for 40 Rolex watches intended for resale, a loss that forced him to sell his car and personal assets. A manufacturing professional paid S$280,000 for high-end timepieces, leading to years of psychological distress and marital strain. Others lost tens of thousands in what they believed were straightforward pre-orders for milestone gifts.",
      "When the scheme began to collapse in June 2022, the couple fled Singapore — not through the airport, but hidden inside the container compartment of a lorry crossing into Malaysia. The dramatic escape triggered an international manhunt and the issuance of Interpol Red Notices. They were located and arrested by the Royal Malaysia Police in Johor Bahru in August 2022 and extradited back to Singapore.",
      "The legal fallout was significant. Pansuk Siriwipa, identified as the mastermind, was sentenced to 14 years' jail in October 2024 for cheating and money laundering. Pi Jiapeng received five years and ten months' jail in October 2025. Despite the convictions, recovery remained limited: the SPF seized over S$200,000 in cash and more than 80 luxury items, while authorities continued engaging Thai officials regarding a S$2 million Bangkok property believed to have been purchased with victims' funds.",
    ],
    redFlags: [
      {
        label: "Social Media Wealth as Proof of Legitimacy",
        detail: "Displaying supercars and luxury goods on Instagram costs money but proves nothing about a business's reliability. Lifestyle content is a marketing choice, not a financial credential.",
      },
      {
        label: "Large Upfront Deposits on a Pre-Order Model",
        detail: "Paying large deposits for goods that will arrive later — especially through a private reseller with no buyer protection — creates a window where the seller can disappear with the funds.",
      },
      {
        label: "No Escrow, No Formal Contract, No Fallback",
        detail: "Legitimate high-value transactions use documented contracts, escrow services, or platforms with buyer protection. Absence of these structures leaves the buyer with no recourse.",
      },
      {
        label: "Unverified Business Registration",
        detail: "Both companies operated primarily through social media. Checking ACRA registration, trading history, and formal references would have revealed no substantive track record.",
      },
    ],
    whatToDoInstead: [
      "For any luxury goods purchase above S$10,000, verify the seller's ACRA registration, trading history, and physical business address — social media presence is not due diligence.",
      "Insist on an escrow arrangement where funds are released only after goods are received, or use platforms with built-in buyer protection.",
      "Treat social media lifestyle content as advertising, not evidence of business credibility.",
    ],
    submittedAt: "October 2025",
  },
  {
    slug: "envy-nickel-ponzi",
    title: "S$1.5 Billion, Zero Nickel: Singapore's Largest Ponzi Scheme",
    tag: "Investment Fraud",
    tagColor: "#7c4dff",
    age: 47,
    location: "Singapore",
    platform: "Direct Investment",
    lossAmount: "S$842 million (owed to investors)",
    outcome: "caught",
    pullQuote: "The contracts were real. The signatures were real. The nickel was completely made up.",
    summary:
      "Ng Yu Zhi convinced hundreds of investors — including finance professionals — that their capital was funding profitable nickel trades with an Australian supplier. In reality, no nickel was ever traded. The entire S$1.5 billion operation was a Ponzi scheme sustained entirely by forgery.",
    story: [
      "The Envy group of companies, led by Ng Yu Zhi, presented investors with what appeared to be a straightforward commodity trading opportunity. Investors were told their capital was used to purchase London Metal Exchange Grade nickel from an Australian supplier — Poseidon Nickel — for profitable resale to third-party buyers. The business had documentation: contracts, invoices, proof of trades. The returns were consistent. The operation attracted everyone from retail investors to seasoned financial professionals.",
      "In reality, no nickel was ever purchased. No trades were ever executed. The contracts and invoices were fabricated. Poseidon Nickel had no knowledge of the transactions attributed to it. The entire operation was a Ponzi scheme: new investor capital was used to pay out returns to earlier participants, while Ng siphoned hundreds of millions into personal accounts and secondary business ventures.",
      "The scale was monumental. Approximately S$1.5 billion flowed into the scheme as reinvestments. At the time of collapse, the insolvent firms owed investors roughly S$842 million. An additional S$42 million in commissions and referral fees had been distributed among six specific employees who helped attract and manage investor relationships.",
      "The scheme unravelled when the volume of payouts drew the attention of auditors and regulators. A forensic audit by liquidators established that the supposed transactions with Australian suppliers were completely fabricated and that the business had no actual source of income other than new investor capital. Ng Yu Zhi was arrested and faces dozens of criminal charges including forgery and criminal breach of trust. A partial judgment of over S$416 million has been obtained against him and he has been declared bankrupt.",
      "In a landmark 2025 ruling, the High Court allowed liquidators to claw back bonuses, commissions, and profit-sharing payments from former staff members, finding two directors liable for the full S$842 million investor debt. The court's message was explicit: remaining willfully blind to fraud while benefiting financially from it constitutes enabling the fraud, and those who do so will be held accountable for the losses they helped create.",
    ],
    redFlags: [
      {
        label: "Consistent Returns Regardless of Market Conditions",
        detail: "Commodity prices fluctuate. A business that delivers consistent returns across market cycles without variance is a hallmark of a Ponzi scheme, not a real trading operation.",
      },
      {
        label: "Documentation Without Independent Verification",
        detail: "The contracts and invoices appeared legitimate. None were verified against the named counterparty. Calling Poseidon Nickel directly would have exposed the fraud immediately.",
      },
      {
        label: "High Commissions for Referrals",
        detail: "Paying S$42 million in referral fees creates powerful incentive to recruit without investigating. Referral-fee structures are a common feature of Ponzi schemes.",
      },
      {
        label: "Complexity as a Deterrent to Questions",
        detail: "Commodity trading involves enough technical vocabulary that many investors did not probe the details. Complexity exploits the discomfort of asking 'basic' questions about how something actually works.",
      },
    ],
    whatToDoInstead: [
      "For any investment in commodity trading, independently verify the counterparties named in contracts by contacting them directly — do not rely solely on documentation provided by the fund manager.",
      "Be especially sceptical of investments offering consistent returns unaffected by market conditions — this pattern is structurally impossible in legitimate trading.",
      "Referral fees and high commissions create conflicts of interest. Advisors who profit from introducing you to an investment have financial reason to oversell it.",
    ],
    submittedAt: "2025",
  },
  {
    slug: "hyflux-collapse",
    title: "Hyflux: 34,000 Retirees Lost S$900 Million to a 'Safe' Investment",
    tag: "Investment Fraud",
    tagColor: "#7c4dff",
    age: 62,
    location: "Singapore",
    platform: "Public Securities",
    lossAmount: "S$900 million (retail investors)",
    outcome: "partial",
    pullQuote: "The prospectus called them safe and stable. The board already knew they were neither.",
    summary:
      "Hyflux's leadership continued marketing 'perpetual securities' as safe, high-yield investments to 34,000 retail investors — many of them retirees — while concealing devastating losses from a failing power plant that had made the company's survival a gamble.",
    story: [
      "Hyflux began as a genuine success story — a Singapore water treatment company that grew into a celebrated regional enterprise. For years it earned real revenue from desalination and water recycling contracts. When it began marketing retail investment products — described as 'perpetual securities' — to individual members of the public, its reputation lent those products an aura of safety they did not deserve.",
      "The problem began when the company pivoted into power generation through the Tuaspring Integrated Water and Power Plant. Built as electricity prices began a sustained decline, the plant bled money from the moment it came online. Despite mounting losses documented internally, the company's leadership continued to represent Hyflux as financially stable in public disclosures, prospectuses, and earnings statements. They did not tell the 34,000 retail investors — many of them elderly retirees who had invested life savings — that the company's survival was contingent on a failing energy gamble.",
      "By 2018, the position was no longer sustainable. Hyflux defaulted on its debts and suspended trading, revealing total liabilities of approximately S$3.2 billion. For the retail investors who had purchased perpetual securities — drawn in by the promise of high, stable yields from a company that seemed to represent Singaporean commercial success — the result was near-total loss. Almost the entire S$900 million they had invested was gone, with almost no prospect of restitution.",
      "The national water agency PUB seized the Tuaspring plant to protect Singapore's water supply. Hyflux was ordered into liquidation. The company that had once been held up as a model of Singaporean enterprise ceased to exist.",
      "Criminal consequences arrived in late 2022 and continued through 2026, as founder Olivia Lum and several other directors were charged under the Securities and Futures Act — not for making bad business decisions, but specifically for disclosure failures: for failing to state material risks in official documents and for misleading the public about the company's precarious financial position. The core allegation is that they prioritised keeping the company alive over the honest protection of the investors who trusted them with their savings.",
    ],
    redFlags: [
      {
        label: "High Yields From a 'Safe' Corporate Product",
        detail: "Perpetual securities offering yields significantly above bank deposits carry real risk. High yield and low risk are structurally incompatible — one is always compensating for the other.",
      },
      {
        label: "Brand Reputation as a Substitute for Due Diligence",
        detail: "Hyflux's national profile made the investment feel safe. Brand recognition and apparent government association are not the same as financial health — they require separate evaluation.",
      },
      {
        label: "Undisclosed Exposure to a Single Failing Project",
        detail: "The company's viability had become dependent on one power plant whose economics were deteriorating. This concentration risk was not disclosed to retail investors.",
      },
      {
        label: "Prospectus Language Without Independent Analysis",
        detail: "Retail investors generally cannot access internal management accounts. Reading the prospectus alone, without independent financial analysis, left them blind to risks the board knew existed.",
      },
    ],
    whatToDoInstead: [
      "Treat any investment product described as both 'safe' and 'high-yield' with significant scepticism — these two characteristics are rarely simultaneously true.",
      "Before investing in any company's retail securities, look beyond the prospectus: review analyst reports, check segment-level financials, and assess whether any single business unit represents an outsized risk.",
      "Diversify across instruments and issuers so that the failure of a single company — however trusted — does not represent a catastrophic loss.",
    ],
    submittedAt: "2022–2026",
  },
];
