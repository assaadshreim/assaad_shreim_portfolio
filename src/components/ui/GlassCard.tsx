'use client'

import React, { forwardRef, HTMLAttributes } from 'react'
import { motion, MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'strong' | 'subtle'
  hover?: boolean
  glow?: boolean
  borderGlow?: boolean
  children: React.ReactNode
}

const variants = {
  default: 'bg-glass backdrop-blur-glass border border-border',
  strong: 'bg-glass-strong backdrop-blur-heavy border border-border-hover',
  subtle: 'bg-surface backdrop-blur-xs border border-border',
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    className, 
    variant = 'default', 
    hover = true, 
    glow = false,
    borderGlow = false,
    children, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl overflow-hidden transition-all duration-500',
          variants[variant],
          hover && 'hover:bg-surface-hover hover:border-border-hover hover:shadow-glass-hover',
          glow && 'shadow-glow',
          borderGlow && 'glass-border-glow',
          className
        )}
        {...props}
      >
        {/* Inner highlight gradient */}
        <div className="absolute inset-0 bg-gradient-glass opacity-50 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    )
  }
)

GlassCard.displayName = 'GlassCard'

// Animated version with Framer Motion

// Fix: Omit 'children' from MotionProps to avoid conflict with GlassCardProps
type AnimatedGlassCardProps = GlassCardProps & Omit<MotionProps, 'children'> & {
  delay?: number
}

export const AnimatedGlassCard = forwardRef<HTMLDivElement, AnimatedGlassCardProps>(
  ({ delay = 0, children, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ 
          duration: 0.6, 
          delay,
          ease: [0.22, 1, 0.36, 1] 
        }}
      >
        <GlassCard className={className} {...props}>
          {children}
        </GlassCard>
      </motion.div>
    )
  }
)

AnimatedGlassCard.displayName = 'AnimatedGlassCard'

export default GlassCard
