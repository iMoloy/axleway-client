const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://axleway-server.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
