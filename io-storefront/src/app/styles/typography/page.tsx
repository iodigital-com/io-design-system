'use client';

import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CodeTabs } from '@/components/CodeTabs';

// ── Shared helpers ────────────────────────────────────────────────────────────

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="block w-1 h-5 rounded-full shrink-0"
          style={{ background: 'var(--io-accent)' }}
          aria-hidden="true"
        />
        <h2
          className="text-xl font-bold"
          style={{
            color: 'var(--io-text-primary)',
            letterSpacing: 'var(--io-heading-tracking-3, -0.015em)',
          }}
        >
          {title}
        </h2>
      </div>
      <p className="ml-3 text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        {description}
      </p>
    </div>
  );
}

function SubsectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-xs font-semibold uppercase mb-4"
      style={{ color: 'var(--io-text-muted)', letterSpacing: '0.08em' }}
    >
      {children}
    </h3>
  );
}

function RuleCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="flex gap-4 p-5 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <span
        className="block w-1 shrink-0 rounded-full mt-0.5"
        style={{ background: 'var(--io-accent)', height: '1rem' }}
        aria-hidden="true"
      />
      <div>
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
          {label}
        </p>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          {children}
        </p>
      </div>
    </div>
  );
}

type DoOrDont = 'do' | 'dont';

function DoOrDontCard({ type, children }: { type: DoOrDont; children: React.ReactNode }) {
  const isdo = type === 'do';
  return (
    <div
      className="flex gap-3 p-4 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <span
        className="block w-1 shrink-0 rounded-full mt-0.5"
        style={{
          background: isdo ? 'var(--io-color-success)' : 'var(--io-color-error)',
          height: '1rem',
        }}
        aria-hidden="true"
      />
      <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        {children}
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TypographyPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Typography"
        description="io Digital's type system — defined by Manrope as the primary voice, supported by TT Commons Pro for brand materials, and structured through a purposeful scale of sizes, weights, and spacing."
        tabs={[]}
      />

      {/* ── 1. Introduction ──────────────────────────────────────────── */}
      <section id="introduction" className="space-y-4">
        <SectionHeader
          title="Introduction"
          description="Why typography matters for io Digital products."
        />
        <p
          className="max-w-2xl"
          style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7', fontSize: 'var(--io-font-size-sm)' }}
        >
          Typography is the backbone of io Digital's visual identity. Clear, consistent type choices
          make interfaces easier to read, faster to navigate, and more recognisably io Digital. The
          system is built around three font families, each with a defined role, and a mathematical
          scale that ensures harmony across every screen size and context.
        </p>
        <p
          className="max-w-2xl"
          style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7', fontSize: 'var(--io-font-size-sm)' }}
        >
          Manrope is the single typeface for all product UI. TT Commons Pro carries the brand voice
          in marketing and communication. Inter acts as a reliable fallback when TT Commons Pro is
          not available. Together they cover every use case while keeping the system lean and
          intentional.
        </p>
      </section>

      {/* ── 2. Primary font ──────────────────────────────────────────── */}
      <section id="primary-font" className="space-y-6">
        <SectionHeader
          title="Primary font"
          description="Manrope — the typeface behind every io Digital product interface."
        />

        {/* Specimen */}
        <div
          className="rounded-lg p-8 space-y-4"
          style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
        >
          <p
            style={{
              fontFamily: 'var(--io-font-primary)',
              fontSize: 'var(--io-font-size-7xl)',
              fontWeight: 'var(--io-font-weight-bold)' as React.CSSProperties['fontWeight'],
              color: 'var(--io-text-primary)',
              letterSpacing: 'var(--io-heading-tracking-1)',
              lineHeight: 1,
            }}
          >
            Aa
          </p>
          <p
            style={{
              fontFamily: 'var(--io-font-primary)',
              fontSize: 'var(--io-font-size-lg)',
              color: 'var(--io-text-secondary)',
              lineHeight: 1.5,
            }}
          >
            A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
          </p>
          <p
            style={{
              fontFamily: 'var(--io-font-primary)',
              fontSize: 'var(--io-font-size-lg)',
              color: 'var(--io-text-secondary)',
              lineHeight: 1.5,
            }}
          >
            a b c d e f g h i j k l m n o p q r s t u v w x y z
          </p>
          <p
            style={{
              fontFamily: 'var(--io-font-primary)',
              fontSize: 'var(--io-font-size-lg)',
              color: 'var(--io-text-secondary)',
              lineHeight: 1.5,
            }}
          >
            0 1 2 3 4 5 6 7 8 9 ! @ # € % & * ( ) — . ,
          </p>
          <div className="pt-2 flex flex-wrap gap-2">
            <code
              className="text-xs px-2 py-1 rounded"
              style={{ background: 'var(--io-accent-bg)', color: 'var(--io-accent-text)', fontFamily: 'monospace' }}
            >
              --io-font-primary
            </code>
            <code
              className="text-xs px-2 py-1 rounded"
              style={{ background: 'var(--io-accent-bg)', color: 'var(--io-accent-text)', fontFamily: 'monospace' }}
            >
              &apos;Manrope&apos;, sans-serif
            </code>
          </div>
        </div>

        {/* Weight specimens */}
        <SubsectionTitle>Weights</SubsectionTitle>
        <div
          style={{ borderTop: '1px solid var(--io-border)' }}
        >
          {[
            { name: 'Light', token: '--io-font-weight-light', value: 300 },
            { name: 'Regular', token: '--io-font-weight-regular', value: 400 },
            { name: 'Medium', token: '--io-font-weight-medium', value: 500 },
            { name: 'SemiBold', token: '--io-font-weight-semibold', value: 600 },
            { name: 'Bold', token: '--io-font-weight-bold', value: 700 },
          ].map(({ name, token, value }) => (
            <div
              key={token}
              className="flex items-center gap-6 py-4"
              style={{ borderBottom: '1px solid var(--io-border)' }}
            >
              <span
                className="text-2xl flex-1"
                style={{
                  fontWeight: value,
                  fontFamily: 'var(--io-font-primary)',
                  color: 'var(--io-text-primary)',
                  letterSpacing: 'var(--io-heading-tracking-3)',
                }}
              >
                The quick brown fox jumps over the lazy dog
              </span>
              <div className="shrink-0 flex items-center gap-3 text-right">
                <span className="text-sm w-16" style={{ color: 'var(--io-text-secondary)' }}>
                  {name}
                </span>
                <span className="text-xs w-6" style={{ color: 'var(--io-text-muted)' }}>
                  {value}
                </span>
                <code
                  className="text-xs px-1.5 py-0.5 rounded hidden sm:block"
                  style={{ background: 'var(--io-accent-bg)', color: 'var(--io-accent-text)', fontFamily: 'monospace' }}
                >
                  {token}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Branding font ─────────────────────────────────────────── */}
      <section id="branding-font" className="space-y-6">
        <SectionHeader
          title="Branding font"
          description="TT Commons Pro — the licensed secondary typeface for io Digital brand materials."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* TT Commons Pro card */}
          <div
            className="p-6 rounded-lg space-y-4"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded"
                style={{ background: 'var(--io-accent-bg)', color: 'var(--io-accent-text)' }}
              >
                Licensed
              </span>
            </div>
            <p
              style={{
                fontFamily: '"TT Commons Pro", "Inter", sans-serif',
                fontSize: 'var(--io-font-size-5xl)',
                fontWeight: 700,
                color: 'var(--io-text-primary)',
                letterSpacing: 'var(--io-heading-tracking-2)',
                lineHeight: 1,
              }}
            >
              TT Commons Pro
            </p>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              Secondary branding typeface. Used in marketing collateral, campaigns, and brand
              communications. Requires a licence — not loaded in the component library by default.
            </p>
            <code
              className="text-xs block"
              style={{ color: 'var(--io-text-muted)', fontFamily: 'monospace' }}
            >
              &quot;TT Commons Pro&quot;, &quot;Inter&quot;, sans-serif
            </code>
          </div>

          {/* Inter fallback card */}
          <div
            className="p-6 rounded-lg space-y-4"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded"
                style={{ background: 'var(--io-bg-base)', color: 'var(--io-text-muted)', border: '1px solid var(--io-border)' }}
              >
                Fallback
              </span>
            </div>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 'var(--io-font-size-5xl)',
                fontWeight: 700,
                color: 'var(--io-text-primary)',
                letterSpacing: 'var(--io-heading-tracking-2)',
                lineHeight: 1,
              }}
            >
              Inter
            </p>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              Utility fallback typeface. Activated automatically when TT Commons Pro is unavailable.
              Freely available, closely matches the brand aesthetic, and is safe for use in
              developer-facing contexts.
            </p>
            <code
              className="text-xs block"
              style={{ color: 'var(--io-text-muted)', fontFamily: 'monospace' }}
            >
              &quot;Inter&quot;, sans-serif
            </code>
          </div>
        </div>
      </section>

      {/* ── 4. Guiding principles ────────────────────────────────────── */}
      <section id="guiding-principles" className="space-y-6">
        <SectionHeader
          title="Guiding principles"
          description="Four rules that govern how io Digital applies type across all products and communications."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RuleCard label="Manrope for all product UI">
            Manrope is the single typeface for every component, screen, and interface. It provides
            the consistency and legibility that io Digital products require at every scale.
          </RuleCard>
          <RuleCard label="Hierarchy through weight and size">
            Use the weight scale (300–700) and the 11-step size scale to create visual hierarchy.
            Reaching for a second typeface to add contrast is not the answer — weight and size are.
          </RuleCard>
          <RuleCard label="Negative tracking on headings">
            Headings always use negative letter-spacing. Tight tracking at large sizes is a defining
            characteristic of io Digital typography and should never be omitted.
          </RuleCard>
          <RuleCard label="Line height matches context">
            Heading text uses tight leading; body text uses comfortable leading. Applying body
            line-height to a large heading — or tight line-height to a paragraph — immediately
            breaks the reading experience.
          </RuleCard>
        </div>
      </section>

      {/* ── 5. Treatment ─────────────────────────────────────────────── */}
      <section id="treatment" className="space-y-8">
        <SectionHeader
          title="Treatment"
          description="How to apply letter-spacing and line height tokens to achieve the correct typographic feel."
        />

        {/* Heading tracking */}
        <div>
          <SubsectionTitle>Heading tracking (letter-spacing)</SubsectionTitle>
          <div style={{ borderTop: '1px solid var(--io-border)' }}>
            {[
              { token: '--io-heading-tracking-1', value: '-0.025em', level: 'H1', size: 'var(--io-font-size-4xl)' },
              { token: '--io-heading-tracking-2', value: '-0.020em', level: 'H2', size: 'var(--io-font-size-3xl)' },
              { token: '--io-heading-tracking-3', value: '-0.015em', level: 'H3', size: 'var(--io-font-size-2xl)' },
              { token: '--io-heading-tracking-4', value: '-0.010em', level: 'H4', size: 'var(--io-font-size-xl)' },
            ].map(({ token, value, level, size }) => (
              <div
                key={token}
                className="flex items-center gap-6 py-4"
                style={{ borderBottom: '1px solid var(--io-border)' }}
              >
                <span
                  className="flex-1 font-bold"
                  style={{
                    fontSize: size,
                    color: 'var(--io-text-primary)',
                    letterSpacing: `var(${token})`,
                    lineHeight: 1.2,
                    fontFamily: 'var(--io-font-primary)',
                  }}
                >
                  Heading example
                </span>
                <div className="shrink-0 flex items-center gap-3">
                  <span className="text-sm font-medium w-6" style={{ color: 'var(--io-text-muted)' }}>
                    {level}
                  </span>
                  <span className="text-xs w-16" style={{ color: 'var(--io-text-muted)' }}>
                    {value}
                  </span>
                  <code
                    className="text-xs px-1.5 py-0.5 rounded hidden sm:block"
                    style={{ background: 'var(--io-accent-bg)', color: 'var(--io-accent-text)', fontFamily: 'monospace' }}
                  >
                    {token}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Line heights */}
        <div>
          <SubsectionTitle>Line heights</SubsectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { token: '--io-line-height-none', value: 1, usage: 'Single-line UI elements — badges, buttons, labels' },
              { token: '--io-line-height-tight', value: 1.2, usage: 'Display and hero headings' },
              { token: '--io-line-height-snug', value: 1.25, usage: 'Section headings' },
              { token: '--io-line-height-normal', value: 1.5, usage: 'Body copy — the default for all paragraph text' },
            ].map(({ token, value, usage }) => (
              <div
                key={token}
                className="p-5 rounded-lg flex flex-col gap-3"
                style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
              >
                <div>
                  <code
                    className="text-xs block mb-1"
                    style={{ color: 'var(--io-accent-text)', fontFamily: 'monospace' }}
                  >
                    {token}
                  </code>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold" style={{ color: 'var(--io-text-primary)' }}>
                      {value}
                    </span>
                  </div>
                </div>
                <p
                  className="text-sm border-l-2 pl-3"
                  style={{ lineHeight: value, color: 'var(--io-text-secondary)', borderColor: 'var(--io-border)' }}
                >
                  io Digital builds products for people. Clear typography makes interfaces easier to
                  use and faster to understand.
                </p>
                <p className="text-xs" style={{ color: 'var(--io-text-muted)' }}>
                  {usage}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Sizing ────────────────────────────────────────────────── */}
      <section id="sizing" className="space-y-4">
        <SectionHeader
          title="Sizing"
          description="An 11-step scale from 12px to 64px — every step mapped to a semantic token."
        />
        <div style={{ borderTop: '1px solid var(--io-border)' }}>
          {[
            { token: '--io-font-size-xs',   rem: '0.75rem',  px: '12px', usage: 'Badges, timestamps, metadata' },
            { token: '--io-font-size-sm',   rem: '0.875rem', px: '14px', usage: 'Captions, helper text, labels' },
            { token: '--io-font-size-base', rem: '1rem',     px: '16px', usage: 'Body copy' },
            { token: '--io-font-size-lg',   rem: '1.125rem', px: '18px', usage: 'Lead paragraph' },
            { token: '--io-font-size-xl',   rem: '1.25rem',  px: '20px', usage: 'Subheading' },
            { token: '--io-font-size-2xl',  rem: '1.5rem',   px: '24px', usage: 'Section heading (h3)' },
            { token: '--io-font-size-3xl',  rem: '1.875rem', px: '30px', usage: 'Page heading (h2)' },
            { token: '--io-font-size-4xl',  rem: '2rem',     px: '32px', usage: 'Large heading' },
            { token: '--io-font-size-5xl',  rem: '2.25rem',  px: '36px', usage: 'Display' },
            { token: '--io-font-size-6xl',  rem: '3rem',     px: '48px', usage: 'Hero' },
            { token: '--io-font-size-7xl',  rem: '4rem',     px: '64px', usage: 'Splash / marketing' },
          ].map(({ token, rem, px, usage }) => (
            <div
              key={token}
              className="flex items-baseline gap-4 py-4"
              style={{ borderBottom: '1px solid var(--io-border)' }}
            >
              <span
                className="flex-1 min-w-0 truncate"
                style={{
                  fontSize: `var(${token})`,
                  color: 'var(--io-text-primary)',
                  lineHeight: 1.3,
                  fontFamily: 'var(--io-font-primary)',
                }}
              >
                The quick brown fox
              </span>
              <div className="shrink-0 flex items-center gap-3">
                <span className="text-xs w-20 hidden sm:block" style={{ color: 'var(--io-text-muted)' }}>
                  {rem} / {px}
                </span>
                <span className="text-xs w-36 hidden md:block text-right" style={{ color: 'var(--io-text-muted)' }}>
                  {usage}
                </span>
                <code
                  className="text-xs px-1.5 py-0.5 rounded hidden lg:block"
                  style={{ background: 'var(--io-accent-bg)', color: 'var(--io-accent-text)', fontFamily: 'monospace' }}
                >
                  {token}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Placement examples ────────────────────────────────────── */}
      <section id="placement-examples" className="space-y-6">
        <SectionHeader
          title="Placement examples"
          description="How the scale and weights work together in real product contexts."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Article / content hierarchy */}
          <div
            className="p-6 rounded-lg space-y-3"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
          >
            <SubsectionTitle>Content hierarchy</SubsectionTitle>
            <p
              style={{
                fontSize: 'var(--io-font-size-3xl)',
                fontWeight: 700,
                letterSpacing: 'var(--io-heading-tracking-2)',
                lineHeight: 1.2,
                color: 'var(--io-text-primary)',
                fontFamily: 'var(--io-font-primary)',
              }}
            >
              Page title
            </p>
            <p
              style={{
                fontSize: 'var(--io-font-size-2xl)',
                fontWeight: 600,
                letterSpacing: 'var(--io-heading-tracking-3)',
                lineHeight: 1.25,
                color: 'var(--io-text-primary)',
                fontFamily: 'var(--io-font-primary)',
              }}
            >
              Section heading
            </p>
            <p
              style={{
                fontSize: 'var(--io-font-size-lg)',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'var(--io-text-secondary)',
                fontFamily: 'var(--io-font-primary)',
              }}
            >
              Lead paragraph — introduce the section with a single sentence that gives the reader
              context before the detail.
            </p>
            <p
              style={{
                fontSize: 'var(--io-font-size-base)',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'var(--io-text-secondary)',
                fontFamily: 'var(--io-font-primary)',
              }}
            >
              Body copy at base size. This is the default reading size for all paragraph content
              across io Digital product interfaces. Comfortable at normal line-height.
            </p>
          </div>

          {/* UI component context */}
          <div
            className="p-6 rounded-lg space-y-4"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
          >
            <SubsectionTitle>UI components</SubsectionTitle>

            {/* Input field mock */}
            <div className="space-y-1">
              <p
                style={{
                  fontSize: 'var(--io-font-size-xs)',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--io-text-muted)',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--io-font-primary)',
                }}
              >
                Label
              </p>
              <div
                className="rounded-md px-3 py-2"
                style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-base)' }}
              >
                <p
                  style={{
                    fontSize: 'var(--io-font-size-sm)',
                    fontWeight: 400,
                    color: 'var(--io-text-secondary)',
                    fontFamily: 'var(--io-font-primary)',
                  }}
                >
                  Placeholder text
                </p>
              </div>
              <p
                style={{
                  fontSize: 'var(--io-font-size-xs)',
                  fontWeight: 400,
                  color: 'var(--io-text-muted)',
                  fontFamily: 'var(--io-font-primary)',
                }}
              >
                Helper text — additional context for the field above.
              </p>
            </div>

            {/* Badge */}
            <div className="flex flex-wrap gap-2">
              {['Default', 'Active', 'Disabled'].map((label) => (
                <span
                  key={label}
                  className="px-2.5 py-1 rounded-full"
                  style={{
                    fontSize: 'var(--io-font-size-xs)',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    background: 'var(--io-accent-bg)',
                    color: 'var(--io-accent-text)',
                    fontFamily: 'var(--io-font-primary)',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Caption */}
            <p
              style={{
                fontSize: 'var(--io-font-size-xs)',
                fontWeight: 400,
                color: 'var(--io-text-muted)',
                lineHeight: 1.5,
                fontFamily: 'var(--io-font-primary)',
              }}
            >
              Caption — timestamp, metadata, or supplementary note at the smallest scale.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. Code usage ─────────────────────────────────────────── */}
      <section id="code-usage" className="space-y-6">
        <SectionHeader
          title="Code usage"
          description="Reference the typography tokens in your Angular or React project."
        />
        <CodeTabs
          tabs={[
            {
              label: 'Angular',
              code: `/* In your Angular component styles */
.heading-1 {
  font-family: var(--io-font-primary);
  font-size: var(--io-font-size-3xl);
  font-weight: var(--io-font-weight-bold);
  letter-spacing: var(--io-heading-tracking-3);
}

.body-copy {
  font-family: var(--io-font-primary);
  font-size: var(--io-font-size-base);
  line-height: var(--io-line-height-base);
  color: var(--io-text-primary);
}

.caption {
  font-size: var(--io-font-size-sm);
  color: var(--io-text-secondary);
}`,
            },
            {
              label: 'React',
              code: `import { fontPrimary, fontWeightBold, fontWeightSemibold } from '@io-digital/components/styles';

/* Use JS token exports in CSS-in-JS or inline styles */
<h1 style={{ fontFamily: fontPrimary, fontWeight: fontWeightBold }}>
  Page heading
</h1>

<p style={{ fontFamily: fontPrimary, fontWeight: fontWeightSemibold }}>
  Semibold body copy
</p>

/* Or reference CSS custom properties directly */
<p style={{ fontSize: 'var(--io-font-size-sm)', color: 'var(--io-text-secondary)' }}>
  Caption text
</p>`,
            },
          ]}
        />
      </section>

      {/* ── 9. Do's and don'ts ───────────────────────────────────────── */}
      <section id="dos-and-donts" className="space-y-6">
        <SectionHeader
          title="Do's and don'ts"
          description="Quick reference for correct and incorrect typographic usage across io Digital products."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use Manrope for all product UI text — headings, body, labels, and captions.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Apply negative letter-spacing tokens (<code style={{ fontSize: '0.85em' }}>--io-heading-tracking-*</code>) to all heading levels.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Set body copy at <code style={{ fontSize: '0.85em' }}>--io-line-height-normal</code> (1.5) for comfortable reading.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Reserve <code style={{ fontSize: '0.85em' }}>Bold</code> and <code style={{ fontSize: '0.85em' }}>SemiBold</code> weights for headings and key labels.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Mix Manrope with other decorative or display typefaces in product UI.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use zero or positive letter-spacing on large headings — it removes the io Digital character.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Apply <code style={{ fontSize: '0.85em' }}>tight</code> or <code style={{ fontSize: '0.85em' }}>display</code> line-height to body text — it damages readability at paragraph sizes.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use <code style={{ fontSize: '0.85em' }}>Light (300)</code> weight for interactive labels or small text at low contrast — it fails WCAG AA.
            </DoOrDontCard>
          </div>
        </div>
      </section>
    </div>
  );
}
