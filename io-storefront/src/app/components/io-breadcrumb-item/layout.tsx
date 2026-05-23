'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Examples', href: '/components/io-breadcrumb-item/examples' },
  { label: 'Usage', href: '/components/io-breadcrumb-item/usage' },
  { label: 'Accessibility', href: '/components/io-breadcrumb-item/accessibility' },
  { label: 'API', href: '/components/io-breadcrumb-item/api' },
];

export default function IoBreadcrumbItemLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-breadcrumb-item');

  return (
    <div>
      <PageHeader
        title="Breadcrumb Item"
        description="Individual breadcrumb item sub-component used inside io-breadcrumb. Renders as a link when href is provided, or as a plain span when current."
        tabs={TABS}
        category="Sub-component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-breadcrumb-item" />
    </div>
  );
}
