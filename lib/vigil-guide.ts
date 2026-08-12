// ─── VIGIL GUIDE ─────────────────────────────────────────────────────────────
// The site's chat-style navigator: a side-docked widget that answers typed
// questions by keyword-matching against content that already exists (Pokédex,
// trending scams, nav pages). Deliberately NOT an LLM and it says so —
// deterministic, client-side, and it can only point at pages that are on the
// site. No chips, no menus: type, get routed.
// ─────────────────────────────────────────────────────────────────────────────

import { POKEDEX_ENTRIES } from "@/lib/pokedex";
import { SCAMS } from "@/lib/scams";
import { LEARNING_PATH, NAV_LINKS } from "@/lib/constants";

export type GuideRecordKind = "creature" | "alert" | "page";

export interface GuideIndexRecord {
  kind: GuideRecordKind;
  href: string;
  title: string;
  subtitle: string;
  strongTerms: Set<string>;
  weakTerms: Set<string>;
}

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "of", "to", "in", "on", "for", "with",
  "is", "are", "was", "be", "it", "its", "this", "that", "my", "me", "i", "im",
  "you", "your", "someone", "something", "what", "how", "do", "does", "can",
  "about", "from", "at", "by", "as", "so", "just", "like", "got", "get",
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function buildIndex(): GuideIndexRecord[] {
  const records: GuideIndexRecord[] = [];

  for (const entry of POKEDEX_ENTRIES) {
    records.push({
      kind: "creature",
      href: `/pokedex/${entry.slug}`,
      title: entry.name,
      subtitle: entry.scamLabel,
      strongTerms: new Set(tokenize(`${entry.name} ${entry.scamLabel}`)),
      weakTerms: new Set(tokenize(`${entry.description} ${entry.habitat}`)),
    });
  }

  for (const scam of SCAMS) {
    records.push({
      kind: "alert",
      href: `/trending-scams/${scam.id}`,
      title: scam.name,
      subtitle: `Trending · ${scam.categoryLabel}`,
      strongTerms: new Set(tokenize(`${scam.name} ${scam.categoryLabel}`)),
      weakTerms: new Set(tokenize(scam.summary)),
    });
  }

  for (const link of NAV_LINKS) {
    records.push({
      kind: "page",
      href: link.href,
      title: link.label,
      subtitle: link.description,
      strongTerms: new Set(tokenize(link.label)),
      weakTerms: new Set(tokenize(link.description)),
    });
  }

  return records;
}

export const GUIDE_INDEX: GuideIndexRecord[] = buildIndex();

// Hand-tuned synonyms mapping how teens actually type to catalogue vocabulary.
const SYNONYMS: Record<string, string[]> = {
  voice: ["audio", "call", "deepfake"],
  mum: ["voice", "audio"],
  mom: ["voice", "audio"],
  dad: ["voice", "audio"],
  cloned: ["deepfake", "voice", "audio"],
  clone: ["deepfake", "voice", "audio"],
  facetime: ["video", "deepfake"],
  zoom: ["video", "deepfake"],
  email: ["phishing"],
  text: ["phishing"],
  sms: ["phishing"],
  link: ["phishing"],
  password: ["phishing"],
  nudes: ["sextortion"],
  blackmail: ["sextortion"],
  threatening: ["sextortion"],
  skins: ["gaming"],
  vbucks: ["gaming"],
  robux: ["gaming"],
  fortnite: ["gaming"],
  roblox: ["gaming"],
  job: ["jobs"],
  internship: ["jobs"],
  salary: ["jobs"],
  crypto: ["investment"],
  bitcoin: ["investment"],
  trading: ["investment"],
  shopping: ["ecommerce"],
  seller: ["ecommerce"],
  listing: ["ecommerce"],
  carousell: ["ecommerce"],
  tickets: ["ticket", "concert"],
  girlfriend: ["romance", "love", "butchering", "pig"],
  boyfriend: ["romance", "love", "butchering", "pig"],
  dating: ["romance", "love", "butchering", "pig"],
  donate: ["disabled", "disability", "begging"],
  donation: ["disabled", "disability", "begging"],
  charity: ["disabled", "disability", "begging"],
};

function expand(tokens: string[]): string[] {
  const out = new Set(tokens);
  for (const t of tokens) {
    for (const syn of SYNONYMS[t] ?? []) out.add(syn);
  }
  return [...out];
}

export interface GuideMatch {
  kind: GuideRecordKind;
  href: string;
  title: string;
  subtitle: string;
  score: number;
}

const MIN_SCORE = 3;

/** Score records by weighted token overlap; top 3 above the floor, else []. */
export function matchQuery(query: string): GuideMatch[] {
  const tokens = expand(tokenize(query));
  if (tokens.length === 0) return [];

  const scored: GuideMatch[] = [];
  for (const rec of GUIDE_INDEX) {
    let score = 0;
    for (const t of tokens) {
      if (rec.strongTerms.has(t)) score += 3;
      else if (rec.weakTerms.has(t)) score += 1;
    }
    if (score >= MIN_SCORE) {
      scored.push({ kind: rec.kind, href: rec.href, title: rec.title, subtitle: rec.subtitle, score });
    }
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}

// ─── Conversation layer ──────────────────────────────────────────────────────

export interface GuideReply {
  text: string;
  matches: GuideMatch[];
}

export const GUIDE_GREETING =
  "Hey — I'm the Vigil guide. Tell me what's going on or what you're looking for, and I'll point you to the right part of the site. (I'm not an AI — I match keywords, and I only know this site.)";

/** Conversation starters — clicking one sends it as a normal typed message. */
export const GUIDE_STARTERS = [
  "I think I just got scammed",
  "Is this job offer real?",
  "Where do I start?",
];

const EMERGENCY_TERMS = new Set([
  "scammed", "hacked", "stolen", "sent", "paid", "transferred", "threatened",
  "threatening", "blackmail", "blackmailed", "emergency", "urgent", "victim",
]);

const START_TERMS = new Set(["start", "begin", "beginner", "new", "first", "lost"]);

export function buildReply(query: string): GuideReply {
  const tokens = new Set(tokenize(query));

  if ([...tokens].some((t) => EMERGENCY_TERMS.has(t))) {
    return {
      text: "Okay — move fast, the first hour matters most. The emergency guide walks you through securing accounts and preserving evidence, step by step:",
      matches: [
        {
          kind: "page",
          href: "/emergency",
          title: "Emergency Guide",
          subtitle: "What to do right now, in order",
          score: 99,
        },
      ],
    };
  }

  if ([...tokens].some((t) => START_TERMS.has(t)) && tokens.size <= 4) {
    return {
      text: "Start here — this is the order we'd go in:",
      matches: LEARNING_PATH.slice(0, 3).map((step, i) => ({
        kind: "page" as const,
        href: step.href,
        title: `${step.step}. ${step.label}`,
        subtitle: step.why,
        score: 99 - i,
      })),
    };
  }

  const matches = matchQuery(query);

  if (matches.length === 0) {
    return {
      text: "I couldn't match that to anything on the site. I work off keywords — try describing the situation, like \"someone cloned my mum's voice\", \"fake concert tickets\", or \"crypto investment group\".",
      matches: [],
    };
  }

  const top = matches[0];
  const lead =
    top.kind === "creature"
      ? `That sounds like ${top.title} — ${top.subtitle.toLowerCase()}. Here's its file:`
      : top.kind === "alert"
        ? "There's a live alert that matches what you're describing:"
        : "This is the page you want:";

  return { text: lead, matches };
}
