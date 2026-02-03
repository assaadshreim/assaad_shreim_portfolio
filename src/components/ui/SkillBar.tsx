'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkillBarProps {
  name: string
  level: number
  category?: string
  delay?: number
  color?: string
}

export function SkillBar({
  name,
  level,
  category,
  delay = 0,
  color = '#00f5d4',
}: SkillBarProps) {
  return (
    <div className="group relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-text-primary">{name}</span>
          {category && (
            <span className="text-xs text-text-muted font-mono px-2 py-0.5 bg-surface rounded">
              {category}
            </span>
          )}
        </div>
        <motion.span 
          className="font-mono text-sm text-accent-primary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.5 }}
        >
          {level}%
        </motion.span>
      </div>

      {/* Bar container */}
      <div className="relative h-2 bg-surface rounded-full overflow-hidden">
        {/* Background pulse effect */}
        <div 
          className="absolute inset-0 animate-pulse-glow opacity-20"
          style={{ backgroundColor: color }}
        />
        
        {/* Progress bar */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ 
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 20px ${color}40`,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Data stream effect */}
        <motion.div
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: '-100%' }}
          whileInView={{ x: '500%' }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
            delay: delay + 0.3,
            ease: 'linear',
          }}
        />

        {/* Glowing tip */}
        <motion.div
          className="absolute inset-y-0 w-1 rounded-full"
          style={{ 
            backgroundColor: '#fff',
            boxShadow: `0 0 10px ${color}`,
          }}
          initial={{ left: 0, opacity: 0 }}
          whileInView={{ left: `${level}%`, opacity: [0, 1, 1, 0] }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>

      {/* Live indicator */}
      <motion.div
        className="absolute -right-2 top-0 flex items-center gap-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 1 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
      </motion.div>
    </div>
  )
}

// System status display
interface SystemStatusProps {
  items: { label: string; value: string; status: 'online' | 'processing' | 'idle' }[]
  className?: string
}

export function SystemStatus({ items, className }: SystemStatusProps) {
  const statusColors = {
    online: 'bg-green-500',
    processing: 'bg-yellow-500 animate-pulse',
    idle: 'bg-gray-500',
  }

  return (
    <div className={cn('space-y-3 font-mono text-xs', className)}>
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          className="flex items-center justify-between px-3 py-2 bg-surface rounded border border-border"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center gap-2">
            <div className={cn('w-2 h-2 rounded-full', statusColors[item.status])} />
            <span className="text-text-secondary">{item.label}</span>
          </div>
          <span className="text-accent-primary">{item.value}</span>
        </motion.div>
      ))}
    </div>
  )
}

export default SkillBar
