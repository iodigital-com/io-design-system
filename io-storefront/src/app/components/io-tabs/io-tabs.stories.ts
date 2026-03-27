import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

type TabItem = { label: string; value: string; disabled?: boolean };

const DEFAULT_TABS: TabItem[] = [
  { label: 'Overview', value: 'overview' },
  { label: 'Details', value: 'details' },
  { label: 'Settings', value: 'settings' },
];

const TABS_WITH_DISABLED: TabItem[] = [
  { label: 'Overview', value: 'overview' },
  { label: 'Details', value: 'details' },
  { label: 'Settings', value: 'settings', disabled: true },
];

const MANY_TABS: TabItem[] = [
  { label: 'Overview', value: 'overview' },
  { label: 'Details', value: 'details' },
  { label: 'Settings', value: 'settings' },
  { label: 'Permissions', value: 'permissions' },
  { label: 'History', value: 'history' },
];

export const tabsStory: Story<'io-tabs'> = {
  state: {
    properties: {
      activeTab: 'overview',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-tabs' as const,
      properties: {
        tabs: DEFAULT_TABS,
        activeTab: (properties?.activeTab as string) ?? 'overview',
      },
    },
  ],
};

export const tabsStoryDefault: Story<'io-tabs'> = {
  state: { properties: { activeTab: 'overview' } },
  generator: () => [
    {
      tag: 'io-tabs' as const,
      properties: {
        tabs: DEFAULT_TABS,
        activeTab: 'overview',
      },
    },
  ],
};

export const tabsStoryWithDisabled: Story<'io-tabs'> = {
  state: { properties: { activeTab: 'overview' } },
  generator: () => [
    {
      tag: 'io-tabs' as const,
      properties: {
        tabs: TABS_WITH_DISABLED,
        activeTab: 'overview',
      },
    },
  ],
};

export const tabsStoryManyTabs: Story<'io-tabs'> = {
  state: { properties: { activeTab: 'overview' } },
  generator: () => [
    {
      tag: 'io-tabs' as const,
      properties: {
        tabs: MANY_TABS,
        activeTab: 'overview',
      },
    },
  ],
};

export const tabsPropDefinitions: PropDefinition[] = [
  {
    name: 'activeTab',
    type: 'string',
    defaultValue: 'overview',
  },
];
