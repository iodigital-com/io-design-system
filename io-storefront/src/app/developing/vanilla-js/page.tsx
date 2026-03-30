'use client';

import { PageHeader } from '@/components/layout/PageHeader';

export default function DevelopingVanillaJsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Vanilla JS"
        description="Use io components as standard Web Components with HTML and JavaScript, without framework wrappers."
        tabs={[]}
      />

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Install
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Use npm in bundler projects, or import from CDN for static pages.
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
{`# npm
npm install @io-digital/components

# or CDN
<script type="module" src="https://cdn.jsdelivr.net/npm/@io-digital/components/dist/io/io.esm.js"></script>`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Basic usage
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          After the package is loaded, use <code>io-*</code> tags directly in your markup.
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
{`<io-button variant="solid">Click me</io-button>
<io-input label="Email" placeholder="name@example.com"></io-input>`}
        </pre>
      </section>
    </div>
  );
}
