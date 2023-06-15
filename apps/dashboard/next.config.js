/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@bitmetro/auth-react"],
  images: {
    
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_ID_SERVICE_URL: process.env.NEXT_PUBLIC_ID_SERVICE_URL,
  },
}

module.exports = nextConfig
