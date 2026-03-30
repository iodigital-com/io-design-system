'use client';

import type { ReactNode } from 'react';
import { RelatedComponents } from '@/components/RelatedComponents';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-input/configurator' },
  { label: 'Examples', href: '/components/io-input/examples' },
  { label: 'Usage', href: '/components/io-input/usage' },
  { label: 'Accessibility', href: '/components/io-input/accessibility' },
  { label: 'API', href: '/components/io-input/api' },
];

export default function IoInputLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Input"
        description="Single-line text entry. Built-in label, helper text, character count, and error state. Underline-only design."
        tabs={TABS}
        category="Component"
        status="beta"
      />
      {children}
      <RelatedComponents currentSlug="io-input" />
    </div>
  );
}
