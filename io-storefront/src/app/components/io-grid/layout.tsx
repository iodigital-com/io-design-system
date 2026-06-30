'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-grid/configurator' },
  { label: 'Examples', href: '/components/io-grid/examples' },
  { label: 'Usage', href: '/components/io-grid/usage' },
  { label: 'Accessibility', href: '/components/io-grid/accessibility' },
  { label: 'API', href: '/components/io-grid/api' },
];

export default function IoGridLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Grid"
        description="12-column responsive CSS Grid layout primitive. Fluid gap tokens, column-span helpers, and light DOM output for unrestricted consumer styling."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-grid" />
    </div>
  );
}
