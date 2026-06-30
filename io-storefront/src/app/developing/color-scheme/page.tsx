'use client';

import React from 'react';

import { SectionHeader, RuleCard, DoOrDontCard } from '@/components/usage/UsagePrimitives';
import { PageHeader } from '@/components/layout/PageHeader';
import { InlineCode, CodeNote } from '@/components/api/ApiPrimitives';

// ── Code snippets ──────────────────────────────────────────────────────────────

const FIRST_PAINT_SCRIPT = `<!-- Place this script as the first child of <head> — blocking is intentional.
     It resolves the theme before any CSS renders, preventing a flash of wrong theme. -->
<script>
(function() {
  try {
    var t = localStorage.getItem('io-theme');
    if (t === 'dark' || t === 'light') {
      document.documentElement.setAttribute('data-theme', t);
    } else {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  } catch (e) {}
})();
</script>`;

const NEXT_JS_FIRST_PAINT = `// app/layout.tsx — Next.js 13+ App Router
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="..." />
        {/* Blocking theme init — resolves before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: \`
(function() {
  try {
    var t = localStorage.getItem('io-theme');
    if (t === 'dark' || t === 'light') {
      document.documentElement.setAttribute('data-theme', t);
    } else {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  } catch (e) {}
})();\`.trim(),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}`;

const TOGGLE_SNIPPET = `// React — persist theme toggle
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('io-theme', next); } catch (e) {}
}`;

const SUBTREE_SCOPING = `<!-- Page-level theme is dark, but this sidebar always stays light -->
<html data-theme="dark">
  <body>
    <aside data-theme="only-light">
      <!-- Always renders with light-mode tokens regardless of page theme -->
      <io-button>Light sidebar button</io-button>
    </aside>

    <!-- Always-dark preview card even when the page is in light mode -->
    <div data-theme="only-dark" class="preview-card">
      <io-badge>Dark preview</io-badge>
    </div>
  </body>
</html>`;

const SEMANTIC_TOKENS_SNIPPET = `/* Correct — use semantic tokens in your app styles */
.my-card {
  background: var(--io-bg-surface);
  color: var(--io-text-primary);
  border: 1px solid var(--io-border);
}

/* Wrong — do not reach for primitive color tokens directly */
.my-card {
  background: var(--io-color-grey-1);   /* primitive — bypasses dark-mode resolution */
  color: var(--io-color-grey-9);        /* primitive — bypasses dark-mode resolution */
}`;

const LIGHTNING_CSS_NOTE = `/* vite.config.ts — disable lightningcss if it removes light-dark() */
import { defineConfig } from 'vite';
export default defineConfig({
  css: {
    transformer: 'postcss', // use postcss instead of lightningcss
  },
});

/* Alternatively, configure lightningcss targets to keep light-dark(): */
import { browserslistToTargets } from 'lightningcss';
export default defineConfig({
  css: {
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%')),
    },
  },
});`;

// ── Theme value table ──────────────────────────────────────────────────────────

const DATA_THEME_VALUES = [
  {
    value: 'light',
    description: 'Applies the light-mode token set. Use on the root element to lock the entire page to light mode.',
    useCase: 'Default page theme for light-preferring users.',
  },
  {
    value: 'dark',
    description: 'Applies the dark-mode token set. Use on the root element to activate dark mode.',
    useCase: 'Default page theme for dark-preferring users; also used by the system auto-toggle.',
  },
  {
    value: 'only-light',
    description: 'Pins a subtree to always-light tokens regardless of the page-level theme. Wins the cascade over light/dark by appearing later in the stylesheet.',
    useCase: 'Always-light navigation bars, data panels, or preview areas on a dark page.',
  },
  {
    value: 'only-dark',
    description: 'Pins a subtree to always-dark tokens regardless of the page-level theme.',
    useCase: 'Always-dark sidebars, previews, or hero sections on a light page.',
  },
] as const;

// ── Safe vs private semantic tokens ──────────────────────────────────────────

const SAFE_SEMANTIC_TOKENS = [
  { token: '--io-bg-base', description: 'Page-level background surface.' },
  { token: '--io-bg-raised', description: 'Raised card / panel background.' },
  { token: '--io-bg-surface', description: 'Floating surface (dropdown, modal overlay).' },
  { token: '--io-text-primary', description: 'Primary body and heading text.' },
  { token: '--io-text-secondary', description: 'Secondary / supporting text.' },
  { token: '--io-text-muted', description: 'De-emphasised label text.' },
  { token: '--io-border', description: 'Decorative borders on cards, dividers, and containers.' },
  { token: '--io-border-interactive', description: 'Interactive element borders — checkbox, radio, select, inputs (WCAG 1.4.11).' },
] as const;

// ── Helpers ───────────────────────────────────────────────────────────────────

function ThemeValueRow({
  value,
  description,
  useCase,
}: {
  value: string;
  description: string;
  useCase: string;
}) {
  return (
    <div
      className="grid gap-4 px-5 py-4 rounded-lg"
      style={{
        border: '1px solid var(--io-border)',
        background: 'var(--io-bg-raised)',
        gridTemplateColumns: '180px 1fr 1fr',
      }}
    >
      <code className="text-xs font-mono font-semibold" style={{ color: 'var(--io-accent-text)' }}>
        {value}
      </code>
      <span className="text-xs leading-5" style={{ color: 'var(--io-text-secondary)' }}>
        {description}
      </span>
      <span className="text-xs leading-5 italic" style={{ color: 'var(--io-text-muted)' }}>
        {useCase}
      </span>
    </div>
  );
}

function TokenRow({ token, description }: { token: string; description: string }) {
  return (
    <div
      className="flex items-start gap-4 px-4 py-3 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <code
        className="text-xs font-mono shrink-0 pt-0.5"
        style={{ color: 'var(--io-text-primary)', minWidth: '220px' }}
      >
        {token}
      </code>
      <span className="text-xs" style={{ color: 'var(--io-text-secondary)' }}>
        {description}
      </span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ColorSchemePage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Color Scheme &amp; Dark Mode"
        description="How to activate dark mode, scope theme overrides to subtrees, and prevent a first-paint flash of the wrong theme in your application."
        tabs={[]}
      />

      {/* The four data-theme values */}
      <section id="data-theme-values" className="space-y-6">
        <SectionHeader
          title="The four supported data-theme values"
          description="All theme switching in io Design System uses the data-theme attribute on any ancestor element."
        />
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          <InlineCode>io-components.css</InlineCode> ships four <InlineCode>[data-theme]</InlineCode>{' '}
          selectors. Place the attribute on{' '}
          <InlineCode>&lt;html&gt;</InlineCode> to control the whole page, or on any container
          element to scope a subtree. CSS custom property inheritance carries the tokens through
          every Shadow DOM boundary automatically — no per-component prop is needed.
        </p>

        <div className="space-y-2">
          {/* Header row */}
          <div
            className="grid gap-4 px-5 py-2 rounded-lg"
            style={{
              gridTemplateColumns: '180px 1fr 1fr',
              background: 'var(--io-bg-page)',
            }}
          >
            <span className="text-xs font-semibold uppercase" style={{ color: 'var(--io-text-muted)', letterSpacing: '0.08em' }}>
              Value
            </span>
            <span className="text-xs font-semibold uppercase" style={{ color: 'var(--io-text-muted)', letterSpacing: '0.08em' }}>
              What it does
            </span>
            <span className="text-xs font-semibold uppercase" style={{ color: 'var(--io-text-muted)', letterSpacing: '0.08em' }}>
              When to use
            </span>
          </div>
          {DATA_THEME_VALUES.map((row) => (
            <ThemeValueRow
              key={row.value}
              value={row.value}
              description={row.description}
              useCase={row.useCase}
            />
          ))}
        </div>

        <div
          className="flex gap-3 p-4 rounded-lg"
          style={{ background: 'color-mix(in srgb, var(--io-accent) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--io-accent) 30%, transparent)' }}
        >
          <span className="text-xs leading-6" style={{ color: 'var(--io-text-secondary)' }}>
            <strong style={{ color: 'var(--io-text-primary)' }}>Note on the theme Prop:</strong>{' '}
            io components do not accept a <InlineCode>theme</InlineCode> prop. Porsche removed
            this pattern in PDS v4 because a per-component prop bloats every component's API
            surface and forces a re-render on every toggle. CSS custom property inheritance through
            Shadow DOM makes a parent-element attribute the superior approach.
          </span>
        </div>
      </section>

      {/* First-paint init script */}
      <section id="first-paint-init" className="space-y-6">
        <SectionHeader
          title="First-paint theme init script"
          description="Prevent a flash of wrong theme (FOUT) by resolving the user's preferred scheme before any CSS paints."
        />
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          Place a blocking <InlineCode>&lt;script&gt;</InlineCode> as the first child of{' '}
          <InlineCode>&lt;head&gt;</InlineCode>. The script reads the persisted preference from{' '}
          <InlineCode>localStorage</InlineCode> and falls back to{' '}
          <InlineCode>prefers-color-scheme</InlineCode> on first visit. Because it runs synchronously
          before any CSS is applied, the correct <InlineCode>data-theme</InlineCode> is set before the
          browser paints.
        </p>
        <CodeNote label="HTML">{FIRST_PAINT_SCRIPT}</CodeNote>
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          In a Next.js App Router project, inline the same script using{' '}
          <InlineCode>dangerouslySetInnerHTML</InlineCode> (the name is a React warning, not a security
          issue — the content is a static string you control):
        </p>
        <CodeNote label="Next.js">{NEXT_JS_FIRST_PAINT}</CodeNote>
      </section>

      {/* Toggle implementation */}
      <section id="toggle-implementation" className="space-y-6">
        <SectionHeader
          title="Toggling the theme at runtime"
          description="Persist the chosen theme so the first-paint script reads it on the next page load."
        />
        <CodeNote label="TypeScript">{TOGGLE_SNIPPET}</CodeNote>
        <RuleCard label="Always persist to localStorage alongside the DOM attribute">
          Setting <InlineCode>data-theme</InlineCode> on the root element changes the visual immediately.
          Persisting to <InlineCode>localStorage</InlineCode> ensures the first-paint script picks up
          the preference on the next navigation or page reload. If you skip persistence, users will
          see a flash of the OS-preference theme on reload.
        </RuleCard>
      </section>

      {/* Subtree scoping */}
      <section id="subtree-scoping" className="space-y-6">
        <SectionHeader
          title="Scoping a subtree to a fixed scheme"
          description="Use only-dark or only-light to pin any element and its descendants to a fixed color scheme."
        />
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          The <InlineCode>only-dark</InlineCode> and <InlineCode>only-light</InlineCode> selectors
          appear after the <InlineCode>dark</InlineCode> and <InlineCode>light</InlineCode> selectors
          in the stylesheet, so they win the cascade at equal specificity — no{' '}
          <InlineCode>!important</InlineCode> needed. All descendant elements, including those inside
          Shadow DOM components, inherit the overridden tokens via normal CSS custom property
          inheritance.
        </p>
        <CodeNote label="HTML">{SUBTREE_SCOPING}</CodeNote>

        {/* Live demo */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--io-text-muted)' }}>
            Live demo — these panels are theme-locked regardless of the storefront toggle above
          </p>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            <div
              data-theme="only-dark"
              className="rounded-xl p-6 space-y-3"
              style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--io-text-muted)' }}>
                data-theme=&quot;only-dark&quot;
              </p>
              <p className="text-sm font-medium" style={{ color: 'var(--io-text-primary)' }}>
                Always dark
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
                Always renders dark-mode tokens regardless of the page theme.
              </p>
            </div>
            <div
              data-theme="only-light"
              className="rounded-xl p-6 space-y-3"
              style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--io-text-muted)' }}>
                data-theme=&quot;only-light&quot;
              </p>
              <p className="text-sm font-medium" style={{ color: 'var(--io-text-primary)' }}>
                Always light
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
                Always renders light-mode tokens regardless of the page theme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* prefers-color-scheme fallback */}
      <section id="prefers-color-scheme" className="space-y-6">
        <SectionHeader
          title="prefers-color-scheme fallback strategy"
          description="Use the OS media query as the no-JavaScript fallback and the default for first-time visitors."
        />
        <div className="space-y-4">
          <RuleCard label="First visit: derive from the OS preference">
            When <InlineCode>localStorage.getItem(&apos;io-theme&apos;)</InlineCode> returns{' '}
            <InlineCode>null</InlineCode>, the first-paint script reads{' '}
            <InlineCode>prefers-color-scheme</InlineCode> and sets the matching{' '}
            <InlineCode>data-theme</InlineCode> value. This means users get a theme consistent with
            their system without any explicit preference set.
          </RuleCard>
          <RuleCard label="No-JavaScript environments: set a sensible default">
            In environments where JavaScript cannot run (e.g., email clients, some static renderers),
            add a default <InlineCode>data-theme=&quot;light&quot;</InlineCode> attribute directly to
            the <InlineCode>&lt;html&gt;</InlineCode> tag. The blocking script will immediately overwrite
            it in browsers, so there is no double-render.
          </RuleCard>
        </div>
        <CodeNote label="HTML">{`<!-- No-JS fallback — the blocking script overwrites this when JS runs -->
<html data-theme="light" lang="en">
  <head>
    <script>/* first-paint init as above */</script>
  </head>
</html>`}</CodeNote>
      </section>

      {/* Semantic tokens */}
      <section id="semantic-tokens" className="space-y-6">
        <SectionHeader
          title="Semantic tokens to use in app code"
          description="Reference these tokens in your application styles and they will update automatically when the theme changes."
        />
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          Semantic tokens are resolved at runtime to the correct primitive value for the active
          theme. Using them means your custom styles adapt to dark/light automatically. Do not
          use primitive tokens (<InlineCode>--io-color-grey-*</InlineCode>,{' '}
          <InlineCode>--io-color-dark-*</InlineCode>) directly — they always resolve to a fixed
          value.
        </p>
        <div className="space-y-2">
          {SAFE_SEMANTIC_TOKENS.map(({ token, description }) => (
            <TokenRow key={token} token={token} description={description} />
          ))}
        </div>
        <CodeNote label="CSS">{SEMANTIC_TOKENS_SNIPPET}</CodeNote>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoOrDontCard type="do">
            Use semantic tokens (<InlineCode>--io-bg-surface</InlineCode>,{' '}
            <InlineCode>--io-text-primary</InlineCode>) in your app styles. They resolve to
            the correct light or dark value automatically.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Do not use primitive tokens (<InlineCode>--io-color-grey-1</InlineCode>) directly in
            app styles. They are fixed values that do not respond to theme changes.
          </DoOrDontCard>
        </div>
      </section>

      {/* Bundler quirks */}
      <section id="bundler-quirks" className="space-y-6">
        <SectionHeader
          title="Known bundler quirks"
          description="LightningCSS and some PostCSS transforms may affect how color-scheme tokens are processed."
        />
        <div className="space-y-4">
          <RuleCard label="LightningCSS may downlevel light-dark()">
            Vite 5+ uses LightningCSS by default. LightningCSS may transform{' '}
            <InlineCode>light-dark()</InlineCode> function calls into static values targeting your
            configured browser range. If your tokens appear to not update on theme toggle,
            check whether LightningCSS is transforming away the <InlineCode>light-dark()</InlineCode>{' '}
            calls in the io-components CSS.
          </RuleCard>
          <RuleCard label="PostCSS is a safe alternative">
            Switching Vite to use PostCSS instead of LightningCSS avoids this issue. Alternatively,
            configure LightningCSS with an up-to-date browser target that natively supports{' '}
            <InlineCode>light-dark()</InlineCode> (Chrome 123+, Firefox 120+, Safari 17.5+).
          </RuleCard>
        </div>
        <CodeNote label="Vite config">{LIGHTNING_CSS_NOTE}</CodeNote>
      </section>
    </div>
  );
}
