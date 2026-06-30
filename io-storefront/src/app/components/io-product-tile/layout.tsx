'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-product-tile/configurator' },
  { label: 'Examples', href: '/components/io-product-tile/examples' },
  { label: 'Usage', href: '/components/io-product-tile/usage' },
  { label: 'Accessibility', href: '/components/io-product-tile/accessibility' },
  { label: 'API', href: '/components/io-product-tile/api' },
];

export default function IoProductTileLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-product-tile');

  return (
    <div>
      <PageHeader
        title="Product Tile"
        description="Commerce tile primitive for product listings. Heading, sale price with screen-reader-accessible original price, optional wishlist/like toggle, and image slot."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-product-tile" />
    </div>
  );
}
