// @vitest-environment jsdom

/**
 * useStorefrontTheme / StorefrontThemeProvider — unit tests
 *
 * Coverage:
 *  - Defaults to 'auto' theme on first visit (no localStorage entry)
 *  - Reads persisted theme from localStorage on mount
 *  - setTheme updates state, localStorage, and data-theme attribute
 *  - resolvedTheme is 'dark' when auto + system prefers dark
 *  - resolvedTheme is 'light' when auto + system prefers light
 *  - Explicit 'light' and 'dark' modes resolve directly without OS check
 */

import { cleanup, render, screen, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { StorefrontThemeProvider, useStorefrontTheme } from './useStorefrontTheme';

// ── Helpers ────────────────────────────────────────────────────────────────

function TestConsumer() {
  const { theme, resolvedTheme, setTheme } = useStorefrontTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button type="button" onClick={() => setTheme('light')}>
        set light
      </button>
      <button type="button" onClick={() => setTheme('dark')}>
        set dark
      </button>
      <button type="button" onClick={() => setTheme('auto')}>
        set auto
      </button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <StorefrontThemeProvider>
      <TestConsumer />
    </StorefrontThemeProvider>,
  );
}

// ── matchMedia stub ────────────────────────────────────────────────────────

function makeMatchMediaMock(prefersDark: boolean) {
  return vi.fn().mockImplementation((query: string) => ({
    matches: prefersDark
      ? query === '(prefers-color-scheme: dark)'
      : query === '(prefers-color-scheme: light)',
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// ── localStorage mock ──────────────────────────────────────────────────────

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// ── Setup / teardown ───────────────────────────────────────────────────────

beforeEach(() => {
  localStorageMock.clear();
  document.documentElement.removeAttribute('data-theme');
  // Default: system prefers dark (common storefront default)
  Object.defineProperty(globalThis, 'matchMedia', {
    writable: true,
    configurable: true,
    value: makeMatchMediaMock(true),
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// ── Tests ──────────────────────────────────────────────────────────────────

describe('StorefrontThemeProvider / useStorefrontTheme', () => {
  describe('initial state', () => {
    it('defaults to auto theme when localStorage is empty', () => {
      renderWithProvider();
      expect(screen.getByTestId('theme').textContent).toBe('auto');
    });

    it('reads persisted light theme from localStorage on mount', async () => {
      localStorageMock.setItem('io-theme', 'light');
      renderWithProvider();
      await act(async () => {});
      expect(screen.getByTestId('theme').textContent).toBe('light');
    });

    it('reads persisted dark theme from localStorage on mount', async () => {
      localStorageMock.setItem('io-theme', 'dark');
      renderWithProvider();
      await act(async () => {});
      expect(screen.getByTestId('theme').textContent).toBe('dark');
    });
  });

  describe('setTheme', () => {
    it('updates theme state when setTheme("light") is called', async () => {
      renderWithProvider();
      await act(async () => {
        screen.getByText('set light').click();
      });
      expect(screen.getByTestId('theme').textContent).toBe('light');
    });

    it('persists theme to localStorage when setTheme is called', async () => {
      renderWithProvider();
      await act(async () => {
        screen.getByText('set dark').click();
      });
      expect(localStorageMock.getItem('io-theme')).toBe('dark');
    });

    it('applies data-theme attribute to <html> when setTheme("dark") is called', async () => {
      renderWithProvider();
      await act(async () => {
        screen.getByText('set dark').click();
      });
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('applies data-theme="light" to <html> when setTheme("light") is called', async () => {
      renderWithProvider();
      await act(async () => {
        screen.getByText('set light').click();
      });
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });

  describe('resolvedTheme', () => {
    it('resolves to "dark" for explicit dark mode', async () => {
      renderWithProvider();
      await act(async () => {
        screen.getByText('set dark').click();
      });
      expect(screen.getByTestId('resolved').textContent).toBe('dark');
    });

    it('resolves to "light" for explicit light mode', async () => {
      renderWithProvider();
      await act(async () => {
        screen.getByText('set light').click();
      });
      expect(screen.getByTestId('resolved').textContent).toBe('light');
    });

    it('resolves to "dark" when auto and system prefers dark', () => {
      // matchMedia mock already set to prefersDark=true in beforeEach
      renderWithProvider();
      // resolvedTheme is computed synchronously from current theme ('auto') + matchMedia
      expect(screen.getByTestId('resolved').textContent).toBe('dark');
    });

    it('resolves to "light" when auto and system prefers light', () => {
      Object.defineProperty(globalThis, 'matchMedia', {
        writable: true,
        configurable: true,
        value: makeMatchMediaMock(false),
      });
      renderWithProvider();
      expect(screen.getByTestId('resolved').textContent).toBe('light');
    });
  });
});
