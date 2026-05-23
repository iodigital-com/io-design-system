/** Navigation tree for the io Design System storefront sidebar. */
export type ComponentStatus = 'stable' | 'beta' | 'deprecated';

export type NavItem = {
  label: string;
  href: string;
  status?: ComponentStatus;
  slug?: string;
  description?: string;
  related?: string[];
};

export type ComponentNavItem = NavItem & {
  slug: string;
  description: string;
  related: string[];
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const sitemap: NavSection[] = [
  {
    title: 'Designing',
    items: [
      { label: 'Introduction', href: '/designing' },
    ],
  },
  {
    title: 'Developing',
    items: [
      { label: 'Introduction', href: '/developing' },
      { label: 'Vanilla JS', href: '/developing/vanilla-js' },
      { label: 'Next.js', href: '/developing/next-js' },
      { label: 'React', href: '/developing/react' },
      { label: 'Angular', href: '/developing/angular' },
      { label: 'Vue', href: '/developing/vue' },
      { label: 'Components Ready', href: '/developing/components-ready' },
      { label: 'Component Status', href: '/developing/component-status' },
      { label: 'Customisation', href: '/developing/customisation' },
      { label: 'Token Usage', href: '/developing/tokens' },
    ],
  },
  {
    title: 'Styles',
    items: [
      { label: 'Introduction', href: '/styles' },
      { label: 'Logotype', href: '/styles/logotype' },
      { label: 'Colours', href: '/styles/colours' },
      { label: 'Typography', href: '/styles/typography' },
      { label: 'Spacing', href: '/styles/spacing' },
      { label: 'Grid', href: '/styles/grid' },
      { label: 'Motion', href: '/styles/motion' },
      { label: 'Focus', href: '/styles/focus' },
      { label: 'Border Radius', href: '/styles/border-radius' },
      { label: 'Borders', href: '/styles/borders' },
      { label: 'Icons', href: '/styles/icons' },
      { label: 'Elevation', href: '/styles/elevation' },
      { label: 'Token Explorer', href: '/styles/tokens' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Introduction', href: '/components' },
      {
        label: 'Accordion',
        href: '/components/io-accordion/configurator',
        status: 'beta',
        slug: 'io-accordion',
        description: 'Collapsible content sections with animated plus/minus icon and keyboard navigation.',
        related: ['io-tabs', 'io-modal', 'io-button'],
      },
      {
        label: 'Avatar',
        href: '/components/io-avatar/configurator',
        status: 'beta',
        slug: 'io-avatar',
        description: 'User avatar with image, initials, and icon fallback. Supports five sizes, five colour variants, and circle or square shapes.',
        related: ['io-badge', 'io-skeleton'],
      },
      {
        label: 'Badge',
        href: '/components/io-badge/configurator',
        status: 'beta',
        slug: 'io-badge',
        description: "Labels status, counts, and categories inline. Nine variants map directly to io Digital's semantic and brand colour palette.",
        related: ['io-tag', 'io-toast', 'io-tooltip'],
      },
      {
        label: 'Breadcrumb',
        href: '/components/io-breadcrumb/configurator',
        status: 'beta',
        slug: 'io-breadcrumb',
        description: 'Breadcrumb navigation for hierarchical orientation. Supports chevron and slash separators, and collapses long paths behind an expand button.',
        related: ['io-link', 'io-pagination'],
      },
      {
        label: 'Button',
        href: '/components/io-button/configurator',
        status: 'stable',
        slug: 'io-button',
        description: 'Handles primary interactions — form submissions, navigation, and confirmations. Three variants, ten brand colours, four sizes.',
        related: ['io-link', 'io-modal', 'io-tabs'],
      },
      {
        label: 'Button Group',
        href: '/components/io-button-group/configurator',
        status: 'beta',
        slug: 'io-button-group',
        description: 'Segmented single or multi-select control. Renders a horizontal button strip with shared borders, active state in brand blue, and full radiogroup/checkbox ARIA semantics.',
        related: ['io-button', 'io-tabs', 'io-checkbox'],
      },
      {
        label: 'Carousel',
        href: '/components/io-carousel/configurator',
        status: 'beta',
        slug: 'io-carousel',
        description: 'Horizontally scrollable content card slider with drag-to-scroll and prev/next navigation.',
        related: ['io-button', 'io-tag', 'io-badge'],
      },
      {
        label: 'Divider',
        href: '/components/io-divider/configurator',
        status: 'beta',
        slug: 'io-divider',
        description: 'Token-based visual separator between sections of content. Supports horizontal and vertical orientations, plus a labeled variant for "or" / "and" patterns.',
        related: ['io-accordion', 'io-tabs', 'io-badge'],
      },
      {
        label: 'Checkbox',
        href: '/components/io-checkbox/configurator',
        status: 'stable',
        slug: 'io-checkbox',
        description: 'Binary selection with a built-in label and indeterminate state. Emits checked value via change.',
        related: ['io-radio', 'io-select', 'io-input'],
      },
      {
        label: 'Input',
        href: '/components/io-input/configurator',
        status: 'beta',
        slug: 'io-input',
        description: 'Single-line text entry. Built-in label, helper text, character count, and error state. Underline-only design.',
        related: ['io-textarea', 'io-select', 'io-checkbox'],
      },
      {
        label: 'Link',
        href: '/components/io-link/configurator',
        status: 'stable',
        slug: 'io-link',
        description: 'Inline and standalone hyperlink. Three colour options, external link support, and an animated underline on hover.',
        related: ['io-button', 'io-tooltip', 'io-tabs'],
      },
      {
        label: 'Modal',
        href: '/components/io-modal/configurator',
        status: 'stable',
        slug: 'io-modal',
        description: 'Focuses attention on a critical task or confirmation. Rendered as a native dialog element — focus trapping and ESC are built-in.',
        related: ['io-button', 'io-toast', 'io-tabs'],
      },
      {
        label: 'Pagination',
        href: '/components/io-pagination/configurator',
        status: 'stable',
        slug: 'io-pagination',
        description: 'Circular page controls with outlined numbers, active page in brand blue, and beige nav arrows.',
        related: ['io-button', 'io-select', 'io-spinner'],
      },
      {
        label: 'Progress',
        href: '/components/io-progress/configurator',
        status: 'beta',
        slug: 'io-progress',
        description: 'Linear progress bar. Use for file uploads, multi-step forms, and wizard flows. Supports five colour variants and three track sizes.',
        related: ['io-spinner', 'io-skeleton'],
      },
      {
        label: 'Radio',
        href: '/components/io-radio/configurator',
        status: 'stable',
        slug: 'io-radio',
        description: 'Single-select from a group. Built-in label, helper text, error state, and change event.',
        related: ['io-checkbox', 'io-select', 'io-input'],
      },
      {
        label: 'Select',
        href: '/components/io-select/configurator',
        status: 'stable',
        slug: 'io-select',
        description: 'Dropdown selection with a built-in label, placeholder, and error state. Pass options as an array of value/label objects.',
        related: ['io-input', 'io-radio', 'io-checkbox'],
      },
      {
        label: 'Skeleton',
        href: '/components/io-skeleton/configurator',
        status: 'beta',
        slug: 'io-skeleton',
        description: 'Animated loading placeholder. Use while async content loads to communicate activity without a spinner. Supports text, circular, rectangular, and rounded shape variants.',
        related: ['io-spinner', 'io-toast'],
      },
      {
        label: 'Spinner',
        href: '/components/io-spinner/configurator',
        status: 'stable',
        slug: 'io-spinner',
        description: 'Signals a loading or processing state. Three sizes, three colour modes including current to inherit parent colour.',
        related: ['io-button', 'io-toast', 'io-modal'],
      },
      {
        label: 'Tabs',
        href: '/components/io-tabs/configurator',
        status: 'stable',
        slug: 'io-tabs',
        description: 'Organises content into named panels. Keyboard-navigable with roving tabindex and full ARIA tab role semantics.',
        related: ['io-button', 'io-tag', 'io-tooltip'],
      },
      {
        label: 'Tag',
        href: '/components/io-tag/configurator',
        status: 'stable',
        slug: 'io-tag',
        description: 'Toggleable filter chip or removable label. Renders as a button with aria-pressed — emits toggle and remove.',
        related: ['io-badge', 'io-checkbox', 'io-tabs'],
      },
      {
        label: 'Textarea',
        href: '/components/io-textarea/configurator',
        status: 'stable',
        slug: 'io-textarea',
        description: 'Multi-line text entry with label, helper text, character count, error state, and three resize modes.',
        related: ['io-input', 'io-select', 'io-checkbox'],
      },
      {
        label: 'Toast',
        href: '/components/io-toast/configurator',
        status: 'stable',
        slug: 'io-toast',
        description: 'Delivers time-limited feedback after a user action. Queue multiple messages via addToast() — one visible at a time.',
        related: ['io-badge', 'io-modal', 'io-tooltip'],
      },
      {
        label: 'Tooltip',
        href: '/components/io-tooltip/configurator',
        status: 'stable',
        slug: 'io-tooltip',
        description: 'Surfaces brief contextual help on hover or focus. Positioned automatically to stay within the viewport.',
        related: ['io-link', 'io-button', 'io-badge'],
      },
    ],
  },
  {
    title: 'Help',
    items: [
      { label: 'Introduction', href: '/help' },
      { label: 'FAQ', href: '/help/faq' },
      { label: 'Support', href: '/help/support' },
    ],
  },
  {
    title: 'News',
    items: [
      { label: 'Overview', href: '/news' },
      { label: 'Changelog', href: '/news/changelog' },
      { label: 'Roadmap', href: '/news/roadmap' },
    ],
  },
];

export function isComponentNavItem(item: NavItem): item is ComponentNavItem {
  return Boolean(item.slug && item.description && item.related);
}

export function getComponentItems(): ComponentNavItem[] {
  const componentsSection = sitemap.find((section) => section.title === 'Components');

  if (!componentsSection) {
    return [];
  }

  return componentsSection.items.filter(isComponentNavItem);
}

export function getComponentItemBySlug(slug: string): ComponentNavItem | undefined {
  return getComponentItems().find((item) => item.slug === slug);
}

export function getComponentStatusBySlug(slug: string): ComponentStatus | undefined {
  return getComponentItemBySlug(slug)?.status;
}
