'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoBannerUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Use io-banner for page-level messages that need to interrupt the user at the top of the viewport."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for system-wide messages like maintenance windows, service disruptions, or feature announcements.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use for global feedback after a user action, such as &ldquo;Your changes have been saved.&rdquo;
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>dismissible</C> when the message is informational and the user can safely dismiss it.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use io-banner for inline form validation errors. Use <C>io-inline-notification</C> instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use for transient feedback that should auto-dismiss. Use <C>io-toast</C> instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Show more than one banner at a time — multiple fixed overlays compete for attention and obscure page content.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="open-prop" className="space-y-6">
        <SectionHeader
          title="Controlling visibility with open"
          description="io-banner is hidden by default. Set open=true to show it — it slides in from above the viewport with an entry animation."
        />
        <RuleCard label="Use open, not unmount">
          The <C>open</C> prop drives visibility. The banner remains mounted in the DOM when closed, so the live region is ready to announce as soon as content is injected.
          Toggle <C>open</C> from your application state — do not unmount the element to hide it.
        </RuleCard>
        <pre className="bg-surface rounded p-4 text-sm overflow-x-auto"><code>{`<!-- Show the banner on a trigger click -->
<io-banner variant="info" open={isOpen} dismissible onDismiss={() => setIsOpen(false)}>
  Scheduled maintenance on Saturday.
</io-banner>

<button onClick={() => setIsOpen(true)}>Show banner</button>`}</code></pre>
      </section>

      <section id="choosing" className="space-y-6">
        <SectionHeader
          title="Banner vs Inline Notification vs Toast"
          description="Choose the right component for your notification context."
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-semibold">Criterion</th>
                <th className="text-left py-2 pr-4 font-semibold">io-banner</th>
                <th className="text-left py-2 pr-4 font-semibold">io-inline-notification</th>
                <th className="text-left py-2 font-semibold">io-toast</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 pr-4 font-medium">Scope</td>
                <td className="py-2 pr-4">Page-level</td>
                <td className="py-2 pr-4">Content-level</td>
                <td className="py-2">Application-level</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Position</td>
                <td className="py-2 pr-4">Fixed overlay, top of viewport</td>
                <td className="py-2 pr-4">In document flow, bounded</td>
                <td className="py-2">Fixed overlay (edge of screen)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Persistence</td>
                <td className="py-2 pr-4">Persistent until dismissed</td>
                <td className="py-2 pr-4">Persistent until dismissed</td>
                <td className="py-2">Auto-dismisses</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Visibility control</td>
                <td className="py-2 pr-4"><C>open</C> prop</td>
                <td className="py-2 pr-4">Mount/unmount</td>
                <td className="py-2">Imperative API</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Best for</td>
                <td className="py-2 pr-4">Maintenance notices, system alerts</td>
                <td className="py-2 pr-4">Form errors, inline feedback</td>
                <td className="py-2">Action confirmations</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
