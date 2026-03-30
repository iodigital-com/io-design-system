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

export default function DevelopingNextJsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Next.js"
        description="Use io components in Next.js App Router projects via the React wrapper package. Because Web Components rely on browser APIs, io components must run in a client boundary."
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
          Import the component stylesheet in your root <code>layout.tsx</code> so it is available across all routes.
        </p>
        <CodeBlock>{`// app/layout.tsx
import '@io-digital/components/dist/io-components/io-components.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`}</CodeBlock>
      </Section>

      <Section id="client-boundary" title="Client boundary">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Web Components require browser APIs that are not available during server-side rendering. Add the <code>{'\'use client\''}</code> directive to any file that imports io components, or wrap them in a dedicated client component.
        </p>
        <CodeBlock>{`'use client';

import { IoButton, IoInput } from '@io-digital/components-react';

export function ContactForm() {
  return (
    <form>
      <IoInput label="Name" placeholder="Your name" />
      <IoInput label="Email" placeholder="name@example.com" />
      <IoButton color="blue" variant="solid" onIoClick={() => console.log('sent')}>
        Send message
      </IoButton>
    </form>
  );
}`}</CodeBlock>
      </Section>

      <Section id="usage" title="Using in page components">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Keep Server Components for data fetching and layout, then compose client components where io elements are needed.
        </p>
        <CodeBlock>{`// app/contact/page.tsx  — Server Component (no 'use client' required here)
import { ContactForm } from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main>
      <h1>Contact us</h1>
      <ContactForm />
    </main>
  );
}`}</CodeBlock>
      </Section>

      <Section id="requirements" title="Requirements">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Next.js 13.4 or later with the App Router is required. Pages Router projects can also use io components — import them inside <code>useEffect</code> or wrap them in a dynamic import with <code>ssr: false</code>.
        </p>
      </Section>

    </div>
  );
}
