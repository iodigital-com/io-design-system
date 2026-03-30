'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="rounded-lg p-4 text-sm overflow-x-auto"
      style={{
        background: 'var(--io-bg-raised)',
        border: '1px solid var(--io-border)',
        color: 'var(--io-text-secondary)',
        lineHeight: '1.65',
      }}
    >
      <code>{children}</code>
    </pre>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="rounded px-1 py-0.5 text-[0.8125em] font-mono"
      style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}
    >
      {children}
    </code>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
      {children}
    </h2>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-lg p-4 text-sm"
      style={{
        background: 'var(--io-bg-raised)',
        border: '1px solid var(--io-border)',
        color: 'var(--io-text-secondary)',
        lineHeight: '1.6',
      }}
    >
      {children}
    </div>
  );
}

export default function DevelopingVanillaJsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Vanilla JS"
        description="Use io components as standard Web Components with HTML and JavaScript — no build step, no framework wrappers."
        tabs={[]}
      />

      {/* ── Prerequisites ──────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeading>Prerequisites</SectionHeading>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Before you start, make sure your environment meets the following requirements:
        </p>
        <ul className="space-y-2 text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          {[
            'A modern browser that supports Custom Elements v1 and ES modules (Chrome 67+, Firefox 63+, Safari 10.1+, Edge 79+).',
            'Node.js 18 or later if you plan to install via a package manager.',
            'npm 9+ or pnpm 8+ for dependency management in a bundled project.',
            'A static server or bundler (Vite, webpack, Parcel) is recommended for local development when using npm.',
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span style={{ color: 'var(--io-accent)' }}>–</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Install ────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeading>Install</SectionHeading>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Choose the delivery method that fits your project.
        </p>

        <h3 className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
          Option A — npm (recommended for bundled projects)
        </h3>
        <CodeBlock>{`npm install @io-digital/components`}</CodeBlock>

        <h3 className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
          Option B — CDN script tag (static pages, no build step)
        </h3>
        <CodeBlock>{`<!-- Add inside <head> or at the end of <body> -->
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@io-digital/components/dist/io/io.esm.js"
></script>`}</CodeBlock>
        <Note>
          <strong style={{ color: 'var(--io-text-primary)' }}>CDN note:</strong> Pin a specific version in production (e.g.{' '}
          <InlineCode>@io-digital/components@0.0.1/dist/io/io.esm.js</InlineCode>) to prevent unexpected breaking changes from
          un-pinned <InlineCode>latest</InlineCode> resolutions.
        </Note>
      </section>

      {/* ── Registration ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeading>Initialisation and registration</SectionHeading>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          When using the npm package in a bundled project, import the loader before your application code runs. The loader
          registers all <InlineCode>io-*</InlineCode> custom elements and lazy-loads their assets automatically.
        </p>
        <CodeBlock>{`// main.js (your entry point)
import { defineCustomElements } from '@io-digital/components/loader';

// Register all io-* elements with the browser's Custom Element Registry.
defineCustomElements();`}</CodeBlock>
        <Note>
          Call <InlineCode>defineCustomElements()</InlineCode> once, as early as possible — ideally at the top of your
          application entry point. Calling it multiple times is safe but unnecessary.
        </Note>
      </section>

      {/* ── First render ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeading>First render</SectionHeading>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          After the loader runs (or the CDN module is parsed), every <InlineCode>io-*</InlineCode> tag is available as a
          native HTML element. Drop them directly into your markup:
        </p>
        <CodeBlock>{`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My io app</title>
    <script type="module" src="./main.js"></script>
  </head>
  <body>
    <io-button variant="solid">Get started</io-button>
    <io-input label="Email" placeholder="name@example.com"></io-input>
  </body>
</html>`}</CodeBlock>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Attributes map directly to component props. Consult the{' '}
          <Link href="/components" className="underline" style={{ color: 'var(--io-accent)' }}>
            component API pages
          </Link>{' '}
          for the full list of accepted attributes per element.
        </p>
      </section>

      {/* ── Event handling ─────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeading>Event handling</SectionHeading>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          io components dispatch standard DOM events. Use <InlineCode>addEventListener</InlineCode> exactly as you would for
          any native element. Wait for the element to be defined before reading properties to avoid race conditions:
        </p>
        <CodeBlock>{`// Guarantee the element is upgraded before interacting with it.
customElements.whenDefined('io-button').then(() => {
  const btn = document.querySelector('io-button');

  btn.addEventListener('ioClick', (event) => {
    console.log('Button clicked', event.detail);
  });
});

// For io-input, listen to the value-change event:
customElements.whenDefined('io-input').then(() => {
  const input = document.querySelector('io-input');

  input.addEventListener('ioChange', (event) => {
    console.log('New value:', event.detail.value);
  });
});`}</CodeBlock>
        <Note>
          All io component events are prefixed with <InlineCode>io</InlineCode> and documented on each component&apos;s{' '}
          <strong style={{ color: 'var(--io-text-primary)' }}>API</strong> tab. Event details are typed in the{' '}
          <InlineCode>event.detail</InlineCode> object.
        </Note>
      </section>

      {/* ── SSR / Testing caveats ──────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeading>SSR and testing caveats</SectionHeading>

        <h3 className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
          Server-side rendering
        </h3>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Custom Elements rely on browser globals (<InlineCode>window</InlineCode>, <InlineCode>document</InlineCode>,{' '}
          <InlineCode>customElements</InlineCode>) that are absent in Node.js SSR environments. Guard registration calls
          accordingly:
        </p>
        <CodeBlock>{`// Only register elements in a browser context.
if (typeof window !== 'undefined') {
  import('@io-digital/components/loader').then(({ defineCustomElements }) => {
    defineCustomElements();
  });
}`}</CodeBlock>

        <h3 className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
          Unit and integration testing
        </h3>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Test runners like Jest and Vitest run in a Node.js environment by default and do not include a full Custom Elements
          implementation. Recommended approaches:
        </p>
        <ul className="space-y-2 text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          {[
            'Use Vitest with the jsdom or happy-dom environment and the @web/test-runner for component-level tests.',
            'Mock io-* elements in unit tests where only the surrounding application logic is under test — stub the element as a plain HTMLElement.',
            'For full rendering tests, prefer Playwright or Cypress which run against a real browser with a complete Custom Elements registry.',
            'Call defineCustomElements() in your test setup file (beforeAll / setupFilesAfterFramework) to ensure elements are registered before any assertion runs.',
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span style={{ color: 'var(--io-accent)' }}>–</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Troubleshooting ────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeading>Troubleshooting</SectionHeading>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Work through this checklist if io components are not rendering or behaving as expected.
        </p>
        <ul className="space-y-3 text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          {[
            {
              label: 'Element renders as an unknown tag',
              detail: (
                <>
                  The custom element has not been registered. Confirm <InlineCode>defineCustomElements()</InlineCode> is called
                  before the element is used, or that the CDN <InlineCode>{'<script>'}</InlineCode> tag has loaded. Check the
                  browser console for module-load errors.
                </>
              ),
            },
            {
              label: 'No styles applied',
              detail: (
                <>
                  io components ship their styles inside Shadow DOM. If you see an unstyled native element, the component
                  definition has not loaded. Verify the network tab shows a successful request for the component chunk.
                </>
              ),
            },
            {
              label: 'Events are not firing',
              detail: (
                <>
                  Ensure you are listening for the correct event name (prefixed <InlineCode>io</InlineCode>, e.g.{' '}
                  <InlineCode>ioClick</InlineCode>) and that you have waited for{' '}
                  <InlineCode>customElements.whenDefined()</InlineCode> before attaching the listener.
                </>
              ),
            },
            {
              label: 'TypeError: customElements is not defined',
              detail: (
                <>
                  You are calling <InlineCode>defineCustomElements()</InlineCode> in a non-browser environment. Wrap the call
                  in a <InlineCode>{'typeof window !== \'undefined\''}</InlineCode> guard (see SSR section above).
                </>
              ),
            },
            {
              label: 'Hydration mismatch in SSR frameworks',
              detail: (
                <>
                  When rendering io elements server-side, the server outputs unknown tags while the browser upgrades them. Use{' '}
                  <InlineCode>{'<template shadowrootmode="open">'}</InlineCode> declarative Shadow DOM or defer rendering until
                  after hydration to avoid mismatches.
                </>
              ),
            },
          ].map(({ label, detail }) => (
            <li key={label} className="rounded-lg p-4 space-y-1" style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}>
              <p className="font-semibold" style={{ color: 'var(--io-text-primary)' }}>{label}</p>
              <p>{detail}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Next actions ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeading>Next steps</SectionHeading>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Now that io components are rendering in your project, explore what is available:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              href: '/components',
              label: 'Component library',
              description: 'Browse all available io-* elements, their props, events, and live examples.',
            },
            {
              href: '/styles',
              label: 'Design tokens',
              description: 'Use CSS custom properties for colours, spacing, motion, and typography to stay in sync with the iO design system.',
            },
            {
              href: '/developing',
              label: 'Framework guides',
              description: 'Moving to React, Next.js, Angular, or Vue? Find the dedicated integration guide.',
            },
            {
              href: '/help',
              label: 'Help and support',
              description: 'Stuck? Find answers in the FAQ or raise an issue on GitHub.',
            },
          ].map(({ href, label, description }) => (
            <Link
              key={href}
              href={href}
              className="block rounded-lg p-4 transition-colors"
              style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--io-bg-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--io-bg-raised)'; }}
            >
              <p className="font-semibold text-sm mb-1" style={{ color: 'var(--io-accent)' }}>{label} →</p>
              <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
