'use client';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';

export default function IoAlertExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader title="Variants" description="All four severity variants — info, success, warning, and error." />
        <div className="space-y-3">
          <io-alert variant="info">Your session expires in 5 minutes.</io-alert>
          <io-alert variant="success">Your changes have been saved successfully.</io-alert>
          <io-alert variant="warning">You are approaching your storage limit.</io-alert>
          <io-alert variant="error">Failed to submit the form. Please try again.</io-alert>
        </div>
      </section>

      <section>
        <ExamplesSectionHeader title="With heading" description="An optional bold heading rendered above the body copy." />
        <div className="space-y-3">
          <io-alert variant="info" heading="Session expiring">Your session will expire in 5 minutes. Save your work to avoid losing changes.</io-alert>
          <io-alert variant="success" heading="Payment confirmed">Your order has been placed and you will receive a confirmation email shortly.</io-alert>
          <io-alert variant="warning" heading="Storage limit reached">You have used 90% of your storage quota. Delete files or upgrade your plan.</io-alert>
          <io-alert variant="error" heading="Submission failed">We could not process your request. Check the highlighted fields and try again.</io-alert>
        </div>
      </section>

      <section>
        <ExamplesSectionHeader title="Dismissible" description="A dismiss button lets users remove the alert. Wire the dismiss event to hide it." />
        <div className="space-y-3">
          <io-alert variant="info" dismissible>This message can be dismissed by clicking the × button.</io-alert>
          <io-alert variant="warning" heading="Maintenance window" dismissible>Scheduled maintenance on Saturday 10:00–12:00 UTC. Services may be briefly interrupted.</io-alert>
        </div>
      </section>

      <section>
        <ExamplesSectionHeader title="Rich content" description="Slot supports any HTML — links, lists, and emphasis." />
        <io-alert variant="info" heading="Update available">
          A new version (2.1.0) is available.{' '}
          <a href="#" style={{ color: 'var(--io-color-primary)', textDecoration: 'underline' }}>
            Read the changelog
          </a>{' '}
          before upgrading.
        </io-alert>
      </section>

    </div>
  );
}
