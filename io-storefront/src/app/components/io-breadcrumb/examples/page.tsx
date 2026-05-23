'use client';

import { breadcrumbStoryDefault, breadcrumbStorySlash, breadcrumbStoryLong } from '../io-breadcrumb.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoBreadcrumbExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader
          title="Basic breadcrumb"
          description="Three items: two links and a current page item. Separators are inserted automatically by io-breadcrumb."
        />
        <ComponentStory
          story={breadcrumbStoryDefault}
          previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Custom separator via CSS"
          description="Override the separator character using --io-breadcrumb-separator CSS custom property."
        />
        <ComponentStory
          story={breadcrumbStorySlash}
          previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Deep hierarchy"
          description="Five items showing a deeper navigation path. The last item is automatically marked as the current page."
        />
        <ComponentStory
          story={breadcrumbStoryLong}
          previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
        />
      </section>
    </div>
  );
}
