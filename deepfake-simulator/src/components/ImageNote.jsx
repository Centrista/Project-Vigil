import React, { useState } from 'react'
import { User, ImageOff } from 'lucide-react'

export function ImageNote({ src, label }) {
  const [error,     setError]     = useState(false)
  const [loaded,    setLoaded]    = useState(false)

  return (
    <div className="w-full bubble-pop">
      {label && (
        <p className="mono-label text-[9px] uppercase tracking-[0.26em] text-white/55 mb-3">
          {label}
        </p>
      )}

      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-white/8 border border-white/10 flex items-center justify-center">
          <User size={14} className="text-white/30" />
        </div>

        {/* Bubble */}
        <div className="relative flex-1 min-w-0 max-w-[300px]">
          <div className="absolute -left-[6px] top-3 w-0 h-0"
            style={{ borderStyle:'solid', borderWidth:'0 7px 7px 0', borderColor:'transparent #DCF8C6 transparent transparent' }}
          />

          <div className="bg-[#DCF8C6] rounded-2xl rounded-tl-sm p-1.5">
            {error ? (
              <div className="flex flex-col items-center justify-center gap-2 py-10 px-4 rounded-2xl bg-black/5">
                <ImageOff size={20} className="text-gray-400" />
                <span className="text-xs text-gray-400 italic">Image not loaded</span>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl bg-gray-300/30">
                {!loaded && (
                  <div className="aspect-[4/5] flex items-center justify-center">
                    <span className="mono-label text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Loading
                    </span>
                  </div>
                )}
                <img
                  src={src}
                  alt=""
                  className={`block w-full h-auto max-h-[440px] object-contain ${loaded ? '' : 'hidden'}`}
                  onLoad={() => setLoaded(true)}
                  onError={() => setError(true)}
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-1 mt-1 px-1.5 pb-0.5">
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
    </div>
  )
}
