import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const tooltipStory: Story<'io-tooltip'> = {
  state: {
    properties: {
      content: 'Tooltip text',
      placement: 'top',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-tooltip' as const,
      properties: {
        content: (properties?.content as string) ?? 'Tooltip text',
        placement: (properties?.placement as string) ?? 'top',
      },
      children: [
        {
          tag: 'io-button' as const,
          properties: { size: 'sm' },
          children: ['Hover me'],
        },
      ],
    },
  ],
};

export const tooltipStoryTop: Story<'io-tooltip'> = {
  state: { properties: { content: 'Tooltip on top', placement: 'top' } },
  generator: () => [
    {
      tag: 'io-tooltip' as const,
      properties: { content: 'Tooltip on top', placement: 'top' },
      children: [
        {
          tag: 'io-button' as const,
          properties: { size: 'sm' },
          children: ['Hover me'],
        },
      ],
    },
  ],
};

export const tooltipStoryBottom: Story<'io-tooltip'> = {
  state: { properties: { content: 'Tooltip on bottom', placement: 'bottom' } },
  generator: () => [
    {
      tag: 'io-tooltip' as const,
      properties: { content: 'Tooltip on bottom', placement: 'bottom' },
      children: [
        {
          tag: 'io-button' as const,
          properties: { size: 'sm' },
          children: ['Hover me'],
        },
      ],
    },
  ],
};

export const tooltipStoryLeft: Story<'io-tooltip'> = {
  state: { properties: { content: 'Tooltip on left', placement: 'left' } },
  generator: () => [
    {
      tag: 'io-tooltip' as const,
      properties: { content: 'Tooltip on left', placement: 'left' },
      children: [
        {
          tag: 'io-button' as const,
          properties: { size: 'sm' },
          children: ['Hover me'],
        },
      ],
    },
  ],
};

export const tooltipStoryRight: Story<'io-tooltip'> = {
  state: { properties: { content: 'Tooltip on right', placement: 'right' } },
  generator: () => [
    {
      tag: 'io-tooltip' as const,
      properties: { content: 'Tooltip on right', placement: 'right' },
      children: [
        {
          tag: 'io-button' as const,
          properties: { size: 'sm' },
          children: ['Hover me'],
        },
      ],
    },
  ],
};

export const tooltipStoryLong: Story<'io-tooltip'> = {
  state: {
    properties: {
      content: 'This is a longer tooltip with more information that wraps to multiple lines.',
      placement: 'top',
    },
  },
  generator: () => [
    {
      tag: 'io-tooltip' as const,
      properties: {
        content: 'This is a longer tooltip with more information that wraps to multiple lines.',
        placement: 'top',
      },
      children: [
        {
          tag: 'io-button' as const,
          properties: { size: 'sm' },
          children: ['Hover me'],
        },
      ],
    },
  ],
};

export const tooltipPropDefinitions: PropDefinition[] = [
  {
    name: 'content',
    type: 'string',
    defaultValue: 'Tooltip text',
  },
  {
    name: 'placement',
    type: 'select',
    options: ['top', 'bottom', 'left', 'right'],
    defaultValue: 'top',
  },
];
