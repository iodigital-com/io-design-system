'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-breadcrumb/configurator' },
  { label: 'Examples', href: '/components/io-breadcrumb/examples' },
  { label: 'Usage', href: '/components/io-breadcrumb/usage' },
  { label: 'Accessibility', href: '/components/io-breadcrumb/accessibility' },
  { label: 'API', href: '/components/io-breadcrumb/api' },
];

export default function IoBreadcrumbLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-breadcrumb');

  return (
    <div>
      <PageHeader
        title="Breadcrumb"
        description="Breadcrumb navigation for hierarchical orientation. Supports chevron and slash separators, and collapses long paths behind an expand button."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-breadcrumb" />
    </div>
  );
}
