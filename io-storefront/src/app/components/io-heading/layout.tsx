'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-heading/configurator' },
  { label: 'Examples', href: '/components/io-heading/examples' },
  { label: 'Usage', href: '/components/io-heading/usage' },
  { label: 'Accessibility', href: '/components/io-heading/accessibility' },
  { label: 'API', href: '/components/io-heading/api' },
];

export default function IoHeadingLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-heading');

  return (
    <div>
      <PageHeader
        title="Heading"
        description="Light DOM typography primitive for headings. Renders h1–h6 with token-driven font size, weight, color, and alignment. The tag prop controls document outline semantics."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-heading" />
    </div>
  );
}
