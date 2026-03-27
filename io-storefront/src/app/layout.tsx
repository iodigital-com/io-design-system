import type { Metadata } from 'next';
import Script from 'next/script';
import { Manrope } from 'next/font/google';
import { SidebarProvider } from '@/context/SidebarContext';
import { StorefrontThemeProvider } from '@/hooks/useStorefrontTheme';
import { Canvas } from '@/components/layout/Canvas';
import './globals.css';

/**
 * Manrope — io Digital's primary typeface.
 * next/font self-hosts the font and generates a CSS variable so the token
 * --io-font-family-base can reference it without an external request.
 * Preloaded weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
 */
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'io Design System',
  description: 'io Digital Design System — Component library and design token documentation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" className={manrope.variable}>
      <head>
        {/* io Design System tokens + component styles */}
        <link rel="stylesheet" href="/stencil/io-components.css" />
        {/* Stencil loader — registers all <io-*> custom elements */}
        <Script
          src="/stencil/io-components.esm.js"
          type="module"
          strategy="beforeInteractive"
        />
        {/* Blocking theme init — reads io-theme from localStorage before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var t = localStorage.getItem('io-theme');
    if (t === 'dark' || t === 'light') {
      document.documentElement.setAttribute('data-theme', t);
    } else if (t === 'auto') {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  } catch (e) {}
})();
            `.trim(),
          }}
        />
        {/* Focus ring modality — show ring only on keyboard (Tab), hide on pointer */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  var r = document.documentElement;
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') r.style.setProperty('--io-focus-ring-active', 'var(--io-shadow-focus-ring)');
  }, true);
  document.addEventListener('pointerdown', function() {
    r.style.removeProperty('--io-focus-ring-active');
  }, true);
})();
            `.trim(),
          }}
        />
      </head>
      <body>
        <StorefrontThemeProvider>
          <SidebarProvider>
            <Canvas>{children}</Canvas>
          </SidebarProvider>
        </StorefrontThemeProvider>
      </body>
    </html>
  );
}
