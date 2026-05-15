import React from 'react'
import { User, CheckCircle, XCircle } from 'lucide-react'

const KIND_TEXT = {
  voice: { ai: 'AI-generated.',   real: 'Real recording.' },
  image: { ai: 'AI-generated photo.', real: 'Real photo.' },
}

/**
 * The "verdict" — received message (left, green WhatsApp bubble).
 * Shows ✓ Correct / ✗ Wrong + the sample kind.
 */
export function VerdictBubble({ correct, isAI, mode = 'voice' }) {
  const kind = (KIND_TEXT[mode] ?? KIND_TEXT.voice)
  const subline = isAI ? kind.ai : kind.real

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
            <div className="flex items-start gap-2">
              {correct
                ? <CheckCircle size={16} className="text-[#0a7a3c] flex-shrink-0 mt-0.5" />
                : <XCircle    size={16} className="text-[#c41730] flex-shrink-0 mt-0.5" />
              }
              <div>
                <p className="text-[14px] font-black leading-tight text-gray-900">
                  {correct ? 'Correct.' : 'Wrong.'}
                </p>
                <p className="text-[12.5px] text-gray-700 mt-0.5">
                  {subline}
                </p>
              </div>
            </div>

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
