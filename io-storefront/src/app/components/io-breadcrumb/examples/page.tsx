'use client';

import {
  breadcrumbStoryDefault,
  breadcrumbStoryGuillemet,
  breadcrumbStoryLong,
  breadcrumbStoryLabel,
  breadcrumbStoryTargetBlank,
} from '../io-breadcrumb.stories';

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
          description="Default separator is '/'. Override it with any character using the --io-breadcrumb-separator CSS custom property. This example uses the guillemet '›'."
        />
        <ComponentStory story={breadcrumbStoryGuillemet} />
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
          title="Localised label (i18n)"
          description="Override the default 'Breadcrumb' nav aria-label using the label prop for non-English UIs or when multiple breadcrumbs appear on the same page (WCAG 2.4.6)."
        />
        <ComponentStory story={breadcrumbStoryLabel} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="External link (target=&quot;_blank&quot;)"
          description="Set target='_blank' on io-breadcrumb-item to open in a new tab. rel='noopener noreferrer' is added automatically for security."
        />
        <ComponentStory story={breadcrumbStoryTargetBlank} />
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
          <io-breadcrumb label="مسار التنقل">
            <io-breadcrumb-item href="/">الرئيسية</io-breadcrumb-item>
            <io-breadcrumb-item href="/services">الخدمات</io-breadcrumb-item>
            <io-breadcrumb-item current>الاستراتيجية الرقمية</io-breadcrumb-item>
          </io-breadcrumb>
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--io-text-muted)' }}>
          dir=&quot;rtl&quot; · separator mirrored via scaleX(-1) · items flow right-to-left · label=&quot;مسار التنقل&quot;
        </p>
      </section>
    </div>
  );
}
