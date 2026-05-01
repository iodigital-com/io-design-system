import { type ReactNode } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vanilla JS — io Design System',
  description: 'Use io Web Components as standard Custom Elements in plain HTML and JavaScript — CDN or npm, no build step required.',
  openGraph: {
    title: 'Vanilla JS — io Design System',
    description: 'Load io components via CDN or npm, register custom elements, and handle events in Vanilla JS or any HTML page.',
    type: 'website',
  },
};

export default function VanillaJsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
