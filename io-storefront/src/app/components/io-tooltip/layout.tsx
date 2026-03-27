'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-tooltip/configurator' },
  { label: 'Examples', href: '/components/io-tooltip/examples' },
  { label: 'Usage', href: '/components/io-tooltip/usage' },
  { label: 'Accessibility', href: '/components/io-tooltip/accessibility' },
  { label: 'API', href: '/components/io-tooltip/api' },
];

export default function IoTooltipLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Tooltip"
        description="Surfaces brief contextual help on hover or focus. Positioned automatically to stay within the viewport."
        tabs={TABS}
        category="Component"
      />
      {children}
    </div>
  );
}
