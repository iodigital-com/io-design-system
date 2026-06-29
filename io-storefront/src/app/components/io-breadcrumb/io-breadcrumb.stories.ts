import type { PropDefinition } from '@/models/propDefinition';
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

// Demonstrates a custom separator override using --io-breadcrumb-separator.
// Default separator is '/' — this example overrides it with the guillemet '›'.
export const breadcrumbStoryGuillemet: Story<'io-breadcrumb'> = {
  frameworkCode: {
    html: `<io-breadcrumb style="--io-breadcrumb-separator: '›'">
  <io-breadcrumb-item href="/">Home</io-breadcrumb-item>
  <io-breadcrumb-item href="/about">About</io-breadcrumb-item>
  <io-breadcrumb-item current>Team</io-breadcrumb-item>
</io-breadcrumb>`,
    react: `<IoBreadcrumb style={{ '--io-breadcrumb-separator': "'›'"}}>
  <IoBreadcrumbItem href="/">Home</IoBreadcrumbItem>
  <IoBreadcrumbItem href="/about">About</IoBreadcrumbItem>
  <IoBreadcrumbItem current>Team</IoBreadcrumbItem>
</IoBreadcrumb>`,
    angular: `<io-breadcrumb style="--io-breadcrumb-separator: '›'">
  <io-breadcrumb-item href="/">Home</io-breadcrumb-item>
  <io-breadcrumb-item href="/about">About</io-breadcrumb-item>
  <io-breadcrumb-item current>Team</io-breadcrumb-item>
</io-breadcrumb>`,
    vue: `<io-breadcrumb :style="{ '--io-breadcrumb-separator': "'›'" }">
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
      properties: { style: { '--io-breadcrumb-separator': "'›'", display: 'contents' } },
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

// Demonstrates the label prop for localised or multi-breadcrumb scenarios.
export const breadcrumbStoryLabel: Story<'io-breadcrumb'> = {
  state: {
    properties: {},
  },
  generator: () => [
    {
      tag: 'io-breadcrumb' as const,
      properties: { label: "Fil d'Ariane" },
      children: [
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/' }, children: ['Accueil'] },
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/services' }, children: ['Services'] },
        { tag: 'io-breadcrumb-item' as const, properties: { current: true }, children: ['Stratégie digitale'] },
      ],
    },
  ],
};

// Demonstrates target="_blank" with automatic rel="noopener noreferrer".
export const breadcrumbStoryTargetBlank: Story<'io-breadcrumb'> = {
  state: {
    properties: {},
  },
  generator: () => [
    {
      tag: 'io-breadcrumb' as const,
      properties: {},
      children: [
        { tag: 'io-breadcrumb-item' as const, properties: { href: '/' }, children: ['Home'] },
        { tag: 'io-breadcrumb-item' as const, properties: { href: 'https://example.com', target: '_blank' }, children: ['External Docs'] },
        { tag: 'io-breadcrumb-item' as const, properties: { current: true }, children: ['Guide'] },
      ],
    },
  ],
};

// Alias used by the Configurator tab (no configurable props — structure is slot-driven).
export const breadcrumbStory = breadcrumbStoryDefault;

export const breadcrumbPropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Breadcrumb', description: 'Accessible label for the nav landmark.' },
  { name: 'maxItems', type: 'number', description: 'Maximum visible items before collapsing intermediate items into an expand button.' },
];

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
