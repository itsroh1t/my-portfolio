'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (originX?: number, originY?: number) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) setTheme(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme, ready]);

  const toggleTheme = (originX?: number, originY?: number) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // --- Ripple via View Transitions API (Chrome 111+) ---
    const x = originX ?? window.innerWidth - 56;
    const y = originY ?? window.innerHeight - 56;

    // Farthest corner distance = ripple radius
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    if (
      // @ts-ignore
      typeof document.startViewTransition === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      // @ts-ignore
      const transition = document.startViewTransition(() => {
        if (nextTheme === 'light') {
          document.documentElement.classList.add('light');
        } else {
          document.documentElement.classList.remove('light');
        }
        localStorage.setItem('theme', nextTheme);
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          { clipPath: nextTheme === 'light' ? clipPath : [...clipPath].reverse() },
          {
            duration: 600,
            easing: 'ease-in-out',
            pseudoElement:
              nextTheme === 'light'
                ? '::view-transition-new(root)'
                : '::view-transition-old(root)',
          }
        );
      });
    } else {
      // Fallback — no View Transitions support
      setTheme(nextTheme);
    }
  };

  if (!ready) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('ThemeProvider missing');
  return ctx;
}