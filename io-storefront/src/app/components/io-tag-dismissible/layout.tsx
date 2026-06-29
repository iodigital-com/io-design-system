'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-tag-dismissible/configurator' },
  { label: 'Examples', href: '/components/io-tag-dismissible/examples' },
  { label: 'Usage', href: '/components/io-tag-dismissible/usage' },
  { label: 'Accessibility', href: '/components/io-tag-dismissible/accessibility' },
  { label: 'API', href: '/components/io-tag-dismissible/api' },
];

export default function IoTagDismissibleLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Tag Dismissible"
        description="Display chip with a built-in dismiss button. Separate from io-tag to keep toggle and dismiss concerns distinct. 44x44 px minimum touch target (WCAG 2.5.8)."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-tag-dismissible" />
    </div>
  );
}
