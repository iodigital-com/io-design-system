'use client';

import { type ReactElement } from 'react';

import { useStorefrontTheme, type StorefrontTheme } from '@/hooks/useStorefrontTheme';

// ── Icons ──────────────────────────────────────────────────────────────────

function SunIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function AutoIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// ── Constants ──────────────────────────────────────────────────────────────

const THEMES = ['light', 'dark', 'auto'] as const;

const THEME_LABELS: Record<StorefrontTheme, string> = {
  light: 'Light',
  dark: 'Dark',
  auto: 'Auto',
};

const THEME_ICONS: Record<StorefrontTheme, ReactElement> = {
  light: <SunIcon />,
  dark: <MoonIcon />,
  auto: <AutoIcon />,
};

// ── Component ──────────────────────────────────────────────────────────────

/**
 * ThemeToggle — a 3-button segmented control for light / dark / auto theme.
 *
 * Reads and writes through `useStorefrontTheme` (localStorage + `data-theme`).
 * Designed to sit in the storefront header alongside other action controls.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useStorefrontTheme();

  return (
    <div
      role="group"
      aria-label="Color theme"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: '3px',
        borderRadius: '8px',
        background: 'var(--io-bg-raised)',
        border: '1px solid var(--io-border)',
      }}
    >
      {THEMES.map((mode) => {
        const isActive = theme === mode;
        return (
          <button
            key={mode}
            type="button"
            onClick={() => setTheme(mode)}
            aria-pressed={isActive}
            aria-label={`${THEME_LABELS[mode]} theme`}
            title={`${THEME_LABELS[mode]} theme`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 200ms ease, color 200ms ease',
              background: isActive ? 'var(--io-accent-bg)' : 'transparent',
              color: isActive ? 'var(--io-color-primary)' : 'var(--io-text-muted)',
            }}
          >
            {THEME_ICONS[mode]}
          </button>
        );
      })}
    </div>
  );
}
