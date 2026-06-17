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

// Wraps io-breadcrumb in a display:contents div so the CSS custom property
// cascades into the shadow DOM without affecting the rendered layout.
// The frameworkCode override shows consumers how to apply the override
// directly on io-breadcrumb without the wrapper.
export const breadcrumbStorySlash: Story<'io-breadcrumb'> = {
  frameworkCode: {
    html: `<io-breadcrumb style="--io-breadcrumb-separator: '/'">
  <io-breadcrumb-item href="/">Home</io-breadcrumb-item>
  <io-breadcrumb-item href="/about">About</io-breadcrumb-item>
  <io-breadcrumb-item current>Team</io-breadcrumb-item>
</io-breadcrumb>`,
    react: `<IoBreadcrumb style={{ '--io-breadcrumb-separator': "'/'"}}>
  <IoBreadcrumbItem href="/">Home</IoBreadcrumbItem>
  <IoBreadcrumbItem href="/about">About</IoBreadcrumbItem>
  <IoBreadcrumbItem current>Team</IoBreadcrumbItem>
</IoBreadcrumb>`,
    angular: `<io-breadcrumb style="--io-breadcrumb-separator: '/'">
  <io-breadcrumb-item href="/">Home</io-breadcrumb-item>
  <io-breadcrumb-item href="/about">About</io-breadcrumb-item>
  <io-breadcrumb-item current>Team</io-breadcrumb-item>
</io-breadcrumb>`,
    vue: `<io-breadcrumb :style="{ '--io-breadcrumb-separator': "'/'" }">
  <io-breadcrumb-item href="/">Home</io-breadcrumb-item>
  <io-breadcrumb-item href="/about">About</io-breadcrumb-item>
  <io-breadcrumb-item current>Team</io-breadcrumb-item>
</io-breadcrumb>`,
  },
  state: {
    properties: {},
  },
  generator: () => [
    {
      tag: 'div' as const,
      properties: { style: { '--io-breadcrumb-separator': "'/'", display: 'contents' } },
      children: [
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

export const breadcrumbStoryLocalised: Story<'io-breadcrumb'> = {
  state: {
    properties: {},
  },
  generator: () => [
    {
      tag: 'io-breadcrumb' as const,
      properties: { label: 'Navigatie' },
      children: [
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/' }, children: ['Home'] },
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/diensten' }, children: ['Diensten'] },
        { tag: 'io-breadcrumb-item' as const, properties: { current: true }, children: ['Digitale strategie'] },
      ],
    },
  ],
};

export const breadcrumbStoryExternalLink: Story<'io-breadcrumb'> = {
  state: {
    properties: {},
  },
  generator: () => [
    {
      tag: 'io-breadcrumb' as const,
      properties: {},
      children: [
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/' }, children: ['Home'] },
        {
          tag: 'io-breadcrumb-item' as const,
          properties: {
            href: '/docs',
            target: '_blank',
            itemLabel: 'Documentation (opens in new tab)',
          },
          children: ['Docs'],
        },
        { tag: 'io-breadcrumb-item' as const, properties: { current: true }, children: ['API Reference'] },
      ],
    },
  ],
};
