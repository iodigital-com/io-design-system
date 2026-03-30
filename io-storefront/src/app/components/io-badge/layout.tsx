'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-badge/configurator' },
  { label: 'Examples', href: '/components/io-badge/examples' },
  { label: 'Usage', href: '/components/io-badge/usage' },
  { label: 'Accessibility', href: '/components/io-badge/accessibility' },
  { label: 'API', href: '/components/io-badge/api' },
];

export default function IoBadgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Badge"
        description="Labels status, counts, and categories inline. Nine variants map directly to io Digital's semantic and brand colour palette."
        tabs={TABS}
        category="Component"
        status="beta"
      />
      {children}
    </div>
  );
}
