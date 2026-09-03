import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ProfileData, 
  ProjectData, 
  ExperienceData, 
  SkillData, 
  ServiceData, 
  MessageData, 
  SocialLinksData, 
  SiteSettings, 
  StatsData, 
  AccentTheme,
  ThemeConfig 
} from '../types';
import { 
  INITIAL_PROFILE, 
  INITIAL_PROJECTS, 
  INITIAL_EXPERIENCES, 
  INITIAL_SKILLS, 
  INITIAL_SERVICES, 
  INITIAL_SOCIALS, 
  INITIAL_SETTINGS, 
  INITIAL_STATS, 
  INITIAL_MESSAGES,
  ACCENT_THEMES 
} from '../data/initialData';

interface PortfolioContextType {
  profile: ProfileData;
  projects: ProjectData[];
  experiences: ExperienceData[];
  skills: SkillData[];
  services: ServiceData[];
  messages: MessageData[];
  socials: SocialLinksData[]; // or single object
  socialLinks: SocialLinksData;
  settings: SiteSettings;
  stats: StatsData;
  currentTheme: ThemeConfig;
  
  // Modals & Navigation States
  activeProject: ProjectData | null;
  setActiveProject: (proj: ProjectData | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isCvModalOpen: boolean;
  setIsCvModalOpen: (open: boolean) => void;
  
  // Admin Authentication & Security
  isAdminAuthenticated: boolean;
  adminUsername: string;
  loginAdmin: (username: string, pass: string) => { success: boolean; message: string };
  logoutAdmin: () => void;
  updateAdminCredentials: (currentPass: string, newUsername: string, newPass: string) => { success: boolean; message: string };
  
  // Custom Cursor Interaction
  cursorVariant: 'default' | 'link' | 'view' | 'open' | 'button' | 'hidden';
  cursorText: string;
  setCursorState: (variant: 'default' | 'link' | 'view' | 'open' | 'button' | 'hidden', text?: string) => void;
  
  // CRUD Actions
  updateProfile: (data: Partial<ProfileData>) => void;
  addProject: (data: Omit<ProjectData, 'id'>) => void;
  updateProject: (id: string, data: Partial<ProjectData>) => void;
  deleteProject: (id: string) => void;
  addExperience: (data: Omit<ExperienceData, 'id'>) => void;
  updateExperience: (id: string, data: Partial<ExperienceData>) => void;
  deleteExperience: (id: string) => void;
  addSkill: (data: Omit<SkillData, 'id'>) => void;
  updateSkill: (id: string, data: Partial<SkillData>) => void;
  deleteSkill: (id: string) => void;
  addService: (data: Omit<ServiceData, 'id'>) => void;
  updateService: (id: string, data: Partial<ServiceData>) => void;
  deleteService: (id: string) => void;
  sendMessage: (msg: { name: string; email: string; subject: string; message: string }) => boolean;
  updateMessageStatus: (id: string, status: 'unread' | 'read' | 'replied') => void;
  deleteMessage: (id: string) => void;
  updateSocials: (data: Partial<SocialLinksData>) => void;
  updateSettings: (data: Partial<SiteSettings>) => void;
  updateStats: (data: Partial<StatsData>) => void;
  setAccentTheme: (theme: AccentTheme) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEYS = {
  PROFILE: 'mir_portfolio_profile_v1',
  PROJECTS: 'mir_portfolio_projects_v1',
  EXPERIENCES: 'mir_portfolio_experiences_v1',
  SKILLS: 'mir_portfolio_skills_v1',
  SERVICES: 'mir_portfolio_services_v1',
  MESSAGES: 'mir_portfolio_messages_v1',
  SOCIALS: 'mir_portfolio_socials_v1',
  SETTINGS: 'mir_portfolio_settings_v1',
  STATS: 'mir_portfolio_stats_v1',
  AUTH_CREDENTIALS: 'mir_portfolio_admin_credentials_v1',
  AUTH_SESSION: 'mir_portfolio_admin_session_v1',
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage or defaults
  const [profile, setProfileState] = useState<ProfileData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [projects, setProjectsState] = useState<ProjectData[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [experiences, setExperiencesState] = useState<ExperienceData[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPERIENCES);
    return saved ? JSON.parse(saved) : INITIAL_EXPERIENCES;
  });

  const [skills, setSkillsState] = useState<SkillData[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [services, setServicesState] = useState<ServiceData[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [messages, setMessagesState] = useState<MessageData[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [socialLinks, setSocialLinksState] = useState<SocialLinksData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SOCIALS);
    return saved ? JSON.parse(saved) : INITIAL_SOCIALS;
  });

  const [settings, setSettingsState] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [stats, setStatsState] = useState<StatsData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  // UI Interactive States
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'link' | 'view' | 'open' | 'button' | 'hidden'>('default');
  const [cursorText, setCursorText] = useState<string>('');

  // Admin Authentication & Session Management
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION) === 'true';
    } catch {
      return false;
    }
  });

  const [adminCreds, setAdminCreds] = useState<{ username: string; password: string }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH_CREDENTIALS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.username && parsed.password) {
          return parsed;
        }
      }
    } catch {}
    return { username: 'admin', password: 'admin123' };
  });

  const loginAdmin = (enteredUser: string, enteredPass: string) => {
    const cleanUser = (enteredUser || '').trim().toLowerCase();
    const targetUser = (adminCreds.username || 'admin').trim().toLowerCase();
    const profileEmail = (profile.email || '').trim().toLowerCase();

    // Allow login via configured admin username or owner email
    const isUserValid = cleanUser === targetUser || (profileEmail && cleanUser === profileEmail);
    const isPassValid = enteredPass === adminCreds.password;

    if (isUserValid && isPassValid) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'true');
      } catch {}
      return { success: true, message: 'Autentikasi berhasil! Selamat datang di Panel Admin.' };
    }

    return { success: false, message: 'Username atau password yang dimasukkan salah.' };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    } catch {}
  };

  const updateAdminCredentials = (currentPass: string, newUsername: string, newPass: string) => {
    if (currentPass !== adminCreds.password) {
      return { success: false, message: 'Password saat ini salah. Perubahan kredensial ditolak.' };
    }

    const cleanNewUser = newUsername.trim() || 'admin';
    const cleanNewPass = newPass.trim();

    if (!cleanNewPass || cleanNewPass.length < 4) {
      return { success: false, message: 'Password baru minimal 4 karakter.' };
    }

    const updated = { username: cleanNewUser, password: cleanNewPass };
    setAdminCreds(updated);
    safeSave(STORAGE_KEYS.AUTH_CREDENTIALS, updated);
    return { success: true, message: 'Kredensial admin (username & password) berhasil diperbarui!' };
  };

  const currentTheme = ACCENT_THEMES[settings.accentTheme] || ACCENT_THEMES.emerald;

  // Safe wrapper for localStorage writes
  const safeSave = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.warn(`LocalStorage write warning for ${key}:`, err);
    }
  };

  // Sync CSS variables on theme change
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', currentTheme.primary);
    root.style.setProperty('--accent-glow', currentTheme.glow);
    root.style.setProperty('--accent-border', currentTheme.border);
  }, [currentTheme]);

  // Sync state to LocalStorage
  const updateProfile = (data: Partial<ProfileData>) => {
    const updated = { ...profile, ...data };
    setProfileState(updated);
    safeSave(STORAGE_KEYS.PROFILE, updated);
  };

  const addProject = (data: Omit<ProjectData, 'id'>) => {
    const newProj: ProjectData = {
      ...data,
      id: `proj-${Date.now()}`
    };
    const updated = [newProj, ...projects];
    setProjectsState(updated);
    safeSave(STORAGE_KEYS.PROJECTS, updated);
  };

  const updateProject = (id: string, data: Partial<ProjectData>) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...data } : p);
    setProjectsState(updated);
    safeSave(STORAGE_KEYS.PROJECTS, updated);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjectsState(updated);
    safeSave(STORAGE_KEYS.PROJECTS, updated);
  };

  const addExperience = (data: Omit<ExperienceData, 'id'>) => {
    const newExp: ExperienceData = {
      ...data,
      id: `exp-${Date.now()}`
    };
    const updated = [newExp, ...experiences];
    setExperiencesState(updated);
    safeSave(STORAGE_KEYS.EXPERIENCES, updated);
  };

  const updateExperience = (id: string, data: Partial<ExperienceData>) => {
    const updated = experiences.map(e => e.id === id ? { ...e, ...data } : e);
    setExperiencesState(updated);
    safeSave(STORAGE_KEYS.EXPERIENCES, updated);
  };

  const deleteExperience = (id: string) => {
    const updated = experiences.filter(e => e.id !== id);
    setExperiencesState(updated);
    safeSave(STORAGE_KEYS.EXPERIENCES, updated);
  };

  const addSkill = (data: Omit<SkillData, 'id'>) => {
    const newSkill: SkillData = {
      ...data,
      id: `sk-${Date.now()}`
    };
    const updated = [...skills, newSkill];
    setSkillsState(updated);
    safeSave(STORAGE_KEYS.SKILLS, updated);
  };

  const updateSkill = (id: string, data: Partial<SkillData>) => {
    const updated = skills.map(s => s.id === id ? { ...s, ...data } : s);
    setSkillsState(updated);
    safeSave(STORAGE_KEYS.SKILLS, updated);
  };

  const deleteSkill = (id: string) => {
    const updated = skills.filter(s => s.id !== id);
    setSkillsState(updated);
    safeSave(STORAGE_KEYS.SKILLS, updated);
  };

  const addService = (data: Omit<ServiceData, 'id'>) => {
    const newService: ServiceData = {
      ...data,
      id: `srv-${Date.now()}`
    };
    const updated = [...services, newService];
    setServicesState(updated);
    safeSave(STORAGE_KEYS.SERVICES, updated);
  };

  const updateService = (id: string, data: Partial<ServiceData>) => {
    const updated = services.map(s => s.id === id ? { ...s, ...data } : s);
    setServicesState(updated);
    safeSave(STORAGE_KEYS.SERVICES, updated);
  };

  const deleteService = (id: string) => {
    const updated = services.filter(s => s.id !== id);
    setServicesState(updated);
    safeSave(STORAGE_KEYS.SERVICES, updated);
  };

  const sendMessage = (msg: { name: string; email: string; subject: string; message: string }) => {
    const newMsg: MessageData = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    const updated = [newMsg, ...messages];
    setMessagesState(updated);
    safeSave(STORAGE_KEYS.MESSAGES, updated);
    return true;
  };

  const updateMessageStatus = (id: string, status: 'unread' | 'read' | 'replied') => {
    const updated = messages.map(m => m.id === id ? { ...m, status } : m);
    setMessagesState(updated);
    safeSave(STORAGE_KEYS.MESSAGES, updated);
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessagesState(updated);
    safeSave(STORAGE_KEYS.MESSAGES, updated);
  };

  const updateSocials = (data: Partial<SocialLinksData>) => {
    const updated = { ...socialLinks, ...data };
    setSocialLinksState(updated);
    safeSave(STORAGE_KEYS.SOCIALS, updated);
  };

  const updateSettings = (data: Partial<SiteSettings>) => {
    const updated = { ...settings, ...data };
    setSettingsState(updated);
    safeSave(STORAGE_KEYS.SETTINGS, updated);
  };

  const updateStats = (data: Partial<StatsData>) => {
    const updated = { ...stats, ...data };
    setStatsState(updated);
    safeSave(STORAGE_KEYS.STATS, updated);
  };

  const setAccentTheme = (theme: AccentTheme) => {
    updateSettings({ accentTheme: theme });
  };

  const setCursorState = (variant: 'default' | 'link' | 'view' | 'open' | 'button' | 'hidden', text: string = '') => {
    setCursorVariant(variant);
    setCursorText(text);
  };

  const resetToDefaults = () => {
    setProfileState(INITIAL_PROFILE);
    setProjectsState(INITIAL_PROJECTS);
    setExperiencesState(INITIAL_EXPERIENCES);
    setSkillsState(INITIAL_SKILLS);
    setServicesState(INITIAL_SERVICES);
    setSocialLinksState(INITIAL_SOCIALS);
    setSettingsState(INITIAL_SETTINGS);
    setStatsState(INITIAL_STATS);
    setMessagesState(INITIAL_MESSAGES);
    
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        projects,
        experiences,
        skills,
        services,
        messages,
        socials: [socialLinks],
        socialLinks,
        settings,
        stats,
        currentTheme,
        activeProject,
        setActiveProject,
        isAdminOpen,
        setIsAdminOpen,
        isCvModalOpen,
        setIsCvModalOpen,
        isAdminAuthenticated,
        adminUsername: adminCreds.username,
        loginAdmin,
        logoutAdmin,
        updateAdminCredentials,
        cursorVariant,
        cursorText,
        setCursorState,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        addExperience,
        updateExperience,
        deleteExperience,
        addSkill,
        updateSkill,
        deleteSkill,
        addService,
        updateService,
        deleteService,
        sendMessage,
        updateMessageStatus,
        deleteMessage,
        updateSocials,
        updateSettings,
        updateStats,
        setAccentTheme,
        resetToDefaults
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
