'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-flag/configurator' },
  { label: 'Examples', href: '/components/io-flag/examples' },
  { label: 'Usage', href: '/components/io-flag/usage' },
  { label: 'Accessibility', href: '/components/io-flag/accessibility' },
  { label: 'API', href: '/components/io-flag/api' },
];

export default function IoFlagLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-flag');

  return (
    <div>
      <PageHeader
        title="Flag"
        description="Country flag indicator for international UI. Covers EU member states and key client regions. Lazy-loaded from flagcdn.com."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-flag" />
    </div>
  );
}
