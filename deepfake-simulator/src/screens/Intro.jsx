import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '../components/Button'

export function Intro({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col px-6 py-14 max-w-[420px] mx-auto">

      {/* Eyebrow */}
      <div className="flex items-center gap-2 mb-12 animate-fade-up">
        <span className="mono-label text-[9px] uppercase tracking-[0.3em] text-white/35">
          Project Vigil
        </span>
        <span className="w-[5px] h-[5px] rounded-full bg-[#ff1744] flex-shrink-0" />
        <span className="mono-label text-[9px] uppercase tracking-[0.3em] text-white/35">
          Voice Simulator
        </span>
      </div>

      {/* Headline */}
      <h1
        className="text-[40px] font-black leading-[1.05] mb-5 animate-fade-up"
        style={{ animationDelay: '60ms' }}
      >
        Can you tell when AI is{' '}
        <span className="gradient-text-red">faking a voice?</span>
      </h1>

      {/* Body */}
      <p
        className="text-[15px] leading-[1.75] text-white/70 mb-10 animate-fade-up"
        style={{ animationDelay: '100ms' }}
      >
        First you'll train on 5 real samples from one person.
        Then we test you with 4 new clips — 2 real, 2 AI-cloned.
        Spot the fakes.
      </p>

      {/* Stat card */}
      <div
        className="rounded-card border border-[#ff1744]/20 bg-[#ff1744]/6 backdrop-blur-sm px-5 py-5 mb-12 animate-fade-up"
        style={{ animationDelay: '140ms' }}
      >
        <div className="flex gap-3">
          <AlertTriangle size={14} className="text-[#ff1744] flex-shrink-0 mt-[3px]" />
          <div>
            <p className="text-[14px] text-white/85 leading-relaxed">
              AI clones a voice with{' '}
              <strong className="text-white font-bold">85% accuracy</strong>{' '}
              from just{' '}
              <strong className="text-white font-bold">3 seconds of audio.</strong>
            </p>
            <p className="mono-label text-[9px] uppercase tracking-[0.22em] text-white/28 mt-2.5">
              McAfee, 2023
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
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
