'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoToastUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ────────────────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-toast surfaces brief, non-blocking feedback in response to user-initiated actions or background events. It is best suited to situations where the user needs to know something happened but does not need to respond to it immediately."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for asynchronous action feedback — for example, confirming that a record was saved,
              a file was uploaded, or a deletion was completed.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use for background process completion — such as an export finishing or a scheduled
              task running successfully.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use for non-blocking status updates that the user should be aware of but does not need
              to act on — such as a sync completing or a connection restoring.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use for critical errors that require the user&rsquo;s acknowledgement before they can
              continue. These situations warrant a modal or an inline error message that stays
              visible until resolved.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use for form validation feedback. Inline <C>errorMessage</C> props on form fields
              keep validation messages co-located with the field they describe, which is far more
              useful than a toast that disappears.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use for alerts that must persist indefinitely. If the information is important enough
              to stay on screen, use an alert banner or an inline notification block, not a toast.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Do's & Don'ts ──────────────────────────────────────────────────── */}
      <section id="dos-and-donts" className="space-y-6">
        <SectionHeader
          title="Do&rsquo;s and don&rsquo;ts"
          description="Practical guidelines for writing effective toast notifications and choosing the right variant."
        />
        <div className="space-y-3">
          <RuleCard label="Keep message text concise">
            Toast messages should be one sentence or fewer. The notification is ephemeral — if the
            message requires multiple sentences to explain, it is too complex for a toast. Write for
            scanning, not reading: &ldquo;Settings saved.&rdquo; rather than &ldquo;Your changes
            have been saved successfully to the server.&rdquo;
          </RuleCard>
          <RuleCard label="Choose the variant that matches the outcome">
            Use <C>success</C> for completed positive actions, <C>error</C> for failures that the
            user should know about, <C>warning</C> for conditions that may need attention,{' '}
            <C>info</C> for neutral informational updates, and <C>neutral</C> when no semantic
            colour is appropriate. Do not use <C>success</C> for informational messages or{' '}
            <C>error</C> for warnings — mismatched variants erode user trust in the system.
          </RuleCard>
          <RuleCard label="Do not auto-dismiss error notifications">
            Set <C>duration={'{0}'}</C> for <C>error</C> variant toasts so that the user has
            time to read the message. A 6-second auto-dismiss window is too short for a user who
            has been interrupted or is reading slowly. Persistent error toasts include a close
            button so the user can dismiss them manually when ready.
          </RuleCard>
          <RuleCard label="Place one io-toast in the app shell">
            Render a single <C>&lt;io-toast&gt;</C> element at the root of your application,
            outside of any page or modal component. Placing multiple instances creates duplicate
            notifications and unpredictable positioning. All calls to <C>addToast()</C> on any
            reference to the singleton will route through the same queue.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
