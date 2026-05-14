// ─── EDIT THIS FILE ──────────────────────────────────────────────────────────
// Single source of truth for both Voice and Image deepfake test data.
// Replace SUBJECT_NAME with the person whose voice + photos you're using.
// ────────────────────────────────────────────────────────────────────────────
export const SUBJECT_NAME = 'Alex'

// ─── VOICE MODE ──────────────────────────────────────────────────────────────
// Drop MP3s into:
//   public/audio/train/train-1..5.mp3
//   public/audio/test/test-1..4.mp3
export const voiceSamples = {
  training: [
    { id: 1, file: 'train-1.mp3' },
    { id: 2, file: 'train-2.mp3' },
    { id: 3, file: 'train-3.mp3' },
    { id: 4, file: 'train-4.mp3' },
    { id: 5, file: 'train-5.mp3' },
  ],
  test: [
    {
      id: 1, file: 'test-1.mp3', isAI: true,
      tell: "Slight robotic cadence on stressed syllables — real voices have micro-irregularities in pitch that AI clones flatten out.",
    },
    {
      id: 2, file: 'test-2.mp3', isAI: false,
      tell: "Genuine recording. Natural breath before the sentence and faint room echo — AI struggles to replicate ambient noise convincingly.",
    },
    {
      id: 3, file: 'test-3.mp3', isAI: true,
      tell: "Listen for the metallic tail at the end of words ending in 's' — a signature of current voice synthesis models.",
    },
    {
      id: 4, file: 'test-4.mp3', isAI: false,
      tell: "Real voice. Slight breath irregularity and natural speed variation — human rhythm is unpredictable in ways AI smooths away.",
    },
  ],
}

// ─── IMAGE MODE ──────────────────────────────────────────────────────────────
// Drop JPGs into:
//   public/images/train/train-1..5.jpg
//   public/images/test/test-1..4.jpg
//
// Training images = 5 real photos of the SAME person, varied angles/lighting.
// Test images = 2 real + 2 AI-generated portraits. Set isAI accordingly.
export const imageSamples = {
  training: [
    { id: 1, file: 'train-1.jpg' },
    { id: 2, file: 'train-2.jpg' },
    { id: 3, file: 'train-3.jpg' },
    { id: 4, file: 'train-4.jpg' },
    { id: 5, file: 'train-5.jpg' },
  ],
  test: [
    {
      id: 1, file: 'test-1.jpg', isAI: true,
      tell: "AI-generated. Look at the ears, jewellery, and background — AI image models often produce asymmetric or melting details on these.",
    },
    {
      id: 2, file: 'test-2.jpg', isAI: false,
      tell: "Real photo. Notice the natural skin texture with pores and unevenness — AI faces tend to look unnaturally smooth.",
    },
    {
      id: 3, file: 'test-3.jpg', isAI: true,
      tell: "AI-generated. Check the eyes — pupil shapes are slightly off, and reflections in both eyes don't match.",
    },
    {
      id: 4, file: 'test-4.jpg', isAI: false,
      tell: "Real photo. Note the asymmetric expression and natural shadows — AI portraits often have suspiciously perfect symmetry.",
    },
  ],
}
