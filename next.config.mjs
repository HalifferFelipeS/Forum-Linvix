/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite imagens de qualquer lugar (útil para o futuro)
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL', // Permite que o Discord mostre seu site
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors * self https://*.discord.com https://discord.com;", // Libera o Discord
          },
        ],
      },
    ];
  },
};

export default nextConfig;