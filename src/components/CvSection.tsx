import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { FileDown, Sparkles, ArrowRight } from 'lucide-react';

export const CvSection: React.FC = () => {
  const { setIsCvModalOpen, setCursorState } = usePortfolio();

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-12 bg-[#080808] border-t border-white/[0.06] overflow-hidden select-none">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono-tech text-emerald-400 font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OPEN FOR FULL-TIME & CONTRACT ROLES</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white font-heading leading-tight">
            LET'S BUILD<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-white">
              SOMETHING GREAT.
            </span>
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-neutral-400 font-light">
            Download my comprehensive Curriculum Vitae detailing past leadership, design systems, and technical infrastructure achievements.
          </p>
        </motion.div>

        {/* Magnetic CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={() => setIsCvModalOpen(true)}
            onMouseEnter={() => setCursorState('button')}
            onMouseLeave={() => setCursorState('default')}
            className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-emerald-500 text-black font-mono-tech font-bold text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all duration-300 hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] active:scale-95 cursor-pointer"
          >
            <span>DOWNLOAD MY CV</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
