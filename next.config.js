/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/steven-tey/precedent",
        permanent: false,
      },
    ];
  },

};

const customWebpackConfig = { 
  resolve: {
    fallback: {
      'crypto': require.resolve('crypto-browserify'),
      'asset': require.resolve('assert'),
      'stream': require.resolve('stream-browserify'),
      'buffer': require.resolve('buffer'),
    }
  }
}

module.exports = {
  ...nextConfig,
  webpack: (config) => { 
    config.resolve = {
      ...config.resolve,
      ...customWebpackConfig.resolve,
    }
    return config;
  }
  
};