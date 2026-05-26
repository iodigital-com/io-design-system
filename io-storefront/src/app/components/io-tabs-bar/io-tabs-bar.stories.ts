import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

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

function createTabsBarChildren(labels: string[], disabledIndex: number | null = null) {
  return labels.map((label, index) => createTabButton(label, disabledIndex === index));
}

function createTabsBarNode(
  activeTabIndex: number,
  labels: string[],
  disabledIndex: number | null = null,
) {
  return {
    tag: 'io-tabs-bar' as const,
    properties: { activeTabIndex },
    children: createTabsBarChildren(labels, disabledIndex),
  };
}

export const tabsBarStory: Story<'io-tabs-bar'> = {
  state: {
    properties: {
      activeTabIndex: DEFAULT_ACTIVE_TAB_INDEX,
    },
  },
  generator: ({ properties } = {}) => [
    {
      ...createTabsBarNode(
        (properties?.activeTabIndex as number) ?? DEFAULT_ACTIVE_TAB_INDEX,
        ['Overview', 'Details', 'Settings'],
      ),
      events: {
        onUpdate: {
          target: 'io-tabs-bar',
          prop: 'activeTabIndex',
          eventValueKey: 'activeTabIndex',
        },
      },
    },
  ],
};

export const tabsBarStoryDefault: Story<'io-tabs-bar'> = {
  state: { properties: { activeTabIndex: DEFAULT_ACTIVE_TAB_INDEX } },
  generator: () => [
    createTabsBarNode(DEFAULT_ACTIVE_TAB_INDEX, ['Overview', 'Details', 'Settings']),
  ],
};

export const tabsBarStoryWithDisabled: Story<'io-tabs-bar'> = {
  state: { properties: { activeTabIndex: DEFAULT_ACTIVE_TAB_INDEX } },
  generator: () => [
    createTabsBarNode(DEFAULT_ACTIVE_TAB_INDEX, ['Overview', 'Details', 'Settings'], 2),
  ],
};

export const tabsBarStoryManyTabs: Story<'io-tabs-bar'> = {
  state: { properties: { activeTabIndex: DEFAULT_ACTIVE_TAB_INDEX } },
  generator: () => [
    createTabsBarNode(DEFAULT_ACTIVE_TAB_INDEX, [
      'Overview',
      'Details',
      'Settings',
      'Permissions',
      'History',
    ]),
  ],
};

export const tabsBarPropDefinitions: PropDefinition[] = [
  {
    name: 'activeTabIndex',
    type: 'number',
    defaultValue: DEFAULT_ACTIVE_TAB_INDEX,
  },
];
