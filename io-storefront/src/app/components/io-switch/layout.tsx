'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-switch/configurator' },
  { label: 'Examples', href: '/components/io-switch/examples' },
  { label: 'Usage', href: '/components/io-switch/usage' },
  { label: 'Accessibility', href: '/components/io-switch/accessibility' },
  { label: 'API', href: '/components/io-switch/api' },
];

export default function IoSwitchLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Switch"
        description="Toggle switch for binary on/off settings. FACE form-associated component with role=switch and full keyboard navigation."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-switch" />
    </div>
  );
}
