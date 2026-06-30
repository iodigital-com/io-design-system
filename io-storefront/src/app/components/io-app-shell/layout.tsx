'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-app-shell/configurator' },
  { label: 'Examples', href: '/components/io-app-shell/examples' },
  { label: 'Usage', href: '/components/io-app-shell/usage' },
  { label: 'Accessibility', href: '/components/io-app-shell/accessibility' },
  { label: 'API', href: '/components/io-app-shell/api' },
];

export default function IoAppShellLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="App Shell"
        description="Full-page application shell with sticky header, collapsible sidebar navigation, optional secondary panel, and built-in accessibility features."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-app-shell" />
    </div>
  );
}
