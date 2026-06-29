'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

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
        description="Focuses attention on a critical task or confirmation. By default (preventTopLayer=true), the component manages its own backdrop, focus trap, and ESC key — identical behavior to the native dialog API but compatible with all JavaScript frameworks."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-modal" />
    </div>
  );
}
