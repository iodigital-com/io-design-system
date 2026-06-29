import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const tooltipStory: Story<'io-button'> = {
  state: {
    properties: {
      content: 'Tooltip text',
      placement: 'top',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-button' as const,
      properties: {
        size: 'sm',
        'io-tooltip': (properties?.content as string) ?? 'Tooltip text',
        'io-tooltip-placement': (properties?.placement as string) ?? 'top',
      },
      children: ['Hover me'],
    },
  ],
};

export const tooltipStoryTop: Story<'io-button'> = {
  state: { properties: { content: 'Tooltip on top', placement: 'top' } },
  generator: () => [
    {
      tag: 'io-button' as const,
      properties: { size: 'sm', 'io-tooltip': 'Tooltip on top', 'io-tooltip-placement': 'top' },
      children: ['Hover me'],
    },
  ],
};

export const tooltipStoryBottom: Story<'io-button'> = {
  state: { properties: { content: 'Tooltip on bottom', placement: 'bottom' } },
  generator: () => [
    {
      tag: 'io-button' as const,
      properties: { size: 'sm', 'io-tooltip': 'Tooltip on bottom', 'io-tooltip-placement': 'bottom' },
      children: ['Hover me'],
    },
  ],
};

export const tooltipStoryLeft: Story<'io-button'> = {
  state: { properties: { content: 'Tooltip on left', placement: 'left' } },
  generator: () => [
    {
      tag: 'io-button' as const,
      properties: { size: 'sm', 'io-tooltip': 'Tooltip on left', 'io-tooltip-placement': 'left' },
      children: ['Hover me'],
    },
  ],
};

export const tooltipStoryRight: Story<'io-button'> = {
  state: { properties: { content: 'Tooltip on right', placement: 'right' } },
  generator: () => [
    {
      tag: 'io-button' as const,
      properties: { size: 'sm', 'io-tooltip': 'Tooltip on right', 'io-tooltip-placement': 'right' },
      children: ['Hover me'],
    },
  ],
};

export const tooltipStoryLong: Story<'io-button'> = {
  state: {
    properties: {
      content: 'This is a longer tooltip with more information that wraps to multiple lines.',
      placement: 'top',
    },
  },
  generator: () => [
    {
      tag: 'io-button' as const,
      properties: {
        size: 'sm',
        'io-tooltip': 'This is a longer tooltip with more information that wraps to multiple lines.',
        'io-tooltip-placement': 'top',
      },
      children: ['Hover me'],
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
    options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
    defaultValue: 'top',
    description: 'Preferred placement of the tooltip relative to the trigger element.',
  },
];
