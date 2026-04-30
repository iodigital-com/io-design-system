'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-divider/configurator' },
  { label: 'Examples', href: '/components/io-divider/examples' },
  { label: 'Usage', href: '/components/io-divider/usage' },
  { label: 'Accessibility', href: '/components/io-divider/accessibility' },
  { label: 'API', href: '/components/io-divider/api' },
];

export default function IoDividerLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-divider');

  return (
    <div>
      <PageHeader
        title="Divider"
        description="Token-based visual separator between sections of content. Supports horizontal and vertical orientations, plus a labeled variant for 'or' / 'and' patterns."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-divider" />
    </div>
  );
}
