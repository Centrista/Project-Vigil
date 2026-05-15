import React from 'react'
import { Mic, Image as ImageIcon } from 'lucide-react'

const MODES = [
  { key: 'voice', label: 'Voice', icon: Mic },
  { key: 'image', label: 'Image', icon: ImageIcon },
]

export function ModeToggle({ mode, onChange }) {
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
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] border-b-2 -mb-px transition-colors duration-150 ${
                active
                  ? 'text-white border-white'
                  : 'text-white/45 border-transparent hover:text-white/75'
              }`}
            >
              <Icon size={10} strokeWidth={2.5} />
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
