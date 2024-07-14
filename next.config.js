/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/sayfa/',
        destination: '/sayfa/1',
        permanent: true,
      },
      {
        source: '/sayfa',
        destination: '/sayfa/1',
        permanent: true,
      },
    ]
  },
  output: 'export',
}

module.exports = nextConfig
