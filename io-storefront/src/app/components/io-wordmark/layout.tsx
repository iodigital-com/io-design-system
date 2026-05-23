'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-wordmark/configurator' },
  { label: 'Examples', href: '/components/io-wordmark/examples' },
  { label: 'Usage', href: '/components/io-wordmark/usage' },
  { label: 'Accessibility', href: '/components/io-wordmark/accessibility' },
  { label: 'API', href: '/components/io-wordmark/api' },
];

export default function IoWordmarkLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-wordmark');

  return (
    <div>
      <PageHeader
        title="Wordmark"
        description='Brand wordmark rendering "io" in brand blue and "digital" in the current text colour. Token-driven sizes: sm, md, lg, xl.'
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-wordmark" />
    </div>
  );
}
