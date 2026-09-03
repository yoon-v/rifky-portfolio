import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Instagram, Linkedin, Github, Facebook, MessageSquare } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const { profile, socialLinks, settings, setCursorState } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { label: 'Instagram', href: socialLinks.instagram || 'https://instagram.com', icon: Instagram },
    { label: 'LinkedIn', href: socialLinks.linkedin || 'https://linkedin.com', icon: Linkedin },
    { label: 'GitHub', href: socialLinks.github || 'https://github.com', icon: Github },
    { label: 'Behance', href: socialLinks.behance || 'https://behance.net', text: 'Be' },
    { label: 'TikTok', href: socialLinks.tiktok || 'https://tiktok.com', text: 'Tk' },
    { label: 'Facebook', href: socialLinks.facebook || 'https://facebook.com', icon: Facebook },
  ];

  return (
    <footer className="relative bg-[#050505] text-[#EDEDED] pt-24 pb-12 px-6 md:px-12 border-t border-white/[0.08] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Top Tier: Logo, Brand & Back to top */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-heading font-black text-white">
                {profile.brand || 'MIR'}
              </span>
              <span className="text-xs font-mono-tech text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                ARCHIVE 2026
              </span>
            </div>
            <p className="text-sm font-medium text-neutral-300">
              {profile.name} — {profile.title}
            </p>
            <p className="text-xs text-neutral-500 font-mono-tech">
              {profile.tagline}
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => setCursorState('button')}
            onMouseLeave={() => setCursorState('default')}
            className="self-start md:self-auto group inline-flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/10 hover:border-emerald-400/50 text-xs font-mono-tech text-neutral-300 hover:text-white transition-all duration-300"
          >
            <span>BACK TO TOP</span>
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Middle Tier: Social Media Grid */}
        <div className="space-y-4">
          <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-neutral-500 block">
            SOCIAL & REPOSITORIES
          </span>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorState('link')}
                  onMouseLeave={() => setCursorState('default')}
                  className="group flex items-center gap-2 text-xs font-mono-tech tracking-wider text-neutral-400 hover:text-white transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-neutral-700 group-hover:bg-emerald-400 transition-colors" />
                  <span>{s.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Tier: Copyright & Watermark */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono-tech text-neutral-500 gap-4">
          <p>© 2026 {profile.name}. All Rights Reserved.</p>
          <p className="flex items-center gap-2">
            <span>DESIGNED & ENGINEERED IN INDONESIA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          </p>
        </div>

        {/* Massive Watermark Typography */}
        <div className="pt-10 overflow-hidden pointer-events-none opacity-30 select-none">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[14vw] font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/15 to-transparent leading-none whitespace-nowrap"
          >
            {settings.footerWatermark || "LET'S CREATE."}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
