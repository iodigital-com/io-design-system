// @vitest-environment jsdom

/**
 * SearchPalette — regression tests
 *
 * Coverage:
 *  - Renders null when closed / renders dialog when open
 *  - Escape key calls onClose and restores focus
 *  - ArrowDown / ArrowUp cycle aria-selected through visible results
 *  - Enter navigates via router.push and saves to localStorage
 *  - Tab wraps focus to last focusable element on Shift+Tab from first
 *  - No results rendered on empty query (recent searches shown instead)
 *
 * All tests use document-level keydown dispatch because the component
 * registers a document.addEventListener handler (not an element handler).
 */

import { cleanup, fireEvent, render, screen, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SearchPalette } from './SearchPalette';

// ── Mocks ──────────────────────────────────────────────────────────────────

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock('next/link', () => ({
  default: ({ href, onClick, className, children }: {
    href: string;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
  }) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  ),
}));

// Provide a predictable sitemap so search results are deterministic.
vi.mock('@/sitemap', () => ({
  sitemap: [
    {
      title: 'Components',
      items: [
        { label: 'Button', href: '/components/io-button' },
        { label: 'Badge', href: '/components/io-badge' },
        { label: 'Modal', href: '/components/io-modal' },
      ],
    },
    {
      title: 'Styles',
      items: [
        { label: 'Colours', href: '/styles/colours' },
      ],
    },
  ],
}));

// ── Helpers ────────────────────────────────────────────────────────────────

function press(key: string, options: Partial<KeyboardEventInit> = {}) {
  fireEvent.keyDown(document, { key, ...options });
}

function typeQuery(query: string) {
  const input = screen.getByRole('combobox');
  fireEvent.change(input, { target: { value: query } });
}

// ── Suite ──────────────────────────────────────────────────────────────────

describe('SearchPalette', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    onClose.mockClear();
    mockPush.mockClear();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  // ── Render contract ──────────────────────────────────────────────────────

  describe('render contract', () => {
    it('returns null when open is false', () => {
      const { container } = render(<SearchPalette open={false} onClose={onClose} />);
      expect(container.firstChild).toBeNull();
    });

    it('renders the dialog when open is true', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      expect(screen.getByRole('dialog')).toBeDefined();
    });

    it('renders the search input when open', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      expect(screen.getByRole('combobox')).toBeDefined();
    });

    it('shows "Start typing to search." when query is empty and no recent searches', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      expect(screen.getByText('Start typing to search.')).toBeDefined();
    });

    it('shows "No results found." for a query that matches nothing', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      typeQuery('zzznomatch');
      expect(screen.getByText('No results found.')).toBeDefined();
    });
  });

  // ── Escape key ───────────────────────────────────────────────────────────

  describe('Escape key', () => {
    it('calls onClose when Escape is pressed', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      press('Escape');
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('restores focus to the previously focused element after close', () => {
      const trigger = document.createElement('button');
      document.body.appendChild(trigger);
      trigger.focus();

      render(<SearchPalette open={true} onClose={onClose} />);

      // Advance the deferred focus() call
      act(() => { vi.runAllTimers(); });

      press('Escape');
      expect(document.activeElement).toBe(trigger);

      document.body.removeChild(trigger);
    });
  });

  // ── ArrowDown / ArrowUp ──────────────────────────────────────────────────

  describe('keyboard navigation (ArrowDown / ArrowUp)', () => {
    it('ArrowDown advances aria-selected to the next result', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      // 'b' matches Button + Badge (and others) — guarantees at least 2 results
      typeQuery('b');

      const initialOptions = screen.getAllByRole('option');
      expect(initialOptions.length).toBeGreaterThanOrEqual(2);
      // Active index starts at 0 — first option is selected
      expect(initialOptions[0].getAttribute('aria-selected')).toBe('true');
      expect(initialOptions[1].getAttribute('aria-selected')).toBe('false');

      press('ArrowDown');

      // After one ArrowDown, active index advances to 1
      const updatedOptions = screen.getAllByRole('option');
      expect(updatedOptions[0].getAttribute('aria-selected')).toBe('false');
      expect(updatedOptions[1].getAttribute('aria-selected')).toBe('true');
    });

    it('ArrowDown wraps to the first result from the last', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      // "b" matches Button, Badge — at least 2 results
      typeQuery('b');

      const options = screen.getAllByRole('option');
      const resultCount = options.length;
      expect(resultCount).toBeGreaterThanOrEqual(2);

      // Navigate to the last result
      for (let i = 0; i < resultCount - 1; i++) {
        press('ArrowDown');
      }
      const lastOptions = screen.getAllByRole('option');
      expect(lastOptions[resultCount - 1].getAttribute('aria-selected')).toBe('true');

      // One more ArrowDown should wrap back to the first
      press('ArrowDown');
      const wrappedOptions = screen.getAllByRole('option');
      expect(wrappedOptions[0].getAttribute('aria-selected')).toBe('true');
    });

    it('ArrowUp wraps to the last result from the first', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      typeQuery('b');

      const options = screen.getAllByRole('option');
      const resultCount = options.length;
      expect(resultCount).toBeGreaterThanOrEqual(2);

      // Index starts at 0; pressing ArrowUp from 0 wraps to last
      press('ArrowUp');
      const wrappedOptions = screen.getAllByRole('option');
      expect(wrappedOptions[resultCount - 1].getAttribute('aria-selected')).toBe('true');
    });

    it('ArrowDown is a no-op when there are no results', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      // Empty query: no filtered results, no recent searches → no options
      expect(screen.queryAllByRole('option').length).toBe(0);
      // Should not throw
      expect(() => press('ArrowDown')).not.toThrow();
    });
  });

  // ── Enter key ────────────────────────────────────────────────────────────

  describe('Enter key', () => {
    it('navigates to the active result href via router.push', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      typeQuery('button');

      press('Enter');

      expect(mockPush).toHaveBeenCalledWith('/components/io-button');
    });

    it('calls onClose after Enter navigation', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      typeQuery('button');

      press('Enter');

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('saves the selected result to localStorage recent searches', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      typeQuery('button');

      press('Enter');

      const raw = localStorage.getItem('io-search-palette-recent');
      expect(raw).not.toBeNull();
      const recents = JSON.parse(raw!);
      expect(Array.isArray(recents)).toBe(true);
      expect(recents[0].href).toBe('/components/io-button');
    });

    it('is a no-op when there are no results', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      typeQuery('zzznomatch');

      press('Enter');

      expect(mockPush).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  // ── Tab focus trap ───────────────────────────────────────────────────────

  describe('Tab focus trap', () => {
    it('wraps focus to the last focusable element on Shift+Tab from the first', () => {
      render(<SearchPalette open={true} onClose={onClose} />);

      act(() => { vi.runAllTimers(); });

      const dialog = screen.getByRole('dialog');

      // Mirror the focusable selector the component's trap uses internally
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      expect(focusable.length).toBeGreaterThan(0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      // Focus the first element, then Shift+Tab must land exactly on the last
      first.focus();
      expect(document.activeElement).toBe(first);

      press('Tab', { shiftKey: true });

      expect(document.activeElement).toBe(last);
    });

    it('wraps focus to the first element on Tab from the last (no results)', () => {
      render(<SearchPalette open={true} onClose={onClose} />);

      act(() => { vi.runAllTimers(); });

      const dialog = screen.getByRole('dialog');
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      expect(focusable.length).toBeGreaterThan(0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      last.focus();
      expect(document.activeElement).toBe(last);

      press('Tab');

      expect(document.activeElement).toBe(first);
    });

    it('wraps focus to the first element on Tab from the last (with results)', () => {
      render(<SearchPalette open={true} onClose={onClose} />);

      act(() => { vi.runAllTimers(); });
      typeQuery('button');

      const dialog = screen.getByRole('dialog');
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      expect(focusable.length).toBeGreaterThan(0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      last.focus();
      press('Tab');

      expect(document.activeElement).toBe(first);
    });
  });

  // ── Mouse interaction ────────────────────────────────────────────────────

  describe('mouse interaction', () => {
    it('mousedown on the outer backdrop calls onClose', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      const backdrop = document.querySelector('[role="presentation"]') as HTMLElement;
      fireEvent.mouseDown(backdrop);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('mousedown on the inner dialog does not call onClose', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      const dialog = screen.getByRole('dialog');
      fireEvent.mouseDown(dialog);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('clicking a search result link calls onClose and saves to recent', () => {
      render(<SearchPalette open={true} onClose={onClose} />);
      typeQuery('button');
      const links = screen.getAllByRole('link');
      fireEvent.click(links[0]);
      expect(onClose).toHaveBeenCalledTimes(1);
      const raw = localStorage.getItem('io-search-palette-recent');
      expect(raw).not.toBeNull();
    });

    it('clicking a recent search link calls onClose', () => {
      const recentData = [{ id: 'component:button', label: 'Button', href: '/components/io-button', type: 'Components' as const }];
      localStorage.setItem('io-search-palette-recent', JSON.stringify(recentData));
      render(<SearchPalette open={true} onClose={onClose} />);
      const links = screen.getAllByRole('link');
      fireEvent.click(links[0]);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  // ── Recent searches ──────────────────────────────────────────────────────

  describe('recent searches', () => {
    it('loads recent searches from localStorage when opened', () => {
      const recentData = [{ id: 'component:button', label: 'Button', href: '/components/io-button', type: 'Components' }];
      localStorage.setItem('io-search-palette-recent', JSON.stringify(recentData));

      render(<SearchPalette open={true} onClose={onClose} />);

      // Recent searches are shown as options under "Recent searches" heading
      expect(screen.getByText('Recent searches')).toBeDefined();
      expect(screen.getByRole('option')).toBeDefined();
    });

    it('shows at most 5 recent searches', () => {
      const recentData = Array.from({ length: 10 }, (_, i) => ({
        id: `component:item${i}`,
        label: `Item ${i}`,
        href: `/components/io-item${i}`,
        type: 'Components' as const,
      }));
      localStorage.setItem('io-search-palette-recent', JSON.stringify(recentData));

      render(<SearchPalette open={true} onClose={onClose} />);

      const options = screen.getAllByRole('option');
      expect(options.length).toBeLessThanOrEqual(5);
    });
  });
});
