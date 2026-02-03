'use client'

import { useEffect, useRef, useState } from 'react'

interface UseScrollTriggerOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollTrigger(options: UseScrollTriggerOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = false } = options
  const ref = useRef<HTMLElement | null>(null)
  const [isInView, setIsInView] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting
          
          if (triggerOnce && isInView) return
          
          setIsInView(inView)
          
          // Calculate scroll progress within the element
          if (inView) {
            const rect = entry.boundingClientRect
            const windowHeight = window.innerHeight
            const elementHeight = rect.height
            
            // Progress from 0 (just entering) to 1 (fully visible or past)
            const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top)
            const progressValue = Math.min(1, visibleHeight / Math.min(elementHeight, windowHeight))
            setProgress(progressValue)
          }
        })
      },
      {
        threshold: Array.from({ length: 100 }, (_, i) => i / 100), // Granular threshold for progress
        rootMargin,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce, isInView])

  return { ref, isInView, progress }
}

export default useScrollTrigger
