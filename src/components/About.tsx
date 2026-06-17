import { educationData, experienceData } from '../data/portfolioData';
import { GraduationCap, Terminal } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-brand-surface/30 border-y border-zinc-900/60 px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <div>
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="h-5 w-5 text-brand-accent" />
            <h2 className="text-xl font-bold text-white">Education Timeline</h2>
          </div>
          <div className="space-y-6 border-l border-zinc-800 pl-4">
            {educationData.map(edu => (
              <div key={edu.id} className="relative group">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-brand-accent transition-colors" />
                <h4 className="font-semibold text-sm text-zinc-200">{edu.degree}</h4>
                <p className="text-xs text-zinc-400 mt-0.5">{edu.institution}</p>
                <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider block mt-1">{edu.period}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-6">
            <Terminal className="h-5 w-5 text-brand-glow" />
            <h2 className="text-xl font-bold text-white">Technical Experience</h2>
          </div>
          <div className="space-y-6">
            {experienceData.map(exp => (
              <div key={exp.id} className="bg-brand-surface/60 border border-zinc-800/60 rounded-xl p-5">
                <h4 className="font-semibold text-sm text-zinc-200">{exp.role}</h4>
                <p className="text-xs text-brand-glow font-medium mt-0.5">{exp.company}</p>
                <span className="text-[10px] font-mono text-zinc-500 block mt-1 mb-3">{exp.period}</span>
                <ul className="space-y-1.5">
                  {exp.points.map((p, i) => (
                    <li key={i} className="text-xs text-zinc-400 font-light leading-relaxed list-none pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-brand-accent">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );}