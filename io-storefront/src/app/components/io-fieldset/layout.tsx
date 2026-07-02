'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-fieldset/configurator' },
  { label: 'Examples', href: '/components/io-fieldset/examples' },
  { label: 'Usage', href: '/components/io-fieldset/usage' },
  { label: 'Accessibility', href: '/components/io-fieldset/accessibility' },
  { label: 'API', href: '/components/io-fieldset/api' },
];

export default function IoFieldsetLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-fieldset');

  return (
    <div>
      <PageHeader
        title="Fieldset"
        description="Generic fieldset primitive for grouping mixed form controls or content sections under a shared legend. Use when io-checkbox-group or io-radio-group do not fit."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-fieldset" />
    </div>
  );
}
