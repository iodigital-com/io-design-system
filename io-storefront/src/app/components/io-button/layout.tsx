'use client';

import type { ReactNode } from 'react';
import { RelatedComponents } from '@/components/RelatedComponents';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-button/configurator' },
  { label: 'Examples', href: '/components/io-button/examples' },
  { label: 'Usage', href: '/components/io-button/usage' },
  { label: 'Accessibility', href: '/components/io-button/accessibility' },
  { label: 'API', href: '/components/io-button/api' },
];

export default function IoButtonLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Button"
        description="Handles primary interactions — form submissions, navigation, and confirmations. Three variants, ten brand colours, four sizes."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-button" />
    </div>
  );
}
