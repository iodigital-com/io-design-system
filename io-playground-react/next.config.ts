import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@iodigital-com/components-react'],
};

export default nextConfig;
