'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useMousePosition } from '@/hooks'
import { cn } from '@/lib/utils'

interface AnimatedGridProps {
  className?: string
  gridSize?: number
  dotSize?: number
  interactive?: boolean
  glowIntensity?: number
}

interface GridDot {
  x: number
  y: number
  baseOpacity: number
  pulseOffset: number
}

export function AnimatedGrid({
  className,
  gridSize = 50,
  dotSize = 2,
  interactive = true,
  glowIntensity = 150,
}: AnimatedGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useMousePosition({ smoothing: 0.08 })
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)
  const [dots, setDots] = useState<GridDot[]>([])

  // Generate grid dots on client side only to avoid hydration mismatch
  useEffect(() => {
    const result: GridDot[] = []
    const cols = Math.ceil(2000 / gridSize)
    const rows = Math.ceil(1200 / gridSize)
    
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        result.push({
          x: i * gridSize,
          y: j * gridSize,
          baseOpacity: 0.15 + Math.random() * 0.1,
          pulseOffset: Math.random() * Math.PI * 2,
        })
      }
    }
    setDots(result)
  }, [gridSize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      timeRef.current += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw dots
      dots.forEach((dot) => {
        // Calculate distance from mouse
        const dx = mousePosition.x - dot.x
        const dy = mousePosition.y - dot.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Interactive glow effect
        let glowFactor = 0
        if (interactive && distance < glowIntensity) {
          glowFactor = 1 - distance / glowIntensity
        }

        // Pulse animation
        const pulse = Math.sin(timeRef.current * 2 + dot.pulseOffset) * 0.3 + 0.7
        
        // Calculate final opacity
        const opacity = (dot.baseOpacity + glowFactor * 0.5) * pulse

        // Draw dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dotSize + glowFactor * 2, 0, Math.PI * 2)
        
        // Color based on proximity to mouse
        if (glowFactor > 0) {
          ctx.fillStyle = `rgba(0, 245, 212, ${opacity})`
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`
        }
        
        ctx.fill()

        // Draw connection lines to nearby dots when mouse is close
        if (interactive && glowFactor > 0.3) {
          dots.forEach((otherDot) => {
            if (dot === otherDot) return
            
            const odx = dot.x - otherDot.x
            const ody = dot.y - otherDot.y
            const odist = Math.sqrt(odx * odx + ody * ody)
            
            if (odist < gridSize * 1.5) {
              const otherDx = mousePosition.x - otherDot.x
              const otherDy = mousePosition.y - otherDot.y
              const otherDistance = Math.sqrt(otherDx * otherDx + otherDy * otherDy)
              const otherGlow = otherDistance < glowIntensity ? 1 - otherDistance / glowIntensity : 0
              
              if (otherGlow > 0.2) {
                ctx.beginPath()
                ctx.moveTo(dot.x, dot.y)
                ctx.lineTo(otherDot.x, otherDot.y)
                ctx.strokeStyle = `rgba(0, 245, 212, ${glowFactor * otherGlow * 0.3})`
                ctx.lineWidth = 1
                ctx.stroke()
              }
            }
          })
        }
      })

      // Draw mouse glow
      if (interactive) {
        const gradient = ctx.createRadialGradient(
          mousePosition.x,
          mousePosition.y,
          0,
          mousePosition.x,
          mousePosition.y,
          glowIntensity
        )
        gradient.addColorStop(0, 'rgba(0, 245, 212, 0.1)')
        gradient.addColorStop(1, 'rgba(0, 245, 212, 0)')
        
        ctx.beginPath()
        ctx.arc(mousePosition.x, mousePosition.y, glowIntensity, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [dots, mousePosition, interactive, glowIntensity, dotSize])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'fixed inset-0 pointer-events-none',
        className
      )}
      style={{ zIndex: 0 }}
    />
  )
}

export default AnimatedGrid
