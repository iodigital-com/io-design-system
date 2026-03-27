'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-link/configurator' },
  { label: 'Examples', href: '/components/io-link/examples' },
  { label: 'Usage', href: '/components/io-link/usage' },
  { label: 'Accessibility', href: '/components/io-link/accessibility' },
  { label: 'API', href: '/components/io-link/api' },
];

export default function IoLinkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Link"
        description="Inline and standalone hyperlink. Three colour options, external link support, and an animated underline on hover."
        tabs={TABS}
        category="Component"
      />
      {children}
    </div>
  );
}
