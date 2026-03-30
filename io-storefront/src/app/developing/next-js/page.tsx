'use client';

import { PageHeader } from '@/components/layout/PageHeader';

export default function DevelopingNextJsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Next.js"
        description="Next.js integration guide is planned and will be published in v1.1."
        tabs={[]}
      />

      <div className="rounded-lg p-5" style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}>
        <p className="font-semibold text-sm mb-2" style={{ color: 'var(--io-text-primary)' }}>
          Roadmap
        </p>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Planned for v1.1 (target: Q3 2026). This page will include setup for App Router, server/client rendering notes, and wrapper usage.
        </p>
      </div>
    </div>
  );
}
