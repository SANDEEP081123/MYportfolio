import React, { useState } from 'react';
import { soundFx } from '../../utils/audio';

const SkillCard = ({ title, category, icon, skills, accentColor }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = -((y - centerY) / centerY) * 12;
    const tiltY = ((x - centerX) / centerX) * 12;

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

  const isCyan = accentColor === 'cyan';
  const isViolet = accentColor === 'violet';

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
      className={`relative rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300 ${
        isCyan
          ? 'border-cyan-500/30 bg-slate-950/70 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)]'
          : isViolet
          ? 'border-violet-500/30 bg-slate-950/70 hover:border-violet-400 hover:shadow-[0_0_25px_rgba(139,0,255,0.25)]'
          : 'border-sky-500/30 bg-slate-950/70 hover:border-sky-400 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`font-mono text-[10px] tracking-widest uppercase ${
            isCyan ? 'text-cyan-400' : isViolet ? 'text-violet-400' : 'text-sky-400'
          }`}
        >
          {category}
        </span>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
            isCyan
              ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-500/30'
              : isViolet
              ? 'bg-violet-950/40 text-violet-400 border border-violet-500/30'
              : 'bg-sky-950/40 text-sky-400 border border-sky-500/30'
          }`}
        >
          {icon}
        </div>
      </div>

      <h3 className="font-orbitron font-bold text-lg text-white mb-4">{title}</h3>

      {/* Skills Pill List */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className="px-2.5 py-1 rounded-md font-mono text-xs bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
          >
            {skill.name}
          </span>
        ))}
      </div>

      {/* Futuristic Level Bars */}
      <div className="space-y-2 mt-4 pt-4 border-t border-slate-800/80">
        {skills.slice(0, 3).map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>{skill.name}</span>
              <span
                className={
                  isCyan ? 'text-cyan-400' : isViolet ? 'text-violet-400' : 'text-sky-400'
                }
              >
                {skill.level}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  isCyan
                    ? 'bg-gradient-to-r from-cyan-500 to-sky-400 shadow-[0_0_8px_#00f0ff]'
                    : isViolet
                    ? 'bg-gradient-to-r from-violet-500 to-purple-400 shadow-[0_0_8px_#8b00ff]'
                    : 'bg-gradient-to-r from-sky-500 to-blue-400 shadow-[0_0_8px_#38bdf8]'
                }`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: 'FRONTEND ARCHITECTURE',
      category: '// UI & CLIENT COMPOSITING',
      icon: '01',
      accentColor: 'cyan',
      skills: [
        { name: 'React 19', level: 96 },
        { name: 'JavaScript (ES6+)', level: 95 },
        { name: 'HTML5 & Modern CSS3', level: 94 },
        { name: 'Bootstrap 5', level: 90 },
        { name: 'Responsive UI/UX', level: 92 },
        { name: 'State Management', level: 91 },
      ],
    },
    {
      title: 'WEBGL & 3D GRAPHICS',
      category: '// COMPUTATIONAL CREATIVE',
      icon: '02',
      accentColor: 'violet',
      skills: [
        { name: 'Three.js Core', level: 92 },
        { name: 'Particle Systems', level: 90 },
        { name: 'Procedural Meshes', level: 88 },
        { name: 'Lighting & Shaders', level: 86 },
        { name: 'Parallax Physics', level: 94 },
        { name: 'GPU Optimization', level: 89 },
      ],
    },
    {
      title: 'BACKEND & REST ARCHITECTURE',
      category: '// DISTRIBUTED SERVICES',
      icon: '03',
      accentColor: 'cyan',
      skills: [
        { name: 'Node.js', level: 93 },
        { name: 'Express.js', level: 94 },
        { name: 'RESTful API Design', level: 95 },
        { name: 'Bcrypt Encryption', level: 91 },
        { name: 'Middleware Architecture', level: 90 },
        { name: 'Asynchronous Workflows', level: 93 },
      ],
    },
    {
      title: 'SYSTEMS & LANGUAGES',
      category: '// COMPUTATIONAL LOGIC',
      icon: '04',
      accentColor: 'sky',
      skills: [
        { name: 'Python (OOP & Algos)', level: 92 },
        { name: 'Java (AWT & Swing)', level: 88 },
        { name: 'Data Structures', level: 89 },
        { name: 'Object-Oriented Design', level: 93 },
        { name: 'Algorithmic Problem Solving', level: 91 },
      ],
    },
    {
      title: 'DATABASE & DATA PERSISTENCE',
      category: '// RELATIONAL STORAGE',
      icon: '05',
      accentColor: 'violet',
      skills: [
        { name: 'SQLite', level: 94 },
        { name: 'SQL Query Optimization', level: 92 },
        { name: 'Schema Architecture', level: 90 },
        { name: 'Data Integrity & Constraints', level: 91 },
        { name: 'Relational Joins', level: 93 },
      ],
    },
    {
      title: 'TOOLING & DEVOPS SUITE',
      category: '// PIPELINES & WORKFLOWS',
      icon: '06',
      accentColor: 'cyan',
      skills: [
        { name: 'Git Version Control', level: 95 },
        { name: 'GitHub Ecosystem', level: 94 },
        { name: 'Webpack / Toolchains', level: 88 },
        { name: 'Postman API Testing', level: 92 },
        { name: 'Performance Profiling', level: 90 },
      ],
    },
  ];

  return (
    <section id="skills" className="relative min-h-screen py-24 px-6 z-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
              {'// SECTION 03'}
            </span>
            <div className="h-[1px] w-12 bg-cyan-500/40" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-wide uppercase">
            TECHNOLOGY <span className="text-violet-400">MATRIX</span>
          </h2>
          <p className="font-mono text-xs text-slate-400 mt-2 max-w-xl">
            [ MULTI-DISCIPLINARY CAPABILITIES ACROSS GRAPHICS, FRONTEND &amp; BACKEND ]
          </p>
        </div>

        {/* 3D Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <SkillCard key={cat.title} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Skills);
