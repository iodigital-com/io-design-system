import type { Metadata } from 'next';

import LogotypePageContent from './LogotypePageContent';

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
