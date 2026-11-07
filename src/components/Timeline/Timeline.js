import React from 'react';
import { soundFx } from '../../utils/audio';

const Timeline = () => {
  const milestones = [
    {
      period: '2024 — PRESENT',
      title: 'FULL-STACK & 3D INTERACTIVE ENGINEERING',
      domain: '// ADVANCED WEB ARCHITECTURE & WEBGL',
      description:
        'Architecting reactive frontends with React 19, building custom WebGL particle & terrain shaders with Three.js, and deploying resilient Node.js / SQLite backend microservices with robust Bcrypt security.',
      tags: ['React 19', 'Three.js', 'Express', 'SQLite', 'Web Audio API'],
      status: 'ACTIVE_NODE',
    },
    {
      period: '2023 — 2024',
      title: 'FOUNDATIONS OF COMPUTING & SYSTEMS PROGRAMMING',
      domain: '// OBJECT-ORIENTED DESIGN & ALGORITHMS',
      description:
        'Deep study and implementation of data structures, algorithmic complexity analysis, Python modular scripting, and Java AWT / Swing desktop interface architectures.',
      tags: ['Python OOP', 'Java AWT/Swing', 'Algorithms', 'Data Structures'],
      status: 'COMPLETED_NODE',
    },
    {
      period: '2022 — 2023',
      title: 'CORE WEB TECHNOLOGIES & RESPONSIVE SYSTEMS',
      domain: '// CLIENT-SIDE COMPUTING',
      description:
        'Engineered responsive web applications using semantic HTML5, modern CSS3 styling frameworks (Bootstrap 5), and vanilla JavaScript asynchronous event engines.',
      tags: ['JavaScript ES6+', 'HTML5', 'CSS3', 'Bootstrap 5', 'DOM APIs'],
      status: 'VERIFIED_NODE',
    },
  ];

  return (
    <section id="timeline" className="relative min-h-screen py-24 px-6 z-20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="font-mono text-xs text-violet-400 tracking-widest uppercase">
              {'// SECTION 05'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-wide uppercase">
            CHRONOLOGICAL <span className="text-violet-400">VECTOR</span>
          </h2>
          <p className="font-mono text-xs text-slate-400 mt-2">
            [ PROGRESSION IN FULL-STACK, SYSTEMS, &amp; GRAPHICAL COMPUTING ]
          </p>
        </div>

        {/* Central Energy Beam Timeline */}
        <div className="relative border-l-2 border-violet-500/30 ml-4 sm:ml-32 pl-6 sm:pl-10 space-y-12">
          {milestones.map((item, idx) => (
            <div
              key={item.title}
              onMouseEnter={() => soundFx.playHover()}
              className="relative group"
            >
              {/* Glowing Pulse Node on the timeline beam */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_12px_#00f0ff] group-hover:scale-125 transition-transform flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>

              {/* Timestamp Indicator */}
              <div className="sm:absolute sm:-left-36 sm:top-1 font-mono text-xs font-bold text-cyan-400 mb-2 sm:mb-0">
                {item.period}
              </div>

              {/* Glass Milestone Card */}
              <div className="rounded-2xl border border-violet-500/25 bg-slate-950/70 backdrop-blur-xl p-6 hover:border-violet-400/60 hover:shadow-[0_0_25px_rgba(139,0,255,0.2)] transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-violet-400 tracking-wider">
                    {item.domain}
                  </span>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-violet-950/50 border border-violet-500/30 text-violet-300">
                    {item.status}
                  </span>
                </div>

                <h3 className="font-orbitron font-bold text-lg text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/40 border border-slate-800 text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Timeline);
