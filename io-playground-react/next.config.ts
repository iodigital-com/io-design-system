import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@iodigital-com/components-react'],
  experimental: {
    turbopack: true,
  },
};

export default nextConfig;
