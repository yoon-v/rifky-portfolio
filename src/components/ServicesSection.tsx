import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Plus, Minus, Check, ArrowRight, Sparkles } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { services, setCursorState } = usePortfolio();
  const [expandedId, setExpandedId] = useState<string | null>(services[0]?.id || null);

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#080808] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono-tech text-emerald-400 uppercase tracking-widest mb-3">
              <span className="w-6 h-[1px] bg-emerald-400" />
              <span>05 — SERVICES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white font-heading">
              WHAT I CAN<br />CREATE
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-neutral-400 font-light">
            Tailored creative & technical offerings designed to elevate your brand prestige, digital presence, and operational speed.
          </p>
        </div>

        {/* Interactive Accordion List */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {services.map((srv, index) => {
            const isExpanded = expandedId === srv.id;
            const numberLabel = index < 9 ? `0${index + 1}` : `${index + 1}`;

            return (
              <div key={srv.id} className="group">
                <button
                  onClick={() => toggleService(srv.id)}
                  onMouseEnter={() => setCursorState('button')}
                  onMouseLeave={() => setCursorState('default')}
                  className="w-full py-8 md:py-10 text-left flex items-center justify-between gap-6 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-6 md:gap-12">
                    <span className="text-xs sm:text-sm font-mono-tech text-neutral-500 group-hover:text-emerald-400 transition-colors">
                      {numberLabel}
                    </span>
                    <h3 className="text-xl sm:text-3xl md:text-4xl font-heading font-extrabold text-neutral-200 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                      {srv.title}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 group-hover:border-emerald-400 group-hover:text-emerald-400 transition-colors shrink-0">
                    {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pl-10 md:pl-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Description */}
                        <div className="lg:col-span-7 space-y-4">
                          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                            {srv.description}
                          </p>
                          <button
                            onClick={scrollToContact}
                            onMouseEnter={() => setCursorState('button')}
                            onMouseLeave={() => setCursorState('default')}
                            className="inline-flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-emerald-400 hover:text-white pt-2 group/btn"
                          >
                            <span>INQUIRE ABOUT THIS SERVICE</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                          </button>
                        </div>

                        {/* Deliverables checklist */}
                        <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                          <span className="text-[11px] font-mono-tech uppercase tracking-widest text-emerald-400 font-semibold block">
                            KEY DELIVERABLES
                          </span>
                          <ul className="space-y-2">
                            {srv.deliverables.map((item, dIdx) => (
                              <li key={dIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300 font-light">
                                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
