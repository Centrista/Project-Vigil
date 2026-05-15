import React from 'react'
import { User } from 'lucide-react'

/**
 * WhatsApp / iMessage style "..." typing bubble.
 * side="left"  → received message (green WhatsApp bubble, avatar, tail-left)
 * side="right" → sent message     (blue iMessage bubble,  no avatar, tail-right)
 */
export function TypingIndicator({ side = 'left' }) {
  const isLeft = side === 'left'

  const DotRow = ({ color }) => (
    <div className="flex items-center gap-1.5 px-2 py-1">
      {[0, 160, 320].map((delay) => (
        <span
          key={delay}
          className="typing-dot inline-block w-[6px] h-[6px] rounded-full"
          style={{ background: color, animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  )

  if (isLeft) {
    return (
      <div className="bubble-pop w-full">
        <div className="flex items-start gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-white/8 border border-white/10 flex items-center justify-center">
            <User size={14} className="text-white/30" />
          </div>

          <div className="relative">
            <div
              className="absolute -left-[6px] top-2 w-0 h-0"
              style={{
                borderStyle: 'solid',
                borderWidth: '0 7px 7px 0',
                borderColor: 'transparent #DCF8C6 transparent transparent',
              }}
            />
            <div className="bg-[#DCF8C6] rounded-2xl rounded-tl-sm">
              <DotRow color="#667781" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // right (sent)
  return (
    <div className="bubble-pop w-full">
      <div className="flex items-start justify-end gap-3">
        <div className="relative">
          <div
            className="absolute -right-[6px] top-2 w-0 h-0"
            style={{
              borderStyle: 'solid',
              borderWidth: '0 0 7px 7px',
              borderColor: 'transparent transparent transparent #3478F6',
            }}
          />
          <div className="bg-[#3478F6] rounded-2xl rounded-tr-sm">
            <DotRow color="rgba(255,255,255,0.85)" />
          </div>
        </div>
      </div>
    </div>
  )
}
