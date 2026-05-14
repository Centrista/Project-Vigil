import React from 'react'

/**
 * The user's sent message — "REAL" or "AI FAKE" — iMessage blue, right-aligned.
 */
export function ChoiceBubble({ choice }) {
  const label = choice === 'real' ? 'REAL' : 'AI FAKE'

  return (
    <div className="bubble-pop w-full">
      <div className="flex items-start justify-end gap-3">
        <div className="relative max-w-[260px]">
          <div
            className="absolute -right-[6px] top-2 w-0 h-0"
            style={{
              borderStyle: 'solid',
              borderWidth: '0 0 7px 7px',
              borderColor: 'transparent transparent transparent #3478F6',
            }}
          />
          <div className="bg-[#3478F6] rounded-2xl rounded-tr-sm px-3.5 py-2">
            <p className="text-[14px] font-black text-white tracking-tight leading-tight">
              {label}
            </p>
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <span className="text-[9px] text-white/70">
                {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
              </span>
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M1 4L3 6L7 1" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
