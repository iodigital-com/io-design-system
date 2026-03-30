'use client';

import type { ReactNode } from 'react';
import { RelatedComponents } from '@/components/RelatedComponents';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-spinner/configurator' },
  { label: 'Examples', href: '/components/io-spinner/examples' },
  { label: 'Usage', href: '/components/io-spinner/usage' },
  { label: 'Accessibility', href: '/components/io-spinner/accessibility' },
  { label: 'API', href: '/components/io-spinner/api' },
];

export default function IoSpinnerLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Spinner"
        description="Signals a loading or processing state. Three sizes, three colour modes including current to inherit parent colour."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-spinner" />
    </div>
  );
}
