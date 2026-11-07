import React from 'react';
import { soundFx } from '../../utils/audio';

const Hero = () => {
  const scrollTo = (id) => {
    soundFx.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 z-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center relative z-20">
        {/* Futuristic Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/20 backdrop-blur-md mb-8 animate-fade-in shadow-[0_0_20px_rgba(0,240,255,0.15)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-cyan-400 -ml-4" />
          <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
            IMMERSIVE 3D MATRIX // INTERACTIVE WORKSPACE
          </span>
        </div>

        {/* Large Cinematic Hero Typography */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-orbitron font-extrabold tracking-tight text-white mb-6 uppercase leading-none">
          SANDEEP <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">
            NELAPOGULA
          </span>
        </h1>

        {/* Architectural Sub-header */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl font-rajdhani font-semibold text-slate-300 tracking-wider uppercase mb-3">
          CREATIVE DEVELOPER <span className="text-cyan-400">•</span> FULL STACK
          ENGINEER <span className="text-violet-400">•</span> WEBGL SPECIALIST
        </p>

        <p className="max-w-xl mx-auto text-xs sm:text-sm font-mono text-slate-400 mb-10 leading-relaxed">
          [ ARCHITECTING RESILIENT DIGITAL SYSTEMS, PROCEDURE-DRIVEN 3D WORLDS, AND
          HIGH-PERFORMANCE FULL-STACK EXPERIENCES WITH PRECISION AND SPEED ]
        </p>

        {/* Interactive CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => scrollTo('projects')}
            onMouseEnter={() => soundFx.playHover()}
            className="group relative px-8 py-3.5 rounded-lg font-orbitron font-bold text-xs tracking-widest text-slate-900 bg-cyan-400 overflow-hidden shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:shadow-[0_0_35px_rgba(0,240,255,0.8)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              EXPLORE MATRIX
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <button
            onClick={() => scrollTo('contact')}
            onMouseEnter={() => soundFx.playHover()}
            className="px-8 py-3.5 rounded-lg font-orbitron font-bold text-xs tracking-widest text-cyan-300 border border-cyan-500/40 bg-black/40 backdrop-blur-md hover:bg-cyan-950/30 hover:border-cyan-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
          >
            INITIALIZE TRANSMISSION
          </button>

          <button
            onClick={() => scrollTo('about')}
            onMouseEnter={() => soundFx.playHover()}
            className="px-6 py-3.5 rounded-lg font-mono text-xs tracking-wider text-slate-400 border border-violet-500/30 bg-violet-950/20 backdrop-blur-md hover:text-violet-300 hover:border-violet-400 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            TELEMETRY // BIO
          </button>
        </div>

        {/* Telemetry Stat Cards in Hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-slate-950/60 backdrop-blur-md">
            <span className="block font-mono text-[10px] text-cyan-400/80 uppercase tracking-widest">
              SYSTEM STATUS
            </span>
            <span className="font-orbitron font-bold text-lg text-slate-100">
              OPTIMAL
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-slate-950/60 backdrop-blur-md">
            <span className="block font-mono text-[10px] text-cyan-400/80 uppercase tracking-widest">
              STACK
            </span>
            <span className="font-orbitron font-bold text-lg text-slate-100">
              FULL-STACK
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-violet-500/20 bg-slate-950/60 backdrop-blur-md">
            <span className="block font-mono text-[10px] text-violet-400/80 uppercase tracking-widest">
              INTERACTION
            </span>
            <span className="font-orbitron font-bold text-lg text-slate-100">
              3D WEBGL
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-violet-500/20 bg-slate-950/60 backdrop-blur-md">
            <span className="block font-mono text-[10px] text-violet-400/80 uppercase tracking-widest">
              VELOCITY
            </span>
            <span className="font-orbitron font-bold text-lg text-slate-100">
              60 FPS
            </span>
          </div>
        </div>

        {/* Pulsing Scroll Indicator */}
        <div
          onClick={() => scrollTo('about')}
          onMouseEnter={() => soundFx.playHover()}
          className="mt-16 inline-flex flex-col items-center gap-2 cursor-pointer group"
          role="button"
          tabIndex={0}
        >
          <span className="font-mono text-[10px] text-slate-500 group-hover:text-cyan-400 tracking-widest uppercase transition-colors">
            DESCENT TO ARCHIVE
          </span>
          <div className="w-5 h-9 rounded-full border border-slate-700 group-hover:border-cyan-400 flex items-start justify-center p-1 transition-colors">
            <div className="w-1.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
