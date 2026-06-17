import { skillsData } from '../data/portfolioData';

export default function Skills() {
  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto px-8">
      <h2 className="text-2xl font-bold mb-12 text-center text-white tracking-tight">Technical Capabilities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div key={category} className="p-5 bg-brand-surface border border-zinc-800/80 rounded-xl glow-card-hover">
            <h3 className="text-brand-accent font-semibold tracking-wider text-xs uppercase mb-4 pb-2 border-b border-zinc-800/60">{category}</h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(s => <span key={s} className="px-2.5 py-1 bg-zinc-900/90 border border-zinc-800 rounded text-[11px] text-zinc-300 font-medium">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );}