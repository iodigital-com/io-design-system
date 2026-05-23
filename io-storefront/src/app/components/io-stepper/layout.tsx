'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-stepper/configurator' },
  { label: 'Examples', href: '/components/io-stepper/examples' },
  { label: 'Usage', href: '/components/io-stepper/usage' },
  { label: 'Accessibility', href: '/components/io-stepper/accessibility' },
  { label: 'API', href: '/components/io-stepper/api' },
];

export default function IoStepperLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-stepper');

  return (
    <div>
      <PageHeader
        title="Stepper"
        description="Guides users through a multi-step process. Shows progress at a glance with complete, current, and upcoming states in horizontal or vertical orientation."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-stepper" />
    </div>
  );
}
