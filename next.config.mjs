/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://axleway-server.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
