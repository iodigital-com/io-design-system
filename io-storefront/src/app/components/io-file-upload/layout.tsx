'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-file-upload/configurator' },
  { label: 'Examples', href: '/components/io-file-upload/examples' },
  { label: 'Usage', href: '/components/io-file-upload/usage' },
  { label: 'Accessibility', href: '/components/io-file-upload/accessibility' },
  { label: 'API', href: '/components/io-file-upload/api' },
];

export default function IoFileUploadLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PageHeader
        title="File Upload"
        description="Drag-and-drop or click-to-browse file input with type/size validation, accessible live announcements, and a removable file list."
        tabs={TABS}
        category="Component"
      />
      {children}
      <RelatedComponents currentSlug="io-file-upload" />
    </div>
  );
}
