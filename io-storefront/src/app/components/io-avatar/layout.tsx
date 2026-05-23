'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-avatar/configurator' },
  { label: 'Examples', href: '/components/io-avatar/examples' },
  { label: 'Usage', href: '/components/io-avatar/usage' },
  { label: 'Accessibility', href: '/components/io-avatar/accessibility' },
  { label: 'API', href: '/components/io-avatar/api' },
];

export default function IoAvatarLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-avatar');

  return (
    <div>
      <PageHeader
        title="Avatar"
        description="User avatar with image, initials, and icon fallback. Supports five sizes, five colour variants, and circle or square shapes."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-avatar" />
    </div>
  );
}
