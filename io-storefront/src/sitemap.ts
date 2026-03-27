/** Navigation tree for the io Design System storefront sidebar. */
export type NavItem = {
  label: string;
  href: string;
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
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Introduction', href: '/components' },
      { label: 'Badge', href: '/components/io-badge/configurator' },
      { label: 'Button', href: '/components/io-button/configurator' },
      { label: 'Checkbox', href: '/components/io-checkbox/configurator' },
      { label: 'Input', href: '/components/io-input/configurator' },
      { label: 'Link', href: '/components/io-link/configurator' },
      { label: 'Modal', href: '/components/io-modal/configurator' },
      { label: 'Radio', href: '/components/io-radio/configurator' },
      { label: 'Select', href: '/components/io-select/configurator' },
      { label: 'Spinner', href: '/components/io-spinner/configurator' },
      { label: 'Tabs', href: '/components/io-tabs/configurator' },
      { label: 'Tag', href: '/components/io-tag/configurator' },
      { label: 'Textarea', href: '/components/io-textarea/configurator' },
      { label: 'Toast', href: '/components/io-toast/configurator' },
      { label: 'Tooltip', href: '/components/io-tooltip/configurator' },
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
      { label: 'Changelog', href: '/news/changelog' },
      { label: 'Roadmap', href: '/news/roadmap' },
    ],
  },
];
