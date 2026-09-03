import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { ImageDropzone } from './ImageDropzone';
import { ProjectData } from '../types';
import { 
  Camera, 
  Palette, 
  Upload, 
  Check, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Plus, 
  Eye, 
  Layers, 
  FolderPlus,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface SimpleUploadManagerProps {
  onSuccess?: (msg: string) => void;
}

const DESIGN_CATEGORIES = [
  'GRAPHIC DESIGN',
  'BRANDING & LOGO',
  'SOCIAL MEDIA',
  'UI/UX',
  'POSTER & BANNER',
  'WEB',
  'OTHER'
];

const COMMON_TOOLS = [
  'Photoshop',
  'Illustrator',
  'Figma',
  'CorelDraw',
  'Canva',
  'InDesign',
  'Blender 3D',
  'After Effects'
];

export const SimpleUploadManager: React.FC<SimpleUploadManagerProps> = ({ onSuccess }) => {
  const { 
    profile, 
    updateProfile, 
    projects, 
    addProject, 
    updateProject, 
    deleteProject 
  } = usePortfolio();

  const [activeSection, setActiveSection] = useState<'photo' | 'design'>('photo');
  const [designSubView, setDesignSubView] = useState<'create' | 'list'>('create');
  
  // Local state for photo editing
  const [avatarPreview, setAvatarPreview] = useState<string>(profile.avatarUrl || '');
  const [studioPhotoPreview, setStudioPhotoPreview] = useState<string>(
    profile.fullBio ? profile.avatarUrl || '' : ''
  );
  const [photoSavedToast, setPhotoSavedToast] = useState(false);

  // Local state for design form
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [designTitle, setDesignTitle] = useState('');
  const [designCategory, setDesignCategory] = useState('GRAPHIC DESIGN');
  const [designTagline, setDesignTagline] = useState('');
  const [designDescription, setDesignDescription] = useState('');
  const [designClient, setDesignClient] = useState('');
  const [designYear, setDesignYear] = useState('2026');
  const [designCoverImage, setDesignCoverImage] = useState('');
  const [designGallery, setDesignGallery] = useState<string[]>([]);
  const [designTools, setDesignTools] = useState<string[]>(['Photoshop', 'Illustrator']);
  const [customToolInput, setCustomToolInput] = useState('');
  const [designProjectUrl, setDesignProjectUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isPublished, setIsPublished] = useState(true);
  const [designSavedToast, setDesignSavedToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Handle saving profile photo
  const handleSaveAvatar = () => {
    if (!avatarPreview) {
      setErrorMsg('Pilih foto terlebih dahulu sebelum menyimpan.');
      return;
    }
    updateProfile({ avatarUrl: avatarPreview });
    setPhotoSavedToast(true);
    setErrorMsg(null);
    if (onSuccess) onSuccess('Foto profil berhasil diperbarui!');
    setTimeout(() => setPhotoSavedToast(false), 3500);
  };

  // Reset to default sample avatar
  const handleResetAvatar = () => {
    const defaultUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop';
    setAvatarPreview(defaultUrl);
    updateProfile({ avatarUrl: defaultUrl });
    if (onSuccess) onSuccess('Foto profil dikembalikan ke foto bawaan.');
  };

  // Toggle tool selection
  const toggleTool = (tool: string) => {
    if (designTools.includes(tool)) {
      setDesignTools(designTools.filter(t => t !== tool));
    } else {
      setDesignTools([...designTools, tool]);
    }
  };

  // Add custom tool tag
  const addCustomTool = () => {
    const trimmed = customToolInput.trim();
    if (trimmed && !designTools.includes(trimmed)) {
      setDesignTools([...designTools, trimmed]);
      setCustomToolInput('');
    }
  };

  // Add gallery image
  const handleAddGalleryImage = (dataUrl: string) => {
    setDesignGallery(prev => [...prev, dataUrl]);
  };

  // Remove gallery image
  const handleRemoveGalleryImage = (index: number) => {
    setDesignGallery(prev => prev.filter((_, i) => i !== index));
  };

  // Reset design form
  const resetDesignForm = () => {
    setEditingProjectId(null);
    setDesignTitle('');
    setDesignCategory('GRAPHIC DESIGN');
    setDesignTagline('');
    setDesignDescription('');
    setDesignClient('');
    setDesignYear('2026');
    setDesignCoverImage('');
    setDesignGallery([]);
    setDesignTools(['Photoshop', 'Illustrator']);
    setDesignProjectUrl('');
    setIsFeatured(true);
    setIsPublished(true);
    setErrorMsg(null);
  };

  // Prepare edit
  const handleStartEdit = (proj: ProjectData) => {
    setEditingProjectId(proj.id);
    setDesignTitle(proj.title);
    setDesignCategory(proj.category || 'GRAPHIC DESIGN');
    setDesignTagline(proj.tagline || '');
    setDesignDescription(proj.description || '');
    setDesignClient(proj.client || '');
    setDesignYear(proj.year || '2026');
    setDesignCoverImage(proj.coverImage || '');
    setDesignGallery(proj.gallery || []);
    setDesignTools(proj.tools || ['Photoshop', 'Illustrator']);
    setDesignProjectUrl(proj.projectUrl || '');
    setIsFeatured(Boolean(proj.featured));
    setIsPublished(proj.published !== false);
    setDesignSubView('create');
  };

  // Submit design project
  const handleSaveDesign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!designTitle.trim()) {
      setErrorMsg('Judul karya design harus diisi.');
      return;
    }
    if (!designCoverImage) {
      setErrorMsg('Harap upload gambar cover atau hasil design Anda.');
      return;
    }

    const slug = designTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const projectPayload = {
      title: designTitle.trim(),
      slug: slug || `design-${Date.now()}`,
      category: designCategory as any,
      tagline: designTagline.trim() || 'Visual design project and creative exploration',
      description: designDescription.trim() || 'Karya desain grafis & digital experience yang dirancang dengan presisi estetika dan kebutuhan brand.',
      challenge: 'Membuat visual yang memikat audiens dengan hierarki tipografi dan komposisi harmonis.',
      solution: 'Menerapkan konsep modern, eksplorasi warna kontras, serta proporsi grid visual terstruktur.',
      result: 'Visual menarik yang memperkuat identitas brand dan meningkatkan engagement secara signifikan.',
      coverImage: designCoverImage,
      gallery: designGallery.length > 0 ? designGallery : [designCoverImage],
      tools: designTools.length > 0 ? designTools : ['Photoshop', 'Illustrator'],
      client: designClient.trim() || 'Client Project',
      year: designYear.trim() || '2026',
      projectUrl: designProjectUrl.trim(),
      featured: isFeatured,
      published: isPublished,
      order: editingProjectId ? (projects.find(p => p.id === editingProjectId)?.order || 1) : 1,
      layoutType: 'left' as const,
    };

    if (editingProjectId) {
      updateProject(editingProjectId, projectPayload);
      if (onSuccess) onSuccess(`Karya "${designTitle}" berhasil diperbarui!`);
    } else {
      addProject(projectPayload);
      if (onSuccess) onSuccess(`Karya "${designTitle}" berhasil ditambahkan ke portfolio!`);
    }

    setDesignSavedToast(true);
    setTimeout(() => setDesignSavedToast(false), 3500);
    resetDesignForm();
    setDesignSubView('list');
  };

  return (
    <div className="space-y-6">
      {/* Top Segmented Tabs: Foto Saya vs Hasil Design */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 rounded-2xl bg-neutral-900/80 border border-white/10">
        <div className="grid grid-cols-2 gap-2 flex-1 max-w-md">
          <button
            type="button"
            onClick={() => {
              setActiveSection('photo');
              setErrorMsg(null);
            }}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-mono-tech text-xs uppercase tracking-wider transition-all ${
              activeSection === 'photo'
                ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>1. Upload Foto Saya</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveSection('design');
              setErrorMsg(null);
            }}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-mono-tech text-xs uppercase tracking-wider transition-all ${
              activeSection === 'design'
                ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>2. Upload Hasil Design</span>
          </button>
        </div>

        <div className="text-[11px] font-mono-tech text-neutral-400 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Auto-Kompresi Aktif (Bebas Lag & Quota Aman)</span>
        </div>
      </div>

      {/* Global Error Banner if any */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-mono-tech flex items-center gap-2">
          <span>⚠️ {errorMsg}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 1: UPLOAD FOTO SAYA                              */}
      {/* ======================================================== */}
      {activeSection === 'photo' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <span>Foto Profil Utama (Avatar)</span>
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    HERO • NAVBAR • CV • KONTAK
                  </span>
                </h3>
                <p className="text-xs text-neutral-400 font-mono-tech mt-1">
                  Upload foto terbaik Anda dari laptop atau HP. Foto akan langsung tampil di seluruh website dan CV PDF.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetAvatar}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-mono-tech flex items-center gap-1.5 transition-colors"
                  title="Kembalikan foto contoh bawaan"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Foto Bawaan</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Uploader Box */}
              <div className="md:col-span-7 space-y-4">
                <ImageDropzone
                  label="Pilih atau Seret Foto Anda ke Sini"
                  sublabel="Mendukung JPG, PNG, WEBP • Otomatis diperkecil tanpa merusak ketajaman"
                  currentImage={avatarPreview}
                  onImageUploaded={(dataUrl) => {
                    setAvatarPreview(dataUrl);
                    setErrorMsg(null);
                  }}
                  onImageRemoved={() => setAvatarPreview('')}
                  aspectRatio="square"
                  maxWidth={1000}
                  maxHeight={1000}
                  quality={0.88}
                />

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSaveAvatar}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono-tech font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    {photoSavedToast ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>FOTO BERHASIL DISIMPAN!</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>SIMPAN FOTO PROFIL</span>
                      </>
                    )}
                  </button>

                  <span className="text-xs font-mono-tech text-neutral-500">
                    Otomatis disimpan di penyimpanan lokal browser.
                  </span>
                </div>
              </div>

              {/* Live Card Preview */}
              <div className="md:col-span-5 p-5 rounded-xl border border-white/10 bg-black/40 space-y-4">
                <div className="text-[11px] font-mono-tech text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pratinjau Tampilan di Portfolio</span>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-neutral-900/60">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-400/50 bg-neutral-950 shrink-0 shadow-md">
                    <img
                      src={avatarPreview || profile.avatarUrl}
                      alt="Preview Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-heading font-bold text-white">{profile.name}</div>
                    <div className="text-xs font-mono-tech text-emerald-400">{profile.title}</div>
                    <div className="text-[11px] text-neutral-500 font-mono-tech">
                      {profile.brand || 'MIR'} • {profile.location}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 font-mono-tech leading-relaxed">
                  💡 <strong>Tips Foto Bagus:</strong> Gunakan foto berorientasi portrait atau persegi dengan pencahayaan jelas, latar belakang netral atau studio, agar selaras dengan estetika tema Sophisticated Dark portfolio.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* SECTION 2: UPLOAD HASIL DESIGN SAYA                      */}
      {/* ======================================================== */}
      {activeSection === 'design' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Sub-view switcher: Form Upload vs Daftar Karya */}
          <div className="flex items-center justify-between gap-4 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setDesignSubView('create');
                  if (!editingProjectId) resetDesignForm();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono-tech tracking-wider uppercase flex items-center gap-2 transition-all ${
                  designSubView === 'create'
                    ? 'bg-emerald-500 text-black font-bold'
                    : 'text-neutral-400 hover:text-white bg-white/5'
                }`}
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>{editingProjectId ? 'Edit Karya Ini' : '+ Tambah Design Baru'}</span>
              </button>

              <button
                type="button"
                onClick={() => setDesignSubView('list')}
                className={`px-4 py-2 rounded-xl text-xs font-mono-tech tracking-wider uppercase flex items-center gap-2 transition-all ${
                  designSubView === 'list'
                    ? 'bg-emerald-500 text-black font-bold'
                    : 'text-neutral-400 hover:text-white bg-white/5'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Daftar Design Saya ({projects.length})</span>
              </button>
            </div>

            {designSubView === 'create' && editingProjectId && (
              <button
                type="button"
                onClick={resetDesignForm}
                className="text-xs font-mono-tech text-neutral-400 hover:text-white underline"
              >
                Batal Edit / Buat Baru
              </button>
            )}
          </div>

          {/* SUB-VIEW 1: FORM UPLOAD DESIGN BARU / EDIT */}
          {designSubView === 'create' && (
            <form onSubmit={handleSaveDesign} className="space-y-6">
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 className="text-base font-heading font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>{editingProjectId ? 'Edit Informasi Karya Desain' : 'Upload Karya Desain Baru'}</span>
                  </h4>
                  <span className="text-xs font-mono-tech text-neutral-500">
                    Semua gambar dikompresi otomatis agar portfolio tetap super cepat
                  </span>
                </div>

                {/* 1. Judul & Kategori */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-mono-tech text-neutral-300 font-semibold uppercase tracking-wider">
                      Judul Karya Desain *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Brand Identity & Packaging Kopi Senja"
                      value={designTitle}
                      onChange={(e) => setDesignTitle(e.target.value)}
                      className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-400 font-mono-tech"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tech text-neutral-300 font-semibold uppercase tracking-wider">
                      Kategori Desain *
                    </label>
                    <select
                      value={designCategory}
                      onChange={(e) => setDesignCategory(e.target.value)}
                      className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono-tech"
                    >
                      {DESIGN_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. Upload Gambar Utama (Cover Design) */}
                <div className="space-y-3 pt-2">
                  <ImageDropzone
                    label="Upload Gambar Utama / Mockup Cover *"
                    sublabel="Ini adalah foto/desain yang paling pertama dilihat pengunjung di galeri karya."
                    currentImage={designCoverImage}
                    onImageUploaded={(dataUrl) => {
                      setDesignCoverImage(dataUrl);
                      setErrorMsg(null);
                    }}
                    onImageRemoved={() => setDesignCoverImage('')}
                    aspectRatio="video"
                    maxWidth={1400}
                    maxHeight={1400}
                    quality={0.86}
                  />
                </div>

                {/* 3. Upload Galeri Hasil Desain Lainnya (Multiple Images) */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-mono-tech text-neutral-300 font-semibold uppercase tracking-wider">
                        Galeri Slide / Mockup Tambahan (Opsional)
                      </label>
                      <p className="text-[11px] font-mono-tech text-neutral-500">
                        Upload slide hasil desain lain untuk karya ini (misal: halaman poster, variasi warna, detail logo).
                      </p>
                    </div>
                    <span className="text-xs font-mono-tech text-emerald-400">
                      {designGallery.length} Gambar Tambahan
                    </span>
                  </div>

                  {/* Multiple Gallery Thumbnails */}
                  {designGallery.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {designGallery.map((imgUrl, idx) => (
                        <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-white/15 bg-neutral-950 group">
                          <img
                            src={imgUrl}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-600/80 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Hapus gambar ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add additional image to gallery */}
                  <div className="max-w-md">
                    <ImageDropzone
                      label="+ Tambah Foto/Desain Tambahan ke Galeri"
                      sublabel="Pilih foto slide/mockup tambahan"
                      onImageUploaded={handleAddGalleryImage}
                      aspectRatio="auto"
                      maxWidth={1200}
                      maxHeight={1200}
                      quality={0.84}
                    />
                  </div>
                </div>

                {/* 4. Detail Singkat, Klien & Tahun */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-white/10">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tech text-neutral-300 font-semibold uppercase tracking-wider">
                      Nama Klien / Personal Project
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Kopi Senja / Personal Project"
                      value={designClient}
                      onChange={(e) => setDesignClient(e.target.value)}
                      className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 font-mono-tech"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tech text-neutral-300 font-semibold uppercase tracking-wider">
                      Tahun Pembuatan
                    </label>
                    <input
                      type="text"
                      placeholder="2026"
                      value={designYear}
                      onChange={(e) => setDesignYear(e.target.value)}
                      className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-mono-tech"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tech text-neutral-300 font-semibold uppercase tracking-wider">
                      Link Proyek / Behance (Opsional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://behance.net/..."
                      value={designProjectUrl}
                      onChange={(e) => setDesignProjectUrl(e.target.value)}
                      className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 font-mono-tech"
                    />
                  </div>
                </div>

                {/* 5. Software / Tools yang Digunakan */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <label className="text-xs font-mono-tech text-neutral-300 font-semibold uppercase tracking-wider">
                    Software / Tools yang Digunakan
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_TOOLS.map((tool) => {
                      const isSelected = designTools.includes(tool);
                      return (
                        <button
                          key={tool}
                          type="button"
                          onClick={() => toggleTool(tool)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech transition-all ${
                            isSelected
                              ? 'bg-emerald-500 text-black font-bold'
                              : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          {isSelected ? `✓ ${tool}` : `+ ${tool}`}
                        </button>
                      );
                    })}
                  </div>

                  {/* Input custom tool */}
                  <div className="flex items-center gap-2 max-w-sm mt-2">
                    <input
                      type="text"
                      placeholder="Tambah software lain..."
                      value={customToolInput}
                      onChange={(e) => setCustomToolInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addCustomTool();
                        }
                      }}
                      className="bg-[#111] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-neutral-600 font-mono-tech flex-1"
                    />
                    <button
                      type="button"
                      onClick={addCustomTool}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-mono-tech"
                    >
                      Tambah
                    </button>
                  </div>
                </div>

                {/* 6. Deskripsi Karya */}
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <label className="text-xs font-mono-tech text-neutral-300 font-semibold uppercase tracking-wider">
                    Cerita / Deskripsi Singkat Desain
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ceritakan tentang konsep, tujuan desain, atau pesan visual yang ingin disampaikan..."
                    value={designDescription}
                    onChange={(e) => setDesignDescription(e.target.value)}
                    className="w-full bg-[#111] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-400 font-mono-tech"
                  />
                </div>

                {/* 7. Status Tampilan */}
                <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-white/10">
                  <label className="flex items-center gap-2 text-xs font-mono-tech text-white cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-neutral-900 border-white/20"
                    />
                    <span>Tampilkan di Portfolio (Published)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-mono-tech text-white cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-neutral-900 border-white/20"
                    />
                    <span>Karya Unggulan (Featured Project)</span>
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono-tech font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/25"
                  >
                    {designSavedToast ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>KARYA BERHASIL DISIMPAN!</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>{editingProjectId ? 'SIMPAN PERUBAHAN DESAIN' : 'SIMPAN & PUBLIKASIKAN KARYA'}</span>
                      </>
                    )}
                  </button>

                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={resetDesignForm}
                      className="px-4 py-2 rounded-xl text-xs font-mono-tech text-neutral-400 hover:text-white"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}

          {/* SUB-VIEW 2: DAFTAR KARYA DESAIN */}
          {designSubView === 'list' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-mono-tech font-bold text-white uppercase tracking-wider">
                  SEMUA KARYA DESAIN ({projects.length})
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    resetDesignForm();
                    setDesignSubView('create');
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-black font-mono-tech font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-emerald-400 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>TAMBAH KARYA BARU</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl border border-white/10 bg-neutral-900/50 flex gap-4 items-start group hover:border-emerald-500/40 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/10 bg-black shrink-0">
                      <img
                        src={proj.coverImage}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                          {proj.category}
                        </span>
                        {proj.featured && (
                          <span className="text-[9px] font-mono-tech text-amber-400">
                            ★ Featured
                          </span>
                        )}
                      </div>

                      <h5 className="text-sm font-heading font-bold text-white truncate">
                        {proj.title}
                      </h5>

                      <p className="text-xs text-neutral-400 font-mono-tech truncate">
                        {proj.client || 'Client Project'} • {proj.year}
                      </p>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(proj)}
                          className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 text-[11px] font-mono-tech flex items-center gap-1 transition-colors"
                        >
                          <Edit3 className="w-3 h-3 text-emerald-400" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Hapus karya "${proj.title}" dari portfolio?`)) {
                              deleteProject(proj.id);
                              if (onSuccess) onSuccess(`Karya "${proj.title}" telah dihapus.`);
                            }
                          }}
                          className="px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[11px] font-mono-tech flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
