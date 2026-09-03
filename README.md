# Muhammad Irdiansyah Rifky (MIR) — Premium Cinematic Portfolio

A luxury, editorial, cinematic personal portfolio website engineered for **Muhammad Irdiansyah Rifky** — *Graphic Designer & IT Specialist*.

> **Tagline:** "Turning Ideas Into Visual & Digital Experiences."

---

## 01. Architecture & Folder Structure

```
├── .env.example
├── firestore.rules
├── index.html
├── metadata.json
├── package.json
├── README.md
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   ├── context/
│   │   └── PortfolioContext.tsx
│   ├── data/
│   │   └── initialData.ts
│   └── components/
│       ├── CustomCursor.tsx
│       ├── LoadingScreen.tsx
│       ├── Navbar.tsx
│       ├── HeroSection.tsx
│       ├── MarqueeSection.tsx
│       ├── AboutSection.tsx
│       ├── StatisticsSection.tsx
│       ├── ExpertiseSection.tsx
│       ├── SelectedWorkSection.tsx
│       ├── ProjectDetailModal.tsx
│       ├── ExperienceSection.tsx
│       ├── ServicesSection.tsx
│       ├── ToolsSection.tsx
│       ├── CvSection.tsx
│       ├── CvPreviewModal.tsx
│       ├── ContactSection.tsx
│       ├── FooterSection.tsx
│       └── AdminModal.tsx
├── tsconfig.json
└── vite.config.ts
```

---

## 02. Features & Interactive Modules

1. **Cinematic Loading Experience**: `MIR` -> `01 — 100%` counter reveal with smooth curtain fade out.
2. **Desktop Custom Cursor**: Smooth lagged ring + precision dot + contextual badges (`VIEW`, `OPEN`, `CASE STUDY`) on hover, automatically disabled on touch devices.
3. **Hero Section (100vh)**: Oversized editorial typography, staggered animation, interactive mouse parallax on profile visual, available status aura, and animated scroll indicator.
4. **Infinite Marquee Ticker**: Smooth GPU-accelerated ticker separated by `✦`, with hover slow-down.
5. **Editorial About Showcase**: Storytelling layout with dual spotlights, core pillars, and high-contrast typography.
6. **Animated Statistics**: Dynamic counter meters reacting to viewport entry.
7. **Interactive Expertise**: Hover-triggered floating image previews and accent line animation.
8. **Asymmetrical Selected Work**: Editorial project showcase with real-time category filtering (`GRAPHIC DESIGN`, `WEB`, `UI/UX`, `SOCIAL MEDIA`).
9. **Comprehensive Case Study Modal**: Deep project view with problem statement, challenge, solution, result, tools badges, and fullscreen gallery lightbox.
10. **Journey Timeline**: Illuminated career path detailing roles at *Yayasan Pertumbuhan Hijau Lestari* and client commissions.
11. **Services Accordion**: Interactive deliverables checklist and consultation triggers.
12. **Tools & Technologies**: Monochrome icons with glowing accent highlights.
13. **Curriculum Vitae Engine**: Printable, downloadable, and interactive CV modal.
14. **Underline Minimalist Contact Form**: Real-time validation, confetti celebration state, and direct WhatsApp/Email actions.
15. **Full-Featured Admin CMS (`/admin` or Shield Icon)**:
    - Edit profile, bio, avatars, tagline & statistics
    - Full CRUD for Projects with category, gallery, and layout controls
    - Full CRUD for Experience & Career milestones
    - Manage contact form submissions & inbox
    - Switch color themes (Emerald Green, Electric Violet, Metallic Silver, Sunset Amber)
    - Toggle noise grain, custom cursor, and SEO metadata
    - Persistent LocalStorage cache + Firebase sync ready

---

## 03. Environment Variables

Define in `.env.example`:
```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
APP_URL="YOUR_HOSTED_URL"
```

---

## 04. Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
