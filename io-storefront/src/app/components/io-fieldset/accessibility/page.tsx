'use client';

import { SectionHeader, RuleCard, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoFieldsetAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Screen reader behaviour ──────────────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-fieldset exposes a native fieldset/legend pair. Screen readers announce the legend text as the group name before each child control."
        />
        <AriaTable
          rows={[
            {
              attribute: 'fieldset element',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  Always present
                </span>
              ),
              description:
                'The native <fieldset> element carries an implicit group role. Screen readers typically prefix each child control\'s name with the legend text, providing context for every interaction.',
            },
            {
              attribute: 'legend element',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  Always present — driven by the label prop
                </span>
              ),
              description:
                'The <legend> provides the accessible name for the group. It is the first child of the fieldset so browser/AT association is automatic — no aria-labelledby required.',
            },
            {
              attribute: 'aria-describedby',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  Set when error=true AND errorMessage is non-empty
                </span>
              ),
              description:
                'Links the fieldset to the error message paragraph so AT announces the error text after the group description. Not set when errorMessage is empty — avoids a dangling reference.',
            },
            {
              attribute: 'role="alert" on error paragraph',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  When error=true and errorMessage is non-empty
                </span>
              ),
              description:
                'Ensures dynamic error messages are announced by screen readers without requiring the user to navigate to them. The alert role triggers an immediate announcement when the element appears.',
            },
            {
              attribute: 'aria prop (passthrough)',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  Consumer-controlled
                </span>
              ),
              description:
                'Allows overriding the ARIA role (e.g. role="radiogroup") or adding aria-labelledby when an external heading labels the group. Keys without the aria- prefix are normalised automatically.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-fieldset is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The native fieldset/legend pair communicates the group relationship to AT programmatically — no additional ARIA needed for the basic use case."
          />
          <ComplianceCard
            criterion="1.4.1"
            level="A"
            title="Use of Colour"
            note="Error state changes both border-color AND border-width (--io-fieldset-border-error-width: 2px) so colour is not the only error indicator."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Legend text uses --io-fieldset-legend-color (--io-color-neutral-900, near-black), which meets 4.5:1 text contrast against white backgrounds. Error color uses --io-color-error, which meets the 4.5:1 threshold."
          />
          <ComplianceCard
            criterion="3.3.1"
            level="A"
            title="Error Identification"
            note="When error=true and errorMessage is provided, the error is rendered as a visible paragraph with role=alert and linked via aria-describedby. The error message identifies the group-level problem in text."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The group role comes from the native fieldset element. The aria prop allows overriding to radiogroup or group as needed. The legend provides the accessible name."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for accessible use of io-fieldset."
        />
        <RuleCard label="Always provide a meaningful label">
          The{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code>{' '}
          prop is the accessible name for the entire group. Screen readers announce it before each child. An empty or missing label leaves the group nameless.
        </RuleCard>
        <RuleCard label="Propagate required to each child individually">
          io-fieldset does not propagate{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>required</code>{' '}
          to slotted children — the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>required</code>{' '}
          prop only shows the visual indicator. Add{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>required</code>{' '}
          to each child control directly so AT announces the constraint correctly.
        </RuleCard>
        <RuleCard label="Use errorMessage to describe group-level validation failures">
          When a group fails validation as a whole (e.g. &quot;At least one option is required&quot;), pair{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code>{' '}
          with a descriptive{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>.
          The message is announced live via <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;alert&quot;</code>.
        </RuleCard>
      </section>

    </div>
  );
}
