'use client';

import { AriaTable, ComplianceCard, RuleCard, SectionHeader } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoScrollerAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-scroller is focusable when the keyboard is the active input modality. Keyboard users can navigate into the scroll region and scroll its content with standard keys."
        />
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: '1px solid var(--io-border)' }}
        >
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--io-bg-raised)' }}>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--io-text-primary)', width: '180px', borderBottom: '1px solid var(--io-border)' }}>
                  Key
                </th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--io-text-primary)', borderBottom: '1px solid var(--io-border)' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: 'Tab', action: 'Moves focus to the scroll region (when keyboard is the active input modality).' },
                { key: 'ArrowLeft / ArrowRight', action: 'Scrolls horizontally when the scroll region has focus.' },
                { key: 'ArrowUp / ArrowDown', action: 'Scrolls vertically when the scroll region has focus.' },
                { key: 'Home', action: 'Scrolls to the start of the region.' },
                { key: 'End', action: 'Scrolls to the end of the region.' },
              ].map(({ key, action }) => (
                <tr key={key} style={{ borderBottom: '1px solid var(--io-border)' }}>
                  <td className="px-4 py-3" style={{ color: 'var(--io-text-primary)' }}>
                    <code
                      className="text-xs font-mono px-1.5 py-0.5 rounded"
                      style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}
                    >
                      {key}
                    </code>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--io-text-secondary)' }}>
                    {action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-scroller uses role=&quot;region&quot; with an aria-label to create a named landmark. Screen readers announce the region when users navigate by landmark."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>region</code>
                </span>
              ),
              description: 'The inner scroll container carries role="region". This creates a named landmark that screen reader users can navigate to directly using landmark navigation.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>From label prop (or generic fallback)</span>
              ),
              description: 'Set to the value of the label prop, or a generic fallback ("Scrollable horizontal/vertical region"). Provides context for landmark navigation. Always override with a meaningful value.',
            },
            {
              attribute: 'tabindex',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>0</code>
                </span>
              ),
              description: 'The scroll container is focusable (tabindex="0") so keyboard users can focus it and scroll using arrow keys. The tab stop follows input modality — it only becomes visible when the keyboard is the active input.',
            },
            {
              attribute: 'aria-hidden',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>true</code>{' '}
                  (on sentinel divs)
                </span>
              ),
              description: 'The internal sentinel elements used for IntersectionObserver edge detection are aria-hidden="true" so they are not announced by screen readers.',
            },
          ]}
        />
      </section>

      {/* ── Label guidance ───────────────────────────────────────── */}
      <section id="label-guidance" className="space-y-6">
        <SectionHeader
          title="Label guidance"
          description="The label prop is the primary mechanism for giving screen reader users context about the scroll region."
        />
        <div className="space-y-3">
          <RuleCard label="Always provide a meaningful label">
            The fallback label &quot;Scrollable horizontal region&quot; is generic and provides no context. Replace it with a description that reflects the purpose of the content — e.g.{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>Navigation tabs</code>,{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>Category filters</code>, or{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>Image gallery</code>.
          </RuleCard>
          <RuleCard label="role=&quot;region&quot; requires a label to create a valid landmark">
            Without an accessible name, <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;region&quot;</code>{' '}
            is not announced as a landmark by most screen readers (ARIA spec requirement). The component provides a fallback label, but always override it with a meaningful one.
          </RuleCard>
        </div>
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-scroller is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The scroll container carries role='region' with aria-label. The accessible name is always present — either from the label prop or the fallback generic description."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="The scroll region is keyboard focusable (tabindex='0'). Users can scroll with arrow keys, Home, and End. All interactive content inside the scroller remains keyboard accessible."
          />
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The scroll region is conveyed as a named landmark via role='region'. Gradient fades are purely decorative and do not communicate information that is absent from the DOM structure."
          />
          <ComplianceCard
            criterion="2.4.3"
            level="A"
            title="Focus Order"
            note="The scroller participates in the natural document tab order. Focus moves into the scroll region before reaching the items inside, giving keyboard users an explicit entry point to scroll."
          />
          <ComplianceCard
            criterion="2.2.2"
            level="A"
            title="Pause, Stop, Hide"
            note="Smooth scroll behaviour respects prefers-reduced-motion. When the OS reduced-motion preference is active, scroll-behavior is set to auto so there is no animated scroll movement."
          />
        </div>
      </section>

    </div>
  );
}
