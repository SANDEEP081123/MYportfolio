import { Code2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-zinc-800/60 h-16 flex items-center justify-between px-8">
      <div className="flex items-center gap-2">
        <Code2 className="h-5 w-5 text-brand-accent" />
        <span className="text-md font-bold tracking-tight text-white">{personalInfo.name}</span>
      </div>
      <div className="flex gap-6 text-xs font-medium text-zinc-400">
        <a href="#about" className="hover:text-brand-accent transition-colors">Background</a>
        <a href="#skills" className="hover:text-brand-accent transition-colors">Skills</a>
        <a href="#projects" className="hover:text-brand-accent transition-colors">Projects</a>
        <a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a>
      </div>
    </nav>
  );}