/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: '/dashboard', destination: '/client/dashboard' },
      { source: '/submit-shipment', destination: '/client/submit-shipment' },
      { source: '/awaiting-shipments', destination: '/client/awaiting-shipments' },
      { source: '/shipment-history', destination: '/client/shipment-history' },
      { source: '/settings', destination: '/client/settings' },
    ];
  },
}

export default nextConfig
