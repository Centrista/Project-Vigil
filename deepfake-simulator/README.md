# Deepfake Simulator — Project Vigil

Interactive deepfake recognition test with two modes: **Voice** and **Image**.
4 phases each: intro → training → test → results.
Built with React + Vite + Tailwind CSS. Iframe-ready for Google Sites.

---

## Quick start

```bash
cd deepfake-simulator
npm install
npm run dev          # → http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview production build locally
```

---

## Where to drop files

### Voice mode — audio files

| Path | What goes here |
|------|---------------|
| `public/audio/train/train-1.mp3` … `train-5.mp3` | 5 real voice samples of one person |
| `public/audio/test/test-1.mp3` … `test-4.mp3`   | 4 test clips (2 real, 2 AI-cloned) |

**Format:** MP3 recommended. Any browser-playable audio format works.

### Image mode — photo files

| Path | What goes here |
|------|---------------|
| `public/images/train/train-1.jpg` … `train-5.jpg` | 5 real photos of the same person, varied angles |
| `public/images/test/test-1.jpg` … `test-4.jpg`   | 4 test photos (2 real, 2 AI-generated portraits) |

**Format:** JPG or PNG. Aspect ratio ~4:5 portrait works best with the bubble layout.

### Avatar photo

```
public/avatars/person.jpg
```

Square crop ~200×200px. Shows in the small chat bubble avatar. Missing photo falls back to a person icon.

**Missing files of any kind** show a clean inline placeholder — the app won't break.

---

## Customising content

All sample data lives in **one file**: `src/data/samples.js`.

### Change the person's name
```js
export const SUBJECT_NAME = 'Alex'  // ← change this
```

### Edit voice test tells (the explanations shown after each answer)
```js
voiceSamples.test = [
  {
    id: 1, file: 'test-1.mp3',
    isAI: true,               // ← true = AI clone, false = genuine recording
    tell: "Slight robotic cadence on the word...",  // ← your real tell
  },
  ...
]
```

### Edit image test tells
```js
imageSamples.test = [
  {
    id: 1, file: 'test-1.jpg',
    isAI: true,
    tell: "AI-generated. Look at the ears...",
  },
  ...
]
```

The test samples are shuffled each session — order doesn't matter.

### Change the "Back to Project Vigil" link
In `src/App.jsx`, update:
```js
const VIGIL_URL = 'https://projectvigil.vercel.app'
```

---

## Features

- **Mode toggle** at top — switch between Voice / Image testing anytime (resets to intro of that mode)
- **Paginated Training** — one sample per page with Next/Prev nav (less scrolling)
- **Paginated Results** — score → stats → action steps (3 phone "pages")
- **Keyboard shortcuts**:
  - `R` / `A` → Real / AI Fake (during Test)
  - `Enter` / `Space` → advance after reveal
  - `←` / `→` → previous/next page (Training and Results)
  - `Esc` → back
- **Confetti** on a perfect 4/4 score
- **Share result** button (Web Share API + clipboard fallback)
- **Haptic feedback** on mobile (vibrate on answer)
- **Score count-up** animation on Results page 1

---

## Deploying to Vercel

1. Push `deepfake-simulator/` to a GitHub repo
2. In Vercel dashboard → **Add New → Project** → Import repo
3. **Set Root Directory to `deepfake-simulator`** (critical — the app lives in a subfolder)
4. Framework preset: Vite (auto-detected)
5. Deploy

The included `vercel.json` sets `frame-ancestors *` so Google Sites and the main Project Vigil site can embed it.

### Wiring it into the main Project Vigil site

The main Next.js site embeds this simulator at `/simulator`. After deploying, set the env var:

**On Vercel (main-site project):**
1. Settings → Environment Variables
2. Add `NEXT_PUBLIC_SIMULATOR_URL` = your simulator's deployment URL
3. Redeploy the main site

**For local dev**, create `.env.local` in the main project root:
```
NEXT_PUBLIC_SIMULATOR_URL=https://your-simulator-url.vercel.app
```

---

## File structure

```
deepfake-simulator/
  src/
    App.jsx                    # Mode + phase state machine
    context/AudioContext.jsx   # Single-audio-at-a-time manager
    components/
      VoiceNote.jsx            # WhatsApp-style audio bubble
      ImageNote.jsx            # WhatsApp-style photo bubble
      ModeToggle.jsx           # Voice / Image pill toggle
      Button.jsx, StatCard.jsx, PhoneFrame.jsx
    screens/
      Intro.jsx                # Phase 1 — hook + CTA (mode-aware copy)
      Training.jsx             # Phase 2 — paginated, one sample per page
      Test.jsx                 # Phase 3 — one-at-a-time challenge
      Results.jsx              # Phase 4 — 3 paginated pages
    data/
      samples.js               # ← EDIT THIS — all training + test data, both modes
  public/
    avatars/person.jpg         # ← DROP YOUR PHOTO HERE
    audio/train/train-1..5.mp3
    audio/test/test-1..4.mp3
    images/train/train-1..5.jpg
    images/test/test-1..4.jpg
```
