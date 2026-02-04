# Assaad Shreim — Portfolio

Professional portfolio for Assaad Shreim, a junior computer engineer focused on full‑stack software development. Built with Next.js, Tailwind CSS, and motion‑driven UI details to highlight projects, experience, and contact information.

Live site: https://assaadshreim.netlify.app

---

## ✨ Highlights

- **Glassmorphism UI** with layered depth and soft gradients
- **Text scramble hero** for a modern, technical feel
- **Interactive grid background** with GSAP motion
- **3D tilt project cards** with data‑stream border effects
- **Resume generator animation** with terminal‑style logs
- **Responsive layout** tuned for small screens
- **Contact form** with Resend email delivery

---

## 🧱 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript + React 18
- **Styling:** Tailwind CSS
- **Animations:** GSAP + Framer Motion
- **Email:** Resend

---

## 🚀 Local Setup

1. Install dependencies:
   - `npm install`
2. Start development server:
   - `npm run dev`
3. Open http://localhost:3000

---

## ⚙️ Environment Variables

Create a `.env.local` file at the project root:

- `RESEND_API_KEY` — Resend API key
- `CONTACT_EMAIL` — Destination inbox for form submissions

---

## 📂 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── constants/
│   └── data.ts
├── hooks/
└── lib/
```

---

## 📝 Content Updates

All profile content lives in:

- `src/constants/data.ts`

Update name, skills, experience, projects, and contact info there.

---

## 📦 Scripts

- `npm run dev` — Development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Lint checks

---

## ✅ Deployment

### Netlify
- Build command: `npm run build`
- Publish directory: `.next`

### Render
- Build command: `npm run build`
- Start command: `npm start`
- Publish directory: leave empty

---

## 📄 License

MIT
