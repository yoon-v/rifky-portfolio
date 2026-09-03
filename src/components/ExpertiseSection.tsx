import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUpRight } from 'lucide-react';

export const ExpertiseSection: React.FC = () => {
  const { skills, setCursorState } = usePortfolio();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setPreviewPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      id="expertise" 
      onMouseMove={handleMouseMove}
      className="relative py-28 md:py-36 px-6 md:px-12 bg-[#050505] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono-tech text-emerald-400 uppercase tracking-widest mb-3">
              <span className="w-6 h-[1px] bg-emerald-400" />
              <span>02 — EXPERTISE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white font-heading">
              WHAT I DO
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-neutral-400 font-light">
            A comprehensive spectrum of creative design, interactive front-end development, and IT infrastructure capabilities.
          </p>
        </div>

        {/* Interactive List */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {skills.map((skill, index) => {
            const isHovered = hoveredIndex === index;
            const itemNumber = index < 9 ? `0${index + 1}` : `${index + 1}`;

            return (
              <motion.div
                key={skill.id || skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  setCursorState('view', 'EXPLORE');
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setCursorState('default');
                }}
                className="group relative py-8 md:py-12 transition-colors duration-300 cursor-pointer"
              >
                {/* Background Hover Highlight */}
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="absolute inset-0 bg-white/[0.02] -mx-6 md:-mx-12 px-6 md:px-12 pointer-events-none"
                />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                  {/* Left: Number & Title */}
                  <div className="flex items-center gap-6 md:gap-12">
                    <span className="text-sm md:text-base font-mono-tech text-neutral-500 group-hover:text-emerald-400 transition-colors duration-300">
                      {itemNumber}
                    </span>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-neutral-300 group-hover:text-white group-hover:translate-x-3 transition-all duration-300">
                      {skill.name}
                    </h3>
                  </div>

                  {/* Right: Category & Description */}
                  <div className="flex items-center justify-between md:justify-end gap-6 md:gap-12 pl-12 md:pl-0">
                    <div className="hidden sm:block text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-mono-tech tracking-wider border border-white/10 text-neutral-400 group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-colors">
                        {skill.category || 'Specialty'}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-black group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:rotate-45 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Subtext description visible when active/hovered or on mobile */}
                <motion.p
                  animate={{ opacity: isHovered ? 1 : 0.6, y: isHovered ? 0 : -2 }}
                  className="mt-3 pl-12 md:pl-20 text-xs sm:text-sm text-neutral-400 max-w-2xl font-light"
                >
                  {skill.description}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Image Preview on Desktop Hover */}
      <AnimatePresence>
        {hoveredIndex !== null && skills[hoveredIndex]?.previewImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: previewPos.x + 20,
              y: previewPos.y - 120
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed top-0 left-0 z-40 pointer-events-none hidden lg:block w-72 h-48 rounded-xl overflow-hidden border border-emerald-500/40 shadow-2xl shadow-emerald-950/40 bg-black"
          >
            <img
              src={skills[hoveredIndex].previewImage}
              alt={skills[hoveredIndex].name}
              className="w-full h-full object-cover grayscale contrast-125"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 text-[10px] font-mono-tech tracking-wider text-emerald-400 font-bold uppercase">
              {skills[hoveredIndex].level} LEVEL
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
