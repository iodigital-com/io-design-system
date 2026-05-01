import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'News — io Design System',
  description: 'Release news, changelog, and roadmap for the io Design System.',
  openGraph: {
    title: 'News — io Design System',
    description: 'Release news, changelog, and roadmap for the io Design System.',
    type: 'website',
  },
};

function CrossLink({ href, label, description }: { href: string; label: string; description: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-4 p-5 rounded-lg no-underline group"
      style={{
        border: '1px solid var(--io-border)',
        background: 'var(--io-bg-raised)',
        textDecoration: 'none',
      }}
    >
      <div>
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
          {label}
        </p>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          {description}
        </p>
      </div>
      <span
        className="shrink-0 text-base font-semibold transition-transform group-hover:translate-x-1"
        style={{ color: 'var(--io-accent)' }}
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  );
}

export default function NewsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="News"
        description="Stay up to date with io Design System releases, planned work, and roadmap intent across all packages."
        tabs={[]}
      />

      <div className="space-y-4">
        <CrossLink
          href="/news/changelog"
          label="Changelog"
          description="Release-by-release history of breaking changes, additions, and fixes across all io Design System packages."
        />
        <CrossLink
          href="/news/roadmap"
          label="Roadmap"
          description="Planned features, component additions, and infrastructure work for upcoming waves."
        />
      </div>
    </div>
  );
}
