// @vitest-environment jsdom

/**
 * ThemeToggle — unit tests
 *
 * Coverage:
 *  - Renders three buttons: Light, Dark, Auto
 *  - Marks the active theme button with aria-pressed="true"
 *  - Calls setTheme with the correct value on button click
 *  - Unmarked buttons have aria-pressed="false"
 */

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeToggle } from './ThemeToggle';

// ── Mock useStorefrontTheme ────────────────────────────────────────────────

const mockSetTheme = vi.fn();
let mockTheme = 'auto';

vi.mock('@/hooks/useStorefrontTheme', () => ({
  useStorefrontTheme: () => ({
    theme: mockTheme,
    resolvedTheme: mockTheme === 'auto' ? 'dark' : mockTheme,
    setTheme: mockSetTheme,
  }),
}));

// ── Setup / teardown ───────────────────────────────────────────────────────

beforeEach(() => {
  mockTheme = 'auto';
  mockSetTheme.mockClear();
});

afterEach(() => {
  cleanup();
});

// ── Tests ──────────────────────────────────────────────────────────────────

describe('ThemeToggle', () => {
  describe('rendering', () => {
    it('renders three theme buttons', () => {
      render(<ThemeToggle />);
      expect(screen.getByRole('button', { name: /light theme/i })).toBeTruthy();
      expect(screen.getByRole('button', { name: /dark theme/i })).toBeTruthy();
      expect(screen.getByRole('button', { name: /auto theme/i })).toBeTruthy();
    });

    it('wraps buttons in a group with accessible label', () => {
      render(<ThemeToggle />);
      const group = screen.getByRole('group', { name: /color theme/i });
      expect(group).toBeTruthy();
    });
  });

  describe('active state', () => {
    it('marks the active theme button with aria-pressed="true"', () => {
      mockTheme = 'auto';
      render(<ThemeToggle />);
      const autoBtn = screen.getByRole('button', { name: /auto theme/i });
      expect(autoBtn.getAttribute('aria-pressed')).toBe('true');
    });

    it('marks inactive buttons with aria-pressed="false"', () => {
      mockTheme = 'auto';
      render(<ThemeToggle />);
      const lightBtn = screen.getByRole('button', { name: /light theme/i });
      const darkBtn = screen.getByRole('button', { name: /dark theme/i });
      expect(lightBtn.getAttribute('aria-pressed')).toBe('false');
      expect(darkBtn.getAttribute('aria-pressed')).toBe('false');
    });

    it('marks light button active when theme is light', () => {
      mockTheme = 'light';
      render(<ThemeToggle />);
      const lightBtn = screen.getByRole('button', { name: /light theme/i });
      expect(lightBtn.getAttribute('aria-pressed')).toBe('true');
    });

    it('marks dark button active when theme is dark', () => {
      mockTheme = 'dark';
      render(<ThemeToggle />);
      const darkBtn = screen.getByRole('button', { name: /dark theme/i });
      expect(darkBtn.getAttribute('aria-pressed')).toBe('true');
    });
  });

  describe('interaction', () => {
    it('calls setTheme("light") when light button is clicked', () => {
      render(<ThemeToggle />);
      screen.getByRole('button', { name: /light theme/i }).click();
      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('calls setTheme("dark") when dark button is clicked', () => {
      render(<ThemeToggle />);
      screen.getByRole('button', { name: /dark theme/i }).click();
      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('calls setTheme("auto") when auto button is clicked', () => {
      render(<ThemeToggle />);
      screen.getByRole('button', { name: /auto theme/i }).click();
      expect(mockSetTheme).toHaveBeenCalledWith('auto');
    });
  });
});
