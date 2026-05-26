'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoAlertUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Alerts communicate system-level feedback inline with page content. Choose the right variant by matching the severity of the message to the user's mental model."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use <C>info</C> for neutral system updates — session expiry warnings, maintenance notices, or informational banners that don&apos;t require immediate action.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>success</C> after a user completes an action — form submission, payment confirmation, or file upload — to confirm the outcome.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>warning</C> when the user can still proceed but should be aware of a risk — storage limits, expiring subscriptions, or deprecated features.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>error</C> only for actual failures that need user action — validation errors, API failures, or permission issues that block the current task.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use alerts for time-limited feedback after a user action — use <C>io-toast</C> instead. Alerts are persistent inline messages; toasts are transient notifications.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use <C>error</C> for warnings or informational messages. The red colour and assertive live region send a strong signal — reserve it for genuine failures.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Stack more than 2 alerts at once. Multiple concurrent alerts overwhelm users. Consolidate messages or use a priority queue.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Put actionable buttons inside the alert body unless they directly resolve the alert&apos;s message. One exception: a &ldquo;Retry&rdquo; button inside an error alert is appropriate.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="variants" className="space-y-6">
        <SectionHeader
          title="Choosing a variant"
          description="Match the variant to the user's expected emotional response, not just the technical severity."
        />
        <div className="space-y-3">
          <RuleCard label="info — Neutral information">
            Use for contextual guidance, feature announcements, or non-critical system notices. The blue colour
            is calm and informational — it draws attention without creating urgency.
          </RuleCard>
          <RuleCard label="success — Positive confirmation">
            Confirm that a user-initiated action completed successfully. Keep the message short —
            the user already knows what they did; confirm that it worked.
          </RuleCard>
          <RuleCard label="warning — Caution required">
            Signal a potential risk without blocking the user. Always explain what might happen
            and offer a path forward: &ldquo;You have 10% storage remaining. <a href="#">Upgrade your plan</a>.&rdquo;
          </RuleCard>
          <RuleCard label="error — Action required">
            Reserve for failures that prevent the user from completing their goal. Be specific: name
            the field, the step, or the resource that failed. Never say &ldquo;An error occurred&rdquo; with no further detail.
          </RuleCard>
        </div>
      </section>

      <section id="dismissible" className="space-y-6">
        <SectionHeader
          title="Dismissible alerts"
          description="The dismissible prop adds a close button. Wire the dismiss event to remove the element from the DOM."
        />
        <RuleCard label="When to make an alert dismissible">
          Make an alert dismissible when the information is supplementary and users may want to clear it to
          reduce visual noise. Do not make error alerts dismissible — the user should resolve the error, not hide it.
        </RuleCard>
        <RuleCard label="Dismiss event handling">
          The alert emits a <C>dismiss</C> event when the × button is clicked. Your application must listen for
          this event and remove or hide the alert element — the component does not hide itself automatically.
        </RuleCard>
      </section>

      <section id="io-alert-vs-io-toast" className="space-y-6">
        <SectionHeader
          title="io-alert vs io-toast"
          description="Both communicate feedback, but they serve different moments in the user journey."
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--io-border)' }}>
                <th className="text-left py-2 pr-4" style={{ color: 'var(--io-text-secondary)' }}>Aspect</th>
                <th className="text-left py-2 pr-4" style={{ color: 'var(--io-text-primary)' }}>io-alert</th>
                <th className="text-left py-2" style={{ color: 'var(--io-text-primary)' }}>io-toast</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Position', 'Inline with page content', 'Fixed overlay (top-right)'],
                ['Persistence', 'Persistent until dismissed or resolved', 'Auto-dismisses after a timeout'],
                ['Trigger', 'Page load, system state, or conditional logic', 'Immediate response to a user action'],
                ['Use case', 'Form errors, maintenance banners, status notices', 'Save confirmed, copy successful, invite sent'],
              ].map(([aspect, alert, toast]) => (
                <tr key={aspect} style={{ borderBottom: '1px solid var(--io-border)' }}>
                  <td className="py-2 pr-4 font-medium" style={{ color: 'var(--io-text-secondary)' }}>{aspect}</td>
                  <td className="py-2 pr-4" style={{ color: 'var(--io-text-primary)' }}>{alert}</td>
                  <td className="py-2" style={{ color: 'var(--io-text-primary)' }}>{toast}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
