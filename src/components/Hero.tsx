import { motion } from 'framer-motion';
import { Award, Image as ImageIcon, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-20 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-glow/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-surface border border-zinc-800 text-brand-accent uppercase tracking-wider mb-6">
            <Award className="w-3.5 h-3.5" /> Open to New Opportunities
          </span>
        </motion.div>

        {/* Main Titles */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-center"
        >
          <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Sandeep Nelapogula
          </span>
          <br />
          <span className="bg-gradient-to-r from-brand-accent to-brand-glow bg-clip-text text-transparent glow-text-indigo">
            Precision Image Processing
          </span>
        </motion.h1>

        {/* Bio Description (Now explicitly centered) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 font-light leading-relaxed"
        >
          {personalInfo.bio}
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white px-6 py-3.5 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-0.5 group"
          >
            Explore Projects
            <ImageIcon className="w-4 h-4 transition-transform group-hover:rotate-12" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-brand-surface hover:bg-zinc-800 text-zinc-300 border border-zinc-800 hover:border-zinc-700 px-6 py-3.5 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Let's Talk
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}