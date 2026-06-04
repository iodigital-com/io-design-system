'use client';

import { iconStoryAllIcons, iconStorySizes, iconStoryColour } from '../io-icon.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoIconExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader
          title="All icons"
          description="The full set of 32 registered icons rendered at size md. Each icon is labelled for screen reader identification."
        />
        <ComponentStory
          story={iconStoryAllIcons}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Size scale"
          description="The search icon at all five sizes: xs (12 px), sm (16 px), md (20 px), lg (24 px), xl (32 px)."
        />
        <ComponentStory
          story={iconStorySizes}
          previewClassName="flex flex-wrap gap-6 items-end"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Colour inheritance"
          description="io-icon uses currentColor for stroke. Set color on a parent element or via an inline style and the icon inherits it automatically. No prop required."
        />
        <ComponentStory
          story={iconStoryColour}
          previewClassName="flex flex-wrap gap-6 items-center"
        />
      </section>

    </div>
  );
}
