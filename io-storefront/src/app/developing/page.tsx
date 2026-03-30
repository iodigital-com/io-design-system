'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';

const VANILLA_FRAMEWORK =
  {
    name: 'Vanilla JS / HTML',
    href: '/developing/vanilla-js',
    description: 'Load via CDN or npm. No build step required — drop the script tag and use io-* elements directly.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" />
      </svg>
    ),
  };

export default function DevelopingPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Integrating io"
        description="io components are standard Web Components — one package, any framework. Pick your integration path."
        tabs={[]}
      />

      <div className="space-y-4">
        <Link
          href={VANILLA_FRAMEWORK.href}
          className="flex items-start gap-4 p-6 rounded-lg transition-colors"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--io-bg-hover)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--io-bg-raised)'; }}
        >
          <span className="mt-0.5 shrink-0" style={{ color: 'var(--io-accent)' }}>
            {VANILLA_FRAMEWORK.icon}
          </span>
          <div>
            <p className="font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
              {VANILLA_FRAMEWORK.name}
            </p>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)' }}>
              {VANILLA_FRAMEWORK.description}
            </p>
          </div>
        </Link>

        <div
          className="rounded-lg p-5"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          <p className="font-semibold text-sm mb-2" style={{ color: 'var(--io-text-primary)' }}>
            More frameworks coming in v1.1
          </p>
          <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
            Next.js, React, Angular, and Vue integration guides are planned for the v1.1 roadmap.
          </p>
        </div>
      </div>
    </div>
  );
}
