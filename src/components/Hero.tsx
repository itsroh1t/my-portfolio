'use client';

import { useEffect, useRef, useState } from 'react';

interface MeshPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
}

const POINT_COUNT = 80;
const CONNECT_D   = 130;
const MOUSE_D     = 120;
const MOUSE_FORCE = 1.8;

const Hero = () => {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const animRef      = useRef<number>(0);
  const ptsRef       = useRef<MeshPoint[]>([]);
  const scrollYRef   = useRef<number>(0);  // live scroll value for canvas

  // Scroll-driven UI state
  const [scrollProgress, setScrollProgress] = useState(0); // 0 → 1

  // Typing
  const [displayText, setDisplayText] = useState('');
  const roles                          = ['Full Stack Developer', 'Software Engineer', 'Problem Solver'];
  const [roleIndex, setRoleIndex]      = useState(0);
  const [isDeleting, setIsDeleting]    = useState(false);

  // ── Typing effect ──
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentRole.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex(prev => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // ── Scroll listener ──
  useEffect(() => {
    const onScroll = (): void => {
      const sy = window.scrollY;
      const vh = window.innerHeight;
      scrollYRef.current = sy;
      // 0 at top, 1 when scrolled one full viewport
      setScrollProgress(Math.min(sy / vh, 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Geometric Mesh Canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = -9999;
    let mouseY = -9999;

    const onMouseMove = (e: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = (): void => { mouseX = -9999; mouseY = -9999; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const initPoints = (W: number, H: number): MeshPoint[] =>
      Array.from({ length: POINT_COUNT }, (): MeshPoint => {
        const vx = (Math.random() - 0.5) * 0.55;
        const vy = (Math.random() - 0.5) * 0.55;
        return { x: Math.random() * W, y: Math.random() * H, vx, vy, baseVx: vx, baseVy: vy };
      });

    const resize = (): void => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ptsRef.current = initPoints(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = (): void => {
      const W   = canvas.width;
      const H   = canvas.height;
      const pts = ptsRef.current;

      // Scroll progress 0→1 (read from ref — no re-render needed)
      const sp       = Math.min(scrollYRef.current / window.innerHeight, 1);
      // Speed multiplier: scroll se mesh faster + more chaotic
      const speedMul = 1 + sp * 4;
      // Connection distance shrinks as you scroll (mesh breaks apart)
      const connD    = CONNECT_D * (1 - sp * 0.45);
      // Global alpha fades with scroll
      const globalAlpha = 1 - sp * 0.7;

      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = Math.max(globalAlpha, 0.15);

      // Parallax offset — canvas shifts up as user scrolls
      const parallaxY = scrollYRef.current * 0.4;
      ctx.save();
      ctx.translate(0, -parallaxY);

      // ── Edges + triangles ──
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dij = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (dij > connD) continue;
          const alpha = 1 - dij / connD;

          for (let k = j + 1; k < pts.length; k++) {
            const dik = Math.hypot(pts[i].x - pts[k].x, pts[i].y - pts[k].y);
            const djk = Math.hypot(pts[j].x - pts[k].x, pts[j].y - pts[k].y);
            if (dik < connD && djk < connD) {
              const ta = Math.min(1 - dij / connD, 1 - dik / connD, 1 - djk / connD) * 0.06;
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.lineTo(pts[k].x, pts[k].y);
              ctx.closePath();
              ctx.fillStyle = `rgba(99,102,241,${ta})`;
              ctx.fill();
            }
          }

          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(129,140,248,${alpha * 0.45})`;
          ctx.lineWidth   = alpha * 1.2;
          ctx.stroke();
        }
      }

      // ── Dots ──
      for (const p of pts) {
        const dm = Math.hypot(p.x - mouseX, p.y - mouseY);

        if (dm < MOUSE_D) {
          const force = (1 - dm / MOUSE_D) * MOUSE_FORCE;
          const angle = Math.atan2(p.y - mouseY, p.x - mouseX);
          p.vx += Math.cos(angle) * force * 0.08;
          p.vy += Math.sin(angle) * force * 0.08;
        }

        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        // Speed clamped — increases with scroll
        const maxSpeed = 2.5 * speedMul;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > maxSpeed) { p.vx *= maxSpeed / speed; p.vy *= maxSpeed / speed; }

        const nearMouse = dm < MOUSE_D;
        if (nearMouse) {
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10);
          grd.addColorStop(0, 'rgba(167,139,250,0.45)');
          grd.addColorStop(1, 'rgba(167,139,250,0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, nearMouse ? 3 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = nearMouse ? 'rgba(167,139,250,0.95)' : 'rgba(129,140,248,0.7)';
        ctx.fill();

        p.x += p.vx * speedMul;
        p.y += p.vy * speedMul;

        if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx); p.baseVx = Math.abs(p.baseVx); }
        if (p.x > W) { p.x = W; p.vx = -Math.abs(p.vx); p.baseVx = -Math.abs(p.baseVx); }
        if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy); p.baseVy = Math.abs(p.baseVy); }
        if (p.y > H) { p.y = H; p.vy = -Math.abs(p.vy); p.baseVy = -Math.abs(p.baseVy); }
      }

      ctx.restore();
      ctx.globalAlpha = 1;

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ── Derived scroll styles ──
  // Content slides up + fades out as user scrolls
  const contentStyle = {
    opacity:   Math.max(1 - scrollProgress * 1.8, 0),
    transform: `translateY(${-scrollProgress * 60}px)`,
    transition: 'none', // driven by scroll, not CSS transition
  };

  // Scroll indicator fades out quickly
  const scrollIndicatorStyle = {
    opacity: Math.max(1 - scrollProgress * 4, 0),
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Geometric Mesh Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Floating blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        <div
          className="absolute w-96 h-96 bg-blue-500/8 rounded-full blur-3xl -top-48 -left-48 animate-float"
          style={{ transform: `translateY(${scrollProgress * 80}px)` }}
        />
        <div
          className="absolute w-96 h-96 bg-purple-500/8 rounded-full blur-3xl -bottom-48 -right-48 animate-float"
          style={{ animationDelay: '1s', transform: `translateY(${-scrollProgress * 80}px)` }}
        />
      </div>

      {/* Content — parallax fade out on scroll */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
        style={{ zIndex: 10, ...contentStyle }}
      >
        <div className="text-center">

          <div className="mb-4 animate-fade-in">
            <span className="text-blue-400 text-lg font-mono">Hey there! 👋</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 animate-fade-in">
            I'm <span className="gradient-text">Rohit Sharma</span>
          </h1>

          <div className="h-16 mb-8">
            <h2 className="text-2xl sm:text-4xl font-semibold text-gray-300">
              <span className="gradient-text">{displayText}</span>
              <span className="animate-pulse">|</span>
            </h2>
          </div>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Building modern, scalable web applications with clean UI/UX and performance optimization.
            Passionate about AI technologies and converting complex problems into elegant solutions.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <a
              href="#projects"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-blue-500 text-blue-400 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { num: '6+',   label: 'Months Experience' },
              { num: '5+',   label: 'Projects Done'     },
              { num: '10+',  label: 'Technologies'      },
              { num: '100%', label: 'Dedication'        },
            ].map(({ num, label }) => (
              <div key={label} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 glow-border">
                <div className="text-3xl font-bold gradient-text">{num}</div>
                <div className="text-gray-400 text-sm">{label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 10, ...scrollIndicatorStyle }}
      >
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;