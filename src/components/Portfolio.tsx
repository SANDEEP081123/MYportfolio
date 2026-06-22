import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projectsData } from '../data/portfolioData';

export default function Portfolio() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <section id="projects" className="py-24 bg-brand-surface/10 px-8 border-t border-zinc-900/60">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-12 text-white tracking-tight">Core Project Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((p: any) => (
            <div 
              key={p.id} 
              className="bg-brand-surface border border-zinc-800/80 rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 flex flex-col justify-between" 
              onClick={() => setSelected(p)}
            >
              <div>
                <div className="overflow-hidden h-56 bg-zinc-900">
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-101 transition-all duration-500" />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">{p.category}</span>
                  <h3 className="text-lg font-bold text-white mt-1 group-hover:text-brand-accent transition-colors">{p.title}</h3>
                  <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mt-4">
                    {p.tools.map((t: string) => <span key={t} className="text-[10px] px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded">{t}</span>)}
                  </div>
                </div>
              </div>
              
              {(p.driveUrl || p.projectUrl) && (
                <div className="px-6 pb-6 pt-2">
                  <a 
                    href={p.driveUrl || p.projectUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    onClick={(e) => e.stopPropagation()} 
                    className="inline-flex items-center gap-1.5 text-xs text-brand-accent hover:text-brand-glow hover:underline transition-all font-medium"
                  >
                    {p.driveUrl ? 'View Original Asset on Drive' : 'View Project'} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <div className="bg-brand-surface border border-zinc-800 rounded-xl max-w-xl w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              <img src={selected.imageUrl} alt={selected.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent">{selected.category}</span>
                    <h3 className="text-xl font-bold text-white mt-0.5">{selected.title}</h3>
                  </div>
                  {(selected.driveUrl || selected.projectUrl) && (
                    <a 
                      href={selected.driveUrl || selected.projectUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1.5 bg-brand-accent hover:bg-brand-accent/90 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all shadow-md shadow-brand-accent/10"
                    >
                      {selected.driveUrl ? 'Drive Link' : 'View Project'} <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-4 font-light leading-relaxed">{selected.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}