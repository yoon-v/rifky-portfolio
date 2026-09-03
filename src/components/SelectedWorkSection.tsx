import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectData } from '../types';
import { ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';
import { LazyImage } from './LazyImage';

export const SelectedWorkSection: React.FC = () => {
  const { projects, setActiveProject, setCursorState } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filterCategories = ['ALL', 'GRAPHIC DESIGN', 'WEB', 'UI/UX', 'SOCIAL MEDIA'];

  const filteredProjects = projects.filter((p) => {
    if (!p.published) return false;
    if (activeFilter === 'ALL') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="work" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#050505] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono-tech text-emerald-400 uppercase tracking-widest mb-3">
              <span className="w-6 h-[1px] bg-emerald-400" />
              <span>03 — SELECTED WORK</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white font-heading">
              SELECTED<br />WORKS
            </h2>
          </div>

          {/* Animated Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white/[0.02] p-1.5 rounded-full border border-white/[0.08] backdrop-blur-sm">
            {filterCategories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  onMouseEnter={() => setCursorState('button')}
                  onMouseLeave={() => setCursorState('default')}
                  className={`relative px-4 py-2 rounded-full text-xs font-mono-tech tracking-wider uppercase transition-all duration-300 ${
                    isActive ? 'text-black font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeWorkFilter"
                      className="absolute inset-0 bg-emerald-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Editorial Project List */}
        <motion.div layout className="space-y-24 md:space-y-36">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const itemNum = index < 9 ? `0${index + 1}` : `${index + 1}`;
              const isEven = index % 2 === 1;
              const isWide = project.layoutType === 'wide' || index === 2;

              if (isWide) {
                // Wide Editorial Feature Layout
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    onClick={() => setActiveProject(project)}
                    onMouseEnter={() => setCursorState('view', 'CASE STUDY')}
                    onMouseLeave={() => setCursorState('default')}
                    className="group cursor-pointer space-y-6"
                  >
                    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl">
                      <LazyImage
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                        wrapperClassName="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

                      {/* Floating Info Overlay */}
                      <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono-tech tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-emerald-400">
                            {project.category} / {project.year}
                          </span>
                          <div className="w-12 h-12 rounded-full bg-emerald-400 text-black flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shadow-lg shadow-emerald-500/30">
                            <ArrowUpRight className="w-6 h-6" />
                          </div>
                        </div>

                        <div className="space-y-2 max-w-2xl">
                          <span className="text-xs font-mono-tech tracking-widest text-emerald-400 uppercase">
                            FEATURED CASE STUDY
                          </span>
                          <h3 className="text-2xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm sm:text-base text-neutral-300 line-clamp-2 font-light">
                            {project.tagline || project.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              // Asymmetrical Alternating Layout (Image Left / Text Right OR Image Right / Text Left)
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  onClick={() => setActiveProject(project)}
                  onMouseEnter={() => setCursorState('view', 'OPEN')}
                  onMouseLeave={() => setCursorState('default')}
                  className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-center"
                >
                  {/* Image Block */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl">
                      <LazyImage
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                        wrapperClassName="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                      
                      {/* Year badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono-tech bg-black/70 backdrop-blur-md border border-white/10 text-neutral-300">
                        {project.year}
                      </div>
                    </div>
                  </div>

                  {/* Text Block */}
                  <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    {/* Number & Category */}
                    <div className="flex items-center gap-4 text-xs font-mono-tech">
                      <span className="text-emerald-400 font-bold tracking-widest">{itemNum}</span>
                      <span className="text-neutral-600">/</span>
                      <span className="text-neutral-400 tracking-wider uppercase">{project.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-4xl font-heading font-extrabold text-white group-hover:text-emerald-400 group-hover:translate-x-2 transition-all duration-300 leading-tight">
                      {project.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                      {project.tagline || project.description}
                    </p>

                    {/* Tools badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tools.slice(0, 4).map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono-tech border border-white/10 text-neutral-400 bg-white/[0.02]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Action Button Link */}
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-widest text-emerald-400 group-hover:text-white transition-colors">
                        <span>VIEW PROJECT</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
