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

const VIGIL_URL = 'https://projectvigil.vercel.app'

const SAMPLES = { voice: voiceSamples, image: imageSamples }

export default function App() {
  const [mode,  setMode]  = useState('voice')         // 'voice' | 'image'
  const [phase, setPhase] = useState('intro')         // 'intro' | 'training' | 'test' | 'results'
  const [score, setScore] = useState(0)
  const [shuffledTests, setShuffledTests] = useState([])

  const handleStart = useCallback(() => setPhase('training'), [])

  const handleStartTest = useCallback(() => {
    setShuffledTests(shuffle(SAMPLES[mode].test))
    setPhase('test')
  }, [mode])

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
            onBackToTraining={goToTraining}
          />
        )
      case 'results':
        return <Results mode={mode} score={score} onRetry={handleRetry} vigilUrl={VIGIL_URL} />
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
