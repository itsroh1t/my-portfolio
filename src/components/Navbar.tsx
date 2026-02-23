'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating,      setIsAnimating]      = useState(false);
  const [isLight,          setIsLight]          = useState(false); // track theme

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect light/dark mode from html class
  useEffect(() => {
    const check = () => setIsLight(document.documentElement.classList.contains('light'));

    check(); // initial check

    // Watch for class changes (when user toggles theme)
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 350);
    setIsMobileMenuOpen(prev => !prev);
  };

  const navLinks = [
    { name: 'Home',       href: '#home'       },
    { name: 'About',      href: '#about'      },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects',   href: '#projects'   },
    { name: 'Skills',     href: '#skills'     },
    { name: 'Contact',    href: '#contact'    },
  ];

  return (
    <>
      <style>{`
        /* ── Hamburger ── */
        @keyframes btnPop {
          0%   { transform: scale(1);    }
          30%  { transform: scale(0.82); }
          65%  { transform: scale(1.18); }
          85%  { transform: scale(0.95); }
          100% { transform: scale(1);    }
        }
        @keyframes glowPulse {
          0%   { box-shadow: 0 0 0px  rgba(99,102,241,0);    }
          50%  { box-shadow: 0 0 18px rgba(99,102,241,0.55); }
          100% { box-shadow: 0 0 0px  rgba(99,102,241,0);    }
        }
        .btn-pop  { animation: btnPop    0.35s cubic-bezier(0.36,0.07,0.19,0.97); }
        .btn-glow { animation: glowPulse 0.35s ease-out; }

        .bar { display:block; height:2px; border-radius:4px; background:white; transform-origin:center; }
        .bar-top { transition: transform 0.38s cubic-bezier(0.68,-0.55,0.27,1.55), width 0.25s ease; }
        .bar-mid { transition: opacity 0.18s ease, transform 0.25s ease, width 0.28s ease 0.05s; }
        .bar-bot { transition: transform 0.38s cubic-bezier(0.68,-0.55,0.27,1.55), width 0.25s ease 0.04s; }
        .bar-top-closed { transform: translateY(0)    rotate(0deg);    width: 20px; }
        .bar-mid-closed { opacity: 1; transform: scaleX(1);            width: 14px; }
        .bar-bot-closed { transform: translateY(0)    rotate(0deg);    width: 20px; }
        .bar-top-open   { transform: translateY(7px)  rotate(225deg);  width: 20px; }
        .bar-mid-open   { opacity: 0; transform: scaleX(0); }
        .bar-bot-open   { transform: translateY(-7px) rotate(-225deg); width: 20px; }

        /* ── Logo image ── */
        @keyframes logoShine {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%)  skewX(-15deg); }
        }
        @keyframes logoPulse {
          0%,100% { filter: drop-shadow(0 0 3px rgba(200,200,220,0.3)); }
          50%     { filter: drop-shadow(0 0 8px rgba(200,200,220,0.7)); }
        }
        @keyframes logoHoverPop {
          0%   { transform: scale(1);    }
          40%  { transform: scale(1.08); }
          70%  { transform: scale(0.97); }
          100% { transform: scale(1);    }
        }
        .logo-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 6px;
          animation: logoPulse 3s ease-in-out infinite;
          transition: transform 0.3s ease;
        }
        .logo-wrap:hover {
          animation: logoHoverPop 0.4s ease forwards, logoPulse 3s ease-in-out infinite;
        }
        .logo-wrap::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%);
          transform: translateX(-100%) skewX(-15deg);
          pointer-events: none;
        }
        .logo-wrap:hover::after {
          animation: logoShine 0.7s ease forwards;
        }

        /* ── Logo text — DARK mode (default) ── */
        @keyframes shimmerDark {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .logo-text-dark {
          background: linear-gradient(
            90deg,
            #e2e8f0 0%,
            #ffffff 30%,
            #94a3b8 50%,
            #ffffff 70%,
            #e2e8f0 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerDark 4s linear infinite;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 0.05em;
        }

        /* ── Logo text — LIGHT mode ── */
        @keyframes shimmerLight {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .logo-text-light {
          background: linear-gradient(
            90deg,
            #1e3a5f 0%,
            #0f172a 25%,
            #1d4ed8 50%,
            #0f172a 75%,
            #1e3a5f 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerLight 4s linear infinite;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 0.05em;
        }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-blue-500/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link href="#home" className="flex items-center space-x-3 group">
              <div className="logo-wrap w-16 h-20">
                <Image
                  src="/logo.jpg"
                  alt="Rohit Logo"
                  width={64}
                  height={80}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>

              {/* Text — switches class based on theme */}
              <span className={`hidden sm:block ${isLight ? 'logo-text-light' : 'logo-text-dark'}`}>
                Rohit Sharma
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500/10"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* ── Hamburger ── */}
            <button
              onClick={handleToggle}
              aria-label="Toggle menu"
              className={`
                md:hidden relative w-10 h-10 rounded-xl flex items-center justify-center
                focus:outline-none select-none transition-colors duration-200
                ${isMobileMenuOpen ? 'bg-indigo-500/20 hover:bg-indigo-500/30' : 'hover:bg-white/10'}
                ${isAnimating ? 'btn-pop btn-glow' : ''}
              `}
            >
              <span
                className="absolute inset-0 rounded-xl transition-opacity duration-300"
                style={{
                  opacity:    isMobileMenuOpen ? 1 : 0,
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.25))',
                  border:     '1px solid rgba(139,92,246,0.35)',
                }}
              />
              <div className="relative flex flex-col justify-between" style={{ width: 20, height: 14 }}>
                <span className={`bar bar-top ${isMobileMenuOpen ? 'bar-top-open' : 'bar-top-closed'}`} />
                <span className={`bar bar-mid ${isMobileMenuOpen ? 'bar-mid-open' : 'bar-mid-closed'}`} />
                <span className={`bar bar-bot ${isMobileMenuOpen ? 'bar-bot-open' : 'bar-bot-closed'}`} />
              </div>
            </button>

          </div>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-all duration-300"
        style={{ opacity: isMobileMenuOpen ? 1 : 0, pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Slide-down panel */}
      <div
        className="fixed top-16 left-0 right-0 z-40 md:hidden overflow-hidden"
        style={{ maxHeight: isMobileMenuOpen ? '420px' : '0px', transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div className="bg-gray-900/98 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40 px-4 pt-3 pb-5">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-blue-500/10 transition-all duration-200 group"
              style={{
                opacity:    isMobileMenuOpen ? 1 : 0,
                transform:  isMobileMenuOpen ? 'translateX(0)' : 'translateX(-16px)',
                transition: `opacity 0.3s ease ${i * 50 + 150}ms, transform 0.3s ease ${i * 50 + 150}ms, background 0.2s, color 0.2s`,
              }}
            >
              <span className="text-xs font-mono text-blue-500/60 group-hover:text-blue-400 w-5 transition-colors">
                0{i + 1}
              </span>
              <span className="font-medium">{link.name}</span>
              <svg
                className="ml-auto w-4 h-4 text-white/20 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}

          <div
            className="mt-4 pt-4 border-t border-white/10"
            style={{ opacity: isMobileMenuOpen ? 1 : 0, transition: 'opacity 0.3s ease 450ms' }}
          >
            <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;