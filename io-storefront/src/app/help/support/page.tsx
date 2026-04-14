import Link from 'next/link';

import { PageHeader } from '@/components/layout/PageHeader';

const SUPPORT_OPTIONS = [
  {
    title: 'Report a bug',
    description: 'Open a GitHub issue when behavior is broken or differs from documentation.',
    href: 'https://github.com/iodigital-com/io-design-system/issues/new/choose',
    cta: 'Report bug in GitHub',
  },
  {
    title: 'Request a feature',
    description: 'Suggest component additions or API improvements with product impact context.',
    href: 'https://github.com/iodigital-com/io-design-system/issues/new?labels=enhancement&title=%5BFeature%5D%20',
    cta: 'Request feature in GitHub',
  },
  {
    title: 'Ask an implementation question',
    description: 'Share usage details, expected behavior, and minimal code examples.',
    href: 'https://github.com/iodigital-com/io-design-system/issues/new?labels=question&title=%5BQuestion%5D%20',
    cta: 'Ask question in GitHub',
  },
];

const SUPPORT_CHECKLIST = [
  'Component name and package version',
  'Expected behavior and actual behavior',
  'Reproduction steps or sandbox link',
  'Browser, framework, and runtime details',
];

export default function SupportPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Support"
        description="Choose the right support path and provide the context needed for faster triage."
        tabs={[]}
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4" aria-label="Support options">
        {SUPPORT_OPTIONS.map((option) => (
          <article
            key={option.title}
            className="rounded-lg border p-5 space-y-3"
            style={{ borderColor: 'var(--io-border)', background: 'var(--io-bg-raised)' }}
          >
            <h2 className="text-base font-semibold text-[var(--io-text-primary)]">{option.title}</h2>
            <p className="text-sm text-[var(--io-text-secondary)]">{option.description}</p>
            <a
              href={option.href}
              className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold"
              style={{ background: 'var(--io-bg-hover)', color: 'var(--io-text-primary)' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {option.cta}
            </a>
          </article>
        ))}
      </section>

      <section
        className="rounded-lg border p-6 space-y-3"
        style={{ borderColor: 'var(--io-border)', background: 'var(--io-bg-raised)' }}
        aria-labelledby="support-checklist"
      >
        <h2 id="support-checklist" className="text-lg font-semibold text-[var(--io-text-primary)]">
          What to include in your request
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--io-text-secondary)]">
          {SUPPORT_CHECKLIST.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2" aria-labelledby="support-next-steps">
        <h2 id="support-next-steps" className="text-lg font-semibold text-[var(--io-text-primary)]">
          What happens next
        </h2>
        <p className="text-sm text-[var(--io-text-secondary)]">
          Maintainers review new requests and continue follow-up in the issue thread when more context is needed.
          Shipped changes are reflected in the repository changelog and release notes when available.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/news/changelog"
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: 'var(--io-color-primary-bg)', color: 'var(--io-color-primary)' }}
          >
            Go to changelog
          </Link>
          <a
            href="https://github.com/iodigital-com/io-design-system/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: 'var(--io-bg-hover)', color: 'var(--io-text-primary)' }}
          >
            Read contributing guide
          </a>
        </div>
      </section>
    </div>
  );
}
