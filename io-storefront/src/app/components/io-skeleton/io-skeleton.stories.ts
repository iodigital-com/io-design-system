import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const skeletonStory: Story<'io-skeleton'> = {
  state: {
    properties: {
      variant: 'text',
      animated: true,
      label: 'Loading',
      width: '',
      height: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-skeleton' as const,
      properties: {
        variant: (properties?.variant as string) ?? 'text',
        animated: (properties?.animated as boolean) !== false,
        label: (properties?.label as string) ?? 'Loading',
        ...(properties?.width ? { width: properties.width as string } : {}),
        ...(properties?.height ? { height: properties.height as string } : {}),
      },
    },
  ],
};

export const skeletonStoryText: Story<'io-skeleton'> = {
  state: { properties: { variant: 'text', label: 'Loading' } },
  generator: () => [
    { tag: 'io-skeleton' as const, properties: { variant: 'text', label: 'Loading' } },
  ],
};

export const skeletonStoryCircular: Story<'io-skeleton'> = {
  state: { properties: { variant: 'circular', width: '48px', height: '48px', label: 'Loading avatar' } },
  generator: () => [
    {
      tag: 'io-skeleton' as const,
      properties: { variant: 'circular', width: '48px', height: '48px', label: 'Loading avatar' },
    },
  ],
};

export const skeletonStoryRectangular: Story<'io-skeleton'> = {
  state: { properties: { variant: 'rectangular', width: '100%', height: '120px', label: 'Loading image' } },
  generator: () => [
    {
      tag: 'io-skeleton' as const,
      properties: { variant: 'rectangular', width: '100%', height: '120px', label: 'Loading image' },
    },
  ],
};

export const skeletonStoryRounded: Story<'io-skeleton'> = {
  state: { properties: { variant: 'rounded', width: '100%', height: '80px', label: 'Loading card' } },
  generator: () => [
    {
      tag: 'io-skeleton' as const,
      properties: { variant: 'rounded', width: '100%', height: '80px', label: 'Loading card' },
    },
  ],
};

export const skeletonStoryStatic: Story<'io-skeleton'> = {
  state: { properties: { variant: 'text', animated: false, label: 'Loading' } },
  generator: () => [
    { tag: 'io-skeleton' as const, properties: { variant: 'text', animated: false, label: 'Loading' } },
  ],
};

export const skeletonPropDefinitions: PropDefinition[] = [
  {
    name: 'variant',
    type: 'select',
    options: ['text', 'circular', 'rectangular', 'rounded'],
    defaultValue: 'text',
  },
  {
    name: 'animated',
    type: 'boolean',
    defaultValue: true,
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Loading',
  },
  {
    name: 'width',
    type: 'string',
    defaultValue: '',
  },
  {
    name: 'height',
    type: 'string',
    defaultValue: '',
  },
];
