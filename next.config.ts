import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'assets.coingecko.com' },
      { protocol: 'https', hostname: 'coin-images.coingecko.com' },
    ],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
    }
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        indexedDB: false,
      }
    }
    return config
  },
}

export default nextConfig