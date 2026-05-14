import { useRef } from 'react'

/**
 * Tracks page-change direction so screens can animate forward/backward.
 *
 * Usage:
 *   const { direction, animKey } = usePagedTransition(page)
 *   return <div key={animKey} className={`animate-slide-in-${direction}`}>...</div>
 *
 * direction: 'forward' | 'backward' | 'initial'
 */
export function usePagedTransition(page) {
  const prevRef = useRef(page)
  const prev = prevRef.current

  let direction
  if (prev === page) {
    direction = 'initial'
  } else if (page > prev) {
    direction = 'forward'
  } else {
    direction = 'backward'
  }
  prevRef.current = page

  return { direction, animKey: `${direction}-${page}` }
}
