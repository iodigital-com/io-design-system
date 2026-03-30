'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { RoadmapNote } from '@/components/developing/DevelopingPrimitives';

export default function DevelopingNextJsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Next.js"
        description="Next.js integration guide is planned and will be published in v1.1."
        tabs={[]}
      />

      <RoadmapNote>
        Planned for v1.1 (target: Q3 2026). This page will include setup for App Router, server/client rendering notes, and wrapper usage.
      </RoadmapNote>
    </div>
  );
}
