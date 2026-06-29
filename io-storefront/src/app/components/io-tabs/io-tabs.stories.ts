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
      size: 'small',
      label: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      ...createTabsNode(
        (properties?.activeTabIndex as number) ?? DEFAULT_ACTIVE_TAB_INDEX,
        ['Overview', 'Details', 'Settings'],
      ),
      properties: {
        activeTabIndex: (properties?.activeTabIndex as number) ?? DEFAULT_ACTIVE_TAB_INDEX,
        size: (properties?.size as string) ?? 'small',
        compact: (properties?.compact as boolean) ?? false,
        label: (properties?.label as string) || undefined,
        labelledby: (properties?.labelledby as string) ?? undefined,
        panelIds: (properties?.panelIds as string[]) ?? undefined,
      },
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
  {
    name: 'size',
    type: 'select',
    options: ['small', 'medium'],
    defaultValue: 'small',
    description: 'Visual size of the tab list. medium increases tab height and font size for prominent navigation.',
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: false,
    description: 'Reduces tab padding for dense layouts.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
    description: 'Accessible label for the tablist region. Applied as aria-label when labelledby is not set.',
  },
  {
    name: 'labelledby',
    type: 'string',
    defaultValue: '',
    description: 'ID of an element that labels this tab group. Sets aria-labelledby on the tablist element.',
  },
  {
    // Source prop is string[]|undefined. The configurator cannot handle array types,
    // so this is kept as 'string' to allow a single panel ID as a demo value.
    name: 'panelIds',
    type: 'string',
    defaultValue: '',
    description: 'Comma-separated panel IDs (or array in JSX) that map to each tab. Sets aria-controls on each slotted tab button for ARIA APG compliance.',
  },
];

