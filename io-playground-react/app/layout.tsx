import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { IoProvider } from './providers';

export const metadata: Metadata = {
  title: 'io DS — React Playground',
};

const NAV_LINKS = [
  { href: '/', label: 'Index' },
  { href: '/modal', label: 'io-modal' },
  { href: '/form', label: 'Forms (FACE)' },
  { href: '/button', label: 'io-button' },
  { href: '/toast', label: 'io-toast' },
  { href: '/select', label: 'io-select' },
  { href: '/tabs', label: 'io-tabs' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <IoProvider>
          <nav aria-label="Playground navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
          </nav>
          {children}
        </IoProvider>
      </body>
    </html>
  );
}
