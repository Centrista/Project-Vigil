import React from 'react'
import { Mic, Image as ImageIcon } from 'lucide-react'

// Voice is disabled until the ElevenLabs clips are recorded and dropped into
// public/audio/{train,test}. To restore: add 'voice' back to ENABLED_MODES.
export const ENABLED_MODES = ['image']

const MODES = [
  { key: 'voice', label: 'Voice', icon: Mic },
  { key: 'image', label: 'Image', icon: ImageIcon },
].filter(({ key }) => ENABLED_MODES.includes(key))

export function ModeToggle({ mode, onChange }) {
  // A single enabled mode needs no tab bar at all.
  if (MODES.length < 2) return null
  return (
    <div className="flex justify-center pt-3 px-6">
      <div
        className="inline-flex items-center border-b border-white/8"
        role="tablist"
        aria-label="Test type"
      >
        {MODES.map(({ key, label, icon: Icon }) => {
          const active = mode === key
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              role="tab"
              aria-selected={active}
              className={`inline-flex items-center gap-2 px-5 py-3 text-[15px] font-bold uppercase tracking-[0.18em] border-b-2 -mb-px transition-colors duration-150 ${
                active
                  ? 'text-white border-white'
                  : 'text-white/70 border-transparent hover:text-white/90'
              }`}
            >
              <Icon size={16} strokeWidth={2.5} />
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
