'use client';

import { SectionHeader, InlineCode, CodeNote } from '@/components/api/ApiPrimitives';
import { PageHeader } from '@/components/layout/PageHeader';

// ── Safe-to-override token groups ─────────────────────────────────────────────

const SAFE_TOKENS: { token: string; description: string }[] = [
  { token: '--io-color-primary', description: 'Primary interactive colour — buttons, links, active states.' },
  { token: '--io-color-primary-hover', description: 'Hover state of the primary colour.' },
  { token: '--io-color-primary-active', description: 'Pressed / active state of the primary colour.' },
  { token: '--io-color-primary-muted', description: 'Low-opacity tint for hover backgrounds and focus halos.' },
  { token: '--io-color-primary-bg', description: 'Very low-opacity tint for selected row backgrounds.' },
  { token: '--io-font-primary', description: 'Primary typeface — applied to all component text.' },
  { token: '--io-border-radius-sm', description: '9px default — controls button, input, and card corner radii.' },
  { token: '--io-border-radius-pill', description: '9999px pill — applied to pill buttons and tags.' },
];

const CAUTION_TOKENS: { token: string; description: string }[] = [
  { token: '--io-text-primary', description: 'Affects all body copy and headings across the entire system.' },
  { token: '--io-bg-page', description: 'Page-level background — changes propagate to all surfaces.' },
  { token: '--io-border', description: 'Default decorative border — used on cards, separators, dropdowns.' },
  { token: '--io-accent', description: 'Accent alias used by storefront navigation and indicators.' },
];

// ── Code samples ───────────────────────────────────────────────────────────────

const LAYER_DECLARATION = `/* io-components.css declares layer order at the top: */
@layer io, brand;

/* All :root token declarations are inside @layer io { } */
@layer io {
  :root {
    --io-color-primary: #0000D2; /* Energetic Blue */
    /* ...all other tokens */
  }

  [data-theme="dark"]       { /* dark overrides */ }
  [data-theme="light"]      { color-scheme: light; }
  [data-theme="only-dark"]  { /* locked dark — wins over page dark/light */ }
  [data-theme="only-light"] { /* locked light — wins over page dark/light */ }
}`;

const BRAND_OVERRIDE_CSS = `/* brand-overrides.css — import AFTER io-components.css */

@layer brand {
  :root {
    --io-color-primary:        #E20074;   /* Magenta brand */
    --io-color-primary-hover:  #B8005D;
    --io-color-primary-active: #8C0048;
    --io-color-primary-muted:  rgba(226, 0, 116, 0.12);
    --io-color-primary-bg:     rgba(226, 0, 116, 0.06);

    --io-font-primary: 'Your Brand Font', sans-serif;
  }
}`;

const NEXT_JS_EXAMPLE = `// app/layout.tsx
import '@io-digital/components/dist/io-components/io-components.css';
import './brand-overrides.css'; // your @layer brand file

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`;

const HTML_EXAMPLE = `<!-- index.html — order matters: brand stylesheet comes after io -->
<link rel="stylesheet" href="io-components.css" />
<link rel="stylesheet" href="brand-overrides.css" />`;

const ANGULAR_EXAMPLE = `// angular.json — styles array (order matters)
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/@io-digital/components/dist/io-components/io-components.css",
              "src/brand-overrides.css"
            ]
          }
        }
      }
    }
  }
}`;

// ── Helpers ───────────────────────────────────────────────────────────────────

function TokenRow({ token, description }: { token: string; description: string }) {
  return (
    <div
      className="flex items-start gap-4 px-4 py-3 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <code className="text-xs font-mono shrink-0 pt-0.5" style={{ color: 'var(--io-text-primary)', minWidth: '260px' }}>
        {token}
      </code>
      <span className="text-xs" style={{ color: 'var(--io-text-secondary)' }}>{description}</span>
    </div>
  );
}

function InfoCallout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4 rounded-lg"
      style={{ background: 'var(--io-accent-bg)', border: '1px solid var(--io-accent)', borderColor: 'color-mix(in srgb, var(--io-accent) 40%, transparent)' }}
    >
      <span className="text-xs leading-6" style={{ color: 'var(--io-text-secondary)' }}>{children}</span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ThemingPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Multi-brand Theming"
        description="io Design System uses CSS @layer to give white-label consumers a guaranteed override surface. Brand rules placed in @layer brand always win over the io layer defaults without needing !important."
        tabs={[]}
      />

      {/* How layers work */}
      <section id="how-it-works" className="space-y-6">
        <SectionHeader
          title="How the layer architecture works"
          description="CSS cascade layers give explicit priority to brand overrides over design system defaults."
        />
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          <InlineCode>io-components.css</InlineCode> declares two layers at its very top:{' '}
          <InlineCode>@layer io, brand;</InlineCode>. Layer order determines priority — later layers win.
          Because <InlineCode>brand</InlineCode> is declared after <InlineCode>io</InlineCode>,
          any rule inside <InlineCode>@layer brand</InlineCode> will automatically override the
          corresponding rule in <InlineCode>@layer io</InlineCode>, regardless of selector specificity.
        </p>
        <CodeNote label="CSS">{LAYER_DECLARATION}</CodeNote>
        <InfoCallout>
          The layer declaration in io-components.css establishes both layers in a single statement.
          You do not need to redeclare the layer order in your own stylesheet — just write{' '}
          {'@layer brand { ... }'} and the priority is guaranteed.
        </InfoCallout>
      </section>

      {/* Applying brand overrides */}
      <section id="applying-overrides" className="space-y-6">
        <SectionHeader
          title="Applying brand overrides"
          description="Create a brand stylesheet that imports after io-components.css and declares overrides in @layer brand."
        />
        <CodeNote label="CSS">{BRAND_OVERRIDE_CSS}</CodeNote>
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          The full example file with documentation comments is available at{' '}
          <InlineCode>docs/brand-override-example.css</InlineCode> in the repository.
        </p>
      </section>

      {/* Framework integration */}
      <section id="framework-integration" className="space-y-6">
        <SectionHeader
          title="Framework integration"
          description="The import order is the only requirement. The brand stylesheet must come after io-components.css."
        />
        <div className="space-y-4">
          <h3 className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>Next.js</h3>
          <CodeNote label="React">{NEXT_JS_EXAMPLE}</CodeNote>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>Vanilla HTML</h3>
          <CodeNote label="HTML">{HTML_EXAMPLE}</CodeNote>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>Angular</h3>
          <CodeNote label="Angular">{ANGULAR_EXAMPLE}</CodeNote>
        </div>
      </section>

      {/* Safe tokens to override */}
      <section id="safe-tokens" className="space-y-6">
        <SectionHeader
          title="Safe tokens to override"
          description="These brand primitive tokens are the intended override surface for white-label theming. Overriding them is stable across versions."
        />
        <div className="space-y-2">
          {SAFE_TOKENS.map(({ token, description }) => (
            <TokenRow key={token} token={token} description={description} />
          ))}
        </div>
      </section>

      {/* Caution tokens */}
      <section id="caution-tokens" className="space-y-6">
        <SectionHeader
          title="Use with caution"
          description="Overriding semantic tokens changes the visual behaviour of the entire design system, not just primary brand interactions. Test thoroughly before shipping."
        />
        <div className="space-y-2">
          {CAUTION_TOKENS.map(({ token, description }) => (
            <TokenRow key={token} token={token} description={description} />
          ))}
        </div>
      </section>

      {/* Dark mode */}
      <section id="dark-mode" className="space-y-6">
        <SectionHeader
          title="Dark mode and brand overrides"
          description="Dark mode overrides live inside @layer io in the [data-theme='dark'] selector. To override a token in dark mode, add a matching selector in your @layer brand block."
        />
        <CodeNote label="CSS">{`@layer brand {
  :root {
    --io-color-primary: #E20074; /* light-mode brand primary */
  }

  /* Dark-mode brand primary — must also be inside @layer brand */
  [data-theme="dark"] {
    --io-color-primary: #FF5BA7; /* lighter tint for dark surfaces */
  }
}`}</CodeNote>
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          The <InlineCode>[data-theme="dark"]</InlineCode> selector inside{' '}
          <InlineCode>@layer brand</InlineCode> overrides the corresponding selector inside{' '}
          <InlineCode>@layer io</InlineCode> by the same layer-priority mechanism.
        </p>
      </section>

      {/* Locked-theme selectors */}
      <section id="locked-theme" className="space-y-6">
        <SectionHeader
          title="Locked-theme selectors"
          description="Pin any element subtree to always-dark or always-light regardless of the page-level theme. Useful for preview panels, side navigation, or demo cards that must stay in a specific theme."
        />
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          Apply <InlineCode>data-theme=&quot;only-dark&quot;</InlineCode> or{' '}
          <InlineCode>data-theme=&quot;only-light&quot;</InlineCode> to any element. The attribute-value
          selector appears after <InlineCode>[data-theme=&quot;dark|light&quot;]</InlineCode> in the
          stylesheet, so it wins the cascade at equal specificity — no <InlineCode>!important</InlineCode>{' '}
          needed. All descendant elements inherit the overridden tokens via normal CSS custom
          property inheritance.
        </p>
        <CodeNote label="HTML">{`<!-- Page is in dark mode, but this panel stays light -->
<html data-theme="dark">
  <body>
    <!-- ... dark page content ... -->

    <aside data-theme="only-light">
      <!-- Always renders with light-mode tokens -->
      <io-button>Light panel button</io-button>
    </aside>

    <!-- Always-dark preview card even when page is light -->
    <div data-theme="only-dark" class="preview-card">
      <io-badge>Dark preview</io-badge>
    </div>
  </body>
</html>`}</CodeNote>

        {/* Live demo */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--io-text-muted)' }}>
            Live demo — both panels below are theme-locked regardless of the storefront toggle
          </p>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {/* Always-dark panel */}
            <div
              data-theme="only-dark"
              className="rounded-xl p-6 space-y-3"
              style={{
                background: 'var(--io-bg-surface)',
                border: '1px solid var(--io-border)',
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--io-text-muted)' }}>
                data-theme=&quot;only-dark&quot;
              </p>
              <p className="text-sm font-medium" style={{ color: 'var(--io-text-primary)' }}>
                Always dark
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
                This subtree always renders dark-mode tokens regardless of page theme. Ideal for
                always-dark navigation bars and preview panels.
              </p>
              <div
                className="rounded px-3 py-1 text-xs font-medium inline-block"
                style={{ background: 'var(--io-accent-bg)', color: 'var(--io-accent-text)' }}
              >
                --io-bg-surface: var(--io-color-dark-bg-surface)
              </div>
            </div>

            {/* Always-light panel */}
            <div
              data-theme="only-light"
              className="rounded-xl p-6 space-y-3"
              style={{
                background: 'var(--io-bg-surface)',
                border: '1px solid var(--io-border)',
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--io-text-muted)' }}>
                data-theme=&quot;only-light&quot;
              </p>
              <p className="text-sm font-medium" style={{ color: 'var(--io-text-primary)' }}>
                Always light
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
                This subtree always renders light-mode tokens regardless of page theme. Ideal for
                white data panels and cards on dark-background pages.
              </p>
              <div
                className="rounded px-3 py-1 text-xs font-medium inline-block"
                style={{ background: 'var(--io-accent-bg)', color: 'var(--io-accent-text)' }}
              >
                --io-bg-surface: var(--io-color-grey-1)
              </div>
            </div>
          </div>
        </div>

        <InfoCallout>
          The locked-theme selectors reuse existing <InlineCode>--io-color-dark-*</InlineCode>{' '}
          source primitives — they introduce no new token names. They are inside{' '}
          <InlineCode>@layer io</InlineCode>, so brand overrides in{' '}
          <InlineCode>@layer brand</InlineCode> still win if needed.
        </InfoCallout>
      </section>

      {/* Tokens to avoid */}
      <section id="avoid-tokens" className="space-y-6">
        <SectionHeader
          title="Tokens to avoid overriding"
          description="Component-internal tokens are implementation details and are not part of the public API contract. They may be renamed or removed without a semver major bump."
        />
        <ul className="space-y-2 text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          <li>
            <strong style={{ color: 'var(--io-text-primary)' }}>Dark source primitives</strong> —{' '}
            <InlineCode>--io-color-dark-*</InlineCode> tokens feed the dark-mode token resolution chain.
            Override the semantic tokens instead (e.g. <InlineCode>--io-color-primary</InlineCode>
            inside <InlineCode>[data-theme=&quot;dark&quot;]</InlineCode>).
          </li>
          <li>
            <strong style={{ color: 'var(--io-text-primary)' }}>Component layout tokens</strong> —{' '}
            <InlineCode>--io-combobox-z</InlineCode>, <InlineCode>--io-modal-max-height</InlineCode>,
            and similar dimensional tokens are component public API (see{' '}
            <a href="/developing/customisation" style={{ color: 'var(--io-accent-text)' }}>Customisation</a>),
            but are not theming tokens — they control layout, not brand appearance.
          </li>
          <li>
            <strong style={{ color: 'var(--io-text-primary)' }}>Focus ring tokens</strong> —{' '}
            <InlineCode>--io-focus-inner</InlineCode> and <InlineCode>--io-focus-outer</InlineCode>{' '}
            must meet WCAG 2.5.3 focus contrast requirements. Do not override without verifying
            contrast ratios in both light and dark modes.
          </li>
        </ul>
      </section>
    </div>
  );
}
