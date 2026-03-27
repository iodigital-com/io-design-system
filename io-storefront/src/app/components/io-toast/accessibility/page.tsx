'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoToastAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-toast does not steal keyboard focus when a notification appears. The close button inside each toast is reachable via Tab and dismissible with Enter or Space."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the close button inside the visible toast. Focus is not moved automatically when a toast appears — the user must Tab to it.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element in the document.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Dismisses the toast when focus is on the close button.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Dismisses the toast when focus is on the close button. This is native button behaviour.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-toast uses a live region to announce notifications without interrupting the user&rsquo;s current interaction. Status icons are decorative and convey no unique information beyond what the text already communicates."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  status
                </code>
              ),
              description: 'The toast container carries role="status", which is a live region with an implicit aria-live value of "polite". Screen readers announce new content when the user is idle rather than immediately interrupting.',
            },
            {
              attribute: 'aria-live',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  polite
                </code>
              ),
              description: 'Notifications are announced politely — the screen reader waits for the user to finish their current interaction before reading the toast message aloud.',
            },
            {
              attribute: 'aria-atomic',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  false
                </code>
              ),
              description: 'Only the changed content within the live region is announced, not the entire region. This ensures that only the new toast message is read, not the container or other elements.',
            },
            {
              attribute: 'aria-hidden (icon)',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  true
                </code>
              ),
              description: 'Variant icons (success checkmark, error cross, etc.) are hidden from the accessibility tree. The text content of the toast message carries the full meaning — icons are decorative reinforcement only.',
            },
            {
              attribute: 'aria-label (close button)',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Dismiss notification</span>
              ),
              description: 'The close button has an explicit aria-label of "Dismiss notification" because it contains only an icon with no visible text. This ensures screen reader users understand the button\'s purpose.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-toast is tested against WCAG 2.2 Level AA across all five variants."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Toast message text and variant labels maintain at least 4.5:1 contrast against the toast surface background across all five variants and in both light and dark contexts."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="The close button inside io-toast displays the double-ring focus pattern on keyboard focus. The focus ring meets WCAG 2.2 minimum area and contrast requirements."
          />
          <ComplianceCard
            criterion="4.1.3"
            level="AA"
            title="Status Messages"
            note="Toast notifications are conveyed to assistive technologies via role='status' and aria-live='polite', satisfying the requirement that status messages can be programmatically determined without receiving focus."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The close button carries an explicit aria-label. The live region container uses role='status'. All interactive elements have a programmatically determinable name and role."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible notification experiences with io-toast."
        />
        <RuleCard label="Use one io-toast per page (singleton)">
          Place a single <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&lt;io-toast&gt;</code>{' '}
          in the application shell. Multiple instances on the same page produce duplicate live regions, which causes screen readers to announce messages more than once and creates unpredictable stacking behaviour.
        </RuleCard>
        <RuleCard label="Keep message text concise — maximum two lines">
          Live region announcements are read aloud in full. Long messages are difficult to follow when spoken. Aim for one short sentence. If more context is needed, link to a detail page or show an inline notification instead.
        </RuleCard>
        <RuleCard label="Use the correct variant to communicate severity">
          Screen reader users hear only the text — they cannot see the colour or icon. Write text that communicates the severity without relying on the visual variant: &ldquo;Error: file upload failed.&rdquo; rather than just &ldquo;Upload failed.&rdquo;, so that the meaning is unambiguous without colour.
        </RuleCard>
        <RuleCard label="Do not auto-dismiss error messages">
          Set <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>duration={'{0}'}</code>{' '}
          on <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code>{' '}
          variant toasts. Users with cognitive disabilities, screen magnification, or slow reading speeds need more time to process error messages before they disappear.
        </RuleCard>
      </section>

    </div>
  );
}
