import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const wordmarkStory: Story<'io-wordmark'> = {
  state: {
    properties: {
      size: 'md',
      mono: false,
      href: '',
      target: '',
      rel: '',
    },
  },
  generator: ({ properties } = {}) => {
    // Strip empty-string falsy props so the component doesn't receive href=""
    const filteredProps = Object.fromEntries(
      Object.entries(properties ?? {}).filter(([, v]) => v !== '' && v !== undefined),
    );
    return [
      {
        tag: 'io-wordmark' as const,
        properties: filteredProps,
        children: [],
      },
    ];
  },
};

export const wordmarkStorySizes: Story<'io-wordmark'> = {
  state: { properties: {} },
  generator: () =>
    (['sm', 'md', 'lg', 'xl'] as const).map((size) => ({
      tag: 'io-wordmark' as const,
      properties: { size },
      children: [],
    })),
};

export const wordmarkStoryMono: Story<'io-wordmark'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-wordmark' as const,
      properties: { size: 'lg', mono: false },
      children: [],
    },
    {
      tag: 'io-wordmark' as const,
      properties: { size: 'lg', mono: true },
      children: [],
    },
  ],
};

export const wordmarkPropDefinitions: PropDefinition[] = [
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg', 'xl'],
    defaultValue: 'md',
    description: 'Controls the overall font-size of the wordmark.',
  },
  {
    name: 'mono',
    type: 'boolean',
    defaultValue: false,
    description: 'Monochrome mode — both "io" and "digital" use the current text colour.',
  },
  {
    name: 'href',
    type: 'string',
    defaultValue: '',
    description:
      'When provided, the wordmark renders as an <a> element. Common use case: logo linking back to the homepage. Leave empty for a static presentational wordmark.',
  },
  {
    name: 'target',
    type: 'string',
    defaultValue: '',
    description: 'Browsing context for the link (e.g. "_blank"). Only applies when href is set.',
  },
  {
    name: 'rel',
    type: 'string',
    defaultValue: '',
    description:
      'Link relationship (e.g. "noopener noreferrer"). Only applies when href is set.',
  },
];
