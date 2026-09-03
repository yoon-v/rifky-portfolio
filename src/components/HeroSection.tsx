import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, FileDown, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { profile, settings, setIsCvModalOpen, setCursorState } = usePortfolio();
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax on mouse move
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 20;
    const y = ((clientY - top) / height - 0.5) * 20;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.7], [0, 80]);

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const nameWords = profile.name.split(' '); // ['Muhammad', 'Irdiansyah', 'Rifky']

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 bg-[#050505] overflow-hidden select-none"
    >
      {/* Ambient background glow layers */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-emerald-700/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Main Container */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center relative z-10 my-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          {/* Left Column: Editorial Typography */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 relative z-20">
            {/* Small Label Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-mono-tech text-neutral-300"
            >
              <div className="h-[1px] w-6 bg-emerald-400" />
              <span className="tracking-widest uppercase text-emerald-400 font-semibold">
                {settings.heroCreativeLabel || 'CREATIVE TECHNOLOGIST'}
              </span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-neutral-500" />
                {profile.location || 'Indonesia'}
              </span>
            </motion.div>

            {/* Refined Cinematic Heading - Perfectly proportioned so it does not collide with photo */}
            <div className="space-y-0.5 sm:space-y-1">
              {nameWords.map((word, idx) => (
                <div key={word} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.2 + idx * 0.12,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className={`text-3xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-7xl font-extrabold tracking-tight leading-[1.02] text-white break-words ${
                      idx === 2 ? 'font-serif italic font-light text-neutral-100' : 'font-heading'
                    }`}
                  >
                    {idx === 1 ? (
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                        {word}
                      </span>
                    ) : idx === 2 ? (
                      `${word}.`
                    ) : (
                      word
                    )}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Subtitle & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="space-y-3 pt-2"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-emerald-400 font-heading">
                {profile.title}
              </h2>
              <p className="max-w-2xl text-base sm:text-lg text-neutral-400 leading-relaxed font-light">
                {profile.shortBio}
              </p>
            </motion.div>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              {/* Primary CTA */}
              <button
                onClick={scrollToWork}
                onMouseEnter={() => setCursorState('button')}
                onMouseLeave={() => setCursorState('default')}
                className="relative group overflow-hidden rounded-full bg-emerald-500 text-black px-7 py-4 text-xs sm:text-sm font-mono-tech font-bold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95 flex items-center gap-3"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => setIsCvModalOpen(true)}
                onMouseEnter={() => setCursorState('button')}
                onMouseLeave={() => setCursorState('default')}
                className="group px-7 py-4 rounded-full border border-white/15 bg-white/[0.02] text-neutral-300 hover:text-white hover:border-white/40 hover:bg-white/[0.06] text-xs sm:text-sm font-mono-tech font-semibold tracking-wider uppercase transition-all duration-300 active:scale-95 flex items-center gap-2.5"
              >
                <FileDown className="w-4 h-4 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
                <span>DOWNLOAD CV</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Hero Profile Visual Card with Parallax */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
              style={{
                transform: `perspective(1000px) rotateX(${-mouseOffset.y * 0.8}deg) rotateY(${mouseOffset.x * 0.8}deg)`,
              }}
              onMouseEnter={() => setCursorState('view', 'MIR')}
              onMouseLeave={() => setCursorState('default')}
              className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[320px] xl:max-w-[350px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A] p-2.5 shadow-2xl emerald-glow transition-transform duration-200 ease-out"
            >
              {/* Inner Image Frame */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-900 group">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Subtle Emerald glow line */}
                <div className="absolute inset-0 border border-emerald-500/20 rounded-xl pointer-events-none" />

                {/* Badge inside card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-tech tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      AVAILABLE FOR HIRE
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono-tech">2026 ARCHIVE</span>
                  </div>
                  <p className="text-xs text-neutral-300 font-medium">
                    {profile.tagline}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="w-full flex flex-col items-center justify-center pt-8 relative z-10"
      >
        <button
          onClick={scrollToWork}
          className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <span className="text-[10px] uppercase font-mono-tech tracking-[0.3em] text-neutral-500 group-hover:text-emerald-400 transition-colors">
            SCROLL TO EXPLORE
          </span>
          <div className="w-[1px] h-10 bg-neutral-800 relative overflow-hidden rounded-full">
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-full h-1/2 bg-gradient-to-b from-transparent via-emerald-400 to-transparent"
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
};
