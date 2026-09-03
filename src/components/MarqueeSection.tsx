import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const MarqueeSection: React.FC = () => {
  const { setCursorState } = usePortfolio();

  const items = [
    'GRAPHIC DESIGNER',
    'WEB DEVELOPER',
    'UI/UX DESIGNER',
    'IT SPECIALIST',
    'SOCIAL MEDIA',
    'CREATIVE TECHNOLOGIST',
    'BRAND STRATEGIST',
    'FRONTEND ENGINEER'
  ];

  return (
    <div 
      className="relative w-full overflow-hidden border-y border-white/[0.08] bg-[#070707] py-6 select-none"
      onMouseEnter={() => setCursorState('default')}
    >
      {/* Subtle fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
        {/* Double repeated set for infinite loop */}
        {[...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-12 group cursor-default">
            <span className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-neutral-400 group-hover:text-white transition-colors duration-300">
              {text}
            </span>
            <span className="text-emerald-400 text-lg sm:text-xl font-mono select-none group-hover:scale-125 transition-transform duration-300">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
