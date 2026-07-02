'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-button-tile/configurator' },
  { label: 'Examples', href: '/components/io-button-tile/examples' },
  { label: 'Usage', href: '/components/io-button-tile/usage' },
  { label: 'Accessibility', href: '/components/io-button-tile/accessibility' },
  { label: 'API', href: '/components/io-button-tile/api' },
];

export default function IoButtonTileLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Button Tile"
        description="Media tile primitive with an embedded button action. Use when the tile triggers a function rather than navigating to a URL."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-button-tile" />
    </div>
  );
}
