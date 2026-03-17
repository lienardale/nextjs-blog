'use client';

import {createContext, useContext, useEffect, useState, type ReactNode} from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({theme: 'light', toggleTheme: () => {}});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({children}: {children: ReactNode}) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ?? (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  // Prevent flash — render children immediately but context updates after mount
  return (
    <ThemeContext.Provider value={{theme: mounted ? theme : 'light', toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}
