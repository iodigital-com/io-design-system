'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-radio-group/configurator' },
  { label: 'Examples', href: '/components/io-radio-group/examples' },
  { label: 'Usage', href: '/components/io-radio-group/usage' },
  { label: 'Accessibility', href: '/components/io-radio-group/accessibility' },
  { label: 'API', href: '/components/io-radio-group/api' },
];

export default function IoRadioGroupLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Radio Group"
        description="Wraps io-radio buttons in a semantic fieldset with a shared legend, name and value propagation, and a group-level change event."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-radio-group" />
    </div>
  );
}
