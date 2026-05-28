'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-inline-notification/configurator' },
  { label: 'Examples', href: '/components/io-inline-notification/examples' },
  { label: 'Usage', href: '/components/io-inline-notification/usage' },
  { label: 'Accessibility', href: '/components/io-inline-notification/accessibility' },
  { label: 'API', href: '/components/io-inline-notification/api' },
];

export default function IoInlineNotificationLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-inline-notification');

  return (
    <div>
      <PageHeader
        title="Inline Notification"
        description="Inline content-level notification with four severity variants and optional dismiss. Sits within the document flow to provide contextual feedback inside forms, cards, and content sections."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-inline-notification" />
    </div>
  );
}
