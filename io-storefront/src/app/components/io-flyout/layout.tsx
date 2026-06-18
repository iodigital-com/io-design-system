'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-flyout/configurator' },
  { label: 'Examples', href: '/components/io-flyout/examples' },
  { label: 'Info', href: '/components/io-flyout/info' },
  { label: 'Accessibility', href: '/components/io-flyout/accessibility' },
  { label: 'API', href: '/components/io-flyout/api' },
];

export default function IoFlyoutLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Flyout"
        description="Side-anchored flyout panel for navigation menus and complex UI panels. Fills the gap between io-popover (small) and io-drawer (full height)."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-flyout" />
    </div>
  );
}
