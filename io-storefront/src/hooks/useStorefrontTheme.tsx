'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import React from 'react';

export type StorefrontTheme = 'dark' | 'light' | 'auto';

const STORAGE_KEY = 'io-theme';

const ThemeContext = createContext<{
  theme: StorefrontTheme;
  resolvedTheme: 'dark' | 'light';
  setTheme: (t: StorefrontTheme) => void;
}>({
  theme: 'light',
  resolvedTheme: 'light',
  setTheme: () => {},
});

function getSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function StorefrontThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<StorefrontTheme>('light');
  const resolvedTheme: 'dark' | 'light' = theme === 'auto' ? getSystemTheme() : theme;

  // Apply data-theme to <html> and persist to localStorage
  const applyTheme = useCallback((t: StorefrontTheme) => {
    const resolved: 'dark' | 'light' = t === 'auto' ? getSystemTheme() : t;
    document.documentElement.setAttribute('data-theme', resolved);
  }, []);

  // Read persisted preference on mount
  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as StorefrontTheme | null) ?? 'light';
    setThemeState(stored);
    applyTheme(stored);
  }, [applyTheme]);

  const setTheme = useCallback(
    (t: StorefrontTheme) => {
      setThemeState(t);
      localStorage.setItem(STORAGE_KEY, t);
      applyTheme(t);
    },
    [applyTheme],
  );

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useStorefrontTheme() {
  return useContext(ThemeContext);
}
