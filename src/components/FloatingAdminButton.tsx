import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Lock, Shield, ShieldCheck, X } from 'lucide-react';
import { motion } from 'motion/react';

export const FloatingAdminButton: React.FC = () => {
  const { setIsAdminOpen, isAdminOpen, isAdminAuthenticated, settings, setCursorState } = usePortfolio();
  const [isDismissed, setIsDismissed] = useState(false);

  // If dismissed, hidden by settings, or modal is open, don't show
  if (isDismissed || isAdminOpen || settings.showAdminFloatingButton === false) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 select-none"
    >
      <button
        onClick={() => setIsAdminOpen(true)}
        onMouseEnter={() => setCursorState('button')}
        onMouseLeave={() => setCursorState('default')}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-300 group hover:scale-[1.03] ${
          isAdminAuthenticated 
            ? 'bg-emerald-950/80 hover:bg-emerald-900/90 border-emerald-500/50 text-emerald-300' 
            : 'bg-[#0A0A0A]/90 hover:bg-neutral-900 border-white/20 hover:border-emerald-500/40 text-neutral-300'
        }`}
        title={isAdminAuthenticated ? 'Admin Panel Terbuka' : 'Masuk ke Sistem Admin Portofolio'}
      >
        <div className="relative flex items-center justify-center">
          {isAdminAuthenticated ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute" />
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </>
          ) : (
            <span className="w-2 h-2 rounded-full bg-neutral-500" />
          )}
        </div>
        
        <div className="flex items-center gap-1.5 text-xs font-mono-tech tracking-wider">
          {isAdminAuthenticated ? (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-emerald-300">
                Admin Panel (Aktif)
              </span>
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
              <span className="font-medium text-neutral-300 group-hover:text-white transition-colors">
                Admin Login
              </span>
            </>
          )}
        </div>
      </button>

      <button
        onClick={() => setIsDismissed(true)}
        className="w-7 h-7 rounded-full bg-neutral-950/80 border border-white/10 hover:border-white/25 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
        title="Tutup tombol pintas"
        aria-label="Tutup"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};
