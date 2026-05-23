'use client';

import Link from 'next/link';

import { PageHeader } from '@/components/layout/PageHeader';

type BrandAsset = {
  label: string;
  href: string;
  description: string;
};

const BRAND_ASSETS: BrandAsset[] = [
  {
    label: 'Logotype',
    href: 'https://io.debroome.com/en/brand-assets/logotype',
    description: 'Official iO logotype files in SVG, PNG, and EPS formats for digital and print use.',
  },
  {
    label: 'Colour palette',
    href: 'https://io.debroome.com/en/brand-assets/colours',
    description: 'Full iO colour palette including Energetic Blue, orange accent, and neutral tones.',
  },
  {
    label: 'Graphic elements',
    href: 'https://io.debroome.com/en/brand-assets/graphic-elements',
    description: 'Brand graphic elements, patterns, and decorative assets for iO communications.',
  },
  {
    label: 'Imagery & video',
    href: 'https://io.debroome.com/en/brand-assets/imagery-video',
    description: 'Approved photography, video content, and visual storytelling guidelines.',
  },
  {
    label: 'Wallpapers & templates',
    href: 'https://io.debroome.com/en/templates/wallpapers',
    description: 'Ready-to-use wallpapers, presentation templates, and branded office materials.',
  },
];

const COLOUR_TOKENS = [
  { token: '--io-color-primary', value: '#0000D2', label: 'Energetic Blue' },
  { token: '--io-color-orange', value: '#ed7f53', label: 'Orange accent' },
  { token: '--io-color-antraciet', value: '#454545', label: 'Antraciet' },
];

const CROSS_LINKS = [
  {
    label: 'Design Tokens',
    href: '/styles',
    description: 'Colour, typography, spacing, and motion tokens that power the io component system.',
  },
  {
    label: 'Component Library',
    href: '/components',
    description: 'Production-ready Web Components with live configurators and API documentation.',
  },
];

export default function DesigningPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Designing with io"
        description="The iO brand system provides a cohesive visual language — from the Energetic Blue identity to the Manrope typeface. This page is your gateway to official brand assets and design token references."
        tabs={[]}
      />

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Brand assets
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
          Download official iO brand files from the brand portal. Each link opens in the iO brand asset library.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BRAND_ASSETS.map(({ label, href, description }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-3 p-5 rounded-lg transition-colors"
              style={{
                background: 'var(--io-bg-raised)',
                border: '1px solid var(--io-border)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--io-bg-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--io-bg-raised)'; }}
              onFocus={(e) => { e.currentTarget.style.background = 'var(--io-bg-hover)'; }}
              onBlur={(e) => { e.currentTarget.style.background = 'var(--io-bg-raised)'; }}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-sm" style={{ color: 'var(--io-text-primary)' }}>
                  {label}
                </p>
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                  style={{ background: 'var(--io-accent-bg)', color: 'var(--io-accent-text)' }}
                >
                  External
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
                {description}
              </p>
              <span className="text-sm font-semibold self-start" style={{ color: 'var(--io-accent-text)' }}>
                Open asset →
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Brand identity
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
          The iO brand is built around three core pillars: Energetic Blue as the signature colour, Manrope as the primary typeface, and an orange accent that adds warmth and energy to communications.
        </p>
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: '1px solid var(--io-border)' }}
        >
          {[
            { label: 'Primary colour', value: 'Energetic Blue — #0000D2', note: 'var(--io-color-primary)' },
            { label: 'Accent colour', value: 'Orange — #ed7f53', note: 'var(--io-color-orange)' },
            { label: 'Neutral', value: 'Antraciet — #454545', note: 'var(--io-color-antraciet)' },
            { label: 'Typeface', value: 'Manrope', note: 'var(--io-font-primary)' },
          ].map(({ label, value, note }, i) => (
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
              <span style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
                {value}
              </span>
              <code
                className="text-[11px] px-1.5 py-0.5 rounded ml-auto shrink-0 self-start"
                style={{
                  background: 'var(--io-accent-bg)',
                  color: 'var(--io-accent-text)',
                  fontFamily: 'ui-monospace, "Cascadia Mono", "Fira Code", monospace',
                }}
              >
                {note}
              </code>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Colour
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
          The iO colour system is defined as CSS custom properties. Use these tokens in your implementations to stay aligned with the design system.
          See the <Link href="/styles" className="font-semibold" style={{ color: 'var(--io-accent-text)' }}>Design Tokens</Link> page for the full palette.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {COLOUR_TOKENS.map(({ token, value, label }) => (
            <div
              key={token}
              className="rounded-lg p-5 space-y-3"
              style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
            >
              <div
                className="w-full h-10 rounded-md"
                style={{ background: value }}
                aria-hidden="true"
              />
              <p className="font-semibold text-sm" style={{ color: 'var(--io-text-primary)' }}>
                {label}
              </p>
              <code
                className="block text-[11px] px-2 py-1 rounded"
                style={{
                  background: 'var(--io-accent-bg)',
                  color: 'var(--io-accent-text)',
                  fontFamily: 'ui-monospace, "Cascadia Mono", "Fira Code", monospace',
                }}
              >
                {token}
              </code>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Typography
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
          Manrope is the iO primary typeface — a geometric, variable sans-serif that balances modern clarity with warmth. It is applied via the{' '}
          <code
            className="text-[11px] px-1.5 py-0.5 rounded"
            style={{
              background: 'var(--io-accent-bg)',
              color: 'var(--io-accent-text)',
              fontFamily: 'ui-monospace, "Cascadia Mono", "Fira Code", monospace',
            }}
          >
            --io-font-primary
          </code>{' '}
          token across all io components.
        </p>
        <div
          className="rounded-lg p-6 space-y-4"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          {[
            { weight: '700', label: 'Bold — headings and emphasis', size: '1.5rem' },
            { weight: '600', label: 'Semibold — labels and UI text', size: '1.125rem' },
            { weight: '400', label: 'Regular — body copy and descriptions', size: '1rem' },
          ].map(({ weight, label, size }) => (
            <p
              key={weight}
              style={{
                fontFamily: 'var(--io-font-primary, Manrope, sans-serif)',
                fontWeight: weight,
                fontSize: size,
                color: 'var(--io-text-primary)',
                lineHeight: '1.4',
              }}
            >
              {label}
            </p>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Graphic elements and iconography
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
          The io component system ships inline SVG icons for interactive elements such as arrows, chevrons, and status indicators. These are embedded directly in component markup and inherit colour from the CSS cascade. For broader graphic elements — patterns, decorative shapes, and branded illustrations — refer to the{' '}
          <a
            href="https://io.debroome.com/en/brand-assets/graphic-elements"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
            style={{ color: 'var(--io-accent-text)' }}
          >
            Graphic elements
          </a>{' '}
          asset library.
        </p>
        <div
          className="rounded-lg p-5 space-y-2"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          {[
            'Arrow and chevron icons: inline SVG, inherits color via currentColor',
            'Status icons: embedded in io-toast, io-checkbox, io-radio components',
            'Custom icons: supply via named slots where supported (e.g. io-button)',
          ].map((note) => (
            <div key={note} className="flex items-start gap-2 text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              <span aria-hidden="true" style={{ color: 'var(--io-accent-text)', fontWeight: '700', lineHeight: '1.6' }}>·</span>
              <span>{note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Explore further
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CROSS_LINKS.map(({ label, href, description }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col gap-2 p-5 rounded-lg transition-colors"
              style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', textDecoration: 'none' }}
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
