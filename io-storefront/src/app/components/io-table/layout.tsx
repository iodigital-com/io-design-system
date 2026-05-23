'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-table/configurator' },
  { label: 'Examples', href: '/components/io-table/examples' },
  { label: 'Usage', href: '/components/io-table/usage' },
  { label: 'Accessibility', href: '/components/io-table/accessibility' },
  { label: 'API', href: '/components/io-table/api' },
];

export default function IoTableLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Table"
        description="Accessible data table with optional sortable columns and row selection. Supports sticky headers, selectable rows, and a JavaScript data API."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-table" />
    </div>
  );
}
