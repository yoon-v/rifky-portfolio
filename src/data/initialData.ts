import { ProfileData, ProjectData, ExperienceData, SkillData, ServiceData, SocialLinksData, SiteSettings, StatsData, MessageData } from '../types';

export const INITIAL_PROFILE: ProfileData = {
  name: "Muhammad Irdiansyah Rifky",
  brand: "MIR",
  title: "Graphic Designer & IT Specialist",
  tagline: "Turning Ideas Into Visual & Digital Experiences.",
  shortBio: "I create visual identities, digital experiences, and technology-driven solutions that turn ideas into meaningful experiences.",
  fullBio: "A passionate multidisciplinary Creative Technologist blending sharp graphic design sensibilities with robust modern IT systems, responsive front-end engineering, and intuitive user experiences. Dedicated to building refined digital products and compelling visual brand narratives.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop", // Professional high-contrast aesthetic portrait placeholder
  secondaryImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  location: "Indonesia",
  email: "irdiansyahrifky4@gmail.com",
  phone: "+62 812-3456-7890",
  whatsapp: "https://wa.me/6281234567890",
  cvUrl: "#cv-download",
  availableForHire: true,
  yearsOfExperience: 5
};

export const INITIAL_STATS: StatsData = {
  projectsCount: "50+",
  designsCount: "30+",
  webProjectsCount: "10+",
  experienceYears: "5+"
};

export const INITIAL_PROJECTS: ProjectData[] = [
  {
    id: "proj-1",
    title: "EcoVibe Sustainable Branding & Identity",
    slug: "ecovibe-branding",
    category: "GRAPHIC DESIGN",
    tagline: "Comprehensive editorial visual identity & brand system for sustainable eco-initiatives.",
    description: "A complete identity overhaul designed for an environmental conservation program. Encompasses minimalist typographic guidelines, bespoke visual emblems, social media kits, and print collateral.",
    challenge: "Translate complex sustainability themes into a clean, modern aesthetic that resonates with young changemakers and international stakeholders without relying on clichéd green motifs.",
    solution: "Crafted a refined dark & emerald color language, geometric brand iconography, custom stationery templates, and high-impact digital campaign assets.",
    result: "Increased social media engagement by 140% and established a cohesive brand presence across print and digital media.",
    coverImage: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop"
    ],
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Canva Pro"],
    client: "Yayasan Pertumbuhan Hijau Lestari",
    year: "2026",
    projectUrl: "https://behance.net",
    featured: true,
    published: true,
    order: 1,
    layoutType: "left"
  },
  {
    id: "proj-2",
    title: "Aura Creative Agency Portfolio & CMS",
    slug: "aura-creative-platform",
    category: "WEB",
    tagline: "High-performance editorial web platform built with React & Next-level micro-interactions.",
    description: "An ultra-fast, cinematic digital showcase engineered with React, Tailwind CSS, and smooth GPU-accelerated motion choreography.",
    challenge: "Deliver heavy visual design fidelity while maintaining sub-second load times and 60 FPS scroll performance on all screen sizes.",
    solution: "Architected a modular component system with responsive asset optimization, custom cursor physics, and seamless page transitions.",
    result: "Achieved a 98/100 Lighthouse performance score with seamless navigation across 2,000+ monthly visits.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop"
    ],
    tools: ["React", "TypeScript", "Tailwind CSS", "Motion", "Vite"],
    client: "Aura Creative Studio",
    year: "2025",
    projectUrl: "https://github.com",
    featured: true,
    published: true,
    order: 2,
    layoutType: "right"
  },
  {
    id: "proj-3",
    title: "Nexus IT Infrastructure & Network Monitoring Dashboard",
    slug: "nexus-it-dashboard",
    category: "UI/UX",
    tagline: "Mission-critical real-time telemetry interface for server topology & incident response.",
    description: "End-to-end design and design system implementation for enterprise IT operations. Features dark mode clarity, dynamic node graphs, and alert triage flows.",
    challenge: "Complex telemetry data was overwhelming sysadmins during critical network outages.",
    solution: "Designed high-contrast data visualization panels, customizable widget grids, and keyboard-first accessibility shortcuts.",
    result: "Reduced average incident response triage time by 35% across 12 distributed network nodes.",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop"
    ],
    tools: ["Figma", "UI Design", "Design Systems", "IT Support Systems"],
    client: "Nexus Enterprise Tech",
    year: "2025",
    projectUrl: "https://figma.com",
    featured: true,
    published: true,
    order: 3,
    layoutType: "wide"
  },
  {
    id: "proj-4",
    title: "Kinetix Social Media Campaign & Motion Pack",
    slug: "kinetix-social-media",
    category: "SOCIAL MEDIA",
    tagline: "Dynamic visual templates, reels motion graphics, and carousel design systems.",
    description: "A cohesive set of 40+ high-engagement social media carousel templates, story frames, and animated promo teasers.",
    challenge: "Maintain brand consistency across daily multi-channel posts with rapid production turnaround.",
    solution: "Engineered modular Canva and Photoshop master templates with pre-configured typographic hierarchy and color tokens.",
    result: "Grew organic follower base by 85K in 6 months with a 3.8x boost in save-and-share rates.",
    coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop"
    ],
    tools: ["Photoshop", "Illustrator", "After Effects", "Canva"],
    client: "Kinetix Digital Media",
    year: "2025",
    projectUrl: "https://instagram.com",
    featured: false,
    published: true,
    order: 4,
    layoutType: "left"
  }
];

export const INITIAL_EXPERIENCES: ExperienceData[] = [
  {
    id: "exp-1",
    company: "Yayasan Pertumbuhan Hijau Lestari",
    position: "IT & Graphic Designer",
    startDate: "2026",
    endDate: "Present",
    location: "Indonesia",
    description: [
      "Lead overall graphic design direction for branding, publications, and campaign materials.",
      "Spearhead website development, front-end optimization, and digital system maintenance.",
      "Manage social media creative strategies, digital content production, and engagement analytics.",
      "Provide comprehensive IT support, hardware/network troubleshooting, and secure infrastructure operations.",
      "Conduct UI/UX design research for stakeholder portals and digital reporting platforms."
    ],
    technologies: ["Graphic Design", "Web Development", "UI/UX", "IT Support", "Social Media", "System Maintenance"],
    order: 1
  },
  {
    id: "exp-2",
    company: "Freelance Creative & Digital Studio",
    position: "Creative Technologist & UI/UX Designer",
    startDate: "2023",
    endDate: "2025",
    location: "Remote",
    description: [
      "Delivered customized graphic design identities, commercial websites, and UI prototypes for 30+ international clients.",
      "Engineered responsive modern web applications utilizing modern JavaScript/TypeScript toolchains.",
      "Formulated visual guidelines, pitch decks, and digital advertising collateral."
    ],
    technologies: ["Figma", "React", "TypeScript", "Adobe Creative Suite", "Tailwind CSS", "Brand Strategy"],
    order: 2
  },
  {
    id: "exp-3",
    company: "Digital Media & Tech Solutions",
    position: "Graphic Designer & Social Media Specialist",
    startDate: "2021",
    endDate: "2023",
    location: "Indonesia",
    description: [
      "Curated visual storytelling across Instagram, LinkedIn, and YouTube channels.",
      "Collaborated with developers to translate vector brand assets into pixel-perfect web assets.",
      "Maintained internal hardware workstations and local network security protocols."
    ],
    technologies: ["Photoshop", "Illustrator", "Motion Graphics", "Content Strategy", "Hardware Support"],
    order: 3
  }
];

export const INITIAL_SKILLS: SkillData[] = [
  {
    id: "sk-1",
    name: "GRAPHIC DESIGN",
    category: "Design",
    level: "Expert",
    iconName: "Palette",
    previewImage: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop",
    description: "Brand identity, logos, vector art, editorial layouts, marketing collateral, and print systems.",
    order: 1
  },
  {
    id: "sk-2",
    name: "WEB DEVELOPMENT",
    category: "Technology",
    level: "Specialist",
    iconName: "Code",
    previewImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    description: "Modern responsive web applications, React, TypeScript, Tailwind CSS, Vite, and API integrations.",
    order: 2
  },
  {
    id: "sk-3",
    name: "UI / UX DESIGN",
    category: "Design & Research",
    level: "Advanced",
    iconName: "Layout",
    previewImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    description: "Wireframing, interactive prototyping in Figma, design systems, usability research, and user flows.",
    order: 3
  },
  {
    id: "sk-4",
    name: "SOCIAL MEDIA",
    category: "Marketing",
    level: "Specialist",
    iconName: "Share2",
    previewImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
    description: "Content strategy, high-conversion visual carousels, video reels branding, and engagement analytics.",
    order: 4
  },
  {
    id: "sk-5",
    name: "PHOTO EDITING",
    category: "Visual Arts",
    level: "Advanced",
    iconName: "Camera",
    previewImage: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
    description: "High-end retouching, color grading, compositing, background manipulation, and visual restoration.",
    order: 5
  },
  {
    id: "sk-6",
    name: "IT SUPPORT & SYSTEMS",
    category: "Infrastructure",
    level: "Specialist",
    iconName: "Server",
    previewImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    description: "Network configuration, system troubleshooting, hardware maintenance, security hygiene, and workstation optimization.",
    order: 6
  }
];

export const INITIAL_SERVICES: ServiceData[] = [
  {
    id: "srv-1",
    title: "Brand Identity & Visual Design",
    subtitle: "01 — GRAPHIC DESIGN",
    description: "End-to-end visual identity systems that articulate your core brand values. From logos, color palettes, and typographic scales to bespoke print packaging and marketing collateral.",
    deliverables: ["Logo & Brand Guidelines", "Vector Emblems & Icons", "Print Collateral & Packaging", "Pitch Decks & Presentation Kits"],
    iconName: "Sparkles",
    order: 1,
    active: true
  },
  {
    id: "srv-2",
    title: "High-End Web Engineering",
    subtitle: "02 — WEB DEVELOPMENT",
    description: "Fast, accessible, and beautifully animated websites crafted using modern frameworks like React, TypeScript, and Tailwind CSS. Tailored for creative agencies, brands, and businesses.",
    deliverables: ["Custom Web Applications", "Responsive Mobile-First Builds", "SEO & Performance Optimization", "Interactive Motion Choreography"],
    iconName: "Terminal",
    order: 2,
    active: true
  },
  {
    id: "srv-3",
    title: "UI/UX Product Architecture",
    subtitle: "03 — UI / UX DESIGN",
    description: "Intuitive user interfaces founded on thoughtful UX research, wireframing, and interactive Figma prototyping. Designed to minimize cognitive friction and maximize conversion.",
    deliverables: ["Interactive Figma Prototypes", "Design System Components", "User Journey & Wireframes", "Usability Testing & Iteration"],
    iconName: "Compass",
    order: 3,
    active: true
  },
  {
    id: "srv-4",
    title: "Social Media Creative Systems",
    subtitle: "04 — SOCIAL MEDIA",
    description: "Complete visual content packs designed to turn social channels into brand magnets. Includes multi-slide educational carousels, reel graphics, and story campaigns.",
    deliverables: ["Instagram Carousel Sets", "Editable Canva/PSD Templates", "Video Graphics & Thumbnails", "Editorial Content Calendar"],
    iconName: "Flame",
    order: 4,
    active: true
  },
  {
    id: "srv-5",
    title: "IT Support & Digital Infrastructure",
    subtitle: "05 — IT SPECIALIST",
    description: "Reliable enterprise IT assistance, workstation setup, local network routing, domain & hosting administration, and digital security maintenance.",
    deliverables: ["Hardware & OS Diagnostics", "Network Configuration", "Web & Email Hosting Setup", "Security Auditing & Backups"],
    iconName: "ShieldCheck",
    order: 5,
    active: true
  }
];

export const INITIAL_SOCIALS: SocialLinksData = {
  instagram: "https://instagram.com",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
  behance: "https://behance.net",
  tiktok: "https://tiktok.com",
  facebook: "https://facebook.com",
  whatsapp: "https://wa.me/6281234567890",
  email: "irdiansyahrifky4@gmail.com"
};

export const INITIAL_SETTINGS: SiteSettings = {
  websiteTitle: "Muhammad Irdiansyah Rifky — Graphic Designer & IT Specialist",
  metaDescription: "Turning Ideas Into Visual & Digital Experiences. Premium Portfolio.",
  accentTheme: "emerald",
  enableGrain: true,
  enableSoundFx: true,
  enableCustomCursor: true,
  footerWatermark: "LET'S CREATE.",
  heroCreativeLabel: "CREATIVE TECHNOLOGIST",
  showAdminFloatingButton: true
};

export const INITIAL_MESSAGES: MessageData[] = [
  {
    id: "msg-1",
    name: "Alex Thorne",
    email: "alex@creativeagency.co",
    subject: "Brand Identity & Website Collaboration",
    message: "Hi Irdiansyah, I was blown away by your visual work and IT engineering versatility. We'd love to discuss a complete brand redesign and web build for our upcoming Q3 launch.",
    status: "read",
    createdAt: "2026-08-20T10:30:00Z"
  }
];

export const ACCENT_THEMES = {
  emerald: {
    name: "Emerald Green",
    id: "emerald" as const,
    primary: "#10b981",
    glow: "rgba(16, 185, 129, 0.25)",
    border: "rgba(16, 185, 129, 0.35)",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    textAccent: "text-emerald-400",
    gradient: "from-emerald-500 to-teal-400"
  },
  violet: {
    name: "Electric Violet",
    id: "violet" as const,
    primary: "#a855f7",
    glow: "rgba(168, 85, 247, 0.25)",
    border: "rgba(168, 85, 247, 0.35)",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    textAccent: "text-purple-400",
    gradient: "from-purple-500 to-indigo-400"
  },
  silver: {
    name: "Metallic Silver",
    id: "silver" as const,
    primary: "#e2e8f0",
    glow: "rgba(226, 232, 240, 0.2)",
    border: "rgba(226, 232, 240, 0.35)",
    badge: "bg-slate-300/10 text-slate-200 border-slate-400/30",
    textAccent: "text-slate-200",
    gradient: "from-slate-100 to-zinc-400"
  },
  amber: {
    name: "Sunset Amber",
    id: "amber" as const,
    primary: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.25)",
    border: "rgba(245, 158, 11, 0.35)",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    textAccent: "text-amber-400",
    gradient: "from-amber-400 to-orange-500"
  }
};
