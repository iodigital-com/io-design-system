'use client';

import { PageHeader } from '@/components/layout/PageHeader';

// ── Token data ────────────────────────────────────────────────────────────────

type GradientToken = {
  token: string;
  label: string;
  description: string;
  cssValue: string;
};

type GradientGroup = {
  id: string;
  title: string;
  description: string;
  tokens: GradientToken[];
};

const GRADIENT_GROUPS: GradientGroup[] = [
  {
    id: 'brand',
    title: 'Brand',
    description:
      'Directional gradients built from the core brand palette. Use for calls-to-action, hero buttons, and brand-forward surfaces.',
    tokens: [
      {
        token: '--io-gradient-brand-primary',
        label: 'Brand Primary',
        description: 'Primary blue gradient — default CTA and hero accent',
        cssValue: 'linear-gradient(135deg, var(--io-color-primary) 0%, var(--io-color-primary-hover) 100%)',
      },
      {
        token: '--io-gradient-brand-warm',
        label: 'Brand Warm',
        description: 'Orange-to-yellow energy gradient — warm accent surfaces',
        cssValue: 'linear-gradient(135deg, var(--io-color-orange) 0%, var(--io-color-yellow) 100%)',
      },
      {
        token: '--io-gradient-brand-cool',
        label: 'Brand Cool',
        description: 'Lavender-to-muted-blue — calm, accessible accent panels',
        cssValue: 'linear-gradient(135deg, var(--io-color-lavendel) 0%, var(--io-color-primary-muted) 100%)',
      },
    ],
  },
  {
    id: 'surface',
    title: 'Surface',
    description:
      'Vertical gradients for full-bleed backgrounds and section fills. Pair with white or light text for hero sections.',
    tokens: [
      {
        token: '--io-gradient-surface-hero',
        label: 'Surface Hero',
        description: 'Deep primary blue — full-bleed hero backgrounds',
        cssValue: 'linear-gradient(180deg, var(--io-color-primary) 0%, var(--io-color-primary-active) 100%)',
      },
      {
        token: '--io-gradient-surface-subtle',
        label: 'Surface Subtle',
        description: 'Greyscale wash — light-mode page section backgrounds',
        cssValue: 'linear-gradient(180deg, var(--io-color-grey-1) 0%, var(--io-color-grey-2) 100%)',
      },
      {
        token: '--io-gradient-surface-warm',
        label: 'Surface Warm',
        description: 'Off-white to beige — warm editorial section fills',
        cssValue: 'linear-gradient(180deg, var(--io-color-off-white) 0%, var(--io-color-beige) 100%)',
      },
    ],
  },
  {
    id: 'overlay',
    title: 'Overlay',
    description:
      'Transparent-to-dark gradients for image overlays and media scrim effects. Ensure text above these meets WCAG AA contrast.',
    tokens: [
      {
        token: '--io-gradient-overlay-bottom',
        label: 'Overlay Bottom',
        description: 'Fades from transparent to dark at the bottom — card and image captions',
        cssValue: 'linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.60) 100%)',
      },
      {
        token: '--io-gradient-overlay-top',
        label: 'Overlay Top',
        description: 'Fades from transparent to dark at the top — reverse caption placement',
        cssValue: 'linear-gradient(to top, transparent 40%, rgba(0, 0, 0, 0.60) 100%)',
      },
      {
        token: '--io-gradient-overlay-scrim',
        label: 'Overlay Scrim',
        description: 'Light full-height scrim — softer media overlays',
        cssValue: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.45) 100%)',
      },
    ],
  },
  {
    id: 'semantic',
    title: 'Semantic',
    description:
      'Named aliases that map intent to gradient tokens. Prefer these over direct token references in product code.',
    tokens: [
      {
        token: '--io-gradient-hero',
        label: 'Hero',
        description: 'Alias → --io-gradient-surface-hero — for hero section backgrounds',
        cssValue: 'var(--io-gradient-surface-hero)',
      },
      {
        token: '--io-gradient-card-overlay',
        label: 'Card Overlay',
        description: 'Alias → --io-gradient-overlay-bottom — for card image scrim',
        cssValue: 'var(--io-gradient-overlay-bottom)',
      },
      {
        token: '--io-gradient-cta',
        label: 'CTA',
        description: 'Alias → --io-gradient-brand-primary — for call-to-action surfaces',
        cssValue: 'var(--io-gradient-brand-primary)',
      },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span
          style={{
            display: 'block',
            width: '4px',
            height: '1.25rem',
            borderRadius: '9999px',
            flexShrink: 0,
            background: 'var(--io-accent)',
          }}
          aria-hidden="true"
        />
        <h2
          style={{
            fontSize: 'var(--io-font-size-xl)',
            fontWeight: 700,
            color: 'var(--io-text-primary)',
            letterSpacing: 'var(--io-heading-tracking-3, -0.015em)',
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      <p
        style={{
          marginLeft: '0.75rem',
          fontSize: 'var(--io-font-size-sm)',
          color: 'var(--io-text-secondary)',
          lineHeight: '1.6',
          margin: '0.25rem 0 0 0.75rem',
        }}
      >
        {description}
      </p>
    </div>
  );
}

function GradientSwatch({ token, label, description, cssValue }: GradientToken) {
  return (
    <div
      style={{
        border: '1px solid var(--io-border)',
        borderRadius: 'var(--io-border-radius-md, 12px)',
        overflow: 'hidden',
        background: 'var(--io-bg-raised)',
      }}
    >
      {/* Visual swatch */}
      <div
        aria-hidden="true"
        style={{
          height: '120px',
          background: `var(${token})`,
        }}
      />

      {/* Token info */}
      <div style={{ padding: 'var(--io-space-4, 16px)' }}>
        <p
          style={{
            fontSize: 'var(--io-font-size-sm)',
            fontWeight: 600,
            color: 'var(--io-text-primary)',
            margin: '0 0 var(--io-space-1, 4px) 0',
          }}
        >
          {label}
        </p>
        <code
          style={{
            display: 'block',
            fontSize: 'var(--io-font-size-xs)',
            color: 'var(--io-accent-text)',
            fontFamily: 'monospace',
            marginBottom: 'var(--io-space-2, 8px)',
          }}
        >
          {token}
        </code>
        <p
          style={{
            fontSize: 'var(--io-font-size-xs)',
            color: 'var(--io-text-secondary)',
            lineHeight: '1.5',
            margin: 0,
          }}
        >
          {description}
        </p>
        <code
          style={{
            display: 'block',
            marginTop: 'var(--io-space-2, 8px)',
            fontSize: 'var(--io-font-size-xs)',
            color: 'var(--io-text-muted)',
            fontFamily: 'monospace',
            wordBreak: 'break-all',
            lineHeight: '1.5',
          }}
        >
          {cssValue}
        </code>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GradientsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      <PageHeader
        title="Gradients"
        description="Token-based gradient system for brand surfaces, hero sections, and image overlays. Twelve primitives across four categories with semantic aliases for common use cases."
        tabs={[]}
      />

      {/* Introduction */}
      <section id="introduction">
        <SectionHeader
          title="Introduction"
          description="All gradients in the io Digital system are defined as CSS custom properties and reference existing colour tokens."
        />
        <p
          style={{
            fontSize: 'var(--io-font-size-base)',
            color: 'var(--io-text-primary)',
            lineHeight: '1.7',
            margin: '0 0 var(--io-space-4, 16px) 0',
          }}
        >
          The gradient token system provides ready-made directional gradients for the three most common
          production patterns: brand-coloured CTAs, full-bleed hero backgrounds, and image overlay scrims.
          Each token composes existing <code style={{ fontSize: '0.85em' }}>--io-color-*</code> primitives —
          meaning gradients automatically respond to dark-mode colour overrides.
        </p>
        <p
          style={{
            fontSize: 'var(--io-font-size-base)',
            color: 'var(--io-text-secondary)',
            lineHeight: '1.7',
            margin: 0,
          }}
        >
          Always use gradient tokens via <code style={{ fontSize: '0.85em' }}>var(--io-gradient-*)</code> —
          never hardcode gradient values. Prefer semantic aliases (
          <code style={{ fontSize: '0.85em' }}>--io-gradient-hero</code>,{' '}
          <code style={{ fontSize: '0.85em' }}>--io-gradient-cta</code>) in product code so that future
          design changes propagate automatically.
        </p>
      </section>

      {/* Token groups */}
      {GRADIENT_GROUPS.map((group) => (
        <section key={group.id} id={group.id}>
          <SectionHeader title={group.title} description={group.description} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--io-space-4, 16px)',
            }}
          >
            {group.tokens.map((token) => (
              <GradientSwatch key={token.token} {...token} />
            ))}
          </div>
        </section>
      ))}

      {/* Usage guidance */}
      <section id="usage">
        <SectionHeader
          title="Usage guidance"
          description="Principles for applying gradient tokens consistently across product surfaces."
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--io-space-3, 12px)' }}>
          {[
            {
              label: 'Use semantic aliases in product code',
              body: 'Reference --io-gradient-hero, --io-gradient-cta, or --io-gradient-card-overlay rather than their underlying primitive. Semantic names communicate intent and insulate product code from system-level changes.',
            },
            {
              label: 'Never hardcode gradient values',
              body: 'Write background: var(--io-gradient-brand-primary) — not the resolved linear-gradient() string. Tokens allow the palette to evolve without touching individual components or pages.',
            },
            {
              label: 'Ensure text contrast on overlay gradients',
              body: 'Overlay tokens darken to rgba(0,0,0,0.60) at the opaque end. Always verify that text placed above overlay gradients meets WCAG AA (4.5:1 for small text, 3:1 for large text).',
            },
            {
              label: 'Pair surface gradients with inverse text',
              body: 'Surface hero and brand-primary gradients use dark blue tones. Use --io-text-inverse (white) for heading text placed directly on these surfaces.',
            },
          ].map(({ label, body }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                gap: 'var(--io-space-4, 16px)',
                padding: 'var(--io-space-5, 20px)',
                borderRadius: 'var(--io-border-radius-sm, 9px)',
                border: '1px solid var(--io-border)',
                background: 'var(--io-bg-raised)',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '4px',
                  borderRadius: '9999px',
                  flexShrink: 0,
                  marginTop: '2px',
                  height: '1rem',
                  background: 'var(--io-accent)',
                }}
                aria-hidden="true"
              />
              <div>
                <p
                  style={{
                    fontSize: 'var(--io-font-size-sm)',
                    fontWeight: 600,
                    color: 'var(--io-text-primary)',
                    margin: '0 0 var(--io-space-1, 4px) 0',
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: 'var(--io-font-size-sm)',
                    color: 'var(--io-text-secondary)',
                    lineHeight: '1.6',
                    margin: 0,
                  }}
                >
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
