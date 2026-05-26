'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-alert/configurator' },
];

export default function IoAlertLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-alert');

  return (
    <div>
      <PageHeader
        title="Alert"
        description="Inline notification for info, success, warning, and error states. Supports an optional heading, dismissible button, and screen-reader-friendly live region announcements."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-alert" />
    </div>
  );
}
