'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-tabs-bar/configurator' },
  { label: 'Examples', href: '/components/io-tabs-bar/examples' },
  { label: 'Usage', href: '/components/io-tabs-bar/usage' },
  { label: 'Accessibility', href: '/components/io-tabs-bar/accessibility' },
  { label: 'API', href: '/components/io-tabs-bar/api' },
];

export default function IoTabsBarLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Tabs Bar"
        description="Standalone tab navigation bar without panel management. Use with router-driven applications where tab content is controlled by URL navigation."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-tabs-bar" />
    </div>
  );
}
