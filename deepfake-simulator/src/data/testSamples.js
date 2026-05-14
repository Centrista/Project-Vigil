// ─── EDIT THESE ────────────────────────────────────────────────────────────────
// isAI: true  = AI-cloned voice
// isAI: false = genuine recording
// tell: the explanation shown AFTER the user answers — customise with your real tells
export const testSamples = [
  {
    id: 1,
    file: 'test-1.mp3',
    isAI: true,
    tell: "That was AI. Notice the slightly robotic cadence on stressed syllables — real voices have micro-irregularities in pitch that AI clones flatten out.",
  },
  {
    id: 2,
    file: 'test-2.mp3',
    isAI: false,
    tell: "Genuine recording. Hear the natural breath before the sentence and the faint room echo — real environments have ambient noise AI can't convincingly replicate.",
  },
  {
    id: 3,
    file: 'test-3.mp3',
    isAI: true,
    tell: "AI-generated. Listen for the metallic tail artefact at the end of words ending in 's' — a signature of current neural voice synthesis models.",
  },
  {
    id: 4,
    file: 'test-4.mp3',
    isAI: false,
    tell: "Real voice. Note the slight breath irregularity and natural speed variation between words — human speech rhythm is unpredictable in ways AI smooths away.",
  },
]
