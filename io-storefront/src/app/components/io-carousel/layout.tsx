'use client';

import type { ReactNode } from 'react';
import { RelatedComponents } from '@/components/RelatedComponents';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-carousel/configurator' },
  { label: 'Examples', href: '/components/io-carousel/examples' },
  { label: 'Usage', href: '/components/io-carousel/usage' },
  { label: 'Accessibility', href: '/components/io-carousel/accessibility' },
  { label: 'API', href: '/components/io-carousel/api' },
];

export default function IoCarouselLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Carousel"
        description="Horizontally scrollable content card slider with drag-to-scroll and prev/next navigation."
        tabs={TABS}
        category="Component"
        status="beta"
      />
      {children}
      <RelatedComponents currentSlug="io-carousel" />
    </div>
  );
}
