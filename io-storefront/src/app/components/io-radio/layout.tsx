'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-radio/configurator' },
  { label: 'Examples', href: '/components/io-radio/examples' },
  { label: 'Usage', href: '/components/io-radio/usage' },
  { label: 'Accessibility', href: '/components/io-radio/accessibility' },
  { label: 'API', href: '/components/io-radio/api' },
];

export default function IoRadioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Radio"
        description="Single-select from a group. Built-in label, helper text, error state, and ioChange event."
        tabs={TABS}
        category="Component"
      />
      {children}
    </div>
  );
}
