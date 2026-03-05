/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts')

module.exports = withNextIntl({
  reactStrictMode: true,
});
