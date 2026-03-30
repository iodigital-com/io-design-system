'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { RoadmapNote } from '@/components/developing/DevelopingPrimitives';

export default function DevelopingVuePage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Vue"
        description="Vue integration guide is planned and will be published in v1.1."
        tabs={[]}
      />

      <RoadmapNote>
        Planned for v1.1 (target: Q4 2026). This page will include Vue/Nuxt setup, component registration, and composition-friendly examples.
      </RoadmapNote>
    </div>
  );
}
