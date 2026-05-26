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
      { label: 'Theming', href: '/developing/theming' },
      { label: 'Density', href: '/developing/density' },
      { label: 'Token Usage', href: '/developing/tokens' },
      { label: 'Stories', href: '/developing/stories' },
      { label: 'Migration Guide', href: '/developing/migration' },
      { label: 'Patterns', href: '/developing/patterns' },
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
      { label: 'Gradients', href: '/styles/gradients' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Introduction', href: '/components' },
      {
        label: 'Alert',
        href: '/components/io-alert/configurator',
        status: 'beta',
        slug: 'io-alert',
        description: 'Inline notification for info, success, warning, and error states. Supports an optional heading, dismissible button, and screen-reader-friendly aria-live announcements.',
        related: ['io-toast', 'io-badge', 'io-modal'],
      },
      {
        label: 'Accordion',
        href: '/components/io-accordion/configurator',
        status: 'stable',
        slug: 'io-accordion',
        description: 'Collapsible content sections with animated plus/minus icon and keyboard navigation.',
        related: ['io-tabs', 'io-modal', 'io-button'],
      },
      {
        label: 'Avatar',
        href: '/components/io-avatar/configurator',
        status: 'stable',
        slug: 'io-avatar',
        description: 'User avatar with image, initials, and icon fallback. Supports five sizes, five colour variants, and circle or square shapes.',
        related: ['io-badge', 'io-spinner'],
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
        status: 'stable',
        slug: 'io-breadcrumb',
        description: 'Breadcrumb navigation for hierarchical orientation. Uses declarative slot-based io-breadcrumb-item sub-components.',
        related: ['io-breadcrumb-item', 'io-link', 'io-pagination'],
      },
      {
        label: 'Breadcrumb Item',
        href: '/components/io-breadcrumb-item/examples',
        status: 'stable',
        slug: 'io-breadcrumb-item',
        description: 'Individual breadcrumb item sub-component used inside io-breadcrumb. Renders as a link when href is provided, or as a span with aria-current when current.',
        related: ['io-breadcrumb', 'io-link'],
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
        status: 'stable',
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
        status: 'stable',
        slug: 'io-divider',
        description: 'Token-based visual separator between sections of content. Supports horizontal and vertical orientations, plus a labeled variant for "or" / "and" patterns.',
        related: ['io-accordion', 'io-tabs', 'io-badge'],
      },
      {
        label: 'Drawer',
        href: '/components/io-drawer/configurator',
        status: 'stable',
        slug: 'io-drawer',
        description: 'Slide-out overlay panel attached to a screen edge. Supports left, right, and bottom placements with four size presets. Built on the native dialog element.',
        related: ['io-modal', 'io-button', 'io-tabs'],
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
        label: 'Checkbox Group',
        href: '/components/io-checkbox-group/configurator',
        status: 'stable',
        slug: 'io-checkbox-group',
        description: 'Wraps io-checkbox items in a semantic fieldset with a shared legend, name propagation, and a group-level change event.',
        related: ['io-checkbox', 'io-radio-group', 'io-form-field'],
      },
      {
        label: 'Form Field',
        href: '/components/io-form-field/configurator',
        status: 'stable',
        slug: 'io-form-field',
        description: 'Auto-wires label, helper text, and error text accessibility attributes (for/id/aria-describedby/aria-invalid) for any slotted form control.',
        related: ['io-input', 'io-radio-group', 'io-checkbox-group'],
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
        label: 'Multi Select',
        href: '/components/io-multi-select/configurator',
        status: 'beta',
        slug: 'io-multi-select',
        description: 'Slot-based multi-select dropdown with removable value chips, optional search filter, and FACE form participation.',
        related: ['io-select', 'io-form-field', 'io-checkbox-group'],
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
        label: 'Pin Code',
        href: '/components/io-pin-code/configurator',
        status: 'beta',
        slug: 'io-pin-code',
        description: 'Secure PIN or OTP entry field. N digit slots with auto-advance, paste distribution, and optional password masking. FACE form-associated.',
        related: ['io-input', 'io-form-field'],
      },
      {
        label: 'Popover',
        href: '/components/io-popover/configurator',
        status: 'beta',
        slug: 'io-popover',
        description: 'Click-triggered floating content panel with accessible dialog semantics. Uses the native Popover API where available with a manual positioning fallback.',
        related: ['io-tooltip', 'io-modal', 'io-drawer'],
      },
      {
        label: 'Progress',
        href: '/components/io-progress/configurator',
        status: 'stable',
        slug: 'io-progress',
        description: 'Linear progress bar. Use for file uploads, multi-step forms, and wizard flows. Supports five colour variants and three track sizes.',
        related: ['io-spinner', 'io-toast'],
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
        label: 'Radio Group',
        href: '/components/io-radio-group/configurator',
        status: 'stable',
        slug: 'io-radio-group',
        description: 'Wraps io-radio buttons in a semantic fieldset with a shared legend, name and value propagation, and a group-level change event.',
        related: ['io-radio', 'io-checkbox-group', 'io-form-field'],
      },
      {
        label: 'Scroller',
        href: '/components/io-scroller/configurator',
        status: 'beta',
        slug: 'io-scroller',
        description: 'Scrollable content wrapper with gradient fade indicators at each edge. Use for tab bars, chip groups, image strips, and any overflowing content.',
        related: ['io-tabs', 'io-button-group', 'io-carousel'],
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
        label: 'Spinner',
        href: '/components/io-spinner/configurator',
        status: 'stable',
        slug: 'io-spinner',
        description: 'Signals a loading or processing state. Three sizes, three colour modes including current to inherit parent colour.',
        related: ['io-button', 'io-toast', 'io-modal'],
      },
      {
        label: 'Stepper',
        href: '/components/io-stepper/configurator',
        status: 'stable',
        slug: 'io-stepper',
        description: 'Guides users through a multi-step process. Shows progress at a glance with complete, current, and upcoming states in horizontal or vertical orientation.',
        related: ['io-progress', 'io-button', 'io-modal'],
      },
      {
        label: 'Switch',
        href: '/components/io-switch/configurator',
        status: 'beta',
        slug: 'io-switch',
        description: 'Toggle switch for binary on/off settings. FACE form-associated component with role=switch and full keyboard navigation.',
        related: ['io-checkbox', 'io-radio', 'io-form-field'],
      },
      {
        label: 'Table',
        href: '/components/io-table/configurator',
        status: 'stable',
        slug: 'io-table',
        description: 'Accessible data table with optional sortable columns and row selection. Supports sticky headers, selectable rows, and a JavaScript data API.',
        related: ['io-checkbox', 'io-pagination', 'io-spinner'],
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
        label: 'Tabs Bar',
        href: '/components/io-tabs-bar/configurator',
        status: 'beta',
        slug: 'io-tabs-bar',
        description: 'Standalone tab navigation bar without panel management. Use with router-driven applications where tab content is controlled by URL navigation.',
        related: ['io-tabs', 'io-button', 'io-link'],
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
      {
        label: 'Wordmark',
        href: '/components/io-wordmark/configurator',
        status: 'stable',
        slug: 'io-wordmark',
        description: 'Brand wordmark rendering "io" in brand blue and "digital" in text colour. Token-driven sizes: sm, md, lg, xl.',
        related: ['io-avatar', 'io-badge', 'io-link'],
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
