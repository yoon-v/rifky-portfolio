import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ShieldAlert, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  X, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Clock
} from 'lucide-react';

interface AdminLoginGateProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({ onClose, onSuccess }) => {
  const { loginAdmin, setCursorState, profile } = usePortfolio();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Security attempt lockout
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      setLockoutSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    if (!username.trim() || !password) {
      setErrorMsg('Mohon isi username dan password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const result = loginAdmin(username, password);
      setIsLoading(false);

      if (result.success) {
        setFailedAttempts(0);
        onSuccess?.();
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);

        if (nextAttempts >= 5) {
          setLockoutSeconds(30);
          setErrorMsg('Terlalu banyak percobaan gagal. Akses terkunci selama 30 detik untuk keamanan.');
        } else {
          setErrorMsg(result.message || 'Username atau password salah.');
        }
      }
    }, 350);
  };

  const handleFillDefaults = () => {
    setUsername('admin');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md bg-[#0A0A0A] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          onMouseEnter={() => setCursorState('button')}
          onMouseLeave={() => setCursorState('default')}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors border border-white/5"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon & Title */}
        <div className="flex flex-col items-center text-center space-y-3 mb-6">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <Lock className="w-7 h-7" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-black border border-emerald-500/40 flex items-center justify-center">
              <ShieldAlert className="w-3 h-3 text-emerald-400" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono-tech text-emerald-400 font-semibold tracking-wider uppercase mb-1">
              <span>Restricted Access</span>
            </div>
            <h2 className="text-xl font-heading font-bold text-white tracking-tight">
              Portal Login Administrator
            </h2>
            <p className="text-xs text-neutral-400 max-w-xs leading-relaxed font-light">
              Halaman ini terproteksi. Hanya pemilik portofolio yang memiliki izin untuk mengelola konten dan data.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-red-400 text-xs font-mono-tech"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lockout notice */}
        {lockoutSeconds > 0 && (
          <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5 text-amber-400 text-xs font-mono-tech">
            <Clock className="w-4 h-4 shrink-0 animate-spin" />
            <span>Terkunci sementara: tunggu {lockoutSeconds} detik.</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 flex items-center justify-between">
              <span>Username atau Email</span>
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-neutral-500 pointer-events-none" />
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrorMsg('');
                }}
                disabled={lockoutSeconds > 0 || isLoading}
                placeholder="admin / email pemilik"
                className="w-full bg-[#121212] border border-white/15 focus:border-emerald-500/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-neutral-600 font-mono-tech focus:outline-none transition-colors"
                autoComplete="username"
                autoFocus
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 flex items-center justify-between">
              <span>Password Keamanan</span>
            </label>
            <div className="relative flex items-center">
              <KeyRound className="absolute left-3.5 w-4 h-4 text-neutral-500 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                disabled={lockoutSeconds > 0 || isLoading}
                placeholder="••••••••"
                className="w-full bg-[#121212] border border-white/15 focus:border-emerald-500/60 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-neutral-600 font-mono-tech focus:outline-none transition-colors"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-neutral-500 hover:text-neutral-300 p-1 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={lockoutSeconds > 0 || isLoading}
            onMouseEnter={() => setCursorState('button')}
            onMouseLeave={() => setCursorState('default')}
            className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-[0.99] flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Memverifikasi Kredensial...</span>
              </div>
            ) : (
              <>
                <span>Buka Akses Admin</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* First time owner help toggle */}
        <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-[11px] text-neutral-400 hover:text-emerald-400 transition-colors flex items-center justify-center gap-1.5 w-full font-mono-tech"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400/80" />
            <span>{showHint ? 'Sembunyikan panduan akses awal' : 'Informasi akses pertama kali pemilik'}</span>
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 text-[11px] text-neutral-300 font-mono-tech"
              >
                <div className="flex items-center justify-between text-neutral-400 text-[10px] uppercase">
                  <span>Kredensial Bawaan Pemilik:</span>
                  <button
                    type="button"
                    onClick={handleFillDefaults}
                    className="text-emerald-400 hover:underline cursor-pointer"
                  >
                    Isi Otomatis
                  </button>
                </div>
                <div className="bg-black/60 p-2 rounded-lg border border-white/5 space-y-1">
                  <div>Username: <span className="text-emerald-300 font-bold">admin</span></div>
                  <div>Password: <span className="text-emerald-300 font-bold">admin123</span></div>
                </div>
                <p className="text-[10px] text-neutral-400 leading-tight">
                  * Setelah masuk, Anda dapat langsung mengubah username dan password ini di menu <strong>Settings</strong> agar akun Anda sepenuhnya privat dan tidak dapat diakses orang lain.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
