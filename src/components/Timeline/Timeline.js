import React from 'react';
import { soundFx } from '../../utils/audio';

const Timeline = () => {
  const educationAndExperience = [
    {
      period: 'JUN 2022 — JUN 2025',
      title: 'B.SC. COMPUTER SCIENCE',
      institution: "BHAVAN'S VIVEKANANDA COLLEGE, HYDERABAD",
      domain: '// HIGHER EDUCATION // COMPUTER SCIENCE',
      description:
        "Comprehensive foundations in Computer Science, Data Structures, Algorithms, Object-Oriented Programming, and Web Development. Strong focus on computational logic, operating systems, and software engineering.",
      tags: ['Data Structures', 'OOP', 'Algorithms', 'Computer Systems', 'Web Tech'],
      status: 'VERIFIED_DEGREE',
    },
    {
      period: '2021 — PRESENT',
      title: 'TECHNICAL EXPLORER & SYSTEM TINKERING',
      institution: 'PERSONAL INITIATIVE // HYDERABAD',
      domain: '// SYSTEM ARCHITECTURE & OPTIMIZATION',
      description:
        'Executed root-level system customization, custom kernel configurations, low-level deployment troubleshooting, and high-precision technical optimization under strict performance parameters.',
      tags: ['System Architecture', 'Kernel Optimization', 'Performance Tuning'],
      status: 'ACTIVE_PRACTICE',
    },
    {
      period: 'JUN 2020 — JUL 2022',
      title: 'INTERMEDIATE (MPC — MATHS, PHYSICS, CHEMISTRY)',
      institution: 'ADARSH JUNIOR COLLEGE, ECIL, HYDERABAD',
      domain: '// HIGHER SECONDARY SCIENCES',
      description:
        'Rigorous analytical foundations in higher mathematics, classical mechanics, physics, and computational problem solving.',
      tags: ['Mathematics', 'Physics', 'Analytical Problem Solving'],
      status: 'COMPLETED',
    },
    {
      period: 'JUN 2019 — JUN 2020',
      title: 'SECONDARY SCHOOL CERTIFICATE (SSC)',
      institution: 'GEETANJALI HIGH SCHOOL, BALAJI NAGAR, YAPRAL',
      domain: '// SECONDARY EDUCATION',
      description:
        'Core academic fundamentals with distinguished focus on sciences and mathematics.',
      tags: ['Foundational Science', 'Mathematics'],
      status: 'COMPLETED',
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
            EDUCATION <span className="text-violet-400">&amp; EXPERIENCE</span>
          </h2>
          <p className="font-mono text-xs text-slate-400 mt-2">
            [ ACADEMIC FOUNDATIONS &amp; TECHNICAL MILESTONES // HYDERABAD, INDIA ]
          </p>
        </div>

        {/* Central Energy Beam Timeline */}
        <div className="relative border-l-2 border-violet-500/30 ml-4 sm:ml-36 pl-6 sm:pl-10 space-y-12">
          {educationAndExperience.map((item) => (
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
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[10px] text-violet-400 tracking-wider">
                    {item.domain}
                  </span>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-violet-950/50 border border-violet-500/30 text-violet-300">
                    {item.status}
                  </span>
                </div>

                <h3 className="font-orbitron font-bold text-lg text-white mb-1">
                  {item.title}
                </h3>
                <div className="font-mono text-xs text-cyan-300 mb-3">
                  {item.institution}
                </div>

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
