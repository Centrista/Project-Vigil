import React, { useEffect, useState } from 'react'
import { ShieldAlert, Phone, MessageCircle, Key, Share2, Check } from 'lucide-react'
import confetti from 'canvas-confetti'
import { StatCard } from '../components/StatCard'
import { Button } from '../components/Button'

const SCORE_MAP = {
  4: { line: 'Sharp ears.',              sub: 'But scammers only need to fool you once.',              color: 'text-[#22c55e]' },
  3: { line: 'Better than most.',        sub: 'One slip is all it takes. AI improves every month.',     color: 'text-[#00d4ff]' },
  2: { line: 'Coin-flip territory.',     sub: 'Scammers are counting on exactly this.',                 color: 'text-[#f59e0b]' },
  1: { line: "You're not alone.",        sub: "Most people can't tell. Now you know what to listen for.", color: 'text-[#ff1744]' },
  0: { line: "You're not alone.",        sub: "Most people can't tell. The good news: now you do.",     color: 'text-[#ff1744]' },
}

const STEPS = [
  { icon: Phone,         label: 'Hang up. Call back.',         desc: 'Use a saved number — not one they give you.' },
  { icon: MessageCircle, label: "Ask what only they'd know.",   desc: 'A real shared memory. AI has no answer.' },
  { icon: Key,           label: 'Set a family safe-word.',      desc: "One word to confirm it is really them. Do it tonight." },
]

function fireConfetti() {
  const palette = ['#22c55e', '#00d4ff', '#f59e0b', '#ff1744', '#ffffff']
  const burst = (xRatio) => confetti({
    particleCount: 60,
    spread: 70,
    startVelocity: 38,
    origin: { x: xRatio, y: 0.7 },
    colors: palette,
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
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, durationMs])
  return value
}

export function Results({ score, total = 4, onRetry, vigilUrl = 'https://projectvigil.vercel.app' }) {
  const copy = SCORE_MAP[score] ?? SCORE_MAP[0]
  const displayedScore = useCountUp(score)
  const [shareState, setShareState] = useState('idle') // 'idle' | 'shared'

  // Confetti on perfect score
  useEffect(() => {
    if (score === total) {
      const t = setTimeout(fireConfetti, 400)
      return () => clearTimeout(t)
    }
  }, [score, total])

  const handleShare = async () => {
    const text = `I scored ${score}/${total} on Project Vigil's deepfake voice test. Can you spot the AI fakes?`
    const url = vigilUrl
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Project Vigil — Deepfake Voice Test', text, url })
        setShareState('shared')
      } catch { /* user cancelled */ }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`)
        setShareState('shared')
        setTimeout(() => setShareState('idle'), 2200)
      } catch { /* no-op */ }
    }
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 max-w-[420px] mx-auto">

      {/* Score block */}
      <div className="mb-10 animate-fade-up">
        <p className="mono-label text-[9px] uppercase tracking-[0.3em] text-white/32 mb-5">
          Your result
        </p>
        <div className={`text-[84px] font-black leading-none tracking-tight mb-3 tabular-nums ${copy.color}`}>
          {displayedScore}
          <span className="text-[36px] text-white/20 ml-1">/ {total}</span>
        </div>
        <h2 className="text-[22px] font-black text-white tracking-tight mb-2">
          {copy.line}
        </h2>
        <p className="text-[14px] text-white/65 leading-relaxed">{copy.sub}</p>
      </div>

      {/* Stats */}
      <div className="mb-7 animate-fade-up" style={{ animationDelay: '60ms' }}>
        <p className="mono-label text-[9px] uppercase tracking-[0.28em] text-white/30 mb-3">
          The numbers
        </p>
        <div className="space-y-2.5">
          <StatCard value="85%" label="voice match accuracy from 3 seconds of audio"               source="McAfee, 2023" accent="amber" delay={60} />
          <StatCard value="77%" label="of voice-clone victims lose money"                          source="McAfee, 2023" accent="red"   delay={100} />
          <StatCard value="56%" label="of Singapore businesses hit by audio deepfake fraud in 2024" source="Regula, 2024" accent="cyan"  delay={140} />
        </div>
      </div>

      {/* Singapore case */}
      <div
        className="rounded-card border border-[#ff1744]/18 bg-[#ff1744]/6 backdrop-blur-sm px-5 py-5 mb-7 animate-fade-up"
        style={{ animationDelay: '190ms' }}
      >
        <p className="mono-label text-[9px] uppercase tracking-[0.24em] text-[#ff1744]/55 mb-3">
          Singapore — March 2025
        </p>
        <p className="text-[14px] text-white/82 leading-relaxed">
          A finance director wired{' '}
          <strong className="text-white">US$499,000</strong>{' '}
          after a Zoom call where every other attendee was{' '}
          <strong className="text-white">AI-generated.</strong>
        </p>
        <p className="mono-label text-[9px] text-white/25 mt-3">Source: SPF</p>
      </div>

      {/* Action steps */}
      <div className="mb-8 animate-fade-up" style={{ animationDelay: '240ms' }}>
        <div className="flex items-center gap-2 mb-3">
          <ShieldAlert size={13} className="text-[#22c55e]" />
          <p className="mono-label text-[9px] uppercase tracking-[0.26em] text-white/35">
            If you get a suspicious call
          </p>
        </div>

        <div className="space-y-2">
          {STEPS.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-card border border-white/8 bg-white/[0.025] backdrop-blur-sm px-4 py-3.5"
            >
              <div className="w-8 h-8 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon size={14} className="text-white/50" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-white leading-snug">{label}</p>
                <p className="text-[12px] text-white/50 leading-snug mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 animate-fade-up" style={{ animationDelay: '300ms' }}>
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

      <p className="text-center mono-label text-[9px] uppercase tracking-[0.22em] text-white/18 mt-6 pb-4">
        Project Vigil — Hwa Chong Institution
      </p>
    </div>
  )
}
