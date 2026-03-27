import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
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
