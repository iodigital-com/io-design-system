'use client';

import type { ReactNode } from 'react';
import { RelatedComponents } from '@/components/RelatedComponents';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-tag/configurator' },
  { label: 'Examples', href: '/components/io-tag/examples' },
  { label: 'Usage', href: '/components/io-tag/usage' },
  { label: 'Accessibility', href: '/components/io-tag/accessibility' },
  { label: 'API', href: '/components/io-tag/api' },
];

export default function IoTagLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Tag"
        description="Toggleable filter chip or removable label. Renders as a button with aria-pressed — emits ioToggle and ioRemove."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-tag" />
    </div>
  );
}
