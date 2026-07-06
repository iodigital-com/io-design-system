'use client';

import {
  avatarStoryImage,
  avatarStoryInitials,
  avatarStoryIcon,
  avatarStorySizes,
  avatarStoryShapes,
} from '../io-avatar.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoAvatarExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader
          title="Image avatar"
          description="When a valid src is provided the avatar renders an img element."
        />
        <ComponentStory story={avatarStoryImage} previewClassName="flex flex-wrap gap-4 items-center" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Initials — all colour variants"
          description="When no image is available and a name is set, two-letter initials are displayed on a coloured background."
        />
        <ComponentStory story={avatarStoryInitials} previewClassName="flex flex-wrap gap-3 items-center" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Icon fallback"
          description="When neither src nor name is provided a generic person icon is shown."
        />
        <ComponentStory story={avatarStoryIcon} previewClassName="flex flex-wrap gap-4 items-center" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Sizes"
          description="Five sizes from xs (24 px) to xl (64 px)."
        />
        <ComponentStory story={avatarStorySizes} previewClassName="flex flex-wrap gap-4 items-center" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Shapes"
          description="Circle (default) and square avatars side by side."
        />
        <ComponentStory story={avatarStoryShapes} previewClassName="flex flex-wrap gap-4 items-center" />
      </section>

    </div>
  );
}
