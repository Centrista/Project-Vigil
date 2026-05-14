import React, { useState, useRef, useEffect, useId, useCallback } from 'react'
import { Play, Pause, Loader2, User } from 'lucide-react'
import { useAudioContext } from '../context/AudioContext'

const NUM_BARS = 16
const BAR_HEIGHTS = Array.from({ length: NUM_BARS }, (_, i) =>
  Math.round(22 + Math.abs(Math.sin(i * 0.65 + 0.5)) * 58)
)

function fmt(s) {
  if (!s || isNaN(s) || !isFinite(s)) return '0:00'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

export function VoiceNote({ src, label, onPlayComplete }) {
  const id = useId()
  const audioRef = useRef(null)
  const barRef   = useRef(null)
  const doneRef  = useRef(false)

  const [playing,     setPlaying]     = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration,    setDuration]    = useState(0)
  const [error,       setError]       = useState(false)
  const [noAvatar,    setNoAvatar]    = useState(false)

  const { currentlyPlayingId, play, stopAll } = useAudioContext()

  // Yield to another note that starts playing
  useEffect(() => {
    if (currentlyPlayingId !== id && playing) {
      audioRef.current?.pause()
      setPlaying(false)
    }
  }, [currentlyPlayingId, id, playing])

  // Pause audio on unmount — prevents zombie playback when phase changes mid-play
  useEffect(() => {
    const audio = audioRef.current
    return () => { audio?.pause() }
  }, [])

  const fireComplete = useCallback(() => {
    if (!doneRef.current) { doneRef.current = true; onPlayComplete?.() }
  }, [onPlayComplete])

  const toggle = async () => {
    if (error) return
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause(); setPlaying(false); setLoading(false)
    } else {
      play(id)
      setLoading(true)
      try { await a.play(); setPlaying(true) }
      catch { setError(true); setLoading(false); stopAll() }
    }
  }

  const seek = (clientX) => {
    const a = audioRef.current
    const b = barRef.current
    if (!a || !b || !duration) return
    const r = b.getBoundingClientRect()
    a.currentTime = Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * duration
  }

  const progress = duration > 0 ? currentTime / duration : 0

  return (
    <div className="w-full bubble-pop">
      {label && (
        <p className="mono-label text-[9px] uppercase tracking-[0.26em] text-white/35 mb-3">
          {label}
        </p>
      )}

      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-white/8 border border-white/10 flex items-center justify-center">
          <User size={14} className="text-white/30" />
          {!noAvatar && (
            <img
              src="/avatars/person.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setNoAvatar(true)}
            />
          )}
        </div>

        {/* Bubble */}
        <div className="relative flex-1 min-w-0">
          <div className="absolute -left-[6px] top-3 w-0 h-0"
            style={{ borderStyle:'solid', borderWidth:'0 7px 7px 0', borderColor:'transparent #DCF8C6 transparent transparent' }}
          />

          <div className="bg-[#DCF8C6] rounded-2xl rounded-tl-sm px-3 py-2.5">
            {error ? (
              <div className="flex items-center gap-2.5 py-1">
                <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                  <Play size={11} className="text-gray-500 ml-0.5" />
                </div>
                <span className="text-xs text-gray-400 italic">Audio not loaded</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Play / Pause / Loading */}
                <button
                  onClick={toggle}
                  disabled={loading && !playing}
                  className="w-8 h-8 rounded-full bg-[#075E54] flex items-center justify-center flex-shrink-0 active:scale-90 disabled:opacity-70"
                  aria-label={loading && !playing ? 'Loading' : playing ? 'Pause' : 'Play'}
                >
                  {loading && !playing
                    ? <Loader2 size={12} className="text-white animate-spin" />
                    : playing
                      ? <Pause size={11} fill="white" className="text-white" />
                      : <Play  size={11} fill="white" className="text-white ml-0.5" />
                  }
                </button>

                {/* Waveform */}
                <div
                  ref={barRef}
                  onClick={e => seek(e.clientX)}
                  onTouchStart={e => { e.preventDefault(); seek(e.touches[0].clientX) }}
                  className="flex-1 h-8 flex items-center gap-[2px] cursor-pointer"
                >
                  {BAR_HEIGHTS.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full ${(i+1)/NUM_BARS <= progress ? 'bg-[#075E54]' : 'bg-[#075E54]/22'}`}
                      style={playing
                        ? {
                            animationName: 'waveBar',
                            animationDuration: `${0.32 + (i % 7) * 0.09}s`,
                            animationTimingFunction: 'ease-in-out',
                            animationIterationCount: 'infinite',
                            animationDirection: 'alternate',
                            animationDelay: `${(i % 5) * 0.07}s`,
                          }
                        : { height: `${h}%` }
                      }
                    />
                  ))}
                </div>

                {/* Time */}
                <span className="text-[10px] font-semibold text-gray-500 tabular-nums w-8 text-right flex-shrink-0">
                  {duration > 0 ? (playing ? fmt(currentTime) : fmt(duration)) : '0:00'}
                </span>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-[9px] text-gray-400">
                {new Date().toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit', hour12:true })}
              </span>
              <svg width="16" height="9" viewBox="0 0 16 9" fill="none">
                <path d="M1 4.5L3.5 7L7.5 1.5"  stroke="#34B7F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 4.5L8.5 7L12.5 1.5" stroke="#34B7F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={() => {
          const a = audioRef.current; if (!a) return
          setCurrentTime(a.currentTime)
          if (a.duration > 0 && a.currentTime / a.duration >= 0.8) fireComplete()
        }}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onWaiting={() => setLoading(true)}
        onPlaying={() => setLoading(false)}
        onCanPlay={() => setLoading(false)}
        onEnded={() => { setPlaying(false); setCurrentTime(0); fireComplete() }}
        onError={() => { setError(true); setLoading(false) }}
      />
    </div>
  )
}
