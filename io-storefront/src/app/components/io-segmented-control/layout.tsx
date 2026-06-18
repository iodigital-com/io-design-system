'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-segmented-control/configurator' },
  { label: 'Examples', href: '/components/io-segmented-control/examples' },
  { label: 'Usage', href: '/components/io-segmented-control/usage' },
  { label: 'Accessibility', href: '/components/io-segmented-control/accessibility' },
  { label: 'API', href: '/components/io-segmented-control/api' },
];

export default function IoSegmentedControlLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Segmented Control"
        description="FACE-compliant exclusive-selection bar. A styled radio group with a unified horizontal bar layout. Use for switching between two to five mutually exclusive views or modes."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-segmented-control" />
    </div>
  );
}
