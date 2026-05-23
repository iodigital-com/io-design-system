'use client';

import { SectionHeader, InlineCode, CodeNote } from '@/components/api/ApiPrimitives';
import { PageHeader } from '@/components/layout/PageHeader';

// ── Token table data ───────────────────────────────────────────────────────────

type DensityTokenRow = {
  token: string;
  defaultValue: string;
  compact: string;
  comfortable: string;
  description: string;
};

const DENSITY_TOKENS: DensityTokenRow[] = [
  {
    token: '--io-spacing-component-y',
    defaultValue: 'var(--io-space-2, 8px)',
    compact: 'var(--io-space-1, 4px)',
    comfortable: 'var(--io-space-3, 12px)',
    description: 'Vertical (top / bottom) padding applied to interactive components.',
  },
  {
    token: '--io-spacing-component-x',
    defaultValue: 'var(--io-space-3, 12px)',
    compact: 'var(--io-space-2, 8px)',
    comfortable: 'var(--io-space-4, 16px)',
    description: 'Horizontal (left / right) padding applied to interactive components.',
  },
];

// ── Code samples ───────────────────────────────────────────────────────────────

const BASIC_USAGE = `<!-- Apply data-density to any container -->
<div data-density="compact">
  <io-button>Compact button</io-button>
  <io-input label="Compact input" />
</div>

<div data-density="comfortable">
  <io-button>Comfortable button</io-button>
  <io-input label="Comfortable input" />
</div>

<!-- Default (no attribute) uses standard density -->
<io-button>Default button</io-button>`;

const BRAND_OVERRIDE = `/* Override density values in your @layer brand block */
@layer brand {
  [data-density="compact"] {
    --io-spacing-component-y: var(--io-space-1, 4px);   /* tighter vertical */
    --io-spacing-component-x: var(--io-space-2, 8px);   /* tighter horizontal */
  }

  [data-density="comfortable"] {
    --io-spacing-component-y: var(--io-space-4, 16px);  /* looser vertical */
    --io-spacing-component-x: var(--io-space-6, 24px);  /* looser horizontal */
  }
}`;

const NEXT_JS_EXAMPLE = `// Apply data-density to a section of your layout
export function FormSection({ children }: { children: React.ReactNode }) {
  return (
    <section data-density="comfortable">
      {children}
    </section>
  );
}`;

// ── Sub-components ─────────────────────────────────────────────────────────────

function TokenTableRow({ row }: { row: DensityTokenRow }) {
  return (
    <div
      className="grid gap-4 px-4 py-3 rounded-lg"
      style={{
        border: '1px solid var(--io-border)',
        background: 'var(--io-bg-raised)',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
      }}
    >
      <code className="text-xs font-mono" style={{ color: 'var(--io-text-primary)' }}>
        {row.token}
      </code>
      <code className="text-xs font-mono" style={{ color: 'var(--io-text-secondary)' }}>
        {row.defaultValue}
      </code>
      <code className="text-xs font-mono" style={{ color: 'var(--io-text-secondary)' }}>
        {row.compact}
      </code>
      <code className="text-xs font-mono" style={{ color: 'var(--io-text-secondary)' }}>
        {row.comfortable}
      </code>
    </div>
  );
}

function TokenTableHeader() {
  const headings = ['Token', 'Default', 'compact', 'comfortable'];
  return (
    <div
      className="grid gap-4 px-4 py-2"
      style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}
    >
      {headings.map((h) => (
        <span key={h} className="text-xs font-semibold" style={{ color: 'var(--io-text-secondary)' }}>
          {h}
        </span>
      ))}
    </div>
  );
}

function DensityDemo({
  density,
  label,
}: {
  density: 'compact' | 'default' | 'comfortable';
  label: string;
}) {
  const attr = density !== 'default' ? { 'data-density': density } : {};
  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
      {...attr}
    >
      <p className="text-xs font-semibold" style={{ color: 'var(--io-text-secondary)' }}>
        {label}
      </p>
      <io-button color="blue">Primary action</io-button>
      <io-button variant="ghost" color="blue">Secondary action</io-button>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DensityPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Component Density"
        description="The density system lets consumers switch between compact, default, and comfortable spacing without custom CSS overrides. Place a data-density attribute on any container — all io components inside will inherit the scaled padding tokens."
        tabs={[]}
      />

      {/* How it works */}
      <section id="how-it-works" className="space-y-6">
        <SectionHeader
          title="How density works"
          description="Two CSS custom properties control vertical and horizontal padding across components. Each data-density value remaps them to a step on the spacing scale."
        />
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          Components such as <InlineCode>io-button</InlineCode>, <InlineCode>io-input</InlineCode>,
          and <InlineCode>io-select</InlineCode> use{' '}
          <InlineCode>--io-spacing-component-y</InlineCode> and{' '}
          <InlineCode>--io-spacing-component-x</InlineCode> for their padding. Because CSS custom
          properties are inherited, adding <InlineCode>data-density</InlineCode> to a parent
          element overrides those tokens for everything inside it — Shadow DOM included.
        </p>
      </section>

      {/* Token table */}
      <section id="tokens" className="space-y-4">
        <SectionHeader
          title="Density tokens"
          description="The two tokens and their values for each density level."
        />
        <div className="space-y-1">
          <TokenTableHeader />
          {DENSITY_TOKENS.map((row) => (
            <TokenTableRow key={row.token} row={row} />
          ))}
        </div>
      </section>

      {/* Live demo */}
      <section id="demo" className="space-y-6">
        <SectionHeader
          title="Live demo"
          description="The same io-button rendered inside each density container. Inspect the element to see the resolved padding values."
        />
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <DensityDemo density="compact" label="data-density=&quot;compact&quot;" />
          <DensityDemo density="default" label="(no attribute — default)" />
          <DensityDemo density="comfortable" label="data-density=&quot;comfortable&quot;" />
        </div>
      </section>

      {/* Usage */}
      <section id="usage" className="space-y-6">
        <SectionHeader
          title="Applying density"
          description="Add the data-density attribute to any container element. All descendant io components will inherit the density."
        />
        <CodeNote label="HTML">{BASIC_USAGE}</CodeNote>
        <CodeNote label="React">{NEXT_JS_EXAMPLE}</CodeNote>
      </section>

      {/* Customising */}
      <section id="customising" className="space-y-6">
        <SectionHeader
          title="Customising density values"
          description="Override the density tokens in your @layer brand block to change the spacing values for each density level."
        />
        <CodeNote label="CSS">{BRAND_OVERRIDE}</CodeNote>
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          See <a href="/developing/theming" style={{ color: 'var(--io-accent-text)' }}>Theming</a>{' '}
          for more on the <InlineCode>@layer brand</InlineCode> override mechanism.
        </p>
      </section>
    </div>
  );
}
