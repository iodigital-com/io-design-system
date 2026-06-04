'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-icon/configurator' },
  { label: 'Examples', href: '/components/io-icon/examples' },
  { label: 'Usage', href: '/components/io-icon/usage' },
  { label: 'Accessibility', href: '/components/io-icon/accessibility' },
  { label: 'API', href: '/components/io-icon/api' },
];

export default function IoIconLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-icon');

  return (
    <div>
      <PageHeader
        title="Icon"
        description="Token-driven SVG icon set derived from Lucide. Renders at five sizes, inherits currentColor, and supports accessible labelling for meaningful icons."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-icon" />
    </div>
  );
}
