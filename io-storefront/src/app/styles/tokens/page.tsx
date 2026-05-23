'use client';

import { useCallback, useRef, useEffect, useState } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import {
  ALL_TOKENS,
  CATEGORY_LABELS,
  TOKEN_CATEGORIES,
  filterTokens,
  isColorToken,
  type TokenCategory,
  type TokenEntry,
} from '@/utils/token-explorer';

// ── Constants ─────────────────────────────────────────────────────────────────

const COPY_RESET_DELAY_MS = 1500;

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="block w-1 h-5 rounded-full shrink-0"
          style={{ background: 'var(--io-accent)' }}
          aria-hidden="true"
        />
        <h2
          className="text-xl font-bold"
          style={{
            color: 'var(--io-text-primary)',
            letterSpacing: 'var(--io-heading-tracking-3, -0.015em)',
          }}
        >
          {title}
        </h2>
      </div>
      <p
        className="ml-3 text-sm"
        style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}
      >
        {description}
      </p>
    </div>
  );
}

function TokenCopyButton({ cssVar }: { cssVar: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    const text = `var(${cssVar})`;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for environments without Clipboard API
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), COPY_RESET_DELAY_MS);
    } catch {
      setCopied(false);
    }
  }, [cssVar]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors cursor-pointer shrink-0"
      style={{
        border: '1px solid var(--io-border)',
        background: 'var(--io-bg-raised)',
        color: copied ? 'var(--io-color-success)' : 'var(--io-text-secondary)',
      }}
      aria-label={`Copy var(${cssVar})`}
    >
      {copied ? (
        <>
          <CheckIcon />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <CopyIcon />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

function CopyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ColorSwatch({ token }: { token: TokenEntry }) {
  return (
    <div
      className="rounded shrink-0"
      style={{
        width: 32,
        height: 32,
        background: `var(${token.cssVar})`,
        border: '1px solid var(--io-border)',
      }}
      aria-hidden="true"
    />
  );
}

function NonColorPlaceholder({ category }: { category: TokenCategory }) {
  const icons: Record<TokenCategory, string> = {
    typography: 'Aa',
    spacing: '↔',
    shadow: '◻',
    'border-radius': '◜',
    motion: '▶',
    other: '◦',
    color: '',
  };
  return (
    <div
      className="flex items-center justify-center rounded shrink-0 text-xs font-bold"
      style={{
        width: 32,
        height: 32,
        border: '1px solid var(--io-border)',
        background: 'var(--io-bg-raised)',
        color: 'var(--io-text-muted)',
      }}
      aria-hidden="true"
    >
      {icons[category] ?? '◦'}
    </div>
  );
}

function TokenRow({ token }: { token: TokenEntry }) {
  return (
    <div
      className="group flex items-center gap-3 py-3 px-4"
      style={{ borderBottom: '1px solid var(--io-border)' }}
    >
      {/* Swatch / placeholder */}
      <div className="shrink-0">
        {isColorToken(token) ? (
          <ColorSwatch token={token} />
        ) : (
          <NonColorPlaceholder category={token.category} />
        )}
      </div>

      {/* Token name + CSS var */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium truncate"
          style={{ color: 'var(--io-text-primary)' }}
        >
          {token.name}
        </p>
        <code
          className="text-xs"
          style={{
            color: 'var(--io-accent-text)',
            fontFamily: 'monospace',
          }}
        >
          {token.cssVar}
        </code>
      </div>

      {/* Value */}
      <code
        className="text-xs hidden sm:block shrink-0 max-w-[200px] truncate"
        style={{ color: 'var(--io-text-muted)', fontFamily: 'monospace' }}
        title={token.value}
      >
        {token.value}
      </code>

      {/* Copy button */}
      <TokenCopyButton cssVar={token.cssVar} />
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center"
      role="status"
      aria-live="polite"
    >
      <span
        className="text-4xl mb-4"
        aria-hidden="true"
        style={{ opacity: 0.3 }}
      >
        ◎
      </span>
      <p
        className="text-sm font-medium"
        style={{ color: 'var(--io-text-secondary)' }}
      >
        No tokens match your search.
      </p>
      <p
        className="text-xs mt-1"
        style={{ color: 'var(--io-text-muted)' }}
      >
        Try a different term or clear the filter.
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TokensPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<TokenCategory | 'all'>('all');

  const filteredTokens = filterTokens(ALL_TOKENS, searchQuery, activeCategory);

  const totalByCategory = TOKEN_CATEGORIES.reduce<Record<string, number>>(
    (acc, cat) => ({
      ...acc,
      [cat]: ALL_TOKENS.filter((t) => t.category === cat).length,
    }),
    {},
  );

  return (
    <div className="space-y-10">
      <PageHeader
        title="Token Explorer"
        description="Search, filter, and copy every design token in the iO Design System. Click Copy to grab the full var(--io-*) string."
        tabs={[]}
      />

      {/* ── Introduction ─────────────────────────────────────────────────── */}
      <section className="space-y-3">
        <SectionHeader
          title="All tokens"
          description="Every design token available as a CSS custom property. Use these in component styles to ensure theme consistency and dark mode support."
        />

        {/* Search */}
        <div className="relative">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
            style={{ color: 'var(--io-text-muted)' }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            type="search"
            placeholder="Search tokens by name or value..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg py-2.5 pl-10 pr-4 text-sm"
            style={{
              border: '1px solid var(--io-border)',
              background: 'var(--io-bg-surface)',
              color: 'var(--io-text-primary)',
              outline: 'none',
            }}
            aria-label="Search tokens"
          />
        </div>

        {/* Category chips */}
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by token category"
        >
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className="rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer"
            style={{
              border: `1px solid ${activeCategory === 'all' ? 'transparent' : 'var(--io-border)'}`,
              background:
                activeCategory === 'all'
                  ? 'var(--io-color-primary)'
                  : 'var(--io-bg-raised)',
              color:
                activeCategory === 'all'
                  ? 'var(--io-color-white)'
                  : 'var(--io-text-secondary)',
            }}
            aria-pressed={activeCategory === 'all'}
          >
            All ({ALL_TOKENS.length})
          </button>

          {TOKEN_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer"
                style={{
                  border: `1px solid ${isActive ? 'transparent' : 'var(--io-border)'}`,
                  background: isActive ? 'var(--io-color-primary)' : 'var(--io-bg-raised)',
                  color: isActive ? 'var(--io-color-white)' : 'var(--io-text-secondary)',
                }}
                aria-pressed={isActive}
              >
                {CATEGORY_LABELS[cat]} ({totalByCategory[cat] ?? 0})
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p
          className="text-xs"
          style={{ color: 'var(--io-text-muted)' }}
          aria-live="polite"
          aria-atomic="true"
        >
          {filteredTokens.length === ALL_TOKENS.length
            ? `${ALL_TOKENS.length} tokens`
            : `${filteredTokens.length} of ${ALL_TOKENS.length} tokens`}
        </p>

        {/* Token list */}
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: '1px solid var(--io-border)' }}
        >
          {/* Table header */}
          <div
            className="hidden sm:grid grid-cols-[40px_1fr_200px_auto] gap-3 px-4 py-2"
            style={{
              background: 'var(--io-bg-raised)',
              borderBottom: '1px solid var(--io-border)',
            }}
          >
            {['', 'Token', 'Value', ''].map((label, i) => (
              <span
                key={i}
                className="text-xs font-semibold uppercase"
                style={{ color: 'var(--io-text-muted)', letterSpacing: '0.06em' }}
              >
                {label}
              </span>
            ))}
          </div>

          {filteredTokens.length === 0 ? (
            <EmptyState />
          ) : (
            <div role="list" aria-label="Token list">
              {filteredTokens.map((token) => (
                <div key={token.cssVar} role="listitem">
                  <TokenRow token={token} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
