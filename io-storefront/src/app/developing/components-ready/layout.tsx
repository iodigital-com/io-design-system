import { type ReactNode } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Components Ready — io Design System',
  description: 'Understand when io custom elements are ready to interact with — whenDefined(), componentOnReady(), and testing patterns.',
  openGraph: {
    title: 'Components Ready — io Design System',
    description: 'Custom element upgrade timing, readiness detection patterns, and jsdom limitations for io Design System components.',
    type: 'website',
  },
};

export default function ComponentsReadyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
