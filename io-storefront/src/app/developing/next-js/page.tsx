'use client';

import { PageHeader } from '@/components/layout/PageHeader';

export default function DevelopingNextJsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Next.js"
        description="Integrate iO components into an App Router project using client-side registration and typed React wrappers."
        tabs={[]}
      />

      {/* Prerequisites */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Prerequisites
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Make sure your environment meets the following requirements before you start.
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          <li>Node.js 18 or later</li>
          <li>Next.js 13 or later with the App Router enabled</li>
          <li>npm, pnpm, or yarn as your package manager</li>
        </ul>
      </section>

      {/* Install */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Install
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Install the core Web Components package and the React wrapper. The React wrapper provides fully-typed component props and maps custom events to React-compatible handlers.
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
{`npm install @io-digital/components @io-digital/components-react`}
        </pre>
      </section>

      {/* Client bootstrap */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Client bootstrap
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Custom elements must be registered in the browser. Create a dedicated client component that calls{' '}
          <code className="px-1 rounded" style={{ background: 'var(--io-bg-raised)', color: 'var(--io-accent)' }}>defineCustomElements</code>{' '}
          once on mount. This component renders nothing — its sole purpose is bootstrapping the registry.
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
{`// app/io-provider.tsx
'use client';

import { useEffect } from 'react';
import { defineCustomElements } from '@io-digital/components/loader';

export function IoProvider() {
  useEffect(() => {
    defineCustomElements();
  }, []);

  return null;
}`}
        </pre>
      </section>

      {/* Root layout */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Root layout
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Mount <code className="px-1 rounded" style={{ background: 'var(--io-bg-raised)', color: 'var(--io-accent)' }}>IoProvider</code> and
          import the component stylesheet in your root layout so every page has access to iO components and design tokens.
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
{`// app/layout.tsx
import '@io-digital/components/styles';
import { IoProvider } from './io-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <IoProvider />
        {children}
      </body>
    </html>
  );
}`}
        </pre>
      </section>

      {/* App Router usage */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          App Router usage
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          iO components rely on browser APIs, so any component that renders them must be a client component. Add the{' '}
          <code className="px-1 rounded" style={{ background: 'var(--io-bg-raised)', color: 'var(--io-accent)' }}>{`'use client'`}</code>{' '}
          directive at the top of the file and import components from the React wrapper package.
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
{`// app/contact/page.tsx
'use client';

import { IoButton, IoInput } from '@io-digital/components-react';

export default function ContactPage() {
  return (
    <form>
      <IoInput label="Name" placeholder="Your name" />
      <IoInput label="Email" placeholder="name@example.com" />
      <IoButton variant="solid" color="blue" type="submit">
        Send message
      </IoButton>
    </form>
  );
}`}
        </pre>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Server components can render layout and data-fetching logic around client components. Keep the{' '}
          <code className="px-1 rounded" style={{ background: 'var(--io-bg-raised)', color: 'var(--io-accent)' }}>{`'use client'`}</code>{' '}
          boundary as deep in the tree as possible to preserve server rendering for components that do not require client-side interactivity.
        </p>
      </section>

      {/* Event handling */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Event handling
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          The React wrapper maps each component's custom events to standard React callback props, so you can handle
          them the same way you would with any native input element.
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
{`'use client';

import { useState } from 'react';
import { IoInput, IoButton } from '@io-digital/components-react';

export function SearchBar() {
  const [query, setQuery] = useState('');

  function handleSearch() {
    console.log('Search for:', query);
  }

  return (
    <div>
      <IoInput
        label="Search"
        value={query}
        onIoChange={(event) => setQuery(event.detail.value)}
      />
      <IoButton variant="solid" onClick={handleSearch}>
        Search
      </IoButton>
    </div>
  );
}`}
        </pre>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Each component's events are documented on its individual reference page under <strong>/components</strong>. Look for the{' '}
          <strong>Events</strong> table to find the correct prop name and the shape of <code className="px-1 rounded" style={{ background: 'var(--io-bg-raised)', color: 'var(--io-accent)' }}>event.detail</code>.
        </p>
      </section>

      {/* SSR and hydration */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          SSR and hydration
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Custom elements are a browser-only feature and are not rendered during server-side rendering. Next.js will
          output the tags in the initial HTML, but they only upgrade to interactive elements once the JavaScript
          bundle loads and{' '}
          <code className="px-1 rounded" style={{ background: 'var(--io-bg-raised)', color: 'var(--io-accent)' }}>defineCustomElements</code>{' '}
          has run.
        </p>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Because the server cannot know what the element will look like after upgrade, React may log a hydration
          mismatch warning when shadow DOM content differs from the server-rendered markup. To silence this for a
          specific element, add{' '}
          <code className="px-1 rounded" style={{ background: 'var(--io-bg-raised)', color: 'var(--io-accent)' }}>suppressHydrationWarning</code>{' '}
          to the wrapping element:
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
{`<div suppressHydrationWarning>
  <IoButton variant="solid">Click me</IoButton>
</div>`}
        </pre>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Alternatively, colocate all iO component rendering inside client components and ensure{' '}
          <code className="px-1 rounded" style={{ background: 'var(--io-bg-raised)', color: 'var(--io-accent)' }}>IoProvider</code>{' '}
          is mounted at the root layout. This is the recommended pattern and avoids hydration mismatches entirely.
        </p>
      </section>

      {/* Troubleshooting */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Troubleshooting
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
              Component renders but is unstyled
            </p>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              Confirm that <code className="px-1 rounded" style={{ background: 'var(--io-bg-raised)', color: 'var(--io-accent)' }}>{`import '@io-digital/components/styles'`}</code>{' '}
              is present in your root layout. The stylesheet provides the design tokens that all components depend on.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
              Elements are not interactive / show as unknown HTML elements
            </p>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              The custom element registry has not been populated. Check that{' '}
              <code className="px-1 rounded" style={{ background: 'var(--io-bg-raised)', color: 'var(--io-accent)' }}>IoProvider</code>{' '}
              is mounted in your root layout before any iO component is rendered.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
              TypeScript reports unknown JSX element errors for <code className="px-1 rounded" style={{ background: 'var(--io-bg-raised)', color: 'var(--io-accent)' }}>io-*</code> tags
            </p>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              Use the React wrapper imports from{' '}
              <code className="px-1 rounded" style={{ background: 'var(--io-bg-raised)', color: 'var(--io-accent)' }}>@io-digital/components-react</code>{' '}
              instead of raw HTML tags. The wrapper package ships full TypeScript definitions for every component prop and event.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
              Hydration warnings in the browser console
            </p>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              Move iO component usage into client components (files with the{' '}
              <code className="px-1 rounded" style={{ background: 'var(--io-bg-raised)', color: 'var(--io-accent)' }}>{`'use client'`}</code>{' '}
              directive) and ensure <code className="px-1 rounded" style={{ background: 'var(--io-bg-raised)', color: 'var(--io-accent)' }}>IoProvider</code>{' '}
              is at the root. For isolated cases, add{' '}
              <code className="px-1 rounded" style={{ background: 'var(--io-bg-raised)', color: 'var(--io-accent)' }}>suppressHydrationWarning</code>{' '}
              to the wrapping element.
            </p>
          </div>
        </div>
      </section>

      {/* Next actions */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Next steps
        </h2>
        <ul className="text-sm space-y-1 list-disc list-inside" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          <li>Browse the component reference pages to explore available props and events.</li>
          <li>Check the Vanilla JS guide if you prefer using raw custom elements without framework wrappers.</li>
          <li>Review accessibility notes on each component page for keyboard and screen reader guidance.</li>
        </ul>
      </section>
    </div>
  );
}
