'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-input-password/configurator' },
  { label: 'Examples', href: '/components/io-input-password/examples' },
  { label: 'Usage', href: '/components/io-input-password/usage' },
  { label: 'Accessibility', href: '/components/io-input-password/accessibility' },
  { label: 'API', href: '/components/io-input-password/api' },
];

export default function IoInputPasswordLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-input-password');

  return (
    <div>
      <PageHeader
        title="Input Password"
        description="Password field with an eye/eye-off toggle to reveal or hide the entered value. Underline-only design."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-input-password" />
    </div>
  );
}
