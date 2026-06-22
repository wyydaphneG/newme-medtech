import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  env: { SITE_NAME: 'NEWME MEDTECH' },
  images: { formats: ['image/avif','image/webp'] },
  experimental: {
    optimizePackageImports: ['lucide-react'],
    workerThreads: true,
    webpackBuildWorker: true,
  },
  async redirects() {
    return [
      {source:'/products/hydra-facial',destination:'/products/hydra-beauty',permanent:true},
      {source:'/products/ems-body-sculpting',destination:'/products/ems-shape',permanent:true},
      {source:'/products/systems/:slug',destination:'/systems/:slug',permanent:true},
    ];
  },
};
export default nextConfig;
