import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  // Compile @iodigital-com/components TypeScript source files directly so the
  // storefront can import ./utils/tooltip-init without a separate pre-build.
  // Acceptable pattern for monorepo-internal packages; update to a compiled
  // dist export if this package is ever published externally.
  transpilePackages: ['@iodigital-com/components'],
  ...(isDev ? {} : { output: 'export' }),
  ...(isDev
    ? {
        /**
         * Proxy Stencil dev server assets.
         * When `npm run dev:stencil` is running (port 3333), all requests to
         * /stencil/* are rewritten to http://localhost:3333/build/* so Next.js
         * can serve the compiled io-components without needing a pre-build.
         */
        async rewrites() {
          return [
            {
              source: '/stencil/:path*',
              destination: 'http://localhost:3333/build/:path*',
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
