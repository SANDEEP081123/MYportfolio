import React from 'react';
import { soundFx } from '../../utils/audio';

const Footer = () => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-6 z-20 border-t border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-slate-400">
        {/* Left Telemetry Info */}
        <div className="flex flex-col gap-1 text-center md:text-left">
          <div className="font-orbitron font-bold text-sm text-white flex items-center justify-center md:justify-start gap-2">
            <span>SANDEEP NELAPOGULA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <p className="text-[11px] text-slate-500">
            ENGINE: THREE.JS WEBGL // REACT 19 // SHADER PIPELINE
          </p>
        </div>

        {/* Center: System Status */}
        <div className="flex items-center gap-4 text-[11px]">
          <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800 text-cyan-400">
            60 FPS RENDERER
          </span>
          <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800 text-violet-400">
            NEURAL PARALLAX ACTIVE
          </span>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => soundFx.playHover()}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-cyan-400/50 bg-black/40 text-slate-300 hover:text-cyan-300 transition-colors"
        >
          <span>RETURN TO APEX</span>
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-slate-900 text-center text-[10px] text-slate-600 font-mono">
        © 2026 SANDEEP NELAPOGULA. ENGINEERED FOR HIGH-SPEED INTERACTION &amp; COMPUTATIONAL ELEGANCE.
      </div>
    </footer>
  );
};

export default React.memo(Footer);
