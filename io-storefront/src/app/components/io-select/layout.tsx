'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-select/configurator' },
  { label: 'Examples', href: '/components/io-select/examples' },
  { label: 'Usage', href: '/components/io-select/usage' },
  { label: 'Accessibility', href: '/components/io-select/accessibility' },
  { label: 'API', href: '/components/io-select/api' },
];

export default function IoSelectLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-select');

  return (
    <div>
      <PageHeader
        title="Select"
        description="Dropdown selection with a built-in label, placeholder, and error state. Set custom for a fully accessible ARIA combobox with optional multi-select and search filter."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-select" />
    </div>
  );
}
