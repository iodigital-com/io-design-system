'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { CopyButton } from '@/components/CopyButton';

// ── Accent-bar section heading — io Digital signature ─────────────────────────

function SectionHeading({ children, badge }: { children: ReactNode; badge?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="block w-1 h-5 rounded-full shrink-0"
        style={{ background: 'var(--io-accent)' }}
        aria-hidden="true"
      />
      <h2
        className="text-lg font-bold"
        style={{
          color: 'var(--io-text-primary)',
          letterSpacing: 'var(--io-heading-tracking-3, -0.015em)',
        }}
      >
        {children}
      </h2>
      {badge && (
        <span
          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: 'var(--io-accent-bg)', color: 'var(--io-accent-text)' }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

// ── Right-arrow icon for the explore list ─────────────────────────────────────

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const ALL_COMPONENTS = [
  { name: 'Badge',    tag: 'io-badge',    href: '/components/io-badge/configurator' },
  { name: 'Button',   tag: 'io-button',   href: '/components/io-button/configurator' },
  { name: 'Checkbox', tag: 'io-checkbox', href: '/components/io-checkbox/configurator' },
  { name: 'Input',    tag: 'io-input',    href: '/components/io-input/configurator' },
  { name: 'Link',     tag: 'io-link',     href: '/components/io-link/configurator' },
  { name: 'Modal',    tag: 'io-modal',    href: '/components/io-modal/configurator' },
  { name: 'Radio',    tag: 'io-radio',    href: '/components/io-radio/configurator' },
  { name: 'Select',   tag: 'io-select',   href: '/components/io-select/configurator' },
  { name: 'Spinner',  tag: 'io-spinner',  href: '/components/io-spinner/configurator' },
  { name: 'Tabs',     tag: 'io-tabs',     href: '/components/io-tabs/configurator' },
  { name: 'Tag',      tag: 'io-tag',      href: '/components/io-tag/configurator' },
  { name: 'Textarea', tag: 'io-textarea', href: '/components/io-textarea/configurator' },
  { name: 'Toast',    tag: 'io-toast',    href: '/components/io-toast/configurator' },
  { name: 'Tooltip',  tag: 'io-tooltip',  href: '/components/io-tooltip/configurator' },
];

const STEPS = [
  {
    number: '01',
    title: 'Add the package',
    code: 'npm install @io-digital/components',
  },
  {
    number: '02',
    title: 'Load styles and loader',
    code: `<link rel="stylesheet" href="node_modules/@io-digital/components/dist/io-components/io-components.css">
<script type="module" src="node_modules/@io-digital/components/dist/io-components/io-components.esm.js"></script>`,
  },
  {
    number: '03',
    title: 'Drop in a component',
    code: `<io-button variant="solid" color="blue" size="md">Get started</io-button>`,
  },
];

const EXPLORE_PATHS = [
  {
    title: 'Components',
    description: '15 interactive components with live configurator and full API docs.',
    href: '/components',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    title: 'Integrating io',
    description: 'Framework guides for React, Angular, Vue, Next.js, and Vanilla JS.',
    href: '/developing',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Design Tokens',
    description: 'Colour, type, spacing, motion, and shape — all CSS custom properties.',
    href: '/styles',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
      </svg>
    ),
  },
  {
    title: 'Designing with io',
    description: 'Figma foundations, brand principles, and visual guidelines.',
    href: '/designing',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
];

export default function GettingStarted() {
  return (
    <div className="space-y-16">

      {/* ── Hero — two-column split ────────────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-start">
        {/* Left: headline + tagline + install */}
        <div className="space-y-5">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border"
            style={{
              borderColor: 'var(--io-border)',
              color: 'var(--io-accent-text)',
              background: 'var(--io-accent-bg)',
            }}
          >
            io Design System · v1.0
          </span>

          <h1
            className="font-bold leading-tight"
            style={{
              fontSize: 'clamp(2.25rem, 4vw, 3rem)',
              letterSpacing: 'var(--io-heading-tracking-1, -0.025em)',
              color: 'var(--io-text-primary)',
            }}
          >
            15 components.<br />
            One token system.<br />
            Any framework.
          </h1>

          <p
            className="text-base max-w-md"
            style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7' }}
          >
            Built with Stencil and shipped as standard Web Components — works with React, Angular, Vue, or plain HTML.
          </p>

          <div className="relative group">
            <CopyButton
              text="npm install @io-digital/components"
              ariaLabel="Copy quick start install command"
              className="absolute right-3 top-3 z-10"
            />
            <pre
              className="rounded-md px-4 py-3 pr-16 text-sm overflow-x-auto"
              style={{ background: 'var(--io-bg-surface)', color: '#d4d4d4' }}
            >
              <code>npm install @io-digital/components</code>
            </pre>
          </div>
        </div>

        {/* Right: component name mosaic */}
        <div className="hidden sm:grid grid-cols-4 gap-1.5 content-start pt-2">
          {ALL_COMPONENTS.map(({ name, tag, href }) => (
            <Link
              key={tag}
              href={href}
              className="text-xs px-2 py-1.5 rounded text-center transition-opacity hover:opacity-70"
              style={{
                background: 'var(--io-accent-bg)',
                color: 'var(--io-accent-text)',
                fontFamily: 'ui-monospace, "Cascadia Mono", "Fira Code", monospace',
              }}
              title={name}
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Get up and running ────────────────────────────────────── */}
      <section>
        <SectionHeading>Get up and running</SectionHeading>
        <div>
          {STEPS.map(({ number, title, code }, index) => (
            <div
              key={number}
              className={`flex gap-6 items-start ${index < STEPS.length - 1 ? 'pb-8 mb-8 border-b border-[var(--io-border)]' : ''}`}
            >
              {/* Watermark number */}
              <div
                className="text-5xl font-black w-16 shrink-0 leading-none select-none pt-0.5"
                style={{ color: 'var(--io-color-primary)', opacity: 0.12 }}
                aria-hidden="true"
              >
                {number}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <h3 className="font-semibold" style={{ color: 'var(--io-text-primary)' }}>
                  {title}
                </h3>
                <div className="relative group">
                  <CopyButton
                    text={code}
                    ariaLabel={`Copy code for step ${number}`}
                    className="absolute right-3 top-3 z-10"
                  />
                  <pre
                    className="rounded-md p-4 pr-16 text-sm overflow-x-auto"
                    style={{ background: 'var(--io-bg-surface)', color: '#d4d4d4' }}
                  >
                    <code>{code}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Explore the system ────────────────────────────────────── */}
      <section>
        <SectionHeading>Explore the system</SectionHeading>
        <div>
          {EXPLORE_PATHS.map(({ title, description, href, icon }, index) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between py-5 transition-colors rounded-md px-2 -mx-2"
              style={{
                borderBottom: index < EXPLORE_PATHS.length - 1 ? '1px solid var(--io-border)' : undefined,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--io-bg-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <div className="flex items-center gap-4">
                <span style={{ color: 'var(--io-accent)' }}>{icon}</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--io-text-primary)' }}>
                    {title}
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.5' }}>
                    {description}
                  </p>
                </div>
              </div>
              <span style={{ color: 'var(--io-text-muted)', flexShrink: 0 }}>
                <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── All components ────────────────────────────────────────── */}
      <section>
        <SectionHeading badge="15">All components</SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ALL_COMPONENTS.map(({ name, tag, href }) => (
            <Link
              key={tag}
              href={href}
              className="flex items-center justify-between p-3 rounded-lg border transition-colors"
              style={{ borderColor: 'var(--io-border)', background: 'var(--io-bg-raised)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--io-bg-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--io-bg-raised)'; }}
            >
              <span className="text-sm font-medium" style={{ color: 'var(--io-text-primary)' }}>
                {name}
              </span>
              <code
                className="text-[10px] px-1.5 py-0.5 rounded"
                style={{
                  background: 'var(--io-accent-bg)',
                  color: 'var(--io-accent-text)',
                  fontFamily: 'ui-monospace, "Cascadia Mono", "Fira Code", monospace',
                }}
              >
                {tag}
              </code>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
