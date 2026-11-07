import React, { useEffect, useRef } from 'react';

/**
 * SpotlightOverlay
 * Dynamic multi-layer radial gradient spotlight tracking cursor with inertia.
 * Blends naturally into the deep space background and illuminates glassmorphic UI elements.
 */
const SpotlightOverlay = () => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth inertia lerp
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;

      el.style.background = `
        radial-gradient(650px circle at ${curX}px ${curY}px, rgba(0, 240, 255, 0.08), transparent 70%),
        radial-gradient(350px circle at ${curX}px ${curY}px, rgba(139, 0, 255, 0.06), transparent 50%),
        radial-gradient(120px circle at ${curX}px ${curY}px, rgba(56, 189, 248, 0.09), transparent 35%)
      `;
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  );
};

export default React.memo(SpotlightOverlay);
