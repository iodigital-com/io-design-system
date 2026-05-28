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
          description="Three items: two links and a current page item. Separators are rendered automatically between items."
        />
        <ComponentStory story={breadcrumbStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Custom separator via CSS"
          description="Override the separator character using --io-breadcrumb-separator CSS custom property."
        />
        <ComponentStory story={breadcrumbStorySlash} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Deep hierarchy"
          description="Five items showing a deeper navigation path. The last item is automatically marked as the current page."
        />
        <ComponentStory story={breadcrumbStoryLong} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="RTL layout"
          description="In a right-to-left context the separator is mirrored and items flow right-to-left. Wrap the page or section with dir=&quot;rtl&quot; to activate."
        />
        <div
          dir="rtl"
          className="p-4 sm:p-8 rounded-lg border border-[var(--io-border)]"
          style={{ backgroundColor: 'var(--io-bg-raised)' }}
        >
          <io-breadcrumb>
            <io-breadcrumb-item href="/">الرئيسية</io-breadcrumb-item>
            <io-breadcrumb-item href="/services">الخدمات</io-breadcrumb-item>
            <io-breadcrumb-item current>الاستراتيجية الرقمية</io-breadcrumb-item>
          </io-breadcrumb>
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--io-text-muted)' }}>
          dir=&quot;rtl&quot; · separator mirrored via scaleX(-1) · items flow right-to-left
        </p>
      </section>
    </div>
  );
}
