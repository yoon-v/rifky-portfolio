export type AccentTheme = 'emerald' | 'violet' | 'silver' | 'amber';

export interface ThemeConfig {
  name: string;
  id: AccentTheme;
  primary: string;
  glow: string;
  border: string;
  badge: string;
  textAccent: string;
  gradient: string;
}

export interface ProfileData {
  name: string;
  title: string;
  brand: string;
  tagline: string;
  shortBio: string;
  fullBio: string;
  avatarUrl: string;
  secondaryImageUrl: string;
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  cvUrl: string;
  availableForHire: boolean;
  yearsOfExperience: number;
}

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  category: 'GRAPHIC DESIGN' | 'WEB' | 'UI/UX' | 'SOCIAL MEDIA' | 'OTHER';
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  coverImage: string;
  gallery: string[];
  tools: string[];
  client: string;
  year: string;
  projectUrl?: string;
  featured: boolean;
  published: boolean;
  order: number;
  layoutType?: 'left' | 'right' | 'wide';
}

export interface ExperienceData {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
  technologies: string[];
  order: number;
}

export interface SkillData {
  id: string;
  name: string;
  category: string;
  level: string; // e.g. 'Advanced', 'Specialist', 'Expert'
  iconName: string;
  previewImage: string;
  description: string;
  order: number;
}

export interface ServiceData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  iconName: string;
  order: number;
  active: boolean;
}

export interface MessageData {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface SocialLinksData {
  instagram: string;
  linkedin: string;
  github: string;
  behance: string;
  tiktok: string;
  facebook: string;
  whatsapp: string;
  email: string;
}

export interface SiteSettings {
  websiteTitle: string;
  metaDescription: string;
  accentTheme: AccentTheme;
  enableGrain: boolean;
  enableSoundFx: boolean;
  enableCustomCursor: boolean;
  footerWatermark: string;
  heroCreativeLabel: string;
  showAdminFloatingButton?: boolean;
}

export interface StatsData {
  projectsCount: string;
  designsCount: string;
  webProjectsCount: string;
  experienceYears: string;
}
