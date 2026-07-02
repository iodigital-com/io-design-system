'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-button-pure/configurator' },
  { label: 'Examples', href: '/components/io-button-pure/examples' },
  { label: 'Usage', href: '/components/io-button-pure/usage' },
  { label: 'Accessibility', href: '/components/io-button-pure/accessibility' },
  { label: 'API', href: '/components/io-button-pure/api' },
];

export default function IoButtonPureLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-button-pure');

  return (
    <div>
      <PageHeader
        title="Button Pure"
        description="Link-styled inline action button that inherits surrounding font-size. Supports active, underline, stretch, and icon alignment."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-button-pure" />
    </div>
  );
}
