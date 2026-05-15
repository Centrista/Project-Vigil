import React from 'react'
import { User } from 'lucide-react'

/**
 * The "tell" — a second received message that explains what to listen/look for.
 * Slightly muted styling to differentiate from the verdict bubble above it.
 */
export function TellBubble({ tellHeader, tellIcon: TellIcon, tell }) {
  return (
    <div className="bubble-pop w-full">
      <div className="flex items-start gap-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-white/8 border border-white/10 flex items-center justify-center">
          <User size={14} className="text-white/30" />
        </div>

        <div className="relative flex-1 min-w-0 max-w-[300px]">
          <div
            className="absolute -left-[6px] top-3 w-0 h-0"
            style={{
              borderStyle: 'solid',
              borderWidth: '0 7px 7px 0',
              borderColor: 'transparent #DCF8C6 transparent transparent',
            }}
          />

          <div className="bg-[#DCF8C6] rounded-2xl rounded-tl-sm px-3.5 py-2.5">
            {tellHeader && TellIcon && (
              <div className="flex items-center gap-1.5 mb-1.5">
                <TellIcon size={11} className="text-[#075E54]" />
                <span className="mono-label text-[9px] uppercase tracking-[0.2em] text-[#075E54]/75 font-bold">
                  {tellHeader}
                </span>
              </div>
            )}
            <p className="text-[13px] text-gray-800 leading-relaxed">
              {tell}
            </p>
            <div className="flex items-center justify-end gap-1 mt-1.5">
              <span className="text-[9px] text-gray-500">
                {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
