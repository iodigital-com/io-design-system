'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-form-field/configurator' },
  { label: 'Examples', href: '/components/io-form-field/examples' },
  { label: 'Usage', href: '/components/io-form-field/usage' },
  { label: 'Accessibility', href: '/components/io-form-field/accessibility' },
  { label: 'API', href: '/components/io-form-field/api' },
];

export default function IoFormFieldLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-form-field');

  return (
    <div>
      <PageHeader
        title="Form Field"
        description="Auto-wires label, helper text, and error text accessibility attributes for any slotted form control."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-form-field" />
    </div>
  );
}
