import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const tabsStory: Story<'io-tabs'> = {
  state: {
    properties: {
      activeTabIndex: 0,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-tabs' as const,
      properties: {
        activeTabIndex: (properties?.activeTabIndex as number) ?? 0,
      },
      children: [
        { tag: 'button' as const, properties: { type: 'button' }, children: ['Overview'] },
        { tag: 'button' as const, properties: { type: 'button' }, children: ['Details'] },
        { tag: 'button' as const, properties: { type: 'button' }, children: ['Settings'] },
      ],
          events: {
            onUpdate: {
              target: 'io-tabs',
              prop: 'activeTabIndex',
              eventValueKey: 'activeTabIndex',
            },
          },
    },
  ],
};

export const tabsStoryDefault: Story<'io-tabs'> = {
  state: { properties: { activeTabIndex: 0 } },
  generator: () => [
    {
      tag: 'io-tabs' as const,
      properties: { activeTabIndex: 0 },
      children: [
        { tag: 'button' as const, properties: { type: 'button' }, children: ['Overview'] },
        { tag: 'button' as const, properties: { type: 'button' }, children: ['Details'] },
        { tag: 'button' as const, properties: { type: 'button' }, children: ['Settings'] },
      ],
    },
  ],
};

export const tabsStoryWithDisabled: Story<'io-tabs'> = {
  state: { properties: { activeTabIndex: 0 } },
  generator: () => [
    {
      tag: 'io-tabs' as const,
      properties: { activeTabIndex: 0 },
      children: [
        { tag: 'button' as const, properties: { type: 'button' }, children: ['Overview'] },
        { tag: 'button' as const, properties: { type: 'button' }, children: ['Details'] },
        { tag: 'button' as const, properties: { type: 'button', disabled: true }, children: ['Settings'] },
      ],
    },
  ],
};

export const tabsStoryManyTabs: Story<'io-tabs'> = {
  state: { properties: { activeTabIndex: 0 } },
  generator: () => [
    {
      tag: 'io-tabs' as const,
      properties: { activeTabIndex: 0 },
      children: [
        { tag: 'button' as const, properties: { type: 'button' }, children: ['Overview'] },
        { tag: 'button' as const, properties: { type: 'button' }, children: ['Details'] },
        { tag: 'button' as const, properties: { type: 'button' }, children: ['Settings'] },
        { tag: 'button' as const, properties: { type: 'button' }, children: ['Permissions'] },
        { tag: 'button' as const, properties: { type: 'button' }, children: ['History'] },
      ],
    },
  ],
};

export const tabsPropDefinitions: PropDefinition[] = [
  {
    name: 'activeTabIndex',
    type: 'number',
    defaultValue: 0,
  },
];

