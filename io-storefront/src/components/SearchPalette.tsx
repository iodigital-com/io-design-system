'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { sitemap } from '@/sitemap';

type ResultType = 'Components' | 'Design Tokens' | 'Documentation';

type SearchResult = {
  id: string;
  label: string;
  href: string;
  type: ResultType;
};

type SearchPaletteProps = {
  open: boolean;
  onClose: () => void;
};

const RECENT_SEARCHES_KEY = 'io-search-palette-recent';

const SECTION_HEADINGS = [
  'Keyboard interaction',
  'Screen reader behaviour',
  'WCAG 2.2 compliance',
  'Best practices',
  'When to use',
  'Content guidelines',
  'Properties',
  'Events',
  'Methods',
  'Slots',
] as const;

const PROP_NAMES = [
  'activeTab',
  'arrow',
  'arrowPlacement',
  'autocomplete',
  'checked',
  'closeOnBackdrop',
  'color',
  'content',
  'disabled',
  'error',
  'errorMessage',
  'external',
  'fullWidth',
  'heading',
  'helperText',
  'href',
  'indeterminate',
  'label',
  'loading',
  'maxLength',
  'name',
  'open',
  'options',
  'placeholder',
  'placement',
  'rel',
  'removable',
  'required',
  'resize',
  'rows',
  'selected',
  'size',
  'tabs',
  'target',
  'text',
  'type',
  'value',
  'variant',
] as const;

const TOKEN_NAMES = [
  '--io-accent',
  '--io-accent-bg',
  '--io-accent-text',
  '--io-bg-base',
  '--io-bg-card',
  '--io-bg-hover',
  '--io-bg-raised',
  '--io-bg-surface',
  '--io-border',
  '--io-border-focus',
  '--io-color-primary',
  '--io-color-primary-bg',
  '--io-color-success',
  '--io-color-warning',
  '--io-color-error',
  '--io-focus-inner',
  '--io-font-family-base',
  '--io-font-size-base',
  '--io-font-size-lg',
  '--io-font-size-sm',
  '--io-font-weight-regular',
  '--io-font-weight-semibold',
  '--io-header-height',
  '--io-line-height-base',
  '--io-motion-base',
  '--io-motion-fast',
  '--io-motion-slow',
  '--io-space-1',
  '--io-space-2',
  '--io-space-4',
  '--io-space-8',
  '--io-space-12',
  '--io-text-muted',
  '--io-text-primary',
  '--io-text-secondary',
] as const;

function dedupe(results: SearchResult[]): SearchResult[] {
  const seen = new Set<string>();
  return results.filter((result) => {
    const key = `${result.type}::${result.label}::${result.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildSearchIndex(): SearchResult[] {
  const componentItems = sitemap
    .find((section) => section.title === 'Components')
    ?.items.filter((item) => item.label !== 'Introduction')
    .map((item) => ({
      id: `component:${item.label.toLowerCase().replace(/\s+/g, '-')}`,
      label: item.label,
      href: item.href,
      type: 'Components' as const,
    })) ?? [];

  const docPageItems = sitemap.flatMap((section) =>
    section.items.map((item) => ({
      id: `doc-page:${section.title.toLowerCase()}-${item.label.toLowerCase().replace(/\s+/g, '-')}`,
      label: item.label,
      href: item.href,
      type: 'Documentation' as const,
    })),
  );

  const docHeadingItems = SECTION_HEADINGS.map((heading) => ({
    id: `doc-heading:${heading.toLowerCase().replace(/\s+/g, '-')}`,
    label: heading,
    href: '/help',
    type: 'Documentation' as const,
  }));

  const propItems = PROP_NAMES.map((propName) => ({
    id: `prop:${propName.toLowerCase()}`,
    label: propName,
    href: '/components',
    type: 'Documentation' as const,
  }));

  const tokenItems = TOKEN_NAMES.map((tokenName) => ({
    id: `token:${tokenName}`,
    label: tokenName,
    href: '/styles',
    type: 'Design Tokens' as const,
  }));

  return dedupe([...componentItems, ...tokenItems, ...docPageItems, ...docHeadingItems, ...propItems]);
}

const SEARCH_INDEX = buildSearchIndex();

export function SearchPalette({ open, onClose }: SearchPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const listboxId = useId();

  const normalizedQuery = query.trim().toLowerCase();

  const filteredResults = useMemo(() => {
    if (!normalizedQuery) return [];
    return SEARCH_INDEX.filter((entry) => entry.label.toLowerCase().includes(normalizedQuery));
  }, [normalizedQuery]);

  const groupedResults = useMemo(
    () => ({
      Components: filteredResults.filter((entry) => entry.type === 'Components'),
      'Design Tokens': filteredResults.filter((entry) => entry.type === 'Design Tokens'),
      Documentation: filteredResults.filter((entry) => entry.type === 'Documentation'),
    }),
    [filteredResults],
  );

  const visibleResults = normalizedQuery ? filteredResults : recentSearches;
  const activeId = visibleResults[activeIndex]?.id;

  function closePalette() {
    onClose();
    previouslyFocusedRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery('');
    setActiveIndex(0);

    try {
      const raw = window.localStorage.getItem(RECENT_SEARCHES_KEY);
      if (!raw) {
        setRecentSearches([]);
      } else {
        const parsed = JSON.parse(raw) as SearchResult[];
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed.slice(0, 5));
        }
      }
    } catch {
      setRecentSearches([]);
    }

    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closePalette();
        return;
      }

      if (!visibleResults.length) {
        if (event.key === 'Tab') {
          const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
          if (!focusable || focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          const activeElement = document.activeElement;

          if (event.shiftKey && activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % visibleResults.length);
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + visibleResults.length) % visibleResults.length);
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        const active = visibleResults[activeIndex];
        if (!active) return;
        const nextRecent = dedupe([active, ...recentSearches]).slice(0, 5);
        window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(nextRecent));
        closePalette();
        router.push(active.href);
      }

      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const activeElement = document.activeElement;

        if (event.shiftKey && activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, onClose, open, recentSearches, router, visibleResults]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 p-4 sm:p-8" role="presentation" onMouseDown={closePalette}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="mx-auto mt-[8vh] w-full max-w-3xl overflow-hidden rounded-xl border border-[var(--io-border)] bg-[var(--io-bg-base)] shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="border-b border-[var(--io-border)] px-4 py-3">
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls={listboxId}
            aria-activedescendant={activeId}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search components, tokens, and docs..."
            className="w-full rounded-lg border border-[var(--io-border)] bg-[var(--io-bg-raised)] px-3 py-2 text-sm text-[var(--io-text-primary)] placeholder:text-[var(--io-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--io-border-focus)]"
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {normalizedQuery ? (
            <>
              <div id={listboxId} role="listbox" className="space-y-3">
                {(['Components', 'Design Tokens', 'Documentation'] as const).map((group) =>
                  groupedResults[group].length ? (
                    <section key={group} className="mb-3 last:mb-0">
                      <h3 className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--io-text-muted)]">{group}</h3>
                      <ul className="space-y-1">
                        {groupedResults[group].map((result) => {
                          const flatIndex = visibleResults.findIndex((entry) => entry.id === result.id);
                          const active = flatIndex === activeIndex;
                          return (
                            <li key={result.id} id={result.id} role="option" aria-selected={active}>
                              <Link
                                href={result.href}
                                onClick={() => {
                                  const nextRecent = dedupe([result, ...recentSearches]).slice(0, 5);
                                  window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(nextRecent));
                                  closePalette();
                                }}
                                className={[
                                  'flex items-center justify-between rounded-md px-3 py-2 text-sm',
                                  active
                                    ? 'bg-[var(--io-color-primary)] text-white'
                                    : 'text-[var(--io-text-primary)] hover:bg-[var(--io-bg-hover)]',
                                ].join(' ')}
                              >
                                <span>{result.label}</span>
                                <span className={active ? 'text-white/80' : 'text-[var(--io-text-muted)]'}>{result.href}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ) : null,
                )}
              </div>

              {filteredResults.length === 0 && (
                <p className="px-3 py-6 text-sm text-[var(--io-text-secondary)]">No results found.</p>
              )}
            </>
          ) : (
            <section>
              <h3 className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--io-text-muted)]">Recent searches</h3>
              {recentSearches.length ? (
                <ul id={listboxId} role="listbox" className="space-y-1">
                  {recentSearches.map((result, index) => {
                    const active = index === activeIndex;
                    return (
                      <li key={result.id} id={result.id} role="option" aria-selected={active}>
                        <Link
                          href={result.href}
                          onClick={() => closePalette()}
                          className={[
                            'flex items-center justify-between rounded-md px-3 py-2 text-sm',
                            active
                              ? 'bg-[var(--io-color-primary)] text-white'
                              : 'text-[var(--io-text-primary)] hover:bg-[var(--io-bg-hover)]',
                          ].join(' ')}
                        >
                          <span>{result.label}</span>
                          <span className={active ? 'text-white/80' : 'text-[var(--io-text-muted)]'}>{result.type}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="px-3 py-6 text-sm text-[var(--io-text-secondary)]">Start typing to search.</p>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}