export interface PokedexEntry {
  id: number;
  name: string;
  type: string;
  typeColor: string;
  emoji: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  habitat: string[];
  guideSlug?: string;
}

// Add new entries here — assign sequential IDs starting at 1.
// Example entry:
// {
//   id: 1,
//   name: "VoiceJack",
//   type: "Deepfake",
//   typeColor: "#ff6d00",
//   emoji: "🎙️",
//   description: "Clones a family member's voice from public audio in under 30 seconds, then calls the target pretending to be in distress.",
//   strengths: [
//     "Voice indistinguishable from real person",
//     "Exploits emotional panic response",
//     "Caller ID can be spoofed to match contacts",
//   ],
//   weaknesses: [
//     "Cannot hold an unscripted real-time conversation",
//     "A family code word instantly exposes it",
//     "Callback on the real number reveals the fraud",
//   ],
//   habitat: ["Phone Calls", "Voicemail"],
//   guideSlug: "voice-cloning",
// },

export const POKEDEX_ENTRIES: PokedexEntry[] = [];
