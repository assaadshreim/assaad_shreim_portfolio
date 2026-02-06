'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Send, 
  Mail, 
  MapPin, 
  Clock, 
  Github, 
  Linkedin, 
  Twitter,
  Instagram,
  MessageCircle,
  CheckCircle2,
  Loader2,
  ArrowUpRight
} from 'lucide-react'
import { GlassCard, ScrollReveal } from '@/components/ui'
import { SITE_CONFIG, SOCIAL_LINKS } from '@/constants'
import { cn } from '@/lib/utils'

export function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      const formElement = e.target as HTMLFormElement
      const formData = new FormData(formElement)
      
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setFormState('success')

      // Reset after success
      setTimeout(() => {
        setFormState('idle')
        formRef.current?.reset()
      }, 3000)
    } catch (error) {
      console.error('Form submission error:', error)
      setFormState('error')

      // Reset error state
      setTimeout(() => {
        setFormState('idle')
      }, 3000)
    }
  }

  const socialIcons: Record<string, React.ElementType> = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
    whatsapp: MessageCircle,
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollReveal variant="slideUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface rounded-full border border-border mb-6">
              <Mail className="w-4 h-4 text-accent-primary" />
              <span className="text-sm font-mono text-text-secondary">
                CONTACT.connect
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideUp" delay={0.1}>
            <h2 className="text-display-lg font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-white to-text-secondary bg-clip-text text-transparent">
                Let&rsquo;s Build Together
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="slideUp" delay={0.2}>
            <p className="text-lg text-text-secondary">
              Have a project in mind or want to collaborate? 
              I&rsquo;d love to hear from you.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Contact info */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal variant="slideRight">
              <GlassCard className="p-6" variant="strong">
                <h3 className="text-lg font-semibold text-text-primary mb-6">
                  Get in Touch
                </h3>

                <div className="space-y-4">
                  <a 
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface hover:bg-surface-hover transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-accent-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-text-muted">Email</p>
                      <p className="text-text-primary group-hover:text-accent-primary transition-colors">
                        {SITE_CONFIG.email}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-surface">
                    <div className="w-12 h-12 rounded-xl bg-accent-secondary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Location</p>
                      <p className="text-text-primary">{SITE_CONFIG.location}</p>
                    </div>
                  </div>

                  <a
                    href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface hover:bg-surface-hover transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-tertiary/10 flex items-center justify-center">
                      <span className="text-accent-tertiary font-mono text-lg">☎</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-text-muted">Phone</p>
                      <p className="text-text-primary group-hover:text-accent-tertiary transition-colors">
                        {SITE_CONFIG.phone}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-surface">
                    <div className="w-12 h-12 rounded-xl bg-accent-tertiary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent-tertiary" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Response Time</p>
                      <p className="text-text-primary">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal variant="slideRight" delay={0.1}>
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Connect Online
                </h3>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = socialIcons[social.icon]
                    if (!Icon) return null
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-surface hover:bg-surface-hover border border-border hover:border-accent-primary/30 flex items-center justify-center transition-all"
                        whileHover={{ y: -2, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-5 h-5 text-text-secondary hover:text-accent-primary transition-colors" />
                      </motion.a>
                    )
                  })}
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="slideLeft">
              <GlassCard className="p-8" variant="strong">
                <h3 className="text-lg font-semibold text-text-primary mb-6">
                  Send a Message
                </h3>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50 text-text-primary placeholder:text-text-muted transition-all outline-none"
                        placeholder="Your name"
                        suppressHydrationWarning
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50 text-text-primary placeholder:text-text-muted transition-all outline-none"
                        placeholder="your@email.com"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50 text-text-primary placeholder:text-text-muted transition-all outline-none"
                      placeholder="Project inquiry"
                      suppressHydrationWarning
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50 text-text-primary placeholder:text-text-muted transition-all outline-none resize-none"
                      placeholder="Tell me about your project..."
                      suppressHydrationWarning
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={formState === 'submitting' || formState === 'success'}
                    className={cn(
                      'w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all',
                      formState === 'success'
                        ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                        : 'bg-accent-primary text-background hover:shadow-glow'
                    )}
                    whileHover={{ scale: formState === 'idle' ? 1.01 : 1 }}
                    whileTap={{ scale: formState === 'idle' ? 0.99 : 1 }}
                    suppressHydrationWarning
                  >
                    {formState === 'idle' && (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                    {formState === 'submitting' && (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    )}
                    {formState === 'success' && (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Message Sent!
                      </>
                    )}
                    {formState === 'error' && (
                      <>
                        <Send className="w-5 h-5" />
                        Try Again
                      </>
                    )}
                  </motion.button>
                </form>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
