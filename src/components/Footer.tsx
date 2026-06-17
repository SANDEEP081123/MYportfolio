import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900/60 py-8 text-center text-[11px] font-mono text-zinc-600">
      © {new Date().getFullYear()} {personalInfo.name}. Built with React & Tailwind.
    </footer>
  );}