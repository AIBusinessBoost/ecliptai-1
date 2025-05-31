/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  webpack: (config) => {
    // Handle canvas for Three.js
    if (config.externals) {
      if (typeof config.externals === 'function') {
        const originalExternal = config.externals;
        config.externals = function (...args) {
          const result = originalExternal(...args);
          return result === 'canvas' ? false : result;
        };
      } else if (Array.isArray(config.externals)) {
        config.externals = config.externals.filter(external => external !== 'canvas');
      }
    }
    
    return config;
  },
  // Disable image optimization to prevent issues during build
  images: {
    unoptimized: true
  },
  // Add output configuration for better error handling
  output: 'standalone',
  // Increase memory limit for builds
  experimental: {
    largePageDataBytes: 128 * 1000, // 128KB
  }
}

module.exports = nextConfig
