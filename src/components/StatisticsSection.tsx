import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export const StatisticsSection: React.FC = () => {
  const { stats, setCursorState } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const statItems = [
    { label: 'COMPLETED PROJECTS', value: stats.projectsCount || '50+', subtext: 'Commercial & Non-profit' },
    { label: 'VISUAL DESIGNS', value: stats.designsCount || '30+', subtext: 'Branding & Social Packs' },
    { label: 'WEB SOLUTIONS', value: stats.webProjectsCount || '10+', subtext: 'React & Frontend Apps' },
    { label: 'YEARS EXPERIENCE', value: stats.experienceYears || '5+', subtext: 'Continuous Craft' },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative py-20 px-6 md:px-12 bg-[#080808] border-y border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              onMouseEnter={() => setCursorState('link')}
              onMouseLeave={() => setCursorState('default')}
              className="flex flex-col space-y-2 group"
            >
              {/* Big Number */}
              <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-heading group-hover:text-emerald-400 transition-colors duration-300">
                {item.value}
              </div>

              {/* Title */}
              <div className="text-xs sm:text-sm font-mono-tech tracking-wider text-neutral-300 font-semibold uppercase">
                {item.label}
              </div>

              {/* Subtitle */}
              <div className="text-xs text-neutral-500 font-light">
                {item.subtext}
              </div>

              {/* Accent bottom hairline */}
              <div className="w-10 h-[2px] bg-neutral-800 group-hover:w-full group-hover:bg-emerald-400 transition-all duration-500 rounded-full mt-2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
