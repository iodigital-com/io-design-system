'use client';

import { PageHeader } from '@/components/layout/PageHeader';

const FAQ = [
  {
    q: 'How do I report a bug or request a feature?',
    a: 'Open an issue on the io-design-system GitHub repository. Please include steps to reproduce, expected behavior, and your environment.',
  },
  {
    q: 'Can I use io Design System outside of io Digital products?',
    a: 'The packages are published publicly on npm and can be used in any project, but the design language is specifically crafted for io Digital brand guidelines.',
  },
  {
    q: 'Which browsers are supported?',
    a: 'All evergreen browsers: Chrome, Firefox, Safari, and Edge. Web Components (Custom Elements v1 + Shadow DOM v1) are natively supported in all modern browsers.',
  },
  {
    q: 'How do I upgrade between major versions?',
    a: 'Each major version includes a migration guide in the Changelog section. Breaking changes to component APIs are documented with before/after code examples.',
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Help"
        description="Frequently asked questions and support resources for io Design System."
        tabs={[]}
      />

      <section className="space-y-4">
        <h2
          className="text-xl font-semibold"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          FAQ
        </h2>
        <div className="space-y-4">
          {FAQ.map(({ q, a }) => (
            <div
              key={q}
              className="p-6 rounded-lg"
              style={{
                background: 'var(--io-bg-raised, #f5f5f5)',
                border: '1px solid var(--io-border, #e8e8e8)',
              }}
            >
              <p className="font-semibold mb-2" style={{ color: 'var(--io-text-primary, #242424)' }}>
                {q}
              </p>
              <p className="text-sm" style={{ color: 'var(--io-text-secondary, #6b6b6b)' }}>
                {a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
