import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '../components/Button'

const COPY = {
  voice: {
    label: 'Voice Simulator',
    title: 'Can you tell when AI is',
    titleAccent: 'faking a voice?',
    body: (
      <>First you'll train on 5 real samples from one person. Then we play 4 new clips — 2 real, 2 AI-cloned. Spot the fakes.</>
    ),
    stat: <>AI clones a voice with <strong className="text-white font-bold">85% accuracy</strong> from just <strong className="text-white font-bold">3 seconds of audio.</strong></>,
    source: 'McAfee, 2023',
  },
  image: {
    label: 'Image Simulator',
    title: 'Can you spot an AI',
    titleAccent: 'generated face?',
    body: (
      <>First you'll study 5 real photos of one person. Then we show you 4 new photos — 2 real, 2 AI-generated. Spot the fakes.</>
    ),
    stat: <>AI-generated faces fool humans <strong className="text-white font-bold">38.7% more often</strong> than real photos.</>,
    source: 'PNAS, 2022',
  },
}

export function Intro({ mode, onStart }) {
  const c = COPY[mode] ?? COPY.voice

  return (
    <div className="flex-1 flex flex-col px-6 pt-6 pb-12 max-w-[420px] mx-auto w-full">

      <p className="mono-label text-[9px] uppercase tracking-[0.3em] text-white/40 mb-8 animate-fade-up">
        Project Vigil — {c.label}
      </p>

      <h1
        className="text-[40px] font-black leading-[1.05] mb-5 animate-fade-up"
        style={{ animationDelay: '60ms' }}
      >
        {c.title}{' '}
        <span className="gradient-text-red">{c.titleAccent}</span>
      </h1>

      <p
        className="text-[15px] leading-[1.75] text-white/70 mb-8 animate-fade-up"
        style={{ animationDelay: '100ms' }}
      >
        {c.body}
      </p>

      <div
        className="rounded-card border border-[#ff1744]/20 bg-[#ff1744]/6 backdrop-blur-sm px-5 py-5 mb-12 animate-fade-up"
        style={{ animationDelay: '140ms' }}
      >
        <div className="flex gap-3">
          <AlertTriangle size={14} className="text-[#ff1744] flex-shrink-0 mt-[3px]" />
          <div>
            <p className="text-[14px] text-white/85 leading-relaxed">{c.stat}</p>
            <p className="mono-label text-[9px] uppercase tracking-[0.22em] text-white/28 mt-2.5">
              {c.source}
            </p>
          </div>
        </div>
      </div>

      <div className="animate-fade-up" style={{ animationDelay: '180ms' }}>
        <Button onClick={onStart} fullWidth>
          Start Training
        </Button>
      </div>

      <p
        className="text-center mono-label text-[9px] uppercase tracking-[0.22em] text-white/22 mt-6 animate-fade-up"
        style={{ animationDelay: '220ms' }}
      >
        Runs in your browser. Nothing is recorded.
      </p>
    </div>
  )
}
