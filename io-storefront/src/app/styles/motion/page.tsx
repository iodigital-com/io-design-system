'use client';

import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CodeTabs } from '@/components/CodeTabs';

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

function TokenRow({ token, value, useCase }: { token: string; value: string; useCase: string }) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-3 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <code className="text-xs font-mono shrink-0" style={{ color: 'var(--io-text-primary)', width: 260 }}>
        {token}
      </code>
      <code className="text-xs font-mono shrink-0" style={{ color: 'var(--io-accent-text)', width: 140 }}>
        {value}
      </code>
      <span className="text-xs" style={{ color: 'var(--io-text-secondary)' }}>
        {useCase}
      </span>
    </div>
  );
}

function MotionDemoCard({
  title,
  transition,
  note,
}: {
  title: string;
  transition: string;
  note: string;
}) {
  return (
    <div
      className="rounded-lg p-5"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <p className="text-sm font-semibold mb-3" style={{ color: 'var(--io-text-primary)' }}>
        {title}
      </p>
      <div className="rounded-md p-3" style={{ background: 'var(--io-bg-base)' }}>
        <div
          className="h-2 rounded"
          style={{
            width: '70%',
            background: 'var(--io-accent)',
            opacity: 0.85,
            transition,
          }}
        />
      </div>
      <code className="block mt-3 text-xs font-mono" style={{ color: 'var(--io-text-muted)' }}>
        {transition}
      </code>
      <p className="mt-2 text-xs" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        {note}
      </p>
    </div>
  );
}

const DURATION_TOKENS = [
  {
    token: '--io-motion-fast',
    value: '200ms ease',
    useCase: 'Micro feedback: hover/focus transitions, icon state changes',
  },
  {
    token: '--io-motion-base',
    value: '300ms ease',
    useCase: 'Default UI transitions for most component interactions',
  },
  {
    token: '--io-motion-slow',
    value: '500ms ease-in-out',
    useCase: 'Larger structural transitions that need emphasis',
  },
  {
    token: '--io-button-spinner-duration',
    value: '600ms',
    useCase: 'Button spinner rotation timing',
  },
  {
    token: '--io-toast-item-enter-duration',
    value: '250ms',
    useCase: 'Toast enter animation timing',
  },
] as const;

const EASING_TOKENS = [
  {
    token: '--io-motion-easing-standard',
    value: 'ease',
    useCase: 'Baseline easing for generic transitions',
  },
  {
    token: '--io-motion-easing-in-out',
    value: 'ease-in-out',
    useCase: 'Balanced enter and exit for panel-style changes',
  },
  {
    token: '--io-motion-easing-snappy',
    value: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
    useCase: 'Responsive UI feedback where quick settle feels appropriate',
  },
  {
    token: '--io-motion-easing-bounce',
    value: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    useCase: 'Limited expressive emphasis only',
  },
  {
    token: '--io-motion-easing-ease-out',
    value: 'cubic-bezier(0.4, 0, 0.2, 1)',
    useCase: 'Decelerating exits and reveal transitions',
  },
] as const;

export default function MotionPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Motion"
        description="Token-driven animation timing and easing guidance for consistent, accessible movement across io Digital interfaces."
        tabs={[]}
      />

      <section id="introduction" className="space-y-6">
        <SectionHeader
          title="Introduction"
          description="Motion in io Digital products is functional feedback, not decorative noise."
        />
        <div className="space-y-4">
          <p className="text-base" style={{ color: 'var(--io-text-primary)', lineHeight: '1.7' }}>
            Motion helps people understand state changes, orientation, and hierarchy. Use it to support
            interaction clarity, not to draw attention for its own sake.
          </p>
          <p className="text-base" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7' }}>
            All timing and easing in this system is token-based. Components should reference
            <code style={{ fontSize: '0.85em' }}> var(--io-motion-*)</code> values to stay consistent and
            auditable.
          </p>
        </div>
      </section>

      <section id="duration-tokens" className="space-y-6">
        <SectionHeader
          title="Duration tokens"
          description="Use a small set of durations to keep interaction timing coherent across components."
        />
        <div className="space-y-3">
          {DURATION_TOKENS.map((row) => (
            <TokenRow key={row.token} token={row.token} value={row.value} useCase={row.useCase} />
          ))}
        </div>
      </section>

      <section id="easing-tokens" className="space-y-6">
        <SectionHeader
          title="Easing tokens"
          description="Easing controls perceived intent. Choose curves based on interaction purpose, not preference."
        />
        <div className="space-y-3">
          {EASING_TOKENS.map((row) => (
            <TokenRow key={row.token} token={row.token} value={row.value} useCase={row.useCase} />
          ))}
        </div>
      </section>

      <section id="application-patterns" className="space-y-6">
        <SectionHeader
          title="Application patterns"
          description="Reference patterns for common product interactions using approved motion tokens."
        />

        <SubsectionTitle>Common pairings</SubsectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MotionDemoCard
            title="Micro feedback"
            transition="transform var(--io-motion-fast), opacity var(--io-motion-fast)"
            note="Use for button hover, icon transitions, and lightweight state acknowledgment."
          />
          <MotionDemoCard
            title="Component transition"
            transition="opacity var(--io-motion-base), transform var(--io-motion-base)"
            note="Use for panel reveal/collapse where movement supports orientation."
          />
          <MotionDemoCard
            title="Emphasis transition"
            transition="opacity var(--io-motion-slow) var(--io-motion-easing-ease-out)"
            note="Use sparingly for larger overlays or staged reveals."
          />
          <MotionDemoCard
            title="Toast enter"
            transition="opacity var(--io-toast-item-enter-duration) var(--io-motion-easing-ease-out)"
            note="Align notification entry timing to toast token for consistency."
          />
        </div>
      </section>

      <section id="reduced-motion" className="space-y-6">
        <SectionHeader
          title="Reduced motion"
          description="Respect user motion preferences and preserve meaning without animation."
        />
        <div className="space-y-4">
          <RuleCard label="Always support prefers-reduced-motion">
            Provide a reduced-motion path that removes or significantly minimizes non-essential animation.
            Interaction outcomes must remain understandable without movement.
          </RuleCard>
          <RuleCard label="Do not rely on motion as the only cue">
            Pair animated transitions with semantic state, clear labels, and visual contrast so meaning is
            preserved when motion is reduced.
          </RuleCard>
        </div>
      </section>

      <section id="code-usage" className="space-y-6">
        <SectionHeader
          title="Code usage"
          description="Reference motion tokens in Angular and React codebases using the same contract."
        />
        <CodeTabs
          tabs={[
            {
              label: 'Angular',
              code: `/* Angular component styles */
.card {
  transition: opacity var(--io-motion-base) var(--io-motion-easing-standard),
              transform var(--io-motion-base) var(--io-motion-easing-standard);
}

.toast-enter {
  transition: opacity var(--io-toast-item-enter-duration) var(--io-motion-easing-ease-out);
}

@media (prefers-reduced-motion: reduce) {
  .card,
  .toast-enter {
    transition-duration: 1ms;
  }
}`,
            },
            {
              label: 'React',
              code: `export function MotionExample() {
  return (
    <div
      style={{
        transition:
          'opacity var(--io-motion-base) var(--io-motion-easing-standard), transform var(--io-motion-base) var(--io-motion-easing-standard)',
      }}
    >
      Motion-safe content
    </div>
  );
}

/* CSS module or global CSS */
@media (prefers-reduced-motion: reduce) {
  .motion-safe {
    transition-duration: 1ms;
  }
}`,
            },
          ]}
        />
      </section>

      <section id="dos-and-donts" className="space-y-6">
        <SectionHeader
          title="Do and don't"
          description="Guardrails that keep motion consistent, accessible, and aligned with the iO design language."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoOrDontCard type="do">
            Use <code style={{ fontSize: '0.85em' }}>var(--io-motion-*)</code> tokens for duration and easing.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Do not hardcode ad hoc <code style={{ fontSize: '0.85em' }}>ms</code> or custom cubic-bezier values
            in product components.
          </DoOrDontCard>
          <DoOrDontCard type="do">
            Keep motion subtle and purposeful: orientation, feedback, and state transition clarity.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Do not use decorative or exaggerated motion that competes with content hierarchy.
          </DoOrDontCard>
          <DoOrDontCard type="do">
            Provide reduced-motion fallbacks and preserve semantic meaning when animation is minimized.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Do not make animation the sole signal for errors, success, or completion states.
          </DoOrDontCard>
        </div>
      </section>
    </div>
  );
}
