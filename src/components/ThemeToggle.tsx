'use client';

import { useTheme } from '@/components/ThemeProvider';
import { useEffect, useRef, useState } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const mainTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    return () => {
      if (mainTimer.current) clearTimeout(mainTimer.current);
      if (tickTimer.current) clearInterval(tickTimer.current);
    };
  }, []);

  const stopTimers = () => {
    if (mainTimer.current) { clearTimeout(mainTimer.current); mainTimer.current = null; }
    if (tickTimer.current) { clearInterval(tickTimer.current); tickTimer.current = null; }
  };

  const handleMouseEnter = () => {
    stopTimers();
    setSeconds(0);
    setShowHint(true);

    let count = 0;
    tickTimer.current = setInterval(() => {
      count += 1;
      setSeconds(count);
      if (count >= 5) clearInterval(tickTimer.current!);
    }, 1000);

    mainTimer.current = setTimeout(() => {
      stopTimers();
      setTimeout(() => {
        setShowHint(false);
        setSeconds(0);
        try {
          document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 600);
    }, 5000);
  };

  const handleMouseLeave = () => {
    stopTimers();
    setShowHint(false);
    setSeconds(0);
  };

  // Click — pass button center coords as ripple origin
  const handleClick = () => {
    const rect = btnRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 56;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight - 56;
    toggleTheme(x, y);
  };

  if (!mounted) return null;

  const isTopMode = seconds >= 2;

  const rings = [
    { second: 1, r: 30, opacity: 0.35, width: 1.5 },
    { second: 2, r: 34, opacity: 0.50, width: 1.5 },
    { second: 3, r: 38, opacity: 0.65, width: 2   },
    { second: 4, r: 42, opacity: 0.80, width: 2   },
    { second: 5, r: 46, opacity: 1.00, width: 2.5 },
  ];

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-8 right-8 z-50 group select-none"
      aria-label="Toggle theme"
    >
      {/* Tooltip */}
      <div className={`absolute bottom-full right-1/2 translate-x-1/2 mb-4 pointer-events-none transition-all duration-300 ${
        showHint ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}>
        <div className={`text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg text-center min-w-[110px] transition-all duration-300 ${
          isTopMode ? 'bg-gradient-to-r from-blue-600 to-purple-700' : 'bg-gray-900'
        }`}>
          {seconds === 0 && <span className="text-gray-300">✈️ Fly up in 5s</span>}
          {seconds === 1 && <>✈️ Fly up in <span className="text-blue-300 font-bold">4s</span></>}
          {seconds === 2 && <>✈️ Fly up in <span className="text-blue-300 font-bold">3s</span></>}
          {seconds === 3 && <>✈️ Fly up in <span className="text-yellow-300 font-bold">2s</span></>}
          {seconds === 4 && <>Ascending…🚀 <span className="text-orange-300 font-bold">1s</span></>}
          {seconds >= 5 && <span className="text-green-300 font-bold">Ascending…🚀</span>}
        </div>
        <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent transition-colors duration-300 ${
          isTopMode ? 'border-t-purple-700' : 'border-t-gray-900'
        }`} />
      </div>

      {/* Expanding rings */}
      <svg
        className="absolute pointer-events-none"
        style={{ width: 120, height: 120, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', overflow: 'visible' }}
        viewBox="0 0 120 120"
      >
        {rings.map(({ second, r, opacity, width }) => (
          <circle
            key={second}
            cx="60" cy="60" r={r}
            fill="none"
            stroke={seconds >= 2 ? '#a78bfa' : 'white'}
            strokeWidth={width}
            strokeOpacity={seconds >= second ? opacity : 0}
            style={{ transition: 'stroke-opacity 0.3s ease, stroke 0.4s ease' }}
          />
        ))}
      </svg>

      {/* Main button */}
      <div className={`relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-xl ${
        isTopMode
          ? 'bg-gradient-to-r from-violet-500 to-blue-500 shadow-violet-500/50 hover:shadow-violet-500/60'
          : 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-blue-500/50 hover:shadow-blue-500/60'
      }`}>
        <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-all duration-500 ${
          isTopMode
            ? 'bg-gradient-to-r from-violet-500 to-blue-500'
            : 'bg-gradient-to-r from-blue-500 to-purple-600'
        }`} />

        <div className="relative z-10 w-8 h-8 flex items-center justify-center">
          {/* Theme icon */}
          <span
            className="absolute text-2xl transition-all duration-500"
            style={{
              opacity: isTopMode ? 0 : 1,
              transform: isTopMode ? 'scale(0.3) translateY(8px)' : 'scale(1) translateY(0px)',
            }}
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </span>

          {/* Up arrow */}
          <span
            className="absolute transition-all duration-500"
            style={{
              opacity: isTopMode ? 1 : 0,
              transform: isTopMode ? 'scale(1) translateY(0px)' : 'scale(0.3) translateY(8px)',
            }}
          >
            <svg
              viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              className="w-7 h-7"
              style={{ animation: isTopMode ? 'floatUp 1s ease-in-out infinite' : 'none' }}
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </span>
        </div>

        <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:scale-125 group-hover:border-white/0 transition-all duration-500" />
      </div>

      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-3px); }
        }
        /* View Transition ripple — prevent default cross-fade */
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
      `}</style>
    </button>
  );
}