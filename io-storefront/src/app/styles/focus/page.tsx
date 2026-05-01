'use client';

import React from 'react';

import { CodeTabs } from '@/components/CodeTabs';
import { PageHeader } from '@/components/layout/PageHeader';

// ── Local helpers (same pattern as motion/page.tsx) ──────────────────────────

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
          style={{ color: 'var(--io-text-primary)', letterSpacing: 'var(--io-heading-tracking-3, -0.015em)' }}
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

function TokenRow({ token, useCase }: { token: string; useCase: string }) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-3 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <code className="text-xs font-mono shrink-0" style={{ color: 'var(--io-text-primary)', width: 260 }}>
        {token}
      </code>
      <span
        className="w-6 h-6 rounded shrink-0 border"
        style={{
          background: `var(${token})`,
          borderColor: 'var(--io-border)',
        }}
        aria-hidden="true"
      />
      <span className="text-xs" style={{ color: 'var(--io-text-secondary)' }}>
        {useCase}
      </span>
    </div>
  );
}

// ── Interactive focus ring demo ───────────────────────────────────────────────

function FocusRingDemo() {
  const [showRing, setShowRing] = React.useState(false);

  return (
    <div
      className="rounded-lg p-5"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
          Focus ring preview
        </p>
        <button
          type="button"
          onClick={() => setShowRing((v) => !v)}
          className="text-xs font-semibold px-3 py-2 rounded-md"
          style={{
            color: 'var(--io-text-primary)',
            border: '1px solid var(--io-border)',
            background: 'var(--io-bg-card)',
            minWidth: 'var(--io-touch-target-min)',
            cursor: 'pointer',
          }}
          aria-pressed={showRing}
        >
          {showRing ? 'Hide ring' : 'Show ring'}
        </button>
      </div>

      <style>{`.focus-demo-live:focus-visible{outline:none;box-shadow:0 0 0 2px var(--io-focus-inner),0 0 0 5px var(--io-focus-outer)}`}</style>

      <div className="flex flex-wrap items-center gap-6 p-4 rounded-md" style={{ background: 'var(--io-bg-base)' }}>
        {/* Simulated button with programmatic focus ring */}
        <div
          className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-shadow"
          style={{
            background: 'var(--io-color-primary)',
            color: 'var(--io-text-on-primary, #fff)',
            boxShadow: showRing
              ? '0 0 0 2px var(--io-focus-inner), 0 0 0 5px var(--io-focus-outer)'
              : 'none',
          }}
          aria-hidden="true"
        >
          Button
        </div>

        {/* Real tabbable element */}
        <button
          type="button"
          aria-label="Tab into me"
          className="focus-demo-live px-4 py-2 rounded-lg text-sm font-semibold"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            color: 'var(--io-text-primary)',
            cursor: 'pointer',
          }}
        >
          Tab into me <span aria-hidden="true">↵</span>
        </button>
      </div>

      <p className="mt-3 text-xs" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        The left element shows the composed double-ring via the toggle. The right element receives the live focus ring
        on keyboard Tab — try pressing Tab to reach it.
      </p>
    </div>
  );
}

// ── Token data ────────────────────────────────────────────────────────────────

const FOCUS_TOKENS = [
  {
    token: '--io-focus-inner',
    useCase: 'Inner ring — dark red (#7D0034), 2 px solid outline',
  },
  {
    token: '--io-focus-outer',
    useCase: 'Outer halo — light pink (#FFE4EE), 3 px offset',
  },
] as const;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FocusPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Focus"
        description="The io Digital double-ring focus indicator — a dark red inner ring and a light pink outer halo that meet WCAG AA non-text contrast requirements."
        tabs={[]}
      />

      {/* Introduction */}
      <section id="introduction" className="space-y-6">
        <SectionHeader
          title="Introduction"
          description="Keyboard-visible focus indicators built for Shadow DOM reliability."
        />
        <div className="space-y-4">
          <p className="text-base" style={{ color: 'var(--io-text-primary)', lineHeight: '1.7' }}>
            io Digital components use a <strong>double-ring</strong> focus pattern: a 2 px dark-red inner ring
            (
            <code style={{ fontSize: '0.85em' }}>--io-focus-inner</code>) surrounded by a 3 px light-pink outer halo
            (
            <code style={{ fontSize: '0.85em' }}>--io-focus-outer</code>). Together they create strong contrast
            against both light and dark backgrounds, satisfying WCAG 1.4.11 non-text contrast at the 3:1 ratio.
          </p>
          <p className="text-base" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7' }}>
            The ring is applied via the{' '}
            <code style={{ fontSize: '0.85em' }}>--io-focus-ring-active</code> CSS custom property, which is set to
            the composed <code style={{ fontSize: '0.85em' }}>box-shadow</code> value by{' '}
            <code style={{ fontSize: '0.85em' }}>initFocusVisible()</code> only when the user navigates by keyboard.
            Pointer interactions leave the property as <code style={{ fontSize: '0.85em' }}>none</code>, so
            click/tap targets never show a focus ring.
          </p>
          <p className="text-base" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7' }}>
            This JS-modality approach is used instead of the CSS-native{' '}
            <code style={{ fontSize: '0.85em' }}>:focus-visible</code> selector because Stencil Shadow DOM with{' '}
            <code style={{ fontSize: '0.85em' }}>delegatesFocus: true</code> does not reliably propagate the
            <code style={{ fontSize: '0.85em' }}>:focus-visible</code> pseudo-class across the shadow boundary in all
            browsers.
          </p>
        </div>
      </section>

      {/* Tokens */}
      <section id="tokens" className="space-y-4">
        <SectionHeader
          title="Tokens"
          description="The two colour tokens that compose the double-ring focus indicator."
        />
        <div className="space-y-2">
          {FOCUS_TOKENS.map((row) => (
            <TokenRow key={row.token} token={row.token} useCase={row.useCase} />
          ))}
        </div>
        <div
          className="mt-4 p-5 rounded-lg space-y-2"
          style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
        >
          <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
            Composed ring
          </p>
          <code className="block text-xs font-mono" style={{ color: 'var(--io-text-secondary)' }}>
            box-shadow: 0 0 0 2px var(--io-focus-inner), 0 0 0 5px var(--io-focus-outer)
          </code>
          <p className="text-xs" style={{ color: 'var(--io-text-muted)', lineHeight: '1.6' }}>
            Applied via <code style={{ fontSize: '0.9em' }}>--io-focus-ring-active</code> — set dynamically by{' '}
            <code style={{ fontSize: '0.9em' }}>initFocusVisible()</code> on keyboard navigation.
          </p>
        </div>
      </section>

      {/* Live demo */}
      <section id="live-demo" className="space-y-6">
        <SectionHeader
          title="Live demo"
          description="Toggle the double-ring preview, or Tab into the live button to see the real keyboard focus ring."
        />
        <FocusRingDemo />
      </section>

      {/* initFocusVisible */}
      <section id="init-focus-visible" className="space-y-4">
        <SectionHeader
          title="initFocusVisible()"
          description="The JS modality tracker that gates the focus ring to keyboard-only interactions."
        />
        <div className="space-y-4">
          <p className="text-base" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7' }}>
            <code style={{ fontSize: '0.85em' }}>initFocusVisible()</code> listens for{' '}
            <code style={{ fontSize: '0.85em' }}>keydown</code> and{' '}
            <code style={{ fontSize: '0.85em' }}>pointerdown</code> events on the document. When a Tab key press is
            detected, it sets{' '}
            <code style={{ fontSize: '0.85em' }}>--io-focus-ring-active</code> on the root element to the full
            double-ring <code style={{ fontSize: '0.85em' }}>box-shadow</code>. A subsequent pointer interaction
            clears it back to <code style={{ fontSize: '0.85em' }}>none</code>.
          </p>
          <p className="text-base" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7' }}>
            The function is idempotent — calling it multiple times is safe. It must be called once at application
            startup, before any user interaction occurs.
          </p>
        </div>
      </section>

      {/* Usage guidance */}
      <section id="usage" className="space-y-4">
        <SectionHeader
          title="Usage guidance"
          description="Principles that ensure accessible focus indicators across all io Digital products."
        />
        <div className="space-y-3">
          <RuleCard label="Call initFocusVisible() once at app startup">
            Import and call it in your root layout or app initialisation code. In Next.js, place it in a{' '}
            <code style={{ fontSize: '0.85em' }}>{'use client'}</code> component rendered from{' '}
            <code style={{ fontSize: '0.85em' }}>layout.tsx</code>.
          </RuleCard>
          <RuleCard label="Use --io-focus-ring-active in component CSS">
            In Shadow DOM component styles, write{' '}
            <code style={{ fontSize: '0.85em' }}>{'box-shadow: var(--io-focus-ring-active, none)'}</code> on
            the focused element — never reference <code style={{ fontSize: '0.85em' }}>--io-focus-inner</code> or{' '}
            <code style={{ fontSize: '0.85em' }}>--io-focus-outer</code> directly. The active token is the correct
            consumer API.
          </RuleCard>
          <RuleCard label="Never suppress focus indicators">
            Do not add <code style={{ fontSize: '0.85em' }}>outline: none</code> or{' '}
            <code style={{ fontSize: '0.85em' }}>outline: 0</code> without providing an equivalent custom indicator.
            Removing the focus ring without a replacement fails WCAG 2.4.7.
          </RuleCard>
        </div>
      </section>

      {/* Code usage */}
      <section id="code-usage" className="space-y-6">
        <SectionHeader
          title="Code usage"
          description="How to initialise the focus ring system in Angular, React, and plain HTML."
        />
        <CodeTabs
          tabs={[
            {
              label: 'Angular',
              language: 'typescript',
              code: `// app.component.ts
import { Component, OnInit } from '@angular/core';
import { initFocusVisible } from '@io-digital/components/utils/focus-visible';

@Component({ selector: 'app-root', templateUrl: './app.component.html' })
export class AppComponent implements OnInit {
  ngOnInit(): void {
    initFocusVisible();
  }
}`,
            },
            {
              label: 'React',
              language: 'typescript',
              code: `// app/layout.tsx (or a client component rendered from layout)
'use client';

import { useEffect } from 'react';
import { initFocusVisible } from '@io-digital/components/utils/focus-visible';

export function FocusInit() {
  useEffect(() => {
    initFocusVisible();
  }, []);
  return null;
}`,
            },
            {
              label: 'HTML',
              language: 'html',
              code: `<!-- In your main entry script (vanilla JS / CDN) -->
<script type="module">
  import { initFocusVisible } from '@io-digital/components/dist/utils.js';
  initFocusVisible();
</script>

<!-- Component CSS — use the active token, not the raw values -->
<style>
  my-element:focus {
    outline: none;
    box-shadow: var(--io-focus-ring-active, none);
  }
</style>`,
            },
          ]}
        />
      </section>

      {/* Do and don't */}
      <section id="dos-and-donts" className="space-y-6">
        <SectionHeader
          title="Do and don't"
          description="Guardrails that keep focus indicators accessible and consistent across io Digital products."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoOrDontCard type="do">
            Always call <code style={{ fontSize: '0.85em' }}>initFocusVisible()</code> once at application startup
            so the modality tracker is active before any user interaction.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Do not skip <code style={{ fontSize: '0.85em' }}>initFocusVisible()</code> — without it,{' '}
            <code style={{ fontSize: '0.85em' }}>--io-focus-ring-active</code> is never set and keyboard users
            will see no focus indicator.
          </DoOrDontCard>
          <DoOrDontCard type="do">
            Reference <code style={{ fontSize: '0.85em' }}>var(--io-focus-ring-active, none)</code> in Shadow DOM
            component styles to inherit the keyboard-only gating behaviour.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Do not remove <code style={{ fontSize: '0.85em' }}>outline</code> without providing a custom
            indicator — the focus ring is a WCAG 2.4.7 Level AA requirement.
          </DoOrDontCard>
          <DoOrDontCard type="do">
            Trust the double-ring pattern for contrast: the dark-red inner ring and light-pink outer halo together
            meet the 3:1 non-text contrast ratio on both light and dark backgrounds.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Do not override <code style={{ fontSize: '0.85em' }}>--io-focus-inner</code> or{' '}
            <code style={{ fontSize: '0.85em' }}>--io-focus-outer</code> at the component level — changes to the
            brand focus ring must go through the design token system.
          </DoOrDontCard>
        </div>
      </section>
    </div>
  );
}
