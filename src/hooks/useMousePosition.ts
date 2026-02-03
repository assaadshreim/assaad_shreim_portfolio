'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface MousePosition {
  x: number
  y: number
  normalizedX: number // -1 to 1
  normalizedY: number // -1 to 1
  velocityX: number
  velocityY: number
}

interface UseMousePositionOptions {
  includeVelocity?: boolean
  smoothing?: number
}

export function useMousePosition(options: UseMousePositionOptions = {}) {
  const { includeVelocity = true, smoothing = 0.1 } = options
  
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    velocityX: 0,
    velocityY: 0,
  })
  
  const prevPosition = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)
  const targetPosition = useRef({ x: 0, y: 0 })

  const updatePosition = useCallback((e: MouseEvent) => {
    targetPosition.current = {
      x: e.clientX,
      y: e.clientY,
    }
  }, [])

  useEffect(() => {
    const animate = () => {
      const currentX = prevPosition.current.x
      const currentY = prevPosition.current.y
      const targetX = targetPosition.current.x
      const targetY = targetPosition.current.y
      
      // Smooth interpolation
      const newX = currentX + (targetX - currentX) * smoothing
      const newY = currentY + (targetY - currentY) * smoothing
      
      // Calculate velocity
      const velocityX = includeVelocity ? newX - currentX : 0
      const velocityY = includeVelocity ? newY - currentY : 0
      
      // Normalized coordinates (-1 to 1)
      const normalizedX = (newX / window.innerWidth) * 2 - 1
      const normalizedY = (newY / window.innerHeight) * 2 - 1
      
      setPosition({
        x: newX,
        y: newY,
        normalizedX,
        normalizedY,
        velocityX,
        velocityY,
      })
      
      prevPosition.current = { x: newX, y: newY }
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', updatePosition)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updatePosition, includeVelocity, smoothing])

  return position
}

export default useMousePosition
