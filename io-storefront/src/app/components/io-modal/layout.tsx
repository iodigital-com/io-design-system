'use client';

import type { ReactNode } from 'react';
import { RelatedComponents } from '@/components/RelatedComponents';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-modal/configurator' },
  { label: 'Examples', href: '/components/io-modal/examples' },
  { label: 'Usage', href: '/components/io-modal/usage' },
  { label: 'Accessibility', href: '/components/io-modal/accessibility' },
  { label: 'API', href: '/components/io-modal/api' },
];

export default function IoModalLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Modal"
        description="Focuses attention on a critical task or confirmation. Rendered as a native dialog element — focus trapping and ESC are built-in."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-modal" />
    </div>
  );
}
