import React, { useEffect, useRef, useState } from 'react';

/**
 * NeonCursor
 * High-performance canvas-based particle trail with:
 * - Glowing electric cyan/violet neon cursor
 * - Velocity-reactive particle emission
 * - Animated click shockwave burst
 * - Interactive hover magnetic feedback
 * - Automatic disable on touch-only mobile devices
 */
const NeonCursor = () => {
  const canvasRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    ) {
      setIsTouchDevice(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Cursor state
    let mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      vx: 0,
      vy: 0,
      speed: 0,
      isHovered: false,
      isClicking: false,
    };

    // Particle pool
    const particles = [];
    const maxParticles = 120;
    const shockwaves = [];

    class Particle {
      constructor(x, y, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.size = Math.random() * 3.5 + 1.5;
        this.life = 1.0;
        this.decay = Math.random() * 0.03 + 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.size *= 0.96;
        this.life -= this.decay;
      }

      draw(c) {
        c.save();
        c.globalAlpha = Math.max(0, this.life);
        c.fillStyle = this.color;
        c.shadowColor = this.color;
        c.shadowBlur = 10;
        c.beginPath();
        c.arc(this.x, this.y, Math.max(0.5, this.size), 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    class Shockwave {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.maxRadius = 55;
        this.opacity = 0.9;
      }

      update() {
        this.radius += 3.2;
        this.opacity = Math.max(0, 1 - this.radius / this.maxRadius);
      }

      draw(c) {
        c.save();
        c.globalAlpha = this.opacity;
        c.strokeStyle = '#00f0ff';
        c.shadowColor = '#8b00ff';
        c.shadowBlur = 15;
        c.lineWidth = 2.5;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.stroke();
        c.restore();
      }
    }

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      // Check hover state on interactive targets
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.interactive-hover') ||
        target.closest('[role="button"]')
      ) {
        mouse.isHovered = true;
      } else {
        mouse.isHovered = false;
      }
    };

    const handleMouseDown = (e) => {
      mouse.isClicking = true;
      shockwaves.push(new Shockwave(e.clientX, e.clientY));

      // Burst of spark particles on click
      for (let i = 0; i < 18; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        const color = i % 2 === 0 ? '#00f0ff' : '#8b00ff';
        particles.push(
          new Particle(
            e.clientX,
            e.clientY,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            color
          )
        );
      }
    };

    const handleMouseUp = () => {
      mouse.isClicking = false;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('resize', handleResize);

    let animationId;
    let lastX = width / 2;
    let lastY = height / 2;

    const render = () => {
      animationId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // Inertial smoothing (Lerp)
      const lerpSpeed = mouse.isHovered ? 0.28 : 0.22;
      mouse.x += (mouse.targetX - mouse.x) * lerpSpeed;
      mouse.y += (mouse.targetY - mouse.y) * lerpSpeed;

      // Calculate instantaneous velocity
      const dx = mouse.x - lastX;
      const dy = mouse.y - lastY;
      mouse.speed = Math.hypot(dx, dy);
      lastX = mouse.x;
      lastY = mouse.y;

      // Emit particles based on velocity
      const emissionCount = Math.min(Math.floor(mouse.speed * 0.45) + (mouse.speed > 2 ? 1 : 0), 6);
      for (let i = 0; i < emissionCount; i++) {
        if (particles.length < maxParticles) {
          const spread = 4;
          const px = mouse.x + (Math.random() - 0.5) * spread;
          const py = mouse.y + (Math.random() - 0.5) * spread;
          const pvx = -dx * 0.15 + (Math.random() - 0.5) * 1.5;
          const pvy = -dy * 0.15 + (Math.random() - 0.5) * 1.5;
          const pColor = Math.random() > 0.4 ? '#00f0ff' : '#a855f7';
          particles.push(new Particle(px, py, pvx, pvy, pColor));
        }
      }

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0 || p.size <= 0.4) {
          particles.splice(i, 1);
        }
      }

      // Update & draw click shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.update();
        sw.draw(ctx);
        if (sw.radius >= sw.maxRadius) {
          shockwaves.splice(s, 1);
        }
      }

      // Draw Outer Neon Ring
      ctx.save();
      const ringRadius = mouse.isHovered ? 24 : mouse.isClicking ? 10 : 16;
      ctx.strokeStyle = mouse.isHovered ? '#8b00ff' : '#00f0ff';
      ctx.shadowColor = mouse.isHovered ? '#8b00ff' : '#00f0ff';
      ctx.shadowBlur = mouse.isHovered ? 18 : 12;
      ctx.lineWidth = mouse.isHovered ? 2.0 : 1.5;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, ringRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Outer micro-crosshairs when hovering
      if (mouse.isHovered) {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
        ctx.lineWidth = 1;
        const arm = 6;
        // North
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y - ringRadius - arm);
        ctx.lineTo(mouse.x, mouse.y - ringRadius + 2);
        ctx.stroke();
        // South
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y + ringRadius - 2);
        ctx.lineTo(mouse.x, mouse.y + ringRadius + arm);
        ctx.stroke();
        // East
        ctx.beginPath();
        ctx.moveTo(mouse.x + ringRadius - 2, mouse.y);
        ctx.lineTo(mouse.x + ringRadius + arm, mouse.y);
        ctx.stroke();
        // West
        ctx.beginPath();
        ctx.moveTo(mouse.x - ringRadius - arm, mouse.y);
        ctx.lineTo(mouse.x - ringRadius + 2, mouse.y);
        ctx.stroke();
      }

      // Inner Core Dot
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, mouse.isHovered ? 4.5 : 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (isTouchDevice) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
};

export default React.memo(NeonCursor);
