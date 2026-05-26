'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-multi-select/configurator' },
  { label: 'Examples', href: '/components/io-multi-select/examples' },
  { label: 'Usage', href: '/components/io-multi-select/usage' },
  { label: 'Accessibility', href: '/components/io-multi-select/accessibility' },
  { label: 'API', href: '/components/io-multi-select/api' },
];

export default function IoMultiSelectLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-multi-select');

  return (
    <div>
      <PageHeader
        title="Multi Select"
        description="Dedicated multi-value select with removable chips, optional search filter, FACE form participation, and ARIA combobox/listbox pattern."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-multi-select" />
    </div>
  );
}
