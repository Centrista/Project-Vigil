import React from 'react'

export function PhoneFrame({ children }) {
  return (
    <>
      {/* Mobile: full-bleed, no frame */}
      <div className="sm:hidden w-full min-h-screen">
        {children}
      </div>

      {/* Desktop: phone-ish frame */}
      <div className="hidden sm:flex min-h-screen items-start justify-center py-8 px-4">
        <div className="relative w-full max-w-[420px]">
          {/* Frame chrome */}
          <div className="absolute inset-0 rounded-[3.5rem] border-[7px] border-white/8 shadow-[0_40px_100px_rgba(0,0,0,0.5)] pointer-events-none z-10" />
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-white/5 rounded-b-3xl z-20 pointer-events-none" />
          {/* Side button left */}
          <div className="absolute -left-[10px] top-24 w-[5px] h-10 bg-white/8 rounded-l-sm pointer-events-none" />
          <div className="absolute -left-[10px] top-36 w-[5px] h-10 bg-white/8 rounded-l-sm pointer-events-none" />
          {/* Side button right */}
          <div className="absolute -right-[10px] top-32 w-[5px] h-14 bg-white/8 rounded-r-sm pointer-events-none" />

          {/* Content area */}
          <div className="overflow-hidden rounded-[3rem]">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
