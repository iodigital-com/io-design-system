'use client';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';

export default function IoInlineBannerExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader title="Variants" description="All four severity variants — info, success, warning, and error." />
        <div className="space-y-3">
          <io-inline-banner variant="info">Your session expires in 5 minutes. Save your work to avoid losing changes.</io-inline-banner>
          <io-inline-banner variant="success">Your changes have been saved successfully.</io-inline-banner>
          <io-inline-banner variant="warning">You have used 90% of your storage quota. Delete files or upgrade your plan.</io-inline-banner>
          <io-inline-banner variant="error">Failed to submit the form. Check the highlighted fields and try again.</io-inline-banner>
        </div>
      </section>

      <section>
        <ExamplesSectionHeader title="With heading" description="An optional bold heading rendered above the body copy." />
        <div className="space-y-3">
          <io-inline-banner variant="info" heading="Session expiring">Your session will expire in 5 minutes. Save your work to avoid losing changes.</io-inline-banner>
          <io-inline-banner variant="success" heading="Payment confirmed">Your order has been placed and you will receive a confirmation email shortly.</io-inline-banner>
          <io-inline-banner variant="warning" heading="Storage limit reached">You have used 90% of your storage quota. Delete files or upgrade your plan.</io-inline-banner>
          <io-inline-banner variant="error" heading="Submission failed">We could not process your request. Check the highlighted fields and try again.</io-inline-banner>
        </div>
      </section>

      <section>
        <ExamplesSectionHeader title="Dismissible" description="A dismiss button lets users remove the notification. Wire the dismiss event to unmount the element." />
        <div className="space-y-3">
          <io-inline-banner variant="info" dismissible>This message can be dismissed by clicking the × button.</io-inline-banner>
          <io-inline-banner variant="warning" heading="Maintenance window" dismissible>Scheduled maintenance on Saturday 10:00–12:00 UTC. Services may be briefly interrupted.</io-inline-banner>
        </div>
      </section>

      <section>
        <ExamplesSectionHeader title="Rich content" description="The default slot supports any HTML — links, lists, and emphasis." />
        <io-inline-banner variant="info" heading="Update available">
          A new version is available.{' '}
          <a href="#" style={{ color: 'var(--io-color-primary)', textDecoration: 'underline' }}>
            Read the changelog
          </a>{' '}
          before upgrading.
        </io-inline-banner>
      </section>

    </div>
  );
}
