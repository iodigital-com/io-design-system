'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-button-group/configurator' },
  { label: 'Examples', href: '/components/io-button-group/examples' },
  { label: 'Usage', href: '/components/io-button-group/usage' },
  { label: 'Accessibility', href: '/components/io-button-group/accessibility' },
  { label: 'API', href: '/components/io-button-group/api' },
];

export default function IoButtonGroupLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Button Group"
        description="Segmented control for single or multi-select filtering. Manages radio or checkbox semantics, roving tabindex keyboard navigation, and shared-border layout automatically."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-button-group" />
    </div>
  );
}
