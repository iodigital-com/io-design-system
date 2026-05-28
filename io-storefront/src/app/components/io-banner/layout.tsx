'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-banner/configurator' },
  { label: 'Examples', href: '/components/io-banner/examples' },
  { label: 'Usage', href: '/components/io-banner/usage' },
  { label: 'Accessibility', href: '/components/io-banner/accessibility' },
  { label: 'API', href: '/components/io-banner/api' },
];

export default function IoBannerLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-banner');

  return (
    <div>
      <PageHeader
        title="Banner"
        description="Full-width page-level notification strip with open/close control and four severity variants. Use for global feedback, system messages, and persistent announcements."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-banner" />
    </div>
  );
}
