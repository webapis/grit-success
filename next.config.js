const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'false',
  })
  module.exports = withBundleAnalyzer({
    // your Next.js configuration
  })