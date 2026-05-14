# Deepfake Voice Simulator — Project Vigil

Interactive voice deepfake recognition test. 4 phases: intro → training → test → results.
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

### Audio files

| Path | What goes here |
|------|---------------|
| `public/audio/train/train-1.mp3` | Training sample 1 (real voice) |
| `public/audio/train/train-2.mp3` | Training sample 2 (real voice) |
| `public/audio/train/train-3.mp3` | Training sample 3 (real voice) |
| `public/audio/train/train-4.mp3` | Training sample 4 (real voice) |
| `public/audio/train/train-5.mp3` | Training sample 5 (real voice) |
| `public/audio/test/test-1.mp3`   | Test sample 1 |
| `public/audio/test/test-2.mp3`   | Test sample 2 |
| `public/audio/test/test-3.mp3`   | Test sample 3 |
| `public/audio/test/test-4.mp3`   | Test sample 4 |

**Format:** MP3 recommended. Any browser-playable audio format works.  
**Missing files** show a clean "Audio not loaded" placeholder — they won't break the app.

### Avatar photo

Drop the person's photo at:
```
public/avatars/person.jpg
```

Recommended: square crop, ~200×200px min. Shows in the WhatsApp voice note bubble.
Missing photo falls back to a grey circle placeholder.

---

## Customising content

### Change the person's name
Edit `src/data/trainingSamples.js`:
```js
export const SUBJECT_NAME = 'Alex'  // ← change this
```

### Edit test sample tells (the explanations shown after each answer)
Edit `src/data/testSamples.js`:
```js
export const testSamples = [
  {
    id: 1,
    file: 'test-1.mp3',
    isAI: true,               // ← true = AI clone, false = genuine recording
    tell: "Slight robotic cadence on the word 'tomorrow'...",  // ← your real tell
  },
  // ...
]
```

The test samples are shuffled each session — you don't need to worry about order.

### Change the "Back to Project Vigil" link
In `src/App.jsx`, update:
```js
const VIGIL_URL = 'https://projectvigil.vercel.app'
```

---

## Deploying to Vercel

1. Push `deepfake-simulator/` to a GitHub repo (or deploy from this monorepo)
2. In Vercel dashboard → New Project → Import repo
3. **Set Root Directory to `deepfake-simulator`** (critical — the app lives in a subfolder)
4. Framework preset: Vite (auto-detected)
5. Deploy. Vercel will give you a URL like `vigil-deepfake-simulator.vercel.app`

The included `vercel.json` already sets `frame-ancestors *` so Google Sites and the main Project Vigil site can embed it.

### Wiring it into the main Project Vigil site

After deploying, the main Next.js site embeds this simulator at `/simulator`. Tell it where the simulator lives by setting an env var:

**On Vercel (main site project):**
1. Settings → Environment Variables
2. Add `NEXT_PUBLIC_SIMULATOR_URL` = your simulator's deployment URL (e.g. `https://vigil-deepfake-simulator.vercel.app`)
3. Redeploy the main site

**For local dev**, create `.env.local` in the main project root:
```
NEXT_PUBLIC_SIMULATOR_URL=https://your-simulator-url.vercel.app
```

If the env var is unset, the page falls back to a placeholder URL — the iframe shows a blank Vercel "not found" until you wire it in.

### Embedding in Google Sites (optional)

In Google Sites:
1. Insert → Embed → URL
2. Paste the simulator's Vercel URL directly
3. Resize the iframe to ~900px tall (the app scrolls within the iframe on shorter devices)

---

## File structure

```
deepfake-simulator/
  src/
    App.jsx                    # Phase state machine
    context/AudioContext.jsx   # Single-audio-at-a-time manager
    components/
      VoiceNote.jsx            # WhatsApp-style audio bubble
      Button.jsx               # Primary / secondary / danger variants
      StatCard.jsx             # Stat highlight cards
      PhoneFrame.jsx           # Optional phone chrome on desktop
    screens/
      Intro.jsx                # Phase 1 — hook + CTA
      Training.jsx             # Phase 2 — listen to real samples
      Test.jsx                 # Phase 3 — one-at-a-time challenge
      Results.jsx              # Phase 4 — score + debrief
    data/
      testSamples.js           # ← EDIT THIS for real tells + isAI flags
      trainingSamples.js       # ← EDIT THIS for subject name
  public/
    avatars/person.jpg         # ← DROP YOUR PHOTO HERE
    audio/train/train-1..5.mp3 # ← DROP TRAINING AUDIO HERE
    audio/test/test-1..4.mp3   # ← DROP TEST AUDIO HERE
```
