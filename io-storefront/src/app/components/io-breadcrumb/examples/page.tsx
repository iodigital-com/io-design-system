'use client';

import { breadcrumbStoryDefault, breadcrumbStorySlash, breadcrumbStoryCollapsed } from '../io-breadcrumb.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoBreadcrumbExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader
          title="Chevron separator"
          description="Default breadcrumb with chevron separators between items."
        />
        <ComponentStory
          story={breadcrumbStoryDefault}
          previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Slash separator"
          description="Breadcrumb using slash (/) as the separator between items."
        />
        <ComponentStory
          story={breadcrumbStorySlash}
          previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Collapsed (maxVisible)"
          description="Long paths collapse middle items behind an expand button to save space."
        />
        <ComponentStory
          story={breadcrumbStoryCollapsed}
          previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
        />
      </section>
    </div>
  );
}
