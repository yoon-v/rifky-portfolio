import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(1);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1100; // ~1.1s total cinematic loading time

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setPercent(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 600);
        }, 150);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loading-curtain"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%', 
            opacity: 0.95,
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#050505] text-[#EDEDED] p-8 md:p-14 select-none overflow-hidden"
        >
          {/* Top Label */}
          <div className="flex justify-between items-center text-xs tracking-widest text-neutral-500 font-mono-tech uppercase">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              PORTFOLIO ARCHIVE / 2026
            </span>
            <span>ID / GLOBAL</span>
          </div>

          {/* Center Brand Identity */}
          <div className="flex flex-col items-center justify-center my-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-white font-heading">
                MIR
              </h1>
              <div className="absolute -inset-4 bg-emerald-500/10 blur-2xl -z-10 rounded-full"></div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-4 text-sm md:text-base tracking-[0.25em] text-neutral-400 font-medium uppercase"
            >
              Muhammad Irdiansyah Rifky
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="text-xs tracking-widest text-emerald-400/80 font-mono-tech mt-1"
            >
              GRAPHIC DESIGNER & IT SPECIALIST
            </motion.p>
          </div>

          {/* Bottom Counter & Progress Bar */}
          <div className="space-y-4">
            <div className="flex justify-between items-end text-sm font-mono-tech">
              <span className="text-neutral-500">LOADING EXPERIENCE</span>
              <span className="text-emerald-400 font-bold tracking-wider">
                {percent < 10 ? `0${percent}` : percent} — 100%
              </span>
            </div>
            
            {/* Minimalist Progress Line */}
            <div className="w-full h-[2px] bg-neutral-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-300"
                style={{ width: `${percent}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
