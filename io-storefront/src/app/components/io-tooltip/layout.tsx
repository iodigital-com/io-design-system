'use client';

import type { ReactNode } from 'react';
import { RelatedComponents } from '@/components/RelatedComponents';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-tooltip/configurator' },
  { label: 'Examples', href: '/components/io-tooltip/examples' },
  { label: 'Usage', href: '/components/io-tooltip/usage' },
  { label: 'Accessibility', href: '/components/io-tooltip/accessibility' },
  { label: 'API', href: '/components/io-tooltip/api' },
];

export default function IoTooltipLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Tooltip"
        description="Surfaces brief contextual help on hover or focus. Positioned automatically to stay within the viewport."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-tooltip" />
    </div>
  );
}
