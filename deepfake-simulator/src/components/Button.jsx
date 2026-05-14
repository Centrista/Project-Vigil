import React from 'react'

const V = {
  primary:   'bg-white text-[#0c1628] font-black shadow-[0_8px_28px_rgba(0,0,0,0.25)] hover:bg-white/92 active:scale-[0.97]',
  secondary: 'bg-white/6 text-white font-semibold border border-white/15 hover:bg-white/11 hover:border-white/22 active:scale-[0.97]',
}

export function Button({ children, variant = 'primary', onClick, disabled, fullWidth, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 px-6 py-4 rounded-btn text-[15px] leading-none',
        'transition-all duration-200',
        'disabled:opacity-30 disabled:cursor-not-allowed',
        V[variant] ?? V.primary,
        fullWidth ? 'w-full' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </button>
  )
}
