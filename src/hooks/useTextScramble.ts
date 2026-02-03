'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

interface UseTextScrambleOptions {
  speed?: number
  delay?: number
  scrambleOnHover?: boolean
}

export function useTextScramble(
  text: string,
  options: UseTextScrambleOptions = {}
) {
  const { speed = 50, delay = 0, scrambleOnHover = false } = options
  const [displayText, setDisplayText] = useState('')
  const [isScrambling, setIsScrambling] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const scramble = useCallback(() => {
    if (isScrambling) return
    setIsScrambling(true)
    
    let iteration = 0
    const maxIterations = text.length
    
    // Clear any existing intervals
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            // If the character is a space, keep it
            if (char === ' ') return ' '
            
            // Characters before current iteration are revealed
            if (index < iteration) {
              return text[index]
            }
            
            // Characters after are scrambled
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      
      iteration += 1 / 3 // Slower reveal for more dramatic effect
      
      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, speed)
  }, [text, speed, isScrambling])

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDisplayText('')
    setIsScrambling(false)
  }, [])

  // Initial scramble on mount with delay
  useEffect(() => {
    if (!scrambleOnHover) {
      timeoutRef.current = setTimeout(() => {
        scramble()
      }, delay)
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [delay, scramble, scrambleOnHover])

  return {
    displayText: displayText || (scrambleOnHover ? text : ''),
    isScrambling,
    scramble,
    reset,
  }
}

export default useTextScramble
