'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { RoadmapNote } from '@/components/developing/DevelopingPrimitives';

export default function DevelopingReactPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="React"
        description="React integration guide is planned and will be published in v1.1."
        tabs={[]}
      />

      <RoadmapNote>
        Planned for v1.1 (target: Q3 2026). This page will cover wrapper imports, typed props/events, and common usage patterns.
      </RoadmapNote>
    </div>
  );
}
