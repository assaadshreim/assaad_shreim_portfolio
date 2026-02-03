'use client'

import { FluidCursor } from '@/components/ui'
import { Navbar, Footer } from '@/components/layout'
import { 
  HeroSection, 
  AboutSection,
  ProjectLabSection, 
  SkillsSection,
  ContactSection 
} from '@/components/sections'

export default function Home() {
  return (
    <>
      {/* Custom Cursor */}
      <FluidCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative overflow-hidden">
        <HeroSection />
        <AboutSection />
        <ProjectLabSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
