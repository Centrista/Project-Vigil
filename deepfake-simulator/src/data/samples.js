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
// Test pool: 204 photos (102 AI + 102 real). Each session draws 5 + 5 at random.
//
// File layout in public/images/test/
//   test-1..102.jpg    → AI-generated (StyleGAN, thispersondoesnotexist.com)
//   test-103..204.jpg  → Real portraits (Unsplash + Pexels CDN)
const AI_TELLS = [
  "AI-generated. Look closely at the eyes — the pupils are often slightly different shapes between the left and right side, and the catchlights (the bright reflection of the light source) don't always match. Real cameras capture light from one source, so reflections in both eyes should be identical in shape and position. When they differ, it's almost always a synthetic image.",
  "AI-generated. Pay attention to ears and jewellery. AI models struggle with small repeating shapes, so earrings often don't match each other (different size, style, or one missing entirely), and ears can have warped folds or impossible geometry. Real photos always have a matched pair, even if one is partly hidden by hair.",
  "AI-generated. The skin looks a touch too smooth — almost airbrushed. AI tends to flatten the natural pores, fine lines, and tiny colour variations that every real face has. If a 30-year-old's cheeks look as smooth as polished plastic, that's the AI giveaway. Zoom in mentally and ask: would a real camera see this much detail vanish?",
  "AI-generated. Look at where the hair meets the background. On a real photo, individual strands have crisp, distinct outlines. On AI, hair tends to fade, melt, or blur into the background as if the model couldn't decide where the head ends. Stray flyaway hairs are also rare in AI portraits — real life is much messier.",
  "AI-generated. The face is suspiciously symmetric. Real human faces are subtly asymmetric — one eye sits slightly higher, one nostril is bigger, one side of the mouth pulls more when smiling. AI loves perfect symmetry because it's a statistical average of training data. If the two halves look like mirror images, be suspicious.",
  "AI-generated. Check teeth, collars, glasses, and any clothing pattern. AI often produces teeth of irregular sizes, collar lines that don't meet, or glasses with mismatched arms. Patterns on shirts can drift or contradict themselves across the image. These are exactly the small structured details current image models still struggle to render coherently.",
  "AI-generated. The background often looks generic, blurry, or slightly nonsensical when you focus on it. Real photos have a real place behind the person — recognisable shapes, consistent perspective, depth that makes sense. AI backgrounds tend to be a soft mush of colour or contain warped objects that wouldn't exist in reality.",
  "AI-generated. Look at the lighting on the face vs the background. Are the shadows consistent? Real cameras follow the laws of physics — if light hits the right cheek, shadows fall to the left. AI sometimes gets the direction subtly wrong, or the face looks lit from a different source than the background scene.",
]

const REAL_TELLS = [
  "Real photo. Notice the natural skin texture — pores, fine lines, slight redness around the nose, tiny blemishes. Real human skin has microscopic variations that no current AI bothers to recreate; AI faces look unnaturally smooth at the same zoom level. If you can see the texture of real skin, you're almost certainly looking at a real person.",
  "Real photo. Look at the asymmetry — one eyebrow slightly higher, one side of the mouth pulled differently when smiling, a nostril that's a touch bigger. Real faces are never perfectly symmetric, and small lopsided details are a strong sign of a real person. AI portraits, by contrast, tend toward an almost mathematical symmetry.",
  "Real photo. The background has real depth and consistent lighting. You can usually tell what the place is — an office, a park, a wall — and the depth-of-field blur falls off naturally. AI backgrounds often look like a soft generic blur with no recognisable objects, or contain warped shapes that wouldn't exist anywhere in real life.",
  "Real photo. Hair strands have crisp, individual edges against the background, with stray flyaway hairs catching the light. AI tends to blur or melt hair edges into the background and rarely renders the unruly little strands real hair always has. If you can count individual hairs near the silhouette, it's real.",
  "Real photo. Spot the small imperfections — a stray hair across the forehead, a freckle, a small spot, slightly chapped lips, a bit of asymmetric eyeliner. These are the marks of a real life lived in a real body. AI smooths all of this away in pursuit of an idealised average face.",
  "Real photo. The catchlights in both eyes come from the same light source and have matching shapes. Look for the small bright spot in each pupil — on a real photo, both eyes catch the light identically (square light = square reflection). On an AI face, these reflections are often subtly different shapes or positioned inconsistently.",
  "Real photo. Pay attention to ears and accessories. The earrings match each other, the ears have realistic detail, and any jewellery has consistent metal sheen. Glasses, when present, sit naturally on the bridge of the nose with both arms behaving the same way. These are exactly the things AI gets wrong but cameras get right by default.",
  "Real photo. Notice that teeth, when visible, are slightly uneven and individual. Real teeth vary in size, shade, and alignment — that's normal human anatomy. AI sometimes generates teeth that all look the same shape or melt into one continuous shape. A natural mouth with believable, slightly imperfect teeth is a strong sign of a real photo.",
]

function buildImageTest() {
  const out = []
  // 102 AI faces → ids 1..102, files test-1.jpg..test-102.jpg
  for (let i = 1; i <= 102; i++) {
    out.push({
      id: i,
      file: `test-${i}.jpg`,
      isAI: true,
      tell: AI_TELLS[(i - 1) % AI_TELLS.length],
    })
  }
  // 102 real portraits → ids 103..204, files test-103.jpg..test-204.jpg
  for (let i = 103; i <= 204; i++) {
    out.push({
      id: i,
      file: `test-${i}.jpg`,
      isAI: false,
      tell: REAL_TELLS[(i - 103) % REAL_TELLS.length],
    })
  }
  return out
}

export const imageSamples = {
  training: [],
  test: buildImageTest(),
}
