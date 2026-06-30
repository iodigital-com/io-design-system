'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-link-tile/configurator' },
  { label: 'Examples', href: '/components/io-link-tile/examples' },
  { label: 'Usage', href: '/components/io-link-tile/usage' },
  { label: 'Accessibility', href: '/components/io-link-tile/accessibility' },
  { label: 'API', href: '/components/io-link-tile/api' },
];

export default function IoLinkTileLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Link Tile"
        description="Media tile primitive with an embedded link action. Bundles media, label, description, gradient overlay, and focus delegation in a single responsive card."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-link-tile" />
    </div>
  );
}
