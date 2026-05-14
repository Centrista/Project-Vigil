import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { VoiceNote } from '../components/VoiceNote'
import { ImageNote } from '../components/ImageNote'
import { Button } from '../components/Button'
import { SUBJECT_NAME } from '../data/samples'
import { usePagedTransition } from '../hooks/usePagedTransition'

const COPY = {
  voice: {
    phaseLabel: 'Phase 1 — Voice Training',
    title: (name) => `Learn ${name}'s voice.`,
    sub: 'Listen to every sample before the test begins. Notice the rhythm, breathing, and texture.',
    sampleLabel: (i, total) => `Sample ${i + 1} of ${total}`,
  },
  image: {
    phaseLabel: 'Phase 1 — Image Training',
    title: (name) => `Learn ${name}'s face.`,
    sub: 'Study every photo before the test begins. Notice the eyes, skin texture, and bone structure.',
    sampleLabel: (i, total) => `Photo ${i + 1} of ${total}`,
  },
}

export function Training({ mode, samples, onContinue, onBack }) {
  const c = COPY[mode] ?? COPY.voice
  const [page, setPage] = useState(0)
  const { direction, animKey } = usePagedTransition(page)
  const isLast = page === samples.length - 1
  const sample = samples[page]

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.target?.tagName === 'INPUT' || e.target?.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowRight' && !isLast)  { e.preventDefault(); setPage(p => p + 1) }
      if (e.key === 'ArrowLeft'  && page > 0) { e.preventDefault(); setPage(p => p - 1) }
      if (e.key === 'Enter'      && isLast)   { e.preventDefault(); onContinue() }
      if (e.key === 'Escape'     && page === 0) { e.preventDefault(); onBack?.() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [page, isLast, onContinue, onBack])

  return (
    <div className="flex-1 flex flex-col px-6 pt-6 pb-12 max-w-[420px] mx-auto w-full">

      {/* Back */}
      {page === 0 && onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1 mono-label text-[9px] uppercase tracking-[0.24em] text-white/35 hover:text-white/70 -ml-1 mb-5 self-start animate-fade-up"
        >
          <ChevronLeft size={13} strokeWidth={2.5} />
          Back
        </button>
      )}

      {/* Header */}
      <div className="mb-7 animate-fade-up" style={{ animationDelay: page === 0 ? '30ms' : '0ms' }}>
        <p className="mono-label text-[9px] uppercase tracking-[0.3em] text-white/35 mb-3">
          {c.phaseLabel}
        </p>
        <h2 className="text-[26px] font-black leading-tight tracking-tight mb-2">
          {c.title(SUBJECT_NAME)}
        </h2>
        <p className="text-[13px] text-white/60 leading-relaxed">
          {c.sub}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-1.5 mb-6 animate-fade-up" style={{ animationDelay: '50ms' }}>
        {samples.map((_, i) => (
          <div
            key={i}
            className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${
              i < page  ? 'bg-[#00d4ff]/70' :
              i === page ? 'bg-white/55'    :
                            'bg-white/10'
            }`}
          />
        ))}
      </div>

      {/* Card */}
      <div
        key={animKey}
        className={`rounded-card border border-white/8 bg-white/[0.03] backdrop-blur-sm px-4 pt-4 pb-4 mb-6 flex-1 animate-slide-in-${direction}`}
      >
        <div className="flex items-center justify-between mb-3.5">
          <span className="mono-label text-[9px] uppercase tracking-[0.24em] text-white/35">
            {c.sampleLabel(page, samples.length)}
          </span>
          <span className="mono-label text-[9px] uppercase tracking-[0.18em] text-white/30 tabular-nums">
            {page + 1} / {samples.length}
          </span>
        </div>

        {mode === 'voice' ? (
          <VoiceNote
            key={sample.id}
            src={`/audio/train/${sample.file}`}
          />
        ) : (
          <ImageNote
            key={sample.id}
            src={`/images/train/${sample.file}`}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: '80ms' }}>
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          aria-label="Previous"
          className="w-12 h-12 rounded-btn border border-white/12 bg-white/[0.04] flex items-center justify-center text-white/70 hover:bg-white/10 hover:border-white/20 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>

        {isLast ? (
          <Button onClick={onContinue} fullWidth>
            Continue to Test
          </Button>
        ) : (
          <button
            onClick={() => setPage(p => p + 1)}
            className="flex-1 h-12 rounded-btn border border-white/15 bg-white/6 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/12 hover:border-white/22 active:scale-[0.98] transition-all duration-200"
          >
            Next
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  )
}
