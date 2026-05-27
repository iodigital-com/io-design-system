import LogotypePageContent from './LogotypePageContent';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Logotype — io Design System',
  description: 'io Digital logotype usage rules, clear space requirements, and approved colour variants.',
  openGraph: {
    title: 'Logotype — io Design System',
    description: 'io Digital logotype usage rules, clear space requirements, and approved colour variants.',
    type: 'website',
  },
};

export default function LogotypePage() {
  return <LogotypePageContent />;
}
