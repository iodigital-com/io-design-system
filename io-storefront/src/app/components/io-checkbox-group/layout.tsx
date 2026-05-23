'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-checkbox-group/configurator' },
  { label: 'Examples', href: '/components/io-checkbox-group/examples' },
  { label: 'Usage', href: '/components/io-checkbox-group/usage' },
  { label: 'Accessibility', href: '/components/io-checkbox-group/accessibility' },
  { label: 'API', href: '/components/io-checkbox-group/api' },
];

export default function IoCheckboxGroupLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Checkbox Group"
        description="Wraps io-checkbox items in a semantic fieldset with a shared legend, name propagation, and a group-level change event."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-checkbox-group" />
    </div>
  );
}
