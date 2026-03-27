'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-checkbox/configurator' },
  { label: 'Examples', href: '/components/io-checkbox/examples' },
  { label: 'Usage', href: '/components/io-checkbox/usage' },
  { label: 'Accessibility', href: '/components/io-checkbox/accessibility' },
  { label: 'API', href: '/components/io-checkbox/api' },
];

export default function IoCheckboxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Checkbox"
        description="Binary selection with a built-in label and indeterminate state. Emits checked value via ioChange."
        tabs={TABS}
        category="Component"
      />
      {children}
    </div>
  );
}
