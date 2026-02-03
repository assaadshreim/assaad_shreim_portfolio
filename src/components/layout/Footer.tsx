'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Github, Linkedin, Twitter, Instagram, ArrowUp, Terminal } from 'lucide-react'
import { GlassCard } from '@/components/ui'
import { SITE_CONFIG, NAV_LINKS, SOCIAL_LINKS } from '@/constants'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialIcons: Record<string, React.ElementType> = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-16 border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <a href="#home" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-accent-primary" />
                </div>
                <span className="font-display font-bold text-xl text-text-primary">
                  {SITE_CONFIG.name}
                  <span className="text-accent-primary">.</span>
                </span>
              </a>
              <p className="text-text-secondary mb-6 max-w-md">
                {SITE_CONFIG.description}
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = socialIcons[social.icon]
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-surface border border-border hover:border-accent-primary/30 flex items-center justify-center transition-all"
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5 text-text-secondary hover:text-accent-primary transition-colors" />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Navigation</h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-text-secondary hover:text-accent-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Contact</h4>
              <ul className="space-y-2 text-text-secondary">
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="hover:text-accent-primary transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </li>
                <li>{SITE_CONFIG.location}</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border" suppressHydrationWarning>
            <p className="text-sm text-text-muted flex items-center gap-1">
              © {currentYear} {SITE_CONFIG.name}. Built with
              <Heart className="w-4 h-4 text-accent-tertiary inline" fill="currentColor" />
              using Next.js & Tailwind CSS.
            </p>

            <motion.button
              onClick={scrollToTop}
              className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-accent-primary transition-colors"
              whileHover={{ y: -2 }}
              suppressHydrationWarning
            >
              Back to top
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
