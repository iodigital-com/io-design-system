'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-ai-tag/configurator' },
  { label: 'Examples', href: '/components/io-ai-tag/examples' },
  { label: 'Usage', href: '/components/io-ai-tag/usage' },
  { label: 'Accessibility', href: '/components/io-ai-tag/accessibility' },
  { label: 'API', href: '/components/io-ai-tag/api' },
];

export default function IoAiTagLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-ai-tag');

  return (
    <div>
      <PageHeader
        title="AI Tag"
        description="EU AI Act transparency disclosure badge. Signals AI-generated or AI-modified content with accessible abbreviation semantics."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-ai-tag" />
    </div>
  );
}
