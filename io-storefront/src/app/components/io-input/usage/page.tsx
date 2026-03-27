'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoInputUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-input is a single-line text field with a floating label. Use it whenever a user needs to enter a short value — name, email, password, search query, or phone number."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for short, single-line values — names, email addresses, phone numbers, search queries, and numeric entries.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a <C>label</C> prop. The floating label is the accessible name — there is no fallback.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>helperText</C> for format hints or constraints before the user starts typing (e.g. &ldquo;Include country code&rdquo;, &ldquo;Max 12 characters&rdquo;).
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Pair <C>error</C> with <C>errorMessage</C> to give specific, actionable feedback after validation fails.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use for multi-line input — use <C>{'<io-textarea>'}</C> instead. Text that wraps across lines needs a resizable surface.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use <C>placeholder</C> as a label substitute. Placeholder text disappears on input and is not announced reliably by screen readers.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Show <C>error</C> state before the user has had a chance to interact. Validate on blur or on form submit — not on mount.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Put critical instructions only in <C>helperText</C>. Helper text is hidden when <C>error</C> is true — move essential guidance into the label or a persistent description.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Input types ──────────────────────────────────────────── */}
      <section id="input-types" className="space-y-6">
        <SectionHeader
          title="Input types"
          description="The type prop maps directly to the native HTML input type. Choose the type that matches the expected value — browsers use it to show the right keyboard on mobile and to apply native validation."
        />
        <div className="space-y-3">
          <RuleCard label="text — General single-line entry">
            The default. Use for names, usernames, addresses, and any value that does not fit a more specific type. No browser validation beyond <C>required</C>.
          </RuleCard>
          <RuleCard label="email — Email addresses">
            Browser validates the format on submit (<C>@</C> and a domain are required). Shows an email-optimised keyboard on mobile with <C>@</C> easily accessible.
          </RuleCard>
          <RuleCard label="password — Sensitive credentials">
            Browser masks the entered characters. Enables password manager integration and the &ldquo;show password&rdquo; toggle in supported browsers. Never use <C>type=&quot;text&quot;</C> for passwords.
          </RuleCard>
          <RuleCard label="search — Search queries">
            Functionally equivalent to <C>text</C> but semantically signals a search context. Some browsers add a clear (×) button. <kbd className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>Escape</kbd> clears the value.
          </RuleCard>
          <RuleCard label="tel — Telephone numbers">
            Shows a numeric telephone keyboard on mobile. No format validation — phones vary too widely by region. Use <C>placeholder</C> to suggest the expected format.
          </RuleCard>
          <RuleCard label="url — Web addresses">
            Browser validates that the value starts with a protocol (<C>http://</C>, <C>https://</C>, etc.) on submit. Shows a URL-optimised keyboard on mobile.
          </RuleCard>
          <RuleCard label="number — Numeric values">
            Shows a numeric keyboard on mobile. Browser hides native spinners (hidden via CSS). Only use when the value is genuinely numeric — for phone numbers, postcodes, or card numbers, prefer <C>tel</C> or <C>text</C> with <C>inputmode</C>.
          </RuleCard>
        </div>
      </section>

      {/* ── States ───────────────────────────────────────────────── */}
      <section id="states" className="space-y-6">
        <SectionHeader
          title="States"
          description="io-input has four visual states. Transitions are driven by focus and prop changes — never by direct DOM manipulation."
        />
        <div className="space-y-3">
          <RuleCard label="Default — label at rest">
            The label sits inside the field at body size. No value is set. The border is 1px in the neutral border colour.
          </RuleCard>
          <RuleCard label="Focused / filled — label floats">
            When the field receives focus, the border expands to 5px and changes to the accent colour (io brand interaction). The label animates up and reduces in size. Once a value is typed, the label stays floating even after blur.
          </RuleCard>
          <RuleCard label="Error — validation feedback">
            Set <C>error=&quot;true&quot;</C> and provide an <C>errorMessage</C>. The border turns red, the floating label turns red, and the error message appears below with <C>role=&quot;alert&quot;</C> so screen readers announce it immediately. <C>helperText</C> is hidden when in error state.
          </RuleCard>
          <RuleCard label="Disabled — unavailable">
            Set <C>disabled=&quot;true&quot;</C>. The entire field renders at 40% opacity and pointer events are blocked. Use when the field is conditionally unavailable — for example, a secondary field that only activates after a primary selection is made.
          </RuleCard>
        </div>
      </section>

      {/* ── Content guidelines ───────────────────────────────────── */}
      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Clear, concise field copy reduces user error and speeds up form completion."
        />
        <div className="space-y-3">
          <RuleCard label="Labels — sentence case, describe the value">
            Write labels as short noun phrases in sentence case: &ldquo;Email address&rdquo;, &ldquo;First name&rdquo;, &ldquo;Postcode&rdquo;. Avoid all-caps, abbreviations, or vague labels like &ldquo;Input&rdquo;. The label is the only accessible name — it must stand alone.
          </RuleCard>
          <RuleCard label="Placeholder — examples, not instructions">
            Use placeholder only to show an example of the expected format (e.g. <C>jane@example.com</C>). Never use it for instructions that a user needs before typing — those belong in <C>helperText</C>. Placeholder disappears the moment typing starts.
          </RuleCard>
          <RuleCard label="Helper text — format hints and constraints">
            Keep helper text to one short sentence. Use it for format guidance (&ldquo;Include country code&rdquo;), character limits (&ldquo;Max 100 characters&rdquo;), or dependency notes (&ldquo;Must match your registered email&rdquo;). Avoid restating what the label already says.
          </RuleCard>
          <RuleCard label="Error messages — specific and actionable">
            Error messages must tell the user exactly what went wrong and how to fix it. &ldquo;Enter a valid email address&rdquo; is correct; &ldquo;Invalid input&rdquo; is not. Write in the active voice and avoid technical jargon.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
