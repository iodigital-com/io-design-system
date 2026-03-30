'use client';

import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CodeTabs } from '@/components/CodeTabs';
import { ColourTokenGrid } from '@/components/ColourTokenGrid';

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
  return (
    <div
      className="flex gap-3 p-4 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <span
        className="block w-1 shrink-0 rounded-full mt-0.5"
        style={{
          background: type === 'do' ? 'var(--io-color-success)' : 'var(--io-color-error)',
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

// ── ColourSwatch ──────────────────────────────────────────────────────────────

function ColourSwatch({
  token,
  hex,
  name,
  border,
  size = 64,
}: {
  token: string;
  hex: string;
  name: string;
  border?: boolean;
  size?: number;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="rounded-md shadow-sm"
        style={{
          width: size,
          height: size,
          background: hex,
          border: border ? '1px solid var(--io-border)' : undefined,
          flexShrink: 0,
        }}
      />
      <span
        className="text-xs font-medium text-center"
        style={{ color: 'var(--io-text-primary)', maxWidth: size }}
      >
        {name}
      </span>
      <code
        className="text-xs text-center"
        style={{ color: 'var(--io-text-muted)', maxWidth: size + 16 }}
      >
        {hex}
      </code>
      <code
        className="text-xs text-center"
        style={{ color: 'var(--io-text-muted)', maxWidth: size + 16, fontSize: '0.65rem' }}
      >
        {token}
      </code>
    </div>
  );
}

// ── HeroSwatch ────────────────────────────────────────────────────────────────

function HeroSwatch({
  token,
  hex,
  name,
  description,
}: {
  token: string;
  hex: string;
  name: string;
  description: string;
}) {
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--io-border)' }}
    >
      <div
        className="flex items-end p-6"
        style={{ background: hex, minHeight: 140 }}
      >
        <span
          className="text-xs font-bold px-2 py-1 rounded"
          style={{ background: 'rgba(255,255,255,0.18)', color: '#ffffff', backdropFilter: 'blur(4px)' }}
        >
          {hex}
        </span>
      </div>
      <div
        className="px-5 py-4 space-y-1"
        style={{ background: 'var(--io-bg-raised)', borderTop: '1px solid var(--io-border)' }}
      >
        <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
          {name}
        </p>
        <code
          className="text-xs block"
          style={{ color: 'var(--io-accent-text)', fontFamily: 'monospace' }}
        >
          {token}
        </code>
        <p className="text-xs" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.5' }}>
          {description}
        </p>
      </div>
    </div>
  );
}

// ── TreatmentCard ─────────────────────────────────────────────────────────────

function TreatmentCard({
  fg,
  bg,
  fgLabel,
  bgLabel,
  level,
}: {
  fg: string;
  bg: string;
  fgLabel: string;
  bgLabel: string;
  level: 'AAA' | 'AA' | 'AA Large';
}) {
  const levelColour = level === 'AAA' ? 'var(--io-color-success)' : 'var(--io-color-primary)';
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--io-border)' }}
    >
      {/* Live preview */}
      <div
        className="flex items-center justify-between px-5 py-5"
        style={{ background: bg }}
      >
        <p
          className="text-base font-semibold"
          style={{ color: fg }}
        >
          Sample text — {fgLabel}
        </p>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(0,0,0,0.08)', color: fg, border: `1px solid ${fg}22` }}
        >
          WCAG {level}
        </span>
      </div>
      {/* Labels */}
      <div
        className="px-4 py-3 flex items-center gap-4"
        style={{ background: 'var(--io-bg-raised)', borderTop: '1px solid var(--io-border)' }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className="w-3 h-3 rounded-full shrink-0 border"
            style={{ background: fg, borderColor: 'var(--io-border)' }}
          />
          <span className="text-xs truncate" style={{ color: 'var(--io-text-secondary)' }}>
            {fgLabel}
          </span>
        </div>
        <span style={{ color: 'var(--io-text-muted)' }} className="text-xs shrink-0">on</span>
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className="w-3 h-3 rounded-full shrink-0 border"
            style={{ background: bg, borderColor: 'var(--io-border)' }}
          />
          <span className="text-xs truncate" style={{ color: 'var(--io-text-secondary)' }}>
            {bgLabel}
          </span>
        </div>
        <span
          className="ml-auto text-xs font-bold shrink-0"
          style={{ color: levelColour }}
        >
          ✓ {level}
        </span>
      </div>
    </div>
  );
}

// ── BackgroundRow ─────────────────────────────────────────────────────────────

function BackgroundRow({
  token,
  lightHex,
  darkHex,
  usage,
}: {
  token: string;
  lightHex: string;
  darkHex: string;
  usage: string;
}) {
  return (
    <tr style={{ borderBottom: '1px solid var(--io-border)' }}>
      <td className="py-3 pr-4">
        <code
          className="text-xs px-1.5 py-0.5 rounded"
          style={{ background: 'var(--io-accent-bg)', color: 'var(--io-accent-text)', fontFamily: 'monospace' }}
        >
          {token}
        </code>
      </td>
      <td className="py-3 pr-4">
        <div className="flex items-center gap-2">
          <span
            className="w-5 h-5 rounded shrink-0 border"
            style={{ background: lightHex, borderColor: 'var(--io-border)' }}
          />
          <code className="text-xs" style={{ color: 'var(--io-text-muted)', fontFamily: 'monospace' }}>
            {lightHex}
          </code>
        </div>
      </td>
      <td className="py-3 pr-4">
        <div className="flex items-center gap-2">
          <span
            className="w-5 h-5 rounded shrink-0 border"
            style={{ background: darkHex, borderColor: 'var(--io-border)' }}
          />
          <code className="text-xs" style={{ color: 'var(--io-text-muted)', fontFamily: 'monospace' }}>
            {darkHex}
          </code>
        </div>
      </td>
      <td className="py-3">
        <span className="text-xs" style={{ color: 'var(--io-text-secondary)' }}>
          {usage}
        </span>
      </td>
    </tr>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ColoursPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Colours"
        description="io Digital's colour system — from the Energetic Blue accent through warm brand neutrals and a precise greyscale ramp."
        tabs={[]}
      />

      {/* ── 1. Introduction ──────────────────────────────────────────── */}
      <section id="introduction" className="space-y-4">
        <SectionHeader
          title="Introduction"
          description="Why colour matters for io Digital products."
        />
        <p
          className="max-w-2xl"
          style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7', fontSize: 'var(--io-font-size-sm)' }}
        >
          Colour is central to io Digital's identity. Energetic Blue (<code style={{ fontSize: '0.85em' }}>#0000D2</code>) is the
          primary accent — bold, confident, unmistakable. Around it, warm neutrals (off-white, beige,
          antraciet) create a grounded, human feel that sets io Digital apart from purely
          corporate design systems.
        </p>
        <p
          className="max-w-2xl"
          style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7', fontSize: 'var(--io-font-size-sm)' }}
        >
          The system is structured in layers: <strong style={{ color: 'var(--io-text-primary)' }}>accent</strong> →{' '}
          <strong style={{ color: 'var(--io-text-primary)' }}>base</strong> →{' '}
          <strong style={{ color: 'var(--io-text-primary)' }}>greyscale</strong> →{' '}
          <strong style={{ color: 'var(--io-text-primary)' }}>semantic</strong>. Every colour has a
          token. Components never reference hex values directly — they consume{' '}
          <code style={{ fontSize: '0.85em' }}>var(--io-*)</code> tokens that adapt automatically between
          light and dark mode.
        </p>
      </section>

      {/* ── 2. Accent colour ─────────────────────────────────────────── */}

        {/* ── 2. Colour tokens ─────────────────────────────────────────── */}
        <section id="colour-tokens" className="space-y-6">
          <SectionHeader
            title="Colour tokens"
            description="All design tokens — filter by category, toggle light/dark preview, click the copy icon to grab the CSS custom property name."
          />
          <ColourTokenGrid />
        </section>

        {/* ── 3. Accent colour ─────────────────────────────────────────── */}
      <section id="accent-colour" className="space-y-6">
        <SectionHeader
          title="Accent colour"
          description="Energetic Blue is the primary accent — it drives CTAs, interactive states, focus rings, and brand moments."
        />

        <SubsectionTitle>Primary</SubsectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <HeroSwatch
            token="--io-color-primary"
            hex="#0000D2"
            name="Energetic Blue"
            description="The primary brand blue. Used for CTAs, links, focus indicators, and key interactive elements."
          />
          <div className="flex flex-col gap-3">
            {[
              { token: '--io-color-primary-hover', hex: '#0000a8', name: 'Hover' },
              { token: '--io-color-primary-active', hex: '#000080', name: 'Active' },
              { token: '--io-color-primary-muted', hex: 'rgba(0,0,210,0.12)', name: 'Muted overlay' },
              { token: '--io-color-primary-bg', hex: 'rgba(0,0,210,0.06)', name: 'Tinted background' },
            ].map(({ token, hex, name }) => (
              <div
                key={token}
                className="flex items-center gap-4 p-3 rounded-lg"
                style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
              >
                <span
                  className="w-10 h-10 rounded-md shrink-0 border"
                  style={{ background: hex, borderColor: 'var(--io-border)' }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--io-text-primary)' }}>
                    {name}
                  </p>
                  <code
                    className="text-xs"
                    style={{ color: 'var(--io-text-muted)', fontFamily: 'monospace' }}
                  >
                    {token}
                  </code>
                </div>
                <code
                  className="text-xs shrink-0"
                  style={{ color: 'var(--io-text-muted)', fontFamily: 'monospace' }}
                >
                  {hex}
                </code>
              </div>
            ))}
          </div>
        </div>

        <SubsectionTitle>Secondary accents</SubsectionTitle>
        <div className="flex flex-wrap gap-6">
          <ColourSwatch token="--io-color-orange" hex="#ed7f53" name="Orange" />
          <ColourSwatch token="--io-color-rouge" hex="#a13865" name="Rouge" />
          <ColourSwatch token="--io-color-yellow" hex="#fdbc75" name="Yellow" />
          <ColourSwatch token="--io-color-lavendel" hex="#868ada" name="Lavendel" />
          <ColourSwatch token="--io-color-pink" hex="#DCC8C2" name="Pink" border />
        </div>
      </section>

      {/* ── 3. Base colour ───────────────────────────────────────────── */}
      <section id="base-colour" className="space-y-6">
        <SectionHeader
          title="Base colour"
          description="The warm brand neutrals that anchor io Digital's visual identity — from off-white surfaces to antraciet dark mode."
        />
        <div className="flex flex-wrap gap-6">
          <ColourSwatch token="--io-color-off-white" hex="#EBE8E3" name="Off White" border />
          <ColourSwatch token="--io-color-beige" hex="#DCCFC2" name="Beige" />
          <ColourSwatch token="--io-color-calm-beige" hex="#e1cfbf" name="Calm Beige" />
          <ColourSwatch token="--io-color-calm-pink" hex="#dcc8c2" name="Calm Pink" />
          <ColourSwatch token="--io-color-calm-blue" hex="#bdcad1" name="Calm Blue" />
          <ColourSwatch token="--io-color-calm-green" hex="#c4d1ce" name="Calm Green" />
          <ColourSwatch token="--io-color-antraciet" hex="#454545" name="Antraciet" />
          <ColourSwatch token="--io-color-white" hex="#ffffff" name="White" border />
          <ColourSwatch token="--io-color-black" hex="#000000" name="Black" />
        </div>
      </section>

      {/* ── 4. Greyscale colours ─────────────────────────────────────── */}
      <section id="greyscale-colours" className="space-y-6">
        <SectionHeader
          title="Greyscale colours"
          description="A 6-step greyscale ramp used for UI structure — borders, surfaces, disabled states, and body text."
        />

        {/* Visual ramp strip */}
        <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid var(--io-border)' }}>
          {[
            { token: '--io-color-grey-1', hex: '#f7f7f7', step: '1' },
            { token: '--io-color-grey-2', hex: '#ebebeb', step: '2' },
            { token: '--io-color-grey-3', hex: '#C4C4C4', step: '3' },
            { token: '--io-color-grey-4', hex: '#747474', step: '4' },
            { token: '--io-color-grey-5', hex: '#F4F4F4', step: '5' },
            { token: '--io-color-grey-6', hex: '#242424', step: '6' },
          ].map(({ hex, step }, i, arr) => (
            <div
              key={hex}
              className="flex-1 flex items-end justify-start p-2"
              style={{
                background: hex,
                height: 80,
                borderRight: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.06)' : undefined,
              }}
              title={hex}
            >
              <span
                className="text-[10px] font-bold"
                style={{ color: parseInt(step) >= 4 ? '#ffffff' : '#242424', opacity: 0.6 }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Token table */}
        <div style={{ borderTop: '1px solid var(--io-border)' }}>
          {[
            { token: '--io-color-grey-1', hex: '#f7f7f7', step: '1', usage: 'Lightest surface — raised card background' },
            { token: '--io-color-grey-2', hex: '#ebebeb', step: '2', usage: 'Borders, hover backgrounds' },
            { token: '--io-color-grey-3', hex: '#C4C4C4', step: '3', usage: 'Disabled text, medium borders' },
            { token: '--io-color-grey-4', hex: '#747474', step: '4', usage: 'Secondary / muted text' },
            { token: '--io-color-grey-5', hex: '#F4F4F4', step: '5', usage: 'Page background surface' },
            { token: '--io-color-grey-6', hex: '#242424', step: '6', usage: 'Primary text colour' },
          ].map(({ token, hex, step, usage }) => (
            <div
              key={token}
              className="flex items-center gap-4 py-3"
              style={{ borderBottom: '1px solid var(--io-border)' }}
            >
              <span
                className="w-8 h-8 rounded shrink-0 border"
                style={{ background: hex, borderColor: 'var(--io-border)' }}
              />
              <span className="text-xs w-4 shrink-0" style={{ color: 'var(--io-text-muted)' }}>
                {step}
              </span>
              <code
                className="text-xs px-1.5 py-0.5 rounded flex-1"
                style={{ background: 'var(--io-accent-bg)', color: 'var(--io-accent-text)', fontFamily: 'monospace' }}
              >
                {token}
              </code>
              <code
                className="text-xs w-20 shrink-0"
                style={{ color: 'var(--io-text-muted)', fontFamily: 'monospace' }}
              >
                {hex}
              </code>
              <span
                className="text-xs flex-1 hidden md:block"
                style={{ color: 'var(--io-text-secondary)' }}
              >
                {usage}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Adobe swatches ────────────────────────────────────────── */}

      {/* ── 5. Treatment ─────────────────────────────────────────────── */}
      <section id="treatment" className="space-y-6">
        <SectionHeader
          title="Treatment"
          description="Approved colour combinations with verified WCAG contrast levels."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TreatmentCard
            fg="#ffffff"
            bg="#0000D2"
            fgLabel="White"
            bgLabel="Energetic Blue"
            level="AA"
          />
          <TreatmentCard
            fg="#242424"
            bg="#EBE8E3"
            fgLabel="Grey 6"
            bgLabel="Off White"
            level="AAA"
          />
          <TreatmentCard
            fg="#242424"
            bg="#ffffff"
            fgLabel="Grey 6"
            bgLabel="White"
            level="AAA"
          />
          <TreatmentCard
            fg="#0000D2"
            bg="#EBE8E3"
            fgLabel="Energetic Blue"
            bgLabel="Off White"
            level="AA"
          />
          <TreatmentCard
            fg="#0000D2"
            bg="#ffffff"
            fgLabel="Energetic Blue"
            bgLabel="White"
            level="AA"
          />
          <TreatmentCard
            fg="#ffffff"
            bg="#454545"
            fgLabel="White"
            bgLabel="Antraciet"
            level="AA"
          />
        </div>
      </section>

      {/* ── 7. Background ────────────────────────────────────────────── */}
      <section id="background" className="space-y-6">
        <SectionHeader
          title="Background"
          description="Semantic background tokens — which surface to use and when."
        />

        <SubsectionTitle>Surface tokens</SubsectionTitle>
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: '1px solid var(--io-border)' }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}>
                {['Token', 'Light', 'Dark', 'Usage'].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold py-3 px-4"
                    style={{ color: 'var(--io-text-muted)', letterSpacing: '0.06em' }}
                  >
                    {h.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ background: 'var(--io-bg-base)' }}>
              <BackgroundRow token="--io-bg-base" lightHex="#ffffff" darkHex="#181818" usage="Default page / panel background" />
              <BackgroundRow token="--io-bg-raised" lightHex="#f7f7f7" darkHex="#2a2a2a" usage="Cards, elevated surfaces" />
              <BackgroundRow token="--io-bg-surface" lightHex="#f7f7f7" darkHex="#222222" usage="Inline surfaces, inputs" />
              <BackgroundRow token="--io-bg-hover" lightHex="#ebebeb" darkHex="#333333" usage="Hover states on base" />
              <BackgroundRow token="--io-bg-card" lightHex="#ffffff" darkHex="#222222" usage="Card components" />
            </tbody>
          </table>
        </div>

        <p
          className="text-xs"
          style={{ color: 'var(--io-text-muted)', lineHeight: '1.6' }}
        >
          These tokens automatically swap in dark mode — always use{' '}
          <code style={{ fontSize: '0.9em' }}>var(--io-bg-*)</code> in components, never raw hex.
        </p>

        <SubsectionTitle>Semantic status backgrounds</SubsectionTitle>
        <div className="flex flex-wrap gap-6">
          {[
            { token: '--io-color-success-soft', hex: 'rgba(48,197,142,0.1)', name: 'Success', usage: 'Alert/toast background' },
            { token: '--io-color-warning-soft', hex: 'rgba(255,161,0,0.1)', name: 'Warning', usage: 'Alert/toast background' },
            { token: '--io-color-error-soft', hex: 'rgba(255,97,97,0.1)', name: 'Error', usage: 'Alert/toast background' },
          ].map(({ token, hex, name, usage }) => (
            <div
              key={token}
              className="flex items-start gap-3 p-4 rounded-lg"
              style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)', minWidth: 200 }}
            >
              <span
                className="w-8 h-8 rounded shrink-0 border"
                style={{ background: hex, borderColor: 'var(--io-border)' }}
              />
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
                  {name}
                </p>
                <code
                  className="text-xs block"
                  style={{ color: 'var(--io-accent-text)', fontFamily: 'monospace' }}
                >
                  {token}
                </code>
                <p className="text-xs mt-0.5" style={{ color: 'var(--io-text-muted)' }}>
                  {usage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Code usage ─────────────────────────────────────────── */}
      <section id="code-usage" className="space-y-6">
        <SectionHeader
          title="Code usage"
          description="Reference the colour tokens in your Angular or React project."
        />
        <CodeTabs
          tabs={[
            {
              label: 'Angular',
              code: `/* In your Angular component styles */
.card {
  background: var(--io-bg-raised);
  border: 1px solid var(--io-border);
  color: var(--io-text-primary);
}

.cta {
  background: var(--io-color-primary);
  color: var(--io-color-white);
}

.status-badge--success { color: var(--io-color-success); }
.status-badge--warning { color: var(--io-color-warning); }
.status-badge--error   { color: var(--io-color-error);   }`,
            },
            {
              label: 'React',
              code: `/* Reference colour tokens via CSS custom properties */

function Card({ children }) {
  return (
    <div
      style={{
        background: 'var(--io-bg-raised)',
        border: '1px solid var(--io-border)',
        color: 'var(--io-text-primary)',
      }}
    >
      {children}
    </div>
  );
}

function PrimaryButton({ children }) {
  return (
    <button
      style={{
        background: 'var(--io-color-primary)',
        color: 'var(--io-color-white)',
      }}
    >
      {children}
    </button>
  );
}`,
            },
          ]}
        />
      </section>

      {/* ── 9. Do's and don'ts ───────────────────────────────────────── */}
      <section id="dos-and-donts" className="space-y-6">
        <SectionHeader
          title="Do's and don'ts"
          description="Quick reference for correct and incorrect colour usage across io Digital products."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use <code style={{ fontSize: '0.85em' }}>--io-color-primary</code> as the single dominant accent
              across all product interfaces.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always reference colours via <code style={{ fontSize: '0.85em' }}>var(--io-*)</code> tokens — never
              hardcode hex values in component styles.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use White or Off-White as the primary backgrounds; Antraciet for dark surfaces.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Maintain WCAG AA contrast ratios — minimum 4.5:1 for body text, 3:1 for large text
              and UI elements.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use more than one accent colour prominently on the same surface — let Energetic Blue
              lead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Place <code style={{ fontSize: '0.85em' }}>#0000D2</code> blue text on dark backgrounds — use{' '}
              <code style={{ fontSize: '0.85em' }}>--io-accent-text</code>, which automatically switches to Lavendel
              in dark mode.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use greyscale values for brand communication — Grey 1–6 are UI structural utilities,
              not brand colours.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Mix warm neutrals (beige, off-white) and cool greys in the same component — they
              belong to different surface contexts.
            </DoOrDontCard>
          </div>
        </div>
      </section>
    </div>
  );
}
