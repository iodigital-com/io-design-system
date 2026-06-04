import { type ReactNode } from 'react';

import { Manrope } from 'next/font/google';
import Script from 'next/script';

import type { Metadata } from 'next';

import { AutoCodeHighlight } from '@/components/code/AutoCodeHighlight';
import { Canvas } from '@/components/layout/Canvas';
import { StencilInit } from '@/components/layout/StencilInit';
import { SidebarProvider } from '@/context/SidebarContext';
import { StorefrontThemeProvider } from '@/hooks/useStorefrontTheme';
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
  description: 'Production-ready Web Components with a CSS token system, framework integration guides for React, Angular, Vue, and Next.js, and full design documentation.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'io Design System',
    description: 'Production-ready Web Components — one token system, any framework.',
    type: 'website',
    images: [{ url: '/wallpaper.png', alt: 'io Design System' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'io Design System',
    description: 'Production-ready Web Components — one token system, any framework.',
    images: ['/wallpaper.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        {/* io Design System tokens + component styles */}
        <link rel="stylesheet" href="/stencil/io-components.css" />
        {/* Stencil loader — registers all <io-*> custom elements */}
        <Script
          src="/stencil/io-components.esm.js"
          type="module"
          strategy="beforeInteractive"
        />
        {/* Blocking theme init — reads io-theme from localStorage before first paint.
            Falls back to OS preference (prefers-color-scheme) on first visit (null). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var t = localStorage.getItem('io-theme');
    if (t === 'dark' || t === 'light') {
      document.documentElement.setAttribute('data-theme', t);
    } else {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  } catch (e) {}
})();
            `.trim(),
          }}
        />
        {/* Focus ring modality — expose keyboard/pointer state to CSS */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  var r = document.documentElement;
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') r.setAttribute('data-io-focus-modality', 'keyboard');
  }, true);
  document.addEventListener('pointerdown', function() {
    r.setAttribute('data-io-focus-modality', 'pointer');
  }, true);
})();
            `.trim(),
          }}
        />
      </head>
      <body>
        <StorefrontThemeProvider>
          <SidebarProvider>
            <StencilInit />
            <AutoCodeHighlight />
            <Canvas>{children}</Canvas>
          </SidebarProvider>
        </StorefrontThemeProvider>
      </body>
    </html>
  );
}
