'use client';

import { PageHeader } from '@/components/layout/PageHeader';

const FRAMEWORKS = [
  {
    name: 'Vanilla JS / HTML',
    href: '/developing/vanilla-js',
    description: 'Load via CDN or npm. No build step required — drop the script tag and use io-* elements directly.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    href: '/developing/next-js',
    description: 'Server and client component support via @io-digital/components-react. Works with the App Router.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    name: 'React',
    href: '/developing/react',
    description: 'Typed wrappers via @io-digital/components-react with full prop and event type safety.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'Angular',
    href: '/developing/angular',
    description: 'Standalone module wrappers via @io-digital/components-angular — compatible with Angular 17–20.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 22 22 7 12 2" />
      </svg>
    ),
  },
  {
    name: 'Vue',
    href: '/developing/vue',
    description: 'Vue 3 wrappers via @io-digital/components-vue — compatible with the Composition API and Nuxt 3.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 20 22 20 12 2" />
      </svg>
    ),
  },
];

export default function DevelopingPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Integrating io"
        description="io components are standard Web Components — one package, any framework. Pick your integration path."
        tabs={[]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FRAMEWORKS.map(({ name, href, description, icon }) => (
          <div
            key={href}
            className="flex items-start gap-4 p-6 rounded-lg"
            style={{
              background: 'var(--io-bg-raised)',
              border: '1px solid var(--io-border)',
              opacity: 0.6,
              cursor: 'not-allowed',
            }}
            title="Coming soon"
          >
            <span className="mt-0.5 shrink-0" style={{ color: 'var(--io-accent)' }}>
              {icon}
            </span>
            <div>
              <p className="font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
                {name}
                <span
                  className="ml-2 text-xs px-2 py-0.5 rounded"
                  style={{ background: 'var(--io-bg-hover)', color: 'var(--io-text-muted)' }}
                >
                  Coming soon
                </span>
              </p>
              <p className="text-sm" style={{ color: 'var(--io-text-secondary)' }}>
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
