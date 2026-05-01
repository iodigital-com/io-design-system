import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found — io Design System',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 px-4">
      {/* Status code */}
      <p
        className="text-8xl font-bold tracking-tight"
        style={{ color: 'var(--io-color-primary)', lineHeight: 1 }}
        aria-hidden="true"
      >
        404
      </p>

      {/* Heading + description */}
      <div className="space-y-3 max-w-md">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Page not found
        </h1>
        <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
          The page you're looking for doesn't exist or has been moved. Use the links below to get back on track.
        </p>
      </div>

      {/* Navigation suggestions */}
      <nav aria-label="Suggestions" className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold"
          style={{ background: 'var(--io-color-primary)', color: 'var(--io-text-on-primary)' }}
        >
          Home
        </Link>
        <Link
          href="/components"
          className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}
        >
          Components
        </Link>
        <Link
          href="/developing"
          className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}
        >
          Developing
        </Link>
      </nav>
    </div>
  );
}
