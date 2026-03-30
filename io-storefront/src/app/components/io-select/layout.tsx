'use client';

import type { ReactNode } from 'react';
import { RelatedComponents } from '@/components/RelatedComponents';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-select/configurator' },
  { label: 'Examples', href: '/components/io-select/examples' },
  { label: 'Usage', href: '/components/io-select/usage' },
  { label: 'Accessibility', href: '/components/io-select/accessibility' },
  { label: 'API', href: '/components/io-select/api' },
];

export default function IoSelectLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Select"
        description="Dropdown selection with a built-in label, placeholder, and error state. Pass options as an array of value/label objects."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-select" />
    </div>
  );
}
