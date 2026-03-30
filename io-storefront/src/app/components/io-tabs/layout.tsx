'use client';

import type { ReactNode } from 'react';
import { RelatedComponents } from '@/components/RelatedComponents';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-tabs/configurator' },
  { label: 'Examples', href: '/components/io-tabs/examples' },
  { label: 'Usage', href: '/components/io-tabs/usage' },
  { label: 'Accessibility', href: '/components/io-tabs/accessibility' },
  { label: 'API', href: '/components/io-tabs/api' },
];

export default function IoTabsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Tabs"
        description="Organises content into named panels. Keyboard-navigable with roving tabindex and full ARIA tab role semantics."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-tabs" />
    </div>
  );
}
