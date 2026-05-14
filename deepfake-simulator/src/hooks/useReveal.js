import { useReducer, useEffect, useRef, useCallback } from 'react'

/**
 * Reveal state machine for the Test screen.
 *
 *   idle
 *     ↓ submit(choice, correct)
 *   choice-sent          ← user's bubble appears (right)
 *     ↓ 250ms
 *   typing-verdict       ← typing dots (left)
 *     ↓ 1200ms
 *   verdict-shown        ← verdict bubble (left)
 *     ↓ 350ms
 *   typing-tell          ← typing dots again
 *     ↓ 1400ms
 *   tell-shown           ← tell bubble
 *     ↓ 250ms
 *   complete             ← Next button slides in
 *
 *   skip()  → jumps straight to 'complete'
 *   reset() → returns to 'idle' (used by back nav, mode switch, next clip)
 */

const TIMINGS = {
  'choice-sent':    250,
  'typing-verdict': 1200,
  'verdict-shown':  350,
  'typing-tell':    1400,
  'tell-shown':     250,
}

const NEXT_PHASE = {
  'choice-sent':    'typing-verdict',
  'typing-verdict': 'verdict-shown',
  'verdict-shown':  'typing-tell',
  'typing-tell':    'tell-shown',
  'tell-shown':     'complete',
}

const PHASE_ORDER = [
  'idle',
  'choice-sent',
  'typing-verdict',
  'verdict-shown',
  'typing-tell',
  'tell-shown',
  'complete',
]

export function phaseAtLeast(current, target) {
  return PHASE_ORDER.indexOf(current) >= PHASE_ORDER.indexOf(target)
}

const initialState = { phase: 'idle', choice: null, correct: null }

function reducer(state, action) {
  switch (action.type) {
    case 'submit':
      if (state.phase !== 'idle') return state
      return { phase: 'choice-sent', choice: action.choice, correct: action.correct }
    case 'advance':
      return { ...state, phase: action.to }
    case 'skip':
      if (state.phase === 'idle' || state.phase === 'complete') return state
      return { ...state, phase: 'complete' }
    case 'reset':
      return initialState
    default:
      return state
  }
}

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useReveal() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const timerRef = useRef(null)

  // Schedule the next transition whenever phase changes
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    const next = NEXT_PHASE[state.phase]
    if (!next) return
    const delay = TIMINGS[state.phase]
    timerRef.current = setTimeout(() => {
      dispatch({ type: 'advance', to: next })
    }, delay)
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [state.phase])

  const submit = useCallback((choice, correct) => {
    if (prefersReducedMotion()) {
      // Show everything at once
      dispatch({ type: 'submit', choice, correct })
      // Use a microtask to ensure choice fields land before jumping
      Promise.resolve().then(() => dispatch({ type: 'skip' }))
      return
    }
    dispatch({ type: 'submit', choice, correct })
  }, [])

  const skip  = useCallback(() => dispatch({ type: 'skip'  }), [])
  const reset = useCallback(() => dispatch({ type: 'reset' }), [])

  return {
    phase:   state.phase,
    choice:  state.choice,
    correct: state.correct,
    submit,
    skip,
    reset,
    isComplete: state.phase === 'complete',
    isIdle:     state.phase === 'idle',
    showsChoice:        phaseAtLeast(state.phase, 'choice-sent'),
    showsTypingVerdict: state.phase === 'typing-verdict',
    showsVerdict:       phaseAtLeast(state.phase, 'verdict-shown'),
    showsTypingTell:    state.phase === 'typing-tell',
    showsTell:          phaseAtLeast(state.phase, 'tell-shown'),
  }
}
