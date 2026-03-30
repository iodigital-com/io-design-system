'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { RoadmapNote } from '@/components/developing/DevelopingPrimitives';

export default function DevelopingAngularPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Angular"
        description="Angular integration guide is planned and will be published in v1.1."
        tabs={[]}
      />

      <RoadmapNote>
        Planned for v1.1 (target: Q4 2026). This page will document Angular wrapper setup, standalone imports, and template usage.
      </RoadmapNote>
    </div>
  );
}
