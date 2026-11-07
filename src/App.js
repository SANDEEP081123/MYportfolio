import React, { useState, useEffect } from 'react';
import './App.css';
import InteractiveUniverse from './components/ThreeCanvas/InteractiveUniverse';
import NeonCursor from './components/NeonCursor/NeonCursor';
import SpotlightOverlay from './components/NeonCursor/SpotlightOverlay';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Timeline from './components/Timeline/Timeline';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  const [quality, setQuality] = useState('HIGH');
  const [activeSection, setActiveSection] = useState('hero');

  // Active section observer for dynamic HUD tracking
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'timeline', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      {/* 1. Global Interactive WebGL Background (Living Galaxy, Terrain, Glass World, Parallax) */}
      <InteractiveUniverse quality={quality} />

      {/* 2. Dynamic Radial Spotlight Overlay */}
      <SpotlightOverlay />

      {/* 3. Neon Cursor & Velocity Particle Trail */}
      <NeonCursor />

      {/* 4. Top HUD Navigation */}
      <Navbar
        quality={quality}
        setQuality={setQuality}
        activeSection={activeSection}
      />

      {/* 5. Main Foreground Interactive Sections */}
      <main className="relative z-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      {/* 6. System Footer */}
      <Footer />
    </div>
  );
}

export default App;
