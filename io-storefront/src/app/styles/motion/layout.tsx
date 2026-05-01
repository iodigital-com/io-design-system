import { type ReactNode } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Motion — io Design System',
  description: 'Token-driven animation timing and easing guidance for consistent, accessible movement across io Digital interfaces.',
  openGraph: {
    title: 'Motion — io Design System',
    description: 'Duration tokens, easing curves, reduced-motion patterns, and interactive demos for the io Design System motion system.',
    type: 'website',
  },
};

export default function MotionLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
