'use client';

import type { ReactNode } from 'react';
import { RelatedComponents } from '@/components/RelatedComponents';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-accordion/configurator' },
  { label: 'Examples', href: '/components/io-accordion/examples' },
  { label: 'Usage', href: '/components/io-accordion/usage' },
  { label: 'Accessibility', href: '/components/io-accordion/accessibility' },
  { label: 'API', href: '/components/io-accordion/api' },
];

export default function IoAccordionLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Accordion"
        description="PDS-style disclosure with one accordion per content section, animated plus/minus icon, and heading slot support."
        tabs={TABS}
        category="Component"
        status="beta"
      />
      {children}
      <RelatedComponents currentSlug="io-accordion" />
    </div>
  );
}
