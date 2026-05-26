'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-popover/configurator' },
  { label: 'Examples', href: '/components/io-popover/examples' },
  { label: 'Usage', href: '/components/io-popover/usage' },
  { label: 'Accessibility', href: '/components/io-popover/accessibility' },
  { label: 'API', href: '/components/io-popover/api' },
];

export default function IoPopoverLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Popover"
        description="Click-triggered floating content panel. Uses the native Popover API where available with a manual positioning fallback."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-popover" />
    </div>
  );
}
