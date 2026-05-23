'use client';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

const storyBasic = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-breadcrumb' as const,
      properties: {},
      children: [
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/' }, children: ['Home'] },
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/services' }, children: ['Services'] },
        { tag: 'io-breadcrumb-item' as const, properties: { current: true }, children: ['Digital Strategy'] },
      ],
    },
  ],
};

const storyLinkOnly = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-breadcrumb' as const,
      properties: {},
      children: [
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/' }, children: ['Home'] },
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/docs' }, children: ['Documentation'] },
        { tag: 'io-breadcrumb-item' as const, properties: {}, children: ['Getting Started'] },
      ],
    },
  ],
};

const storySingle = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-breadcrumb' as const,
      properties: {},
      children: [
        { tag: 'io-breadcrumb-item' as const, properties: { current: true }, children: ['Dashboard'] },
      ],
    },
  ],
};

export default function IoBreadcrumbItemExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader
          title="Basic breadcrumb"
          description="Three items: two links and a current page item. The parent io-breadcrumb inserts separators automatically."
        />
        <ComponentStory
          story={storyBasic}
          previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Inferred current page"
          description="When no item has current set, io-breadcrumb automatically marks the last item as the current page."
        />
        <ComponentStory
          story={storyLinkOnly}
          previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Single item"
          description="A single item renders without separators and with aria-current='page'."
        />
        <ComponentStory
          story={storySingle}
          previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
        />
      </section>
    </div>
  );
}
