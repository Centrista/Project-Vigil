// ─── VIGIL GUIDE ─────────────────────────────────────────────────────────────
// The site's built-in navigator: a scripted decision tree plus a keyword index
// over content that already exists (Pokédex, trending scams, nav pages).
// Deliberately NOT an LLM and it says so — everything here is deterministic,
// runs client-side, and can only point at pages that are actually on the site.
// ─────────────────────────────────────────────────────────────────────────────

import { POKEDEX_ENTRIES } from "@/lib/pokedex";
import { SCAMS } from "@/lib/scams";
import { LEARNING_PATH, NAV_LINKS } from "@/lib/constants";

export interface GuideChip {
  label: string;
  /** Route to a node in GUIDE_TREE… */
  next?: string;
  /** …or straight to a page. Exactly one of next/href is set. */
  href?: string;
}

export interface GuideNode {
  id: string;
  prompt: string;
  chips: GuideChip[];
}

export const GUIDE_TREE: Record<string, GuideNode> = {
  root: {
    id: "root",
    prompt: "Where do you want to start?",
    chips: [
      { label: "I've been scammed", next: "scammed" },
      { label: "Is this message real?", next: "suspicious" },
      { label: "Show me the scams", next: "browse" },
      { label: "Test my skills", next: "practice" },
    ],
  },
  scammed: {
    id: "scammed",
    prompt: "Move fast — the first hour matters most. What happened?",
    chips: [
      { label: "I sent money", href: "/emergency" },
      { label: "I clicked a link or gave a password", href: "/emergency" },
      { label: "Someone is threatening me", href: "/emergency" },
      { label: "I'm not sure yet", href: "/emergency" },
    ],
  },
  suspicious: {
    id: "suspicious",
    prompt: "Tell me what you're looking at.",
    chips: [
      { label: "A voice call or voice note", href: "/pokedex/passal" },
      { label: "A video call", href: "/pokedex/akmon" },
      { label: "An email or text", href: "/pokedex/dolon" },
      { label: "A job or internship offer", href: "/pokedex/circe" },
      { label: "A seller or a listing", href: "/pokedex/glaukult" },
      { label: "An investment tip", href: "/pokedex/ponsi" },
      { label: "Someone I met online", href: "/pokedex/peitho" },
    ],
  },
  browse: {
    id: "browse",
    prompt: "Two ways in — the catalogue, or what's spiking right now.",
    chips: [
      { label: "The full catalogue", href: "/pokedex" },
      { label: "What's trending this month", href: "/trending-scams" },
      { label: "How each one actually works", href: "/guide" },
    ],
  },
  practice: {
    id: "practice",
    prompt: "Pick your poison.",
    chips: [
      { label: "Spot the AI photo", href: "/simulator" },
      { label: "Survive a scam inbox", href: "/scam-battle" },
      { label: "Rate my risk", href: "/risk-quiz" },
    ],
  },
};

export const GUIDE_START_HERE = LEARNING_PATH[0];

// ─── Keyword index ───────────────────────────────────────────────────────────

export interface GuideIndexRecord {
  href: string;
  title: string;
  subtitle: string;
  /** Search corpus: title + hand-relevant fields, weighted. */
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
      href: `/pokedex/${entry.slug}`,
      title: entry.name,
      subtitle: entry.scamLabel,
      strongTerms: new Set(tokenize(`${entry.name} ${entry.scamLabel}`)),
      weakTerms: new Set(tokenize(`${entry.description} ${entry.habitat}`)),
    });
  }

  for (const scam of SCAMS) {
    records.push({
      href: `/trending-scams/${scam.id}`,
      title: scam.name,
      subtitle: `Trending · ${scam.categoryLabel}`,
      strongTerms: new Set(tokenize(`${scam.name} ${scam.categoryLabel}`)),
      weakTerms: new Set(tokenize(scam.summary)),
    });
  }

  for (const link of NAV_LINKS) {
    records.push({
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
      scored.push({ href: rec.href, title: rec.title, subtitle: rec.subtitle, score });
    }
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}
