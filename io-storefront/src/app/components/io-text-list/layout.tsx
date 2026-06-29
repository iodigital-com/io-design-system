'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-text-list/configurator' },
  { label: 'Examples', href: '/components/io-text-list/examples' },
  { label: 'Usage', href: '/components/io-text-list/usage' },
  { label: 'Accessibility', href: '/components/io-text-list/accessibility' },
  { label: 'API', href: '/components/io-text-list/api' },
];

export default function IoTextListLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-text-list');

  return (
    <div>
      <PageHeader
        title="Text List"
        description="Token-driven list typography primitive for ordered and unordered lists. Renders ul or ol with consistent font size and color from io design tokens."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-text-list" />
    </div>
  );
}
