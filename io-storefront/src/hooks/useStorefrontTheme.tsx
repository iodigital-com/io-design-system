'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type StorefrontTheme = 'dark' | 'light' | 'auto';

const STORAGE_KEY = 'io-theme';

const ThemeContext = createContext<{
  theme: StorefrontTheme;
  resolvedTheme: 'dark' | 'light';
  setTheme: (t: StorefrontTheme) => void;
}>({
  theme: 'auto',
  resolvedTheme: 'light',
  setTheme: () => {},
});

function getSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function StorefrontThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<StorefrontTheme>('auto');
  // Start resolved as 'light' to match server render; updated client-side after mount.
  // getSystemTheme() calls window.matchMedia — undefined in Node.js — so computing it
  // synchronously during render would produce 'light' on server but potentially 'dark'
  // on client, causing a React hydration mismatch (#418) in SyntaxHighlighter output.
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('light');

  // Apply data-theme to <html> and persist to localStorage
  const applyTheme = useCallback((t: StorefrontTheme) => {
    const resolved: 'dark' | 'light' = t === 'auto' ? getSystemTheme() : t;
    document.documentElement.setAttribute('data-theme', resolved);
  }, []);

  // Read persisted preference on mount; fall back to OS preference on first visit
  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as StorefrontTheme | null) ?? 'auto';
    const resolved: 'dark' | 'light' = stored === 'auto' ? getSystemTheme() : stored;
    setThemeState(stored);
    setResolvedTheme(resolved);
    applyTheme(stored);
  }, [applyTheme]);

  const setTheme = useCallback(
    (t: StorefrontTheme) => {
      const resolved: 'dark' | 'light' = t === 'auto' ? getSystemTheme() : t;
      setThemeState(t);
      setResolvedTheme(resolved);
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
