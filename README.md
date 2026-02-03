# Assaad Portfolio - Data Architect Theme

A cutting-edge, high-performance portfolio built with Next.js 14, featuring glassmorphism design, interactive animations, and a "Data Architect" aesthetic.

## ✨ Features

- **Text Scramble/Hacker Effect** - Dynamic text decoding animation on the hero section
- **Interactive Grid Background** - GSAP-powered particle network that reacts to mouse movement
- **Glassmorphic Design** - Deep blurs, backdrop filters, and translucent cards
- **3D Tilt Project Cards** - Framer Motion powered cards with data-stream border animations
- **Animated Skill Bars** - Live system status-style progress indicators
- **Printing Resume Button** - Terminal-style animation when generating PDF
- **Fluid Custom Cursor** - Shape-morphing cursor that reacts to interactive elements
- **Scroll-Triggered Reveals** - Content renders as you scroll through sections

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** 
  - GSAP (scroll triggers, mouse parallax)
  - Framer Motion (micro-interactions, transitions)
- **Icons:** Lucide React
- **Utilities:** clsx, tailwind-merge

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles & Tailwind layers
│   ├── layout.tsx       # Root layout with fonts & metadata
│   └── page.tsx         # Main page component
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── GlassCard.tsx
│   │   ├── FluidCursor.tsx
│   │   ├── AnimatedGrid.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── SkillBar.tsx
│   │   └── ResumeButton.tsx
│   ├── layout/          # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/        # Page sections
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── ProjectLabSection.tsx
│       ├── SkillsSection.tsx
│       └── ContactSection.tsx
├── hooks/               # Custom React hooks
│   ├── useTextScramble.ts
│   ├── useMousePosition.ts
│   └── useScrollTrigger.ts
├── constants/           # Static data & configuration
│   └── data.ts
└── lib/                 # Utility functions
    └── utils.ts
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization

### Personal Information
Edit `src/constants/data.ts` to update:
- Name and title
- Contact information
- Projects and skills
- Experience and services

### Theme Colors
Modify `tailwind.config.ts` to customize:
- Accent colors (primary, secondary, tertiary)
- Background colors
- Glass morphism effects
- Animation timings

### Resume
Place your resume PDF at `public/resume.pdf` or update the path in the ResumeButton component.

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `accent-primary` | `#00f5d4` | Primary highlights, CTAs |
| `accent-secondary` | `#7b61ff` | Secondary accents |
| `accent-tertiary` | `#ff6b6b` | Alerts, special elements |
| `background` | `#0a0a0f` | Main background |
| `glass` | `rgba(255,255,255,0.05)` | Card backgrounds |

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

---

Built with ❤️ using Next.js & Tailwind CSS
