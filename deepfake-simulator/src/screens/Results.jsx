import React, { useEffect, useState } from 'react'
import { ShieldAlert, Phone, MessageCircle, Key, Share2, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import confetti from 'canvas-confetti'
import { StatCard } from '../components/StatCard'
import { Button } from '../components/Button'
import { usePagedTransition } from '../hooks/usePagedTransition'

const SCORE_MAP = {
  4: { line: 'Sharp eyes and ears.',   sub: 'But scammers only need to fool you once.',                color: 'text-[#22c55e]' },
  3: { line: 'Better than most.',      sub: 'One slip is all it takes. AI improves every month.',       color: 'text-[#00d4ff]' },
  2: { line: 'Coin-flip territory.',   sub: 'Scammers are counting on exactly this.',                   color: 'text-[#f59e0b]' },
  1: { line: "You're not alone.",      sub: "Most people can't tell. Now you know what to look for.",   color: 'text-[#ff1744]' },
  0: { line: "You're not alone.",      sub: "Most people can't tell. The good news: now you do.",       color: 'text-[#ff1744]' },
}

const STATS = {
  voice: [
    { value: '85%', label: 'voice match accuracy from 3 seconds of audio',          source: 'McAfee, 2023', accent: 'amber' },
    { value: '77%', label: 'of voice-clone victims lose money',                      source: 'McAfee, 2023', accent: 'red'   },
    { value: '56%', label: 'of SG businesses hit by audio deepfake fraud in 2024',   source: 'Regula, 2024', accent: 'cyan'  },
  ],
  image: [
    { value: '38.7%', label: 'higher rate at which AI faces fool humans vs real photos', source: 'PNAS, 2022',  accent: 'amber' },
    { value: '90%',   label: 'of deepfake images online use only one source photo',       source: 'iProov, 2024', accent: 'red'   },
    { value: '3,000%', label: 'rise in deepfake fraud attempts globally in 2023',         source: 'Sumsub, 2024', accent: 'cyan'  },
  ],
}

const STEPS = {
  voice: [
    { icon: Phone,         label: 'Hang up. Call back.',         desc: 'Use a saved number — not one they give you.' },
    { icon: MessageCircle, label: "Ask what only they'd know.",   desc: 'A real shared memory. AI has no answer.' },
    { icon: Key,           label: 'Set a family safe-word.',      desc: "One word to confirm it is really them. Do it tonight." },
  ],
  image: [
    { icon: Phone,         label: 'Verify on another channel.',   desc: 'Call or video-call from a number you already have.' },
    { icon: MessageCircle, label: 'Reverse-image search.',         desc: 'Drop the photo into Google Images to see where else it lives.' },
    { icon: Key,           label: 'Look at the small stuff.',     desc: 'Hands, teeth, ears, jewellery — AI struggles with detail.' },
  ],
}

const CALLOUT = {
  voice: {
    eyebrow: 'Singapore — March 2025',
    body: (
      <>A finance director wired <strong className="text-white">US$499,000</strong> after a Zoom call where every other attendee was <strong className="text-white">AI-generated.</strong></>
    ),
    source: 'Source: SPF',
  },
  image: {
    eyebrow: 'Hong Kong — February 2024',
    body: (
      <>A finance worker paid <strong className="text-white">US$25 million</strong> to scammers after a video call with what appeared to be his <strong className="text-white">company's CFO</strong> — entirely AI-generated.</>
    ),
    source: 'Source: SCMP',
  },
}

function fireConfetti() {
  const palette = ['#22c55e', '#00d4ff', '#f59e0b', '#ff1744', '#ffffff']
  const burst = (x) => confetti({
    particleCount: 60, spread: 70, startVelocity: 38,
    origin: { x, y: 0.7 }, colors: palette,
    disableForReducedMotion: true,
  })
  burst(0.25)
  setTimeout(() => burst(0.75), 180)
  setTimeout(() => burst(0.5),  320)
}

function useCountUp(target, durationMs = 700) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf
    const start = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - start) / durationMs)
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, durationMs])
  return value
}

export function Results({ mode, score, total = 4, onRetry, vigilUrl = 'https://projectvigil.vercel.app' }) {
  const copy   = SCORE_MAP[score] ?? SCORE_MAP[0]
  const stats  = STATS[mode]   ?? STATS.voice
  const steps  = STEPS[mode]   ?? STEPS.voice
  const callout = CALLOUT[mode] ?? CALLOUT.voice
  const displayedScore = useCountUp(score)

  const [page, setPage] = useState(0)
  const TOTAL_PAGES = 3
  const isLastPage = page === TOTAL_PAGES - 1
  const { direction, animKey } = usePagedTransition(page)

  const [shareState, setShareState] = useState('idle')

  // Confetti on perfect score (page 1 only)
  useEffect(() => {
    if (score === total && page === 0) {
      const t = setTimeout(fireConfetti, 400)
      return () => clearTimeout(t)
    }
  }, [score, total, page])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.target?.tagName === 'INPUT' || e.target?.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowRight' && !isLastPage) { e.preventDefault(); setPage(p => p + 1) }
      if (e.key === 'ArrowLeft'  && page > 0)    { e.preventDefault(); setPage(p => p - 1) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [page, isLastPage])

  const handleShare = async () => {
    const kind = mode === 'voice' ? 'voice' : 'image'
    const text = `I scored ${score}/${total} on Project Vigil's deepfake ${kind} test. Can you spot the AI fakes?`
    if (navigator.share) {
      try { await navigator.share({ title: 'Project Vigil', text, url: vigilUrl }); setShareState('shared') }
      catch { /* user cancelled */ }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${text} ${vigilUrl}`)
        setShareState('shared')
        setTimeout(() => setShareState('idle'), 2200)
      } catch { /* no-op */ }
    }
  }

  return (
    <div className="flex-1 flex flex-col px-6 pt-6 pb-12 max-w-[420px] mx-auto w-full">

      {/* Page dots */}
      <div className="flex items-center gap-1.5 mb-7 animate-fade-up">
        {Array.from({ length: TOTAL_PAGES }, (_, i) => (
          <div
            key={i}
            className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${
              i < page ? 'bg-[#00d4ff]/70' :
              i === page ? 'bg-white/60' :
                            'bg-white/10'
            }`}
          />
        ))}
      </div>

      {/* PAGE 1 — Score */}
      {page === 0 && (
        <div key={animKey} className={`flex-1 flex flex-col animate-slide-in-${direction}`}>
          <p className="mono-label text-[9px] uppercase tracking-[0.3em] text-white/35 mb-5">
            Your result
          </p>
          <div className={`text-[88px] font-black leading-none tracking-tight mb-3 tabular-nums animate-score-pulse ${copy.color}`}>
            {displayedScore}
            <span className="text-[36px] text-white/20 ml-1">/ {total}</span>
          </div>
          <h2 className="text-[24px] font-black text-white tracking-tight mb-3">
            {copy.line}
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed mb-6">{copy.sub}</p>

          <div className="mt-auto" />
        </div>
      )}

      {/* PAGE 2 — Stats + callout */}
      {page === 1 && (
        <div key={animKey} className={`flex-1 flex flex-col animate-slide-in-${direction}`}>
          <p className="mono-label text-[9px] uppercase tracking-[0.3em] text-white/35 mb-4">
            Why this matters
          </p>

          <div className="space-y-2.5 mb-5">
            {stats.map((s, i) => (
              <StatCard key={s.value} value={s.value} label={s.label} source={s.source} accent={s.accent} delay={i * 50} />
            ))}
          </div>

          <div className="rounded-card border border-[#ff1744]/18 bg-[#ff1744]/6 backdrop-blur-sm px-5 py-4">
            <p className="mono-label text-[9px] uppercase tracking-[0.24em] text-[#ff1744]/55 mb-2.5">
              {callout.eyebrow}
            </p>
            <p className="text-[13.5px] text-white/82 leading-relaxed">{callout.body}</p>
            <p className="mono-label text-[9px] text-white/25 mt-2.5">{callout.source}</p>
          </div>
        </div>
      )}

      {/* PAGE 3 — Action steps + buttons */}
      {page === 2 && (
        <div key={animKey} className={`flex-1 flex flex-col animate-slide-in-${direction}`}>
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert size={13} className="text-[#22c55e]" />
            <p className="mono-label text-[9px] uppercase tracking-[0.26em] text-white/35">
              What to do
            </p>
          </div>

          <div className="space-y-2 mb-7">
            {steps.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-card border border-white/8 bg-white/[0.025] backdrop-blur-sm px-4 py-3.5"
              >
                <div className="w-8 h-8 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={14} className="text-white/55" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white leading-snug">{label}</p>
                  <p className="text-[12px] text-white/50 leading-snug mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={onRetry} fullWidth>Try Again</Button>

            <button
              onClick={handleShare}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-btn text-[15px] leading-none bg-white/6 text-white font-semibold border border-white/15 hover:bg-white/11 hover:border-white/22 active:scale-[0.97] transition-all duration-200"
            >
              {shareState === 'shared'
                ? <><Check size={14} /> Copied</>
                : <><Share2 size={14} /> Share result</>
              }
            </button>

            <a href={vigilUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
              <Button variant="secondary" fullWidth>Back to Project Vigil</Button>
            </a>
          </div>
        </div>
      )}

      {/* Footer nav (pages 1 & 2 only — page 3 has action buttons) */}
      {!isLastPage && (
        <div className="flex items-center gap-3 mt-8 animate-fade-up">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous"
            className="w-12 h-12 rounded-btn border border-white/12 bg-white/[0.04] flex items-center justify-center text-white/70 hover:bg-white/10 hover:border-white/20 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => setPage(p => p + 1)}
            className="flex-1 h-12 rounded-btn border border-white/15 bg-white/6 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/12 hover:border-white/22 active:scale-[0.98] transition-all duration-200"
          >
            Next
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      )}

      <p className="text-center mono-label text-[9px] uppercase tracking-[0.22em] text-white/18 mt-8">
        Project Vigil — Hwa Chong Institution
      </p>
    </div>
  )
}
