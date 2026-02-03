'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Cpu, TrendingUp, Sparkles } from 'lucide-react'
import { GlassCard, ScrollReveal, SkillBar } from '@/components/ui'
import { SKILLS, SERVICES } from '@/constants'

export function SkillsSection() {
  const categorizedSkills = {
    'Frontend & Backend': SKILLS.filter((s) => ['Frontend', 'Backend'].includes(s.category)),
    Languages: SKILLS.filter((s) => ['Languages'].includes(s.category)),
    Databases: SKILLS.filter((s) => ['Databases'].includes(s.category)),
    Tools: SKILLS.filter((s) => ['Tools'].includes(s.category)),
  }

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute inset-0 opacity-30">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0,245,212,0.05) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(123,97,255,0.05) 0%, transparent 50%)`,
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollReveal variant="slideUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface rounded-full border border-border mb-6">
              <Cpu className="w-4 h-4 text-accent-primary" />
              <span className="text-sm font-mono text-text-secondary">
                SKILLS.matrix
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideUp" delay={0.1}>
            <h2 className="text-display-lg font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-white to-text-secondary bg-clip-text text-transparent">
                Technical Arsenal
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="slideUp" delay={0.2}>
            <p className="text-lg text-text-secondary">
              A comprehensive toolkit of modern technologies and frameworks
              for building robust, scalable applications.
            </p>
          </ScrollReveal>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-24">
          {Object.entries(categorizedSkills).map(([category, skills], catIndex) => (
            <ScrollReveal key={category} variant="slideUp" delay={catIndex * 0.1}>
              <GlassCard className="p-6 h-full" variant="default">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {category}
                  </h3>
                </div>

                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={catIndex * 0.1 + index * 0.1}
                      color={
                        skill.level > 85
                          ? '#00f5d4'
                          : skill.level > 75
                          ? '#7b61ff'
                          : '#f59e0b'
                      }
                    />
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Services section */}
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="slideUp">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface rounded-full border border-border mb-4">
                <Sparkles className="w-4 h-4 text-accent-secondary" />
                <span className="text-sm font-mono text-text-secondary">
                  SERVICES.offered
                </span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary">
                What I Can Build For You
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <ScrollReveal key={service.title} variant="scale" delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard className="p-6 h-full group" hover>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-glow-sm transition-shadow duration-300">
                        <service.icon className="w-6 h-6 text-accent-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
