import React, { useState, useRef, useEffect } from 'react'
import { Eye, Ear, ChevronLeft } from 'lucide-react'
import { VoiceNote } from '../components/VoiceNote'
import { ImageNote } from '../components/ImageNote'
import { TypingIndicator } from '../components/TypingIndicator'
import { ChoiceBubble } from '../components/ChoiceBubble'
import { VerdictBubble } from '../components/VerdictBubble'
import { TellBubble } from '../components/TellBubble'
import { Button } from '../components/Button'
import { useAudioContext } from '../context/AudioContext'
import { useReveal } from '../hooks/useReveal'

function vibrate(pattern) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try { navigator.vibrate(pattern) } catch { /* no-op */ }
  }
}

const COPY = {
  voice: {
    phaseLabel: 'Phase 2 — Voice Test',
    askPrompt:  'Real or AI?',
    askSub:     'Listen first, then decide.',
    tellHeader: 'Listen for this',
    tellIcon: Ear,
    clipLabel: (n) => `Clip ${n}`,
    mediaPath: 'audio/test',
  },
  image: {
    phaseLabel: 'Phase 2 — Image Test',
    askPrompt:  'Real or AI?',
    askSub:     'Study the photo carefully.',
    tellHeader: 'Look for this',
    tellIcon: Eye,
    clipLabel: (n) => `Photo ${n}`,
    mediaPath: 'images/test',
  },
}

export function Test({ mode, samples, onComplete, onBackToTraining }) {
  const c = COPY[mode] ?? COPY.voice
  const [index, setIndex] = useState(0)
  const answers = useRef([])
  const { stopAll } = useAudioContext()
  const reveal = useReveal()

  const sample = samples[index]
  const isLast = index === samples.length - 1

  // Auto-scroll the latest bubble into view at the bottom of the iframe viewport
  const lastBubbleRef = useRef(null)
  useEffect(() => {
    if (lastBubbleRef.current) {
      lastBubbleRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [reveal.phase])

  const answer = (choice) => {
    if (!reveal.isIdle) return
    stopAll()
    const correct = sample.isAI === (choice === 'ai')
    reveal.submit(choice, correct)
    vibrate(correct ? 40 : [60, 30, 60])
  }

  const next = () => {
    answers.current.push({ ...sample, choice: reveal.choice, correct: reveal.correct })
    reveal.reset()
    if (isLast) {
      onComplete(answers.current.filter(a => a.correct).length)
    } else {
      setIndex(i => i + 1)
    }
  }

  const back = () => {
    stopAll()
    reveal.reset()
    if (index === 0) {
      onBackToTraining?.()
    } else {
      answers.current.pop()
      setIndex(i => i - 1)
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.target?.tagName === 'INPUT' || e.target?.tagName === 'TEXTAREA') return
      const key = e.key.toLowerCase()

      if (reveal.isIdle && (key === 'r' || key === 'a')) {
        e.preventDefault()
        answer(key === 'r' ? 'real' : 'ai')
      } else if (!reveal.isIdle && !reveal.isComplete && (key === 'enter' || key === ' ')) {
        e.preventDefault()
        reveal.skip()
      } else if (reveal.isComplete && (key === 'enter' || key === ' ')) {
        e.preventDefault()
        next()
      } else if (key === 'escape') {
        e.preventDefault()
        back()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [reveal.phase, reveal.isIdle, reveal.isComplete, index])

  return (
    <div className="flex-1 flex flex-col px-6 pt-6 pb-12 max-w-[420px] mx-auto w-full">

      {/* Back */}
      <button
        onClick={back}
        className="flex items-center gap-1 mono-label text-[9px] uppercase tracking-[0.24em] text-white/35 hover:text-white/70 -ml-1 mb-5 self-start animate-fade-up"
      >
        <ChevronLeft size={13} strokeWidth={2.5} />
        {index === 0 ? (mode === 'image' ? 'Intro' : 'Training') : 'Previous'}
      </button>

      {/* Header + step dots */}
      <div className="mb-6 animate-fade-up" style={{ animationDelay: '30ms' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="mono-label text-[9px] uppercase tracking-[0.3em] text-white/35">
            {c.phaseLabel}
          </p>
          <span className="mono-label text-[9px] text-white/28 tabular-nums">
            {index + 1} / {samples.length}
          </span>
        </div>

        <div className="flex gap-1.5">
          {samples.map((_, i) => {
            const isPast    = i < index
            const isCurrent = i === index
            const pastOk    = answers.current[i]?.correct
            const isDone    = isPast || (isCurrent && reveal.showsVerdict)
            const isOk      = isPast ? pastOk : (isCurrent && reveal.showsVerdict ? reveal.correct : null)
            return (
              <div
                key={i}
                className={`h-[3px] flex-1 rounded-full transition-all duration-500 ${
                  isDone
                    ? isOk ? 'bg-[#22c55e]' : 'bg-[#ff1744]'
                    : isCurrent ? 'bg-white/40' : 'bg-white/10'
                }`}
              />
            )
          })}
        </div>
      </div>

      {/* Prompt */}
      <div className="mb-5 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <h2 className="text-[26px] font-black tracking-tight">{c.askPrompt}</h2>
        <p className="text-[13px] text-white/50 mt-1">{c.askSub}</p>
      </div>

      {/* Conversation: media + reveal sequence */}
      <div className="space-y-3 mb-6">
        {/* Media bubble (always shown) */}
        <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
          {mode === 'voice' ? (
            <VoiceNote
              key={index}
              src={`/${c.mediaPath}/${sample.file}`}
              label={c.clipLabel(index + 1)}
            />
          ) : (
            <ImageNote
              key={index}
              src={`/${c.mediaPath}/${sample.file}`}
              label={c.clipLabel(index + 1)}
            />
          )}
        </div>

        {/* User's choice (right side, sent) */}
        {reveal.showsChoice && (
          <div ref={!reveal.showsTypingVerdict && !reveal.showsVerdict ? lastBubbleRef : null}>
            <ChoiceBubble choice={reveal.choice} />
          </div>
        )}

        {/* Typing indicator before verdict */}
        {reveal.showsTypingVerdict && (
          <div ref={lastBubbleRef}>
            <TypingIndicator side="left" />
          </div>
        )}

        {/* Verdict bubble */}
        {reveal.showsVerdict && (
          <div ref={!reveal.showsTypingTell && !reveal.showsTell ? lastBubbleRef : null}>
            <VerdictBubble correct={reveal.correct} isAI={sample.isAI} mode={mode} />
          </div>
        )}

        {/* Typing indicator before tell */}
        {reveal.showsTypingTell && (
          <div ref={lastBubbleRef}>
            <TypingIndicator side="left" />
          </div>
        )}

        {/* Tell bubble */}
        {reveal.showsTell && (
          <div ref={lastBubbleRef}>
            <TellBubble
              tellHeader={c.tellHeader}
              tellIcon={c.tellIcon}
              tell={sample.tell}
            />
          </div>
        )}
      </div>

      {/* Answer buttons (only when idle) OR Next button (when complete) */}
      {reveal.isIdle ? (
        <div className="grid grid-cols-2 gap-3 animate-fade-up" style={{ animationDelay: '140ms' }}>
          <button
            onClick={() => answer('real')}
            className="flex flex-col items-center justify-center gap-2 rounded-card border border-[#22c55e]/25 bg-[#22c55e]/6 backdrop-blur-sm py-7 px-3 active:scale-[0.97] hover:border-[#22c55e]/45 hover:bg-[#22c55e]/12 transition-all duration-200"
          >
            <span className="text-[17px] font-black text-white tracking-tight">REAL</span>
            <span className="mono-label text-[9px] uppercase tracking-[0.22em] text-white/40">
              {mode === 'voice' ? 'Human voice' : 'Real photo'}
            </span>
          </button>
          <button
            onClick={() => answer('ai')}
            className="flex flex-col items-center justify-center gap-2 rounded-card border border-[#ff1744]/25 bg-[#ff1744]/6 backdrop-blur-sm py-7 px-3 active:scale-[0.97] hover:border-[#ff1744]/45 hover:bg-[#ff1744]/12 transition-all duration-200"
          >
            <span className="text-[17px] font-black text-white tracking-tight">AI FAKE</span>
            <span className="mono-label text-[9px] uppercase tracking-[0.22em] text-white/40">
              {mode === 'voice' ? 'AI-cloned' : 'AI-generated'}
            </span>
          </button>
        </div>
      ) : reveal.isComplete ? (
        <div className="animate-slide-up-fade">
          <Button onClick={next} fullWidth>
            {isLast ? 'See Results' : 'Next'}
          </Button>
        </div>
      ) : (
        // Mid-sequence: subtle hint that tapping advances
        <div className="text-center mono-label text-[9px] uppercase tracking-[0.24em] text-white/22 py-3">
          Tap space to skip
        </div>
      )}
    </div>
  )
}
