import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // Vercel deployment configuration
  images: {
    unoptimized: true
  },
  // 跳过静态生成错误
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Use default .next directory for Vercel
  // distDir: 'build',
};

export default withNextIntl(nextConfig);
