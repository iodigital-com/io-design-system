import { type ReactNode } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integrating io — io Design System',
  description: 'Framework integration guides for using io Web Components with Vanilla JS, React, Next.js, Angular, and Vue.',
  openGraph: {
    title: 'Integrating io — io Design System',
    description: 'Choose your integration path — io Web Components work with any framework via a single core package.',
    type: 'website',
  },
};

export default function DevelopingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
