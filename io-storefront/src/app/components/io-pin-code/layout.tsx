'use client';

import type { ReactNode } from 'react';

import { PageHeader, type PageTab } from '@/components/layout/PageHeader';
import { RelatedComponents } from '@/components/RelatedComponents';
import { getComponentStatusBySlug } from '@/sitemap';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/io-pin-code/configurator' },
  { label: 'Examples', href: '/components/io-pin-code/examples' },
  { label: 'Usage', href: '/components/io-pin-code/usage' },
  { label: 'Accessibility', href: '/components/io-pin-code/accessibility' },
  { label: 'API', href: '/components/io-pin-code/api' },
];

export default function IoPinCodeLayout({ children }: { children: ReactNode }) {
  const status = getComponentStatusBySlug('io-pin-code');

  return (
    <div>
      <PageHeader
        title="Pin Code"
        description="Secure PIN or OTP entry with N digit slots, auto-advance, paste distribution, and optional password masking. FACE form-associated."
        tabs={TABS}
        category="Component"
        status={status}
      />
      {children}
      <RelatedComponents currentSlug="io-pin-code" />
    </div>
  );
}
