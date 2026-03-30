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

export default function DevelopingReactPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="React"
        description="Use io components in React applications via the typed React wrapper package. Props and events are fully typed — no custom element boilerplate required."
        tabs={[]}
      />

      <Section id="install" title="Install">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Install the core components package and the React wrapper.
        </p>
        <CodeBlock>{`npm install @io-digital/components @io-digital/components-react`}</CodeBlock>
      </Section>

      <Section id="styles" title="Load styles">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Import the component stylesheet once at the root of your application — typically in <code>main.tsx</code> or your global CSS entry point.
        </p>
        <CodeBlock>{`import '@io-digital/components/dist/io-components/io-components.css';`}</CodeBlock>
      </Section>

      <Section id="usage" title="Basic usage">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Import named wrapper components directly from <code>@io-digital/components-react</code>. Props are typed and events use standard React synthetic event naming.
        </p>
        <CodeBlock>{`import { IoButton, IoInput, IoBadge } from '@io-digital/components-react';

export function Example() {
  return (
    <>
      <IoBadge variant="blue">New</IoBadge>
      <IoInput label="Email" placeholder="name@example.com" />
      <IoButton
        color="blue"
        variant="solid"
        onIoClick={() => console.log('clicked')}
      >
        Submit
      </IoButton>
    </>
  );
}`}</CodeBlock>
      </Section>

      <Section id="events" title="Listening to events">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          io components emit custom events prefixed with <code>io</code>. The React wrapper maps these to camelCase handler props — for example, <code>ioChange</code> becomes <code>onIoChange</code>.
        </p>
        <CodeBlock>{`import { useState } from 'react';
import { IoCheckbox } from '@io-digital/components-react';

export function SubscribeCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <IoCheckbox
      label="Subscribe to updates"
      checked={checked}
      onIoChange={(e) => setChecked(e.detail.checked)}
    />
  );
}`}</CodeBlock>
      </Section>

      <Section id="requirements" title="Requirements">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          React 18 or later is required. The wrapper uses <code>createRoot</code>-compatible patterns and ships as an ES module.
        </p>
      </Section>

    </div>
  );
}
