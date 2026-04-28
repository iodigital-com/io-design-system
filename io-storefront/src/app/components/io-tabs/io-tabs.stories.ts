import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

const DEFAULT_ACTIVE_TAB_INDEX = 0;

function createTabButton(label: string, disabled = false) {
  return {
    tag: 'button' as const,
    properties: {
      type: 'button',
      ...(disabled ? { disabled: true } : {}),
    },
    children: [label],
  };
}

function createTabsChildren(labels: string[], disabledIndex: number | null = null) {
  return labels.map((label, index) => createTabButton(label, disabledIndex === index));
}

function createTabsNode(activeTabIndex: number, labels: string[], disabledIndex: number | null = null) {
  return {
    tag: 'io-tabs' as const,
    properties: { activeTabIndex },
    children: createTabsChildren(labels, disabledIndex),
  };
}

export const tabsStory: Story<'io-tabs'> = {
  state: {
    properties: {
      activeTabIndex: DEFAULT_ACTIVE_TAB_INDEX,
    },
  },
  generator: ({ properties } = {}) => [
    {
      ...createTabsNode(
        (properties?.activeTabIndex as number) ?? DEFAULT_ACTIVE_TAB_INDEX,
        ['Overview', 'Details', 'Settings'],
      ),
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
  state: { properties: { activeTabIndex: DEFAULT_ACTIVE_TAB_INDEX } },
  generator: () => [createTabsNode(DEFAULT_ACTIVE_TAB_INDEX, ['Overview', 'Details', 'Settings'])],
};

export const tabsStoryWithDisabled: Story<'io-tabs'> = {
  state: { properties: { activeTabIndex: DEFAULT_ACTIVE_TAB_INDEX } },
  generator: () => [createTabsNode(DEFAULT_ACTIVE_TAB_INDEX, ['Overview', 'Details', 'Settings'], 2)],
};

export const tabsStoryManyTabs: Story<'io-tabs'> = {
  state: { properties: { activeTabIndex: DEFAULT_ACTIVE_TAB_INDEX } },
  generator: () => [createTabsNode(DEFAULT_ACTIVE_TAB_INDEX, ['Overview', 'Details', 'Settings', 'Permissions', 'History'])],
};

export const tabsPropDefinitions: PropDefinition[] = [
  {
    name: 'activeTabIndex',
    type: 'number',
    defaultValue: DEFAULT_ACTIVE_TAB_INDEX,
  },
];

