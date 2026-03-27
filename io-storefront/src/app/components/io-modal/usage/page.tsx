'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoModalUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-modal is a modal dialog that temporarily interrupts the user's flow to require a response or display focused content. Use it sparingly — only when the interaction warrants blocking the rest of the interface."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for confirmation dialogs before destructive or irreversible actions — such as deleting a record, cancelling a subscription, or submitting a form with major consequences.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use for focused form interactions that are scoped to a single task — such as adding a team member, editing a record inline, or uploading a file — when a full page navigation would feel disproportionate.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use for detail views that provide supplementary context without requiring the user to leave their current location — such as a preview, a help explanation, or a terms summary.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the <C>footer</C> slot for primary actions (Confirm, Save, Submit) and a secondary ghost-variant button for dismissal (Cancel). Keep footer actions to two at most.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use a modal for simple informational alerts or status messages. Use a toast or inline notification instead — modals require user interaction and interrupt the flow unnecessarily.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use a modal as a page transition or primary navigation mechanism. If the user needs to move to a new context, navigate to a new page or route rather than opening a large modal.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Display persistent or reference information inside a modal. Content that users need to consult repeatedly — such as documentation, a data dictionary, or a legend — belongs on a persistent surface, not behind a dismiss action.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Open a modal on top of another modal. Stacked dialogs create a confusing navigation hierarchy and are difficult to dismiss correctly with keyboard or assistive technology.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Size selection ────────────────────────────────────────── */}
      <section id="size-selection" className="space-y-6">
        <SectionHeader
          title="Size selection"
          description="Choose the size that matches the density of the dialog content. Avoid the largest size unless the content genuinely requires the space."
        />
        <div className="space-y-3">
          <RuleCard label="sm — compact dialogs">
            Use for simple confirmation prompts with a short message and two action buttons. The small size keeps the interaction focused and reduces visual weight for low-stakes decisions.
          </RuleCard>
          <RuleCard label="md — general purpose (default)">
            The default size suits most use cases — form dialogs, detail views, and moderate amounts of body content. Start here and only change size if the content genuinely overflows or appears sparse.
          </RuleCard>
          <RuleCard label="lg — content-rich dialogs">
            Reserve the large size for complex forms, multi-step interactions, or rich content such as a data table or a document preview. Avoid using the large size for simple confirmations — it increases cognitive load disproportionately.
          </RuleCard>
        </div>
      </section>

      {/* ── Triggering and dismissal ──────────────────────────────── */}
      <section id="triggering-and-dismissal" className="space-y-6">
        <SectionHeader
          title="Triggering and dismissal"
          description="io-modal is controlled imperatively via show() and hide() method calls. There is no open attribute you set declaratively — call the methods to toggle visibility."
        />
        <div className="space-y-3">
          <RuleCard label="Always provide a close button in the footer">
            Every modal must include a way for the user to dismiss it without completing the primary action. Place a ghost-variant &ldquo;Cancel&rdquo; or &ldquo;Close&rdquo; button in the <C>footer</C> slot that calls <C>hide()</C>. Do not rely solely on backdrop clicks or the ESC key, as these may be disabled or unavailable.
          </RuleCard>
          <RuleCard label="Use closeOnBackdrop thoughtfully">
            <C>closeOnBackdrop</C> is enabled by default. Disable it only for critical dialogs where accidental dismissal would result in data loss — such as a multi-step form. When disabled, the close button in the footer becomes the only dismissal route, so it must always be present.
          </RuleCard>
          <RuleCard label="Return focus to the trigger element on close">
            When the modal closes, focus should return to the element that opened it — typically the button that called <C>show()</C>. Listen for the <C>ioClose</C> event and call <C>.focus()</C> on the trigger element reference to restore context for keyboard users.
          </RuleCard>
          <RuleCard label="Do not auto-dismiss dialogs">
            Never close a modal automatically after a timeout. Auto-dismissal disorients users who rely on screen readers and prevents keyboard users from completing their interaction. If you need a time-limited message, use a toast instead.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
