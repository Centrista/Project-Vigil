import React from 'react'
import { Mic, Image as ImageIcon } from 'lucide-react'

const MODES = [
  { key: 'voice', label: 'Voice', icon: Mic },
  { key: 'image', label: 'Image', icon: ImageIcon },
]

export function ModeToggle({ mode, onChange }) {
  return (
    <div className="flex justify-center pt-5 pb-1 px-6">
      <div
        className="inline-flex items-center gap-0.5 p-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_4px_18px_rgba(0,0,0,0.18)]"
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
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-tight transition-all duration-200 ${
                active
                  ? 'bg-white text-[#0c1628] shadow-[0_2px_8px_rgba(0,0,0,0.18)]'
                  : 'text-white/55 hover:text-white/85'
              }`}
            >
              <Icon size={11} strokeWidth={2.5} />
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
