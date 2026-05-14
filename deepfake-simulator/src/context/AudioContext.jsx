import React, { createContext, useContext, useState, useCallback } from 'react'

const AudioCtx = createContext(null)

export function AudioProvider({ children }) {
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null)

  const play = useCallback((id) => {
    setCurrentlyPlayingId(id)
  }, [])

  const stopAll = useCallback(() => {
    setCurrentlyPlayingId(null)
  }, [])

  return (
    <AudioCtx.Provider value={{ currentlyPlayingId, play, stopAll }}>
      {children}
    </AudioCtx.Provider>
  )
}

export function useAudioContext() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error('useAudioContext must be inside AudioProvider')
  return ctx
}
