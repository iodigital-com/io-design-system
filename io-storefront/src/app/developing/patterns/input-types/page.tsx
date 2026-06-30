'use client';

import { SectionHeader, RuleCard, DoOrDontCard } from '@/components/usage/UsagePrimitives';
import { PageHeader } from '@/components/layout/PageHeader';
import { InlineCode } from '@/components/api/ApiPrimitives';

// ── Recipe data ────────────────────────────────────────────────────────────────

type InputRecipe = {
  useCase: string;
  type: string;
  inputMode: string;
  autoComplete: string;
  pattern?: string;
  notes: string;
};

const INPUT_RECIPES: InputRecipe[] = [
  {
    useCase: 'Email address',
    type: 'email',
    inputMode: 'email',
    autoComplete: 'email',
    notes: 'Browser validates format. Use autoComplete="email" for autofill. inputmode="email" shows @-symbol keyboard on mobile.',
  },
  {
    useCase: 'Phone number',
    type: 'tel',
    inputMode: 'tel',
    autoComplete: 'tel',
    notes: 'Use inputmode="tel" for telephone keypad. Set pattern="[+][0-9]{8,15}" for international format. Browser does not validate tel automatically.',
  },
  {
    useCase: 'URL / website',
    type: 'url',
    inputMode: 'url',
    autoComplete: 'url',
    notes: 'Browser validates scheme (must start with http:// or https://). inputmode="url" shows slash and .com on mobile.',
  },
  {
    useCase: 'Quantity / integer',
    type: 'number',
    inputMode: 'numeric',
    autoComplete: 'off',
    notes: 'Use min, max, step props for range constraints. inputmode="numeric" shows numeric keypad without +/- sign on mobile. Use "decimal" for fractional numbers.',
  },
  {
    useCase: 'Price / decimal',
    type: 'number',
    inputMode: 'decimal',
    autoComplete: 'off',
    pattern: '[0-9]+([.,][0-9]{1,2})?',
    notes: 'inputmode="decimal" shows decimal keyboard. Consider step="0.01" for two-decimal precision.',
  },
  {
    useCase: 'Time (HH:MM)',
    type: 'time',
    inputMode: 'text',
    autoComplete: 'off',
    notes: 'Native time picker. Use step="900" for 15-minute increments. Use min/max to constrain range.',
  },
  {
    useCase: 'Full name',
    type: 'text',
    inputMode: 'text',
    autoComplete: 'name',
    notes: 'autoComplete="name" suggests saved contact names. Use autoComplete="given-name" or "family-name" for split name fields.',
  },
  {
    useCase: 'Street address',
    type: 'text',
    inputMode: 'text',
    autoComplete: 'street-address',
    notes: 'For multi-line use io-textarea. Pair with address-line1, address-line2 for separate fields.',
  },
  {
    useCase: 'Postal / ZIP code',
    type: 'text',
    inputMode: 'numeric',
    autoComplete: 'postal-code',
    notes: 'Type=text keeps leading zeros (important for some regions). inputmode="numeric" shows number keyboard. Add a pattern for local format if needed.',
  },
  {
    useCase: 'Credit card number',
    type: 'text',
    inputMode: 'numeric',
    autoComplete: 'cc-number',
    pattern: '[0-9 ]{13,19}',
    notes: 'Never store raw card numbers — use a payments SDK. inputmode="numeric" + autoComplete="cc-number" enables browser / platform autofill.',
  },
  {
    useCase: 'One-time passcode (OTP)',
    type: 'text',
    inputMode: 'numeric',
    autoComplete: 'one-time-code',
    notes: 'For short numeric codes (4-8 digits), prefer io-pin-code which auto-advances between digit slots. Use io-input only for free-form OTP fields.',
  },
  {
    useCase: 'Search query',
    type: 'search',
    inputMode: 'search',
    autoComplete: 'off',
    notes: 'Prefer io-input-search which adds a clear button and magnifier icon. Use io-input type="search" only when the clear button is not desired.',
  },
];

// ── Phone number example component HTML (for the examples section) ─────────────

const PHONE_EXAMPLE_CODE = `<io-input
  label="Phone number"
  type="tel"
  inputMode="tel"
  autoComplete="tel"
  placeholder="+31 6 12 34 56 78"
  helperText="Include country code, e.g. +31 for the Netherlands"
/>`;

const EMAIL_EXAMPLE_CODE = `<io-input
  label="Email address"
  type="email"
  inputMode="email"
  autoComplete="email"
  placeholder="you@example.com"
  required
/>`;

const POSTAL_CODE_EXAMPLE_CODE = `<!-- Dutch postal code — 4 digits + space + 2 letters -->
<io-input
  label="Postal code"
  type="text"
  inputMode="numeric"
  autoComplete="postal-code"
  placeholder="1234 AB"
  pattern="[0-9]{4}\\s?[A-Za-z]{2}"
  helperText="Dutch format: 4 digits followed by 2 letters"
/>`;

// ── Helpers ───────────────────────────────────────────────────────────────────

function RecipeTable({ recipes }: { recipes: InputRecipe[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs" style={{ borderCollapse: 'separate', borderSpacing: '0' }}>
        <thead>
          <tr style={{ background: 'var(--io-bg-raised)' }}>
            {['Use case', 'type', 'inputMode', 'autoComplete', 'pattern', 'Notes'].map((col) => (
              <th
                key={col}
                className="text-left px-3 py-3 font-semibold"
                style={{
                  color: 'var(--io-text-muted)',
                  borderBottom: '1px solid var(--io-border)',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recipes.map((row, idx) => (
            <tr
              key={row.useCase}
              style={{
                borderBottom: '1px solid var(--io-border)',
                background: idx % 2 === 0 ? 'var(--io-bg-base)' : 'var(--io-bg-raised)',
              }}
            >
              <td className="px-3 py-3 font-semibold" style={{ color: 'var(--io-text-primary)', whiteSpace: 'nowrap' }}>
                {row.useCase}
              </td>
              <td className="px-3 py-3 font-mono" style={{ color: 'var(--io-accent-text)', whiteSpace: 'nowrap' }}>
                {row.type}
              </td>
              <td className="px-3 py-3 font-mono" style={{ color: 'var(--io-accent-text)', whiteSpace: 'nowrap' }}>
                {row.inputMode}
              </td>
              <td className="px-3 py-3 font-mono" style={{ color: 'var(--io-accent-text)', whiteSpace: 'nowrap' }}>
                {row.autoComplete}
              </td>
              <td className="px-3 py-3 font-mono text-xs" style={{ color: 'var(--io-text-secondary)' }}>
                {row.pattern ?? '—'}
              </td>
              <td className="px-3 py-3 text-xs" style={{ color: 'var(--io-text-secondary)', minWidth: '240px' }}>
                {row.notes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--io-text-muted)', letterSpacing: '0.06em' }}>
        {label}
      </p>
      <pre
        className="text-xs font-mono p-4 rounded-lg overflow-x-auto"
        style={{ background: 'var(--io-bg-raised)', color: 'var(--io-text-primary)', border: '1px solid var(--io-border)' }}
      >
        {code}
      </pre>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function InputTypesPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Input-type Recipes"
        description="The correct combination of type, inputMode, autoComplete, and pattern for every common input use case. io-input uses a single component with a type prop — this page tells you what to set for each scenario."
        tabs={[]}
      />

      <section id="why-one-component" className="space-y-6">
        <SectionHeader
          title="Why one component for all types?"
          description="io-input collapses email, tel, url, number, time, search, and text into a single component with a type prop."
        />
        <div className="space-y-4">
          <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
            Some design systems (e.g., Porsche PDS) ship nine sibling components — one per native
            HTML input type. io takes the leaner path: a single{' '}
            <InlineCode>&lt;io-input&gt;</InlineCode> with a{' '}
            <InlineCode>type</InlineCode> prop. This reduces surface area and avoids nine near-identical
            components that are difficult to maintain consistently.
          </p>
          <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
            The trade-off is that consumers are responsible for supplying the right combination of{' '}
            <InlineCode>type</InlineCode>, <InlineCode>inputMode</InlineCode>,{' '}
            <InlineCode>autoComplete</InlineCode>, and <InlineCode>pattern</InlineCode>. This page
            gives you the correct recipe for every common use case.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RuleCard label="inputMode controls the mobile keyboard">
              <InlineCode>inputMode</InlineCode> is a hint to mobile browsers about which virtual
              keyboard to show. <code style={{ fontSize: '0.85em' }}>numeric</code> shows a number
              pad, <code style={{ fontSize: '0.85em' }}>tel</code> shows a phone keypad with # and *,{' '}
              <code style={{ fontSize: '0.85em' }}>email</code> shows @ and .com shortcuts.
            </RuleCard>
            <RuleCard label="autoComplete controls browser/platform autofill">
              <InlineCode>autoComplete</InlineCode> tells the browser which saved data to offer.
              Standard values like <code style={{ fontSize: '0.85em' }}>email</code>,{' '}
              <code style={{ fontSize: '0.85em' }}>tel</code>,{' '}
              <code style={{ fontSize: '0.85em' }}>name</code>, and{' '}
              <code style={{ fontSize: '0.85em' }}>street-address</code> match the WHATWG
              autofill section tokens.
            </RuleCard>
          </div>
        </div>
      </section>

      <section id="recipe-table" className="space-y-6">
        <SectionHeader
          title="Recipe table"
          description="Look up the correct attribute combination for your use case."
        />
        <RecipeTable recipes={INPUT_RECIPES} />
      </section>

      <section id="phone-number-example" className="space-y-6">
        <SectionHeader
          title="Phone number example"
          description="Demonstrates the tel type with inputMode, autoComplete, and a helper text prompt."
        />
        <div className="space-y-4">
          <div
            className="p-6 rounded-lg flex flex-col gap-4"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)', maxWidth: '360px' }}
          >
            <io-input
              label="Phone number"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+31 6 12 34 56 78"
              helperText="Include country code, e.g. +31 for the Netherlands"
            />
          </div>
          <CodeBlock code={PHONE_EXAMPLE_CODE} label="HTML / Web Component" />
        </div>
      </section>

      <section id="email-example" className="space-y-6">
        <SectionHeader
          title="Email address example"
          description="Browser validates format automatically when type=email is set."
        />
        <div className="space-y-4">
          <div
            className="p-6 rounded-lg flex flex-col gap-4"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)', maxWidth: '360px' }}
          >
            <io-input
              label="Email address"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>
          <CodeBlock code={EMAIL_EXAMPLE_CODE} label="HTML / Web Component" />
        </div>
      </section>

      <section id="postal-code-example" className="space-y-6">
        <SectionHeader
          title="Postal code example"
          description="Uses type=text to preserve leading characters, with inputMode=numeric for the number keyboard and a region-specific pattern."
        />
        <div className="space-y-4">
          <div
            className="p-6 rounded-lg flex flex-col gap-4"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)', maxWidth: '360px' }}
          >
            <io-input
              label="Postal code"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="1234 AB"
              helperText="Dutch format: 4 digits followed by 2 letters"
            />
          </div>
          <CodeBlock code={POSTAL_CODE_EXAMPLE_CODE} label="HTML / Web Component" />
          <p className="text-xs" style={{ color: 'var(--io-text-muted)' }}>
            Note: type=&quot;text&quot; is used instead of type=&quot;number&quot; to preserve leading zeros and allow alphabetic characters in the postal code format.
          </p>
        </div>
      </section>

      <section id="when-to-use-dedicated-components" className="space-y-6">
        <SectionHeader
          title="When to reach for a dedicated component"
          description="Some input use cases have first-class io components designed for richer affordances."
        />
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DoOrDontCard type="do">
              Use <InlineCode>io-input-password</InlineCode> for password fields — it adds a built-in
              show/hide toggle button that a plain <code style={{ fontSize: '0.85em' }}>io-input type=&quot;password&quot;</code> does not provide.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <InlineCode>io-input-search</InlineCode> for search fields — it adds a magnifier
              prefix icon and a clear button that appear automatically. Reserve{' '}
              <code style={{ fontSize: '0.85em' }}>io-input type=&quot;search&quot;</code> for
              cases where those affordances are unwanted.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <InlineCode>io-input-date</InlineCode> for date-only fields — it provides a
              calendar icon and consistent sizing. Use{' '}
              <code style={{ fontSize: '0.85em' }}>io-input type=&quot;time&quot;</code> when
              you need time-only input without a dedicated wrapper.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <InlineCode>io-pin-code</InlineCode> for 4–8 digit OTP or PIN entry — it
              auto-advances between digit slots and handles paste distribution.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="validation-notes" className="space-y-6">
        <SectionHeader
          title="Validation notes"
          description="How native constraint validation interacts with io-input's FACE implementation."
        />
        <div className="space-y-4">
          <RuleCard label="Browser validates type=email and type=url automatically">
            When <code style={{ fontSize: '0.85em' }}>type=&quot;email&quot;</code> or{' '}
            <code style={{ fontSize: '0.85em' }}>type=&quot;url&quot;</code> is set, the browser
            applies <code style={{ fontSize: '0.85em' }}>typeMismatch</code> validity when the
            entered value does not match the expected format. io-input's FACE implementation derives
            validity from the native input&apos;s <code style={{ fontSize: '0.85em' }}>validity</code>{' '}
            object, so <code style={{ fontSize: '0.85em' }}>typeMismatch</code> is automatically
            surfaced via the ElementInternals API when the field participates in a native form.
          </RuleCard>
          <RuleCard label="pattern triggers patternMismatch validity">
            Setting <code style={{ fontSize: '0.85em' }}>pattern</code> on io-input applies HTML5
            constraint validation. Escape backslashes in JSX/HTML attribute values:{' '}
            <code style={{ fontSize: '0.85em' }}>pattern=&quot;[0-9]&#123;4&#125;&quot;</code> should be
            written as{' '}
            <code style={{ fontSize: '0.85em' }}>{`pattern="[0-9]{4}"`}</code>.
          </RuleCard>
          <RuleCard label="tel type does not validate format automatically">
            Unlike <code style={{ fontSize: '0.85em' }}>email</code> and{' '}
            <code style={{ fontSize: '0.85em' }}>url</code>, the browser does not validate{' '}
            <code style={{ fontSize: '0.85em' }}>tel</code> format. Add a{' '}
            <code style={{ fontSize: '0.85em' }}>pattern</code> prop for format enforcement if
            your application requires it. Remember to explain the expected format in{' '}
            <code style={{ fontSize: '0.85em' }}>helperText</code>.
          </RuleCard>
        </div>
      </section>
    </div>
  );
}
