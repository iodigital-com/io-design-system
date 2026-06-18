'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-sheet/configurator' },
  { label: 'Examples', href: '/components/io-sheet/examples' },
  { label: 'Info', href: '/components/io-sheet/info' },
  { label: 'Accessibility', href: '/components/io-sheet/accessibility' },
  { label: 'API', href: '/components/io-sheet/api' },
];

export default function IoSheetLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Sheet"
        description="Bottom sheet overlay that slides up from the bottom of the viewport. Focus trap, backdrop dismiss, and Escape key. Use for contextual actions and secondary content."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-sheet" />
    </div>
  );
}
