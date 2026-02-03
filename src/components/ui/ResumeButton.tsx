'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, FileText, Terminal, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ResumeButtonProps {
  className?: string
  resumeUrl?: string
}

type ButtonState = 'idle' | 'hover' | 'generating' | 'complete'

const TERMINAL_LOGS = [
  { text: '> Initializing PDF generator...', delay: 0 },
  { text: '> Loading resume data...', delay: 300 },
  { text: '> Compiling experience modules...', delay: 600 },
  { text: '> Rendering skill matrices...', delay: 900 },
  { text: '> Applying formatting...', delay: 1200 },
  { text: '> Optimizing for print...', delay: 1500 },
  { text: '> Generating final document...', delay: 1800 },
  { text: '✓ Resume ready!', delay: 2100, success: true },
]

export function ResumeButton({ className, resumeUrl = '/resume.pdf' }: ResumeButtonProps) {
  const [state, setState] = useState<ButtonState>('idle')
  const [visibleLogs, setVisibleLogs] = useState<number>(0)
  const [progress, setProgress] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout[]>([])

  const clearTimeouts = () => {
    timeoutRef.current.forEach(clearTimeout)
    timeoutRef.current = []
  }

  const startGeneration = () => {
    setState('generating')
    setVisibleLogs(0)
    setProgress(0)
    clearTimeouts()

    // Animate terminal logs
    TERMINAL_LOGS.forEach((log, index) => {
      const timeout = setTimeout(() => {
        setVisibleLogs(index + 1)
        setProgress(((index + 1) / TERMINAL_LOGS.length) * 100)
      }, log.delay)
      timeoutRef.current.push(timeout)
    })

    // Complete animation
    const completeTimeout = setTimeout(() => {
      setState('complete')
      // Reset after showing complete state
      const resetTimeout = setTimeout(() => {
        setState('idle')
        setVisibleLogs(0)
        setProgress(0)
        // Trigger actual download
        window.open(resumeUrl, '_blank')
      }, 1500)
      timeoutRef.current.push(resetTimeout)
    }, 2400)
    timeoutRef.current.push(completeTimeout)
  }

  useEffect(() => {
    return () => clearTimeouts()
  }, [])

  return (
    <div className={cn('relative', className)}>
      {/* Main button */}
      <motion.button
        className={cn(
          'relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-sm',
          'bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20',
          'border border-accent-primary/30',
          'hover:border-accent-primary/60 hover:shadow-glow',
          'transition-all duration-300',
          'group',
          state === 'generating' && 'pointer-events-none'
        )}
        onMouseEnter={() => state === 'idle' && setState('hover')}
        onMouseLeave={() => state === 'hover' && setState('idle')}
        onClick={startGeneration}
        whileHover={{ scale: state === 'idle' ? 1.02 : 1 }}
        whileTap={{ scale: state === 'idle' ? 0.98 : 1 }}
        suppressHydrationWarning
      >
        {/* Background animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 via-accent-secondary/10 to-accent-primary/10"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '200% 100%' }}
        />

        {/* Progress bar */}
        <AnimatePresence>
          {state === 'generating' && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-accent-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* Button content */}
        <span className="relative z-10 flex items-center gap-3">
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-3"
              >
                <FileText className="w-5 h-5 text-accent-primary" />
                <span className="text-text-primary">Download Resume</span>
                <Download className="w-4 h-4 text-text-muted group-hover:text-accent-primary transition-colors" />
              </motion.span>
            )}

            {state === 'hover' && (
              <motion.span
                key="hover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-3"
              >
                <Terminal className="w-5 h-5 text-accent-primary animate-pulse" />
                <span className="text-accent-primary font-mono">Click to Generate</span>
              </motion.span>
            )}

            {state === 'generating' && (
              <motion.span
                key="generating"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-3"
              >
                <Loader2 className="w-5 h-5 text-accent-primary animate-spin" />
                <span className="text-accent-primary font-mono">Generating PDF...</span>
                <span className="text-text-muted font-mono text-xs">
                  {Math.round(progress)}%
                </span>
              </motion.span>
            )}

            {state === 'complete' && (
              <motion.span
                key="complete"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-green-500 font-mono">Download Ready!</span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>

      {/* Terminal output panel */}
      <AnimatePresence>
        {(state === 'generating' || state === 'complete') && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-4 z-50"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-background-secondary border border-border rounded-lg overflow-hidden shadow-glass">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-2 bg-surface border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-text-muted ml-2">
                  resume-generator.sh
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-4 font-mono text-xs space-y-1 max-h-48 overflow-y-auto">
                {TERMINAL_LOGS.slice(0, visibleLogs).map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      'flex items-center gap-2',
                      log.success ? 'text-green-500' : 'text-text-secondary'
                    )}
                  >
                    {log.text}
                    {index === visibleLogs - 1 && !log.success && (
                      <span className="inline-block w-2 h-4 bg-accent-primary animate-blink-caret" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ResumeButton
