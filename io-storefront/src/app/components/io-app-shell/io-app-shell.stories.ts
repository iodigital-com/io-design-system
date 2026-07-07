import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const appShellStory: Story<'io-app-shell'> = {
  state: {
    properties: {
      sidebarStartOpen: true,
      sidebarEndOpen: false,
    },
  },
  generator: ({ properties } = {}) => {
    const { sidebarStartOpen = true, sidebarEndOpen = false } = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'io-app-shell' as const,
        properties: { sidebarStartOpen, sidebarEndOpen },
        children: [
          {
            tag: 'div' as const,
            properties: { slot: 'header-start' },
            children: ['Brand'],
          },
          {
            tag: 'nav' as const,
            properties: { slot: 'sidebar-start', 'aria-label': 'Main navigation' },
            children: ['Navigation'],
          },
          {
            tag: 'p' as const,
            properties: {},
            children: ['Main content'],
          },
        ],
      },
    ];
  },
};

export const appShellPropDefinitions: PropDefinition[] = [
  { name: 'sidebarStartOpen', type: 'boolean', defaultValue: false },
  { name: 'sidebarEndOpen', type: 'boolean', defaultValue: false },
  { name: 'headerHeight', type: 'string', defaultValue: undefined },
];
