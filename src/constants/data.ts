import { Code2, Globe, Server, Database, Smartphone, Cloud } from 'lucide-react'

export const SITE_CONFIG = {
  name: 'Assaad Shreim',
  title: 'Computer Engineer | Software Developer',
  subtitle: 'Computer Engineering Student • Le CNAM Liban (2027)',
  description: 'Junior computer engineer focused on full-stack development and reliable software systems.',
  email: 'assaadshreim365@gmail.com',
  phone: '+961 71 022 355',
  location: 'Beirut, Lebanon',
  status: 'Open to Full-Time & Freelance',
  github: 'https://github.com/assaadshreim/',
  resumeUrl: '/resume/Assaad%20Shreim.pdf',
}

export const HERO_TITLES = {
  primary: 'ASSAAD SHREIM',
  secondary: 'COMPUTER ENGINEER | SOFTWARE DEVELOPER',
  tagline: 'Building reliable software and user‑centric web experiences.',
}

export const SKILLS = [
  { name: 'React', level: 80, category: 'Frontend' },
  { name: 'JavaScript', level: 82, category: 'Languages' },
  { name: 'Python', level: 75, category: 'Languages' },
  { name: 'Java', level: 78, category: 'Languages' },
  { name: 'C# / .NET', level: 70, category: 'Languages' },
  { name: 'Spring Boot', level: 68, category: 'Backend' },
  { name: 'PostgreSQL', level: 70, category: 'Databases' },
  { name: 'MongoDB', level: 68, category: 'Databases' },
  { name: 'MySQL', level: 72, category: 'Databases' },
  { name: 'H2 Database', level: 60, category: 'Databases' },
  { name: 'Git', level: 80, category: 'Tools' },
  { name: 'Docker', level: 65, category: 'Tools' },
  { name: 'Linux', level: 70, category: 'Tools' },
  { name: 'Command Line', level: 75, category: 'Tools' },
]

export const PROJECTS = [
  {
    id: 'project-1',
    title: 'The GOAT',
    subtitle: 'Restaurant Ordering Platform',
    description:
      'Complete restaurant ordering & management system with customer website, admin dashboard, real-time order updates, and dark/light mode support.',
    tech: ['React 18', 'Vite', 'Tailwind CSS', 'PHP 8', 'Slim', 'MySQL', 'JWT'],
    status: 'LIVE',
    metrics: { apps: '2 Apps', auth: 'JWT', mode: 'Dark/Light' },
    image: '/projects/the-goat.jpg',
    link: 'https://assaadshreim.github.io/The-GOAT/',
    github: 'https://github.com/assaadshreim/The-GOAT',
    color: '#00f5d4',
  },
  {
    id: 'project-2',
    title: 'Multimedia Library Manager',
    subtitle: 'Java Desktop Application',
    description:
      'Production‑quality Java Swing desktop app implementing 7 design patterns with full CRUD, export, notifications, and dual user interfaces.',
    tech: ['Java', 'Swing', 'Design Patterns', 'Serialization', 'CSV/XML'],
    status: 'BETA',
    metrics: { patterns: '7', roles: 'Admin/Student', export: 'CSV/XML' },
    image: '/projects/library-manager.jpg',
    link: '#',
    github: 'https://github.com/assaadshreim/MLMS_v2',
    color: '#7b61ff',
  },
]

export const EXPERIENCE = [
  {
    company: 'MTC Touch',
    role: 'Web Developer (Intern)',
    period: 'Jun 2024 – Aug 2024',
    description:
      'Designed and developed a dynamic mobile application for on‑site employees using React Native and Node.js, enabling real‑time location tracking.',
  },
  {
    company: 'Ibn Sina High School',
    role: 'IT Administrator',
    period: '2022 – 2024',
    description:
      'Managed computer labs and networks, handled hardware/software maintenance, and improved system reliability across campus.',
  },
  {
    company: 'OMT',
    role: 'OMT Operator',
    period: 'Jan 2025 – Present',
    description:
      'Processed daily operations accurately and resolved complex transactional issues under time‑sensitive conditions.',
  },
]

export const EDUCATION = [
  {
    school: 'Le CNAM Liban',
    degree: 'B.S. in Computer Engineering (In Progress)',
    period: 'Expected 2027',
    details: 'Computer Engineering student with focus on software development and system design.',
  },
]

export const SERVICES = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Responsive, performant web apps with modern frameworks and best practices.',
  },
  {
    icon: Server,
    title: 'Backend APIs',
    description: 'RESTful APIs, authentication, and secure data handling for scalable systems.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Cross‑platform mobile apps with clean UI and real‑time features.',
  },
  {
    icon: Database,
    title: 'Database Design',
    description: 'Relational and NoSQL schema design, optimization, and data modeling.',
  },
  {
    icon: Cloud,
    title: 'Deployment Ready',
    description: 'CI/CD‑friendly setups and hosting‑ready builds for modern platforms.',
  },
  {
    icon: Code2,
    title: 'Technical Support',
    description: 'Troubleshooting, maintenance, and documentation for stable systems.',
  },
]

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/assaadshreim/', icon: 'github' },
  { label: 'Instagram', href: 'https://www.instagram.com/assaad_sh3?igsh=OWN6bGIzZTZ5d3p4', icon: 'instagram' },
]
