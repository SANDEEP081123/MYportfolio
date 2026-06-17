import { personalInfo } from '../data/portfolioData';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 max-w-4xl mx-auto px-8 text-center">
      <div className="bg-brand-surface border border-zinc-800/80 rounded-2xl p-10 sm:p-14">
        <h2 className="text-2xl font-bold text-white mb-3">Let's Connect</h2>
        <p className="text-zinc-400 font-light text-sm mb-8 max-w-md mx-auto">Open for internships, entry-level positions, or technical collaborations in image optimization and computer vision pipelines.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8 text-left">
          <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800/60 rounded-xl hover:border-brand-accent transition-colors group">
            <Mail className="h-4 w-4 text-zinc-500 group-hover:text-brand-accent" />
            <span className="text-xs text-zinc-300 truncate">{personalInfo.email}</span>
          </a>
          <div className="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800/60 rounded-xl">
            <Phone className="h-4 w-4 text-zinc-500" />
            <span className="text-xs text-zinc-300">{personalInfo.phone}</span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-brand-accent transition-colors">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-brand-accent transition-colors">
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );}