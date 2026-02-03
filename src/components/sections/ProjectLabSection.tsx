'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Github, Zap, Activity } from 'lucide-react'
import { GlassCard, ScrollReveal } from '@/components/ui'
import { PROJECTS, SITE_CONFIG } from '@/constants'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: (typeof PROJECTS)[0]
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring configuration for smooth movement
  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)

  // Glare effect position
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig)
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const percentX = (e.clientX - centerX) / rect.width
    const percentY = (e.clientY - centerY) / rect.height

    mouseX.set(percentX)
    mouseY.set(percentY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <ScrollReveal delay={index * 0.15} variant="slideUp">
      <motion.div
        ref={cardRef}
        className="relative group h-full perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        data-cursor="project"
      >
        {/* Data stream border effect */}
        <div
          className={cn(
            'absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-500',
            isHovered && 'opacity-100'
          )}
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}80, transparent)`,
            backgroundSize: '200% 100%',
            animation: isHovered ? 'dataStream 2s linear infinite' : 'none',
          }}
        />

        {/* Outer glow */}
        <div
          className={cn(
            'absolute -inset-4 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500',
            isHovered && 'opacity-30'
          )}
          style={{ backgroundColor: project.color }}
        />

        {/* Card content */}
        <GlassCard
          className="relative h-full overflow-hidden"
          variant="strong"
          hover={false}
        >
          {/* Glare effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
            }}
          />

          {/* Status badge */}
          <div className="absolute top-4 right-4 z-20">
            <div
              className={cn(
                'px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5',
                project.status === 'LIVE' && 'bg-green-500/20 text-green-400',
                project.status === 'BETA' && 'bg-yellow-500/20 text-yellow-400'
              )}
            >
              <span
                className={cn(
                  'w-1.5 h-1.5 rounded-full',
                  project.status === 'LIVE' && 'bg-green-400 animate-pulse',
                  project.status === 'BETA' && 'bg-yellow-400 animate-pulse'
                )}
              />
              {project.status}
            </div>
          </div>

          {/* Project image/gradient */}
          <div className="relative h-48 overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-br opacity-80"
              style={{
                background: `linear-gradient(135deg, ${project.color}40 0%, ${project.color}10 100%)`,
              }}
            />
            
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `linear-gradient(${project.color}20 1px, transparent 1px), linear-gradient(90deg, ${project.color}20 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />

            {/* Project icon/visual */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-24 h-24 rounded-2xl border-2 flex items-center justify-center"
                style={{ borderColor: project.color }}
                animate={isHovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Zap className="w-10 h-10" style={{ color: project.color }} />
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Title & subtitle */}
            <div>
              <h3 className="text-xl font-bold text-text-primary group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-text-muted font-mono">{project.subtitle}</p>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary line-clamp-2">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-mono bg-surface rounded border border-border"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="px-2 py-1 text-xs font-mono text-text-muted">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-sm font-bold text-accent-primary font-mono">
                    {value}
                  </div>
                  <div className="text-xs text-text-muted capitalize">{key}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all"
                style={{
                  backgroundColor: `${project.color}20`,
                  color: project.color,
                }}
                whileHover={{ backgroundColor: `${project.color}40` }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-4 h-4" />
                View GitHub
              </motion.a>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </ScrollReveal>
  )
}

export function ProjectLabSection() {
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollReveal variant="slideUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface rounded-full border border-border mb-6">
              <Activity className="w-4 h-4 text-accent-primary" />
              <span className="text-sm font-mono text-text-secondary">
                PROJECT_LAB.active
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideUp" delay={0.1}>
            <h2 className="text-display-lg font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-white to-text-secondary bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="slideUp" delay={0.2}>
            <p className="text-lg text-text-secondary">
              A curated selection of projects showcasing full-stack development,
              system architecture, and innovative solutions.
            </p>
          </ScrollReveal>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View all button */}
        <ScrollReveal variant="slideUp" delay={0.5}>
          <div className="text-center mt-12">
            <motion.a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border rounded-lg font-medium text-text-secondary hover:text-text-primary hover:border-accent-primary/50 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              suppressHydrationWarning
              aria-label="View all projects on GitHub"
            >
              View All Projects
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default ProjectLabSection
