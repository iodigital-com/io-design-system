import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const avatarStory: Story<'io-avatar'> = {
  state: {
    properties: {
      size: 'md',
      color: 'grey',
      shape: 'circle',
      alt: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-avatar' as const,
      properties: properties ?? {},
    },
  ],
};

/** Story: image avatar */
export const avatarStoryImage: Story<'io-avatar'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-avatar' as const,
      properties: {
        src: 'https://i.pravatar.cc/150?img=3',
        alt: 'Jane Doe',
        size: 'md',
        shape: 'circle',
      },
    },
  ],
};

/** Story: initials avatars — one per colour */
export const avatarStoryInitials: Story<'io-avatar'> = {
  state: { properties: {} },
  generator: () =>
    (['blue', 'orange', 'green', 'purple', 'grey'] as const).map((color) => ({
      tag: 'io-avatar' as const,
      properties: { name: 'Jane Doe', color, size: 'md', shape: 'circle' },
    })),
};

/** Story: icon fallback (no src, no name) */
export const avatarStoryIcon: Story<'io-avatar'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-avatar' as const,
      properties: { size: 'md', shape: 'circle', color: 'grey' },
    },
  ],
};

/** Story: all five sizes */
export const avatarStorySizes: Story<'io-avatar'> = {
  state: { properties: {} },
  generator: () =>
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => ({
      tag: 'io-avatar' as const,
      properties: { name: 'Jane Doe', color: 'blue', size, shape: 'circle' },
    })),
};

/** Story: circle vs square shape */
export const avatarStoryShapes: Story<'io-avatar'> = {
  state: { properties: {} },
  generator: () => [
    { tag: 'io-avatar' as const, properties: { name: 'Jane Doe', color: 'blue', size: 'md', shape: 'circle' } },
    { tag: 'io-avatar' as const, properties: { name: 'Jane Doe', color: 'blue', size: 'md', shape: 'square' } },
  ],
};

/** Story: decorative avatar (role="presentation" — AT skips it) */
export const avatarStoryDecorative: Story<'io-avatar'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-avatar' as const,
      properties: { src: 'https://i.pravatar.cc/150?img=5', alt: '', role: 'presentation', size: 'md' },
    },
  ],
};

export const avatarPropDefinitions: PropDefinition[] = [
  {
    name: 'src',
    type: 'string',
    defaultValue: '',
    description: 'Image URL. When loading fails the component falls back to initials or the person icon.',
  },
  {
    name: 'alt',
    type: 'string',
    defaultValue: '',
    description: 'Accessible alt text for the image. Pass an empty string for decorative avatars.',
  },
  {
    name: 'name',
    type: 'string',
    defaultValue: '',
    description: 'Full name used to derive initials ("Jane Doe" → "JD").',
  },
  {
    name: 'size',
    type: 'select',
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    defaultValue: 'md',
    description: 'Visual size of the avatar (24 / 32 / 40 / 48 / 64 px).',
  },
  {
    name: 'color',
    type: 'select',
    options: ['blue', 'orange', 'green', 'purple', 'grey'],
    defaultValue: 'grey',
    description: 'Background colour applied to the initials or icon fallback.',
  },
  {
    name: 'shape',
    type: 'select',
    options: ['circle', 'square'],
    defaultValue: 'circle',
    description: 'Shape of the avatar container.',
  },
  {
    name: 'role',
    type: 'select',
    options: ['img', 'presentation', 'none'],
    description: 'ARIA role on the host element. Auto-computed from the rendering mode when omitted.',
  },
];
