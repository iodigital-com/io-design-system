'use client';

import { PageHeader } from '@/components/layout/PageHeader';

export default function DevelopingVuePage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Vue"
        description="Vue integration guide is planned and will be published in v1.1."
        tabs={[]}
      />

      <div className="rounded-lg p-5" style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}>
        <p className="font-semibold text-sm mb-2" style={{ color: 'var(--io-text-primary)' }}>
          Roadmap
        </p>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Planned for v1.1 (target: Q4 2026). This page will include Vue/Nuxt setup, component registration, and composition-friendly examples.
        </p>
      </div>
    </div>
  );
}
