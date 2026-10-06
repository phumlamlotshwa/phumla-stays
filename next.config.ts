import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "phumla-stays-dft8.vercel.app" }],
        destination: "https://www.phumlastays.co.za/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;