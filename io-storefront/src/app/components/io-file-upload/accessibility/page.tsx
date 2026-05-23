'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoFileUploadAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="The drop zone is a focusable button. Keyboard users can open the file picker and remove selected files without a mouse."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the drop zone. The focus ring becomes visible around the zone border.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Opens the native file picker dialog. Equivalent to clicking the drop zone.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Opens the native file picker dialog. Equivalent to clicking the drop zone.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Tab</Kbd><span style={{ color: 'var(--io-text-muted)' }}>(after file selected)</span></span>,
              action: 'Moves focus through the Remove buttons in the selected file list.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Enter</Kbd><span style={{ color: 'var(--io-text-muted)' }}> or </span><Kbd>Space</Kbd><span style={{ color: 'var(--io-text-muted)' }}>(on Remove)</span></span>,
              action: 'Removes the file from the selected list and announces via the live region.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="The drop zone uses role=button with aria-label. A polite live region announces file additions and removals."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role="button"',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>button</code>
                  {' '}(explicit)
                </span>
              ),
              description: 'The drop zone has an explicit role="button" so screen readers announce it as an interactive element regardless of the underlying element type.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>label prop value</span>
              ),
              description: 'The accessible name of the drop zone is derived from the label prop. It is the primary announcement for screen reader users navigating to the control.',
            },
            {
              attribute: 'aria-live="polite"',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>polite</code>
                </span>
              ),
              description: 'A visually-hidden live region announces when files are added (e.g. "report.pdf added.") or removed ("report.pdf removed.") without interrupting ongoing announcements.',
            },
            {
              attribute: 'aria-disabled',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}when disabled
                </span>
              ),
              description: 'Set to "true" when the disabled prop is true. The element remains in focus order but is announced as unavailable.',
            },
            {
              attribute: 'aria-invalid',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}when error
                </span>
              ),
              description: 'Set to "true" when the error prop is true. Combined with role="alert" on the error message, the error is announced immediately when it appears.',
            },
            {
              attribute: 'aria-label (Remove button)',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Remove [filename]</span>
              ),
              description: 'Each remove button has a unique accessible label based on the file name, allowing screen reader users to identify which file will be removed.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-file-upload is tested against WCAG 2.2 Level AA across all states."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The drop zone uses role=button with aria-label. Error messages are linked via aria-describedby. The file list is a <ul> with aria-label. All structure is conveyed through semantics, not visual formatting alone."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Zone label text and file names meet 4.5:1 contrast. The zone border meets the 3:1 non-text contrast requirement. Error state uses the io-color-error token which meets contrast requirements."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="The drop zone is reachable by Tab and activatable by Enter and Space. Remove buttons are focusable and operable from the keyboard. No mouse-only interactions exist."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focus is indicated by the io-focus-ring-active token applied as a box-shadow on both the drop zone and remove buttons. Meets minimum area and contrast requirements."
          />
          <ComplianceCard
            criterion="3.3.1"
            level="A"
            title="Error Identification"
            note="When error=true and errorMessage is set, the paragraph is rendered with role='alert'. The visual indicator (red border) is always paired with descriptive error text."
          />
          <ComplianceCard
            criterion="4.1.3"
            level="AA"
            title="Status Messages"
            note="File addition and removal are announced via a polite aria-live region. The messages are specific (filename + action) and do not interrupt the user's current activity."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible file upload experiences with io-file-upload."
        />
        <RuleCard label="Pair error with errorMessage — always">
          Setting <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code>{' '}
          without <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>{' '}
          shows a red visual with no text explanation. Screen reader users receive no feedback.
        </RuleCard>
        <RuleCard label="Use helperText to prevent rejection errors">
          Listing accepted formats and the size limit in <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>helperText</code>{' '}
          significantly reduces the number of fileReject events. Users know what is expected before they pick a file.
        </RuleCard>
        <RuleCard label="Handle fileReject events in your application">
          The component emits a <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>fileReject</code>{' '}
          event for each invalid file. Listen to this event and update the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code>{' '}
          and <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>{' '}
          props with a contextual message so users understand what went wrong.
        </RuleCard>
        <RuleCard label="Don't disable without explanation">
          If uploading is temporarily unavailable, communicate why with surrounding content. A silently disabled control leaves users confused about whether the feature is broken or restricted.
        </RuleCard>
      </section>

    </div>
  );
}
