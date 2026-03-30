'use client';

import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-4">
      <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="rounded-lg p-4 text-sm overflow-x-auto"
      style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
    >
      <code>{children}</code>
    </pre>
  );
}

export default function DevelopingVanillaJsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Vanilla JS / HTML"
        description="Use io components as standard Web Components in any HTML page or bundler project — no framework required."
        tabs={[]}
      />

      <Section id="install" title="Install">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Install via npm for bundler projects, or load from CDN for static pages — no build step required.
        </p>
        <CodeBlock>{`# npm
npm install @io-digital/components

# CDN
<script type="module" src="https://cdn.jsdelivr.net/npm/@io-digital/components/dist/io/io.esm.js"></script>`}</CodeBlock>
      </Section>

      <Section id="styles" title="Load styles">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          For npm projects, link the component stylesheet before the script tag. CDN usage does not require a separate CSS import.
        </p>
        <CodeBlock>{`<link rel="stylesheet" href="node_modules/@io-digital/components/dist/io-components/io-components.css">
<script type="module" src="node_modules/@io-digital/components/dist/io-components/io-components.esm.js"></script>`}</CodeBlock>
      </Section>

      <Section id="usage" title="Basic usage">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Once the package is loaded, use <code>io-*</code> tags directly in your markup. Attributes map 1:1 to component props.
        </p>
        <CodeBlock>{`<io-button color="blue" variant="solid">Get started</io-button>
<io-input label="Email" placeholder="name@example.com"></io-input>`}</CodeBlock>
      </Section>

      <Section id="events" title="Listening to events">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          io components emit custom events prefixed with <code>io</code>. Listen with <code>addEventListener</code> using the event name in camelCase — for example, <code>ioChange</code>.
        </p>
        <CodeBlock>{`const checkbox = document.querySelector('io-checkbox');

checkbox.addEventListener('ioChange', (event) => {
  console.log('checked:', event.detail.checked);
});`}</CodeBlock>
      </Section>

    </div>
  );
}
