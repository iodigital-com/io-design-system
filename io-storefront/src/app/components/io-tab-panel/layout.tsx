'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-tab-panel/configurator' },
  { label: 'Examples', href: '/components/io-tab-panel/examples' },
  { label: 'Usage', href: '/components/io-tab-panel/usage' },
  { label: 'Accessibility', href: '/components/io-tab-panel/accessibility' },
  { label: 'API', href: '/components/io-tab-panel/api' },
];

export default function IoTabPanelLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Tab Panel"
        description="Companion panel component for io-tabs. Declares a tab pane with a label prop — io-tabs auto-wires all ARIA relationships, removing the need for manual panelIds management."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-tab-panel" />
    </div>
  );
}
