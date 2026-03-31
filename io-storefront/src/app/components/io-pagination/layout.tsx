'use client';

import type { ReactNode } from 'react';
import { RelatedComponents } from '@/components/RelatedComponents';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-pagination/configurator' },
  { label: 'Examples', href: '/components/io-pagination/examples' },
  { label: 'Usage', href: '/components/io-pagination/usage' },
  { label: 'Accessibility', href: '/components/io-pagination/accessibility' },
  { label: 'API', href: '/components/io-pagination/api' },
];

export default function IoPaginationLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Pagination"
        description="Circular page controls - outlined numbers, active page in brand blue, beige prev/next arrows with ellipsis for large sets."
        tabs={TABS}
        category="Component"
        status="beta"
      />
      {children}
      <RelatedComponents currentSlug="io-pagination" />
    </div>
  );
}
