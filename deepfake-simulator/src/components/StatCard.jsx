import React from 'react'

const ACCENT = {
  amber: { num: 'text-[#f59e0b]', border: 'border-[#f59e0b]/18', bg: 'bg-[#f59e0b]/5' },
  red:   { num: 'text-[#ff1744]', border: 'border-[#ff1744]/18', bg: 'bg-[#ff1744]/5' },
  cyan:  { num: 'text-[#00d4ff]', border: 'border-[#00d4ff]/18', bg: 'bg-[#00d4ff]/5' },
}

export function StatCard({ value, label, source, accent = 'amber', delay = 0 }) {
  const a = ACCENT[accent] ?? ACCENT.amber
  return (
    <div
      className={`rounded-card border px-5 py-4 animate-fade-up backdrop-blur-sm ${a.border} ${a.bg}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`text-[28px] font-black tracking-tight leading-none mb-1.5 ${a.num}`}>{value}</div>
      <p className="text-[13px] text-white/75 leading-snug">{label}</p>
      {source && (
        <p className="mono-label text-[9px] uppercase tracking-[0.2em] text-white/55 mt-2">{source}</p>
      )}
    </div>
  )
}
