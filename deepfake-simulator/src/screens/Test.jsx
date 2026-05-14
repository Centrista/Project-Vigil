import React, { useState, useRef, useEffect } from 'react'
import { CheckCircle, XCircle, Ear, ChevronLeft } from 'lucide-react'
import { VoiceNote } from '../components/VoiceNote'
import { Button } from '../components/Button'
import { useAudioContext } from '../context/AudioContext'

function vibrate(pattern) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try { navigator.vibrate(pattern) } catch { /* no-op */ }
  }
}

export function Test({ samples, onComplete, onBackToTraining }) {
  const [index,    setIndex]    = useState(0)
  const [revealed, setRevealed] = useState(null)
  const answers = useRef([])
  const { stopAll } = useAudioContext()

  const sample = samples[index]
  const isLast = index === samples.length - 1

  const answer = (choice) => {
    if (revealed) return
    stopAll()
    const correct = sample.isAI === (choice === 'ai')
    setRevealed({ choice, correct })
    vibrate(correct ? 40 : [60, 30, 60])
  }

  const next = () => {
    answers.current.push({ ...sample, choice: revealed.choice, correct: revealed.correct })
    if (isLast) {
      onComplete(answers.current.filter(a => a.correct).length)
    } else {
      setIndex(i => i + 1)
      setRevealed(null)
    }
  }

  const back = () => {
    stopAll()
    if (index === 0) {
      onBackToTraining?.()
    } else {
      // Pop the previous clip's finalised answer so it can be re-answered
      answers.current.pop()
      setIndex(i => i - 1)
      setRevealed(null)
    }
  }

  // Keyboard shortcuts (R = real, A = AI, Enter = advance, Esc = back)
  useEffect(() => {
    const handler = (e) => {
      if (e.target?.tagName === 'INPUT' || e.target?.tagName === 'TEXTAREA') return
      const key = e.key.toLowerCase()
      if (!revealed && (key === 'r' || key === 'a')) {
        e.preventDefault()
        answer(key === 'r' ? 'real' : 'ai')
      } else if (revealed && (key === 'enter' || key === ' ')) {
        e.preventDefault()
        next()
      } else if (key === 'escape') {
        e.preventDefault()
        back()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [revealed, index])

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 max-w-[420px] mx-auto">

      {/* Back */}
      <button
        onClick={back}
        className="flex items-center gap-1 mono-label text-[9px] uppercase tracking-[0.24em] text-white/35 hover:text-white/70 -ml-1 mb-6 self-start animate-fade-up"
        aria-label={index === 0 ? 'Back to training' : 'Previous clip'}
      >
        <ChevronLeft size={13} strokeWidth={2.5} />
        {index === 0 ? 'Training' : 'Previous'}
      </button>

      {/* Header */}
      <div className="mb-7 animate-fade-up" style={{ animationDelay: '30ms' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="mono-label text-[9px] uppercase tracking-[0.3em] text-white/35">
            Phase 2 — Test
          </p>
          <span className="mono-label text-[9px] text-white/28 tabular-nums">
            {index + 1} / {samples.length}
          </span>
        </div>

        {/* Step indicators */}
        <div className="flex gap-1.5">
          {samples.map((_, i) => {
            const isPast    = i < index
            const isCurrent = i === index
            const pastOk    = answers.current[i]?.correct
            const isDone    = isPast || (isCurrent && !!revealed)
            const isOk      = isPast ? pastOk : (isCurrent && revealed ? revealed.correct : null)

            return (
              <div
                key={i}
                className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${
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
      <div className="mb-6 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <h2 className="text-[26px] font-black tracking-tight">
          {revealed ? 'Verdict.' : 'Real or AI?'}
        </h2>
        <p className="text-[13px] text-white/50 mt-1">
          {revealed
            ? sample.isAI ? 'That was AI-generated.' : 'That was a real recording.'
            : 'Listen first, then decide.'}
        </p>
      </div>

      {/* Voice note */}
      <div
        className="rounded-card border border-white/8 bg-white/[0.03] backdrop-blur-sm px-4 pt-4 pb-3.5 mb-6 animate-fade-up"
        style={{ animationDelay: '100ms' }}
      >
        <VoiceNote
          key={index}
          src={`/audio/test/${sample.file}`}
          label={`Clip ${index + 1}`}
        />
      </div>

      {/* Answer / Reveal */}
      {!revealed ? (
        <div
          className="grid grid-cols-2 gap-3 animate-fade-up"
          style={{ animationDelay: '140ms' }}
        >
          <button
            onClick={() => answer('real')}
            className="flex flex-col items-center justify-center gap-2 rounded-card border border-[#22c55e]/25 bg-[#22c55e]/6 backdrop-blur-sm py-7 px-3 active:scale-[0.97] hover:border-[#22c55e]/45 hover:bg-[#22c55e]/12 transition-all duration-200"
          >
            <span className="text-[17px] font-black text-white tracking-tight">REAL</span>
            <span className="mono-label text-[9px] uppercase tracking-[0.22em] text-white/40">Human voice</span>
          </button>

          <button
            onClick={() => answer('ai')}
            className="flex flex-col items-center justify-center gap-2 rounded-card border border-[#ff1744]/25 bg-[#ff1744]/6 backdrop-blur-sm py-7 px-3 active:scale-[0.97] hover:border-[#ff1744]/45 hover:bg-[#ff1744]/12 transition-all duration-200"
          >
            <span className="text-[17px] font-black text-white tracking-tight">AI FAKE</span>
            <span className="mono-label text-[9px] uppercase tracking-[0.22em] text-white/40">AI-cloned</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3 animate-reveal">
          <div className={`rounded-card border px-5 py-4 flex items-start gap-3 backdrop-blur-sm ${
            revealed.correct
              ? 'border-[#22c55e]/22 bg-[#22c55e]/7'
              : 'border-[#ff1744]/22 bg-[#ff1744]/7'
          }`}>
            {revealed.correct
              ? <CheckCircle size={18} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
              : <XCircle    size={18} className="text-[#ff1744] flex-shrink-0 mt-0.5" />
            }
            <div>
              <p className="text-[15px] font-black text-white leading-snug">
                {revealed.correct ? 'Correct.' : "Wrong. Scammers count on this."}
              </p>
              <p className="text-[13px] text-white/55 mt-0.5">
                {sample.isAI ? 'AI-generated.' : 'Real recording.'}
              </p>
            </div>
          </div>

          <div className="rounded-card border border-white/8 bg-white/[0.03] backdrop-blur-sm px-5 py-4">
            <div className="flex items-center gap-2 mb-2.5">
              <Ear size={12} className="text-[#00d4ff]" />
              <span className="mono-label text-[9px] uppercase tracking-[0.24em] text-[#00d4ff]/65">
                Listen for this
              </span>
            </div>
            <p className="text-[13px] text-white/78 leading-relaxed">{sample.tell}</p>
          </div>

          <Button onClick={next} fullWidth>
            {isLast ? 'See Results' : 'Next Clip'}
          </Button>
        </div>
      )}
    </div>
  )
}
