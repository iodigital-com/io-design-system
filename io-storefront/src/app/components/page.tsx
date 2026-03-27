'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';

const COMPONENTS = [
  { name: 'Badge',    tag: 'io-badge',    href: '/components/io-badge/configurator',    description: 'Labels status, counts, and categories inline. Nine variants map directly to io Digital\'s semantic and brand colour palette.' },
  { name: 'Button',   tag: 'io-button',   href: '/components/io-button/configurator',   description: 'Handles primary interactions — form submissions, navigation, and confirmations. Three variants, ten brand colours, four sizes.' },
  { name: 'Checkbox', tag: 'io-checkbox', href: '/components/io-checkbox/configurator', description: 'Binary selection with a built-in label and indeterminate state. Emits checked value via ioChange.' },
  { name: 'Input',    tag: 'io-input',    href: '/components/io-input/configurator',    description: 'Single-line text entry. Built-in label, helper text, character count, and error state.' },
  { name: 'Link',     tag: 'io-link',     href: '/components/io-link/configurator',     description: 'Inline and standalone hyperlink. Three colour options, external link support, and an animated underline on hover.' },
  { name: 'Modal',    tag: 'io-modal',    href: '/components/io-modal/configurator',    description: 'Focuses attention on a critical task or confirmation. Rendered as a native <dialog> — focus trapping and ESC are built-in.' },
  { name: 'Radio',    tag: 'io-radio',    href: '/components/io-radio/configurator',    description: 'Single-select from a group. Built-in label, helper text, error state, and ioChange event.' },
  { name: 'Select',   tag: 'io-select',   href: '/components/io-select/configurator',   description: 'Dropdown selection with a built-in label, placeholder, and error state. Pass options as an array of objects.' },
  { name: 'Spinner',  tag: 'io-spinner',  href: '/components/io-spinner/configurator',  description: 'Signals a loading or processing state. Three sizes, three colour modes including current to inherit parent colour.' },
  { name: 'Tabs',     tag: 'io-tabs',     href: '/components/io-tabs/configurator',     description: 'Organises content into named panels. Keyboard-navigable with roving tabindex and full ARIA tab role semantics.' },
  { name: 'Tag',      tag: 'io-tag',      href: '/components/io-tag/configurator',      description: 'Toggleable filter chip or removable label. Renders as a <button> with aria-pressed.' },
  { name: 'Textarea', tag: 'io-textarea', href: '/components/io-textarea/configurator', description: 'Multi-line text entry with label, helper text, character count, error state, and three resize modes.' },
  { name: 'Toast',    tag: 'io-toast',    href: '/components/io-toast/configurator',    description: 'Delivers time-limited feedback after a user action. Queue multiple messages via addToast() — one visible at a time.' },
  { name: 'Tooltip',  tag: 'io-tooltip',  href: '/components/io-tooltip/configurator',  description: 'Surfaces brief contextual help on hover or focus. Positioned automatically to stay within the viewport.' },
];

export default function ComponentsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Components"
        description="15 production-ready Web Components. Each ships with a live configurator, full API reference, and code samples in HTML, React, Angular, and Vue."
        tabs={[]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COMPONENTS.map(({ name, tag, href, description }) => (
          <Link
            key={tag}
            href={href}
            className="p-5 rounded-lg transition-colors duration-200 cursor-pointer space-y-3"
            style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--io-bg-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--io-bg-raised)'; }}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-sm" style={{ color: 'var(--io-text-primary)' }}>
                {name}
              </p>
              <code
                className="text-[10px] px-1.5 py-0.5 rounded shrink-0"
                style={{
                  background: 'var(--io-accent-bg)',
                  color: 'var(--io-accent-text)',
                  fontFamily: 'ui-monospace, "Cascadia Mono", "Fira Code", monospace',
                }}
              >
                {tag}
              </code>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
              {description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
