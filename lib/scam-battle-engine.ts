// Scam Trainer — pure engine and types.
// No persistence, no side effects, no network. Everything is session state.

// ---------- Inbox layer ----------

export type Platform =
  | "whatsapp"
  | "instagram"
  | "sms"
  | "gmail"
  | "carousell"
  | "telegram";

export type Verdict = "scam" | "legit";

export interface InboxSender {
  name: string;
  handle?: string;          // @handle for IG / Telegram
  phone?: string;           // displayed for SMS, WhatsApp
  email?: string;           // displayed for Gmail
  avatarSeed?: string;      // initials / emoji to render the avatar
  avatarColor?: string;     // CSS color for the avatar tile
  verified?: boolean;
  isKnownContact?: boolean; // legit known contact vs unsaved-number-using-display-name
  subtitleHint?: string;    // "online", "last seen 10:42 pm", carousell "Joined 3d ago"
}

export interface InboxMessage {
  body: string;
  isOutgoing?: boolean;
  isVoiceNote?: boolean;
  voiceTranscript?: string;
  voiceDurationSec?: number;
  link?: { displayText: string; actualUrl: string };
  attachmentLabel?: string;   // describes a "photo" or "listing" attachment
}

export interface InboxScenario {
  id: string;
  platform: Platform;
  sender: InboxSender;
  messages: InboxMessage[];
  timestamp: string;          // displayed (e.g. "11:47 pm", "Mon 3:24 pm")
  subjectLine?: string;       // for gmail
  verdict: Verdict;

  // when verdict = scam
  pokemonSlug?: string;       // links to Pokédex entry; triggers encounter on correct call
  whyItsScamLesson?: string;  // shown if player missed it

  // when verdict = legit
  whyItsLegitLesson?: string; // shown if player flagged it as scam (false alarm)

  redFlagsToTeach?: string[]; // shown on the verdict reveal (for both correct + missed)
}

// ---------- Encounter layer ----------

export type ChoiceId = "a" | "b" | "c";

export interface EncounterChoice {
  id: ChoiceId;
  text: string;
  dangerScore: 0 | 1 | 2 | 3 | 4 | 5;
  redFlagsCaught?: string[];
  redFlagsMissed?: string[];
  nextTurn: EncounterTurn | null;   // null = encounter ends after this choice
  endingNote?: string;              // shown briefly on terminal choices
}

export interface EncounterTurn {
  scammerMessage: string;
  coachingFeedback?: string;        // brief reaction to the prior choice
  choices: [EncounterChoice, EncounterChoice, EncounterChoice];
}

export interface EncounterStarter {
  tokens: Record<string, string[]>;
  openingMessage: string;
  firstChoices: [EncounterChoice, EncounterChoice, EncounterChoice];
}

export interface EncounterTree {
  pokemonSlug: string;
  channelLabel: string;             // "Incoming WhatsApp voice note", "Instagram DM"
  starters: EncounterStarter[];
  redFlagDescriptions: Record<string, string>;
  starTierMessages: Record<1 | 2 | 3, string[]>;
}

// ---------- Runtime state ----------

export interface EncounterHistoryItem {
  scammerRaw: string;               // raw template (use hydrate to render)
  coachingFeedback?: string;
  playerChoiceText?: string;
  playerChoiceDanger?: number;
  endingNote?: string;
}

export interface EncounterState {
  pokemonSlug: string;
  tokens: Record<string, string>;
  history: EncounterHistoryItem[];
  currentChoices: [EncounterChoice, EncounterChoice, EncounterChoice] | null;
  redFlagsCaught: string[];
  redFlagsMissed: string[];
  totalDanger: number;
  isFinished: boolean;
}

export interface EncounterReport {
  stars: 1 | 2 | 3;
  summary: string;
  redFlagsCaught: { id: string; description: string }[];
  redFlagsMissed: { id: string; description: string }[];
  totalDanger: number;
}

// ---------- Token hydration ----------

export function hydrate(text: string, tokens: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (_, key) => tokens[key] ?? `{${key}}`);
}

function pickRandom<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function pickTokens(pools: Record<string, string[]>, rng: () => number): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, vs] of Object.entries(pools)) {
    out[k] = pickRandom(vs, rng);
  }
  return out;
}

// ---------- Encounter lifecycle ----------

export function startEncounter(
  tree: EncounterTree,
  rng: () => number = Math.random,
): EncounterState {
  const starter = pickRandom(tree.starters, rng);
  const tokens = pickTokens(starter.tokens, rng);
  return {
    pokemonSlug: tree.pokemonSlug,
    tokens,
    history: [{ scammerRaw: starter.openingMessage }],
    currentChoices: starter.firstChoices,
    redFlagsCaught: [],
    redFlagsMissed: [],
    totalDanger: 0,
    isFinished: false,
  };
}

export function submitChoice(
  state: EncounterState,
  choiceId: ChoiceId,
): EncounterState {
  if (state.isFinished || !state.currentChoices) {
    return state;
  }
  const choice = state.currentChoices.find((c) => c.id === choiceId);
  if (!choice) {
    return state;
  }

  const newCaught = mergeFlags(state.redFlagsCaught, choice.redFlagsCaught);
  const newMissed = mergeFlags(state.redFlagsMissed, choice.redFlagsMissed);
  const newDanger = state.totalDanger + choice.dangerScore;

  const newHistory: EncounterHistoryItem[] = [...state.history];
  const last = newHistory[newHistory.length - 1];
  newHistory[newHistory.length - 1] = {
    ...last,
    playerChoiceText: choice.text,
    playerChoiceDanger: choice.dangerScore,
    endingNote: choice.nextTurn ? undefined : choice.endingNote,
  };

  if (choice.nextTurn) {
    newHistory.push({
      scammerRaw: choice.nextTurn.scammerMessage,
      coachingFeedback: choice.nextTurn.coachingFeedback,
    });
    return {
      ...state,
      history: newHistory,
      currentChoices: choice.nextTurn.choices,
      redFlagsCaught: newCaught,
      redFlagsMissed: newMissed,
      totalDanger: newDanger,
      isFinished: false,
    };
  }

  return {
    ...state,
    history: newHistory,
    currentChoices: null,
    redFlagsCaught: newCaught,
    redFlagsMissed: newMissed,
    totalDanger: newDanger,
    isFinished: true,
  };
}

function mergeFlags(existing: string[], incoming?: string[]): string[] {
  if (!incoming || incoming.length === 0) return existing;
  const set = new Set(existing);
  for (const f of incoming) set.add(f);
  return Array.from(set);
}

export function assembleReport(
  state: EncounterState,
  tree: EncounterTree,
  rng: () => number = Math.random,
): EncounterReport {
  const stars: 1 | 2 | 3 =
    state.totalDanger <= 2 ? 3 : state.totalDanger <= 6 ? 2 : 1;
  const summary = pickRandom(tree.starTierMessages[stars], rng);

  const caughtIds = new Set(state.redFlagsCaught);
  const missedIds = state.redFlagsMissed.filter((id) => !caughtIds.has(id));

  return {
    stars,
    summary,
    redFlagsCaught: state.redFlagsCaught.map((id) => ({
      id,
      description: tree.redFlagDescriptions[id] ?? id,
    })),
    redFlagsMissed: missedIds.map((id) => ({
      id,
      description: tree.redFlagDescriptions[id] ?? id,
    })),
    totalDanger: state.totalDanger,
  };
}

// ---------- Inbox run building ----------

export interface InboxRun {
  scenarios: InboxScenario[];
}

export function buildRun(
  pool: InboxScenario[],
  count = 8,
  rng: () => number = Math.random,
): InboxRun {
  const scams = shuffle(
    pool.filter((s) => s.verdict === "scam"),
    rng,
  );
  const legit = shuffle(
    pool.filter((s) => s.verdict === "legit"),
    rng,
  );
  const scamCount = Math.min(scams.length, Math.ceil(count * 0.6));
  const legitCount = Math.min(legit.length, count - scamCount);
  const picked = [
    ...scams.slice(0, scamCount),
    ...legit.slice(0, legitCount),
  ];
  return { scenarios: shuffle(picked, rng) };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- Verdict evaluation ----------

export type VerdictOutcome =
  | { kind: "scam-caught"; pokemonSlug: string; redFlags: string[] }
  | { kind: "scam-missed"; pokemonSlug: string; lesson?: string; redFlags: string[] }
  | { kind: "legit-confirmed"; lesson?: string }
  | { kind: "legit-false-alarm"; lesson?: string };

export function evaluateVerdict(
  scenario: InboxScenario,
  playerVerdict: Verdict,
): VerdictOutcome {
  if (scenario.verdict === "scam" && playerVerdict === "scam") {
    return {
      kind: "scam-caught",
      pokemonSlug: scenario.pokemonSlug ?? "",
      redFlags: scenario.redFlagsToTeach ?? [],
    };
  }
  if (scenario.verdict === "scam" && playerVerdict === "legit") {
    return {
      kind: "scam-missed",
      pokemonSlug: scenario.pokemonSlug ?? "",
      lesson: scenario.whyItsScamLesson,
      redFlags: scenario.redFlagsToTeach ?? [],
    };
  }
  if (scenario.verdict === "legit" && playerVerdict === "legit") {
    return { kind: "legit-confirmed", lesson: scenario.whyItsLegitLesson };
  }
  return { kind: "legit-false-alarm", lesson: scenario.whyItsLegitLesson };
}
