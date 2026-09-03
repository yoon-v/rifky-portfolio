import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Palette, 
  Code2, 
  Figma, 
  LayoutGrid, 
  Cpu, 
  Terminal, 
  GitBranch, 
  Github, 
  Layers, 
  PenTool, 
  Boxes, 
  MonitorCheck 
} from 'lucide-react';

export const ToolsSection: React.FC = () => {
  const { setCursorState } = usePortfolio();

  const toolsets = [
    { name: 'Photoshop', category: 'Graphic Design / Retouching', icon: Palette },
    { name: 'Illustrator', category: 'Vector & Identity System', icon: PenTool },
    { name: 'Figma', category: 'UI/UX Prototyping', icon: Figma },
    { name: 'Canva Pro', category: 'Social Media Templates', icon: LayoutGrid },
    { name: 'React 19', category: 'Web App Engineering', icon: Code2 },
    { name: 'TypeScript', category: 'Type-Safe Architecture', icon: Terminal },
    { name: 'Tailwind CSS', category: 'Utility UI Styling', icon: Layers },
    { name: 'VS Code', category: 'Development Environment', icon: Boxes },
    { name: 'Git & GitHub', category: 'Version Control & CI', icon: Github },
    { name: 'IT Systems', category: 'Hardware & OS Diagnostics', icon: MonitorCheck },
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Small label */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-mono-tech tracking-[0.3em] uppercase text-emerald-400">
            ARSENAL & WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white">
            TOOLS I USE
          </h2>
        </div>

        {/* Grid of monochrome cards that glow accent on hover */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {toolsets.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onMouseEnter={() => setCursorState('link')}
                onMouseLeave={() => setCursorState('default')}
                className="group p-5 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.04] hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-emerald-400 group-hover:border-emerald-400/40 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold font-heading text-neutral-200 group-hover:text-white transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-[11px] font-mono-tech text-neutral-500 mt-0.5 line-clamp-1">
                    {tool.category}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
