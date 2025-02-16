const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["mermaid","react-mermaid2"],
  experimental: { esmExternals: 'loose' },
  webpack: (config, { isServer }) => {
    // Force react-mermaid2 to use the same React instance
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    };
    return config;
  }
};
