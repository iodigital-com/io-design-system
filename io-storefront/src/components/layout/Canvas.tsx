'use client';

import React, { type ReactNode, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { useSidebar } from '@/context/SidebarContext';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';

const THEMES = ['light', 'dark', 'auto'] as const;

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="2" y1="4.5" x2="16" y2="4.5" />
      <line x1="2" y1="9" x2="16" y2="9" />
      <line x1="2" y1="13.5" x2="16" y2="13.5" />
    </svg>
  );
}

function IoLogoMark() {
  return (
    <svg
      viewBox="0 0 200 200"
      width="28"
      height="28"
      role="img"
      aria-label="iO logotype"
      style={{ color: 'var(--io-accent, #0000D2)', flexShrink: 0 }}
    >
      <path
        fill="currentColor"
        d="M125.42,78.6c12.61,0,22.86,10.26,22.86,22.86s-10.26,22.86-22.86,22.86s-22.86-10.26-22.86-22.86S112.82,78.6,125.42,78.6 M125.42,55.74c-25.25,0-45.72,20.47-45.72,45.72c0,25.25,20.47,45.72,45.72,45.72c25.25,0,45.72-20.47,45.72-45.72C171.15,76.21,150.68,55.74,125.42,55.74L125.42,55.74z"
      />
      <path
        fill="currentColor"
        d="M54.8,86.94L54.8,86.94l-21.54,48.38l24.26,10.8l10.74-24.13C74.22,108.6,68.19,92.9,54.8,86.94z"
      />
      <path
        fill="currentColor"
        d="M41.34,51.88c-5.96,13.4,0.06,29.09,13.46,35.06l10.8-24.26L41.34,51.88z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function AutoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const THEME_ICONS: Record<typeof THEMES[number], React.ReactElement> = {
  light: <SunIcon />,
  dark: <MoonIcon />,
  auto: <AutoIcon />,
};

/**
 * Canvas — 3-panel layout shell.
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │  Header  (logo · nav toggle · GitHub · theme picker)        │
 * ├──────────────┬──────────────────────────┬──────────────────┤
 * │ sidebar-start│ main                     │ sidebar-end      │
 * │ (nav)        │ (page content)           │ (configurator)   │
 * └──────────────┴──────────────────────────┴──────────────────┘
 *
 * sidebar-end contains a `<div id="io-sidebar-end">` that
 * ConfiguratorControls portals its prop panel into.
 */
export function Canvas({ children }: { children: ReactNode }) {
  const { isSidebarStartOpen, toggleSidebarStart, isSidebarEndOpen } = useSidebar();
  const { theme, setTheme } = useStorefrontTheme();
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="h-screen flex flex-col bg-[var(--io-bg-base)] text-[var(--io-text-primary)]">
      {/* ── Header ──────────────────────────────────────────────── */}
      <header
        className="h-[var(--io-header-height)] shrink-0 z-50 flex items-center justify-between px-5 bg-[var(--io-bg-base)]"
        style={{ borderTop: '3px solid var(--io-color-primary)', boxShadow: '0 1px 0 var(--io-border), 0 2px 8px rgba(0,0,0,0.04)' }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebarStart}
            className="p-1.5 rounded hover:bg-[var(--io-bg-hover)] text-[var(--io-text-secondary)] hover:text-[var(--io-text-primary)] transition-colors cursor-pointer"
            aria-label={isSidebarStartOpen ? 'Close navigation' : 'Open navigation'}
          >
            <MenuIcon />
          </button>
          {/* io Digital wordmark — SVG logotype mark + "Design System" label */}
          <Link href="/" className="flex items-center gap-2 select-none" aria-label="iO Design System home">
            <IoLogoMark />
            <span
              className="text-sm font-light"
              style={{ color: 'var(--io-text-secondary)', letterSpacing: '-0.01em' }}
            >
              Design System
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-1">
          {/* Theme picker — standalone icon-only buttons */}
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              title={t.charAt(0).toUpperCase() + t.slice(1)}
              aria-label={`Set theme: ${t}`}
              aria-pressed={theme === t}
              className={[
                'p-2 rounded-md transition-colors cursor-pointer',
                theme === t
                  ? 'text-[var(--io-text-primary)] bg-[var(--io-bg-raised)]'
                  : 'text-[var(--io-text-secondary)] hover:text-[var(--io-text-primary)] hover:bg-[var(--io-bg-hover)]',
              ].join(' ')}
            >
              {THEME_ICONS[t]}
            </button>
          ))}

          {/* GitHub link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded hover:bg-[var(--io-bg-hover)] text-[var(--io-text-secondary)] hover:text-[var(--io-text-primary)] transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar start */}
        {isSidebarStartOpen && (
          <aside className="w-[var(--io-sidebar-nav-width)] shrink-0 border-r border-[var(--io-border)] overflow-y-auto bg-[var(--io-bg-raised)] flex flex-col">
            <Navigation />
          </aside>
        )}

        {/* Main */}
        <main ref={mainRef} className="flex-1 min-w-0 overflow-y-auto">
          <div className="mx-auto px-8 py-8" style={{ maxWidth: '1224px' }}>
            {children}
          </div>
        </main>

        {/* Sidebar end — visible only on configurator pages */}
        {isSidebarEndOpen && (
          <aside className="w-[var(--io-sidebar-config-width)] shrink-0 border-l border-[var(--io-border)] bg-[var(--io-bg-raised)] flex flex-col overflow-hidden">
            {/* Portal target — ConfiguratorControls renders here via createPortal */}
            <div id="io-sidebar-end" className="flex-1 flex flex-col overflow-hidden" />
          </aside>
        )}
      </div>
    </div>
  );
}
