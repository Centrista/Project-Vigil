import React, { useState, useCallback } from 'react'
import { AudioProvider } from './context/AudioContext'
import { PhoneFrame } from './components/PhoneFrame'
import { ModeToggle } from './components/ModeToggle'
import { Intro } from './screens/Intro'
import { Training } from './screens/Training'
import { Test } from './screens/Test'
import { Results } from './screens/Results'
import { voiceSamples, imageSamples } from './data/samples'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Reject sequences that look too patterned to feel random — strict alternation
// (R/A/R/A/...) and long single-type runs both read as "rigged" to players.
function looksPatterned(seq) {
  if (seq.length < 3) return false
  const alternating = seq.every((s, i) => i === 0 || s.isAI !== seq[i - 1].isAI)
  if (alternating) return true
  let run = 1
  for (let i = 1; i < seq.length; i++) {
    run = seq[i].isAI === seq[i - 1].isAI ? run + 1 : 1
    if (run >= 4) return true
  }
  return false
}

// Image mode: pick 5 AI + 5 real from the pool, then shuffle order — but
// reroll if the shuffle came out strictly alternating or with a 4+ run.
// Voice mode: keep current behaviour (shuffle the whole 4-clip pool).
function pickSession(samples, mode) {
  if (mode !== 'image') return shuffle(samples)
  const ai   = shuffle(samples.filter(s =>  s.isAI)).slice(0, 5)
  const real = shuffle(samples.filter(s => !s.isAI)).slice(0, 5)
  let seq = shuffle([...ai, ...real])
  for (let tries = 0; tries < 20 && looksPatterned(seq); tries++) {
    seq = shuffle([...ai, ...real])
  }
  return seq
}

const VIGIL_URL = 'https://projectvigil.vercel.app'

const SAMPLES = { voice: voiceSamples, image: imageSamples }

export default function App() {
  const [mode,  setMode]  = useState('voice')         // 'voice' | 'image'
  const [phase, setPhase] = useState('intro')         // 'intro' | 'training' | 'test' | 'results'
  const [score, setScore] = useState(0)
  const [shuffledTests, setShuffledTests] = useState([])

  const handleStartTest = useCallback(() => {
    setShuffledTests(pickSession(SAMPLES[mode].test, mode))
    setPhase('test')
  }, [mode])

  // Image mode skips training — straight to the test.
  const handleStart = useCallback(() => {
    if (mode === 'image') {
      handleStartTest()
    } else {
      setPhase('training')
    }
  }, [mode, handleStartTest])

  const handleComplete = useCallback((finalScore) => {
    setScore(finalScore)
    setPhase('results')
  }, [])

  const handleRetry = useCallback(() => {
    setPhase('intro')
    setScore(0)
    setShuffledTests([])
  }, [])

  const goToIntro    = useCallback(() => setPhase('intro'),    [])
  const goToTraining = useCallback(() => setPhase('training'), [])

  const switchMode = useCallback((next) => {
    if (next === mode) return
    setMode(next)
    setPhase('intro')
    setScore(0)
    setShuffledTests([])
  }, [mode])

  const screen = (() => {
    const samples = SAMPLES[mode]
    switch (phase) {
      case 'intro':
        return <Intro mode={mode} onStart={handleStart} />
      case 'training':
        return (
          <Training
            mode={mode}
            samples={samples.training}
            onContinue={handleStartTest}
            onBack={goToIntro}
          />
        )
      case 'test':
        return (
          <Test
            mode={mode}
            samples={shuffledTests}
            onComplete={handleComplete}
            onBackToTraining={mode === 'image' ? goToIntro : goToTraining}
          />
        )
      case 'results':
        return (
          <Results
            mode={mode}
            score={score}
            total={shuffledTests.length || (mode === 'image' ? 10 : 4)}
            onRetry={handleRetry}
            vigilUrl={VIGIL_URL}
          />
        )
      default:
        return null
    }
  })()

  return (
    <AudioProvider>
      <PhoneFrame>
        <div className="min-h-screen bg-vigil-gradient flex flex-col">
          <ModeToggle mode={mode} onChange={switchMode} />
          {screen}
        </div>
      </PhoneFrame>
    </AudioProvider>
  )
}
