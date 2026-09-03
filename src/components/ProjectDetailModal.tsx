import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, ExternalLink, ArrowLeft, ArrowRight, Maximize2, Sparkles, CheckCircle2, ShieldAlert, Layers } from 'lucide-react';
import { LazyImage } from './LazyImage';

export const ProjectDetailModal: React.FC = () => {
  const { activeProject, setActiveProject, setCursorState } = usePortfolio();
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreenImage) {
          setIsFullscreenImage(false);
        } else {
          setActiveProject(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenImage, setActiveProject]);

  if (!activeProject) return null;

  const galleryImages = activeProject.gallery && activeProject.gallery.length > 0 
    ? activeProject.gallery 
    : [activeProject.coverImage];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] overflow-y-auto bg-black/90 backdrop-blur-2xl flex items-start justify-center p-4 sm:p-6 md:p-12 select-none">
        {/* Backdrop Close */}
        <div 
          className="fixed inset-0"
          onClick={() => setActiveProject(null)}
        />

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#090909] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 my-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#070707]">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono-tech uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {activeProject.category}
              </span>
              <span className="text-xs font-mono-tech text-neutral-400">
                YEAR: {activeProject.year}
              </span>
            </div>

            <button
              onClick={() => setActiveProject(null)}
              onMouseEnter={() => setCursorState('button')}
              onMouseLeave={() => setCursorState('default')}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              aria-label="Close Project Detail"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 md:p-10 space-y-10">
            {/* Header & Meta */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                {activeProject.title}
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                {activeProject.tagline || activeProject.description}
              </p>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-mono-tech text-neutral-500 uppercase tracking-widest block">
                    CLIENT
                  </span>
                  <span className="text-sm font-medium text-neutral-200">
                    {activeProject.client || 'Confidential'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono-tech text-neutral-500 uppercase tracking-widest block">
                    ROLE / SERVICE
                  </span>
                  <span className="text-sm font-medium text-neutral-200">
                    {activeProject.category}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono-tech text-neutral-500 uppercase tracking-widest block">
                    TIMELINE
                  </span>
                  <span className="text-sm font-medium text-neutral-200">
                    {activeProject.year}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono-tech text-neutral-500 uppercase tracking-widest block">
                    STATUS
                  </span>
                  <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Completed
                  </span>
                </div>
              </div>
            </div>

            {/* Gallery Carousel Showcase */}
            <div className="space-y-4">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10 bg-black group">
                <LazyImage
                  src={galleryImages[activeGalleryIndex]}
                  alt={`${activeProject.title} preview ${activeGalleryIndex + 1}`}
                  className="w-full h-full object-cover"
                  wrapperClassName="w-full h-full"
                />
                
                {/* Fullscreen view trigger */}
                <button
                  onClick={() => setIsFullscreenImage(true)}
                  className="absolute top-4 right-4 p-2.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80 transition-colors z-10"
                  title="Expand Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Left/Right Controls */}
                {galleryImages.length > 1 && (
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveGalleryIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
                      }}
                      className="p-2.5 rounded-full bg-black/70 hover:bg-black border border-white/20 text-white pointer-events-auto transition-colors"
                      aria-label="Previous image"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveGalleryIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
                      }}
                      className="p-2.5 rounded-full bg-black/70 hover:bg-black border border-white/20 text-white pointer-events-auto transition-colors"
                      aria-label="Next image"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        activeGalleryIndex === idx ? 'border-emerald-400 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <LazyImage
                        src={img}
                        alt={`thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        wrapperClassName="w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Deep Case Study Sections: Challenge, Solution, Result */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {/* Challenge */}
              <div className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech tracking-wider text-amber-400 uppercase font-semibold">
                  <ShieldAlert className="w-4 h-4" />
                  THE CHALLENGE
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {activeProject.challenge || "Balancing stringent brand precision with high technical performance across distributed touchpoints."}
                </p>
              </div>

              {/* Solution */}
              <div className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech tracking-wider text-emerald-400 uppercase font-semibold">
                  <Sparkles className="w-4 h-4" />
                  THE SOLUTION
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {activeProject.solution || "Custom-designed design systems, streamlined typography tokens, and GPU-optimized user interfaces."}
                </p>
              </div>

              {/* Result */}
              <div className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech tracking-wider text-teal-300 uppercase font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  THE RESULT
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {activeProject.result || "Achieved 100% stakeholder satisfaction and substantial user retention increases."}
                </p>
              </div>
            </div>

            {/* Tools & Tech Stack Badges */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono-tech text-neutral-400 uppercase tracking-widest block">
                TECHNOLOGIES & TOOLS USED
              </span>
              <div className="flex flex-wrap gap-2">
                {activeProject.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono-tech bg-white/[0.03] border border-white/10 text-neutral-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Live External URL Link */}
            {activeProject.projectUrl && (
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono-tech text-neutral-500">
                  VERIFIED DEPLOYMENT / ASSET
                </span>
                <a
                  href={activeProject.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-mono-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                >
                  <span>LAUNCH LIVE URL</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </motion.div>

        {/* Fullscreen Image Lightbox Modal */}
        <AnimatePresence>
          {isFullscreenImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFullscreenImage(false)}
              className="fixed inset-0 z-[2000] bg-black/98 flex items-center justify-center p-4 cursor-zoom-out"
            >
              <img
                src={galleryImages[activeGalleryIndex]}
                alt="Fullscreen Preview"
                loading="lazy"
                decoding="async"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setIsFullscreenImage(false)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};
