import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectData, ExperienceData, SkillData, ServiceData, AccentTheme } from '../types';
import {
  X,
  LayoutDashboard,
  User,
  FolderKanban,
  Briefcase,
  Layers,
  Sparkles,
  Inbox,
  Share2,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Eye,
  EyeOff,
  Camera,
  UploadCloud,
  Palette,
  ShieldCheck,
  LogOut,
  KeyRound,
  Shield,
  Lock,
  AlertCircle
} from 'lucide-react';
import { SimpleUploadManager } from './SimpleUploadManager';
import { ImageDropzone } from './ImageDropzone';
import { AdminLoginGate } from './AdminLoginGate';

export const AdminModal: React.FC = () => {
  const {
    profile,
    projects,
    experiences,
    skills,
    services,
    messages,
    socialLinks,
    settings,
    stats,
    currentTheme,
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    adminUsername,
    logoutAdmin,
    updateAdminCredentials,
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
    updateMessageStatus,
    deleteMessage,
    updateSocials,
    updateSettings,
    updateStats,
    setAccentTheme,
    resetToDefaults
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    'upload' | 'dashboard' | 'profile' | 'projects' | 'experience' | 'skills' | 'services' | 'messages' | 'socials' | 'settings'
  >('upload');

  const [notification, setNotification] = useState<string>('');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // State for forms
  const [profileForm, setProfileForm] = useState({ ...profile });
  const [statsForm, setStatsForm] = useState({ ...stats });
  const [socialsForm, setSocialsForm] = useState({ ...socialLinks });
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  // Project Editor State
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<ProjectData>>({
    title: '',
    slug: '',
    category: 'GRAPHIC DESIGN',
    tagline: '',
    description: '',
    challenge: '',
    solution: '',
    result: '',
    coverImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
    gallery: [],
    tools: ['Figma', 'Photoshop', 'Illustrator'],
    client: '',
    year: '2026',
    projectUrl: '',
    featured: true,
    published: true,
    order: 1,
    layoutType: 'left'
  });

  // Experience Editor State
  const [editingExp, setEditingExp] = useState<ExperienceData | null>(null);
  const [isCreatingExp, setIsCreatingExp] = useState(false);
  const [expForm, setExpForm] = useState<Partial<ExperienceData>>({
    company: '',
    position: '',
    startDate: '2026',
    endDate: 'Present',
    location: 'Indonesia',
    description: ['Lead graphic design and digital media initiatives.'],
    technologies: ['Graphic Design', 'Web Development', 'IT Support'],
    order: 1
  });

  // Security Credentials Form State
  const [securityForm, setSecurityForm] = useState({
    currentPass: '',
    newUsername: '',
    newPass: '',
    confirmPass: ''
  });
  const [securityMsg, setSecurityMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isAdminOpen) return null;

  if (!isAdminAuthenticated) {
    return (
      <AdminLoginGate 
        onClose={() => setIsAdminOpen(false)} 
        onSuccess={() => showToast('Selamat datang kembali, Admin!')} 
      />
    );
  }

  const handleUpdateSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMsg(null);

    if (!securityForm.currentPass) {
      setSecurityMsg({ text: 'Mohon masukkan password saat ini.', isError: true });
      return;
    }
    if (securityForm.newPass && securityForm.newPass !== securityForm.confirmPass) {
      setSecurityMsg({ text: 'Konfirmasi password baru tidak cocok.', isError: true });
      return;
    }

    const res = updateAdminCredentials(
      securityForm.currentPass,
      securityForm.newUsername || adminUsername,
      securityForm.newPass || securityForm.currentPass
    );

    if (res.success) {
      setSecurityMsg({ text: res.message, isError: false });
      showToast(res.message);
      setSecurityForm({
        currentPass: '',
        newUsername: '',
        newPass: '',
        confirmPass: ''
      });
    } else {
      setSecurityMsg({ text: res.message, isError: true });
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    updateStats(statsForm);
    showToast('Profile and Statistics updated successfully!');
  };

  const handleSaveSocials = (e: React.FormEvent) => {
    e.preventDefault();
    updateSocials(socialsForm);
    showToast('Social Links updated successfully!');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    showToast('System Settings updated successfully!');
  };

  // Projects CRUD
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title) return;

    if (editingProject) {
      updateProject(editingProject.id, projectForm);
      showToast('Project updated!');
    } else {
      addProject({
        title: projectForm.title || 'Untitled Project',
        slug: projectForm.slug || projectForm.title?.toLowerCase().replace(/\s+/g, '-') || 'project',
        category: projectForm.category || 'GRAPHIC DESIGN',
        tagline: projectForm.tagline || '',
        description: projectForm.description || '',
        challenge: projectForm.challenge || '',
        solution: projectForm.solution || '',
        result: projectForm.result || '',
        coverImage: projectForm.coverImage || 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
        gallery: projectForm.gallery || [projectForm.coverImage || ''],
        tools: projectForm.tools || ['Figma'],
        client: projectForm.client || '',
        year: projectForm.year || '2026',
        projectUrl: projectForm.projectUrl || '',
        featured: projectForm.featured ?? true,
        published: projectForm.published ?? true,
        order: projectForm.order || projects.length + 1,
        layoutType: projectForm.layoutType || 'left'
      });
      showToast('New project created!');
    }

    setEditingProject(null);
    setIsCreatingProject(false);
  };

  // Experience CRUD
  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.company || !expForm.position) return;

    if (editingExp) {
      updateExperience(editingExp.id, expForm);
      showToast('Experience updated!');
    } else {
      addExperience({
        company: expForm.company || '',
        position: expForm.position || '',
        startDate: expForm.startDate || '2026',
        endDate: expForm.endDate || 'Present',
        location: expForm.location || 'Indonesia',
        description: expForm.description || [],
        technologies: expForm.technologies || [],
        order: expForm.order || experiences.length + 1
      });
      showToast('New experience created!');
    }

    setEditingExp(null);
    setIsCreatingExp(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[3000] overflow-y-auto bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 select-none">
        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-6xl h-[90vh] bg-[#0A0A0A] border border-white/15 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070707]">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <h2 className="text-sm font-bold font-mono-tech uppercase tracking-wider text-white">
                  MIR Portfolio CMS & Administration
                </h2>
                <span className="text-[10px] text-neutral-400 font-mono-tech">
                  REAL-TIME LOCALSTORAGE ENGINE • FIREBASE READY
                </span>
              </div>
            </div>

            {/* Notification Toast */}
            {notification && (
              <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono-tech rounded-lg flex items-center gap-1.5 animate-bounce">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {notification}
              </div>
            )}

            <div className="flex items-center gap-2.5">
              {/* Active Admin Session Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono-tech">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin: <strong className="text-white">{adminUsername}</strong></span>
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={() => {
                  logoutAdmin();
                  showToast('Sesi admin telah dikunci');
                }}
                className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-mono-tech flex items-center gap-1.5 transition-colors"
                title="Kunci & Keluar dari CMS"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout & Kunci</span>
              </button>

              <button
                onClick={() => setIsAdminOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                aria-label="Close Admin Panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body with Sidebar and Main Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-64 border-r border-white/10 bg-[#080808] p-4 flex flex-col justify-between overflow-y-auto shrink-0">
              <div className="space-y-1">
                {/* Highlighted Upload Tab */}
                <button
                  onClick={() => {
                    setActiveTab('upload');
                    setIsCreatingProject(false);
                    setEditingProject(null);
                    setIsCreatingExp(false);
                    setEditingExp(null);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-mono-tech tracking-wider transition-all text-left mb-3 ${
                    activeTab === 'upload'
                      ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-400'
                      : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Camera className="w-4 h-4" />
                    <span>Upload Foto & Design</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/30 font-bold uppercase">
                    SIMPEL
                  </span>
                </button>

                <div className="text-[10px] font-mono-tech text-neutral-500 uppercase px-2 py-1 tracking-widest">
                  Menu Lengkap
                </div>

                {[
                  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                  { id: 'profile', label: 'Profile & Bio', icon: User },
                  { id: 'projects', label: 'Projects (Work)', icon: FolderKanban },
                  { id: 'experience', label: 'Experience', icon: Briefcase },
                  { id: 'skills', label: 'Skills & Tools', icon: Layers },
                  { id: 'services', label: 'Services', icon: Sparkles },
                  { id: 'messages', label: `Messages (${messages.filter(m => m.status === 'unread').length})`, icon: Inbox },
                  { id: 'socials', label: 'Social Links', icon: Share2 },
                  { id: 'settings', label: 'Site Settings', icon: Settings },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setIsCreatingProject(false);
                        setEditingProject(null);
                        setIsCreatingExp(false);
                        setEditingExp(null);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono-tech tracking-wider transition-all text-left ${
                        isActive
                          ? 'bg-white/15 text-white font-bold border border-white/20'
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Action: Reset to Defaults */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    if (window.confirm('Reset all portfolio data back to initial sample content?')) {
                      resetToDefaults();
                      setProfileForm(profile);
                      setStatsForm(stats);
                      setSocialsForm(socialLinks);
                      setSettingsForm(settings);
                      showToast('Reset completed!');
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/15 text-[11px] font-mono-tech transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET SAMPLE DATA</span>
                </button>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#0A0A0A]">
              {/* TAB: SIMPLE UPLOAD (FOTO & DESIGN) */}
              {activeTab === 'upload' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-white flex items-center gap-2.5">
                      <span>Sistem Upload Foto & Hasil Design</span>
                      <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        ADMIN SEDERHANA
                      </span>
                    </h3>
                    <p className="text-xs font-mono-tech text-neutral-400 mt-1">
                      Upload foto profil pribadi dan hasil karya desain langsung dari galeri laptop atau HP Anda dengan kompresi otomatis.
                    </p>
                  </div>

                  <SimpleUploadManager onSuccess={showToast} />
                </div>
              )}
              {/* TAB: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-white">System Overview</h3>
                    <p className="text-xs font-mono-tech text-neutral-400 mt-1">
                      Live portfolio metrics & quick administration indicators.
                    </p>
                  </div>

                  {/* Metric Cards Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-1">
                      <span className="text-[10px] font-mono-tech text-neutral-400 uppercase">TOTAL PROJECTS</span>
                      <div className="text-3xl font-heading font-extrabold text-emerald-400">{projects.length}</div>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-1">
                      <span className="text-[10px] font-mono-tech text-neutral-400 uppercase">PUBLISHED</span>
                      <div className="text-3xl font-heading font-extrabold text-white">
                        {projects.filter(p => p.published).length}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-1">
                      <span className="text-[10px] font-mono-tech text-neutral-400 uppercase">INBOX MESSAGES</span>
                      <div className="text-3xl font-heading font-extrabold text-teal-300">{messages.length}</div>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-1">
                      <span className="text-[10px] font-mono-tech text-neutral-400 uppercase">EXPERIENCES</span>
                      <div className="text-3xl font-heading font-extrabold text-purple-400">{experiences.length}</div>
                    </div>
                  </div>

                  {/* Recent Inquiries List */}
                  <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.015] space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-mono-tech uppercase tracking-wider text-white font-bold">
                        RECENT CONTACT INQUIRIES
                      </h4>
                      <button
                        onClick={() => setActiveTab('messages')}
                        className="text-xs font-mono-tech text-emerald-400 hover:underline"
                      >
                        VIEW ALL MESSAGES →
                      </button>
                    </div>

                    {messages.length === 0 ? (
                      <p className="text-xs text-neutral-500 font-mono-tech py-4">No contact messages received yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {messages.slice(0, 3).map((m) => (
                          <div key={m.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white">{m.name}</span>
                                <span className="text-xs text-neutral-400 font-mono-tech">({m.email})</span>
                              </div>
                              <p className="text-xs text-neutral-300 mt-1 line-clamp-1">{m.subject || m.message}</p>
                            </div>
                            <span className={`px-2.5 py-1 rounded text-[10px] font-mono-tech uppercase ${
                              m.status === 'unread' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-400'
                            }`}>
                              {m.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB: PROFILE */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSaveProfile} className="space-y-8 max-w-4xl">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-white">Profile & Identity Editor</h3>
                    <p className="text-xs font-mono-tech text-neutral-400 mt-1">
                      Customize all personal brand metadata, biography, and statistics.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono-tech text-neutral-400 uppercase">FULL NAME</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono-tech text-neutral-400 uppercase">PROFESSIONAL TITLE</label>
                      <input
                        type="text"
                        value={profileForm.title}
                        onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono-tech text-neutral-400 uppercase">BRAND LOGO TEXT</label>
                      <input
                        type="text"
                        value={profileForm.brand}
                        onChange={(e) => setProfileForm({ ...profileForm, brand: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono-tech text-neutral-400 uppercase">LOCATION</label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-mono-tech text-neutral-400 uppercase">TAGLINE</label>
                      <input
                        type="text"
                        value={profileForm.tagline}
                        onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-mono-tech text-neutral-400 uppercase">SHORT BIO (HERO)</label>
                      <textarea
                        rows={2}
                        value={profileForm.shortBio}
                        onChange={(e) => setProfileForm({ ...profileForm, shortBio: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-mono-tech text-neutral-400 uppercase">FULL BIO (ABOUT & CV)</label>
                      <textarea
                        rows={4}
                        value={profileForm.fullBio}
                        onChange={(e) => setProfileForm({ ...profileForm, fullBio: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono-tech text-neutral-400 uppercase">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono-tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono-tech text-neutral-400 uppercase">PHONE / WHATSAPP</label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono-tech"
                      />
                    </div>

                    <div className="space-y-3 md:col-span-2">
                      <ImageDropzone
                        label="FOTO PROFIL / AVATAR (UPLOAD DARI PERANGKAT)"
                        sublabel="Pilih foto dari galeri atau seret ke sini (otomatis dioptimalkan)"
                        currentImage={profileForm.avatarUrl}
                        onImageUploaded={(dataUrl) => setProfileForm({ ...profileForm, avatarUrl: dataUrl })}
                        onImageRemoved={() => setProfileForm({ ...profileForm, avatarUrl: '' })}
                        aspectRatio="square"
                        maxWidth={1000}
                        maxHeight={1000}
                        quality={0.88}
                      />
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono-tech text-neutral-500 uppercase">ATAU GUNAKAN URL EKSTERNAL</label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={profileForm.avatarUrl}
                          onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                          className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono-tech"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section: Counters / Stats */}
                  <div className="pt-6 border-t border-white/10 space-y-4">
                    <h4 className="text-sm font-mono-tech font-bold text-white uppercase">STATISTICS DISPLAY</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="text-[10px] font-mono-tech text-neutral-400">PROJECTS</label>
                        <input
                          type="text"
                          value={statsForm.projectsCount}
                          onChange={(e) => setStatsForm({ ...statsForm, projectsCount: e.target.value })}
                          className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono-tech text-neutral-400">DESIGNS</label>
                        <input
                          type="text"
                          value={statsForm.designsCount}
                          onChange={(e) => setStatsForm({ ...statsForm, designsCount: e.target.value })}
                          className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono-tech text-neutral-400">WEBSITES</label>
                        <input
                          type="text"
                          value={statsForm.webProjectsCount}
                          onChange={(e) => setStatsForm({ ...statsForm, webProjectsCount: e.target.value })}
                          className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono-tech text-neutral-400">EXPERIENCE</label>
                        <input
                          type="text"
                          value={statsForm.experienceYears}
                          onChange={(e) => setStatsForm({ ...statsForm, experienceYears: e.target.value })}
                          className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-emerald-500 text-black font-mono-tech font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE PROFILE CHANGES</span>
                  </button>
                </form>
              )}

              {/* TAB: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-white">Project Management</h3>
                      <p className="text-xs font-mono-tech text-neutral-400 mt-1">
                        Create, edit, publish, or remove selected case studies.
                      </p>
                    </div>

                    {!isCreatingProject && !editingProject && (
                      <button
                        onClick={() => {
                          setIsCreatingProject(true);
                          setProjectForm({
                            title: '',
                            slug: '',
                            category: 'GRAPHIC DESIGN',
                            tagline: '',
                            description: '',
                            challenge: '',
                            solution: '',
                            result: '',
                            coverImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
                            gallery: [],
                            tools: ['Photoshop', 'Illustrator', 'Figma'],
                            client: '',
                            year: '2026',
                            projectUrl: '',
                            featured: true,
                            published: true,
                            order: projects.length + 1,
                            layoutType: 'left'
                          });
                        }}
                        className="px-4 py-2 rounded-full bg-emerald-500 text-black font-mono-tech font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>ADD NEW PROJECT</span>
                      </button>
                    )}
                  </div>

                  {/* Project Editor Form */}
                  {(isCreatingProject || editingProject) ? (
                    <form onSubmit={handleSaveProject} className="p-6 rounded-2xl border border-white/15 bg-white/[0.02] space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-white/10">
                        <h4 className="text-sm font-mono-tech font-bold text-emerald-400 uppercase">
                          {editingProject ? 'EDIT PROJECT' : 'CREATE NEW PROJECT'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingProject(false);
                            setEditingProject(null);
                          }}
                          className="text-xs font-mono-tech text-neutral-400 hover:text-white"
                        >
                          CANCEL
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono-tech text-neutral-400 uppercase">TITLE *</label>
                          <input
                            type="text"
                            required
                            value={projectForm.title || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono-tech text-neutral-400 uppercase">CATEGORY</label>
                          <select
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                            className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          >
                            <option value="GRAPHIC DESIGN">GRAPHIC DESIGN</option>
                            <option value="WEB">WEB</option>
                            <option value="UI/UX">UI/UX</option>
                            <option value="SOCIAL MEDIA">SOCIAL MEDIA</option>
                            <option value="OTHER">OTHER</option>
                          </select>
                        </div>

                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[10px] font-mono-tech text-neutral-400 uppercase">SHORT TAGLINE</label>
                          <input
                            type="text"
                            value={projectForm.tagline || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                            className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[10px] font-mono-tech text-neutral-400 uppercase">FULL DESCRIPTION</label>
                          <textarea
                            rows={3}
                            value={projectForm.description || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                            className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono-tech text-neutral-400 uppercase">CHALLENGE</label>
                          <textarea
                            rows={2}
                            value={projectForm.challenge || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, challenge: e.target.value })}
                            className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono-tech text-neutral-400 uppercase">SOLUTION</label>
                          <textarea
                            rows={2}
                            value={projectForm.solution || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                            className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <ImageDropzone
                            label="GAMBAR COVER KARYA (UPLOAD DARI PERANGKAT)"
                            sublabel="Pilih foto karya atau seret ke sini (otomatis dioptimalkan)"
                            currentImage={projectForm.coverImage}
                            onImageUploaded={(dataUrl) => setProjectForm({ ...projectForm, coverImage: dataUrl })}
                            onImageRemoved={() => setProjectForm({ ...projectForm, coverImage: '' })}
                            aspectRatio="video"
                            maxWidth={1400}
                            maxHeight={1400}
                            quality={0.86}
                          />
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono-tech text-neutral-500 uppercase">ATAU GUNAKAN URL EKSTERNAL</label>
                            <input
                              type="url"
                              placeholder="https://images.unsplash.com/..."
                              value={projectForm.coverImage || ''}
                              onChange={(e) => setProjectForm({ ...projectForm, coverImage: e.target.value })}
                              className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white font-mono-tech"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono-tech text-neutral-400 uppercase">CLIENT</label>
                          <input
                            type="text"
                            value={projectForm.client || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                            className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono-tech text-neutral-400 uppercase">YEAR</label>
                          <input
                            type="text"
                            value={projectForm.year || '2026'}
                            onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                            className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[10px] font-mono-tech text-neutral-400 uppercase">LIVE PROJECT URL</label>
                          <input
                            type="url"
                            value={projectForm.projectUrl || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, projectUrl: e.target.value })}
                            className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[10px] font-mono-tech text-neutral-400 uppercase">TOOLS (COMMA-SEPARATED)</label>
                          <input
                            type="text"
                            value={projectForm.tools?.join(', ') || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, tools: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                            className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-6 pt-2">
                        <label className="flex items-center gap-2 text-xs font-mono-tech text-neutral-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={projectForm.published}
                            onChange={(e) => setProjectForm({ ...projectForm, published: e.target.checked })}
                            className="rounded border-white/20 text-emerald-500 focus:ring-0"
                          />
                          <span>PUBLISHED VISIBLE</span>
                        </label>

                        <label className="flex items-center gap-2 text-xs font-mono-tech text-neutral-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={projectForm.featured}
                            onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                            className="rounded border-white/20 text-emerald-500 focus:ring-0"
                          />
                          <span>FEATURED CASE STUDY</span>
                        </label>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingProject(false);
                            setEditingProject(null);
                          }}
                          className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono-tech text-neutral-400"
                        >
                          CANCEL
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-full bg-emerald-500 text-black font-mono-tech font-bold text-xs uppercase"
                        >
                          SAVE PROJECT
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Project List */
                    <div className="space-y-3">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={proj.coverImage}
                              alt={proj.title}
                              loading="lazy"
                              decoding="async"
                              className="w-16 h-12 object-cover rounded-lg border border-white/10"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-white font-heading">{proj.title}</h4>
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-white/5 border border-white/10 text-neutral-300">
                                  {proj.category}
                                </span>
                              </div>
                              <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">{proj.tagline || proj.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateProject(proj.id, { published: !proj.published })}
                              className={`p-2 rounded-lg border text-xs font-mono-tech ${
                                proj.published ? 'border-emerald-500/30 text-emerald-400' : 'border-white/10 text-neutral-500'
                              }`}
                              title={proj.published ? 'Published' : 'Hidden'}
                            >
                              {proj.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => {
                                setEditingProject(proj);
                                setProjectForm({ ...proj });
                              }}
                              className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete project "${proj.title}"?`)) {
                                  deleteProject(proj.id);
                                  showToast('Project deleted.');
                                }
                              }}
                              className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: EXPERIENCE */}
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-white">Experience Timeline</h3>
                      <p className="text-xs font-mono-tech text-neutral-400 mt-1">
                        Manage career roles, achievements, and technology responsibilities.
                      </p>
                    </div>

                    {!isCreatingExp && !editingExp && (
                      <button
                        onClick={() => {
                          setIsCreatingExp(true);
                          setExpForm({
                            company: '',
                            position: '',
                            startDate: '2026',
                            endDate: 'Present',
                            location: 'Indonesia',
                            description: ['Describe key responsibilities and visual achievements.'],
                            technologies: ['Graphic Design', 'Web Development'],
                            order: experiences.length + 1
                          });
                        }}
                        className="px-4 py-2 rounded-full bg-emerald-500 text-black font-mono-tech font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>ADD EXPERIENCE</span>
                      </button>
                    )}
                  </div>

                  {(isCreatingExp || editingExp) ? (
                    <form onSubmit={handleSaveExperience} className="p-6 rounded-2xl border border-white/15 bg-white/[0.02] space-y-4">
                      <h4 className="text-sm font-mono-tech font-bold text-emerald-400 uppercase">
                        {editingExp ? 'EDIT EXPERIENCE' : 'ADD NEW EXPERIENCE'}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono-tech text-neutral-400">POSITION *</label>
                          <input
                            type="text"
                            required
                            value={expForm.position || ''}
                            onChange={(e) => setExpForm({ ...expForm, position: e.target.value })}
                            className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono-tech text-neutral-400">COMPANY *</label>
                          <input
                            type="text"
                            required
                            value={expForm.company || ''}
                            onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                            className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono-tech text-neutral-400">START DATE</label>
                          <input
                            type="text"
                            value={expForm.startDate || '2026'}
                            onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })}
                            className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono-tech text-neutral-400">END DATE</label>
                          <input
                            type="text"
                            value={expForm.endDate || 'Present'}
                            onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })}
                            className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[10px] font-mono-tech text-neutral-400">BULLET POINTS (ONE PER LINE)</label>
                          <textarea
                            rows={4}
                            value={expForm.description?.join('\n') || ''}
                            onChange={(e) => setExpForm({ ...expForm, description: e.target.value.split('\n').filter(Boolean) })}
                            className="w-full bg-[#111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white font-mono-tech"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingExp(false);
                            setEditingExp(null);
                          }}
                          className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono-tech text-neutral-400"
                        >
                          CANCEL
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-full bg-emerald-500 text-black font-mono-tech font-bold text-xs uppercase"
                        >
                          SAVE EXPERIENCE
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-3">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-white">{exp.position} — {exp.company}</h4>
                            <span className="text-xs text-emerald-400 font-mono-tech">{exp.startDate} – {exp.endDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingExp(exp);
                                setExpForm({ ...exp });
                              }}
                              className="p-2 rounded-lg bg-white/5 text-neutral-300 hover:text-white"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Delete experience item?')) {
                                  deleteExperience(exp.id);
                                  showToast('Experience deleted.');
                                }
                              }}
                              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: MESSAGES */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-white">Contact Inquiries</h3>
                    <p className="text-xs font-mono-tech text-neutral-400 mt-1">
                      Received messages sent through the website contact form.
                    </p>
                  </div>

                  {messages.length === 0 ? (
                    <p className="text-xs text-neutral-500 font-mono-tech py-6">No messages received yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm font-bold text-white">{msg.name}</span>
                              <span className="text-xs text-emerald-400 font-mono-tech ml-3">{msg.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <select
                                value={msg.status}
                                onChange={(e) => updateMessageStatus(msg.id, e.target.value as any)}
                                className="bg-[#111] border border-white/15 rounded-lg px-2.5 py-1 text-[11px] font-mono-tech text-white"
                              >
                                <option value="unread">UNREAD</option>
                                <option value="read">READ</option>
                                <option value="replied">REPLIED</option>
                              </select>
                              <button
                                onClick={() => deleteMessage(msg.id)}
                                className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <div className="text-xs font-semibold text-neutral-300 font-mono-tech">
                            TOPIC: {msg.subject || 'General Inquiry'}
                          </div>
                          <p className="text-xs sm:text-sm text-neutral-300 bg-black/40 p-4 rounded-xl border border-white/5 font-light leading-relaxed">
                            {msg.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: SOCIALS */}
              {activeTab === 'socials' && (
                <form onSubmit={handleSaveSocials} className="space-y-6 max-w-2xl">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-white">Social Media Links</h3>
                    <p className="text-xs font-mono-tech text-neutral-400 mt-1">
                      Configure your public profile links and communication channels.
                    </p>
                  </div>

                  {Object.keys(socialsForm).map((key) => (
                    <div key={key} className="space-y-1">
                      <label className="text-xs font-mono-tech uppercase text-neutral-400">{key}</label>
                      <input
                        type="text"
                        value={(socialsForm as any)[key] || ''}
                        onChange={(e) => setSocialsForm({ ...socialsForm, [key]: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono-tech"
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="px-8 py-3 rounded-full bg-emerald-500 text-black font-mono-tech font-bold text-xs uppercase"
                  >
                    SAVE SOCIAL LINKS
                  </button>
                </form>
              )}

              {/* TAB: SETTINGS */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="space-y-8 max-w-3xl">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-white">Site Settings & Theming</h3>
                    <p className="text-xs font-mono-tech text-neutral-400 mt-1">
                      Control system color themes, grain effects, cursor behavior, and footer watermarks.
                    </p>
                  </div>

                  {/* Accent Theme Selector */}
                  <div className="space-y-3">
                    <label className="text-xs font-mono-tech text-neutral-400 uppercase">PRIMARY ACCENT THEME</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(['emerald', 'violet', 'silver', 'amber'] as AccentTheme[]).map((themeKey) => (
                        <button
                          key={themeKey}
                          type="button"
                          onClick={() => {
                            setSettingsForm({ ...settingsForm, accentTheme: themeKey });
                            setAccentTheme(themeKey);
                          }}
                          className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-xs font-mono-tech uppercase transition-all ${
                            settingsForm.accentTheme === themeKey
                              ? 'border-white bg-white/10 text-white font-bold'
                              : 'border-white/10 text-neutral-400 hover:border-white/30'
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full"
                            style={{
                              backgroundColor:
                                themeKey === 'emerald' ? '#10b981' :
                                themeKey === 'violet' ? '#a855f7' :
                                themeKey === 'silver' ? '#e2e8f0' : '#f59e0b'
                            }}
                          />
                          <span>{themeKey}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono-tech text-neutral-400 uppercase">FOOTER WATERMARK TEXT</label>
                    <input
                      type="text"
                      value={settingsForm.footerWatermark}
                      onChange={(e) => setSettingsForm({ ...settingsForm, footerWatermark: e.target.value })}
                      className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono-tech"
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <label className="flex items-center gap-3 text-xs font-mono-tech text-neutral-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.showAdminFloatingButton ?? true}
                        onChange={(e) => setSettingsForm({ ...settingsForm, showAdminFloatingButton: e.target.checked })}
                        className="rounded border-white/20 text-emerald-500"
                      />
                      <span>TAMPILKAN TOMBOL MELAYANG ADMIN DI POJOK KANAN BAWAH (FLOATING BUTTON)</span>
                    </label>

                    <label className="flex items-center gap-3 text-xs font-mono-tech text-neutral-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.enableCustomCursor}
                        onChange={(e) => setSettingsForm({ ...settingsForm, enableCustomCursor: e.target.checked })}
                        className="rounded border-white/20 text-emerald-500"
                      />
                      <span>ENABLE PREMIUM DESKTOP CUSTOM CURSOR</span>
                    </label>

                    <label className="flex items-center gap-3 text-xs font-mono-tech text-neutral-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.enableGrain}
                        onChange={(e) => setSettingsForm({ ...settingsForm, enableGrain: e.target.checked })}
                        className="rounded border-white/20 text-emerald-500"
                      />
                      <span>ENABLE ANIMATED SUBTLE GRAIN / NOISE TEXTURE</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-emerald-500 text-black font-mono-tech font-bold text-xs uppercase flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE SYSTEM SETTINGS</span>
                  </button>

                  {/* DEDICATED ADMIN SECURITY MANAGEMENT SECTION */}
                  <div className="pt-8 border-t border-white/15 space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-heading font-bold text-white">
                          Keamanan & Kredensial Administrator
                        </h4>
                        <p className="text-xs font-mono-tech text-neutral-400">
                          Ubah username dan password admin agar portofolio terlindungi dan tidak bisa diakses orang lain.
                        </p>
                      </div>
                    </div>

                    {securityMsg && (
                      <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-mono-tech ${
                        securityMsg.isError 
                          ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      }`}>
                        {securityMsg.isError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
                        <span>{securityMsg.text}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[11px] font-mono-tech uppercase text-neutral-400">
                          Password Saat Ini (Wajib Untuk Konfirmasi)
                        </label>
                        <input
                          type="password"
                          value={securityForm.currentPass}
                          onChange={(e) => setSecurityForm({ ...securityForm, currentPass: e.target.value })}
                          placeholder="Masukkan password saat ini (bawaan: admin123)"
                          className="w-full bg-[#111] border border-white/15 focus:border-red-500/60 rounded-xl px-4 py-2.5 text-xs text-white font-mono-tech focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono-tech uppercase text-neutral-400">
                          Username Baru (Opsional, saat ini: {adminUsername})
                        </label>
                        <input
                          type="text"
                          value={securityForm.newUsername}
                          onChange={(e) => setSecurityForm({ ...securityForm, newUsername: e.target.value })}
                          placeholder="Username baru"
                          className="w-full bg-[#111] border border-white/15 focus:border-emerald-500/60 rounded-xl px-4 py-2.5 text-xs text-white font-mono-tech focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono-tech uppercase text-neutral-400">
                          Password Baru
                        </label>
                        <input
                          type="password"
                          value={securityForm.newPass}
                          onChange={(e) => setSecurityForm({ ...securityForm, newPass: e.target.value })}
                          placeholder="Password baru (min. 4 karakter)"
                          className="w-full bg-[#111] border border-white/15 focus:border-emerald-500/60 rounded-xl px-4 py-2.5 text-xs text-white font-mono-tech focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[11px] font-mono-tech uppercase text-neutral-400">
                          Konfirmasi Password Baru
                        </label>
                        <input
                          type="password"
                          value={securityForm.confirmPass}
                          onChange={(e) => setSecurityForm({ ...securityForm, confirmPass: e.target.value })}
                          placeholder="Ulangi password baru"
                          className="w-full bg-[#111] border border-white/15 focus:border-emerald-500/60 rounded-xl px-4 py-2.5 text-xs text-white font-mono-tech focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleUpdateSecurity}
                      className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono-tech font-bold text-xs uppercase flex items-center gap-2 border border-white/15 transition-colors"
                    >
                      <KeyRound className="w-4 h-4 text-emerald-400" />
                      <span>PERBARUI KREDENSIAL KEAMANAN</span>
                    </button>
                  </div>
                </form>
              )}
            </main>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
