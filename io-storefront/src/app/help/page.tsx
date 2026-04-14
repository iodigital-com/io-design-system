'use client';

import Link from 'next/link';

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
        description="Get support quickly, learn how requests are triaged, and find answers to common integration questions."
        tabs={[]}
      />

      <section
        className="rounded-lg border p-6 space-y-4"
        style={{
          background: 'var(--io-bg-raised)',
          borderColor: 'var(--io-border)',
        }}
      >
        <h2 className="text-xl font-semibold text-[var(--io-text-primary)]">Start here</h2>
        <p className="text-sm text-[var(--io-text-secondary)]">
          Use the support page if you need a bug fix, feature request, or implementation guidance. Release-specific
          behavior and upgrade notes are maintained in the changelog.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/help/support"
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: 'var(--io-color-primary-bg)', color: 'var(--io-color-primary)' }}
          >
            Open support options
          </Link>
          <Link
            href="/news/changelog"
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: 'var(--io-bg-hover)', color: 'var(--io-text-primary)' }}
          >
            View changelog
          </Link>
        </div>
      </section>

      <section className="space-y-4" id="faq" aria-labelledby="help-faq">
        <h2 id="help-faq" className="text-xl font-semibold" style={{ color: 'var(--io-text-primary, #242424)' }}>
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
              <h3 className="font-semibold mb-2" style={{ color: 'var(--io-text-primary, #242424)' }}>
                {q}
              </h3>
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
