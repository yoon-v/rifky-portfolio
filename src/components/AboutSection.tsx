import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Check, Sparkles, Terminal, Layers } from 'lucide-react';
import { LazyImage } from './LazyImage';

export const AboutSection: React.FC = () => {
  const { profile, setCursorState } = usePortfolio();

  const corePillars = [
    {
      icon: Layers,
      title: "Visual Identity & Graphic Design",
      desc: "Architecting iconic brand languages, typographic precision, and high-conversion social assets that stand out in crowded digital landscapes."
    },
    {
      icon: Terminal,
      title: "Modern Front-End Engineering",
      desc: "Transforming design blueprints into blazing-fast, accessible, and cinematic web applications with React, TypeScript, and clean code principles."
    },
    {
      icon: Sparkles,
      title: "IT Support & System Reliability",
      desc: "Deploying resilient technical infrastructure, network troubleshooting, and automated digital workflows for sustained business efficiency."
    }
  ];

  return (
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#050505] overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header Label */}
        <div className="flex items-center gap-3 text-xs font-mono-tech text-emerald-400 uppercase tracking-widest mb-10">
          <span className="w-6 h-[1px] bg-emerald-400" />
          <span>01 — ABOUT</span>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
          {/* Left Column: Big Typographic Statement */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-1">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white font-heading leading-tight"
              >
                I DESIGN.<br />
                <span className="text-emerald-400">I BUILD.</span><br />
                I CREATE.
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-5 text-neutral-300 text-base sm:text-lg leading-relaxed font-light"
            >
              <p>
                Hello, I am <strong className="text-white font-medium">{profile.name}</strong>, a multidisciplinary{' '}
                <span className="text-emerald-400 font-medium">Graphic Designer & IT Specialist</span> dedicated to bridging the gap between evocative visual design and robust modern digital engineering.
              </p>
              <p className="text-neutral-400 text-base">
                {profile.fullBio}
              </p>
            </motion.div>

            {/* Core Pillars List */}
            <div className="space-y-4 pt-4">
              {corePillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-emerald-500/30 transition-colors duration-300 flex items-start gap-4"
                  >
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white font-heading">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Collage & Highlights */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onMouseEnter={() => setCursorState('view', 'STUDIO')}
              onMouseLeave={() => setCursorState('default')}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 group"
            >
              <LazyImage
                src={profile.secondaryImageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"}
                alt="Muhammad Irdiansyah Rifky creative studio"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                wrapperClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono-tech">
                <span className="text-neutral-300">CREATIVE WORKSPACE / 2026</span>
                <span className="text-emerald-400 font-semibold tracking-wider">PIXEL & CODE</span>
              </div>
            </motion.div>

            {/* Editorial Quote Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 md:p-8 rounded-2xl border-l-2 border-emerald-500 bg-white/[0.02] border-y border-r border-white/5 space-y-3"
            >
              <span className="text-3xl text-emerald-400 font-serif leading-none">“</span>
              <p className="text-base sm:text-lg italic text-neutral-300 font-light">
                {profile.tagline}
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs font-mono-tech text-neutral-400">
                <span className="font-bold text-white uppercase">{profile.name}</span>
                <span>—</span>
                <span>INDONESIA</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
