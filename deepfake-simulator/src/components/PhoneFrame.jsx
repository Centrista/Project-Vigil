import React from 'react'

// Renders children once, with phone-frame chrome appearing only at sm: breakpoint.
// Previous version mounted children twice (mobile + desktop branches), which
// duplicated keyboard listeners on window and let state diverge between the
// hidden and visible trees on resize.
export function PhoneFrame({ children }) {
  return (
    <div className="min-h-screen sm:flex sm:items-start sm:justify-center sm:py-8 sm:px-4">
      <div className="relative w-full sm:max-w-[420px]">
        {/* Frame chrome — desktop only */}
        <div className="hidden sm:block absolute inset-0 rounded-[3.5rem] border-[7px] border-white/8 shadow-[0_40px_100px_rgba(0,0,0,0.5)] pointer-events-none z-10" />
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-white/5 rounded-b-3xl z-20 pointer-events-none" />
        <div className="hidden sm:block absolute -left-[10px] top-24 w-[5px] h-10 bg-white/8 rounded-l-sm pointer-events-none" />
        <div className="hidden sm:block absolute -left-[10px] top-36 w-[5px] h-10 bg-white/8 rounded-l-sm pointer-events-none" />
        <div className="hidden sm:block absolute -right-[10px] top-32 w-[5px] h-14 bg-white/8 rounded-r-sm pointer-events-none" />

        {/* Content — single mount; rounded-clip only on desktop */}
        <div className="sm:overflow-hidden sm:rounded-[3rem]">
          {children}
        </div>
      </div>
    </div>
  )
}
