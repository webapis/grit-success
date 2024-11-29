/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        IMG_HOST: process.env.NEXT_PUBLIC_IMG_HOST,
      },
output: 'export',
//
}

module.exports = nextConfig
