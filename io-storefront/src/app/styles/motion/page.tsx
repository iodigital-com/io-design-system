'use client';

import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CodeTabs } from '@/components/CodeTabs';

function getCssVarValue(token: string): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}

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

function MotionToggleDemo({
  title,
  transition,
  motionToken,
  motionValue,
  note,
  reducedMotion,
}: {
  title: string;
  transition: string;
  motionToken: string;
  motionValue: string;
  note: string;
  reducedMotion: boolean;
}) {
  const [active, setActive] = React.useState(false);

  return (
    <div
      className="rounded-lg p-5"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
          {title}
        </p>
        <button
          type="button"
          onClick={() => setActive((current) => !current)}
          className="text-xs font-semibold px-3 py-2 rounded-md"
          style={{
            color: 'var(--io-text-primary)',
            border: '1px solid var(--io-border)',
            background: 'var(--io-bg-card)',
            minWidth: 'var(--io-touch-target-min)',
            cursor: 'pointer',
          }}
          aria-pressed={active}
        >
          {active ? 'Reset' : 'Play'}
        </button>
      </div>

      <div className="rounded-md p-3" style={{ background: 'var(--io-bg-base)' }}>
        <div
          className="relative rounded"
          style={{
            height: 'calc(var(--io-space-7) + var(--io-space-4))',
            border: '1px solid var(--io-border)',
            background: 'var(--io-bg-card)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              insetInline: 'var(--io-space-3)',
              top: '50%',
              height: '2px',
              background: 'var(--io-border)',
              transform: 'translateY(-50%)',
            }}
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: active
                ? 'calc(100% - var(--io-space-3) - var(--io-space-6))'
                : 'var(--io-space-3)',
              width: 'var(--io-space-6)',
              height: 'var(--io-space-6)',
              borderRadius: 'var(--io-border-radius-pill)',
              background: 'var(--io-accent)',
              transform: 'translateY(-50%)',
              transition: reducedMotion ? 'none' : transition,
            }}
          />
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <code className="block text-xs font-mono" style={{ color: 'var(--io-text-primary)' }}>
          {motionToken} = {motionValue || '...'}
        </code>
        <code className="block text-xs font-mono" style={{ color: 'var(--io-text-muted)' }}>
          transition: {reducedMotion ? 'none (prefers-reduced-motion)' : transition}
        </code>
      </div>

      <p className="mt-2 text-xs" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        {note}
      </p>
    </div>
  );
}

function EasingComparisonDemo({
  reducedMotion,
  easingToken,
  easingValue,
}: {
  reducedMotion: boolean;
  easingToken: string;
  easingValue: string;
}) {
  const [active, setActive] = React.useState(false);
  const transition = `left var(--io-toast-item-enter-duration) var(${easingToken})`;

  return (
    <div
      className="rounded-lg p-4"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="text-xs font-semibold" style={{ color: 'var(--io-text-primary)' }}>
          {easingToken}
        </p>
        <button
          type="button"
          onClick={() => setActive((current) => !current)}
          className="text-xs font-semibold px-3 py-2 rounded-md"
          style={{
            color: 'var(--io-text-primary)',
            border: '1px solid var(--io-border)',
            background: 'var(--io-bg-card)',
            minWidth: 'var(--io-touch-target-min)',
            cursor: 'pointer',
          }}
          aria-pressed={active}
        >
          {active ? 'Reset' : 'Play'}
        </button>
      </div>

      <div
        className="relative rounded"
        style={{
          height: 'calc(var(--io-space-7) + var(--io-space-2))',
          border: '1px solid var(--io-border)',
          background: 'var(--io-bg-card)',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: active
              ? 'calc(100% - var(--io-space-3) - var(--io-space-5))'
              : 'var(--io-space-3)',
            width: 'var(--io-space-5)',
            height: 'var(--io-space-5)',
            borderRadius: 'var(--io-border-radius-pill)',
            background: 'var(--io-accent)',
            transform: 'translateY(-50%)',
            transition: reducedMotion ? 'none' : transition,
          }}
        />
      </div>

      <code className="block mt-3 text-xs font-mono" style={{ color: 'var(--io-text-muted)' }}>
        {easingToken} = {easingValue || '...'}
      </code>
      <p className="mt-2 text-xs" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        Uses <code style={{ fontSize: '0.85em' }}>--io-toast-item-enter-duration</code> with this easing token.
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
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [resolvedTokens, setResolvedTokens] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const applyReducedMotion = () => {
      setReducedMotion(mq.matches);
    };

    const syncTokenValues = () => {
      const tokens = [
        '--io-motion-fast',
        '--io-motion-base',
        '--io-motion-slow',
        '--io-toast-item-enter-duration',
        '--io-motion-easing-standard',
        '--io-motion-easing-snappy',
        '--io-motion-easing-ease-out',
      ] as const;

      const nextValues = tokens.reduce<Record<string, string>>((acc, token) => {
        acc[token] = getCssVarValue(token);
        return acc;
      }, {});

      setResolvedTokens(nextValues);
    };

    applyReducedMotion();
    syncTokenValues();

    mq.addEventListener('change', applyReducedMotion);
    return () => {
      mq.removeEventListener('change', applyReducedMotion);
    };
  }, []);

  const durationMotionDemos = [
    {
      title: 'Fast transition',
      motionToken: '--io-motion-fast',
      transition: 'left var(--io-motion-fast)',
      note: 'Best for micro-interactions like hover and compact state feedback.',
    },
    {
      title: 'Base transition',
      motionToken: '--io-motion-base',
      transition: 'left var(--io-motion-base)',
      note: 'Use as the default interaction tempo across most components.',
    },
    {
      title: 'Slow transition',
      motionToken: '--io-motion-slow',
      transition: 'left var(--io-motion-slow)',
      note: 'Reserve for larger structural changes where orientation matters.',
    },
    {
      title: 'Toast-style enter',
      motionToken: '--io-toast-item-enter-duration',
      transition:
        'left var(--io-toast-item-enter-duration) var(--io-motion-easing-ease-out), opacity var(--io-toast-item-enter-duration) var(--io-motion-easing-ease-out)',
      note: 'Matches notification-entry rhythm used by toast item animations.',
    },
  ] as const;

  const easingComparison = [
    '--io-motion-easing-standard',
    '--io-motion-easing-snappy',
    '--io-motion-easing-ease-out',
  ] as const;

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
          description="Interactive examples showing real token values in motion."
        />

        <SubsectionTitle>Duration in action</SubsectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {durationMotionDemos.map((demo) => (
            <MotionToggleDemo
              key={demo.title}
              title={demo.title}
              transition={demo.transition}
              motionToken={demo.motionToken}
              motionValue={resolvedTokens[demo.motionToken]}
              note={demo.note}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        <SubsectionTitle>Easing comparison</SubsectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {easingComparison.map((token) => (
            <EasingComparisonDemo
              key={token}
              easingToken={token}
              easingValue={resolvedTokens[token]}
              reducedMotion={reducedMotion}
            />
          ))}
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
          <RuleCard label="Interactive demos follow user preference">
            These motion previews disable transitions when reduced motion is enabled and still show
            state change on toggle.
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
              language: 'css',
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
              language: 'typescript',
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
