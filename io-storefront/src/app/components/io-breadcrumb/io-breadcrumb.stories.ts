import type { Story } from '@/models/story';

// ── Stories ──────────────────────────────────────────────────────────────────

export const breadcrumbStoryDefault: Story<'io-breadcrumb'> = {
  state: {
    properties: {},
  },
  generator: () => [
    {
      tag: 'io-breadcrumb' as const,
      properties: {},
      children: [
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/' }, children: ['Home'] },
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/services' }, children: ['Services'] },
        { tag: 'io-breadcrumb-item' as const, properties: { current: true }, children: ['Digital Strategy'] },
      ],
    },
  ],
};

export const breadcrumbStorySlash: Story<'io-breadcrumb'> = {
  state: {
    properties: {},
  },
  generator: () => [
    {
      tag: 'io-breadcrumb' as const,
      properties: {},
      children: [
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/' }, children: ['Home'] },
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/about' }, children: ['About'] },
        { tag: 'io-breadcrumb-item' as const, properties: { current: true }, children: ['Team'] },
      ],
    },
  ],
};

export const breadcrumbStoryLong: Story<'io-breadcrumb'> = {
  state: {
    properties: {},
  },
  generator: () => [
    {
      tag: 'io-breadcrumb' as const,
      properties: {},
      children: [
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/' }, children: ['Home'] },
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/services' }, children: ['Services'] },
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/services/digital' }, children: ['Digital'] },
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/services/digital/strategy' }, children: ['Strategy'] },
        { tag: 'io-breadcrumb-item' as const, properties: { current: true }, children: ['Consulting'] },
      ],
    },
  ],
};
