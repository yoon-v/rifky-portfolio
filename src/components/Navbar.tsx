import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { FileDown, Menu, X, Shield, Palette, Sparkles, Check, Lock, ShieldCheck } from 'lucide-react';
import { AccentTheme } from '../types';

export const Navbar: React.FC = () => {
  const { 
    profile, 
    settings, 
    setAccentTheme, 
    setIsAdminOpen, 
    isAdminAuthenticated,
    setIsCvModalOpen, 
    setCursorState 
  } = usePortfolio();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section tracking
      const sections = ['home', 'about', 'work', 'experience', 'services', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'WORK', href: '#work' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'SERVICES', href: '#services' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const themesList: { id: AccentTheme; label: string; color: string }[] = [
    { id: 'emerald', label: 'Emerald Green', color: '#10b981' },
    { id: 'violet', label: 'Electric Violet', color: '#a855f7' },
    { id: 'silver', label: 'Metallic Silver', color: '#e2e8f0' },
    { id: 'amber', label: 'Sunset Amber', color: '#f59e0b' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/[0.06] py-3.5 shadow-2xl shadow-black/80'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            onMouseEnter={() => setCursorState('link')}
            onMouseLeave={() => setCursorState('default')}
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="Back to Top"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03] group-hover:border-emerald-500/50 transition-colors duration-300">
              <span className="font-heading font-black text-lg tracking-wider text-white group-hover:text-emerald-400 transition-colors">
                {profile.brand || 'MIR'}
              </span>
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold tracking-widest text-neutral-200 uppercase font-heading">
                {profile.name}
              </span>
              <span className="text-[10px] text-neutral-500 tracking-wider font-mono-tech">
                CREATIVE TECH
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 bg-white/[0.02] border border-white/[0.06] px-6 py-2 rounded-full backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  onMouseEnter={() => setCursorState('link')}
                  onMouseLeave={() => setCursorState('default')}
                  className={`text-xs font-mono-tech tracking-widest transition-all duration-300 relative py-1 ${
                    isActive ? 'text-emerald-400 font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Theme Accent Selector */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                onMouseEnter={() => setCursorState('button')}
                onMouseLeave={() => setCursorState('default')}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/20 bg-white/[0.02] transition-colors"
                title="Change Accent Color"
                aria-label="Change Accent Color"
              >
                <Palette className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {themeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-3 w-48 bg-[#0D0D0D] border border-white/10 rounded-xl p-2 shadow-2xl z-50 backdrop-blur-xl"
                  >
                    <div className="px-3 py-1.5 text-[10px] uppercase font-mono-tech tracking-wider text-neutral-500 border-b border-white/5 mb-1">
                      Accent Theme
                    </div>
                    {themesList.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setAccentTheme(t.id);
                          setThemeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                          settings.accentTheme === t.id
                            ? 'bg-white/10 text-white font-medium'
                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: t.color, boxShadow: `0 0 6px ${t.color}` }}
                          />
                          {t.label}
                        </span>
                        {settings.accentTheme === t.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Admin Panel Trigger */}
            <button
              onClick={() => setIsAdminOpen(true)}
              onMouseEnter={() => setCursorState('button')}
              onMouseLeave={() => setCursorState('default')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono-tech transition-all duration-300 group ${
                isAdminAuthenticated
                  ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25'
                  : 'border-white/15 bg-white/[0.03] text-neutral-300 hover:text-white hover:border-emerald-500/40 hover:bg-white/[0.06]'
              }`}
              title={isAdminAuthenticated ? 'Admin Panel (Sesi Aktif)' : 'Login Administrator Portofolio'}
              aria-label="Admin CMS"
            >
              {isAdminAuthenticated ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold hidden sm:inline text-emerald-300">ADMIN (AKTIF)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
                  <span className="font-semibold hidden sm:inline">ADMIN</span>
                </>
              )}
            </button>

            {/* Download CV CTA */}
            <button
              onClick={() => setIsCvModalOpen(true)}
              onMouseEnter={() => setCursorState('button')}
              onMouseLeave={() => setCursorState('default')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-tech tracking-wider font-semibold border border-white/15 bg-white/[0.04] text-white hover:bg-white/10 hover:border-emerald-400/60 transition-all duration-300 group"
            >
              <FileDown className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
              <span>CV</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white bg-white/[0.02]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-[70px] z-40 bg-[#080808]/95 backdrop-blur-2xl border-b border-white/10 lg:hidden px-6 py-8"
          >
            <div className="flex flex-col space-y-5">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-lg font-heading tracking-widest text-neutral-300 hover:text-emerald-400 transition-colors py-1 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono-tech text-neutral-600">→</span>
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-mono-tech font-bold transition-colors ${
                    isAdminAuthenticated
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : 'bg-white/[0.03] border-white/15 text-neutral-300 hover:text-white'
                  }`}
                >
                  {isAdminAuthenticated ? (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>ADMIN CMS (SESI AKTIF)</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-neutral-400" />
                      <span>ADMIN LOGIN (RESTRICTED)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCvModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-mono-tech text-white"
                >
                  <FileDown className="w-4 h-4 text-emerald-400" />
                  DOWNLOAD CURRICULUM VITAE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
