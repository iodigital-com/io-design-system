'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-accordion/configurator' },
  { label: 'Examples', href: '/components/io-accordion/examples' },
  { label: 'Usage', href: '/components/io-accordion/usage' },
  { label: 'Accessibility', href: '/components/io-accordion/accessibility' },
  { label: 'API', href: '/components/io-accordion/api' },
];

export default function IoAccordionLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-accordion');

  return (
    <div>
      <PageHeader
        title="Accordion"
        description="Disclosure with one accordion per content section, animated plus/minus icon, and heading slot support."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-accordion" />
    </div>
  );
}
