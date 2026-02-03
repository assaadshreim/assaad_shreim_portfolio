'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User2, MapPin, Mail, Briefcase, GraduationCap, Code2 } from 'lucide-react'
import { GlassCard, ScrollReveal, StaggerReveal, SystemStatus } from '@/components/ui'
import { ResumeButton } from '@/components/ui/ResumeButton'
import { SITE_CONFIG, EXPERIENCE, EDUCATION } from '@/constants'
import { cn } from '@/lib/utils'

export function AboutSection() {
  const systemStatus = [
    { label: 'Status', value: 'Open to Work', status: 'online' as const },
    { label: 'Availability', value: 'Full‑Time / Freelance', status: 'online' as const },
    { label: 'Response Time', value: '< 24h', status: 'online' as const },
    { label: 'Time Zone', value: 'UTC+2', status: 'online' as const },
  ]

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollReveal variant="slideUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface rounded-full border border-border mb-6">
              <User2 className="w-4 h-4 text-accent-primary" />
              <span className="text-sm font-mono text-text-secondary">
                ABOUT.profile
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideUp" delay={0.1}>
            <h2 className="text-display-lg font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-white to-text-secondary bg-clip-text text-transparent">
                Professional. Focused. Ready to Contribute.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="slideUp" delay={0.2}>
            <p className="text-lg text-text-secondary">
              Computer Engineering student at Le CNAM Liban (expected 2027), focused on
              building reliable software, web applications, and clean user experiences.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Left column - Profile card */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="slideRight">
              <GlassCard className="p-8" variant="strong" glow>
                {/* Profile header */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30 flex items-center justify-center">
                      <span className="text-3xl font-bold text-text-primary font-display">
                        {SITE_CONFIG.name.charAt(0)}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-background-secondary" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">
                      {SITE_CONFIG.name}
                    </h3>
                    <p className="text-text-secondary">{SITE_CONFIG.title}</p>
                    <p className="text-sm text-text-muted font-mono mt-1">
                      {SITE_CONFIG.subtitle}
                    </p>
                  </div>
                </div>

                {/* Contact info */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-text-secondary">
                    <MapPin className="w-5 h-5 text-accent-primary" />
                    <span>{SITE_CONFIG.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <Mail className="w-5 h-5 text-accent-primary" />
                    <span>{SITE_CONFIG.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <span className="w-5 h-5 text-accent-primary font-mono text-xs">☎</span>
                    <span>{SITE_CONFIG.phone}</span>
                  </div>
                </div>

                {/* System status */}
                <div className="mb-8">
                  <h4 className="text-sm font-mono text-text-muted mb-4 flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    SYSTEM_STATUS
                  </h4>
                  <SystemStatus items={systemStatus} />
                </div>

                {/* Resume button */}
                <ResumeButton className="w-full" resumeUrl={SITE_CONFIG.resumeUrl} />
              </GlassCard>
            </ScrollReveal>
          </div>

          {/* Right column - Experience & Bio */}
          <div className="lg:col-span-7 space-y-8">
            {/* Bio card */}
            <ScrollReveal variant="slideLeft" delay={0.1}>
              <GlassCard className="p-8">
                <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-accent-primary" />
                  Background
                </h3>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    I’m a junior computer engineer specializing in software development,
                    full‑stack web applications, and practical system design. I enjoy
                    solving complex problems and learning new technologies every day.
                  </p>
                  <p>
                    I’m open to full‑time roles or freelance projects where I can contribute
                    immediately and grow with a strong engineering team.
                  </p>
                  <p>
                    My focus is on writing clean, maintainable code and delivering reliable,
                    user‑centered solutions.
                  </p>
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* Education */}
            <ScrollReveal variant="slideLeft" delay={0.15}>
              <GlassCard className="p-8">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-accent-primary" />
                  Education
                </h3>

                <div className="space-y-4">
                  {EDUCATION.map((edu) => (
                    <div key={edu.school} className="p-4 rounded-xl bg-surface border border-border">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-text-primary">{edu.school}</h4>
                          <p className="text-sm text-accent-primary font-mono">{edu.degree}</p>
                        </div>
                        <span className="text-xs font-mono text-text-muted px-2 py-1 bg-surface rounded">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mt-2">{edu.details}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* Experience timeline */}
            <ScrollReveal variant="slideLeft" delay={0.2}>
              <GlassCard className="p-8">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-accent-primary" />
                  Experience
                </h3>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />

                  <StaggerReveal className="space-y-6" staggerDelay={0.15}>
                    {EXPERIENCE.map((exp, index) => (
                      <div key={index} className="relative pl-8">
                        {/* Timeline dot */}
                        <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-background-secondary border-2 border-accent-primary" />
                        
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <div>
                            <h4 className="font-semibold text-text-primary">
                              {exp.role}
                            </h4>
                            <p className="text-sm text-accent-primary font-mono">
                              {exp.company}
                            </p>
                          </div>
                          <span className="text-xs font-mono text-text-muted px-2 py-1 bg-surface rounded">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </StaggerReveal>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
