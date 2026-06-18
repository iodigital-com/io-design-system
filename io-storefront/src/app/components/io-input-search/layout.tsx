'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-input-search/configurator' },
  { label: 'Examples', href: '/components/io-input-search/examples' },
  { label: 'Usage', href: '/components/io-input-search/usage' },
  { label: 'Accessibility', href: '/components/io-input-search/accessibility' },
  { label: 'API', href: '/components/io-input-search/api' },
];

export default function IoInputSearchLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-input-search');

  return (
    <div>
      <PageHeader
        title="Input Search"
        description="Search field with a magnifier prefix and a clear button that appears when the field has a value. Underline-only design."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-input-search" />
    </div>
  );
}
