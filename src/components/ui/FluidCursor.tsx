'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FluidCursorProps {
  className?: string
}

export function FluidCursor({ className }: FluidCursorProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [hoverTarget, setHoverTarget] = useState<string | null>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  // Springs for smooth following
  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Outer cursor (slower follow)
  const outerSpringConfig = { damping: 30, stiffness: 200 }
  const outerXSpring = useSpring(cursorX, outerSpringConfig)
  const outerYSpring = useSpring(cursorY, outerSpringConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactiveElement = target.closest('[data-cursor]')
      
      if (interactiveElement) {
        setIsHovering(true)
        setHoverTarget(interactiveElement.getAttribute('data-cursor'))
      } else if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true)
        setHoverTarget('link')
      } else {
        setIsHovering(false)
        setHoverTarget(null)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  // Hide on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(true)
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window)
  }, [])

  if (isTouchDevice) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className={cn(
          'fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference',
          className
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          <div 
            className={cn(
              'w-3 h-3 rounded-full bg-white transition-all duration-200',
              isHovering && hoverTarget === 'project' && 'bg-accent-primary',
            )}
          />
        </motion.div>
      </motion.div>

      {/* Outer ring cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: outerXSpring,
          y: outerYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.9 : isHovering ? 2 : 1,
            opacity: isHovering ? 0.5 : 0.3,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div 
            className={cn(
              'w-10 h-10 rounded-full border border-white/50 transition-all duration-300',
              isHovering && 'border-accent-primary/50',
              hoverTarget === 'project' && 'w-20 h-20 border-accent-primary',
            )}
          />
        </motion.div>
      </motion.div>

      {/* Hover label */}
      {isHovering && hoverTarget === 'project' && (
        <motion.div
          className="fixed pointer-events-none z-[9997] text-xs font-mono text-accent-primary"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            x: outerXSpring,
            y: outerYSpring,
          }}
        >
          <div className="relative translate-x-8 -translate-y-1/2">
            VIEW PROJECT
          </div>
        </motion.div>
      )}
    </>
  )
}

export default FluidCursor
