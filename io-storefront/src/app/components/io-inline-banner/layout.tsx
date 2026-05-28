'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-inline-banner/configurator' },
  { label: 'Examples', href: '/components/io-inline-banner/examples' },
  { label: 'Usage', href: '/components/io-inline-banner/usage' },
  { label: 'Accessibility', href: '/components/io-inline-banner/accessibility' },
  { label: 'API', href: '/components/io-inline-banner/api' },
];

export default function IoInlineBannerLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-inline-banner');

  return (
    <div>
      <PageHeader
        title="Inline Banner"
        description="Inline content-level notification with four severity variants and optional dismiss. Sits within the document flow to provide contextual feedback inside forms, cards, and content sections."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-inline-banner" />
    </div>
  );
}
