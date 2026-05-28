'use client';

import { SectionHeader, InlineCode, ApiTable } from '@/components/api/ApiPrimitives';
import { PageHeader } from '@/components/layout/PageHeader';

const COMPONENT_MAP_ROWS: [string, string, string, string][] = [
  ['Button', 'Button', 'Button', 'io-button'],
  ['TextField / Input', 'Input', 'Form.Control (text)', 'io-input'],
  ['Textarea', 'Input multiline', 'Form.Control (textarea)', 'io-textarea'],
  ['Chip / Tag', 'Tag', '—', 'io-tag'],
  ['Dialog / Modal', 'Modal', 'Modal', 'io-modal'],
  ['CircularProgress / LinearProgress', 'Spin / Progress', 'Spinner', 'io-spinner / io-progress'],
  ['Checkbox', 'Checkbox', 'Form.Check (checkbox)', 'io-checkbox'],
  ['Radio', 'Radio', 'Form.Check (radio)', 'io-radio'],
  ['Select', 'Select', 'Form.Select', 'io-select'],
  ['Tabs', 'Tabs', 'Tabs / Nav tabs', 'io-tabs'],
  ['Badge', 'Badge', 'Badge', 'io-badge'],
  ['Pagination', 'Pagination', 'Pagination', 'io-pagination'],
  ['Divider', 'Divider', 'hr / Divider', 'io-divider'],
  ['Link', 'Typography (variant=link)', 'Nav.Link', 'io-link'],
  ['Breadcrumbs', 'Breadcrumb', 'Breadcrumb', 'io-breadcrumb'],
];

const TOKEN_REMAP_ROWS: [string, string, string, string][] = [
  ['primary.main / @primary', '$primary / --bs-primary', 'var(--io-color-primary)', 'Brand blue #0000D2'],
  ['error.main / @error', '$danger / --bs-danger', 'var(--io-color-error)', 'Error red'],
  ['warning.main / @warning', '$warning / --bs-warning', 'var(--io-color-warning)', 'Warning amber'],
  ['success.main / @success', '$success / --bs-success', 'var(--io-color-success)', 'Success green'],
  ['text.primary', '—', 'var(--io-text-primary)', 'High-contrast body text'],
  ['text.secondary', '—', 'var(--io-text-secondary)', 'Supporting / caption text'],
  ['background.paper', '$card-bg / --bs-body-bg', 'var(--io-bg-raised)', 'Elevated surface (cards, popovers)'],
  ['background.default', '--bs-body-bg', 'var(--io-bg-surface)', 'Page background'],
  ['spacing(1) = 8px', '$spacer = 1rem', 'var(--io-space-2) = 8px', 'Base spacing unit'],
  ['spacing(2) = 16px', '$spacer * 1 = 1rem', 'var(--io-space-4) = 16px', 'Standard padding'],
  ['spacing(4) = 32px', '$spacer * 2 = 2rem', 'var(--io-space-8) = 32px', 'Section margin'],
  ['shape.borderRadius = 4px', '$border-radius = 0.375rem', 'var(--io-border-radius-sm) = 9px', 'Default component radius'],
  ['typography.fontFamily', '$font-family-base', 'var(--io-font-primary)', 'Manrope, sans-serif'],
  ['transitions.duration.standard = 300ms', '$transition-base = all 0.2s', 'var(--io-motion-base) = 300ms ease', 'Standard transition'],
];

const CHECKLIST_ITEMS = [
  'Install @iodigital-com/components and import io-components.css in your app entry point',
  'Register Web Components once — call defineCustomElements() before mounting your framework',
  'Replace each MUI / Ant Design / Bootstrap component with its io-digital equivalent (see component map above)',
  'Migrate CSS variable references — replace theme tokens with --io-* equivalents (see token remapping)',
  'Wrap storefront or Next.js pages that use io components in a dynamic import with ssr: false if you encounter hydration mismatches',
  'Switch event listeners from React synthetic events (onChange, onClick) to native DOM events (io-change, io-click) on io component elements',
  'For forms, ensure io form elements are inside a <form> element — FACE (Form-Associated Custom Elements) writes to the native FormData automatically',
  'Verify refs work by using useRef<HTMLElement> and calling methods on .current after mount',
  'Run axe-core or similar accessibility audit — io components ship WCAG 2.1 AA compliance; verify your page-level wiring',
  'Run your test suite and update event assertions from onChange to native event listeners where needed',
  'Verify dark mode — set data-theme="dark" on <html> and confirm all io tokens resolve correctly without extra CSS',
  'Delete old library CSS imports (e.g. @mui/material, antd/dist/antd.css, bootstrap/dist/css/bootstrap.css)',
];

export default function MigrationPage() {
  const reactNativeEventsCode = `// MUI / Ant Design — React synthetic events
<TextField onChange={(e) => setValue(e.target.value)} />
<Button onClick={handleClick}>Submit</Button>

// io Design System — native DOM events via ref
import { useRef, useEffect } from 'react';

function MyForm() {
  const inputRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      setValue((e as CustomEvent).detail?.value ?? (e.target as HTMLInputElement).value);
    };
    el.addEventListener('io-input', handler);
    return () => el.removeEventListener('io-input', handler);
  }, []);

  return (
    <>
      <io-input ref={inputRef} label="Name" />
      <io-button ref={buttonRef} onClick={handleClick}>Submit</io-button>
    </>
  );
}`;

  const refBindingCode = `// React — use useRef to call component methods imperatively
import { useRef } from 'react';

function ModalExample() {
  const modalRef = useRef<HTMLElement>(null);

  const openModal = () => {
    // Call the Web Component method directly on .current
    (modalRef.current as any)?.show();
  };

  return (
    <>
      <io-button onClick={openModal}>Open</io-button>
      <io-modal ref={modalRef} heading="Confirm action">
        <p>Are you sure?</p>
        <io-button slot="footer" onClick={() => (modalRef.current as any)?.close()}>
          Close
        </io-button>
      </io-modal>
    </>
  );
}`;

  const ssrCode = `// Next.js — disable SSR for pages that use io Web Components
// The custom element registry is browser-only; SSR will throw.

import dynamic from 'next/dynamic';

const MyForm = dynamic(() => import('@/components/MyForm'), { ssr: false });

export default function Page() {
  return <MyForm />;
}

// Alternatively, wrap the defineCustomElements() call in a useEffect
// so it only runs in the browser:
import { useEffect } from 'react';
import { defineCustomElements } from '@iodigital-com/components/loader';

export function IoProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    defineCustomElements(window);
  }, []);
  return <>{children}</>;
}`;

  const formCode = `// io Web Components implement FACE (Form-Associated Custom Elements).
// They write their value directly into the parent <form>'s FormData.
// No extra wiring needed — treat them like native inputs.

<form onSubmit={(e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  console.log(data.get('email'));   // value from io-input
  console.log(data.get('consent')); // value from io-checkbox
}}>
  <io-input  name="email"   label="Email address" required />
  <io-checkbox name="consent" label="I agree to the terms" />
  <io-button type="submit">Submit</io-button>
</form>`;

  const themeSetupCode = `/* 1. Import the io Design System CSS (tokens + component styles) */
@import '@iodigital-com/components/dist/io-components/io-components.css';

/* 2. Remove your old library stylesheet imports, e.g.:
   @import 'bootstrap/dist/css/bootstrap.css';           -- remove
   @import '@mui/material/styles/index.css';             -- remove
   @import 'antd/dist/antd.css';                         -- remove
*/

/* 3. All --io-* tokens are now available on :root.
   Dark mode resolves automatically via data-theme="dark" on <html>.
   No extra CSS needed. */`;

  return (
    <div className="space-y-16">
      <PageHeader
        title="Migration Guide"
        description="A practical guide for teams moving from MUI, Ant Design, or Bootstrap to the io Design System. Covers component equivalents, token remapping, event model differences, and Web Component gotchas."
        tabs={[]}
      />

      <section id="overview" className="space-y-6">
        <SectionHeader
          title="Migration approach"
          description="Choose between a phased incremental migration or a big-bang rewrite based on project size and risk tolerance."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div
            className="p-5 rounded-xl space-y-2"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
          >
            <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
              Phased migration (recommended)
            </p>
            <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
              Replace components one page or feature at a time. Old and new component libraries coexist during transition. Lower risk — you can validate each section before continuing. Works well for large codebases.
            </p>
          </div>
          <div
            className="p-5 rounded-xl space-y-2"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
          >
            <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
              Big-bang rewrite
            </p>
            <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
              Replace all components in a single release branch. Eliminates dual-library CSS conflicts and ensures visual consistency from day one. Suitable for small or greenfield applications with good test coverage.
            </p>
          </div>
        </div>
        <div
          className="p-4 rounded-xl"
          style={{ background: 'color-mix(in srgb, var(--io-color-primary) 6%, transparent)', border: '1px solid color-mix(in srgb, var(--io-color-primary) 20%, transparent)' }}
        >
          <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
            <strong style={{ color: 'var(--io-text-primary)' }}>Regardless of approach:</strong> install{' '}
            <InlineCode>@iodigital-com/components</InlineCode> and import the design system stylesheet early. The{' '}
            <InlineCode>--io-*</InlineCode> tokens will be available immediately without conflicting with your existing library.
          </p>
        </div>
      </section>

      <section id="stylesheet-setup" className="space-y-6">
        <SectionHeader
          title="Stylesheet setup"
          description="Import the io Design System CSS once and remove your old library stylesheets."
        />
        <pre
          className="text-xs font-mono leading-6 p-5 rounded-xl overflow-x-auto"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            color: 'var(--io-text-secondary)',
          }}
        >
          {themeSetupCode}
        </pre>
      </section>

      <section id="component-map" className="space-y-6">
        <SectionHeader
          title="Component equivalents"
          description="Direct mappings from MUI, Ant Design, and Bootstrap components to their io Design System counterparts."
        />
        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--io-border)' }}>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: 'var(--io-bg-surface)', borderBottom: '1px solid var(--io-border)' }}>
                {(['MUI', 'Ant Design', 'Bootstrap', 'io Design System'] as const).map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-widest"
                    style={{ color: 'var(--io-text-muted)', letterSpacing: '0.08em' }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPONENT_MAP_ROWS.map(([mui, ant, bs, io], i) => (
                <tr
                  key={io}
                  style={{
                    background: i % 2 === 1 ? 'var(--io-bg-raised)' : 'transparent',
                    borderBottom: i < COMPONENT_MAP_ROWS.length - 1 ? '1px solid var(--io-border)' : 'none',
                  }}
                >
                  <td className="px-4 py-3 align-top" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
                    {mui}
                  </td>
                  <td className="px-4 py-3 align-top" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
                    {ant}
                  </td>
                  <td className="px-4 py-3 align-top" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
                    {bs}
                  </td>
                  <td className="px-4 py-3 align-top font-mono text-xs" style={{ color: 'var(--io-text-primary)', lineHeight: '1.6' }}>
                    {io}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="token-remap" className="space-y-6">
        <SectionHeader
          title="Token remapping"
          description="Map MUI theme tokens, Ant Design design tokens, and Bootstrap CSS variables to their io Design System equivalents."
        />
        <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
          The io Design System uses CSS custom properties prefixed with{' '}
          <InlineCode>--io-</InlineCode>. All tokens are declared on{' '}
          <InlineCode>:root</InlineCode> and automatically update in dark mode when{' '}
          <InlineCode>data-theme=&quot;dark&quot;</InlineCode> is set on{' '}
          <InlineCode>{'<html>'}</InlineCode>.
        </p>
        <ApiTable
          columns={[
            { label: 'MUI / Ant Design', width: '200px' },
            { label: 'Bootstrap', width: '200px' },
            { label: 'io token' },
            { label: 'Notes' },
          ]}
          rows={TOKEN_REMAP_ROWS.map(([mui, bs, io, note]) => [
            <span key="mui" className="font-mono text-xs" style={{ color: 'var(--io-text-secondary)' }}>{mui}</span>,
            <span key="bs" className="font-mono text-xs" style={{ color: 'var(--io-text-secondary)' }}>{bs}</span>,
            <InlineCode key="io">{io}</InlineCode>,
            note,
          ])}
        />
        <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
          For the full token catalogue, see the{' '}
          <a
            href="/styles/tokens"
            className="underline"
            style={{ color: 'var(--io-color-primary)' }}
          >
            Token Explorer
          </a>{' '}
          and{' '}
          <a
            href="/developing/tokens"
            className="underline"
            style={{ color: 'var(--io-color-primary)' }}
          >
            Token Usage
          </a>{' '}
          pages.
        </p>
      </section>

      <section id="event-model" className="space-y-6">
        <SectionHeader
          title="Event model differences"
          description="io Web Components emit native DOM events, not React synthetic events. The wiring pattern differs from MUI and Ant Design."
        />
        <div className="space-y-4">
          <div
            className="p-4 rounded-xl"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
              React synthetic events vs. native DOM events
            </p>
            <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
              MUI and Ant Design components use React&apos;s{' '}
              <InlineCode>onChange</InlineCode>,{' '}
              <InlineCode>onClick</InlineCode>, and{' '}
              <InlineCode>onFocus</InlineCode> synthetic events because they are React components.
              io components are Web Components — they live outside React&apos;s virtual DOM, so React prop-based
              event handlers do not fire reliably for custom events. Use{' '}
              <InlineCode>addEventListener</InlineCode> inside a{' '}
              <InlineCode>useEffect</InlineCode> instead.
            </p>
          </div>
          <div
            className="p-4 rounded-xl"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
              Standard DOM events (click, focus, blur)
            </p>
            <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
              Standard DOM events like <InlineCode>click</InlineCode>,{' '}
              <InlineCode>focus</InlineCode>, and{' '}
              <InlineCode>blur</InlineCode> bubble normally and can be attached with React&apos;s{' '}
              <InlineCode>onClick</InlineCode> / <InlineCode>onFocus</InlineCode> props on the host element.
              Custom component events (e.g. <InlineCode>io-change</InlineCode>,{' '}
              <InlineCode>io-toggle</InlineCode>) require <InlineCode>addEventListener</InlineCode>.
            </p>
          </div>
        </div>
        <pre
          className="text-xs font-mono leading-6 p-5 rounded-xl overflow-x-auto"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            color: 'var(--io-text-secondary)',
          }}
        >
          {reactNativeEventsCode}
        </pre>
      </section>

      <section id="web-component-gotchas" className="space-y-6">
        <SectionHeader
          title="Web Component gotchas"
          description="Common integration issues and how to resolve them when migrating from React-native component libraries."
        />

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
              Ref binding in React
            </h3>
            <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
              To call imperative methods (e.g. <InlineCode>show()</InlineCode> on{' '}
              <InlineCode>io-modal</InlineCode>), pass a{' '}
              <InlineCode>{'useRef<HTMLElement>(null)'}</InlineCode> and call the method on{' '}
              <InlineCode>.current</InlineCode> after the component has mounted.
            </p>
            <pre
              className="text-xs font-mono leading-6 p-5 rounded-xl overflow-x-auto"
              style={{
                background: 'var(--io-bg-raised)',
                border: '1px solid var(--io-border)',
                color: 'var(--io-text-secondary)',
              }}
            >
              {refBindingCode}
            </pre>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
              Form submission and FACE
            </h3>
            <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
              io form components implement the{' '}
              <strong style={{ color: 'var(--io-text-primary)' }}>
                Form-Associated Custom Elements
              </strong>{' '}
              (FACE) API. They participate in native form submission and{' '}
              <InlineCode>FormData</InlineCode> automatically — the same as a native{' '}
              <InlineCode>{'<input>'}</InlineCode>. No manual value extraction required.
            </p>
            <pre
              className="text-xs font-mono leading-6 p-5 rounded-xl overflow-x-auto"
              style={{
                background: 'var(--io-bg-raised)',
                border: '1px solid var(--io-border)',
                color: 'var(--io-text-secondary)',
              }}
            >
              {formCode}
            </pre>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
              SSR limitations with Next.js
            </h3>
            <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
              Web Components rely on the browser&apos;s{' '}
              <InlineCode>customElements</InlineCode> registry, which does not exist in Node.js.
              When using Next.js App Router or Pages Router with SSR, wrap components that use io
              elements in a{' '}
              <InlineCode>{'dynamic(() => ..., { ssr: false })'}</InlineCode> call, or call{' '}
              <InlineCode>defineCustomElements()</InlineCode> inside a{' '}
              <InlineCode>useEffect</InlineCode>.
            </p>
            <pre
              className="text-xs font-mono leading-6 p-5 rounded-xl overflow-x-auto"
              style={{
                background: 'var(--io-bg-raised)',
                border: '1px solid var(--io-border)',
                color: 'var(--io-text-secondary)',
              }}
            >
              {ssrCode}
            </pre>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
              TypeScript and JSX unknown element warnings
            </h3>
            <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
              React does not know about custom element tags by default. Add the io Design System
              custom elements type declaration to your{' '}
              <InlineCode>tsconfig.json</InlineCode> references or import it in a{' '}
              <InlineCode>global.d.ts</InlineCode> file:
            </p>
            <pre
              className="text-xs font-mono leading-6 p-5 rounded-xl overflow-x-auto"
              style={{
                background: 'var(--io-bg-raised)',
                border: '1px solid var(--io-border)',
                color: 'var(--io-text-secondary)',
              }}
            >
              {`// global.d.ts — import the io Design System JSX/HTML type augmentation
import '@iodigital-com/components';

// Or in tsconfig.json compilerOptions.types if a @types package is available`}
            </pre>
          </div>
        </div>
      </section>

      <section id="checklist" className="space-y-6">
        <SectionHeader
          title="Migration checklist"
          description="A step-by-step checklist to track your migration from MUI, Ant Design, or Bootstrap to the io Design System."
        />
        <div
          className="rounded-xl divide-y overflow-hidden"
          style={{ border: '1px solid var(--io-border)', borderColor: 'var(--io-border)' }}
        >
          {CHECKLIST_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-4 py-3"
              style={{ background: i % 2 === 1 ? 'var(--io-bg-raised)' : 'transparent' }}
            >
              <span
                className="shrink-0 flex items-center justify-center rounded-full text-xs font-bold mt-0.5"
                style={{
                  width: '1.375rem',
                  height: '1.375rem',
                  background: 'color-mix(in srgb, var(--io-color-primary) 10%, transparent)',
                  color: 'var(--io-color-primary)',
                  border: '1px solid color-mix(in srgb, var(--io-color-primary) 25%, transparent)',
                }}
              >
                {i + 1}
              </span>
              <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
