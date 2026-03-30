'use client';

import type { ReactNode } from 'react';
import { RelatedComponents } from '@/components/RelatedComponents';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-toast/configurator' },
  { label: 'Examples', href: '/components/io-toast/examples' },
  { label: 'Usage', href: '/components/io-toast/usage' },
  { label: 'Accessibility', href: '/components/io-toast/accessibility' },
  { label: 'API', href: '/components/io-toast/api' },
];

export default function IoToastLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Toast"
        description="Delivers time-limited feedback after a user action. Queue multiple messages via addToast() — one visible at a time."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-toast" />
    </div>
  );
}
