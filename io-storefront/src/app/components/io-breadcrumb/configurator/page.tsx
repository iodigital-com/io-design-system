'use client';

import { breadcrumbStoryDefault } from '../io-breadcrumb.stories';

import { ComponentStory } from '@/components/playground/ComponentStory';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';

export default function IoBreadcrumbConfiguratorPage() {
  return (
    <div className="space-y-8">
      <ExamplesSectionHeader
        title="Declarative slot-based API"
        description="Place io-breadcrumb-item sub-components directly inside io-breadcrumb. Separators are inserted automatically."
      />
      <ComponentStory
        story={breadcrumbStoryDefault}
        previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
      />
    </div>
  );
}
