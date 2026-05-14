import React, { useState } from 'react'
import { Check, ChevronLeft } from 'lucide-react'
import { VoiceNote } from '../components/VoiceNote'
import { Button } from '../components/Button'
import { trainingSamples, SUBJECT_NAME } from '../data/trainingSamples'

export function Training({ onContinue, onBack }) {
  const [played, setPlayed] = useState(new Set())

  const markPlayed = (id) => setPlayed(prev => new Set([...prev, id]))
  const allPlayed  = trainingSamples.every(s => played.has(s.id))
  const remaining  = trainingSamples.length - played.size

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 max-w-[420px] mx-auto">

      {/* Back */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1 mono-label text-[9px] uppercase tracking-[0.24em] text-white/35 hover:text-white/70 -ml-1 mb-6 self-start animate-fade-up"
          aria-label="Back to intro"
        >
          <ChevronLeft size={13} strokeWidth={2.5} />
          Back
        </button>
      )}

      {/* Header */}
      <div className="mb-8 animate-fade-up" style={{ animationDelay: '30ms' }}>
        <p className="mono-label text-[9px] uppercase tracking-[0.3em] text-white/35 mb-4">
          Phase 1 — Training
        </p>
        <h2 className="text-[28px] font-black leading-tight tracking-tight">
          Learn {SUBJECT_NAME}'s voice.
        </h2>
        <p className="text-[14px] text-white/65 mt-2.5 leading-relaxed">
          Listen to every sample before the test begins. Notice the rhythm, the breathing, the texture.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-7 animate-fade-up" style={{ animationDelay: '50ms' }}>
        <div className="flex justify-between mb-2">
          <span className="mono-label text-[9px] uppercase tracking-[0.22em] text-white/30">
            Progress
          </span>
          <span className="mono-label text-[9px] text-white/30 tabular-nums">
            {played.size} / {trainingSamples.length}
          </span>
        </div>
        <div className="h-[3px] rounded-full bg-white/8 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#00d4ff] transition-all duration-500"
            style={{ width: `${(played.size / trainingSamples.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Samples */}
      <div className="space-y-3 flex-1">
        {trainingSamples.map((sample, i) => {
          const done = played.has(sample.id)
          return (
            <div
              key={sample.id}
              className={`rounded-card border px-4 pt-4 pb-3.5 backdrop-blur-sm transition-all duration-400 animate-fade-up ${
                done
                  ? 'border-[#00d4ff]/22 bg-[#00d4ff]/5'
                  : 'border-white/8 bg-white/[0.03]'
              }`}
              style={{ animationDelay: `${80 + i * 50}ms` }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-3.5">
                <span className="mono-label text-[9px] uppercase tracking-[0.24em] text-white/35">
                  Sample {i + 1} of {trainingSamples.length}
                </span>
                {done && (
                  <span className="flex items-center gap-1 text-[#00d4ff]">
                    <Check size={11} strokeWidth={3} />
                    <span className="mono-label text-[9px] uppercase tracking-[0.18em]">Heard</span>
                  </span>
                )}
              </div>

              <VoiceNote
                src={`/audio/train/${sample.file}`}
                onPlayComplete={() => markPlayed(sample.id)}
              />
            </div>
          )
        })}
      </div>

      {/* Continue */}
      <div className="mt-8 animate-fade-up" style={{ animationDelay: '340ms' }}>
        <Button onClick={onContinue} disabled={!allPlayed} fullWidth>
          {allPlayed ? 'Continue to Test' : `${remaining} sample${remaining !== 1 ? 's' : ''} remaining`}
        </Button>
        {!allPlayed && (
          <p className="text-center mono-label text-[9px] uppercase tracking-[0.2em] text-white/25 mt-4">
            Play each clip to unlock
          </p>
        )}
      </div>
    </div>
  )
}
