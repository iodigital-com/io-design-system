'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';

type FrameworkStatus = 'available' | 'planned' | 'deferred';

type Framework = {
  name: string;
  href: string;
  status: FrameworkStatus;
  description: string;
  package: string;
};

const FRAMEWORKS: Framework[] = [
  {
    name: 'Vanilla JS / HTML',
    href: '/developing/vanilla-js',
    status: 'available',
    description: 'Load via CDN or npm. No build step required — drop the script tag and use io-* elements directly in any HTML page.',
    package: '@io-digital/components',
  },
  {
    name: 'React',
    href: '/developing/react',
    status: 'planned',
    description: 'First-class React wrappers with typed props and strongly-typed event bindings for a seamless developer experience.',
    package: '@io-digital/components-react',
  },
  {
    name: 'Next.js',
    href: '/developing/next-js',
    status: 'planned',
    description: 'App Router–compatible setup with dynamic import patterns to keep Web Component hydration safe in server components.',
    package: '@io-digital/components-react',
  },
  {
    name: 'Angular',
    href: '/developing/angular',
    status: 'planned',
    description: 'Angular wrapper components with CUSTOM_ELEMENTS_SCHEMA setup, standalone imports, and full template support.',
    package: '@io-digital/components-angular',
  },
  {
    name: 'Vue',
    href: '/developing/vue',
    status: 'planned',
    description: 'Vue wrapper components built with defineCustomElement. Works with both Vue 3 and Nuxt composition APIs.',
    package: '@io-digital/components-vue',
  },
];

const STATUS_LABEL: Record<FrameworkStatus, string> = {
  available: 'Available',
  planned: 'Planned v1.1',
  deferred: 'Deferred',
};

const STATUS_STYLE: Record<FrameworkStatus, { background: string; color: string }> = {
  available: { background: 'var(--io-accent-bg)', color: 'var(--io-accent-text)' },
  planned: { background: 'var(--io-bg-hover)', color: 'var(--io-text-secondary)' },
  deferred: { background: 'var(--io-bg-hover)', color: 'var(--io-text-muted)' },
};

const PREREQUISITES = [
  { label: 'Node.js', value: '≥ 20.0.0' },
  { label: 'Package manager', value: 'npm, pnpm, or yarn' },
  { label: 'Browser', value: 'Custom Elements support (Chrome 67+, Firefox 63+, Safari 10.1+)' },
];

const NEXT_ACTIONS = [
  { label: 'Browse the component library', href: '/components', description: '15 production-ready components with live configurators.' },
  { label: 'Vanilla JS / HTML guide', href: '/developing/vanilla-js', description: 'Install, initialize, and use io-* elements today.' },
  { label: 'Design tokens', href: '/styles', description: 'Colour, typography, spacing, and motion tokens.' },
];

export default function DevelopingPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Integrating io"
        description="io components are standard Web Components — one package, any framework. Choose your integration path below."
        tabs={[]}
      />

      {/* Prerequisites */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Prerequisites
        </h2>
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: '1px solid var(--io-border)' }}
        >
          {PREREQUISITES.map(({ label, value }, i) => (
            <div
              key={label}
              className="flex items-start gap-4 px-5 py-3 text-sm"
              style={{
                background: i % 2 === 0 ? 'var(--io-bg-raised)' : 'var(--io-bg-base)',
                borderTop: i > 0 ? '1px solid var(--io-border)' : undefined,
              }}
            >
              <span className="font-semibold shrink-0 w-36" style={{ color: 'var(--io-text-primary)' }}>
                {label}
              </span>
              <span style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Support matrix */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Support matrix
        </h2>
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: '1px solid var(--io-border)' }}
        >
          <div
            className="grid grid-cols-3 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest"
            style={{ background: 'var(--io-bg-raised)', color: 'var(--io-text-secondary)', borderBottom: '1px solid var(--io-border)' }}
          >
            <span>Framework</span>
            <span>Package</span>
            <span>Status</span>
          </div>
          {FRAMEWORKS.map(({ name, package: pkg, status }, i) => (
            <div
              key={name}
              className="grid grid-cols-3 items-center px-5 py-3 text-sm"
              style={{
                background: i % 2 === 0 ? 'var(--io-bg-base)' : 'var(--io-bg-raised)',
                borderTop: '1px solid var(--io-border)',
              }}
            >
              <span className="font-semibold" style={{ color: 'var(--io-text-primary)' }}>{name}</span>
              <code
                className="text-[11px] px-1.5 py-0.5 rounded self-start"
                style={{
                  background: 'var(--io-accent-bg)',
                  color: 'var(--io-accent-text)',
                  fontFamily: 'ui-monospace, "Cascadia Mono", "Fira Code", monospace',
                }}
              >
                {pkg}
              </code>
              <span
                className="text-[11px] font-semibold px-2 py-0.5 rounded-full self-start w-fit"
                style={STATUS_STYLE[status]}
              >
                {STATUS_LABEL[status]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Framework chooser cards */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Choose your framework
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FRAMEWORKS.map(({ name, href, status, description }) => {
            const isAvailable = status === 'available';
            return (
              <Link
                key={name}
                href={href}
                className="flex flex-col gap-3 p-5 rounded-lg transition-colors"
                style={{
                  background: 'var(--io-bg-raised)',
                  border: '1px solid var(--io-border)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--io-bg-hover)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--io-bg-raised)'; }}
                onFocus={(e) => { e.currentTarget.style.background = 'var(--io-bg-hover)'; }}
                onBlur={(e) => { e.currentTarget.style.background = 'var(--io-bg-raised)'; }}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-sm" style={{ color: 'var(--io-text-primary)' }}>
                    {name}
                  </p>
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                    style={STATUS_STYLE[status]}
                  >
                    {STATUS_LABEL[status]}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
                  {description}
                </p>
                {isAvailable && (
                  <span
                    className="text-sm font-semibold self-start"
                    style={{ color: 'var(--io-accent-text)' }}
                  >
                    View guide →
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Install decision flow */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Which package do I install?
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          All io components are published as native Web Components in a single core package. Framework wrappers layer typed props and events on top.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="rounded-lg p-5 space-y-3"
            style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
          >
            <p className="font-semibold text-sm" style={{ color: 'var(--io-text-primary)' }}>
              Core package
            </p>
            <code
              className="block text-[11px] px-2 py-1 rounded"
              style={{
                background: 'var(--io-accent-bg)',
                color: 'var(--io-accent-text)',
                fontFamily: 'ui-monospace, "Cascadia Mono", "Fira Code", monospace',
              }}
            >
              @io-digital/components
            </code>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              Use this for Vanilla JS, HTML, or any framework not covered by a dedicated wrapper. Ships the Web Component definitions, CSS, and design tokens.
            </p>
          </div>
          <div
            className="rounded-lg p-5 space-y-3"
            style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
          >
            <p className="font-semibold text-sm" style={{ color: 'var(--io-text-primary)' }}>
              Framework wrappers
            </p>
            <div className="flex flex-wrap gap-2">
              {['@io-digital/components-react', '@io-digital/components-angular', '@io-digital/components-vue'].map((pkg) => (
                <code
                  key={pkg}
                  className="text-[11px] px-2 py-1 rounded"
                  style={{
                    background: 'var(--io-accent-bg)',
                    color: 'var(--io-accent-text)',
                    fontFamily: 'ui-monospace, "Cascadia Mono", "Fira Code", monospace',
                  }}
                >
                  {pkg}
                </code>
              ))}
            </div>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              Wrapper packages include the core and add typed props, strongly-typed events, and idiomatic bindings for each framework.
            </p>
          </div>
        </div>
      </section>

      {/* Next actions */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Next steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {NEXT_ACTIONS.map(({ label, href, description }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col gap-2 p-5 rounded-lg transition-colors"
              style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--io-bg-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--io-bg-raised)'; }}
              onFocus={(e) => { e.currentTarget.style.background = 'var(--io-bg-hover)'; }}
              onBlur={(e) => { e.currentTarget.style.background = 'var(--io-bg-raised)'; }}
            >
              <p className="font-semibold text-sm" style={{ color: 'var(--io-text-primary)' }}>
                {label}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
                {description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
