'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Terminal, Circle, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { useTextScramble } from '@/hooks'
import { GlassCard, AnimatedGrid } from '@/components/ui'
import { HERO_TITLES, SITE_CONFIG } from '@/constants'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const { displayText: nameText, isScrambling: nameScrambling } = useTextScramble(
    HERO_TITLES.primary,
    { speed: 40, delay: 500 }
  )
  const { displayText: roleText, isScrambling: roleScrambling } = useTextScramble(
    HERO_TITLES.secondary,
    { speed: 30, delay: 1200 }
  )

  // GSAP animations for floating elements
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for decorative elements
      gsap.to('.floating-element', {
        y: -20,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      })

      // Pulse animation for status indicators
      gsap.to('.pulse-indicator', {
        scale: 1.2,
        opacity: 0.5,
        duration: 1.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Interactive Grid Background */}
      <AnimatedGrid gridSize={60} dotSize={1.5} glowIntensity={180} />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          className="floating-element absolute top-20 left-[10%] w-64 h-64 rounded-full bg-accent-primary/5 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.div
          className="floating-element absolute bottom-40 right-[15%] w-96 h-96 rounded-full bg-accent-secondary/5 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
        
        {/* Geometric shapes */}
        <motion.div
          className="floating-element absolute top-32 right-[20%]"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.5, rotate: 45 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="w-20 h-20 border border-accent-primary/30 rotate-45" />
        </motion.div>
        
        <motion.div
          className="floating-element absolute bottom-32 left-[25%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <Circle className="w-16 h-16 text-accent-secondary/30" strokeWidth={1} />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Status Bar */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
              <div className="pulse-indicator w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-mono text-text-secondary">
                {SITE_CONFIG.status}
              </span>
            </GlassCard>
            
            <GlassCard className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
              <Terminal className="w-3 sm:w-4 h-3 sm:h-4 text-accent-primary flex-shrink-0" />
              <span className="font-mono text-text-muted">
                system.online
              </span>
            </GlassCard>
          </motion.div>

          {/* Main Title with Scramble Effect */}
          <div className="mb-6">
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-display-xl font-display font-bold tracking-tight">
                <span 
                  className={cn(
                    'inline-block bg-gradient-to-r from-white via-white to-text-secondary bg-clip-text text-transparent',
                    nameScrambling && 'text-accent-primary'
                  )}
                >
                  {nameText}
                </span>
                {nameScrambling && (
                  <span className="inline-block w-1 h-[0.8em] bg-accent-primary ml-1 animate-blink-caret" />
                )}
              </h1>
            </motion.div>

            <motion.div
              className="overflow-hidden mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-display-md font-display font-medium text-text-secondary">
                <span className={cn(roleScrambling && 'text-accent-secondary')}>
                  {roleText}
                </span>
                {roleScrambling && (
                  <span className="inline-block w-0.5 h-[0.7em] bg-accent-secondary ml-1 animate-blink-caret" />
                )}
              </h2>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary max-w-2xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            {HERO_TITLES.tagline}
            <Sparkles className="inline-block w-4 sm:w-5 h-4 sm:h-5 ml-2 text-accent-primary" />
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            <a
              href="#contact"
              className="group relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 bg-accent-primary text-background font-semibold rounded-lg transition-all duration-300 hover:shadow-glow text-sm sm:text-base w-full sm:w-auto text-center"
            >
              <span className="relative z-10">Contact Me</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>

            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 sm:px-8 py-3 sm:py-4 border border-border hover:border-accent-primary/50 text-text-primary rounded-lg transition-all duration-300 hover:bg-surface-hover text-sm sm:text-base w-full sm:w-auto text-center"
            >
              <span>View GitHub</span>
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            {[
              { label: 'Internship', value: '1' },
              { label: 'Key Projects', value: '2' },
              { label: 'Graduation', value: '2027' },
              { label: 'Availability', value: 'Open' },
            ].map((stat, index) => (
              <GlassCard
                key={stat.label}
                className="p-4 text-center"
                hover
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.4 + index * 0.1 }}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent-primary font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-text-muted mt-1">{stat.label}</div>
                </motion.div>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.5 }}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-text-muted hover:text-accent-primary transition-colors"
        >
          <span className="text-xs font-mono">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}

export default HeroSection
