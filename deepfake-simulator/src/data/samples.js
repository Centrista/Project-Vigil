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
// No training phase — image mode goes straight from intro to test.
// Test pool: 84 photos (42 AI + 42 real). Each session draws 5 + 5 at random.
//
// File layout in public/images/test/
//   test-1..42.jpg   → AI-generated (StyleGAN, thispersondoesnotexist.com)
//   test-43..84.jpg  → Real portraits (Unsplash CDN)
const AI_TELLS = [
  "AI-generated. Look at the ears, jewellery, and background — AI image models often produce asymmetric or melting details on these.",
  "AI-generated. Check the eyes — pupil shapes are slightly off, and reflections in both eyes don't match.",
  "AI-generated. The skin is a touch too smooth — pores and fine lines are flattened in a way real cameras don't do.",
  "AI-generated. Hair near the edges blends oddly with the background — strands fade or melt instead of having clean outlines.",
  "AI-generated. Look for suspiciously perfect symmetry in the face — real faces are subtly asymmetric.",
  "AI-generated. Teeth, glasses, or collars often have warped or impossible geometry on close inspection.",
]

const REAL_TELLS = [
  "Real photo. Notice the natural skin texture with pores and unevenness — AI faces tend to look unnaturally smooth.",
  "Real photo. Note the asymmetric expression and natural shadows — AI portraits often have suspiciously perfect symmetry.",
  "Real photo. The background has consistent depth and lighting — AI often blurs or distorts it inconsistently.",
  "Real photo. Hair strands have crisp, individual outlines against the background — a giveaway AI struggles with.",
  "Real photo. Small imperfections — a stray hair, a freckle, an uneven eyebrow — that AI tends to smooth away.",
  "Real photo. Catchlights in both eyes match the same light source — AI sometimes gets these subtly inconsistent.",
]

function buildImageTest() {
  const out = []
  // 42 AI faces → ids 1..42, files test-1.jpg..test-42.jpg
  for (let i = 1; i <= 42; i++) {
    out.push({
      id: i,
      file: `test-${i}.jpg`,
      isAI: true,
      tell: AI_TELLS[(i - 1) % AI_TELLS.length],
    })
  }
  // 42 real portraits → ids 43..84, files test-43.jpg..test-84.jpg
  for (let i = 43; i <= 84; i++) {
    out.push({
      id: i,
      file: `test-${i}.jpg`,
      isAI: false,
      tell: REAL_TELLS[(i - 43) % REAL_TELLS.length],
    })
  }
  return out
}

export const imageSamples = {
  training: [],
  test: buildImageTest(),
}
