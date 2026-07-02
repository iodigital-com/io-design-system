import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export { IO_ICON_NAMES, type IoIconName } from './icon-names';
import { IO_ICON_NAMES } from './icon-names';

export const iconStory: Story<'io-icon'> = {
  state: {
    properties: {
      name: 'search',
      size: 'md',
      color: 'inherit',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-icon' as const,
      properties: properties ?? {},
    },
  ],
};

export const iconStoryAllIcons: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    [...IO_ICON_NAMES].sort().map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStorySizes: Story<'io-icon'> = {
  state: { properties: { name: 'search' } },
  generator: () =>
    (['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const).map((size) => ({
      tag: 'io-icon' as const,
      properties: { name: 'search', size, label: size },
    })),
};

export const iconStoryColour: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () => [
    {
      tag: 'io-icon' as const,
      properties: { name: 'check-circle', size: 'lg', label: 'Success colour', style: { color: 'var(--io-color-success)' } },
    },
    {
      tag: 'io-icon' as const,
      properties: { name: 'alert-triangle', size: 'lg', label: 'Warning colour', style: { color: 'var(--io-color-warning)' } },
    },
    {
      tag: 'io-icon' as const,
      properties: { name: 'info', size: 'lg', label: 'Info colour', style: { color: 'var(--io-color-info)' } },
    },
    {
      tag: 'io-icon' as const,
      properties: { name: 'x-circle', size: 'lg', label: 'Error colour', style: { color: 'var(--io-color-error)' } },
    },
    {
      tag: 'io-icon' as const,
      properties: { name: 'star', size: 'lg', label: 'Primary colour', style: { color: 'var(--io-color-primary)' } },
    },
  ],
};

export const iconStoryInheritSize: Story<'io-icon'> = {
  state: { properties: { name: 'search', size: 'inherit' } },
  generator: () => [
    {
      tag: 'span' as const,
      properties: { style: { fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' } },
      children: [
        { tag: 'io-icon' as const, properties: { name: 'search', size: 'inherit' as const, label: 'search' } },
        '12px',
      ],
    },
    {
      tag: 'span' as const,
      properties: { style: { fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '4px' } },
      children: [
        { tag: 'io-icon' as const, properties: { name: 'search', size: 'inherit' as const, label: 'search' } },
        '16px',
      ],
    },
    {
      tag: 'span' as const,
      properties: { style: { fontSize: '24px', display: 'inline-flex', alignItems: 'center', gap: '4px' } },
      children: [
        { tag: 'io-icon' as const, properties: { name: 'search', size: 'inherit' as const, label: 'search' } },
        '24px',
      ],
    },
  ],
};

export const iconStoryFixedWidth: Story<'io-icon'> = {
  state: { properties: { name: 'search', fixedWidth: true } },
  generator: () =>
    (['check', 'alert-triangle', 'info', 'x-circle', 'settings'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md' as const, fixedWidth: true, label: name },
    })),
};

const FORM_ICONS = [
  'save', 'save-all', 'save-off',
  'pen-line', 'pencil', 'square-pen', 'pen-off',
  'trash', 'eraser', 'copy-plus', 'files', 'square-check-big',
] as const;

const WYSIWYG_FORMAT_ICONS = [
  'bold', 'italic', 'underline', 'strikethrough',
  'code', 'code-2', 'highlighter', 'remove-formatting',
] as const;

const WYSIWYG_STRUCTURE_ICONS = [
  'heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-6',
  'quote', 'text-quote',
  'list', 'list-ordered', 'list-checks', 'list-todo',
  'indent-increase', 'indent-decrease', 'separator-horizontal',
] as const;

const WYSIWYG_INSERT_ICONS = [
  'link', 'unlink', 'image', 'table', 'paperclip', 'square-code',
] as const;

const WYSIWYG_TABLE_ICONS = [
  'table-cells-merge', 'table-cells-split',
  'table-columns-split', 'table-rows-split',
  'table-config', 'table-properties',
] as const;

const WYSIWYG_HISTORY_ICONS = [
  'undo-2', 'redo-2',
  'align-left', 'align-center', 'align-right', 'align-justify',
  'spell-check-2', 'text-cursor',
] as const;

export const iconStoryFormActions: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    FORM_ICONS.map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryWysiwygFormat: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    WYSIWYG_FORMAT_ICONS.map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryWysiwygStructure: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    WYSIWYG_STRUCTURE_ICONS.map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryWysiwygInsert: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    WYSIWYG_INSERT_ICONS.map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryWysiwygTables: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    WYSIWYG_TABLE_ICONS.map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryWysiwygHistory: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    WYSIWYG_HISTORY_ICONS.map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryAccessibility: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['accessibility','closed-caption','contrast','ear','ear-off','glasses','hand','person-standing','scan-eye','zoom-in','zoom-out'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryAccountsAccess: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['award','badge','badge-alert','ban','bell-dot','bell-minus','bell-off','bell-plus','bell-ring','bookmark','bookmark-check','bookmark-minus','bookmark-plus','bookmark-x','circle-user','circle-user-round','cog','contact','contact-round','credit-card','fingerprint-pattern','flag','flag-off','gift','handshake','id-card','inbox','key','key-round','log-in','settings-2','share','share-2','shield','shield-ban','shield-check','shield-off','shield-x','sliders-horizontal','sliders-vertical','thumbs-down','thumbs-up','toggle-left','toggle-right','user-check','user-cog','user-minus','user-round','users','users-round','wallet','wallet-cards','waypoints','webhook'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryArrows: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['arrow-big-down','arrow-big-left','arrow-big-right','arrow-big-up','arrow-down-left','arrow-down-right','arrow-down-up','arrow-left-right','arrow-up-left','arrow-up-right','chevron-first','chevron-last','chevrons-down','chevrons-left','chevrons-left-right','chevrons-right','chevrons-up','circle-arrow-down','circle-arrow-left','circle-arrow-right','circle-arrow-up','corner-down-left','corner-down-right','corner-up-left','corner-up-right','move-down','move-left','move-right','move-up','redo','refresh-ccw','rotate-ccw','rotate-cw','shrink','trending-down','trending-up','trending-up-down','undo'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryBuildings: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['building','building-2','factory','hospital','hotel','landmark','school','store','university','warehouse'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryCharts: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['chart-area','chart-bar','chart-bar-big','chart-candlestick','chart-column','chart-column-big','chart-gantt','chart-line','chart-network','chart-pie','chart-scatter','folder-kanban','kanban'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryDesign: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['crop','frame','layers','layers-2','layout-dashboard','layout-grid','layout-list','layout-panel-left','palette','pencil-ruler','proportions','ruler','sparkles','swatch-book','view','wand','wand-sparkles'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryDevelopment: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['binary','blocks','bot','braces','bug','bug-off','command','database','database-backup','database-search','database-zap','git-branch','git-commit-horizontal','git-fork','git-merge','git-pull-request','hard-drive','keyboard','package','package-open','puzzle','rocket','router','rss','server','server-cog','server-crash','terminal','variable','workflow'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryFiles: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['archive','archive-restore','archive-x','file','file-chart-column','file-chart-pie','file-check','file-clock','file-search','file-spreadsheet','file-text','file-user','file-x','folder','folder-check','folder-open','folder-search','import','sheet'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryFinance: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['badge-dollar-sign','badge-euro','badge-percent','banknote','banknote-arrow-down','banknote-arrow-up','circle-dollar-sign','circle-percent','dollar-sign','euro','hand-coins','percent','piggy-bank','pound-sterling','receipt','receipt-text','scale'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryLayout: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['columns-2','columns-3','columns-4','ellipsis','ellipsis-vertical','fullscreen','grid-2x2','grid-3x3','grip','grip-horizontal','grip-vertical','maximize','minimize','panel-bottom','panel-left','panel-right','panel-top','rows-2','rows-3','separator-vertical'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryMail: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['forward','mail-check','mail-open','mail-plus','mail-x','mailbox','mails','reply','reply-all','send','send-horizontal'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryMultimedia: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['headphones','megaphone','megaphone-off','mic','mic-off','music','pause','play','podcast','radio','speaker','tv','video','video-off','volume','volume-x'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryNavigation: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['compass','earth','globe','locate','map','map-pinned','navigation','route'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryNotifications: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['circle-check-big','octagon-alert','octagon-x'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryPhotography: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['aperture','camera','camera-off','focus','gallery-horizontal','gallery-vertical'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStorySecurity: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['door-closed','door-open','lock-keyhole','lock-keyhole-open','lock-open','radar','vault'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryText: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['baseline','clipboard','clipboard-check','clipboard-list','clipboard-paste','clipboard-plus','clipboard-type','copy-check','copy-x','hash','languages','notebook','notepad-text','replace','replace-all','scroll-text','section','signature','sticky-note','subscript','superscript','whole-word'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryTime: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['alarm-clock','alarm-clock-check','alarm-clock-off','calendar-check','calendar-clock','calendar-days','calendar-minus','calendar-off','calendar-plus','calendar-range','calendar-x','clock-alert','clock-check','history','hourglass','timer','timer-off','timer-reset','watch'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryTransportation: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['bike','bus','bus-front','car','car-front','ev-charger','fuel','gauge','helicopter','plane','ship','train-front','truck','van'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryTravel: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['luggage','map-pin-check','tent'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryWeather: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    (['cloud','cloud-rain','cloud-snow','flame','moon-star','snowflake','sun','thermometer','tornado','umbrella','wind','zap','zap-off'] as const).map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconPropDefinitions: PropDefinition[] = [
  {
    name: 'name',
    type: 'select',
    options: [...IO_ICON_NAMES],
    defaultValue: 'search',
    description: 'The icon to render. Must be one of the registered icon names.',
  },
  {
    name: 'color',
    type: 'select',
    options: ['inherit', 'primary', 'contrast-higher', 'contrast-high', 'contrast-medium', 'contrast-lower', 'success', 'warning', 'error', 'info'],
    defaultValue: 'inherit',
    description: 'Semantic color token applied to the icon. inherit uses CSS currentColor from the parent element.',
  },
  {
    name: 'size',
    type: 'select',
    options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'inherit'],
    defaultValue: 'md',
    description: 'Rendered size of the icon. "inherit" scales the icon to match the parent element\'s font-size.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
    description: 'Accessible label. When set, the icon renders with role="img" and aria-label. Omit for decorative icons.',
  },
  {
    name: 'fixedWidth',
    type: 'boolean',
    defaultValue: false,
    description: 'Forces the host element width to match the icon size. Use in nav menus and icon lists for consistent column alignment.',
  },
  {
    name: 'flip',
    type: 'boolean',
    defaultValue: false,
    description: 'Mirrors the icon horizontally via scaleX(-1). Use for explicit RTL overrides.',
  },
];

export const iconStoryColors: Story<'io-icon'> = {
  state: { properties: { name: 'heart', size: 'md' } },
  generator: () =>
    (['primary', 'contrast-higher', 'contrast-high', 'contrast-medium', 'contrast-lower', 'success', 'warning', 'error', 'info'] as const).map(
      (color) => ({ tag: 'io-icon' as const, properties: { name: 'heart', size: 'md', color }, children: [] }),
    ),
};
