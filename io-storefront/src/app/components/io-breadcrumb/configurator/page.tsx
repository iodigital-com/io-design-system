'use client';

import { breadcrumbStoryDefault } from '../io-breadcrumb.stories';

import { ComponentStory } from '@/components/playground/ComponentStory';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';

export default function IoBreadcrumbConfiguratorPage() {
  return (
    <div className="space-y-8">
      <ExamplesSectionHeader
        title="Breadcrumb"
        description="Place io-breadcrumb-item sub-components directly inside io-breadcrumb. Separators are rendered automatically between items."
      />
      <ComponentStory story={breadcrumbStoryDefault} />
    </div>
  );
}
