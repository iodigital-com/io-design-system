'use client';

import { useState } from 'react';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';

export default function IoBannerExamplesPage() {
  const [variantOpen, setVariantOpen] = useState<string | null>(null);
  const [headingOpen, setHeadingOpen] = useState<string | null>(null);
  const [dismissibleOpen, setDismissibleOpen] = useState<string | null>(null);

  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader title="Variants" description="Click a button to show the fixed overlay banner for each severity variant." />
        <div className="flex flex-wrap gap-3">
          {(['info', 'success', 'warning', 'error'] as const).map((variant) => (
            <button
              key={variant}
              type="button"
              className="px-4 py-2 rounded border text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ borderColor: 'var(--io-border)', background: 'var(--io-bg-card)' }}
              onClick={() => setVariantOpen(variant)}
            >
              Show {variant} banner
            </button>
          ))}
        </div>
        {(['info', 'success', 'warning', 'error'] as const).map((variant) => (
          <io-banner
            key={variant}
            variant={variant}
            open={variantOpen === variant || undefined}
            dismissible
            onDismiss={() => setVariantOpen(null)}
          >
            {variant === 'info' && 'System update available. Refresh the page to apply the latest changes.'}
            {variant === 'success' && 'Your account has been verified. You now have full access.'}
            {variant === 'warning' && 'You are approaching your storage limit. Free up space or upgrade your plan.'}
            {variant === 'error' && 'A critical error has occurred. Our team has been notified.'}
          </io-banner>
        ))}
      </section>

      <section>
        <ExamplesSectionHeader title="With heading" description="An optional bold heading rendered above the body copy. Click a button to preview." />
        <div className="flex flex-wrap gap-3">
          {(['info', 'success', 'warning', 'error'] as const).map((variant) => (
            <button
              key={variant}
              type="button"
              className="px-4 py-2 rounded border text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ borderColor: 'var(--io-border)', background: 'var(--io-bg-card)' }}
              onClick={() => setHeadingOpen(variant)}
            >
              Show {variant} with heading
            </button>
          ))}
        </div>
        {headingOpen === 'info' && (
          <io-banner variant="info" open heading="Scheduled maintenance" dismissible onDismiss={() => setHeadingOpen(null)}>
            Maintenance window on Saturday 10:00–12:00 UTC. Services may be briefly interrupted.
          </io-banner>
        )}
        {headingOpen === 'success' && (
          <io-banner variant="success" open heading="Payment confirmed" dismissible onDismiss={() => setHeadingOpen(null)}>
            Your order has been placed and you will receive a confirmation email shortly.
          </io-banner>
        )}
        {headingOpen === 'warning' && (
          <io-banner variant="warning" open heading="Session expiring" dismissible onDismiss={() => setHeadingOpen(null)}>
            Your session expires in 5 minutes. Save your work to avoid losing changes.
          </io-banner>
        )}
        {headingOpen === 'error' && (
          <io-banner variant="error" open heading="Service disruption" dismissible onDismiss={() => setHeadingOpen(null)}>
            We are experiencing issues with the payment service. Please try again later.
          </io-banner>
        )}
      </section>

      <section>
        <ExamplesSectionHeader title="Dismissible" description="A dismiss button lets users close the banner. Wire the dismiss event to set open=false." />
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded border text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ borderColor: 'var(--io-border)', background: 'var(--io-bg-card)' }}
            onClick={() => setDismissibleOpen('info')}
          >
            Show dismissible info banner
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded border text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ borderColor: 'var(--io-border)', background: 'var(--io-bg-card)' }}
            onClick={() => setDismissibleOpen('warning')}
          >
            Show dismissible warning banner
          </button>
        </div>
        <io-banner
          variant="info"
          open={dismissibleOpen === 'info' || undefined}
          dismissible
          onDismiss={() => setDismissibleOpen(null)}
        >
          This feature is in beta. Your feedback helps us improve.
        </io-banner>
        <io-banner
          variant="warning"
          open={dismissibleOpen === 'warning' || undefined}
          heading="Maintenance window"
          dismissible
          onDismiss={() => setDismissibleOpen(null)}
        >
          Scheduled maintenance on Saturday 10:00–12:00 UTC. Services may be briefly interrupted.
        </io-banner>
      </section>

    </div>
  );
}
