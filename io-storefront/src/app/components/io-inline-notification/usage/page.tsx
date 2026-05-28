'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoInlineNotificationUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Use io-inline-notification for contextual messages that relate to a specific section of content."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for form-level validation messages, such as &ldquo;Please fix the errors below before submitting.&rdquo;
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use for section-specific feedback within cards, panels, or wizard steps.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>dismissible</C> when the user can safely acknowledge and remove the message.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use io-inline-notification for page-wide announcements. Use <C>io-banner</C> instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use for transient action confirmations. Use <C>io-toast</C> instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use for individual field-level errors. Use the field&apos;s error message pattern instead.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="visibility" className="space-y-6">
        <SectionHeader
          title="Controlling visibility"
          description="io-inline-notification has no open prop — the consumer controls visibility by mounting or unmounting the element."
        />
        <RuleCard label="Mount to show, unmount to hide">
          Unlike <C>io-banner</C>, the inline notification has no <C>open</C> prop. Conditionally render it from
          your framework&apos;s template. When the user dismisses it (via the <C>dismiss</C> event), remove it from the DOM.
        </RuleCard>
        <pre className="bg-surface rounded p-4 text-sm overflow-x-auto"><code>{`<!-- Show when condition is true -->
{showError && (
  <io-inline-notification
    variant="error"
    heading="Submission failed"
    dismissible
    onDismiss={() => setShowError(false)}
  >
    Check the highlighted fields and try again.
  </io-inline-notification>
)}`}</code></pre>
      </section>

      <section id="choosing" className="space-y-6">
        <SectionHeader
          title="Inline Notification vs Banner vs Toast"
          description="Choose the right component for your notification context."
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-semibold">Criterion</th>
                <th className="text-left py-2 pr-4 font-semibold">io-inline-notification</th>
                <th className="text-left py-2 pr-4 font-semibold">io-banner</th>
                <th className="text-left py-2 font-semibold">io-toast</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 pr-4 font-medium">Scope</td>
                <td className="py-2 pr-4">Content-level</td>
                <td className="py-2 pr-4">Page-level</td>
                <td className="py-2">Application-level</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Position</td>
                <td className="py-2 pr-4">In document flow, bounded</td>
                <td className="py-2 pr-4">Fixed overlay, top of viewport</td>
                <td className="py-2">Fixed overlay</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Visibility control</td>
                <td className="py-2 pr-4">Mount/unmount</td>
                <td className="py-2 pr-4"><C>open</C> prop</td>
                <td className="py-2">Imperative API</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Best for</td>
                <td className="py-2 pr-4">Form errors, inline feedback</td>
                <td className="py-2 pr-4">Maintenance notices, alerts</td>
                <td className="py-2">Action confirmations</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
