import React from 'react';

const About = () => {
  return (
    <section id="about" className="relative min-h-screen py-24 px-6 z-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
              {'// SECTION 02'}
            </span>
            <div className="h-[1px] w-12 bg-cyan-500/40" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-wide uppercase">
            ARCHIVE <span className="text-cyan-400">&amp;</span> TELEMETRY
          </h2>
          <p className="font-mono text-xs text-slate-400 mt-2 max-w-xl">
            [ BIOGRAPHY, CORE ENGINEERING ARCHITECTURE &amp; PASSION FOR SPEED ]
          </p>
        </div>

        {/* Grid Layout: Visual Telemetry Chassis + Core Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Holographic Supercar Chassis (Preserved UserProfile asset) */}
          <div className="lg:col-span-5 relative group">
            {/* Ambient Glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 to-violet-600/30 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative rounded-2xl border border-cyan-500/40 bg-slate-950/80 backdrop-blur-xl p-4 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
              {/* Corner HUD Brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

              {/* Header Status Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-500/20 font-mono text-[10px] text-slate-400">
                <span className="text-cyan-400">VEHICLE_CHASSIS // 488_GTB</span>
                <span className="flex items-center gap-1.5 text-violet-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  TELEMETRY ACTIVE
                </span>
              </div>

              {/* Supercar Image from existing UserProfile */}
              <div className="relative rounded-lg overflow-hidden border border-slate-800">
                <img
                  src="https://gcp-na-images.contentstack.com/v3/assets/bltea6093859af6183b/blt8b58d754b919eed3/69877da506f2c14fb9333d07/10-2015-488-gtb.jpg?branch=production&width=750&quality=75&auto=webp&crop=3:2"
                  alt="Sandeep's High Performance GTB Supercar Aesthetic"
                  className="w-full h-64 object-cover filter saturate-110 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Subtle Scanline Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none opacity-40 animate-pulse" />
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/70 backdrop-blur-md font-mono text-[9px] text-cyan-300 border border-cyan-500/30">
                  SPEED • PRECISION • PASSION
                </div>
              </div>

              {/* Footer Telemetry Specs */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-cyan-500/20 text-center font-mono">
                <div className="p-2 rounded bg-black/40 border border-slate-800">
                  <div className="text-[10px] text-slate-400">HORSEPOWER</div>
                  <div className="text-xs font-bold text-cyan-400">660 CV</div>
                </div>
                <div className="p-2 rounded bg-black/40 border border-slate-800">
                  <div className="text-[10px] text-slate-400">0-100 KM/H</div>
                  <div className="text-xs font-bold text-violet-400">3.0 SEC</div>
                </div>
                <div className="p-2 rounded bg-black/40 border border-slate-800">
                  <div className="text-[10px] text-slate-400">ENGINEERING</div>
                  <div className="text-xs font-bold text-sky-400">OPTIMAL</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Philosophy */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-slate-950/70 backdrop-blur-xl relative">
              <h3 className="font-orbitron font-bold text-xl sm:text-2xl text-white mb-4">
                ENGINEERING BEYOND THE CONVENTIONAL INTERFACE
              </h3>
              <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base mb-4">
                I am <span className="text-cyan-400 font-semibold">Sandeep Nelapogula</span>,
                a passionate Full Stack Engineer and interactive web designer driven by the intersection
                of high-speed performance, clean code architecture, and immersive 3D digital experiences.
              </p>
              <p className="text-slate-400 font-sans leading-relaxed text-sm sm:text-base mb-6">
                Just as high-performance automotive machinery balances downforce, horsepower, and razor-sharp steering,
                modern web applications demand seamless synchronization between WebGL shaders, responsive React states,
                and resilient backend microservices. I engineer solutions that are mathematically refined, scalable,
                and visually unforgettable.
              </p>

              {/* Core Tenets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/10 hover:border-cyan-400/50 transition-colors">
                  <div className="font-orbitron font-bold text-xs text-cyan-300 mb-1">
                    [ 01 // ARCHITECTURAL PURITY ]
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    Clean, modular components, strict separation of concerns, and zero unnecessary re-renders.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-violet-500/20 bg-violet-950/10 hover:border-violet-400/50 transition-colors">
                  <div className="font-orbitron font-bold text-xs text-violet-300 mb-1">
                    [ 02 // WEBGL MASTERY ]
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    Procedural terrain generation, particle physics, custom materials, and buttery 60 FPS loops.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-950/10 hover:border-sky-400/50 transition-colors">
                  <div className="font-orbitron font-bold text-xs text-sky-300 mb-1">
                    [ 03 // FULL-STACK FLUIDITY ]
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    Express.js REST APIs, robust authentication, SQLite databases, and asynchronous execution.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-400/50 transition-colors">
                  <div className="font-orbitron font-bold text-xs text-emerald-300 mb-1">
                    [ 04 // PASSION FOR SPEED ]
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    Aerodynamic UX, instant feedback, tactile sound synthesis, and hyper-responsive interactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
