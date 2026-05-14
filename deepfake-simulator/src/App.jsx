import React, { useState, useCallback } from 'react'
import { AudioProvider } from './context/AudioContext'
import { PhoneFrame } from './components/PhoneFrame'
import { Intro } from './screens/Intro'
import { Training } from './screens/Training'
import { Test } from './screens/Test'
import { Results } from './screens/Results'
import { testSamples } from './data/testSamples'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const VIGIL_URL = 'https://projectvigil.vercel.app'

export default function App() {
  const [phase, setPhase] = useState('intro')
  const [score, setScore] = useState(0)
  const [shuffledTests, setShuffledTests] = useState([])

  const handleStart = useCallback(() => setPhase('training'), [])

  const handleStartTest = useCallback(() => {
    setShuffledTests(shuffle(testSamples))
    setPhase('test')
  }, [])

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

  const screen = (() => {
    switch (phase) {
      case 'intro':
        return <Intro onStart={handleStart} />
      case 'training':
        return <Training onContinue={handleStartTest} onBack={goToIntro} />
      case 'test':
        return <Test samples={shuffledTests} onComplete={handleComplete} onBackToTraining={goToTraining} />
      case 'results':
        return <Results score={score} onRetry={handleRetry} vigilUrl={VIGIL_URL} />
      default:
        return null
    }
  })()

  return (
    <AudioProvider>
      <PhoneFrame>
        <div className="min-h-screen bg-vigil-gradient">
          {screen}
        </div>
      </PhoneFrame>
    </AudioProvider>
  )
}
