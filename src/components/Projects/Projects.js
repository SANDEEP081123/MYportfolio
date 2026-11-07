import React, { useState } from 'react';
import { soundFx } from '../../utils/audio';

const ProjectCard = ({ project, onSelect }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = -((y - centerY) / centerY) * 10;
    const tiltY = ((x - centerX) / centerX) * 10;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundFx.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${
          isHovered ? 1.02 : 1
        }, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.2s ease-out'
          : 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
      }}
      className="group relative rounded-2xl border border-cyan-500/30 bg-slate-950/80 backdrop-blur-xl overflow-hidden hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] transition-all duration-300 flex flex-col justify-between"
    >
      {/* Visual Preview / Header Banner */}
      <div className="relative h-48 overflow-hidden bg-slate-900 border-b border-slate-800">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 group-hover:opacity-70 transition-opacity duration-500`}
        />
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <div className="transform group-hover:scale-105 transition-transform duration-500">
            <span className="font-mono text-[10px] text-cyan-300 tracking-widest uppercase block mb-1">
              {project.category}
            </span>
            <h4 className="font-orbitron font-extrabold text-xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {project.title}
            </h4>
          </div>
        </div>

        {/* Scanline FX */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent pointer-events-none" />

        <div className="absolute top-3 left-3 px-2 py-0.5 rounded font-mono text-[9px] bg-black/60 border border-cyan-400/30 text-cyan-400">
          SYS // {project.codeId}
        </div>

        <div className="absolute top-3 right-3 px-2 py-0.5 rounded font-mono text-[9px] bg-black/60 border border-violet-400/30 text-violet-400">
          DEPLOYED
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/40 border border-cyan-500/20 text-cyan-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => onSelect(project)}
            onMouseEnter={() => soundFx.playHover()}
            className="flex-1 py-2 px-3 rounded-lg font-orbitron font-bold text-xs tracking-wider bg-cyan-400/10 hover:bg-cyan-400 hover:text-slate-900 border border-cyan-400/40 text-cyan-300 transition-all duration-200 text-center flex items-center justify-center gap-1.5"
          >
            <span>INSPECT TELEMETRY</span>
          </button>

          <a
            href="https://github.com/SANDEEP081123"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
            className="p-2 rounded-lg bg-black/40 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="View Code on GitHub"
            aria-label="View Code on GitHub"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      codeId: 'MOD-01',
      title: 'SDP DYNAMIC WEB ENGINE',
      category: 'DYNAMIC WEB PLATFORM',
      gradient: 'from-cyan-900 via-blue-950 to-slate-900',
      description:
        'A reactive multi-section web engine featuring fluid section transitions, dynamic navigation handlers, and responsive Bootstrap 5 architecture.',
      tags: ['JavaScript ES6', 'Bootstrap 5', 'Dynamic DOM', 'Responsive UX'],
      longDetails:
        'Built with an emphasis on instant view transitions and clean event routing. Features unified DOM manipulation routines, high performance rendering, and flexible UI container structures.',
      metrics: {
        Performance: '98/100',
        Architecture: 'Modular',
        Responsiveness: 'Full Viewport',
      },
    },
    {
      codeId: 'MOD-02',
      title: 'FOODMUNCH TASK & TODO ECOSYSTEM',
      category: 'STATE & PERSISTENCE SUITE',
      gradient: 'from-violet-900 via-purple-950 to-slate-900',
      description:
        'An interactive task engine with persistent local storage caching, dynamic element creation, status toggles, and deletion animations.',
      tags: ['JavaScript', 'LocalStorage API', 'DOM Manipulation', 'Event Engine'],
      longDetails:
        'Developed to explore state persistence without backend database round-trips. Incorporates dynamic unique identifier generation, real-time status persistence, and seamless mobile touch ergonomics.',
      metrics: {
        StatePersistence: '100% Client',
        DOMEfficiency: 'Optimized',
        Latency: '< 1ms',
      },
    },
    {
      codeId: 'MOD-03',
      title: 'NODE & SQLITE SECURE REST SUITE',
      category: 'BACKEND & DATABASE API',
      gradient: 'from-blue-900 via-indigo-950 to-slate-900',
      description:
        'Express.js backend providing parameterized relational querying on SQLite, password hashing with Bcrypt, and resilient JSON endpoints.',
      tags: ['Node.js', 'Express', 'SQLite3', 'Bcrypt', 'REST API'],
      longDetails:
        'Features asynchronous route handlers with try/catch failure isolation, secure SQL queries preventing injection, password hashing, and clean endpoint dispatchers for cross-client consumption.',
      metrics: {
        Security: 'Bcrypt Hashed',
        Database: 'SQLite Relational',
        Endpoints: 'Full CRUD',
      },
    },
    {
      codeId: 'MOD-04',
      title: 'PYTHON ALGORITHMIC & OOP SUITE',
      category: 'COMPUTATIONAL ALGORITHMS',
      gradient: 'from-emerald-950 via-teal-950 to-slate-900',
      description:
        'High-efficiency computational scripts featuring Fibonacci sequence generators, object-oriented design patterns, and algorithmic problem solving.',
      tags: ['Python 3', 'Object-Oriented Design', 'Algorithms', 'Recursion'],
      longDetails:
        'Explores clean inheritance hierarchies, class method encapsulation, time-complexity optimizations for algorithmic recursion, and modular Python package imports.',
      metrics: {
        Paradigm: 'Object-Oriented',
        Complexity: 'O(log N) optimized',
        Reliability: 'Defensive Typing',
      },
    },
    {
      codeId: 'MOD-05',
      title: 'SDP AI AUTOMOTIVE FRONTIER',
      category: 'CREATIVE HIGH-VELOCITY WEB',
      gradient: 'from-rose-950 via-slate-900 to-black',
      description:
        'A high-octane automotive-inspired web interface uniting supercar telemetry aesthetics, parallax image reveals, and responsive typography.',
      tags: ['CSS Parallax', 'Scroll Reveals', 'Interactive Telemetry', 'Cyber UI'],
      longDetails:
        'Inspired by the high-speed precision of motorsport engineering. Includes scroll-linked reveal triggers, content-editable live testing hooks, and high-contrast dark aesthetic styling.',
      metrics: {
        Aesthetic: 'Hypercar / Cyberpunk',
        Motion: 'Hardware-Accelerated',
        Design: 'Precision Layout',
      },
    },
  ];

  return (
    <section id="projects" className="relative min-h-screen py-24 px-6 z-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
              {'// SECTION 04'}
            </span>
            <div className="h-[1px] w-12 bg-cyan-500/40" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-wide uppercase">
            PROJECT <span className="text-cyan-400">DISPATCHES</span>
          </h2>
          <p className="font-mono text-xs text-slate-400 mt-2 max-w-xl">
            [ VERIFIED SYSTEMS, BACKEND APIS &amp; INTERACTIVE EXPERIENCES BUILT BY SANDEEP ]
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <ProjectCard
              key={proj.codeId}
              project={proj}
              onSelect={(p) => {
                soundFx.playClick();
                setSelectedProject(p);
              }}
            />
          ))}
        </div>

        {/* Telemetry Modal for Project Details */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-2xl rounded-2xl border border-cyan-400/50 bg-slate-950/95 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyan-500/20">
                <span className="font-mono text-xs text-cyan-400 tracking-widest">
                  SYS TELEMETRY // {selectedProject.codeId}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <h3 className="font-orbitron font-extrabold text-2xl text-white mb-2">
                {selectedProject.title}
              </h3>
              <p className="font-mono text-xs text-cyan-300 mb-4 uppercase">
                {selectedProject.category}
              </p>

              <p className="text-slate-300 font-sans text-sm leading-relaxed mb-6">
                {selectedProject.longDetails}
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6 font-mono text-xs">
                {Object.entries(selectedProject.metrics).map(([key, val]) => (
                  <div
                    key={key}
                    className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center"
                  >
                    <div className="text-[10px] text-slate-500 uppercase">{key}</div>
                    <div className="font-bold text-cyan-400 mt-1">{val}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-lg font-mono text-xs text-slate-400 hover:text-white"
                >
                  CLOSE
                </button>
                <a
                  href="https://github.com/SANDEEP081123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-lg font-orbitron font-bold text-xs bg-cyan-400 text-slate-900 hover:bg-cyan-300 transition-colors"
                >
                  VIEW SOURCE ARCHIVE
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(Projects);
