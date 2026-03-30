'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';

const FRAMEWORKS = [
  {
    name: 'Vanilla JS / HTML',
    href: '/developing/vanilla-js',
    description: 'Load via CDN or npm. No build step required — drop the script tag and use io-* elements directly in any HTML page.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" />
      </svg>
    ),
  },
  {
    name: 'React',
    href: '/developing/react',
    description: 'Install the React wrapper package for typed props, forwardRef support, and full event binding.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="2" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity=".3" /><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: 'Angular',
    href: '/developing/angular',
    description: 'Use the Angular wrapper package for directive-based integration with strongly typed inputs and outputs.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 2 7 4.5 16.5 12 22 19.5 16.5 22 7 12 2" /><polyline points="12 2 12 22" /><line x1="2" y1="7" x2="22" y2="7" />
      </svg>
    ),
  },
  {
    name: 'Vue',
    href: '/developing/vue',
    description: 'Install the Vue wrapper package for component registration, v-model binding, and Composition API support.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="12 2 2 19 22 19" /><polyline points="12 8 6 19 18 19" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    href: '/developing/next-js',
    description: 'Use io components in Next.js App Router projects with the React wrapper and client boundary directives.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export default function DevelopingPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Integrating io"
        description="io components are standard Web Components — one package, any framework. Pick your integration path below."
        tabs={[]}
      />

      <div className="space-y-3">
        {FRAMEWORKS.map((fw) => (
          <Link
            key={fw.href}
            href={fw.href}
            className="flex items-start gap-4 p-6 rounded-lg transition-colors"
            style={{
              background: 'var(--io-bg-raised)',
              border: '1px solid var(--io-border)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--io-bg-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--io-bg-raised)'; }}
          >
            <span className="mt-0.5 shrink-0" style={{ color: 'var(--io-accent)' }}>
              {fw.icon}
            </span>
            <div>
              <p className="font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
                {fw.name}
              </p>
              <p className="text-sm" style={{ color: 'var(--io-text-secondary)' }}>
                {fw.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
