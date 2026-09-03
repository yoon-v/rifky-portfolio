import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Send, CheckCircle2, Mail, MessageSquare, MapPin, ArrowUpRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const { profile, sendMessage, setCursorState } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      sendMessage(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#ffffff', '#a855f7']
        });
      } catch (err) {
        // Safe fallback
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#050505] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 text-xs font-mono-tech text-emerald-400 uppercase tracking-widest mb-3">
            <span className="w-6 h-[1px] bg-emerald-400" />
            <span>06 — CONTACT</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white font-heading">
            HAVE A PROJECT<br />IN MIND?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 font-light max-w-xl">
            Let's turn your ideas into meaningful, world-class visual & digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <span className="text-xs font-mono-tech text-neutral-500 uppercase tracking-widest block">
                DIRECT CHANNELS
              </span>

              {/* Email link */}
              <a
                href={`mailto:${profile.email}`}
                onMouseEnter={() => setCursorState('link')}
                onMouseLeave={() => setCursorState('default')}
                className="group block p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 font-mono-tech block">EMAIL ADDRESS</span>
                      <span className="text-sm sm:text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {profile.email}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
                </div>
              </a>

              {/* WhatsApp direct */}
              <a
                href={profile.whatsapp || `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorState('link')}
                onMouseLeave={() => setCursorState('default')}
                className="group block p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 font-mono-tech block">WHATSAPP / DIRECT</span>
                      <span className="text-sm sm:text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {profile.phone}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
                </div>
              </a>

              {/* Location Badge */}
              <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] text-neutral-400 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 font-mono-tech block">BASE LOCATION</span>
                  <span className="text-sm font-semibold text-white">
                    {profile.location} (GMT+7)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <div className="p-6 rounded-2xl border-l-2 border-emerald-500 bg-white/[0.015] border-y border-r border-white/5">
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                Currently taking on select freelance commissions, full-time opportunities, and brand consulting inquiries worldwide.
              </p>
            </div>
          </div>

          {/* Right Column: Underline Minimalist Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 md:p-12 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                    Message Dispatched Successfully
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto font-light">
                    Thank you for reaching out. Muhammad Irdiansyah Rifky will review your project requirements and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono-tech uppercase tracking-wider text-white transition-colors"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-mono-tech text-red-400">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="relative group">
                    <label 
                      htmlFor="name" 
                      className="block text-xs font-mono-tech uppercase tracking-widest text-neutral-400 mb-2 group-focus-within:text-emerald-400 transition-colors"
                    >
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alexander Smith"
                      className="w-full bg-transparent border-b border-white/20 pb-3 pt-1 text-base sm:text-lg text-white placeholder:text-neutral-700 focus:outline-none focus:border-emerald-400 transition-colors font-light"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <label 
                      htmlFor="email" 
                      className="block text-xs font-mono-tech uppercase tracking-widest text-neutral-400 mb-2 group-focus-within:text-emerald-400 transition-colors"
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@studio.co"
                      className="w-full bg-transparent border-b border-white/20 pb-3 pt-1 text-base sm:text-lg text-white placeholder:text-neutral-700 focus:outline-none focus:border-emerald-400 transition-colors font-light"
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="relative group">
                    <label 
                      htmlFor="subject" 
                      className="block text-xs font-mono-tech uppercase tracking-widest text-neutral-400 mb-2 group-focus-within:text-emerald-400 transition-colors"
                    >
                      SUBJECT / TOPIC
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Brand Redesign & Web Platform Build"
                      className="w-full bg-transparent border-b border-white/20 pb-3 pt-1 text-base sm:text-lg text-white placeholder:text-neutral-700 focus:outline-none focus:border-emerald-400 transition-colors font-light"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="relative group">
                    <label 
                      htmlFor="message" 
                      className="block text-xs font-mono-tech uppercase tracking-widest text-neutral-400 mb-2 group-focus-within:text-emerald-400 transition-colors"
                    >
                      YOUR MESSAGE *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project goals, scope, and timeline..."
                      className="w-full bg-transparent border-b border-white/20 pb-3 pt-1 text-base sm:text-lg text-white placeholder:text-neutral-700 focus:outline-none focus:border-emerald-400 transition-colors font-light resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={() => setCursorState('button')}
                      onMouseLeave={() => setCursorState('default')}
                      className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-emerald-500 text-black font-mono-tech font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      <span>{isSubmitting ? 'DISPATCHING...' : 'SEND MESSAGE'}</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
