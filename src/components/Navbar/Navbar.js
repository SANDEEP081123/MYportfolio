import React, { useState, useEffect } from 'react';
import { soundFx } from '../../utils/audio';

const Navbar = ({ quality, setQuality, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: '01 // OVERVIEW', target: 'hero' },
    { label: '02 // ARCHIVE', target: 'about' },
    { label: '03 // MATRIX', target: 'skills' },
    { label: '04 // PROJECTS', target: 'projects' },
    { label: '05 // TIMELINE', target: 'timeline' },
    { label: '06 // CONTACT', target: 'contact' },
  ];

  const handleLinkClick = (target) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAudioToggle = () => {
    const newState = soundFx.toggle();
    setIsAudioActive(newState);
  };

  const handleQualityCycle = () => {
    soundFx.playPulse();
    const modes = ['HIGH', 'MEDIUM', 'LOW'];
    const nextIdx = (modes.indexOf(quality) + 1) % modes.length;
    setQuality(modes[nextIdx]);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-opacity-70 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,240,255,0.08)]'
          : 'py-6 bg-transparent'
      }`}
      style={{
        background: isScrolled
          ? 'rgba(3, 7, 18, 0.75)'
          : 'linear-gradient(to bottom, rgba(3,7,18,0.85) 0%, transparent 100%)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo & Telemetry Indicator */}
        <div
          onClick={() => handleLinkClick('hero')}
          onMouseEnter={() => soundFx.playHover()}
          className="cursor-pointer flex items-center gap-3 group"
          role="button"
          tabIndex={0}
        >
          <div className="w-9 h-9 rounded-lg border border-cyan-400/40 bg-cyan-950/30 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-400 transition-colors">
            <span className="font-orbitron font-extrabold text-cyan-400 text-sm tracking-widest">
              SDP
            </span>
            <div className="absolute inset-0 bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-all" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-bold text-xs tracking-widest text-slate-100">
                SANDEEP
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f0ff]" />
            </div>
            <p className="font-mono text-[10px] text-cyan-400/70 tracking-widest">
              SYSTEM ONLINE
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <button
                key={item.target}
                onClick={() => handleLinkClick(item.target)}
                onMouseEnter={() => soundFx.playHover()}
                className={`text-xs font-mono tracking-wider transition-all duration-200 py-1 px-2.5 rounded relative group ${
                  isActive
                    ? 'text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-cyan-400'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_8px_#00f0ff]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* HUD Controls (Quality + Audio + Mobile Trigger) */}
        <div className="flex items-center gap-3">
          {/* Quality Mode Toggle Button */}
          <button
            onClick={handleQualityCycle}
            onMouseEnter={() => soundFx.playHover()}
            title="Cycle WebGL Render Quality"
            className="px-2.5 py-1 rounded border border-cyan-500/30 bg-black/40 hover:border-cyan-400/70 hover:bg-cyan-950/30 text-[11px] font-mono transition-all text-slate-300 flex items-center gap-1.5"
          >
            <span className="text-slate-400">QUALITY:</span>
            <span
              className={`font-bold ${
                quality === 'HIGH'
                  ? 'text-cyan-400'
                  : quality === 'MEDIUM'
                  ? 'text-yellow-400'
                  : 'text-orange-400'
              }`}
            >
              {quality}
            </span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            onMouseEnter={() => soundFx.playHover()}
            title="Toggle Synthesizer Feedback Sound"
            className="p-1.5 rounded border border-violet-500/30 bg-black/40 hover:border-violet-400/70 hover:bg-violet-950/30 text-[11px] font-mono transition-all text-slate-300 flex items-center gap-1.5"
          >
            <span className="text-slate-400">AUDIO:</span>
            <span
              className={`font-bold ${
                isAudioActive ? 'text-violet-400' : 'text-slate-500'
              }`}
            >
              {isAudioActive ? 'ON' : 'MUTE'}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded border border-slate-700 bg-slate-900/60 text-slate-300"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 pt-4 pb-6 bg-slate-950/95 border-b border-cyan-500/30 backdrop-blur-2xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <button
                key={item.target}
                onClick={() => handleLinkClick(item.target)}
                className="text-left font-mono text-sm py-2 px-3 rounded hover:bg-cyan-950/30 text-slate-300 hover:text-cyan-400"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default React.memo(Navbar);
