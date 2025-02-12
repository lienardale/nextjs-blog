/** @type {import('next').NextConfig} */
const withNextTranslate = require('next-translate-plugin')

module.exports = withNextTranslate({
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 200,
        ignored: ['**/.git/**', '**/node_modules/**']
      };
      config.cache = true;
    }
    return config;
  },
});
