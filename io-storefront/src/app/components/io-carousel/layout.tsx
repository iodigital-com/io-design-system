'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-carousel/configurator' },
  { label: 'Examples', href: '/components/io-carousel/examples' },
  { label: 'Usage', href: '/components/io-carousel/usage' },
  { label: 'Accessibility', href: '/components/io-carousel/accessibility' },
  { label: 'API', href: '/components/io-carousel/api' },
];

export default function IoCarouselLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-carousel');

  return (
    <div>
      <PageHeader
        title="Carousel"
        description="Generic horizontally scrollable container with prev/next navigation, drag-to-scroll, and a custom scrollbar. Inner content is slotted — put any HTML you need inside."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-carousel" />
    </div>
  );
}
