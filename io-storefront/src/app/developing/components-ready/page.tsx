'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';

export default function ComponentsReadyPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Components Ready"
        description="Custom elements upgrade asynchronously. Know when to wait, how to detect readiness, and what to expect in different runtime environments."
        tabs={[]}
      />

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Why readiness matters
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Browsers parse HTML before custom element definitions are evaluated. An{' '}
          <code>io-button</code> tag in the DOM is initially an unknown element — it upgrades to a
          fully-functional component only after <code>customElements.define()</code> has run. Any
          code that reads properties, calls methods, or dispatches events before that upgrade
          completes may silently fail or return <code>undefined</code>.
        </p>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          The same timing concern applies at test time. Integration and unit tests that query
          elements immediately after mount can run before upgrades have fired, producing flaky
          results that are hard to reproduce.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Detecting readiness with the platform
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          The Custom Elements API ships a built-in mechanism for this. <code>customElements.whenDefined()</code>{' '}
          returns a promise that resolves with the constructor once the element is registered.
          Await it before querying element-specific properties or methods.
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            color: 'var(--io-text-secondary)',
          }}
        >
{`// Wait for the io-button definition to be registered
await customElements.whenDefined('io-button');

const btn = document.querySelector('io-button');
btn.variant = 'outline'; // safe to set — element is upgraded`}
        </pre>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          For Stencil-based components (which io components use), each element also exposes a{' '}
          <code>componentOnReady()</code> method. This resolves after the component has completed its
          first render cycle — one level deeper than mere registration.
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            color: 'var(--io-text-secondary)',
          }}
        >
{`const btn = document.querySelector('io-button');

// Resolves after first render, not just registration
await btn.componentOnReady();

btn.disabled = true;`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Reusable readiness helper
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          The pattern below wraps both platform checks into a single utility you can drop into any
          project. It combines element definition registration with Stencil&apos;s per-instance
          ready signal and falls back gracefully when neither is available (for example, in a
          server-rendered environment).
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            color: 'var(--io-text-secondary)',
          }}
        >
{`/**
 * Waits for a custom element to be both defined and fully rendered.
 * Works with Stencil components (io-*) and generic custom elements.
 *
 * @param tagName - The element tag name, e.g. 'io-button'
 * @param element - An optional already-queried element reference
 * @returns A promise that resolves when the element is ready
 */
type StencilElement = Element & { componentOnReady?: () => Promise<unknown> };

async function waitForElement(
  tagName: string,
  element?: Element | null,
): Promise<void> {
  // 1. Wait for the definition to be registered
  if (typeof customElements !== 'undefined') {
    await customElements.whenDefined(tagName);
  }

  // 2. Wait for the Stencil render cycle to complete
  const el = (element ?? document.querySelector(tagName)) as StencilElement | null;
  if (typeof el?.componentOnReady === 'function') {
    await el.componentOnReady();
  }
}`}
        </pre>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Use it at the call site before any interaction:
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            color: 'var(--io-text-secondary)',
          }}
        >
{`const modal = document.querySelector('io-modal');
await waitForElement('io-modal', modal);

modal.open = true; // render cycle complete — property assignment is safe`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          jsdom limitations
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Jest and Vitest default to <strong>jsdom</strong> as their DOM environment. jsdom does not
          implement the Custom Elements registry, so <code>customElements.define()</code> is a
          no-op and elements never upgrade. Querying <code>io-*</code> tags in this environment
          returns a plain <code>HTMLElement</code> — Stencil properties and methods are absent.
        </p>
        <div
          className="rounded-lg p-5 space-y-3"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          <p className="font-semibold text-sm" style={{ color: 'var(--io-text-primary)' }}>
            Recommended approaches by test type
          </p>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
            <li>
              <strong>Unit tests (jsdom):</strong> Mock the element or test the surrounding
              logic in isolation. Avoid relying on custom element lifecycle hooks.
            </li>
            <li>
              <strong>Component tests (Stencil testing utils):</strong> Use{' '}
              <code>@stencil/core/testing</code> which ships a headless browser context that
              correctly upgrades elements.
            </li>
            <li>
              <strong>Integration and E2E tests:</strong> Use a real browser environment
              (Playwright, WebdriverIO, or Cypress with a browser runner). Upgrades happen
              naturally; use locator wait strategies instead of manual{' '}
              <code>whenDefined()</code> calls.
            </li>
          </ul>
        </div>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            color: 'var(--io-text-secondary)',
          }}
        >
{`// vitest.config.ts — switch to a browser-compatible pool
// when testing code that depends on custom element behaviour
export default defineConfig({
  test: {
    // 'happy-dom' has partial custom element support;
    // a real browser environment is most reliable.
    environment: 'happy-dom',
  },
});`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Interaction reliability in tests
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          In browser-based test runners, prefer the runner&apos;s built-in wait mechanisms over
          manual polling. These automatically retry until the condition is met or a timeout fires.
        </p>
        <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
          Playwright
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            color: 'var(--io-text-secondary)',
          }}
        >
{`// Playwright automatically waits for the element to be visible and stable
await page.locator('io-button').click();

// For property-level assertions, wait for the element to be attached first
await page.locator('io-modal').waitFor({ state: 'attached' });
const isOpen = await page.locator('io-modal').evaluate(
  (el) => (el as HTMLElement & { open: boolean }).open,
);`}
        </pre>
        <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
          WebdriverIO
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            color: 'var(--io-text-secondary)',
          }}
        >
{`// WebdriverIO waits for element existence before interaction
const button = await $('io-button');
await button.waitForExist();
await button.click();`}
        </pre>
        <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
          Runtime JavaScript
        </p>
        <pre
          className="rounded-lg p-4 text-sm overflow-x-auto"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            color: 'var(--io-text-secondary)',
          }}
        >
{`// Dynamically inserted elements need an explicit ready check
const toast = document.createElement('io-toast');
document.body.appendChild(toast);

await waitForElement('io-toast', toast);

toast.addToast({ message: 'Saved', variant: 'success' });`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
          Next steps
        </h2>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Apply these readiness patterns in whichever integration path you are following.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              label: 'Vanilla JS integration',
              description: 'Install and configure io components without a framework.',
              href: '/developing/vanilla-js',
            },
            {
              label: 'Next.js integration',
              description: 'Use io components inside a Next.js application.',
              href: '/developing/next-js',
            },
            {
              label: 'Components reference',
              description: 'Browse all available io components with live configurators.',
              href: '/components',
            },
            {
              label: 'Developing introduction',
              description: 'Overview of integration paths and package installation.',
              href: '/developing',
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col gap-1 p-4 rounded-lg"
              style={{
                background: 'var(--io-bg-raised)',
                border: '1px solid var(--io-border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--io-bg-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--io-bg-raised)';
              }}
            >
              <span className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
                {link.label}
              </span>
              <span className="text-xs" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.5' }}>
                {link.description}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
