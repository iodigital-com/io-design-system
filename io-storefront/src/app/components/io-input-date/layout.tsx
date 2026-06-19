'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-input-date/configurator' },
  { label: 'Examples', href: '/components/io-input-date/examples' },
  { label: 'Usage', href: '/components/io-input-date/usage' },
  { label: 'Accessibility', href: '/components/io-input-date/accessibility' },
  { label: 'API', href: '/components/io-input-date/api' },
];

export default function IoInputDateLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-input-date');

  return (
    <div>
      <PageHeader
        title="Input Date"
        description="Native date picker input with floating label, min/max constraints, and a calendar icon. Underline-only design."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-input-date" />
    </div>
  );
}
