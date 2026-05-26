'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-text/configurator' },
  { label: 'Examples', href: '/components/io-text/examples' },
  { label: 'Usage', href: '/components/io-text/usage' },
  { label: 'Accessibility', href: '/components/io-text/accessibility' },
  { label: 'API', href: '/components/io-text/api' },
];

export default function IoTextLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-text');

  return (
    <div>
      <PageHeader
        title="Text"
        description="Light DOM typography primitive for body text. Renders semantic HTML (p, span, div, blockquote, time) with token-driven font size, weight, color, and alignment."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-text" />
    </div>
  );
}
