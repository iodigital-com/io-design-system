'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-textarea/configurator' },
  { label: 'Examples', href: '/components/io-textarea/examples' },
  { label: 'Usage', href: '/components/io-textarea/usage' },
  { label: 'Accessibility', href: '/components/io-textarea/accessibility' },
  { label: 'API', href: '/components/io-textarea/api' },
];

export default function IoTextareaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Textarea"
        description="Multi-line text entry with label, helper text, character count, error state, and three resize modes."
        tabs={TABS}
        category="Component"
      />
      {children}
    </div>
  );
}
