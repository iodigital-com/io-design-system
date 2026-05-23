'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-progress/configurator' },
  { label: 'Examples', href: '/components/io-progress/examples' },
  { label: 'Usage', href: '/components/io-progress/usage' },
  { label: 'Accessibility', href: '/components/io-progress/accessibility' },
  { label: 'API', href: '/components/io-progress/api' },
];

export default function IoProgressLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Progress"
        description="Linear progress bar. Use for file uploads, multi-step forms, and wizard flows. Supports five colour variants and three track sizes."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-progress" />
    </div>
  );
}
