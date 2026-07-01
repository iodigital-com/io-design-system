'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-link-pure/configurator' },
  { label: 'Examples', href: '/components/io-link-pure/examples' },
  { label: 'Usage', href: '/components/io-link-pure/usage' },
  { label: 'Accessibility', href: '/components/io-link-pure/accessibility' },
  { label: 'API', href: '/components/io-link-pure/api' },
];

export default function IoLinkPureLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Link Pure"
        description="Icon + label tertiary CTA link with no underline at rest. For navigation, card CTAs, list actions, and icon-only affordances."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-link-pure" />
    </div>
  );
}
