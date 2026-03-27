import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CodeTabs } from '@/components/CodeTabs';

// ── Mandatory helpers (Rule 11 — copy verbatim) ───────────────────────────────

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

// ── Page-specific helpers ─────────────────────────────────────────────────────

function BreakpointRow({ token, px, label }: { token: string; px: number; label?: string }) {
  const pct = Math.round((px / 1920) * 100);
  return (
    <div
      className="flex items-center gap-4 px-5 py-3 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <code className="text-xs font-mono shrink-0" style={{ color: 'var(--io-text-primary)', width: 168 }}>
        {token}
      </code>
      <div style={{ flex: '1 1 0', height: 10, background: 'var(--io-bg-hover)', borderRadius: 3 }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            minWidth: 4,
            background: 'var(--io-accent)',
            borderRadius: 3,
            opacity: 0.65,
          }}
        />
      </div>
      <code className="text-xs font-mono shrink-0 text-right" style={{ color: 'var(--io-text-secondary)', width: 52 }}>
        {px}px
      </code>
      {label && (
        <span className="text-xs shrink-0" style={{ color: 'var(--io-text-muted)', width: 72 }}>
          {label}
        </span>
      )}
    </div>
  );
}

function LayoutTokenRow({ token, value, description }: { token: string; value: string; description: string }) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-3 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <code className="text-xs font-mono shrink-0" style={{ color: 'var(--io-text-primary)', width: 200 }}>
        {token}
      </code>
      <code className="text-xs font-mono shrink-0" style={{ color: 'var(--io-accent-text)', width: 100 }}>
        {value}
      </code>
      <span className="text-xs" style={{ color: 'var(--io-text-secondary)' }}>
        {description}
      </span>
    </div>
  );
}

// ── Token data ────────────────────────────────────────────────────────────────

const BREAKPOINT_TOKENS = [
  { token: '--io-breakpoint-xs',  px: 375,  label: 'Mobile S'   },
  { token: '--io-breakpoint-sm',  px: 600,  label: 'Mobile L'   },
  { token: '--io-breakpoint-md',  px: 768,  label: 'Tablet'     },
  { token: '--io-breakpoint-lg',  px: 1024, label: 'Laptop'     },
  { token: '--io-breakpoint-xl',  px: 1200, label: 'Desktop'    },
  { token: '--io-breakpoint-2xl', px: 1440, label: 'Wide'       },
  { token: '--io-breakpoint-3xl', px: 1920, label: '4K'         },
] as const;

const LAYOUT_TOKENS = [
  { token: '--io-container-max',       value: '76.5rem (1224px)', description: 'Maximum content container width — centred with equal side gutters' },
  { token: '--io-sidebar-nav-width',   value: '320px',            description: 'Left navigation sidebar' },
  { token: '--io-sidebar-config-width',value: '320px',            description: 'Right configurator panel' },
  { token: '--io-header-height',       value: '72px',             description: 'Top header bar' },
] as const;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GridPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Grid"
        description="A 40/160px modular grid and 12-column fluid layout that bring structural clarity to every screen size."
        tabs={[]}
      />

      {/* ── 1. Introduction ───────────────────────────────────────── */}
      <section id="introduction" className="space-y-6">
        <SectionHeader
          title="Introduction"
          description="Structural grids give every io Digital interface a consistent visual rhythm from mobile to 4K."
        />
        <div className="space-y-4">
          <p className="text-base" style={{ color: 'var(--io-text-primary)', lineHeight: '1.7' }}>
            The io Digital grid system combines two complementary structures: a{' '}
            <strong style={{ fontWeight: 600 }}>40/160px modular grid</strong> for fine-grained
            typographic alignment and a{' '}
            <strong style={{ fontWeight: 600 }}>12-column fluid grid</strong> for macro layout
            composition across breakpoints. Together they provide spatial consistency at every scale —
            from icon padding to full-page sectioning.
          </p>
          <p className="text-base" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7' }}>
            All layout dimensions are token-based. The container maximum width, sidebar widths, header
            height, and breakpoints are all exposed as{' '}
            <code style={{ fontSize: '0.875em' }}>--io-*</code> custom properties so the structural
            skeleton of every page adapts from a single source of truth.
          </p>
        </div>
      </section>

      {/* ── 2. 40 / 160 px grid ───────────────────────────────────── */}
      <section id="40-160-px-grid" className="space-y-6">
        <SectionHeader
          title="40/160 px grid"
          description="A baseline unit of 40px and a macro unit of 160px (4 × 40) that anchor spatial decisions at every density."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 40px base unit visual */}
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: '1px solid var(--io-border)' }}
          >
            <div
              className="relative flex items-end gap-px p-6"
              style={{ background: 'var(--io-bg-base)', minHeight: 120 }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 40,
                    height: 40,
                    background: 'var(--io-accent)',
                    opacity: 0.12 + i * 0.03,
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />
              ))}
              <span
                className="absolute bottom-2 left-6 text-xs font-mono"
                style={{ color: 'var(--io-accent)' }}
              >
                40px
              </span>
            </div>
            <div
              className="px-4 py-3"
              style={{ borderTop: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
            >
              <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
                Base unit — 40px
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--io-text-secondary)' }}>
                Baseline module for component heights, icon targets, and typographic alignment
              </p>
            </div>
          </div>

          {/* 160px macro unit visual */}
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: '1px solid var(--io-border)' }}
          >
            <div
              className="relative flex items-end gap-px p-6"
              style={{ background: 'var(--io-bg-base)', minHeight: 120 }}
            >
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 160,
                    height: 80,
                    background: 'var(--io-accent)',
                    opacity: 0.18 + i * 0.08,
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />
              ))}
              <span
                className="absolute bottom-2 left-6 text-xs font-mono"
                style={{ color: 'var(--io-accent)' }}
              >
                160px
              </span>
            </div>
            <div
              className="px-4 py-3"
              style={{ borderTop: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
            >
              <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
                Macro unit — 160px (4 × 40)
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--io-text-secondary)' }}>
                Column blocks, hero heights, and large sectioning — always a whole multiple of 40px
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RuleCard label="40px base">
            The 40px unit governs micro-level decisions: touch targets, icon bounding boxes, input
            heights, and baseline alignment. It maps to 2.5rem and produces integer pixel values at
            the browser's default 16px root font size.
          </RuleCard>
          <RuleCard label="160px macro">
            Four 40px units combine into the 160px macro module — a structural landmark used for
            column widths, card minimum heights, and section-level spacing. Both multiples reinforce
            the 4px base unit from the spacing scale.
          </RuleCard>
        </div>
      </section>

      {/* ── 3. 12-column grid ─────────────────────────────────────── */}
      <section id="12-column-grid" className="space-y-6">
        <SectionHeader
          title="12-column grid"
          description="A fluid 12-column layout constrained to 1224px — centred with equal gutters and responsive across all breakpoints."
        />

        <SubsectionTitle>Container</SubsectionTitle>

        {/* Container visual */}
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: '1px solid var(--io-border)' }}
        >
          <div className="p-6" style={{ background: 'var(--io-bg-base)' }}>
            <div
              className="relative w-full rounded"
              style={{ height: 56, background: 'var(--io-bg-hover)', border: '1px dashed var(--io-border)' }}
            >
              <div
                className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center justify-center rounded"
                style={{
                  width: '80%',
                  maxWidth: '100%',
                  background: 'var(--io-accent-bg)',
                  outline: '1px dashed var(--io-accent)',
                  outlineOffset: -1,
                }}
              >
                <span className="text-xs font-mono" style={{ color: 'var(--io-accent-text)' }}>
                  1224px max — centred
                </span>
              </div>
              <span
                className="absolute left-2 top-1/2 -translate-y-1/2 text-xs"
                style={{ color: 'var(--io-text-muted)' }}
              >
                100% viewport
              </span>
            </div>
          </div>
          <div
            className="px-4 py-3"
            style={{ borderTop: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
          >
            <code className="text-xs font-mono" style={{ color: 'var(--io-text-primary)' }}>
              --io-container-max: 76.5rem
            </code>
            <p className="text-xs mt-0.5" style={{ color: 'var(--io-text-secondary)' }}>
              Apply as <code style={{ fontSize: '0.9em' }}>max-width: var(--io-container-max)</code>{' '}
              with horizontal auto margins and side padding on smaller viewports.
            </p>
          </div>
        </div>

        <SubsectionTitle>Column visualiser</SubsectionTitle>

        {/* 12 column grid visualiser */}
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: '1px solid var(--io-border)' }}
        >
          <div className="p-4" style={{ background: 'var(--io-bg-base)' }}>
            <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded flex items-center justify-center"
                  style={{
                    height: 40,
                    background: 'var(--io-accent)',
                    opacity: 0.15 + (i % 2) * 0.08,
                  }}
                >
                  <span className="text-xs font-mono" style={{ color: 'var(--io-accent-text)', opacity: 0 }}>
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs mt-2 font-mono" style={{ color: 'var(--io-text-muted)' }}>
              12 columns · 24px gutters · max 1224px
            </p>
          </div>
        </div>

        <SubsectionTitle>Layout tokens</SubsectionTitle>
        <div className="space-y-2">
          {LAYOUT_TOKENS.map((t) => (
            <LayoutTokenRow key={t.token} token={t.token} value={t.value} description={t.description} />
          ))}
        </div>

        <SubsectionTitle>Breakpoints</SubsectionTitle>
        <div className="space-y-2">
          {BREAKPOINT_TOKENS.map((t) => (
            <BreakpointRow key={t.token} token={t.token} px={t.px} label={t.label} />
          ))}
        </div>
        <RuleCard label="Mobile-first">
          All breakpoints are <code style={{ fontSize: '0.85em' }}>min-width</code> queries — styles
          apply from the named width upwards. Start with the smallest viewport and add complexity as
          the screen grows. Reference breakpoints exclusively via{' '}
          <code style={{ fontSize: '0.85em' }}>--io-breakpoint-*</code> tokens; never hardcode magic
          numbers in media queries.
        </RuleCard>
      </section>

      {/* ── 4. Modular composition ────────────────────────────────── */}
      <section id="modular-composition" className="space-y-6">
        <SectionHeader
          title="Modular composition"
          description="Combining the 40/160px baseline with the 12-column grid to build coherent layouts at any viewport."
        />

        <SubsectionTitle>Column spans</SubsectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { span: 12, label: 'Full width',       note: 'Hero sections, full-bleed banners, page headers',                twClass: 'col-span-12'    },
            { span:  8, label: 'Content primary',  note: 'Main editorial column, article body, primary form',              twClass: 'col-span-8'     },
            { span:  6, label: 'Half-width',        note: 'Two-up cards, split layouts, comparison panels',                 twClass: 'col-span-6'     },
            { span:  4, label: 'Tertiary / aside',  note: 'Sidebar widgets, summary panels, 3-column card grids',           twClass: 'col-span-4'     },
          ].map(({ span, label, note, twClass }) => (
            <div
              key={span}
              className="rounded-lg overflow-hidden"
              style={{ border: '1px solid var(--io-border)' }}
            >
              <div className="p-4" style={{ background: 'var(--io-bg-base)' }}>
                <div className="grid gap-0.5" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-sm"
                      style={{
                        height: 20,
                        background: i < span ? 'var(--io-accent)' : 'var(--io-bg-hover)',
                        opacity: i < span ? 0.5 : 1,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div
                className="px-4 py-3"
                style={{ borderTop: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
              >
                <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
                  {label}{' '}
                  <code className="text-xs font-mono" style={{ color: 'var(--io-text-muted)' }}>
                    {twClass}
                  </code>
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--io-text-secondary)' }}>
                  {note}
                </p>
              </div>
            </div>
          ))}
        </div>

        <SubsectionTitle>Responsive pattern</SubsectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RuleCard label="Stack → expand">
            At <code style={{ fontSize: '0.85em' }}>xs</code> / <code style={{ fontSize: '0.85em' }}>sm</code>{' '}
            all columns collapse to full-width{' '}
            <code style={{ fontSize: '0.85em' }}>col-span-12</code>. At{' '}
            <code style={{ fontSize: '0.85em' }}>md</code> (768px) introduce column splits. At{' '}
            <code style={{ fontSize: '0.85em' }}>lg</code> (1024px) apply the final desktop layout.
          </RuleCard>
          <RuleCard label="Content offset">
            Offset reading columns with{' '}
            <code style={{ fontSize: '0.85em' }}>col-start-*</code> for centred editorial layouts.
            A standard long-read layout uses{' '}
            <code style={{ fontSize: '0.85em' }}>col-start-3 col-span-8</code> on desktop — leaving
            two columns of breathing room on each side.
          </RuleCard>
        </div>
      </section>

      {/* ── 5. Code usage ─────────────────────────────────────────── */}
      <section id="code-usage" className="space-y-6">
        <SectionHeader
          title="Code usage"
          description="Reference the grid and breakpoint tokens in your Angular or React project."
        />
        <CodeTabs
          tabs={[
            {
              label: 'Angular',
              code: `/* In your Angular component styles */
.page-container {
  max-width: var(--io-container-max); /* 1224px */
  margin-inline: auto;
  padding-inline: var(--io-space-6);
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--io-space-6);
}

@media (min-width: 768px) { /* --io-breakpoint-md */
  .split-layout {
    grid-column: span 6;
  }
}`,
            },
            {
              label: 'React',
              code: `import { gridStyle, getMediaQueryMin } from '@io-digital/components/styles';

/* Use gridStyle() helper for inline grid layouts */
<div style={gridStyle(12, 'var(--io-space-6)')}>
  {/* 12-column grid children */}
</div>

/* Use getMediaQueryMin() for JS-driven breakpoint logic */
const isMdUp = window.matchMedia(getMediaQueryMin('md')).matches;

/* Container max-width via CSS token */
<main style={{ maxWidth: 'var(--io-container-max)', marginInline: 'auto' }}>
  Page content
</main>`,
            },
          ]}
        />
      </section>

      {/* ── 6. Do's and don'ts ────────────────────────────────────── */}
      <section id="dos-and-donts" className="space-y-6">
        <SectionHeader
          title="Do's and don'ts"
          description="Rules for consistent, scalable grid usage across all product surfaces."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoOrDontCard type="do">
            Always apply{' '}
            <code style={{ fontSize: '0.85em' }}>max-width: var(--io-container-max)</code> for
            full-width layouts — never hardcode{' '}
            <code style={{ fontSize: '0.85em' }}>max-width: 1224px</code> directly.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Don't use arbitrary column widths or magic-number{' '}
            <code style={{ fontSize: '0.85em' }}>px</code> values in media queries — always use{' '}
            <code style={{ fontSize: '0.85em' }}>--io-breakpoint-*</code> tokens so the system
            remains auditable and consistent.
          </DoOrDontCard>
          <DoOrDontCard type="do">
            Design mobile-first: base styles target the smallest viewport, and breakpoints add
            complexity upward. Use{' '}
            <code style={{ fontSize: '0.85em' }}>min-width</code> exclusively — never
            <code style={{ fontSize: '0.85em' }}>max-width</code> overrides.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Don't nest grids more than two levels deep — inner grids should inherit the parent column
            context rather than restarting a fresh 12-column system, which creates misaligned gutters.
          </DoOrDontCard>
          <DoOrDontCard type="do">
            Align component heights to the 40px base unit where possible — this ensures inputs,
            buttons, and icon containers sit on a shared baseline across adjacent layout regions.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Don't skip the 40/160 modular grid when designing new page templates — arbitrary heights
            break the visual rhythm and make consistent vertical spacing impossible to maintain.
          </DoOrDontCard>
          <DoOrDontCard type="do">
            Use the 12-column grid collaboratively between design and development — define column
            spans, offsets, and breakpoint behaviour in Figma before writing layout code.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Don't rely on fixed pixel sidebars in content layouts — use{' '}
            <code style={{ fontSize: '0.85em' }}>--io-sidebar-nav-width</code> and{' '}
            <code style={{ fontSize: '0.85em' }}>--io-sidebar-config-width</code> tokens so sidebar
            dimensions are consistent and changeable from one place.
          </DoOrDontCard>
        </div>
      </section>
    </div>
  );
}
