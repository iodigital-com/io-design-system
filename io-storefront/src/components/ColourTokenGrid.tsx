'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────────

type TokenCategory = 'brand' | 'semantic' | 'neutral' | 'focus';
type FilterChip = 'all' | TokenCategory;
type LocalTheme = 'light' | 'dark';

// ── Token registry ─────────────────────────────────────────────────────────────

const COLOUR_TOKENS: Array<{ token: string; name: string; category: TokenCategory }> = [
  // Brand — Primary Blue
  { token: '--io-color-primary',        name: 'Energetic Blue',  category: 'brand' },
  { token: '--io-color-primary-hover',  name: 'Primary Hover',   category: 'brand' },
  { token: '--io-color-primary-active', name: 'Primary Active',  category: 'brand' },
  { token: '--io-color-primary-muted',  name: 'Primary Muted',   category: 'brand' },
  { token: '--io-color-primary-bg',     name: 'Primary BG',      category: 'brand' },
  // Brand — Secondary accents
  { token: '--io-color-orange',         name: 'Orange',          category: 'brand' },
  { token: '--io-color-rouge',          name: 'Rouge',           category: 'brand' },
  { token: '--io-color-yellow',         name: 'Yellow',          category: 'brand' },
  { token: '--io-color-lavendel',       name: 'Lavendel',        category: 'brand' },
  { token: '--io-color-pink',           name: 'Pink',            category: 'brand' },
  // Brand — Base neutrals
  { token: '--io-color-off-white',      name: 'Off White',       category: 'brand' },
  { token: '--io-color-beige',          name: 'Beige',           category: 'brand' },
  { token: '--io-color-calm-beige',     name: 'Calm Beige',      category: 'brand' },
  { token: '--io-color-calm-pink',      name: 'Calm Pink',       category: 'brand' },
  { token: '--io-color-calm-blue',      name: 'Calm Blue',       category: 'brand' },
  { token: '--io-color-calm-green',     name: 'Calm Green',      category: 'brand' },
  { token: '--io-color-antraciet',      name: 'Antraciet',       category: 'brand' },
  { token: '--io-color-white',          name: 'White',           category: 'brand' },
  { token: '--io-color-black',          name: 'Black',           category: 'brand' },
  // Semantic — status colours
  { token: '--io-color-success',        name: 'Success',         category: 'semantic' },
  { token: '--io-color-warning',        name: 'Warning',         category: 'semantic' },
  { token: '--io-color-error',          name: 'Error',           category: 'semantic' },
  { token: '--io-color-error-on-blue',  name: 'Error on Blue',   category: 'semantic' },
  { token: '--io-color-system-blue',    name: 'System Blue',     category: 'semantic' },
  { token: '--io-color-success-soft',   name: 'Success Soft',    category: 'semantic' },
  { token: '--io-color-warning-soft',   name: 'Warning Soft',    category: 'semantic' },
  { token: '--io-color-error-soft',     name: 'Error Soft',      category: 'semantic' },
  // Neutral — greyscale
  { token: '--io-color-grey-1',         name: 'Grey 1',          category: 'neutral' },
  { token: '--io-color-grey-2',         name: 'Grey 2',          category: 'neutral' },
  { token: '--io-color-grey-3',         name: 'Grey 3',          category: 'neutral' },
  { token: '--io-color-grey-4',         name: 'Grey 4',          category: 'neutral' },
  { token: '--io-color-grey-5',         name: 'Grey 5',          category: 'neutral' },
  { token: '--io-color-grey-6',         name: 'Grey 6',          category: 'neutral' },
  // Focus ring
  { token: '--io-focus-inner',          name: 'Focus Inner',     category: 'focus' },
  { token: '--io-focus-outer',          name: 'Focus Outer',     category: 'focus' },
];

// ── WCAG helpers ───────────────────────────────────────────────────────────────

function sRGBtoLinear(c: number): number {
  const n = c / 255;
  return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
}

function relativeLuminance(r: number, g: number, b: number): number {
  return 0.2126 * sRGBtoLinear(r) + 0.7152 * sRGBtoLinear(g) + 0.0722 * sRGBtoLinear(b);
}

function contrastRatio(l1: number, l2: number): number {
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function parseRgb(str: string): { r: number; g: number; b: number; a: number } | null {
  const m = str.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([0-9.]+))?\s*\)/);
  if (!m) return null;
  return { r: +m[1], g: +m[2], b: +m[3], a: m[4] !== undefined ? +m[4] : 1 };
}

function toHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(n => n.toString(16).padStart(2, '0')).join('');
}

// ── SwatchCard ─────────────────────────────────────────────────────────────────

interface ColorInfo {
  display: string;
  contrast: number;
  against: 'white' | 'black';
  level: 'AAA' | 'AA' | 'fail';
}

function SwatchCard({ token, name, localTheme }: { token: string; name: string; localTheme: LocalTheme }) {
  const swatchRef = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState<ColorInfo | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = swatchRef.current;
    if (!el) return;

    const raw = getComputedStyle(el).backgroundColor;
    const parsed = parseRgb(raw);
    if (!parsed) return;

    const { r, g, b, a } = parsed;

    // Blend semi-transparent colours over the contextual background to get the visual luminance
    const bgR = localTheme === 'dark' ? 24 : 255;
    const bgG = localTheme === 'dark' ? 24 : 255;
    const bgB = localTheme === 'dark' ? 24 : 255;
    const blR = Math.round(r * a + bgR * (1 - a));
    const blG = Math.round(g * a + bgG * (1 - a));
    const blB = Math.round(b * a + bgB * (1 - a));

    const display = a < 0.999
      ? `rgba(${r},${g},${b},${parseFloat(a.toFixed(2))})`
      : toHex(r, g, b);

    const lum = relativeLuminance(blR, blG, blB);
    const cw = contrastRatio(1.0, lum);
    const cb = contrastRatio(0.0, lum);
    const [contrast, against] = cw >= cb ? [cw, 'white' as const] : [cb, 'black' as const];
    const level: ColorInfo['level'] = contrast >= 7 ? 'AAA' : contrast >= 4.5 ? 'AA' : 'fail';

    setInfo({ display, contrast, against, level });
  }, [localTheme, token]);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(token).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [token]);

  const levelColor =
    info?.level === 'AAA'
      ? 'var(--io-color-success)'
      : info?.level === 'AA'
      ? 'var(--io-color-primary)'
      : 'var(--io-color-error)';

  return (
    <div
      className="rounded-lg overflow-hidden flex flex-col"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      {/* 128px colour block */}
      <div
        ref={swatchRef}
        style={{ height: 128, background: `var(${token}, #ccc)`, flexShrink: 0 }}
        aria-hidden="true"
      />

      {/* Card body */}
      <div
        className="p-3 flex flex-col gap-1.5 flex-1"
        style={{ borderTop: '1px solid var(--io-border)' }}
      >
        <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--io-text-primary)' }}>
          {name}
        </p>

        <div className="flex items-start gap-1">
          <code
            className="text-xs break-all leading-snug flex-1"
            style={{ color: 'var(--io-accent-text)', fontFamily: 'monospace', background: 'none', border: 'none', padding: 0 }}
          >
            {token}
          </code>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? 'Copied!' : `Copy token ${token}`}
            title={copied ? 'Copied!' : 'Copy CSS custom property name'}
            className="shrink-0 rounded p-0.5"
            style={{
              color: copied ? 'var(--io-color-success)' : 'var(--io-text-muted)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 150ms ease',
            }}
          >
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="5" y="5" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 4V3a1 1 0 011-1h7a1 1 0 011 1v9a1 1 0 01-1 1h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {info && (
          <code
            className="text-xs"
            style={{ color: 'var(--io-text-muted)', fontFamily: 'monospace', background: 'none', border: 'none', padding: 0 }}
          >
            {info.display}
          </code>
        )}

        {info && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold" style={{ color: levelColor }}>
              {info.level === 'fail' ? '✗ Fail' : `✓ ${info.level}`}
            </span>
            <span className="text-xs" style={{ color: 'var(--io-text-muted)' }}>
              {info.contrast.toFixed(2)}:1 on {info.against}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── ColourTokenGrid ────────────────────────────────────────────────────────────

const CHIPS: Array<{ key: FilterChip; label: string }> = [
  { key: 'all',      label: 'All'      },
  { key: 'brand',    label: 'Brand'    },
  { key: 'semantic', label: 'Semantic' },
  { key: 'neutral',  label: 'Neutral'  },
  { key: 'focus',    label: 'Focus'    },
];

export function ColourTokenGrid() {
  const [filter, setFilter] = useState<FilterChip>('all');
  const [localTheme, setLocalTheme] = useState<LocalTheme>('light');

  const tokens = filter === 'all' ? COLOUR_TOKENS : COLOUR_TOKENS.filter(t => t.category === filter);

  return (
    <div data-theme={localTheme}>
      {/* Toolbar: filter chips + theme toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter colour tokens by category">
          {CHIPS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: filter === key ? 'var(--io-color-primary)' : 'var(--io-bg-hover)',
                color: filter === key ? '#ffffff' : 'var(--io-text-secondary)',
                border: `1px solid ${filter === key ? 'transparent' : 'var(--io-border)'}`,
                cursor: 'pointer',
                transition: 'background 150ms ease, color 150ms ease',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setLocalTheme(t => (t === 'light' ? 'dark' : 'light'))}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
          style={{
            background: 'var(--io-bg-hover)',
            color: 'var(--io-text-secondary)',
            border: '1px solid var(--io-border)',
            cursor: 'pointer',
          }}
          aria-label={`Switch swatch preview to ${localTheme === 'light' ? 'dark' : 'light'} theme`}
        >
          {localTheme === 'light' ? (
            <>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M8 1v2M8 13v2M1 8h2M13 8h2M3.1 3.1l1.4 1.4M11.5 11.5l1.4 1.4M11.5 3.1l-1.4 1.4M4.5 11.5l-1.4 1.4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Light
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M14 10.5A7 7 0 015.5 2a6.5 6.5 0 100 12 7 7 0 008.5-3.5z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              Dark
            </>
          )}
        </button>
      </div>

      {/* Swatch card grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {tokens.map(({ token, name }) => (
          <SwatchCard key={token} token={token} name={name} localTheme={localTheme} />
        ))}
      </div>

      {tokens.length === 0 && (
        <p className="text-center py-10 text-sm" style={{ color: 'var(--io-text-muted)' }}>
          No tokens in this category.
        </p>
      )}
    </div>
  );
}
