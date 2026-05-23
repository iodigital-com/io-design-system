'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-drawer/configurator' },
  { label: 'Examples', href: '/components/io-drawer/examples' },
  { label: 'Usage', href: '/components/io-drawer/usage' },
  { label: 'Accessibility', href: '/components/io-drawer/accessibility' },
  { label: 'API', href: '/components/io-drawer/api' },
];

export default function IoDrawerLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Drawer"
        description="Slide-out overlay panel attached to a screen edge. Built on the native dialog element — focus trapping and ESC are built-in."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-drawer" />
    </div>
  );
}
