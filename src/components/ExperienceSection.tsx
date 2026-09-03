import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { experiences, setCursorState } = usePortfolio();

  const sortedExperiences = [...experiences].sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#050505] overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 text-xs font-mono-tech text-emerald-400 uppercase tracking-widest mb-3">
            <span className="w-6 h-[1px] bg-emerald-400" />
            <span>04 — EXPERIENCE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white font-heading">
            MY JOURNEY
          </h2>
          <p className="mt-4 max-w-xl text-neutral-400 text-sm sm:text-base font-light">
            A track record of high-impact visual design, digital media leadership, and full-spectrum IT systems operation.
          </p>
        </div>

        {/* Minimal Timeline */}
        <div className="relative pl-6 md:pl-10 border-l border-white/[0.08] space-y-16">
          {sortedExperiences.map((exp, index) => {
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                onMouseEnter={() => setCursorState('view', 'ROLE')}
                onMouseLeave={() => setCursorState('default')}
                className="relative group"
              >
                {/* Glowing Timeline Marker */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#050505] border-2 border-neutral-600 group-hover:border-emerald-400 group-hover:bg-emerald-400 group-hover:shadow-[0_0_12px_#10b981] transition-all duration-300" />

                <div className="space-y-4">
                  {/* Date & Location */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tech text-emerald-400">
                    <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 font-bold">
                      {exp.startDate} — {exp.endDate}
                    </span>
                    {exp.location && (
                      <span className="text-neutral-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {/* Position & Company */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                      {exp.position}
                    </h3>
                    <h4 className="text-base sm:text-lg text-neutral-300 font-medium mt-1">
                      {exp.company}
                    </h4>
                  </div>

                  {/* Bullet Responsibilities */}
                  {exp.description && exp.description.length > 0 && (
                    <ul className="space-y-2 pt-2 text-sm text-neutral-400 font-light max-w-3xl">
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 mt-2 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack badges */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono-tech bg-white/[0.02] border border-white/[0.06] text-neutral-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
