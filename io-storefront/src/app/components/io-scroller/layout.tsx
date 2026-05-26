'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-scroller/configurator' },
  { label: 'Examples', href: '/components/io-scroller/examples' },
  { label: 'Usage', href: '/components/io-scroller/usage' },
  { label: 'Accessibility', href: '/components/io-scroller/accessibility' },
  { label: 'API', href: '/components/io-scroller/api' },
];

export default function IoScrollerLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Scroller"
        description="Horizontally or vertically scrollable content wrapper with gradient fade indicators at each edge. Use for tab bars, chip groups, image strips, and any content that overflows its container."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-scroller" />
    </div>
  );
}
