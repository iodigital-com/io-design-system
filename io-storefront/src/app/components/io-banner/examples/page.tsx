'use client';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';

export default function IoBannerExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader title="Variants" description="All four severity variants — info, success, warning, and error." />
        <div className="space-y-3">
          <io-banner variant="info" open>System update available. Refresh the page to apply the latest changes.</io-banner>
          <io-banner variant="success" open>Your account has been verified. You now have full access.</io-banner>
          <io-banner variant="warning" open>You are approaching your storage limit. Free up space or upgrade your plan.</io-banner>
          <io-banner variant="error" open>A critical error has occurred. Our team has been notified.</io-banner>
        </div>
      </section>

      <section>
        <ExamplesSectionHeader title="With heading" description="An optional bold heading rendered above the body copy." />
        <div className="space-y-3">
          <io-banner variant="info" open heading="Scheduled maintenance">Maintenance window on Saturday 10:00–12:00 UTC. Services may be briefly interrupted.</io-banner>
          <io-banner variant="success" open heading="Payment confirmed">Your order has been placed and you will receive a confirmation email shortly.</io-banner>
          <io-banner variant="warning" open heading="Session expiring">Your session expires in 5 minutes. Save your work to avoid losing changes.</io-banner>
          <io-banner variant="error" open heading="Service disruption">We are experiencing issues with the payment service. Please try again later.</io-banner>
        </div>
      </section>

      <section>
        <ExamplesSectionHeader title="Dismissible" description="A dismiss button lets users close the banner. Wire the dismiss event to handle teardown." />
        <div className="space-y-3">
          <io-banner variant="info" open dismissible>This feature is in beta. Your feedback helps us improve.</io-banner>
          <io-banner variant="warning" open heading="Maintenance window" dismissible>Scheduled maintenance on Saturday 10:00–12:00 UTC. Services may be briefly interrupted.</io-banner>
        </div>
      </section>

    </div>
  );
}
