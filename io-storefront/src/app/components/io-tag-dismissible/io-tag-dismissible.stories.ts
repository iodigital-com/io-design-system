import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const tagDismissibleStory: Story<'io-tag-dismissible'> = {
  state: {
    properties: {
      label: 'React',
      variant: 'default',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-tag-dismissible' as const,
      properties: {
        label: (properties?.label as string) ?? 'React',
        variant: (properties?.variant as string) ?? 'default',
        ...(properties?.icon ? { icon: properties.icon as string } : {}),
      },
    },
  ],
};

export const tagDismissibleStoryDefault: Story<'io-tag-dismissible'> = {
  state: { properties: { variant: 'default' } },
  generator: () => [
    { tag: 'io-tag-dismissible' as const, properties: { label: 'React', variant: 'default' } },
    { tag: 'io-tag-dismissible' as const, properties: { label: 'TypeScript', variant: 'default' } },
    { tag: 'io-tag-dismissible' as const, properties: { label: 'Accessibility', variant: 'default' } },
  ],
};

export const tagDismissibleStoryVariants: Story<'io-tag-dismissible'> = {
  state: { properties: {} },
  generator: () => [
    { tag: 'io-tag-dismissible' as const, properties: { label: 'Default', variant: 'default' } },
    { tag: 'io-tag-dismissible' as const, properties: { label: 'Blue', variant: 'blue' } },
    { tag: 'io-tag-dismissible' as const, properties: { label: 'Beige', variant: 'beige' } },
    { tag: 'io-tag-dismissible' as const, properties: { label: 'Success', variant: 'success' } },
    { tag: 'io-tag-dismissible' as const, properties: { label: 'Warning', variant: 'warning' } },
    { tag: 'io-tag-dismissible' as const, properties: { label: 'Error', variant: 'error' } },
  ],
};

export const tagDismissibleStoryWithIcon: Story<'io-tag-dismissible'> = {
  state: { properties: { icon: 'tag' } },
  generator: () => [
    { tag: 'io-tag-dismissible' as const, properties: { label: 'Design', variant: 'blue', icon: 'tag' } },
    { tag: 'io-tag-dismissible' as const, properties: { label: 'Engineering', variant: 'default', icon: 'code' } },
  ],
};

export const tagDismissiblePropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'React',
  },
  {
    name: 'variant',
    type: 'select',
    options: ['default', 'blue', 'beige', 'dark', 'orange', 'rouge', 'success', 'warning', 'error', 'outline'],
    defaultValue: 'default',
  },
];
