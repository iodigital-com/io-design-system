'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-skeleton/configurator' },
  { label: 'Examples', href: '/components/io-skeleton/examples' },
  { label: 'Usage', href: '/components/io-skeleton/usage' },
  { label: 'Accessibility', href: '/components/io-skeleton/accessibility' },
  { label: 'API', href: '/components/io-skeleton/api' },
];

export default function IoSkeletonLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Skeleton"
        description="Animated loading placeholder. Use while async content loads to communicate activity without a spinner. Supports text, circular, rectangular, and rounded shape variants."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-skeleton" />
    </div>
  );
}
