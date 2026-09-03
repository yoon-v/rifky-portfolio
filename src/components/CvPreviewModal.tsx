import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Printer, Download, Mail, Phone, MapPin, ExternalLink, CheckCircle2, Loader2, Check } from 'lucide-react';
import { downloadElementAsPdf, fallbackPrintWindow } from '../utils/pdfGenerator';

export const CvPreviewModal: React.FC = () => {
  const { profile, experiences, skills, isCvModalOpen, setIsCvModalOpen, setCursorState } = usePortfolio();
  const cvPrintRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfStatus, setPdfStatus] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isCvModalOpen) return null;

  const handleDownloadPdf = async () => {
    if (!cvPrintRef.current || isGeneratingPdf) return;

    try {
      setIsGeneratingPdf(true);
      setDownloadSuccess(false);
      setPdfStatus('Menyiapkan dokumen...');

      const safeName = (profile.name || 'Muhammad_Irdiansyah_Rifky').trim().replace(/\s+/g, '_');
      const filename = `CV_${safeName}_2026.pdf`;

      await downloadElementAsPdf({
        element: cvPrintRef.current,
        filename,
        onProgress: (status) => setPdfStatus(status),
      });

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Gagal generate PDF:', err);
      // Fallback
      if (cvPrintRef.current) {
        fallbackPrintWindow(cvPrintRef.current, `CV - ${profile.name}`);
      }
    } finally {
      setIsGeneratingPdf(false);
      setPdfStatus('');
    }
  };

  const handlePrint = () => {
    if (cvPrintRef.current) {
      fallbackPrintWindow(cvPrintRef.current, `CV - ${profile.name}`);
    } else {
      window.print();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] overflow-y-auto bg-black/90 backdrop-blur-2xl flex items-start justify-center p-4 sm:p-6 md:p-12 select-none">
        {/* Backdrop Close */}
        <div 
          className="fixed inset-0" 
          onClick={() => setIsCvModalOpen(false)} 
        />

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          className="relative w-full max-w-4xl bg-[#0C0C0C] border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-10 my-auto"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090909]">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-emerald-400 font-bold uppercase tracking-wider">
              <span>CURRICULUM VITAE PREVIEW</span>
              <span className="text-neutral-500">/ 2026</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono-tech bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-all disabled:opacity-50"
                title="Download file PDF langsung"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{pdfStatus || 'MEMPROSES...'}</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-black" />
                    <span>TERUNDUH!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>UNDUH PDF</span>
                  </>
                )}
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tech bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
                title="Cetak via dialog printer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CETAK</span>
              </button>
              <button
                onClick={() => setIsCvModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white"
                aria-label="Close CV preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Document Container */}
          <div ref={cvPrintRef} className="p-8 sm:p-12 space-y-10 text-neutral-200 bg-[#0C0C0C]">
            {/* Top Identity Block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div className="flex items-center gap-5">
                {profile.avatarUrl && (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-emerald-400/40 bg-neutral-900 shrink-0 shadow-lg">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight">
                    {profile.name}
                  </h1>
                  <p className="text-base font-semibold text-emerald-400 font-mono-tech">
                    {profile.title}
                  </p>
                  <p className="text-xs text-neutral-400 italic max-w-md">
                    {profile.tagline}
                  </p>
                </div>
              </div>

              {/* Contact Info Pills */}
              <div className="space-y-1.5 text-xs font-mono-tech text-neutral-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <a href={`mailto:${profile.email}`} className="hover:text-white underline">
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono-tech text-emerald-400 font-bold uppercase tracking-widest">
                EXECUTIVE SUMMARY
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                {profile.fullBio}
              </p>
            </div>

            {/* Experience Timeline */}
            <div className="space-y-6">
              <h2 className="text-xs font-mono-tech text-emerald-400 font-bold uppercase tracking-widest">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-6 divide-y divide-white/5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <h3 className="text-base font-bold text-white">
                        {exp.position} — <span className="text-neutral-300 font-normal">{exp.company}</span>
                      </h3>
                      <span className="text-xs font-mono-tech text-neutral-400">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>

                    <ul className="space-y-1 text-xs text-neutral-400 list-disc list-inside">
                      {exp.description.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Competencies & Skills */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono-tech text-emerald-400 font-bold uppercase tracking-widest">
                SKILLS & EXPERTISE
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skills.map((s) => (
                  <div key={s.id} className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                    <div className="text-xs font-bold text-white font-heading">{s.name}</div>
                    <div className="text-[10px] text-emerald-400 font-mono-tech uppercase">{s.level}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-8 py-5 border-t border-white/10 bg-[#090909] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-mono-tech text-neutral-400">
              Format A4 Standar • Otomatis diperbarui dari Profil & Pengalaman
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-full border border-white/15 text-neutral-300 font-mono-tech text-xs uppercase tracking-wider hover:bg-white/5 transition-colors flex items-center gap-2"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>CETAK / PRINT</span>
              </button>
              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="px-6 py-2.5 rounded-full bg-emerald-500 text-black font-mono-tech font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-60"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{pdfStatus || 'MEN-GENERATE PDF...'}</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>PDF BERHASIL DISIMPAN!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>SAVE AS PDF (UNDUH)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
